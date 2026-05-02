import React from 'react'

import './style.scss'

interface Props {
  data: Queries.PostByPathQuery
  location: Location
}

const Page: React.FC<Props> = ({ data }) => {
  if (!data.post?.html) return null
  return <div dangerouslySetInnerHTML={{ __html: data.post.html }} />
}

export default Page
