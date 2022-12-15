import {page, render} from './lib.js';
import {getUserData} from "./util.js";
import {homeView} from "./views/home.js";
import {loginView} from "./views/login.js";
import {logout} from "./api/users.js";
import {registerView} from "./views/register.js";
import {catalogView} from "./views/catalog.js";
import {createView} from "./views/create.js";
import {editView} from "./views/edit.js";
import {detailsView} from "./views/details.js";

const main = document.querySelector('main[id=main-content]');
document.getElementById('logoutBtn').addEventListener("click", onLogout);

page(decorateContext);
page('/', homeView);
page('/login', loginView);
page('/register', registerView);
page('/catalog', catalogView);
page('/create', createView);
page('/details/:id', detailsView);
page('/edit/:id', editView);


updateNav();
page.start();


function decorateContext(ctx, next) {
    ctx.render = renderMain;
    ctx.updateNav = updateNav;
    next();
}

function renderMain(templateResult) {
    render(templateResult, main);
}

function updateNav() {
    const userData = getUserData();
    if (userData) {
        document.querySelector('.user').style.display = 'block';
        document.querySelector('.guest').style.display = 'none';
    } else {
        document.querySelector('.user').style.display = 'none';
        document.querySelector('.guest').style.display = 'block';
    }
}

function onLogout(event) {
    event.preventDefault();
    logout();
    updateNav();
    page.redirect('/');
}