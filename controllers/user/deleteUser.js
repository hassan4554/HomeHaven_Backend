import { delete_User } from "../../services/auth.services.js";
import { catchAsync, successResponse } from "../../utils/api.js";
import { AppError } from "../../utils/appError.js";

const deleteUser = catchAsync(async (req, res, next) => {
  if (req.user.id !== req.params.id)
    return next(new AppError("You can only delete your own account!", 400));

  const isUserDelete = await delete_User(req.user.id);
  if (!isUserDelete) return next(new AppError("Error deleting user", 400));

  return successResponse.sendData(res, {
    status: 200,
    message: "User deleted successfully",
  });
});

export default deleteUser;
