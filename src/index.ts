import express, { Application, Request, Response } from "express";
// import cors from "cors";
import route from "../Routes/authorRoute";

require("../config/config");

const app: Application = express();
app.use(express.json());
const port: number = 2001;

app.all("/", (req: Request, res: Response): Response => {
  return res.status(200).json({
    message: "Running!",
  });
});

// app.use(cors());
app.use("/api", route);
app.listen(port, () => {
  console.log("Listening to port", port);
});
