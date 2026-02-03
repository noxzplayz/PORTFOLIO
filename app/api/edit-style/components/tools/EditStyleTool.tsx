'use client'

import { useState } from 'react'

function parseResult(text: string) {
  const sections: Record<string, string> = {}
  text.split('\n').forEach(line => {
    const [key, ...rest] = line.split(':')
    if (rest.length) {
      sections[key.trim()] = rest.join(':').trim()
    }
  })
  return sections
}

export default function EditStyleTool() {
  const [song, setSong] = useState('')
  const [data, setData] = useState<Record<string, string> | null>(null)
  const [loading, setLoading] = useState(false)

  const generate = async () => {
    if (!song) return
    setLoading(true)
    setData(null)

    const res = await fetch('/api/edit-style', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ song }),
    })

    const json = await res.json()
    setData(parseResult(json.result))
    setLoading(false)
  }

  return (
    <div className="ai-tool">
      <input
        placeholder="Song name / Artist"
        value={song}
        onChange={e => setSong(e.target.value)}
      />

      <button onClick={generate}>
        {loading ? 'Analyzing…' : 'Analyze'}
      </button>

      {data && (
        <div className="ai-result">
          {Object.entries(data).map(([title, value]) => (
            <div key={title} className="ai-card">
              <span>{title}</span>
              <p>{value}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
