/*
    Global middleware. Not tied to any specific route.
*/
const { validationResult } = require("express-validator")

// Middleware for express-validator
// It checks where the validator found faults in the data and returns 
// each error as an error message in an array through a response
const validateRequest = (req, res, next) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()) {
        const errorMessages = []
        
        errors.array().forEach((item) => {
            errorMessages.push(item.msg)
        })

        return res.status(400).json({
            messages: errorMessages
        })
    }
    
    next()
}

module.exports = {
    validateRequest
}