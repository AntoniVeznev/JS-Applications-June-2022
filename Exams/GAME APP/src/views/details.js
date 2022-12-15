import {html} from '../lib.js';
import {getUserData} from "../util.js";
import {getGameById} from "../api/games.js";
import {deleteGame} from "../api/games.js";


const detailsTemplate = (game, isOwner, onEdit, onDelete) => html`
    <section id="game-details">
        <h1>Game Details</h1>
        <div class="info-section">
            <div class="game-header">
                <img class="game-img" src=${game.imageUrl}/>
                <h1>${game.title}</h1>
                <span class="levels">MaxLevel: ${game.maxLevel}</span>
                <p class="type">${game.category}</p>
            </div>
            <p class="text">${game.summary}</p>
            ${isOwner ? html`
                        <div class="buttons">
                            <a @click=${onEdit} href="/edit" class="button">Edit</a>
                            <a @click=${onDelete} href="/delete" class="button">Delete</a>
                        </div>`
                    : ''}
        </div>
    </section>
`;

export async function detailsView(ctx) {

    const game = await getGameById(ctx.params.id);
    const userData = getUserData();
    const isOwner = userData?.id === game._ownerId;
    ctx.render(detailsTemplate(game, isOwner, onEdit, onDelete));

    async function onEdit(event) {
        event.preventDefault();
        ctx.page.redirect('/edit/' + ctx.params.id);

    }

    async function onDelete(event) {
        event.preventDefault()
        const choice = confirm('Are you sure you wont to delete this meme?');
        if (choice) {
            await deleteGame(ctx.params.id);
            ctx.page.redirect('/');
        }
    }
}