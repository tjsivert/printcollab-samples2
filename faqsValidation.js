const util = require('util')

module.exports = {
    validateFaqParams
}

function validateFaqParams(req, res, next) {
    req.checkBody('question', 'Question Required').notEmpty()
    req.checkBody('answer', 'Answer Required').notEmpty()
    const errors = req.validationErrors()
    if (errors) return res.status(400).send('There have been validation errors: ' + util.inspect(errors))
    next()
}
