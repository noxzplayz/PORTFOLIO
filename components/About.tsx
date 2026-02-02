'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function About() {
  const textRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    gsap.fromTo(
      textRef.current,
      { y: 60, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: textRef.current,
          start: 'top 80%',
        },
      }
    )
  }, [])

  return (
   <section className="about focus-section">
<span className="chapter">DIRECTOR’S NOTE — 03</span>

      <p ref={textRef}>
        I edit with rhythm first.<br />
        Emotion second.<br />
        Everything else follows.
      </p>
    </section>
  )
}
