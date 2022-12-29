import { Request, Response } from "express";
import booksSchema from "../Schema/Bookschema";
import cloudinary from "../config/cloudinary";
import authorSchema from "../Schema/authorSchema";
import mongoose from "mongoose";

/**
|--------------------------------------------------
|  isbn: string;
  title: string;
  coverImage: string;
  summary: string;
  catrgoty: string;
  authorName: string;
|--------------------------------------------------
*/
const postbooks = async (req: Request, res: Response): Promise<Response> => {
  try {
    const isbn1: number = Math.floor(Math.random() * 10000);
    const isbn2: number = Math.floor(Math.random() * 10000);
    const isbn3: number = Math.floor(Math.random() * 10000);
    const isbn4: number = Math.floor(Math.random() * 10000);

    const secureImage = await cloudinary.uploader.upload(req?.file!.path);

    const { title, coverImage, summary, category, authorName } = req.body;

    const author = await authorSchema.findById(req.params.id);

    const postBooks = await booksSchema.create({
      title,
      isbn: `${isbn1}-${isbn3}-${isbn2}-${isbn4}`,
      coverImage: req.file ? secureImage.secure_url : authorName.charAt(0),
      summary,
      category,
      authorName: author?.authorName,
    });

    author?.books.push(new mongoose.Types.ObjectId(postBooks.id));
    postBooks.save();

    return res.status(201).json({
      message: "Succefully posted Data",
    });
  } catch (error) {
    return res.status(400).json({
      message: "An error occured in postbook",
      error: error,
    });
  }
};

const getAllBooks = async (req: Request, res: Response): Promise<Response> => {
  try {
    const Get = await booksSchema.find();
    return res.status(201).json({
      message: "Successfully gotten all data",
      data: Get,
    });
  } catch (error) {
    return res.status(400).json({
      message: "An error occured in getAllBooks",
      error: error,
    });
  }
};

const deleteOneBook = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const remove = await booksSchema.findByIdAndDelete(req.params.id);
    return res.status(201).json({
      message: `deleted ${req.params.id}`,
    });
  } catch (error) {
    return res.status(400).json({
      message: "An error occured at deleteOne",
      error: error,
    });
  }
};

const deletAllBooks = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const deletAll = await booksSchema.deleteMany();
    return res.status(201).json({
      message: "Deleted All data",
    });
  } catch (error) {
    return res.status(400).json({
      message: "An error occured at delete All",
      error: error,
    });
  }
};

const getonebook = async (req: Request, res: Response): Promise<Response> => {
  try {
    const Get = await booksSchema.findById(req.params.id);
    return res.status(201).json({
      message: `successfully gotten ${req.params.id}`,
      data: Get,
    });
  } catch (error) {
    return res.status(400).json({
      message: "An error occured at postData",
      error: error,
    });
  }
};

export { getAllBooks, postbooks, deletAllBooks, getonebook,deleteOneBook };
