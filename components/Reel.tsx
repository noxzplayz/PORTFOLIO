'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Reel() {
  const textRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    let activeVideo: HTMLVideoElement | null = null

    const frames = document.querySelectorAll<HTMLElement>('.reel-frame')

    frames.forEach((frame) => {
      const video = frame.querySelector<HTMLVideoElement>('video')
      if (!video) return

      ScrollTrigger.create({
        trigger: frame,
        start: 'top 60%',
        end: 'bottom 40%',

        onEnter: () => {
          frame.classList.add('is-active')

          if (activeVideo && activeVideo !== video) {
            activeVideo.currentTime = 0
          }

          activeVideo = video

          const p = video.play()
          if (p) p.catch(() => { })
        },

        onEnterBack: () => {
          frame.classList.add('is-active')

          if (activeVideo && activeVideo !== video) {
            activeVideo.currentTime = 0
          }

          activeVideo = video

          const p = video.play()
          if (p) p.catch(() => { })
        },

        onLeave: () => {
          frame.classList.remove('is-active')
        },

        onLeaveBack: () => {
          frame.classList.remove('is-active')
        },
      })
    })
  }, [])




  return (
    <section className="reel-split focus-section">
      <div ref={textRef} className="reel-text">
        <span className="chapter">REEL — 01</span>
        <h2>
          Editing
          <span> as storytelling</span>
        </h2>

        <p>
          A curated selection of cinematic edits focused on rhythm,
          emotion, and visual pacing.
        </p>
      </div>

      <div className="reel-media">
        <video
          src={reel.src}
          muted
          loop
          playsInline
          preload="metadata"
        />


      </div>
    </section>
  )
}
