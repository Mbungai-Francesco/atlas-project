import { db } from "../lib/db";
import { Request, Response } from 'express';

export const CreateUser = async (req:Request, res:Response) => {

    try {

        const {username, email} = await req.body

        if (!username || !email){
            res.status(400).json({message:"username and email are required. please try again with these values added"})
        }

        const createuser = await db.user.create({
            data:{
                username,
                email
            }
        })

        if(!createuser){
            res.status(400).json({message:"user not created"})
        }

        res.status(201).json({message:"user created successfully", data:createuser})


    } catch (error:any) {
    console.log(error.message)
    res.status(500).json({message: 'Internal Server Error'})
    }


}

export const GetUsers = async (req:Request, res:Response) => {
    try {

        const getusers = await db.user.findMany()

        if(!getusers){
            res.status(400).json({message:"users not found"})
        }
        res.status(200).json({message:"users found", data:getusers})
        
    } catch (error:any) {
        console.log(error.message)
        res.status(500).json({message:"internal server error"})
        
    }
}