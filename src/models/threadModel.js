const mongoose = require("mongoose")
const bcrypt = require("bcrypt")

const schema = require("../schemas/threadSchema")

const ThreadSchema = new mongoose.Schema(schema, { timestamps: true })

module.exports = mongoose.model("Thread", ThreadSchema)