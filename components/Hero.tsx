'use client'

import React from 'react'
import { useEffect, useRef } from 'react'
import useNowPlaying from '@/hooks/useNowPlaying'
import useWakaTime from '@/hooks/useWakaTime'


import gsap from 'gsap'

const detectTheme = (title?: string, artist?: string) => {
  const text = `${title ?? ''} ${artist ?? ''}`.toLowerCase()

  // PHONK / HARD / DARK
  if (
    text.includes('phonk') ||
    text.includes('drift') ||
    text.includes('rage') ||
    text.includes('trap') ||
    text.includes('hard')
  ) {
    return 'phonk'
  }

  // LOVE / MELODY / SOFT
  if (
    text.includes('love') ||
    text.includes('sorry') ||
    text.includes('romantic') ||
    text.includes('melody') ||
    text.includes('kalyani') ||
    text.includes('heart')
  ) {
    return 'love'
  }

  // DEFAULT
  return 'cinematic'
}

const Hero: () => React.ReactElement = () => {
  const titleRef = useRef<HTMLHeadingElement>(null)
  const textRef = useRef<HTMLParagraphElement>(null)
  const lightRef = useRef<HTMLDivElement>(null)

  const nowPlaying = useNowPlaying()
  const waka = useWakaTime()

  useEffect(() => {
    gsap.fromTo(
      titleRef.current,
      { y: 120, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.4, ease: 'power4.out' }
    )

    gsap.fromTo(
      textRef.current,
      { y: 60, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, delay: 0.5, ease: 'power4.out' }
    )
  }, [])

  useEffect(() => {
    document.body.classList.toggle('cooking', waka.cooking)
  }, [waka.cooking])

  useEffect(() => {
    if (!nowPlaying.isPlaying) return

    const theme = detectTheme(nowPlaying.title, nowPlaying.artist)

    document.body.classList.remove('theme-love', 'theme-phonk')

    if (theme === 'love') document.body.classList.add('theme-love')
    if (theme === 'phonk') document.body.classList.add('theme-phonk')
  }, [nowPlaying.isPlaying])

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!lightRef.current) return

    const { clientX, clientY } = e
    lightRef.current.style.background = `
      radial-gradient(
        600px at ${clientX}px ${clientY}px,
        rgba(255, 255, 255, 0.08),
        transparent 60%
      )
    `
  }

  const handleStatusClick = () => {
  console.log('STATUS CLICKED')

  if (!nowPlaying.isPlaying) return

  const theme = detectTheme(nowPlaying.title, nowPlaying.artist)
  console.log('Detected theme:', theme)

  document.body.classList.remove('theme-love', 'theme-phonk')

  if (theme === 'love') {
    document.body.classList.add('theme-love')
  }

  if (theme === 'phonk') {
    document.body.classList.add('theme-phonk')
  }
}


  return (
    <section className="hero" onMouseMove={handleMouseMove}>
      <div ref={lightRef} className="hero-spotlight" />
      <div
        className="status-indicator"
        onClick={handleStatusClick}
        role="button"
      >
        <div className="status-art-wrapper">
          {nowPlaying.isPlaying && nowPlaying.image && (
            <img
              src={nowPlaying.image}
              alt="Album art"
              className="status-art"
            />
          )}
          <span
            className={`status-dot ${nowPlaying.isPlaying ? 'playing' : 'busy'
              }`}
            data-tooltip={nowPlaying.isPlaying ? 'Listening on Spotify' : ''}
          />
        </div>

        <div className="status-text">
          {nowPlaying.isPlaying ? (
            <>
              <span className="status-role">Now Playing</span>
              <span className="status-mode">
                {nowPlaying.title} — {nowPlaying.artist}
              </span>
            </>
          ) : waka.cooking ? (
            <>
              <span className="status-role">Cooking</span>
              <span className="status-mode">
                In the editor{waka.project ? ` · ${waka.project}` : ''}
              </span>
            </>
          ) : (
            <>
              <span className="status-role">EXAMS ARE GOING ON</span>
              <span className="status-mode">BUSY</span>
            </>
          )}
        </div>
      </div>


      <h1 ref={titleRef}>YOCHAN</h1>
      <p ref={textRef}>
        Cinematic Video Editor<br />
        Rhythm. Emotion. Story.
      </p>
    </section>
  )
}

export default Hero
