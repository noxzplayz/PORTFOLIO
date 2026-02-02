'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const reels = [
    {
        id: '01',
        title: 'Kinda Cinematic',
        description: 'A mood-driven cinematic reel establishing visual tone.',
        src: '/reel-01.mp4',
    },
    {
        id: '02',
        title: 'The Break',
        description: 'A narrative transition from study to gaming.',
        src: '/reel-02.mp4',
    },
    {
        id: '03',
        title: 'Phonk × Car',
        description: 'High-energy rhythm edit built on aggressive pacing.',
        src: '/reel-03.mp4',
    },
    {
        id: '04',
        title: 'Friendship Sorry',

        description: 'An emotional reel about connection and regret.',
        src: '/reel-04.mp4',
    },
    {
        id: '05',
        title: 'Bullet Bike',
        description: 'Speed-focused cinematic motion edit.',
        src: '/reel-05.mp4',
    },
    {
        id: '06',
        title: 'The Player',
        description: 'A cinematic character-driven edit.',
        src: '/reel-06.mp4',
    },
    {
        id: '07',
        title: 'Kalyani',
        description: 'A melodic car edit driven by music and flow.',
        src: '/reel-07.mp4',
    },
]


export default function ReelStrip() {
    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const frames = document.querySelectorAll<HTMLElement>('.reel-frame')

        frames.forEach((frame) => {
            const video = frame.querySelector('video')

            if (!video) return

            ScrollTrigger.create({
                trigger: frame,
                start: 'top 60%',
                end: 'bottom 40%',
                onEnter: () => {
                    frame.classList.add('is-active')
                    video.play()
                },
                onEnterBack: () => {
                    frame.classList.add('is-active')
                    video.play()
                },
                onLeave: () => {
                    frame.classList.remove('is-active')
                    video.pause()
                },
                onLeaveBack: () => {
                    frame.classList.remove('is-active')
                    video.pause()
                },
            })
        })
    }, [])


    return (
        <section className="reel-strip">

            <div ref={containerRef} className="reel-strip-inner">
                {reels.map((reel) => (
                    <div key={reel.id} className="reel-frame">
                        <div className="reel-info">
                            <span className="chapter">REEL — {reel.id}</span>
                            <h3>{reel.title}</h3>
                            <p>{reel.description}</p>
                        </div>

                        <video
                            src={reel.src}
                            muted
                            loop
                            playsInline
                            preload="metadata"
                        />

                    </div>
                ))}
            </div>
        </section>
    )
}
