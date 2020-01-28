defmodule ChatPlays2048Web.Presence do
  use Phoenix.Presence,
    otp_app: :chat_plays_2048,
    pubsub_server: ChatPlays2048.PubSub
end
