// project imports
const ExpressError     = require('./ExpressError');
const ReviewSchema     = require('../models/review.model');
const CampgroundSchema = require('../models/campground.model');
const { campgroundvalid, reviewvalid } = require('./schemaValidation');


/**
 * Middleware to check if the user is logged in.
 *
 * @param {Object}   req  Express request object
 * @param {Object}   res  Express response object
 * @param {Function} next Express next middleware function
 */
module.exports.isLoggedIn = (req, res, next) => {
    // Make sure user logged in to make a Campground.
    if (!req.isAuthenticated()) {
        
        req.session.returnTo = req.originalUrl;
        req.flash('error', 'you must be signed in')

        // If not, redirects to the login page.
        return res.redirect('/login')
    }

    // If logged in, proceeds to the next middleware/route handler.
    next();
}

/**
 * Middleware to check if the current user is the author of the resource.
 *
 * @param {Object}   req  Express request object
 * @param {Object}   res  Express response object
 * @param {Function} next Express next middleware function
 */
module.exports.isAuthor = async(req, res, next) => {
    // Find the resource.
    const campground = await CampgroundSchema.findById(req.params.id);

    // Check if resource exists
    if (!campground.author.equals(req.user._id)) {
        req.flash('error', 'Don\'t have permission!');

        // If not, redirects to the campground display page.
        return res.redirect(`/campgrounds/${campground._id}`);
    }

    // Authorized: proceed to the next middleware/route handler.
    next();
}

/**
 * Middleware to check if the current user is the author of the review.
 *
 * @param {Object}   req  Express request object
 * @param {Object}   res  Express response object
 * @param {Function} next Express next middleware function
 */
module.exports.isReviewAuthor = async(req, res, next) => {
    // Extract review ID from request parameters.
    const review = await ReviewSchema.findById(req.params.reviewId);

    // Authorization check
    if (!review.author.equals(req.user._id)) {
        req.flash('error', 'Don\'t have permission!');

        // If not, redirects to the campground display page.
        return res.redirect(`/campgrounds/${campground._id}`);
    }

    // User is authorized, proceed to the next middleware/route handler.
    next();
}

/**
 * Middleware to validate Campground data.
 * 
 * @param {Object}   req  Express request object
 * @param {Object}   res  Express response object
 * @param {Function} next Express next middleware function
 */
module.exports.validateCampground = (req, res, next) => {
    // Validate req.body.
    const {error} = campgroundvalid.validate(req.body);

    if (error) {
        // If validation error, format message and pass to error handling middleware.
        const msg = error.details.map(el => el.message).join(',');

        // Custom ExpressError class
        throw new ExpressError(msg, 400);
    } else {
        // If valid, proceed to the next middleware/route handler.
        next();
    }
}

/**
 * Middleware to validate Review data.
 * 
 * @param {Object}   req  Express request object
 * @param {Object}   res  Express response object
 * @param {Function} next Express next middleware function
 */
module.exports.validateReview = (req, res, next) => {
    // Validate req.body.
    const {error} = reviewvalid.validate(req.body);

    if (error) {
        // If validation error, format message and pass to error handling middleware.
        const msg = error.details.map(el => el.message).join(',');

        // Custom ExpressError class
        throw new ExpressError(msg, 400);
    } else {
        // If valid, proceed to the next middleware/route handler.
        next();
    }
}
