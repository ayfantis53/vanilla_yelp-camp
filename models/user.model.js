// npm installs
const mongoose              = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');


// Create a local constant 'Schema' that references the 'Schema' constructor function.
const Schema = mongoose.Schema;

/** -------------------------------------------------------------------------------------------
 *  All Review schema for Mongo
 ** ----------------------------------------------------------------------------------------- */

// assign the Mongoose Schema constructor function and create a new schema object.
const UserSchema = new Schema({
    email: {
        type:     String,
        required: true,
        unique:   true
    }
});

UserSchema.plugin(passportLocalMongoose);

// Default exports used because we are exporting a single primary Object from this module.
module.exports = mongoose.model('User', UserSchema);