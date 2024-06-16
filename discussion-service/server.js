const express = require('express');
const mongoose = require('mongoose');
const discussionRoutes = require('./routes/discussionRoutes');
const config = require('./config');

const app = express();
const PORT = process.env.PORT || 5003; // Use environment variable PORT or default to 5003

app.use(express.json());

mongoose.connect(config.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch(err => {
        console.error('Failed to connect to MongoDB', err);
    });

app.use('/api/discussions', discussionRoutes);

app.listen(PORT, () => {
    console.log(`Discussion Service running on port ${PORT}`);
});
