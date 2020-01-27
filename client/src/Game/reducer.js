const emptyGrid = Array(6)
  .fill(0)
  .map(() => Array(6).fill(0))

const initialState = {
  grid: emptyGrid,
  score: 0,
  stage: "running",
  gameMode: null,
  voteStartedAt: null,
  votes: {},
}

export default function gameReducer(state = initialState, { type, payload }) {
  switch (type) {
    case "INIT_GAME":
    case "GAME_MOVED":
    case "GAME_VOTING":
    case "GAME_RESTARTED":
      return {
        ...state,
        grid: payload.game.grid,
        score: payload.game.score,
        stage: payload.game.stage,
        gameMode: payload.game_mode,
        voteStartedAt: payload.vote_started_at,
        votes: payload.votes,
      }

    default:
      return state
  }
}
