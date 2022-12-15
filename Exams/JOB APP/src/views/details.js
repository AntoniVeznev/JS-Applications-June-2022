import {html} from '../lib.js';
import {getUserData} from "../util.js";
import {getOfferById} from "../api/offers.js";
import {deleteOffer} from "../api/offers.js";


const detailsTemplate = (offer, isOwner, onEdit, onDelete, userData) => html`
    <section id="details">
        <div id="details-wrapper">
            <img id="details-img" src=${offer.imageUrl} alt="example1"/>
            <p id="details-title">${offer.title}</p>
            <p id="details-category">
                Category: <span id="categories">${offer.category}</span>
            </p>
            <p id="details-salary">
                Salary: <span id="salary-number">${offer.salary}</span>
            </p>
            <div id="info-wrapper">
                <div id="details-description">
                    <h4>Description</h4>
                    <span
                    >${offer.description}</span
                    >
                </div>
                <div id="details-requirements">
                    <h4>Requirements</h4>
                    <span
                    >${offer.requirements}</span
                    >
                </div>
            </div>
            <p>Applications: <strong id="applications">1</strong></p>

            ${isOwner ? html`
                        <div id="action-buttons">
                            <a @click=${onEdit} href="/edit/${offer._id}" id="edit-btn">Edit</a>
                            <a @click=${onDelete} href="/delete" id="delete-btn">Delete</a>`
                    : ''}

            ${userData ? html`<a href="" id="apply-btn">Apply</a>`
                    : ''}
        </div>
        </div>
    </section>
`;

export async function detailsView(ctx) {

    const offer = await getOfferById(ctx.params.id);

    const userData = getUserData();

    const isOwner = userData?.id === offer._ownerId;

    ctx.render(detailsTemplate(offer, isOwner, onEdit, onDelete, userData));

    async function onEdit(event) {
        event.preventDefault();
        ctx.page.redirect('/edit/' + ctx.params.id);

    }

    async function onDelete(event) {
        event.preventDefault()
        const choice = confirm('Are you sure you wont to delete this offer?');
        if (choice) {
            await deleteOffer(ctx.params.id);
            ctx.page.redirect('/dashboard');
        }
    }
}