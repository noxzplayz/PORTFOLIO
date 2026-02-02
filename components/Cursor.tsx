'use client'

import { useEffect, useRef } from 'react'

export default function Cursor() {
  const cursorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const cursor = cursorRef.current
    if (!cursor) return

    let x = 0
    let y = 0
    let targetX = 0
    let targetY = 0

    const move = () => {
      x += (targetX - x) * 0.12
      y += (targetY - y) * 0.12
      cursor.style.transform = `translate3d(${x - 6}px, ${y - 6}px, 0)`

      requestAnimationFrame(move)
    }

    move()

    const onMouseMove = (e: MouseEvent) => {
      targetX = e.clientX
      targetY = e.clientY
    }

    window.addEventListener('mousemove', onMouseMove)

    const interactiveElements = document.querySelectorAll('a, video')

    interactiveElements.forEach((el) => {
      el.addEventListener('mouseenter', () => {
        cursor.classList.add('is-active')
      })
      el.addEventListener('mouseleave', () => {
        cursor.classList.remove('is-active')
      })
    })

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      interactiveElements.forEach((el) => {
        el.removeEventListener('mouseenter', () => {
          cursor.classList.add('is-active')
        })
        el.removeEventListener('mouseleave', () => {
          cursor.classList.remove('is-active')
        })
      })
    }
  }, [])

  return <div ref={cursorRef} className="cursor" />
}
