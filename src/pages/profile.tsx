import { graphql, type HeadFC } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import React from 'react'

import Layout from '../components/layout/layout'
import Meta from '../components/meta/meta'
import { useSiteMetadata } from '../hooks/useSiteMetadata'

interface Props {
  data: Queries.ProfilePageQueryQuery
  location: Location
}

const Profile: React.FC<Props> = ({ location, data }) => {
  const meta = useSiteMetadata()
  const profile = getImage(data.profile?.childImageSharp ?? null)
  return (
    <Layout location={location}>
      <section className="text-center">
        <div className="container">
          {profile && (
            <GatsbyImage
              image={profile}
              alt={meta.author}
              className="rounded-circle"
            />
          )}
          <h1>{meta.author}</h1>
          <p className="lead">Front-end engineer.</p>
          <a
            href={`https://twitter.com/${meta.twitter}`}
            className="twitter-follow-button"
            data-show-count="false"
          >
            Follow @{meta.twitter}
          </a>
        </div>
      </section>
    </Layout>
  )
}

export default Profile

export const Head: HeadFC = () => (
  <Meta title="Profile" description="About the author of Gatstrap." />
)

export const query = graphql`
  query ProfilePageQuery {
    profile: file(name: { eq: "profile" }) {
      childImageSharp {
        gatsbyImageData(width: 120, height: 120, layout: FIXED)
      }
    }
  }
`
