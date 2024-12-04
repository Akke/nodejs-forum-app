const getUserById = async (id) => {
    try {
        const request = await axios.get(`http://localhost:5000/api/user/${id}`)
        if(request.status == 200) {
            return request.data
        }
    } catch(error) {
        if(error.code == "ECONNABORTED") return null

        console.log(error)

        return {
            id: -1,
            username: "[deleted]"
        }
    }

    return null
}

const getCategoryById = async (id) => {
    try {
        const request = await axios.get(`http://localhost:5000/api/category/${id}`)
        if(request.status == 200) {
            return request.data
        }
    } catch(error) {
        if(error.code == "ECONNABORTED") return null

        console.log(error)
    }

    return null
}

async function getCategories() {
    try {
        const request = await axios.get(`http://localhost:5000/api/category`)

        if(request.status == 200) {
            return request.data
        }
    } catch(error) {
        if(error.code == "ECONNABORTED") return null

        console.log(error)
    }

    return null
}

const getThreadById = async (id) => {
    try {
        const request = await axios.get(`http://localhost:5000/api/thread/${id}`)
        if(request.status == 200) {
            return request.data
        }
    } catch(error) {
        if(error.code == "ECONNABORTED") return null

        console.log(error)
    }

    return null
}

