import { get_single_listing } from "../../services/listing.service.js";
import { catchAsync, successResponse } from "../../utils/api.js";
import { AppError } from "../../utils/appError.js";

const getListing = catchAsync(async (req, res, next) => {
  const listingId = req.params.id;
  const listing = await get_single_listing({ _id: listingId });

  if (!listing) return next(new AppError("No listing found", 404));

  return successResponse.sendData(res, {
    status: 200,
    message: "Listing found successfully",
    data: listing,
  });
});

export default getListing;
