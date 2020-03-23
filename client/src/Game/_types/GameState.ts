import { Grid } from "./Gird"
import { Votes } from "./Votes"

export type GameState = {
  readonly userVoted: boolean
  readonly grid: Grid
  readonly score: number
  readonly stage: string
  readonly gameMode?: string
  readonly votingEndsAt?: string
  readonly votes: Votes
}
