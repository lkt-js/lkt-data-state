import { DataValue } from '../value-objects/DataValue';
import { PreventPropsValue } from '../value-objects/PreventPropsValue';
import { PreventTypesValue } from '../value-objects/PreventTypesValue';
export class DataState {
    constructor(data, config = {}) {
        this.preventProps = new PreventPropsValue(config.preventProps);
        this.preventTypes = new PreventTypesValue(config.preventTypes);
        data = { ...data };
        data = this.preventProps.clear(data);
        data = this.preventTypes.clear(data);
        this.data = new DataValue({ ...data });
        this.original = new DataValue({ ...data });
        this.isChanged = this.changed();
    }
    store(data) {
        data = { ...data };
        data = this.preventProps.clear(data);
        data = this.preventTypes.clear(data);
        this.data = new DataValue(data);
        this.isChanged = this.changed();
        return this;
    }
    increment(data) {
        data = { ...this.getData(), ...data };
        data = this.preventProps.clear(data);
        data = this.preventTypes.clear(data);
        this.data = new DataValue(data);
        this.isChanged = this.changed();
        return this;
    }
    turnStoredIntoOriginal() {
        const data = this.getData();
        this.data = new DataValue({ ...data });
        this.original = new DataValue({ ...data });
        this.isChanged = this.changed();
        return this;
    }
    changed() {
        return this.original.isDifferent(this.data.getString());
    }
    differences() {
        return this.original.getDifferences(this.data.getObject());
    }
    getData() {
        return this.data.getObject();
    }
    getOriginalData() {
        return this.original.getObject();
    }
}
