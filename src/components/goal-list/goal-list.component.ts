import {Component, OnInit, RegisteredComponent} from "../../Component";
import {GoalCardComponent} from "../goal-card/goal-card.component";
import {AddGoalCardComponent} from "../add-goal-card/add-goal-card.component";

@RegisteredComponent
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

