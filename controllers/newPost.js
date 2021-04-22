module.exports = (req, res) => {
    var title = "", body = "";
    const data = req.flash('data')[0];

    if(typeof data != "undefined") {
        title = data.title;
        body = data.body;
    }

    if(req.session.userId) {
        res.render('create',
            {
                errors: req.flash('validationErrors'),
                title: title,
                body: body
            }
        );
    } else { 
        res.redirect('/auth/login');
    }
}