/*
    Error Handling for Mongoose "unique" Schema attribute.
    Returns an array with error messages that can be sent as JSON.
*/
const getMongooseUniqueErrors = (error) => {
    if(error.name === "MongoServerError" && error.code === 11000) {
        let duplicateFields = Object.keys(error.keyPattern)

        duplicateFields = duplicateFields.map((key) => {
            return `Field '${key}' must be unique.`
        })

        return duplicateFields
    } 

    return null
}

module.exports = {
    getMongooseUniqueErrors
}