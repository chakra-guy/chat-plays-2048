import { User } from "./User"
import { Message } from "./Message"

export type ChatState = {
  readonly onlineUsers: User[]
  readonly messages: Message[]
}
