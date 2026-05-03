import { graphql, useStaticQuery } from 'gatsby'

export interface SiteMetadata {
  title: string
  description: string
  siteUrl: string
  author: string
  twitter: string
}

export const useSiteMetadata = (): SiteMetadata => {
  const data = useStaticQuery(graphql`
    query SiteMetadataQuery {
      site {
        siteMetadata {
          title
          description
          siteUrl
          author
          twitter
        }
      }
    }
  `)
  return data.site.siteMetadata as SiteMetadata
}
