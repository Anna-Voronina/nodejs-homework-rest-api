const Joi = require("joi");

const { subscriptionList } = require("../constants/user-constants");

const userSignUpSchema = Joi.object({
  email: Joi.string().required().messages({
    "any.required": "missing required email field",
  }),
  password: Joi.string().required().messages({
    "any.required": "missing required password field",
  }),
  subscription: Joi.string()
    .valid(...subscriptionList)
    .messages({
      "any.only":
        "Subscription can only be of the following types: starter, pro and business",
    }),
});

const userSignInSchema = Joi.object({
  email: Joi.string().required().messages({
    "any.required": "missing required email field",
  }),
  password: Joi.string().required().messages({
    "any.required": "missing required password field",
  }),
});

module.exports = {
  userSignUpSchema,
  userSignInSchema,
};
