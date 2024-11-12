const mongoose = require('mongoose');

const Car = require('../../car-service/models/Car');
const User = require('../../user-service/models/User');
// //use mongoose.mode(name, schema) for car and user
// Define Order Schema
const OrderSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref:User },
    carId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: Car },
    quantity: { type: Number, required: true, default: 1 },
    totalPrice: { type: Number, required: true }
}, {
    timestamps: true // Automatically manage createdAt and updatedAt
});

// Create Order Model
const Order = mongoose.model('Order', OrderSchema);
module.exports = Order;
