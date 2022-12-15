import {html} from '../lib.js';
import {getUserData} from "../util.js";
import {deleteBook, getBookById} from "../api/books.js";


const detailsTemplate = (book, isOwner, userData, onEdit, onDelete) => html`
    <section id="details-page" class="details">
        <div class="book-information">
            <h3>${book.title}</h3>
            <p class="type">Type: Fiction</p>
            <p class="img"><img src=${book.imageUrl}></p>
            <div class="actions">

                ${isOwner ? html`
                            <a @click=${onEdit} class="button" href="#">Edit</a>
                            <a @click=${onDelete} class="button" href="#">Delete</a>`
                        : ''}

                ${userData && userData.id !== book._ownerId ? html`
                            <a class="button" href="/like">Like</a>`
                        : ''}

                <div class="likes">
                    <img class="hearts" src="/images/heart.png">
                    <span id="total-likes">Likes: 0</span>
                </div>

            </div>
        </div>
        <div class="book-description">
            <h3>Description:</h3>
            <p>${book.description}</p>
        </div>
    </section>
`;

export async function detailsView(ctx) {

    const book = await getBookById(ctx.params.id);
    const userData = getUserData();
    const isOwner = userData?.id === book._ownerId;

    ctx.render(detailsTemplate(book, isOwner, userData, onEdit, onDelete));


    async function onEdit(event) {
        event.preventDefault();
        ctx.page.redirect('/edit/' + ctx.params.id);

    }

    async function onDelete(event) {
        event.preventDefault()
        const choice = confirm('Are you sure you want to delete this book?');
        if (choice) {
            await deleteBook(ctx.params.id);
            ctx.page.redirect('/');
        }
    }
}