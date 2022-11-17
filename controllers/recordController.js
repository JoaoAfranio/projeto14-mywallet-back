import db from "../utils/database.js";
import { ObjectId } from "mongodb";

async function insertRecord(req, res) {
  const record = req.body;

  try {
    await db.collection("records").insertOne({ ...record, userId: ObjectId(record.userId) });
    res.sendStatus(201);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}

async function findAllRecordsByID(req, res) {
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer ", "");

  const user = await db.collection("sessions").findOne({ token });

  if (!user.userId) {
    res.sendStatus(401);
    return;
  }

  try {
    const allRecords = await db
      .collection("records")
      .find({ userId: ObjectId(user.userId) })
      .toArray();
    res.status(200).send(allRecords);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}

export { insertRecord, findAllRecordsByID };
