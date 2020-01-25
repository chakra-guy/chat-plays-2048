import { FETCH_TEST } from "./actions"

const initialState = {
  count: 0,
}

export default function gridReducer(state = initialState, { type, payload }) {
  switch (type) {
    case FETCH_TEST:
      return { ...state, count: state.count + 1 }

    default:
      return state
  }
}
