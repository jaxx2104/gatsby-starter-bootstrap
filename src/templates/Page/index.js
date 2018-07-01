import React from 'react'
import './style.scss'

const Page = ({ data }) => (
  <div dangerouslySetInnerHTML={{ __html: data.post.html }} />
)
export default Page
