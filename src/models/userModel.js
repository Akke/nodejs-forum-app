const mongoose = require("mongoose")

const UserSchema = require("../schemas/userSchema")

const Schema = mongoose.Schema

module.exports = mongoose.model("User", new Schema(UserSchema))