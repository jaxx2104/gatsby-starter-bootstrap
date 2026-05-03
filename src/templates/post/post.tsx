import { Link } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import React from 'react'
import Badge from '../../components/badge/badge'
import Button from '../../components/button/button'

import './style.scss'

const splitOnMore = (html: string): string => {
  if (html.includes('<!--more-->')) {
    const [head] = html.split('<!--more-->')
    return head ?? html
  }
  return html
}

interface Props {
  data: Queries.PostByPathQuery
  options: {
    isIndex: boolean
  }
}

const Post: React.FC<Props> = ({ data, options }) => {
  const frontmatter = data.post?.frontmatter
  const path = frontmatter?.path ?? ''
  const html = data.post?.html ?? ''
  const isMore = options.isIndex && html.includes('<!--more-->')
  const image = getImage(frontmatter?.image?.childImageSharp ?? null)

  return (
    <article className="article" key={path}>
      <div className="container">
        <header className="info">
          <Link style={{ boxShadow: 'none' }} to={path}>
            <h1>{frontmatter?.title}</h1>
            {frontmatter?.date && (
              <time dateTime={frontmatter.date}>{frontmatter.date}</time>
            )}
          </Link>
          {frontmatter?.category && (
            <Badge label={frontmatter.category} primary />
          )}
          {(frontmatter?.tags ?? []).map((tag, index) =>
            tag ? (
              // biome-ignore lint/suspicious/noArrayIndexKey: tag list is fixed for the lifetime of a post and not reordered
              <Badge label={tag} primary={false} key={index} />
            ) : null
          )}
        </header>
        <div className="content">
          {frontmatter?.description && <p>{frontmatter.description}</p>}
          {image && (
            <GatsbyImage
              image={image}
              alt={frontmatter?.title ?? ''}
              style={{ display: 'block', margin: '0 auto' }}
            />
          )}
        </div>
        <div
          className="content"
          // biome-ignore lint/security/noDangerouslySetInnerHtml: markdown HTML produced server-side by gatsby-transformer-remark
          dangerouslySetInnerHTML={{
            __html: isMore ? splitOnMore(html) : html,
          }}
        />
        {isMore && (
          <Button
            path={path}
            label="Read more"
            visuallyHiddenSuffix={`about ${frontmatter?.title ?? 'this post'}`}
            primary
          />
        )}
      </div>
    </article>
  )
}

export default Post
