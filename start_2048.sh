trap 'kill %1' SIGINT
cd client && npm install && npm start & cd api && mix deps.get && mix phx.server