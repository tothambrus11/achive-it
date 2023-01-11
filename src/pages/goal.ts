import {MyHeaderComponent} from "../components/my-header/my-header.component";
import {ProgressBarComponent} from "../components/progress-bar/progressbar.component";
import {MyCheckboxComponent} from "../components/my-checkbox/my-checkbox.component";
import {calculateProgress, Target, TargetType} from "../lib/target";
import {MyTargetComponent} from "../components/my-target/my-target.component";

const appContainer = document.querySelector(".app-layout")!;

let header = new MyHeaderComponent({name: 'My Goals', url: '/dashboard.html'});
appContainer.appendChild(header);

// Add title element
const titleEl = document.createElement("h1");
titleEl.innerText = "My Goals";
appContainer.appendChild(titleEl);

let progress = new ProgressBarComponent();
progress.style.marginBottom = "32px";
appContainer.appendChild(progress);


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
            amountToCollect: 10,
            currentAmount: 3
        }
    },
    {
        title: "Save money to pay the bills",
        children: [],
        done: false,
        targetType: TargetType.COLLECT_MONEY,
        extraData: {
            amountToCollect: 110,
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
                title: "Wash the remanining dishes by hand",
                done: false,
                children: [],
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
    }
]

let targetListEl = document.createElement("div");
targetListEl.classList.add("target-list");

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
}
appContainer.appendChild(targetListEl);

let checkbox = new MyCheckboxComponent(() => {
    setInterval(() => {
        (checkbox as MyCheckboxComponent).progress += 0.01;
    }, 10);
});

appContainer.appendChild(checkbox);


export default 10;