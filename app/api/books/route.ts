import { connectToDatabase } from "@/app/lib/mongodb";
import { Book } from "@/app/models/Book";
import { NextResponse } from "next/server";


export async function GET() {
  await connectToDatabase();
  const books = await Book.find();
  return NextResponse.json(books);
}

export async function POST(request: Request) {
  const body = await request.json();
  await connectToDatabase();
  const book = await Book.create(body);
  return NextResponse.json(book, { status: 201 });
}

export async function PUT(request: Request) {
  const body = await request.json();
  await connectToDatabase();
  const updatedBook = await Book.findByIdAndUpdate(body.id, body, { new: true });
  return NextResponse.json(updatedBook);
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  await connectToDatabase();
  await Book.findByIdAndDelete(id);

  return NextResponse.json({ message: "Book deleted successfully" });
}
