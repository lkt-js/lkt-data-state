import { DatumParser } from './DatumParser';

export class ArrayParser {
  private readonly value: any[];

  constructor(value: any[]) {
    if (!Array.isArray(value)) {
      value = [];
    }
    this.value = value;
  }

  parse() {
    const tmp: any[] = [];
    this.value.forEach((z: any) => {
      try {
        tmp.push(new DatumParser(z).parse());
      } catch (e) {
        // nothing
      }
    });
    return tmp;
  }
}
