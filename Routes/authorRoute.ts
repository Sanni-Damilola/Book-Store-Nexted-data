import { Router } from "express";

import {
  deleteOne,
  deletAll,
  getall,
  getone,
  postData,
  Updatedata,
} from "../controller/authorFunction";

import { uploadCoverImage, uploadauthorImage } from "../config/multer";

const route = Router();

// author Route
route.route("/getall").get(getall);
route.route("/post").post(uploadauthorImage, postData);
route.route("/update").patch(Updatedata);
route.route("/getone/:id").get(getone);
route.route("/deleteall").delete(deletAll);
route.route("/delete/:id").delete(deleteOne);


export default route;
