import  { deleteUser, dislike, getUser, like, subscribe, unsubscribe, update } from '../controllers/users.controller.js'


import express from "express";

import { verifyToken } from "../verifyToken.js";


const router = express.Router();


// // update user info
router.put("/update/:id", verifyToken, update);




// // delete user info
router.delete("/delete/:id",verifyToken,deleteUser)


// // get a user
router.get("/find/:id",getUser)



// //subscribing a user (channel)
router.put("/sub/:id",verifyToken,subscribe)



// //unsubscribing a user (channel)
router.put("/unsub/:id",verifyToken ,unsubscribe)




// //like a video
router.put("/like/:id",like)


// // dislike video
router.put("/dislike/:id",dislike);


export default router;