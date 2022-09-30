import { PreventType } from "../../types/PreventType";
export declare class DatumTypeFilter {
    private readonly value;
    private readonly type;
    constructor(value: any);
    filter(preventTypes: PreventType[]): any;
}
