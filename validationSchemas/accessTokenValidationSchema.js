import Joi from "joi";

const regExpPassword = new RegExp(
  /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])[a-zA-Z\d]{8,16}$/
);

export const accessTokenSchema = Joi.object({
  clientId: Joi.string().min(6).max(20).required().messages({
    "string.min": "clientId must be at least 6 characters long",
    "string.max": "clientId must be at most 20 characters long",
    "any.required": "clientId id required",
  }),
  clientSecret: Joi.string().alphanum().min(10).max(40).required().messages({
    "string.min": "clientSecret must be at least 10 characters long",
    "string.max": "clientSecret must be at most 40 characters long",
    "any.required": "clientSecret id required",
  }),
  username: Joi.string().email().required().messages({
    "string.email": "username must be a valid email",
    "any.required": "username is required",
  }),
  password: Joi.string()
    .pattern(regExpPassword, " ")
    .required()
    .messages({
      "string.pattern.name":
        "password must contain: \n" +
        "- At least one lowercase letter\n" +
        "- At least one capital letter\n" +
        "- At least one number\n" +
        "- A length of 8 to 16 characters\n" +
        "- No special characters or whitespace",
      "any.required": "password is required",
    }),
});
