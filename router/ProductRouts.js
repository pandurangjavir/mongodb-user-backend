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

router.delete('/delete/:id',async(req,res)=>{
    try {
    const id = req.params.id
    await Product.findByIdAndDelete(id)
    res.json({
        status:true,
        message:'Product deleted successfully !'
    })   
        
    } catch (error) {
        res.json({
            status:false,
            message:error
        })
    }
})

router.put('/update/:id',async(req,res)=>{
    try {
        const id = req.params.id
        await Product.findByIdAndUpdate(id,req.body,{'new':true})
        res.json({
            status:true,
            message:'Product updated successfully !'
        }) 
        
    } catch (error) {
        res.json({
            status:false,
            message:error
        }) 
    }
})
module.exports = router