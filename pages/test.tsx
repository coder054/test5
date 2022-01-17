import { ItemEventHeadline } from 'components/item-event-headline'
import { Layout } from 'components/Layout'
import { Select } from 'components/select'
import { ItemEventHeadlines } from 'constants/item-event-headline'

const Test = () => {
  return (
    <Layout>
      {/* <div className="text-white ">Test</div> */}
      <ItemEventHeadline className="w-full" item={ItemEventHeadlines} />
      <div className="mt-4">
        <Select
          className=""
          defaultValue={'3'}
          options={[
            { title: 'item 1', value: '1' },
            { title: 'item 2', value: '2' },
            { title: 'item 3', value: '3' },
            { title: 'item 4', value: '4' },
          ]}
        />
      </div>
    </Layout>
  )
}

export default Test
