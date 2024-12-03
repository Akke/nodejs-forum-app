const API_URL_THREAD_GET_DISPLAY = `http://localhost:5000/api/thread/${window.location.href.split("threads/")[1]}`

async function getThreadData() {
    const threadContainer = document.querySelector(".thread-container")

    try {
        const request = await axios.get(API_URL_THREAD_GET_DISPLAY)
        if(request.status == 200) {
            const data = request.data

            if(data) {
                threadContainer.innerHTML = `
                    <div class="poster">
                        <div class="username"><a href="#">${await getAuthor(data.author)}</a></div>
                        <div class="avatar">
                            <img src="https://avatars.githubusercontent.com/u/6265267?v=4" alt="User Avatar">
                        </div>
                    </div>

                    <div class="body">
                        <p>${data.content}</p>

                        <div class="footer">
                            <div class="timestamp">Created at ${data.createdAt}</div>

                            <div class="reactions">
                                <button class="likes"><i class="fa fa-thumbs-up"></i> ${data.likes}</button>
                                <button class="dislikes"><i class="fa fa-thumbs-down"></i> ${data.dislikes}</button>
                            </div>
                        </div>
                    </div>
                `
            }
        }
    } catch(error) {
        console.log(error)
    }
}

const API_URL_THREAD_GET_AUTHOR = `http://localhost:5000/api/user`

async function getAuthor(id) {
    const request = await axios.get(`${API_URL_THREAD_GET_AUTHOR}/${id}`)
    if(request.status == 200) {
        return request.data.username
    }
}

getThreadData()