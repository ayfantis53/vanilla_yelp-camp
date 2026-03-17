/**
 * Custom error class for handling application-specific errors in Express.js.
 * Extends the built-in Error class to inherit standard error properties 
 * like 'message' and 'stack'.
 */
class ExpressError extends Error {
    /**
     * Constructor for the custom error class.
     * @param {string} message    The error message to be displayed or logged.
     * @param {number} statusCode The HTTP status code associated with the error (e.g., 404, 500).
     */
    constructor(message, statusCode) {
        super();
        
        this.message    = message;
        this.statuscode = statusCode;
    }
}

// Export the custom error class for use in other files (Node.js module syntax).
module.exports = ExpressError;