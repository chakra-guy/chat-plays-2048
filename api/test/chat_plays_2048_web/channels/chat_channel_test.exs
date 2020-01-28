defmodule ChatPlays2048Web.ChatChannelTest do
  use ChatPlays2048Web.ChannelCase
  alias ChatPlays2048Web.{UserSocket, ChatChannel}

  setup do
    {:ok, _, socket} =
      socket(UserSocket, "", %{username: "test_user"})
      |> subscribe_and_join(ChatChannel, "chat:current", %{})

    %{socket: socket}
  end

  test "after joining it pushes the 'presence_state'" do
    assert_push("presence_state", _presence_state)
  end

  test "when new message recieved then it gets broadcasted with metadata", %{socket: socket} do
    push(socket, "chat:new_msg", %{"body" => "Hi all!"})

    assert_broadcast("chat:new_msg", %{
      user: "test_user",
      body: "Hi all!",
      created_at: _time
    })
  end
end
