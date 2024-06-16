const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const config = require('./config');

const app = express();
const PORT = process.env.PORT || 5000; // Use environment variable PORT or default to 5000

app.use(express.json());

mongoose.connect(config.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch(err => {
        console.error('Failed to connect to MongoDB', err);
    });

app.use('/api/auth', authRoutes);

app.listen(PORT, () => {
    console.log(`Auth Service running on port ${PORT}`);
});
