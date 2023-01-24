import "../style.scss";
import "./landing-page.scss";

const box = document.querySelector("#login-box")!;
const flyingThing = box.querySelector<HTMLDivElement>(".flying-thingy")!;
const signInButton = box.querySelector<HTMLButtonElement>("#sign-in-button")!;
const signUpButton = box.querySelector<HTMLButtonElement>("#sign-up-button")!;

const formSignIn = box.querySelector<HTMLFormElement>("#form-sign-in")!;
const formSignUp = box.querySelector<HTMLFormElement>("#form-sign-up")!;

function moveFlyingThingTo(x: number) {
    flyingThing.style.left = `${x}px`;
}

let isSignIn = true;

signInButton.addEventListener("click", () => {
    isSignIn = true;
    moveFlyingThingTo(signInButtonX());
    updateForm();
});

signUpButton.addEventListener("click", () => {
    isSignIn = false;
    moveFlyingThingTo(signUpButtonX());
    updateForm();
});

function updateForm() {
    formSignIn.style.display = isSignIn ? 'block' : 'none';
    formSignUp.style.display = !isSignIn ? 'block' : 'none';
}

function signInButtonX() {
    return signInButton.offsetLeft + signInButton.offsetWidth / 2 - flyingThing.offsetWidth / 2;
}

function signUpButtonX() {
    return signUpButton.offsetLeft + signUpButton.offsetWidth / 2 - flyingThing.offsetWidth / 2;
}

document.addEventListener('readystatechange', () => {
    updateForm();
    moveFlyingThingTo(signInButtonX());
});

window.addEventListener("resize", () => {
    flyingThing.style.transition = ".0s";

    if (isSignIn) {
        moveFlyingThingTo(signInButtonX());
    } else {
        moveFlyingThingTo(signUpButtonX());
    }

    setTimeout(() => {
        flyingThing.style.transition = ".2s";
    }, 100);
});

setTimeout(() => {
    flyingThing.style.transition = ".2s";
}, 100);

export default 10;

const inputFields: {[id: string]: InputField} = {
    'id': {
        regex: /^([A-Z])([a-zA-Z0-9$&+,:;=?@#|'<>.-^*()%!]{3,10})([0-9$&+,:;=?@#|'<>.-^*()%!])$/,
        regexMessage: 'ID should start with a capital letter and end with a number or special character',
        required: true
    },
    'password': {
        regex: /^([a-zA-Z0-9$&+,:;=?@#|'<>.-^*()%!]{12,})$/,
        regexMessage: 'Password is too short',
        required: true
    },
    'name': {
        regex: /^([a-zA-Z].*?)$/,
        regexMessage: 'Name may only contain the alphabet',
        required: true
    },
    'country': {
        regex: /^([a-zA-Z].*?)$/,
        regexMessage: 'Country may only contain the alphabet',
        required: true
    },
    'zip': {
        regex: /^([0-9]{4})([A-Z]{2})$/,
        regexMessage: 'Zipcode does not follow format: 1234AB',
        required: true
    },
    'email': {
        regex: /^[a-zA-Z0-9.!#$%&’*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
        regexMessage: 'Invalid email address',
        required: true
    },
    'sex': {
        regex: /^[MFO]$/,
        regexMessage: 'Choose an option',
        required: true
    }
}

document.querySelectorAll('form').forEach(formEl => {
    const form = formEl as HTMLFormElement;
    form.addEventListener('submit', e => {
        e.preventDefault();

        let inputs: HTMLElement[] = new Array<HTMLElement>();
        form.querySelectorAll('input').forEach(input => inputs.push(input));
        form.querySelectorAll('select').forEach(input => inputs.push(input));
        form.querySelectorAll('textarea').forEach(input => inputs.push(input));

        inputs.forEach(input => {
            const inputEl = input as unknown as (HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement);
            let inputField = inputFields[inputEl.name];

            let note = getNote(inputEl, inputEl.name);

            if(!inputField) {
                success(note);
                return;
            }

            if(inputField.required && !inputEl.value) {
                error(note, 'This is a required field');
                return;
            }

            if(!inputField.regex || inputField.regex.test(inputEl.value)) {
                success(note);
                return;
            }

            error(note, inputField.regexMessage ? inputField.regexMessage : 'Please provide a valid '+inputEl.name);
        });
    });
});

function getNote(input: HTMLElement, id: string): HTMLSpanElement {
    let note = input.parentElement!.querySelector('#note-'+id) as HTMLSpanElement;
    if(!note) {
        note = document.createElement('span');
        note.setAttribute('id', 'note-'+id);
        note.classList.add('input-note');
        input.parentNode!.insertBefore(note, input.nextSibling);
    }

    return note;
}

function success(note: HTMLSpanElement): void {
    note.style.color = '#669B45';
    note.innerHTML = 'Looks good!'
}

function error(note: HTMLSpanElement, message: string): void {
    note.style.color = '#B8695F';
    note.innerText = message;
}

interface InputField {
    regex: RegExp | null;
    
    regexMessage?: string;
    required: boolean;

}