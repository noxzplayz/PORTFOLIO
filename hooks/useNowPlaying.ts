import { useEffect, useState } from 'react'

type NowPlaying = {
  isPlaying: boolean
  title?: string
  artist?: string
  image?: string
}

export default function useNowPlaying() {
  const [data, setData] = useState<NowPlaying>({ isPlaying: false })

  const fetchNowPlaying = async () => {
    try {
      const res = await fetch('/api/now-playing')
      const json = await res.json()
      setData(json)
    } catch {
      setData({ isPlaying: false })
    }
  }

  useEffect(() => {
    fetchNowPlaying()
    const interval = setInterval(fetchNowPlaying, 20000) // every 20s
    return () => clearInterval(interval)
  }, [])

  return data
}
