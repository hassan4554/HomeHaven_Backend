import { update_user } from "../../services/auth.services.js";
import { catchAsync, successResponse } from "../../utils/api.js";
import { AppError } from "../../utils/appError.js";

const updateUser = catchAsync(async (req, res, next) => {
  if (req.user.id !== req.params.id)
    return next(new AppError("You can only update your own account!", 400));

  const updatedUser = await update_user(
    req.params.id,
    {
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      avatar: req.body.avatar,
    },
    { new: true }
  );

  if (!updatedUser) return next(new AppError("Error updating user", 400));

  const { password, ...rest } = updatedUser._doc;

  return successResponse.sendData(res, {
    data: rest,
    status: 200,
    message: "User updated successfully",
  });
});

export default updateUser;
