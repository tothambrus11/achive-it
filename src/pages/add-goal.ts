// This file will be redundant in the future, since the goal page will handle adding and displaying
// and empty goal as well.
// The contents of the files are currently identical with the exception that the target list is now
// empty.

import {MyHeaderComponent} from "@components/my-header/my-header.component";
import {ProgressBarComponent} from "@components/progress-bar/progressbar.component";
import {IconButtonComponent} from "@components/icon-button/icon-button.component";
import {Observable} from "../core/observable";
import {DateInputComponent} from "@components/date-input/date-input.component";
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

const goalDate = new Observable<string>('');
let dateInput = new DateInputComponent(goalDate);
dateInput.style.gap = '3px';
goalSettings.append(dateInput);

const addDetailsButton = new ActionButtonComponent("Add details", "add-description", () => {
    alert("Add details field to goal. To be implemented with the backend support. Currently we just display the details fields if they are already added to the goal.");
});
goalSettings.append(addDetailsButton);

// Target manipulations
let buttonContainer = document.createElement('div');
someDiv.appendChild(buttonContainer);

let cancelGoals = new IconButtonComponent('/icons/very-dissatisfied-circle.svg', 'CANCEL GOAL');
cancelGoals.classList.add('icon-button-red');
buttonContainer.appendChild(cancelGoals);

let overallProgress = 0;
progress.setAttribute('rate', overallProgress.toString());

const addTarget = document.createElement('div');
addTarget.style.display = 'flex';
addTarget.style.justifyContent = 'center';
addTarget.style.marginTop = '20px';
appContainer.appendChild(addTarget);

let ttsContainer = document.createElement('div');
ttsContainer.classList.add('tts-cont');
let targetTypeSelection = new TargetTypeSelectionComponent();
targetTypeSelection.style.display = 'none';
ttsContainer.append(targetTypeSelection);
addTarget.append(ttsContainer);

const targetBtn = new IconButtonComponent('/icons/plus.svg', 'Add Target');
targetBtn.classList.add('add-target-btn');
targetBtn.addEventListener('click', () => targetTypeSelection.style.display = 'block');
targetBtn.addEventListener('focusout', () => targetTypeSelection.style.display = 'none');
addTarget.appendChild(targetBtn);

export default 10;