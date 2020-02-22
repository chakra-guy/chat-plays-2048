defmodule ChatPlays2048.Game.Game do
  defstruct stage: :running,
            score: 0,
            win_tile: 2048,
            grid: nil

  alias ChatPlays2048.Game.Grid

  def new(size, win_tile) when is_integer(size) and is_integer(win_tile) do
    %__MODULE__{
      stage: :running,
      score: 0,
      win_tile: win_tile,
      grid: Grid.new(size)
    }
  end

  def move(%__MODULE__{grid: grid, score: score, win_tile: win_tile}, direction) do
    {new_grid, points} = Grid.move(grid, direction)

    %__MODULE__{
      stage: update_stage(new_grid, win_tile),
      score: score + points,
      grid: new_grid
    }
  end

  def restart(size, win_tile) do
    new(size, win_tile)
  end

  # Private functions

  defp update_stage(grid, win_tile) do
    highest_value = Grid.get_highest_value(grid)
    can_move? = Grid.has_move?(grid)

    cond do
      highest_value >= win_tile -> :game_won
      can_move? == true -> :running
      can_move? == false -> :game_over
    end
  end
end
