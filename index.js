const express=require('express')
const httpServer=require('http')
const SocketIO=require('socket.io')

const app=express()

const Server=httpServer.createServer(app)

Server.listen(5001,()=>console.log('server is live'))


app.use('/api',(_,res)=>{
    console.log('back end reached')
    res.json({message:'hello world',status:200})
})
app.use('/api',(_,res)=>{
    res.json({message:'hello world',status:200})
})
