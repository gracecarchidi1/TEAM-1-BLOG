const express = require('express');
const ejs = require('ejs');
const bodyParser = require("body-parser");
const expressSession = require("express-session");

const mongoose = require('mongoose');
    mongoose.connect('mongodb://localhost/my_database', {useNewUrlParser: true});

const app = new express();
    app.use(express.static('public'));
    app.set('view engine','ejs');
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(expressSession({secret: '4N0tS0V3ryG0oDS3cR3t bYT_wH4t3v3R'}));

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
const newUserController = require('./controllers/newUser');
const storeUserController = require('./controllers/storeUser');
const loginController = require('./controllers/login');
const loginUserController = require('./controllers/loginUser');

app.get('/', homeController);

app.get('/post/:id', getPostController);

app.get('/posts/new', newPostController);

app.post('/posts/store', storePostController);

app.get('/auth/register', newUserController);

app.post('/users/register', storeUserController);

app.get('/auth/login', loginController);

app.post('/users/login', loginUserController);


app.listen(4000, () => {console.log('App listening on port 4000')});

const customMiddleWare = (req, res, next) => {
    console.log('Custom middle ware called');
    next();
}
    app.use(customMiddleWare);