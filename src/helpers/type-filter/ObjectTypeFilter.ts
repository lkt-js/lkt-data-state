import { sortObjectProperties } from 'lkt-object-tools';
import { LktObject } from 'lkt-ts-interfaces';

import { PreventType } from '../../types/PreventType';
import { DatumTypeFilter } from './DatumTypeFilter';

export class ObjectTypeFilter {
  private readonly value: LktObject;

  constructor(value: LktObject) {
    this.value = { ...value };
  }

  filter(preventTypes: PreventType[]) {
    if (!this.value) {
      return {};
    }

    const keys = Object.keys(this.value);

    let r: LktObject = {};
    keys.forEach((key) => {
      try {
        r[key] = new DatumTypeFilter(this.value[key]).filter(preventTypes);
      } catch (e) {
        // nothing to do here
      }
    });

    r = sortObjectProperties(r);
    return r;
  }
}
