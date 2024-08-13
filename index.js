const express = require('express');
const mongoose = require('mongoose');
const httpServer = require('http');
const SocketIO = require('socket.io');
const cors = require('cors');
const vehicleRoutes = require('./routers/vehicleRoutes');
const saccoRoutes = require('./routers/saccoRoutes');
const commuterRoutes = require('./routers/commuterRoutes');
const { getVehicleID } = require('./controllers/vehicleController');
const { mongoURI } = require('./config/keys');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(express.json());

// CORS Middleware
app.use(cors({
    origin: 'https://ma3sacco.netlify.app',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
}));

const io = SocketIO(httpServer, {
    cors: {
        origin: 'https://ma3sacco.netlify.app',
        methods: ["GET", "POST"]
    }
});

io.on('connection', (socket) => {
    console.log('New Client connected', socket.id);

    socket.on('sendLocation', (data) => {
        const vehicleID = getVehicleID();
        console.log('Location received from vehicle:', vehicleID, data);
        socket.broadcast.emit('receiveLocation', { ...data, vehicleID });
    });

    socket.on('disconnect', () => {
        console.log('client disconnected:', socket.id);
    });
});

// Routes
app.use('/sacco', saccoRoutes);
app.use('/vehicle', vehicleRoutes);
app.use('/commuter', commuterRoutes);

const Server = httpServer.createServer(app);

// Ensure unique routes
app.get('/api', (_, res) => {
    res.json({ message: 'hello world', status: 200 });
});

mongoose.connect(mongoURI)
    .then(() => {
        Server.listen(5001, () => console.log('server is live'));
    })
    .catch(error => {
        console.log('failed to connect to database:', error);
        process.exit(1);
    });
