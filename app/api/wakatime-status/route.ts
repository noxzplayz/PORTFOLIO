import { NextResponse } from 'next/server'

const WAKATIME_API_KEY = process.env.WAKATIME_API_KEY

export async function GET() {
  if (!WAKATIME_API_KEY) {
    return NextResponse.json({ cooking: false })
  }

  const auth = Buffer.from(WAKATIME_API_KEY).toString('base64')

  try {
    const res = await fetch(
      'https://wakatime.com/api/v1/users/current/heartbeats?limit=1',
      {
        headers: {
          Authorization: `Basic ${auth}`,
        },
        cache: 'no-store',
      }
    )

    const data = await res.json()
    const last = data?.data?.[0]

    if (!last) {
      return NextResponse.json({ cooking: false })
    }

    const lastTime = last.time * 1000
    const diffMinutes = (Date.now() - lastTime) / 60000

    return NextResponse.json({
      cooking: diffMinutes < 5, // active within 5 min
      minutesAgo: Math.floor(diffMinutes),
      project: last.project,
    })
  } catch {
    return NextResponse.json({ cooking: false })
  }
}
