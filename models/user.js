import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userModel = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

userModel.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

// Handle password hashing for findOneAndUpdate operations (includes findByIdAndUpdate)
userModel.pre("findOneAndUpdate", async function (next) {
  const update = this.getUpdate();
  if (update && update["$set"].password) {
    try {
      const salt = await bcrypt.genSalt(10);
      update["$set"].password = await bcrypt.hash(
        update["$set"].password,
        salt
      );
      console.log(update);
      console.log("done");
    } catch (err) {
      return next(err);
    }
  }
  next();
});

// Handle password hashing for updateOne operations
userModel.pre("updateOne", async function (next) {
  const update = this.getUpdate();
  if (update && update.password) {
    try {
      const salt = await bcrypt.genSalt(10);
      update.password = await bcrypt.hash(update.password, salt);
    } catch (err) {
      return next(err);
    }
  }
  next();
});

const User = mongoose.model("User", userModel);
export default User;
