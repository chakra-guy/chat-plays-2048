defmodule ChatPlays2048Web.ChatChannel do
  use ChatPlays2048Web, :channel
  alias ChatPlays2048Web.Presence

  @new_msg "chat:new_msg"

  def join("chat:current", _, socket) do
    send(self(), :after_join)
    {:ok, socket}
  end

  def handle_info(:after_join, socket) do
    push(socket, "presence_state", Presence.list(socket))

    {:ok, _} =
      Presence.track(socket, socket.assigns.username, %{
        username: socket.assigns.username,
        online_at: DateTime.utc_now()
      })

    {:noreply, socket}
  end

  def handle_in("chat:new_msg", %{"body" => message}, socket) do
    broadcast!(socket, @new_msg, %{
      user: socket.assigns.username,
      body: message,
      created_at: DateTime.utc_now()
    })

    {:noreply, socket}
  end
end
