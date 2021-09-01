import Joi from "joi";
import mongoose from "mongoose";

const type = {
  email: Joi.string()
    .lowercase()
    .email({ minDomainSegments: 2 })
    .message("Please enter a valid email address"),
  firstName: Joi.string()
    .min(3)
    .message("first name must contain atlist 3 char"),
  lastName: Joi.string()
    .min(3)
    .message("Last name must contain atlist 3 char"),
  userName: Joi.string().required().min(3).message("userName required!"),
  id: Joi.string()
    .required()
    .custom((value, helper) => {
      if (mongoose.Types.ObjectId.isValid(value)) { return true }
      else { return helper.message("Need a valid Id") }
    }),
};

export const schemas = {
  blogId: Joi.object().keys({
    id: type.id
  }),
  blogFormData: Joi.object().keys({
    userName: type.userName,
    email: type.email,
    firstName: type.firstName,
    lastName: type.lastName
  })
};
