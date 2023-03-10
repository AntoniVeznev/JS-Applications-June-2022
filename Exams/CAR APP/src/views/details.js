import {html} from '../lib.js';
import {getUserData} from "../util.js";
import {deleteCar} from "../api/cars.js";
import {getCarById} from "../api/cars.js";

const detailsTemplate = (car, isOwner, onEdit, onDelete) => html`
    <section id="listing-details">
        <h1>Details</h1>
        <div class="details-info">
            <img src=${car.imageUrl}>
            <hr>
            <ul class="listing-props">
                <li><span>Brand:</span>${car.brand}</li>
                <li><span>Model:</span>${car.model}</li>
                <li><span>Year:</span>${car.year}</li>
                <li><span>Price:</span>${car.price}$</li>
            </ul>

            <p class="description-para">${car.description}</p>

            ${isOwner ? html`
                        <div class="listings-buttons">
                            <a @click=${onEdit} href="#" class="button-list">Edit</a>
                            <a @click=${onDelete} href="#" class="button-list">Delete</a>
                        </div>`
                    : ''}
        </div>
    </section>
`;

export async function detailsView(ctx) {

    const car = await getCarById(ctx.params.id);

    const userData = getUserData();

    const isOwner = userData?.id === car._ownerId;

    ctx.render(detailsTemplate(car, isOwner, onEdit, onDelete));

    async function onEdit(event) {
        event.preventDefault();
        ctx.page.redirect('/edit/' + ctx.params.id);

    }

    async function onDelete(event) {
        event.preventDefault()
        const choice = confirm('Are you sure you wont to delete this meme?');
        if (choice) {
            await deleteCar(ctx.params.id);
            ctx.page.redirect('/allListings');
        }
    }
}