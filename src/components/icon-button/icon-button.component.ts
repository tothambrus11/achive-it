import {Component, OnInit, RegisteredComponent} from "../../core/Component";

import "./style.scss";

@RegisteredComponent
export class IconButtonComponent extends Component implements OnInit {

    constructor(private icon: string, private text: string) {
        super();
    }

    async onInit() {
        const img = document.createElement('img');
        img.src = this.icon;
        this.append(img);

        const p = document.createElement('p');
        p.innerText = this.text;
        this.append(p);
    }

}
