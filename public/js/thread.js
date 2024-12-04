const URL_CURRENT_THREAD_ID = window.location.href.split("threads/")[1]
const URL_API_THREAD_ID = `http://localhost:5000/api/thread/${URL_CURRENT_THREAD_ID}`
const URL_API_USER = `http://localhost:5000/api/user`
const URL_API_THREAD = `http://localhost:5000/api/thread`

const threadContainer = document.querySelector(".thread-container")

if(threadContainer) {
    async function getThreadData() {
        try {
            const request = await axios.get(URL_API_THREAD_ID)
            if(request.status == 200) {
                const data = request.data

                if(data) {
                    const authorData = await getUserById(data.author)

                    let likesContent = ``
                    let controlsContent = ``

                    if(localStorage.getItem("user")) {
                        likesContent = `
                            <div class="reactions">
                                <button class="likes"><i class="fa fa-thumbs-up"></i> <span>${data.likes}</span></button>
                                <button class="dislikes"><i class="fa fa-thumbs-down"></i> <span>${data.dislikes}</span></button>
                            </div>
                        `

                        controlsContent = `
                            <div class="controls">
                                <ul>
                                    <li class="deleteThread"><a href="#">Delete</a></li>
                                    <li class="editThread"><a href="#">Edit</a></li>
                                </ul>
                            </div>
                        `
                    }

                    threadContainer.innerHTML = `
                        <div class="poster">
                            <div class="username"><a href="#">${authorData.username}</a></div>
                            <div class="avatar">
                                <img src="https://avatars.githubusercontent.com/u/6265267?v=4" alt="User Avatar">
                            </div>
                        </div>

                        <div class="body">
                            <div class="form-errors">
                                <ul></ul>
                            </div>

                            <p>${data.content}</p>

                            <button class="saveEdit">Save</button>

                            <div class="footer">
                                ${controlsContent}

                                <div class="timestamp">Created at ${createDateTime(data.createdAt)}</div>

                                ${likesContent}
                            </div>
                        </div>
                    `
                }
            }
        } catch(error) {
            console.log(error)
            if(error.status == 400) {
                window.location.href = "/404"
                return
            }
        }
    }

    getThreadData()
}

// updates the breadcrumb links
async function updateBreadcrumbs() {
    const breadcrumbCategory = document.querySelector(".breadcrumbs .previous")
    const breadcrumbThread = document.querySelector(".breadcrumbs .current")

    if(breadcrumbCategory) {
        try {
            const id = await getCategoryId()
            const request = await axios.get(`http://localhost:5000/api/category/${id}`)

            if(request.status == 200) {
                const data = request.data

                if(data) {
                    breadcrumbCategory.innerHTML = `<a href="../category/${data._id}">${data.name}</a>`
                }
            }
        } catch(error) {
            console.log(error)
        }
    }

    if(breadcrumbThread) {
        const threadData = await getThreadById(URL_CURRENT_THREAD_ID)
        breadcrumbThread.innerHTML = `<a href="#">${threadData.title}</a>`
    }
}

// returns the id of the category the viewed thread belongs to
async function getCategoryId() {
    const request = await axios.get(URL_API_THREAD_ID)
    if(request.status == 200) {
        return request.data.category
    }
}

// updates likes/dislikes
async function updateLikesDislikes(likeType, amount) {
    if(likeType != "likes" && likeType != "dislikes") {
        console.log("likeType must be either 'likes' or 'dislikes' in 'updateLikesDislikes'")
        return
    }

    const jwt = getCookie("jwt")

    if(jwt) {
        const fetchRequest = await axios.get(URL_API_THREAD_ID)
        if(fetchRequest.status == 200) {
            const data = fetchRequest.data
            if(data) {
                const patchRequest = await axios.patch(URL_API_THREAD_ID, {
                    [likeType]: data[likeType] + amount
                }, {
                    headers: {
                        "Authorization": `Bearer ${jwt}`
                    }
                })

                if(patchRequest.status == 200) {
                    const likeCountEl = document.querySelector(`.${likeType} span`)
                    likeCountEl.innerHTML = patchRequest.data.data[likeType]
                }
            }
        }
    }
}

// deletes the viewed thread
async function deleteThread() {
    const jwt = getCookie("jwt")

    if(jwt) {
        const id = await getCategoryId()

        const request = await axios.delete(URL_API_THREAD_ID, {
            headers: {
                "Authorization": `Bearer ${jwt}`
            }
        })

        if(request.status == 200) {
            window.location.href = `../category/${id}`
        }
    }
}

// initiates editing of title and content of the viewed thread, does NOT save it
function editThread() {
    const title = document.querySelector(".left-container .section-header")
    if(title) {
        title.classList.add("contenteditable")
        title.setAttribute("contenteditable", "")
        title.focus()
    }

    const content = document.querySelector(".thread-container .body p")
    if(content) {
        content.classList.add("contenteditable")
        content.setAttribute("contenteditable", "")
        content.focus()
    }

    const saveEditButton = document.querySelector(".thread-container .body .saveEdit")
    if(saveEditButton) {
        saveEditButton.style.display = "block"
    }
}

// sends the edit thread request to the server
async function editThreadSave(dataObj) {
    clearFormErrors()

    const jwt = getCookie("jwt")

    if(jwt) {
        const id = await getCategoryId()

        try {
            const request = await axios.patch(URL_API_THREAD_ID, dataObj, {
                headers: {
                    "Authorization": `Bearer ${jwt}`
                }
            })
    
            if(request.status == 200) {
                return request.data
            }
        } catch(error) {
            const messages = error.response.data.messages
            if(messages) {
                for(const message of messages) {
                    createFormError(message)
                }
            }
        }
    }
}

// saves the edited values of the title/content of the viewed thread
async function onConfirmSaveEditThread(target) {
    const title = document.querySelector(".left-container .section-header")
    const content = document.querySelector(".thread-container .body p")

    const editResult = await editThreadSave({
        title: title.textContent,
        content: content.textContent
    })

    if(editResult) {
        title.textContent = editResult.data.title
        content.textContent = editResult.data.content

        content.classList.remove("contenteditable")
        content.removeAttribute("contenteditable")

        title.classList.remove("contenteditable")
        title.removeAttribute("contenteditable")

        target.style.display = "none"
    }
}

document.addEventListener("click", (e) => {
    const target = e.target

    if(target.closest(".likes")) {
        updateLikesDislikes("likes", 1)
    }

    if(target.closest(".dislikes")) {
        updateLikesDislikes("dislikes", 1)
    }

    if(target.closest(".deleteThread")) {
        deleteThread()
    }

    if(target.closest(".editThread")) {
        editThread()
    }

    if(target.closest(".saveEdit")) {
        onConfirmSaveEditThread(target)
    }
})

if(URL_CURRENT_THREAD_ID != "new") {
    updateBreadcrumbs()
} else {
    if(!localStorage.getItem("user")) {
        window.location.href = "../login"
    }
}