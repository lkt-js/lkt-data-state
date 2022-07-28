import { sortObject as l, isDate as o, date as f, isObject as _, isArray as S, isNumeric as c, isFunction as d, isFilled as u, cloneString as D } from "lkt-tools";
const h = (t, a = []) => {
  if (o(t) && !isNaN(t.valueOf()))
    return f("Y-m-d H:i:s", t);
  if (_(t))
    return n(t, a);
  if (S(t)) {
    let e = [];
    return t.forEach((i) => {
      let s = h(i, a);
      s !== null && e.push(s);
    }), e;
  }
  return c(t) ? String(t) : d(t) ? null : t;
}, n = (t, a = []) => {
  t = JSON.parse(JSON.stringify(t)), a.length > 0 && a.forEach((i) => {
    t.hasOwnProperty(i) && delete t[i];
  });
  let e = {};
  for (let i in t)
    if (t.hasOwnProperty(i) && t[i] !== null) {
      let s = h(t[i], a);
      s !== null && (e[i] = s);
    }
  return e = l(e), JSON.stringify(e);
};
class r {
  constructor() {
    this.data = "", this.originalData = "", this.removeDataProps = [], this.changed = !1;
  }
  preventStoreProps(a) {
    return this.removeDataProps = a, this;
  }
  store(a) {
    return u(this.originalData) ? (this.data = n(a, this.removeDataProps), this.changed = this.data !== this.originalData, this) : this.reset(a);
  }
  reset(a) {
    let e = n(a, this.removeDataProps);
    return this.data = D(e), this.originalData = e, this;
  }
  hasModifications() {
    return this.data !== this.originalData;
  }
}
const p = {
  data() {
    return {
      _lkt_dataState: null
    };
  },
  computed: {
    $hasModifiedDataStored() {
      return this._lkt_dataState ? this._lkt_dataState.changed === !0 : !1;
    }
  },
  watch: {
    "_lkt_dataState.changed"(t) {
      this.$emit("data-state-changed", t);
    }
  },
  methods: {
    $preventStoreDataProps(t) {
      this._lkt_dataState || (this._lkt_dataState = new r()), this._lkt_dataState.preventStoreProps(t);
    },
    $storeDataState(t = {}) {
      this._lkt_dataState || (this._lkt_dataState = new r()), this._lkt_dataState.store(t);
    },
    $resetDataState(t = {}) {
      this._lkt_dataState || (this._lkt_dataState = new r()), this._lkt_dataState.reset(t);
    }
  }
}, k = {
  install: (t, a) => {
    t.mixin(p);
  }
};
export {
  p as DataStateMixin,
  k as default
};
