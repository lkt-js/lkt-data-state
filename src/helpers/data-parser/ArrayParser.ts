import { DatumParser } from './DatumParser';
import { ParserConfig } from '../../types/ParserConfig.ts';

export class ArrayParser {
  private readonly value: any[];
  private readonly config: ParserConfig;

  constructor(value: any[], config: ParserConfig = {}) {
    if (!Array.isArray(value)) {
      value = [];
    }
    this.value = value;
    this.config = config;
  }

  parse() {
    const tmp: any[] = [];
    this.value.forEach((z: any) => {
      try {
        tmp.push(new DatumParser(z, this.config).parse());
      } catch (e) {
        // nothing
      }
    });
    return tmp;
  }
}
