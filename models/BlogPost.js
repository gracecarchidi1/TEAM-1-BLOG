const mongoose = require('mongoose');
    const Schema = mongoose.Schema;

var uniqueValidator = require('mongoose-unique-validator');

const BlogPostSchema = new Schema(
    {
        title: {
            type: String,
            required: [true, 'Please provide title'],
            unique: true
        },
        body: {
            type: String,
            required: [true, 'Please provide body']
        },
        username: String,
        datePosted: { /* can declare property type with an object like this because we need 'default' */
            type: Date,
            default: new Date()
        },
        image: {
            type: String,
            required: [true, 'Please provide image file']
        }
    }
);

BlogPostSchema.plugin(uniqueValidator);

const BlogPost = mongoose.model('BlogPost', BlogPostSchema);

module.exports = BlogPost;