import { Grid } from "./Gird"
import { Votes } from "./Votes"

export type GameState = {
  userVoted: boolean
  grid: Grid
  score: number
  stage: string
  gameMode?: string
  votingEndsAt?: string
  votes: Votes
}
