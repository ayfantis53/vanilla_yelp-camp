
if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}

// npm installs
const path           = require('path');
const express        = require('express');
const passport       = require('passport');
const ejsMate        = require('ejs-mate');
const flash          = require('connect-flash');
const LocalStrategy  = require('passport-local');
const session        = require('express-session');
const methodOverride = require('method-override');

// project imports
const UserSchema       = require('../models/user.model'); 
const ExpressError     = require('../utils/ExpressError'); 
const userRoutes       = require('../routes/user.routes');
const reviewRoutes     = require('../routes/reviews.routes');
const campgroundRoutes = require('../routes/campgrounds.routes');
const { connectDB, sessionConfig } = require('../lib/db');


/** ----------------------------------------------------------------------------------------
* 
* Sets up node app
* ----------------------------------------------------------------------------------------*/

// Creates an Express application instance
const app = express();

// -- EJS SETUP -- //

// Registers ejs-mate as the engine to handle files with the '.ejs' extension. 
// Sets 'ejs' as the default view engine for the Express application. 
// Specifies the directory where Express should look for view files.
app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../views'));

// Serves static files for supporting js scripts.
// Serves static files (CSS, images, client-side JavaScript, etc.) from the 'views' directory.
app.use(express.static(path.join(__dirname, '../utils')));
app.use(express.static(path.join(__dirname, '../views')));

// -- MONGOOSE MIDDLEWARE -- //

// It makes the form data available under the `req.body` property in your route handlers.
// Allows you to use HTTP verbs such as PUT or DELETE in places where the client only supports POST (like plain HTML forms).
app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method'));



// -- MIDDLEWARE -- //

// Initializes messages that are written to session & cleared after displayed to user on very next page render.
// Sessions allow the application to store user-specific data on the server between requests.
app.use(flash());
app.use(session(sessionConfig));

// Middleware to display errors.
app.use((err, req, res, next) => {
    const { statusCode = 500 } = err;

    if (!err.message) {
        err.message = 'Oh no Something went wrong!';
    }

    res.status(statusCode).render('layouts/error', { err });
});

// -- PASSPORT LOGIN USER CODE -- //
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(UserSchema.authenticate()));
passport.serializeUser(UserSchema.serializeUser());
passport.deserializeUser(UserSchema.deserializeUser());

// Middleware to make certain variables available to all templates (views) 
app.use((req, res, next) => {
    // Makes the currently logged-in user object available as 'currentUser' in all views.
    res.locals.currentUser = req.user

    // Makes any 'success or error' messages available, messages are cleared after being accessed.
    res.locals.success     = req.flash('success');
    res.locals.error       = req.flash('error');

    // Passes control to the next middleware function or route handler, Without it, the application would hang.
    next();
});


// -- ROUTES -- //

// Mounts the 'users' router at the root path ('/'). 
// Mounts the 'campgrounds' router at the '/campgrounds' path. 
// Mounts the 'reviews' router at the '/campgrounds/:id/reviews' path.
app.use('/', userRoutes);
app.use('/campgrounds', campgroundRoutes);
app.use('/campgrounds/:id/reviews', reviewRoutes);

app.get('/', (req, res) => {
    res.render('pages/home');
});

// app.all('*',  (req, res, next) => {
//     next(new ExpressError('Page Not Found', 404));
// });

app.listen(process.env.PORT, () => {
    console.log(`Serving on port ${process.env.PORT}`);
    // Connect to database.
    connectDB();
});