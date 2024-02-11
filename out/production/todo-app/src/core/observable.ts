export class Observable<T> {
    private observers: ((value: T) => void)[] = [];

    constructor(private _value: T, private updateGuard?: (newValue: T, oldValue?: T) => boolean) {
    }

    get value(): T {
        return this._value;
    }

    set value(value: T) {
        if (this.updateGuard && !this.updateGuard(value, this._value)) return;
        this._value = value;
        this.notify();
    }

    subscribe(observer: (value: T) => void, callImmediately = true) {
        this.observers.push(observer);
        if (callImmediately) observer(this.value);
    }

    unsubscribe(observer: (value: T) => void) {
        this.observers = this.observers.filter(subscriber => subscriber !== observer);
    }

    private notify() {
        this.observers.forEach(observer => observer(this.value));
    }

    /**
     * Creates a two-way binding between two observables. The updateGuard of the first observable
     * should take care of handling infinite recursion by checking whether the new value is equal to
     * the old value.
     * @param observableToMap
     * @param convertToMapped a function that maps the value of the first observable to the value of the second observable
     * @param convertFromMapped a function that maps the value of the second observable to the value of the first observable
     */
    static map<T1, T2>(observableToMap: Observable<T1>,
                       convertToMapped: (value: T1) => T2,
                       convertFromMapped: (value: T2) => T1): Observable<T2> {
        let mappedObservable = new Observable<T2>(convertToMapped(observableToMap.value));
        observableToMap.subscribe(value => mappedObservable.value = convertToMapped(value), false);
        mappedObservable.subscribe(value => observableToMap.value = convertFromMapped(value), false);
        return mappedObservable;
    }
}

