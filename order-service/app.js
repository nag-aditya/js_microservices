const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const axios = require('axios');
const Order = require('./models/Order');

const auth = require('./utills/carAuth'); // Make sure to create this if you want to protect the route

const app = express();
const PORT = process.env.PORT || 3003;

app.use(bodyParser.json());

mongoose.connect('mongodb://localhost/order-service', { useNewUrlParser: true, useUnifiedTopology: true });

// Create Order
app.post('/order', auth, async (req, res) => {
    const { carId, quantity } = req.body;

    console.log('carId', carId);
    console.log('quantity', quantity);

    try {
        // Get userId from the request
        const userId = req.userId;
        console.log('userId', userId);

        // Get car details from Car Service
        const carResponse = await axios.get(`http://localhost:3002/car?carId=${carId}`);
        const car = carResponse.data;

        if (!car) {
            console.log('Car not found for user with id', userId);
            return res.status(404).send({ message: 'Car not found' });
        }

        // Calculate total price
        console.log('car details', car);
        const totalPrice = car.price * quantity;

        // Create the order
        const order = new Order({
            userId,
            carId,
            quantity,
            totalPrice
        });

        await order.save();
        console.log('order response details', order);
        res.status(201).send(order);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Get All Orders for a User
app.get('/orders', auth, async (req, res) => {
    try {
        console.log('request', req.userId);
        //const orders = await Order.find({ userId: req.userId }).populate('carId').populate('userId');
        const orders = await Order.find({ userId: req.userId });
        console.log('orders =', orders);
        res.send(orders);
    } catch (error) {
        console.log('errors ', error);
        res.status(500).send(error);
    }
});

app.listen(PORT, () => {
    console.log(`Order Service running on port ${PORT}`);
});
