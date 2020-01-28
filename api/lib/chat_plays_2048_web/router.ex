defmodule ChatPlays2048Web.Router do
  use ChatPlays2048Web, :router

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/api", ChatPlays2048Web do
    pipe_through :api
  end
end
