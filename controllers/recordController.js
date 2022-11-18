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
  const session = res.session;

  try {
    const allRecords = await db
      .collection("records")
      .find({ userId: ObjectId(session.userId) })
      .toArray();
    res.status(200).send(allRecords);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}

export { insertRecord, findAllRecordsByID };
