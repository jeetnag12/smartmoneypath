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

// Your AdSense Publisher ID
const ADSENSE_CLIENT_ID = 'ca-pub-5428516361954387'

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
    if (typeof window === 'undefined') return

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

    // Wait for AdSense script to load
    if ((window as any).adsbygoogle) {
      initAd()
    } else {
      // Retry after a short delay if script hasn't loaded yet
      setTimeout(initAd, 1000)
    }
  }, [slot])

  const dimensions = adDimensions[format]

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
        className="bg-white border border-secondary-200 rounded-xl overflow-hidden"
        style={{
          minHeight: dimensions.minHeight,
          ...style,
        }}
      >
        {/* Actual AdSense Ad */}
        <ins
          className="adsbygoogle"
          style={{
            display: 'block',
            width: dimensions.width || '100%',
            height: dimensions.height || 'auto'
          }}
          data-ad-client={ADSENSE_CLIENT_ID}
          data-ad-slot={slot}
          data-ad-format={format === 'in-feed' ? 'fluid' : format}
          data-full-width-responsive={format === 'responsive' || format === 'in-article' ? 'true' : 'false'}
          data-ad-layout={format === 'in-feed' ? 'in-article' : undefined}
        />
      </div>
    </div>
  )
}
