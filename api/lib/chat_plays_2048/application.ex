defmodule ChatPlays2048.Application do
  @moduledoc false

  use Application

  def start(_type, _args) do
    children = [
      ChatPlays2048.Game.Server,
      ChatPlays2048Web.Endpoint,
      ChatPlays2048Web.Presence
    ]

    opts = [strategy: :one_for_one, name: ChatPlays2048.Supervisor]
    Supervisor.start_link(children, opts)
  end

  def config_change(changed, _new, removed) do
    ChatPlays2048Web.Endpoint.config_change(changed, removed)
    :ok
  end
end
