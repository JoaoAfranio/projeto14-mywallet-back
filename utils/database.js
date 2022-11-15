import dotenv from "dotenv";
import { MongoClient } from "mongodb";

dotenv.config();

const mongoClient = new MongoClient(process.env.MONGO_URI);

await mongoClient.connect();
const db = await mongoClient.db("mywallet");

export default db;
