import React, { useEffect } from 'react'
import './style.scss'

interface Props {
  clientId?: string | null
  slotId: string
  format: string
}

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    adsbygoogle: any
  }
}

const Adsense: React.FC<Props> = ({ clientId, slotId, format }: Props) => {
  useEffect(() => {
    if (clientId) {
      window.adsbygoogle = (window.adsbygoogle || []).push({})
    }
  }, [clientId])

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
    <></>
  )
}

export default Adsense
