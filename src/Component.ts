export abstract class Component extends HTMLElement {

    // Will store the ready promise, since we want to always return the same
    #ready?: Promise<void> = undefined;

    protected readonly names: string[] = [];

    private afterInit?: (component: Component) => void;

    constructor(afterInit?: (component: Component) => void) {
        super();

        let proto = Object.getPrototypeOf(this);

        while (proto !== Component.prototype && proto !== Object.prototype) {
            this.names.push(convertToComponentName(proto.constructor.name));
            proto = Object.getPrototypeOf(proto)
        }

        this.afterInit = afterInit;
    }

    /**
     * Starts the init function and waits for it to finish. If the init function has been called, it
     * won't be called again, and the function will return the same promise waiting for it to be
     * returned. This method should only run when the component implements OnInit.
     */
    async ready(): Promise<void> {
        // We don't want to call init more that one time
        // and we want every call to ready() to return the same promise.
        return this.#ready || (this.#ready = new Promise(resolve => resolve((this as unknown as OnInit).onInit())));
    }

    connectedCallback() {
        this.classList.add(...this.names);
        const onInitThis = this as unknown as OnInit | any;
        if (onInitThis.onInit && typeof onInitThis.onInit === "function") {
            this.ready().then(() => this.afterInit && this.afterInit(this));
        } else if (this.afterInit) {
            this.afterInit(this);
        }
    }

}

function convertToComponentName(className: string): string {
    let t = className.replace(/[A-Z]/g, m => "-" + m.toLowerCase());
    return t.slice(1, t.length - 1 - "component".length);
}

export interface OnInit {
    onInit: () => Promise<void>;
}

export const registeredComponents = new Set<string>();

/**
 * Registers a class as a custom html element and initializes the name of the component that will be
 * later used to add css classes to the element automatically.
 * @param constructor class to register as a custom element
 */
export function RegisteredComponent<T extends { new(...args: any[]): {} }>(constructor: T) {
    const componentName_ = convertToComponentName(constructor.name);

    if (!registeredComponents.has(componentName_)) {
        // @ts-ignore
        customElements.define(componentName_, constructor);
        registeredComponents.add(componentName_);
    }

    return constructor;
}