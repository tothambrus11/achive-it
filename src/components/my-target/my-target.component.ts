import {Component, OnInit, RegisteredComponent} from "../../Component";
import {Target} from "../../lib/target";
import {MyCheckboxComponent} from "../my-checkbox/my-checkbox.component";

@RegisteredComponent
export class MyTargetComponent extends Component implements OnInit {
    private readonly target_: Target;
    private checkbox: MyCheckboxComponent;

    constructor(target: Target) {
        super();
        this.target_ = target;
    }

    async onInit() {
        this.checkbox = new MyCheckboxComponent(c => {
            (c as MyCheckboxComponent).progress = this.target_.calculatedProgress!;
        });
        this.append(this.checkbox);

        const content = document.createElement('div');
        content.classList.add('target-content');
        this.initElements(content);
        this.append(content);
    }

    private initElements(el: HTMLElement) {
        this.targetHeading(el);
        if(this.target_.details || this.target_.date)
            this.targetDetails(el);

        const childrenContainer = document.createElement('div');
        childrenContainer.classList.add('target-list');
        this.target_.children.forEach(child => {
            let target = new MyTargetComponent(child);
            childrenContainer.append(target);
        });

        el.append(childrenContainer);
    }

    private targetHeading(el: HTMLElement) {
        const headingEl = document.createElement('div');
        headingEl.classList.add('target-heading');

        const headerEl = document.createElement('div');
        headerEl.classList.add('target-header');

        const titleEl = document.createElement('input');
        titleEl.value = this.target_.title;
        headerEl.append(titleEl);
        headingEl.append(headerEl);

        const typeEl = document.createElement('div');
        typeEl.classList.add('target-type');

        //TODO Target Type

        headingEl.append(typeEl);
        el.append(headingEl);
    }

    private targetDetails(el: HTMLElement) {
        const detailsEl = document.createElement('div');
        detailsEl.classList.add('target-details');

        if(this.target_.details) {
            //TODO
        }

        if(this.target_.date) {
            //TODO
        }

        el.append(detailsEl);
    }

}