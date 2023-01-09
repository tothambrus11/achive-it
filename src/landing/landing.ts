const box = document.querySelector("#login-box")!;
const flyingThing = box.querySelector<HTMLDivElement>(".flying-thingy")!;
const signInButton = box.querySelector<HTMLButtonElement>("#sign-in-button")!;
const signUpButton = box.querySelector<HTMLButtonElement>("#sign-up-button")!;

const form = box.querySelector<HTMLFormElement>("form")!;
const formButton = form.querySelector<HTMLButtonElement>("button")!;

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
    form.action = '/dashboard.html';//isSignIn ? '/sign-in' : '/sign-up';
    formButton.innerText = isSignIn ? 'Sign In' : 'Sign Up';
}

function signInButtonX() {
    return signInButton.offsetLeft + signInButton.offsetWidth / 2 - flyingThing.offsetWidth / 2;
}

function signUpButtonX() {
    return signUpButton.offsetLeft + signUpButton.offsetWidth / 2 - flyingThing.offsetWidth / 2;
}

moveFlyingThingTo(signInButtonX());
updateForm();

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