defmodule ChatPlays2048.GameServer do
  use GenServer
  alias Tty2048.Game

  @game_modes [:democracy, :anarchy]
  @directions [:up, :down, :right, :left]
  @turn_time if Mix.env() == :test, do: 10, else: 3_000

  defmodule GameState do
    defstruct game: nil,
              game_mode: :democracy,
              voting_ends_at: nil,
              votes: %{up: 0, down: 0, left: 0, right: 0},
              timer_ref: nil
  end

  def start_link(_args) do
    GenServer.start_link(__MODULE__, :ok, name: __MODULE__)
  end

  def peek() do
    GenServer.call(__MODULE__, :peek)
  end

  def move(direction) when direction in @directions do
    GenServer.call(__MODULE__, {:move, direction})
  end

  def restart(game_mode) when game_mode in @game_modes do
    GenServer.call(__MODULE__, {:restart, game_mode})
  end

  def change_game_mode(game_mode) when game_mode in @game_modes do
    GenServer.call(__MODULE__, {:change_game_mode, game_mode})
  end

  # Callbacks

  def init(:ok) do
    {:ok, %GameState{}}
  end

  def handle_call(:peek, _from, %GameState{} = state) do
    game = Game.peek()
    state = Map.put(state, :game, game)
    {:reply, sanitize(state), state}
  end

  def handle_call({:move, direction}, from, %GameState{} = state) do
    case state.game_mode do
      :anarchy ->
        game = Game.move(direction)
        new_state = Map.put(state, :game, game)
        {:reply, sanitize(new_state), new_state}

      :democracy ->
        new_votes = Map.update!(state.votes, direction, &(&1 + 1))

        if !state.timer_ref do
          timer = Process.send_after(self(), {:make_next_turn, from}, @turn_time)
          voting_ends_at = DateTime.utc_now() |> DateTime.add(@turn_time, :second)

          new_state =
            state
            |> Map.put(:votes, new_votes)
            |> Map.put(:voting_ends_at, voting_ends_at)
            |> Map.put(:timer_ref, timer)

          {:reply, sanitize(new_state), new_state}
        else
          new_state = Map.put(state, :votes, new_votes)
          {:reply, sanitize(new_state), new_state}
        end
    end
  end

  def handle_call({:restart, game_mode}, _from, %GameState{} = state) do
    cancel_timer(state.timer_ref)
    new_game = Game.restart()

    new_state =
      %GameState{}
      |> Map.put(:game, new_game)
      |> Map.put(:game_mode, game_mode)

    {:reply, sanitize(new_state), new_state}
  end

  def handle_call({:change_game_mode, game_mode}, _from, %GameState{} = state) do
    cancel_timer(state.timer_ref)

    new_state =
      %GameState{}
      |> Map.put(:game, state.game)
      |> Map.put(:game_mode, game_mode)

    {:reply, sanitize(new_state), new_state}
  end

  def handle_info({:make_next_turn, {from_pid, _}}, %GameState{} = state) do
    case is_direction_unique?(state.votes) do
      {true, direction} ->
        new_game = Game.move(direction)

        new_state =
          %GameState{}
          |> Map.put(:game, new_game)
          |> Map.put(:game_mode, state.game_mode)

        send(from_pid, {:next_turn, sanitize(new_state)})
        {:noreply, new_state}

      _ ->
        new_state =
          %GameState{}
          |> Map.put(:game, state.game)
          |> Map.put(:game_mode, state.game_mode)

        send(from_pid, {:next_turn, sanitize(new_state)})
        {:noreply, new_state}
    end
  end

  defp is_direction_unique?(votes) do
    votes_list = Enum.map(votes, &Tuple.to_list/1)

    [max_direction, max_count] = Enum.max_by(votes_list, fn [_, count] -> count end)

    unique? =
      votes_list
      |> Enum.filter(fn [_, count] -> count == max_count end)
      |> (fn list -> length(list) == 1 end).()

    {unique?, max_direction}
  end

  defp cancel_timer(timer_ref) do
    if timer_ref, do: Process.cancel_timer(timer_ref)
  end

  defp sanitize(%GameState{} = state) do
    %{game: {stage, grid_and_score}} = state

    formatted_game = %{
      stage: stage,
      grid: grid_and_score.grid,
      score: grid_and_score.score
    }

    state
    |> Map.put(:game, formatted_game)
    |> Map.delete(:timer_ref)
    |> Map.from_struct()
  end
end
