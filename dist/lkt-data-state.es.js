import { sortObjectProperties as g } from "lkt-object-tools";
import { isDate as x, date as I } from "lkt-date-tools";
class P extends Error {
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
        e.push(new j(r).parse());
      } catch {
      }
    }), e;
  }
}
class j {
  constructor(e) {
    this.value = e;
  }
  parse() {
    if (this.value === null)
      return null;
    if (x(this.value) && !isNaN(this.value.valueOf()))
      return I("Y-m-d H:i:s", this.value);
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
    throw new P();
  }
}
var T = Object.defineProperty, y = Object.getOwnPropertySymbols, V = Object.prototype.hasOwnProperty, F = Object.prototype.propertyIsEnumerable, O = (t, e, r) => e in t ? T(t, e, { enumerable: !0, configurable: !0, writable: !0, value: r }) : t[e] = r, C = (t, e) => {
  for (var r in e || (e = {}))
    V.call(e, r) && O(t, r, e[r]);
  if (y)
    for (var r of y(e))
      F.call(e, r) && O(t, r, e[r]);
  return t;
};
class A {
  constructor(e) {
    this.value = C({}, e);
  }
  parse() {
    if (!this.value)
      return {};
    const e = Object.keys(this.value);
    let r = {};
    return e.forEach((s) => {
      try {
        r[s] = new j(this.value[s]).parse();
      } catch {
      }
    }), r = g(r), r;
  }
}
class f {
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
    const h = Object.keys(e), D = Object.keys(r);
    let c = [...h, ...D];
    return c = c.filter((l, i, n) => n.indexOf(l) === i), c.forEach((l) => {
      let i = e[l], n = r[l];
      if (Array.isArray(i) && Array.isArray(n)) {
        if (i.length === 0 && n.length === 0)
          return;
        let u = !1;
        i.forEach((S, $) => {
          n[$] !== S && (u = !0);
        }), u && (s[l] = i, a[l] = n);
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
        const u = this.fetchDifferences(i, n);
        i = u.from, n = u.to;
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
        r.push(new E(s).filter(e));
      } catch {
      }
    }), r;
  }
}
class E {
  constructor(e) {
    this.value = e, this.type = new B(e);
  }
  filter(e) {
    if (this.type.included(e))
      throw new P();
    return this.type.isArray() ? new H(this.value).filter(e) : this.type.isObject() ? new d(this.value).filter(e) : this.value;
  }
}
var J = Object.defineProperty, m = Object.getOwnPropertySymbols, L = Object.prototype.hasOwnProperty, U = Object.prototype.propertyIsEnumerable, b = (t, e, r) => e in t ? J(t, e, { enumerable: !0, configurable: !0, writable: !0, value: r }) : t[e] = r, Y = (t, e) => {
  for (var r in e || (e = {}))
    L.call(e, r) && b(t, r, e[r]);
  if (m)
    for (var r of m(e))
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
        s[a] = new E(this.value[a]).filter(e);
      } catch {
      }
    }), s = g(s), s;
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
var z = Object.defineProperty, w = Object.getOwnPropertySymbols, G = Object.prototype.hasOwnProperty, M = Object.prototype.propertyIsEnumerable, _ = (t, e, r) => e in t ? z(t, e, { enumerable: !0, configurable: !0, writable: !0, value: r }) : t[e] = r, o = (t, e) => {
  for (var r in e || (e = {}))
    G.call(e, r) && _(t, r, e[r]);
  if (w)
    for (var r of w(e))
      M.call(e, r) && _(t, r, e[r]);
  return t;
};
class W {
  constructor(e, r = {}) {
    this.preventProps = new K(r.preventProps), this.preventTypes = new q(r.preventTypes), e = o({}, e), e = this.preventProps.clear(e), e = this.preventTypes.clear(e), this.data = new f(o({}, e)), this.original = new f(o({}, e)), this.isChanged = this.changed();
  }
  store(e) {
    e = o({}, e), e = this.preventProps.clear(e), e = this.preventTypes.clear(e), this.data = new f(e), this.isChanged = this.changed();
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
