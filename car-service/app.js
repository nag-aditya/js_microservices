const express = require("express");
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Car = require('./models/Car');

const app = express();
const PORT = process.env.PORT || 3002;

app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/car-service', { useNewUrlParser: true, useUnifiedTopology: true });

// Add Car Listing
app.post('/cars', async (req, res) => {
    const car = new Car(req.body);
    try {
        await car.save();
        res.status(201).send(car);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Get All Cars
app.get('/car', async (req, res) => {
    try {
        const carId = req.query.carId;
        //console.log('car id is ', carId);
        const cars = await Car.findOne({"_id": carId});
        //const cars = await Car.find();
        res.send(cars);
    } catch (error) {
        res.status(500).send(error);
    }
});

app.listen(PORT, () => {
    console.log(`Car Service running on port ${PORT}`);
});
