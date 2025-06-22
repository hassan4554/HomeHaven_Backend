import { find_listings } from "../../services/listing.service.js";
import { catchAsync, successResponse } from "../../utils/api.js";
import { AppError } from "../../utils/appError.js";

const getUserListings = catchAsync(async (req, res, next) => {
  if (req.user.id !== req.params.id)
    return next(new AppError("You can only see your own listings!", 400));

  const listings = await find_listings({ userRef: req.params.id });

  if (!listings) return next(new AppError("No listing found!", 404));

  return successResponse.sendData(res, {
    status: 200,
    message: "Listings found successfully",
    data: listings,
  });
});

export default getUserListings;
