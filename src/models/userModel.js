const mongoose = require("mongoose")
const bcrypt = require("bcrypt")

const schema = require("../schemas/userSchema")

const UserSchema = new mongoose.Schema(schema, { timestamps: true })

// encrypt the password
UserSchema.pre("save", async function(next) {
    if(!this.isModified("password"))
        return next()
    
    const saltRounds = 10

    this.password = await bcrypt.hash(this.password, saltRounds)

    next()
})

UserSchema.pre("findOneAndUpdate", async function(next) {
    let update = this.getUpdate()

    if(!update.password)
        return next()
    
    const saltRounds = 10

    update.password = await bcrypt.hash(update.password, saltRounds)

    next()
})

module.exports = mongoose.model("User", UserSchema)