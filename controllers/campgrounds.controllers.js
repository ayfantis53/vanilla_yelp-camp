// npm installs
const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");

// project imports
const { cloudinary }   = require('../lib/cloudinary');
const CampgroundSchema = require('../models/campground.model');


// Access mapbox.
const mapBoxToken = process.env.MAPBOX_TOKEN;
const geocoder    = mbxGeocoding({ accessToken: mapBoxToken });

/**
 * Fuzzy search for finding specific names of campgrounds.
 * @param {String} text keyword we are searching for
 * @return {void}
 */
function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

/* @DESC   CreateCampgrounds ------------------------------------------------------------------------------
*  @ROUTE  POST /campgrounds
*  @ACCESS public  
*---------------------------------------------------------------------------------------------------------*/
module.exports.newCampground = async(req, res) => {
    const geoData = await geocoder.forwardGeocode({
        query: req.body.campground.location, 
        limit: 1
    }).send();

    const campground    = new CampgroundSchema(req.body.campground);
    campground.geometry = geoData.body.features[0].geometry;
    campground.images   = req.files.map(f => ({ url: f.path, filename: f.filename }))
    campground.author   = req.user._id;

    await campground.save();

    req.flash('success', 'New Campground Added!');
    res.redirect(`campgrounds/${campground._id}`);
}

/* @DESC   GetCampgrounds ---------------------------------------------------------------------------------
*  @ROUTE  GET /campgrounds
*  @ACCESS private  
*---------------------------------------------------------------------------------------------------------*/
module.exports.getCampgrounds = async(req, res) => {
    // Fuzzzy search
    if (req.query.search) {
        const regex = new RegExp(escapeRegex(req.query.search), 'gi');

        CampgroundSchema.find({ title: regex }, function(err, Allcampgrounds) {
            if (err) {
                console.log(err);
            } else {
               res.render('pages/index', { campgrounds: Allcampgrounds });
            }
        });
    }
    else {
        const campgrounds = await CampgroundSchema.find({});
        res.render('pages/index', { campgrounds });
    }
}

/* @DESC   GetSingleCampground ----------------------------------------------------------------------------
*  @ROUTE  GET /campgrounds/:id
*  @ACCESS private  
*---------------------------------------------------------------------------------------------------------*/
module.exports.getCampground = async(req, res) => {
    const campground = await CampgroundSchema.findById(req.params.id)
                                             .populate({ path:'reviews', populate: { path: 'author' }})
                                             .populate('author');
    if (!campground) {
        req.flash('error', 'Campground NOT Found!');
        res.redirect('/campgrounds')
    }

    res.render('pages/show', { campground });
}

/* @DESC   UpdateCampground -------------------------------------------------------------------------------
*  @ROUTE  PATCH(UPDATE) /campgrounds/:id
*  @ACCESS private  
*---------------------------------------------------------------------------------------------------------*/
module.exports.editCampground = async(req, res) => {
    const campground = await CampgroundSchema.findByIdAndUpdate(req.params.id, { ...req.body.campground });
    if (!campground) {
        req.flash('error', 'Campground NOT Found!');
        res.redirect('/campgrounds')
    }

    const imgs       = req.files.map(f => ({ url: f.path, filename: f.filename }));
    campground.images.push(...imgs);

    await campground.save();

    if (req.body.deleteImages) {   
        for (let filename of req.body.deleteImages) {
            await cloudinary.uploader.destroy(filename);
        }

        await campground.updateOne({ $pull: { images: { filename: { $in: req.body.deleteImages } } } });
    }

    req.flash('success', 'Campground Updated!');
    res.redirect(`/campgrounds/${campground._id}`);   
}

/* @DESC   DeleteCampground -------------------------------------------------------------------------------
*  @ROUTE  DELETE /campgrounds/:id
*  @ACCESS private  
*---------------------------------------------------------------------------------------------------------*/
module.exports.deleteCampground = async(req, res) => {
    await CampgroundSchema.findByIdAndDelete(req.params.id);

    req.flash('success', 'Campground Was Deleted!');

    res.redirect('/campgrounds');
}
