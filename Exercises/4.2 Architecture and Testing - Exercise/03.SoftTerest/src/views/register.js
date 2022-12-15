import {register} from "../api/data.js";

let section = document.getElementById('registerPage') // targetirame home page
section.remove(); //razka4ame go ot obekta
let ctx = null;

export function showRegister(context) {
    ctx = context
    context.showSection(section)
}

let form = section.querySelector('form')
form.addEventListener('submit', onSubmit);

async function onSubmit(event) {
    event.preventDefault();
    let formData = new FormData(form);
    let email = formData.get('email');
    let password = formData.get('password').trim();
    let repeatPass = formData.get('repeatPassword').trim();

    await register(email, password)
    form.reset();
    ctx.goTo('home');
    ctx.updateNav();


}