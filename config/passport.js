// load all the things we need
var LocalStrategy = require('passport-local').Strategy;

// load up the user model
var User = require('../app/models/user');

module.exports = passport => {
    // passport session setup
    // required for persistent login setup

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id,done) => {
        User.findById(id, (err, user) => {
            done(err, user);
        });
    });

    // Local SignUp
    /// we are using named strategies since one is for login one for signup
    // by default, if there was no name, it would be just called 'local'

    passport.use('local-signup', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true // allow us to pass the req to callback
    },
    
    (req, email, password, done) => {

        process.nextTick(() => {
            User.findOne({ 'local.email' : email }, (err, user) => {
                if(err) return done(err);

                if(user) {
                    return done(null, false, req.flash('signUpMessage', 'That email is already taken.'));
                } else {
                    var newUser = new User();

                    newUser.local.email = email;
                    newUser.local.password = newUser.generateHash(password);

                    // save the user
                    newUser.save((err) => {
                        if(err) throw err;

                        return done(null, newUser);
                    });
                }
            });
        });
    }));

    // Local Login===========================================
    // named strategies so `local-login`
    passport.use('local-login', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true // allows us to passback the entire request to callback
    },

    (req, email, password, done) => { // callback with email and password from our form
        // if the login already exists
        User.findOne({ 'local.email': email }, (err, user) => {
            if(err) return done(err);

            if(!user)
                return done(null, false, req.flash('loginMessage', 'No user found. જોઈ ને નાખતા હોય '));

            // if the user is found but the password is wrong
            if(!user.validPassword(password))
                return done(null, false, req.flash('loginMessage', 'Oops! Wrong Password.યાદ કર'))

            
            return done(null, user, req.flash('loginMessage', 'ભલે પધાર્યા '));
        })
    }

    ));
};