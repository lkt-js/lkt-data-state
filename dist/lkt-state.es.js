import { date as o, isObject as h, isArray as n, isNumeric as l, isFunction as p, sortObject as f } from "lkt-tools";
class S {
  constructor() {
    this.data = "", this.originalData = "", this.removeDataProps = [];
  }
  preventStoreProps(t) {
    return this.removeDataProps = t, this;
  }
  parseData(t) {
    t = JSON.parse(JSON.stringify(t)), this.removeDataProps.length > 0 && this.removeDataProps.forEach((e) => {
      t.hasOwnProperty(e) && delete t[e];
    });
    let a = {};
    for (let e in t)
      if (t.hasOwnProperty(e) && t[e] !== null)
        if (t[e] instanceof Date)
          isNaN(t[e].valueOf()) || (a[e] = o("Y-m-d H:i:s", t[e]));
        else if (h(t[e]))
          a[e] = this.parseData(t[e]);
        else if (n(t[e])) {
          let i = [];
          t[e].forEach((r) => {
            i.push(this.parseData(r));
          }), a[e] = i;
        } else
          l(t[e]) ? a[e] = String(t[e]) : p(t[e]) || (a[e] = t[e]);
    return a = f(a), JSON.stringify(a);
  }
  store(t) {
    return this.data = this.parseData(t), this;
  }
  reset(t) {
    return this.data = this.parseData(t), this.originalData = this.parseData(t), this;
  }
  hasModifications() {
    return this.data !== this.originalData;
  }
}
const D = {
  data() {
    return {
      _lkt_dataState: new S(),
      _lkt_dataStateChanged: !1
    };
  },
  watch: {
    "_lkt_dataState.data"(s) {
      this._lkt_dataStateChanged = this.modifiedDataController.hasModifications();
    },
    _lkt_dataStateChanged(s) {
      this.$emit("data-state-changed", s);
    }
  },
  methods: {
    $preventStoreProps(s) {
      this._lkt_dataState.preventStoreProps(s);
    },
    $storeState(s = {}) {
      this._lkt_dataState.store(s);
    },
    $resetState(s = {}) {
      this._lkt_dataState.reset(s);
    }
  }
}, _ = {
  install: (s, t) => {
    s.mixin(D);
  }
};
export {
  D as DataStateMixin,
  _ as default
};
