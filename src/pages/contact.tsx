import { requireAuth } from 'src/config/firebase-admin'

import { Layout } from 'src/components/Layout'

const Contact = () => {
  return (
    <Layout title="Zporter">
      <div className="text-white ">Contact</div>
    </Layout>
  )
}

export default Contact

export const getServerSideProps: any = async ({ req, res }) => {
  await requireAuth(req as any, res as any)
  return { props: {} }
}
