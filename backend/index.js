import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import bookRoute from "./routes/bookRoute.js";
import commentRoute from "./routes/commentRoute.js";
import LoginRoute from "./routes/LoginRoute.js";
import cors from "cors";

const app = express();

app.use(express.json());

app.use(cors());

app.use("/books", bookRoute);
app.use("/comment", commentRoute);
app.use("/Login", LoginRoute);
// app.use("/register", LoginRoute);

mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("DB-тэй амжилттай холбогдлоо!");
    app.listen(PORT, () => {
      console.log(`Сервер ажиллаж байгаа порт: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
