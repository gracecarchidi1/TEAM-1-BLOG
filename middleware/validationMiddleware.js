module.exports = (req, res, next) => {
    if(req.files == null || req.body.title.length == 0 || req.body.body.length == 0) {
        const validationErrors = [];
            if(req.files == null) {
                validationErrors.push("Please provide image");
            }
            if(req.body.title.length == 0) {
                validationErrors.push("Please provide title");
            }
            if(req.body.body.length == 0) {
                validationErrors.push("Please provide body");
            }

            req.flash('validationErrors', validationErrors);
            req.flash('data', req.body);

        return res.redirect('/posts/new');
    }
    
    next();
}