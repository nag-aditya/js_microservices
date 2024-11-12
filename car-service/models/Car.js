const mongoose = require('mongoose');

// Define Car Schema
const CarSchema = new mongoose.Schema({
    make: { type: String, required: true },
    model: { type: String, required: true },
    year: { type: Number, required: true },
    price: { type: Number, required: true }
}, {
    timestamps: true // Automatically manage createdAt and updatedAt
});

// Create Car Model
const Car = mongoose.model('Car', CarSchema);
module.exports = Car;
