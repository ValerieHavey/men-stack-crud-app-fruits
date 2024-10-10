const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const  mongoose = require('mongoose');
const methodOverride = require('method-override');
const morgan = require('morgan');

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

//Add the middleware for morgan
app.use(morgan('dev'));
app.use(methodOverride('_method'));



// All of our routes

app.get('/', (req, res) => {
    res.render("index.ejs");
});

app.get('/fruits', async (req, res) => {
    const allFruits = await Fruit.find();
    res.render('fruits/index.ejs', { fruits: allFruits })
});

app.get('/fruits/new', (req, res) => {
    res.render('fruits/new.ejs');
});

app.get('/fruits/:fruitID', async (req, res) => {
    const foundFruit = await Fruit.findById(req.params.fruitID);
    res.render('fruits/show.ejs', { fruit: foundFruit });
});

app.get('/fruits/:fruitID/edit', async (req, res) => {
    const foundFruit = await Fruit.findById(req.params.fruitID);
    res.render('fruits/edit.ejs', { fruit: foundFruit });
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

app.put('/fruits/:fruitID', async (req, res) => {
    if (req.body.isReadyToEat === 'on') {
        req.body.isReadyToEat = true;
    } else {
        req.body.isReadyToEat = false;
    }

    await Fruit.findByIdAndUpdate(req.params.fruitID, req.body);
    res.redirect(`/fruits/${req.params.fruitID}`);
});

app.delete('/fruits/:fruitID', async (req, res) => {
    await Fruit.findByIdAndDelete(req.params.fruitID);
    res.redirect('/fruits');
    //Add error code
});

app.listen(3000, () => {
    console.log('Listening on port 3000');
});

