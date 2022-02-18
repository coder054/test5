import Head from 'next/head'

export const HeadTags = ({
  title,
  description,
  keywords,
}: {
  title: string
  description: string
  keywords: string
}) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content="blog about tech" />
      <meta name="keywords" content="tech, javascript, reactjs" />
      <meta name="robots" content="index, follow" />
      <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="1 days" />
      <meta name="author" content="Zporter" />
    </Head>
  )
}
