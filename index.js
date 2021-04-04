const express = require('express');
const ejs = require('ejs');
const bodyParser = require("body-parser");

const mongoose = require('mongoose');
    mongoose.connect('mongodb://localhost/my_database', {useNewUrlParser: true});

const app = new express();
    app.use(express.static('public'));
    app.set('view engine','ejs');
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));

const fileUpload = require('express-fileupload') 
    app.use(fileUpload())

// Keep validate middleware after fileupload
const validateMiddleWare = require("./middleware/validationMiddleware");
    app.use('/posts/store', validateMiddleWare);

// Controller layer
const newPostController = require('./controllers/newPost');
const homeController = require('./controllers/home');
const storePostController = require('./controllers/storePost');
const getPostController = require('./controllers/getPost');

app.get('/', homeController);

app.get('/post/:id', getPostController);

app.get('/posts/new', newPostController);

app.post('/posts/store', storePostController);

app.listen(4000, () => {console.log('App listening on port 4000')});

const customMiddleWare = (req, res, next) => {
    console.log('Custom middle ware called');
    next();
}
    app.use(customMiddleWare);