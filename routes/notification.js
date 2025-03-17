const router=require('express').Router();
const {sendNotification}=require('../controllers/schedule')
const {middleware}=require('../middleware/middleware')
router.get('/notifications/send',middleware,sendNotification)

module.exports=router;