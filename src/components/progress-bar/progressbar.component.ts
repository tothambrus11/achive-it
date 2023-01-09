import {Component} from "../../Component";

const startHue = 0;
const endHue = 122;

export class ProgressBarComponent extends Component {
    private readonly bar: HTMLDivElement;

    constructor() {
        super();

        this.bar = document.createElement('div');
        this.bar.style.backgroundColor = 'hsl('+startHue+', 52%, 45%)';
        this.bar.style.width = '0';
        this.shadowRoot!.append(this.bar);
    }

    static get observedAttributes() {
        return ['rate'];
    }

    attributeChangedCallback(name: string, _oldValue: string, newValue: string) {
        if(name.toLowerCase() !== 'rate')
            return;

        const rate = Math.round(Number.parseFloat(newValue) * 100)/100;
        const hue = Math.round(startHue + (endHue - startHue)*rate);

        this.bar.style.backgroundColor = 'hsl('+hue+', 52%, 45%)';
        this.bar.style.width = (rate * 100).toString()+'%';
    }

}