const express=require('express')
const {register,login,searchVehicle}=require('../controllers/vehicleController')
const router=express.Router()

router.post('/register',register)
router.post('/login',login)
router.post('/searchVehicle',searchVehicle)

module.exports=router