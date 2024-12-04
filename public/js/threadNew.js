const threadCreateForm = document.querySelector(".thread-create-form form")

if(threadCreateForm) {
    const select = threadCreateForm.querySelector("select[name='category']")
    if(select) {
        const createOptions = async () => {
            let options = ``

            try {
                const categories = await getCategories()
                if(categories) {
                    for(const category of categories) {
                        options += `<option value="${category._id}">${category.name}</option>`
                    }
        
                    select.innerHTML = options
                }
            } catch(error) {
                console.log(error)
            }
        }

        createOptions()
    }

    threadCreateForm.addEventListener("submit", async (e) => {
        e.preventDefault()
        clearFormErrors()

        const formData = new FormData(threadCreateForm)

        const title = formData.get("title")
        const content = formData.get("content")
        const category = formData.get("category")

        try {
            let userData = localStorage.getItem("user")

            if(userData) {
                userData = JSON.parse(userData)

                const jwt = getCookie("jwt")

                if(jwt) {
                    const request = await axios.post("http://localhost:5000/api/thread", {
                        title: title,
                        content: content,
                        author: userData.id,
                        category: category,
                        likes: 0,
                        dislikes: 0
                    }, {
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${jwt}`
                        }
                    })
                
                    if(request.status == 201) {
                        threadCreateForm.reset()
                        window.location.href = `../threads/${request.data._id}`
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