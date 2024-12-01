const { getMongooseUniqueErrors } = require("../utils/utils")

const User = require("../models/userModel")

const createUser = async (req, res) => {
    const { username, password } = req.body

    try {
        const newUser = new User({
            username: username,
            password: password
        })

        const doc = await newUser.save()

        res.status(201).json(doc)
    } catch(error) {
        // check if there are duplicate unique fields
        const duplicateFieldErrors = getMongooseUniqueErrors(error)
        if(duplicateFieldErrors != null) {
            return res.status(400).json({
                messages: duplicateFieldErrors
            })
        }
        
        // other server error
        console.log(error)
        res.status(500).send("Server Error")
    }
}

module.exports = {
    createUser
}