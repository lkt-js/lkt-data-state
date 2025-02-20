// src/helpers/data-parser/ObjectParser.ts
import { sortObjectProperties } from "lkt-object-tools";

// src/helpers/data-parser/DatumParser.ts
import { date, isDate } from "lkt-date-tools";

// src/errors/InvalidDatumError.ts
var InvalidDatumError = class extends Error {
  constructor() {
    super();
    this.name = "InvalidDatumError";
    this.message = "Datum not supported";
  }
};

// src/helpers/data-parser/ArrayParser.ts
var ArrayParser = class {
  value;
  constructor(value) {
    if (!Array.isArray(value)) {
      value = [];
    }
    this.value = value;
  }
  parse() {
    const tmp = [];
    this.value.forEach((z) => {
      try {
        tmp.push(new DatumParser(z).parse());
      } catch (e) {
      }
    });
    return tmp;
  }
};

// src/helpers/data-parser/DatumParser.ts
var DatumParser = class {
  value;
  constructor(value) {
    this.value = value;
  }
  parse() {
    if (this.value === null) {
      return null;
    }
    if (isDate(this.value) && !isNaN(this.value.valueOf())) {
      return date("Y-m-d H:i:s", this.value);
    }
    if (Array.isArray(this.value)) {
      try {
        return new ArrayParser(this.value).parse();
      } catch (e) {
      }
    }
    if (typeof this.value === "object") {
      return new ObjectParser(this.value).parse();
    }
    if (typeof this.value === "number") {
      return String(this.value);
    }
    if (typeof this.value === "string") {
      return String(this.value);
    }
    if (typeof this.value !== "function") {
      return this.value;
    }
    throw new InvalidDatumError();
  }
};

// src/helpers/data-parser/ObjectParser.ts
var ObjectParser = class {
  value;
  constructor(value) {
    this.value = { ...value };
  }
  parse() {
    if (!this.value) {
      return {};
    }
    const keys = Object.keys(this.value);
    let r = {};
    keys.forEach((key) => {
      try {
        r[key] = new DatumParser(this.value[key]).parse();
      } catch (e) {
      }
    });
    r = sortObjectProperties(r);
    return r;
  }
};

// src/value-objects/DataValue.ts
var DataValue = class {
  value;
  data;
  constructor(value) {
    if (!value) {
      value = {};
    }
    value = new ObjectParser(value).parse();
    this.data = value;
    this.value = JSON.stringify(value);
  }
  isDifferent(value) {
    return this.value !== value;
  }
  getDifferences(compared) {
    return this.fetchDifferences(this.getObject(), compared);
  }
  getString() {
    return this.value;
  }
  getObject() {
    return this.data;
  }
  fetchDifferences(original, compared) {
    let from = {}, to = {};
    if (typeof original !== "object" || typeof compared !== "object") {
      return { from, to };
    }
    const fromKeys = Object.keys(original);
    const toKeys = Object.keys(compared);
    let allKeys = [...fromKeys, ...toKeys];
    allKeys = allKeys.filter((value, index, self) => {
      return self.indexOf(value) === index;
    });
    allKeys.forEach((key) => {
      let a = original[key];
      let b = compared[key];
      if (Array.isArray(a) && Array.isArray(b)) {
        if (a.length === 0 && b.length === 0) {
          return;
        }
        let includeArrays = false;
        a.forEach((value, index) => {
          if (b[index] !== value) {
            includeArrays = true;
          }
        });
        if (includeArrays) {
          from[key] = a;
          to[key] = b;
        }
        return;
      } else if (Array.isArray(a) && !Array.isArray(b)) {
        from[key] = a;
        to[key] = b;
        return;
      } else if (!Array.isArray(a) && Array.isArray(b)) {
        from[key] = a;
        to[key] = b;
        return;
      }
      const isObjectA = typeof a === "object", isObjectB = typeof b === "object";
      if (isObjectA && isObjectB) {
        const aux = this.fetchDifferences(a, b);
        a = aux.from;
        b = aux.to;
      } else if (isObjectA) {
        const aux = this.fetchDifferences(a, b);
        a = aux.from;
      } else if (isObjectB) {
        const aux = this.fetchDifferences(a, b);
        b = aux.to;
      }
      if (a !== b) {
        from[key] = a;
        to[key] = b;
      }
    });
    from = this.clearEmpties(from);
    to = this.clearEmpties(to);
    return { from, to };
  }
  clearEmpties(o) {
    for (const k in o) {
      if (!o[k] || typeof o[k] !== "object") {
        continue;
      }
      this.clearEmpties(o[k]);
      if (Object.keys(o[k]).length === 0) {
        delete o[k];
      }
    }
    return o;
  }
};

