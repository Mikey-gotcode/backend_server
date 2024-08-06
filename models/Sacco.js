const mongoose=require('mongoose')
const Schema=mongoose.Schema

const saccoSchema=new Schema({
    saccoName:{type:String, required:true},
    saccoOwner:{type:String, required:true},
    email:{type:String, required:true},
    phoneNumber:{type:Number, required:false},
    username:{type:String, required:true},
    password:{type:String, required:true},
    routes:{
        to:{type:String, required:false},
        fro:{type:String, required:false},
    },
    stages:{
        mainCBD:{type:String, required:false},
        outskirt:{type:String, required:false},
    }



})

module.exports=mongoose.model('Sacco',saccoSchema)
