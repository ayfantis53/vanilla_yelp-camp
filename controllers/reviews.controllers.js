// project imports
const ReviewSchema     = require('../models/review.model');
const CampgroundSchema = require('../models/campground.model');


/* @DESC   CreateReview -----------------------------------------------------------------------------------
*  @ROUTE  POST /campgrounds/:id/reviews
*  @ACCESS public  
*---------------------------------------------------------------------------------------------------------*/
module.exports.createReview = async(req, res) => {
    const campground = await CampgroundSchema.findById(req.params.id);
    const review     = new ReviewSchema(req.body.review);
    review.author    = req.user._id;

    campground.reviews.push(review);

    await review.save();
    await campground.save();

    req.flash('success', 'Your Review Was Added!');
    res.redirect(`/campgrounds/${campground._id}`);
}

/* @DESC   DeleteReview -----------------------------------------------------------------------------------
*  @ROUTE  DELETE /campgrounds/:id/reviews
*  @ACCESS public  
*---------------------------------------------------------------------------------------------------------*/
module.exports.deleteReview = async(req, res) => {
    const { id, reviewId } = req.params;

    await CampgroundSchema.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await ReviewSchema.findByIdAndDelete(reviewId);
    
    req.flash('success', 'Your Review Was Deleted!');
    res.redirect(`/campgrounds/${id}`);
}