'use client'

import { useEffect, useRef } from 'react'

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          document.body.classList.add('show-native-cursor')
        } else {
          document.body.classList.remove('show-native-cursor')
        }
      },
      { threshold: 0.4 }
    )

    observer.observe(section)

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="contact focus-section">
      <span className="chapter">CONTACT — 04</span>

      <h2>Let’s make something that lasts.</h2>

      <a className="email" href="mailto:yochanbr@gmail.com">
        yochanbr@gmail.com
      </a>

      <div className="socials">
        <a
          href="https://instagram.com/yochxn.__"
          target="_blank"
          rel="noopener noreferrer"
        >
          Instagram
        </a>

        <a
          href="https://github.com/noxzplayz"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </a>
      </div>
    </section>
  )
}
