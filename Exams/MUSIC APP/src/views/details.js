import {html} from '../lib.js';
import {getAlbumById} from "../api/albums.js";
import {getUserData} from "../util.js";
import {deleteAlbum} from "../api/albums.js";

const detailsTemplate = (album, userData, isOwner, onDelete) => html`
    <section id="detailsPage">
        <div class="wrapper">
            <div class="albumCover">
                <img src=${album.imgUrl}>
            </div>
            <div class="albumInfo">
                <div class="albumText">

                    <h1>Name: ${album.name}</h1>
                    <h3>Artist: ${album.artist}</h3>
                    <h4>Genre: ${album.genre}</h4>
                    <h4>Price: $${album.price}</h4>
                    <h4>Date: ${album.releaseDate}</h4>
                    <p>Description: ${album.description}</p>
                </div>

                ${isOwner ? html`
                            <div class="actionBtn">
                                <a href="/edit/${album._id}" class="edit">Edit</a>
                                <a @click=${onDelete} href="#" class="remove">Delete</a>
                            </div>`
                        : ''}
            </div>
        </div>
    </section>
`;

export async function detailsView(ctx) {

    const album = await getAlbumById(ctx.params.id);

    const userData = getUserData();

    if (userData) {
        const isOwner = userData?.id === album._ownerId;
        ctx.render(detailsTemplate(album, userData, isOwner, onDelete));
    }

    async function onDelete(event) {
        event.preventDefault();
        const choice = confirm('Are you sure you wont to delete this album?');
        if (choice) {
            await deleteAlbum(ctx.params.id);
            ctx.page.redirect('/catalog');
        }
    }
}
