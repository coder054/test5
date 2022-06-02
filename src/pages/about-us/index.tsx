import type { NextPage } from 'next'
import AboutUs from 'src/modules/support/about-us'
import SupportLayout from 'src/modules/support/components/SupportLayout'

const FAQsPage: NextPage = ({ data }: any) => {
  return (
    <SupportLayout>
      <AboutUs />
    </SupportLayout>
  )
}

export default FAQsPage
