const mongoose=require('mongoose')

let connect=mongoose.connect('mongodb+srv://lemightyeagle:lemightyeagle@cluster0.7b9t5dx.mongodb.net/')

module.exports=connect;