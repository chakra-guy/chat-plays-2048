const initialState = {
  onlineUsers: [],
  messages: [],
}

export default function chatReducer(state = initialState, { type, payload }) {
  switch (type) {
    case "UPDATE_ONLINE_USERS":
      return {
        ...state,
        onlineUsers: payload,
      }

    case "UPDATE_MESSAGE_LIST":
      return {
        ...state,
        messages: [...state.messages, payload],
      }

    default:
      return state
  }
}
