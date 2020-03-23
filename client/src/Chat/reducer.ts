import { Reducer } from "redux"

import { UPDATE_ONLINE_USERS, UPDATE_MESSAGE_LIST } from "./actions"
import { ChatState } from "./_types/ChatState"
import { ChatActions } from "./_types/ChatActions"

const initialState: ChatState = {
  onlineUsers: [],
  messages: [],
}

const chatReducer: Reducer<ChatState, ChatActions> = (
  state = initialState,
  { type, payload },
) => {
  switch (type) {
    case UPDATE_ONLINE_USERS:
      return {
        ...state,
        onlineUsers: payload,
      }

    case UPDATE_MESSAGE_LIST:
      return {
        ...state,
        messages: [...state.messages, payload],
      }

    default:
      return state
  }
}

export default chatReducer
