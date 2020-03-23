import { Grid } from "./Gird"
import { Votes } from "./Votes"

export type GameResponse = {
  game: {
    grid: Grid
    score: number
    stage: string
  }
  gameMode: string
  votingEndsAt: string
  votes: Votes
}
