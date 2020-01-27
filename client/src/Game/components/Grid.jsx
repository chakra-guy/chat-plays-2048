/* eslint-disable react/no-array-index-key */
import React from "react"
import PropTypes from "prop-types"

import { GridContainer, Tile } from "../styles"

export default function Grid({ grid }) {
  return (
    <GridContainer>
      {grid.length &&
        grid.map((row, i) => (
          <div key={i}>
            {row.map((cell, j) => (
              <Tile key={`${i}-${j}`}>{cell}</Tile>
            ))}
          </div>
        ))}
    </GridContainer>
  )
}

Grid.propTypes = {
  grid: PropTypes.arrayOf(Array).isRequired,
}
