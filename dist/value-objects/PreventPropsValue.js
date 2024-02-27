export class PreventPropsValue {
    constructor(value) {
        if (!value) {
            value = [];
        }
        this.value = value;
    }
    clear(data) {
        if (typeof data === 'undefined' || data === null) {
            return {};
        }
        if (this.value.length === 0) {
            return data;
        }
        if (typeof data !== 'object') {
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
