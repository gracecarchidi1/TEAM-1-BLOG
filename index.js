const express = require('express');

const app = new express();
const ejs = require('ejs');
    app.set('view engine','ejs');
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://nick:nickpass@cluster0.wn3hl.mongodb.net/my_database', {useNewUrlParser: true});
const bodyParser = require("body-parser");
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));
const fileUpload = require('express-fileupload');
    app.use(fileUpload());
const flash = require('connect-flash');
    app.use(flash());
const expressSession = require("express-session");
    app.use(expressSession({secret: '4N0tS0V3ryG0oDS3cR3t bYT_wH4t3v3R'}));
    app.use(express.static('public'));
const customMiddleWare = (req, res, next) => {
        console.log('Custom middle ware called');
        next();
    }
    app.use(customMiddleWare);

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

// Middleware layer
const validateMiddleWare = require("./middleware/validationMiddleware");
const authMiddleware = require('./middleware/authMiddleware');
const redirectIfAuthenticatedMiddleware = require('./middleware/redirectIfAuthenticatedMiddleware')

//conditional loggedin 
global.loggedIn = null;

app.use("*",
    (req, res, next) => {
        loggedIn = req.session.userId;
        next();
    }
);

app.get('/', homeController);
app.get('/post/:id', getPostController);
app.get('/posts/new', authMiddleware, newPostController);
app.use('/posts/store', validateMiddleWare);
app.post('/posts/store', authMiddleware, storePostController);
app.get('/auth/register', redirectIfAuthenticatedMiddleware, newUserController);
app.post('/users/register', redirectIfAuthenticatedMiddleware, storeUserController);
app.get('/auth/login', redirectIfAuthenticatedMiddleware, loginController);
app.post('/users/login', redirectIfAuthenticatedMiddleware, loginUserController);
app.get('/auth/logout', logoutController);
app.use((req, res) => res.render('notfound'));

let port = process.env.PORT;
if (port == null || port == "") {
port = 4000;
}
app.listen(port, ()=>{
console.log('App listening...')
})
