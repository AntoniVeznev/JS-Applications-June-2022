import {page, render} from './lib.js';
import {getUserData} from "./util.js";
import {logout} from "./api/users.js";
import {loginView} from "./views/login.js";
import {registerView} from "./views/register.js";
import {homeView} from "./views/home.js";
import {detailsView} from "./views/details.js";
import {editView} from "./views/edit.js";
import {createView} from "./views/create.js";
import {myListingsView} from "./views/catalog.js";


const main = document.getElementById('site-content');
document.getElementById('logoutBtn').addEventListener("click", onLogout);

page(decorateContext);
page('/login', loginView);
page('/register', registerView);
page('/', homeView);
page('/details/:id', detailsView);
page('/edit/:id', editView);
page('/create', createView);
page('/catalog', myListingsView);


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
        document.querySelector('#user').style.display = 'block';
        document.querySelector('#guest').style.display = 'none';
        document.querySelector('#user span').textContent = `Welcome, ${userData.email}`
    } else {
        document.querySelector('#user').style.display = 'none';
        document.querySelector('#guest').style.display = 'block';
    }
}

function onLogout(event) {
    event.preventDefault();
    logout();
    updateNav();
    page.redirect('/');
}
