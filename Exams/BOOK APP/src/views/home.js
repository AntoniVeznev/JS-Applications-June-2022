import {html} from '../lib.js';
import {getAllBooks} from "../api/books.js";

const homeTemplate = (books) => html`
    <section id="dashboard-page" class="dashboard">
        <h1>Dashboard</h1>
        <ul class="other-books-list">
            ${books.length === 0
                    ? html`<p class="no-books">No books in database!</p>`
                    : books.map(carCard)}
        </ul>
    </section>
`;
const carCard = (book) => html`
    <li class="otherBooks">
        <h3>${book.title}</h3>
        <p>Type: ${book.type}</p>
        <p class="img"><img src=${book.imageUrl}></p>
        <a class="button" href="/details/${book._id}">Details</a>
    </li>
`;

export async function homeView(ctx) {
    const books = await getAllBooks();
    ctx.render(homeTemplate(books));
}