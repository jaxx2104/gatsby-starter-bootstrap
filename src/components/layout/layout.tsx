import React from 'react'
import { useSiteMetadata } from '../../hooks/useSiteMetadata'
import Footer from '../footer/footer'
import Navibar from '../navibar/navibar'

import 'scss/gatstrap.scss'

interface Props {
  children?: React.ReactNode
  location: Location
}

const Layout: React.FC<Props> = ({ children, location }) => {
  const meta = useSiteMetadata()
  return (
    <>
      <Navibar title={meta.title} location={location} />
      <main>{children}</main>
      <Footer title={meta.title} author={meta.author} />
    </>
  )
}

export default Layout
