const { getMongooseUniqueFieldErrors } = require("../utils/utils")

const Thread = require("../models/threadModel")

const createThread = async (req, res) => {
    const { author, title, content, likes, dislikes } = req.body

    try {
        const newThread = new Thread({
            author: author,
            title: title,
            content: content,
            likes: likes,
            dislikes: dislikes
        })

        const doc = await newThread.save()

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

module.exports = {
    createThread
}