const mongoose=require('mongoose')

let connect=mongoose.connect(`mongodb://127.0.0.1/volunteer`)
module.exports=connect;