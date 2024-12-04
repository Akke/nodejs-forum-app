const accountSettingsForm = document.querySelector(".account-settings-form form")

if(accountSettingsForm) {
    accountSettingsForm.addEventListener("submit", async (e) => {
        e.preventDefault()
        clearFormErrors()

        const formData = new FormData(accountSettingsForm)

        const username = formData.get("username")
        const password = formData.get("password")
        const verifyPassword = formData.get("verifyPassword")

        if(password !== verifyPassword) {
            createFormError("Passwords must match.")
            return
        }

        try {
            const jwt = getCookie("jwt")

            if(jwt) {
                const id = JSON.parse(localStorage.getItem("user")).id
                let queryData = {}

                if(username) queryData = {...queryData, username}
                if(password) queryData = {...queryData, password}

                const request = await axios.patch(`http://localhost:5000/api/user/${id}`, queryData, {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${jwt}`
                    }
                })

                console.log(queryData, request)
            
                if(request.status == 200) {
                    // log them out if it's successful
                    // just for safety so they have to login again
                    accountSettingsForm.reset()
                    createFormSucessMessage("Settings saved successfully. Logging you out in 5 seconds. Please log back in again.")
                    setTimeout(() => {
                        window.location.href = `../logout`
                    }, 5000)
                }
            }
        } catch(error) {
            console.log(error)
            const messages = error.response.data.messages
            if(messages) {
                for(const message of messages) {
                    createFormError(message)
                }
            }
        } 
    })

}

const deleteCategoryButton = document.querySelector(".delete-category .delete")

if(deleteCategoryButton) {
    deleteCategoryButton.addEventListener("click", async () => {
        try {
            const jwt = getCookie("jwt")

            if(jwt) {
                const id = JSON.parse(localStorage.getItem("user")).id
                const request = await axios.delete(`http://localhost:5000/api/user/${id}`, {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${jwt}`
                    }
                })
                if(request.status == 200) {
                    window.location.href = "../logout"
                }
            }
        } catch(error) {
            console.log(error)
        }
    })
}


if(!localStorage.getItem("user")) {
    window.location.href = "../login"
}