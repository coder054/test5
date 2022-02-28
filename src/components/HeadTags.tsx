import Head from 'next/head'
import { NextSeo } from 'next-seo'

export const HeadTags = ({
  title,
  description,
  keywords,
  image,
  url,
}: {
  title: string
  description: string
  keywords: string
  image: string
  url: string
}) => {
  return (
    <NextSeo
      title={title}
      description={description}
      // canonical="https://www.canonical.ie/"
      openGraph={{
        type: 'website',
        url: url,
        title: title,
        description,
        images: [
          {
            url:
              image ||
              'https://images.unsplash.com/photo-1645877409345-0389b63d382d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzOXx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60',
            width: 1200,
            height: 675,
            alt: title,
            // type: 'image/jpeg',
          },
        ],
        site_name: 'SiteName',
      }}
      twitter={{
        handle: '@handle',
        site: '@site',
        cardType: 'summary_large_image',
      }}
    />
  )
  return (
    <Head>
      <title>{title}</title>
      <meta name="viewport" content="initial-scale=1, width=device-width" />
      <meta name="keywords" content="zporter" />
      <meta name="robots" content="index, follow" />
      <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="1 days" />
      <meta name="author" content="Zporter" />
      <meta name="title" content={title} />
      <meta name="description" content="description" />
      <meta name="keywords" content="tech, javascript, reactjs" />
      <meta name="robots" content="index, follow" />
      <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="1 days" />
      <meta name="author" content="Zporter" />
      <meta property="og:image" content={image} />

      <meta property="og:title" content={title} />

      <meta
        property="og:description"
        content="A full description of the page."
      />

      <meta property="og:image:width" content="1200" />

      <meta property="og:image:height" content="675" />
    </Head>
  )
}
