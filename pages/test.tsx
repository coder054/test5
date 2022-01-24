import { Button } from 'components'
import { ItemEventHeadline } from 'components/item-event-headline'
import { Layout } from 'components/Layout'
import { Select } from 'components/select'
import { ItemEventHeadlines } from 'constants/item-event-headline'
import { useAuth } from 'module/authen/auth/AuthContext'

const Test = () => {
  const { signout } = useAuth()
  const handleSignOut = async () => {
    await signout()
  }
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
      <Button
        text="Logout"
        onClick={handleSignOut}
        className="text-[#FFFFFF]"
      ></Button>
    </Layout>
  )
}

export default Test
