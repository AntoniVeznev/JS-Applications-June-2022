function solution() {

    let section = document.getElementById('main');

    let url = "http://localhost:3030/jsonstore/advanced/articles/list"

    section.innerHTML = ''

    fetch(url)
        .then(e => e.json())
        .then(letsDoIt)

    function letsDoIt(promises) {

        let all = Object.values(promises)

        for (const allKey of all) {

            let id = allKey._id
            let newUrl = `http://localhost:3030/jsonstore/advanced/articles/details/${id}`

            fetch(newUrl)
                .then(e => e.json())
                .then(createBody)
        }
    }

    function createBody(promises) {


        let id = promises._id
        let title = promises.title
        let content = promises.content

        let div1 = document.createElement('div')
        div1.className = 'accordion'

        let div2 = document.createElement('div')
        div2.className = 'head'

        let span = document.createElement('span')
        span.textContent = title

        let button = document.createElement('button')
        button.className = 'button'
        button.id = id;
        button.textContent = 'More';

        let div3 = document.createElement("div")
        div3.className = 'extra'

        let p = document.createElement("p")
        p.textContent = content

        div2.appendChild(span)
        div2.appendChild(button)

        div3.appendChild(p)

        div1.appendChild(div2)
        div1.appendChild(div3)

        section.appendChild(div1);

        button.addEventListener('click', showOrHide);
    }

    function showOrHide(event) {

        let findTheFuckingTarget = event.target.parentElement.parentElement.lastChild

        if (event.target.textContent === 'More') {
            event.target.textContent = 'Less'
            findTheFuckingTarget.style.display = 'inline'
        } else {
            event.target.textContent = 'More'
            findTheFuckingTarget.style.display = 'none'
        }
    }
}

solution()