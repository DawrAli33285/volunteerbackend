const jwt=require('jsonwebtoken')

module.exports.middleware=(req,res,next)=>{
try{
   
    if(req.headers.authorization.startsWith(`Bearer`)){
    let token=req.headers.authorization.split(" ")[1]
    
    let user=jwt.verify(token,process.env.JWT_KEY)
    if(user){
req.user=user.user
next();
    }else{
        return res.status(400).json({
            error:"User not found"
        })
    }
    }else{
        return res.status(400).json({
            error:"Invalid header"
        })
    }
}catch(e){
return res.status(400).json({
    error:"Authentication failed"
})
}
}