import Honeycomb from '../components/Honeycomb'
import Hexagon from '../components/Hexagon'
import styles from '../styles/Home.module.css'

const sideLength = 52
const hexClick = item => {
  console.log(`coord: q${item.Q}, r${item.R}, s${item.S} type: ${item.Type}`)
}

export async function getServerSideProps() {
  const columns = 8
  const req = {
    columns: columns,
    rows: 8,
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
                src={`https://picsum.photos/${sideLength * 2}?random=${
                  item.Type
                }`}
                alt={`Random #${item}`}
              />
            </Hexagon>
          )}
        />
      </main>
    </div>
  )
}
