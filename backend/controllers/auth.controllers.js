import mongoose  from "mongoose";
import User from "../models/user.js";
import bcrypt from 'bcryptjs'
import { createError } from "../Error.js";
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config();



export const signup = async (req, res, next) => {
    try {
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(req.body.password, salt);
      const newUser = new User({ ...req.body, password: hash });
  
      await newUser.save();
      res.status(200).send("User has been created!");
    } catch (err) {
      next(err);
    }
  };



  export const login = async (req, res, next) => {

    try {
        const founduser  = await User.findOne({name:req.body.name})
        if(!founduser)
        {
            return next(createError(404, "User not found"));
        }

        if ( await bcrypt.compare(req.body.password,founduser.password))
        {

            const token = jwt.sign({id:founduser._id},process.env.JWTsecret);

            const {password,...everythingElse} = founduser._doc; 

            res.cookie("access_token",token,{
                httpOnly :true
            }).status(200).json(everythingElse);

        }else{
            res.status(404).json("user not found");
        }
    } catch (error) {
        next(error)
    }
  };

export const google= async(req,res,next) =>{

}

