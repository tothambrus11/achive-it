import {Component, OnInit, RegisteredComponent} from "../../core/component";
import {TargetTypeSelectionComponent} from "@components/target-type-selection/target-type-selection.component";

import "./target-button-container.style.scss";

@RegisteredComponent({
    name: 'target-button-container'
})
export class TargetButtonContainerComponent extends Component implements OnInit {
    private targetTypeSelection?: TargetTypeSelectionComponent;

    constructor(private isRootTarget: boolean) {
        super();
    }

    async onInit() {
        const leftChildButton = document.createElement('img');
        leftChildButton.tabIndex = 0;
        leftChildButton.src = '/achive-it/add-left.png';
        leftChildButton.alt = 'Add target one level up';
        leftChildButton.title = 'Add target one level up';
        leftChildButton.width = 50;
        leftChildButton.height = 26;
        if (this.isRootTarget) leftChildButton.style.visibility = 'hidden';
        leftChildButton.addEventListener('click', () => {
            this.showTargetTypeSelection();
        });
        leftChildButton.addEventListener('focusout', () => this.hideTargetTypeSelection());

        const belowChildButton = document.createElement('img');
        belowChildButton.tabIndex = 0;
        belowChildButton.src = '/achive-it/add-below.png';
        belowChildButton.alt = 'Add target at the same depth';
        belowChildButton.title = 'Add target at the same depth';
        belowChildButton.width = 50;
        belowChildButton.height = 26;
        belowChildButton.addEventListener('click', () => {
            this.showTargetTypeSelection();
        });
        belowChildButton.addEventListener('focusout', () => this.hideTargetTypeSelection());

        const rightChildButton = document.createElement('img');
        rightChildButton.tabIndex = 0;
        rightChildButton.src = '/achive-it/add-right.png';
        rightChildButton.alt = 'Add child target';
        rightChildButton.title = 'Add child target';
        rightChildButton.width = 50;
        rightChildButton.height = 26;
        rightChildButton.addEventListener('click', () => {
            this.showTargetTypeSelection();
        });
        rightChildButton.addEventListener('focusout', () => this.hideTargetTypeSelection());

        let container = document.createElement('div');
        container.append(leftChildButton);
        container.append(belowChildButton);
        container.append(rightChildButton);

        let ttsContainer = document.createElement('div');
        ttsContainer.classList.add('tts-cont');
        this.targetTypeSelection = new TargetTypeSelectionComponent();
        ttsContainer.append(this.targetTypeSelection);
        this.append(ttsContainer);

        this.append(container);
    }

    showTargetTypeSelection() {
        this.targetTypeSelection && (this.targetTypeSelection.style.display = "block");
    }

    hideTargetTypeSelection() {
        this.targetTypeSelection && (this.targetTypeSelection.style.display = "none");
    }
}