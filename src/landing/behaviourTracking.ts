export const trackingInfo = {
    clickCount: 0,
    sessionStarted: +Date.now(),
    keypressCount: 0,
    charactersTyped: 0,
};

export function initTrackingInfo(){
    resetTrackingInfo();
}
export function resetTrackingInfo(){
    trackingInfo.clickCount = 0;
    trackingInfo.sessionStarted = +Date.now();
    trackingInfo.keypressCount = 0;
    trackingInfo.charactersTyped = 0;
}

window.addEventListener("click", ()=>{
    trackingInfo.clickCount++;
});

const form = document.querySelector<HTMLFormElement>('#form-sign-up');
const inputs: HTMLElement[] = new Array<HTMLElement>();
form!.querySelectorAll('input').forEach(input => inputs.push(input));
form!.querySelectorAll('select').forEach(input => inputs.push(input));
form!.querySelectorAll('textarea').forEach(input => inputs.push(input));
inputs.forEach(input => {
    const inputEl = input as unknown as (HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement);

    // @ts-ignore
    inputEl.addEventListener("keydown", (e: KeyboardEvent) => {
        trackingInfo.keypressCount++;
        if(e.key.length === 1)
            trackingInfo.charactersTyped++;
    });
});