// src/value-objects/PreventPropsValue.ts
var PreventPropsValue = class {
  value;
  constructor(value) {
    if (!value) {
      value = [];
    }
    this.value = value;
  }
  clear(data) {
    if (typeof data === "undefined" || data === null) {
      return {};
    }
    if (this.value.length === 0) {
      return data;
    }
    if (typeof data !== "object") {
      return data;
    }
    Object.keys(data).forEach((key) => {
      if (this.value.includes(key)) {
        delete data[key];
      }
      if (typeof data[key] === "object") {
        data[key] = this.clear(data[key]);
      }
    });
    return data;
  }
};

// src/helpers/type-filter/ObjectTypeFilter.ts
import { sortObjectProperties as sortObjectProperties2 } from "lkt-object-tools";

// src/helpers/DatumType.ts
var DatumType = class {
  value;
  constructor(datum) {
    let type;
    if (datum === null) {
      type = "null";
    } else if (Array.isArray(datum)) {
      type = "array";
    } else {
      type = typeof datum;
      type = type.toLowerCase();
    }
    this.value = type;
  }
  included(haystack) {
    return haystack.includes(this.value);
  }
  isArray() {
    return this.value === "array";
  }
  isNull() {
    return this.value === "null";
  }
  isNumber() {
    return this.value === "number";
  }
  isString() {
    return this.value === "string";
  }
  isBoolean() {
    return this.value === "boolean";
  }
  isUndefined() {
    return this.value === "undefined";
  }
  isObject() {
    return this.value === "object";
  }
  isFunction() {
    return this.value === "function";
  }
};

// src/helpers/type-filter/ArrayTypeFilter.ts
var ArrayTypeFilter = class {
  value;
  constructor(value) {
    this.value = value;
  }
  filter(preventTypes) {
    const tmp = [];
    this.value.forEach((z) => {
      try {
        tmp.push(new DatumTypeFilter(z).filter(preventTypes));
      } catch (e) {
      }
    });
    return tmp;
  }
};

// src/helpers/type-filter/DatumTypeFilter.ts
var DatumTypeFilter = class {
  value;
  type;
  constructor(value) {
    this.value = value;
    this.type = new DatumType(value);
  }
  filter(preventTypes) {
    if (this.type.included(preventTypes)) {
      throw new InvalidDatumError();
    }
    if (this.type.isArray()) {
      return new ArrayTypeFilter(this.value).filter(preventTypes);
    }
    if (this.type.isObject()) {
      return new ObjectTypeFilter(this.value).filter(preventTypes);
    }
    return this.value;
  }
};

// src/helpers/type-filter/ObjectTypeFilter.ts
var ObjectTypeFilter = class {
  value;
  constructor(value) {
    this.value = { ...value };
  }
  filter(preventTypes) {
    if (!this.value) {
      return {};
    }
    const keys = Object.keys(this.value);
    let r = {};
    keys.forEach((key) => {
      try {
        r[key] = new DatumTypeFilter(this.value[key]).filter(preventTypes);
      } catch (e) {
      }
    });
    r = sortObjectProperties2(r);
    return r;
  }
};

// src/value-objects/PreventTypesValue.ts
var PreventTypesValue = class {
  value;
  constructor(value) {
    if (!value) {
      value = [];
    }
    this.value = value;
  }
  clear(data) {
    if (this.value.length === 0) {
      return data;
    }
    return new ObjectTypeFilter(data).filter(this.value);
  }
};

// src/instances/DataState.ts
var DataState = class {
  data;
  original;
  preventProps;
  preventTypes;
  isChanged;
  constructor(data, config = {}) {
    this.preventProps = new PreventPropsValue(config.preventProps);
    this.preventTypes = new PreventTypesValue(config.preventTypes);
    data = { ...data };
    data = this.preventProps.clear(data);
    data = this.preventTypes.clear(data);
    this.data = new DataValue({ ...data });
    this.original = new DataValue({ ...data });
    this.isChanged = this.changed();
  }
  store(data) {
    data = { ...data };
    data = this.preventProps.clear(data);
    data = this.preventTypes.clear(data);
    this.data = new DataValue(data);
    this.isChanged = this.changed();
    return this;
  }
  increment(data) {
    data = { ...this.getData(), ...data };
    data = this.preventProps.clear(data);
    data = this.preventTypes.clear(data);
    this.data = new DataValue(data);
    this.isChanged = this.changed();
    return this;
  }
  turnStoredIntoOriginal() {
    const data = this.getData();
    this.data = new DataValue({ ...data });
    this.original = new DataValue({ ...data });
    this.isChanged = this.changed();
    return this;
  }
  changed() {
    return this.original.isDifferent(this.data.getString());
  }
  differences() {
    return this.original.getDifferences(this.data.getObject());
  }
  getData() {
    return this.data.getObject();
  }
  getOriginalData() {
    return this.original.getObject();
  }
};
export {
  DataState
};
