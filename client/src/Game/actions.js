export const INIT_GAME = "[Game] INIT_GAME"
export const GAME_MOVED = "[Game] GAME_MOVED"
export const GAME_VOTING = "[Game] GAME_VOTING"
export const GAME_RESTARTED = "[Game] GAME_RESTARTED"
export const GAME_MODE_CHANGED = "[Game] GAME_MODE_CHANGED"
export const MAKE_MOVE = "[Game] MAKE_MOVE"
export const RESTART_GAME = "[Game] RESTART_GAME"
export const CHANGE_GAME_MODE = "[Game] CHANGE_GAME_MODE"

export const initializeGame = payload => ({
  type: INIT_GAME,
  payload,
})

export const gameMoved = payload => ({
  type: GAME_MOVED,
  payload,
})

export const gameVoting = payload => ({
  type: GAME_VOTING,
  payload,
})

export const gameRestarted = payload => ({
  type: GAME_RESTARTED,
  payload,
})

export const gameModeChanged = payload => ({
  type: GAME_MODE_CHANGED,
  payload,
})

export const makeMove = payload => ({
  type: MAKE_MOVE,
  payload,
})

export const restartGame = payload => ({
  type: RESTART_GAME,
  payload,
})

export const changeGameMode = payload => ({
  type: CHANGE_GAME_MODE,
  payload,
})
