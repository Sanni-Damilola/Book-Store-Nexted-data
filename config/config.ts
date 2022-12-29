import mongoose from "mongoose";

const url: string = "mongodb://localhost/nextedbookstore";

mongoose.connect(url);
mongoose.connection
  .once("open", () => {
    console.log("connected to " + url);
  })
  .on("error", (err) => {
    console.log("An error occured" + err);
  });
