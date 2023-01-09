import {Component} from "../../Component";
import {GoalSimpleData} from "../../lib/goal";
import {ProgressBarComponent} from "../progress-bar/progressbar.component";

export class GoalCardComponent extends Component {
    private goal_!: GoalSimpleData;
    private readonly progress: ProgressBarComponent;
    private readonly titleEl!: HTMLHeadingElement;
    private menu!: HTMLImageElement;

    constructor() {
        super();

        this.titleEl = document.createElement("h2");
        this.shadowRoot!.append(this.titleEl)

        this.progress = document.createElement("progress-bar") as ProgressBarComponent;
        this.shadowRoot!.append(this.progress);

        this.menu = document.createElement("img");
        this.menu.src = "/hamburger.svg";
        this.menu.classList.add("menu");
        this.shadowRoot!.append(this.menu);

    }

    set progressRate(rate: number) {
        this.goal_.progress = rate;
        this.progress.setAttribute("rate", rate.toString());
    }

    set titleName(title: string) {
        this.goal_.name = title;
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

    connectedCallback() {
        this.classList.add('goal-card-container');

        this.tabIndex = 0;

    }
}