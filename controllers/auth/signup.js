import { findOrCreateUser } from "../../services/auth.services.js";
import { catchAsync, successResponse } from "../../utils/api.js";
import { AppError } from "../../utils/appError.js";

const signup = catchAsync(async (req, res, next) => {
  const userData = req.body;

  const [user, created] = await findOrCreateUser(userData);

  if (!user) return next(new AppError("Error creating user!", 400));
  if (!created) return next(new AppError("User already exists!", 400));

  return successResponse.sendData(res, {
    status: 200,
    message: "User created successfully",
    data: user,
  });
});

export default signup;
