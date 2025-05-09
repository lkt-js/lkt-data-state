import {LktObject} from "lkt-ts-interfaces";

export class OnlyPropsValue {
    private readonly value: string[];

    constructor(value?: string[]) {
        if (!value) {
            value = [];
        }
        this.value = value;
    }

    clear(data: LktObject, recursive = false): any {
        if (typeof data === 'undefined' || data === null) {
            return {};
        }

        if (this.value.length === 0) {
            return data;
        }

        if (typeof data !== 'object') {
            return data;
        }

        if (Array.isArray(data)) {
            return data.map((item: any) => {
                if (typeof item === 'object') {
                    return this.clear(item)
                }
                return item;
            });
        }

        Object.keys(data).forEach(key => {

            // Remove root level
            if (!this.value.includes(key)) {
                delete data[key];
            }

            // Recursive remove
            if (recursive && typeof data[key] === 'object') {
                data[key] = this.clear(data[key]);
            }
        });

        return data;
    }
}