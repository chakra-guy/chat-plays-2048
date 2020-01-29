import reducer from "../reducer"
import {
  INIT_GAME,
  GAME_MOVED,
  GAME_RESTARTED,
  GAME_MODE_CHANGED,
  GAME_VOTING,
  MAKE_MOVE,
} from "../actions"

describe("chatReducer", () => {
  let existingState

  beforeEach(() => {
    const emptyGrid = Array(6)
      .fill(0)
      .map(() => Array(6).fill(0))

    existingState = {
      userVoted: true,
      grid: emptyGrid,
      score: 1234,
      stage: "running",
      gameMode: "democracy",
      votingEndsAt: null,
      votes: { up: 0, down: 1, right: 0, left: 0 },
    }
  })

  it("returns with existing state when type is unrecognized", () => {
    const state = reducer(existingState, { type: "OTHER_ACTION" })
    expect(state).toEqual(existingState)
  })

  it.each`
    type
    ${INIT_GAME}
    ${GAME_MOVED}
    ${GAME_RESTARTED}
    ${GAME_MODE_CHANGED}
  `(
    "returns with a new game state and resets `userVoted` flag when action is $type",
    ({ type }) => {
      const action = {
        type,
        payload: {
          game: {
            grid: [],
            score: 1234,
            stage: "running",
          },
          game_mode: "anarchy",
          voting_ends_at: null,
          votes: { up: 0, down: 0, right: 0, left: 0 },
        },
      }

      const state = reducer(existingState, action)

      expect(state).toEqual({
        userVoted: false,
        grid: [],
        score: 1234,
        stage: "running",
        gameMode: "anarchy",
        votingEndsAt: null,
        votes: { down: 0, left: 0, right: 0, up: 0 },
      })
    },
  )

  it("returns with a new game state but does not resets `userVoted` flag when action is GAME_VOTING", () => {
    const action = {
      type: GAME_VOTING,
      payload: {
        game: {
          grid: [],
          score: 1234,
          stage: "running",
        },
        game_mode: "anarchy",
        voting_ends_at: null,
        votes: { up: 0, down: 0, right: 0, left: 0 },
      },
    }

    const state = reducer(existingState, action)

    expect(state).toEqual({
      userVoted: true,
      grid: [],
      score: 1234,
      stage: "running",
      gameMode: "anarchy",
      votingEndsAt: null,
      votes: { down: 0, left: 0, right: 0, up: 0 },
    })
  })

  it("sets the `userVoted` flag based on the current game mode when action is MAKE_MOVE", () => {
    const action = {
      type: MAKE_MOVE,
    }

    const state = reducer(existingState, action)

    expect(state).toEqual({
      ...existingState,
      gameMode: "democracy",
    })
  })
})
