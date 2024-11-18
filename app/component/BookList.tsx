'use client';

import { useState, useEffect } from "react";

interface Book {
  _id: string;
  title: string;
  author: string;
}

export default function BookList({ onEdit }: { onEdit: (book: Book) => void }) {
  const [books, setBooks] = useState<Book[]>([]);

  const fetchBooks = async () => {
    const response = await fetch("/api/books");
    const data = await response.json();
    setBooks(data);
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleDelete = async (id: string) => {
    await fetch(`/api/books?id=${id}`, { method: "DELETE" });
    fetchBooks();
  };

  return (
    <div className="space-y-4">
      {books.map((book) => (
        <div key={book._id} className="flex justify-between items-center p-4 border rounded">
          <div>
            <h2 className="text-xl font-semibold">{book.title}</h2>
            <p className="text-gray-600">by {book.author}</p>
          </div>
          <div className="space-x-2">
            <button
              onClick={() => onEdit(book)}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(book._id)}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
