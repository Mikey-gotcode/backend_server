const express=require('express')
const httpServer=require('http')

const app=express()

const Server=httpServer.createServer(app)

Server.listen(5001,()=>console.log('server is live'))


app.use('/api',(_,res)=>{
    res.json({message:'hello world',status:200})
})
app.use('/api',(_,res)=>{
    res.json({message:'hello world',status:200})
})
