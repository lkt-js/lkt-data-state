import { sortObjectProperties as g } from "lkt-object-tools";
import { isDate as N, date as x } from "lkt-date-tools";
class P extends Error {
  constructor() {
    super(), this.name = "InvalidDatumError", this.message = "Datum not supported";
  }
}
class I {
  constructor(r) {
    Array.isArray(r) || (r = []), this.value = r;
  }
  parse() {
    const r = [];
    return this.value.forEach((e) => {
      try {
        r.push(new j(e).parse());
      } catch {
      }
    }), r;
  }
}
class j {
  constructor(r) {
    this.value = r;
  }
  parse() {
    if (this.value === null)
      return null;
    if (N(this.value) && !isNaN(this.value.valueOf()))
      return x("Y-m-d H:i:s", this.value);
    if (Array.isArray(this.value))
      try {
        return new I(this.value).parse();
      } catch {
      }
    if (typeof this.value == "object")
      return new A(this.value).parse();
    if (typeof this.value == "number")
      return Number(this.value);
    if (typeof this.value == "string")
      return String(this.value);
    if (typeof this.value != "function")
      return this.value;
    throw new P();
  }
}
var T = Object.defineProperty, y = Object.getOwnPropertySymbols, V = Object.prototype.hasOwnProperty, F = Object.prototype.propertyIsEnumerable, O = (t, r, e) => r in t ? T(t, r, { enumerable: !0, configurable: !0, writable: !0, value: e }) : t[r] = e, C = (t, r) => {
  for (var e in r || (r = {}))
    V.call(r, e) && O(t, e, r[e]);
  if (y)
    for (var e of y(r))
      F.call(r, e) && O(t, e, r[e]);
  return t;
};
class A {
  constructor(r) {
    this.value = C({}, r);
  }
  parse() {
    if (!this.value)
      return {};
    const r = Object.keys(this.value);
    let e = {};
    return r.forEach((n) => {
      try {
        e[n] = new j(this.value[n]).parse();
      } catch {
      }
    }), e = g(e), e;
  }
}
class f {
  constructor(r) {
    r || (r = {}), r = new A(r).parse(), this.data = r, this.value = JSON.stringify(r);
  }
  isDifferent(r) {
    return this.value !== r;
  }
  getDifferences(r) {
    return this.fetchDifferences(this.getObject(), r);
  }
  getString() {
    return this.value;
  }
  getObject() {
    return this.data;
  }
  fetchDifferences(r, e) {
    const n = {}, u = {}, h = Object.keys(r), E = Object.keys(e);
    let c = [...h, ...E];
    return c = c.filter((a, s, i) => i.indexOf(a) === s), c.forEach((a) => {
      let s = r[a], i = e[a];
      if (Array.isArray(s) && Array.isArray(i)) {
        if (s.length === 0 && i.length === 0)
          return;
        let l = !1;
        s.forEach((S, $) => {
          i[$] !== S && (l = !0);
        }), l && (n[a] = s, u[a] = i);
        return;
      } else if (Array.isArray(s) && !Array.isArray(i)) {
        n[a] = s, u[a] = i;
        return;
      } else if (!Array.isArray(s) && Array.isArray(i)) {
        n[a] = s, u[a] = i;
        return;
      }
      const p = typeof s == "object", v = typeof i == "object";
      if (p && v) {
        const l = this.fetchDifferences(s, i);
        s = l.from, i = l.to;
      } else
        p ? s = this.fetchDifferences(s, i).from : v && (i = this.fetchDifferences(s, i).to);
      s !== i && (n[a] = s, u[a] = i);
    }), { from: n, to: u };
  }
}
class K {
  constructor(r) {
    r || (r = []), this.value = r;
  }
  clear(r) {
    return this.value.length === 0 || Object.keys(r).forEach((e) => {
      this.value.includes(e) && delete r[e], typeof r[e] == "object" && (r[e] = this.clear(r[e]));
    }), r;
  }
}
class B {
  constructor(r) {
    let e;
    r === null ? e = "null" : Array.isArray(r) ? e = "array" : (e = typeof r, e = e.toLowerCase()), this.value = e;
  }
  included(r) {
    return r.includes(this.value);
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
  constructor(r) {
    this.value = r;
  }
  filter(r) {
    const e = [];
    return this.value.forEach((n) => {
      try {
        e.push(new d(n).filter(r));
      } catch {
      }
    }), e;
  }
}
class d {
  constructor(r) {
    this.value = r, this.type = new B(r);
  }
  filter(r) {
    if (this.type.included(r))
      throw new P();
    return this.type.isArray() ? new H(this.value).filter(r) : this.type.isObject() ? new D(this.value).filter(r) : this.value;
  }
}
var J = Object.defineProperty, m = Object.getOwnPropertySymbols, L = Object.prototype.hasOwnProperty, U = Object.prototype.propertyIsEnumerable, w = (t, r, e) => r in t ? J(t, r, { enumerable: !0, configurable: !0, writable: !0, value: e }) : t[r] = e, Y = (t, r) => {
  for (var e in r || (r = {}))
    L.call(r, e) && w(t, e, r[e]);
  if (m)
    for (var e of m(r))
      U.call(r, e) && w(t, e, r[e]);
  return t;
};
class D {
  constructor(r) {
    this.value = Y({}, r);
  }
  filter(r) {
    if (!this.value)
      return {};
    const e = Object.keys(this.value);
    let n = {};
    return e.forEach((u) => {
      try {
        n[u] = new d(this.value[u]).filter(r);
      } catch {
      }
    }), n = g(n), n;
  }
}
class q {
  constructor(r) {
    r || (r = []), this.value = r;
  }
  clear(r) {
    return this.value.length === 0 ? r : new D(r).filter(this.value);
  }
}
var z = Object.defineProperty, _ = Object.getOwnPropertySymbols, G = Object.prototype.hasOwnProperty, M = Object.prototype.propertyIsEnumerable, b = (t, r, e) => r in t ? z(t, r, { enumerable: !0, configurable: !0, writable: !0, value: e }) : t[r] = e, o = (t, r) => {
  for (var e in r || (r = {}))
    G.call(r, e) && b(t, e, r[e]);
  if (_)
    for (var e of _(r))
      M.call(r, e) && b(t, e, r[e]);
  return t;
};
class W {
  constructor(r, e = {}) {
    this.preventProps = new K(e.preventProps), this.preventTypes = new q(e.preventTypes), r = o({}, r), r = this.preventProps.clear(r), r = this.preventTypes.clear(r), this.data = new f(o({}, r)), this.original = new f(o({}, r)), this.isChanged = this.changed();
  }
  store(r) {
    r = o({}, r), r = this.preventProps.clear(r), r = this.preventTypes.clear(r), this.data = new f(r), this.isChanged = this.changed();
  }
  changed() {
    return this.original.isDifferent(this.data.getString());
  }
  differences() {
    return this.original.getDifferences(this.data.getObject());
  }
}
export {
  W as DataState
};
