import { InvalidDatumError } from "../../errors/InvalidDatumError";
import { DatumType } from "../DatumType";
import { ArrayTypeFilter } from "./ArrayTypeFilter";
import { ObjectTypeFilter } from "./ObjectTypeFilter";
export class DatumTypeFilter {
    constructor(value) {
        this.value = value;
        this.type = new DatumType(value);
    }
    filter(preventTypes) {
        if (this.type.included(preventTypes)) {
            throw new InvalidDatumError();
        }
        if (this.type.isArray()) {
            return new ArrayTypeFilter(this.value).filter(preventTypes);
        }
        if (this.type.isObject()) {
            return new ObjectTypeFilter(this.value).filter(preventTypes);
        }
        return this.value;
    }
}
