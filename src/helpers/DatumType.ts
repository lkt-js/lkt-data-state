import {PreventType} from "../types/PreventType";

export class DatumType {
    private readonly value: PreventType;

    constructor(datum: any) {
        let type: string;

        if (datum === null) {
            type = 'null';
        } else if (Array.isArray(datum)) {
            type = 'array';
        } else {
            type = typeof datum;
            type = type.toLowerCase();
        }

        this.value = type as PreventType;
    }

    included(haystack: PreventType[]) {
        return haystack.includes(this.value);
    }

    isArray() {
        return this.value === 'array';
    }

    isNull() {
        return this.value === 'null';
    }

    isNumber() {
        return this.value === 'number';
    }

    isString() {
        return this.value === 'string';
    }

    isBoolean() {
        return this.value === 'boolean';
    }

    isUndefined() {
        return this.value === 'undefined';
    }

    isObject() {
        return this.value === 'object';
    }

    isFunction() {
        return this.value === 'function';
    }
}