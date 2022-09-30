import { PreventType } from '../../types/PreventType';
export declare class ArrayTypeFilter {
    private readonly value;
    constructor(value: any[]);
    filter(preventTypes: PreventType[]): any[];
}
