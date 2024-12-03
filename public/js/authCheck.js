function getCookie(name) {
    const value = `; ${document.cookie}`
    const parts = value.split(`; ${name}=`)
    if(parts.length === 2) return parts.pop().split(";").shift()
}

const jwt = getCookie("jwt")
if(jwt) {
    const userArea = document.querySelector(".user-area")
}