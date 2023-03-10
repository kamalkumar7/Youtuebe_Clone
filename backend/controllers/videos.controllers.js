import express from 'express'
import { createError } from '../Error.js';
import video from '../models/video.js';
export const addVideo = async(req,res,next)=>{
    const newVideo = new video({userId:req.curruser.id,...req.body});

    try {
    const savedVIdeo = await newVideo.save();    
    res.status(200).json(savedVIdeo);
    } catch (error) {
        
    }
}


export const updateVideo = async(req,res,next)=>{
    try {
        const foundvideo = await video.findById(req.params.id)
        if(!foundvideo) return next(createError(404,"Video not found"));

        if(req.curruser.id == foundvideo.userId )
        {
            const updateVideo = await video.findByIdAndUpdate(req.params.id,{
                $set:req.body
            },{
                new:true
            })
        }else{
            return next(createError(403,"You can only update your video"))
        }

        res.status(200).json(updateVideo)
    } catch (error) {
        next(error)
    }
}

export const deleteVideo = async(req,res,next)=>{

    try {
        const foundvideo = await video.findById(req.params.id)

        if(!foundvideo) return next(createError(404,"Video not found"));

        if(req.curruser.id == foundvideo.userId )
        {
            await video.findByIdAndDelete(req.params.id)

        }else{
            return next(createError(403,"You can only delete your video"))
        }

        res.status(200).json("video deleted")
    } catch (error) {
        next(error);
    }

}


export const getVideo = async(req,res,next)=>{
    try {
        const foundvideo = await video.findById(req.params.id);
        if(!foundvideo) res.status(404,"Video not found");
        res.status(200).json(foundvideo);
    } catch (error) {
        next(error)
    }
}



export const addview = async(req,res,next)=>{
    try {
        const foundvideo = await video.findById(req.params.id);
        if(!foundvideo) res.status(404,"Video not found");
        
        await video.findByIdAndUpdate(req.params.id,{
            $inc:{views:1}
        })

        res.status(200).json("Increased view");

    } catch (error) {
        next(error)
    }
}



export const random = async(req,res,next)=>{
    try {
        const foundvideos = await video.aggregate([{$sample:{size:40}}]);
        res.status(200).json(foundvideos);
    } catch (error) {
        next(error)
    }
}


export const trend = async(req,res,next)=>{
    try {
        const foundvideo = await video.findById(req.params.id);
        if(!foundvideo) res.status(404,"Video not found");
        res.status(200).json(foundvideo);
    } catch (error) {
        next(error)
    }
}

export const sub = async(req,res,next)=>{
    try {
        const foundvideo = await video.findById(req.params.id);
        if(!foundvideo) res.status(404,"Video not found");
        res.status(200).json(foundvideo);
    } catch (error) {
        next(error)
    }
}