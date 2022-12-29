import { Request, Response } from "express";
import authorSchema from "../Schema/authorSchema";
import cloudinary from "../config/cloudinary";
import { read } from "fs";

// get all data
const getall = async (req: Request, res: Response): Promise<Response> => {
  try {
    const getDatas = await authorSchema.find();
    return res.status(200).json({
      message: "Successfully posted data",
      data: getDatas,
    });
  } catch (error) {
    return res.status(400).json({
      message: "An error occured at Getall",
      error: error,
    });
  }
};

// post data
const postData = async (req: Request, res: Response): Promise<Response> => {
  try {
    const secureImage = await cloudinary.uploader.upload(req?.file!.path);
    const { bio, authorName, authorImage } = req.body;

    const Post = await authorSchema.create({
      bio: bio ? bio : `Hi Welcome to ${authorName} bookstore`,
      authorName,
      authorImage: authorImage ? secureImage.secure_url : authorName.charAt(0),
    });
    return res.status(201).json({
      message: "Succefully posted data",
      data: Post,
    });
  } catch (error) {
    return res.status(400).json({
      message: "An error occured at postData",
      error: error,
    });
  }
};

const getone = async (req: Request, res: Response): Promise<Response> => {
  try {
    const Get = await authorSchema.findById(req.params.id);
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

const Updatedata = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { authorImage, bio } = req.body;
    const secureImage = await cloudinary.uploader.upload(req?.file!.path);

    const updateData = await authorSchema.findByIdAndUpdate(
      req.params.id,
      {
        authorImage: secureImage.secure_url,
        bio,
      },
      { new: true }
    );
    return res.status(201).json({
      message: "Updated",
      data: updateData,
    });
  } catch (error) {
    return res.status(400).json({
      message: "An error occured at Updat",
      error: error,
    });
  }
};

const deleteOne = async (req: Request, res: Response): Promise<Response> => {
  try {
    const remove = await authorSchema.findByIdAndDelete(req.params.id);
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

const deletAll = async (req: Request, res: Response): Promise<Response> => {
  try {
    const deletAll = await authorSchema.deleteMany();
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

export { getall, Updatedata, getone, deletAll, deleteOne, postData };
