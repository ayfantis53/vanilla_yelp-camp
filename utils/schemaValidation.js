// npm installs
const Joi = require('joi');
const { number } = require('joi');


// Define schema for validating campground data
module.exports.campgroundvalid = Joi.object({
    campground: Joi.object({
        title:       Joi.string().required(),
        // image:       Joi.string().required(),
        price:       Joi.number().required().min(0),
        description: Joi.string().required(),
        location:    Joi.string().required()
    }).required(),
    deleteImages: Joi.array()
});

// Define schema for validating campground data
module.exports.reviewvalid = Joi.object({
    review: Joi.object({
        rating: Joi.number().required().min(1).max(5),
        body:   Joi.string().required()
    }).required()
})
