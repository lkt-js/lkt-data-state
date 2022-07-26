import { DataState } from "../classes/DataState";
export interface IDataStateMixin {
    _lkt_dataState: DataState;
    _lkt_dataStateChanged: boolean;
}
