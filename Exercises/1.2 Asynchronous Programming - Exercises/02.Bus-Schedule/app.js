function solve() {

    let url = 'http://localhost:3030/jsonstore/bus/schedule/depot';
    let targetSpan = document.querySelector('span[class=info]');
    let departBtn = document.querySelector('input[id=depart]');
    let arriveBtn = document.querySelector('input[id=arrive]');
    let previousName = '';

    function depart() {
        arriveBtn.disabled = false;
        departBtn.disabled = true;
        fetch(url)
            .then(e => e.json())
            .then(setAllCorrect)

    }

    function arrive() {
        arriveBtn.disabled = true;
        departBtn.disabled = false;
        fetch(url)
            .then(e => e.json())
            .then(setAllCorrect)

    }

    function setAllCorrect(promise) {
        let name = promise.name;
        let next = promise.next;

        if (departBtn.disabled === false) {
            targetSpan.textContent = `Arriving at ${previousName}`;
            url = `http://localhost:3030/jsonstore/bus/schedule/${next}`
            previousName = ''
        } else if (arriveBtn.disabled === false) {
            previousName = name;
            targetSpan.textContent = `Next stop ${name}`;
            url = `http://localhost:3030/jsonstore/bus/schedule/${next}`
        }
    }

    return {
        depart,
        arrive
    };
}

let result = solve();