import multer from "multer";
import { Router } from "express";
import {
  deletAllBooks,
  deleteOneBook,
  getAllBooks,
  getonebook,
} from "../controller/booksFunctions";

const route = Router();

route.route("/getallBooks").get(getAllBooks);
route.route("/deletebook/:id").get(deletAllBooks);
route.route("/getonebook/:id").get(getonebook);
route.route("/deleteallbooks").delete(deletAllBooks);
route.route("/deleteone/:id").delete(deleteOneBook);
