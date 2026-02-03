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
  const roleRef = useRef<HTMLSpanElement>(null)
  const taglineRef = useRef<HTMLSpanElement>(null)
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
      roleRef.current,
      { y: 60, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.0, delay: 0.35, ease: 'power4.out' }
    )

    gsap.fromTo(
      taglineRef.current,
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.9, delay: 0.6, ease: 'power4.out' }
    )
  }, [])

  useEffect(() => {
    document.body.classList.toggle('cooking', waka.cooking)
  }, [waka.cooking])

  useEffect(() => {
    document.body.classList.remove('theme-love', 'theme-phonk')

    if (nowPlaying.isPlaying) {
      const theme = detectTheme(nowPlaying.title, nowPlaying.artist)

      if (theme === 'love') document.body.classList.add('theme-love')
      if (theme === 'phonk') document.body.classList.add('theme-phonk')
    }
  }, [nowPlaying.isPlaying, nowPlaying.title, nowPlaying.artist])

  // Title fade on scroll — subtle focus shift as user scrolls past hero
  useEffect(() => {
    if (typeof window === 'undefined') return
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const onScroll = () => {
      if (!titleRef.current) return
      const scrolled = window.scrollY || window.pageYOffset
      const threshold = Math.min(window.innerHeight * 0.16, 160)
      const t = Math.min(1, scrolled / threshold)
      const opacity = Math.max(0.5, 1 - t * 0.5)
      titleRef.current.style.opacity = String(opacity)
      if (roleRef.current) roleRef.current.style.opacity = String(Math.max(0.6, 1 - t * 0.6))
      if (taglineRef.current) taglineRef.current.style.opacity = String(Math.max(0.6, 1 - t * 0.6))
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

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
<section className="hero mobile-intro" onMouseMove={handleMouseMove}>
      <div ref={lightRef} className="hero-spotlight" />
      <div
        className="status-indicator"
        onClick={handleStatusClick}
        role="button"
      >
        <span
          className={`status-dot ${nowPlaying.isPlaying ? 'playing' : 'busy'
            }`}
          data-tooltip={nowPlaying.isPlaying ? 'Listening on Spotify' : ''}
        />

        <div className="status-art-wrapper">
          {nowPlaying.isPlaying && nowPlaying.image && (
            <img
              src={nowPlaying.image}
              alt="Album art"
              className="status-art"
            />
          )}
          {!nowPlaying.isPlaying && !waka.cooking && (
            <img
              src="/study.png"
              alt="Exam icon"
              className="status-art"
            />
          )}
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
      <div className="hero-meta">
        <span ref={roleRef} className="hero-role">Cinematic Video Editor</span>
        <span ref={taglineRef} className="hero-tagline">Rhythm. Emotion. Story.</span>
      </div>
    </section>
  )
}

export default Hero
