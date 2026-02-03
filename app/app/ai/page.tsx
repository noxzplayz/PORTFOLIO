'use client'

import EditStyleTool from '@/app/api/edit-style/components/tools/EditStyleTool'
import { useRouter } from 'next/navigation'

export default function AIPage() {
  const router = useRouter()

  return (
    <main className="ai-page">
      <button className="back-button" onClick={() => router.push('/')}>
        ← Back
      </button>

      <h1 className="ai-page-title">AI Utilities</h1>

      <EditStyleTool />
    </main>
  )
}
