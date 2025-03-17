const router=require('express').Router();
const {register,login,loginWithGoogle}=require('../controllers/auth')
router.post('/register',register)
router.post('/login',login)
router.post('/loginWithGoogle',loginWithGoogle)

module.exports=router;