import {Component, OnInit, RegisteredComponent} from "../../core/component";

import "./target-button-container.style.scss";

@RegisteredComponent
export class TargetButtonContainerComponent extends Component implements OnInit {
    constructor(private isRootTarget: boolean) {
        super();
    }

    async onInit() {
        const leftChildButton = document.createElement('img');
        leftChildButton.src = '/add-left.png';
        leftChildButton.alt = 'Add target one level up';
        leftChildButton.title = 'Add target one level up';
        leftChildButton.width = 50;
        leftChildButton.height = 26;
        if(this.isRootTarget) leftChildButton.style.visibility = 'hidden';

        const belowChildButton = document.createElement('img');
        belowChildButton.src = '/add-below.png';
        belowChildButton.alt = 'Add target at the same depth';
        belowChildButton.title = 'Add target at the same depth';
        belowChildButton.width = 50;
        belowChildButton.height = 26;

        const rightChildButton = document.createElement('img');
        rightChildButton.src = '/add-right.png';
        rightChildButton.alt = 'Add child target';
        rightChildButton.title = 'Add child target';
        rightChildButton.width = 50;

        let container = document.createElement('div');
        container.append(leftChildButton);
        container.append(belowChildButton);
        container.append(rightChildButton);

        this.append(container);
    }
}