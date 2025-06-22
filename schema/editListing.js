import joi from "joi";

export default joi.object({
  name: joi.string(),
  description: joi.string(),
  address: joi.string(),
  type: joi.string(),
  userRef: joi.string(),
  regularPrice: joi.number(),
  discountPrice: joi.number(),
  bathrooms: joi.number(),
  bedrooms: joi.number(),
  furnished: joi.boolean(),
  parking: joi.boolean(),
  offer: joi.boolean(),
  imageUrls: joi.array(),
});
