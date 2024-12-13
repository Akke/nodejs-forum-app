const { getMongooseUniqueFieldErrors } = require("../utils/utils")

const User = require("../models/userModel")

const createUser = async (req, res) => {
    const { username, password } = req.body

    try {
        // this should not be necessary
        // but for some reason the { unique: true } field in the schema stopped working
        const findUser = await User.findOne({ username: username })
        if(findUser) {
            return res.status(400).json({ messages: [`Username already exists.`] })
        }

        const newUser = new User({
            username: username,
            password: password
        })

        const doc = await newUser.save()

        res.status(201).json(doc)
    } catch(error) {
        // check if there are duplicate unique fields
        // if there are, we return all of them as error messages (getMongooseUniqueFieldErrors generates the messages)
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
    const { id } = req.params

    if(req.user.id !== id) {
        return res.status(401).json({ messages: [`Access denied.`] })
    }

    try {
        const findUser = await User.findById(id)
        if(!findUser) {
            return res.status(404).json({ messages: [`User ${id} could not be found.`] })
        }

        await findUser.deleteOne({ _id: id })

        res.status(200).json({ messages: [`User ${id} was deleted successfully.`] })
    } catch(error) {
        // other server error
        console.log(error)
        res.status(500).send("Server Error")
    }
}

const updateUser = async (req, res) => {
    const { id } = req.params
    const { password, username } = req.body

    if(req.user.id !== id) {
        return res.status(401).json({ messages: [`Access denied.`] })
    }

    try {
        const findUser = await User.findById(id)
        if(!findUser) {
            return res.status(404).json({ messages: [`User ${id} could not be found.`] })
        }

        // this should not be necessary
        // but for some reason the { unique: true } field in the schema stopped working
        const findUsername = await User.findOne({ username: username })
        if(findUsername) {
            return res.status(400).json({ messages: [`Username already exists.`] })
        }

        const dataObj = {}

        if(password) dataObj.password = password
        if(username) dataObj.username = username

        // schema.pre() does not seem to work with findByIdAndUpdate so we use findOneAndUpdate instead
        // this is required so that the password can be hashed before it's saved
        const updatedUser = await User.findOneAndUpdate({ _id: id }, { $set: dataObj }, { new: true, fields: { password: 0 } })

        res.status(200).json({ messages: [`User ${id} was updated successfully.`], data: updatedUser })
    } catch(error) {
        // other server error
        console.log(error)
        res.status(500).send("Server Error")
    }
}

const getUsers = async (req, res) => {
    const { limit, skip } = req.query

    try {
        const findUsers = await User.find({}, { password: 0 }, { 
            skip: skip ? skip : 0, 
            limit: limit ? limit : 15 
        })

        res.status(200).json(findUsers)
    } catch(error) {
        // other server error
        console.log(error)
        res.status(500).send("Server Error")
    }
}


const getUser = async (req, res) => {
    const { id } = req.params 

    try {
        const findUser = await User.findById(id, { password: 0 })
        if(!findUser) {
            return res.status(404).json({ messages: [`User ${id} could not be found.`] })
        }

        res.status(200).json(findUser)
    } catch(error) {
        // other server error
        console.log(error)
        res.status(500).send("Server Error")
    }
}

module.exports = {
    createUser,
    deleteUser,
    updateUser,
    getUser,
    getUsers
}