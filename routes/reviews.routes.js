// npm installs
const express = require('express');

// project imports
const catchAsync       = require('../utils/catchAsync');
const reviews          = require('../controllers/reviews.controllers');
const { isLoggedIn, isReviewAuthor, validateReview } = require('../utils/middleware');


/** -------------------------------------------------------------------------------------------
 *  All routes for Reviews
 ** ----------------------------------------------------------------------------------------- */

// Routes with :id need to be placed after routes with no :id in them.
// create a new router object which is an isolated instance of middleware and routing functions.
const router = express.Router({ mergeParams: true });

// --- CREATE routes --- //
router.post('/', isLoggedIn, validateReview, catchAsync(reviews.createReview));

// --- DELETE id routes  --- //
router.delete('/:reviewId', isLoggedIn, isReviewAuthor, catchAsync());


// Default export because we are exporting a single primary variable from this module.
module.exports = router;