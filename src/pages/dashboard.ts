import {ProgressBarComponent} from "../components/progress-bar/progressbar.component";
// @ts-ignore
import * as idk from "../init-components";
import {GoalListComponent} from "../components/goal-list/goal-list.component";

const appContainer = document.querySelector(".app-layout")!;

let progress = new ProgressBarComponent((progress) => {
    progress.setAttribute("rate", "0.5");
});

progress.style.marginBottom = "32px";
appContainer.appendChild(progress);

let el = new GoalListComponent();
appContainer.appendChild(el);