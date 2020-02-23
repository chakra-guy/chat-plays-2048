defmodule ChatPlays2048.Game.Server do
  use GenServer
  alias ChatPlays2048.Game.Game

  @grid_size 6
  @win_tile 2048
  @name "HARDCODED_ETS_KEY"
  @game_modes [:democracy, :anarchy]
  @directions [:up, :down, :right, :left]
  @turn_time if Mix.env() == :test, do: 10, else: 3_000
  @random_seed if Mix.env() == :test, do: 0, else: :os.timestamp()

  defmodule State do
    defstruct game: nil,
              game_mode: :democracy,
              votes: %{up: 0, down: 0, left: 0, right: 0},
              voting_ends_at: nil,
              timer_ref: nil
  end

  def start_link(_args) do
    GenServer.start_link(__MODULE__, :ok, name: __MODULE__)
  end

  def peek() do
    GenServer.call(__MODULE__, :peek)
  end

  def move(direction) when direction in ~w(up down right left) do
    move(String.to_atom(direction))
  end

  def move(direction) when direction in @directions do
    GenServer.call(__MODULE__, {:move, direction})
  end

  def restart(game_mode) when game_mode in ~w(democracy anarchy) do
    restart(String.to_atom(game_mode))
  end

  def restart(game_mode) when game_mode in @game_modes do
    GenServer.call(__MODULE__, {:restart, game_mode})
  end

  def change_game_mode(game_mode) when game_mode in ~w(democracy anarchy) do
    change_game_mode(String.to_atom(game_mode))
  end

  def change_game_mode(game_mode) when game_mode in @game_modes do
    GenServer.call(__MODULE__, {:change_game_mode, game_mode})
  end

  # Callbacks

  def init(:ok) do
    :random.seed(@random_seed)
    send(self(), :lazy_init)
    {:ok, %State{game: Game.new(@grid_size, @win_tile)}}
  end

  def handle_call(:peek, _from, %State{} = state) do
    reply(state)
  end

  def handle_call({:move, direction}, _from, %State{game_mode: :anarchy} = state) do
    new_game = Game.move(state.game, direction)

    reply(%{state | game: new_game})
  end

  def handle_call({:move, direction}, from, %State{game_mode: :democracy, timer_ref: nil} = state) do
    new_votes = Map.update!(state.votes, direction, &(&1 + 1))
    voting_ends_at = DateTime.utc_now() |> DateTime.add(@turn_time, :second)
    timer = Process.send_after(self(), {:make_next_turn, from}, @turn_time)

    reply(%{state | votes: new_votes, voting_ends_at: voting_ends_at, timer_ref: timer})
  end

  def handle_call({:move, direction}, _from, %State{game_mode: :democracy} = state) do
    new_votes = Map.update!(state.votes, direction, &(&1 + 1))

    reply(%{state | votes: new_votes})
  end

  def handle_call({:restart, game_mode}, _from, %State{} = state) do
    cancel_timer(state.timer_ref)

    reply(%State{game_mode: game_mode, game: Game.new(@grid_size, @win_tile)})
  end

  def handle_call({:change_game_mode, game_mode}, _from, %State{} = state) do
    cancel_timer(state.timer_ref)

    reply(%State{game_mode: game_mode, game: state.game})
  end

  def handle_info(:lazy_init, fresh_state) do
    new_state =
      case :ets.lookup(:game_state, @name) do
        [{_name, existing_state}] -> existing_state
        [] -> fresh_state
      end

    :ets.insert(:game_state, {@name, new_state})
    {:noreply, new_state}
  end

  def handle_info({:make_next_turn, {from_pid, _}}, %State{} = state) do
    new_state =
      case with_majority?(state.votes) do
        {true, direction} ->
          new_game = Game.move(state.game, direction)
          %State{game_mode: state.game_mode, game: new_game}

        _no_majority ->
          %State{game_mode: state.game_mode, game: state.game}
      end

    send(from_pid, {:next_turn, sanitize(new_state)})
    {:noreply, new_state}
  end

  # Private functions

  defp reply(state) do
    :ets.insert(:game_state, {@name, state})
    {:reply, sanitize(state), state}
  end

  defp sanitize(%State{} = state) do
    %{
      game: Map.from_struct(state.game),
      game_mode: state.game_mode,
      votes: state.votes,
      voting_ends_at: state.voting_ends_at
    }
  end

  defp cancel_timer(timer_ref) do
    if timer_ref, do: Process.cancel_timer(timer_ref)
  end

  defp with_majority?(votes) do
    votes_list = Enum.map(votes, &Tuple.to_list/1)

    [max_direction, max_count] = Enum.max_by(votes_list, fn [_, count] -> count end)

    has_majority? =
      votes_list
      |> Enum.filter(fn [_, count] -> count == max_count end)
      |> (fn list -> length(list) == 1 end).()

    {has_majority?, max_direction}
  end
end
