const scheduleModel = require("../models/schedule");



module.exports.createSchedule=async(req,res)=>{
let {...data}=req.body;
try{
let schedule=await scheduleModel.create(data)
return res.status(200).json({
    message:"Schedule created successfully",
    scheduleId:schedule._id
})
}catch(e){
    console.log(e.message)
    return res.status(400).json({
        error:"Something went wrong please try again"
    })
}
}

module.exports.getSchedules=async(req,res)=>{
 
    try{
let schedules=await scheduleModel.find({})
let registeredSchedules=await scheduleModel.find({registeredBy:{$eq:req.user._id}})
return res.status(200).json({
    schedules,
    registeredSchedules,
    userId:req.user._id
})
    }catch(e){
        return res.status(400).json({
            error:"Something went wrong please try again"
        })
    }
}

module.exports.getSpecificSchedule=async(req,res)=>{
let {scheduleId}=req.params;
    try{
let schedule=await scheduleModel.findById(scheduleId).populate("registeredBy")
return res.status(200).json({
    schedule
})
}catch(e){
    return res.status(400).json({
        error:"Something went wrong please try again"
    })
}
}

module.exports.volunteerRegister=async(req,res)=>{
   let {scheduleId}=req.params;
   console.log(scheduleId)
    try{
        let userId=req.user._id
        await scheduleModel.findByIdAndUpdate(scheduleId, {
            $addToSet: { registeredBy: userId }
          });
      return res.status(200).json({
        message:"Successfully signed up for the event",
        userId:req.user._id
      })
            }catch(e){
                console.log(e.message)
                return res.status(400).json({
                    error:"Something went wrong please try again"
                })
            }
}

module.exports.removeVolunteerRegister=async(req,res)=>{
    try{
        let {scheduleId}=req.params;
        let userId=req.user._id
       let schedule= await scheduleModel.findByIdAndUpdate(
            scheduleId,
            { $pull: { registeredBy: userId } }, 
            { new: true } 
        );
      return res.status(200).json({
        message:"Successfully removed from the event",
        schedule
      })
            }catch(e){
        console.log(e.message)
                return res.status(400).json({
                    error:"Something went wrong please try again"
                })
            }
}


module.exports.getVolunteerList = async (req, res) => {
    let { scheduleId } = req.params;
    try {
        
        let schedule = await scheduleModel.findById(scheduleId)
            
            console.log(schedule)

        if (!schedule) {
            return res.status(404).json({
                error: "Schedule not found"
            });
        }

        return res.status(200).json({
            schedule
        });
    } catch (e) {
        return res.status(400).json({
            error: "Something went wrong, please try again"
        });
    }
};

module.exports.editSchedule=async(req,res)=>{
    let {...data}=req.body;
    let {scheduleId}=req.params
    try{
await scheduleModel.findByIdAndUpdate(scheduleId,{
    $set:data
})

return res.status(200).json({
    message:"sucessfully updated"
})

    }catch(e){
        return res.status(400).json({
            error:"Something went wrong please try again"
        })
    }
}


module.exports.deleteSchedule=async(req,res)=>{
    let { scheduleId } = req.params;
    try{
let schedule=await scheduleModel.findByIdAndDelete(scheduleId)
return res.status(200).json({
    message:"Schedule deleted successfully"
})
    }catch(e){
        return res.status(400).json({
            error:"Something went wrong please try again"
        })
    }
}


module.exports.sendNotification = async (req, res) => {
    try {
        let userId = req.user._id;

       
        let tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        tomorrow.setHours(0, 0, 0, 0); 

        
        let schedule = await scheduleModel.findOne({
            registeredBy: userId,
            date: { $gte: tomorrow, $lt: new Date(tomorrow.getTime() + 86400000) } 
        });

        if (!schedule) {
            return res.status(404).json({
                message: "No upcoming event found for tomorrow."
            });
        }

        return res.status(200).json({
            message: `Reminder: You have a volunteering event '${schedule.eventName}' tomorrow at ${schedule.date.toLocaleTimeString()}.`,
            userId: req.user._id
        });

    } catch (e) {
        return res.status(400).json({
            error: "Something went wrong, please try again."
        });
    }
};