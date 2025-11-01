class he {
  /**
   * @type {T}
   */
  #t;
  #e = /* @__PURE__ */ new Set();
  /**
   * @param {T} current
   */
  constructor(t) {
    this.#t = t;
  }
  /**
   * @return {T}
   */
  get current() {
    return this.#t;
  }
  /**
   * @param {T} value
   */
  set current(t) {
    this.#t != t && (this.#t = t, this.#e.forEach((n) => n(t)));
  }
  /**
   * @type {import("hooks").Ref["on"]}
   */
  on(t) {
    return this.#e.add(t), () => this.#e.delete(t);
  }
}
const qt = (e) => new he(e), dt = Symbol.for("atomico.hooks");
globalThis[dt] = globalThis[dt] || {};
let $ = globalThis[dt];
const me = Symbol.for("Atomico.suspense"), jt = Symbol.for("Atomico.effect"), ye = Symbol.for("Atomico.layoutEffect"), Yt = Symbol.for("Atomico.insertionEffect"), I = (e, t, n) => {
  const { i: s, hooks: r } = $.c, o = r[s] = r[s] || {};
  return o.value = e(o.value), o.effect = t, o.tag = n, $.c.i++, r[s].value;
}, Bt = (e) => I((t = qt(e)) => t), Q = () => I((e = qt($.c.host)) => e), Ht = () => $.c.update, pe = (e, t, n = 0) => {
  let s = {}, r = !1;
  const o = () => r, a = (u, c) => {
    for (const d in s) {
      const f = s[d];
      f.effect && f.tag === u && (f.value = f.effect(f.value, c));
    }
  };
  return { load: (u) => {
    $.c = { host: t, hooks: s, update: e, i: 0, id: n };
    let c;
    try {
      r = !1, c = u();
    } catch (d) {
      if (d !== me) throw d;
      r = !0;
    } finally {
      $.c = null;
    }
    return c;
  }, cleanEffects: (u) => (a(Yt, u), () => (a(ye, u), () => {
    a(jt, u);
  })), isSuspense: o };
}, x = Symbol.for;
function zt(e, t) {
  const n = e.length;
  if (n !== t.length) return !1;
  for (let s = 0; s < n; s++) {
    let r = e[s], o = t[s];
    if (r !== o) return !1;
  }
  return !0;
}
const P = (e) => typeof e == "function", j = (e) => typeof e == "object", { isArray: ge } = Array, ht = (e, t) => (t ? e instanceof HTMLStyleElement : !0) && "hydrate" in (e?.dataset || {});
function xt(e, t) {
  let n;
  const s = (r) => {
    let { length: o } = r;
    for (let a = 0; a < o; a++) {
      const l = r[a];
      if (l && Array.isArray(l))
        s(l);
      else {
        const i = typeof l;
        if (l == null || i === "function" || i === "boolean")
          continue;
        i === "string" || i === "number" ? (n == null && (n = ""), n += l) : (n != null && (t(n), n = null), t(l));
      }
    }
  };
  s(e), n != null && t(n);
}
const Kt = (e, t, n) => (e.addEventListener(t, n), () => e.removeEventListener(t, n));
class Wt {
  /**
   *
   * @param {HTMLElement} target
   * @param {string} message
   * @param {string} value
   */
  constructor(t, n, s) {
    this.message = n, this.target = t, this.value = s;
  }
}
class Jt extends Wt {
}
class be extends Wt {
}
const G = "Custom", De = null, Ee = { true: 1, "": 1, 1: 1 };
function Se(e, t, n, s, r) {
  const {
    type: o,
    reflect: a,
    event: l,
    value: i,
    attr: u = ve(t)
  } = n?.name != G && j(n) && n != De ? n : { type: n }, c = o?.name === G && o.map, d = i != null ? o == Function || !P(i) ? () => i : i : null;
  Object.defineProperty(e, t, {
    configurable: !0,
    /**
     * @this {import("dom").AtomicoThisInternal}
     * @param {any} newValue
     */
    set(f) {
      const h = this[t];
      d && o != Boolean && f == null && (f = d());
      const { error: D, value: E } = (c ? Te : Pe)(
        o,
        f
      );
      if (D && E != null)
        throw new Jt(
          this,
          `The value defined for prop '${t}' must be of type '${o.name}'`,
          E
        );
      h != E && (this._props[t] = E ?? void 0, this.update(), l && Zt(this, l), this.updated.then(() => {
        a && (this._ignoreAttr = u, we(this, o, u, this[t]), this._ignoreAttr = null);
      }));
    },
    /**
     * @this {import("dom").AtomicoThisInternal}
     */
    get() {
      return this._props[t];
    }
  }), d && (r[t] = d()), s[u] = { prop: t, type: o };
}
const Zt = (e, { type: t, base: n = CustomEvent, ...s }) => e.dispatchEvent(new n(t, s)), ve = (e) => e.replace(/([A-Z])/g, "-$1").toLowerCase(), we = (e, t, n, s) => s == null || t == Boolean && !s ? e.removeAttribute(n) : e.setAttribute(
  n,
  t?.name === G && t?.serialize ? t?.serialize(s) : j(s) ? JSON.stringify(s) : t == Boolean ? "" : s
), Ce = (e, t) => e == Boolean ? !!Ee[t] : e == Number ? Number(t) : e == String ? t : e == Array || e == Object ? JSON.parse(t) : e.name == G ? t : (
  // TODO: If when defining reflect the prop can also be of type string?
  new e(t)
), Te = ({ map: e }, t) => {
  try {
    return { value: e(t), error: !1 };
  } catch {
    return { value: t, error: !0 };
  }
}, Pe = (e, t) => e == null || t == null ? { value: t, error: !1 } : e != String && t === "" ? { value: void 0, error: !1 } : e == Object || e == Array || e == Symbol ? {
  value: t,
  error: {}.toString.call(t) !== `[object ${e.name}]`
} : t instanceof e ? {
  value: t,
  error: e == Number && Number.isNaN(t.valueOf())
} : e == String || e == Number || e == Boolean ? {
  value: t,
  error: e == Number ? typeof t != "number" ? !0 : Number.isNaN(t) : e == String ? typeof t != "string" : typeof t != "boolean"
} : { value: t, error: !0 };
let Ne = 0;
const ke = (e) => {
  const t = (e?.dataset || {})?.hydrate || "";
  return t || "c" + Ne++;
}, K = (e, t = HTMLElement) => {
  const n = {}, s = {}, r = "prototype" in t && t.prototype instanceof Element, o = r ? t : "base" in t ? t.base : HTMLElement, { props: a, styles: l } = r ? e : t;
  class i extends o {
    constructor() {
      super(), this._setup(), this._render = () => e({ ...this._props });
      for (const c in s) this[c] = s[c];
    }
    /**
     * @returns {import("core").Sheets[]}
     */
    static get styles() {
      return [super.styles, l];
    }
    async _setup() {
      if (this._props) return;
      this._props = {};
      let c, d;
      this.mounted = new Promise(
        (m) => this.mount = () => {
          m(), c != this.parentNode && (d != c ? this.unmounted.then(this.update) : this.update()), c = this.parentNode;
        }
      ), this.unmounted = new Promise(
        (m) => this.unmount = () => {
          m(), (c != this.parentNode || !this.isConnected) && (f.cleanEffects(!0)()(), d = this.parentNode, c = null);
        }
      ), this.symbolId = this.symbolId || Symbol(), this.symbolIdParent = Symbol();
      const f = pe(
        () => this.update(),
        this,
        ke(this)
      );
      let h, D = !0;
      const E = ht(this);
      this.update = () => (h || (h = !0, this.updated = (this.updated || this.mounted).then(() => {
        try {
          const m = f.load(this._render), p = f.cleanEffects();
          return m && //@ts-ignore
          m.render(this, this.symbolId, E), h = !1, D && !f.isSuspense() && (D = !1, !E && Oe(this)), p();
        } finally {
          h = !1;
        }
      }).then(
        /**
         * @param {import("internal/hooks.js").CleanUseEffects} [cleanUseEffect]
         */
        (m) => {
          m && m();
        }
      )), this.updated), this.update();
    }
    connectedCallback() {
      this.mount(), super.connectedCallback && super.connectedCallback();
    }
    disconnectedCallback() {
      super.disconnectedCallback && super.disconnectedCallback(), this.unmount();
    }
    /**
     * @this {import("dom").AtomicoThisInternal}
     * @param {string} attr
     * @param {(string|null)} oldValue
     * @param {(string|null)} value
     */
    attributeChangedCallback(c, d, f) {
      if (n[c]) {
        if (c === this._ignoreAttr || d === f) return;
        const { prop: h, type: D } = n[c];
        try {
          this[h] = Ce(D, f);
        } catch {
          throw new be(
            this,
            `The value defined as attr '${c}' cannot be parsed by type '${D.name}'`,
            f
          );
        }
      } else
        super.attributeChangedCallback(c, d, f);
    }
    static get props() {
      return { ...super.props, ...a };
    }
    static get observedAttributes() {
      const c = super.observedAttributes || [];
      for (const d in a)
        Se(this.prototype, d, a[d], n, s);
      return Object.keys(n).concat(c);
    }
  }
  return i;
};
function Oe(e) {
  const { styles: t } = e.constructor, { shadowRoot: n } = e;
  if (n && t.length) {
    const s = [];
    xt(t, (r) => {
      r && (r instanceof Element ? n.appendChild(r.cloneNode(!0)) : s.push(r));
    }), s.length && (n.adoptedStyleSheets = s);
  }
}
const Xt = (e) => (t, n) => {
  I(
    /**
     * Clean the effect hook
     * @type {import("internal/hooks.js").CollectorEffect}
     */
    ([s, r] = []) => ((r || !r) && (r && zt(r, n) ? s = s || !0 : (P(s) && s(), s = null)), [s, n]),
    /**
     * @returns {any}
     */
    ([s, r], o) => o ? (P(s) && s(), []) : [s || t(), r],
    e
  );
}, H = Xt(jt), Re = Xt(Yt);
class Gt extends Array {
  /**
   *
   * @param {any} initialState
   * @param {(nextState: any, state:any[], mount: boolean )=>void} mapState
   */
  constructor(t, n) {
    let s = !0;
    const r = (o) => {
      try {
        n(o, this, s);
      } finally {
        s = !1;
      }
    };
    super(void 0, r, n), r(t);
  }
  /**
   * The following code allows a mutable approach to useState
   * and useProp this with the idea of allowing an alternative
   * approach similar to Vue or Qwik of state management
   * @todo pending review with the community
   */
  // get value() {
  //     return this[0];
  // }
  // set value(nextState) {
  //     this[2](nextState, this);
  // }
}
const gt = (e) => {
  const t = Ht();
  return I(
    (n = new Gt(e, (s, r, o) => {
      s = P(s) ? s(r[0]) : s, s !== r[0] && (r[0] = s, o || t());
    })) => n
  );
}, N = (e, t) => {
  const [n] = I(([s, r, o = 0] = []) => ((!r || r && !zt(r, t)) && (s = e()), [s, t, o]));
  return n;
}, V = (e) => {
  const { current: t } = Q();
  if (!(e in t))
    throw new Jt(
      t,
      `For useProp("${e}"), the prop does not exist on the host.`,
      e
    );
  return I(
    (n = new Gt(t[e], (s, r) => {
      s = P(s) ? s(t[e]) : s, t[e] = s;
    })) => (n[0] = t[e], n)
  );
}, k = (e, t = {}) => {
  const n = Q();
  return n[e] || (n[e] = (s = t.detail) => Zt(n.current, {
    type: e,
    ...t,
    detail: s
  })), n[e];
}, mt = x("atomico/options");
globalThis[mt] = globalThis[mt] || {
  sheet: !!document.adoptedStyleSheets
};
const tt = globalThis[mt], Me = new Promise((e) => {
  tt.ssr || (document.readyState === "loading" ? Kt(document, "DOMContentLoaded", e) : e());
}), Ae = {
  checked: 1,
  value: 1,
  selected: 1
}, $e = {
  list: 1,
  type: 1,
  size: 1,
  form: 1,
  width: 1,
  height: 1,
  src: 1,
  href: 1,
  slot: 1
}, Fe = {
  shadowDom: 1,
  staticNode: 1,
  cloneNode: 1,
  children: 1,
  key: 1
}, X = {}, yt = [];
class pt extends Text {
}
const Ie = x("atomico/id"), Y = x("atomico/type"), it = x("atomico/ref"), Qt = x("atomico/vnode"), Ue = () => {
};
function Le(e, t, n) {
  return te(this, e, t, n);
}
const Vt = (e, t, ...n) => {
  const s = t || X;
  let { children: r } = s;
  if (r = r ?? (n.length ? n : yt), e === Ue)
    return r;
  const o = e ? e instanceof Node ? 1 : (
    //@ts-ignore
    e.prototype instanceof HTMLElement && 2
  ) : 0;
  if (o === !1 && e instanceof Function)
    return e(
      r != yt ? { children: r, ...s } : s
    );
  const a = tt.render || Le;
  return {
    [Y]: Qt,
    type: e,
    props: s,
    children: r,
    key: s.key,
    // key for lists by keys
    // define if the node declares its shadowDom
    shadow: s.shadowDom,
    // allows renderings to run only once
    static: s.staticNode,
    // defines whether the type is a childNode `1` or a constructor `2`
    raw: o,
    // defines whether to use the second parameter for document.createElement
    is: s.is,
    // clone the node if it comes from a reference
    clone: s.cloneNode,
    render: a
  };
};
function te(e, t, n = Ie, s, r) {
  let o;
  if (t && t[n] && t[n].vnode == e || e[Y] != Qt)
    return t;
  (e || !t) && (r = r || e.type == "svg", o = e.type != "host" && (e.raw == 1 ? (t && e.clone ? t[it] : t) != e.type : e.raw == 2 ? !(t instanceof e.type) : t ? t[it] || t.localName != e.type : !t), o && e.type != null && (e.raw == 1 && e.clone ? (s = !0, t = e.type.cloneNode(!0), t[it] = e.type) : t = e.raw == 1 ? e.type : e.raw == 2 ? new e.type() : r ? document.createElementNS(
    "http://www.w3.org/2000/svg",
    e.type
  ) : document.createElement(
    e.type,
    e.is ? { is: e.is } : void 0
  )));
  const a = t[n] ? t[n] : X, { vnode: l = X, cycle: i = 0 } = a;
  let { fragment: u, handlers: c } = a;
  const { children: d = yt, props: f = X } = l;
  if (c = o ? {} : c || {}, e.static && !o) return t;
  if (e.shadow && !t.shadowRoot && // @ts-ignore
  t.attachShadow({ mode: "open", ...e.shadow }), e.props != f && je(t, f, e.props, c, r), e.children !== d) {
    const h = e.shadow ? t.shadowRoot : t;
    u = qe(
      e.children,
      /**
       * @todo for hydration use attribute and send childNodes
       */
      u,
      h,
      n,
      // add support to foreignObject, children will escape from svg
      !i && s,
      r && e.type == "foreignObject" ? !1 : r
    );
  }
  return t[n] = { vnode: e, handlers: c, fragment: u, cycle: i + 1 }, t;
}
function _e(e, t) {
  const n = new pt(""), s = new pt("");
  let r;
  if (e[t ? "prepend" : "append"](n), t) {
    let { lastElementChild: o } = e;
    for (; o; ) {
      const { previousElementSibling: a } = o;
      if (ht(o, !0) && !ht(a, !0)) {
        r = o;
        break;
      }
      o = a;
    }
  }
  return r ? r.before(s) : e.append(s), {
    markStart: n,
    markEnd: s
  };
}
function qe(e, t, n, s, r, o) {
  e = e == null ? null : ge(e) ? e : [e];
  const a = t || _e(n, r), { markStart: l, markEnd: i, keyes: u } = a;
  let c;
  const d = u && /* @__PURE__ */ new Set();
  let f = l;
  if (e && xt(e, (h) => {
    if (typeof h == "object" && !h[Y])
      return;
    const D = h[Y] && h.key, E = u && D != null && u.get(D);
    f != i && f === E ? d.delete(f) : f = f == i ? i : f.nextSibling;
    const m = u ? E : f;
    let p = m;
    if (h[Y])
      p = te(h, m, s, r, o);
    else {
      const S = h + "";
      !(p instanceof Text) || p instanceof pt ? p = new Text(S) : p.data != S && (p.data = S);
    }
    p != f && (u && d.delete(p), !m || u ? (n.insertBefore(p, f), u && f != i && d.add(f)) : m == i ? n.insertBefore(p, i) : (n.replaceChild(p, m), f = p)), D != null && (c = c || /* @__PURE__ */ new Map(), c.set(D, p));
  }), f = f == i ? i : f.nextSibling, t && f != i)
    for (; f != i; ) {
      const h = f;
      f = f.nextSibling, h.remove();
    }
  return d && d.forEach((h) => h.remove()), a.keyes = c, a;
}
function je(e, t, n, s, r) {
  for (const o in t)
    !(o in n) && Mt(e, o, t[o], null, r, s);
  for (const o in n)
    Mt(e, o, t[o], n[o], r, s);
}
function Mt(e, t, n, s, r, o) {
  if (t = t == "class" && !r ? "className" : t, n = n ?? null, s = s ?? null, t in e && Ae[t] && (n = e[t]), !(s === n || Fe[t] || t[0] == "_"))
    if (e.localName === "slot" && t === "assignNode" && "assign" in e)
      e.assign(s);
    else if (t[0] == "o" && t[1] == "n" && (P(s) || P(n)))
      Ye(e, t.slice(2), s, o);
    else if (t == "ref")
      s && (P(s) ? s(e) : s.current = e);
    else if (t == "style") {
      const { style: a } = e;
      n = n || "", s = s || "";
      const l = j(n), i = j(s);
      if (l)
        for (const u in n)
          if (i)
            !(u in s) && At(a, u, null);
          else
            break;
      if (i)
        for (const u in s) {
          const c = s[u];
          l && n[u] === c || At(a, u, c);
        }
      else
        a.cssText = s;
    } else {
      const a = t[0] == "$" ? t.slice(1) : t;
      a === t && (!r && !$e[t] && t in e || P(s) || P(n)) ? e[t] = s ?? "" : s == null ? e.removeAttribute(a) : e.setAttribute(
        a,
        j(s) ? JSON.stringify(s) : s
      );
    }
}
function Ye(e, t, n, s) {
  if (s.handleEvent || (s.handleEvent = (r) => s[r.type].call(e, r)), n) {
    if (!s[t]) {
      const r = n.capture || n.once || n.passive ? Object.assign({}, n) : null;
      e.addEventListener(t, s, r);
    }
    s[t] = n;
  } else
    s[t] && (e.removeEventListener(t, s), delete s[t]);
}
function At(e, t, n) {
  let s = "setProperty";
  n == null && (s = "removeProperty", n = null), ~t.indexOf("-") ? e[s](t, n) : e[t] = n;
}
const Be = Vt("host", { style: "display: contents" }), ee = "value", He = (e, t) => {
  const n = Q(), s = Bt();
  Re(
    () => Kt(
      n.current,
      "ConnectContext",
      /**
       * @param {CustomEvent<import("context").DetailConnectContext>} event
       */
      (r) => {
        r.composedPath().at(0) !== r.currentTarget && e === r.detail.id && (r.stopPropagation(), r.detail.connect(s));
      }
    ),
    [e]
  ), s.current = t;
}, ze = (e) => {
  const t = k("ConnectContext", {
    bubbles: !0,
    composed: !0
  }), [n, s] = gt(() => {
    if (tt.ssr) return;
    let o;
    return t({
      id: e,
      /**
       * @param {import("core").Ref} parentContext
       */
      connect(a) {
        o = a;
      }
    }), o;
  }), r = Ht();
  return H(() => {
    Me.then(
      () => t({
        id: e,
        connect: s
      })
    );
  }, [e]), H(() => {
    if (n)
      return n.on(r);
  }, [n]), n?.current || e[ee];
}, ne = (e) => {
  const t = K(
    ({ value: n }) => (He(t, n), Be),
    {
      props: {
        value: {
          type: Object,
          value: () => e
        }
      }
    }
  );
  return t[ee] = e, t;
};
ne({
  /**
   *
   * @param {string} type
   * @param {string} id
   */
  dispatch(e, t) {
  }
});
const $t = {};
function et(e, ...t) {
  const n = (e.raw || e).reduce(
    (s, r, o) => s + r + (t[o] || ""),
    ""
  );
  return $t[n] = $t[n] || xe(n);
}
function xe(e) {
  if (tt.sheet) {
    const t = new CSSStyleSheet();
    return t.replaceSync(e), t;
  } else {
    const t = document.createElement("style");
    return t.textContent = e, t;
  }
}
const g = (e, t, n) => (t == null ? t = { key: n } : t.key = n, Vt(e, t)), B = g, se = et`*,*:before,*:after{box-sizing:border-box}button{padding:0;touch-action:manipulation;cursor:pointer;user-select:none}`, oe = et`.vh{position:absolute;transform:scale(0)}`;
function bt() {
  const e = /* @__PURE__ */ new Date();
  return new b(e.getFullYear(), e.getMonth() + 1, e.getDate());
}
function Dt(e, t = 0) {
  const n = T(e), s = n.getUTCDay(), r = (s < t ? 7 : 0) + s - t;
  return n.setUTCDate(n.getUTCDate() - r), b.from(n);
}
function re(e, t = 0) {
  return Dt(e, t).add({ days: 6 });
}
function ae(e) {
  return b.from(new Date(Date.UTC(e.year, e.month, 0)));
}
function nt(e, t, n) {
  return t && b.compare(e, t) < 0 ? t : n && b.compare(e, n) > 0 ? n : e;
}
const Ke = { days: 1 };
function We(e, t = 0) {
  let n = Dt(e.toPlainDate(), t);
  const s = re(ae(e), t), r = [];
  for (; b.compare(n, s) < 0; ) {
    const o = [];
    for (let a = 0; a < 7; a++)
      o.push(n), n = n.add(Ke);
    r.push(o);
  }
  return r;
}
function T(e) {
  return new Date(Date.UTC(e.year, e.month - 1, e.day ?? 1));
}
const Je = /^(\d{4})-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[0-1])$/, ct = (e, t) => e.toString().padStart(t, "0");
class b {
  constructor(t, n, s) {
    this.year = t, this.month = n, this.day = s;
  }
  // this is an incomplete implementation that only handles arithmetic on a single unit at a time.
  // i didn't want to get into more complex arithmetic since it get tricky fast
  // this is enough to serve my needs and will still be a drop-in replacement when actual Temporal API lands
  add(t) {
    const n = T(this);
    if ("days" in t)
      return n.setUTCDate(this.day + t.days), b.from(n);
    let { year: s, month: r } = this;
    "months" in t ? (r = this.month + t.months, n.setUTCMonth(r - 1)) : (s = this.year + t.years, n.setUTCFullYear(s));
    const o = b.from(T({ year: s, month: r, day: 1 }));
    return nt(b.from(n), o, ae(o));
  }
  toString() {
    return `${ct(this.year, 4)}-${ct(this.month, 2)}-${ct(this.day, 2)}`;
  }
  toPlainYearMonth() {
    return new st(this.year, this.month);
  }
  equals(t) {
    return b.compare(this, t) === 0;
  }
  static compare(t, n) {
    return t.year < n.year ? -1 : t.year > n.year ? 1 : t.month < n.month ? -1 : t.month > n.month ? 1 : t.day < n.day ? -1 : t.day > n.day ? 1 : 0;
  }
  static from(t) {
    if (typeof t == "string") {
      const n = t.match(Je);
      if (!n)
        throw new TypeError(t);
      const [, s, r, o] = n;
      return new b(
        parseInt(s, 10),
        parseInt(r, 10),
        parseInt(o, 10)
      );
    }
    return new b(
      t.getUTCFullYear(),
      t.getUTCMonth() + 1,
      t.getUTCDate()
    );
  }
}
class st {
  constructor(t, n) {
    this.year = t, this.month = n;
  }
  add(t) {
    const n = T(this), s = (t.months ?? 0) + (t.years ?? 0) * 12;
    return n.setUTCMonth(n.getUTCMonth() + s), new st(n.getUTCFullYear(), n.getUTCMonth() + 1);
  }
  equals(t) {
    return this.year === t.year && this.month === t.month;
  }
  toPlainDate() {
    return new b(this.year, this.month, 1);
  }
}
function F(e, t) {
  if (t)
    try {
      return e.from(t);
    } catch {
    }
}
function O(e) {
  const [t, n] = V(e);
  return [N(() => F(b, t), [t]), (o) => n(o?.toString())];
}
function Ze(e) {
  const [t = "", n] = V(e);
  return [N(() => {
    const [o, a] = t.split("/"), l = F(b, o), i = F(b, a);
    return l && i ? [l, i] : [];
  }, [t]), (o) => n(`${o[0]}/${o[1]}`)];
}
function Xe(e) {
  const [t = "", n] = V(e);
  return [N(() => t ? t.split("+").map((o) => {
    const [a, l] = o.split("/"), i = F(b, a), u = F(b, l);
    return i && u ? [i, u] : null;
  }).filter((o) => o !== null) : [], [t]), (o) => {
    const a = o.map(([l, i]) => `${l}/${i}`).join("+");
    n(a);
  }];
}
function Ge(e) {
  const [t = "", n] = V(e);
  return [N(() => {
    const o = [];
    for (const a of t.trim().split(/\s+/)) {
      const l = F(b, a);
      l && o.push(l);
    }
    return o;
  }, [t]), (o) => n(o.join(" "))];
}
function z(e, t) {
  return N(
    () => new Intl.DateTimeFormat(t, { timeZone: "UTC", ...e }),
    [t, e]
  );
}
function Ft(e, t, n) {
  const s = z(e, n);
  return N(() => {
    const r = [], o = /* @__PURE__ */ new Date();
    for (var a = 0; a < 7; a++) {
      const l = (o.getUTCDay() - t + 7) % 7;
      r[l] = s.format(o), o.setUTCDate(o.getUTCDate() + 1);
    }
    return r;
  }, [t, s]);
}
const q = (e, t, n) => nt(e, t, n) === e, It = (e) => e.target.matches(":dir(ltr)"), Qe = { month: "long", day: "numeric" }, Ve = { month: "long" }, tn = { weekday: "long" }, lt = { bubbles: !0 };
function en({ props: e, context: t }) {
  const { offset: n } = e, {
    firstDayOfWeek: s,
    isDateDisallowed: r,
    min: o,
    max: a,
    today: l,
    page: i,
    locale: u,
    focusedDate: c,
    highlightRanges: d,
    formatWeekday: f
  } = t, h = l ?? bt(), D = Ft(tn, s, u), E = N(
    () => ({ weekday: f }),
    [f]
  ), m = Ft(E, s, u), p = z(Qe, u), S = z(Ve, u), R = N(
    () => i.start.add({ months: n }),
    [i, n]
  ), ot = N(
    () => We(R, s),
    [R, s]
  ), ie = k("focusday", lt), ce = k("selectday", lt), le = k("hoverday", lt);
  function Tt(y) {
    ie(nt(y, o, a));
  }
  function ue(y) {
    let w;
    switch (y.key) {
      case "ArrowRight":
        w = c.add({ days: It(y) ? 1 : -1 });
        break;
      case "ArrowLeft":
        w = c.add({ days: It(y) ? -1 : 1 });
        break;
      case "ArrowDown":
        w = c.add({ days: 7 });
        break;
      case "ArrowUp":
        w = c.add({ days: -7 });
        break;
      case "PageUp":
        w = c.add(y.shiftKey ? { years: -1 } : { months: -1 });
        break;
      case "PageDown":
        w = c.add(y.shiftKey ? { years: 1 } : { months: 1 });
        break;
      case "Home":
        w = Dt(c, s);
        break;
      case "End":
        w = re(c, s);
        break;
      default:
        return;
    }
    Tt(w), y.preventDefault();
  }
  function fe(y) {
    const w = R.equals(y);
    if (!t.showOutsideDays && !w)
      return;
    const de = y.equals(c), Pt = y.equals(h), W = T(y), J = r?.(W), Nt = !q(y, o, a);
    let kt = "", M, U, L;
    const rt = y.add({ days: -1 }), at = y.add({ days: 1 });
    if (t.type === "range") {
      const [v, C] = t.value, A = v?.equals(y), _ = C?.equals(y);
      M = v && C && q(y, v, C), U = v && C && q(rt, v, C), L = v && C && q(at, v, C), kt = `${A ? "range-start" : ""} ${_ ? "range-end" : ""} ${M && !A && !_ ? "range-inner" : ""}`;
    } else t.type === "multi" ? (M = t.value.some((v) => v.equals(y)), U = t.value.some((v) => v.equals(rt)), L = t.value.some((v) => v.equals(at))) : (M = t.value?.equals(y), U = t.value?.equals(rt), L = t.value?.equals(at));
    let Ot = "";
    if (t.highlightRanges?.length > 0 && !M)
      for (const v of t.highlightRanges) {
        const [C, A] = v, _ = C?.equals(y), Rt = A?.equals(y), Z = C && A && q(y, C, A);
        Z && (Ot = `${_ || Z && U ? "highlight-start" : ""} ${Rt || Z && L ? "highlight-end" : ""} ${Z && !_ && !Rt && !U && !L ? "highlight-inner" : ""}`);
      }
    return {
      part: `${`button day day-${W.getDay()} ${// we don't want outside days to ever be shown as selected
      w ? M ? "selected" : "" : "outside"} ${J ? "disallowed" : ""} ${Pt ? "today" : ""} ${t.getDayParts?.(W) ?? ""}`} ${kt} ${Ot}`,
      tabindex: w && de ? 0 : -1,
      disabled: Nt,
      "aria-disabled": J ? "true" : void 0,
      "aria-pressed": w && M,
      "aria-current": Pt ? "date" : void 0,
      "aria-label": p.format(W),
      onkeydown: ue,
      onclick() {
        J || ce(y), Tt(y);
      },
      onmouseover() {
        !J && !Nt && le(y);
      }
    };
  }
  return {
    weeks: ot,
    yearMonth: R,
    daysLong: D,
    daysVisible: m,
    formatter: S,
    getDayProps: fe
  };
}
const ut = bt(), Et = ne({
  type: "date",
  firstDayOfWeek: 1,
  focusedDate: ut,
  page: { start: ut.toPlainYearMonth(), end: ut.toPlainYearMonth() }
});
customElements.define("calendar-ctx", Et);
const nn = (e, t) => (t + e) % 7, sn = K(
  (e) => {
    const t = ze(Et), n = Bt(), s = en({ props: e, context: t });
    function r() {
      n.current.querySelector("button[tabindex='0']")?.focus();
    }
    return /* @__PURE__ */ B("host", { shadowDom: !0, focus: r, children: [
      /* @__PURE__ */ g("div", { id: "h", part: "heading", children: s.formatter.format(T(s.yearMonth)) }),
      /* @__PURE__ */ B("table", { ref: n, "aria-labelledby": "h", part: "table", children: [
        /* @__PURE__ */ g("thead", { children: /* @__PURE__ */ g("tr", { part: "tr head", children: s.daysLong.map((o, a) => /* @__PURE__ */ B(
          "th",
          {
            part: `th day day-${nn(t.firstDayOfWeek, a)}`,
            scope: "col",
            children: [
              /* @__PURE__ */ g("span", { class: "vh", children: o }),
              /* @__PURE__ */ g("span", { "aria-hidden": "true", children: s.daysVisible[a] })
            ]
          }
        )) }) }),
        /* @__PURE__ */ g("tbody", { children: s.weeks.map((o, a) => /* @__PURE__ */ g("tr", { part: "tr week", children: o.map((l, i) => {
          const u = s.getDayProps(l);
          return /* @__PURE__ */ g("td", { part: "td", children: u && /* @__PURE__ */ g("button", { ...u, children: l.day }) }, i);
        }) }, a)) })
      ] })
    ] });
  },
  {
    props: {
      offset: {
        type: Number,
        value: 0
      }
    },
    styles: [
      se,
      oe,
      et`:host{--color-accent: black;--color-text-on-accent: white;display:flex;flex-direction:column;gap:.25rem;text-align:center;inline-size:fit-content}table{border-collapse:collapse;font-size:.875rem}th{font-weight:700;block-size:2.25rem}td{padding-inline:0}button{color:inherit;font-size:inherit;background:transparent;border:0;font-variant-numeric:tabular-nums;block-size:2.25rem;inline-size:2.25rem}button:hover:where(:not(:disabled,[aria-disabled])){background:#0000000d}button:is([aria-pressed=true],:focus-visible){background:var(--color-accent);color:var(--color-text-on-accent)}button:focus-visible{outline:1px solid var(--color-text-on-accent);outline-offset:-2px}button:disabled,:host::part(outside),:host::part(disallowed){cursor:default;opacity:.5}`
    ]
  }
);
customElements.define("calendar-month", sn);
function Ut(e) {
  return /* @__PURE__ */ g(
    "button",
    {
      part: `button ${e.name} ${e.onclick ? "" : "disabled"}`,
      onclick: e.onclick,
      "aria-disabled": e.onclick ? null : "true",
      children: /* @__PURE__ */ g("slot", { name: e.name, children: e.children })
    }
  );
}
function St(e) {
  const t = T(e.page.start), n = T(e.page.end);
  return /* @__PURE__ */ B("div", { role: "group", "aria-labelledby": "h", part: "container", children: [
    /* @__PURE__ */ g("div", { id: "h", class: "vh", "aria-live": "polite", "aria-atomic": "true", children: e.formatVerbose.formatRange(t, n) }),
    /* @__PURE__ */ B("div", { part: "header", children: [
      /* @__PURE__ */ g(Ut, { name: "previous", onclick: e.previous, children: "Previous" }),
      /* @__PURE__ */ g("slot", { part: "heading", name: "heading", children: /* @__PURE__ */ g("div", { "aria-hidden": "true", children: e.format.formatRange(t, n) }) }),
      /* @__PURE__ */ g(Ut, { name: "next", onclick: e.next, children: "Next" })
    ] }),
    /* @__PURE__ */ g(
      Et,
      {
        value: e,
        onselectday: e.onSelect,
        onfocusday: e.onFocus,
        onhoverday: e.onHover,
        children: /* @__PURE__ */ g("slot", {})
      }
    )
  ] });
}
const vt = {
  value: {
    type: String,
    value: ""
  },
  min: {
    type: String,
    value: ""
  },
  max: {
    type: String,
    value: ""
  },
  today: {
    type: String,
    value: ""
  },
  isDateDisallowed: {
    type: Function,
    value: (e) => !1
  },
  formatWeekday: {
    type: String,
    value: () => "narrow"
  },
  getDayParts: {
    type: Function,
    value: (e) => ""
  },
  firstDayOfWeek: {
    type: Number,
    value: () => 1
  },
  showOutsideDays: {
    type: Boolean,
    value: !1
  },
  locale: {
    type: String,
    value: () => {
    }
  },
  months: {
    type: Number,
    value: 1
  },
  focusedDate: {
    type: String,
    value: () => {
    }
  },
  highlightRanges: {
    type: String,
    value: ""
  },
  pageBy: {
    type: String,
    value: () => "months"
  }
}, wt = [
  se,
  oe,
  et`:host{display:block;inline-size:fit-content}[role=group]{display:flex;flex-direction:column;gap:1em}:host::part(header){display:flex;align-items:center;justify-content:space-between}:host::part(heading){font-weight:700;font-size:1.25em}button{display:flex;align-items:center;justify-content:center}button[aria-disabled]{cursor:default;opacity:.5}`
], on = { year: "numeric" }, rn = { year: "numeric", month: "long" };
function ft(e, t) {
  return (t.year - e.year) * 12 + t.month - e.month;
}
const Lt = (e, t) => (e = t === 12 ? new st(e.year, 1) : e, {
  start: e,
  end: e.add({ months: t - 1 })
});
function an({
  pageBy: e,
  focusedDate: t,
  months: n,
  max: s,
  min: r,
  goto: o
}) {
  const a = e === "single" ? 1 : n, [l, i] = gt(
    () => Lt(t.toPlainYearMonth(), n)
  ), u = (d) => i(Lt(l.start.add({ months: d }), n)), c = (d) => {
    const f = ft(l.start, d.toPlainYearMonth());
    return f >= 0 && f < n;
  };
  return H(() => {
    if (c(t))
      return;
    const d = ft(t.toPlainYearMonth(), l.start);
    o(t.add({ months: d }));
  }, [l.start]), H(() => {
    if (c(t))
      return;
    const d = ft(l.start, t.toPlainYearMonth());
    u(d === -1 ? -a : d === n ? a : Math.floor(d / n) * n);
  }, [t, a, n]), {
    page: l,
    previous: !r || !c(r) ? () => u(-a) : void 0,
    next: !s || !c(s) ? () => u(a) : void 0
  };
}
function Ct({
  months: e,
  pageBy: t,
  locale: n,
  focusedDate: s,
  setFocusedDate: r
}) {
  const [o] = O("min"), [a] = O("max"), [l] = O("today"), [i] = Xe("highlightRanges"), u = k("focusday"), c = k("change"), d = N(
    () => nt(s ?? l ?? bt(), o, a),
    [s, l, o, a]
  );
  function f(S) {
    r(S), u(T(S));
  }
  const { next: h, previous: D, page: E } = an({
    pageBy: t,
    focusedDate: d,
    months: e,
    min: o,
    max: a,
    goto: f
  }), m = Q();
  function p(S) {
    const R = S?.target ?? "day";
    R === "day" ? m.current.querySelectorAll("calendar-month").forEach((ot) => ot.focus(S)) : m.current.shadowRoot.querySelector(`[part~='${R}']`).focus(S);
  }
  return {
    format: z(on, n),
    formatVerbose: z(rn, n),
    page: E,
    focusedDate: d,
    highlightRanges: i,
    dispatch: c,
    onFocus(S) {
      S.stopPropagation(), f(S.detail), setTimeout(p);
    },
    min: o,
    max: a,
    today: l,
    next: h,
    previous: D,
    focus: p
  };
}
const cn = K(
  (e) => {
    const [t, n] = O("value"), [s = t, r] = O("focusedDate"), o = Ct({
      ...e,
      focusedDate: s,
      setFocusedDate: r
    });
    function a(l) {
      n(l.detail), o.dispatch();
    }
    return /* @__PURE__ */ g("host", { shadowDom: !0, focus: o.focus, children: /* @__PURE__ */ g(
      St,
      {
        ...e,
        ...o,
        type: "date",
        value: t,
        onSelect: a
      }
    ) });
  },
  { props: vt, styles: wt }
);
customElements.define("calendar-date", cn);
const _t = (e, t) => b.compare(e, t) < 0 ? [e, t] : [t, e], ln = K(
  (e) => {
    const [t, n] = Ze("value"), [s = t[0], r] = O("focusedDate"), o = Ct({
      ...e,
      focusedDate: s,
      setFocusedDate: r
    }), a = k("rangestart"), l = k("rangeend"), [i, u] = O(
      "tentative"
    ), [c, d] = gt();
    H(() => d(void 0), [i]);
    function f(m) {
      o.onFocus(m), h(m);
    }
    function h(m) {
      m.stopPropagation(), i && d(m.detail);
    }
    function D(m) {
      const p = m.detail;
      m.stopPropagation(), i ? (n(_t(i, p)), u(void 0), l(T(p)), o.dispatch()) : (u(p), a(T(p)));
    }
    const E = i ? _t(i, c ?? i) : t;
    return /* @__PURE__ */ g("host", { shadowDom: !0, focus: o.focus, children: /* @__PURE__ */ g(
      St,
      {
        ...e,
        ...o,
        type: "range",
        value: E,
        onFocus: f,
        onHover: h,
        onSelect: D
      }
    ) });
  },
  {
    props: {
      ...vt,
      tentative: {
        type: String,
        value: ""
      }
    },
    styles: wt
  }
);
customElements.define("calendar-range", ln);
const un = K(
  (e) => {
    const [t, n] = Ge("value"), [s = t[0], r] = O("focusedDate"), o = Ct({
      ...e,
      focusedDate: s,
      setFocusedDate: r
    });
    function a(l) {
      const i = [...t], u = t.findIndex((c) => c.equals(l.detail));
      u < 0 ? i.push(l.detail) : i.splice(u, 1), n(i), o.dispatch();
    }
    return /* @__PURE__ */ g("host", { shadowDom: !0, focus: o.focus, children: /* @__PURE__ */ g(
      St,
      {
        ...e,
        ...o,
        type: "multi",
        value: t,
        onSelect: a
      }
    ) });
  },
  { props: vt, styles: wt }
);
customElements.define("calendar-multi", un);
export {
  cn as CalendarDate,
  sn as CalendarMonth,
  un as CalendarMulti,
  ln as CalendarRange
};
