import type { NextPage } from 'next'
import FAQs from 'src/modules/support/faqs'
import SupportLayout from 'src/modules/support/components/SupportLayout'

const FAQsPage: NextPage = ({ data }: any) => {
  return (
    <SupportLayout>
      <FAQs data={data} />
    </SupportLayout>
  )
}

export async function getStaticProps() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/faqs`)
  const data = await res.json()
  return { props: { data } }
}

export default FAQsPage
