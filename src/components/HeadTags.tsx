import Head from 'next/head'

export const HeadTags = ({
  title,
  description,
  keywords,
  image,
}: {
  title: string
  description: string
  keywords: string
  image: string
}) => {
  return (
    <Head>
      <title>{title}</title>
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
