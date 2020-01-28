# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.

# General application configuration
use Mix.Config

# Configures the endpoint
config :chat_plays_2048, ChatPlays2048Web.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "+sSUBz2Ds/AViTacvTwnA9k/HYtLgrZyJD/fbO0AOElVdvW+NzOt/gtZP35eWJ4k",
  render_errors: [view: ChatPlays2048Web.ErrorView, accepts: ~w(json)],
  pubsub: [name: ChatPlays2048.PubSub, adapter: Phoenix.PubSub.PG2]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

# Use Jason for JSON parsing in Phoenix
config :phoenix, :json_library, Jason

# Clear console before auto running test
if Mix.env() == :dev do
  config :mix_test_watch,
    clear: true
end

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env()}.exs"
