import {
  SET_GAME_STATE,
  UPDATE_GAME_STATE,
  SET_GAME_OVER,
  SET_GAME_WON,
  CHANGE_GAME_MODE,
  UPDATE_ACTIVE_USERS,
} from "./actions"

// TODO status [idle, running, game_over, game_won]

const initialState = {
  grid: [],
  score: 0,
  isGameWon: false,
  isGameOver: false,
  currentGameMode: "anarchy",
  activeUsers: [],
}

export default function gridReducer(state = initialState, { type, payload }) {
  switch (type) {
    // FIXME rename to new game state
    case SET_GAME_STATE:
      return {
        ...state,
        grid: payload.grid,
        score: payload.score,
        isGameWon: false,
        isGameOver: false,
      }

    case UPDATE_GAME_STATE:
      return {
        ...state,
        grid: payload.grid,
        score: payload.score,
      }

    case SET_GAME_OVER:
      return {
        ...state,
        grid: payload.grid,
        score: payload.score,
        isGameOver: true,
      }

    case SET_GAME_WON:
      return {
        ...state,
        grid: payload.grid,
        score: payload.score,
        isGameWon: true,
      }

    case UPDATE_ACTIVE_USERS:
      return {
        ...state,
        activeUsers: payload,
      }

    case CHANGE_GAME_MODE:
      return {
        ...state,
        currentGameMode: payload,
      }

    default:
      return state
  }
}
