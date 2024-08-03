import { db } from "../lib/db";
import { Request, Response } from 'express';

export const CreateUser = async (req:Request, res:Response) => {

    try {

        const {username, email} = await req.body

        if (!username || !email){
            res.status(400).json({message:"username and email are required. please try again with these values added"})
        }
        


        
    } catch (error:any) {
    console.log(error.message)
    res.status(500).json({message: 'Internal Server Error'})
    }


}