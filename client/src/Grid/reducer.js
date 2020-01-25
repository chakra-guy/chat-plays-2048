import {
  SET_GAME_STATE,
  UPDATE_GAME_STATE,
  SET_GAME_OVER,
  SET_GAME_WON,
} from "./actions"

// TODO status [idle, running, game_over, game_won]

const initialState = {
  grid: [],
  score: 0,
  isGameWon: false,
  isGameOver: false,
}

export default function gridReducer(state = initialState, { type, payload }) {
  switch (type) {
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

    default:
      return state
  }
}
