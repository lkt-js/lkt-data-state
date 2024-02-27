import { LktObject } from 'lkt-ts-interfaces';
import { PreventType } from '../../types/PreventType';
export declare class ObjectTypeFilter {
    private readonly value;
    constructor(value: LktObject);
    filter(preventTypes: PreventType[]): LktObject;
}
