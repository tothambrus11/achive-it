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

const idRegex = /^([A-Z])([a-zA-Z0-9$&+,:;=?@#|'<>.-^*()%!]{3,10})([0-9$&+,:;=?@#|'<>.-^*()%!])$/g;
const passRegex = /^([a-zA-Z0-9$&+,:;=?@#|'<>.-^*()%!]{12,})$/g;
const nameRegex = /^([a-zA-Z].*?)$/g;
const countryRegex = /^([a-zA-Z].*?)$/g;
const zipCodeRegex = /^([0-9]{4})([A-Z]{2})$/g;
const emailRegex = /^[a-zA-Z0-9.!#$%&’*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/g;

document.querySelectorAll('form').forEach(formEl => {
    const form = formEl as HTMLFormElement;
    form.addEventListener('submit', e => {
        let pass: boolean = true;
        form.querySelectorAll<HTMLInputElement>('input').forEach(input => {
            let inputEl = input as HTMLInputElement;
            let regex: RegExp | null;
            switch (inputEl.name) {
                case 'id':
                    regex = idRegex;
                    break;
                case 'pass':
                    regex = passRegex;
                    break;
                case 'name':
                    regex = nameRegex;
                    break;
                case 'zip':
                    regex = zipCodeRegex;
                    break;
                case 'email':
                    regex = emailRegex;
                    break;
                case 'country':
                    regex = countryRegex;
                    break;
                default:
                    regex = null;
                    break;
            }

            if(!regex)
                return;

            if(!regex.test(inputEl.value)) {
                console.log(inputEl.name, 'failed');
                pass = false;
            }
        });

        if(!pass)
            e.preventDefault();
    });
});