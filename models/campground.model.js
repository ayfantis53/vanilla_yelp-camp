// npm installs
const mongoose = require('mongoose');
const Review = require('./review.model');


// Create a local constant 'Schema' that references the 'Schema' constructor function.
const Schema = mongoose.Schema;

/** -------------------------------------------------------------------------------------------
 *  All Image schema for Mongo
 ** ----------------------------------------------------------------------------------------- */

const ImageSchema = new Schema ({
    url: String,
    filename: String
});

ImageSchema.virtual('thumbnail').get(function() {
    return this.url.replace('/upload', '/upload/w_200');
});

/** -------------------------------------------------------------------------------------------
 *  All Campground schema for Mongo
 ** ----------------------------------------------------------------------------------------- */

const CampgroundSchema = new Schema({
    title : String,
    images: [ ImageSchema ],
    geometry: {
        type: {
          type:     String,
          enum:     ['Point'],
          required: true
        },
        coordinates: {
          type:     [Number],
          required: true
        }
      },
    price :       Number,
    description : String,
    location :    String,
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Review'
        }
    ] 
})

// Virtual Schema for cluster map.
CampgroundSchema.virtual('properties.popUpMarkup').get(function () {
    return this.url.replace('/upload', '/upload/w_200')
});

CampgroundSchema.post('findOneAndDelete', async function (doc) {
    if (doc) {
        await Review.deleteMany({
            _id: {
                $in: doc.reviews
            }
        })
    }
});

// Default exports used because we are exporting a single primary Object from this module.
module.exports = mongoose.model('Campground', CampgroundSchema);