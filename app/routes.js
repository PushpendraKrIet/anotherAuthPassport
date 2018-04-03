module.exports = function(app, passport){
    // Home page (with Login links)

    app.get('/', function(req, res){
        res.render('index'); // load the index.ejs file.
    });

    // LOGIN - show with login form
    app.get('/login', (req, res) => {
        // render the page and pass in any data if it exists
        res.render('login.ejs', { message: req.flash('loginMessage') });
    });

    // process the login form 
    // app.post('/login')

    // SIGNUP
    app.get('/signup', (req, res) => {
        // rendering the signup pages and pass in any flash data if exists
        res.render('signup', { message: req.flash('signupMessage') });
    });

    // process the signup form
    // app.post('/signup');

    // PROFILE SECTION
    // we will wnat this protected so user has to be logged in
    // we will use route middleware to verify this isLoggedIn Function

    app.get('/profile', isLoggedIn, (req, res) => {
        res.render('profile.ejs', {
            user: req.user // get the user out of session and pass to template
        });
    });

    // LOGOUT
    app.get('/logout', (req, res) => {
        req.logout();
        res.redirect('/');
    });

    // process the signup form
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/profile', // redirect to the secure profile section
        failureRedirect: '/signup', // redirect back to the signup page if there is an error
        failureFlash: true // allow flash messages
    }));

    app.post('/login', passport.authenticate('local-login', {
        successRedirect : '/profile', 
        failureRedirect: '/login',
        failureFlash: true
    }));

};

function isLoggedIn(req, res, next){
    // if user is authenticated in the session, carry on
    if(req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}