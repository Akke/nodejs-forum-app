const id = window.location.href.split("category/")[1].split("/edit")[0]

const categoryCreateForm = document.querySelector(".category-create-form form")

if(categoryCreateForm) {
    async function populateForm() {
        const categoryData = await getCategoryById(id)

        const categoryName = document.querySelector(".category-name")
        categoryName.textContent = `Editing ${categoryData.name}`

        const nameInput = categoryCreateForm.querySelector("input[name='name']")
        const displayIconInput = categoryCreateForm.querySelector("input[name='displayIcon']")
        const displayColorInput = categoryCreateForm.querySelector("input[name='displayColor']")
        
        nameInput.value = categoryData.name
        displayIconInput.value = categoryData.displayIcon
        displayColorInput.value = categoryData.displayColor
    }

    categoryCreateForm.addEventListener("submit", async (e) => {
        e.preventDefault()
        clearFormErrors()

        const formData = new FormData(categoryCreateForm)

        const name = formData.get("name")
        const displayIcon = formData.get("displayIcon")
        const displayColor = formData.get("displayColor")

        try {
            const jwt = getCookie("jwt")

            if(jwt) {
                const request = await axios.patch(`http://localhost:5000/api/category/${id}`, {
                    name: name,
                    displayIcon: displayIcon,
                    displayColor: displayColor,
                }, {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${jwt}`
                    }
                })
            
                if(request.status == 200) {
                    window.location.href = `../${request.data.data._id}`
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

    populateForm()
}

const deleteCategoryButton = document.querySelector(".delete-category .delete")

if(deleteCategoryButton) {
    deleteCategoryButton.addEventListener("click", async () => {
        try {
            const request = await axios.delete(`http://localhost:5000/api/category/${id}`)
            if(request.status == 200) {
                window.location.href = "/"
            }
        } catch(error) {
            console.log(error)
        }
    })
}


if(!localStorage.getItem("user")) {
    window.location.href = "../login"
}