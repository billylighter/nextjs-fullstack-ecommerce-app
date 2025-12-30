"use client";

import { useState } from "react";

export default function TodoForm() {
    const [title, setTitle] = useState("");
    const [loading, setLoading] = useState(false);

    async function submit(e: React.FormEvent) {
        e.preventDefault();
        if (!title.trim()) return;

        setLoading(true);

        await fetch("/api/todos", {
            method: "POST",
            body: JSON.stringify({ title }),
        });

        setTitle("");
        setLoading(false);
        location.reload();
    }

    return (
        <form onSubmit={submit} className="flex gap-2 mb-6">
            <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Add a new task"
                className="flex-1 border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
            />
            <button
                disabled={loading}
                className="bg-black text-white px-4 py-2 rounded-lg text-sm disabled:opacity-50"
            >
                Add
            </button>
        </form>
    );
}
