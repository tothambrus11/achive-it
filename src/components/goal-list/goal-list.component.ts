import {Component} from "../../Component";
import {GoalCardComponent} from "../goal-card/goal-card.component";

export class GoalListComponent extends Component {

    constructor() {
        super();

        for (let i = 0; i < 7; i++) {
            let el = document.createElement("goal-card") as GoalCardComponent;
            el.goal = {
                id: 0,
                name: "Lorem ipsum dolor sit amet",
                progress: i / 6,
            };
            if(i == 2){
                el.goal = {
                    id: 0,
                    name: "Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet",
                    progress: i / 6,
                }
            }

            this.shadowRoot!.append(el);
        }


        let addGoalCard = document.createElement('add-goal-card');
        this.shadowRoot!.append(addGoalCard);
    }

    connectedCallback() {
    }
}

