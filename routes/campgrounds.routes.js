// npm installs
const express = require('express');
var multer    = require('multer');   

// project imports
const { storage }        = require('../lib/cloudinary');
const catchAsync         = require('../utils/catchAsync');
const campgrounds        = require('../controllers/campgrounds.controllers');
const { isLoggedIn, isAuthor, validateCampground } = require('../utils/middleware');


// For storing multiple photo files.
const upload      = multer({ storage: storage });

/** -------------------------------------------------------------------------------------------
 *  All routes for Campgrounds
 ** ----------------------------------------------------------------------------------------- */

// Routes with :id need to be placed after routes with no :id in them.
// create a new router object which is an isolated instance of middleware and routing functions.
const router      = express.Router();


// --- CREATE routes --- //
router.post('/', isLoggedIn, upload.array('image'), validateCampground, catchAsync(campgrounds.newCampground));

// --- READ routes --- //
router.get('/',    catchAsync(campgrounds.getCampgrounds));
router.get('/:id', catchAsync(campgrounds.getCampground));

// --- UPDATE id routes --- //
router.put('/:id', isAuthor, isLoggedIn, upload.array('image'), validateCampground, catchAsync(campgrounds.editCampground));

// --- DELETE id routes  --- //
router.delete('/:id', isAuthor, isLoggedIn, catchAsync(campgrounds.deleteCampground));


// Default export because we are exporting a single primary variable from this module.
module.exports = router;
