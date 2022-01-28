import { Layout } from 'components/Layout'
import { getCookieFromReq } from 'hooks/functionCommon'
import { GetServerSideProps } from 'next'

const Support = () => {
  return (
    <Layout title="Zporter">
      <div className="text-white ">Support</div>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  return {
    props: {},
  }
}

export default Support
