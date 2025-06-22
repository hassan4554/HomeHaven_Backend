import Listing from "../models/listing.js";

export const create_listing = (createParams) => {
  return Listing.create(createParams);
};

export const find_listings = (findParams, options = {}) => {
  return Listing.find(findParams, options);
};

export const delete_listing = (id) => {
  return Listing.findByIdAndDelete(id);
};

export const get_single_listing = (findParams, options = {}) => {
  return Listing.findOne(findParams, options);
};

export const update_listing = (findParams, updateParams, options = {}) => {
  return Listing.findOneAndUpdate(findParams, updateParams, options);
};
