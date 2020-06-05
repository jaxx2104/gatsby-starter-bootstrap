import React from 'react'

import { PostByPathQuery } from '../../../types/graphql-types'

import './style.scss'

interface Props {
  data: PostByPathQuery
  location: Location
}

const Page: React.FC<Props> = ({ data }: Props) => {
  return data.post?.html ? (
    <div dangerouslySetInnerHTML={{ __html: data.post.html }} />
  ) : (
    <></>
  )
}

export default Page
