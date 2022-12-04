import { getColumnSize, getRowSize, HoneycombContext } from '../lib/helpers'
import { forwardRef } from 'react'
import HoneycombCell from './HoneycombCell'

const Honeycomb = forwardRef(
  ({ items, renderItem, size, columns, className, gap = 4 }, ref) => {
    const rowSize = getRowSize(size)
    const columnSize = getColumnSize(size)

    return (
      <HoneycombContext.Provider value={{ gap }}>
        <ul
          ref={ref}
          className={className}
          style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${columns * 4}, ${columnSize}px)`,
            justifyContent: 'center',
            gridAutoRows: `${rowSize}px`,
            padding: `0 ${columnSize}px`,
            listStyle: 'none',
          }}
        >
          {items.map((item, index) => {
            const row = 1 + Math.floor(index / columns) * 3
            const column = 1 + (index % columns) * 4
            const renderedItem = renderItem(item, index)

            return (
              <HoneycombCell
                key={index}
                row={row}
                column={column}
              >
                {renderedItem}
              </HoneycombCell>
            )
          })}
        </ul>
      </HoneycombContext.Provider>
    )
  }
)

export default Honeycomb
