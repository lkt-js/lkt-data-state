import {LktObject} from "lkt-ts-interfaces";

export class PreventPropsValue {
    private readonly value: string[];

    constructor(value?: string[]) {
        if (!value) {
            value = [];
        }
        this.value = value;
    }

    clear(data: LktObject) {
        if (this.value.length === 0) {
            return data;
        }

        Object.keys(data).forEach(key => {

            // Remove root level
            if (this.value.includes(key)) {
                delete data[key];
            }

            // Recursive remove
            if (typeof data[key] === 'object') {
                data[key] = this.clear(data[key]);
            }
        });

        return data;
    }
}