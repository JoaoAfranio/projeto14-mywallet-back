import { record as recValidate } from "../utils/validations.js";

async function validateRecord(req, res, next) {
  const record = req.body;

  const validation = recValidate.validate(record);

  if (validation.error) {
    res.send(validation.error).status(422);
    return;
  }

  next();
}

export { validateRecord };
