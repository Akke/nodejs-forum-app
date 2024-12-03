const Thread = require("../models/threadModel")

const createThread = async (req, res) => {
    const { title, content, likes, dislikes, category } = req.body
    const author = req.user.id

    try {
        const newThread = new Thread({
            author: author,
            title: title,
            content: content,
            likes: likes,
            dislikes: dislikes,
            category: category
        })

        const doc = await newThread.save()

        res.status(201).json(doc)
    } catch(error) {
        // other server error
        console.log(error)
        res.status(500).send("Server Error")
    }
}

const deleteThread = async (req, res) => {
    const { id } = req.params

    try {
        const findThread = await Thread.findById(id)
        if(!findThread) {
            return res.status(404).json({ messages: [`Thread ${id} could not be found.`] })
        }

        if(req.user.id !== findThread.author.toString()) {
            return res.status(401).json({ messages: [`Access denied.`] })
        }

        await findThread.deleteOne({ _id: id })

        res.status(200).json({ messages: [`Thread ${id} was deleted successfully.`] })
    } catch(error) {
        // other server error
        console.log(error)
        res.status(500).send("Server Error")
    }
}

const updateThread = async (req, res) => {
    const { id } = req.params
    const { title, content, likes, dislikes, category } = req.body

    if(Object.keys(req.body).length < 1) {
        return res.status(400).json({ messages: [`Request body is empty.`] })
    }

    try {
        const findThread = await Thread.findById(id)
        if(!findThread) {
            return res.status(404).json({ messages: [`Thread ${id} could not be found.`] })
        }

        if(req.user.id !== findThread.author.toString()) {
            return res.status(401).json({ messages: [`Access denied.`] })
        }

        // schema.pre() does not seem to work with findByIdAndUpdate so we use findOneAndUpdate instead
        // this is required so that the password can be hashed before it's saved
        const dataObj = {}

        if(title) dataObj.title = title
        if(content) dataObj.content = content
        if(likes) dataObj.likes = likes
        if(dislikes) dataObj.dislikes = dislikes
        if(category) dataObj.category = category

        const updatedThread = await Thread.findOneAndUpdate({ _id: id}, { $set: dataObj }, { new: true })

        res.status(200).json({ messages: [`Thread ${id} was updated successfully.`], data: updatedThread })
    } catch(error) {
        // other server error
        console.log(error)
        res.status(500).send("Server Error")
    }
}

const getThread = async (req, res) => {
    const { id } = req.params 

    try {
        const findThread = await Thread.findById(id)
        if(!findThread) {
            return res.status(404).json({ messages: [`Thread ${id} could not be found.`] })
        }

        res.status(200).json(findThread)
    } catch(error) {
        // other server error
        console.log(error)
        res.status(500).send("Server Error")
    }
}

const getThreads = async (req, res) => {
    const { limit, skip, category } = req.query

    try {
        let query = category ? { category: category } : {}

        const findThreads = await Thread.find(query, {}, { 
            skip: skip ? skip : 0, 
            limit: limit ? limit : 15 
        })

        res.status(200).json(findThreads)
    } catch(error) {
        // other server error
        console.log(error)
        res.status(500).send("Server Error")
    }
}

module.exports = {
    createThread,
    deleteThread,
    updateThread,
    getThread,
    getThreads
}