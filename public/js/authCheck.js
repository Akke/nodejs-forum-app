function getCookie(name) {
    const value = `; ${document.cookie}`
    const parts = value.split(`; ${name}=`)
    if(parts.length === 2) return parts.pop().split(";").shift()
}

async function setUserData() {
    const jwt = getCookie("jwt")

    if(jwt) {
        try {
            const request = await axios.get(`http://localhost:5000/api/auth`, {
                headers: {
                    "Authorization": `Bearer ${jwt}`
                }
            })
            if(request.status == 200) {
                const data = request.data
                if(data) {
                    localStorage.setItem("user", JSON.stringify(data))
                }
            }
        } catch(error) {
            console.log("Could not check auth:", error)
        }
    }
}

function logout() {
    document.cookie = "jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
    localStorage.clear()
}

setUserData()
