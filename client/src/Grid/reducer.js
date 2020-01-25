import { SET_GRID } from "./actions"

const initialState = {
  grid: [],
  score: 0,
}

export default function gridReducer(state = initialState, { type, payload }) {
  switch (type) {
    case SET_GRID:
      return {
        ...state,
        grid: payload.grid,
        score: payload.score,
      }

    default:
      return state
  }
}
