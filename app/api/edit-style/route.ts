import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

const cache = new Map<string, { data: any; time: number }>()
const TTL = 5 * 60 * 1000 // 5 minutes

export async function POST(req: Request) {
  try {
    console.log('API HIT')

    const body = await req.json()
    console.log('BODY:', body)

    const song = body.song

    if (!song) {
      console.log('NO SONG')
      return NextResponse.json({ error: 'No song provided' }, { status: 400 })
    }

    if (!process.env.GROQ_API_KEY) {
      console.log('NO API KEY')
      return NextResponse.json(
        { error: 'Missing GROQ_API_KEY' },
        { status: 500 }
      )
    }

    const cached = cache.get(song)
    if (cached && Date.now() - cached.time < TTL) {
      return NextResponse.json({ result: cached.data })
    }

    console.log('CALLING GROQ...')

    const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama-3.1-8b-instant',

        messages: [
          {
            role: 'user',
            content: `Suggest a cinematic video edit style for the song: ${song}`,
          },
        ],
      }),
    })

    console.log('GROQ STATUS:', res.status)

    const raw = await res.text()
    console.log('GROQ RAW:', raw)

    if (!res.ok) {
      return NextResponse.json(
        { error: 'Groq API failed', raw },
        { status: 500 }
      )
    }

    const data = JSON.parse(raw)
    const result = data.choices?.[0]?.message?.content ?? 'No output'

    // Cache the result
    cache.set(song, { data: result, time: Date.now() })

    return NextResponse.json({ result })
  } catch (err) {
    console.error('CRASH:', err)
    return NextResponse.json(
      { error: 'Server crash', details: String(err) },
      { status: 500 }
    )
  }
}
