import express from 'express';
import jwt from "jsonwebtoken";
import { JWT_SECRET } from '@repo/backend-common/config';
import { middleware } from './middleware';
import {CreateUserSchema,SigninSchema,CreateRoomSchema} from "@repo/common/types";
const app= express();
import {prismaClient} from "@repo/db/client";

app.post("/signup", async (req,res)=>{
    const parsedData = CreateUserSchema.safeParse(req.body);
    if(!parsedData.success){
         res.json({
            message:"incorrect Iputs"
        })

        return;

    }
    try{
        await prismaClient.user.create({
            data:{
                email:parsedData.data?.username,
                password:parsedData.data.password,
                name:parsedData.data.username
    
            }
            
    
        })

        res.json({
            userId:123
        })
    
    }
    catch(e){
        res.status(411).json({
            message:"User already Exists with this Username"
        })

    }
    

    

})

app.post("/signin",(req,res)=>{
    const data = SigninSchema.safeParse(req.body);
    if(!data.success){
         res.json({
            message:"incorrect Iputs"
        })

        return;

    }



    const userId =1;
    const token = jwt.sign({
        userId
    },JWT_SECRET)

    res.json({
        token
    })


})


app.post("/room",middleware,(req,res)=>{
    const data = CreateRoomSchema.safeParse(req.body);
    if(!data.success){
         res.json({
            message:"incorrect Iputs"
        })

        return;

    }
    // db call to create a room

    res.json({
        roomId:123
    })

})



app.listen(3001);
