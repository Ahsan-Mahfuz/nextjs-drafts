"use client";

import { useState } from "react";

export default function DraftForm({ onAdd }: { onAdd: (draft: any) => void }) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    onAdd({ id: Date.now(), title, body, updatedAt: Date.now() });
    setTitle("");
    setBody("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3 p-4 border rounded-lg">
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        className="w-full border p-2 rounded"
      />
      <textarea
        value={body}
        onChange={(e) => setBody(e.target.value)}
        placeholder="Body (Markdown)"
        className="w-full border p-2 rounded"
        rows={5}
      />
      <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">
        Add Draft
      </button>
    </form>
  );
}
