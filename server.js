const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const  mongoose = require('mongoose');

const app = express();

//Let's connect to MongoDB
mongoose.connect(process.env.MONGODB_URI);

//Let's update the terminal with the connection status
mongoose.connection.on('connected', () => {
    console.log(`Connected to MongoDB ${mongoose.connection.name}`);
});

app.get('/', (req, res) => {
    res.render("index.ejs");
});

app.listen(3000, () => {
    console.log('Listening on port 3000');
});

