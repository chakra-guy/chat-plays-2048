defmodule ChatPlays2048.Game.Grid do
  @directions [:up, :down, :right, :left]

  def new(size) when size > 0 do
    grid = make_grid(size)
    seed(2, grid)
  end

  def move(grid, direction)
      when is_list(grid) and direction in @directions do
    case try_move(grid, direction) do
      :noop -> {grid, 0}
      {:ok, grid, points} -> {seed(grid), points}
    end
  end

  def has_move?(grid) do
    Enum.any?(@directions, &(try_move(grid, &1) != :noop))
  end

  def get_highest_value(grid) do
    grid
    |> List.flatten()
    |> Enum.max()
  end

  # Private functions

  defp make_grid(size) do
    for _ <- 1..size do
      for _ <- 1..size do
        0
      end
    end
  end

  defp try_move(grid, direction) do
    case do_move(grid, direction) do
      {^grid, _} ->
        :noop

      {grid, points} ->
        {:ok, grid, points}
    end
  end

  defp do_move(grid, :left) do
    grid
    |> collapse()
    |> compose(&Enum.reverse(&1, &2))
  end

  defp do_move(grid, :right) do
    grid
    |> Enum.map(&Enum.reverse/1)
    |> collapse
    |> compose(&(&2 ++ &1))
  end

  defp do_move(grid, :up) do
    grid
    |> transpose()
    |> do_move(:left)
    |> transpose
  end

  defp do_move(grid, :down) do
    grid
    |> transpose()
    |> do_move(:right)
    |> transpose
  end

  defp compose(chunks, fun) do
    Enum.map_reduce(chunks, 0, fn
      {acc, tail, points}, sum -> {fun.(acc, tail), sum + points}
    end)
  end

  defp transpose({grid, points}) do
    {transpose(grid), points}
  end

  defp transpose(grid, acc \\ [])

  defp transpose([[] | _], acc) do
    Enum.reverse(acc)
  end

  defp transpose(grid, acc) do
    {tail, row} =
      Enum.map_reduce(grid, [], fn
        [el | rest], row -> {rest, [el | row]}
      end)

    transpose(tail, [Enum.reverse(row) | acc])
  end

  defp collapse(grid) do
    Stream.map(grid, &collapse(&1, [], []))
  end

  defp collapse([], acc, tail) do
    acc
    |> Enum.reverse()
    |> merge([], tail, 0)
  end

  defp collapse([0 | rest], acc, tail) do
    collapse(rest, acc, [0 | tail])
  end

  defp collapse([el | rest], acc, tail) do
    collapse(rest, [el | acc], tail)
  end

  defp merge([], acc, tail, points) do
    {acc, tail, points}
  end

  defp merge([el, el | rest], acc, tail, points) do
    sum = el + el
    merge(rest, [sum | acc], [0 | tail], points + sum)
  end

  defp merge([el | rest], acc, tail, points) do
    merge(rest, [el | acc], tail, points)
  end

  defp seed(grid) do
    seed(1, grid)
  end

  defp seed(num, grid) do
    take_empties(grid)
    |> sample
    |> insert_at(num, grid)
  end

  defp sample({count, empties}) do
    Enum.at(empties, :random.uniform(count) - 1)
  end

  defp insert_at({row_index, index}, num, grid) do
    List.update_at(grid, row_index, &List.replace_at(&1, index, num))
  end

  defp take_empties(grid) do
    grid
    |> Stream.with_index()
    |> Enum.reduce({0, []}, &take_empties/2)
  end

  defp take_empties({row, row_index}, acc) do
    row
    |> Stream.with_index()
    |> Enum.reduce(acc, fn
      {0, index}, {count, empties} ->
        {count + 1, [{row_index, index} | empties]}

      _cell, acc ->
        acc
    end)
  end
end
