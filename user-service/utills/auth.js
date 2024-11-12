const jwt = require('jsonwebtoken');
const JWT_SECRET = 'myUserJwtSecret'; // Ensure this matches the secret used in the login function

const auth = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) return res.status(403).send({ message: 'No token provided' });

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) return res.status(401).send({ message: 'Unauthorized' });
        req.userId = decoded.userId; // Save userId in request for further use
        next();
    });
};

module.exports = auth;
