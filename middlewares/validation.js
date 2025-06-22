import { AppError } from "../utils/appError.js";

export const validateData = (validationSchema, dataType = "body") => {
  return (req, res, next) => {
    // console.log(req[dataType]);
    const { error } = validationSchema.validate(req[dataType], {
      abortEarly: true,
    });

    if (error) return next(new AppError(error.details[0].message, 400));
    next();
  };
};
