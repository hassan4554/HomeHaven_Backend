import { findUser } from "../../services/auth.services.js";
import { catchAsync, successResponse } from "../../utils/api.js";
import { AppError } from "../../utils/appError.js";

const getUser = catchAsync(async (req, res, next) => {
  const user = await findUser({ _id: req.params.id });
  if (!user) return next(new AppError("No user found", 404));

  const { password: pass, ...rest } = user;

  return successResponse.sendData(res, {
    status: 200,
    message: "User found successfully",
    data: rest,
  });
});

export default getUser;
