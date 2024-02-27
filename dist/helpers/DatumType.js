export class DatumType {
    constructor(datum) {
        let type;
        if (datum === null) {
            type = 'null';
        }
        else if (Array.isArray(datum)) {
            type = 'array';
        }
        else {
            type = typeof datum;
            type = type.toLowerCase();
        }
        this.value = type;
    }
    included(haystack) {
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
