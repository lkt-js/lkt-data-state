import { sortObjectProperties as _ } from "lkt-object-tools";
import { isDate as I, date as x } from "lkt-date-tools";
class j extends Error {
  constructor() {
    super(), this.name = "InvalidDatumError", this.message = "Datum not supported";
  }
}
class N {
  constructor(e) {
    Array.isArray(e) || (e = []), this.value = e;
  }
  parse() {
    const e = [];
    return this.value.forEach((r) => {
      try {
        e.push(new P(r).parse());
      } catch {
      }
    }), e;
  }
}
class P {
  constructor(e) {
    this.value = e;
  }
  parse() {
    if (this.value === null)
      return null;
    if (I(this.value) && !isNaN(this.value.valueOf()))
      return x("Y-m-d H:i:s", this.value);
    if (Array.isArray(this.value))
      try {
        return new N(this.value).parse();
      } catch {
      }
    if (typeof this.value == "object")
      return new A(this.value).parse();
    if (typeof this.value == "number")
      return String(this.value);
    if (typeof this.value == "string")
      return String(this.value);
    if (typeof this.value != "function")
      return this.value;
    throw new j();
  }
}
var T = Object.defineProperty, y = Object.getOwnPropertySymbols, V = Object.prototype.hasOwnProperty, C = Object.prototype.propertyIsEnumerable, g = (t, e, r) => e in t ? T(t, e, { enumerable: !0, configurable: !0, writable: !0, value: r }) : t[e] = r, F = (t, e) => {
  for (var r in e || (e = {}))
    V.call(e, r) && g(t, r, e[r]);
  if (y)
    for (var r of y(e))
      C.call(e, r) && g(t, r, e[r]);
  return t;
};
class A {
  constructor(e) {
    this.value = F({}, e);
  }
  parse() {
    if (!this.value)
      return {};
    const e = Object.keys(this.value);
    let r = {};
    return e.forEach((s) => {
      try {
        r[s] = new P(this.value[s]).parse();
      } catch {
      }
    }), r = _(r), r;
  }
}
class c {
  constructor(e) {
    e || (e = {}), e = new A(e).parse(), this.data = e, this.value = JSON.stringify(e);
  }
  isDifferent(e) {
    return this.value !== e;
  }
  getDifferences(e) {
    return this.fetchDifferences(this.getObject(), e);
  }
  getString() {
    return this.value;
  }
  getObject() {
    return this.data;
  }
  fetchDifferences(e, r) {
    let s = {}, a = {};
    if (typeof e != "object" || typeof r != "object")
      return { from: s, to: a };
    const f = Object.keys(e), E = Object.keys(r);
    let h = [...f, ...E];
    return h = h.filter((l, i, n) => n.indexOf(l) === i), h.forEach((l) => {
      let i = e[l], n = r[l];
      if (Array.isArray(i) && Array.isArray(n)) {
        if (i.length === 0 && n.length === 0)
          return;
        let o = !1;
        i.forEach((S, $) => {
          n[$] !== S && (o = !0);
        }), o && (s[l] = i, a[l] = n);
        return;
      } else if (Array.isArray(i) && !Array.isArray(n)) {
        s[l] = i, a[l] = n;
        return;
      } else if (!Array.isArray(i) && Array.isArray(n)) {
        s[l] = i, a[l] = n;
        return;
      }
      const p = typeof i == "object", v = typeof n == "object";
      if (p && v) {
        const o = this.fetchDifferences(i, n);
        i = o.from, n = o.to;
      } else
        p ? i = this.fetchDifferences(i, n).from : v && (n = this.fetchDifferences(i, n).to);
      i !== n && (s[l] = i, a[l] = n);
    }), s = this.clearEmpties(s), a = this.clearEmpties(a), { from: s, to: a };
  }
  clearEmpties(e) {
    for (const r in e)
      !e[r] || typeof e[r] != "object" || (this.clearEmpties(e[r]), Object.keys(e[r]).length === 0 && delete e[r]);
    return e;
  }
}
class K {
  constructor(e) {
    e || (e = []), this.value = e;
  }
  clear(e) {
    return typeof e > "u" || e === null ? {} : (this.value.length === 0 || typeof e != "object" || Object.keys(e).forEach((r) => {
      this.value.includes(r) && delete e[r], typeof e[r] == "object" && (e[r] = this.clear(e[r]));
    }), e);
  }
}
class B {
  constructor(e) {
    let r;
    e === null ? r = "null" : Array.isArray(e) ? r = "array" : (r = typeof e, r = r.toLowerCase()), this.value = r;
  }
  included(e) {
    return e.includes(this.value);
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
}
class H {
  constructor(e) {
    this.value = e;
  }
  filter(e) {
    const r = [];
    return this.value.forEach((s) => {
      try {
        r.push(new D(s).filter(e));
      } catch {
      }
    }), r;
  }
}
class D {
  constructor(e) {
    this.value = e, this.type = new B(e);
  }
  filter(e) {
    if (this.type.included(e))
      throw new j();
    return this.type.isArray() ? new H(this.value).filter(e) : this.type.isObject() ? new d(this.value).filter(e) : this.value;
  }
}
var J = Object.defineProperty, O = Object.getOwnPropertySymbols, L = Object.prototype.hasOwnProperty, U = Object.prototype.propertyIsEnumerable, b = (t, e, r) => e in t ? J(t, e, { enumerable: !0, configurable: !0, writable: !0, value: r }) : t[e] = r, Y = (t, e) => {
  for (var r in e || (e = {}))
    L.call(e, r) && b(t, r, e[r]);
  if (O)
    for (var r of O(e))
      U.call(e, r) && b(t, r, e[r]);
  return t;
};
class d {
  constructor(e) {
    this.value = Y({}, e);
  }
  filter(e) {
    if (!this.value)
      return {};
    const r = Object.keys(this.value);
    let s = {};
    return r.forEach((a) => {
      try {
        s[a] = new D(this.value[a]).filter(e);
      } catch {
      }
    }), s = _(s), s;
  }
}
class q {
  constructor(e) {
    e || (e = []), this.value = e;
  }
  clear(e) {
    return this.value.length === 0 ? e : new d(e).filter(this.value);
  }
}
var z = Object.defineProperty, m = Object.getOwnPropertySymbols, G = Object.prototype.hasOwnProperty, M = Object.prototype.propertyIsEnumerable, w = (t, e, r) => e in t ? z(t, e, { enumerable: !0, configurable: !0, writable: !0, value: r }) : t[e] = r, u = (t, e) => {
  for (var r in e || (e = {}))
    G.call(e, r) && w(t, r, e[r]);
  if (m)
    for (var r of m(e))
      M.call(e, r) && w(t, r, e[r]);
  return t;
};
class W {
  constructor(e, r = {}) {
    this.preventProps = new K(r.preventProps), this.preventTypes = new q(r.preventTypes), e = u({}, e), e = this.preventProps.clear(e), e = this.preventTypes.clear(e), this.data = new c(u({}, e)), this.original = new c(u({}, e)), this.isChanged = this.changed();
  }
  store(e) {
    return e = u({}, e), e = this.preventProps.clear(e), e = this.preventTypes.clear(e), this.data = new c(e), this.isChanged = this.changed(), this;
  }
  increment(e) {
    return e = u(u({}, this.getData()), e), e = this.preventProps.clear(e), e = this.preventTypes.clear(e), this.data = new c(e), this.isChanged = this.changed(), this;
  }
  turnStoredIntoOriginal() {
    const e = this.getData();
    return this.data = new c(u({}, e)), this.original = new c(u({}, e)), this.isChanged = this.changed(), this;
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
}
export {
  W as DataState
};
