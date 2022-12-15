function attachEvents() {
    let clientInput = document.getElementById(`location`);
    let button = document.querySelector('input[id=submit]');
    let url = `http://localhost:3030/jsonstore/forecaster/locations`;
    let divForecast = document.getElementById('forecast');

    let firstDivData = document.getElementById('current');
    let secondDivData = document.getElementById('upcoming');

    button.addEventListener('click', getRequest);

    function getRequest(event) {
        divForecast.style.display = 'block'
        fetch(url)
            .then(promise => promise.json())
            .then(getTwoMoreUrl);
    }

    function getTwoMoreUrl(promises) {
        let neededCode = '';
        for (const promise of promises) {
            if (promise.name === clientInput.value) {
                neededCode = promise.code;
            }
        }
        let conditionForTodayUrl = `http://localhost:3030/jsonstore/forecaster/today/${neededCode}`;

        fetch(conditionForTodayUrl)
            .then(promise => promise.json())
            .then(fillHTML1);

        let threeDayForecastUrl = `http://localhost:3030/jsonstore/forecaster/upcoming/${neededCode}`;

        fetch(threeDayForecastUrl)
            .then(promise => promise.json())
            .then(fillHTML2);
    }

    function fillHTML1(promises) {
        let name = promises.name;
        let lowestTemp = promises.forecast.low;
        let highestTemp = promises.forecast.high
        let condition = promises.forecast.condition

        let div = document.createElement('div');
        div.className = 'forecasts';

        let span1 = document.createElement('span')
        span1.className = 'condition symbol'

        if (condition === 'Sunny') {
            span1.innerHTML = '&#x2600'
        } else if (condition === 'Partly sunny') {
            span1.innerHTML = '&#x26C5'
        } else if (condition === 'Overcast') {
            span1.innerHTML = '&#x2601'
        } else if (condition === 'Rain') {
            span1.innerHTML = '&#x2614'
        }

        let span2 = document.createElement('span')
        span2.className = 'condition'

        let span3 = document.createElement('span')
        span3.className = 'forecast-data';
        span3.textContent = `${name}`

        let span4 = document.createElement('span')
        span4.className = 'forecast-data';
        span4.innerHTML = `${lowestTemp}&#176/${highestTemp}&#176`

        let span5 = document.createElement('span')
        span5.className = 'forecast-data';
        span5.textContent = `${condition}`

        span2.appendChild(span3)
        span2.appendChild(span4)
        span2.appendChild(span5)

        div.appendChild(span1)
        div.appendChild(span2)

        firstDivData.appendChild(div)
    }

    function fillHTML2(promises) {
        let forecastArray = promises.forecast
        let div = document.createElement('div');
        div.className = 'forecast-info';

        for (const object of forecastArray) {
            let low = object.low;
            let high = object.high;
            let cond = object.condition;

            let span = document.createElement('span');
            span.className = 'upcoming';

            let span1 = document.createElement('span')
            span1.className = 'symbol';
            if (cond === 'Sunny') {
                span1.innerHTML = '&#x2600'
            } else if (cond === 'Partly sunny') {
                span1.innerHTML = '&#x26C5'
            } else if (cond === 'Overcast') {
                span1.innerHTML = '&#x2601'
            } else if (cond === 'Rain') {
                span1.innerHTML = '&#x2614'
            }

            let span2 = document.createElement('span')
            span2.className = 'forecast-data';
            span2.innerHTML = `${low}&#176/${high}&#176`

            let span3 = document.createElement('span')
            span3.className = 'forecast-data';
            span3.textContent = cond;

            span.appendChild(span1);
            span.appendChild(span2);
            span.appendChild(span3);

            div.appendChild(span);
        }
        secondDivData.appendChild(div)
    }
}

attachEvents();