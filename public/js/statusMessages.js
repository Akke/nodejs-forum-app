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