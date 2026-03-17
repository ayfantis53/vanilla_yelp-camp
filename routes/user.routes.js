// npm installs
const express  = require('express');
const passport = require('passport');

// project imports
const catchAsync = require('../utils/catchAsync');
const user       = require('../controllers/user.controllers');


/** -------------------------------------------------------------------------------------------
 *  All routes for Users
 ** ----------------------------------------------------------------------------------------- */

// Routes with :id need to be placed after routes with no :id in them.
// create a new router object which is an isolated instance of middleware and routing functions.
const router = express.Router();

// --- CREATE routes --- //
router.post('/register', catchAsync(user.register));
router.post('/login',    passport.authenticate('local', { failureFlash: true, failureRedirect:'/login' }), user.login);

// --- READ routes --- //
router.get('/register',  user.renderRegister);
router.get('/login',     user.renderLogin   );
router.get('/logout',    user.logout        );


// Default export because we are exporting a single primary variable from this module.
module.exports = router;