import ResizeObserver from 'resize-observer-polyfill'
import { useRef, useState, useEffect } from 'react'

import Honeycomb from './Honeycomb'
import { getGridColumnsCount } from '../lib/helpers'

const ResponsiveHoneycomb = ({
  children,
  size,
  defaultWidth,
  ...restProps
}) => {
  const containerRef = useRef < HTMLUListElement > null
  const [columns, setColumns] = useState(
    getGridColumnsCount(size, defaultWidth)
  )

  useEffect(() => {
    const observer = new ResizeObserver(entries => {
      for (let entry of entries) {
        setColumns(getGridColumnsCount(size, entry.contentRect.width))
      }
    })

    setColumns(
      getGridColumnsCount(
        size,
        containerRef.current?.clientWidth ?? defaultWidth
      )
    )

    if (containerRef.current == null) return

    const target = containerRef.current
    observer.observe(target)
    return () => observer.unobserve(target)
  }, [size])

  return (
    <Honeycomb
      ref={containerRef}
      size={size}
      {...restProps}
      columns={columns}
    />
  )
}

export default ResponsiveHoneycomb
