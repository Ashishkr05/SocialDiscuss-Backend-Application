const jwt = require('jsonwebtoken');
const config = require('../config');

module.exports = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    try {
        const decoded = jwt.verify(token, config.jwtSecret);
        req.user = decoded; // This sets req.user to the decoded JWT payload
        next();
    } catch (err) {
        res.status(401).json({ msg: 'Token is not valid' });
    }
};
