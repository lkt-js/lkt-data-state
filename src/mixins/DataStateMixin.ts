import {DataState} from "../classes/DataState";
import {ILktObject} from "lkt-tools";
import {IDataStateMixin} from "../interfaces/IDataStateMixin";

export const DataStateMixin = {
    data(): IDataStateMixin {
        return {
            _lkt_dataState: null
        }
    },
    computed: {
        $hasModifiedDataStored(){
            if (!this._lkt_dataState) {
                return false;
            }
            return this._lkt_dataState.changed === true;
        }
    },
    watch: {
        '_lkt_dataState.changed'(v: string) {
            this.$emit('data-state-changed', v);
        },
    },
    methods: {
        $preventStoreDataProps(props: string[]) {
            if (!this._lkt_dataState) {
                this._lkt_dataState = new DataState();
            }
            this._lkt_dataState.preventStoreProps(props);
        },
        $storeDataState(data: ILktObject = {}) {
            if (!this._lkt_dataState) {
                this._lkt_dataState = new DataState();
            }
            this._lkt_dataState.store(data);
        },
        $resetDataState(data: ILktObject = {}) {
            if (!this._lkt_dataState) {
                this._lkt_dataState = new DataState();
            }
            this._lkt_dataState.reset(data);
        }
    },
};
