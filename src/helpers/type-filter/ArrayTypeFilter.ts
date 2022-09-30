import { PreventType } from '../../types/PreventType';
import {DatumTypeFilter} from "./DatumTypeFilter";

export class ArrayTypeFilter {
  private readonly value: any[];

  constructor(value: any[]) {
    this.value = value;
  }

  filter(preventTypes: PreventType[]) {
    const tmp: any[] = [];
    this.value.forEach((z: any) => {
      try {
        tmp.push(new DatumTypeFilter(z).filter(preventTypes));
      } catch (e) {
        // nothing
      }
    });
    return tmp;
  }
}