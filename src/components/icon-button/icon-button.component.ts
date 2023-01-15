import {Component, OnInit, RegisteredComponent} from "../../core/component";

import "./icon-button.style.scss";

@RegisteredComponent
export class IconButtonComponent extends Component implements OnInit {

    constructor(private icon: string, private text: string) {
        super();
    }

    async onInit() {
        this.tabIndex = 0;

        const img = document.createElement('img');
        img.src = this.icon;
        this.append(img);

        const p = document.createElement('p');
        p.innerText = this.text;
        this.append(p);
    }

}
