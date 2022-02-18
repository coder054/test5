import { requireAuth } from 'src/config/firebase-admin'

import { Layout } from 'src/components/Layout'

const Programs = () => {
  return (
    <Layout title="Zporter">
      <div className="text-white ">Programs</div>
    </Layout>
  )
}

export default Programs

export const getServerSideProps: any = async ({ req, res }) => {
  await requireAuth(req as any, res as any)
  return { props: {} }
}
