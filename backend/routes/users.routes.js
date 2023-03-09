import  { deleteUser, dislike, getUser, like, subscribe, unsubscribe, updateUser } from '../controllers/users.controller.js'


import express from "express";


const router = express.Router();


// update user info
router.put(":/update/:id",updateUser)




// delete user info
router.delete(":/delete/:id",deleteUser)


// get a user
router.get("/:id",getUser)

//subscribing a user (channel)
router.put("/sub/:id",subscribe)



//unsubscribing a user (channel)
router.put("/unsubsub/:id",unsubscribe)




//like a video
router.put("/like/:id",like)


// dislike video
router.put("/dislike/:id",dislike);


export default router;