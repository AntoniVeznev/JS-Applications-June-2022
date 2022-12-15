function lockedProfile() {

    let mainWhereWeAppendProfile = document.getElementById('main');
    mainWhereWeAppendProfile.innerHTML = '';

    let url = 'http://localhost:3030/jsonstore/advanced/profiles';
    fetch(url)
        .then(e => e.json())
        .then(request)

    function request(promises) {
        for (const promise in promises) {
            let profileUrl = `http://localhost:3030/jsonstore/advanced/profiles/${promise}`;
            fetch(profileUrl)
                .then(e => e.json())
                .then(request2)
        }
    }

    function request2(promises) {
        let getValues = Object.values(promises)
        let username = getValues[1]
        let email = getValues[2]
        let age = getValues[3]
        let div = document.createElement('div');
        div.className = 'profile'
        div.innerHTML = `<img src="iconProfile2.png" class="userIcon" />
                         <label>Lock</label>
                         <input type="radio" name="user1Locked" value="lock" checked>
                         <label>Unlock</label>
                         <input type="radio" name="user1Locked" value="unlock"><br>
                         <hr>
                         <label>Username</label>
                         <input type="text" name="user1Username" value=${username} disabled readonly />
                         <div class="user1Username">
                         <hr>
                         <label>Email:</label>
                         <input type="email" name="user1Email" value=${email} disabled readonly />
                         <label>Age:</label>
                         <input type="text" name="user1Age" value=${age} disabled readonly />
                         </div>`

        let button = document.createElement('button')
        button.textContent = 'Show more'

        div.appendChild(button)

        mainWhereWeAppendProfile.appendChild(div)

        button.addEventListener('click', neshto)
    }

    function neshto(event) {
        let currentItem = event.target.parentElement
        let checkIT = currentItem.querySelectorAll('input[type=radio]')
        let neededItem = checkIT[1]
        let haha = event.target.parentElement.children[9]

        if (neededItem.checked === true) {
            if (event.textContent === 'Show more') {
                haha.style.display = 'block'
                event.textContent = 'Hide it'
            } else if (event.textContent === 'Hide it') {
                haha.style.display = 'none'
                event.textContent = 'Show more'
            }
        }
    }
}