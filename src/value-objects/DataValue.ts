import { LktObject } from 'lkt-ts-interfaces';

import { ObjectParser } from '../helpers/data-parser/ObjectParser';
import { DataDifferences } from '../types/DataDifferences';
import { ParserConfig } from '../types/ParserConfig.ts';

export class DataValue {
    private readonly value: string;
    private readonly data: LktObject;
    private readonly config: ParserConfig;

    constructor(value?: LktObject, config: ParserConfig = {}) {
        if (!value) value = {};

        this.config = config;
        value = new ObjectParser(value, this.config).parse();
        this.data = value;
        this.value = JSON.stringify(value);
    }

    isDifferent(value: string) {
        return this.value !== value;
    }

    getDifferences(compared: LktObject): DataDifferences {
        return this.fetchDifferences(this.getObject(), compared);
    }

    getString() {
        return this.value;
    }

    getObject() {
        return this.data;
    }

    private fetchDifferences(
        original: LktObject,
        compared: LktObject,
    ): DataDifferences {
        let from: LktObject = {},
            to: LktObject = {};

        if (typeof original !== 'object' || typeof compared !== 'object') {
            return { from, to };
        }

        if (typeof original === 'undefined' || original === null || typeof compared === 'undefined' || compared === null) {
            return { from: original, to: compared };
        }

        if (Array.isArray(original) && Array.isArray(compared)) {
            if (original.length === 0 && compared.length === 0) {
                return { from: [], to: [] };
            }

            let filteredALength = original.filter(value => !compared.includes(value)).length,
                filteredBLength = compared.filter(value => !original.includes(value)).length;

            if (filteredALength > 0 || filteredBLength > 0) {
                return { from: original, to: compared };
            }
            return { from: [], to: [] };

        } else if (Array.isArray(original) && !Array.isArray(to)) {
            return { from: original, to: compared };
        } else if (!Array.isArray(original) && Array.isArray(to)) {
            return { from: original, to: compared };
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

                let filteredALength = a.filter(value => !b.includes(value)).length,
                    filteredBLength = b.filter(value => !a.includes(value)).length;

                if (filteredALength > 0 || filteredBLength > 0) {
                    from[key] = a;
                    to[key] = b;
                }
                return;
            } else if (Array.isArray(a) && !Array.isArray(b)) {
                from[key] = a;
                to[key] = b;
                return;
            } else if (!Array.isArray(a) && Array.isArray(b)) {
                from[key] = a;
                to[key] = b;
                return;
            }

            const isObjectA = typeof a === 'object',
                isObjectB = typeof b === 'object';

            if (isObjectA && isObjectB) {
                const aux = this.fetchDifferences(a, b);
                a = aux.from;
                b = aux.to;
            } else if (isObjectA) {
                const aux = this.fetchDifferences(a, b);
                a = aux.from;
            } else if (isObjectB) {
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

    clearEmpties(o: LktObject) {
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
