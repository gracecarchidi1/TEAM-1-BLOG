const mongoose = require('mongoose');
    const Schema = mongoose.Schema;

var uniqueValidator = require('mongoose-unique-validator');

const BlogPostSchema = new Schema(
    {
        title: String,
        body: String,
        userid:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        datePosted: { /* can declare property type with an object like this because we need 'default' */
            type: Date,
            default: new Date()
        },
        image: String,
    }
);

BlogPostSchema.plugin(uniqueValidator);

const BlogPost = mongoose.model('BlogPost', BlogPostSchema);

module.exports = BlogPost;