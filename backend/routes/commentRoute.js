import express from "express";
import { Book } from "../models/bookModel.js";

import { CommentModel } from "../models/comment.js";

const router = express.Router();

//comment bichih
router.post("/", async (req, res) => {
  try {
    if (!req.body.author || !req.body.content) {
      return res.status(400).send({
        message: "Send all req fields: title, author, publishYear",
      });
    }
    const newBook = {
      author: req.body.author,
      content: req.body.content,
      avatar: req.body.avatar,
      datetime: req.body.datetime,
    };

    const book = await CommentModel.create(newBook);

    const books = await CommentModel.find({});

    return res.status(200).json({
      count: books.length,
      data: books,
    });

    return res.status(201).send(book);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

// comment hrh
router.get("/", async (req, res) => {
  try {
    const books = await CommentModel.find({});

    return res.status(200).json({
      count: books.length,
      data: books,
    });
  } catch (error) {
    console.log(error.message);
  }
});

//ID-аар харах
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const book = await CommentModel.findById(id);

    return res.status(200).json(book);
  } catch (error) {
    console.log(error.message);
  }
});

//Засах
router.put("/:id", async (req, res) => {
  try {
    if (
      !req.body.author ||
      !req.body.content
    ) {
      return res.status(400).send({
        message: "Send all req fields: title, author, publishYear",
      });
    }

    const { id } = req.params;

    const result = await CommentModel.findByIdAndUpdate(id, req.body);

    if (!result) {
      return res.status(404).json({ message: "Коммент олдсонгүй!" });
    }

    return res.status(200).send({ message: "Коммент амжилттай шинэчлэгдлээ" });
  } catch (error) {
    console.log(error.message);
  }
});

// Устгах
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const result = await Book.findByIdAndDelete(id);

    if (!result) {
      return res.status(404).json({ message: "Коммент олдсонгүй!" });
    }

    return res.status(200).send({ message: "Коммент амжилттай устгалаа" });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

export default router;
