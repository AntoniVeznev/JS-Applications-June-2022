import {html} from '../lib.js';
import {getUserData} from "../util.js";
import {getMyBook} from "../api/books.js";


const myListingsTemplate = (allBooksForThatOwner) => html`
    <section id="my-books-page" class="my-books">
        <h1>My Books</h1>
        <ul class="my-books-list">
            ${allBooksForThatOwner.length === 0
                    ? html`<p class="no-books">No books in database!</p>`
                    : allBooksForThatOwner.map(bookCard)}
        </ul>
    </section>
`;

const bookCard = (book) => html`
    <li class="otherBooks">
        <h3>${book.title}</h3>
        <p>Type: ${book.type}</p>
        <p class="img"><img src=${book.imageUrl}></p>
        <a class="button" href="/details/${book._id}">Details</a>
    </li>
`

export async function myListingsView(ctx) {
    const userData = getUserData();
    const owner = userData.id;
    const books = await getMyBook(owner);
    let allBooksForThatOwner = [];
    books.forEach(book => {
        if (book._ownerId === owner) {
            allBooksForThatOwner.push(book);
        }
    })
    ctx.render(myListingsTemplate(allBooksForThatOwner));
}