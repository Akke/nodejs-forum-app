
if(localStorage.getItem("user")) {
    window.location.href = "/"
}

const API_URL_REGISTER = "http://localhost:5000/api/user"

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
        const request = await axios.post(API_URL_REGISTER, {
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

function createFormSucessMessage(text) {
    const successContainer = document.querySelector(".form-success")
    if(successContainer) {
        successContainer.innerHTML = text
    }
}

function clearFormSuccessMessage() {
    const successContainer = document.querySelector(".form-success")
    if(successContainer) {
        successContainer.innerHTML = ""
    }
}