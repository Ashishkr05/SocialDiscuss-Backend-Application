const User = require('../models/User');
const jwt = require('jsonwebtoken');
const config = require('../config');

// Signup
exports.signup = async (req, res) => {
    const { name, email, mobile, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: 'User already exists' });
        }
        user = new User({ name, email, mobile, password });
        await user.save();
        res.status(201).json({ msg: 'User created successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Login
exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }
        
        // Create JWT payload
        const payload = { userId: user._id, email: user.email };
        
        // Sign the token
        const token = jwt.sign(payload, config.jwtSecret, { expiresIn: config.jwtExpire });
        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.updateUser = async (req, res) => {
    const { userId } = req.user;
    const { name, email, mobile, password } = req.body;
    try {
        const user = await User.findByIdAndUpdate(userId, { name, email, mobile, password }, { new: true });
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete User
exports.deleteUser = async (req, res) => {
    const { userId } = req.user;
    try {
        await User.findByIdAndDelete(userId);
        res.status(200).json({ msg: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// List Users
exports.listUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Search Users by Name
exports.searchUsersByName = async (req, res) => {
    const { name } = req.query;
    try {
        const users = await User.find({ name: { $regex: name, $options: 'i' } });
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Follow User
exports.followUser = async (req, res) => {
    const { userId } = req.user;
    const { followUserId } = req.body;
    try {
        const user = await User.findById(userId);
        if (user.following.includes(followUserId)) {
            user.following.pull(followUserId);
        } else {
            user.following.push(followUserId);
        }
        await user.save();
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};