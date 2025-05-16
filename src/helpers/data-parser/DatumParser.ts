import {date, isDate} from "lkt-date-tools";

import {InvalidDatumError} from "../../errors/InvalidDatumError";
import {ArrayParser} from "./ArrayParser";
import {ObjectParser} from "./ObjectParser";
import { LktObject } from 'lkt-ts-interfaces';
import { ParserConfig } from '../../types/ParserConfig.ts';

export class DatumParser {
    private readonly value: any;
    private readonly config: ParserConfig;

    constructor(value: any, config: ParserConfig = {}) {
        this.value = value;
        this.config = config;
    }

    parse() {
        if (this.value === null){
            return null;
        }

        if (isDate(this.value) && !isNaN(this.value.valueOf())) {
            return date(this.config?.dateFormat ?? 'Y-m-d H:i:s', this.value);
        }

        if (Array.isArray(this.value)) {
            try {
                return new ArrayParser(this.value, this.config).parse();
            } catch (e) {
                // nothing
            }
        }

        if (typeof this.value === 'object') {
            return new ObjectParser(this.value, this.config).parse();
        }

        if (typeof this.value === 'number') {
            return String(this.value);
            // return Number(this.value);
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