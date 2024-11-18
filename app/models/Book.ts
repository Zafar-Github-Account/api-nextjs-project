import mongoose, { Schema, model, models } from "mongoose";

const bookSchema = new Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
});

export const Book = models.Book || model("Book", bookSchema);
