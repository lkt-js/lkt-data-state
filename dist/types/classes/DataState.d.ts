import { ILktObject } from "lkt-tools";
export declare class DataState {
    data: string;
    originalData: string;
    removeDataProps: string[];
    preventStoreProps(props: string[]): this;
    parseData(data: ILktObject): string;
    store(data: ILktObject): this;
    reset(data: ILktObject): this;
    hasModifications(): boolean;
}
