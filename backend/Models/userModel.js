const mongoose = require('mongoose')
const validator = require('validator')
const userSchema =  new mongoose.Schema({
    name :{
        type:String,
        required :true
    },
    email :{
        type:String,
        required :true,
        validate: {
           validator: function(value){
            return validator.isEmail(value)
           },
           message:'Please enter the valid email'
        }
      
    },
    password :{
        type:String,
        required :true
    },
    avatar :{
        type:String,
       
    },
    posts :{
        type:Number,
        default :0
    }
    
},{timestamps:true})

const userModel = mongoose.model('User',userSchema)

module.exports = userModel