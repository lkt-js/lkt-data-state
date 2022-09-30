import { sortObjectProperties } from 'lkt-object-tools';
import { LktObject } from 'lkt-ts-interfaces';

import { DatumParser } from './DatumParser';

export class ObjectParser {
  private readonly value: LktObject;

  constructor(value: LktObject) {
    this.value = { ...value };
  }

  parse() {
    if (!this.value) {
      return {};
    }

    const keys = Object.keys(this.value);

    let r: LktObject = {};
    keys.forEach((key) => {
      try {
        r[key] = new DatumParser(this.value[key]).parse();
      } catch (e) {
        // nothing to do here
      }
    });

    r = sortObjectProperties(r);
    return r;
  }
}
