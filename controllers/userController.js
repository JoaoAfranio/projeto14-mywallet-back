import db from "../utils/database.js";
import bcrypt from "bcrypt";
import { v4 as uuidV4 } from "uuid";

async function login(req, res) {
  const { email, password } = req.body;

  const user = await db.collection("users").findOne({ email });

  if (user && bcrypt.compareSync(password, user.password)) {
    const token = uuidV4();

    await db.collection("sessions").deleteOne({ userId: user._id });

    await db.collection("sessions").insertOne({ userId: user._id, token });

    delete user.password;

    res.send({ ...user, token });
    return;
  } else {
    res.status(401).send({ message: "Email ou senha incorreta" });
    return;
  }
}

async function insertUser(req, res) {
  const user = req.body;

  const passwordhash = bcrypt.hashSync(user.password, 10);

  delete user.confirmPassword;

  try {
    await db.collection("users").insertOne({ ...user, password: passwordhash });
    res.sendStatus(201);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}

async function deleteSession(req, res) {
  const session = res.session;

  try {
    await db.collection("sessions").deleteOne({ userId: session.userId });
    res.sendStatus(200);
    return;
  } catch (err) {
    console.log(err);
    res.sendStatus(404);
    return;
  }
}

export { login, insertUser, deleteSession };
