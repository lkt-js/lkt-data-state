import { DatumTypeFilter } from "./DatumTypeFilter";
export class ArrayTypeFilter {
    constructor(value) {
        this.value = value;
    }
    filter(preventTypes) {
        const tmp = [];
        this.value.forEach((z) => {
            try {
                tmp.push(new DatumTypeFilter(z).filter(preventTypes));
            }
            catch (e) {
                // nothing
            }
        });
        return tmp;
    }
}
