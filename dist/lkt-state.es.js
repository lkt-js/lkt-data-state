function f(n, e, s) {
  for (n = String(n); n.length < e; )
    n = s + n;
  return n;
}
const b = [
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
], p = /\\?(.?)/gi;
function O({ date: n = new Date(), format: e = "" }) {
  function s(t, i) {
    return r[t] ? r[t]() : i;
  }
  const r = {
    d() {
      return f(r.j(), 2, "0");
    },
    D() {
      return r.l().slice(0, 3);
    },
    j() {
      return n.getDate();
    },
    l() {
      return `${b[r.w()]}day`;
    },
    N() {
      return r.w() || 7;
    },
    S() {
      const t = r.j();
      let i = t % 10;
      return i <= 3 && parseInt(String(t % 100 / 10), 10) === 1 && (i = 0), ["st", "nd", "rd"][i - 1] || "th";
    },
    w() {
      return n.getDay();
    },
    z() {
      const t = new Date(r.Y(), r.n() - 1, r.j()), i = new Date(r.Y(), 0, 1);
      return Math.round((t - i) / 864e5);
    },
    W() {
      const t = new Date(r.Y(), r.n() - 1, r.j() - r.N() + 3), i = new Date(t.getFullYear(), 0, 4);
      return f(1 + Math.round((t - i) / 864e5 / 7), 2, "0");
    },
    F() {
      return b[6 + r.n()];
    },
    m() {
      return f(r.n(), 2, "0");
    },
    M() {
      return r.F().slice(0, 3);
    },
    n() {
      return n.getMonth() + 1;
    },
    t() {
      return new Date(r.Y(), r.n(), 0).getDate();
    },
    L() {
      const t = r.Y();
      return t % 4 === 0 & t % 100 !== 0 | t % 400 === 0;
    },
    o() {
      const t = r.n(), i = r.W();
      return r.Y() + (t === 12 && i < 9 ? 1 : t === 1 && i > 9 ? -1 : 0);
    },
    Y() {
      return n.getFullYear();
    },
    y() {
      return r.Y().toString().slice(-2);
    },
    a() {
      return n.getHours() > 11 ? "pm" : "am";
    },
    A() {
      return r.a().toUpperCase();
    },
    B() {
      const t = n.getUTCHours() * 3600, i = n.getUTCMinutes() * 60, l = n.getUTCSeconds();
      return f(Math.floor((t + i + l + 3600) / 86.4) % 1e3, 3, "0");
    },
    g() {
      return r.G() % 12 || 12;
    },
    G() {
      return n.getHours();
    },
    h() {
      return f(r.g(), 2, "0");
    },
    H() {
      return f(r.G(), 2, "0");
    },
    i() {
      return f(n.getMinutes(), 2, "0");
    },
    s() {
      return f(n.getSeconds(), 2, "0");
    },
    u() {
      return f(n.getMilliseconds() * 1e3, 6, "0");
    },
    e() {
      const t = "Not supported (see source code of date() for timezone on how to add support)";
      throw new Error(t);
    },
    I() {
      const t = new Date(r.Y(), 0), i = Date.UTC(r.Y(), 0), l = new Date(r.Y(), 6), h = Date.UTC(r.Y(), 6);
      return t - i !== l - h ? 1 : 0;
    },
    O() {
      const t = n.getTimezoneOffset(), i = Math.abs(t);
      return (t > 0 ? "-" : "+") + f(Math.floor(i / 60) * 100 + i % 60, 4, "0");
    },
    P() {
      const t = r.O();
      return `${t.substring(0, 3)}:${t.substring(3, 2)}`;
    },
    T() {
      return "UTC";
    },
    Z() {
      return -n.getTimezoneOffset() * 60;
    },
    c() {
      return "Y-m-d\\TH:i:sP".replace(p, s);
    },
    r() {
      return "D, d M Y H:i:s O".replace(p, s);
    },
    U() {
      return n / 1e3 | 0;
    }
  };
  return e.replace(p, s);
}
function w(n) {
  return n === void 0 ? new Date() : n instanceof Date ? new Date(n) : new Date(n * 1e3);
}
const T = (n, e = void 0) => O({ date: w(e), format: n }), m = (n) => n != null && Object.prototype.toString.call(n) === "[object Date]" && !isNaN(n.getTime()), v = (n) => {
  const e = {};
  return Object.keys(n).sort().forEach((s) => {
    e[s] = n[s];
  }), e;
};
class g {
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
  fetchDifferences(e, s) {
    const r = {}, t = {}, i = Object.keys(e), l = Object.keys(s);
    let h = [...i, ...l];
    return h = h.filter((u, o, c) => c.indexOf(u) === o), h.forEach((u) => {
      let o = e[u], c = s[u];
      if (Array.isArray(o) && Array.isArray(c)) {
        if (o.length === 0 && c.length === 0)
          return;
        let a = !1;
        o.forEach((j, A) => {
          c[A] !== j && (a = !0);
        }), a && (r[u] = o, t[u] = c);
        return;
      } else if (Array.isArray(o) && !Array.isArray(c)) {
        r[u] = o, t[u] = c;
        return;
      } else if (!Array.isArray(o) && Array.isArray(c)) {
        console.log("case c"), r[u] = o, t[u] = c;
        return;
      }
      const y = typeof o == "object", D = typeof c == "object";
      if (y && D) {
        const a = this.fetchDifferences(o, c);
        o = a.from, c = a.to;
      } else
        y ? o = this.fetchDifferences(o, c).from : D && (c = this.fetchDifferences(o, c).to);
      o !== c && (r[u] = o, t[u] = c);
    }), { from: r, to: t };
  }
  parseDatum(e) {
    if (m(e) && !isNaN(e.valueOf()))
      return T("Y-m-d H:i:s", e);
    if (Array.isArray(e)) {
      const s = [];
      return e.forEach((r) => {
        const t = this.parseDatum(r);
        t !== null && s.push(t);
      }), s;
    }
    return typeof e == "object" ? this.parseData(e) : typeof e == "number" ? String(e) : typeof e != "function" ? e : null;
  }
  parseData(e) {
    if (e = JSON.parse(JSON.stringify(e)), !e)
      return JSON.stringify({});
    const s = Object.keys(e);
    let r = {};
    return s.forEach((t) => {
      const i = this.parseDatum(e[t]);
      i !== null && (r[t] = i);
    }), r = v(r), JSON.stringify(r);
  }
}
class S {
  constructor(e) {
    e || (e = []), this.value = e;
  }
  clear(e) {
    return this.value.length === 0 || Object.keys(e).forEach((s) => {
      this.value.includes(s) && delete e[s], typeof e[s] == "object" && (e[s] = this.clear(e[s]));
    }), e;
  }
}
class Y {
  constructor(e) {
    e || (e = []), this.value = e;
  }
  clear(e) {
    return this.value.length === 0 || this.value.forEach((s) => {
      Object.keys(e).forEach((r) => {
        const t = this.getDatumType(e[r]);
        if (this.canBeRemoved(s, t) && delete e[r], t === "array") {
          let i = this.clearArray(e[r], s);
          typeof i == "object" && (i = Object.values(i)), e[r] = i;
        }
        typeof e[r] == "object" && (e[r] = this.clear(e[r]));
      });
    }), e;
  }
  clearArray(e, s) {
    const r = [];
    return e.forEach((t) => {
      this.canBeRemoved(s, this.getDatumType(t)) || (Array.isArray(t) ? r.push(this.clearArray(t, s)) : typeof t == "object" ? r.push(this.clear(t)) : r.push(t));
    }), r;
  }
  getDatumType(e) {
    let s;
    return e === null ? s = "null" : Array.isArray(e) ? s = "array" : (s = typeof e, s = s.toLowerCase()), s;
  }
  canBeRemoved(e, s) {
    return e === s;
  }
}
class M {
  constructor(e, s = {}) {
    this.preventProps = new S(s.preventProps), this.preventTypes = new Y(s.preventTypes), e = this.preventProps.clear(e), e = this.preventTypes.clear(e), this.data = new g(e), this.original = new g(e), this.isChanged = this.changed();
  }
  store(e) {
    e = this.preventProps.clear(e), e = this.preventTypes.clear(e), this.data = new g(e), this.isChanged = this.changed();
  }
  changed() {
    return this.original.isDifferent(this.data.getString());
  }
  differences() {
    return this.original.getDifferences(this.data.getObject());
  }
}
export {
  M as DataState
};
