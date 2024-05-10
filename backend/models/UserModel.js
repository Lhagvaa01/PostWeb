
import mongoose from "mongoose";

const UserSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Хэрэглэгчийн нэр оруулна уу!"],
    },
    mail: {
      type: String,
      required: [true, "И-Мэйл хаягаа оруулна уу!"],
    },
    pass: {
      type: String,
      required: true,
    }
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.model("user", UserSchema);
