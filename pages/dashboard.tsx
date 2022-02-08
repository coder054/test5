import { requireAuth } from 'config/firebase-admin'
import { GetServerSideProps, NextApiRequest, NextApiResponse } from 'next'
import { Sidebar } from 'components/Sidebar'
import { vercelImg } from 'imports/images'
import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import { Layout } from 'components/Layout'

const Home = () => {
  return (
    <Layout title="Zporter">
      <div className="text-white ">Dashboard</div>
    </Layout>
  )
}

export default Home

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  await requireAuth(req as NextApiRequest, res as NextApiResponse)
  return { props: {} }
}
