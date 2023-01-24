import "../style.scss";
import "./landing-page.scss";
import {initTrackingInfo, resetTrackingInfo, trackingInfo} from "./behaviourTracking";

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
    resetTrackingInfo();
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

    initTrackingInfo();
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

document.querySelectorAll<HTMLFormElement>('form').forEach(form => {
    form.addEventListener('submit', e => {
        e.preventDefault();

        let values: Array<{name: string, value: string}> = [];

        let inputs: HTMLElement[] = new Array<HTMLElement>();
        formSignUp.querySelectorAll('input').forEach(input => inputs.push(input));
        formSignUp.querySelectorAll('select').forEach(input => inputs.push(input));
        formSignUp.querySelectorAll('textarea').forEach(input => inputs.push(input));

        inputs.forEach(input => {
            const inputEl = input as unknown as (HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement);
            values.push({name: inputEl.name, value: inputEl.value});
        });

        let str = '';
        values.forEach(value => {
            str += value.name+': '+value.value+'\n';
        });

        alert(str);
        if(form.getAttribute('id') === 'form-sign-up')
            showGdprHell();
    });
})

function showGdprHell(){
    let gdprHellElement = document.getElementById("gdpr-hell")! as unknown as HTMLDivElement;

    let secondsSpent = Math.floor((+Date.now() - trackingInfo.sessionStarted) / 1000);
    let minutesSpent = Math.floor(secondsSpent / 60);
    secondsSpent -= minutesSpent * 60;

    gdprHellElement.innerHTML = `Number of mouse clicks: ${trackingInfo.clickCount}<br>
Total time spent: ${minutesSpent} minutes and ${secondsSpent} seconds<br>
Total key presses: ${trackingInfo.keypressCount}<br>
Total number of characters types: ${trackingInfo.charactersTyped}<br>
<a href="./goal.html">Proceed to goal page</a>
`;

    gdprHellElement.style.display = "block";
}