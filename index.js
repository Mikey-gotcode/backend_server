const express=require('express')
const httpServer=require('http')
const SocketIO=require('socket.io')
const cors=require('cors')
const vehicleRoutes=require('./routers/vehicleRoutes')
const saccoRoutes=require('./routers/saccoRoutes')
const commuterRoutes=require('./routers/commuterRoutes')
const {getVehicleID}=require('./controllers/vehicleController')
const {mongoURI}=require('./config/keys')
const dotenv=require('dotenv')


dotenv.config()

const app=express()
app.use(express.json())

app.use(cors({
    origin:'https://ma3sacco.netlify.app',
    methods:'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials:true,
}))

app.use('/sacco',saccoRoutes)
app.use('/vehicle',vehicleRoutes)
app.use('/commuter',commuterRoutes)

const Server=httpServer.createServer(app)

Server.listen(5001,()=>console.log('server is live'))


app.use('/api',(_,res)=>{
    console.log('back end reached')
    res.json({message:'hello world',status:200})
})
app.use('/api',(_,res)=>{
    res.json({message:'hello world',status:200})
})
