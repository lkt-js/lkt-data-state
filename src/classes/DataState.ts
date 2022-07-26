import {date, ILktObject, isArray, isFunction, isNumeric, isObject, sortObject} from "lkt-tools";

export class DataState {

    data: string = '';
    originalData: string = '';
    removeDataProps: string[] = [];

    preventStoreProps (props: string[]) {
        this.removeDataProps = props;
        return this;
    }

    parseData(data: ILktObject) {

        data = JSON.parse(JSON.stringify(data));

        if (this.removeDataProps.length > 0) {
            this.removeDataProps.forEach(z => {
                data.hasOwnProperty(z) && delete data[z];
            });
        }

        let r: ILktObject = {};

        for (let k in data) {
            if (data.hasOwnProperty(k) && data[k] !== null) {

                if (data[k] instanceof Date) {
                    if (!isNaN(data[k].valueOf())) {
                        r[k] = date('Y-m-d H:i:s', data[k]);
                    }

                } else if (isObject(data[k])) {
                    r[k] = this.parseData(data[k]);

                } else if (isArray(data[k])) {
                    let tmp: Array<any> = [];
                    data[k].forEach((z: any) => {
                        tmp.push(this.parseData(z));
                    });
                    r[k] = tmp;

                } else if (isNumeric(data[k])) {
                    r[k] = String(data[k]);

                } else if (!isFunction(data[k])) {
                    r[k] = data[k];
                }
            }
        }

        r = sortObject(r);
        return JSON.stringify(r);
    }

    store(data: ILktObject) {
        this.data = this.parseData(data);
        return this;
    }

    reset(data: ILktObject) {
        this.data = this.parseData(data);
        this.originalData = this.parseData(data);
        return this;
    }

    hasModifications() {
        return this.data !== this.originalData;
    }
}