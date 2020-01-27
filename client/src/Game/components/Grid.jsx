// Since the grid tile positions are always the same
// eslint can be safely disabled here
/* eslint-disable react/no-array-index-key */
import React from "react"
import PropTypes from "prop-types"

import { GridContainer, Tile, TileInside } from "../styles"

export default function Grid({ grid }) {
  return (
    <GridContainer>
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

Grid.propTypes = {
  grid: PropTypes.arrayOf(Array).isRequired,
}
