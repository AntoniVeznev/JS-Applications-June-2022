import {html} from '../lib.js';

import {allCars} from "../api/cars.js";

const byYearTemplate = (cars, onClick) => html`
    <section id="search-cars">
        <h1>Filter by year</h1>

        <div class="container">
            <input id="search-input" type="text" name="search" placeholder="Enter desired production year">
            <button @click=${onClick} class="button-list">Search</button>
        </div>

        <h2>Results:</h2>
        <div class="listings">

            ${cars.length === 0
                    ? html`<p class="no-cars"> No results.</p>`
                    : cars.map(searchCard)}

        </div>
    </section>
`

const searchCard = (car) => html`
    <div class="listing">
        <div class="preview">
            <img src=${car.imageUrl}>
        </div>
        <h2>${car.brand} ${car.model}</h2>
        <div class="info">
            <div class="data-info">
                <h3>Year: ${car.year}</h3>
                <h3>Price: ${car.price} $</h3>
            </div>
            <div class="data-buttons">
                <a href="/details/${car._id}" class="button-carDetails">Details</a>
            </div>
        </div>
    </div>
`


export async function byYearView(ctx) {
    const cars = await allCars();
    let allCarsThatWeSearchByYear = [];
    ctx.render(byYearTemplate(allCarsThatWeSearchByYear, onClick));

    function onClick(event) {
        event.preventDefault();

        let parent = event.target.parentElement;
        let yearWeSearch = parent.querySelector("input[id=search-input]");
        cars.forEach(car => {
            if (Number(car.year) === Number(yearWeSearch.value)) {
                allCarsThatWeSearchByYear.push(car);
            }
        })
        yearWeSearch.value = ''

        ctx.render(byYearTemplate(allCarsThatWeSearchByYear, onClick));
        allCarsThatWeSearchByYear = [];
    }
}