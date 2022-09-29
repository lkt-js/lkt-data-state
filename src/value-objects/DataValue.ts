import { date, isDate } from 'lkt-date-tools';
import { sortObjectProperties } from 'lkt-object-tools';
import { LktObject } from 'lkt-ts-interfaces';

import {DataDifferences} from "../types/DataDifferences";

export class DataValue {
  private readonly value: string;
  private readonly data: LktObject;

  constructor(value?: LktObject) {
    if (!value) {
      value = {};
    }
    this.data = value;
    this.value = this.parseData(value);
  }

  isDifferent(value: string) {
    return this.value !== value;
  }

  getDifferences(compared: LktObject): DataDifferences {
    return this.fetchDifferences(this.getObject(), compared);
  }

  getString() {
    return this.value;
  }

  getObject() {
    return this.data;
  }


  private fetchDifferences(original: LktObject, compared: LktObject): DataDifferences {
    const from: LktObject = {}, to: LktObject = {};

    const fromKeys = Object.keys(original);
    const toKeys = Object.keys(compared);

    let allKeys = [...fromKeys, ...toKeys];
    allKeys = allKeys.filter((value, index, self) => {
      return self.indexOf(value) === index;
    });

    allKeys.forEach(key => {
      let a = original[key];
      let b = compared[key];

      if (Array.isArray(a) && Array.isArray(b)) {

        if (a.length === 0 && b.length === 0) {
          return;
        }

        let includeArrays = false;
        a.forEach((value, index) => {
          if (b[index] !== value) {
            includeArrays = true;
          }
        })

        if (includeArrays) {
          from[key] = a;
          to[key] = b;
        }
        return;
      } else if (Array.isArray(a) && !Array.isArray(b)) {
        from[key] = a;
        to[key] = b;
        return;

      } else if (!Array.isArray(a) && Array.isArray(b)) {
        console.log('case c')
        from[key] = a;
        to[key] = b;
        return;
      }

      const isObjectA = typeof a === 'object',
          isObjectB = typeof b === 'object';

      if (isObjectA && isObjectB) {
        const aux = this.fetchDifferences(a, b);
        a = aux.from;
        b = aux.to;

      } else if (isObjectA) {
        const aux = this.fetchDifferences(a, b);
        a = aux.from;
      } else if (isObjectB) {
        const aux = this.fetchDifferences(a, b);
        b = aux.to;
      }

      if (a !== b) {
        from[key] = a;
        to[key] = b;
      }
    });

    return {from, to};
  }

  private parseDatum(datum: any) {
    if (isDate(datum) && !isNaN(datum.valueOf())) {
      return date('Y-m-d H:i:s', datum);
    }

    if (Array.isArray(datum)) {
      const tmp: any[] = [];
      datum.forEach((z: any) => {
        const z1 = this.parseDatum(z);
        if (z1 !== null) {
          tmp.push(z1);
        }
      });
      return tmp;
    }

    if (typeof datum === 'object') {
      return this.parseData(datum);
    }

    if (typeof datum === 'number') {
      return String(datum);
    }

    if (typeof datum !== 'function') {
      return datum;
    }

    return null;
  }

  private parseData(data: LktObject) {
    data = JSON.parse(JSON.stringify(data));

    if (!data) {
      return JSON.stringify({});
    }

    const keys = Object.keys(data);

    let r: LktObject = {};
    keys.forEach((key) => {
      const datum = this.parseDatum(data[key]);
      if (datum !== null) {
        r[key] = datum;
      }
    });

    r = sortObjectProperties(r);
    return JSON.stringify(r);
  }
}