import styled from "styled-components"
import STYLE_FOR_VALUE from "../_common/style_util"

export const PanelContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 160px;
  width: 480px;
  margin: auto;
`

export const ModalContent = styled.div`
  height: 160px;
  width: 360px;
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

export const Tile = styled.div`
  display: inline-block;
  position: relative;
  height: 72px;
  width: 72px;
  margin: 4px;
  border-radius: 8px;
  font-weight: bold;
  text-align: center;
  vertical-align: middle;

  font-size: ${p => STYLE_FOR_VALUE[p.value].size};
  color: ${p => STYLE_FOR_VALUE[p.value].color};
  background: ${p => STYLE_FOR_VALUE[p.value].bg};
`

export const TileInside = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`
