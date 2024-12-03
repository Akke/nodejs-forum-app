const API_URL_GET_AUTH = "http://localhost:5000/api/auth"

function getCookie(name) {
    const value = `; ${document.cookie}`
    const parts = value.split(`; ${name}=`)
    if(parts.length === 2) return parts.pop().split(";").shift()
}

async function setUserData() {
    const jwt = getCookie("jwt")

    if(jwt) {
        try {
            const request = await axios.get(API_URL_GET_AUTH, {
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
    } else {
        logout()
    }
}

function logout() {
    document.cookie = "jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
    localStorage.clear()
}

setUserData()
