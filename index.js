const express = require('express');

const app = new express();
const ejs = require('ejs');
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const fileUpload = require('express-fileupload') 

// Controller layer
const newPostController = require('./controllers/newPost');
const homeController = require('./controllers/home');
const storePostController = require('./controllers/storePost');
const getPostController = require('./controllers/getPost');
const newUserController = require('./controllers/newUser');
const storeUserController = require('./controllers/storeUser');
const loginController = require('./controllers/login');
const loginUserController = require('./controllers/loginUser');
const logoutController = require('./controllers/logout');
const expressSession = require("express-session");

const validateMiddleWare = require("./middleware/validationMiddleware");

//auth Middleware
const authMiddleware = require('./middleware/authMiddleware');

//redirectIfAuthenticated Middleware
const redirectIfAuthenticatedMiddleware = require('./middleware/redirectIfAuthenticatedMiddleware')

const flash = require('connect-flash');

app.use(fileUpload())

mongoose.connect('mongodb://localhost/my_database', {useNewUrlParser: true});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.set('view engine','ejs');

app.use(express.static('public'));

app.listen(4000, () => {
    console.log('App listening on port 4000')});

app.use('posts/store',validateMiddleWare)

app.use(expressSession({secret: '4N0tS0V3ryG0oDS3cR3t bYT_wH4t3v3R'}));

//conditional loggedin 
global.loggedIn = null;

app.use("*",
    (req, res, next) => {
        loggedIn = req.session.userId;
        next();
    }
);

app.use(flash());


app.get('/', homeController);
app.get('/post/:id', getPostController);
app.get('/posts/new', authMiddleware, newPostController);
app.post('/posts/store', authMiddleware, storePostController);
app.get('/auth/register', redirectIfAuthenticatedMiddleware, newUserController);
app.post('/users/register', redirectIfAuthenticatedMiddleware, storeUserController);
app.get('/auth/login', redirectIfAuthenticatedMiddleware, loginController);
app.post('/users/login', redirectIfAuthenticatedMiddleware, loginUserController);
app.get('/auth/logout', logoutController);
app.use((req, res) => res.render('notfound'));


const customMiddleWare = (req, res, next) => {
    console.log('Custom middle ware called');
    next();
}
    app.use(customMiddleWare);