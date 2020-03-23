import { createAction } from "typesafe-actions"

import { Message } from "./_types/Message"
import { User } from "./_types/User"

export const SEND_NEW_MESSAGE = "[Chat] SEND_NEW_MESSAGE"
export const UPDATE_MESSAGE_LIST = "[Chat] UPDATE_MESSAGE_LIST"
export const UPDATE_ONLINE_USERS = "[Chat] UPDATE_ONLINE_USERS"

export const sendNewMessage = createAction(SEND_NEW_MESSAGE)<any>()
export const updateMessageList = createAction(UPDATE_MESSAGE_LIST)<Message>()
export const updateOnlineUsers = createAction(UPDATE_ONLINE_USERS)<User[]>()
