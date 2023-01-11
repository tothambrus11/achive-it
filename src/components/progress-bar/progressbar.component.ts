import {Component, OnInit, RegisteredComponent} from "../../Component";

const START_HUE = 0;
const END_HUE = 122;

@RegisteredComponent
export class ProgressBarComponent extends Component implements OnInit {
    private bar?: HTMLDivElement;

    async onInit() {
        this.bar = document.createElement('div');
        this.bar.style.backgroundColor = 'hsl(' + START_HUE + ', 52%, 45%)';
        this.bar.style.width = '0';
        this.append(this.bar);
    }

    static get observedAttributes() {
        return ['rate'];
    }

    attributeChangedCallback(name: string, _oldValue: string, newValue: string) {
        if (name.toLowerCase() !== 'rate')
            return;

        const rate = Math.round(Number.parseFloat(newValue) * 100) / 100;
        const hue = Math.round(START_HUE + (END_HUE - START_HUE) * rate);

        if (this.bar) {
            this.bar.style.backgroundColor = 'hsl(' + hue + ', 52%, 45%)';
            this.bar.style.width = (rate * 100).toString() + '%';
        }
    }

}