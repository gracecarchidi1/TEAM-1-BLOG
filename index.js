const express = require('express');
const path = require('path');
const ejs = require('ejs');
const bodyParser = require("body-parser");

const mongoose = require('mongoose');
    mongoose.connect('mongodb://localhost/my_database', {useNewUrlParser: true});

const BlogPost = require('./models/BlogPost');

const app = new express();
    app.use(express.static('public'));
    app.set('view engine','ejs');
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));

const fileUpload = require('express-fileupload') 
    app.use(fileUpload())

const validateMiddleWare = (req, res, next)=>{
    if(req.files == null || req.body.title == null || req.body.body == null) {
        return res.redirect('/posts/new');
    }
    next()
  }

  //keep validate middleware after fileupload.
  app.use('/posts/store',validateMiddleWare)

const newPostController = require('./controllers/newPost');

app.get('/',
    async (req, res) => {
        // res.sendFile(path.resolve(__dirname, 'pages/index.html'));
        const blogposts = await BlogPost.find({});
        res.render('index', { blogposts });

        console.log(blogposts);
    }
);

app.get('/post/:id',
    async (req, res) => {
        // res.sendFile(path.resolve(__dirname, 'pages/post.html'));
        const blogpost = await BlogPost.findById(req.params.id);
        res.render('post', { blogpost });

        console.log(req.params);
    }
);

app.get('/posts/new', newPostController);

app.post('/posts/store',
    (req, res) => {
        let image = req.files.image;
        image.mv(path.resolve(__dirname, 'public/img', image.name),
            async (error) => {
                await BlogPost.create(
                    {
                        ...req.body,
                        image:'/img/'+image.name
                    }
                );
                        
                res.redirect('/');
            }
        );
    }
)

app.listen(4000, () => {console.log('App listening on port 4000')});

const customMiddleWare = (req, res, next) => {
    console.log('Custom middle ware called');
    next();
}
    app.use(customMiddleWare);