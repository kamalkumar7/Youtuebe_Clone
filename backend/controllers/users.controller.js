import { createError } from "../Error.js";
import user from "../models/user.js";
import User from "../models/user.js";
import video from "../models/video.js";


export const update = async (req, res, next) => {

    if (req.params.id === req.curruser.id) {
      try {
        const updatedUser = await User.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        )
        const {password,...everythingElse} = updatedUser._doc; 
        res.status(200).json(everythingElse);
      } catch (err) {
        next(err);
      }
    } else {
      return next(createError(403, "You can update only your account!"));
    }
  };
  
export const deleteUser = async (req,res,next)=>{
    
  if (req.params.id === req.curruser.id) {
    try {
       await User.findByIdAndDelete(req.params.id )

      
      res.status(200).json("User Deleted");
    
    } catch (err) {
      next(err);
    }
  } else {
    return next(createError(403, "You can delete only your account!"));
  }

}




export const getUser = async (req,res,next)=>{

 
    try {
     const founduser =  await User.findById(req.params.id );
     const {password, ...everythingElse} = founduser._doc;
      res.status(200).json(everythingElse);
       
    } 
    catch (err) 
    {
      console.log("user not found");
      next(err);
      
    }
  
}



export const subscribe = async (req,res,next)=>{

  console.log(req.curruser);
  try {

    await User.findByIdAndUpdate((req.curruser.id),{
      $push:{subscribedChannels:req.params.id}
    });
    await User.findByIdAndUpdate((req.params.id),{
      $inc:{subscribers:1}
    })

    res.status(200).json(`subscibed successfully `)
    
  } catch (error) {
    next(err);
  }
    
}
export const unsubscribe =  async(req,res,next)=>{
  try {

    await User.findByIdAndUpdate((req.curruser.id),{
      $pull:{subscribedChannels:req.params.id}
    });
    await User.findByIdAndUpdate((req.curruser.id),{
      $inc:{subscribers:-1}
    })

    res.status(200).json(`unsubscribed successfully `)
    
  } catch (error) {
    next(err);
  }
  
}


export const like = async (req, res, next) => {
  const id = req.curruser.id;

  const videoId = req.params.vID;
  try {
    await video.findByIdAndUpdate(videoId,{
      $addToSet:{likes:id},
      $pull:{dislikes:id}
    })
    res.status(200).json("The video has been liked.")
  } catch (err) {
    next(err);
  }
};

export const dislike = async (req, res, next) => {
    const id = req.curruser.id;
    const videoId = req.params.vID;
    try {
      await video.findByIdAndUpdate(videoId,{
        $addToSet:{dislikes:id},
        $pull:{likes:id}
      })
      res.status(200).json("The video has been disliked.")
  } catch (err) {
    next(err);
  }
};
