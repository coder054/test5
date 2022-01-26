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
  // const cookie = req.headers.cookie
  // const { cookies } = req
  // let token
  // if (cookie) {
  //   token = getCookieFromReq(cookie, 'token') || cookies.token
  // }
  // if (!token) {
  //   return {
  //     redirect: {
  //       permanent: true,
  //       destination: '/signin',
  //     },
  //   }
  // }
  return {
    props: {},
  }
}

export default Support
