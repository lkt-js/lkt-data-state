import { sortObjectProperties } from 'lkt-object-tools';
import { LktObject } from 'lkt-ts-interfaces';

import { DatumParser } from './DatumParser';
import { ParserConfig } from '../../types/ParserConfig.ts';

export class ObjectParser {
  private readonly value: LktObject;
  private readonly config: ParserConfig;

  constructor(value: LktObject, config: ParserConfig = {}) {
    this.value = { ...value };
    this.config = config
  }

  parse() {
    if (!this.value) {
      return {};
    }

    const keys = Object.keys(this.value);

    let r: LktObject = {};
    keys.forEach((key) => {
      try {
        r[key] = new DatumParser(this.value[key], this.config).parse();
      } catch (e) {
        // nothing to do here
      }
    });

    r = sortObjectProperties(r);
    return r;
  }
}
