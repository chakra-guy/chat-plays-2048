import get from "lodash.get"
import styled from "styled-components"

import TILE_STYLES from "../_common/style_util"

export const PanelContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 160px;
  width: 480px;
  margin: auto;
`

export const ButtonGroup = styled.div`
  width: 100%;
  display: flex;
  align-self: center;
  justify-content: space-between;
`

export const Button = styled.div<{ type: string }>`
  color: #776665;
  width: 180px;
  border: 2px solid #a09c9c;
  margin: 12px 0;
  padding: 12px;
  font-size: 16px;
  background: #e2e1e1;
  font-weight: 600;
  border-radius: 4px;
  cursor: pointer;
  text-align: center;
`

export const PanelText = styled.div`
  display: flex;
  font-size: 20px;
  font-weight: 500;
  margin-bottom: 12px;
  text-transform: capitalize;
  justify-content: space-between;
`

export const VotesText = styled.div`
  opacity: 0.5;
  font-size: 15px;
  margin-top: 2px;
`

export const ModalContent = styled.div`
  text-align: center;
  font-size: 32px;
  font-weight: 900;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24px 36px;
`

export const GridContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 480px;
  width: 480px;
  margin: auto;
  padding: 4px;
  border-radius: 8px;
  background-color: #baa;
`

export const Tile = styled.div<{ value: number }>`
  display: inline-block;
  position: relative;
  height: 72px;
  width: 72px;
  margin: 4px;
  border-radius: 8px;
  font-weight: bold;
  text-align: center;
  vertical-align: middle;
  font-size: ${p => get(TILE_STYLES, [p.value, "size"])};
  color: ${p => get(TILE_STYLES, [p.value, "color"])};
  background: ${p => get(TILE_STYLES, [p.value, "bg"])};
`

export const TileInside = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`
