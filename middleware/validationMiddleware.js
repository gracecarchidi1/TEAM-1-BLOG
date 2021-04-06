module.exports = (req, res, next) => {
    if(req.files == null || req.body.title == null || req.body.body.length == 0) {
        return res.redirect('/posts/new');
    }
    
    next();
}