import type { NextPage } from 'next'
import FAQs from 'src/modules/faqs'

const FAQsPage: NextPage = ({ data }: any) => {
  return <FAQs data={data} />
}

export async function getStaticProps() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/faqs`)
  const data = await res.json()
  return { props: { data } }
}

export default FAQsPage
