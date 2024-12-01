const { getMongooseUniqueFieldErrors } = require("../utils/utils")

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
        const duplicateFieldErrors = getMongooseUniqueFieldErrors(error)
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

const deleteUser = async (req, res) => {
    const id = req.body.id

    try {
        const findUser = await User.findById(id)
        if(!findUser) {
            return res.status(404).json({ success: false, messages: [`User ${id} could not be found.`] })
        }

        await findUser.deleteOne({ _id: id })

        res.status(201).json({ success: true })
    } catch(error) {
        // other server error
        console.log(error)
        res.status(500).send("Server Error")
    }
}

module.exports = {
    createUser,
    deleteUser
}