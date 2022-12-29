import mongoose from "mongoose";

interface author {
  bio: string;
  authorName: string;
  authorImage: string;
  books: {}[];
}

interface Iauthor extends author, mongoose.Document {}

const AuthorSchema = new mongoose.Schema(
  {
    bio: {
      type: String,
      required: true,
    },
    authorName: {
      type: String,
      required: true,
    },
    authorImage: {
      type: String,
    },
    author: {
      type: String,
    },
    books: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "bookCollection",
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<Iauthor>("authorDetails", AuthorSchema);
