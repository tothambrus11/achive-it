import {Component} from "../../Component";

export class AddGoalCardComponent extends Component {
    constructor() {
        super();
        
        const icon = document.createElement('i');
        this.shadowRoot!.append(icon);

        const title = document.createElement("h2");
        title.innerHTML = 'Add Goal';
        this.shadowRoot!.append(title);
    }

    connectedCallback() {
        this.tabIndex = 0;
    }

}