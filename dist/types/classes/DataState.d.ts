import { ILktObject } from "lkt-tools";
export declare class DataState {
    data: string;
    originalData: string;
    removeDataProps: string[];
    changed: boolean;
    preventStoreProps(props: string[]): this;
    store(data: ILktObject): this;
    reset(data: ILktObject): this;
    hasModifications(): boolean;
}
