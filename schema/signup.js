import Joi from "joi";

const schema = Joi.object({
  username: Joi.string()
    .min(3)
    .max(30)
    .required()
    .custom((value, helpers) => {
      if (!/^[a-z0-9_.]+$/.test(value)) {
        return helpers.error("any.invalid", {
          message:
            "Username can only contain lowercase letters, numbers, dots, and underscores",
        });
      }
      if (/^[._]/.test(value)) {
        return helpers.error("any.invalid", {
          message: "Username cannot start with a dot or underscore",
        });
      }
      if (!/[a-z]/.test(value)) {
        return helpers.error("any.invalid", {
          message: "Username must include at least one lowercase letter",
        });
      }
      return value;
    })
    .messages({
      "string.min": "Username must be at least 3 characters long",
      "any.required": "Username is required",
      "any.invalid": "{{#message}}", // Custom messages from the validation logic
    }),
  email: Joi.string().email().required().messages({
    "string.email": "Email must be a valid email address",
    "any.required": "Email is required",
  }),
  password: Joi.string()
    .min(8)
    .max(50)
    .required()
    .custom((value, helpers) => {
      if (!/[a-z]/.test(value))
        return helpers.error("any.invalid", {
          message: "Password must include at least one lowercase letter",
        });
      if (!/[A-Z]/.test(value))
        return helpers.error("any.invalid", {
          message: "Password must include at least one uppercase letter",
        });
      if (!/\d/.test(value))
        return helpers.error("any.invalid", {
          message: "Password must include at least one digit",
        });
      if (!/[@$!%*,?&]/.test(value))
        return helpers.error("any.invalid", {
          message: "Password must include at least one special character",
        });

      return value;
    })
    .messages({
      "string.min": "Password must be at least 8 characters long",
      "any.required": "Password is required",
      "any.invalid": "{{#message}}",
    }),
});

export default schema;
