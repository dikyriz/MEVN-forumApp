import express from "express";
import { authMiddleware, permisionUser } from "../middleware/authMiddleware.js";
import {addAnswer} from "../controllers/answerController.js";

const router = express.Router();

//create document
// post /api/v1/answer
router.post("/:idQuestion", authMiddleware, addAnswer);


export default router;
