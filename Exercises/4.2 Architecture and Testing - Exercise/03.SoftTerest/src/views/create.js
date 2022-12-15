import {createIdea} from "../api/data.js";


let section = document.getElementById('createPage') // targetirame home page
section.remove(); //razka4ame go ot obekta

let form = section.querySelector('form');

let ctx = null;

export function showCreate(context) {
    ctx = context
    context.showSection(section)

}

form.addEventListener('submit', onSubmit)

async function onSubmit(event) {
    event.preventDefault();

    let formData = new FormData(form);

    let title = formData.get('title').trim();
    let description = formData.get('description').trim();
    let img = formData.get('imageURL').trim();

    let idea = {
        title, description, img,
    }

    createIdea(idea)
    form.reset()
    ctx.goTo('catalog')

}
