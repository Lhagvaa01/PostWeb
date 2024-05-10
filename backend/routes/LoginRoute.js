import express from "express";
import { User } from "../models/UserModel.js";
import { name } from "ejs";

const router = express.Router();

//Login
router.post("/login", async (req, res) => {
    try {
      const { mail, pass } = req.body;
      if (!mail || !pass) {
        return res.status(400).send({ message: "Please provide email and password" });
      }
  
      // Find user by email
      const user = await User.findOne({ mail });
  
      if (!user) {
        return res.status(404).send({ message: "User not found" });
      }
  
      // Check password
      if (user.pass !== pass) {
        return res.status(401).send({ message: "Invalid password" });
      }
  
      // Passwords match, login successful
      return res.status(200).send({ message: "Login successful", user });
    } catch (error) {
      console.log(error.message);
      res.status(500).send({ message: "Internal server error" });
    }
  });


router.post("/register", async (req, res) => {
    try {
        const { name, mail, pass } = req.body;

        // Check if all required fields are provided
        if (!name || !mail || !pass) {
        return res.status(400).send({ message: "Please provide name, email, and password" });
        }

        // Check if the user already exists
        const existingUser = await User.findOne({ mail });
        if (existingUser) {
        return res.status(409).send({ message: "User with this email already exists" });
        }

        // Create new user
        const newUser = await User.create({ name, mail, pass });

        // Return success response
        return res.status(201).send({ message: "User created successfully", user: newUser });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Internal server error" });
    }
});
// // Бүх ном харах
// router.get("/", async (req, res) => {
//   try {
//     const books = await Book.find({});

//     return res.status(200).json({
//       count: books.length,
//       data: books,
//     });
//   } catch (error) {
//     console.log(error.message);
//   }
// });

// //ID-аар ном харах
// router.get("/:id", async (req, res) => {
//   try {
//     const { id } = req.params;

//     const book = await Book.findById(id);

//     return res.status(200).json(book);
//   } catch (error) {
//     console.log(error.message);
//   }
// });

// //Ном шинэчлэх
// router.put("/:id", async (req, res) => {
//   try {
//     if (
//       !req.body.title ||
//       !req.body.author ||
//       !req.body.description ||
//       !req.body.publishYear
//     ) {
//       return res.status(400).send({
//         message: "Send all req fields: title, author, publishYear",
//       });
//     }

//     const { id } = req.params;

//     const result = await Book.findByIdAndUpdate(id, req.body);

//     if (!result) {
//       return res.status(404).json({ message: "Ном олдсонгүй!" });
//     }

//     return res.status(200).send({ message: "Ном амжилттай шинэчлэгдлээ" });
//   } catch (error) {
//     console.log(error.message);
//   }
// });

// // Ном устгах
// router.delete("/:id", async (req, res) => {
//   try {
//     const { id } = req.params;

//     const result = await Book.findByIdAndDelete(id);

//     if (!result) {
//       return res.status(404).json({ message: "Ном олдсонгүй!" });
//     }

//     return res.status(200).send({ message: "Номыг амжилттай устгалаа" });
//   } catch (error) {
//     console.log(error.message);
//     res.status(500).send({ message: error.message });
//   }
// });

export default router;
