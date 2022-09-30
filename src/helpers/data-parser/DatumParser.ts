import {date, isDate} from "lkt-date-tools";

import {InvalidDatumError} from "../../errors/InvalidDatumError";
import {ArrayParser} from "./ArrayParser";
import {ObjectParser} from "./ObjectParser";

export class DatumParser {
    private readonly value: any;

    constructor(value: any) {
        this.value = value;
    }

    parse() {
        if (this.value === null){
            return null;
        }

        if (isDate(this.value) && !isNaN(this.value.valueOf())) {
            return date('Y-m-d H:i:s', this.value);
        }

        if (Array.isArray(this.value)) {
            try {
                return new ArrayParser(this.value).parse();
            } catch (e) {
                // nothing
            }
        }

        if (typeof this.value === 'object') {
            return new ObjectParser(this.value).parse();
        }

        if (typeof this.value === 'number') {
            return Number(this.value);
        }

        if (typeof this.value === 'string') {
            return String(this.value);
        }

        if (typeof this.value !== 'function') {
            return this.value;
        }

        throw new InvalidDatumError();
    }
}