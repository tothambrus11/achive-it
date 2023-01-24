// Init global statistics object
export const trackingInfo = {
    clickCount: 0,
    sessionStarted: +Date.now(),
    keypressCount: 0,
    charactersTyped: 0,
};

// Init info
export function initTrackingInfo(){
    resetTrackingInfo();
}

// Reset statistics
export function resetTrackingInfo(){
    trackingInfo.clickCount = 0;
    trackingInfo.sessionStarted = +Date.now();
    trackingInfo.keypressCount = 0;
    trackingInfo.charactersTyped = 0;
}

// Count all clicks on the web page
window.addEventListener("click", ()=>{
    trackingInfo.clickCount++;
});

// Get the sign-up form
const form = document.querySelector<HTMLFormElement>('#form-sign-up');

// Gather all the input type elements(input, select, textarea)
const inputs: HTMLElement[] = new Array<HTMLElement>();
form!.querySelectorAll('input').forEach(input => inputs.push(input));
form!.querySelectorAll('select').forEach(input => inputs.push(input));
form!.querySelectorAll('textarea').forEach(input => inputs.push(input));

// For each element track key presses
inputs.forEach(input => {
    const inputEl = input as unknown as (HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement);

    // @ts-ignore
    inputEl.addEventListener("keydown", (e: KeyboardEvent) => {
        trackingInfo.keypressCount++;

        // Check if key-press was character
        if(e.key.length === 1)
            trackingInfo.charactersTyped++;
    });
});