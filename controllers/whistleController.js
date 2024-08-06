//const mongoose= require('mongoose')
const Whistle=require('../models/Whistle')
//const remoteDB='mongodb+srv://spidungu_barbosa:Mw@ng!X18@ma3cluster.x9epetw.mongodb.net/?retryWrites=true&w=majority&appName=MA3CLUSTER'
//const localDB='mongodb://localhost:27017/'

// mongoose.connect(remoteDB,{useNewUrlParser:true,useUnifiedTopology:true})
// .then(()=>{
//     console.log('database connection successfull')

// })

exports.whistle=async(req,res)=>{
    console.log(req.body)
    const{coordinates}=req.body

    try {
        const whistle=new Whistle({coordinates})
        const savedWhistleLocation=await whistle.save()
        console.log(savedWhistleLocation)
    } catch (error) {
        res.status(500).json({error:error.message})
        
    }
}
