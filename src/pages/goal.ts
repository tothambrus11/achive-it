import {MyHeaderComponent} from "@components/my-header/my-header.component";
import {ProgressBarComponent} from "@components/progress-bar/progressbar.component";
import {calculateProgress, Target, TargetType} from "../lib/target";
import {MyTargetComponent} from "@components/my-target/my-target.component";
import {IconButtonComponent} from "@components/icon-button/icon-button.component";
import {DateInputComponent} from "@components/date-input/date-input.component";
import {Observable} from "../core/observable";
import {ActionButtonComponent} from "@components/action-button/action-button.component";
import {
    TargetTypeSelectionComponent
} from "@components/target-type-selection/target-type-selection.component";
import "../style.scss";

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

const someDiv = document.createElement('div');
someDiv.classList.add('goal-buttons');
appContainer.append(someDiv);

//Goal Settings (date, details)
const goalSettings = document.createElement('div');
someDiv.append(goalSettings);


const goalAdditionalDataContainer = document.createElement('div');
goalAdditionalDataContainer.classList.add('goal-additional-data-container');
appContainer.append(goalAdditionalDataContainer);


// Creating date row

const goalDate = new Observable<string>("");
const dateInput = new DateInputComponent(goalDate);
dateInput.style.gap = '3px';
dateInput.style.display = "none";
goalSettings.append(dateInput);


// Creating details row
let detailsRow = document.createElement("div");
detailsRow.classList.add("details-row");
detailsRow.style.display = "none";
goalAdditionalDataContainer.append(detailsRow);


const detailsIcon = document.createElement("img");
detailsIcon.src = "/icons/description-black.svg";
detailsRow.append(detailsIcon)

const detailsField = document.createElement("div");
detailsField.contentEditable = "true";
detailsField.style.width = "100%";
detailsField.innerText = "Write something S.M.A.R.T...";
detailsRow.append(detailsField);

const addDateButton = new ActionButtonComponent("Add date", "date-black", () => {
    dateInput.style.display = 'flex';
    addDateButton.style.display = 'none';
});

const addDetailsButton = new ActionButtonComponent("Add details", "add-description", () => {
    detailsRow.style.display = 'flex';
    addDetailsButton.style.display = 'none';
});

goalSettings.append(addDateButton);
goalSettings.append(addDetailsButton);

// Target manipulations
let buttonContainer = document.createElement('div');
someDiv.appendChild(buttonContainer);

let markComplete = new IconButtonComponent('/icons/tick-circle.svg', 'MARK COMPLETED');
markComplete.classList.add('icon-button-green');
buttonContainer.appendChild(markComplete);

let cancelGoals = new IconButtonComponent('/icons/very-dissatisfied-circle.svg', 'CANCEL GOAL');
cancelGoals.classList.add('icon-button-red');
cancelGoals.addEventListener('click', () => {
    if(!confirm('Are you sure you want to cancel the goal?'))
        return;

    window.location.href = '/dashboard.html';
});

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
];
let targetsObserver = new Observable(targets);
targetsObserver.subscribe(() => updateGoalProgress());

export function updateGoalProgress() {
    let p = 0;
    if(targetsObserver.value.length == 0) {
        progress.setAttribute("rate", "0");
        return;
    }

    targetsObserver.value.forEach((target) => {
        p += target.calculatedProgress!;
    });
    p /= targetsObserver.value.length;
    progress.setAttribute("rate", p.toString());
}

let targetListEl = document.createElement("div");
targetListEl.classList.add("target-list");
let overallProgress = 0;
targetsObserver.value.forEach(target => overallProgress += calculateProgress(target));
if (targetsObserver.value.length > 0) {
    overallProgress /= targetsObserver.value.length;
}
console.log(overallProgress);
progress.setAttribute('rate', overallProgress.toString());

const components = new Array<MyTargetComponent>();
for (let target of targetsObserver.value) {
    let el = new MyTargetComponent(target);
    targetListEl.append(el);
    components.push(el);
}

markComplete.addEventListener('click', () => {
    components.forEach(targetEl => {
        targetEl.finishTarget();
    })
})
targetsObserver.subscribe(targets => markComplete.style.display = targets.length == 0 ? 'none' : 'flex');
appContainer.appendChild(targetListEl);
export function removeTopLevelTarget(target: Target) {
    targetsObserver.value = targetsObserver.value.filter((t) => t !== target);
}

const addTarget = document.createElement('div');
addTarget.classList.add('add-target');
appContainer.appendChild(addTarget);

const targetBtn = new IconButtonComponent('/icons/plus.svg', 'Add Target');
targetBtn.classList.add('add-target-btn');
targetBtn.addEventListener('click', () => targetTypeSelection.style.display = 'flex');
targetBtn.addEventListener('focusout', () => targetTypeSelection.style.display = 'none');
addTarget.appendChild(targetBtn);

let ttsContainer = document.createElement('div');
ttsContainer.classList.add('tts-cont');
let targetTypeSelection = new TargetTypeSelectionComponent();
targetTypeSelection.style.display = 'none';
ttsContainer.append(targetTypeSelection);
targetBtn.append(ttsContainer);

export default 10;