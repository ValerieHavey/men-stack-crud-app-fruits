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

const Fruit = require('./models/fruit');

//Let's add our middleware
app.use(express.urlencoded({ extended: false}));



// All of our routes

app.get('/', (req, res) => {
    res.render("index.ejs");
});

app.get('/fruits/new', (req, res) => {
    res.render('fruits/new.ejs');
});

app.post('/fruits', async (req, res) => {
    if (req.body.isReadyToEat === 'on') {
        req.body.isReadyToEat = true;
    } else {
        req.body.isReadyToEat = false;
    }
    await Fruit.create(req.body);
    res.redirect('/fruits/new');
});

app.listen(3000, () => {
    console.log('Listening on port 3000');
});

