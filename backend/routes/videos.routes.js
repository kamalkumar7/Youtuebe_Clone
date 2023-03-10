
import express from "express";
import  {verifyToken}  from '../verifyToken.js'
import { addVideo,getVideo,updateVideo,deleteVideo, addview ,random, sub} from "../controllers/videos.controllers.js";


const router = express.Router();

router.get("/find/:id",getVideo)
router.post("/",verifyToken,addVideo)
router.put("/:id",verifyToken,updateVideo)
router.delete("/:id",verifyToken,deleteVideo);
router.put("/view/:id",addview);
router.delete("/trend",);
router.delete("/random",verifyToken,random);
router.get("/sub",verifyToken,sub)

export default router;