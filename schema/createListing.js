import joi from "joi";

export default joi.object({
  name: joi.string().required(),
  description: joi.string().required(),
  address: joi.string().required(),
  type: joi.string().required(),
  userRef: joi.string().required(),
  regularPrice: joi.number().required(),
  discountPrice: joi.number().required(),
  bathrooms: joi.number().required(),
  bedrooms: joi.number().required(),
  furnished: joi.boolean().required(),
  parking: joi.boolean().required(),
  offer: joi.boolean().required(),
  imageUrls: joi.array().required(),
});
