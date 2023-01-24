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
            
            let msg = test(fieldInfo, inputEl.value);
            msg ? error(note, msg) : success(note);
        });
    });
});

function isAlphabetic(character: string){
    character = character.toLowerCase();
    return character >= 'a'&& character <= 'z';
}

function test(field: InputField, value: string): string | null {
    if(field.required && !value)
        return 'This is a required field';

    if(field.startWithCapital){
        if(value.length == 0 || value.charAt(0) < 'A' || value.charAt(0) > 'Z')
            return "Must start with a capital letter";
    }

    if(field.minLength){
        if(value.length < field.minLength)
            return "Minimum length is " + field.minLength;
    }

    if(field.maxLength)
        if(value.length > field.maxLength)
            return "Maximum length is " + field.minLength;

    if(field.alphabeticOnly){
        for(let i = 0; i < value.length; i++){
            if(!isAlphabetic(value.charAt(i))){
                return "Only alphabetical characters are allowed."
            }
        }
    }

    if(field.isEmailAddress){
        if(value.indexOf('.') === -1 || value.indexOf('@') === -1
            || value.indexOf('@') > value.lastIndexOf('.')) {
            return 'Invalid email address';
        }
    }

    if(field.zipCode) {
        if(value.length != 6)
            return 'Zip should be of format 1234AB';

        for(let i = 0; i < 4; i++)
            if(value.charAt(i) < '0' || value.charAt(i) > '9')
                return 'Zip should be of format 1234AB';

        for(let i = 4; i < 6; i++)
            if(value.charAt(i) < 'A' || value.charAt(i) > 'Z')
                return 'Zip should be of format 1234AB';
    }

    if(field.endWithNumberOrSpecialCharacter){
        let lastChar = value.charAt(value.length-1);
        if(isAlphabetic(lastChar)){
            return "Must end with a special character or a number.";
        }
    }

    return null;
}

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
    minLength?: number;
    maxLength?: number;
    startWithCapital?: boolean;
    required?: boolean;
    isEmailAddress?: boolean;
    alphabeticOnly?: boolean;
    endWithNumberOrSpecialCharacter?: boolean;
    zipCode?: boolean;
    sex?: boolean;
}