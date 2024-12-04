
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