import {html} from '../lib.js';
import {getCarById, updateCar} from "../api/cars.js";

const editTemplate = (car, onSubmit) => html`
    <section id="edit-listing">
        <div class="container">

            <form @submit=${onSubmit} id="edit-form">
                <h1>Edit Car Listing</h1>
                <p>Please fill in this form to edit an listing.</p>
                <hr>

                <p>Car Brand</p>
                <input type="text" placeholder="Enter Car Brand" name="brand" value="${car.brand}">

                <p>Car Model</p>
                <input type="text" placeholder="Enter Car Model" name="model" value="${car.model}">

                <p>Description</p>
                <input type="text" placeholder="Enter Description" name="description" value="${car.description}">

                <p>Car Year</p>
                <input type="number" placeholder="Enter Car Year" name="year" value="${car.year}">

                <p>Car Image</p>
                <input type="text" placeholder="Enter Car Image" name="imageUrl" value="${car.imageUrl}">

                <p>Car Price</p>
                <input type="number" placeholder="Enter Car Price" name="price" value="${car.price}">

                <hr>
                <input type="submit" class="registerbtn" value="Edit Listing">
            </form>
        </div>
    </section>
`;


export async function editView(ctx) {


    const car = await getCarById(ctx.params.id);
    ctx.render(editTemplate(car, onSubmit));


    async function onSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        let makeYearToNumber = Number(formData.get('year'));
        let makePriceToNumber = Number(formData.get('price'));
        const car = {
            brand: formData.get('brand'),
            model: formData.get('model'),
            description: formData.get('description'),
            year: makeYearToNumber,
            imageUrl: formData.get('imageUrl'),
            price: makePriceToNumber,
        };
        if (car.brand === '' || car.model === '' ||
            car.description === '' || car.imageUrl === '') {
            return alert('All fields are required!');
        }
        if (makeYearToNumber < 0 || makePriceToNumber < 0) {
            return alert('Year or price are negative numbers!');
        }
        await updateCar(ctx.params.id, car);
        event.target.reset();
        ctx.page.redirect('/details/' + ctx.params.id);

    }
}