export const SET_GAME_STATE = "[Grid] SET_GAME_STATE"
export const UPDATE_GAME_STATE = "[Grid] UPDATE_GAME_STATE"
export const SET_GAME_OVER = "[Grid] SET_GAME_OVER"
export const SET_GAME_WON = "[Grid] SET_GAME_WON"
export const MAKE_MOVE = "[Grid] MAKE_MOVE"
export const RESTART_GAME = "[Grid] RESTART_GAME"
export const CHANGE_GAME_MODE = "[Grid] CHANGE_GAME_MODE"
export const UPDATE_ACTIVE_USERS = "[Grid] UPDATE_ACTIVE_USERS"

export const setGameState = payload => ({
  type: SET_GAME_STATE,
  payload,
})

export const updateGameState = payload => ({
  type: UPDATE_GAME_STATE,
  payload,
})

export const setGameOver = payload => ({
  type: SET_GAME_OVER,
  payload,
})

export const setGameWon = payload => ({
  type: SET_GAME_WON,
  payload,
})

export const makeMove = payload => ({
  type: MAKE_MOVE,
  payload,
})

export const restartGame = () => ({
  type: RESTART_GAME,
})

export const changeGameMode = payload => ({
  type: CHANGE_GAME_MODE,
  payload,
})

export const updateActiveUsers = payload => ({
  type: UPDATE_ACTIVE_USERS,
  payload,
})
