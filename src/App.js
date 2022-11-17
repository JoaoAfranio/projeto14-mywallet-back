import express from "express";
import cors from "cors";

import { login, insertUser, deleteSession } from "../controllers/userController.js";
import { validateInsertUser, validateLogin } from "../middlewares/userMiddleware.js";

import { validateRecord } from "../middlewares/recordMiddleware.js";
import { insertRecord, findAllRecordsByID } from "../controllers/recordController.js";

import { authenticationToken } from "../middlewares/authenticationMiddleware.js";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/login", validateLogin, login);
app.post("/register", validateInsertUser, insertUser);
app.post("/logout", deleteSession);

app.post("/record", authenticationToken, validateRecord, insertRecord);
app.get("/record", authenticationToken, findAllRecordsByID);

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
