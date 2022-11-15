import { register, login } from "../utils/validations.js";
import db from "../utils/database.js";

async function registerMidd(req, res, next) {
  const user = req.body;

  const validation = register.validate(user);

  if (validation.error) {
    res.sendStatus(422);
    return;
  }

  try {
    const userExists = await db.collection("users").findOne({ email: user.email });

    if (userExists) {
      res.sendStatus(409);
      return;
    }

    next();
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}

async function loginMidd(req, res, next) {
  const { email, password } = req.body;

  const validation = login.validate({ email, password });

  if (validation.error) {
    res.sendStatus(422);
    return;
  }

  try {
    const user = await db.collection("users").findOne({ email });

    if (!user) {
      res.sendStatus(404);
      return;
    }

    next();
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}

export default { registerMidd, loginMidd };