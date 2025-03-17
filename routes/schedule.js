const router=require('express').Router();
const {middleware}=require('../middleware/middleware')
const {createSchedule,removeVolunteerRegister,editSchedule,getSpecificSchedule,getSchedules,deleteSchedule,getVolunteerList,volunteerRegister}=require('../controllers/schedule')
router.post('/schedules',middleware,createSchedule)
router.get('/schedules',middleware,getSchedules)
router.patch('/schedules/:scheduleId/signup',middleware,volunteerRegister)
router.patch('/schedules/:scheduleId/remove',middleware,removeVolunteerRegister)
router.get('/schedules/:scheduleId/volunteers',middleware,getVolunteerList)
router.patch('/schedules/:scheduleId',middleware,editSchedule)
router.delete('/schedules/:scheduleId',middleware,deleteSchedule)
router.get('/schedules/:scheduleId',middleware,getSpecificSchedule)
module.exports=router;