import {page, render} from './lib.js';
import {getUserData} from "./util.js";
import {homeView} from "./views/home.js";
import {loginView} from "./views/login.js";
import {logout} from "./api/users.js";
import {registerView} from "./views/register.js";
import {catalogView} from "./views/catalog.js";
import {createView} from "./views/create.js";
import {detailsView} from "./views/details.js";
import {editView} from "./views/edit.js";
import {myListingsView} from "./views/myListings.js";
import {byYearView} from "./views/byYear.js";


const main = document.querySelector('main[id=site-content]');
document.getElementById('logoutBtn').addEventListener("click", onLogout);

page(decorateContext);
page('/', homeView);
page('/login', loginView);
page('/register', registerView);
page('/allListings', catalogView);
page('/createListing', createView);
page('/details/:id', detailsView);
page('/edit/:id', editView);
page('/myListings', myListingsView);
page('/byYear', byYearView);

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
        document.querySelector('#profile').style.display = 'block';
        document.querySelector('#guest').style.display = 'none';
        document.querySelector('#profile a').textContent = `Welcome, ${userData.username}`
    } else {
        document.querySelector('#profile').style.display = 'none';
        document.querySelector('#guest').style.display = 'block';
    }
}

function onLogout(event) {
    event.preventDefault();
    logout();
    updateNav();
    page.redirect('/');
}