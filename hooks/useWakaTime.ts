import { useEffect, useState } from 'react'

export default function useWakaTime() {
  const [data, setData] = useState<{
    cooking: boolean
    project?: string
  }>({ cooking: false })

  useEffect(() => {
    const fetchStatus = async () => {
      const res = await fetch('/api/wakatime-status')
      const json = await res.json()
      setData(json)
    }

    fetchStatus()
    const interval = setInterval(fetchStatus, 60000)
    return () => clearInterval(interval)
  }, [])

  return data
}
