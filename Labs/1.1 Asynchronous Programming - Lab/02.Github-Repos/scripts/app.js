function loadRepos() {


    let username = document.getElementById(`username`).value;
    let placeWhereWePutInfo = document.getElementById(`repos`);

    fetch(`https://api.github.com/users/${username}/repos`)
        .then(checkIfResponseIsValid)
        .then(createValidData)
        .catch(catchError);

    function checkIfResponseIsValid(response) {
        if (response.ok === false) {
            throw new Error(`${response.status} ${response.statusText}`);
        } else {
            return response.json();
        }
    }

    function createValidData(data) {
        placeWhereWePutInfo.innerHTML = '';
        for (const element of data) {
            let li = document.createElement('li');
            let a = document.createElement('a');
            a.href = `${element.html_url}`;
            a.textContent = element.full_name;
            li.appendChild(a);
            placeWhereWePutInfo.appendChild(li);
        }
    }

    function catchError(error) {
        placeWhereWePutInfo.innerHTML = '';
        placeWhereWePutInfo.innerHTML = `${error.message}`

    }

}