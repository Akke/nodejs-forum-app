
if(localStorage.getItem("user")) {
    window.location.href = "/"
}

const API_URL = "http://localhost:5000/api"

const loginForm = document.querySelector(".login-container form")
loginForm.addEventListener("submit", async (e) => {
    e.preventDefault()

    const formData = new FormData(loginForm)
    
    const username = formData.get("username")
    const password = formData.get("password")

    try {
        const request = await axios.post(`${API_URL}/auth/sign`, {
            username: username,
            password: password
        }, {
            headers: {
                "Content-Type": "application/json"
            }
        })
    
        if(request.status == 200) {
            clearFormErrors()

            const data = request.data
            if(data) {
                const token = data.token
                if(token) {
                    document.cookie = `jwt=${token}; path=/; Secure; SameSite=Strict`
                    setUserData()
                    setTimeout(() => {
                        window.location.href = "/"
                    }, 500)
                }
            }
        }
    } catch(error) {
        const messages = error.response.data.messages
        if(messages) {
            clearFormErrors()

            for(const message of messages) {
                createFormError(message)
            }
        }
    }
})

function createFormError(text) {
    const errorContainer = document.querySelector(".form-errors ul")
    if(errorContainer) {
        const li = document.createElement("li")
        li.innerHTML = text
        errorContainer.insertBefore(li, null)
    }
}

function clearFormErrors() {
    const errorContainer = document.querySelector(".form-errors ul")
    if(errorContainer) {
        errorContainer.innerHTML = ""
    }
}