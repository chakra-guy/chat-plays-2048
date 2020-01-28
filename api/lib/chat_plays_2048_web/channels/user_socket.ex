defmodule ChatPlays2048Web.UserSocket do
  use Phoenix.Socket

  ## Channels
  channel("chat:*", ChatPlays2048Web.ChatChannel)
  channel("game:*", ChatPlays2048Web.GameChannel)

  def connect(%{"username" => username}, socket, _connect_info) do
    {:ok, assign(socket, :username, username)}
  end

  def id(_socket), do: nil
end
