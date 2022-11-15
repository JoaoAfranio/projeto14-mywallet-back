import express from "express";
import cors from "cors";
import db from "../utils/database.js";

import user from "../controllers/User.js";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/login", user.Login);
app.post("/register", user.Register);

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
