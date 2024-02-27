import { PreventType } from "../types/PreventType";
export declare class DatumType {
    private readonly value;
    constructor(datum: any);
    included(haystack: PreventType[]): boolean;
    isArray(): boolean;
    isNull(): boolean;
    isNumber(): boolean;
    isString(): boolean;
    isBoolean(): boolean;
    isUndefined(): boolean;
    isObject(): boolean;
    isFunction(): boolean;
}
