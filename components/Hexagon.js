import { HoneycombContext } from '../lib/helpers'
import { useContext } from 'react'

const Hexagon = ({ children, className, style = {} }) => {
  const { gap } = useContext(HoneycombContext)
  const clipPath = `polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)`
  return (
    <div
      className={className}
      style={{
        ...style,
        position: 'absolute',
        top: gap / 2,
        left: gap / 2,
        right: gap / 2,
        bottom: gap / 2,
        clipPath,
        pointerEvents: 'auto',
      }}
    >
      {children}
    </div>
  )
}

export default Hexagon
