import jwt from "jsonwebtoken";
import { findUser } from "../../services/auth.services.js";
import { catchAsync, successResponse } from "../../utils/api.js";
import { AppError } from "../../utils/appError.js";
import { validatePassword } from "../../utils/bcrypt.js";

const signin = catchAsync(async (req, res, next) => {
  const userData = req.body;

  const user = await findUser({ email: userData.email });
  if (!user) return next(new AppError("No user found!", 404));

  const validUser = validatePassword(user.password, userData.password);
  if (!validUser) return next(new AppError("Incorrect credentials!", 400));

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  const { password: pass, ...rest } = user._doc;
  const data = {
    data: rest,
    tokens: {
      accessToken: token
    }
  }

  return successResponse.sendData(res, {
    status: 200,
    message: "User found successfully",
    data,
  });
});

export default signin;
