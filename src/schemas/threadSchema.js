const mongoose = require("mongoose")

const threadSchema = {
    author: { type: mongoose.Schema.Types.ObjectId, required: true },
    category: { type: mongoose.Schema.Types.ObjectId, required: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
    likes: { type: Number, required: true },
    dislikes: { type: Number, required: true },
}

module.exports = threadSchema