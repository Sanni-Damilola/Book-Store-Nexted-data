import multer from "multer";
import { Request } from "express";

type DCB = (error: Error | null, destination: string) => void;
type FNCB = (error: Error | null, file: string) => void;

const store = multer.diskStorage({
  destination: (req: Request, file: Express.Multer.File, cb: DCB) => {
    cb(null, "Uploads");
  },

  filename(req: Request, file: Express.Multer.File, cb: FNCB) {
    cb(null, file.originalname);
  },
});

const uploadCoverImage = multer({ storage: store }).single("coverImage");

const uploadauthorImage = multer({ storage: store }).single("authorImage");

export { uploadCoverImage, uploadauthorImage };
