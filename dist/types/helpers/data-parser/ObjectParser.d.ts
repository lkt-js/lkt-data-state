import { LktObject } from 'lkt-ts-interfaces';
export declare class ObjectParser {
    private readonly value;
    constructor(value: LktObject);
    parse(): LktObject;
}
