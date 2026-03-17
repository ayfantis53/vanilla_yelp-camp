// npm installs
const mongoose = require('mongoose');


// Create a local constant 'Schema' that references the 'Schema' constructor function.
const Schema = mongoose.Schema;

/** -------------------------------------------------------------------------------------------
 *  All Review schema for Mongo
 ** ----------------------------------------------------------------------------------------- */

// assign the Mongoose Schema constructor function and create a new schema object.
const ReviewSchema = new Schema({
    body :   String,
    rating : Number,
    author: {
        type: Schema.Types.ObjectId,
        ref:  'User'
    },
});

// Default exports used because we are exporting a single primary Object from this module.
module.exports = mongoose.model('Review', ReviewSchema);