import {Component, OnInit, RegisteredComponent} from "../../core/Component";
import {calculateProgress, Target, TargetType} from "../../lib/target";
import {MyCheckboxComponent} from "../my-checkbox/my-checkbox.component";
import {updateGoalProgress} from "../../pages/goal";

import "./my-target.style.scss";
import {ActionButtonComponent} from "@components/action-button/action-button.component";
import {ActionListComponent} from "@components/action-list/action-list.component";
import {ControlInputComponent} from "@components/control-input/control-input.component";
import {Observable} from "../../core/observable";
import {
    TargetButtonContainerComponent
} from "@components/target-button-cont/target-button-container.component";

@RegisteredComponent
export class MyTargetComponent extends Component implements OnInit {
    private readonly target_: Target;
    private checkbox?: MyCheckboxComponent;
    private rowContainer?: HTMLDivElement;
    private childrenContainer?: HTMLDivElement;
    private titleInput?: HTMLInputElement;
    private maxAmountEl?: HTMLSpanElement;
    private currentAmountEl?: ControlInputComponent;
    private $targetAmount?: Observable<number>;
    private $currentAmount?: Observable<number>;

    constructor(target: Target) {
        super();
        this.target_ = target;
    }

    recalculate() {
        calculateProgress(this.target_);
        if (this.checkbox) this.checkbox.progress = this.target_.calculatedProgress!;

        let parent = this.parentElement!.parentElement!;
        if (parent instanceof MyTargetComponent) {
            (parent as MyTargetComponent).recalculate();
            return;
        }

        updateGoalProgress();
    }

    finishTarget() {
        this.target_.done = true;
        this.target_.calculatedProgress = 1;

        if (this.checkbox) this.checkbox.progress = 1;

        switch (this.target_.targetType) {
            case TargetType.COLLECT_MONEY:
            case TargetType.REACH_TARGET_1B1:
                this.target_.extraData!.currentAmount = this.target_.extraData!.targetAmount;
                this.$currentAmount!.value = this.target_.extraData!.currentAmount;

                break;
        }

        this.recalculate();
        if (!this.childrenContainer) return;

        for (let i = 0; i < this.childrenContainer.children.length; i++) {
            let myTarget = this.childrenContainer.children.item(i) as MyTargetComponent;
            myTarget.finishTarget();
        }

    }

    unfinishTarget() {
        this.target_.done = false;
        this.target_.calculatedProgress = 0;
        if (this.checkbox) this.checkbox.progress = 0;

        switch (this.target_.targetType) {
            case TargetType.COLLECT_MONEY:
            case TargetType.REACH_TARGET_1B1:
                this.target_.extraData!.currentAmount = 0;
                this.$currentAmount!.value = this.target_.extraData!.currentAmount;
                break;
        }

        this.recalculate();
        if (!this.childrenContainer) return;

        for (let i = 0; i < this.childrenContainer.children.length; i++) {
            let myTarget = this.childrenContainer.children.item(i) as MyTargetComponent;
            myTarget.unfinishTarget();
        }
    }


    async onInit() {
        this.rowContainer = this.createRowContainer();
        this.append(this.rowContainer);

        this.childrenContainer = this.createChildrenContainer();
        this.append(this.childrenContainer);
    }

    private initCheckbox(): MyCheckboxComponent {
        let checkbox = new MyCheckboxComponent();
        checkbox.progress = this.target_.calculatedProgress!;

        checkbox.addEventListener('click', () => {
            if (this.target_.done) {
                this.unfinishTarget();
                console.log('unfinish');
            } else {
                this.finishTarget();
                console.log('finish');
            }
        });
        return checkbox;
    }

    private createRowContainer(): HTMLDivElement {
        const rowContainer = document.createElement("div");
        rowContainer.classList.add("row-container");

        let backgroundElement = document.createElement('div');
        backgroundElement.classList.add('background-element');
        rowContainer.append(backgroundElement);

        let goodPlaceContainer = document.createElement('div');
        goodPlaceContainer.classList.add('good-place-row');
        backgroundElement.append(goodPlaceContainer);

        let targetHeader = document.createElement('div');
        targetHeader.classList.add('target-header');
        goodPlaceContainer.append(targetHeader);

        if (this.target_.details || this.target_.date) {
            let contentContainer = this.createContentContainer();
            goodPlaceContainer.append(contentContainer);
        }

        let box = document.createElement('div');
        box.classList.add('target-checkbox');
        targetHeader.append(box);

        this.checkbox = this.initCheckbox();
        box.append(this.checkbox);

        this.titleInput = this.createTitleInput();
        targetHeader.append(this.titleInput);

        targetHeader.append(this.createTargetSpecificInputs());

        let actionList = this.createActionList();
        goodPlaceContainer.append(actionList);

        const addButtons = new TargetButtonContainerComponent(false);
        goodPlaceContainer.append(addButtons);

        return rowContainer;
    }

