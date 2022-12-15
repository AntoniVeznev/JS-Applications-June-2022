let baseURL = `http://localhost:3030/jsonstore/collections/books`
let inputTitle = document.querySelector('input[type=text][name=title]');
let inputAuthor = document.querySelector('input[type=text][name=author]');
document.querySelector('button[id=loadBooks]').addEventListener("click", getAllBooks)
let form = document.querySelector('form')
let submitBTN = form.querySelector('button')
submitBTN.addEventListener("click", createBook)
let tBody = document.querySelector('tbody');

function getAllBooks(event) {
    fetch(baseURL)
        .then(promise => promise.json())
        .then(createAllHTML)
        .catch(error)
}

function createBook(event) {
    event.preventDefault();
    fetch(baseURL)
        .then(isEmpty)
        .then(makePost)
        .catch(error)

}

function updateBook(event) {
    let id = event.target.id

    let urlToUpdate = `http://localhost:3030/jsonstore/collections/books/${id}`
    let title = event.target.parentElement.parentElement.children[0].textContent
    let author = event.target.parentElement.parentElement.children[1].textContent
    inputTitle.value = title
    inputAuthor.value = author
    let h3 = form.querySelector('h3')
    h3.textContent = 'Edit FORM'
    submitBTN.textContent = 'Save'
    if (submitBTN.textContent === 'Save') {
        fetch(urlToUpdate, {
            method: "PUT",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                author: inputAuthor.value,
                title: inputTitle.value
            })
        }).then(getAllBooks)
    }
}


function deleteBook(event) {
    let id = event.target.id

    let delUrl = `http://localhost:3030/jsonstore/collections/books/${id}`
    fetch(delUrl, {
        method: "DELETE"
    }).then(getAllBooks)
}


function createAllHTML(response) {
    tBody.innerHTML = '';
    for (let responseKey in response) {
        let author = response[responseKey].author
        let title = response[responseKey].title

        let tr = document.createElement("tr")
        let td1 = document.createElement("td")
        td1.textContent = title
        let td2 = document.createElement("td")
        td2.textContent = author
        let td3 = document.createElement("td")
        let editBTN = document.createElement("button")
        editBTN.setAttribute('id', responseKey)
        editBTN.textContent = 'Edit'
        let deleteBTN = document.createElement("button")
        deleteBTN.setAttribute('id', responseKey)
        deleteBTN.textContent = 'Delete'

        td3.appendChild(editBTN);
        td3.appendChild(deleteBTN);

        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);

        editBTN.addEventListener("click", updateBook)
        deleteBTN.addEventListener("click", deleteBook)
        tBody.appendChild(tr);
    }
}

function makePost(promise) {
    fetch(baseURL, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            author: inputAuthor.value,
            title: inputTitle.value
        })
    }).then(promise => promise.json())
    inputTitle.value = ''
    inputAuthor.value = ''

}

function isEmpty(promise) {
    if (inputAuthor.value.length > 0 && inputTitle.value.length > 0) {
        return promise.json()
    }
    throw new Error()
}

function error(err) {
    return alert(err.message)
}
