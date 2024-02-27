import { sortObjectProperties } from 'lkt-object-tools';
import { DatumTypeFilter } from './DatumTypeFilter';
export class ObjectTypeFilter {
    constructor(value) {
        this.value = { ...value };
    }
    filter(preventTypes) {
        if (!this.value) {
            return {};
        }
        const keys = Object.keys(this.value);
        let r = {};
        keys.forEach((key) => {
            try {
                r[key] = new DatumTypeFilter(this.value[key]).filter(preventTypes);
            }
            catch (e) {
                // nothing to do here
            }
        });
        r = sortObjectProperties(r);
        return r;
    }
}
