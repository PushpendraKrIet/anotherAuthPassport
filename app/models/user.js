const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

// defining the schema
var userSchema = mongoose.Schema({
    local   :{
        email: { 
            type: String,
            unique: true,
            match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/ 
        },
        password: {
            type: String
        }
    },
    facebook: {
        id: { type: String },
        token: { type: String },
        name: { type: String },
        email: {
            type: String,
            unique: true,
            match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
        }
    },
    twitter: {
        id: { type: String },
        token: { type: String },
        name: { type: String },
        email: {
            type: String,
            unique: true,
            match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
        }
    },
    google: {
        id: { type: String },
        token: { type: String },
        name: { type: String },
        email: {
            type: String,
            unique: true,
            match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
        }
    }
});

// methods =========================================
// generating a hash
userSchema.methods.generateHash = password => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid

userSchema.methods.validPassword = function(password){
    return bcrypt.compareSync(password, this.local.password);
};

// create the model for users and expose it to our app
module.exports = mongoose.model('User', userSchema);