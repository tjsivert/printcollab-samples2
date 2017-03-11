const util = require('util')
// we are exporting an object that has the function validateBlogParams.
module.exports = {
    validateBlogParams
}


function validateBlogParams(req, res, next) {
    req.checkBody('picture', 'Picture Required').notEmpty()
    req.checkBody('title', 'Title Required').notEmpty()
    req.checkBody('content', 'Content Required').notEmpty()
    req.checkBody('author', 'Author Required').notEmpty()

    const errors = req.validationErrors()
    if (errors) return res.status(400).send('There have been validation errors: ' + util.inspect(errors))
    next()
}

// After checking the parameters, you need to run .getValidationResult() which will asynchronously get the validation errors. Using the promise syntax, we then check if there are any errrors, and if so return a 400 response with those errors.
// If there are no errors, we call the next() function which will continue the request and pass it to our controllers.

// middleware:
// A function that is invoked by the Express routing layer before the final request handler, and thus sits in the middle between a raw request and the final intended route. A few fine points of terminology around middleware:

// notes:
// Define any required fiellds in the scehma.
// create functions in the service to perform crud operations to connect with db
// controller acts as the enterypoint for the request, it calls the service and handles the promise that is returned
// blogs route will create an instance of the router and direct requests to api to correct controller fucntions
// Pipeline for request should be routes file -> controller -> service -> db
// insert is POST & update is PUT
