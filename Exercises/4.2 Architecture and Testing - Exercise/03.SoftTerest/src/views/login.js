import {login} from "../api/data.js";

let section = document.getElementById('loginPage') // targetirame home page
section.remove(); //razka4ame go ot obekta
let ctx = null

export function showLogin(context) {
    ctx = context
    context.showSection(section)
}

const form = section.querySelector('form')
form.addEventListener('submit', onSubmit)

async function onSubmit(event) {
    event.preventDefault();
    let formData = new FormData(form);
    let email = formData.get('email').trim();
    let password = formData.get('password').trim();
    await login(email, password);
    form.reset();
    ctx.goTo('home');
    ctx.updateNav();
}