
if(localStorage.getItem("user")) {
    window.location.href = "/"
}

const loginForm = document.querySelector(".login-container form")
loginForm.addEventListener("submit", async (e) => {
    e.preventDefault()
    clearFormErrors()
    clearFormSuccessMessage()

    const formData = new FormData(loginForm)
    
    const username = formData.get("username")
    const password = formData.get("password")
    const passwordVerify = formData.get("verify_password")

    if(password !== passwordVerify) {
        createFormError("Passwords do not match.")
        return
    }

    try {
        const request = await axios.post("http://localhost:5000/api/user", {
            username: username,
            password: password
        }, {
            headers: {
                "Content-Type": "application/json"
            }
        })
    
        if(request.status == 201) {
            createFormSucessMessage("User has been created successfully.")
            loginForm.reset()
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

