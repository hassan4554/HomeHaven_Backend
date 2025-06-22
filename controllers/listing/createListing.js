import { create_listing } from "../../services/listing.service.js";
import { catchAsync, successResponse } from "../../utils/api.js";
import { AppError } from "../../utils/appError.js";

const createListing = catchAsync(async (req, res, next) => {
  const listingData = req.body;

  const listing = await create_listing(listingData);
  if (!listing) return next(new AppError("Error creating listing!", 400));

  return successResponse.sendData(res, {
    status: 200,
    message: "Listing created successfully",
    data: listing,
  });
});

export default createListing;
