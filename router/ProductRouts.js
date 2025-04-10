const express =require('express')
const Product = require('../models/Product')
const router = express.Router()

router.post('/add',async(req,res)=>{
    try {
        const { productName,productPrice,productUnit,productDescription}=req.body
        const productExist = await Product.findOne({productName})
        if (productExist) {
             return res.json({
                status:false,
                message:'Product already EXISTS !!' 
            })            
        }
        const productObj = new Product({productName,productPrice,productUnit,productDescription})
        await productObj.save()
        res.json({
             status:true,
            message:'Product added Successfully !!'
        })
        
    } catch (error) {
        res.json({
            status:false,
            message:`Error : ${error}`

        })
    }
})

router.get('/get',async(req,res)=>{
    try {
       const results = await Product.find()
       res.json({
        status:true,
        message:results
       })
        
    } catch (error) {
        res.json({
            status:false,
            message:`Error : ${error}`

        })
    }
})

module.exports = router