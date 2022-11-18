import { Router } from "express";
import { validateRecord } from "../middlewares/recordMiddleware.js";
import { insertRecord, findAllRecordsByID } from "../controllers/recordController.js";

import { authenticationToken } from "../middlewares/authenticationMiddleware.js";

const router = Router();

router.post("/record", authenticationToken, validateRecord, insertRecord);
router.get("/record", authenticationToken, findAllRecordsByID);

export default router;
