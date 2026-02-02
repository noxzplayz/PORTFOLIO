'use client'

import { useEffect } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function FocusController() {
  useEffect(() => {
  const sections = document.querySelectorAll('.focus-section')

  sections.forEach((section) => {
    ScrollTrigger.create({
      trigger: section,
      start: 'top 65%',
      end: 'bottom 35%',
      onEnter: () => section.classList.remove('is-blurred'),
      onEnterBack: () => section.classList.remove('is-blurred'),
      onLeave: () => section.classList.add('is-blurred'),
      onLeaveBack: () => section.classList.add('is-blurred'),
    })
  })
}, [])


  return null
}
