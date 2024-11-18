'use client';

import { useState, useEffect } from "react";

interface Book {
  _id?: string;
  title: string;
  author: string;
}

export default function BookForm({
  currentBook,
  onSave,
}: {
  currentBook?: Book;
  onSave: () => void;
}) {
  const [form, setForm] = useState<Book>(currentBook || { title: "", author: "" });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setForm(currentBook || { title: "", author: "" });
  }, [currentBook]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const method = form._id ? "PUT" : "POST";
      const response = await fetch("/api/books", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        throw new Error(`Failed to ${method === "POST" ? "add" : "update"} book`);
      }

      onSave();
      setForm({ title: "", author: "" });
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("An error occurred. Palease try again.");
    } finally {
      setIsLoading(false);
    }
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
      <div className="flex space-x-4">
        <button
          type="submit"
          disabled={isLoading}
          className={`w-full p-2 rounded text-white ${
            isLoading ? "bg-gray-400" : "bg-green-500 hover:bg-green-600"
          }`}
        >
          {isLoading ? "Submitting..." : form._id ? "Update" : "Add"} Book
        </button>
        {form._id && (
          <button
            type="button"
            onClick={() => {
              setForm({ title: "", author: "" });
              onSave();
            }}
            className="w-full bg-gray-500 hover:bg-gray-600 text-white p-2 rounded"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
