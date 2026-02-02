'use client'

import { useEffect, useState } from 'react'

type Theme = 'love' | 'phonk' | 'cinematic'

export default function ThemeParticles() {
  const [theme, setTheme] = useState<Theme>('cinematic')

  useEffect(() => {
    const observer = new MutationObserver(() => {
      if (document.body.classList.contains('theme-love')) {
        setTheme('love')
      } else if (document.body.classList.contains('theme-phonk')) {
        setTheme('phonk')
      } else {
        setTheme('cinematic')
      }
    })

    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ['class'],
    })

    return () => observer.disconnect()
  }, [])

  if (theme === 'cinematic') return null

  return (
    <div className={`particles particles-${theme}`}>
      {Array.from({ length: 12 }).map((_, i) => (
        <span key={i} className="particle" />
      ))}
    </div>
  )
}
