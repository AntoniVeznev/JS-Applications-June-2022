import {html} from '../lib.js';
import {getUserData} from "../util.js";
import {myCarListings} from "../api/cars.js";


const myListingsTemplate = (allCarsForThatOwner) => html`
    <section id="my-listings">
        ${allCarsForThatOwner.length !== 0
                ? html` <h1>My car listings</h1>`
                : ''}
        <div class="listings">
            ${allCarsForThatOwner.length === 0
                    ? html`<p class="no-cars"> You haven't listed any cars yet.</p>`
                    : allCarsForThatOwner.map(carCard)}
        </div>
    </section>
`;
const carCard = (car) => html`

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

export async function myListingsView(ctx) {
    const userData = getUserData();
    const owner = userData.id;
    const cars = await myCarListings(owner)
    let allCarsForThatOwner = []
    cars.forEach(car => {
        if (car._ownerId === owner) {
            allCarsForThatOwner.push(car);
        }
    })
    ctx.render(myListingsTemplate(allCarsForThatOwner));
}
