import { createAction } from "typesafe-actions"
import { GameResponse } from "./_types/GameResponse"

export const INIT_GAME = "[Game] INIT_GAME"
export const GAME_MOVED = "[Game] GAME_MOVED"
export const GAME_VOTING = "[Game] GAME_VOTING"
export const GAME_RESTARTED = "[Game] GAME_RESTARTED"
export const GAME_MODE_CHANGED = "[Game] GAME_MODE_CHANGED"
export const MAKE_MOVE = "[Game] MAKE_MOVE"
export const RESTART_GAME = "[Game] RESTART_GAME"
export const CHANGE_GAME_MODE = "[Game] CHANGE_GAME_MODE"

export const initializeGame = createAction(INIT_GAME)<GameResponse>()
export const gameMoved = createAction(GAME_MOVED)<GameResponse>()
export const gameVoting = createAction(GAME_VOTING)<GameResponse>()
export const gameRestarted = createAction(GAME_RESTARTED)<GameResponse>()
export const gameModeChanged = createAction(GAME_MODE_CHANGED)<GameResponse>()
export const makeMove = createAction(MAKE_MOVE)<any>()
export const restartGame = createAction(RESTART_GAME)<string>()
export const changeGameMode = createAction(CHANGE_GAME_MODE)<string>()
