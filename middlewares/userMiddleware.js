import { register, login } from "../utils/validations.js";
import db from "../utils/database.js";

async function validateInsertUser(req, res, next) {
  const user = req.body;

  const validation = register.validate(user);

  if (validation.error) {
    res.send(validation.error).status(422);
    return;
  }

  try {
    const userExists = await db.collection("users").findOne({ email: user.email });

    if (userExists) {
      res.status(409).send({ message: "Usuário já existe" });
      return;
    }

    next();
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}

async function validateLogin(req, res, next) {
  const { email, password } = req.body;

  const validation = login.validate({ email, password });

  if (validation.error) {
    res.sendStatus(422);
    return;
  }

  try {
    const user = await db.collection("users").findOne({ email });

    if (!user) {
      res.status(404).send({ message: "Email não cadastrado" });
      return;
    }

    next();
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}

export { validateInsertUser, validateLogin };
