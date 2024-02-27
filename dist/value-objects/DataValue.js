import { ObjectParser } from '../helpers/data-parser/ObjectParser';
export class DataValue {
    constructor(value) {
        if (!value) {
            value = {};
        }
        value = new ObjectParser(value).parse();
        this.data = value;
        this.value = JSON.stringify(value);
    }
    isDifferent(value) {
        return this.value !== value;
    }
    getDifferences(compared) {
        return this.fetchDifferences(this.getObject(), compared);
    }
    getString() {
        return this.value;
    }
    getObject() {
        return this.data;
    }
    fetchDifferences(original, compared) {
        let from = {}, to = {};
        if (typeof original !== 'object' || typeof compared !== 'object') {
            return { from, to };
        }
        const fromKeys = Object.keys(original);
        const toKeys = Object.keys(compared);
        let allKeys = [...fromKeys, ...toKeys];
        allKeys = allKeys.filter((value, index, self) => {
            return self.indexOf(value) === index;
        });
        allKeys.forEach((key) => {
            let a = original[key];
            let b = compared[key];
            if (Array.isArray(a) && Array.isArray(b)) {
                if (a.length === 0 && b.length === 0) {
                    return;
                }
                let includeArrays = false;
                a.forEach((value, index) => {
                    if (b[index] !== value) {
                        includeArrays = true;
                    }
                });
                if (includeArrays) {
                    from[key] = a;
                    to[key] = b;
                }
                return;
            }
            else if (Array.isArray(a) && !Array.isArray(b)) {
                from[key] = a;
                to[key] = b;
                return;
            }
            else if (!Array.isArray(a) && Array.isArray(b)) {
                from[key] = a;
                to[key] = b;
                return;
            }
            const isObjectA = typeof a === 'object', isObjectB = typeof b === 'object';
            if (isObjectA && isObjectB) {
                const aux = this.fetchDifferences(a, b);
                a = aux.from;
                b = aux.to;
            }
            else if (isObjectA) {
                const aux = this.fetchDifferences(a, b);
                a = aux.from;
            }
            else if (isObjectB) {
                const aux = this.fetchDifferences(a, b);
                b = aux.to;
            }
            if (a !== b) {
                from[key] = a;
                to[key] = b;
            }
        });
        from = this.clearEmpties(from);
        to = this.clearEmpties(to);
        return { from, to };
    }
    clearEmpties(o) {
        for (const k in o) {
            if (!o[k] || typeof o[k] !== 'object') {
                continue; // If null or not an object, skip to the next iteration
            }
            // The property is an object
            this.clearEmpties(o[k]); // <-- Make a recursive call on the nested object
            if (Object.keys(o[k]).length === 0) {
                delete o[k]; // The object had no properties, so delete that property
            }
        }
        return o;
    }
}
