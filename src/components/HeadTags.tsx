import Head from 'next/head'
import { useRouter } from 'next/router'

export const HeadTags = ({
  title,
  description,
  keywords,
  image,
}: {
  title: string
  description: string
  keywords: string
  image?: string
}) => {
  const router = useRouter()

  const url = `${process.env.NEXT_PUBLIC_DOMAIN_NAME}/${router.asPath}`
  const img = image || `${process.env.NEXT_PUBLIC_DOMAIN_NAME}/zporter-og.png`

  return (
    <Head>
      <title>{title}</title>
      <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
      <meta name="viewport" content="initial-scale=1, width=device-width" />
      <meta name="robots" content="index, follow" />
      <meta name="revisit-after" content="1 days" />
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="keywords" content="zporter" />
      <meta name="language" content="English" />
      <meta name="author" content="Zporter" />
      <meta property="og:image" content={img} />
      <meta property="og:title" content={title} />
      <meta property="og:type" content="website" />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="675" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta property="twitter:domain" content={url} />
      <meta property="twitter:url" content={url} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={img} />
    </Head>
  )
}
