import { LktObject } from 'lkt-ts-interfaces';

type DataDifferences = {
    from: LktObject;
    to: LktObject;
};

type PreventType = 'string' | 'number' | 'undefined' | 'function' | 'null' | 'boolean' | 'object' | 'array';

type DataStateConfig = {
    preventProps?: string[];
    preventTypes?: PreventType[];
};

declare class DataState {
    private data;
    private original;
    private readonly preventProps;
    private readonly preventTypes;
    isChanged: boolean;
    constructor(data: LktObject, config?: DataStateConfig);
    store(data: LktObject): this;
    increment(data: LktObject): this;
    turnStoredIntoOriginal(): this;
    changed(): boolean;
    differences(): DataDifferences;
    getData(): LktObject;
    getOriginalData(): LktObject;
}

export { DataState, type DataStateConfig, type PreventType };
