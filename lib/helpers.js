import { createContext } from 'react'

export const HoneycombContext = createContext({ gap: 0 })

export function getGridColumnsCount(hexagonSide, containerWidth) {
  const hexagonWidth = Math.sqrt(3) * hexagonSide
  return Math.floor(containerWidth / hexagonWidth)
}

export function getRowSize(hexagonSide) {
  return hexagonSide / 2
}

export function getColumnSize(hexagonSide) {
  return (Math.sqrt(3) * hexagonSide) / 4
}
