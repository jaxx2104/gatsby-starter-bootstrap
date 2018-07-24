import React from 'react'

class Adsense extends React.Component {
  componentDidMount() {
    const { clientId } = this.props
    if (clientId) {
      ;(window.adsbygoogle = window.adsbygoogle || []).push({})
    }
  }

  render() {
    const { clientId, slotId, format } = this.props

    return clientId ? (
      <div className="ad">
        <ins
          className="adsbygoogle"
          style={{ display: 'block' }}
          data-ad-client={clientId}
          data-ad-slot={slotId}
          data-ad-format={format}
        />
      </div>
    ) : (
      ''
    )
  }
}
export default Adsense
