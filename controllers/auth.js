const userModel = require("../models/user");
const bycrypt=require('bcrypt')
const jwt=require('jsonwebtoken')

module.exports.login=async(req,res)=>{
    let {...data}=req.body;
  
    try{
let userEmail=await userModel.findOne({email:data.email})
if(userEmail){
let passwordMatch=await bycrypt.compare(data.password,userEmail.password)

if(passwordMatch){
let userToken=await jwt.sign({user:userEmail},process.env.JWT_KEY)
return res.status(200).json({
    user:userEmail,
    token:userToken
})
}else{
    return res.status(400).json({
        error:"Invalid password"
    })
}
}else{
    return res.status(400).json({
        error:"Invalid email"
    })
}
    }catch(e){
        console.log(e.message)
return res.status(400).json({
    error:"Something went wrong please try again"
})
    }
}

module.exports.loginWithGoogle=async(req,res)=>{
    let {email}=req.body;
    try{
let userFound=await userModel.findOne({email})
if(!userFound){
return res.status(400).json({
    error:"User not found"
})
}
let userToken=await jwt.sign({user:userFound},process.env.JWT_KEY)
return res.status(200).json({
    user:userFound,
    token:userToken
})
    }catch(e){
        return res.status(400).json({
            error:"Something went wrong please try again"
        })
    }
}

module.exports.register=async(req,res)=>{
    let {...data}=req.body;
    try{
let alreadyExists=await userModel.findOne({email:data.email})
if(alreadyExists){
    return res.status(400).json({
        error:"Email is already taken"
    })
}

        let hashedPassword=await bycrypt.hash(data.password,10)
        data={
            ...data,
            password:hashedPassword
        }
await userModel.create(data)
return res.status(200).json({
    message:"User registered successfully"
})
    }catch(e){
        console.log(e.message)
        return res.status(400).json({
            error:"Something went wrong please try again"
        })
    }
}

module.exports.getUser=async(req,res)=>{
    let {userId}=req.params;
    try{
let user=await userModel.findById(userId)
return res.status(200).json({
    user
})
    }catch(e){
return res.status(400).json({
    error:"Something went wrong please try again"
})
    }

}

