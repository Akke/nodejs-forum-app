const memberListContainer = document.querySelector(".member-list ul")

if(memberListContainer) {
    async function getMemberList() {
        try {
            const request = await axios.get("http://localhost:5000/api/user")
    
            if(request.status == 200) {
                const users = request.data
    
                if(users) {
                    for(const user of users) {
                        const li = document.createElement("li")
    
                        li.innerHTML = `
                            <div class="avatar">
                                <img src="https://avatars.githubusercontent.com/u/6265267?v=4" alt="User Avatar">
                            </div>
                            <div class="username"><a href="#">${user.username}</a></div>
                            <div class="created-date">Created at ${createDateTime(user.createdAt)}</div>
                        `

                        memberListContainer.insertBefore(li, null)
                    }
                }
            }
        } catch(error) {
            console.log(error)
        }
    }

    getMemberList()
}