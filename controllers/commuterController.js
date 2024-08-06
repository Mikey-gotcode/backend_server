//const mongoose=require('mongoose')
const Commuter=require('../models/Commuter')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const Vehicle=require('../models/Vehicle')
const remoteDB='mongodb+srv://spidungu_barbosa:Mw@ng!X18@ma3cluster.x9epetw.mongodb.net/?retryWrites=true&w=majority&appName=MA3CLUSTER'
//const localDB='mongodb://localhost:27017/'



// mongoose.connect(remoteDB, { useNewUrlParser: true, useUnifiedTopology: true })
// .then(()=>{
//     console.log('database connection successful')
// })
exports.register=async(req,res)=>{
    console.log(req.body)
    const{userID,Name,phoneNumber,email,Password:hashedPassword,whistles}=req.body

    try {
        const newCommuter=new Commuter({userID,Name,phoneNumber,email,Password:hashedPassword,whistles})
        const savedCommuter=await newCommuter.save()
        console.log("saved Commuter:",savedCommuter)
        res.status(200).json(savedCommuter)
    } catch (error) {
        res.status(500).json({error:error.message})
    }
}

exports.login=async (req,res)=>{
    console.log(req.body)
    const {username,password}=req.body
    try {
        const commuter=await Commuter.findOne({username})
        if(!commuter)return res.status(400).json({message:"commuters account not found"})

        const isMatch=bcrypt.compare(password,commuter.password)
        if(!isMatch) return res.status(400).json({message:"invalid credentials"})
        const token=jwt.sign({id:commuter._id},process.env.JWT_SECRET,{expiresIn:"1h"})
        res.status(200).json({token,username})
    } catch (error) {
        
    }
}
//this method will return the active vehicles list to the user
exports.getActiveVehicles=async(req,res)=>{
    //require the relevant variables that will filter my information
    const {userID,currentLocation,destination}=req.body
    try {
        const vehicle=await Vehicle.find({})
        if(!vehicle) return res.status(400).json({message:"no vehicles ate the moment"})
        /*const isTravelling=await //thus section captures object*/

    } catch (error) {
        
    }
}