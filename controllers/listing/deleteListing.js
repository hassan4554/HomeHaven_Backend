import {
  delete_listing,
  get_single_listing,
} from "../../services/listing.service.js";
import { catchAsync, successResponse } from "../../utils/api.js";
import { AppError } from "../../utils/appError.js";

const deleteListing = catchAsync(async (req, res, next) => {
  const listingId = req.params.id;
  const userId = req.user.id;
  const listing = await get_single_listing({ _id: listingId });

  if (!listing) return next(new AppError("No listing found", 404));

  if (userId !== listing.userRef)
    return next(new AppError("You can delete only your own listing", 400));

  const deletedListing = await delete_listing(listingId);
  if (!deletedListing)
    return next(new AppError("Error deleting listing!", 400));

  return successResponse.sendData(res, {
    status: 200,
    message: "Listing deleted successfully",
  });
});

export default deleteListing;
