const mongoose = require("mongoose")
const bcrypt = require("bcrypt")

const schema = require("../schemas/categorySchema")

const CategorySchema = new mongoose.Schema(schema)

module.exports = mongoose.model("Category", CategorySchema)