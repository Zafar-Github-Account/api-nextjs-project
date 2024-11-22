'use client';

import { useState } from 'react';
import BookForm from './component/BookForm';
import BookList from './component/BookList';

interface Book {
  _id: string;
  title: string;
  author: string;
}

export default function Home() {
  const [editingBook, setEditingBook] = useState<Book | null>(null);

  const refresh = () => setEditingBook(null);

  return (
    <div className="p-8 space-y-8">
      <h1 className="text-3xl font-bold">Book Management App</h1>
      <BookForm currentBook={editingBook || undefined} onSave={refresh} />
      <BookList onEdit={(book: Book) => setEditingBook(book)} />
    </div>
  );
}
