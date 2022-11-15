import db from "../utils/database.js";

async function authMidd(req, res, next) {
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer ", "");

  if (!token) {
    res.sendStatus(401);
    return;
  }

  try {
    const session = await db.collection("sessions").findOne({ token });

    if (!session) {
      return res.sendStatus(401);
    }

    next();
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}

export default { authMidd };
