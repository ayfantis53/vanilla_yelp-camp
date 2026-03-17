/**
 * @fileoverview A utility function for wrapping asynchronous Express route handlers 
 * to automatically handle errors.
 */

// Export an anonymous function that accepts another function (the route handler) as an argument.
module.exports = func => { 
  // This inner function will serve as the actual route handler for Express.
  // It receives the standard Express arguments: request (req), response (res), and next middleware function (next).
  return (req, res, next) => { 
    // Call the original asynchronous function ('func') with the standard Express arguments.
    // The result of 'func' is a Promise. We attach a '.catch(next)' handler to it.
    // If the Promise returned by 'func' is rejected (an error occurs), the '.catch()' block 
    // is executed, and the error is passed to the 'next' function.
    // Passing an error to 'next()' triggers the Express error handling middleware.
    func(req, res, next).catch(next); 
  } 
}