import { Dispatch } from "redux"
import { Presence, Channel } from "phoenix"

import {
  initializeGame,
  gameMoved,
  gameVoting,
  gameRestarted,
  gameModeChanged,
} from "../Game/actions"
import { updateMessageList, updateOnlineUsers } from "../Chat/actions"
import { GameResponse } from "../Game/_types/GameResponse"
import { Message } from "../Chat/_types/Message"

export function handleGameChannelMessages(game: Channel, dispatch: Dispatch) {
  game.on("game:init", (response: GameResponse) => {
    dispatch(initializeGame(response))
  })
  game.on("game:moved", (response: GameResponse) => {
    dispatch(gameMoved(response))
  })
  game.on("game:voting", (response: GameResponse) => {
    dispatch(gameVoting(response))
  })
  game.on("game:restarted", (response: GameResponse) => {
    dispatch(gameRestarted(response))
  })
  game.on("game:game_mode_changed", (response: GameResponse) => {
    dispatch(gameModeChanged(response))
  })
}

export function handleChatChannelMessages(chat: Channel, dispatch: Dispatch) {
  let presences = {}

  chat.on("chat:new_msg", (response: Message) => {
    dispatch(updateMessageList(response))
  })
  chat.on("presence_state", (response: any) => {
    presences = Presence.syncState(presences, response)
    const onlineUsers = Presence.list(presences).map(p => p.metas[0])
    dispatch(updateOnlineUsers(onlineUsers))
  })
  chat.on("presence_diff", (response: any) => {
    presences = Presence.syncDiff(presences, response)
    const onlineUsers = Presence.list(presences).map(p => p.metas[0])
    dispatch(updateOnlineUsers(onlineUsers))
  })
}
