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
  userId: Joi.string().alphanum().required(),
  description: Joi.string().required(),
  value: Joi.number().required(),
  date: Joi.string().required(),
  type: Joi.string().valid("input", "output").required(),
});

export { login, register, record };
