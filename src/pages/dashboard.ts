import {ProgressBarComponent} from "../components/progress-bar/progressbar.component";
// @ts-ignore
import * as idk from "../init-components";
import {GoalListComponent} from "../components/goal-list/goal-list.component";
import {GoalCardComponent} from "../components/goal-card/goal-card.component";
import {AddGoalCardComponent} from "../components/add-goal-card/add-goal-card.component";

customElements.define("goal-list", GoalListComponent);
customElements.define("goal-card", GoalCardComponent);
customElements.define("add-goal-card", AddGoalCardComponent);
customElements.define("progress-bar", ProgressBarComponent);


const appContainer = document.querySelector(".app-layout")!;

let progress = document.createElement('progress-bar');
progress.setAttribute("rate", "0.5");
appContainer.appendChild(progress);

let el = document.createElement("goal-list");
appContainer.appendChild(el);