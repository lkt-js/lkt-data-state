import { LktObject } from 'lkt-ts-interfaces';

type DataDifferences = {
    from: LktObject;
    to: LktObject;
};

type PreventType = 'string' | 'number' | 'undefined' | 'function' | 'null' | 'boolean' | 'object' | 'array';

interface DataStateConfig {
    onlyProps?: string[];
    preventProps?: string[];
    preventTypes?: PreventType[];
    recursiveOnlyProps?: boolean;
    recursivePreventProps?: boolean;
}

declare class DataState {
    private data;
    private original;
    private readonly onlyProps;
    private readonly preventProps;
    private readonly preventTypes;
    private readonly recursiveOnlyProps;
    private readonly recursivePreventProps;
    isChanged: boolean;
    constructor(data: LktObject, config?: DataStateConfig);
    store(data: LktObject): this;
    increment(data: LktObject): this;
    turnStoredIntoOriginal(): this;
    changed(): boolean;
    differences(): DataDifferences;
    getChangedProperties(): string[];
    getData(): LktObject;
    getOriginalData(): LktObject;
}

export { DataState, type DataStateConfig, type PreventType };
