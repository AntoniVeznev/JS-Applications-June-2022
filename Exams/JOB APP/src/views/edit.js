import {html} from '../lib.js';
import {getOfferById} from "../api/offers.js";
import {updateOffer} from "../api/offers.js";


const editTemplate = (offer, onSubmit) => html`
    <section id="edit">
        <div class="form">
            <h2>Edit Offer</h2>
            <form @submit=${onSubmit} class="edit-form">

                <input
                        value="${offer.title}"
                        type="text"
                        name="title"
                        id="job-title"
                        placeholder="Title"
                />

                <input
                        value="${offer.imageUrl}"
                        type="text"
                        name="imageUrl"
                        id="job-logo"
                        placeholder="Company logo url"
                />

                <input
                        value="${offer.category}"
                        type="text"
                        name="category"
                        id="job-category"
                        placeholder="Category"
                />

                <textarea
                        .value="${offer.description}"
                        id="job-description"
                        name="description"
                        placeholder="Description"
                        rows="4"
                        cols="50"
                ></textarea>

                <textarea
                        .value="${offer.requirements}"
                        id="job-requirements"
                        name="requirements"
                        placeholder="Requirements"
                        rows="4"
                        cols="50"
                ></textarea>

                <input
                        value="${offer.salary}"
                        type="text"
                        name="salary"
                        id="job-salary"
                        placeholder="Salary"
                />

                <button type="submit">post</button>

            </form>
        </div>
    </section>
`;


export async function editView(ctx) {


    const offer = await getOfferById(ctx.params.id);

    ctx.render(editTemplate(offer, onSubmit));


    async function onSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.target);

        const offer = {
            title: formData.get('title'),
            imageUrl: formData.get('imageUrl'),
            category: formData.get('category'),
            description: formData.get('description'),
            requirements: formData.get('requirements'),
            salary: formData.get('salary'),
        };
        if (offer.title === '' || offer.imageUrl === '' || offer.category === '' ||
            offer.description === '' || offer.requirements === '' || offer.salary === '') {
            return alert('All fields are required!');
        }

        await updateOffer(ctx.params.id, offer);

        ctx.page.redirect('/details/' + ctx.params.id);

    }


}



