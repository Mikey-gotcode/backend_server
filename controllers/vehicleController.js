const Vehicle=require('../models/Vehicle')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
//const router=require('express').Router

// const {check, validationResult}=require('express-validator')
let vehicleID=null
exports.register=async (req,res)=>{
    console.log("received vehicle information",req.body)
    const {vehicleNo,companyName,vehicleRegistrationNumber,routes,fareRanges,docks,password}=req.body
    const {to,fro}=routes
    try {
        const hashedPassword=await bcrypt.hash(password,10)
        const newVehicle=new Vehicle({vehicleNo,companyName,vehicleRegistrationNumber,routes:{to,fro},fareRanges,docks,password:hashedPassword})
        const savedVehicle=await newVehicle.save()

        console.log("saved vehicle:",savedVehicle)
       if(savedVehicle) return res.status(200).json(savedVehicle)
    } catch (error) {
        res.status(500).json({error:error.message})
        
    }
}

exports.login=async (req,res)=>{
    console.log("received login information",req.body)
    const {vehicleRegistrationNumber,password}=req.body
    try {
        const vehicle=await Vehicle.findOne({vehicleRegistrationNumber})
        console.log(vehicle)
        vehicleID=vehicle._id
        if(!vehicle) return res.status(400).json({message:"vehicle not found"})
        const isMatch=await bcrypt.compare(password,vehicle.password)
    if(!isMatch)return res.status(400).json({message:"invalid credentials"})
    const token=jwt.sign({id:vehicle._id},process.env.JWT_SECRET,{expiresIn:"1h"})

     return res.status(200).json({token,vehicle})
 
    } catch (error) {
        res.status(500).json({error:error.message})
    }
   
}

exports.searchVehicle=async(req,res)=>{
    const {vehicleNo}=req.body
    try {
        const searchResult=await Vehicle.findOne({vehicleNo})
if(!searchResult)return res.status(400).json({message:"vehicle not found"})
return res.status(200).json(searchResult)
    } catch (error) {
        
    }
}
exports.getVehicleID = () => vehicleID;

