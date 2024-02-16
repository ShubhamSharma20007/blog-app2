const express= require('express')
const route  = express.Router()
const userModel = require('../Models/userModel')
const bcrypt = require('bcryptjs')
const jwt =  require('jsonwebtoken')
route.post('/register',async(req,res)=>{
    try{
        const {name,email,password,password2} = req.body;
        if(!name || !email || !password || !password2){
            return res.status(400).json({success:false,message:"Please fill all the fields"})
        }
        
        const existsEmail = await userModel.findOne({email:email})
        if(existsEmail){
            return res.status(400).json({success:false,message:"Email already exists"})
        }
        if(password!==password2){
            return res.status(400).json({success:false,message:"password is not match"})
        }

        const bcryptPass =  await bcrypt.hash(password,10)
        const model = await userModel.create({name,email,password:bcryptPass})
        await model.save()
       
        return res.status(201).json({success:true,model})
    }
    catch(err){
        return res.status(400).json({success:false,message:err.message})
    }
})

route.post('/login',async(req,res)=>{
    try {
        const {email,password} = req.body;
        if(!email || !password){
            return res.status(400).json({success:false,message:"Please fill all the fields"})
        }
        const model = await userModel.findOne({email:email})
        if(!model){
            return res.status(400).json({success:false,message:"Invalid email or password"})
        }
        const isMatch =  await bcrypt.compare(password,model.password)
        if(!isMatch){
            return res.status(200).json({success:true,message:"Invalid email or password"})
        }

          const option ={
            expiresIn:"1d"
          }  
          const token = await jwt.sign({_id:model._id},process.env.SECRECT_KEY,option)

        return res.status(200).json({success:true,message:"Login Successfully",token})
    } catch (error) {
        return res.status(400).json({success:false,message:error.message})
    }
})

// getUser
route.post('/:id',async(req,res)=>{
    const {id} =  req.params;
    if(!id){
        return res.status(400).json({success:false,message:"Please enter the id"})
    }
    const model  = await userModel.findById(id).select("-password");
    if(!model){
        return res.status(400).json({success:false,message:"Invalid id"})  
    }
    return res.status(201).json({success:true,model})
})


// get all authors
route.get('/',(req,res)=>{
    res.send("Hello from the server side")
})

route.post('/change-avatar',(req,res)=>{
    res.send("Hello from the server side")
})

route.put('/edit-user',(req,res)=>{
    res.send("Hello from the server side")
})


// get author
route.get('/authors',async(req,res)=>{
    const model = await userModel.find().select("-password")
    res.send(model)
})

module.exports = route;