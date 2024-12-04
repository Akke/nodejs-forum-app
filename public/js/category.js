const threadsContainer = document.querySelector(".categories-threads ul")

if(threadsContainer) {
    async function loadThreads() {
        try {
            const request = await axios.get(`http://localhost:5000/api/thread?category=${window.location.href.split("category/")[1]}`)
            if(request.status == 200) {
                const threads = request.data
    
                if(threads) {
                    for(const thread of threads) {
                        const li = document.createElement("li")
    
                        li.innerHTML = `
                            <div class="avatar">
                                <img src="https://avatars.githubusercontent.com/u/6265267?v=4" alt="User Avatar">
                            </div>
                            <div class="details">
                                <div class="title"><a href="../threads/${thread._id}">${thread.title}</a></div>
                                <div class="author">Created by <a href="#">${await getAuthor(thread.author)}</a> at ${thread.createdAt}</div>
                            </div>
                        `
                        threadsContainer.insertBefore(li, null)
                    }
                }
            }
        } catch(error) {
            console.log(error)
        }
    }
    
    loadThreads()
}

const createThread = document.querySelector(".categories-threads .new-thread")
if(createThread) {
    if(!localStorage.getItem("user")) {
        createThread.style.display = "none"
    }
}

async function getCategories() {
    try {
        const request = await axios.get(`http://localhost:5000/api/category`)

        if(request.status == 200) {
            const data = request.data
            if(data) {
                return data
            }
        }
    } catch(error) {
        console.log(error)
    }
}