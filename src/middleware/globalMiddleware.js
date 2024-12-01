/*
    Global middleware. Not tied to any specific route.
*/
const { validationResult } = require("express-validator")

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