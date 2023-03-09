import {signup,login} from '../controllers/auth.controllers.js'
// import login from '../controllers/auth.controllers.js'

import express from "express";



const router = express.Router();

// Register
router.post('/signup',signup )


// Login
router.post('/login',login )


//Signin using google auth
// router.post('/google', )


export default router;