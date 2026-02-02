import { NextResponse } from 'next/server'

const LASTFM_API_KEY = process.env.LASTFM_API_KEY
const LASTFM_USERNAME = process.env.LASTFM_USERNAME

export async function GET() {
  if (!LASTFM_API_KEY || !LASTFM_USERNAME) {
    return NextResponse.json(
      { error: 'Missing Last.fm config' },
      { status: 500 }
    )
  }

  const url =
    `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks` +
    `&user=${LASTFM_USERNAME}` +
    `&api_key=${LASTFM_API_KEY}` +
    `&format=json` +
    `&limit=1`

  try {
    const res = await fetch(url, { cache: 'no-store' })
    const data = await res.json()

    const track = data?.recenttracks?.track?.[0]

    if (!track) {
      return NextResponse.json({ isPlaying: false })
    }

    const isPlaying = track['@attr']?.nowplaying === 'true'

    return NextResponse.json({
      isPlaying,
      title: track.name,
      artist: track.artist['#text'],
      album: track.album['#text'],
      url: track.url,
      image: track.image?.[2]?.['#text'] || null,
    })
  } catch (error) {
    return NextResponse.json({ isPlaying: false })
  }
}
