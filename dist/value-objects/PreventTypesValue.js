import { ObjectTypeFilter } from "../helpers/type-filter/ObjectTypeFilter";
export class PreventTypesValue {
    constructor(value) {
        if (!value) {
            value = [];
        }
        this.value = value;
    }
    clear(data) {
        if (this.value.length === 0) {
            return data;
        }
        return new ObjectTypeFilter(data).filter(this.value);
    }
}
