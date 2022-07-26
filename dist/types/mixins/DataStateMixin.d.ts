import { ILktObject } from "lkt-tools";
import { IDataStateMixin } from "../interfaces/IDataStateMixin";
export declare const DataStateMixin: {
    data(): IDataStateMixin;
    watch: {
        '_lkt_dataState.data'(v: string): void;
        _lkt_dataStateChanged(v: string): void;
    };
    methods: {
        $preventStoreProps(props: string[]): void;
        $storeState(data?: ILktObject): void;
        $resetState(data?: ILktObject): void;
    };
};
