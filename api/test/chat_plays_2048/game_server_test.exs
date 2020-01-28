defmodule ChatPlays2048.GameServerTest do
  use ExUnit.Case, async: false
  alias ChatPlays2048.GameServer

  setup do
    game = GameServer.restart(:anarchy)
    %{game: game}
  end

  describe "peek/0" do
    test "given it's anarchy mode then it returns with the correct game state" do
      game = GameServer.peek()
      grid = game.game.grid

      assert length(grid) == 6
      assert length(List.flatten(grid)) == 36

      assert %{
               game: %{
                 grid: _grid,
                 score: 0,
                 stage: :running
               },
               game_mode: :anarchy,
               votes: %{down: 0, left: 0, right: 0, up: 0},
               voting_ends_at: nil
             } = game
    end

    test "given it's democracy mode then it returns with the correct game state" do
      GameServer.restart(:democracy)
      game = GameServer.peek()
      grid = game.game.grid

      assert length(grid) == 6
      assert length(List.flatten(grid)) == 36

      assert %{
               game: %{
                 grid: _grid,
                 score: 0,
                 stage: :running
               },
               game_mode: :democracy,
               votes: %{down: 0, left: 0, right: 0, up: 0},
               voting_ends_at: nil
             } = game
    end
  end

  @tag :skip
  describe "move/1" do
    test "when it's anarchy mode and user can move, then it returns with moved game" do
    end

    test "when it's democracy mode, then it returns with an updated game and it sends an after-message with moved game" do
    end

    test "when it's democracy mode and multiple moves happened before timeout, then it should sends an after-message only once" do
    end
  end

  test "restart/1 returns a new game and with the correct game mode", %{game: game_1} do
    make_some_moves(:anarchy)
    game_2 = GameServer.restart(:democracy)
    make_some_moves(:democracy)
    game_3 = GameServer.restart(:anarchy)

    assert game_1.game_mode == :anarchy
    assert game_1.game.score == 0

    assert game_2.game_mode == :democracy
    assert game_2.game.score == 0

    assert game_3.game_mode == :anarchy
    assert game_3.game.score == 0
  end

  test "change_game_mode/1 returns an existing game and with the correct game mode", %{
    game: game_1
  } do
    make_some_moves(:anarchy)
    game_2 = GameServer.change_game_mode(:democracy)
    make_some_moves(:democracy)
    game_3 = GameServer.change_game_mode(:anarchy)

    assert game_1.game_mode == :anarchy
    assert game_1.game.score == 0

    assert game_2.game_mode == :democracy
    assert game_2.game.score > game_1.game.score

    assert game_3.game_mode == :anarchy
    assert game_3.game.score > game_2.game.score
  end

  defp make_some_moves(game_mode) do
    for _ <- 1..10 do
      for direction <- [:up, :right, :down, :right] do
        GameServer.move(direction)

        if game_mode == :democracy do
          assert_receive {:next_turn, _game_state}
        end
      end
    end
  end
end
