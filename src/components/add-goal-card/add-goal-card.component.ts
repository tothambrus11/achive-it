import {OnInit, RegisteredComponent} from "../../core/component";
import {GoalCardContainerComponent} from "../goal-card-container/goal-car-container.component";

import "./add-goal-card.style.scss";

@RegisteredComponent
export class AddGoalCardComponent extends GoalCardContainerComponent implements OnInit {

    async onInit(): Promise<void> {

        this.tabIndex = 0;

        const icon = document.createElement('i');
        this.append(icon);

        const title = document.createElement("h2");
        title.innerHTML = 'Add Goal';
        this.append(title);

        this.addEventListener('click', () => {
            window.location.href = '/add-goal.html';
        });
    }

}
