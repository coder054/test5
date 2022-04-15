import { Button } from 'src/components'
import { ItemEventHeadline } from 'src/components/item-event-headline'
import { Layout } from 'src/components/Layout'
import { Select } from 'src/components/select'
import { ItemEventHeadlines } from 'src/constants/item-event-headline'
import { useAuth } from 'src/modules/authentication/auth/AuthContext'

const Test = () => {
  const { signout } = useAuth()
  const handleSignOut = async () => {
    await signout()
  }
  return (
    <Layout title="Zporter">
      {/* <div className="text-white ">Test</div> */}
      <ItemEventHeadline className="w-full" item={ItemEventHeadlines} />
      <div className="mt-4">
        <Select
          className=""
          defaultValue={'3'}
          options={[
            { label: 'item 1', value: '1' },
            { label: 'item 2', value: '2' },
            { label: 'item 3', value: '3' },
            { label: 'item 4', value: '4' },
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
