import {DataState} from "../classes/DataState";
import {ILktObject} from "lkt-tools";
import {IDataStateMixin} from "../interfaces/IDataStateMixin";

export const DataStateMixin = {
    data(): IDataStateMixin {
        return {
            _lkt_dataState: new DataState(),
            _lkt_dataStateChanged: false,
        }
    },
    watch: {
        '_lkt_dataState.data'(v: string) {
            this._lkt_dataStateChanged = this.modifiedDataController.hasModifications();
        },
        _lkt_dataStateChanged(v: string) {
            this.$emit('data-state-changed', v);
        },
    },
    methods: {
        $preventStoreDataProps(props: string[]) {
            this._lkt_dataState.preventStoreProps(props);
        },
        $storeDataState(data: ILktObject = {}) {
            this._lkt_dataState.store(data);
        },
        $resetDataState(data: ILktObject = {}) {
            this._lkt_dataState.reset(data);
        }
    }
};
