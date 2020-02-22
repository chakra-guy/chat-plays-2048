defmodule ChatPlays2048Web.GameChannel do
  use Phoenix.Channel
  alias ChatPlays2048.Game

  @init "game:init"
  @moved "game:moved"
  @voting "game:voting"
  @restarted "game:restarted"
  @game_mode_changed "game:game_mode_changed"

  def join("game:current", _message, socket) do
    send(self(), :after_join)
    {:ok, socket}
  end

  def handle_info(:after_join, socket) do
    game_state = Game.Server.peek()
    push(socket, @init, game_state)
    {:noreply, socket}
  end

  def handle_info({:next_turn, game_state}, socket) do
    broadcast!(socket, @moved, game_state)
    {:noreply, socket}
  end

  def handle_in("move:" <> direction, _message, socket) do
    game_state =
      direction
      |> String.to_existing_atom()
      |> Game.Server.move()

    case game_state.game_mode do
      :democracy -> broadcast!(socket, @voting, game_state)
      :anarchy -> broadcast!(socket, @moved, game_state)
    end

    {:noreply, socket}
  end

  def handle_in("restart_game", %{"game_mode" => game_mode}, socket) do
    new_game_state =
      game_mode
      |> String.to_existing_atom()
      |> Game.Server.restart()

    broadcast!(socket, @restarted, new_game_state)
    {:noreply, socket}
  end

  def handle_in("change_game_mode", %{"game_mode" => game_mode}, socket) do
    new_game_state =
      game_mode
      |> String.to_existing_atom()
      |> Game.Server.change_game_mode()

    broadcast!(socket, @game_mode_changed, new_game_state)
    {:noreply, socket}
  end
end
