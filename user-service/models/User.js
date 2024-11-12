const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


// Define User Schema
const UserSchema = new mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true }
}, {
    timestamps: true // Automatically manage createdAt and updatedAt
});


// Pre-save hook to hash password
UserSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Create User Model
const User = mongoose.model('User', UserSchema);
module.exports = User;
