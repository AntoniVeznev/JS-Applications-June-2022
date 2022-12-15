function attachEvents() {

    let baseUrl = `http://localhost:3030/jsonstore/phonebook`;

    document.querySelector("button[id=btnLoad]").addEventListener("click", getAllContacts);
    document.querySelector("button[id=btnCreate]").addEventListener('click', addContact);
    let targetPhonebook = document.querySelector("ul[id=phonebook]");

    function getAllContacts(event) {
        event.preventDefault();
        fetch(baseUrl)
            .then(checkForErrors)
            .then(createContactElement)
    }

    function addContact(event) {

        let personSelector = document.querySelector("input[type=text][id=person]");
        let phoneSelector = document.querySelector("input[type=text][id=phone]");
        let person = personSelector.value;
        let phone = phoneSelector.value;
        fetch(baseUrl, {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                person: person,
                phone: phone
            })
        })
            .then(checkForErrors)
            .then(getAllContacts)


        personSelector.value = ''
        phoneSelector.value = ''
    }

    function checkForErrors(response) {
        if (response.status !== 200) {
            throw new Error(`${response.status}: ${response.message}`);
        }
        return response.json();
    }

    function createContactElement(promises) {
        targetPhonebook.innerHTML = ''
        for (const key in promises) {
            let currentInfo = promises[key];
            let person = currentInfo.person;
            let phone = currentInfo.phone;
            let id = currentInfo._id
            let li = document.createElement("li");
            li.textContent = `${person}: ${phone}`
            let deleteBtn = document.createElement("button");
            deleteBtn.setAttribute('id', id);
            deleteBtn.textContent = 'Delete'
            li.appendChild(deleteBtn)
            targetPhonebook.appendChild(li)
            deleteBtn.addEventListener("click", clickDelete);
        }
    }

    function clickDelete(event) {
        event.preventDefault();
        let id = event.target.id
        let deleteUrl = `http://localhost:3030/jsonstore/phonebook/${id}`
        fetch(deleteUrl, {
            method: "DELETE"
        })
            .then(getAllContacts)
            .then(response => response.json())
        event.target.parentElement.remove()
    }
}

attachEvents();