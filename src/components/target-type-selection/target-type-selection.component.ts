import {Component, OnInit, RegisteredComponent} from "../../core/component";

import "./target-type-selection.style.scss";

@RegisteredComponent({
    name: 'target-type-selection'
})
export class TargetTypeSelectionComponent extends Component implements OnInit {
    async onInit() {
        const insertTaskButton = document.createElement('button');
        const insertCollectMoneyButton = document.createElement('button');
        const insertCounterTargetButton = document.createElement('button');


        insertTaskButton.innerText = 'Task';
        insertCollectMoneyButton.innerText = 'Collect Money';
        insertCounterTargetButton.innerText = 'Counter Target';

        this.append(insertTaskButton);
        this.append(insertCollectMoneyButton);
        this.append(insertCounterTargetButton);
    }
}
