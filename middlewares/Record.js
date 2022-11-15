import { record as recValidate } from "../utils/validations.js";
import db from "../utils/database.js";
import { ObjectId } from "mongodb";

async function newRecordMidd(req, res, next) {
  const record = req.body;

  const validation = recValidate.validate(record);

  if (validation.error) {
    res.send(validation.error).status(422);
    return;
  }

  try {
    const user = await db.collection("users").findOne({ _id: ObjectId(record.userId) });

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

export default { newRecordMidd };
