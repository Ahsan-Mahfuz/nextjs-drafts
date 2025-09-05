'use client'

import { useEffect, useState } from 'react'

export default function DraftList({
  drafts,
  setDrafts,
}: {
  drafts: any[]
  setDrafts: any
}) {
  const [isEditing, setIsEditing] = useState(false)
  const [editId, setEditId] = useState<number | null>(null)
  const [editTitle, setEditTitle] = useState('')
  const [editBody, setEditBody] = useState('')

  useEffect(() => {
    localStorage.setItem('drafts', JSON.stringify(drafts))
  }, [drafts])

  const handleDelete = (id: number) => {
    setDrafts(drafts.filter((d) => d.id !== id))
  }

  const handleEdit = (id: number) => {
    const draft = drafts.find((d) => d.id === id)
    if (!draft) return
    setEditId(id)
    setEditTitle(draft.title)
    setEditBody(draft.body)
    setIsEditing(true)
  }

  const saveEdit = () => {
    if (!editId) return
    setDrafts(
      drafts.map((d) =>
        d.id === editId ? { ...d, title: editTitle, body: editBody } : d
      )
    )
    setIsEditing(false)
    setEditId(null)
    setEditTitle('')
    setEditBody('')
  }

  const handlePublish = async () => {
    const res = await fetch('/api/publish', {
      method: 'POST',
      body: JSON.stringify({ drafts }),
    })
    if (res.ok) {
      alert('Published!')
      setDrafts([])
      localStorage.removeItem('drafts')
    }
  }

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-3 font-semibold">
        <div>Title</div>
        <div>Body</div>
      </div>

      {drafts.map((d) => (
        <div key={d.id} className="p-3 border rounded grid grid-cols-3">
          <span>{d.title}</span>
          <span>{d.body}</span>
          <div className="space-x-2">
            <button onClick={() => handleEdit(d.id)} className="text-blue-600">
              Edit
            </button>
            <button onClick={() => handleDelete(d.id)} className="text-red-600">
              Delete
            </button>
          </div>
        </div>
      ))}

      {drafts.length > 0 && (
        <button
          onClick={handlePublish}
          className="px-4 py-2 bg-green-600 text-white rounded"
        >
          Publish All
        </button>
      )}

      {isEditing && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/70 bg-opacity-50">
          <div className="bg-black p-6 rounded shadow-md w-96 space-y-4  border border-white">
            <h2 className="text-lg font-semibold">Edit Draft</h2>
            <div>
              <label className="block text-sm">Title</label>
              <input
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                className="w-full border p-2 rounded"
              />
            </div>
            <div>
              <label className="block text-sm">Body</label>
              <textarea
                value={editBody}
                onChange={(e) => setEditBody(e.target.value)}
                className="w-full border p-2 rounded"
              />
            </div>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 bg-black rounded"
              >
                Cancel
              </button>
              <button
                onClick={saveEdit}
                className="px-4 py-2 bg-blue-600 text-white rounded"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
