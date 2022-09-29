import { LktObject } from 'lkt-ts-interfaces';
import { DataDifferences } from "../types/DataDifferences";
export declare class DataValue {
    private readonly value;
    private readonly data;
    constructor(value?: LktObject);
    isDifferent(value: string): boolean;
    getDifferences(compared: LktObject): DataDifferences;
    getString(): string;
    getObject(): LktObject;
    private fetchDifferences;
    private parseDatum;
    private parseData;
}
