const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("./models/User");
const JWT_SECRET = "myUserJwtSecret"; // Use a strong secret in production

const auth = require('./utills/auth');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(bodyParser.json());

mongoose.connect("mongodb://localhost:27017/user-service", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// User Registration
app.post("/register", async (req, res) => {
    const user = new User(req.body);
    try {
    await user.save();
    res.status(201).send(user);
} catch (error) {
    res.status(400).send(error);
}
});

// User Login
app.post("/login", async (req, res) => {
  // Implement authentication logic here
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      return res.status(401).send({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
        return res.status(401).send({ message: "Invalid credentials" });
    }

    // Generate a token
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
      expiresIn: "1h",
    });
    res.send({ token });
  } catch (error) {
    res.status(500).send(error);
  }
});



// Example of a protected route
app.get('/profile', auth, async (req, res) => {
    const user = await User.findById(req.userId);
    res.send(user);
});


app.listen(PORT, () => {
  console.log(`User Service running on port ${PORT}`);
});
