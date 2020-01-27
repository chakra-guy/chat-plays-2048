export const SEND_NEW_MESSAGE = "[Chat] SEND_NEW_MESSAGE"
export const UPDATE_MESSAGE_LIST = "[Chat] UPDATE_MESSAGE_LIST"
export const UPDATE_ONLINE_USERS = "[Chat] UPDATE_ONLINE_USERS"

export const sendNewMessage = payload => ({
  type: SEND_NEW_MESSAGE,
  payload,
})

export const updateMessageList = payload => ({
  type: UPDATE_MESSAGE_LIST,
  payload,
})

export const updateOnlineUsers = payload => ({
  type: UPDATE_ONLINE_USERS,
  payload,
})
