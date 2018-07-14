import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import fontawesome from '@fortawesome/fontawesome'
import React from 'react'

import faHtml5 from '@fortawesome/fontawesome-free-brands/faHtml5'
import faNode from '@fortawesome/fontawesome-free-brands/faNode'
import faPhp from '@fortawesome/fontawesome-free-brands/faPhp'
import faJs from '@fortawesome/fontawesome-free-brands/faJs'
import faAws from '@fortawesome/fontawesome-free-brands/faAws'
import faVuejs from '@fortawesome/fontawesome-free-brands/faVuejs'
import faReact from '@fortawesome/fontawesome-free-brands/faReact'
import faTwitter from '@fortawesome/fontawesome-free-brands/faTwitter'
import faFacebook from '@fortawesome/fontawesome-free-brands/faFacebook'
import faGithub from '@fortawesome/fontawesome-free-brands/faGithub'
import faApple from '@fortawesome/fontawesome-free-brands/faApple'
import './style.scss'

fontawesome.library.add(
  faAws,
  faApple,
  faPhp,
  faHtml5,
  faJs,
  faReact,
  faVuejs,
  faTwitter,
  faFacebook,
  faGithub,
  faNode
)

const Icon = ({ name }) => (
  <div className="icon" title={name}>
    <FontAwesomeIcon icon={['fab', name]} />
  </div>
)

export default Icon
