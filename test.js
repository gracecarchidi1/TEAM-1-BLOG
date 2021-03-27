const mongoose = require('mongoose');

const BlogPost = require('./models/BlogPost');

mongoose.connect('mongodb://localhost/my_database', {useNewUrlParser: true});

/** Creating Data */
    /* INSERT INTO blogposts SET ? (...) */
        BlogPost.create(
            {
                title: `The Mythbuster's Guide to Saving Money on Energy Bills`,
                body: `If you have been here a long time, you might remember when I went on ITV Tonight to`+
                ` dispense a masterclass in saving money on energy bills. Energy-saving is one of my favourite money`+
                ` topics, because once you get past the boring bullet-point lists, a whole new world of thrifty nerdery`+
                ` opens up. You know those bullet-point lists. You start spotting them everything at this time of year.`+
                ` They go like this:`
            }, (error, blogpost) => {
                console.log(error, blogpost);
            }
        );

/** Reading Data */
    /* SELECT * FROM blogposts */
        // BlogPost.find(
        //     {}, (error, blogpost) => {
        //         console.log(error, blogpost);
        //     }
        // );

    /* SELECT * FROM blogposts WHERE title=... */
        // BlogPost.find(
        //     {
        //         title: `The Mythbuster's Guide to Saving Money on Energy Bills`
        //     }, (error, blogpost) => {
        //         console.log(error, blogpost);
        //     }
        // );

    /* SELECT * FROM blogposts WHERE title LIKE ... */
        // BlogPost.find(
        //     {
        //         title: /The/
        //     }, (error, blogpost) => {
        //         console.log(error, blogpost);
        //     }
        // );

    /* SELECT * FROM blogposts WHERE id=... */
        // var id = `605a1adddcc54a46749ada8a`

        // BlogPost.findById(id,
        //     (error, blogpost) => {
        //         console.log(error, blogpost);
        //     }    
        // );

/** Updating Records */
    /* UPDATE blogposts SET title=... WHERE id=... */
        // var id = `605a1adddcc54a46749ada8a`;

        // BlogPost.findByIdAndUpdate(id,
        //     {
        //         title: `Updated title`
        //     }, (error, blogpost) => {
        //         console.log(error, blogpost);
        //     }
        // );

/** Deleting Single Records */
    /* DELETE FROM blogposts WHERE id=... */
        // var id = `605a1adddcc54a46749ada8a`;

        // BlogPost.findByIdAndDelete(id,
        //     (error, blogposts) => {
        //         console.log(error, blogpost);
        //     }
        // );