function f(s, e, t) {
  for (s = String(s); s.length < e; )
    s = t + s;
  return s;
}
const O = [
  "Sun",
  "Mon",
  "Tues",
  "Wednes",
  "Thurs",
  "Fri",
  "Satur",
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
], g = /\\?(.?)/gi;
function m({ date: s = new Date(), format: e = "" }) {
  function t(n, i) {
    return r[n] ? r[n]() : i;
  }
  const r = {
    d() {
      return f(r.j(), 2, "0");
    },
    D() {
      return r.l().slice(0, 3);
    },
    j() {
      return s.getDate();
    },
    l() {
      return `${O[r.w()]}day`;
    },
    N() {
      return r.w() || 7;
    },
    S() {
      const n = r.j();
      let i = n % 10;
      return i <= 3 && parseInt(String(n % 100 / 10), 10) === 1 && (i = 0), ["st", "nd", "rd"][i - 1] || "th";
    },
    w() {
      return s.getDay();
    },
    z() {
      const n = new Date(r.Y(), r.n() - 1, r.j()), i = new Date(r.Y(), 0, 1);
      return Math.round((n - i) / 864e5);
    },
    W() {
      const n = new Date(r.Y(), r.n() - 1, r.j() - r.N() + 3), i = new Date(n.getFullYear(), 0, 4);
      return f(1 + Math.round((n - i) / 864e5 / 7), 2, "0");
    },
    F() {
      return O[6 + r.n()];
    },
    m() {
      return f(r.n(), 2, "0");
    },
    M() {
      return r.F().slice(0, 3);
    },
    n() {
      return s.getMonth() + 1;
    },
    t() {
      return new Date(r.Y(), r.n(), 0).getDate();
    },
    L() {
      const n = r.Y();
      return n % 4 === 0 & n % 100 !== 0 | n % 400 === 0;
    },
    o() {
      const n = r.n(), i = r.W();
      return r.Y() + (n === 12 && i < 9 ? 1 : n === 1 && i > 9 ? -1 : 0);
    },
    Y() {
      return s.getFullYear();
    },
    y() {
      return r.Y().toString().slice(-2);
    },
    a() {
      return s.getHours() > 11 ? "pm" : "am";
    },
    A() {
      return r.a().toUpperCase();
    },
    B() {
      const n = s.getUTCHours() * 3600, i = s.getUTCMinutes() * 60, l = s.getUTCSeconds();
      return f(Math.floor((n + i + l + 3600) / 86.4) % 1e3, 3, "0");
    },
    g() {
      return r.G() % 12 || 12;
    },
    G() {
      return s.getHours();
    },
    h() {
      return f(r.g(), 2, "0");
    },
    H() {
      return f(r.G(), 2, "0");
    },
    i() {
      return f(s.getMinutes(), 2, "0");
    },
    s() {
      return f(s.getSeconds(), 2, "0");
    },
    u() {
      return f(s.getMilliseconds() * 1e3, 6, "0");
    },
    e() {
      const n = "Not supported (see source code of date() for timezone on how to add support)";
      throw new Error(n);
    },
    I() {
      const n = new Date(r.Y(), 0), i = Date.UTC(r.Y(), 0), l = new Date(r.Y(), 6), h = Date.UTC(r.Y(), 6);
      return n - i !== l - h ? 1 : 0;
    },
    O() {
      const n = s.getTimezoneOffset(), i = Math.abs(n);
      return (n > 0 ? "-" : "+") + f(Math.floor(i / 60) * 100 + i % 60, 4, "0");
    },
    P() {
      const n = r.O();
      return `${n.substring(0, 3)}:${n.substring(3, 2)}`;
    },
    T() {
      return "UTC";
    },
    Z() {
      return -s.getTimezoneOffset() * 60;
    },
    c() {
      return "Y-m-d\\TH:i:sP".replace(g, t);
    },
    r() {
      return "D, d M Y H:i:s O".replace(g, t);
    },
    U() {
      return s / 1e3 | 0;
    }
  };
  return e.replace(g, t);
}
function S(s) {
  return s === void 0 ? new Date() : s instanceof Date ? new Date(s) : new Date(s * 1e3);
}
const T = (s, e = void 0) => m({ date: S(e), format: s }), Y = (s) => s != null && Object.prototype.toString.call(s) === "[object Date]" && !isNaN(s.getTime()), P = (s) => {
  const e = {};
  return Object.keys(s).sort().forEach((t) => {
    e[t] = s[t];
  }), e;
};
class y {
  constructor(e) {
    e || (e = {}), this.data = e, this.value = this.parseData(e);
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
  fetchDifferences(e, t) {
    const r = {}, n = {}, i = Object.keys(e), l = Object.keys(t);
    let h = [...i, ...l];
    return h = h.filter((u, o, c) => c.indexOf(u) === o), h.forEach((u) => {
      let o = e[u], c = t[u];
      if (Array.isArray(o) && Array.isArray(c)) {
        if (o.length === 0 && c.length === 0)
          return;
        let a = !1;
        o.forEach((A, v) => {
          c[v] !== A && (a = !0);
        }), a && (r[u] = o, n[u] = c);
        return;
      } else if (Array.isArray(o) && !Array.isArray(c)) {
        r[u] = o, n[u] = c;
        return;
      } else if (!Array.isArray(o) && Array.isArray(c)) {
        console.log("case c"), r[u] = o, n[u] = c;
        return;
      }
      const D = typeof o == "object", b = typeof c == "object";
      if (D && b) {
        const a = this.fetchDifferences(o, c);
        o = a.from, c = a.to;
      } else
        D ? o = this.fetchDifferences(o, c).from : b && (c = this.fetchDifferences(o, c).to);
      o !== c && (r[u] = o, n[u] = c);
    }), { from: r, to: n };
  }
  parseDatum(e) {
    if (Y(e) && !isNaN(e.valueOf()))
      return T("Y-m-d H:i:s", e);
    if (Array.isArray(e)) {
      const t = [];
      return e.forEach((r) => {
        const n = this.parseDatum(r);
        n !== null && t.push(n);
      }), t;
    }
    return typeof e == "object" ? this.parseData(e) : typeof e == "number" ? String(e) : typeof e != "function" ? e : null;
  }
  parseData(e) {
    if (e = JSON.parse(JSON.stringify(e)), !e)
      return JSON.stringify({});
    const t = Object.keys(e);
    let r = {};
    return t.forEach((n) => {
      const i = this.parseDatum(e[n]);
      i !== null && (r[n] = i);
    }), r = P(r), JSON.stringify(r);
  }
}
class M {
  constructor(e) {
    e || (e = []), this.value = e;
  }
  clear(e) {
    return this.value.length === 0 || Object.keys(e).forEach((t) => {
      this.value.includes(t) && delete e[t], typeof e[t] == "object" && (e[t] = this.clear(e[t]));
    }), e;
  }
}
class N {
  constructor(e) {
    e || (e = []), this.value = e;
  }
  clear(e) {
    return this.value.length === 0 || this.value.forEach((t) => {
      Object.keys(e).forEach((r) => {
        const n = this.getDatumType(e[r]);
        if (this.canBeRemoved(t, n) && delete e[r], n === "array") {
          let i = this.clearArray(e[r], t);
          typeof i == "object" && (i = Object.values(i)), e[r] = i;
        }
        typeof e[r] == "object" && (e[r] = this.clear(e[r]));
      });
    }), e;
  }
  clearArray(e, t) {
    const r = [];
    return e.forEach((n) => {
      this.canBeRemoved(t, this.getDatumType(n)) || (Array.isArray(n) ? r.push(this.clearArray(n, t)) : typeof n == "object" ? r.push(this.clear(n)) : r.push(n));
    }), r;
  }
  getDatumType(e) {
    let t;
    return e === null ? t = "null" : Array.isArray(e) ? t = "array" : (t = typeof e, t = t.toLowerCase()), t;
  }
  canBeRemoved(e, t) {
    return e === t;
  }
}
var _ = Object.defineProperty, j = Object.getOwnPropertySymbols, E = Object.prototype.hasOwnProperty, C = Object.prototype.propertyIsEnumerable, w = (s, e, t) => e in s ? _(s, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : s[e] = t, p = (s, e) => {
  for (var t in e || (e = {}))
    E.call(e, t) && w(s, t, e[t]);
  if (j)
    for (var t of j(e))
      C.call(e, t) && w(s, t, e[t]);
  return s;
};
class U {
  constructor(e, t = {}) {
    this.preventProps = new M(t.preventProps), this.preventTypes = new N(t.preventTypes), e = p({}, e), e = this.preventProps.clear(e), e = this.preventTypes.clear(e), this.data = new y(p({}, e)), this.original = new y(p({}, e)), this.isChanged = this.changed();
  }
  store(e) {
    e = p({}, e), e = this.preventProps.clear(e), e = this.preventTypes.clear(e), this.data = new y(e), this.isChanged = this.changed();
  }
  changed() {
    return this.original.isDifferent(this.data.getString());
  }
  differences() {
    return this.original.getDifferences(this.data.getObject());
  }
}
export {
  U as DataState
};
