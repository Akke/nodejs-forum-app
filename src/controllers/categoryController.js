const Category = require("../models/categoryModel")
const Thread = require("../models/threadModel")

const createCategory = async (req, res) => {
    const { name, displayIcon, displayColor } = req.body

    try {
        const newCategory = new Category({
            name: name,
            displayIcon: displayIcon,
            displayColor: displayColor
        })

        const doc = await newCategory.save()

        res.status(201).json(doc)
    } catch(error) {
        // other server error
        console.log(error)
        res.status(500).send("Server Error")
    }
}

const deleteCategory = async (req, res) => {
    const { id } = req.params

    try {
        const findCategory = await Category.findById(id)
        if(!findCategory) {
            return res.status(404).json({ messages: [`Category ${id} could not be found.`] })
        }

        await findCategory.deleteOne({ _id: id })

        // we also have to delete all threads in this category
        const findThreads = await Thread.deleteMany({ category: id })

        res.status(200).json({ messages: [`Category ${id} (${findCategory.name}) was deleted successfully.`] })
    } catch(error) {
        // other server error
        console.log(error)
        res.status(500).send("Server Error")
    }
}

const updateCategory = async (req, res) => {
    const { id } = req.params
    const { name, displayIcon, displayColor } = req.body

    if(Object.keys(req.body).length < 1) {
        return res.status(400).json({ messages: [`Request body is empty.`] })
    }

    try {
        const findCategory = await Category.findById(id)
        if(!findCategory) {
            return res.status(404).json({ messages: [`Category ${id} could not be found.`] })
        }

        // schema.pre() does not seem to work with findByIdAndUpdate so we use findOneAndUpdate instead
        // this is required so that the password can be hashed before it's saved
        const dataObj = {}

        if(name) dataObj.name = name
        if(displayIcon) dataObj.displayIcon = displayIcon
        if(displayColor) dataObj.displayColor = displayColor

        const updatedCategory = await Category.findOneAndUpdate({ _id: id}, { $set: dataObj }, { new: true })

        res.status(200).json({ messages: [`Category ${id} (${findCategory.name}) was updated successfully.`], data: updatedCategory })
    } catch(error) {
        // other server error
        console.log(error)
        res.status(500).send("Server Error")
    }
}

const getCategory = async (req, res) => {
    const { id } = req.params 

    try {
        const findCategory = await Category.findById(id)
        if(!findCategory) {
            return res.status(404).json({ messages: [`Category ${id} could not be found.`] })
        }

        res.status(200).json(findCategory)
    } catch(error) {
        // other server error
        console.log(error)
        res.status(500).send("Server Error")
    }
}

const getCategories = async (req, res) => {
    const { limit, skip } = req.query

    try {
        const findCategory = await Category.find({}, {}, { 
            skip: skip ? skip : 0, 
            limit: limit ? limit : 15 
        })

        res.status(200).json(findCategory)
    } catch(error) {
        // other server error
        console.log(error)
        res.status(500).send("Server Error")
    }
}

module.exports = {
    createCategory,
    deleteCategory,
    updateCategory,
    getCategory,
    getCategories
}