export abstract class Component extends HTMLElement {
    protected shadow!: ShadowRoot;
    protected name: string;

    protected constructor() {
        super();

        this.name = convertToComponentName(this.constructor.name);

        this.attachShadow({mode: "open"}); // sets and returns 'this.shadowRoot'

        const style = document.createElement("style")!;
        style.innerHTML = `@import url(/src/components/${this.name}/style.css);`;

        this.shadowRoot!.append(style);
    }
}

function convertToComponentName(className: string): string {
    let t = className.replace(/[A-Z]/g, m => "-" + m.toLowerCase());
    return t.slice(1, t.length - 1 - "component".length);
}

export function ComponentDecorator<T extends { new(...args: any[]): {} }>(constructor: T) {
    return class extends constructor {
        static componentName = convertToComponentName(constructor.name);
    };
}