// npm installs
const mongoose   = require('mongoose');
const path       = require('path');
const session    = require('express-session');
const MongoStore = require('connect-mongo')(session);

// Sets path to .env file
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });


/**
 * Connects us to our Mongo Atlas Database and if it fails, it tells us why.
 * 
 * @return {void}
 */
module.exports.connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.DB_URL);
        console.log(`MongoDB connected: ${conn.connection.host}`);
    } catch (error) {
        console.log("MongoDB connection error:", error);
    }
}

/**
 * Disconnects us from our Mongo Atlas Database.
 * 
 * @return {void}
 */
module.exports.disconnectDB = async () => {
   await mongoose.connection.close();
   console.log(`MongoDB disconnected`);
}


/** ----------------------------------------------------------------------------
 * 
 * Set up session management middleware for the Express application.
 * 
 * --------------------------------------------------------------------------- */

// Create a new instance of MongoStore for storing session data in MongoDB.
const store = new MongoStore({
    url:        process.env.DB_URL,         // Specifies the MongoDB connection URL.
    secret:     process.env.SECRET,         // used for signing the session ID cookie.
    touchAfter: 24 * 60 * 60                // time a session is updated in database if no changes.
});

// Listen for the "error" event emitted by the 'store' object.
store.on("error", function (err) {
    console.log("SESSION STORE ERROR", err);
});

// Config for sessions allow the application to store user-specific data on the server between requests.
module.exports.sessionConfig = {
    store,
    name:              'session',
    secret:            process.env.SECRET,
    resave:            false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires:  Date.now() + 1000 * 60 * 60 * 24,
        maxAge:   1000 * 60 * 60 * 24
    }
};

// app.use(mongoSanitize({
//     replaceWith:'_'
// }));