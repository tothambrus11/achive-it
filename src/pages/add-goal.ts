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

let header = new MyHeaderComponent({name: 'My Goals', url: '/achive-it/dashboard.html'});
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

let cancelGoals = new IconButtonComponent('/achive-it/icons/very-dissatisfied-circle.svg', 'CANCEL GOAL');
cancelGoals.classList.add('icon-button-red');
cancelGoals.addEventListener('click', () => {
    if(!confirm('Are you sure you want to cancel the goal?'))
        return;

    window.location.href = '/dashboard.html';
});
buttonContainer.appendChild(cancelGoals);

let overallProgress = 0;
progress.setAttribute('rate', overallProgress.toString());

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