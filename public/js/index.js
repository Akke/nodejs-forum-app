
const categoryContainer = document.querySelector(".forum-categories ul")

if(categoryContainer) {
    async function loadCategories() {
        try {
            const request = await axios.get("http://localhost:5000/api/category")
            if(request.status == 200) {
                const categories = request.data
    
                if(categories) {
                    for(const category of categories) {
                        const li = document.createElement("li")
    
                        li.innerHTML = `
                            <div class="icon-wrapper" style="background-color: ${category.displayColor}">
                                <i class="fa fa-${category.displayIcon}"></i>
                            </div>
    
                            <div class="category-body">
                                <div class="category-title">
                                    <a href="/category/${category._id}">${category.name}</a>
                                </div>
    
                                <!--
                                <div class="content-count">
                                    <div class="count">
                                        <div class="amount">123</div>
                                        <div class="description">Threads</div>
                                    </div>
                                    <div class="count">
                                        <div class="amount">1234</div>
                                        <div class="description">Messages</div>
                                    </div>
                                </div>
    
                                <div class="latest-post">
                                    <div class="post-details">
                                        <div class="post-title">
                                            <a href="#">Lorem ipsum dolor sit amet...</a>
                                        </div>
                                        <div class="username">
                                            Created by <a href="#">TestUser123</a>
                                        </div>
                                    </div>
                                    <div class="avatar">
                                        <img src="https://avatars.githubusercontent.com/u/6265267?v=4" alt="User Avatar">
                                    </div>
                                </div>
                                -->
                            </div>
                        `
                        categoryContainer.insertBefore(li, null)
                    }
                }
            }
        } catch(error) {
            console.log(error)
        }
    }
    
    loadCategories()
}

const recentThreads = document.querySelector(".recent-threads ul")

if(recentThreads) {
    async function loadRecentThreads() {
        try {
            const request = await axios.get("http://localhost:5000/api/thread?limit=5&sortOrder=-1")

            if(request.status == 200) {
                const threads = request.data

                if(threads) {
                    for(const thread of threads) {
                        const authorData = await getUserById(thread.author)
                        const categoryData = await getCategoryById(thread.category)
                        let categoryName = "[deleted]"

                        if(categoryData) {
                            categoryName = categoryData.name
                        }

                        const li = document.createElement("li")
                        li.innerHTML = `
                            <div class="avatar">
                                <img src="https://avatars.githubusercontent.com/u/6265267?v=4" alt="User Avatar">
                            </div>

                            <div class="thread">
                                <div class="title">
                                    <a href="../threads/${thread._id}">${thread.title}</a>
                                </div>

                                <div class="user">
                                    Created by <a href="#">${authorData.username}</a>
                                </div>

                                <div class="category">in <a href="../category/${thread.category}">${categoryName}</a></div>
                            </div>
                        `

                        recentThreads.insertBefore(li, null)
                    }
                }
            }
        } catch(error) {
            console.log(error)
        }
    }

    loadRecentThreads()
}