import React from 'react'

export interface MetaProps {
  title?: string
  description?: string
  siteUrl?: string
  twitter?: string
  ogImagePath?: string
}

export const Meta: React.FC<MetaProps> = ({
  title,
  description,
  siteUrl,
  twitter,
  ogImagePath = '/og-image.png',
}) => {
  const ogUrl = siteUrl ? `${siteUrl}${ogImagePath}` : ogImagePath
  return (
    <>
      <title>{title}</title>
      {description && <meta name="description" content={description} />}
      <meta name="twitter:card" content="summary_large_image" />
      {twitter && <meta name="twitter:site" content={`@${twitter}`} />}
      <meta property="og:title" content={title} />
      <meta property="og:type" content="website" />
      {description && <meta property="og:description" content={description} />}
      {siteUrl && <meta property="og:url" content={siteUrl} />}
      <meta property="og:image" content={ogUrl} />
    </>
  )
}

export default Meta
