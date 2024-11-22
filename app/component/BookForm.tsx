'use client';

import { useState,useEffect } from 'react';

interface Book {
  _id?: string;
  title: string;
  author: string;
}

interface BookFormProps {
  currentBook?: Book;
  onSave: () => void;
}

export default function BookForm({ currentBook, onSave }: BookFormProps) {
  const [form, setForm] = useState<Book>(currentBook || { title: '', author: '' });
  useEffect(() => {
    if (currentBook) {
      setForm(currentBook);
    }
  }, [currentBook]);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const method = form._id ? 'PUT' : 'POST';
    await fetch('/api/books', {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    onSave();
    setForm({ title: '', author: '' });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        value={form.title}
        placeholder="Book Title"
        onChange={(e) => setForm({ ...form, title: e.target.value })}
        className="w-full p-2 border rounded"
        required
      />
      <input
        type="text"
        value={form.author}
        placeholder="Author"
        onChange={(e) => setForm({ ...form, author: e.target.value })}
        className="w-full p-2 border rounded"
        required
      />
      <button type="submit" className="w-full bg-green-500 text-white p-2 rounded">
        {form._id ? 'Update' : 'Add'} Book
      </button>
    </form>
  );
}
