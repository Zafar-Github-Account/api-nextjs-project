import { NextResponse } from 'next/server';

let books = [
  { _id: '1', title: 'Book 1', author: 'Author 1' },
  { _id: '2', title: 'Book 2', author: 'Author 2' },
  { _id: '3', title: 'Book 3', author: 'Author 3' },
];

export async function GET() {
  return NextResponse.json(books);
}

export async function POST(request: Request) {
  const newBook = await request.json();
  books.push({ _id: (books.length + 1).toString(), ...newBook });
  return NextResponse.json(newBook, { status: 201 });
}

export async function PUT(request: Request) {
  const updatedBook = await request.json();
  const index = books.findIndex((book) => book._id === updatedBook._id);
  if (index > -1) {
    books[index] = updatedBook;
    return NextResponse.json(updatedBook);
  }
  return NextResponse.json({ error: 'Book not found' }, { status: 404 });
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  books = books.filter((book) => book._id !== id);
  return NextResponse.json({ message: 'Book deleted successfully' });
}
