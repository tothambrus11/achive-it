import {OnInit, RegisteredComponent} from "../../Component";
import {GoalSimpleData} from "../../lib/goal";
import {ProgressBarComponent} from "../progress-bar/progressbar.component";
import {GoalCardContainerComponent} from "../goal-card-container/goal-car-container.component";

@RegisteredComponent
export class GoalCardComponent extends GoalCardContainerComponent implements OnInit {
    private goal_!: GoalSimpleData;
    private progress?: ProgressBarComponent;
    private titleEl?: HTMLHeadingElement;
    private menu!: HTMLImageElement;

    set progressRate(rate: number) {
        this.goal_.progress = rate;

        this.progress?.setAttribute("rate", rate.toString());
    }

    set titleName(title: string) {
        this.goal_.name = title;
        if (this.titleEl)
            this.titleEl.innerText = title;
    }

    set goal(goal: GoalSimpleData) {
        this.goal_ = goal;
        this.progressRate = goal.progress;
        this.titleName = goal.name
    }

    get goal() {
        return this.goal_;
    }


    async onInit() {
        this.tabIndex = 0;

        this.titleEl = document.createElement("h2");
        this.append(this.titleEl)

        this.progress = new ProgressBarComponent();
        this.append(this.progress);

        this.menu = document.createElement("img");
        this.menu.src = "/hamburger.svg";
        this.menu.classList.add("menu");
        this.append(this.menu);

        this.goal = this.goal_;
    }

}