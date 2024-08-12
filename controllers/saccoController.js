const Sacco = require('../models/Sacco');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

console.log("jwt secret:", process.env.JWT_SECRET);


// The number of salt rounds
const saltRounds = 10;

exports.register = async (req, res) => {
    const { saccoName, saccoOwner, email, phoneNumber, username, password } = req.body;
    console.log('Received registration data:', req.body);

    try {
        // Check if the username already exists
        const existingSacco = await Sacco.findOne({ username });
        if (existingSacco) {
            console.log('Username already exists');
            return res.status(400).json({ message: "Username already exists" });
        }

        // Hash the password and create a new Sacco
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const newSacco = new Sacco({ 
            saccoName, 
            saccoOwner, 
            email, 
            phoneNumber, 
            username, 
            password: hashedPassword 
        });

        const savedSacco = await newSacco.save();
        console.log("Saved Sacco:", savedSacco);
        res.status(200).json(savedSacco);

    } catch (error) {
        console.error('Unexpected error:', error);
        res.status(500).json({ error: error.message });
    }
};

exports.login = async (req, res) => {
    const secret = process.env.JWT_SECRET;
    console.log("JWT secret:", secret);

    const { username, password } = req.body;
    console.log('Received login data:', req.body);

    try {
        const sacco = await Sacco.findOne({ username });
        if (!sacco) {
            console.log('Sacco not found');
            return res.status(400).json({ message: "Sacco not found" });
        }

        bcrypt.compare(password, sacco.password, (err, isMatch) => {
            if (err) {
                console.error('Error comparing password:', err);
                return res.status(500).json({ error: err.message });
            }
            if (!isMatch) {
                console.log('Invalid credentials');
                return res.status(400).json({ message: "Invalid credentials" });
            }

            const token = jwt.sign({ id: sacco._id }, secret, { expiresIn: "1h" });
            if (!token) {
                console.log('Failed to generate token');
                return res.status(500).json({ message: "Failed to generate token" });
            }

            console.log('Generated token:', token);
            return res.status(200).json({ token, sacco });
        });
    } catch (error) {
        console.error('Unexpected error:', error);
        res.status(500).json({ error: error.message });
    }
};

exports.searchVehicle = async (req, res) => {
    const { VehicleRegistration } = req.body;
    console.log('Received search data:', req.body);

    try {
        const searchedVehicle = await Vehicle.findOne({ VehicleRegistration });
        console.log('Searched vehicle:', searchedVehicle);

        if (!searchedVehicle) {
            console.log('Vehicle not found');
            return res.status(400).json({ message: "Vehicle Not Found" });
        }
        return res.status(200).json(searchedVehicle);
    } catch (error) {
        console.error('Error searching for vehicle:', error);
        res.status(500).json({ error: error.message });
    }
};
