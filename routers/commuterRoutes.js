const express=require('express')
const{register,login}=require('../controllers/commuterController')
const{whistle}=require('../controllers/whistleController')
const router=express.Router()


router.post('/register',register)
router.post('/login',login)
router.post('/whistle',whistle)


module.exports=router