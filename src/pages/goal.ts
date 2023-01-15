import {MyHeaderComponent} from "@components/my-header/my-header.component";
import {ProgressBarComponent} from "@components/progress-bar/progressbar.component";
import {calculateProgress, Target, TargetType} from "../lib/target";
import {MyTargetComponent} from "@components/my-target/my-target.component";
import {IconButtonComponent} from "@components/icon-button/icon-button.component";

const appContainer = document.querySelector(".app-layout")!;

let header = new MyHeaderComponent({name: 'My Goals', url: '/dashboard.html'});
appContainer.appendChild(header);

// Add title element
const titleEl = document.createElement("input");
titleEl.classList.add('goal-title');
titleEl.value = "Become a better person";
titleEl.placeholder = 'Goal title';
appContainer.appendChild(titleEl);

let progress = new ProgressBarComponent();
progress.style.marginBottom = "10px";
appContainer.appendChild(progress);

let buttonContainer = document.createElement('div');
buttonContainer.style.display = 'flex';
buttonContainer.style.flexDirection = 'row';
buttonContainer.style.justifyContent = 'flex-end';
buttonContainer.style.gap = '5px';
buttonContainer.style.marginBottom = "32px";
appContainer.appendChild(buttonContainer);

let markComplete = new IconButtonComponent('/icons/tick-circle.svg', 'MARK COMPLETED');
markComplete.classList.add('icon-button-green');
buttonContainer.appendChild(markComplete);

let cancelGoals = new IconButtonComponent('/icons/very-dissatisfied-circle.svg', 'CANCEL GOAL');
cancelGoals.classList.add('icon-button-red');
buttonContainer.appendChild(cancelGoals);

let targets: Target[] = [
    {
        title: "Cut the grass",
        children: [],
        done: false,
        targetType: TargetType.TASK,
    },
    {
        title: "Chop up the potatoes",
        children: [],
        done: false,
        targetType: TargetType.REACH_TARGET_1B1,
        extraData: {
            targetAmount: 10,
            currentAmount: 3
        }
    },
    {
        title: "Save money to pay the bills",
        children: [],
        done: false,
        targetType: TargetType.COLLECT_MONEY,
        extraData: {
            targetAmount: 110,
            currentAmount: 95
        }
    },
    {
        title: "Do the dishes",
        done: false,
        targetType: TargetType.TASK,

        children: [
            {
                title: "Put the dry dishes in the cabinet",
                done: false,
                targetType: TargetType.TASK,
                children: [],
            },
            {
                title: "Put the dirty dishes in the dishwasher except the knifes",
                done: true,
                children: [],
                targetType: TargetType.TASK,
            },
            {
                title: "Start the dishwasher",
                done: false,
                children: [],
                targetType: TargetType.TASK,
                date: "2023-12-23",
            },
            {
                title: "Chop up the potatoes",
                children: [],
                done: false,
                targetType: TargetType.REACH_TARGET_1B1,
                extraData: {
                    targetAmount: 8,
                    currentAmount: 6
                }
            },
            {
                title: "Wash the remanining dishes by hand",
                done: false,
                children: [
                    {
                        title: "Clean the toilet",
                        done: false,
                        children: [],
                        targetType: TargetType.TASK,
                    },
                    {
                        title: "Clean the sink",
                        done: true,
                        children: [],
                        targetType: TargetType.TASK,
                    }
                ],
                targetType: TargetType.TASK,
                date: "2023-12-23",
                details: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." +
                    " Quisque vehicula quam at purus congue, ut pretium felis mattis." +
                    " Pellentesque habitant morbi tristique senectus et netus et " +
                    "malesuada fames ac turpis egestas. Donec in magna aliquam, " +
                    "sagittis ex eget, laoreet neque. Donec volutpat elit sagittis " +
                    "ligula faucibus, et luctus augue interdum."
            },

        ],
    },
    {
        title: "Clean the bathroom",
        done: true,
        targetType: TargetType.TASK,
        children: [
            {
                title: "Clean the toilet",
                done: true,
                children: [],
                targetType: TargetType.TASK,
            },
            {
                title: "Clean the sink",
                done: true,
                children: [],
                targetType: TargetType.TASK,
            }
        ],
    }
]

export function updateGoalProgress() {
    let p = 0;
    targets.forEach((target) => {
        p += target.calculatedProgress!;
    });
    p /= targets.length;
    progress.setAttribute("rate", p.toString());
}

export function removeTopLevelTarget(target: Target) {
    targets = targets.filter((t) => t !== target);
    updateGoalProgress();
}
let targetListEl = document.createElement("div");
targetListEl.classList.add("target-list");
cancelGoals.addEventListener('click', () => {
    targetListEl.innerHTML = '';
    targets = new Array<Target>();
    progress.setAttribute('rate', '0');
});

let overallProgress = 0;
targets.forEach(target => {
    overallProgress += calculateProgress(target);
    console.log(calculateProgress(target), "asd")
});
if (targets.length > 0) {
    overallProgress /= targets.length;
}
console.log(overallProgress);
progress.setAttribute('rate', overallProgress.toString());

for (let target of targets) {
    let el = new MyTargetComponent(target);
    targetListEl.append(el);
    markComplete.addEventListener('click', () => el.finishTarget());
}
appContainer.appendChild(targetListEl);

export default 10;