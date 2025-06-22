import { find_listings } from "../../services/listing.service.js";
import { catchAsync, successResponse } from "../../utils/api.js";
import { AppError } from "../../utils/appError.js";

const searchListings = catchAsync(async (req, res, next) => {
  const {
    limit = 9,
    startIndex = 0,
    searchTerm = "",
    order = "desc",
    sort = "createdAt",
    ...restFilters
  } = req.query;

  const newFilters = Object.fromEntries(
    Object.entries(restFilters).filter(([key, value]) => {
      return value && value !== "false" && value !== "all";
    })
  );

  const listings = await find_listings({
    name: { $regex: searchTerm, $options: "i" },
    ...newFilters,
  })
    .sort({ [sort]: order })
    .limit(limit)
    .skip(startIndex);

  if (!listings.length) return next(new AppError("No listing found", 404));

  return successResponse.sendData(res, {
    status: 200,
    message: "Listing found successfully",
    data: listings,
  });
});

export default searchListings;
