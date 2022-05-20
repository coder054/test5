import type { NextPage } from 'next'
import parse from 'html-react-parser'
import SupportLayout from 'src/modules/support/components/SupportLayout'

const PrivacyPage: NextPage = ({ data }: any) => {
  const HTML_STRING = data.content

  return (
    <SupportLayout title="Privacy Rules">
      <div className="my-6">{parse(HTML_STRING)}</div>
    </SupportLayout>
  )
}

export async function getStaticProps() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/privacy-rules`
  )
  const data = await res.json()
  return { props: { data } }
}

export default PrivacyPage
