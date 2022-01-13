import { ItemEventHeadline } from 'components/item-event-headline'
import { Layout } from 'components/Layout'
import { Select } from 'components/select'
import { ItemEventHeadlines } from 'constants/item-event-headline'

const Test = () => {
  return (
    <Layout>
      {/* <div className="text-white ">Test</div> */}
      <Select />
      <ItemEventHeadline className="w-full" item={ItemEventHeadlines} />
    </Layout>
  )
}

export default Test
