defmodule ChatPlays2048Web.GameChannelTest do
  use ChatPlays2048Web.ChannelCase
  alias ChatPlays2048.GameServer
  alias ChatPlays2048Web.{UserSocket, GameChannel}

  setup do
    {:ok, _, socket} =
      socket(UserSocket, "", %{username: "test_user"})
      |> subscribe_and_join(GameChannel, "game:current", %{})

    %{socket: socket}
  end

  test "after joining it pushes the game state" do
    assert_push("game:init", %{game: _})
  end

  describe "move:<direction>" do
    @tag :half_done
    test "when it's anarchy mode, then it broadcasts a new anarchy game state", %{socket: socket} do
      GameServer.restart(:anarchy)
      push(socket, "move:up")
      assert_broadcast("game:moved", %{game_mode: :anarchy})
    end

    @tag :half_done
    test "when it's democracy mode, then it broadcasts a new democracy game state", %{
      socket: socket
    } do
      GameServer.restart(:democracy)
      push(socket, "move:up")
      assert_broadcast("game:voting", %{game_mode: :democracy})
    end
  end

  @tag :half_done
  test "when 'restart_game' recieved, then it broadcasts a new game state", %{socket: socket} do
    push(socket, "restart_game", %{"game_mode" => "anarchy"})
    assert_broadcast("game:restarted", %{game_mode: :anarchy})
  end

  @tag :half_done
  test "when 'change_game_mode' recieved, then it broadcasts a new game state", %{socket: socket} do
    push(socket, "change_game_mode", %{"game_mode" => "democracy"})
    assert_broadcast("game:game_mode_changed", %{game_mode: :democracy})
  end
end
