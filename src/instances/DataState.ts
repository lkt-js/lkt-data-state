import { LktObject } from 'lkt-ts-interfaces';

import { DataStateConfig } from '../types/DataStateConfig';
import { DataValue } from '../value-objects/DataValue';
import { PreventPropsValue } from '../value-objects/PreventPropsValue';
import { PreventTypesValue } from '../value-objects/PreventTypesValue';

export class DataState {
  private data: DataValue;
  private readonly original: DataValue;
  private readonly preventProps: PreventPropsValue;
  private readonly preventTypes: PreventTypesValue;
  public isChanged: boolean;

  constructor(data: LktObject, config: DataStateConfig = {}) {
    this.preventProps = new PreventPropsValue(config.preventProps);
    this.preventTypes = new PreventTypesValue(config.preventTypes);
    data = {...data};
    data = this.preventProps.clear(data);
    data = this.preventTypes.clear(data);
    this.data = new DataValue({...data});
    this.original = new DataValue({...data});
    this.isChanged = this.changed();
  }

  store(data: LktObject) {
    data = {...data};
    data = this.preventProps.clear(data);
    data = this.preventTypes.clear(data);
    this.data = new DataValue(data);
    this.isChanged = this.changed();
  }

  changed() {
    return this.original.isDifferent(this.data.getString());
  }

  differences() {
    return this.original.getDifferences(this.data.getObject());
  }
}
