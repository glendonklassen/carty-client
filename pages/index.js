import Head from 'next/head'
import Honeycomb from '../components/Honeycomb'
import Hexagon from '../components/Hexagon'
import styles from '../styles/Home.module.css'
import Link from 'next/link'

const sideLength = 64
const hexClick = item => {
  console.log(`coord: q${item.Q}, r${item.R}, s${item.S} type: ${item.Type}`)
}

export async function getServerSideProps() {
  const columns = 5
  const req = {
    columns: columns,
    rows: 5,
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
      <Head>
        <title>Carty Renderer</title>
        <Link
          rel="icon"
          href="/favicon.ico"
        />
      </Head>

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
