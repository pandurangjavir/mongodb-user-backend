const express = require('express')
const cors = require('cors')
const bodyParser=require('body-parser')
const mongoose = require('mongoose')
const User =require('./models/User')
const ProductRoutes= require('./router/ProductRouts')
const server = express()
server.use(cors())
server.use(bodyParser.json())
server.use('/product',ProductRoutes)

// Connecting to mongoDB

mongoose.connect('mongodb+srv://pandurang:Pandurang%40123@cluster0.1lolz1y.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0').
then(()=>console.log('Database Connected..')).
catch((err)=>console.log(err))

server.post('/register',async(req,res)=>{
    try {
        const {fullname,username,age,password}=req.body
        const userObj = new User({fullname,username,age,password})
        const userExist = await User.findOne({username})
        if (userExist) {
             return res.json({
                status:false,
                message:'USer already EXISTS !!' 
            })            
        }
        await userObj.save()
        res.json({
             status:true,
            message:'USer registerd Successfully !!'
        })
        
    } catch (error) {
        res.json({
            status:false,
            message:`Error : ${error}`

        })
    }
})

server.post('/login',async(req,res)=>{
    try {
        const {username,password}=req.body
        const userExist = await User.findOne({username})
        if (!userExist) {
             return res.json({
                status:false,
                message:'User not Found  !!' 
            })            
        }
        if (password!==userExist.password) {
            res.json({
                status:false,
               message:'Incorrect Password X  X'
           }) 
        }
        res.json({
             status:true,
            message:'Login SuccessFully !!'
        })
        
    } catch (error) {
        res.json({
            status:false,
            message:`Error : ${error}`

        })
    }
})

server.listen(8085,()=>{
    console.log('Sever is listrning on PORT 8085 .....')
})