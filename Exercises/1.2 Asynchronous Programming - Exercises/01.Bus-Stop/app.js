function getInfo() {

    let inputField = document.getElementById('stopId').value;
    let getRequest = `http://localhost:3030/jsonstore/bus/businfo/${inputField}`;
    let busStopName = document.getElementById('stopName');
    let whereWePutValidBuses = document.getElementById('buses');

    fetch(getRequest)
        .then(validation)
        .then(fillDiv)
        .catch(catchError);

    function validation(response) {

        if (response.ok === false) {
            busStopName.textContent = 'Error';
        } else {
            return response.json();
        }
    }

    function fillDiv(element) {
        busStopName.textContent = element.name;
        for (const busesKey in element.buses) {
            let li = document.createElement('li');
            li.textContent = `Bus ${busesKey} arrives in ${element.buses[busesKey]} minutes`;
            whereWePutValidBuses.appendChild(li);
        }
    }

    function catchError(error) {

        busStopName.textContent = 'Error';
        whereWePutValidBuses.innerHTML = '';
    }
}