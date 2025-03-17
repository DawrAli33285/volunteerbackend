const router=require('express').Router();
const {getUser}=require('../controllers/auth')
const {middleware}=require('../middleware/middleware')
router.get('/users/:userId',middleware,getUser)
module.exports=router;