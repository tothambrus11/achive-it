import {Component, OnInit, RegisteredComponent} from "../../core/component";

import "./action-button.style.scss";

@RegisteredComponent
export class ActionButtonComponent extends Component implements OnInit {
    constructor(private actionName: string, private iconName: string, private action: (e: MouseEvent | KeyboardEvent) => void) {
        super();

    }

    async onInit() {
        this.title = this.actionName;
        this.style.setProperty("--mask-url", `url(/icons/${this.iconName}.svg)`);
        this.tabIndex = 0;

        this.addEventListener("click", this.action);
        this.addEventListener("keydown", (e) => {
            if (e.key === "Enter" || e.key == " ") this.action(e);
            console.log(e.key);
        });
    }

}
