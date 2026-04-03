'use client'

import { useEffect, useRef } from 'react'

export type AdFormat =
  | 'auto'
  | 'rectangle'
  | 'leaderboard'
  | 'skyscraper'
  | 'sidebar'
  | 'responsive'
  | 'header'
  | 'in-article'
  | 'footer'
  | 'in-feed'

interface AdSenseSlotProps {
  slot: string
  format?: AdFormat
  className?: string
  style?: React.CSSProperties
}

// Ad slot dimensions mapping
const adDimensions: Record<AdFormat, { width: number; height: number; minHeight: string }> = {
  'auto': { width: 0, height: 0, minHeight: '250px' },
  'rectangle': { width: 300, height: 250, minHeight: '250px' },
  'leaderboard': { width: 728, height: 90, minHeight: '90px' },
  'skyscraper': { width: 160, height: 600, minHeight: '600px' },
  'sidebar': { width: 300, height: 600, minHeight: '600px' },
  'responsive': { width: 0, height: 0, minHeight: '250px' },
  'header': { width: 728, height: 90, minHeight: '90px' },
  'in-article': { width: 0, height: 0, minHeight: '280px' },
  'footer': { width: 728, height: 90, minHeight: '90px' },
  'in-feed': { width: 0, height: 0, minHeight: '400px' },
}

export default function AdSenseSlot({
  slot,
  format = 'auto',
  className = '',
  style = {}
}: AdSenseSlotProps) {
  const adRef = useRef<HTMLDivElement>(null)
  const isInitialized = useRef(false)

  useEffect(() => {
    if (isInitialized.current) return
    isInitialized.current = true

    // Initialize AdSense ad
    const initAd = () => {
      try {
        const adsbygoogle = (window as any).adsbygoogle
        if (adsbygoogle) {
          adsbygoogle.push({})
        }
      } catch (e) {
        console.error('AdSense initialization error:', e)
      }
    }

    // Load AdSense script if not already loaded
    if (!document.querySelector('script[data-adsense]')) {
      const script = document.createElement('script')
      script.async = true
      script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js'
      script.setAttribute('data-adsense', 'true')
      script.crossOrigin = 'anonymous'
      // Uncomment when you have your publisher ID:
      // script.dataset.adClient = 'ca-pub-XXXXXXXXXXXXXXXX'

      script.onload = initAd
      document.head.appendChild(script)
    } else {
      // Script exists, just initialize
      initAd()
    }
  }, [slot])

  const dimensions = adDimensions[format]

  const getFormatLabel = () => {
    const labels: Record<AdFormat, string> = {
      'auto': 'Responsive Ad',
      'rectangle': '300×250 Medium Rectangle',
      'leaderboard': '728×90 Leaderboard',
      'skyscraper': '160×600 Skyscraper',
      'sidebar': '300×600 Half Page',
      'responsive': 'Responsive Ad',
      'header': '728×90 Header Banner',
      'in-article': 'In-Article Ad',
      'footer': '728×90 Footer Banner',
      'in-feed': 'In-Feed Native Ad',
    }
    return labels[format]
  }

  return (
    <div className={`my-6 ${className}`}>
      {/* Ad Label */}
      <div className="flex items-center gap-3 mb-2">
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-secondary-300 to-transparent" />
        <span className="text-xs text-secondary-400 uppercase tracking-wider font-medium">
          Sponsored
        </span>
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-secondary-300 to-transparent" />
      </div>

      {/* Ad Container */}
      <div
        ref={adRef}
        className="bg-gradient-to-br from-secondary-50 to-secondary-100 border-2 border-dashed border-secondary-200 rounded-xl flex flex-col items-center justify-center overflow-hidden"
        style={{
          minHeight: dimensions.minHeight,
          ...style,
        }}
      >
        {/* Placeholder Content */}
        <div className="text-center p-6">
          <div className="w-12 h-12 bg-secondary-200 rounded-lg flex items-center justify-center mx-auto mb-3">
            <span className="text-2xl">📢</span>
          </div>
          <p className="text-secondary-500 font-medium text-sm">Google AdSense</p>
          <p className="text-secondary-400 text-xs mt-1">{getFormatLabel()}</p>
          <p className="text-secondary-300 text-xs mt-2 font-mono">Slot: {slot}</p>
        </div>

        {/* Actual AdSense Slot - Uncomment when ready */}
        {/*
        <ins
          className="adsbygoogle"
          style={{
            display: 'block',
            width: dimensions.width || '100%',
            height: dimensions.height || 'auto'
          }}
          data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
          data-ad-slot={slot}
          data-ad-format={format === 'in-feed' ? 'fluid' : format}
          data-full-width-responsive={format === 'responsive' || format === 'in-article' ? 'true' : 'false'}
          data-ad-layout={format === 'in-feed' ? 'in-article' : undefined}
        />
        */}
      </div>
    </div>
  )
}
