"use client";

import { useState, useEffect } from "react";

export default function DraftList({ drafts, setDrafts }: { drafts: any[]; setDrafts: any }) {
  useEffect(() => {
    localStorage.setItem("drafts", JSON.stringify(drafts));
  }, [drafts]);

  const handleDelete = (id: number) => {
    setDrafts(drafts.filter((d) => d.id !== id));
  };

  const handleEdit = (id: number) => {
    const newTitle = prompt("Edit title:");
    if (!newTitle) return;
    setDrafts(drafts.map((d) => (d.id === id ? { ...d, title: newTitle } : d)));
  };

  const handlePublish = async () => {
    const res = await fetch("/api/publish", {
      method: "POST",
      body: JSON.stringify({ drafts }),
    });
    if (res.ok) {
      alert("Published!");
      setDrafts([]);
      localStorage.removeItem("drafts");
    }
  };

  return (
    <div className="space-y-3">
      {drafts.map((d) => (
        <div key={d.id} className="p-3 border rounded flex justify-between">
          <span>{d.title}</span>
          <div className="space-x-2">
            <button onClick={() => handleEdit(d.id)} className="text-blue-600">Edit</button>
            <button onClick={() => handleDelete(d.id)} className="text-red-600">Delete</button>
          </div>
        </div>
      ))}
      {drafts.length > 0 && (
        <button onClick={handlePublish} className="px-4 py-2 bg-green-600 text-white rounded">
          Publish All
        </button>
      )}
    </div>
  );
}
