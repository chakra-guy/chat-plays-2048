import convertToStyles from "material-color-hash"

export function getColor(hash: string) {
  return convertToStyles(hash, 900).backgroundColor
}
