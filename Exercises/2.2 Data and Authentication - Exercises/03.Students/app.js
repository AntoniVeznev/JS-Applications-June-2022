let firstName = document.querySelector("input[type=text][name=firstName]")

let lastName = document.querySelector("input[type=text][name=lastName]")

let facultyNumber = document.querySelector("input[type=text][name=facultyNumber]")

let grade = document.querySelector("input[type=text][name=grade]")

let tBody = document.querySelector("tbody");

document.querySelector("button[id=submit]").addEventListener("click", clickIt);

let baseUrl = `http://localhost:3030/jsonstore/collections/students`

function clickIt(event) {
    event.preventDefault()
    if (firstName.value.length !== 0 && lastName.value.length !== 0 &&
        facultyNumber.value.length !== 0 && grade.value.length !== 0) {
        fetch(baseUrl)
            .then(checkForErrors)

            .then(GET)

            .then(POST)

    }
}

function checkForErrors(response) {
    if (response.status !== 200) {
        throw new Error(`${response.status}: ${response.message}`);
    }
    return response.json()
}

function POST(response) {
    fetch(baseUrl, {
        method: "POST",
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            firstName: firstName.value,
            lastName: lastName.value,
            facultyNumber: facultyNumber.value,
            grade: grade.value
        })
    }).then(r => r.json())

}

function GET(promises) {

    for (const key in promises) {
        let firstName = promises[key].firstName;
        let lastName = promises[key].lastName;
        let facultyNumber = promises[key].facultyNumber;
        let grade = promises[key].grade;

        let tr = document.createElement("tr")

        let th1 = document.createElement("th")
        th1.textContent = firstName;

        let th2 = document.createElement("th")
        th2.textContent = lastName

        let th3 = document.createElement("th")
        th3.textContent = facultyNumber

        let th4 = document.createElement("th")
        th4.textContent = grade

        tr.appendChild(th1)
        tr.appendChild(th2)
        tr.appendChild(th3)
        tr.appendChild(th4)

        tBody.appendChild(tr)
    }
}
