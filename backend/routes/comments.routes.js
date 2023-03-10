import express from "express";
import { addComment, deleteComment, getComments } from '../controllers/comment.controller.js'
import { verifyToken } from "../verifyToken.js";
const router = express.Router();

router.get("/:videoID",verifyToken,getComments);
router.post("/",verifyToken,addComment);
router.delete("/:id",verifyToken,deleteComment);


export default router;