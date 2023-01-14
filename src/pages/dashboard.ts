import {ProgressBarComponent} from "@components/progress-bar/progressbar.component";
import {GoalListComponent} from "@components/goal-list/goal-list.component";
import {MyHeaderComponent} from "@components/my-header/my-header.component";

const appContainer = document.querySelector(".app-layout")!;

let header = new MyHeaderComponent();
appContainer.appendChild(header);

// Add title element
const titleEl = document.createElement("h1");
titleEl.innerText = "My Goals";
appContainer.appendChild(titleEl);

let progress = new ProgressBarComponent((progress) => {
    progress.setAttribute("rate", "0.5");
});

progress.style.marginBottom = "32px";
appContainer.appendChild(progress);

let el = new GoalListComponent();
appContainer.appendChild(el);


