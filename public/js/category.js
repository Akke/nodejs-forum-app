const API_URL_THREADS_GET = `http://localhost:5000/api/thread?category=${window.location.href.split("category/")[1]}`

async function loadThreads() {
    const threadsContainer = document.querySelector(".categories-threads ul")

    try {
        const request = await axios.get(API_URL_THREADS_GET)
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
                            <div class="author">Created by <a href="#">TestUser123</a> at ${thread.createdAt}</div>
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