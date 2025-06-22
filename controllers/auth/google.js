import jwt from "jsonwebtoken";
import { findOrCreateUser } from "../../services/auth.services.js";
import { catchAsync, successResponse } from "../../utils/api.js";
import { AppError } from "../../utils/appError.js";

const google = catchAsync(async (req, res, next) => {
  const { email, photo, name } = req.body;
  const [user, created] = await findOrCreateUser({
    email,
    username:
      name.split(" ").join("").toLowerCase() +
      Math.random().toString(36).slice(-4),
    password:
      Math.random().toString(36).slice(-8) +
      Math.random().toString(36).slice(-8),
    avatar: photo,
  });

  if (!user) return next(new AppError("Could not sign-in with Google!", 400));

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  const { password: pass, ...rest } = user._doc;

  return successResponse.sendCookieAndData(res, {
    status: 200,
    message: "User found successfully",
    data: rest,
    cookieName: "access-token",
    token,
    options: { httpOnly: true },
  });

  //   const user = await findUser({ email: req.body.email });
  //   if (user) {
  //     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  //     const { password: pass, ...rest } = user._doc;
  //     successResponse.sendCookieAndData(res, {
  //       status: 200,
  //       message: "User found successfully",
  //       data: rest,
  //       cookieName: "access-token",
  //       token,
  //       options: { httpOnly: true },
  //     });
  //   } else {
  //     const generatedPassword =
  //       Math.random().toString(36).slice(-8) +
  //       Math.random().toString(36).slice(-8);
  //     const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
  //     const newUser = new User({
  //       username:
  //         req.body.name.split(" ").join("").toLowerCase() +
  //         Math.random().toString(36).slice(-4),
  //       email: req.body.email,
  //       password: hashedPassword,
  //       avatar: req.body.photo,
  //     });
  //     await newUser.save();
  //     const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
  //     const { password: pass, ...rest } = newUser._doc;
  //     successResponse.sendCookieAndData(res, {
  //       status: 200,
  //       message: "User found successfully",
  //       data: rest,
  //       cookieName: "access-token",
  //       token,
  //       options: { httpOnly: true },
  //     });
  //   }
});

export default google;
