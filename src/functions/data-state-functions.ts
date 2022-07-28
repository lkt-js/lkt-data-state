import {date, ILktObject, isArray, isDate, isFunction, isNumeric, isObject, sortObject} from "lkt-tools";

export const parseDatum = (datum: any, preventStoreProps: string[] = []) => {
    if (isDate(datum) && !isNaN(datum.valueOf())) {
        return date('Y-m-d H:i:s', datum);
    }

    if (isObject(datum)) {
        return parseData(datum, preventStoreProps);
    }

    if (isArray(datum)) {
        let tmp: string[] = [];
        datum.forEach((z: any) => {
            let z1 = parseDatum(z, preventStoreProps);
            if (z1 !== null) {
                tmp.push(z1);
            }
        });
        return tmp;
    }

    if (isNumeric(datum)) {
        return String(datum);
    }

    if (!isFunction(datum)) {
        return datum;
    }

    return null;
}

export const parseData = (data: ILktObject, preventStoreProps: string[] = []) => {

    data = JSON.parse(JSON.stringify(data));

    if (preventStoreProps.length > 0) {
        preventStoreProps.forEach(z => {
            data.hasOwnProperty(z) && delete data[z];
        });
    }

    let r: ILktObject = {};

    for (let k in data) {
        if (data.hasOwnProperty(k) && data[k] !== null) {

            let datum = parseDatum(data[k], preventStoreProps);
            if (datum !== null) {
                r[k] = datum;
            }

            // if (data[k] instanceof Date) {
            //     if (!isNaN(data[k].valueOf())) {
            //         r[k] = date('Y-m-d H:i:s', data[k]);
            //     }
            //
            // } else if (isObject(data[k])) {
            //     r[k] = parseData(data[k], preventStoreProps);
            //
            // } else if (isArray(data[k])) {
            //     let tmp: string[] = [];
            //     data[k].forEach((z: any) => {
            //         tmp.push(parseData(z, preventStoreProps));
            //     });
            //     r[k] = tmp;
            //
            // } else if (isNumeric(data[k])) {
            //     r[k] = String(data[k]);
            //
            // } else if (!isFunction(data[k])) {
            //     r[k] = data[k];
            // }
        }
    }

    r = sortObject(r);
    return JSON.stringify(r);
}