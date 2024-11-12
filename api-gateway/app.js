const express = require('express');
const axios = require('axios');
const auth = require('./utills/auth');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// User routes
app.post('/register', (req, res) => {
    axios.post('http://localhost:3001/register', req.body)
        .then(response => res.send(response.data))
        .catch(error => res.status(500).send(error.response.data));
});

app.post('/login', (req, res) => {
    axios.post('http://localhost:3001/login', req.body)
        .then(response => res.send(response.data))
        .catch(error => res.status(500).send(error.response.data));
});

// Car routes
app.post('/cars', (req, res) => {
    axios.post('http://localhost:3002/cars', req.body)
        .then(response => res.send(response.data))
        .catch(error => res.status(500).send(error.response.data));
});

app.get('/car', (req, res) => {
    axios.get(`http://localhost:3002/car?carId=${req.query.carId}`)
        .then(response => res.send(response.data))
        .catch(error => res.status(500).send(error.response.data));
});

// Order routes
app.post('/order', auth, (req, res) => {
    //console.log('token details', req);
    axios.post('http://localhost:3003/order', req)
        .then(response => res.send(response.data))
        .catch(error => res.status(500).send(error.response.data));
});

app.listen(PORT, () => {
    console.log(`API Gateway running on port ${PORT}`);
});
