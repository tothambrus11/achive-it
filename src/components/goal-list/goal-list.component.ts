import {Component, OnInit, RegisteredComponent} from "../../core/component";
import {GoalCardComponent} from "../goal-card/goal-card.component";
import {AddGoalCardComponent} from "../add-goal-card/add-goal-card.component";

import "./goal-list.style.scss";
@RegisteredComponent({
    name: "goal-list"
})
export class GoalListComponent extends Component implements OnInit {

    async onInit() {

        for (let i = 0; i < 7; i++) {
            let el = new GoalCardComponent();
            el.goal = {
                id: 0,
                name: "Lorem ipsum dolor sit amet",
                progress: i / 6,
            };
            if (i == 2) {
                el.goal = {
                    id: 0,
                    name: "Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet",
                    progress: i / 6,
                }
            }

            this.append(el);
        }

        let addGoalCard = new AddGoalCardComponent();
        this.append(addGoalCard);
    }
}

