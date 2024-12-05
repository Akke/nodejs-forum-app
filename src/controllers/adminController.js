const User = require("../models/userModel")

const adminGetUser = async (req, res) => {
    const { id } = req.params 

    try {
        const findUser = await User.findById(id)
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
    adminGetUser
}