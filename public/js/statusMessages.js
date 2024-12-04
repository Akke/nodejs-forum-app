function createFormError(text) {
    const errorContainer = document.querySelector(".form-errors ul")
    if(errorContainer) {
        const li = document.createElement("li")
        li.innerHTML = text
        errorContainer.insertBefore(li, null)
    }
}

function clearFormErrors() {
    const errorContainer = document.querySelector(".form-errors ul")
    if(errorContainer) {
        errorContainer.innerHTML = ""
    }
}

function createFormSucessMessage(text) {
    const successContainer = document.querySelector(".form-success")
    if(successContainer) {
        successContainer.innerHTML = text
    }
}

function clearFormSuccessMessage() {
    const successContainer = document.querySelector(".form-success")
    if(successContainer) {
        successContainer.innerHTML = ""
    }
}

function createDateTime(date) {
    const timestamp = new Date(date)
    const year = timestamp.getFullYear()
    const month = String(timestamp.getMonth() + 1).padStart(2, "0")
    const day = String(timestamp.getDate()).padStart(2, "0")
    const hours = String(timestamp.getHours()).padStart(2, "0")
    const minutes = String(timestamp.getMinutes()).padStart(2, "0")
    const seconds = String(timestamp.getSeconds()).padStart(2, "0")

    // Combine into desired format
    const shortDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
    return shortDateTime
}