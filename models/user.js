const mongoose=require('mongoose')

const userSchema=mongoose.Schema({
    name:{
        type:String,

    },
    email:{
        type:String,
        unique:true,
        required:["Please enter email",true]
    },
    password:{
        type:String,
        required:["Please enter password",true]
    },
    role:{
type:String,
enum:["volunteer","admin"],
default:"volunteer"
    }


})


const userModel=mongoose.model("user",userSchema)
module.exports=userModel