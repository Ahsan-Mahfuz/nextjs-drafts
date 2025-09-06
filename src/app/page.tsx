'use client'

import { useEffect, useState } from 'react'
import DraftForm from '@/components/DraftForm'
import DraftList from '@/components/DraftList'

export default function HomePage() {
  const [drafts, setDrafts] = useState<any[]>([])

  useEffect(() => {
    const saved = localStorage.getItem('drafts')
    if (saved) setDrafts(JSON.parse(saved))
  }, [])

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold">Draft Manager</h1>
      <DraftForm onAdd={(d) => setDrafts([...drafts, d])} />
      <DraftList drafts={drafts} setDrafts={setDrafts} />
    </div>
  )
}
