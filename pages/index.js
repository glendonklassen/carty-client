import Honeycomb from '../components/Honeycomb'
import Hexagon from '../components/Hexagon'
import styles from '../styles/Home.module.css'
import { useEffect, useState } from 'react'

const sideLength = 52
const hexClick = item => {
  console.log(
    `coord: q${item.location.q}, r${item.location.R}, s${item.location.S} type: ${item.terrainType}`
  )
}

export async function getServerSideProps() {
  const columns = 6
  const req = {
    columns: columns,
    rows: 6,
  }
  const res = await fetch(process.env.CARTY_URL, {
    headers: {
      'Ocp-Apim-Subscription-Key': process.env.CARTY_SUBSCRIPTION_KEY,
      'x-api-version': process.env.CARTY_API_VERSION,
    },
    method: 'POST',
    body: JSON.stringify(req),
  })
  const gridItems = await res.json()
  return { props: { gridItems, columns } }
}

export default function Home(props) {
  const { gridItems, columns } = props
  const [mouseEntered, setMouseEntered] = useState(-1)
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <Honeycomb
          columns={columns}
          size={sideLength}
          items={gridItems}
          renderItem={(item, index) => (
            <Hexagon>
              <img
                onClick={() => hexClick(item, index)}
                onMouseEnter={() => setMouseEntered(index)}
                src={`https://picsum.photos/${sideLength * 2}?random=${
                  item.terrainType
                }&blur=1`}
                style={{
                  opacity: mouseEntered == index ? 1 : 0.9,
                }}
                alt={`Random #${item}`}
              />
            </Hexagon>
          )}
        />
      </main>
    </div>
  )
}
