// the cookie is stored in document.cookie so we must extract it
// contains the JWT token returned by the server after logging in
function getCookie(name) {
    const value = `; ${document.cookie}`
    const parts = value.split(`; ${name}=`)
    if(parts.length === 2) return parts.pop().split(";").shift()
}

// when you call this API with a token present, assuming the token is valid,
// the API returns the user object the token is assosciated with, and then
// we can store that data in localStorage to later check if the user is logged in 
// (and also get their data)
async function setUserData() {
    const jwt = getCookie("jwt")

    if(jwt) {
        try {
            const request = await axios.get("http://localhost:5000/api/auth", {
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
            if(error.code == "ECONNABORTED") return

            console.log("Could not check auth:", error)

            if(error.status == 401) {
                // our token is invalid or it has expired
                logout()
                window.location.href = "/"
            }
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
