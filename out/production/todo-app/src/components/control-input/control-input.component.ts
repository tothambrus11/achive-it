import {Component, OnInit, RegisteredComponent} from "../../core/Component";

import "./control-input.style.scss";
import {Observable} from "../../core/observable";

const PADDING = 4;

export interface InputConfig {
    inputType: string,
    min?: string,
    max?: string,
}

@RegisteredComponent
export class ControlInputComponent extends Component implements OnInit {
    private input?: HTMLInputElement;
    private hiddenSpan?: HTMLSpanElement;
    private minWidth = 20;
    private _value: string = ""; // used to init the value of the input
    private config: InputConfig = {
        inputType: "number",
    }

    constructor(config: Partial<InputConfig> = {}, private observable?: Observable<string>) {
        super();

        Object.assign(config, this.config);

        if (observable) {
            observable.subscribe(value => {
                this.value = value;
            });
        }
    }

    async onInit() {
        this.input = document.createElement("input");
        this.input.type = this.config.inputType;
        this.input.value = this._value;
        if(this.config.min) this.input.min = this.config.min;
        if(this.config.max) this.input.max = this.config.max;
        
        this.append(this.input);

        this.hiddenSpan = document.createElement("span");
        this.hiddenSpan.classList.add("hidden-span");
        this.append(this.hiddenSpan);

        this.input.addEventListener("input", () => {
            this.resize();
            if (this.observable) {
                this.observable.value = (this.input?.value ?? "");
            }
        });

        this.resize()
    }

    resize() {
        if (!this.input || !this.hiddenSpan) return;

        this.hiddenSpan.innerText = this.input.value;
        this.input.style.width = Math.max(this.hiddenSpan.offsetWidth + PADDING * 2, this.minWidth) + "px";
    }

    get value() {
        return this.input?.value;
    }

    set value(value: string | undefined) {
        this._value = value ?? "";
        if (!this.input) return;

        this.input.value = this._value;
        this.resize();
    }

    set max(value: string){
        if(!this.input) return;
        this.input.max = value;
    }

    set min(value: string){
        if(!this.input) return;
        this.input.min = value;
    }
}