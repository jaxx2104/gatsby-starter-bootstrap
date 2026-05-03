import React from 'react'

import './style.scss'

interface Props {
  data: Queries.PostByPathQuery
  location: Location
}

const Page: React.FC<Props> = ({ data }) => {
  if (!data.post?.html) return null
  // biome-ignore lint/security/noDangerouslySetInnerHtml: markdown HTML produced server-side by gatsby-transformer-remark
  return <div dangerouslySetInnerHTML={{ __html: data.post.html }} />
}

export default Page
