import {Component, OnInit, RegisteredComponent} from "../../core/Component";
import {Observable} from "../../core/observable";
const PADDING = 4;

import "./control-input.style.scss";

export interface InputConfig {
    inputType: string,
    min?: string,
    max?: string,
    placeholder?: string,
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

        Object.assign(this.config, config);
        if (observable) {
            observable.subscribe(value => {
                if(this.value == value) return;
                this._value = value;
                this.value = value;
            });
        }
    }

    async onInit() {
        this.input = document.createElement("input");
        this.input.type = this.config.inputType;
        this.value = this._value;
        if(this.config.min) this.input.min = this.config.min;
        if(this.config.max) this.input.max = this.config.max;

        if(this.config.placeholder) this.input.placeholder = this.config.placeholder;
        
        this.append(this.input);

        this.hiddenSpan = document.createElement("span");
        this.hiddenSpan.classList.add("hidden-span");
        this.append(this.hiddenSpan);

        this.input.addEventListener("keyup", (e) => {
            if(!this.isValidValue(this.input?.value ?? "")) {
                e.preventDefault();
                this.value = this._value;
            }
        });

        this.input.addEventListener("input", () => {
            this.resize();

            if(!this.isValidValue(this.value!)){
                return;
            }

            this._value = this.value!;

            if (this.observable) {
                this.observable.value = (this.input?.value ?? "");
            }
        });

        this.resize()
    }

    resize() {
        if (!this.input || !this.hiddenSpan) return;

        this.hiddenSpan.innerText = this.input.value;
        let valueWidth = this.hiddenSpan.offsetWidth + PADDING * 2;

        this.hiddenSpan.innerText = this.config.placeholder ?? "";
        let placeholderWidth = this.hiddenSpan.offsetWidth + PADDING * 2;
        if(String(this.value).length !== 0) {
            placeholderWidth = 0;
        }

        this.input.style.width = Math.max(valueWidth, placeholderWidth, this.minWidth) + "px";
    }

    get value() {
        return this.input?.value;
    }

    isValidValue(value: string): boolean {
        if(!this.input) return false;
        if(this.config.max && +value > +this.config.max) {
            return false;
        }
        return true;
    }

    private set value(value: string | undefined) {
        if(!this.isValidValue(value ?? "")) return;
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