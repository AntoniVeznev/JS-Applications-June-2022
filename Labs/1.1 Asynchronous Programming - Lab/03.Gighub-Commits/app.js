function loadCommits() {

    let username = document.getElementById('username').value;
    let repository = document.getElementById('repo').value;
    let ulTarget = document.getElementById('commits');
    let webAddress = `https://api.github.com/repos/${username}/${repository}/commits`

    fetch(webAddress)
        .then(ifInfoIsInvalid)
        .then(ifInfoIsValid)
        .catch(error)

    function ifInfoIsInvalid(element) {
        if (element.ok === false) {
            throw new Error(`${element.status} (Not Found)`);
        }
        return element.json();
    }

    function ifInfoIsValid(response) {
        ulTarget.innerHTML = '';
        for (const element of response) {
            let li = document.createElement('li');
            li.textContent = `${element.commit.author.name}: ${element.commit.message}`
            ulTarget.appendChild(li)
        }
    }

    function error(error) {
        ulTarget.innerHTML = '';
        let li = document.createElement('li');
        li.textContent = `Error: ${error.message}`;
        ulTarget.appendChild(li);
    }
}