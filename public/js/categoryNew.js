const categoryCreateForm = document.querySelector(".category-create-form form")

if(categoryCreateForm) {
    categoryCreateForm.addEventListener("submit", async (e) => {
        e.preventDefault()
        clearFormErrors()

        const formData = new FormData(categoryCreateForm)

        const name = formData.get("name")
        const displayIcon = formData.get("displayIcon")
        const displayColor = formData.get("displayColor")

        try {
            let userData = localStorage.getItem("user")

            if(userData) {
                userData = JSON.parse(userData)

                const jwt = getCookie("jwt")

                if(jwt) {
                    const request = await axios.post("http://localhost:5000/api/category", {
                        name: name,
                        displayIcon: displayIcon,
                        displayColor: displayColor,
                    }, {
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${jwt}`
                        }
                    })
                
                    if(request.status == 201) {
                        categoryCreateForm.reset()
                        window.location.href = `../category/${request.data._id}`
                    }
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


if(!localStorage.getItem("user")) {
    window.location.href = "../login"
}