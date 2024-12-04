
if(localStorage.getItem("user")) {
    window.location.href = "/"
}

const loginForm = document.querySelector(".login-container form")
if(loginForm) {
    loginForm.addEventListener("submit", async (e) => {
        e.preventDefault()
        clearFormErrors()
    
        const formData = new FormData(loginForm)
        
        const username = formData.get("username")
        const password = formData.get("password")
    
        try {
            const request = await axios.post("http://localhost:5000/api/auth/sign", {
                username: username,
                password: password
            }, {
                headers: {
                    "Content-Type": "application/json"
                }
            })
        
            if(request.status == 200) {
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
                for(const message of messages) {
                    createFormError(message)
                }
            }
        }
    })
}