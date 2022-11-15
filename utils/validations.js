import Joi from "joi";

const login = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().alphanum().required(),
});

const register = Joi.object({
  name: Joi.string().alphanum().required(),
  email: Joi.string().email().required(),
  password: Joi.string().alphanum().required(),
  confirmPassword: Joi.string().valid(Joi.ref("password")).required(),
});

const record = Joi.object({
  description: Joi.string().alphanum().required(),
  value: Joi.string().alphanum().required(),
  date: Joi.string().alphanum(),
  type: Joi.string().valid("input", "output").required(),
});

export { login, register, record };