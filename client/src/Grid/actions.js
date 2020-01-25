export const SET_GRID = "[Grid] SET_GRID"
export const MOVE_UP = "[Grid] MOVE_UP"

export const setGrid = payload => ({
  type: SET_GRID,
  payload,
})

export const moveUp = () => ({
  type: MOVE_UP,
})
