import { LktObject } from 'lkt-ts-interfaces';

import { DataStateConfig } from '../types/DataStateConfig';
import { DataValue } from '../value-objects/DataValue';
import { PreventPropsValue } from '../value-objects/PreventPropsValue';
import { PreventTypesValue } from '../value-objects/PreventTypesValue';
import { OnlyPropsValue } from '../value-objects/OnlyPropsValue.ts';

export class DataState {
  private data: DataValue;
  private original: DataValue;
  private readonly onlyProps: OnlyPropsValue;
  private readonly preventProps: PreventPropsValue;
  private readonly preventTypes: PreventTypesValue;
  private readonly recursiveOnlyProps: boolean;
  private readonly recursivePreventProps: boolean;
  public isChanged: boolean;

  constructor(data: LktObject, config: DataStateConfig = {}) {
    this.onlyProps = new OnlyPropsValue(config.onlyProps);
    this.preventProps = new PreventPropsValue(config.preventProps);
    this.preventTypes = new PreventTypesValue(config.preventTypes);

    this.recursiveOnlyProps = typeof config.recursiveOnlyProps === 'boolean' ? config.recursiveOnlyProps : true;
    this.recursivePreventProps = typeof config.recursivePreventProps === 'boolean' ? config.recursivePreventProps : true;

    data = {...data};
    data = this.onlyProps.clear(data, this.recursiveOnlyProps);
    data = this.preventProps.clear(data, this.recursivePreventProps);
    data = this.preventTypes.clear(data);
    this.data = new DataValue({...data});
    this.original = new DataValue({...data});
    this.isChanged = this.changed();
  }

  store(data: LktObject) {
    data = {...data};
    data = this.onlyProps.clear(data, this.recursiveOnlyProps);
    data = this.preventProps.clear(data, this.recursivePreventProps);
    data = this.preventTypes.clear(data);
    this.data = new DataValue(data);
    this.isChanged = this.changed();
    return this;
  }

  increment(data: LktObject) {
    data = {...this.getData(), ...data};
    data = this.onlyProps.clear(data, this.recursiveOnlyProps);
    data = this.preventProps.clear(data, this.recursivePreventProps);
    data = this.preventTypes.clear(data);
    this.data = new DataValue(data);
    this.isChanged = this.changed();
    return this;
  }

  turnStoredIntoOriginal() {
    const data = this.getData();
    this.data = new DataValue({...data});
    this.original = new DataValue({...data});
    this.isChanged = this.changed();
    return this;
  }

  changed() {
    return this.original.isDifferent(this.data.getString());
  }

  differences() {
    return this.original.getDifferences(this.data.getObject());
  }

  getChangedProperties() {
    let differences = this.differences(),
      differencesKeys = [...Object.keys(differences.from), ...Object.keys(differences.to)];

    function onlyUnique(value: any, index: any, array: any) {
      return array.indexOf(value) === index;
    }
    return differencesKeys.filter(onlyUnique);
  }

  getData() {
    return this.data.getObject();
  }

  getOriginalData() {
    return this.original.getObject();
  }
}
