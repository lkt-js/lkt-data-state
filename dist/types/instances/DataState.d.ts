import { LktObject } from 'lkt-ts-interfaces';
import { DataStateConfig } from '../types/DataStateConfig';
export declare class DataState {
    private data;
    private readonly original;
    private readonly preventProps;
    private readonly preventTypes;
    isChanged: boolean;
    constructor(data: LktObject, config?: DataStateConfig);
    store(data: LktObject): void;
    changed(): boolean;
    differences(): import("../types/DataDifferences").DataDifferences;
}
