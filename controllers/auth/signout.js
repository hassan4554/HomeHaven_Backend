import { catchAsync, successResponse } from "../../utils/api.js";

const signout = catchAsync(async (req, res, next) => {
  res.clearCookie("access-token");

  return successResponse.sendData(res, {
    status: 200,
    message: "User signout successfully",
  });
});

export default signout;
