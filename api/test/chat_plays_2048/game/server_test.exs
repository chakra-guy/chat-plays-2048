defmodule ChatPlays2048.GameServerTest do
  use ExUnit.Case, async: true
  alias ChatPlays2048.Game

  setup do
    state = Game.Server.restart(:anarchy)
    %{state: state}
  end

  describe "peek/0" do
    test "given it's anarchy mode then it returns with the correct game state" do
      state = Game.Server.peek()
      grid = state.game.grid

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
             } = state
    end

    test "given it's democracy mode then it returns with the correct game state" do
      Game.Server.restart(:democracy)
      state = Game.Server.peek()
      grid = state.game.grid

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
             } = state
    end
  end

  # TODO fix random.seed so it will always return the the same "random" grid and moves
  @tag :skip
  describe "move/1" do
    test "when it's anarchy mode and user can move, then it returns with moved game" do
    end

    test "when it's democracy mode, then it returns with an updated game and it sends an after-message with moved game" do
    end

    test "when it's democracy mode and multiple moves happened before timeout, then it sends an after-message only once" do
    end

    test "when it's democracy mode and votes balance out, then it sends an after-message with not-moved game" do
    end
  end

  test "restart/1 returns a new game and with the correct game mode", %{state: state_1} do
    make_some_moves(:anarchy)
    state_2 = Game.Server.restart(:democracy)
    make_some_moves(:democracy)
    state_3 = Game.Server.restart(:anarchy)

    assert state_1.game_mode == :anarchy
    assert state_1.game.score == 0

    assert state_2.game_mode == :democracy
    assert state_2.game.score == 0

    assert state_3.game_mode == :anarchy
    assert state_3.game.score == 0
  end

  test "change_game_mode/1 returns an existing game and with the correct game mode", %{
    state: state_1
  } do
    make_some_moves(:anarchy)
    state_2 = Game.Server.change_game_mode(:democracy)
    make_some_moves(:democracy)
    state_3 = Game.Server.change_game_mode(:anarchy)

    assert state_1.game_mode == :anarchy
    assert state_1.game.score == 0

    assert state_2.game_mode == :democracy
    assert state_2.game.score > state_1.game.score

    assert state_3.game_mode == :anarchy
    assert state_3.game.score > state_2.game.score
  end

  defp make_some_moves(game_mode) do
    for _ <- 1..10 do
      for direction <- [:up, :right, :down, :right] do
        Game.Server.move(direction)

        if game_mode == :democracy do
          assert_receive {:next_turn, _game_state}
        end
      end
    end
  end
end
