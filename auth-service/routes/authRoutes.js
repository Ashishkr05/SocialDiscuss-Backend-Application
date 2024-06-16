const express = require('express');
const { signup, login, updateUser, deleteUser, listUsers, searchUsersByName, followUser } = require('../controllers/authController');
const jwt = require('jsonwebtoken');
const config = require('../config');
const router = express.Router();

// Middleware to protect routes
const authenticate = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }
    try {
        const decoded = jwt.verify(token, config.jwtSecret);
        req.user = { userId: decoded.userId }; 
        next();
    } catch (err) {
        res.status(401).json({ msg: 'Token is not valid' });
    }
};

// Auth routes
router.post('/signup', signup);
router.post('/login', login);

// User management routes
router.put('/user', authenticate, updateUser);
router.delete('/user', authenticate, deleteUser);
router.get('/users', authenticate, listUsers);
router.get('/search', authenticate, searchUsersByName);
router.post('/follow', authenticate, followUser);

// Protected route example
router.get('/protected', authenticate, (req, res) => {
    res.json({ msg: 'Welcome to the protected route!', userId: req.user });
});

module.exports = router;
