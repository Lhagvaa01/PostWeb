import mongoose from "mongoose";

const CommentSchema = mongoose.Schema(
  {
    author: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    datetime: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const CommentModel = mongoose.model("comment", CommentSchema);
