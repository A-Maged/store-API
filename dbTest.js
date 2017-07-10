var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test', {useMongoClient: true} );
mongoose.Promise = global.Promise;

var Schema = mongoose.Schema;

var blogSchema = new Schema({
    title:  String,
    author: String,
    body:   String,
    comments: [{ 
        body: String, 
        date: Date 
    }],
    date: { 
        type: Date, 
        default: Date.now()
    },
    hidden: Boolean,

});



var Blog = mongoose.model('Blog', blogSchema);


var post = new Blog({
    title:  'the post title',
    author: 'cm_author',
    body:   'the actual post content/body',
    comments: [{ 
        body: 'this comment is effinsive', 
        date: Date.now() 
    }],
    hidden: false,

});


post.save(function (err) {
    if (err) {
        console.log(err);
    } else {
        console.log('meow');
    }
});