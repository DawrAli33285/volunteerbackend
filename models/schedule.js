const mongoose=require('mongoose')
const scheduleSchema=mongoose.Schema({
    eventName:{
        type:String,
        required:["Please enter event name",true]
    },
    date:{
        type:Date,
        required:["Please enter date",true]
    },
   registeredBy:[
    {
type:mongoose.Schema.ObjectId,
ref:'user'
    }
   ],
    location:{
        type:String,
        required:["Please enter location",true]
    },
    maxVolunteers:{
        type:String,
        required:["Please enter max volunteers",true]
    }
})

const scheduleModel=mongoose.model("schedule",scheduleSchema)

module.exports=scheduleModel;