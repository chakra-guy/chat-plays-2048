import {
  INIT_GAME,
  GAME_MOVED,
  GAME_VOTING,
  GAME_RESTARTED,
  GAME_MODE_CHANGED,
  MAKE_MOVE,
} from "./actions"
import GAME_MODE from "../_common/gameModeConstants"

const { DEMOCRACY } = GAME_MODE

const emptyGrid = Array(6)
  .fill(0)
  .map(() => Array(6).fill(0))

const initialState = {
  userVoted: false,
  grid: emptyGrid,
  score: 0,
  stage: "running",
  gameMode: null,
  votingEndsAt: null,
  votes: {},
}

export default function gameReducer(state = initialState, { type, payload }) {
  switch (type) {
    case INIT_GAME:
    case GAME_MOVED:
    case GAME_RESTARTED:
    case GAME_MODE_CHANGED:
      return {
        ...state,
        userVoted: false,
        grid: payload.game.grid,
        score: payload.game.score,
        stage: payload.game.stage,
        gameMode: payload.game_mode,
        votingEndsAt: payload.voting_ends_at,
        votes: payload.votes,
      }

    case GAME_VOTING:
      return {
        ...state,
        grid: payload.game.grid,
        score: payload.game.score,
        stage: payload.game.stage,
        gameMode: payload.game_mode,
        votingEndsAt: payload.voting_ends_at,
        votes: payload.votes,
      }

    case MAKE_MOVE:
      return {
        ...state,
        userVoted: state.gameMode === DEMOCRACY,
      }

    default:
      return state
  }
}
