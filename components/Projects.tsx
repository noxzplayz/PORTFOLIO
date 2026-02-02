'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Projects() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.fromTo(
      sectionRef.current,
      { y: 80, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        },
      }
    )
  }, [])

  return (
    <section ref={sectionRef} className="projects focus-section">
<span className="chapter">PROJECTS — 02</span>

      <div className="project">
        <h2>Silent Cities</h2>
        <p>
          A short documentary exploring absence, space, and memory.
        </p>
        <video
          src="/doc.mp4"
          autoPlay
          muted
          loop
          playsInline
        />
      </div>
    </section>
  )
}
