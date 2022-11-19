import express from "express";
import cors from "cors";

import userRouter from "../routes/userRouter.js";
import recordRouter from "../routes/recordRouter.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use(userRouter);
app.use(recordRouter);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
