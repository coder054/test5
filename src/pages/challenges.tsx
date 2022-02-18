import { Layout } from 'src/components/Layout'
import { requireAuth } from 'src/config/firebase-admin'

const Challenges = () => {
  return (
    <Layout title="Zporter">
      <div className="text-white ">Challenges</div>
    </Layout>
  )
}

export default Challenges

export const getServerSideProps: any = async ({ req, res }) => {
  await requireAuth(req as any, res as any)
  return { props: {} }
}
