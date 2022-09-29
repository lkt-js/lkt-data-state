import { LktObject } from 'lkt-ts-interfaces';
import { PreventType } from '../types/PreventType';
export declare class PreventTypesValue {
    private readonly value;
    constructor(value?: PreventType[]);
    clear(data: LktObject): LktObject;
    private clearArray;
    private getDatumType;
    private canBeRemoved;
}
