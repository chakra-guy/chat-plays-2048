export const SET_GAME_STATE = "[Grid] SET_GAME_STATE"
export const MAKE_MOVE = "[Grid] MAKE_MOVE"

export const setGameState = payload => ({
  type: SET_GAME_STATE,
  payload,
})

export const makeMove = payload => ({
  type: MAKE_MOVE,
  payload,
})
