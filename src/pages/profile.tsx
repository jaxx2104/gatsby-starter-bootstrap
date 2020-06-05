import { graphql } from 'gatsby'
import Img, { FixedObject } from 'gatsby-image'
import React from 'react'

import { ProfilePageQueryQuery } from '../../types/graphql-types'
import { siteMetadata } from '../../gatsby-config'
import Layout from '../components/layout/layout'
import Meta from '../components/meta/meta'

interface Props {
  data: ProfilePageQueryQuery
  location: Location
}

const Profile: React.FC<Props> = ({ location, data }: Props) => {
  const profile = data.profile?.childImageSharp?.fixed

  return (
    <Layout location={location}>
      <Meta site={siteMetadata} title="Profile" />
      <div>
        <section className="text-center">
          <div className="container">
            <Img fixed={profile as FixedObject} className="rounded-circle" />
            <h1>jaxx2104</h1>
            <p className="lead text-muted">Front-end engineer.</p>
            <div>
              <a
                href="https://twitter.com/jaxx2104"
                className="twitter-follow-button"
                data-show-count="false"
              >
                Follow @jaxx2104
              </a>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  )
}

export default Profile

export const query = graphql`
  query ProfilePageQuery {
    profile: file(name: { eq: "profile" }) {
      childImageSharp {
        fixed(width: 120, height: 120) {
          ...GatsbyImageSharpFixed_withWebp
        }
      }
    }
  }
`
