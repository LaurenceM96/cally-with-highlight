class De {
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
const xt = (e) => new De(e), Ct = Symbol.for("atomico.hooks");
globalThis[Ct] = globalThis[Ct] || {};
let q = globalThis[Ct];
const ve = Symbol.for("Atomico.suspense"), Gt = Symbol.for("Atomico.effect"), Se = Symbol.for("Atomico.layoutEffect"), Kt = Symbol.for("Atomico.insertionEffect"), _ = (e, t, n) => {
  const { i: s, hooks: r } = q.c, o = r[s] = r[s] || {};
  return o.value = e(o.value), o.effect = t, o.tag = n, q.c.i++, r[s].value;
}, Wt = (e) => _((t = xt(e)) => t), it = () => _((e = xt(q.c.host)) => e), Jt = () => q.c.update, Ee = (e, t, n = 0) => {
  let s = {}, r = !1;
  const o = () => r, i = (l, c) => {
    for (const h in s) {
      const u = s[h];
      u.effect && u.tag === l && (u.value = u.effect(u.value, c));
    }
  };
  return { load: (l) => {
    q.c = { host: t, hooks: s, update: e, i: 0, id: n };
    let c;
    try {
      r = !1, c = l();
    } catch (h) {
      if (h !== ve) throw h;
      r = !0;
    } finally {
      q.c = null;
    }
    return c;
  }, cleanEffects: (l) => (i(Kt, l), () => (i(Se, l), () => {
    i(Gt, l);
  })), isSuspense: o };
}, J = Symbol.for;
function Zt(e, t) {
  const n = e.length;
  if (n !== t.length) return !1;
  for (let s = 0; s < n; s++) {
    let r = e[s], o = t[s];
    if (r !== o) return !1;
  }
  return !0;
}
const R = (e) => typeof e == "function", z = (e) => typeof e == "object", { isArray: we } = Array, Tt = (e, t) => (t ? e instanceof HTMLStyleElement : !0) && "hydrate" in (e?.dataset || {});
function Xt(e, t) {
  let n;
  const s = (r) => {
    let { length: o } = r;
    for (let i = 0; i < o; i++) {
      const f = r[i];
      if (f && Array.isArray(f))
        s(f);
      else {
        const a = typeof f;
        if (f == null || a === "function" || a === "boolean")
          continue;
        a === "string" || a === "number" ? (n == null && (n = ""), n += f) : (n != null && (t(n), n = null), t(f));
      }
    }
  };
  s(e), n != null && t(n);
}
const Qt = (e, t, n) => (e.addEventListener(t, n), () => e.removeEventListener(t, n));
class Vt {
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
class te extends Vt {
}
class Ce extends Vt {
}
const rt = "Custom", Te = null, Pe = { true: 1, "": 1, 1: 1 };
function Ne(e, t, n, s, r) {
  const {
    type: o,
    reflect: i,
    event: f,
    value: a,
    attr: l = ke(t)
  } = n?.name != rt && z(n) && n != Te ? n : { type: n }, c = o?.name === rt && o.map, h = a != null ? o == Function || !R(a) ? () => a : a : null;
  Object.defineProperty(e, t, {
    configurable: !0,
    /**
     * @this {import("dom").AtomicoThisInternal}
     * @param {any} newValue
     */
    set(u) {
      const d = this[t];
      h && o != Boolean && u == null && (u = h());
      const { error: S, value: E } = (c ? $e : Me)(
        o,
        u
      );
      if (S && E != null)
        throw new te(
          this,
          `The value defined for prop '${t}' must be of type '${o.name}'`,
          E
        );
      d != E && (this._props[t] = E ?? void 0, this.update(), f && ee(this, f), this.updated.then(() => {
        i && (this._ignoreAttr = l, Re(this, o, l, this[t]), this._ignoreAttr = null);
      }));
    },
    /**
     * @this {import("dom").AtomicoThisInternal}
     */
    get() {
      return this._props[t];
    }
  }), h && (r[t] = h()), s[l] = { prop: t, type: o };
}
const ee = (e, { type: t, base: n = CustomEvent, ...s }) => e.dispatchEvent(new n(t, s)), ke = (e) => e.replace(/([A-Z])/g, "-$1").toLowerCase(), Re = (e, t, n, s) => s == null || t == Boolean && !s ? e.removeAttribute(n) : e.setAttribute(
  n,
  t?.name === rt && t?.serialize ? t?.serialize(s) : z(s) ? JSON.stringify(s) : t == Boolean ? "" : s
), Oe = (e, t) => e == Boolean ? !!Pe[t] : e == Number ? Number(t) : e == String ? t : e == Array || e == Object ? JSON.parse(t) : e.name == rt ? t : (
  // TODO: If when defining reflect the prop can also be of type string?
  new e(t)
), $e = ({ map: e }, t) => {
  try {
    return { value: e(t), error: !1 };
  } catch {
    return { value: t, error: !0 };
  }
}, Me = (e, t) => e == null || t == null ? { value: t, error: !1 } : e != String && t === "" ? { value: void 0, error: !1 } : e == Object || e == Array || e == Symbol ? {
  value: t,
  error: {}.toString.call(t) !== `[object ${e.name}]`
} : t instanceof e ? {
  value: t,
  error: e == Number && Number.isNaN(t.valueOf())
} : e == String || e == Number || e == Boolean ? {
  value: t,
  error: e == Number ? typeof t != "number" ? !0 : Number.isNaN(t) : e == String ? typeof t != "string" : typeof t != "boolean"
} : { value: t, error: !0 };
let Ae = 0;
const Ie = (e) => {
  const t = (e?.dataset || {})?.hydrate || "";
  return t || "c" + Ae++;
}, j = (e, t = HTMLElement) => {
  const n = {}, s = {}, r = "prototype" in t && t.prototype instanceof Element, o = r ? t : "base" in t ? t.base : HTMLElement, { props: i, styles: f } = r ? e : t;
  class a extends o {
    constructor() {
      super(), this._setup(), this._render = () => e({ ...this._props });
      for (const c in s) this[c] = s[c];
    }
    /**
     * @returns {import("core").Sheets[]}
     */
    static get styles() {
      return [super.styles, f];
    }
    async _setup() {
      if (this._props) return;
      this._props = {};
      let c, h;
      this.mounted = new Promise(
        (m) => this.mount = () => {
          m(), c != this.parentNode && (h != c ? this.unmounted.then(this.update) : this.update()), c = this.parentNode;
        }
      ), this.unmounted = new Promise(
        (m) => this.unmount = () => {
          m(), (c != this.parentNode || !this.isConnected) && (u.cleanEffects(!0)()(), h = this.parentNode, c = null);
        }
      ), this.symbolId = this.symbolId || Symbol(), this.symbolIdParent = Symbol();
      const u = Ee(
        () => this.update(),
        this,
        Ie(this)
      );
      let d, S = !0;
      const E = Tt(this);
      this.update = () => (d || (d = !0, this.updated = (this.updated || this.mounted).then(() => {
        try {
          const m = u.load(this._render), b = u.cleanEffects();
          return m && //@ts-ignore
          m.render(this, this.symbolId, E), d = !1, S && !u.isSuspense() && (S = !1, !E && Fe(this)), b();
        } finally {
          d = !1;
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
    attributeChangedCallback(c, h, u) {
      if (n[c]) {
        if (c === this._ignoreAttr || h === u) return;
        const { prop: d, type: S } = n[c];
        try {
          this[d] = Oe(S, u);
        } catch {
          throw new Ce(
            this,
            `The value defined as attr '${c}' cannot be parsed by type '${S.name}'`,
            u
          );
        }
      } else
        super.attributeChangedCallback(c, h, u);
    }
    static get props() {
      return { ...super.props, ...i };
    }
    static get observedAttributes() {
      const c = super.observedAttributes || [];
      for (const h in i)
        Ne(this.prototype, h, i[h], n, s);
      return Object.keys(n).concat(c);
    }
  }
  return a;
};
function Fe(e) {
  const { styles: t } = e.constructor, { shadowRoot: n } = e;
  if (n && t.length) {
    const s = [];
    Xt(t, (r) => {
      r && (r instanceof Element ? n.appendChild(r.cloneNode(!0)) : s.push(r));
    }), s.length && (n.adoptedStyleSheets = s);
  }
}
const ne = (e) => (t, n) => {
  _(
    /**
     * Clean the effect hook
     * @type {import("internal/hooks.js").CollectorEffect}
     */
    ([s, r] = []) => ((r || !r) && (r && Zt(r, n) ? s = s || !0 : (R(s) && s(), s = null)), [s, n]),
    /**
     * @returns {any}
     */
    ([s, r], o) => o ? (R(s) && s(), []) : [s || t(), r],
    e
  );
}, K = ne(Gt), Ue = ne(Kt);
class se extends Array {
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
const Rt = (e) => {
  const t = Jt();
  return _(
    (n = new se(e, (s, r, o) => {
      s = R(s) ? s(r[0]) : s, s !== r[0] && (r[0] = s, o || t());
    })) => n
  );
}, P = (e, t) => {
  const [n] = _(([s, r, o = 0] = []) => ((!r || r && !Zt(r, t)) && (s = e()), [s, t, o]));
  return n;
}, Z = (e) => {
  const { current: t } = it();
  if (!(e in t))
    throw new te(
      t,
      `For useProp("${e}"), the prop does not exist on the host.`,
      e
    );
  return _(
    (n = new se(t[e], (s, r) => {
      s = R(s) ? s(t[e]) : s, t[e] = s;
    })) => (n[0] = t[e], n)
  );
}, A = (e, t = {}) => {
  const n = it();
  return n[e] || (n[e] = (s = t.detail) => ee(n.current, {
    type: e,
    ...t,
    detail: s
  })), n[e];
}, Pt = J("atomico/options");
globalThis[Pt] = globalThis[Pt] || {
  sheet: !!document.adoptedStyleSheets
};
const at = globalThis[Pt], Le = new Promise((e) => {
  at.ssr || (document.readyState === "loading" ? Qt(document, "DOMContentLoaded", e) : e());
}), qe = {
  checked: 1,
  value: 1,
  selected: 1
}, _e = {
  list: 1,
  type: 1,
  size: 1,
  form: 1,
  width: 1,
  height: 1,
  src: 1,
  href: 1,
  slot: 1
}, je = {
  shadowDom: 1,
  staticNode: 1,
  cloneNode: 1,
  children: 1,
  key: 1
}, ot = {}, Nt = [];
class kt extends Text {
}
const He = J("atomico/id"), x = J("atomico/type"), Dt = J("atomico/ref"), oe = J("atomico/vnode"), Ye = () => {
};
function Be(e, t, n) {
  return ie(this, e, t, n);
}
const re = (e, t, ...n) => {
  const s = t || ot;
  let { children: r } = s;
  if (r = r ?? (n.length ? n : Nt), e === Ye)
    return r;
  const o = e ? e instanceof Node ? 1 : (
    //@ts-ignore
    e.prototype instanceof HTMLElement && 2
  ) : 0;
  if (o === !1 && e instanceof Function)
    return e(
      r != Nt ? { children: r, ...s } : s
    );
  const i = at.render || Be;
  return {
    [x]: oe,
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
    render: i
  };
};
function ie(e, t, n = He, s, r) {
  let o;
  if (t && t[n] && t[n].vnode == e || e[x] != oe)
    return t;
  (e || !t) && (r = r || e.type == "svg", o = e.type != "host" && (e.raw == 1 ? (t && e.clone ? t[Dt] : t) != e.type : e.raw == 2 ? !(t instanceof e.type) : t ? t[Dt] || t.localName != e.type : !t), o && e.type != null && (e.raw == 1 && e.clone ? (s = !0, t = e.type.cloneNode(!0), t[Dt] = e.type) : t = e.raw == 1 ? e.type : e.raw == 2 ? new e.type() : r ? document.createElementNS(
    "http://www.w3.org/2000/svg",
    e.type
  ) : document.createElement(
    e.type,
    e.is ? { is: e.is } : void 0
  )));
  const i = t[n] ? t[n] : ot, { vnode: f = ot, cycle: a = 0 } = i;
  let { fragment: l, handlers: c } = i;
  const { children: h = Nt, props: u = ot } = f;
  if (c = o ? {} : c || {}, e.static && !o) return t;
  if (e.shadow && !t.shadowRoot && // @ts-ignore
  t.attachShadow({ mode: "open", ...e.shadow }), e.props != u && Ge(t, u, e.props, c, r), e.children !== h) {
    const d = e.shadow ? t.shadowRoot : t;
    l = xe(
      e.children,
      /**
       * @todo for hydration use attribute and send childNodes
       */
      l,
      d,
      n,
      // add support to foreignObject, children will escape from svg
      !a && s,
      r && e.type == "foreignObject" ? !1 : r
    );
  }
  return t[n] = { vnode: e, handlers: c, fragment: l, cycle: a + 1 }, t;
}
function ze(e, t) {
  const n = new kt(""), s = new kt("");
  let r;
  if (e[t ? "prepend" : "append"](n), t) {
    let { lastElementChild: o } = e;
    for (; o; ) {
      const { previousElementSibling: i } = o;
      if (Tt(o, !0) && !Tt(i, !0)) {
        r = o;
        break;
      }
      o = i;
    }
  }
  return r ? r.before(s) : e.append(s), {
    markStart: n,
    markEnd: s
  };
}
function xe(e, t, n, s, r, o) {
  e = e == null ? null : we(e) ? e : [e];
  const i = t || ze(n, r), { markStart: f, markEnd: a, keyes: l } = i;
  let c;
  const h = l && /* @__PURE__ */ new Set();
  let u = f;
  if (e && Xt(e, (d) => {
    if (typeof d == "object" && !d[x])
      return;
    const S = d[x] && d.key, E = l && S != null && l.get(S);
    u != a && u === E ? h.delete(u) : u = u == a ? a : u.nextSibling;
    const m = l ? E : u;
    let b = m;
    if (d[x])
      b = ie(d, m, s, r, o);
    else {
      const w = d + "";
      !(b instanceof Text) || b instanceof kt ? b = new Text(w) : b.data != w && (b.data = w);
    }
    b != u && (l && h.delete(b), !m || l ? (n.insertBefore(b, u), l && u != a && h.add(u)) : m == a ? n.insertBefore(b, a) : (n.replaceChild(b, m), u = b)), S != null && (c = c || /* @__PURE__ */ new Map(), c.set(S, b));
  }), u = u == a ? a : u.nextSibling, t && u != a)
    for (; u != a; ) {
      const d = u;
      u = u.nextSibling, d.remove();
    }
  return h && h.forEach((d) => d.remove()), i.keyes = c, i;
}
function Ge(e, t, n, s, r) {
  for (const o in t)
    !(o in n) && Ut(e, o, t[o], null, r, s);
  for (const o in n)
    Ut(e, o, t[o], n[o], r, s);
}
function Ut(e, t, n, s, r, o) {
  if (t = t == "class" && !r ? "className" : t, n = n ?? null, s = s ?? null, t in e && qe[t] && (n = e[t]), !(s === n || je[t] || t[0] == "_"))
    if (e.localName === "slot" && t === "assignNode" && "assign" in e)
      e.assign(s);
    else if (t[0] == "o" && t[1] == "n" && (R(s) || R(n)))
      Ke(e, t.slice(2), s, o);
    else if (t == "ref")
      s && (R(s) ? s(e) : s.current = e);
    else if (t == "style") {
      const { style: i } = e;
      n = n || "", s = s || "";
      const f = z(n), a = z(s);
      if (f)
        for (const l in n)
          if (a)
            !(l in s) && Lt(i, l, null);
          else
            break;
      if (a)
        for (const l in s) {
          const c = s[l];
          f && n[l] === c || Lt(i, l, c);
        }
      else
        i.cssText = s;
    } else {
      const i = t[0] == "$" ? t.slice(1) : t;
      i === t && (!r && !_e[t] && t in e || R(s) || R(n)) ? e[t] = s ?? "" : s == null ? e.removeAttribute(i) : e.setAttribute(
        i,
        z(s) ? JSON.stringify(s) : s
      );
    }
}
function Ke(e, t, n, s) {
  if (s.handleEvent || (s.handleEvent = (r) => s[r.type].call(e, r)), n) {
    if (!s[t]) {
      const r = n.capture || n.once || n.passive ? Object.assign({}, n) : null;
      e.addEventListener(t, s, r);
    }
    s[t] = n;
  } else
    s[t] && (e.removeEventListener(t, s), delete s[t]);
}
function Lt(e, t, n) {
  let s = "setProperty";
  n == null && (s = "removeProperty", n = null), ~t.indexOf("-") ? e[s](t, n) : e[t] = n;
}
const We = re("host", { style: "display: contents" }), ae = "value", Je = (e, t) => {
  const n = it(), s = Wt();
  Ue(
    () => Qt(
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
}, Ze = (e) => {
  const t = A("ConnectContext", {
    bubbles: !0,
    composed: !0
  }), [n, s] = Rt(() => {
    if (at.ssr) return;
    let o;
    return t({
      id: e,
      /**
       * @param {import("core").Ref} parentContext
       */
      connect(i) {
        o = i;
      }
    }), o;
  }), r = Jt();
  return K(() => {
    Le.then(
      () => t({
        id: e,
        connect: s
      })
    );
  }, [e]), K(() => {
    if (n)
      return n.on(r);
  }, [n]), n?.current || e[ae];
}, ce = (e) => {
  const t = j(
    ({ value: n }) => (Je(t, n), We),
    {
      props: {
        value: {
          type: Object,
          value: () => e
        }
      }
    }
  );
  return t[ae] = e, t;
};
ce({
  /**
   *
   * @param {string} type
   * @param {string} id
   */
  dispatch(e, t) {
  }
});
const qt = {};
function ct(e, ...t) {
  const n = (e.raw || e).reduce(
    (s, r, o) => s + r + (t[o] || ""),
    ""
  );
  return qt[n] = qt[n] || Xe(n);
}
function Xe(e) {
  if (at.sheet) {
    const t = new CSSStyleSheet();
    return t.replaceSync(e), t;
  } else {
    const t = document.createElement("style");
    return t.textContent = e, t;
  }
}
const y = (e, t, n) => (t == null ? t = { key: n } : t.key = n, re(e, t)), G = y, le = ct`*,*:before,*:after{box-sizing:border-box}button{padding:0;touch-action:manipulation;cursor:pointer;user-select:none}`, ue = ct`.vh{position:absolute;transform:scale(0)}`;
function Ot() {
  const e = /* @__PURE__ */ new Date();
  return new D(e.getFullYear(), e.getMonth() + 1, e.getDate());
}
function $t(e, t = 0) {
  const n = N(e), s = n.getUTCDay(), r = (s < t ? 7 : 0) + s - t;
  return n.setUTCDate(n.getUTCDate() - r), D.from(n);
}
function fe(e, t = 0) {
  return $t(e, t).add({ days: 6 });
}
function he(e) {
  return D.from(new Date(Date.UTC(e.year, e.month, 0)));
}
function X(e, t, n) {
  return t && D.compare(e, t) < 0 ? t : n && D.compare(e, n) > 0 ? n : e;
}
const Qe = { days: 1 };
function Ve(e, t = 0) {
  let n = $t(e.toPlainDate(), t);
  const s = fe(he(e), t), r = [];
  for (; D.compare(n, s) < 0; ) {
    const o = [];
    for (let i = 0; i < 7; i++)
      o.push(n), n = n.add(Qe);
    r.push(o);
  }
  return r;
}
function N(e) {
  return new Date(Date.UTC(e.year, e.month - 1, e.day ?? 1));
}
const tn = /^(\d{4})-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[0-1])$/, vt = (e, t) => e.toString().padStart(t, "0");
class D {
  constructor(t, n, s) {
    this.year = t, this.month = n, this.day = s;
  }
  // this is an incomplete implementation that only handles arithmetic on a single unit at a time.
  // i didn't want to get into more complex arithmetic since it get tricky fast
  // this is enough to serve my needs and will still be a drop-in replacement when actual Temporal API lands
  add(t) {
    const n = N(this);
    if ("days" in t)
      return n.setUTCDate(this.day + t.days), D.from(n);
    let { year: s, month: r } = this;
    "months" in t ? (r = this.month + t.months, n.setUTCMonth(r - 1)) : (s = this.year + t.years, n.setUTCFullYear(s));
    const o = D.from(N({ year: s, month: r, day: 1 }));
    return X(D.from(n), o, he(o));
  }
  toString() {
    return `${vt(this.year, 4)}-${vt(this.month, 2)}-${vt(this.day, 2)}`;
  }
  toPlainYearMonth() {
    return new lt(this.year, this.month);
  }
  equals(t) {
    return D.compare(this, t) === 0;
  }
  static compare(t, n) {
    return t.year < n.year ? -1 : t.year > n.year ? 1 : t.month < n.month ? -1 : t.month > n.month ? 1 : t.day < n.day ? -1 : t.day > n.day ? 1 : 0;
  }
  static from(t) {
    if (typeof t == "string") {
      const n = t.match(tn);
      if (!n)
        throw new TypeError(t);
      const [, s, r, o] = n;
      return new D(
        parseInt(s, 10),
        parseInt(r, 10),
        parseInt(o, 10)
      );
    }
    return new D(
      t.getUTCFullYear(),
      t.getUTCMonth() + 1,
      t.getUTCDate()
    );
  }
}
class lt {
  constructor(t, n) {
    this.year = t, this.month = n;
  }
  add(t) {
    const n = N(this), s = (t.months ?? 0) + (t.years ?? 0) * 12;
    return n.setUTCMonth(n.getUTCMonth() + s), new lt(n.getUTCFullYear(), n.getUTCMonth() + 1);
  }
  equals(t) {
    return this.year === t.year && this.month === t.month;
  }
  toPlainDate() {
    return new D(this.year, this.month, 1);
  }
}
function I(e, t) {
  if (t)
    try {
      return e.from(t);
    } catch {
    }
}
function M(e) {
  const [t, n] = Z(e);
  return [P(() => I(D, t), [t]), (o) => n(o?.toString())];
}
function de(e) {
  const [t = "", n] = Z(e);
  return [P(() => {
    const [o, i] = t.split("/"), f = I(D, o), a = I(D, i);
    return f && a ? [f, a] : [];
  }, [t]), (o) => n(`${o[0]}/${o[1]}`)];
}
function en(e) {
  const [t = "", n] = Z(e);
  return [P(() => t ? t.split("+").map((o) => {
    const [i, f] = o.split("/"), a = I(D, i), l = I(D, f);
    return a && l ? [a, l] : null;
  }).filter((o) => o !== null) : [], [t]), (o) => {
    const i = o.map(([f, a]) => `${f}/${a}`).join("+");
    n(i);
  }];
}
function nn(e) {
  const [t = ""] = Z(e);
  return P(() => {
    if (!t) return [];
    const n = [];
    for (const s of t.split("|")) {
      if (!s.trim()) continue;
      const r = s.indexOf(":");
      let o, i = s;
      if (r > 0) {
        const a = s.substring(0, r), l = parseInt(a, 10);
        !isNaN(l) && l >= 0 && (o = l, i = s.substring(r + 1));
      }
      const f = i.split("+").map((a) => {
        const [l, c] = a.split("/"), h = I(D, l), u = I(D, c);
        return h && u ? [h, u] : null;
      }).filter((a) => a !== null);
      f.length > 0 && (o !== void 0 ? n[o] = f : n.push(f));
    }
    return n;
  }, [t]);
}
function sn(e) {
  const [t = "", n] = Z(e);
  return [P(() => {
    const o = [];
    for (const i of t.trim().split(/\s+/)) {
      const f = I(D, i);
      f && o.push(f);
    }
    return o;
  }, [t]), (o) => n(o.join(" "))];
}
function W(e, t) {
  return P(
    () => new Intl.DateTimeFormat(t, { timeZone: "UTC", ...e }),
    [t, e]
  );
}
function _t(e, t, n) {
  const s = W(e, n);
  return P(() => {
    const r = [], o = /* @__PURE__ */ new Date();
    for (var i = 0; i < 7; i++) {
      const f = (o.getUTCDay() - t + 7) % 7;
      r[f] = s.format(o), o.setUTCDate(o.getUTCDate() + 1);
    }
    return r;
  }, [t, s]);
}
const T = (e, t, n) => X(e, t, n) === e, jt = (e) => e.target.matches(":dir(ltr)"), on = { month: "long", day: "numeric" }, rn = { month: "long" }, an = { weekday: "long" }, St = { bubbles: !0 };
function cn({ props: e, context: t }) {
  const { offset: n } = e, {
    firstDayOfWeek: s,
    isDateDisallowed: r,
    min: o,
    max: i,
    today: f,
    page: a,
    locale: l,
    focusedDate: c,
    formatWeekday: h
  } = t, u = f ?? Ot(), d = _t(an, s, l), S = P(
    () => ({ weekday: h }),
    [h]
  ), E = _t(S, s, l), m = W(on, l), b = W(rn, l), w = P(
    () => a.start.add({ months: n }),
    [a, n]
  ), Q = P(
    () => Ve(w, s),
    [w, s]
  ), gt = A("focusday", St), ge = A("selectday", St), me = A("hoverday", St);
  function At(g) {
    gt(X(g, o, i));
  }
  function pe(g) {
    let C;
    switch (g.key) {
      case "ArrowRight":
        C = c.add({ days: jt(g) ? 1 : -1 });
        break;
      case "ArrowLeft":
        C = c.add({ days: jt(g) ? -1 : 1 });
        break;
      case "ArrowDown":
        C = c.add({ days: 7 });
        break;
      case "ArrowUp":
        C = c.add({ days: -7 });
        break;
      case "PageUp":
        C = c.add(g.shiftKey ? { years: -1 } : { months: -1 });
        break;
      case "PageDown":
        C = c.add(g.shiftKey ? { years: 1 } : { months: 1 });
        break;
      case "Home":
        C = $t(c, s);
        break;
      case "End":
        C = fe(c, s);
        break;
      default:
        return;
    }
    At(C), g.preventDefault();
  }
  function ye(g) {
    const C = w.equals(g);
    if (!t.showOutsideDays && !C)
      return;
    const be = g.equals(c), It = g.equals(u), V = N(g), tt = r?.(V), Ft = !T(g, o, i);
    let mt = "", O, U, L;
    const H = g.add({ days: -1 }), Y = g.add({ days: 1 });
    if (t.type === "range") {
      const [p, v] = t.value, k = p?.equals(g), $ = v?.equals(g);
      O = p && v && T(g, p, v), U = p && v && T(H, p, v), L = p && v && T(Y, p, v), mt = `${k ? "range-start" : ""} ${$ ? "range-end" : ""} ${O && !k && !$ ? "range-inner" : ""}`;
    } else if (t.type === "multi")
      O = t.value.some((p) => p.equals(g)), U = t.value.some((p) => p.equals(H)), L = t.value.some((p) => p.equals(Y));
    else if (t.type === "highlight") {
      const [p, v] = t.value;
      O = p && v && T(g, p, v), U = p && v && T(H, p, v), L = p && v && T(Y, p, v), mt = `${O ? "highlight-selected" : ""}`;
    } else
      O = t.value?.equals(g), U = t.value?.equals(H), L = t.value?.equals(Y);
    let pt = "";
    if (t.type === "highlight" && t.highlightGroups?.length > 0)
      for (let p = 0; p < t.highlightGroups.length; p++) {
        const v = t.highlightGroups[p];
        if (v)
          for (const [k, $] of v) {
            const B = k?.equals(g), F = $?.equals(g), et = k && $ && T(g, k, $);
            let yt = !1, bt = !1;
            for (const [nt, st] of v)
              nt && st && T(H, nt, st) && (yt = !0), nt && st && T(Y, nt, st) && (bt = !0);
            if (et) {
              pt += ` highlight-group-${p} ${B || et && !yt ? "highlight-start" : ""} ${F || et && !bt ? "highlight-end" : ""} ${et && !B && !F && yt && bt ? "highlight-inner" : ""}`;
              break;
            }
          }
      }
    else if (t.highlightRanges?.length > 0 && !O)
      for (const p of t.highlightRanges) {
        const [v, k] = p, $ = v?.equals(g), B = k?.equals(g), F = v && k && T(g, v, k);
        F && (pt = `${$ || F && U ? "highlight-start" : ""} ${B || F && L ? "highlight-end" : ""} ${F && !$ && !B && !U && !L ? "highlight-inner" : ""}`);
      }
    return {
      part: `${`button day day-${V.getDay()} ${// we don't want outside days to ever be shown as selected
      C ? O && t.type !== "highlight" ? "selected" : "" : "outside"} ${tt ? "disallowed" : ""} ${It ? "today" : ""} ${t.getDayParts?.(V) ?? ""}`} ${mt} ${pt}`,
      tabindex: C && be ? 0 : -1,
      disabled: Ft,
      "aria-disabled": tt ? "true" : void 0,
      "aria-pressed": C && O,
      "aria-current": It ? "date" : void 0,
      "aria-label": m.format(V),
      onkeydown: pe,
      onclick() {
        tt || ge(g), At(g);
      },
      onmouseover() {
        !tt && !Ft && me(g);
      }
    };
  }
  return {
    weeks: Q,
    yearMonth: w,
    daysLong: d,
    daysVisible: E,
    formatter: b,
    getDayProps: ye
  };
}
const Et = Ot(), Mt = ce({
  type: "date",
  firstDayOfWeek: 1,
  focusedDate: Et,
  page: { start: Et.toPlainYearMonth(), end: Et.toPlainYearMonth() }
});
customElements.define("calendar-ctx", Mt);
const ln = (e, t) => (t + e) % 7, un = j(
  (e) => {
    const t = Ze(Mt), n = Wt(), s = cn({ props: e, context: t });
    function r() {
      n.current.querySelector("button[tabindex='0']")?.focus();
    }
    return /* @__PURE__ */ G("host", { shadowDom: !0, focus: r, children: [
      /* @__PURE__ */ y("div", { id: "h", part: "heading", children: s.formatter.format(N(s.yearMonth)) }),
      /* @__PURE__ */ G("table", { ref: n, "aria-labelledby": "h", part: "table", children: [
        /* @__PURE__ */ y("thead", { children: /* @__PURE__ */ y("tr", { part: "tr head", children: s.daysLong.map((o, i) => /* @__PURE__ */ G(
          "th",
          {
            part: `th day day-${ln(t.firstDayOfWeek, i)}`,
            scope: "col",
            children: [
              /* @__PURE__ */ y("span", { class: "vh", children: o }),
              /* @__PURE__ */ y("span", { "aria-hidden": "true", children: s.daysVisible[i] })
            ]
          }
        )) }) }),
        /* @__PURE__ */ y("tbody", { children: s.weeks.map((o, i) => /* @__PURE__ */ y("tr", { part: "tr week", children: o.map((f, a) => {
          const l = s.getDayProps(f);
          return /* @__PURE__ */ y("td", { part: "td", children: l && /* @__PURE__ */ y("button", { ...l, children: f.day }) }, a);
        }) }, i)) })
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
      le,
      ue,
      ct`:host{--color-accent: black;--color-text-on-accent: white;display:flex;flex-direction:column;gap:.25rem;text-align:center;inline-size:fit-content}table{border-collapse:collapse;font-size:.875rem}th{font-weight:700;block-size:2.25rem}td{padding-inline:0}button{color:inherit;font-size:inherit;background:transparent;border:0;font-variant-numeric:tabular-nums;block-size:2.25rem;inline-size:2.25rem}button:hover:where(:not(:disabled,[aria-disabled])){background:#0000000d}button:is([aria-pressed=true],:focus-visible){background:var(--color-accent);color:var(--color-text-on-accent)}button:focus-visible{outline:1px solid var(--color-text-on-accent);outline-offset:-2px}button:disabled,:host::part(outside),:host::part(disallowed){cursor:default;opacity:.5}`
    ]
  }
);
customElements.define("calendar-month", un);
function Ht(e) {
  return /* @__PURE__ */ y(
    "button",
    {
      part: `button ${e.name} ${e.onclick ? "" : "disabled"}`,
      onclick: e.onclick,
      "aria-disabled": e.onclick ? null : "true",
      children: /* @__PURE__ */ y("slot", { name: e.name, children: e.children })
    }
  );
}
function ut(e) {
  const t = N(e.page.start), n = N(e.page.end);
  return /* @__PURE__ */ G("div", { role: "group", "aria-labelledby": "h", part: "container", children: [
    /* @__PURE__ */ y("div", { id: "h", class: "vh", "aria-live": "polite", "aria-atomic": "true", children: e.formatVerbose.formatRange(t, n) }),
    /* @__PURE__ */ G("div", { part: "header", children: [
      /* @__PURE__ */ y(Ht, { name: "previous", onclick: e.previous, children: "Previous" }),
      /* @__PURE__ */ y("slot", { part: "heading", name: "heading", children: /* @__PURE__ */ y("div", { "aria-hidden": "true", children: e.format.formatRange(t, n) }) }),
      /* @__PURE__ */ y(Ht, { name: "next", onclick: e.next, children: "Next" })
    ] }),
    /* @__PURE__ */ y(
      Mt,
      {
        value: e,
        onselectday: e.onSelect,
        onfocusday: e.onFocus,
        onhoverday: e.onHover,
        children: /* @__PURE__ */ y("slot", {})
      }
    )
  ] });
}
const ft = {
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
}, ht = [
  le,
  ue,
  ct`:host{display:block;inline-size:fit-content}[role=group]{display:flex;flex-direction:column;gap:1em}:host::part(header){display:flex;align-items:center;justify-content:space-between}:host::part(heading){font-weight:700;font-size:1.25em}button{display:flex;align-items:center;justify-content:center}button[aria-disabled]{cursor:default;opacity:.5}`
], fn = { year: "numeric" }, hn = { year: "numeric", month: "long" };
function wt(e, t) {
  return (t.year - e.year) * 12 + t.month - e.month;
}
const Yt = (e, t) => (e = t === 12 ? new lt(e.year, 1) : e, {
  start: e,
  end: e.add({ months: t - 1 })
});
function dn({
  pageBy: e,
  focusedDate: t,
  months: n,
  max: s,
  min: r,
  goto: o
}) {
  const i = e === "single" ? 1 : n, [f, a] = Rt(
    () => Yt(t.toPlainYearMonth(), n)
  ), l = (h) => a(Yt(f.start.add({ months: h }), n)), c = (h) => {
    const u = wt(f.start, h.toPlainYearMonth());
    return u >= 0 && u < n;
  };
  return K(() => {
    if (c(t))
      return;
    const h = wt(t.toPlainYearMonth(), f.start);
    o(t.add({ months: h }));
  }, [f.start]), K(() => {
    if (c(t))
      return;
    const h = wt(f.start, t.toPlainYearMonth());
    l(h === -1 ? -i : h === n ? i : Math.floor(h / n) * n);
  }, [t, i, n]), {
    page: f,
    previous: !r || !c(r) ? () => l(-i) : void 0,
    next: !s || !c(s) ? () => l(i) : void 0
  };
}
function dt({
  months: e,
  pageBy: t,
  locale: n,
  focusedDate: s,
  setFocusedDate: r
}) {
  const [o] = M("min"), [i] = M("max"), [f] = M("today"), [a] = en("highlightRanges"), l = A("focusday"), c = A("change"), h = P(
    () => X(s ?? f ?? Ot(), o, i),
    [s, f, o, i]
  );
  function u(w) {
    r(w), l(N(w));
  }
  const { next: d, previous: S, page: E } = dn({
    pageBy: t,
    focusedDate: h,
    months: e,
    min: o,
    max: i,
    goto: u
  }), m = it();
  function b(w) {
    const Q = w?.target ?? "day";
    Q === "day" ? m.current.querySelectorAll("calendar-month").forEach((gt) => gt.focus(w)) : m.current.shadowRoot.querySelector(`[part~='${Q}']`).focus(w);
  }
  return {
    format: W(fn, n),
    formatVerbose: W(hn, n),
    page: E,
    focusedDate: h,
    highlightRanges: a,
    dispatch: c,
    onFocus(w) {
      w.stopPropagation(), u(w.detail), setTimeout(b);
    },
    min: o,
    max: i,
    today: f,
    next: d,
    previous: S,
    focus: b
  };
}
const gn = j(
  (e) => {
    const [t, n] = M("value"), [s = t, r] = M("focusedDate"), o = dt({
      ...e,
      focusedDate: s,
      setFocusedDate: r
    });
    function i(f) {
      n(f.detail), o.dispatch();
    }
    return /* @__PURE__ */ y("host", { shadowDom: !0, focus: o.focus, children: /* @__PURE__ */ y(
      ut,
      {
        ...e,
        ...o,
        type: "date",
        value: t,
        onSelect: i
      }
    ) });
  },
  { props: ft, styles: ht }
);
customElements.define("calendar-date", gn);
const Bt = (e, t) => D.compare(e, t) < 0 ? [e, t] : [t, e], mn = j(
  (e) => {
    const [t, n] = de("value"), [s = t[0], r] = M("focusedDate"), o = dt({
      ...e,
      focusedDate: s,
      setFocusedDate: r
    }), i = A("rangestart"), f = A("rangeend"), [a, l] = M(
      "tentative"
    ), [c, h] = Rt();
    K(() => h(void 0), [a]);
    function u(m) {
      o.onFocus(m), d(m);
    }
    function d(m) {
      m.stopPropagation(), a && h(m.detail);
    }
    function S(m) {
      const b = m.detail;
      m.stopPropagation(), a ? (n(Bt(a, b)), l(void 0), f(N(b)), o.dispatch()) : (l(b), i(N(b)));
    }
    const E = a ? Bt(a, c ?? a) : t;
    return /* @__PURE__ */ y("host", { shadowDom: !0, focus: o.focus, children: /* @__PURE__ */ y(
      ut,
      {
        ...e,
        ...o,
        type: "range",
        value: E,
        onFocus: u,
        onHover: d,
        onSelect: S
      }
    ) });
  },
  {
    props: {
      ...ft,
      tentative: {
        type: String,
        value: ""
      }
    },
    styles: ht
  }
);
customElements.define("calendar-range", mn);
const pn = j(
  (e) => {
    const [t, n] = sn("value"), [s = t[0], r] = M("focusedDate"), o = dt({
      ...e,
      focusedDate: s,
      setFocusedDate: r
    });
    function i(f) {
      const a = [...t], l = t.findIndex((c) => c.equals(f.detail));
      l < 0 ? a.push(f.detail) : a.splice(l, 1), n(a), o.dispatch();
    }
    return /* @__PURE__ */ y("host", { shadowDom: !0, focus: o.focus, children: /* @__PURE__ */ y(
      ut,
      {
        ...e,
        ...o,
        type: "multi",
        value: t,
        onSelect: i
      }
    ) });
  },
  { props: ft, styles: ht }
);
customElements.define("calendar-multi", pn);
const zt = (e, t, n) => X(e, t, n) === e, yn = j(
  (e) => {
    const [t, n] = de("value"), [s = t[0], r] = M("focusedDate"), o = nn("highlightRanges"), i = dt({
      ...e,
      focusedDate: s,
      setFocusedDate: r
    });
    function f(c) {
      for (const h of o)
        if (h) {
          for (const [u, d] of h)
            if (zt(c, u, d))
              return !0;
        }
      return !1;
    }
    function a(c) {
      for (const h of o)
        if (h) {
          for (const [u, d] of h)
            if (zt(c, u, d))
              return [u, d];
        }
      return [];
    }
    function l(c) {
      const h = c.detail;
      if (c.stopPropagation(), !f(h))
        return;
      const u = a(h);
      u.length && (n(u), i.dispatch());
    }
    return /* @__PURE__ */ y("host", { shadowDom: !0, focus: i.focus, children: /* @__PURE__ */ y(
      ut,
      {
        ...e,
        ...i,
        type: "highlight",
        value: t,
        highlightGroups: o,
        onSelect: l
      }
    ) });
  },
  {
    props: {
      ...ft,
      tentative: {
        type: String,
        value: ""
      }
    },
    styles: ht
  }
);
customElements.define("calendar-highlight", yn);
export {
  gn as CalendarDate,
  yn as CalendarHighlight,
  un as CalendarMonth,
  pn as CalendarMulti,
  mn as CalendarRange
};
