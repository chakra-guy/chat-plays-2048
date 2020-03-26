// Since the grid tile positions are always the same
// eslint can be safely disabled here
/* eslint-disable react/no-array-index-key */
import React from "react"

import { GridContainer, Tile, TileInside } from "../styles"
import { Grid } from "../_types/Gird"

type Props = {
  grid: Grid
}

export default function GridComponent({ grid }: Props) {
  return (
    <GridContainer data-testid="grid">
      {grid.length &&
        grid.map((row, i) => (
          <div key={i}>
            {row.map((value, j) => (
              <Tile key={`${i}-${j}`} value={value}>
                <TileInside>{value}</TileInside>
              </Tile>
            ))}
          </div>
        ))}
    </GridContainer>
  )
}
