function attachEvents() {

    let inputName = document.querySelector('input[name=author]');
    let inputMessage = document.querySelector('input[name=content]');

    let textArea = document.querySelector('textarea[id=messages]');

    let submitBTN = document.querySelector('input[id=submit]');
    let refreshBTN = document.querySelector('input[id=refresh]');

    let baseURL = `http://localhost:3030/jsonstore/messenger`;

    submitBTN.addEventListener('click', submit);
    refreshBTN.addEventListener('click', refresh);


    function submit(event) {
        event.preventDefault();
        if (inputName.value.length === 0 || inputMessage.value.length === 0) {
            throw new Error(`Name or Message are Empty!!!`)
        }
        fetch(baseURL, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                author: inputName.value.trim(),
                content: inputMessage.value.trim()
            })
        })
            .then(response => response.json())
            .catch(error => error.message)

        inputName.value = '';
        inputMessage.value = '';
        refresh()
    }

    function refresh(event) {
        event.preventDefault();
        fetch(baseURL)
            .then(response => response.json())
            .then(letsDoIt)
    }

    function letsDoIt(elements) {
        let mainText = '';
        for (const key in elements) {
            let author = elements[key].author;
            let content = elements[key].content;
            mainText += `${author}: ${content}` + `\n`;
        }
        textArea.textContent = mainText;
    }
}

attachEvents();