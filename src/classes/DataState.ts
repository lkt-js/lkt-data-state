import {cloneString, ILktObject, isFilled} from "lkt-tools";
import {parseData} from "../functions/data-state-functions";

export class DataState {

    data: string = '';
    originalData: string = '';
    removeDataProps: string[] = [];
    changed: boolean = false;

    preventStoreProps (props: string[]) {
        this.removeDataProps = props;
        return this;
    }

    store(data: ILktObject) {
        if (!isFilled(this.originalData)) {
            return this.reset(data);
        }
        this.data = parseData(data, this.removeDataProps);
        this.changed = this.data !== this.originalData;
        return this;
    }

    reset(data: ILktObject) {
        let parsed = parseData(data, this.removeDataProps);
        this.data = cloneString(parsed);
        this.originalData = parsed;
        return this;
    }

    hasModifications() {
        return this.data !== this.originalData;
    }
}