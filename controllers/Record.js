import db from "../utils/database.js";
import { ObjectId } from "mongodb";

async function register(req, res) {
  const record = req.body;

  try {
    await db.collection("records").insertOne({ ...record, userId: ObjectId(record.userId) });
    res.sendStatus(201);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}

export default { register };
