import { LktObject } from 'lkt-ts-interfaces';

import {ObjectTypeFilter} from "../helpers/type-filter/ObjectTypeFilter";
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

    return new ObjectTypeFilter(data).filter(this.value);
  }
}