    private createActionList() {
        let actionList = new ActionListComponent();

        const deleteButton = new ActionButtonComponent("Delete target", "delete", () => {

        });
        actionList.append(deleteButton);

        const addDateButton = new ActionButtonComponent("Add date", "date", () => {

        });
        actionList.append(addDateButton);

        const addDetailsButton = new ActionButtonComponent("Add details", "add-description", () => {

        });
        actionList.append(addDetailsButton);

        return actionList;
    }

    private createContentContainer(): HTMLDivElement {
        const contentContainer = document.createElement('div');
        contentContainer.classList.add('target-content');

        if (this.target_.details) {
            let details = document.createElement('div');
            details.classList.add('target-details');
            contentContainer.append(details);

            let icon = document.createElement('img');
            icon.src = '/icons/description-black.svg';
            details.append(icon);

            let text = document.createElement('span');
            text.innerText = this.target_.details;
            details.append(text);
        }

        if (this.target_.date) {
            let date = document.createElement('div');
            date.classList.add('target-date');
            contentContainer.append(date);

            let icon = document.createElement('img');
            icon.src = '/icons/date-black.svg';
            date.append(icon);

            let dateInput = document.createElement('input');
            dateInput.type = 'date';
            dateInput.value = this.target_.date;
            date.append(dateInput);
        }

        return contentContainer;
    }

    private createChildrenContainer(): HTMLDivElement {
        const childrenContainer = document.createElement('div');
        childrenContainer.classList.add('child-list');

        this.target_.children.forEach(child => {
            let target = new MyTargetComponent(child);
            childrenContainer.append(target);
        });

        return childrenContainer;
    }

    private createTitleInput(): HTMLInputElement {
        const titleInput = document.createElement('input');
        titleInput.classList.add('title-input');
        titleInput.value = this.target_.title;
        titleInput.placeholder = "Target title";
        return titleInput;
    }

    private createTargetSpecificInputs(): HTMLDivElement {
        let container = document.createElement('div');
        container.classList.add('target-type-container');

        switch (this.target_.targetType) {
            case TargetType.COLLECT_MONEY:
                this.initCollectMoneyInputs(container);
                break;
            case TargetType.REACH_TARGET_1B1:
                this.initReachTarget1B1Inputs(container);
                break;
        }

        return container;
    }

    private initCollectMoneyInputs(_container: HTMLDivElement) {

    }

    private initReachTarget1B1Inputs(container: HTMLDivElement) {
        container.classList.add("control-1b1-cont");

        // Init data observables for reactivity
        const $currentAmount = this.$currentAmount = new Observable<number>(this.target_.extraData!.currentAmount, (newValue, oldValue) => {
            return newValue >= 0 && newValue <= this.target_.extraData!.targetAmount && newValue !== oldValue;
        });

        const $targetAmount = this.$targetAmount = new Observable<number>(this.target_.extraData!.targetAmount, (newValue, oldValue) => {
            return newValue > 0 && newValue !== oldValue;
        });

        // Listen to changes and update the model
        $currentAmount.subscribe((currentAmount) => {
            this.target_.extraData!.currentAmount = currentAmount;
            this.target_.done = currentAmount >= this.target_.extraData!.targetAmount;
            this.recalculate();
        });

        $targetAmount.subscribe((targetAmount) => {
            this.target_.extraData!.targetAmount = targetAmount;
            if(targetAmount < $currentAmount.value){
                $currentAmount.value = targetAmount;
            }
            this.recalculate();
        });

        // two-way binding
        const $currentAmountAsString = Observable.map<number, string>(
            $currentAmount,
            (numericValue) => String(numericValue),
            (stringValue) => Number(stringValue)
        );


        // Init the input fields
        container.append(new ActionButtonComponent('Decrement current value', 'minus', () => $currentAmount.value--));
        container.append(new ActionButtonComponent("Increment current value", "plus", () => $currentAmount.value++));

        this.currentAmountEl = new ControlInputComponent({min: "0", max: $targetAmount.value.toString()}, $currentAmountAsString);
        $targetAmount.subscribe((newValue) => this.currentAmountEl!.max = newValue.toString());

        container.append(this.currentAmountEl);

        let spanEl = document.createElement('span');
        spanEl.classList.add("target-amount-1b1");
        spanEl.title = "Target amount   \n(click to change)";
        $targetAmount.subscribe((targetValue) => {
            spanEl.innerText = `/ ${targetValue}`;
        });
        spanEl.addEventListener('click', () => {
            let result = prompt("New target:", $targetAmount.value.toString())
            if(result){
                $targetAmount.value = Number(result);
            }
        });

        container.append(spanEl);

    }

    set maxAmount(val: number | undefined) {
        if (val === undefined) return;
        switch (this.target_.targetType) {
            case TargetType.REACH_TARGET_1B1:
                if (!this.maxAmountEl) return;
                this.maxAmountEl.innerText = '/ ' + val.toString();
                break;
            case TargetType.COLLECT_MONEY:
                break;
        }
    }

    get maxAmount(): number {
        return this.target_.extraData!.targetAmount;
    }
}