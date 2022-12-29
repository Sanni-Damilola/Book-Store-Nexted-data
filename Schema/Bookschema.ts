import mongoose from "mongoose";

interface data {
  isbn: string;
  title: string;
  coverImage: string;
  summary: string;
  catrgoty: string;
  authorName: string;
}

interface Idata extends data, mongoose.Document {}

const BookSchema = new mongoose.Schema({
  isbn: {
    type: String,
  },
  title: {
    type: String,
    required: true,
  },
  coverImage: {
    type: String,
  },
  summary: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  authorName: {
    type: String,
    required: true,
  },
});

export default mongoose.model<Idata>("AuthorBooks", BookSchema);
