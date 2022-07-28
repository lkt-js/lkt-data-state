import { ILktObject } from "lkt-tools";
import { IDataStateMixin } from "../interfaces/IDataStateMixin";
export declare const DataStateMixin: {
    data(): IDataStateMixin;
    watch: {
        '_lkt_dataState.changed'(v: string): void;
    };
    methods: {
        $preventStoreDataProps(props: string[]): void;
        $storeDataState(data?: ILktObject): void;
        $resetDataState(data?: ILktObject): void;
    };
};
