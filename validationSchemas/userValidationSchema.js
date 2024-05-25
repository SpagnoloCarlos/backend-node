import Joi from "joi";

const regExpName = new RegExp(/^[a-zA-Z]{2,}(\s[a-zA-Z]{2,})*$/);
const regExpPassword = new RegExp(
  /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])[a-zA-Z\d]{8,16}$/
);

export const userSchema = Joi.object({
  firstName: Joi.string()
    .pattern(regExpName, " ")
    .min(2)
    .max(20)
    .required()
    .messages({
      "string.pattern.name":
        '"firstname" must only contain letters and up to two names',
      "string.min": "firstName must be at least 2 characters long",
      "string.max": "firstName must be at most 20 characters long",
      "any.required": "firstName id required",
    }),
  lastName: Joi.string()
    .pattern(regExpName, " ")
    .min(2)
    .max(20)
    .required()
    .messages({
      "string.pattern.name":
        "lastname must only contain letters and up to two last names",
      "string.min": "lastName must be at least 2 characters long",
      "string.max": "lastName must be at most 20 characters long",
      "any.required": "lastName id required",
    }),
  userName: Joi.string().alphanum().min(3).max(15).required(),
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
  email: Joi.string().email().required().messages({
    "string.email": "email must be a valid email",
    "any.required": "email is required",
  }),
  phone: Joi.number().min(1000000000).max(999999999999).required().messages({
    "number.name": "phone must only contain numbers",
    "number.min": "phone must contain between 10 and 12 characters",
    "number.max": "phone must contain between 10 and 12 characters",
    "any.required": "phone is required",
  }),
});

export const loginSchema = Joi.object({
  userName: Joi.string().alphanum().min(3).max(15).required().messages({
    "string.name": "userName must only contain letters and numbers",
    "string.min": "userName must be at least 3 characters long",
    "string.max": "userName must be at most 15 characters long",
    "any.required": "userName is required",
  }),
  password: Joi.string()
    .pattern(regExpPassword, " ")
    .required()
    .messages({
      "string.pattern.name":
        '"password" must contain: \n' +
        "- At least one lowercase letter\n" +
        "- At least one capital letter\n" +
        "- At least one number\n" +
        "- A length of 8 to 16 characters\n" +
        "- No special characters or whitespace",
      "any.required": "password is required",
    }),
});
