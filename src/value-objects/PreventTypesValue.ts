import { LktObject } from 'lkt-ts-interfaces';

import { PreventType } from '../types/PreventType';

export class PreventTypesValue {
  private readonly value: PreventType[];

  constructor(value?: PreventType[]) {
    if (!value) {
      value = [];
    }
    this.value = value;
  }

  clear(data: LktObject) {
    if (this.value.length === 0) {
      return data;
    }

    this.value.forEach((preventType) => {
      Object.keys(data).forEach((key: string) => {
        const type: string = this.getDatumType(data[key]);

        // Remove root level
        if (this.canBeRemoved(preventType, type)) {
          delete data[key];
        }

        if (type === 'array') {
          let tmp = this.clearArray(data[key], preventType);
          if (typeof tmp === 'object') {
            tmp = Object.values(tmp);
          }

          data[key] = tmp;
        }

        // Recursive remove
        if (typeof data[key] === 'object') {
          data[key] = this.clear(data[key]);
        }
      });
    });

    return data;
  }

  private clearArray(arr: any[], preventType: PreventType) {
    const r: any[] = [];

    arr.forEach((z) => {
      if (!this.canBeRemoved(preventType, this.getDatumType(z))) {
        if (Array.isArray(z)) {
          r.push(this.clearArray(z, preventType));
        } else if (typeof z === 'object') {
          r.push(this.clear(z));
        } else {
          r.push(z);
        }
      }
    });

    return r;
  }

  private getDatumType(datum: any) {
    let type: string;

    if (datum === null) {
      type = 'null';
    } else if (Array.isArray(datum)) {
      type = 'array';
    } else {
      type = typeof datum;
      type = type.toLowerCase();
    }

    return type;
  }

  private canBeRemoved(preventType: PreventType, type: string) {
    return preventType === type;
  }
}
