import { Reducer } from "redux"

import {
  INIT_GAME,
  GAME_MOVED,
  GAME_VOTING,
  GAME_RESTARTED,
  GAME_MODE_CHANGED,
  MAKE_MOVE,
} from "./actions"
import GAME_MODE from "../_common/gameModeConstants"
import { GameState } from "./_types/GameState"
import { GameActions } from "./_types/GameActions"

const { DEMOCRACY } = GAME_MODE

const emptyGrid = Array(6)
  .fill(0)
  .map(() => Array(6).fill(0))

const initialState: GameState = {
  userVoted: false,
  grid: emptyGrid,
  score: 0,
  stage: "running",
  gameMode: undefined,
  votingEndsAt: undefined,
  votes: {},
}

const gameReducer: Reducer<GameState, GameActions> = (
  state = initialState,
  { type, payload },
) => {
  switch (type) {
    case INIT_GAME:
    case GAME_MOVED:
    case GAME_RESTARTED:
    case GAME_MODE_CHANGED:
      return {
        ...state,
        userVoted: false,
        grid: payload.game.grid,
        score: payload.game.score,
        stage: payload.game.stage,
        gameMode: payload.game_mode,
        votingEndsAt: payload.voting_ends_at,
        votes: payload.votes,
      }

    case GAME_VOTING:
      return {
        ...state,
        grid: payload.game.grid,
        score: payload.game.score,
        stage: payload.game.stage,
        gameMode: payload.game_mode,
        votingEndsAt: payload.voting_ends_at,
        votes: payload.votes,
      }

    case MAKE_MOVE:
      return {
        ...state,
        userVoted: state.gameMode === DEMOCRACY,
      }

    default:
      return state
  }
}

export default gameReducer
