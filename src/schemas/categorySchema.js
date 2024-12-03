const mongoose = require("mongoose")

const categorySchema = {
    name: { type: String, required: true },
    displayIcon: { type: String, required: true },
    displayColor: { type: String, required: true },
}

module.exports = categorySchema