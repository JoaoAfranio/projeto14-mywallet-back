import express from "express";
import cors from "cors";
import db from "../utils/database.js";

import userController from "../controllers/User.js";
import userMiddleware from "../middlewares/User.js";

import recordMiddleware from "../middlewares/Record.js";
import recordController from "../controllers/Record.js";

import AuthMiddleware from "../middlewares/Auth.js";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/login", userMiddleware.loginMidd, userController.login);
app.post("/register", userMiddleware.registerMidd, userController.register);

app.post("/record", AuthMiddleware.authMidd, recordMiddleware.newRecordMidd, recordController.register);

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
