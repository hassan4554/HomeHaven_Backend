import { get_single_listing, update_listing } from "../../services/listing.service.js";
import { catchAsync, successResponse } from "../../utils/api.js";
import { AppError } from "../../utils/appError.js";

const updateListing = catchAsync(async (req, res, next) => {
  const listingId = req.params.id;
  const userId = req.user.id;
  const listing = await get_single_listing({ _id: listingId });

  if (!listing) return next(new AppError("No listing found", 404));

  if (userId !== listing.userRef)
    return next(new AppError("You can only update your own listing", 400));

  const updatedListing = await update_listing({ _id: listingId }, req.body, {
    new: true,
  });
  if (!updatedListing)
    return next(new AppError("Error deleting listing!", 400));

  return successResponse.sendData(res, {
    status: 200,
    message: "Listing updated successfully",
    data: updatedListing,
  });
});

export default updateListing;
