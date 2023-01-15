import {Component, OnInit, RegisteredComponent} from "../../core/component";
import {Observable} from "../../core/observable";

import "./date-input.style.scss";

@RegisteredComponent
export class DateInputComponent extends Component implements OnInit {
    private dateInput?: HTMLInputElement;

    constructor(private date: Observable<string>) {
        super();

        this.date.subscribe((value) => {
            if (this.dateInput) this.dateInput.value = value;
        });
    }

    async onInit() {
        let icon = document.createElement('img');
        icon.src = '/icons/date-black.svg';
        this.append(icon);

        let dateInput = this.dateInput = document.createElement('input');
        dateInput.type = 'date';
        dateInput.value = this.date.value;

        dateInput.addEventListener('change', () => {
           this.date.value = dateInput.value;
        });

        this.append(dateInput);
    }
}