!(function (t) {
    var e = {};
    function s(i) {
        if (e[i]) return e[i].exports;
        var n = (e[i] = { i: i, l: !1, exports: {} });
        return t[i].call(n.exports, n, n.exports, s), (n.l = !0), n.exports;
    }
    (s.m = t),
        (s.c = e),
        (s.d = function (t, e, i) {
            s.o(t, e) || Object.defineProperty(t, e, { enumerable: !0, get: i });
        }),
        (s.r = function (t) {
            "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(t, "__esModule", { value: !0 });
        }),
        (s.t = function (t, e) {
            if ((1 & e && (t = s(t)), 8 & e)) return t;
            if (4 & e && "object" == typeof t && t && t.__esModule) return t;
            var i = Object.create(null);
            if ((s.r(i), Object.defineProperty(i, "default", { enumerable: !0, value: t }), 2 & e && "string" != typeof t))
                for (var n in t)
                    s.d(
                        i,
                        n,
                        function (e) {
                            return t[e];
                        }.bind(null, n)
                    );
            return i;
        }),
        (s.n = function (t) {
            var e =
                t && t.__esModule
                    ? function () {
                          return t.default;
                      }
                    : function () {
                          return t;
                      };
            return s.d(e, "a", e), e;
        }),
        (s.o = function (t, e) {
            return Object.prototype.hasOwnProperty.call(t, e);
        }),
        (s.p = ""),
        s((s.s = 0));
})([
    function (t, e, s) {
        "use strict";
        s.r(e);
        const i = (t) => "object" == typeof t && null !== t && t.constructor === Object && "[object Object]" === Object.prototype.toString.call(t),
            n = (...t) => {
                let e = !1;
                "boolean" == typeof t[0] && (e = t.shift());
                let s = t[0];
                if (!s || "object" != typeof s) throw new Error("extendee must be an object");
                const a = t.slice(1),
                    o = a.length;
                for (let t = 0; t < o; t++) {
                    const o = a[t];
                    for (let t in o)
                        if (o.hasOwnProperty(t)) {
                            const a = o[t];
                            if (e && (Array.isArray(a) || i(a))) {
                                const e = Array.isArray(a) ? [] : {};
                                s[t] = n(!0, s.hasOwnProperty(t) ? s[t] : e, a);
                            } else s[t] = a;
                        }
                }
                return s;
            },
            a = (t, e = 1e4) => ((t = parseFloat(t) || 0), Math.round((t + Number.EPSILON) * e) / e),
            o = function (t) {
                return (
                    !!(t && "object" == typeof t && t instanceof Element && t !== document.body) &&
                    !t.__Panzoom &&
                    ((function (t) {
                        const e = getComputedStyle(t)["overflow-y"],
                            s = getComputedStyle(t)["overflow-x"],
                            i = ("scroll" === e || "auto" === e) && Math.abs(t.scrollHeight - t.clientHeight) > 1,
                            n = ("scroll" === s || "auto" === s) && Math.abs(t.scrollWidth - t.clientWidth) > 1;
                        return i || n;
                    })(t)
                        ? t
                        : o(t.parentNode))
                );
            },
            r =
                ("undefined" != typeof window && window.ResizeObserver) ||
                class {
                    constructor(t) {
                        (this.observables = []), (this.boundCheck = this.check.bind(this)), this.boundCheck(), (this.callback = t);
                    }
                    observe(t) {
                        if (this.observables.some((e) => e.el === t)) return;
                        const e = { el: t, size: { height: t.clientHeight, width: t.clientWidth } };
                        this.observables.push(e);
                    }
                    unobserve(t) {
                        this.observables = this.observables.filter((e) => e.el !== t);
                    }
                    disconnect() {
                        this.observables = [];
                    }
                    check() {
                        const t = this.observables
                            .filter((t) => {
                                const e = t.el.clientHeight,
                                    s = t.el.clientWidth;
                                if (t.size.height !== e || t.size.width !== s) return (t.size.height = e), (t.size.width = s), !0;
                            })
                            .map((t) => t.el);
                        t.length > 0 && this.callback(t), window.requestAnimationFrame(this.boundCheck);
                    }
                };
        class l {
            constructor(t) {
                (this.id = self.Touch && t instanceof Touch ? t.identifier : -1), (this.pageX = t.pageX), (this.pageY = t.pageY), (this.clientX = t.clientX), (this.clientY = t.clientY);
            }
        }
        const h = (t, e) => (e ? Math.sqrt((e.clientX - t.clientX) ** 2 + (e.clientY - t.clientY) ** 2) : 0),
            d = (t, e) => (e ? { clientX: (t.clientX + e.clientX) / 2, clientY: (t.clientY + e.clientY) / 2 } : t);
        class c {
            constructor(t, { start: e = () => !0, move: s = () => {}, end: i = () => {} } = {}) {
                (this._element = t),
                    (this.startPointers = []),
                    (this.currentPointers = []),
                    (this._pointerStart = (t) => {
                        if (t.buttons > 0 && 0 !== t.button) return;
                        const e = new l(t);
                        this.currentPointers.some((t) => t.id === e.id) || (this._triggerPointerStart(e, t) && (window.addEventListener("mousemove", this._move), window.addEventListener("mouseup", this._pointerEnd)));
                    }),
                    (this._touchStart = (t) => {
                        for (const e of Array.from(t.changedTouches || [])) this._triggerPointerStart(new l(e), t);
                    }),
                    (this._move = (t) => {
                        const e = this.currentPointers.slice(),
                            s = ((t) => "changedTouches" in t)(t) ? Array.from(t.changedTouches).map((t) => new l(t)) : [new l(t)];
                        for (const t of s) {
                            const e = this.currentPointers.findIndex((e) => e.id === t.id);
                            e < 0 || (this.currentPointers[e] = t);
                        }
                        this._moveCallback(e, this.currentPointers.slice(), t);
                    }),
                    (this._triggerPointerEnd = (t, e) => {
                        const s = this.currentPointers.findIndex((e) => e.id === t.id);
                        return !(s < 0 || (this.currentPointers.splice(s, 1), this.startPointers.splice(s, 1), this._endCallback(t, e), 0));
                    }),
                    (this._pointerEnd = (t) => {
                        (t.buttons > 0 && 0 !== t.button) ||
                            (this._triggerPointerEnd(new l(t), t) && (window.removeEventListener("mousemove", this._move, { passive: !1 }), window.removeEventListener("mouseup", this._pointerEnd, { passive: !1 })));
                    }),
                    (this._touchEnd = (t) => {
                        for (const e of Array.from(t.changedTouches || [])) this._triggerPointerEnd(new l(e), t);
                    }),
                    (this._startCallback = e),
                    (this._moveCallback = s),
                    (this._endCallback = i),
                    this._element.addEventListener("mousedown", this._pointerStart, { passive: !1 }),
                    this._element.addEventListener("touchstart", this._touchStart, { passive: !1 }),
                    this._element.addEventListener("touchmove", this._move, { passive: !1 }),
                    this._element.addEventListener("touchend", this._touchEnd),
                    this._element.addEventListener("touchcancel", this._touchEnd);
            }
            stop() {
                this._element.removeEventListener("mousedown", this._pointerStart, { passive: !1 }),
                    this._element.removeEventListener("touchstart", this._touchStart, { passive: !1 }),
                    this._element.removeEventListener("touchmove", this._move, { passive: !1 }),
                    this._element.removeEventListener("touchend", this._touchEnd),
                    this._element.removeEventListener("touchcancel", this._touchEnd),
                    window.removeEventListener("mousemove", this._move),
                    window.removeEventListener("mouseup", this._pointerEnd);
            }
            _triggerPointerStart(t, e) {
                return !!this._startCallback(t, e) && (this.currentPointers.push(t), this.startPointers.push(t), !0);
            }
        }
        class u {
            constructor(t = {}) {
                (this.options = n(!0, {}, t)), (this.plugins = []), (this.events = {});
                for (const t of ["on", "once"]) for (const e of Object.entries(this.options[t] || {})) this[t](...e);
            }
            option(t, e, ...s) {
                let i =
                    ((n = t = String(t)),
                    (a = this.options),
                    n.split(".").reduce(function (t, e) {
                        return t && t[e];
                    }, a));
                var n, a;
                return "function" == typeof i && (i = i.call(this, this, ...s)), void 0 === i ? e : i;
            }
            localize(t, e = []) {
                return (t = String(t).replace(/\{\{(\w+).?(\w+)?\}\}/g, (t, s, i) => {
                    let n = "";
                    i ? (n = this.option(`${s[0] + s.toLowerCase().substring(1)}.l10n.${i}`)) : s && (n = this.option("l10n." + s)), n || (n = t);
                    for (let t = 0; t < e.length; t++) n = n.split(e[t][0]).join(e[t][1]);
                    return n;
                })).replace(/\{\{(.*)\}\}/, (t, e) => e);
            }
            on(t, e) {
                if (i(t)) {
                    for (const e of Object.entries(t)) this.on(...e);
                    return this;
                }
                return (
                    String(t)
                        .split(" ")
                        .forEach((t) => {
                            const s = (this.events[t] = this.events[t] || []);
                            -1 == s.indexOf(e) && s.push(e);
                        }),
                    this
                );
            }
            once(t, e) {
                if (i(t)) {
                    for (const e of Object.entries(t)) this.once(...e);
                    return this;
                }
                return (
                    String(t)
                        .split(" ")
                        .forEach((t) => {
                            const s = (...i) => {
                                this.off(t, s), e.call(this, this, ...i);
                            };
                            (s._ = e), this.on(t, s);
                        }),
                    this
                );
            }
            off(t, e) {
                if (!i(t))
                    return (
                        t.split(" ").forEach((t) => {
                            const s = this.events[t];
                            if (!s || !s.length) return this;
                            let i = -1;
                            for (let t = 0, n = s.length; t < n; t++) {
                                const n = s[t];
                                if (n && (n === e || n._ === e)) {
                                    i = t;
                                    break;
                                }
                            }
                            -1 != i && s.splice(i, 1);
                        }),
                        this
                    );
                for (const e of Object.entries(t)) this.off(...e);
            }
            trigger(t, ...e) {
                for (const s of [...(this.events[t] || [])].slice()) if (s && !1 === s.call(this, this, ...e)) return !1;
                for (const s of [...(this.events["*"] || [])].slice()) if (s && !1 === s.call(this, t, this, ...e)) return !1;
                return !0;
            }
            attachPlugins(t) {
                const e = {};
                for (const [s, i] of Object.entries(t || {})) !1 === this.options[s] || this.plugins[s] || ((this.options[s] = n({}, i.defaults || {}, this.options[s])), (e[s] = new i(this)));
                for (const [t, s] of Object.entries(e)) s.attach(this);
                return (this.plugins = Object.assign({}, this.plugins, e)), this;
            }
            detachPlugins() {
                for (const t in this.plugins) {
                    let e;
                    (e = this.plugins[t]) && "function" == typeof e.detach && e.detach(this);
                }
                return (this.plugins = {}), this;
            }
        }
        const p = {
            touch: !0,
            zoom: !0,
            pinchToZoom: !0,
            panOnlyZoomed: !1,
            lockAxis: !1,
            friction: 0.64,
            decelFriction: 0.88,
            zoomFriction: 0.74,
            bounceForce: 0.2,
            baseScale: 1,
            minScale: 1,
            maxScale: 2,
            step: 0.5,
            textSelection: !1,
            click: "toggleZoom",
            wheel: "zoom",
            wheelFactor: 42,
            wheelLimit: 5,
            draggableClass: "is-draggable",
            draggingClass: "is-dragging",
            ratio: 1,
        };
        class f extends u {
            constructor(t, e = {}) {
                super(n(!0, {}, p, e)), (this.state = "init"), (this.$container = t);
                for (const t of ["onLoad", "onWheel", "onClick"]) this[t] = this[t].bind(this);
                this.initLayout(),
                    this.resetValues(),
                    this.attachPlugins(f.Plugins),
                    this.trigger("init"),
                    this.updateMetrics(),
                    this.attachEvents(),
                    this.trigger("ready"),
                    !1 === this.option("centerOnStart") ? (this.state = "ready") : this.panTo({ friction: 0 }),
                    (t.__Panzoom = this);
            }
            initLayout() {
                const t = this.$container;
                if (!(t instanceof HTMLElement)) throw new Error("Panzoom: Container not found");
                const e = this.option("content") || t.querySelector(".panzoom__content");
                if (!e) throw new Error("Panzoom: Content not found");
                this.$content = e;
                let s = this.option("viewport") || t.querySelector(".panzoom__viewport");
                s || !1 === this.option("wrapInner") || ((s = document.createElement("div")), s.classList.add("panzoom__viewport"), s.append(...t.childNodes), t.appendChild(s)), (this.$viewport = s || e.parentNode);
            }
            resetValues() {
                (this.updateRate = this.option("updateRate", /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) ? 250 : 24)),
                    (this.container = { width: 0, height: 0 }),
                    (this.viewport = { width: 0, height: 0 }),
                    (this.content = { origWidth: 0, origHeight: 0, width: 0, height: 0, x: this.option("x", 0), y: this.option("y", 0), scale: this.option("baseScale") }),
                    (this.transform = { x: 0, y: 0, scale: 1 }),
                    this.resetDragPosition();
            }
            onLoad(t) {
                this.updateMetrics(), this.panTo({ scale: this.option("baseScale"), friction: 0 }), this.trigger("load", t);
            }
            onClick(t) {
                if (t.defaultPrevented) return;
                if (document.activeElement && document.activeElement.closest("[contenteditable]")) return;
                if (this.option("textSelection") && window.getSelection().toString().length && (!t.target || !t.target.hasAttribute("data-fancybox-close"))) return void t.stopPropagation();
                const e = this.$content.getClientRects()[0];
                if ("ready" !== this.state && (this.dragPosition.midPoint || Math.abs(e.top - this.dragStart.rect.top) > 1 || Math.abs(e.left - this.dragStart.rect.left) > 1)) return t.preventDefault(), void t.stopPropagation();
                !1 !== this.trigger("click", t) && this.option("zoom") && "toggleZoom" === this.option("click") && (t.preventDefault(), t.stopPropagation(), this.zoomWithClick(t));
            }
            onWheel(t) {
                !1 !== this.trigger("wheel", t) && this.option("zoom") && this.option("wheel") && this.zoomWithWheel(t);
            }
            zoomWithWheel(t) {
                void 0 === this.changedDelta && (this.changedDelta = 0);
                const e = Math.max(-1, Math.min(1, -t.deltaY || -t.deltaX || t.wheelDelta || -t.detail)),
                    s = this.content.scale;
                let i = (s * (100 + e * this.option("wheelFactor"))) / 100;
                if (
                    ((e < 0 && Math.abs(s - this.option("minScale")) < 0.01) || (e > 0 && Math.abs(s - this.option("maxScale")) < 0.01)
                        ? ((this.changedDelta += Math.abs(e)), (i = s))
                        : ((this.changedDelta = 0), (i = Math.max(Math.min(i, this.option("maxScale")), this.option("minScale")))),
                    this.changedDelta > this.option("wheelLimit"))
                )
                    return;
                if ((t.preventDefault(), i === s)) return;
                const n = this.$content.getBoundingClientRect(),
                    a = t.clientX - n.left,
                    o = t.clientY - n.top;
                this.zoomTo(i, { x: a, y: o });
            }
            zoomWithClick(t) {
                const e = this.$content.getClientRects()[0],
                    s = t.clientX - e.left,
                    i = t.clientY - e.top;
                this.toggleZoom({ x: s, y: i });
            }
            attachEvents() {
                this.$content.addEventListener("load", this.onLoad), this.$container.addEventListener("wheel", this.onWheel, { passive: !1 }), this.$container.addEventListener("click", this.onClick, { passive: !1 }), this.initObserver();
                const t = new c(this.$container, {
                    start: (e, s) => {
                        if (!this.option("touch")) return !1;
                        if (this.velocity.scale < 0) return !1;
                        const i = s.composedPath()[0];
                        if (!t.currentPointers.length) {
                            if (-1 !== ["BUTTON", "TEXTAREA", "OPTION", "INPUT", "SELECT", "VIDEO"].indexOf(i.nodeName)) return !1;
                            if (
                                this.option("textSelection") &&
                                ((t, e, s) => {
                                    const i = t.childNodes,
                                        n = document.createRange();
                                    for (let t = 0; t < i.length; t++) {
                                        const a = i[t];
                                        if (a.nodeType !== Node.TEXT_NODE) continue;
                                        n.selectNodeContents(a);
                                        const o = n.getBoundingClientRect();
                                        if (e >= o.left && s >= o.top && e <= o.right && s <= o.bottom) return a;
                                    }
                                    return !1;
                                })(i, e.clientX, e.clientY)
                            )
                                return !1;
                        }
                        return (
                            !o(i) &&
                            !1 !== this.trigger("touchStart", s) &&
                            ("mousedown" === s.type && s.preventDefault(), (this.state = "pointerdown"), this.resetDragPosition(), (this.dragPosition.midPoint = null), (this.dragPosition.time = Date.now()), !0)
                        );
                    },
                    move: (e, s, i) => {
                        if ("pointerdown" !== this.state) return;
                        if (!1 === this.trigger("touchMove", i)) return void i.preventDefault();
                        if (s.length < 2 && !0 === this.option("panOnlyZoomed") && this.content.width <= this.viewport.width && this.content.height <= this.viewport.height && this.transform.scale <= this.option("baseScale")) return;
                        if (s.length > 1 && (!this.option("zoom") || !1 === this.option("pinchToZoom"))) return;
                        const n = d(e[0], e[1]),
                            a = d(s[0], s[1]),
                            o = a.clientX - n.clientX,
                            r = a.clientY - n.clientY,
                            l = h(e[0], e[1]),
                            c = h(s[0], s[1]),
                            u = l && c ? c / l : 1;
                        (this.dragOffset.x += o), (this.dragOffset.y += r), (this.dragOffset.scale *= u), (this.dragOffset.time = Date.now() - this.dragPosition.time);
                        const p = 1 === this.dragStart.scale && this.option("lockAxis");
                        if (p && !this.lockAxis) {
                            if (Math.abs(this.dragOffset.x) < 6 && Math.abs(this.dragOffset.y) < 6) return void i.preventDefault();
                            const t = Math.abs((180 * Math.atan2(this.dragOffset.y, this.dragOffset.x)) / Math.PI);
                            this.lockAxis = t > 45 && t < 135 ? "y" : "x";
                        }
                        if ("xy" === p || "y" !== this.lockAxis) {
                            if (
                                (i.preventDefault(),
                                i.stopPropagation(),
                                i.stopImmediatePropagation(),
                                this.lockAxis && (this.dragOffset["x" === this.lockAxis ? "y" : "x"] = 0),
                                this.$container.classList.add(this.option("draggingClass")),
                                (this.transform.scale === this.option("baseScale") && "y" === this.lockAxis) || (this.dragPosition.x = this.dragStart.x + this.dragOffset.x),
                                (this.transform.scale === this.option("baseScale") && "x" === this.lockAxis) || (this.dragPosition.y = this.dragStart.y + this.dragOffset.y),
                                (this.dragPosition.scale = this.dragStart.scale * this.dragOffset.scale),
                                s.length > 1)
                            ) {
                                const e = d(t.startPointers[0], t.startPointers[1]),
                                    s = e.clientX - this.dragStart.rect.x,
                                    i = e.clientY - this.dragStart.rect.y,
                                    { deltaX: n, deltaY: o } = this.getZoomDelta(this.content.scale * this.dragOffset.scale, s, i);
                                (this.dragPosition.x -= n), (this.dragPosition.y -= o), (this.dragPosition.midPoint = a);
                            } else this.setDragResistance();
                            (this.transform = { x: this.dragPosition.x, y: this.dragPosition.y, scale: this.dragPosition.scale }), this.startAnimation();
                        }
                    },
                    end: (e, s) => {
                        if ("pointerdown" !== this.state) return;
                        if (((this._dragOffset = { ...this.dragOffset }), t.currentPointers.length)) return void this.resetDragPosition();
                        if (((this.state = "decel"), (this.friction = this.option("decelFriction")), this.recalculateTransform(), this.$container.classList.remove(this.option("draggingClass")), !1 === this.trigger("touchEnd", s))) return;
                        if ("decel" !== this.state) return;
                        const i = this.option("minScale");
                        if (this.transform.scale < i) return void this.zoomTo(i, { friction: 0.64 });
                        const n = this.option("maxScale");
                        if (this.transform.scale - n > 0.01) {
                            const t = this.dragPosition.midPoint || e,
                                s = this.$content.getClientRects()[0];
                            this.zoomTo(n, { friction: 0.64, x: t.clientX - s.left, y: t.clientY - s.top });
                        }
                    },
                });
                this.pointerTracker = t;
            }
            initObserver() {
                this.resizeObserver ||
                    ((this.resizeObserver = new r(() => {
                        this.updateTimer ||
                            (this.updateTimer = setTimeout(() => {
                                const t = this.$container.getBoundingClientRect();
                                t.width && t.height
                                    ? ((Math.abs(t.width - this.container.width) > 1 || Math.abs(t.height - this.container.height) > 1) &&
                                          (this.isAnimating() && this.endAnimation(!0), this.updateMetrics(), this.panTo({ x: this.content.x, y: this.content.y, scale: this.option("baseScale"), friction: 0 })),
                                      (this.updateTimer = null))
                                    : (this.updateTimer = null);
                            }, this.updateRate));
                    })),
                    this.resizeObserver.observe(this.$container));
            }
            resetDragPosition() {
                (this.lockAxis = null), (this.friction = this.option("friction")), (this.velocity = { x: 0, y: 0, scale: 0 });
                const { x: t, y: e, scale: s } = this.content;
                (this.dragStart = { rect: this.$content.getBoundingClientRect(), x: t, y: e, scale: s }), (this.dragPosition = { ...this.dragPosition, x: t, y: e, scale: s }), (this.dragOffset = { x: 0, y: 0, scale: 1, time: 0 });
            }
            updateMetrics(t) {
                !0 !== t && this.trigger("beforeUpdate");
                const e = this.$container,
                    s = this.$content,
                    i = this.$viewport,
                    n = s instanceof HTMLImageElement,
                    o = this.option("zoom"),
                    r = this.option("resizeParent", o);
                let l = this.option("width"),
                    h = this.option("height"),
                    d = l || ((c = s), Math.max(parseFloat(c.naturalWidth || 0), parseFloat((c.width && c.width.baseVal && c.width.baseVal.value) || 0), parseFloat(c.offsetWidth || 0), parseFloat(c.scrollWidth || 0)));
                var c;
                let u = h || ((t) => Math.max(parseFloat(t.naturalHeight || 0), parseFloat((t.height && t.height.baseVal && t.height.baseVal.value) || 0), parseFloat(t.offsetHeight || 0), parseFloat(t.scrollHeight || 0)))(s);
                Object.assign(s.style, { width: l ? l + "px" : "", height: h ? h + "px" : "", maxWidth: "", maxHeight: "" }), r && Object.assign(i.style, { width: "", height: "" });
                const p = this.option("ratio");
                (d = a(d * p)), (u = a(u * p)), (l = d), (h = u);
                const f = s.getBoundingClientRect(),
                    g = i.getBoundingClientRect(),
                    m = i == e ? g : e.getBoundingClientRect();
                let v = Math.max(i.offsetWidth, a(g.width)),
                    b = Math.max(i.offsetHeight, a(g.height)),
                    y = window.getComputedStyle(i);
                if (((v -= parseFloat(y.paddingLeft) + parseFloat(y.paddingRight)), (b -= parseFloat(y.paddingTop) + parseFloat(y.paddingBottom)), (this.viewport.width = v), (this.viewport.height = b), o)) {
                    if (Math.abs(d - f.width) > 0.1 || Math.abs(u - f.height) > 0.1) {
                        const t = ((t, e, s, i) => {
                            const n = Math.min(s / t || 0, i / e);
                            return { width: t * n || 0, height: e * n || 0 };
                        })(d, u, Math.min(d, f.width), Math.min(u, f.height));
                        (l = a(t.width)), (h = a(t.height));
                    }
                    Object.assign(s.style, { width: l + "px", height: h + "px", transform: "" });
                }
                if ((r && (Object.assign(i.style, { width: l + "px", height: h + "px" }), (this.viewport = { ...this.viewport, width: l, height: h })), n && o && "function" != typeof this.options.maxScale)) {
                    const t = this.option("maxScale");
                    this.options.maxScale = function () {
                        return this.content.origWidth > 0 && this.content.fitWidth > 0 ? this.content.origWidth / this.content.fitWidth : t;
                    };
                }
                (this.content = { ...this.content, origWidth: d, origHeight: u, fitWidth: l, fitHeight: h, width: l, height: h, scale: 1, isZoomable: o }),
                    (this.container = { width: m.width, height: m.height }),
                    !0 !== t && this.trigger("afterUpdate");
            }
            zoomIn(t) {
                this.zoomTo(this.content.scale + (t || this.option("step")));
            }
            zoomOut(t) {
                this.zoomTo(this.content.scale - (t || this.option("step")));
            }
            toggleZoom(t = {}) {
                const e = this.option("maxScale"),
                    s = this.option("baseScale"),
                    i = this.content.scale > s + 0.5 * (e - s) ? s : e;
                this.zoomTo(i, t);
            }
            zoomTo(t = this.option("baseScale"), { x: e = null, y: s = null } = {}) {
                t = Math.max(Math.min(t, this.option("maxScale")), this.option("minScale"));
                const i = a(this.content.scale / (this.content.width / this.content.fitWidth), 1e7);
                null === e && (e = this.content.width * i * 0.5), null === s && (s = this.content.height * i * 0.5);
                const { deltaX: n, deltaY: o } = this.getZoomDelta(t, e, s);
                (e = this.content.x - n), (s = this.content.y - o), this.panTo({ x: e, y: s, scale: t, friction: this.option("zoomFriction") });
            }
            getZoomDelta(t, e = 0, s = 0) {
                const i = this.content.fitWidth * this.content.scale,
                    n = this.content.fitHeight * this.content.scale,
                    a = e > 0 && i ? e / i : 0,
                    o = s > 0 && n ? s / n : 0;
                return { deltaX: (this.content.fitWidth * t - i) * a, deltaY: (this.content.fitHeight * t - n) * o };
            }
            panTo({ x: t = this.content.x, y: e = this.content.y, scale: s, friction: i = this.option("friction"), ignoreBounds: n = !1 } = {}) {
                if (((s = s || this.content.scale || 1), !n)) {
                    const { boundX: i, boundY: n } = this.getBounds(s);
                    i && (t = Math.max(Math.min(t, i.to), i.from)), n && (e = Math.max(Math.min(e, n.to), n.from));
                }
                (this.friction = i),
                    (this.transform = { ...this.transform, x: t, y: e, scale: s }),
                    i
                        ? ((this.state = "panning"),
                          (this.velocity = { x: (1 / this.friction - 1) * (t - this.content.x), y: (1 / this.friction - 1) * (e - this.content.y), scale: (1 / this.friction - 1) * (s - this.content.scale) }),
                          this.startAnimation())
                        : this.endAnimation();
            }
            startAnimation() {
                this.rAF ? cancelAnimationFrame(this.rAF) : this.trigger("startAnimation"), (this.rAF = requestAnimationFrame(() => this.animate()));
            }
            animate() {
                if (
                    (this.setEdgeForce(),
                    this.setDragForce(),
                    (this.velocity.x *= this.friction),
                    (this.velocity.y *= this.friction),
                    (this.velocity.scale *= this.friction),
                    (this.content.x += this.velocity.x),
                    (this.content.y += this.velocity.y),
                    (this.content.scale += this.velocity.scale),
                    this.isAnimating())
                )
                    this.setTransform();
                else if ("pointerdown" !== this.state) return void this.endAnimation();
                this.rAF = requestAnimationFrame(() => this.animate());
            }
            getBounds(t) {
                let e = this.boundX,
                    s = this.boundY;
                if (void 0 !== e && void 0 !== s) return { boundX: e, boundY: s };
                (e = { from: 0, to: 0 }), (s = { from: 0, to: 0 }), (t = t || this.transform.scale);
                const i = this.content.fitWidth * t,
                    n = this.content.fitHeight * t,
                    o = this.viewport.width,
                    r = this.viewport.height;
                if (i < o) {
                    const t = a(0.5 * (o - i));
                    (e.from = t), (e.to = t);
                } else e.from = a(o - i);
                if (n < r) {
                    const t = 0.5 * (r - n);
                    (s.from = t), (s.to = t);
                } else s.from = a(r - n);
                return { boundX: e, boundY: s };
            }
            setEdgeForce() {
                if ("decel" !== this.state) return;
                const t = this.option("bounceForce"),
                    { boundX: e, boundY: s } = this.getBounds(Math.max(this.transform.scale, this.content.scale));
                let i, n, a, o;
                if ((e && ((i = this.content.x < e.from), (n = this.content.x > e.to)), s && ((a = this.content.y < s.from), (o = this.content.y > s.to)), i || n)) {
                    let s = ((i ? e.from : e.to) - this.content.x) * t;
                    const n = this.content.x + (this.velocity.x + s) / this.friction;
                    n >= e.from && n <= e.to && (s += this.velocity.x), (this.velocity.x = s), this.recalculateTransform();
                }
                if (a || o) {
                    let e = ((a ? s.from : s.to) - this.content.y) * t;
                    const i = this.content.y + (e + this.velocity.y) / this.friction;
                    i >= s.from && i <= s.to && (e += this.velocity.y), (this.velocity.y = e), this.recalculateTransform();
                }
            }
            setDragResistance() {
                if ("pointerdown" !== this.state) return;
                const { boundX: t, boundY: e } = this.getBounds(this.dragPosition.scale);
                let s, i, n, a;
                if ((t && ((s = this.dragPosition.x < t.from), (i = this.dragPosition.x > t.to)), e && ((n = this.dragPosition.y < e.from), (a = this.dragPosition.y > e.to)), (s || i) && (!s || !i))) {
                    const e = s ? t.from : t.to,
                        i = e - this.dragPosition.x;
                    this.dragPosition.x = e - 0.3 * i;
                }
                if ((n || a) && (!n || !a)) {
                    const t = n ? e.from : e.to,
                        s = t - this.dragPosition.y;
                    this.dragPosition.y = t - 0.3 * s;
                }
            }
            setDragForce() {
                "pointerdown" === this.state && ((this.velocity.x = this.dragPosition.x - this.content.x), (this.velocity.y = this.dragPosition.y - this.content.y), (this.velocity.scale = this.dragPosition.scale - this.content.scale));
            }
            recalculateTransform() {
                (this.transform.x = this.content.x + this.velocity.x / (1 / this.friction - 1)),
                    (this.transform.y = this.content.y + this.velocity.y / (1 / this.friction - 1)),
                    (this.transform.scale = this.content.scale + this.velocity.scale / (1 / this.friction - 1));
            }
            isAnimating() {
                return !(!this.friction || !(Math.abs(this.velocity.x) > 0.05 || Math.abs(this.velocity.y) > 0.05 || Math.abs(this.velocity.scale) > 0.05));
            }
            setTransform(t) {
                let e, s, i;
                if (
                    (t
                        ? ((e = a(this.transform.x)), (s = a(this.transform.y)), (i = this.transform.scale), (this.content = { ...this.content, x: e, y: s, scale: i }))
                        : ((e = a(this.content.x)), (s = a(this.content.y)), (i = this.content.scale / (this.content.width / this.content.fitWidth)), (this.content = { ...this.content, x: e, y: s })),
                    this.trigger("beforeTransform"),
                    (e = a(this.content.x)),
                    (s = a(this.content.y)),
                    t && this.option("zoom"))
                ) {
                    let t, n;
                    (t = a(this.content.fitWidth * i)),
                        (n = a(this.content.fitHeight * i)),
                        (this.content.width = t),
                        (this.content.height = n),
                        (this.transform = { ...this.transform, width: t, height: n, scale: i }),
                        Object.assign(this.$content.style, { width: t + "px", height: n + "px", maxWidth: "none", maxHeight: "none", transform: `translate3d(${e}px, ${s}px, 0) scale(1)` });
                } else this.$content.style.transform = `translate3d(${e}px, ${s}px, 0) scale(${i})`;
                this.trigger("afterTransform");
            }
            endAnimation(t) {
                cancelAnimationFrame(this.rAF), (this.rAF = null), (this.velocity = { x: 0, y: 0, scale: 0 }), this.setTransform(!0), (this.state = "ready"), this.handleCursor(), !0 !== t && this.trigger("endAnimation");
            }
            handleCursor() {
                const t = this.option("draggableClass");
                t &&
                    this.option("touch") &&
                    (1 == this.option("panOnlyZoomed") && this.content.width <= this.viewport.width && this.content.height <= this.viewport.height && this.transform.scale <= this.option("baseScale")
                        ? this.$container.classList.remove(t)
                        : this.$container.classList.add(t));
            }
            detachEvents() {
                this.$content.removeEventListener("load", this.onLoad),
                    this.$container.removeEventListener("wheel", this.onWheel, { passive: !1 }),
                    this.$container.removeEventListener("click", this.onClick, { passive: !1 }),
                    this.pointerTracker && (this.pointerTracker.stop(), (this.pointerTracker = null)),
                    this.resizeObserver && (this.resizeObserver.disconnect(), (this.resizeObserver = null));
            }
            destroy() {
                "destroy" !== this.state &&
                    ((this.state = "destroy"), clearTimeout(this.updateTimer), (this.updateTimer = null), cancelAnimationFrame(this.rAF), (this.rAF = null), this.detachEvents(), this.detachPlugins(), this.resetDragPosition());
            }
        }
        (f.version = "4.0.31"), (f.Plugins = {});
        const g = (t, e) => {
            let s = 0;
            return function (...i) {
                const n = new Date().getTime();
                if (!(n - s < e)) return (s = n), t(...i);
            };
        };
        class m {
            constructor(t) {
                (this.$container = null), (this.$prev = null), (this.$next = null), (this.carousel = t), (this.onRefresh = this.onRefresh.bind(this));
            }
            option(t) {
                return this.carousel.option("Navigation." + t);
            }
            createButton(t) {
                const e = document.createElement("button");
                e.setAttribute("title", this.carousel.localize(`{{${t.toUpperCase()}}}`));
                const s = this.option("classNames.button") + " " + this.option("classNames." + t);
                return (
                    e.classList.add(...s.split(" ")),
                    e.setAttribute("tabindex", "0"),
                    (e.innerHTML = this.carousel.localize(this.option(t + "Tpl"))),
                    e.addEventListener("click", (e) => {
                        e.preventDefault(), e.stopPropagation(), this.carousel["slide" + ("next" === t ? "Next" : "Prev")]();
                    }),
                    e
                );
            }
            build() {
                this.$container || ((this.$container = document.createElement("div")), this.$container.classList.add(...this.option("classNames.main").split(" ")), this.carousel.$container.appendChild(this.$container)),
                    this.$next || ((this.$next = this.createButton("next")), this.$container.appendChild(this.$next)),
                    this.$prev || ((this.$prev = this.createButton("prev")), this.$container.appendChild(this.$prev));
            }
            onRefresh() {
                const t = this.carousel.pages.length;
                t <= 1 || (t > 1 && this.carousel.elemDimWidth < this.carousel.wrapDimWidth && !Number.isInteger(this.carousel.option("slidesPerPage")))
                    ? this.cleanup()
                    : (this.build(),
                      this.$prev.removeAttribute("disabled"),
                      this.$next.removeAttribute("disabled"),
                      this.carousel.option("infiniteX", this.carousel.option("infinite")) || (this.carousel.page <= 0 && this.$prev.setAttribute("disabled", ""), this.carousel.page >= t - 1 && this.$next.setAttribute("disabled", "")));
            }
            cleanup() {
                this.$prev && this.$prev.remove(), (this.$prev = null), this.$next && this.$next.remove(), (this.$next = null), this.$container && this.$container.remove(), (this.$container = null);
            }
            attach() {
                this.carousel.on("refresh change", this.onRefresh);
            }
            detach() {
                this.carousel.off("refresh change", this.onRefresh), this.cleanup();
            }
        }
        m.defaults = {
            prevTpl: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" tabindex="-1"><path d="M15 3l-9 9 9 9"/></svg>',
            nextTpl: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" tabindex="-1"><path d="M9 3l9 9-9 9"/></svg>',
            classNames: { main: "carousel__nav", button: "carousel__button", next: "is-next", prev: "is-prev" },
        };
        class v {
            constructor(t) {
                (this.carousel = t),
                    (this.selectedIndex = null),
                    (this.friction = 0),
                    (this.onNavReady = this.onNavReady.bind(this)),
                    (this.onNavClick = this.onNavClick.bind(this)),
                    (this.onNavCreateSlide = this.onNavCreateSlide.bind(this)),
                    (this.onTargetChange = this.onTargetChange.bind(this));
            }
            addAsTargetFor(t) {
                (this.target = this.carousel), (this.nav = t), this.attachEvents();
            }
            addAsNavFor(t) {
                (this.target = t), (this.nav = this.carousel), this.attachEvents();
            }
            attachEvents() {
                (this.nav.options.initialSlide = this.target.options.initialPage),
                    this.nav.on("ready", this.onNavReady),
                    this.nav.on("createSlide", this.onNavCreateSlide),
                    this.nav.on("Panzoom.click", this.onNavClick),
                    this.target.on("change", this.onTargetChange),
                    this.target.on("Panzoom.afterUpdate", this.onTargetChange);
            }
            onNavReady() {
                this.onTargetChange(!0);
            }
            onNavClick(t, e, s) {
                const i = s.target.closest(".carousel__slide");
                if (!i) return;
                s.stopPropagation();
                const n = parseInt(i.dataset.index, 10),
                    a = this.target.findPageForSlide(n);
                this.target.page !== a && this.target.slideTo(a, { friction: this.friction }), this.markSelectedSlide(n);
            }
            onNavCreateSlide(t, e) {
                e.index === this.selectedIndex && this.markSelectedSlide(e.index);
            }
            onTargetChange() {
                const t = this.target.pages[this.target.page].indexes[0],
                    e = this.nav.findPageForSlide(t);
                this.nav.slideTo(e), this.markSelectedSlide(t);
            }
            markSelectedSlide(t) {
                (this.selectedIndex = t), [...this.nav.slides].filter((t) => t.$el && t.$el.classList.remove("is-nav-selected"));
                const e = this.nav.slides[t];
                e && e.$el && e.$el.classList.add("is-nav-selected");
            }
            attach(t) {
                const e = t.options.Sync;
                (e.target || e.nav) && (e.target ? this.addAsNavFor(e.target) : e.nav && this.addAsTargetFor(e.nav), (this.friction = e.friction));
            }
            detach() {
                this.nav && (this.nav.off("ready", this.onNavReady), this.nav.off("Panzoom.click", this.onNavClick), this.nav.off("createSlide", this.onNavCreateSlide)),
                    this.target && (this.target.off("Panzoom.afterUpdate", this.onTargetChange), this.target.off("change", this.onTargetChange));
            }
        }
        v.defaults = { friction: 0.92 };
        const b = {
                Navigation: m,
                Dots: class {
                    constructor(t) {
                        (this.carousel = t), (this.$list = null), (this.events = { change: this.onChange.bind(this), refresh: this.onRefresh.bind(this) });
                    }
                    buildList() {
                        if (this.carousel.pages.length < this.carousel.option("Dots.minSlideCount")) return;
                        const t = document.createElement("ol");
                        return (
                            t.classList.add("carousel__dots"),
                            t.addEventListener("click", (t) => {
                                if (!("page" in t.target.dataset)) return;
                                t.preventDefault(), t.stopPropagation();
                                const e = parseInt(t.target.dataset.page, 10),
                                    s = this.carousel;
                                e !== s.page && (s.pages.length < 3 && s.option("infinite") ? s[0 == e ? "slidePrev" : "slideNext"]() : s.slideTo(e));
                            }),
                            (this.$list = t),
                            this.carousel.$container.appendChild(t),
                            this.carousel.$container.classList.add("has-dots"),
                            t
                        );
                    }
                    removeList() {
                        this.$list && (this.$list.parentNode.removeChild(this.$list), (this.$list = null)), this.carousel.$container.classList.remove("has-dots");
                    }
                    rebuildDots() {
                        let t = this.$list;
                        const e = !!t,
                            s = this.carousel.pages.length;
                        if (s < 2) return void (e && this.removeList());
                        e || (t = this.buildList());
                        const i = this.$list.children.length;
                        if (i > s) for (let t = s; t < i; t++) this.$list.removeChild(this.$list.lastChild);
                        else {
                            for (let t = i; t < s; t++) {
                                const e = document.createElement("li");
                                e.classList.add("carousel__dot"),
                                    (e.dataset.page = t),
                                    e.setAttribute("role", "button"),
                                    e.setAttribute("tabindex", "0"),
                                    e.setAttribute("title", this.carousel.localize("{{GOTO}}", [["%d", t + 1]])),
                                    e.addEventListener("keydown", (t) => {
                                        const s = t.code;
                                        let i;
                                        "Enter" === s || "NumpadEnter" === s ? (i = e) : "ArrowRight" === s ? (i = e.nextSibling) : "ArrowLeft" === s && (i = e.previousSibling), i && i.click();
                                    }),
                                    this.$list.appendChild(e);
                            }
                            this.setActiveDot();
                        }
                    }
                    setActiveDot() {
                        if (!this.$list) return;
                        this.$list.childNodes.forEach((t) => {
                            t.classList.remove("is-selected");
                        });
                        const t = this.$list.childNodes[this.carousel.page];
                        t && t.classList.add("is-selected");
                    }
                    onChange() {
                        this.setActiveDot();
                    }
                    onRefresh() {
                        this.rebuildDots();
                    }
                    attach() {
                        this.carousel.on(this.events);
                    }
                    detach() {
                        this.removeList(), this.carousel.off(this.events), (this.carousel = null);
                    }
                },
                Sync: v,
            },
            y = {
                slides: [],
                preload: 0,
                slidesPerPage: "auto",
                initialPage: null,
                initialSlide: null,
                friction: 0.92,
                center: !0,
                infinite: !0,
                fill: !0,
                dragFree: !1,
                prefix: "",
                classNames: { viewport: "carousel__viewport", track: "carousel__track", slide: "carousel__slide", slideSelected: "is-selected" },
                l10n: { NEXT: "Next slide", PREV: "Previous slide", GOTO: "Go to slide #%d" },
            };
        class x extends u {
            constructor(t, e = {}) {
                if ((super((e = n(!0, {}, y, e))), (this.state = "init"), (this.$container = t), !(this.$container instanceof HTMLElement))) throw new Error("No root element provided");
                (this.slideNext = g(this.slideNext.bind(this), 250)), (this.slidePrev = g(this.slidePrev.bind(this), 250)), this.init(), (t.__Carousel = this);
            }
            init() {
                (this.pages = []),
                    (this.page = this.pageIndex = null),
                    (this.prevPage = this.prevPageIndex = null),
                    this.attachPlugins(x.Plugins),
                    this.trigger("init"),
                    this.initLayout(),
                    this.initSlides(),
                    this.updateMetrics(),
                    this.$track && this.pages.length && (this.$track.style.transform = `translate3d(${-1 * this.pages[this.page].left}px, 0px, 0) scale(1)`),
                    this.manageSlideVisiblity(),
                    this.initPanzoom(),
                    (this.state = "ready"),
                    this.trigger("ready");
            }
            initLayout() {
                const t = this.option("prefix"),
                    e = this.option("classNames");
                (this.$viewport = this.option("viewport") || this.$container.querySelector(`.${t}${e.viewport}`)),
                    this.$viewport ||
                        ((this.$viewport = document.createElement("div")), this.$viewport.classList.add(...(t + e.viewport).split(" ")), this.$viewport.append(...this.$container.childNodes), this.$container.appendChild(this.$viewport)),
                    (this.$track = this.option("track") || this.$container.querySelector(`.${t}${e.track}`)),
                    this.$track || ((this.$track = document.createElement("div")), this.$track.classList.add(...(t + e.track).split(" ")), this.$track.append(...this.$viewport.childNodes), this.$viewport.appendChild(this.$track));
            }
            initSlides() {
                (this.slides = []),
                    this.$viewport.querySelectorAll(`.${this.option("prefix")}${this.option("classNames.slide")}`).forEach((t) => {
                        const e = { $el: t, isDom: !0 };
                        this.slides.push(e), this.trigger("createSlide", e, this.slides.length);
                    }),
                    Array.isArray(this.options.slides) && (this.slides = n(!0, [...this.slides], this.options.slides));
            }
            updateMetrics() {
                let t,
                    e = 0,
                    s = [];
                this.slides.forEach((i, n) => {
                    const a = i.$el,
                        o = i.isDom || !t ? this.getSlideMetrics(a) : t;
                    (i.index = n), (i.width = o), (i.left = e), (t = o), (e += o), s.push(n);
                });
                let i = Math.max(this.$track.offsetWidth, a(this.$track.getBoundingClientRect().width)),
                    n = getComputedStyle(this.$track);
                (i -= parseFloat(n.paddingLeft) + parseFloat(n.paddingRight)), (this.contentWidth = e), (this.viewportWidth = i);
                const o = [],
                    r = this.option("slidesPerPage");
                if (Number.isInteger(r) && e > i) for (let t = 0; t < this.slides.length; t += r) o.push({ indexes: s.slice(t, t + r), slides: this.slides.slice(t, t + r) });
                else {
                    let t = 0,
                        e = 0;
                    for (let s = 0; s < this.slides.length; s += 1) {
                        let n = this.slides[s];
                        (!o.length || e + n.width > i) && (o.push({ indexes: [], slides: [] }), (t = o.length - 1), (e = 0)), (e += n.width), o[t].indexes.push(s), o[t].slides.push(n);
                    }
                }
                const l = this.option("center"),
                    h = this.option("fill");
                o.forEach((t, s) => {
                    (t.index = s),
                        (t.width = t.slides.reduce((t, e) => t + e.width, 0)),
                        (t.left = t.slides[0].left),
                        l && (t.left += 0.5 * (i - t.width) * -1),
                        h && !this.option("infiniteX", this.option("infinite")) && e > i && ((t.left = Math.max(t.left, 0)), (t.left = Math.min(t.left, e - i)));
                });
                const d = [];
                let c;
                o.forEach((t) => {
                    const e = { ...t };
                    c && e.left === c.left ? ((c.width += e.width), (c.slides = [...c.slides, ...e.slides]), (c.indexes = [...c.indexes, ...e.indexes])) : ((e.index = d.length), (c = e), d.push(e));
                }),
                    (this.pages = d);
                let u = this.page;
                if (null === u) {
                    const t = this.option("initialSlide");
                    (u = null !== t ? this.findPageForSlide(t) : parseInt(this.option("initialPage", 0), 10) || 0), d[u] || (u = d.length && u > d.length ? d[d.length - 1].index : 0), (this.page = u), (this.pageIndex = u);
                }
                this.updatePanzoom(), this.trigger("refresh");
            }
            getSlideMetrics(t) {
                if (!t) {
                    const e = this.slides[0];
                    ((t = document.createElement("div")).dataset.isTestEl = 1),
                        (t.style.visibility = "hidden"),
                        t.classList.add(...(this.option("prefix") + this.option("classNames.slide")).split(" ")),
                        e.customClass && t.classList.add(...e.customClass.split(" ")),
                        this.$track.prepend(t);
                }
                let e = Math.max(t.offsetWidth, a(t.getBoundingClientRect().width));
                const s = t.currentStyle || window.getComputedStyle(t);
                return (e = e + (parseFloat(s.marginLeft) || 0) + (parseFloat(s.marginRight) || 0)), t.dataset.isTestEl && t.remove(), e;
            }
            findPageForSlide(t) {
                t = parseInt(t, 10) || 0;
                const e = this.pages.find((e) => e.indexes.indexOf(t) > -1);
                return e ? e.index : null;
            }
            slideNext() {
                this.slideTo(this.pageIndex + 1);
            }
            slidePrev() {
                this.slideTo(this.pageIndex - 1);
            }
            slideTo(t, e = {}) {
                const { x: s = -1 * this.setPage(t, !0), y: i = 0, friction: n = this.option("friction") } = e;
                (this.Panzoom.content.x === s && !this.Panzoom.velocity.x && n) || (this.Panzoom.panTo({ x: s, y: i, friction: n, ignoreBounds: !0 }), "ready" === this.state && "ready" === this.Panzoom.state && this.trigger("settle"));
            }
            initPanzoom() {
                this.Panzoom && this.Panzoom.destroy();
                const t = n(
                    !0,
                    {},
                    {
                        content: this.$track,
                        wrapInner: !1,
                        resizeParent: !1,
                        zoom: !1,
                        click: !1,
                        lockAxis: "x",
                        x: this.pages.length ? -1 * this.pages[this.page].left : 0,
                        centerOnStart: !1,
                        textSelection: () => this.option("textSelection", !1),
                        panOnlyZoomed: function () {
                            return this.content.width <= this.viewport.width;
                        },
                    },
                    this.option("Panzoom")
                );
                (this.Panzoom = new f(this.$container, t)),
                    this.Panzoom.on({
                        "*": (t, ...e) => this.trigger("Panzoom." + t, ...e),
                        afterUpdate: () => {
                            this.updatePage();
                        },
                        beforeTransform: this.onBeforeTransform.bind(this),
                        touchEnd: this.onTouchEnd.bind(this),
                        endAnimation: () => {
                            this.trigger("settle");
                        },
                    }),
                    this.updateMetrics(),
                    this.manageSlideVisiblity();
            }
            updatePanzoom() {
                this.Panzoom &&
                    ((this.Panzoom.content = { ...this.Panzoom.content, fitWidth: this.contentWidth, origWidth: this.contentWidth, width: this.contentWidth }),
                    this.pages.length > 1 && this.option("infiniteX", this.option("infinite"))
                        ? (this.Panzoom.boundX = null)
                        : this.pages.length && (this.Panzoom.boundX = { from: -1 * this.pages[this.pages.length - 1].left, to: -1 * this.pages[0].left }),
                    this.option("infiniteY", this.option("infinite")) ? (this.Panzoom.boundY = null) : (this.Panzoom.boundY = { from: 0, to: 0 }),
                    this.Panzoom.handleCursor());
            }
            manageSlideVisiblity() {
                const t = this.contentWidth,
                    e = this.viewportWidth;
                let s = this.Panzoom ? -1 * this.Panzoom.content.x : this.pages.length ? this.pages[this.page].left : 0;
                const i = this.option("preload"),
                    n = this.option("infiniteX", this.option("infinite")),
                    a = parseFloat(getComputedStyle(this.$viewport, null).getPropertyValue("padding-left")),
                    o = parseFloat(getComputedStyle(this.$viewport, null).getPropertyValue("padding-right"));
                this.slides.forEach((r) => {
                    let l,
                        h,
                        d = 0;
                    (l = s - a), (h = s + e + o), (l -= i * (e + a + o)), (h += i * (e + a + o));
                    const c = r.left + r.width > l && r.left < h;
                    (l = s + t - a), (h = s + t + e + o), (l -= i * (e + a + o));
                    const u = n && r.left + r.width > l && r.left < h;
                    (l = s - t - a), (h = s - t + e + o), (l -= i * (e + a + o));
                    const p = n && r.left + r.width > l && r.left < h;
                    u || c || p ? (this.createSlideEl(r), c && (d = 0), u && (d = -1), p && (d = 1), r.left + r.width > s && r.left <= s + e + o && (d = 0)) : this.removeSlideEl(r), (r.hasDiff = d);
                });
                let r = 0,
                    l = 0;
                this.slides.forEach((e, s) => {
                    let i = 0;
                    e.$el ? (s !== r || e.hasDiff ? (i = l + e.hasDiff * t) : (l = 0), (e.$el.style.left = Math.abs(i) > 0.1 ? l + e.hasDiff * t + "px" : ""), r++) : (l += e.width);
                }),
                    this.markSelectedSlides();
            }
            createSlideEl(t) {
                if (!t) return;
                if (t.$el) {
                    let e = t.$el.dataset.index;
                    if (!e || parseInt(e, 10) !== t.index) {
                        let e;
                        (t.$el.dataset.index = t.index),
                            t.$el.querySelectorAll("[data-lazy-srcset]").forEach((t) => {
                                t.srcset = t.dataset.lazySrcset;
                            }),
                            t.$el.querySelectorAll("[data-lazy-src]").forEach((t) => {
                                let e = t.dataset.lazySrc;
                                t instanceof HTMLImageElement ? (t.src = e) : (t.style.backgroundImage = `url('${e}')`);
                            }),
                            (e = t.$el.dataset.lazySrc) && (t.$el.style.backgroundImage = `url('${e}')`),
                            (t.state = "ready");
                    }
                    return;
                }
                const e = document.createElement("div");
                (e.dataset.index = t.index), e.classList.add(...(this.option("prefix") + this.option("classNames.slide")).split(" ")), t.customClass && e.classList.add(...t.customClass.split(" ")), t.html && (e.innerHTML = t.html);
                const s = [];
                this.slides.forEach((t, e) => {
                    t.$el && s.push(e);
                });
                const i = t.index;
                let n = null;
                if (s.length) {
                    let t = s.reduce((t, e) => (Math.abs(e - i) < Math.abs(t - i) ? e : t));
                    n = this.slides[t];
                }
                return this.$track.insertBefore(e, n && n.$el ? (n.index < t.index ? n.$el.nextSibling : n.$el) : null), (t.$el = e), this.trigger("createSlide", t, i), t;
            }
            removeSlideEl(t) {
                t.$el && !t.isDom && (this.trigger("removeSlide", t), t.$el.remove(), (t.$el = null));
            }
            markSelectedSlides() {
                const t = this.option("classNames.slideSelected"),
                    e = "aria-hidden";
                this.slides.forEach((s, i) => {
                    const n = s.$el;
                    if (!n) return;
                    const a = this.pages[this.page];
                    a && a.indexes && a.indexes.indexOf(i) > -1
                        ? (t && !n.classList.contains(t) && (n.classList.add(t), this.trigger("selectSlide", s)), n.removeAttribute(e))
                        : (t && n.classList.contains(t) && (n.classList.remove(t), this.trigger("unselectSlide", s)), n.setAttribute(e, !0));
                });
            }
            updatePage() {
                this.updateMetrics(), this.slideTo(this.page, { friction: 0 });
            }
            onBeforeTransform() {
                this.option("infiniteX", this.option("infinite")) && this.manageInfiniteTrack(), this.manageSlideVisiblity();
            }
            manageInfiniteTrack() {
                const t = this.contentWidth,
                    e = this.viewportWidth;
                if (!this.option("infiniteX", this.option("infinite")) || this.pages.length < 2 || t < e) return;
                const s = this.Panzoom;
                let i = !1;
                return (
                    s.content.x < -1 * (t - e) && ((s.content.x += t), (this.pageIndex = this.pageIndex - this.pages.length), (i = !0)),
                    s.content.x > e && ((s.content.x -= t), (this.pageIndex = this.pageIndex + this.pages.length), (i = !0)),
                    i && "pointerdown" === s.state && s.resetDragPosition(),
                    i
                );
            }
            onTouchEnd(t, e) {
                const s = this.option("dragFree");
                if (!s && this.pages.length > 1 && t.dragOffset.time < 350 && Math.abs(t.dragOffset.y) < 1 && Math.abs(t.dragOffset.x) > 5) this[t.dragOffset.x < 0 ? "slideNext" : "slidePrev"]();
                else if (s) {
                    const [, e] = this.getPageFromPosition(-1 * t.transform.x);
                    this.setPage(e);
                } else this.slideToClosest();
            }
            slideToClosest(t = {}) {
                let [, e] = this.getPageFromPosition(-1 * this.Panzoom.content.x);
                this.slideTo(e, t);
            }
            getPageFromPosition(t) {
                const e = this.pages.length;
                this.option("center") && (t += 0.5 * this.viewportWidth);
                const s = Math.floor(t / this.contentWidth);
                t -= s * this.contentWidth;
                let i = this.slides.find((e) => e.left <= t && e.left + e.width > t);
                if (i) {
                    let t = this.findPageForSlide(i.index);
                    return [t, t + s * e];
                }
                return [0, 0];
            }
            setPage(t, e) {
                let s = 0,
                    i = parseInt(t, 10) || 0;
                const n = this.page,
                    a = this.pageIndex,
                    o = this.pages.length,
                    r = this.contentWidth,
                    l = this.viewportWidth;
                if (((t = ((i % o) + o) % o), this.option("infiniteX", this.option("infinite")) && r > l)) {
                    const n = Math.floor(i / o) || 0,
                        a = r;
                    if (((s = this.pages[t].left + n * a), !0 === e && o > 2)) {
                        let t = -1 * this.Panzoom.content.x;
                        const e = s - a,
                            n = s + a,
                            r = Math.abs(t - s),
                            l = Math.abs(t - e),
                            h = Math.abs(t - n);
                        h < r && h <= l ? ((s = n), (i += o)) : l < r && l < h && ((s = e), (i -= o));
                    }
                } else (t = i = Math.max(0, Math.min(i, o - 1))), (s = this.pages.length ? this.pages[t].left : 0);
                return (this.page = t), (this.pageIndex = i), null !== n && t !== n && ((this.prevPage = n), (this.prevPageIndex = a), this.trigger("change", t, n)), s;
            }
            destroy() {
                (this.state = "destroy"),
                    this.slides.forEach((t) => {
                        this.removeSlideEl(t);
                    }),
                    (this.slides = []),
                    this.Panzoom.destroy(),
                    this.detachPlugins();
            }
        }
        (x.version = "4.0.31"), (x.Plugins = b);
        const w = !("undefined" == typeof window || !window.document || !window.document.createElement);
        let C = null;
        const k = [
                "a[href]",
                "area[href]",
                'input:not([disabled]):not([type="hidden"]):not([aria-hidden])',
                "select:not([disabled]):not([aria-hidden])",
                "textarea:not([disabled]):not([aria-hidden])",
                "button:not([disabled]):not([aria-hidden])",
                "iframe",
                "object",
                "embed",
                "video",
                "audio",
                "[contenteditable]",
                '[tabindex]:not([tabindex^="-"]):not([disabled]):not([aria-hidden])',
            ],
            S = (t) => {
                if (t && w) {
                    null === C &&
                        document.createElement("div").focus({
                            get preventScroll() {
                                return (C = !0), !1;
                            },
                        });
                    try {
                        if (t.setActive) t.setActive();
                        else if (C) t.focus({ preventScroll: !0 });
                        else {
                            const e = window.pageXOffset || document.body.scrollTop,
                                s = window.pageYOffset || document.body.scrollLeft;
                            t.focus(), document.body.scrollTo({ top: e, left: s, behavior: "auto" });
                        }
                    } catch (t) {}
                }
            };
        class E {
            constructor(t) {
                (this.fancybox = t), (this.$container = null), (this.state = "init");
                for (const t of ["onPrepare", "onClosing", "onKeydown"]) this[t] = this[t].bind(this);
                this.events = { prepare: this.onPrepare, closing: this.onClosing, keydown: this.onKeydown };
            }
            onPrepare() {
                this.getSlides().length < this.fancybox.option("Thumbs.minSlideCount")
                    ? (this.state = "disabled")
                    : !0 === this.fancybox.option("Thumbs.autoStart") && this.fancybox.Carousel.Panzoom.content.height >= this.fancybox.option("Thumbs.minScreenHeight") && this.build();
            }
            onClosing() {
                this.Carousel && this.Carousel.Panzoom.detachEvents();
            }
            onKeydown(t, e) {
                e === t.option("Thumbs.key") && this.toggle();
            }
            build() {
                if (this.$container) return;
                const t = document.createElement("div");
                t.classList.add("fancybox__thumbs"),
                    this.fancybox.$carousel.parentNode.insertBefore(t, this.fancybox.$carousel.nextSibling),
                    (this.Carousel = new x(
                        t,
                        n(!0, { Dots: !1, Navigation: !1, Sync: { friction: 0 }, infinite: !1, center: !0, fill: !0, dragFree: !0, slidesPerPage: 1, preload: 1 }, this.fancybox.option("Thumbs.Carousel"), {
                            Sync: { target: this.fancybox.Carousel },
                            slides: this.getSlides(),
                        })
                    )),
                    this.Carousel.Panzoom.on("wheel", (t, e) => {
                        e.preventDefault(), this.fancybox[e.deltaY < 0 ? "prev" : "next"]();
                    }),
                    (this.$container = t),
                    (this.state = "visible");
            }
            getSlides() {
                const t = [];
                for (const e of this.fancybox.items) {
                    const s = e.thumb;
                    s && t.push({ html: this.fancybox.option("Thumbs.tpl").replace(/\{\{src\}\}/gi, s), customClass: "has-thumb has-" + (e.type || "image") });
                }
                return t;
            }
            toggle() {
                "visible" === this.state ? this.hide() : "hidden" === this.state ? this.show() : this.build();
            }
            show() {
                "hidden" === this.state && ((this.$container.style.display = ""), this.Carousel.Panzoom.attachEvents(), (this.state = "visible"));
            }
            hide() {
                "visible" === this.state && (this.Carousel.Panzoom.detachEvents(), (this.$container.style.display = "none"), (this.state = "hidden"));
            }
            cleanup() {
                this.Carousel && (this.Carousel.destroy(), (this.Carousel = null)), this.$container && (this.$container.remove(), (this.$container = null)), (this.state = "init");
            }
            attach() {
                this.fancybox.on(this.events);
            }
            detach() {
                this.fancybox.off(this.events), this.cleanup();
            }
        }
        E.defaults = { minSlideCount: 2, minScreenHeight: 500, autoStart: !0, key: "t", Carousel: {}, tpl: '<div class="fancybox__thumb" style="background-image:url(\'{{src}}\')"></div>' };
        const _ = (t, e) => {
                const s = new URL(t),
                    i = new URLSearchParams(s.search);
                let n = new URLSearchParams();
                for (const [t, s] of [...i, ...Object.entries(e)]) "t" === t ? n.set("start", parseInt(s)) : n.set(t, s);
                n = n.toString();
                let a = t.match(/#t=((.*)?\d+s)/);
                return a && (n += "#t=" + a[1]), n;
            },
            T = {
                video: { autoplay: !0, ratio: 16 / 9 },
                youtube: { autohide: 1, fs: 1, rel: 0, hd: 1, wmode: "transparent", enablejsapi: 1, html5: 1 },
                vimeo: { hd: 1, show_title: 1, show_byline: 1, show_portrait: 0, fullscreen: 1 },
                html5video: {
                    tpl: '<video class="fancybox__html5video" playsinline controls controlsList="nodownload" poster="{{poster}}">\n  <source src="{{src}}" type="{{format}}" />Sorry, your browser doesn\'t support embedded videos.</video>',
                    format: "",
                },
            };
        class A {
            constructor(t) {
                this.fancybox = t;
                for (const t of ["onInit", "onReady", "onCreateSlide", "onRemoveSlide", "onSelectSlide", "onUnselectSlide", "onRefresh", "onMessage"]) this[t] = this[t].bind(this);
                this.events = {
                    init: this.onInit,
                    ready: this.onReady,
                    "Carousel.createSlide": this.onCreateSlide,
                    "Carousel.removeSlide": this.onRemoveSlide,
                    "Carousel.selectSlide": this.onSelectSlide,
                    "Carousel.unselectSlide": this.onUnselectSlide,
                    "Carousel.refresh": this.onRefresh,
                };
            }
            onInit() {
                for (const t of this.fancybox.items) this.processType(t);
            }
            processType(t) {
                if (t.html) return (t.src = t.html), (t.type = "html"), void delete t.html;
                const e = t.src || "";
                let s = t.type || this.fancybox.options.type,
                    i = null;
                if (!e || "string" == typeof e) {
                    if ((i = e.match(/(?:youtube\.com|youtu\.be|youtube\-nocookie\.com)\/(?:watch\?(?:.*&)?v=|v\/|u\/|embed\/?)?(videoseries\?list=(?:.*)|[\w-]{11}|\?listType=(?:.*)&list=(?:.*))(?:.*)/i))) {
                        const n = _(e, this.fancybox.option("Html.youtube")),
                            a = encodeURIComponent(i[1]);
                        (t.videoId = a), (t.src = `https://www.youtube-nocookie.com/embed/${a}?${n}`), (t.thumb = t.thumb || `https://i.ytimg.com/vi/${a}/mqdefault.jpg`), (t.vendor = "youtube"), (s = "video");
                    } else if ((i = e.match(/^.+vimeo.com\/(?:\/)?([\d]+)(.*)?/))) {
                        const n = _(e, this.fancybox.option("Html.vimeo")),
                            a = encodeURIComponent(i[1]);
                        (t.videoId = a), (t.src = `https://player.vimeo.com/video/${a}?${n}`), (t.vendor = "vimeo"), (s = "video");
                    } else
                        (i = e.match(/(?:maps\.)?google\.([a-z]{2,3}(?:\.[a-z]{2})?)\/(?:(?:(?:maps\/(?:place\/(?:.*)\/)?\@(.*),(\d+.?\d+?)z))|(?:\?ll=))(.*)?/i))
                            ? ((t.src = `//maps.google.${i[1]}/?ll=${(i[2] ? i[2] + "&z=" + Math.floor(i[3]) + (i[4] ? i[4].replace(/^\//, "&") : "") : i[4] + "").replace(/\?/, "&")}&output=${
                                  i[4] && i[4].indexOf("layer=c") > 0 ? "svembed" : "embed"
                              }`),
                              (s = "map"))
                            : (i = e.match(/(?:maps\.)?google\.([a-z]{2,3}(?:\.[a-z]{2})?)\/(?:maps\/search\/)(.*)/i)) &&
                              ((t.src = `//maps.google.${i[1]}/maps?q=${i[2].replace("query=", "q=").replace("api=1", "")}&output=embed`), (s = "map"));
                    s ||
                        ("#" === e.charAt(0)
                            ? (s = "inline")
                            : (i = e.match(/\.(mp4|mov|ogv|webm)((\?|#).*)?$/i))
                            ? ((s = "html5video"), (t.format = t.format || "video/" + ("ogv" === i[1] ? "ogg" : i[1])))
                            : e.match(/(^data:image\/[a-z0-9+\/=]*,)|(\.(jp(e|g|eg)|gif|png|bmp|webp|svg|ico)((\?|#).*)?$)/i)
                            ? (s = "image")
                            : e.match(/\.(pdf)((\?|#).*)?$/i) && (s = "pdf")),
                        (t.type = s || this.fancybox.option("defaultType", "image")),
                        ("html5video" !== s && "video" !== s) ||
                            ((t.video = n({}, this.fancybox.option("Html.video"), t.video)), t._width && t._height ? (t.ratio = parseFloat(t._width) / parseFloat(t._height)) : (t.ratio = t.ratio || t.video.ratio || T.video.ratio));
                }
            }
            onReady() {
                this.fancybox.Carousel.slides.forEach((t) => {
                    t.$el && (this.setContent(t), t.index === this.fancybox.getSlide().index && this.playVideo(t));
                });
            }
            onCreateSlide(t, e, s) {
                "ready" === this.fancybox.state && this.setContent(s);
            }
            loadInlineContent(t) {
                let e;
                if (t.src instanceof HTMLElement) e = t.src;
                else if ("string" == typeof t.src) {
                    const s = t.src.split("#", 2),
                        i = 2 === s.length && "" === s[0] ? s[1] : s[0];
                    e = document.getElementById(i);
                }
                if (e) {
                    if ("clone" === t.type || e.$placeHolder) {
                        e = e.cloneNode(!0);
                        let s = e.getAttribute("id");
                        (s = s ? s + "--clone" : `clone-${this.fancybox.id}-${t.index}`), e.setAttribute("id", s);
                    } else {
                        const t = document.createElement("div");
                        t.classList.add("fancybox-placeholder"), e.parentNode.insertBefore(t, e), (e.$placeHolder = t);
                    }
                    this.fancybox.setContent(t, e);
                } else this.fancybox.setError(t, "{{ELEMENT_NOT_FOUND}}");
            }
            loadAjaxContent(t) {
                const e = this.fancybox,
                    s = new XMLHttpRequest();
                e.showLoading(t),
                    (s.onreadystatechange = function () {
                        s.readyState === XMLHttpRequest.DONE && "ready" === e.state && (e.hideLoading(t), 200 === s.status ? e.setContent(t, s.responseText) : e.setError(t, 404 === s.status ? "{{AJAX_NOT_FOUND}}" : "{{AJAX_FORBIDDEN}}"));
                    });
                const i = t.ajax || null;
                s.open(i ? "POST" : "GET", t.src), s.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"), s.setRequestHeader("X-Requested-With", "XMLHttpRequest"), s.send(i), (t.xhr = s);
            }
            loadIframeContent(t) {
                const e = this.fancybox,
                    s = document.createElement("iframe");
                if (
                    ((s.className = "fancybox__iframe"),
                    s.setAttribute("id", `fancybox__iframe_${e.id}_${t.index}`),
                    s.setAttribute("allow", "autoplay; fullscreen"),
                    s.setAttribute("scrolling", "auto"),
                    (t.$iframe = s),
                    "iframe" !== t.type || !1 === t.preload)
                )
                    return s.setAttribute("src", t.src), this.fancybox.setContent(t, s), void this.resizeIframe(t);
                e.showLoading(t);
                const i = document.createElement("div");
                (i.style.visibility = "hidden"),
                    this.fancybox.setContent(t, i),
                    i.appendChild(s),
                    (s.onerror = () => {
                        e.setError(t, "{{IFRAME_ERROR}}");
                    }),
                    (s.onload = () => {
                        e.hideLoading(t);
                        let i = !1;
                        s.isReady || ((s.isReady = !0), (i = !0)), s.src.length && ((s.parentNode.style.visibility = ""), this.resizeIframe(t), i && e.revealContent(t));
                    }),
                    s.setAttribute("src", t.src);
            }
            setAspectRatio(t) {
                const e = t.$content,
                    s = t.ratio;
                if (!e) return;
                let i = t._width,
                    n = t._height;
                if (s || (i && n)) {
                    Object.assign(e.style, { width: i && n ? "100%" : "", height: i && n ? "100%" : "", maxWidth: "", maxHeight: "" });
                    let t = e.offsetWidth,
                        a = e.offsetHeight;
                    if (((i = i || t), (n = n || a), i > t || n > a)) {
                        let e = Math.min(t / i, a / n);
                        (i *= e), (n *= e);
                    }
                    Math.abs(i / n - s) > 0.01 && (s < i / n ? (i = n * s) : (n = i / s)), Object.assign(e.style, { width: i + "px", height: n + "px" });
                }
            }
            resizeIframe(t) {
                const e = t.$iframe;
                if (!e) return;
                let s = t._width || 0,
                    i = t._height || 0;
                s && i && (t.autoSize = !1);
                const n = e.parentNode,
                    a = n && n.style;
                if (!1 !== t.preload && !1 !== t.autoSize && a)
                    try {
                        const t = window.getComputedStyle(n),
                            o = parseFloat(t.paddingLeft) + parseFloat(t.paddingRight),
                            r = parseFloat(t.paddingTop) + parseFloat(t.paddingBottom),
                            l = e.contentWindow.document,
                            h = l.getElementsByTagName("html")[0],
                            d = l.body;
                        (a.width = ""), (d.style.overflow = "hidden"), (s = s || h.scrollWidth + o), (a.width = s + "px"), (d.style.overflow = ""), (a.flex = "0 0 auto"), (a.height = d.scrollHeight + "px"), (i = h.scrollHeight + r);
                    } catch (t) {}
                if (s || i) {
                    const t = { flex: "0 1 auto" };
                    s && (t.width = s + "px"), i && (t.height = i + "px"), Object.assign(a, t);
                }
            }
            onRefresh(t, e) {
                e.slides.forEach((t) => {
                    t.$el && (t.$iframe && this.resizeIframe(t), t.ratio && this.setAspectRatio(t));
                });
            }
            setContent(t) {
                if (t && !t.isDom) {
                    switch (t.type) {
                        case "html":
                            this.fancybox.setContent(t, t.src);
                            break;
                        case "html5video":
                            this.fancybox.setContent(
                                t,
                                this.fancybox
                                    .option("Html.html5video.tpl")
                                    .replace(/\{\{src\}\}/gi, t.src)
                                    .replace("{{format}}", t.format || (t.html5video && t.html5video.format) || "")
                                    .replace("{{poster}}", t.poster || t.thumb || "")
                            );
                            break;
                        case "inline":
                        case "clone":
                            this.loadInlineContent(t);
                            break;
                        case "ajax":
                            this.loadAjaxContent(t);
                            break;
                        case "pdf":
                        case "video":
                        case "map":
                            t.preload = !1;
                        case "iframe":
                            this.loadIframeContent(t);
                    }
                    t.ratio && this.setAspectRatio(t);
                }
            }
            onSelectSlide(t, e, s) {
                "ready" === t.state && this.playVideo(s);
            }
            playVideo(t) {
                if ("html5video" === t.type && t.video.autoplay)
                    try {
                        const e = t.$el.querySelector("video");
                        if (e) {
                            const t = e.play();
                            void 0 !== t &&
                                t
                                    .then(() => {})
                                    .catch((t) => {
                                        (e.muted = !0), e.play();
                                    });
                        }
                    } catch (t) {}
                if ("video" !== t.type || !t.$iframe || !t.$iframe.contentWindow) return;
                const e = () => {
                    if ("done" === t.state && t.$iframe && t.$iframe.contentWindow) {
                        let e;
                        if (t.$iframe.isReady)
                            return (
                                t.video && t.video.autoplay && (e = "youtube" == t.vendor ? { event: "command", func: "playVideo" } : { method: "play", value: "true" }),
                                void (e && t.$iframe.contentWindow.postMessage(JSON.stringify(e), "*"))
                            );
                        "youtube" === t.vendor && ((e = { event: "listening", id: t.$iframe.getAttribute("id") }), t.$iframe.contentWindow.postMessage(JSON.stringify(e), "*"));
                    }
                    t.poller = setTimeout(e, 250);
                };
                e();
            }
            onUnselectSlide(t, e, s) {
                if ("html5video" === s.type) {
                    try {
                        s.$el.querySelector("video").pause();
                    } catch (t) {}
                    return;
                }
                let i = !1;
                "vimeo" == s.vendor ? (i = { method: "pause", value: "true" }) : "youtube" === s.vendor && (i = { event: "command", func: "pauseVideo" }),
                    i && s.$iframe && s.$iframe.contentWindow && s.$iframe.contentWindow.postMessage(JSON.stringify(i), "*"),
                    clearTimeout(s.poller);
            }
            onRemoveSlide(t, e, s) {
                s.xhr && (s.xhr.abort(), (s.xhr = null)), s.$iframe && ((s.$iframe.onload = s.$iframe.onerror = null), (s.$iframe.src = "//about:blank"), (s.$iframe = null));
                const i = s.$content;
                "inline" === s.type && i && (i.classList.remove("fancybox__content"), "none" !== i.style.display && (i.style.display = "none")), s.$closeButton && (s.$closeButton.remove(), (s.$closeButton = null));
                const n = i && i.$placeHolder;
                n && (n.parentNode.insertBefore(i, n), n.remove(), (i.$placeHolder = null));
            }
            onMessage(t) {
                try {
                    let e = JSON.parse(t.data);
                    if ("https://player.vimeo.com" === t.origin) {
                        if ("ready" === e.event) for (let e of document.getElementsByClassName("fancybox__iframe")) e.contentWindow === t.source && (e.isReady = 1);
                    } else "https://www.youtube-nocookie.com" === t.origin && "onReady" === e.event && (document.getElementById(e.id).isReady = 1);
                } catch (t) {}
            }
            attach() {
                this.fancybox.on(this.events), window.addEventListener("message", this.onMessage, !1);
            }
            detach() {
                this.fancybox.off(this.events), window.removeEventListener("message", this.onMessage, !1);
            }
        }
        A.defaults = T;
        class P {
            constructor(t) {
                this.fancybox = t;
                for (const t of ["onReady", "onClosing", "onDone", "onPageChange", "onCreateSlide", "onRemoveSlide", "onImageStatusChange"]) this[t] = this[t].bind(this);
                this.events = { ready: this.onReady, closing: this.onClosing, done: this.onDone, "Carousel.change": this.onPageChange, "Carousel.createSlide": this.onCreateSlide, "Carousel.removeSlide": this.onRemoveSlide };
            }
            onReady() {
                this.fancybox.Carousel.slides.forEach((t) => {
                    t.$el && this.setContent(t);
                });
            }
            onDone(t, e) {
                this.handleCursor(e);
            }
            onClosing(t) {
                clearTimeout(this.clickTimer),
                    (this.clickTimer = null),
                    t.Carousel.slides.forEach((t) => {
                        t.$image && (t.state = "destroy"), t.Panzoom && t.Panzoom.detachEvents();
                    }),
                    "closing" === this.fancybox.state && this.canZoom(t.getSlide()) && this.zoomOut();
            }
            onCreateSlide(t, e, s) {
                "ready" === this.fancybox.state && this.setContent(s);
            }
            onRemoveSlide(t, e, s) {
                s.$image && (s.$el.classList.remove(t.option("Image.canZoomInClass")), s.$image.remove(), (s.$image = null)), s.Panzoom && (s.Panzoom.destroy(), (s.Panzoom = null)), s.$el && s.$el.dataset && delete s.$el.dataset.imageFit;
            }
            setContent(t) {
                if (t.isDom || t.html || (t.type && "image" !== t.type)) return;
                if (t.$image) return;
                (t.type = "image"), (t.state = "loading");
                const e = document.createElement("div");
                e.style.visibility = "hidden";
                const s = document.createElement("img");
                s.addEventListener("load", (e) => {
                    e.stopImmediatePropagation(), this.onImageStatusChange(t);
                }),
                    s.addEventListener("error", () => {
                        this.onImageStatusChange(t);
                    }),
                    (s.src = t.src),
                    (s.alt = ""),
                    (s.draggable = !1),
                    s.classList.add("fancybox__image"),
                    t.srcset && s.setAttribute("srcset", t.srcset),
                    t.sizes && s.setAttribute("sizes", t.sizes),
                    (t.$image = s);
                const i = this.fancybox.option("Image.wrap");
                if (i) {
                    const n = document.createElement("div");
                    n.classList.add("string" == typeof i ? i : "fancybox__image-wrap"), n.appendChild(s), e.appendChild(n), (t.$wrap = n);
                } else e.appendChild(s);
                (t.$el.dataset.imageFit = this.fancybox.option("Image.fit")), this.fancybox.setContent(t, e), s.complete || s.error ? this.onImageStatusChange(t) : this.fancybox.showLoading(t);
            }
            onImageStatusChange(t) {
                const e = t.$image;
                e &&
                    "loading" === t.state &&
                    (e.complete && e.naturalWidth && e.naturalHeight
                        ? (this.fancybox.hideLoading(t),
                          "contain" === this.fancybox.option("Image.fit") && this.initSlidePanzoom(t),
                          t.$el.addEventListener("wheel", (e) => this.onWheel(t, e), { passive: !1 }),
                          t.$content.addEventListener("click", (e) => this.onClick(t, e), { passive: !1 }),
                          this.revealContent(t))
                        : this.fancybox.setError(t, "{{IMAGE_ERROR}}"));
            }
            initSlidePanzoom(t) {
                t.Panzoom ||
                    ((t.Panzoom = new f(
                        t.$el,
                        n(!0, this.fancybox.option("Image.Panzoom", {}), {
                            viewport: t.$wrap,
                            content: t.$image,
                            width: t._width,
                            height: t._height,
                            wrapInner: !1,
                            textSelection: !0,
                            touch: this.fancybox.option("Image.touch"),
                            panOnlyZoomed: !0,
                            click: !1,
                            wheel: !1,
                        })
                    )),
                    t.Panzoom.on("startAnimation", () => {
                        this.fancybox.trigger("Image.startAnimation", t);
                    }),
                    t.Panzoom.on("endAnimation", () => {
                        "zoomIn" === t.state && this.fancybox.done(t), this.handleCursor(t), this.fancybox.trigger("Image.endAnimation", t);
                    }),
                    t.Panzoom.on("afterUpdate", () => {
                        this.handleCursor(t), this.fancybox.trigger("Image.afterUpdate", t);
                    }));
            }
            revealContent(t) {
                null === this.fancybox.Carousel.prevPage && t.index === this.fancybox.options.startIndex && this.canZoom(t) ? this.zoomIn() : this.fancybox.revealContent(t);
            }
            getZoomInfo(t) {
                const e = t.$thumb.getBoundingClientRect(),
                    s = e.width,
                    i = e.height,
                    n = t.$content.getBoundingClientRect(),
                    a = n.width,
                    o = n.height,
                    r = n.top - e.top,
                    l = n.left - e.left;
                let h = this.fancybox.option("Image.zoomOpacity");
                return "auto" === h && (h = Math.abs(s / i - a / o) > 0.1), { top: r, left: l, scale: a && s ? s / a : 1, opacity: h };
            }
            canZoom(t) {
                const e = this.fancybox,
                    s = e.$container;
                if (window.visualViewport && 1 !== window.visualViewport.scale) return !1;
                if (t.Panzoom && !t.Panzoom.content.width) return !1;
                if (!e.option("Image.zoom") || "contain" !== e.option("Image.fit")) return !1;
                const i = t.$thumb;
                if (!i || "loading" === t.state) return !1;
                s.classList.add("fancybox__no-click");
                const n = i.getBoundingClientRect();
                let a;
                if (this.fancybox.option("Image.ignoreCoveredThumbnail")) {
                    const t = document.elementFromPoint(n.left + 1, n.top + 1) === i,
                        e = document.elementFromPoint(n.right - 1, n.bottom - 1) === i;
                    a = t && e;
                } else a = document.elementFromPoint(n.left + 0.5 * n.width, n.top + 0.5 * n.height) === i;
                return s.classList.remove("fancybox__no-click"), a;
            }
            zoomIn() {
                const t = this.fancybox,
                    e = t.getSlide(),
                    s = e.Panzoom,
                    { top: i, left: n, scale: a, opacity: o } = this.getZoomInfo(e);
                t.trigger("reveal", e),
                    s.panTo({ x: -1 * n, y: -1 * i, scale: a, friction: 0, ignoreBounds: !0 }),
                    (e.$content.style.visibility = ""),
                    (e.state = "zoomIn"),
                    !0 === o &&
                        s.on("afterTransform", (t) => {
                            ("zoomIn" !== e.state && "zoomOut" !== e.state) || (t.$content.style.opacity = Math.min(1, 1 - (1 - t.content.scale) / (1 - a)));
                        }),
                    s.panTo({ x: 0, y: 0, scale: 1, friction: this.fancybox.option("Image.zoomFriction") });
            }
            zoomOut() {
                const t = this.fancybox,
                    e = t.getSlide(),
                    s = e.Panzoom;
                if (!s) return;
                (e.state = "zoomOut"), (t.state = "customClosing"), e.$caption && (e.$caption.style.visibility = "hidden");
                let i = this.fancybox.option("Image.zoomFriction");
                const n = (t) => {
                    const { top: n, left: a, scale: o, opacity: r } = this.getZoomInfo(e);
                    t || r || (i *= 0.82), s.panTo({ x: -1 * a, y: -1 * n, scale: o, friction: i, ignoreBounds: !0 }), (i *= 0.98);
                };
                window.addEventListener("scroll", n),
                    s.once("endAnimation", () => {
                        window.removeEventListener("scroll", n), t.destroy();
                    }),
                    n();
            }
            handleCursor(t) {
                if ("image" !== t.type || !t.$el) return;
                const e = t.Panzoom,
                    s = this.fancybox.option("Image.click", !1, t),
                    i = this.fancybox.option("Image.touch"),
                    n = t.$el.classList,
                    a = this.fancybox.option("Image.canZoomInClass"),
                    o = this.fancybox.option("Image.canZoomOutClass");
                n.remove(o), n.remove(a), e && "toggleZoom" === s ? (e && 1 === e.content.scale && e.option("maxScale") - e.content.scale > 0.01 ? n.add(a) : e.content.scale > 1 && !i && n.add(o)) : "close" === s && n.add(o);
            }
            onWheel(t, e) {
                if ("ready" === this.fancybox.state && !1 !== this.fancybox.trigger("Image.wheel", e))
                    switch (this.fancybox.option("Image.wheel")) {
                        case "zoom":
                            "done" === t.state && t.Panzoom && t.Panzoom.zoomWithWheel(e);
                            break;
                        case "close":
                            this.fancybox.close();
                            break;
                        case "slide":
                            this.fancybox[e.deltaY < 0 ? "prev" : "next"]();
                    }
            }
            onClick(t, e) {
                if ("ready" !== this.fancybox.state) return;
                const s = t.Panzoom;
                if (s && (s.dragPosition.midPoint || 0 !== s.dragOffset.x || 0 !== s.dragOffset.y || 1 !== s.dragOffset.scale)) return;
                if (this.fancybox.Carousel.Panzoom.lockAxis) return !1;
                const i = (s) => {
                        switch (s) {
                            case "toggleZoom":
                                e.stopPropagation(), t.Panzoom && t.Panzoom.zoomWithClick(e);
                                break;
                            case "close":
                                this.fancybox.close();
                                break;
                            case "next":
                                e.stopPropagation(), this.fancybox.next();
                        }
                    },
                    n = this.fancybox.option("Image.click"),
                    a = this.fancybox.option("Image.doubleClick");
                a
                    ? this.clickTimer
                        ? (clearTimeout(this.clickTimer), (this.clickTimer = null), i(a))
                        : (this.clickTimer = setTimeout(() => {
                              (this.clickTimer = null), i(n);
                          }, 300))
                    : i(n);
            }
            onPageChange(t, e) {
                const s = t.getSlide();
                e.slides.forEach((t) => {
                    t.Panzoom && "done" === t.state && t.index !== s.index && t.Panzoom.panTo({ x: 0, y: 0, scale: 1, friction: 0.8 });
                });
            }
            attach() {
                this.fancybox.on(this.events);
            }
            detach() {
                this.fancybox.off(this.events);
            }
        }
        P.defaults = {
            canZoomInClass: "can-zoom_in",
            canZoomOutClass: "can-zoom_out",
            zoom: !0,
            zoomOpacity: "auto",
            zoomFriction: 0.82,
            ignoreCoveredThumbnail: !1,
            touch: !0,
            click: "toggleZoom",
            doubleClick: null,
            wheel: "zoom",
            fit: "contain",
            wrap: !1,
            Panzoom: { ratio: 1 },
        };
        class M {
            constructor(t) {
                this.fancybox = t;
                for (const t of ["onChange", "onClosing"]) this[t] = this[t].bind(this);
                (this.events = { initCarousel: this.onChange, "Carousel.change": this.onChange, closing: this.onClosing }), (this.hasCreatedHistory = !1), (this.origHash = ""), (this.timer = null);
            }
            onChange(t) {
                const e = t.Carousel;
                this.timer && clearTimeout(this.timer);
                const s = null === e.prevPage,
                    i = t.getSlide(),
                    n = new URL(document.URL).hash;
                let a = !1;
                if (i.slug) a = "#" + i.slug;
                else {
                    const s = i.$trigger && i.$trigger.dataset,
                        n = t.option("slug") || (s && s.fancybox);
                    n && n.length && "true" !== n && (a = "#" + n + (e.slides.length > 1 ? "-" + (i.index + 1) : ""));
                }
                s && (this.origHash = n !== a ? n : ""),
                    a &&
                        n !== a &&
                        (this.timer = setTimeout(() => {
                            try {
                                window.history[s ? "pushState" : "replaceState"]({}, document.title, window.location.pathname + window.location.search + a), s && (this.hasCreatedHistory = !0);
                            } catch (t) {}
                        }, 300));
            }
            onClosing() {
                if ((this.timer && clearTimeout(this.timer), !0 !== this.hasSilentClose))
                    try {
                        return void window.history.replaceState({}, document.title, window.location.pathname + window.location.search + (this.origHash || ""));
                    } catch (t) {}
            }
            attach(t) {
                t.on(this.events);
            }
            detach(t) {
                t.off(this.events);
            }
            static startFromUrl() {
                const t = M.Fancybox;
                if (!t || t.getInstance() || !1 === t.defaults.Hash) return;
                const { hash: e, slug: s, index: i } = M.getParsedURL();
                if (!s) return;
                let n = document.querySelector(`[data-slug="${e}"]`);
                if ((n && n.dispatchEvent(new CustomEvent("click", { bubbles: !0, cancelable: !0 })), t.getInstance())) return;
                const a = document.querySelectorAll(`[data-fancybox="${s}"]`);
                a.length && (null === i && 1 === a.length ? (n = a[0]) : i && (n = a[i - 1]), n && n.dispatchEvent(new CustomEvent("click", { bubbles: !0, cancelable: !0 })));
            }
            static onHashChange() {
                const { slug: t, index: e } = M.getParsedURL(),
                    s = M.Fancybox,
                    i = s && s.getInstance();
                if (i && i.plugins.Hash) {
                    if (t) {
                        const s = i.Carousel;
                        if (t === i.option("slug")) return s.slideTo(e - 1);
                        for (let e of s.slides) if (e.slug && e.slug === t) return s.slideTo(e.index);
                        const n = i.getSlide(),
                            a = n.$trigger && n.$trigger.dataset;
                        if (a && a.fancybox === t) return s.slideTo(e - 1);
                    }
                    (i.plugins.Hash.hasSilentClose = !0), i.close();
                }
                M.startFromUrl();
            }
            static create(t) {
                function e() {
                    window.addEventListener("hashchange", M.onHashChange, !1), M.startFromUrl();
                }
                (M.Fancybox = t),
                    w &&
                        window.requestAnimationFrame(() => {
                            /complete|interactive|loaded/.test(document.readyState) ? e() : document.addEventListener("DOMContentLoaded", e);
                        });
            }
            static destroy() {
                window.removeEventListener("hashchange", M.onHashChange, !1);
            }
            static getParsedURL() {
                const t = window.location.hash.substr(1),
                    e = t.split("-"),
                    s = (e.length > 1 && /^\+?\d+$/.test(e[e.length - 1]) && parseInt(e.pop(-1), 10)) || null;
                return { hash: t, slug: e.join("-"), index: s };
            }
        }
        const $ = {
            pageXOffset: 0,
            pageYOffset: 0,
            element: () => document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement,
            activate(t) {
                ($.pageXOffset = window.pageXOffset),
                    ($.pageYOffset = window.pageYOffset),
                    t.requestFullscreen ? t.requestFullscreen() : t.mozRequestFullScreen ? t.mozRequestFullScreen() : t.webkitRequestFullscreen ? t.webkitRequestFullscreen() : t.msRequestFullscreen && t.msRequestFullscreen();
            },
            deactivate() {
                document.exitFullscreen ? document.exitFullscreen() : document.mozCancelFullScreen ? document.mozCancelFullScreen() : document.webkitExitFullscreen && document.webkitExitFullscreen();
            },
        };
        class L {
            constructor(t) {
                (this.fancybox = t), (this.active = !1), (this.handleVisibilityChange = this.handleVisibilityChange.bind(this));
            }
            isActive() {
                return this.active;
            }
            setTimer() {
                if (!this.active || this.timer) return;
                const t = this.fancybox.option("slideshow.delay", 3e3);
                this.timer = setTimeout(() => {
                    (this.timer = null), this.fancybox.option("infinite") || this.fancybox.getSlide().index !== this.fancybox.Carousel.slides.length - 1 ? this.fancybox.next() : this.fancybox.jumpTo(0, { friction: 0 });
                }, t);
                let e = this.$progress;
                e || ((e = document.createElement("div")), e.classList.add("fancybox__progress"), this.fancybox.$carousel.parentNode.insertBefore(e, this.fancybox.$carousel), (this.$progress = e), e.offsetHeight),
                    (e.style.transitionDuration = t + "ms"),
                    (e.style.transform = "scaleX(1)");
            }
            clearTimer() {
                clearTimeout(this.timer), (this.timer = null), this.$progress && ((this.$progress.style.transitionDuration = ""), (this.$progress.style.transform = ""), this.$progress.offsetHeight);
            }
            activate() {
                this.active ||
                    ((this.active = !0), this.fancybox.$container.classList.add("has-slideshow"), "done" === this.fancybox.getSlide().state && this.setTimer(), document.addEventListener("visibilitychange", this.handleVisibilityChange, !1));
            }
            handleVisibilityChange() {
                this.deactivate();
            }
            deactivate() {
                (this.active = !1), this.clearTimer(), this.fancybox.$container.classList.remove("has-slideshow"), document.removeEventListener("visibilitychange", this.handleVisibilityChange, !1);
            }
            toggle() {
                this.active ? this.deactivate() : this.fancybox.Carousel.slides.length > 1 && this.activate();
            }
        }
        const F = {
            display: ["counter", "zoom", "slideshow", "fullscreen", "thumbs", "close"],
            autoEnable: !0,
            items: {
                counter: { position: "left", type: "div", class: "fancybox__counter", html: '<span data-fancybox-index=""></span>&nbsp;/&nbsp;<span data-fancybox-count=""></span>', attr: { tabindex: -1 } },
                prev: { type: "button", class: "fancybox__button--prev", label: "PREV", html: '<svg viewBox="0 0 24 24"><path d="M15 4l-8 8 8 8"/></svg>', attr: { "data-fancybox-prev": "" } },
                next: { type: "button", class: "fancybox__button--next", label: "NEXT", html: '<svg viewBox="0 0 24 24"><path d="M8 4l8 8-8 8"/></svg>', attr: { "data-fancybox-next": "" } },
                fullscreen: {
                    type: "button",
                    class: "fancybox__button--fullscreen",
                    label: "TOGGLE_FULLSCREEN",
                    html:
                        '<svg viewBox="0 0 24 24">\n                <g><path d="M3 8 V3h5"></path><path d="M21 8V3h-5"></path><path d="M8 21H3v-5"></path><path d="M16 21h5v-5"></path></g>\n                <g><path d="M7 2v5H2M17 2v5h5M2 17h5v5M22 17h-5v5"/></g>\n            </svg>',
                    click: function (t) {
                        t.preventDefault(), $.element() ? $.deactivate() : $.activate(this.fancybox.$container);
                    },
                },
                slideshow: {
                    type: "button",
                    class: "fancybox__button--slideshow",
                    label: "TOGGLE_SLIDESHOW",
                    html: '<svg viewBox="0 0 24 24">\n                <g><path d="M6 4v16"/><path d="M20 12L6 20"/><path d="M20 12L6 4"/></g>\n                <g><path d="M7 4v15M17 4v15"/></g>\n            </svg>',
                    click: function (t) {
                        t.preventDefault(), this.Slideshow.toggle();
                    },
                },
                zoom: {
                    type: "button",
                    class: "fancybox__button--zoom",
                    label: "TOGGLE_ZOOM",
                    html: '<svg viewBox="0 0 24 24"><circle cx="10" cy="10" r="7"></circle><path d="M16 16 L21 21"></svg>',
                    click: function (t) {
                        t.preventDefault();
                        const e = this.fancybox.getSlide().Panzoom;
                        e && e.toggleZoom();
                    },
                },
                download: {
                    type: "link",
                    label: "DOWNLOAD",
                    class: "fancybox__button--download",
                    html: '<svg viewBox="0 0 24 24"><path d="M12 15V3m0 12l-4-4m4 4l4-4M2 17l.62 2.48A2 2 0 004.56 21h14.88a2 2 0 001.94-1.51L22 17"/></svg>',
                    click: function (t) {
                        t.stopPropagation();
                    },
                },
                thumbs: {
                    type: "button",
                    label: "TOGGLE_THUMBS",
                    class: "fancybox__button--thumbs",
                    html:
                        '<svg viewBox="0 0 24 24"><circle cx="4" cy="4" r="1" /><circle cx="12" cy="4" r="1" transform="rotate(90 12 4)"/><circle cx="20" cy="4" r="1" transform="rotate(90 20 4)"/><circle cx="4" cy="12" r="1" transform="rotate(90 4 12)"/><circle cx="12" cy="12" r="1" transform="rotate(90 12 12)"/><circle cx="20" cy="12" r="1" transform="rotate(90 20 12)"/><circle cx="4" cy="20" r="1" transform="rotate(90 4 20)"/><circle cx="12" cy="20" r="1" transform="rotate(90 12 20)"/><circle cx="20" cy="20" r="1" transform="rotate(90 20 20)"/></svg>',
                    click: function (t) {
                        t.stopPropagation();
                        const e = this.fancybox.plugins.Thumbs;
                        e && e.toggle();
                    },
                },
                close: { type: "button", label: "CLOSE", class: "fancybox__button--close", html: '<svg viewBox="0 0 24 24"><path d="M20 20L4 4m16 0L4 20"></path></svg>', attr: { "data-fancybox-close": "", tabindex: 0 } },
            },
        };
        class I {
            constructor(t) {
                (this.fancybox = t), (this.$container = null), (this.state = "init");
                for (const t of ["onInit", "onPrepare", "onDone", "onKeydown", "onClosing", "onChange", "onSettle", "onRefresh"]) this[t] = this[t].bind(this);
                this.events = {
                    init: this.onInit,
                    prepare: this.onPrepare,
                    done: this.onDone,
                    keydown: this.onKeydown,
                    closing: this.onClosing,
                    "Carousel.change": this.onChange,
                    "Carousel.settle": this.onSettle,
                    "Carousel.Panzoom.touchStart": () => this.onRefresh(),
                    "Image.startAnimation": (t, e) => this.onRefresh(e),
                    "Image.afterUpdate": (t, e) => this.onRefresh(e),
                };
            }
            onInit() {
                if (this.fancybox.option("Toolbar.autoEnable")) {
                    let t = !1;
                    for (const e of this.fancybox.items)
                        if ("image" === e.type) {
                            t = !0;
                            break;
                        }
                    if (!t) return void (this.state = "disabled");
                }
                for (const t of this.fancybox.option("Toolbar.display"))
                    if ("close" === (i(t) ? t.id : t)) {
                        this.fancybox.options.closeButton = !1;
                        break;
                    }
            }
            onPrepare() {
                const t = this.fancybox;
                if (
                    "init" === this.state &&
                    (this.build(), this.update(), (this.Slideshow = new L(t)), !t.Carousel.prevPage && (t.option("slideshow.autoStart") && this.Slideshow.activate(), t.option("fullscreen.autoStart") && !$.element()))
                )
                    try {
                        $.activate(t.$container);
                    } catch (t) {}
            }
            onFsChange() {
                window.scrollTo($.pageXOffset, $.pageYOffset);
            }
            onSettle() {
                const t = this.fancybox,
                    e = this.Slideshow;
                e && e.isActive() && (t.getSlide().index !== t.Carousel.slides.length - 1 || t.option("infinite") ? "done" === t.getSlide().state && e.setTimer() : e.deactivate());
            }
            onChange() {
                this.update(), this.Slideshow && this.Slideshow.isActive() && this.Slideshow.clearTimer();
            }
            onDone(t, e) {
                const s = this.Slideshow;
                e.index === t.getSlide().index && (this.update(), s && s.isActive() && (t.option("infinite") || e.index !== t.Carousel.slides.length - 1 ? s.setTimer() : s.deactivate()));
            }
            onRefresh(t) {
                (t && t.index !== this.fancybox.getSlide().index) || (this.update(), !this.Slideshow || !this.Slideshow.isActive() || (t && "done" !== t.state) || this.Slideshow.deactivate());
            }
            onKeydown(t, e, s) {
                " " === e && this.Slideshow && (this.Slideshow.toggle(), s.preventDefault());
            }
            onClosing() {
                this.Slideshow && this.Slideshow.deactivate(), document.removeEventListener("fullscreenchange", this.onFsChange);
            }
            createElement(t) {
                let e;
                "div" === t.type ? (e = document.createElement("div")) : ((e = document.createElement("link" === t.type ? "a" : "button")), e.classList.add("carousel__button")),
                    (e.innerHTML = t.html),
                    e.setAttribute("tabindex", t.tabindex || 0),
                    t.class && e.classList.add(...t.class.split(" "));
                for (const s in t.attr) e.setAttribute(s, t.attr[s]);
                t.label && e.setAttribute("title", this.fancybox.localize(`{{${t.label}}}`)),
                    t.click && e.addEventListener("click", t.click.bind(this)),
                    "prev" === t.id && e.setAttribute("data-fancybox-prev", ""),
                    "next" === t.id && e.setAttribute("data-fancybox-next", "");
                const s = e.querySelector("svg");
                return s && (s.setAttribute("role", "img"), s.setAttribute("tabindex", "-1"), s.setAttribute("xmlns", "http://www.w3.org/2000/svg")), e;
            }
            build() {
                this.cleanup();
                const t = this.fancybox.option("Toolbar.items"),
                    e = [
                        { position: "left", items: [] },
                        { position: "center", items: [] },
                        { position: "right", items: [] },
                    ],
                    s = this.fancybox.plugins.Thumbs;
                for (const a of this.fancybox.option("Toolbar.display")) {
                    let o, r;
                    if ((i(a) ? ((o = a.id), (r = n({}, t[o], a))) : ((o = a), (r = t[o])), ["counter", "next", "prev", "slideshow"].includes(o) && this.fancybox.items.length < 2)) continue;
                    if ("fullscreen" === o) {
                        if (!document.fullscreenEnabled || window.fullScreen) continue;
                        document.addEventListener("fullscreenchange", this.onFsChange);
                    }
                    if ("thumbs" === o && (!s || "disabled" === s.state)) continue;
                    if (!r) continue;
                    let l = r.position || "right",
                        h = e.find((t) => t.position === l);
                    h && h.items.push(r);
                }
                const a = document.createElement("div");
                a.classList.add("fancybox__toolbar");
                for (const t of e)
                    if (t.items.length) {
                        const e = document.createElement("div");
                        e.classList.add("fancybox__toolbar__items"), e.classList.add("fancybox__toolbar__items--" + t.position);
                        for (const s of t.items) e.appendChild(this.createElement(s));
                        a.appendChild(e);
                    }
                this.fancybox.$carousel.parentNode.insertBefore(a, this.fancybox.$carousel), (this.$container = a);
            }
            update() {
                const t = this.fancybox.getSlide(),
                    e = t.index,
                    s = this.fancybox.items.length,
                    i = t.downloadSrc || ("image" !== t.type || t.error ? null : t.src);
                for (const t of this.fancybox.$container.querySelectorAll("a.fancybox__button--download"))
                    i
                        ? (t.removeAttribute("disabled"), t.removeAttribute("tabindex"), t.setAttribute("href", i), t.setAttribute("download", i), t.setAttribute("target", "_blank"))
                        : (t.setAttribute("disabled", ""), t.setAttribute("tabindex", -1), t.removeAttribute("href"), t.removeAttribute("download"));
                const n = t.Panzoom,
                    a = n && n.option("maxScale") > n.option("baseScale");
                for (const t of this.fancybox.$container.querySelectorAll(".fancybox__button--zoom")) a ? t.removeAttribute("disabled") : t.setAttribute("disabled", "");
                for (const e of this.fancybox.$container.querySelectorAll("[data-fancybox-index]")) e.innerHTML = t.index + 1;
                for (const t of this.fancybox.$container.querySelectorAll("[data-fancybox-count]")) t.innerHTML = s;
                if (!this.fancybox.option("infinite")) {
                    for (const t of this.fancybox.$container.querySelectorAll("[data-fancybox-prev]")) 0 === e ? t.setAttribute("disabled", "") : t.removeAttribute("disabled");
                    for (const t of this.fancybox.$container.querySelectorAll("[data-fancybox-next]")) e === s - 1 ? t.setAttribute("disabled", "") : t.removeAttribute("disabled");
                }
            }
            cleanup() {
                this.Slideshow && this.Slideshow.isActive() && this.Slideshow.clearTimer(), this.$container && this.$container.remove(), (this.$container = null);
            }
            attach() {
                this.fancybox.on(this.events);
            }
            detach() {
                this.fancybox.off(this.events), this.cleanup();
            }
        }
        I.defaults = F;
        const D = {
                ScrollLock: class {
                    constructor(t) {
                        (this.fancybox = t), (this.viewport = null), (this.pendingUpdate = null);
                        for (const t of ["onReady", "onResize", "onTouchstart", "onTouchmove"]) this[t] = this[t].bind(this);
                    }
                    onReady() {
                        const t = window.visualViewport;
                        t && ((this.viewport = t), (this.startY = 0), t.addEventListener("resize", this.onResize), this.updateViewport()),
                            window.addEventListener("touchstart", this.onTouchstart, { passive: !1 }),
                            window.addEventListener("touchmove", this.onTouchmove, { passive: !1 }),
                            window.addEventListener("wheel", this.onWheel, { passive: !1 });
                    }
                    onResize() {
                        this.updateViewport();
                    }
                    updateViewport() {
                        const t = this.fancybox,
                            e = this.viewport,
                            s = e.scale || 1,
                            i = t.$container;
                        if (!i) return;
                        let n = "",
                            a = "",
                            o = "";
                        s - 1 > 0.1 && ((n = e.width * s + "px"), (a = e.height * s + "px"), (o = `translate3d(${e.offsetLeft}px, ${e.offsetTop}px, 0) scale(${1 / s})`)), (i.style.width = n), (i.style.height = a), (i.style.transform = o);
                    }
                    onTouchstart(t) {
                        this.startY = t.touches ? t.touches[0].screenY : t.screenY;
                    }
                    onTouchmove(t) {
                        const e = this.startY,
                            s = window.innerWidth / window.document.documentElement.clientWidth;
                        if (!t.cancelable) return;
                        if (t.touches.length > 1 || 1 !== s) return;
                        const i = o(t.composedPath()[0]);
                        if (!i) return void t.preventDefault();
                        const n = window.getComputedStyle(i),
                            a = parseInt(n.getPropertyValue("height"), 10),
                            r = t.touches ? t.touches[0].screenY : t.screenY,
                            l = e <= r && 0 === i.scrollTop,
                            h = e >= r && i.scrollHeight - i.scrollTop === a;
                        (l || h) && t.preventDefault();
                    }
                    onWheel(t) {
                        o(t.composedPath()[0]) || t.preventDefault();
                    }
                    cleanup() {
                        this.pendingUpdate && (cancelAnimationFrame(this.pendingUpdate), (this.pendingUpdate = null));
                        const t = this.viewport;
                        t && (t.removeEventListener("resize", this.onResize), (this.viewport = null)),
                            window.removeEventListener("touchstart", this.onTouchstart, !1),
                            window.removeEventListener("touchmove", this.onTouchmove, !1),
                            window.removeEventListener("wheel", this.onWheel, { passive: !1 });
                    }
                    attach() {
                        this.fancybox.on("initLayout", this.onReady);
                    }
                    detach() {
                        this.fancybox.off("initLayout", this.onReady), this.cleanup();
                    }
                },
                Thumbs: E,
                Html: A,
                Toolbar: I,
                Image: P,
                Hash: M,
            },
            B = {
                startIndex: 0,
                preload: 1,
                infinite: !0,
                showClass: "fancybox-zoomInUp",
                hideClass: "fancybox-fadeOut",
                animated: !0,
                hideScrollbar: !0,
                parentEl: null,
                mainClass: null,
                autoFocus: !0,
                trapFocus: !0,
                placeFocusBack: !0,
                click: "close",
                closeButton: "inside",
                dragToClose: !0,
                keyboard: { Escape: "close", Delete: "close", Backspace: "close", PageUp: "next", PageDown: "prev", ArrowUp: "next", ArrowDown: "prev", ArrowRight: "next", ArrowLeft: "prev" },
                template: {
                    closeButton: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" tabindex="-1"><path d="M20 20L4 4m16 0L4 20"/></svg>',
                    spinner: '<svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="25 25 50 50" tabindex="-1"><circle cx="50" cy="50" r="20"/></svg>',
                    main: null,
                },
                l10n: {
                    CLOSE: "Close",
                    NEXT: "Next",
                    PREV: "Previous",
                    MODAL: "You can close this modal content with the ESC key",
                    ERROR: "Something Went Wrong, Please Try Again Later",
                    IMAGE_ERROR: "Image Not Found",
                    ELEMENT_NOT_FOUND: "HTML Element Not Found",
                    AJAX_NOT_FOUND: "Error Loading AJAX : Not Found",
                    AJAX_FORBIDDEN: "Error Loading AJAX : Forbidden",
                    IFRAME_ERROR: "Error Loading Page",
                    TOGGLE_ZOOM: "Toggle zoom level",
                    TOGGLE_THUMBS: "Toggle thumbnails",
                    TOGGLE_SLIDESHOW: "Toggle slideshow",
                    TOGGLE_FULLSCREEN: "Toggle full-screen mode",
                    DOWNLOAD: "Download",
                },
            },
            O = new Map();
        let z = 0;
        class V extends u {
            constructor(t, e = {}) {
                (t = t.map((t) => (t.width && (t._width = t.width), t.height && (t._height = t.height), t))),
                    super(n(!0, {}, B, e)),
                    this.bindHandlers(),
                    (this.state = "init"),
                    this.setItems(t),
                    this.attachPlugins(V.Plugins),
                    this.trigger("init"),
                    !0 === this.option("hideScrollbar") && this.hideScrollbar(),
                    this.initLayout(),
                    this.initCarousel(),
                    this.attachEvents(),
                    O.set(this.id, this),
                    this.trigger("prepare"),
                    (this.state = "ready"),
                    this.trigger("ready"),
                    this.$container.setAttribute("aria-hidden", "false"),
                    this.option("trapFocus") && this.focus();
            }
            option(t, ...e) {
                const s = this.getSlide();
                let i = s ? s[t] : void 0;
                return void 0 !== i ? ("function" == typeof i && (i = i.call(this, this, ...e)), i) : super.option(t, ...e);
            }
            bindHandlers() {
                for (const t of ["onMousedown", "onKeydown", "onClick", "onFocus", "onCreateSlide", "onSettle", "onTouchMove", "onTouchEnd", "onTransform"]) this[t] = this[t].bind(this);
            }
            attachEvents() {
                document.addEventListener("mousedown", this.onMousedown),
                    document.addEventListener("keydown", this.onKeydown, !0),
                    this.option("trapFocus") && document.addEventListener("focus", this.onFocus, !0),
                    this.$container.addEventListener("click", this.onClick);
            }
            detachEvents() {
                document.removeEventListener("mousedown", this.onMousedown),
                    document.removeEventListener("keydown", this.onKeydown, !0),
                    document.removeEventListener("focus", this.onFocus, !0),
                    this.$container.removeEventListener("click", this.onClick);
            }
            initLayout() {
                this.$root = this.option("parentEl") || document.body;
                let t = this.option("template.main");
                t && (this.$root.insertAdjacentHTML("beforeend", this.localize(t)), (this.$container = this.$root.querySelector(".fancybox__container"))),
                    this.$container || ((this.$container = document.createElement("div")), this.$root.appendChild(this.$container)),
                    (this.$container.onscroll = () => ((this.$container.scrollLeft = 0), !1)),
                    Object.entries({ class: "fancybox__container", role: "dialog", tabIndex: "-1", "aria-modal": "true", "aria-hidden": "true", "aria-label": this.localize("{{MODAL}}") }).forEach((t) => this.$container.setAttribute(...t)),
                    this.option("animated") && this.$container.classList.add("is-animated"),
                    (this.$backdrop = this.$container.querySelector(".fancybox__backdrop")),
                    this.$backdrop || ((this.$backdrop = document.createElement("div")), this.$backdrop.classList.add("fancybox__backdrop"), this.$container.appendChild(this.$backdrop)),
                    (this.$carousel = this.$container.querySelector(".fancybox__carousel")),
                    this.$carousel || ((this.$carousel = document.createElement("div")), this.$carousel.classList.add("fancybox__carousel"), this.$container.appendChild(this.$carousel)),
                    (this.$container.Fancybox = this),
                    (this.id = this.$container.getAttribute("id")),
                    this.id || ((this.id = this.options.id || ++z), this.$container.setAttribute("id", "fancybox-" + this.id));
                const e = this.option("mainClass");
                return e && this.$container.classList.add(...e.split(" ")), document.documentElement.classList.add("with-fancybox"), this.trigger("initLayout"), this;
            }
            setItems(t) {
                const e = [];
                for (const s of t) {
                    const t = s.$trigger;
                    if (t) {
                        const e = t.dataset || {};
                        (s.src = e.src || t.getAttribute("href") || s.src), (s.type = e.type || s.type), !s.src && t instanceof HTMLImageElement && (s.src = t.currentSrc || s.$trigger.src);
                    }
                    let i = s.$thumb;
                    if (!i) {
                        let t = s.$trigger && s.$trigger.origTarget;
                        t && (i = t instanceof HTMLImageElement ? t : t.querySelector("img:not([aria-hidden])")),
                            !i && s.$trigger && (i = s.$trigger instanceof HTMLImageElement ? s.$trigger : s.$trigger.querySelector("img:not([aria-hidden])"));
                    }
                    s.$thumb = i || null;
                    let n = s.thumb;
                    !n && i && ((n = i.currentSrc || i.src), !n && i.dataset && (n = i.dataset.lazySrc || i.dataset.src)), n || "image" !== s.type || (n = s.src), (s.thumb = n || null), (s.caption = s.caption || ""), e.push(s);
                }
                this.items = e;
            }
            initCarousel() {
                return (
                    (this.Carousel = new x(
                        this.$carousel,
                        n(
                            !0,
                            {},
                            {
                                prefix: "",
                                classNames: { viewport: "fancybox__viewport", track: "fancybox__track", slide: "fancybox__slide" },
                                textSelection: !0,
                                preload: this.option("preload"),
                                friction: 0.88,
                                slides: this.items,
                                initialPage: this.options.startIndex,
                                slidesPerPage: 1,
                                infiniteX: this.option("infinite"),
                                infiniteY: !0,
                                l10n: this.option("l10n"),
                                Dots: !1,
                                Navigation: { classNames: { main: "fancybox__nav", button: "carousel__button", next: "is-next", prev: "is-prev" } },
                                Panzoom: {
                                    textSelection: !0,
                                    panOnlyZoomed: () => this.Carousel && this.Carousel.pages && this.Carousel.pages.length < 2 && !this.option("dragToClose"),
                                    lockAxis: () => {
                                        if (this.Carousel) {
                                            let t = "x";
                                            return this.option("dragToClose") && (t += "y"), t;
                                        }
                                    },
                                },
                                on: { "*": (t, ...e) => this.trigger("Carousel." + t, ...e), init: (t) => (this.Carousel = t), createSlide: this.onCreateSlide, settle: this.onSettle },
                            },
                            this.option("Carousel")
                        )
                    )),
                    this.option("dragToClose") && this.Carousel.Panzoom.on({ touchMove: this.onTouchMove, afterTransform: this.onTransform, touchEnd: this.onTouchEnd }),
                    this.trigger("initCarousel"),
                    this
                );
            }
            onCreateSlide(t, e) {
                let s = e.caption || "";
                if (("function" == typeof this.options.caption && (s = this.options.caption.call(this, this, this.Carousel, e)), "string" == typeof s && s.length)) {
                    const t = document.createElement("div"),
                        i = `fancybox__caption_${this.id}_${e.index}`;
                    (t.className = "fancybox__caption"), (t.innerHTML = s), t.setAttribute("id", i), (e.$caption = e.$el.appendChild(t)), e.$el.classList.add("has-caption"), e.$el.setAttribute("aria-labelledby", i);
                }
            }
            onSettle() {
                this.option("autoFocus") && this.focus();
            }
            onFocus(t) {
                this.isTopmost() && this.focus(t);
            }
            onClick(t) {
                if (t.defaultPrevented) return;
                let e = t.composedPath()[0];
                if (e.matches("[data-fancybox-close]")) return t.preventDefault(), void V.close(!1, t);
                if (e.matches("[data-fancybox-next]")) return t.preventDefault(), void V.next();
                if (e.matches("[data-fancybox-prev]")) return t.preventDefault(), void V.prev();
                const s = document.activeElement;
                if (s) {
                    if (s.closest("[contenteditable]")) return;
                    e.matches(k) || s.blur();
                }
                if (!e.closest(".fancybox__content") && !getSelection().toString().length && !1 !== this.trigger("click", t))
                    switch (this.option("click")) {
                        case "close":
                            this.close();
                            break;
                        case "next":
                            this.next();
                    }
            }
            onTouchMove() {
                const t = this.getSlide().Panzoom;
                return !t || 1 === t.content.scale;
            }
            onTouchEnd(t) {
                const e = t.dragOffset.y;
                Math.abs(e) >= 150 || (Math.abs(e) >= 35 && t.dragOffset.time < 350)
                    ? (this.option("hideClass") && (this.getSlide().hideClass = "fancybox-throwOut" + (t.content.y < 0 ? "Up" : "Down")), this.close())
                    : "y" === t.lockAxis && t.panTo({ y: 0 });
            }
            onTransform(t) {
                if (this.$backdrop) {
                    const e = Math.abs(t.content.y),
                        s = e < 1 ? "" : Math.max(0.33, Math.min(1, 1 - (e / t.content.fitHeight) * 1.5));
                    this.$container.style.setProperty("--fancybox-ts", s ? "0s" : ""), this.$container.style.setProperty("--fancybox-opacity", s);
                }
            }
            onMousedown() {
                "ready" === this.state && document.body.classList.add("is-using-mouse");
            }
            onKeydown(t) {
                if (!this.isTopmost()) return;
                document.body.classList.remove("is-using-mouse");
                const e = t.key,
                    s = this.option("keyboard");
                if (!s || t.ctrlKey || t.altKey || t.shiftKey) return;
                const i = t.composedPath()[0],
                    n = document.activeElement && document.activeElement.classList,
                    a = n && n.contains("carousel__button");
                if ("Escape" !== e && !a && (t.target.isContentEditable || -1 !== ["BUTTON", "TEXTAREA", "OPTION", "INPUT", "SELECT", "VIDEO"].indexOf(i.nodeName))) return;
                if (!1 === this.trigger("keydown", e, t)) return;
                const o = s[e];
                "function" == typeof this[o] && this[o]();
            }
            getSlide() {
                const t = this.Carousel;
                if (!t) return null;
                const e = null === t.page ? t.option("initialPage") : t.page,
                    s = t.pages || [];
                return s.length && s[e] ? s[e].slides[0] : null;
            }
            focus(t) {
                if (V.ignoreFocusChange) return;
                if (["init", "closing", "customClosing", "destroy"].indexOf(this.state) > -1) return;
                const e = this.$container,
                    s = this.getSlide(),
                    i = "done" === s.state ? s.$el : null;
                if (i && i.contains(document.activeElement)) return;
                t && t.preventDefault(), (V.ignoreFocusChange = !0);
                const n = Array.from(e.querySelectorAll(k));
                let a,
                    o = [];
                for (let t of n) {
                    const e = t.offsetParent,
                        s = i && i.contains(t),
                        n = !this.Carousel.$viewport.contains(t);
                    e && (s || n)
                        ? (o.push(t),
                          void 0 !== t.dataset.origTabindex && ((t.tabIndex = t.dataset.origTabindex), t.removeAttribute("data-orig-tabindex")),
                          (t.hasAttribute("autoFocus") || (!a && s && !t.classList.contains("carousel__button"))) && (a = t))
                        : ((t.dataset.origTabindex = void 0 === t.dataset.origTabindex ? t.getAttribute("tabindex") : t.dataset.origTabindex), (t.tabIndex = -1));
                }
                t ? (o.indexOf(t.target) > -1 ? (this.lastFocus = t.target) : this.lastFocus === e ? S(o[o.length - 1]) : S(e)) : this.option("autoFocus") && a ? S(a) : o.indexOf(document.activeElement) < 0 && S(e),
                    (this.lastFocus = document.activeElement),
                    (V.ignoreFocusChange = !1);
            }
            hideScrollbar() {
                if (!w) return;
                const t = window.innerWidth - document.documentElement.getBoundingClientRect().width,
                    e = "fancybox-style-noscroll";
                let s = document.getElementById(e);
                s ||
                    (t > 0 &&
                        ((s = document.createElement("style")),
                        (s.id = e),
                        (s.type = "text/css"),
                        (s.innerHTML = `.compensate-for-scrollbar {padding-right: ${t}px;}`),
                        document.getElementsByTagName("head")[0].appendChild(s),
                        document.body.classList.add("compensate-for-scrollbar")));
            }
            revealScrollbar() {
                document.body.classList.remove("compensate-for-scrollbar");
                const t = document.getElementById("fancybox-style-noscroll");
                t && t.remove();
            }
            clearContent(t) {
                this.Carousel.trigger("removeSlide", t), t.$content && (t.$content.remove(), (t.$content = null)), t.$closeButton && (t.$closeButton.remove(), (t.$closeButton = null)), t._className && t.$el.classList.remove(t._className);
            }
            setContent(t, e, s = {}) {
                let i;
                const n = t.$el;
                if (e instanceof HTMLElement) ["img", "iframe", "video", "audio"].indexOf(e.nodeName.toLowerCase()) > -1 ? ((i = document.createElement("div")), i.appendChild(e)) : (i = e);
                else {
                    const t = document.createRange().createContextualFragment(e);
                    (i = document.createElement("div")), i.appendChild(t);
                }
                if ((t.filter && !t.error && (i = i.querySelector(t.filter)), i instanceof Element))
                    return (
                        (t._className = "has-" + (s.suffix || t.type || "unknown")),
                        n.classList.add(t._className),
                        i.classList.add("fancybox__content"),
                        ("none" !== i.style.display && "none" !== getComputedStyle(i).getPropertyValue("display")) || (i.style.display = t.display || this.option("defaultDisplay") || "flex"),
                        t.id && i.setAttribute("id", t.id),
                        (t.$content = i),
                        n.prepend(i),
                        this.manageCloseButton(t),
                        "loading" !== t.state && this.revealContent(t),
                        i
                    );
                this.setError(t, "{{ELEMENT_NOT_FOUND}}");
            }
            manageCloseButton(t) {
                const e = void 0 === t.closeButton ? this.option("closeButton") : t.closeButton;
                if (!e || ("top" === e && this.$closeButton)) return;
                const s = document.createElement("button");
                s.classList.add("carousel__button", "is-close"),
                    s.setAttribute("title", this.options.l10n.CLOSE),
                    (s.innerHTML = this.option("template.closeButton")),
                    s.addEventListener("click", (t) => this.close(t)),
                    "inside" === e ? (t.$closeButton && t.$closeButton.remove(), (t.$closeButton = t.$content.appendChild(s))) : (this.$closeButton = this.$container.insertBefore(s, this.$container.firstChild));
            }
            revealContent(t) {
                this.trigger("reveal", t), (t.$content.style.visibility = "");
                let e = !1;
                t.error || "loading" === t.state || null !== this.Carousel.prevPage || t.index !== this.options.startIndex || (e = void 0 === t.showClass ? this.option("showClass") : t.showClass),
                    e
                        ? ((t.state = "animating"),
                          this.animateCSS(t.$content, e, () => {
                              this.done(t);
                          }))
                        : this.done(t);
            }
            animateCSS(t, e, s) {
                if ((t && t.dispatchEvent(new CustomEvent("animationend", { bubbles: !0, cancelable: !0 })), !t || !e)) return void ("function" == typeof s && s());
                const i = function (n) {
                    n.currentTarget === this && (t.removeEventListener("animationend", i), s && s(), t.classList.remove(e));
                };
                t.addEventListener("animationend", i), t.classList.add(e);
            }
            done(t) {
                (t.state = "done"), this.trigger("done", t);
                const e = this.getSlide();
                e && t.index === e.index && this.option("autoFocus") && this.focus();
            }
            setError(t, e) {
                (t.error = e), this.hideLoading(t), this.clearContent(t);
                const s = document.createElement("div");
                s.classList.add("fancybox-error"), (s.innerHTML = this.localize(e || "<p>{{ERROR}}</p>")), this.setContent(t, s, { suffix: "error" });
            }
            showLoading(t) {
                (t.state = "loading"), t.$el.classList.add("is-loading");
                let e = t.$el.querySelector(".fancybox__spinner");
                e ||
                    ((e = document.createElement("div")),
                    e.classList.add("fancybox__spinner"),
                    (e.innerHTML = this.option("template.spinner")),
                    e.addEventListener("click", () => {
                        this.Carousel.Panzoom.velocity || this.close();
                    }),
                    t.$el.prepend(e));
            }
            hideLoading(t) {
                const e = t.$el && t.$el.querySelector(".fancybox__spinner");
                e && (e.remove(), t.$el.classList.remove("is-loading")), "loading" === t.state && (this.trigger("load", t), (t.state = "ready"));
            }
            next() {
                const t = this.Carousel;
                t && t.pages.length > 1 && t.slideNext();
            }
            prev() {
                const t = this.Carousel;
                t && t.pages.length > 1 && t.slidePrev();
            }
            jumpTo(...t) {
                this.Carousel && this.Carousel.slideTo(...t);
            }
            isClosing() {
                return ["closing", "customClosing", "destroy"].includes(this.state);
            }
            isTopmost() {
                return V.getInstance().id == this.id;
            }
            close(t) {
                if ((t && t.preventDefault(), this.isClosing())) return;
                if (!1 === this.trigger("shouldClose", t)) return;
                if (((this.state = "closing"), this.Carousel.Panzoom.destroy(), this.detachEvents(), this.trigger("closing", t), "destroy" === this.state)) return;
                this.$container.setAttribute("aria-hidden", "true"), this.$container.classList.add("is-closing");
                const e = this.getSlide();
                if (
                    (this.Carousel.slides.forEach((t) => {
                        t.$content && t.index !== e.index && this.Carousel.trigger("removeSlide", t);
                    }),
                    "closing" === this.state)
                ) {
                    const t = void 0 === e.hideClass ? this.option("hideClass") : e.hideClass;
                    this.animateCSS(
                        e.$content,
                        t,
                        () => {
                            this.destroy();
                        },
                        !0
                    );
                }
            }
            destroy() {
                if ("destroy" === this.state) return;
                (this.state = "destroy"), this.trigger("destroy");
                const t = this.option("placeFocusBack") ? this.option("triggerTarget", this.getSlide().$trigger) : null;
                this.Carousel.destroy(),
                    this.detachPlugins(),
                    (this.Carousel = null),
                    (this.options = {}),
                    (this.events = {}),
                    this.$container.remove(),
                    (this.$container = this.$backdrop = this.$carousel = null),
                    t && S(t),
                    O.delete(this.id);
                const e = V.getInstance();
                e ? e.focus() : (document.documentElement.classList.remove("with-fancybox"), document.body.classList.remove("is-using-mouse"), this.revealScrollbar());
            }
            static show(t, e = {}) {
                return new V(t, e);
            }
            static fromEvent(t, e = {}) {
                if (t.defaultPrevented) return;
                if (t.button && 0 !== t.button) return;
                if (t.ctrlKey || t.metaKey || t.shiftKey) return;
                const s = t.composedPath()[0];
                let i,
                    n,
                    a,
                    o = s;
                if (((o.matches("[data-fancybox-trigger]") || (o = o.closest("[data-fancybox-trigger]"))) && ((e.triggerTarget = o), (i = o && o.dataset && o.dataset.fancyboxTrigger)), i)) {
                    const t = document.querySelectorAll(`[data-fancybox="${i}"]`),
                        e = parseInt(o.dataset.fancyboxIndex, 10) || 0;
                    o = t.length ? t[e] : o;
                }
                Array.from(V.openers.keys())
                    .reverse()
                    .some((e) => {
                        a = o || s;
                        let i = !1;
                        try {
                            a instanceof Element && ("string" == typeof e || e instanceof String) && (i = a.matches(e) || (a = a.closest(e)));
                        } catch (t) {}
                        return !!i && (t.preventDefault(), (n = e), !0);
                    });
                let r = !1;
                if (n) {
                    (e.event = t), (e.target = a), (a.origTarget = s), (r = V.fromOpener(n, e));
                    const i = V.getInstance();
                    i && "ready" === i.state && t.detail && document.body.classList.add("is-using-mouse");
                }
                return r;
            }
            static fromOpener(t, e = {}) {
                let s = [],
                    i = e.startIndex || 0,
                    a = e.target || null;
                const o = void 0 !== (e = n({}, e, V.openers.get(t))).groupAll && e.groupAll,
                    r = void 0 === e.groupAttr ? "data-fancybox" : e.groupAttr,
                    l = r && a ? a.getAttribute("" + r) : "";
                if (!a || l || o) {
                    const i = e.root || (a ? a.getRootNode() : document.body);
                    s = [].slice.call(i.querySelectorAll(t));
                }
                if ((a && !o && (s = l ? s.filter((t) => t.getAttribute("" + r) === l) : [a]), !s.length)) return !1;
                const h = V.getInstance();
                return (
                    !(h && s.indexOf(h.options.$trigger) > -1) &&
                    ((i = a ? s.indexOf(a) : i),
                    (s = s.map(function (t) {
                        const e = ["false", "0", "no", "null", "undefined"],
                            s = ["true", "1", "yes"],
                            i = Object.assign({}, t.dataset),
                            n = {};
                        for (let [t, a] of Object.entries(i))
                            if ("fancybox" !== t)
                                if ("width" === t || "height" === t) n["_" + t] = a;
                                else if ("string" == typeof a || a instanceof String)
                                    if (e.indexOf(a) > -1) n[t] = !1;
                                    else if (s.indexOf(n[t]) > -1) n[t] = !0;
                                    else
                                        try {
                                            n[t] = JSON.parse(a);
                                        } catch (e) {
                                            n[t] = a;
                                        }
                                else n[t] = a;
                        return t instanceof Element && (n.$trigger = t), n;
                    })),
                    new V(s, n({}, e, { startIndex: i, $trigger: a })))
                );
            }
            static bind(t, e = {}) {
                function s() {
                    document.body.addEventListener("click", V.fromEvent, !1);
                }
                w && (V.openers.size || (/complete|interactive|loaded/.test(document.readyState) ? s() : document.addEventListener("DOMContentLoaded", s)), V.openers.set(t, e));
            }
            static unbind(t) {
                V.openers.delete(t), V.openers.size || V.destroy();
            }
            static destroy() {
                let t;
                for (; (t = V.getInstance()); ) t.destroy();
                (V.openers = new Map()), document.body.removeEventListener("click", V.fromEvent, !1);
            }
            static getInstance(t) {
                return t
                    ? O.get(t)
                    : Array.from(O.values())
                          .reverse()
                          .find((t) => !t.isClosing() && t) || null;
            }
            static close(t = !0, e) {
                if (t) for (const t of O.values()) t.close(e);
                else {
                    const t = V.getInstance();
                    t && t.close(e);
                }
            }
            static next() {
                const t = V.getInstance();
                t && t.next();
            }
            static prev() {
                const t = V.getInstance();
                t && t.prev();
            }
        }
        (V.version = "4.0.31"), (V.defaults = B), (V.openers = new Map()), (V.Plugins = D), V.bind("[data-fancybox]");
        for (const [t, e] of Object.entries(V.Plugins || {})) "function" == typeof e.create && e.create(V);
        function R(t) {
            return null !== t && "object" == typeof t && "constructor" in t && t.constructor === Object;
        }
        function N(t = {}, e = {}) {
            Object.keys(e).forEach((s) => {
                void 0 === t[s] ? (t[s] = e[s]) : R(e[s]) && R(t[s]) && Object.keys(e[s]).length > 0 && N(t[s], e[s]);
            });
        }
        const H = {
            body: {},
            addEventListener() {},
            removeEventListener() {},
            activeElement: { blur() {}, nodeName: "" },
            querySelector: () => null,
            querySelectorAll: () => [],
            getElementById: () => null,
            createEvent: () => ({ initEvent() {} }),
            createElement: () => ({ children: [], childNodes: [], style: {}, setAttribute() {}, getElementsByTagName: () => [] }),
            createElementNS: () => ({}),
            importNode: () => null,
            location: { hash: "", host: "", hostname: "", href: "", origin: "", pathname: "", protocol: "", search: "" },
        };
        function j() {
            const t = "undefined" != typeof document ? document : {};
            return N(t, H), t;
        }
        const W = {
            document: H,
            navigator: { userAgent: "" },
            location: { hash: "", host: "", hostname: "", href: "", origin: "", pathname: "", protocol: "", search: "" },
            history: { replaceState() {}, pushState() {}, go() {}, back() {} },
            CustomEvent: function () {
                return this;
            },
            addEventListener() {},
            removeEventListener() {},
            getComputedStyle: () => ({ getPropertyValue: () => "" }),
            Image() {},
            Date() {},
            screen: {},
            setTimeout() {},
            clearTimeout() {},
            matchMedia: () => ({}),
            requestAnimationFrame: (t) => ("undefined" == typeof setTimeout ? (t(), null) : setTimeout(t, 0)),
            cancelAnimationFrame(t) {
                "undefined" != typeof setTimeout && clearTimeout(t);
            },
        };
        function G() {
            const t = "undefined" != typeof window ? window : {};
            return N(t, W), t;
        }
        class q extends Array {
            constructor(t) {
                "number" == typeof t
                    ? super(t)
                    : (super(...(t || [])),
                      (function (t) {
                          const e = t.__proto__;
                          Object.defineProperty(t, "__proto__", {
                              get: () => e,
                              set(t) {
                                  e.__proto__ = t;
                              },
                          });
                      })(this));
            }
        }
        function U(t = []) {
            const e = [];
            return (
                t.forEach((t) => {
                    Array.isArray(t) ? e.push(...U(t)) : e.push(t);
                }),
                e
            );
        }
        function X(t, e) {
            return Array.prototype.filter.call(t, e);
        }
        function Y(t, e) {
            const s = G(),
                i = j();
            let n = [];
            if (!e && t instanceof q) return t;
            if (!t) return new q(n);
            if ("string" == typeof t) {
                const s = t.trim();
                if (s.indexOf("<") >= 0 && s.indexOf(">") >= 0) {
                    let t = "div";
                    0 === s.indexOf("<li") && (t = "ul"),
                        0 === s.indexOf("<tr") && (t = "tbody"),
                        (0 !== s.indexOf("<td") && 0 !== s.indexOf("<th")) || (t = "tr"),
                        0 === s.indexOf("<tbody") && (t = "table"),
                        0 === s.indexOf("<option") && (t = "select");
                    const e = i.createElement(t);
                    e.innerHTML = s;
                    for (let t = 0; t < e.childNodes.length; t += 1) n.push(e.childNodes[t]);
                } else
                    n = (function (t, e) {
                        if ("string" != typeof t) return [t];
                        const s = [],
                            i = e.querySelectorAll(t);
                        for (let t = 0; t < i.length; t += 1) s.push(i[t]);
                        return s;
                    })(t.trim(), e || i);
            } else if (t.nodeType || t === s || t === i) n.push(t);
            else if (Array.isArray(t)) {
                if (t instanceof q) return t;
                n = t;
            }
            return new q(
                (function (t) {
                    const e = [];
                    for (let s = 0; s < t.length; s += 1) -1 === e.indexOf(t[s]) && e.push(t[s]);
                    return e;
                })(n)
            );
        }
        Y.fn = q.prototype;
        const K = "resize scroll".split(" ");
        function Z(t) {
            return function (...e) {
                if (void 0 === e[0]) {
                    for (let e = 0; e < this.length; e += 1) K.indexOf(t) < 0 && (t in this[e] ? this[e][t]() : Y(this[e]).trigger(t));
                    return this;
                }
                return this.on(t, ...e);
            };
        }
        Z("click"),
            Z("blur"),
            Z("focus"),
            Z("focusin"),
            Z("focusout"),
            Z("keyup"),
            Z("keydown"),
            Z("keypress"),
            Z("submit"),
            Z("change"),
            Z("mousedown"),
            Z("mousemove"),
            Z("mouseup"),
            Z("mouseenter"),
            Z("mouseleave"),
            Z("mouseout"),
            Z("mouseover"),
            Z("touchstart"),
            Z("touchend"),
            Z("touchmove"),
            Z("resize"),
            Z("scroll");
        const J = {
            addClass: function (...t) {
                const e = U(t.map((t) => t.split(" ")));
                return (
                    this.forEach((t) => {
                        t.classList.add(...e);
                    }),
                    this
                );
            },
            removeClass: function (...t) {
                const e = U(t.map((t) => t.split(" ")));
                return (
                    this.forEach((t) => {
                        t.classList.remove(...e);
                    }),
                    this
                );
            },
            hasClass: function (...t) {
                const e = U(t.map((t) => t.split(" ")));
                return X(this, (t) => e.filter((e) => t.classList.contains(e)).length > 0).length > 0;
            },
            toggleClass: function (...t) {
                const e = U(t.map((t) => t.split(" ")));
                this.forEach((t) => {
                    e.forEach((e) => {
                        t.classList.toggle(e);
                    });
                });
            },
            attr: function (t, e) {
                if (1 === arguments.length && "string" == typeof t) return this[0] ? this[0].getAttribute(t) : void 0;
                for (let s = 0; s < this.length; s += 1)
                    if (2 === arguments.length) this[s].setAttribute(t, e);
                    else for (const e in t) (this[s][e] = t[e]), this[s].setAttribute(e, t[e]);
                return this;
            },
            removeAttr: function (t) {
                for (let e = 0; e < this.length; e += 1) this[e].removeAttribute(t);
                return this;
            },
            transform: function (t) {
                for (let e = 0; e < this.length; e += 1) this[e].style.transform = t;
                return this;
            },
            transition: function (t) {
                for (let e = 0; e < this.length; e += 1) this[e].style.transitionDuration = "string" != typeof t ? t + "ms" : t;
                return this;
            },
            on: function (...t) {
                let [e, s, i, n] = t;
                function a(t) {
                    const e = t.target;
                    if (!e) return;
                    const n = t.target.dom7EventData || [];
                    if ((n.indexOf(t) < 0 && n.unshift(t), Y(e).is(s))) i.apply(e, n);
                    else {
                        const t = Y(e).parents();
                        for (let e = 0; e < t.length; e += 1) Y(t[e]).is(s) && i.apply(t[e], n);
                    }
                }
                function o(t) {
                    const e = (t && t.target && t.target.dom7EventData) || [];
                    e.indexOf(t) < 0 && e.unshift(t), i.apply(this, e);
                }
                "function" == typeof t[1] && (([e, i, n] = t), (s = void 0)), n || (n = !1);
                const r = e.split(" ");
                let l;
                for (let t = 0; t < this.length; t += 1) {
                    const e = this[t];
                    if (s)
                        for (l = 0; l < r.length; l += 1) {
                            const t = r[l];
                            e.dom7LiveListeners || (e.dom7LiveListeners = {}), e.dom7LiveListeners[t] || (e.dom7LiveListeners[t] = []), e.dom7LiveListeners[t].push({ listener: i, proxyListener: a }), e.addEventListener(t, a, n);
                        }
                    else
                        for (l = 0; l < r.length; l += 1) {
                            const t = r[l];
                            e.dom7Listeners || (e.dom7Listeners = {}), e.dom7Listeners[t] || (e.dom7Listeners[t] = []), e.dom7Listeners[t].push({ listener: i, proxyListener: o }), e.addEventListener(t, o, n);
                        }
                }
                return this;
            },
            off: function (...t) {
                let [e, s, i, n] = t;
                "function" == typeof t[1] && (([e, i, n] = t), (s = void 0)), n || (n = !1);
                const a = e.split(" ");
                for (let t = 0; t < a.length; t += 1) {
                    const e = a[t];
                    for (let t = 0; t < this.length; t += 1) {
                        const a = this[t];
                        let o;
                        if ((!s && a.dom7Listeners ? (o = a.dom7Listeners[e]) : s && a.dom7LiveListeners && (o = a.dom7LiveListeners[e]), o && o.length))
                            for (let t = o.length - 1; t >= 0; t -= 1) {
                                const s = o[t];
                                (i && s.listener === i) || (i && s.listener && s.listener.dom7proxy && s.listener.dom7proxy === i)
                                    ? (a.removeEventListener(e, s.proxyListener, n), o.splice(t, 1))
                                    : i || (a.removeEventListener(e, s.proxyListener, n), o.splice(t, 1));
                            }
                    }
                }
                return this;
            },
            trigger: function (...t) {
                const e = G(),
                    s = t[0].split(" "),
                    i = t[1];
                for (let n = 0; n < s.length; n += 1) {
                    const a = s[n];
                    for (let s = 0; s < this.length; s += 1) {
                        const n = this[s];
                        if (e.CustomEvent) {
                            const s = new e.CustomEvent(a, { detail: i, bubbles: !0, cancelable: !0 });
                            (n.dom7EventData = t.filter((t, e) => e > 0)), n.dispatchEvent(s), (n.dom7EventData = []), delete n.dom7EventData;
                        }
                    }
                }
                return this;
            },
            transitionEnd: function (t) {
                const e = this;
                return (
                    t &&
                        e.on("transitionend", function s(i) {
                            i.target === this && (t.call(this, i), e.off("transitionend", s));
                        }),
                    this
                );
            },
            outerWidth: function (t) {
                if (this.length > 0) {
                    if (t) {
                        const t = this.styles();
                        return this[0].offsetWidth + parseFloat(t.getPropertyValue("margin-right")) + parseFloat(t.getPropertyValue("margin-left"));
                    }
                    return this[0].offsetWidth;
                }
                return null;
            },
            outerHeight: function (t) {
                if (this.length > 0) {
                    if (t) {
                        const t = this.styles();
                        return this[0].offsetHeight + parseFloat(t.getPropertyValue("margin-top")) + parseFloat(t.getPropertyValue("margin-bottom"));
                    }
                    return this[0].offsetHeight;
                }
                return null;
            },
            styles: function () {
                const t = G();
                return this[0] ? t.getComputedStyle(this[0], null) : {};
            },
            offset: function () {
                if (this.length > 0) {
                    const t = G(),
                        e = j(),
                        s = this[0],
                        i = s.getBoundingClientRect(),
                        n = e.body,
                        a = s.clientTop || n.clientTop || 0,
                        o = s.clientLeft || n.clientLeft || 0,
                        r = s === t ? t.scrollY : s.scrollTop,
                        l = s === t ? t.scrollX : s.scrollLeft;
                    return { top: i.top + r - a, left: i.left + l - o };
                }
                return null;
            },
            css: function (t, e) {
                const s = G();
                let i;
                if (1 === arguments.length) {
                    if ("string" != typeof t) {
                        for (i = 0; i < this.length; i += 1) for (const e in t) this[i].style[e] = t[e];
                        return this;
                    }
                    if (this[0]) return s.getComputedStyle(this[0], null).getPropertyValue(t);
                }
                if (2 === arguments.length && "string" == typeof t) {
                    for (i = 0; i < this.length; i += 1) this[i].style[t] = e;
                    return this;
                }
                return this;
            },
            each: function (t) {
                return t
                    ? (this.forEach((e, s) => {
                          t.apply(e, [e, s]);
                      }),
                      this)
                    : this;
            },
            html: function (t) {
                if (void 0 === t) return this[0] ? this[0].innerHTML : null;
                for (let e = 0; e < this.length; e += 1) this[e].innerHTML = t;
                return this;
            },
            text: function (t) {
                if (void 0 === t) return this[0] ? this[0].textContent.trim() : null;
                for (let e = 0; e < this.length; e += 1) this[e].textContent = t;
                return this;
            },
            is: function (t) {
                const e = G(),
                    s = j(),
                    i = this[0];
                let n, a;
                if (!i || void 0 === t) return !1;
                if ("string" == typeof t) {
                    if (i.matches) return i.matches(t);
                    if (i.webkitMatchesSelector) return i.webkitMatchesSelector(t);
                    if (i.msMatchesSelector) return i.msMatchesSelector(t);
                    for (n = Y(t), a = 0; a < n.length; a += 1) if (n[a] === i) return !0;
                    return !1;
                }
                if (t === s) return i === s;
                if (t === e) return i === e;
                if (t.nodeType || t instanceof q) {
                    for (n = t.nodeType ? [t] : t, a = 0; a < n.length; a += 1) if (n[a] === i) return !0;
                    return !1;
                }
                return !1;
            },
            index: function () {
                let t,
                    e = this[0];
                if (e) {
                    for (t = 0; null !== (e = e.previousSibling); ) 1 === e.nodeType && (t += 1);
                    return t;
                }
            },
            eq: function (t) {
                if (void 0 === t) return this;
                const e = this.length;
                if (t > e - 1) return Y([]);
                if (t < 0) {
                    const s = e + t;
                    return Y(s < 0 ? [] : [this[s]]);
                }
                return Y([this[t]]);
            },
            append: function (...t) {
                let e;
                const s = j();
                for (let i = 0; i < t.length; i += 1) {
                    e = t[i];
                    for (let t = 0; t < this.length; t += 1)
                        if ("string" == typeof e) {
                            const i = s.createElement("div");
                            for (i.innerHTML = e; i.firstChild; ) this[t].appendChild(i.firstChild);
                        } else if (e instanceof q) for (let s = 0; s < e.length; s += 1) this[t].appendChild(e[s]);
                        else this[t].appendChild(e);
                }
                return this;
            },
            prepend: function (t) {
                const e = j();
                let s, i;
                for (s = 0; s < this.length; s += 1)
                    if ("string" == typeof t) {
                        const n = e.createElement("div");
                        for (n.innerHTML = t, i = n.childNodes.length - 1; i >= 0; i -= 1) this[s].insertBefore(n.childNodes[i], this[s].childNodes[0]);
                    } else if (t instanceof q) for (i = 0; i < t.length; i += 1) this[s].insertBefore(t[i], this[s].childNodes[0]);
                    else this[s].insertBefore(t, this[s].childNodes[0]);
                return this;
            },
            next: function (t) {
                return this.length > 0 ? (t ? (this[0].nextElementSibling && Y(this[0].nextElementSibling).is(t) ? Y([this[0].nextElementSibling]) : Y([])) : this[0].nextElementSibling ? Y([this[0].nextElementSibling]) : Y([])) : Y([]);
            },
            nextAll: function (t) {
                const e = [];
                let s = this[0];
                if (!s) return Y([]);
                for (; s.nextElementSibling; ) {
                    const i = s.nextElementSibling;
                    t ? Y(i).is(t) && e.push(i) : e.push(i), (s = i);
                }
                return Y(e);
            },
            prev: function (t) {
                if (this.length > 0) {
                    const e = this[0];
                    return t ? (e.previousElementSibling && Y(e.previousElementSibling).is(t) ? Y([e.previousElementSibling]) : Y([])) : e.previousElementSibling ? Y([e.previousElementSibling]) : Y([]);
                }
                return Y([]);
            },
            prevAll: function (t) {
                const e = [];
                let s = this[0];
                if (!s) return Y([]);
                for (; s.previousElementSibling; ) {
                    const i = s.previousElementSibling;
                    t ? Y(i).is(t) && e.push(i) : e.push(i), (s = i);
                }
                return Y(e);
            },
            parent: function (t) {
                const e = [];
                for (let s = 0; s < this.length; s += 1) null !== this[s].parentNode && (t ? Y(this[s].parentNode).is(t) && e.push(this[s].parentNode) : e.push(this[s].parentNode));
                return Y(e);
            },
            parents: function (t) {
                const e = [];
                for (let s = 0; s < this.length; s += 1) {
                    let i = this[s].parentNode;
                    for (; i; ) t ? Y(i).is(t) && e.push(i) : e.push(i), (i = i.parentNode);
                }
                return Y(e);
            },
            closest: function (t) {
                let e = this;
                return void 0 === t ? Y([]) : (e.is(t) || (e = e.parents(t).eq(0)), e);
            },
            find: function (t) {
                const e = [];
                for (let s = 0; s < this.length; s += 1) {
                    const i = this[s].querySelectorAll(t);
                    for (let t = 0; t < i.length; t += 1) e.push(i[t]);
                }
                return Y(e);
            },
            children: function (t) {
                const e = [];
                for (let s = 0; s < this.length; s += 1) {
                    const i = this[s].children;
                    for (let s = 0; s < i.length; s += 1) (t && !Y(i[s]).is(t)) || e.push(i[s]);
                }
                return Y(e);
            },
            filter: function (t) {
                return Y(X(this, t));
            },
            remove: function () {
                for (let t = 0; t < this.length; t += 1) this[t].parentNode && this[t].parentNode.removeChild(this[t]);
                return this;
            },
        };
        Object.keys(J).forEach((t) => {
            Object.defineProperty(Y.fn, t, { value: J[t], writable: !0 });
        });
        var Q = Y;
        function tt(t, e = 0) {
            return setTimeout(t, e);
        }
        function et() {
            return Date.now();
        }
        function st(t, e = "x") {
            const s = G();
            let i, n, a;
            const o = (function (t) {
                const e = G();
                let s;
                return e.getComputedStyle && (s = e.getComputedStyle(t, null)), !s && t.currentStyle && (s = t.currentStyle), s || (s = t.style), s;
            })(t);
            return (
                s.WebKitCSSMatrix
                    ? ((n = o.transform || o.webkitTransform),
                      n.split(",").length > 6 &&
                          (n = n
                              .split(", ")
                              .map((t) => t.replace(",", "."))
                              .join(", ")),
                      (a = new s.WebKitCSSMatrix("none" === n ? "" : n)))
                    : ((a = o.MozTransform || o.OTransform || o.MsTransform || o.msTransform || o.transform || o.getPropertyValue("transform").replace("translate(", "matrix(1, 0, 0, 1,")), (i = a.toString().split(","))),
                "x" === e && (n = s.WebKitCSSMatrix ? a.m41 : 16 === i.length ? parseFloat(i[12]) : parseFloat(i[4])),
                "y" === e && (n = s.WebKitCSSMatrix ? a.m42 : 16 === i.length ? parseFloat(i[13]) : parseFloat(i[5])),
                n || 0
            );
        }
        function it(t) {
            return "object" == typeof t && null !== t && t.constructor && "Object" === Object.prototype.toString.call(t).slice(8, -1);
        }
        function nt(...t) {
            const e = Object(t[0]),
                s = ["__proto__", "constructor", "prototype"];
            for (let n = 1; n < t.length; n += 1) {
                const a = t[n];
                if (null != a && ((i = a), !("undefined" != typeof window && void 0 !== window.HTMLElement ? i instanceof HTMLElement : i && (1 === i.nodeType || 11 === i.nodeType)))) {
                    const t = Object.keys(Object(a)).filter((t) => s.indexOf(t) < 0);
                    for (let s = 0, i = t.length; s < i; s += 1) {
                        const i = t[s],
                            n = Object.getOwnPropertyDescriptor(a, i);
                        void 0 !== n && n.enumerable && (it(e[i]) && it(a[i]) ? (a[i].__swiper__ ? (e[i] = a[i]) : nt(e[i], a[i])) : !it(e[i]) && it(a[i]) ? ((e[i] = {}), a[i].__swiper__ ? (e[i] = a[i]) : nt(e[i], a[i])) : (e[i] = a[i]));
                    }
                }
            }
            var i;
            return e;
        }
        function at(t, e, s) {
            t.style.setProperty(e, s);
        }
        function ot({ swiper: t, targetPosition: e, side: s }) {
            const i = G(),
                n = -t.translate;
            let a,
                o = null;
            const r = t.params.speed;
            (t.wrapperEl.style.scrollSnapType = "none"), i.cancelAnimationFrame(t.cssModeFrameID);
            const l = e > n ? "next" : "prev",
                h = (t, e) => ("next" === l && t >= e) || ("prev" === l && t <= e),
                d = () => {
                    (a = new Date().getTime()), null === o && (o = a);
                    const l = Math.max(Math.min((a - o) / r, 1), 0),
                        c = 0.5 - Math.cos(l * Math.PI) / 2;
                    let u = n + c * (e - n);
                    if ((h(u, e) && (u = e), t.wrapperEl.scrollTo({ [s]: u }), h(u, e)))
                        return (
                            (t.wrapperEl.style.overflow = "hidden"),
                            (t.wrapperEl.style.scrollSnapType = ""),
                            setTimeout(() => {
                                (t.wrapperEl.style.overflow = ""), t.wrapperEl.scrollTo({ [s]: u });
                            }),
                            void i.cancelAnimationFrame(t.cssModeFrameID)
                        );
                    t.cssModeFrameID = i.requestAnimationFrame(d);
                };
            d();
        }
        let rt, lt, ht;
        function dt() {
            return (
                rt ||
                    (rt = (function () {
                        const t = G(),
                            e = j();
                        return {
                            smoothScroll: e.documentElement && "scrollBehavior" in e.documentElement.style,
                            touch: !!("ontouchstart" in t || (t.DocumentTouch && e instanceof t.DocumentTouch)),
                            passiveListener: (function () {
                                let e = !1;
                                try {
                                    const s = Object.defineProperty({}, "passive", {
                                        get() {
                                            e = !0;
                                        },
                                    });
                                    t.addEventListener("testPassiveListener", null, s);
                                } catch (t) {}
                                return e;
                            })(),
                            gestures: "ongesturestart" in t,
                        };
                    })()),
                rt
            );
        }
        function ct(t = {}) {
            return (
                lt ||
                    (lt = (function ({ userAgent: t } = {}) {
                        const e = dt(),
                            s = G(),
                            i = s.navigator.platform,
                            n = t || s.navigator.userAgent,
                            a = { ios: !1, android: !1 },
                            o = s.screen.width,
                            r = s.screen.height,
                            l = n.match(/(Android);?[\s\/]+([\d.]+)?/);
                        let h = n.match(/(iPad).*OS\s([\d_]+)/);
                        const d = n.match(/(iPod)(.*OS\s([\d_]+))?/),
                            c = !h && n.match(/(iPhone\sOS|iOS)\s([\d_]+)/),
                            u = "Win32" === i;
                        let p = "MacIntel" === i;
                        return (
                            !h &&
                                p &&
                                e.touch &&
                                ["1024x1366", "1366x1024", "834x1194", "1194x834", "834x1112", "1112x834", "768x1024", "1024x768", "820x1180", "1180x820", "810x1080", "1080x810"].indexOf(`${o}x${r}`) >= 0 &&
                                ((h = n.match(/(Version)\/([\d.]+)/)), h || (h = [0, 1, "13_0_0"]), (p = !1)),
                            l && !u && ((a.os = "android"), (a.android = !0)),
                            (h || c || d) && ((a.os = "ios"), (a.ios = !0)),
                            a
                        );
                    })(t)),
                lt
            );
        }
        function ut() {
            return (
                ht ||
                    (ht = (function () {
                        const t = G();
                        return {
                            isSafari: (function () {
                                const e = t.navigator.userAgent.toLowerCase();
                                return e.indexOf("safari") >= 0 && e.indexOf("chrome") < 0 && e.indexOf("android") < 0;
                            })(),
                            isWebView: /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(t.navigator.userAgent),
                        };
                    })()),
                ht
            );
        }
        function pt({ swiper: t, runCallbacks: e, direction: s, step: i }) {
            const { activeIndex: n, previousIndex: a } = t;
            let o = s;
            if ((o || (o = n > a ? "next" : n < a ? "prev" : "reset"), t.emit("transition" + i), e && n !== a)) {
                if ("reset" === o) return void t.emit("slideResetTransition" + i);
                t.emit("slideChangeTransition" + i), "next" === o ? t.emit("slideNextTransition" + i) : t.emit("slidePrevTransition" + i);
            }
        }
        function ft(t) {
            const e = this,
                s = j(),
                i = G(),
                n = e.touchEventsData,
                { params: a, touches: o, enabled: r } = e;
            if (!r) return;
            if (e.animating && a.preventInteractionOnTransition) return;
            !e.animating && a.cssMode && a.loop && e.loopFix();
            let l = t;
            l.originalEvent && (l = l.originalEvent);
            let h = Q(l.target);
            if ("wrapper" === a.touchEventsTarget && !h.closest(e.wrapperEl).length) return;
            if (((n.isTouchEvent = "touchstart" === l.type), !n.isTouchEvent && "which" in l && 3 === l.which)) return;
            if (!n.isTouchEvent && "button" in l && l.button > 0) return;
            if (n.isTouched && n.isMoved) return;
            const d = !!a.noSwipingClass && "" !== a.noSwipingClass,
                c = t.composedPath ? t.composedPath() : t.path;
            d && l.target && l.target.shadowRoot && c && (h = Q(c[0]));
            const u = a.noSwipingSelector ? a.noSwipingSelector : "." + a.noSwipingClass,
                p = !(!l.target || !l.target.shadowRoot);
            if (
                a.noSwiping &&
                (p
                    ? (function (t, e = this) {
                          return (function e(s) {
                              if (!s || s === j() || s === G()) return null;
                              s.assignedSlot && (s = s.assignedSlot);
                              const i = s.closest(t);
                              return i || s.getRootNode ? i || e(s.getRootNode().host) : null;
                          })(e);
                      })(u, h[0])
                    : h.closest(u)[0])
            )
                return void (e.allowClick = !0);
            if (a.swipeHandler && !h.closest(a.swipeHandler)[0]) return;
            (o.currentX = "touchstart" === l.type ? l.targetTouches[0].pageX : l.pageX), (o.currentY = "touchstart" === l.type ? l.targetTouches[0].pageY : l.pageY);
            const f = o.currentX,
                g = o.currentY,
                m = a.edgeSwipeDetection || a.iOSEdgeSwipeDetection,
                v = a.edgeSwipeThreshold || a.iOSEdgeSwipeThreshold;
            if (m && (f <= v || f >= i.innerWidth - v)) {
                if ("prevent" !== m) return;
                t.preventDefault();
            }
            if (
                (Object.assign(n, { isTouched: !0, isMoved: !1, allowTouchCallbacks: !0, isScrolling: void 0, startMoving: void 0 }),
                (o.startX = f),
                (o.startY = g),
                (n.touchStartTime = et()),
                (e.allowClick = !0),
                e.updateSize(),
                (e.swipeDirection = void 0),
                a.threshold > 0 && (n.allowThresholdMove = !1),
                "touchstart" !== l.type)
            ) {
                let t = !0;
                h.is(n.focusableElements) && ((t = !1), "SELECT" === h[0].nodeName && (n.isTouched = !1)), s.activeElement && Q(s.activeElement).is(n.focusableElements) && s.activeElement !== h[0] && s.activeElement.blur();
                const i = t && e.allowTouchMove && a.touchStartPreventDefault;
                (!a.touchStartForcePreventDefault && !i) || h[0].isContentEditable || l.preventDefault();
            }
            e.params.freeMode && e.params.freeMode.enabled && e.freeMode && e.animating && !a.cssMode && e.freeMode.onTouchStart(), e.emit("touchStart", l);
        }
        function gt(t) {
            const e = j(),
                s = this,
                i = s.touchEventsData,
                { params: n, touches: a, rtlTranslate: o, enabled: r } = s;
            if (!r) return;
            let l = t;
            if ((l.originalEvent && (l = l.originalEvent), !i.isTouched)) return void (i.startMoving && i.isScrolling && s.emit("touchMoveOpposite", l));
            if (i.isTouchEvent && "touchmove" !== l.type) return;
            const h = "touchmove" === l.type && l.targetTouches && (l.targetTouches[0] || l.changedTouches[0]),
                d = "touchmove" === l.type ? h.pageX : l.pageX,
                c = "touchmove" === l.type ? h.pageY : l.pageY;
            if (l.preventedByNestedSwiper) return (a.startX = d), void (a.startY = c);
            if (!s.allowTouchMove) return Q(l.target).is(i.focusableElements) || (s.allowClick = !1), void (i.isTouched && (Object.assign(a, { startX: d, startY: c, currentX: d, currentY: c }), (i.touchStartTime = et())));
            if (i.isTouchEvent && n.touchReleaseOnEdges && !n.loop)
                if (s.isVertical()) {
                    if ((c < a.startY && s.translate <= s.maxTranslate()) || (c > a.startY && s.translate >= s.minTranslate())) return (i.isTouched = !1), void (i.isMoved = !1);
                } else if ((d < a.startX && s.translate <= s.maxTranslate()) || (d > a.startX && s.translate >= s.minTranslate())) return;
            if (i.isTouchEvent && e.activeElement && l.target === e.activeElement && Q(l.target).is(i.focusableElements)) return (i.isMoved = !0), void (s.allowClick = !1);
            if ((i.allowTouchCallbacks && s.emit("touchMove", l), l.targetTouches && l.targetTouches.length > 1)) return;
            (a.currentX = d), (a.currentY = c);
            const u = a.currentX - a.startX,
                p = a.currentY - a.startY;
            if (s.params.threshold && Math.sqrt(u ** 2 + p ** 2) < s.params.threshold) return;
            if (void 0 === i.isScrolling) {
                let t;
                (s.isHorizontal() && a.currentY === a.startY) || (s.isVertical() && a.currentX === a.startX)
                    ? (i.isScrolling = !1)
                    : u * u + p * p >= 25 && ((t = (180 * Math.atan2(Math.abs(p), Math.abs(u))) / Math.PI), (i.isScrolling = s.isHorizontal() ? t > n.touchAngle : 90 - t > n.touchAngle));
            }
            if ((i.isScrolling && s.emit("touchMoveOpposite", l), void 0 === i.startMoving && ((a.currentX === a.startX && a.currentY === a.startY) || (i.startMoving = !0)), i.isScrolling)) return void (i.isTouched = !1);
            if (!i.startMoving) return;
            (s.allowClick = !1),
                !n.cssMode && l.cancelable && l.preventDefault(),
                n.touchMoveStopPropagation && !n.nested && l.stopPropagation(),
                i.isMoved ||
                    (n.loop && !n.cssMode && s.loopFix(),
                    (i.startTranslate = s.getTranslate()),
                    s.setTransition(0),
                    s.animating && s.$wrapperEl.trigger("webkitTransitionEnd transitionend"),
                    (i.allowMomentumBounce = !1),
                    !n.grabCursor || (!0 !== s.allowSlideNext && !0 !== s.allowSlidePrev) || s.setGrabCursor(!0),
                    s.emit("sliderFirstMove", l)),
                s.emit("sliderMove", l),
                (i.isMoved = !0);
            let f = s.isHorizontal() ? u : p;
            (a.diff = f), (f *= n.touchRatio), o && (f = -f), (s.swipeDirection = f > 0 ? "prev" : "next"), (i.currentTranslate = f + i.startTranslate);
            let g = !0,
                m = n.resistanceRatio;
            if (
                (n.touchReleaseOnEdges && (m = 0),
                f > 0 && i.currentTranslate > s.minTranslate()
                    ? ((g = !1), n.resistance && (i.currentTranslate = s.minTranslate() - 1 + (-s.minTranslate() + i.startTranslate + f) ** m))
                    : f < 0 && i.currentTranslate < s.maxTranslate() && ((g = !1), n.resistance && (i.currentTranslate = s.maxTranslate() + 1 - (s.maxTranslate() - i.startTranslate - f) ** m)),
                g && (l.preventedByNestedSwiper = !0),
                !s.allowSlideNext && "next" === s.swipeDirection && i.currentTranslate < i.startTranslate && (i.currentTranslate = i.startTranslate),
                !s.allowSlidePrev && "prev" === s.swipeDirection && i.currentTranslate > i.startTranslate && (i.currentTranslate = i.startTranslate),
                s.allowSlidePrev || s.allowSlideNext || (i.currentTranslate = i.startTranslate),
                n.threshold > 0)
            ) {
                if (!(Math.abs(f) > n.threshold || i.allowThresholdMove)) return void (i.currentTranslate = i.startTranslate);
                if (!i.allowThresholdMove)
                    return (i.allowThresholdMove = !0), (a.startX = a.currentX), (a.startY = a.currentY), (i.currentTranslate = i.startTranslate), void (a.diff = s.isHorizontal() ? a.currentX - a.startX : a.currentY - a.startY);
            }
            n.followFinger &&
                !n.cssMode &&
                (((n.freeMode && n.freeMode.enabled && s.freeMode) || n.watchSlidesProgress) && (s.updateActiveIndex(), s.updateSlidesClasses()),
                s.params.freeMode && n.freeMode.enabled && s.freeMode && s.freeMode.onTouchMove(),
                s.updateProgress(i.currentTranslate),
                s.setTranslate(i.currentTranslate));
        }
        function mt(t) {
            const e = this,
                s = e.touchEventsData,
                { params: i, touches: n, rtlTranslate: a, slidesGrid: o, enabled: r } = e;
            if (!r) return;
            let l = t;
            if ((l.originalEvent && (l = l.originalEvent), s.allowTouchCallbacks && e.emit("touchEnd", l), (s.allowTouchCallbacks = !1), !s.isTouched))
                return s.isMoved && i.grabCursor && e.setGrabCursor(!1), (s.isMoved = !1), void (s.startMoving = !1);
            i.grabCursor && s.isMoved && s.isTouched && (!0 === e.allowSlideNext || !0 === e.allowSlidePrev) && e.setGrabCursor(!1);
            const h = et(),
                d = h - s.touchStartTime;
            if (e.allowClick) {
                const t = l.path || (l.composedPath && l.composedPath());
                e.updateClickedSlide((t && t[0]) || l.target), e.emit("tap click", l), d < 300 && h - s.lastClickTime < 300 && e.emit("doubleTap doubleClick", l);
            }
            if (
                ((s.lastClickTime = et()),
                tt(() => {
                    e.destroyed || (e.allowClick = !0);
                }),
                !s.isTouched || !s.isMoved || !e.swipeDirection || 0 === n.diff || s.currentTranslate === s.startTranslate)
            )
                return (s.isTouched = !1), (s.isMoved = !1), void (s.startMoving = !1);
            let c;
            if (((s.isTouched = !1), (s.isMoved = !1), (s.startMoving = !1), (c = i.followFinger ? (a ? e.translate : -e.translate) : -s.currentTranslate), i.cssMode)) return;
            if (e.params.freeMode && i.freeMode.enabled) return void e.freeMode.onTouchEnd({ currentPos: c });
            let u = 0,
                p = e.slidesSizesGrid[0];
            for (let t = 0; t < o.length; t += t < i.slidesPerGroupSkip ? 1 : i.slidesPerGroup) {
                const e = t < i.slidesPerGroupSkip - 1 ? 1 : i.slidesPerGroup;
                void 0 !== o[t + e] ? c >= o[t] && c < o[t + e] && ((u = t), (p = o[t + e] - o[t])) : c >= o[t] && ((u = t), (p = o[o.length - 1] - o[o.length - 2]));
            }
            let f = null,
                g = null;
            i.rewind && (e.isBeginning ? (g = e.params.virtual && e.params.virtual.enabled && e.virtual ? e.virtual.slides.length - 1 : e.slides.length - 1) : e.isEnd && (f = 0));
            const m = (c - o[u]) / p,
                v = u < i.slidesPerGroupSkip - 1 ? 1 : i.slidesPerGroup;
            if (d > i.longSwipesMs) {
                if (!i.longSwipes) return void e.slideTo(e.activeIndex);
                "next" === e.swipeDirection && (m >= i.longSwipesRatio ? e.slideTo(i.rewind && e.isEnd ? f : u + v) : e.slideTo(u)),
                    "prev" === e.swipeDirection && (m > 1 - i.longSwipesRatio ? e.slideTo(u + v) : null !== g && m < 0 && Math.abs(m) > i.longSwipesRatio ? e.slideTo(g) : e.slideTo(u));
            } else {
                if (!i.shortSwipes) return void e.slideTo(e.activeIndex);
                e.navigation && (l.target === e.navigation.nextEl || l.target === e.navigation.prevEl)
                    ? l.target === e.navigation.nextEl
                        ? e.slideTo(u + v)
                        : e.slideTo(u)
                    : ("next" === e.swipeDirection && e.slideTo(null !== f ? f : u + v), "prev" === e.swipeDirection && e.slideTo(null !== g ? g : u));
            }
        }
        function vt() {
            const t = this,
                { params: e, el: s } = t;
            if (s && 0 === s.offsetWidth) return;
            e.breakpoints && t.setBreakpoint();
            const { allowSlideNext: i, allowSlidePrev: n, snapGrid: a } = t;
            (t.allowSlideNext = !0),
                (t.allowSlidePrev = !0),
                t.updateSize(),
                t.updateSlides(),
                t.updateSlidesClasses(),
                ("auto" === e.slidesPerView || e.slidesPerView > 1) && t.isEnd && !t.isBeginning && !t.params.centeredSlides ? t.slideTo(t.slides.length - 1, 0, !1, !0) : t.slideTo(t.activeIndex, 0, !1, !0),
                t.autoplay && t.autoplay.running && t.autoplay.paused && t.autoplay.run(),
                (t.allowSlidePrev = n),
                (t.allowSlideNext = i),
                t.params.watchOverflow && a !== t.snapGrid && t.checkOverflow();
        }
        function bt(t) {
            const e = this;
            e.enabled && (e.allowClick || (e.params.preventClicks && t.preventDefault(), e.params.preventClicksPropagation && e.animating && (t.stopPropagation(), t.stopImmediatePropagation())));
        }
        function yt() {
            const t = this,
                { wrapperEl: e, rtlTranslate: s, enabled: i } = t;
            if (!i) return;
            let n;
            (t.previousTranslate = t.translate), t.isHorizontal() ? (t.translate = -e.scrollLeft) : (t.translate = -e.scrollTop), 0 === t.translate && (t.translate = 0), t.updateActiveIndex(), t.updateSlidesClasses();
            const a = t.maxTranslate() - t.minTranslate();
            (n = 0 === a ? 0 : (t.translate - t.minTranslate()) / a), n !== t.progress && t.updateProgress(s ? -t.translate : t.translate), t.emit("setTranslate", t.translate, !1);
        }
        let xt = !1;
        function wt() {}
        const Ct = (t, e) => {
            const s = j(),
                { params: i, touchEvents: n, el: a, wrapperEl: o, device: r, support: l } = t,
                h = !!i.nested,
                d = "on" === e ? "addEventListener" : "removeEventListener",
                c = e;
            if (l.touch) {
                const e = !("touchstart" !== n.start || !l.passiveListener || !i.passiveListeners) && { passive: !0, capture: !1 };
                a[d](n.start, t.onTouchStart, e), a[d](n.move, t.onTouchMove, l.passiveListener ? { passive: !1, capture: h } : h), a[d](n.end, t.onTouchEnd, e), n.cancel && a[d](n.cancel, t.onTouchEnd, e);
            } else a[d](n.start, t.onTouchStart, !1), s[d](n.move, t.onTouchMove, h), s[d](n.end, t.onTouchEnd, !1);
            (i.preventClicks || i.preventClicksPropagation) && a[d]("click", t.onClick, !0),
                i.cssMode && o[d]("scroll", t.onScroll),
                i.updateOnWindowResize ? t[c](r.ios || r.android ? "resize orientationchange observerUpdate" : "resize observerUpdate", vt, !0) : t[c]("observerUpdate", vt, !0);
        };
        const kt = (t, e) => t.grid && e.grid && e.grid.rows > 1;
        var St = {
            init: !0,
            direction: "horizontal",
            touchEventsTarget: "wrapper",
            initialSlide: 0,
            speed: 300,
            cssMode: !1,
            updateOnWindowResize: !0,
            resizeObserver: !0,
            nested: !1,
            createElements: !1,
            enabled: !0,
            focusableElements: "input, select, option, textarea, button, video, label",
            width: null,
            height: null,
            preventInteractionOnTransition: !1,
            userAgent: null,
            url: null,
            edgeSwipeDetection: !1,
            edgeSwipeThreshold: 20,
            autoHeight: !1,
            setWrapperSize: !1,
            virtualTranslate: !1,
            effect: "slide",
            breakpoints: void 0,
            breakpointsBase: "window",
            spaceBetween: 0,
            slidesPerView: 1,
            slidesPerGroup: 1,
            slidesPerGroupSkip: 0,
            slidesPerGroupAuto: !1,
            centeredSlides: !1,
            centeredSlidesBounds: !1,
            slidesOffsetBefore: 0,
            slidesOffsetAfter: 0,
            normalizeSlideIndex: !0,
            centerInsufficientSlides: !1,
            watchOverflow: !0,
            roundLengths: !1,
            touchRatio: 1,
            touchAngle: 45,
            simulateTouch: !0,
            shortSwipes: !0,
            longSwipes: !0,
            longSwipesRatio: 0.5,
            longSwipesMs: 300,
            followFinger: !0,
            allowTouchMove: !0,
            threshold: 0,
            touchMoveStopPropagation: !1,
            touchStartPreventDefault: !0,
            touchStartForcePreventDefault: !1,
            touchReleaseOnEdges: !1,
            uniqueNavElements: !0,
            resistance: !0,
            resistanceRatio: 0.85,
            watchSlidesProgress: !1,
            grabCursor: !1,
            preventClicks: !0,
            preventClicksPropagation: !0,
            slideToClickedSlide: !1,
            preloadImages: !0,
            updateOnImagesReady: !0,
            loop: !1,
            loopAdditionalSlides: 0,
            loopedSlides: null,
            loopedSlidesLimit: !0,
            loopFillGroupWithBlank: !1,
            loopPreventsSlide: !0,
            rewind: !1,
            allowSlidePrev: !0,
            allowSlideNext: !0,
            swipeHandler: null,
            noSwiping: !0,
            noSwipingClass: "swiper-no-swiping",
            noSwipingSelector: null,
            passiveListeners: !0,
            maxBackfaceHiddenSlides: 10,
            containerModifierClass: "swiper-",
            slideClass: "swiper-slide",
            slideBlankClass: "swiper-slide-invisible-blank",
            slideActiveClass: "swiper-slide-active",
            slideDuplicateActiveClass: "swiper-slide-duplicate-active",
            slideVisibleClass: "swiper-slide-visible",
            slideDuplicateClass: "swiper-slide-duplicate",
            slideNextClass: "swiper-slide-next",
            slideDuplicateNextClass: "swiper-slide-duplicate-next",
            slidePrevClass: "swiper-slide-prev",
            slideDuplicatePrevClass: "swiper-slide-duplicate-prev",
            wrapperClass: "swiper-wrapper",
            runCallbacksOnInit: !0,
            _emitClasses: !1,
        };
        function Et(t, e) {
            return function (s = {}) {
                const i = Object.keys(s)[0],
                    n = s[i];
                "object" == typeof n && null !== n
                    ? (["navigation", "pagination", "scrollbar"].indexOf(i) >= 0 && !0 === t[i] && (t[i] = { auto: !0 }),
                      i in t && "enabled" in n ? (!0 === t[i] && (t[i] = { enabled: !0 }), "object" != typeof t[i] || "enabled" in t[i] || (t[i].enabled = !0), t[i] || (t[i] = { enabled: !1 }), nt(e, s)) : nt(e, s))
                    : nt(e, s);
            };
        }
        const _t = {
                eventsEmitter: {
                    on(t, e, s) {
                        const i = this;
                        if (!i.eventsListeners || i.destroyed) return i;
                        if ("function" != typeof e) return i;
                        const n = s ? "unshift" : "push";
                        return (
                            t.split(" ").forEach((t) => {
                                i.eventsListeners[t] || (i.eventsListeners[t] = []), i.eventsListeners[t][n](e);
                            }),
                            i
                        );
                    },
                    once(t, e, s) {
                        const i = this;
                        if (!i.eventsListeners || i.destroyed) return i;
                        if ("function" != typeof e) return i;
                        function n(...s) {
                            i.off(t, n), n.__emitterProxy && delete n.__emitterProxy, e.apply(i, s);
                        }
                        return (n.__emitterProxy = e), i.on(t, n, s);
                    },
                    onAny(t, e) {
                        const s = this;
                        if (!s.eventsListeners || s.destroyed) return s;
                        if ("function" != typeof t) return s;
                        const i = e ? "unshift" : "push";
                        return s.eventsAnyListeners.indexOf(t) < 0 && s.eventsAnyListeners[i](t), s;
                    },
                    offAny(t) {
                        const e = this;
                        if (!e.eventsListeners || e.destroyed) return e;
                        if (!e.eventsAnyListeners) return e;
                        const s = e.eventsAnyListeners.indexOf(t);
                        return s >= 0 && e.eventsAnyListeners.splice(s, 1), e;
                    },
                    off(t, e) {
                        const s = this;
                        return !s.eventsListeners || s.destroyed
                            ? s
                            : s.eventsListeners
                            ? (t.split(" ").forEach((t) => {
                                  void 0 === e
                                      ? (s.eventsListeners[t] = [])
                                      : s.eventsListeners[t] &&
                                        s.eventsListeners[t].forEach((i, n) => {
                                            (i === e || (i.__emitterProxy && i.__emitterProxy === e)) && s.eventsListeners[t].splice(n, 1);
                                        });
                              }),
                              s)
                            : s;
                    },
                    emit(...t) {
                        const e = this;
                        if (!e.eventsListeners || e.destroyed) return e;
                        if (!e.eventsListeners) return e;
                        let s, i, n;
                        "string" == typeof t[0] || Array.isArray(t[0]) ? ((s = t[0]), (i = t.slice(1, t.length)), (n = e)) : ((s = t[0].events), (i = t[0].data), (n = t[0].context || e)), i.unshift(n);
                        return (
                            (Array.isArray(s) ? s : s.split(" ")).forEach((t) => {
                                e.eventsAnyListeners &&
                                    e.eventsAnyListeners.length &&
                                    e.eventsAnyListeners.forEach((e) => {
                                        e.apply(n, [t, ...i]);
                                    }),
                                    e.eventsListeners &&
                                        e.eventsListeners[t] &&
                                        e.eventsListeners[t].forEach((t) => {
                                            t.apply(n, i);
                                        });
                            }),
                            e
                        );
                    },
                },
                update: {
                    updateSize: function () {
                        const t = this;
                        let e, s;
                        const i = t.$el;
                        (e = void 0 !== t.params.width && null !== t.params.width ? t.params.width : i[0].clientWidth),
                            (s = void 0 !== t.params.height && null !== t.params.height ? t.params.height : i[0].clientHeight),
                            (0 === e && t.isHorizontal()) ||
                                (0 === s && t.isVertical()) ||
                                ((e = e - parseInt(i.css("padding-left") || 0, 10) - parseInt(i.css("padding-right") || 0, 10)),
                                (s = s - parseInt(i.css("padding-top") || 0, 10) - parseInt(i.css("padding-bottom") || 0, 10)),
                                Number.isNaN(e) && (e = 0),
                                Number.isNaN(s) && (s = 0),
                                Object.assign(t, { width: e, height: s, size: t.isHorizontal() ? e : s }));
                    },
                    updateSlides: function () {
                        const t = this;
                        function e(e) {
                            return t.isHorizontal()
                                ? e
                                : {
                                      width: "height",
                                      "margin-top": "margin-left",
                                      "margin-bottom ": "margin-right",
                                      "margin-left": "margin-top",
                                      "margin-right": "margin-bottom",
                                      "padding-left": "padding-top",
                                      "padding-right": "padding-bottom",
                                      marginRight: "marginBottom",
                                  }[e];
                        }
                        function s(t, s) {
                            return parseFloat(t.getPropertyValue(e(s)) || 0);
                        }
                        const i = t.params,
                            { $wrapperEl: n, size: a, rtlTranslate: o, wrongRTL: r } = t,
                            l = t.virtual && i.virtual.enabled,
                            h = l ? t.virtual.slides.length : t.slides.length,
                            d = n.children("." + t.params.slideClass),
                            c = l ? t.virtual.slides.length : d.length;
                        let u = [];
                        const p = [],
                            f = [];
                        let g = i.slidesOffsetBefore;
                        "function" == typeof g && (g = i.slidesOffsetBefore.call(t));
                        let m = i.slidesOffsetAfter;
                        "function" == typeof m && (m = i.slidesOffsetAfter.call(t));
                        const v = t.snapGrid.length,
                            b = t.slidesGrid.length;
                        let y = i.spaceBetween,
                            x = -g,
                            w = 0,
                            C = 0;
                        if (void 0 === a) return;
                        "string" == typeof y && y.indexOf("%") >= 0 && (y = (parseFloat(y.replace("%", "")) / 100) * a),
                            (t.virtualSize = -y),
                            o ? d.css({ marginLeft: "", marginBottom: "", marginTop: "" }) : d.css({ marginRight: "", marginBottom: "", marginTop: "" }),
                            i.centeredSlides && i.cssMode && (at(t.wrapperEl, "--swiper-centered-offset-before", ""), at(t.wrapperEl, "--swiper-centered-offset-after", ""));
                        const k = i.grid && i.grid.rows > 1 && t.grid;
                        let S;
                        k && t.grid.initSlides(c);
                        const E = "auto" === i.slidesPerView && i.breakpoints && Object.keys(i.breakpoints).filter((t) => void 0 !== i.breakpoints[t].slidesPerView).length > 0;
                        for (let n = 0; n < c; n += 1) {
                            S = 0;
                            const o = d.eq(n);
                            if ((k && t.grid.updateSlide(n, o, c, e), "none" !== o.css("display"))) {
                                if ("auto" === i.slidesPerView) {
                                    E && (d[n].style[e("width")] = "");
                                    const a = getComputedStyle(o[0]),
                                        r = o[0].style.transform,
                                        l = o[0].style.webkitTransform;
                                    if ((r && (o[0].style.transform = "none"), l && (o[0].style.webkitTransform = "none"), i.roundLengths)) S = t.isHorizontal() ? o.outerWidth(!0) : o.outerHeight(!0);
                                    else {
                                        const t = s(a, "width"),
                                            e = s(a, "padding-left"),
                                            i = s(a, "padding-right"),
                                            n = s(a, "margin-left"),
                                            r = s(a, "margin-right"),
                                            l = a.getPropertyValue("box-sizing");
                                        if (l && "border-box" === l) S = t + n + r;
                                        else {
                                            const { clientWidth: s, offsetWidth: a } = o[0];
                                            S = t + e + i + n + r + (a - s);
                                        }
                                    }
                                    r && (o[0].style.transform = r), l && (o[0].style.webkitTransform = l), i.roundLengths && (S = Math.floor(S));
                                } else (S = (a - (i.slidesPerView - 1) * y) / i.slidesPerView), i.roundLengths && (S = Math.floor(S)), d[n] && (d[n].style[e("width")] = S + "px");
                                d[n] && (d[n].swiperSlideSize = S),
                                    f.push(S),
                                    i.centeredSlides
                                        ? ((x = x + S / 2 + w / 2 + y),
                                          0 === w && 0 !== n && (x = x - a / 2 - y),
                                          0 === n && (x = x - a / 2 - y),
                                          Math.abs(x) < 0.001 && (x = 0),
                                          i.roundLengths && (x = Math.floor(x)),
                                          C % i.slidesPerGroup == 0 && u.push(x),
                                          p.push(x))
                                        : (i.roundLengths && (x = Math.floor(x)), (C - Math.min(t.params.slidesPerGroupSkip, C)) % t.params.slidesPerGroup == 0 && u.push(x), p.push(x), (x = x + S + y)),
                                    (t.virtualSize += S + y),
                                    (w = S),
                                    (C += 1);
                            }
                        }
                        if (
                            ((t.virtualSize = Math.max(t.virtualSize, a) + m),
                            o && r && ("slide" === i.effect || "coverflow" === i.effect) && n.css({ width: t.virtualSize + i.spaceBetween + "px" }),
                            i.setWrapperSize && n.css({ [e("width")]: t.virtualSize + i.spaceBetween + "px" }),
                            k && t.grid.updateWrapperSize(S, u, e),
                            !i.centeredSlides)
                        ) {
                            const e = [];
                            for (let s = 0; s < u.length; s += 1) {
                                let n = u[s];
                                i.roundLengths && (n = Math.floor(n)), u[s] <= t.virtualSize - a && e.push(n);
                            }
                            (u = e), Math.floor(t.virtualSize - a) - Math.floor(u[u.length - 1]) > 1 && u.push(t.virtualSize - a);
                        }
                        if ((0 === u.length && (u = [0]), 0 !== i.spaceBetween)) {
                            const s = t.isHorizontal() && o ? "marginLeft" : e("marginRight");
                            d.filter((t, e) => !i.cssMode || e !== d.length - 1).css({ [s]: y + "px" });
                        }
                        if (i.centeredSlides && i.centeredSlidesBounds) {
                            let t = 0;
                            f.forEach((e) => {
                                t += e + (i.spaceBetween ? i.spaceBetween : 0);
                            }),
                                (t -= i.spaceBetween);
                            const e = t - a;
                            u = u.map((t) => (t < 0 ? -g : t > e ? e + m : t));
                        }
                        if (i.centerInsufficientSlides) {
                            let t = 0;
                            if (
                                (f.forEach((e) => {
                                    t += e + (i.spaceBetween ? i.spaceBetween : 0);
                                }),
                                (t -= i.spaceBetween),
                                t < a)
                            ) {
                                const e = (a - t) / 2;
                                u.forEach((t, s) => {
                                    u[s] = t - e;
                                }),
                                    p.forEach((t, s) => {
                                        p[s] = t + e;
                                    });
                            }
                        }
                        if ((Object.assign(t, { slides: d, snapGrid: u, slidesGrid: p, slidesSizesGrid: f }), i.centeredSlides && i.cssMode && !i.centeredSlidesBounds)) {
                            at(t.wrapperEl, "--swiper-centered-offset-before", -u[0] + "px"), at(t.wrapperEl, "--swiper-centered-offset-after", t.size / 2 - f[f.length - 1] / 2 + "px");
                            const e = -t.snapGrid[0],
                                s = -t.slidesGrid[0];
                            (t.snapGrid = t.snapGrid.map((t) => t + e)), (t.slidesGrid = t.slidesGrid.map((t) => t + s));
                        }
                        if (
                            (c !== h && t.emit("slidesLengthChange"),
                            u.length !== v && (t.params.watchOverflow && t.checkOverflow(), t.emit("snapGridLengthChange")),
                            p.length !== b && t.emit("slidesGridLengthChange"),
                            i.watchSlidesProgress && t.updateSlidesOffset(),
                            !(l || i.cssMode || ("slide" !== i.effect && "fade" !== i.effect)))
                        ) {
                            const e = i.containerModifierClass + "backface-hidden",
                                s = t.$el.hasClass(e);
                            c <= i.maxBackfaceHiddenSlides ? s || t.$el.addClass(e) : s && t.$el.removeClass(e);
                        }
                    },
                    updateAutoHeight: function (t) {
                        const e = this,
                            s = [],
                            i = e.virtual && e.params.virtual.enabled;
                        let n,
                            a = 0;
                        "number" == typeof t ? e.setTransition(t) : !0 === t && e.setTransition(e.params.speed);
                        const o = (t) => (i ? e.slides.filter((e) => parseInt(e.getAttribute("data-swiper-slide-index"), 10) === t)[0] : e.slides.eq(t)[0]);
                        if ("auto" !== e.params.slidesPerView && e.params.slidesPerView > 1)
                            if (e.params.centeredSlides)
                                (e.visibleSlides || Q([])).each((t) => {
                                    s.push(t);
                                });
                            else
                                for (n = 0; n < Math.ceil(e.params.slidesPerView); n += 1) {
                                    const t = e.activeIndex + n;
                                    if (t > e.slides.length && !i) break;
                                    s.push(o(t));
                                }
                        else s.push(o(e.activeIndex));
                        for (n = 0; n < s.length; n += 1)
                            if (void 0 !== s[n]) {
                                const t = s[n].offsetHeight;
                                a = t > a ? t : a;
                            }
                        (a || 0 === a) && e.$wrapperEl.css("height", a + "px");
                    },
                    updateSlidesOffset: function () {
                        const t = this,
                            e = t.slides;
                        for (let s = 0; s < e.length; s += 1) e[s].swiperSlideOffset = t.isHorizontal() ? e[s].offsetLeft : e[s].offsetTop;
                    },
                    updateSlidesProgress: function (t = (this && this.translate) || 0) {
                        const e = this,
                            s = e.params,
                            { slides: i, rtlTranslate: n, snapGrid: a } = e;
                        if (0 === i.length) return;
                        void 0 === i[0].swiperSlideOffset && e.updateSlidesOffset();
                        let o = -t;
                        n && (o = t), i.removeClass(s.slideVisibleClass), (e.visibleSlidesIndexes = []), (e.visibleSlides = []);
                        for (let t = 0; t < i.length; t += 1) {
                            const r = i[t];
                            let l = r.swiperSlideOffset;
                            s.cssMode && s.centeredSlides && (l -= i[0].swiperSlideOffset);
                            const h = (o + (s.centeredSlides ? e.minTranslate() : 0) - l) / (r.swiperSlideSize + s.spaceBetween),
                                d = (o - a[0] + (s.centeredSlides ? e.minTranslate() : 0) - l) / (r.swiperSlideSize + s.spaceBetween),
                                c = -(o - l),
                                u = c + e.slidesSizesGrid[t];
                            ((c >= 0 && c < e.size - 1) || (u > 1 && u <= e.size) || (c <= 0 && u >= e.size)) && (e.visibleSlides.push(r), e.visibleSlidesIndexes.push(t), i.eq(t).addClass(s.slideVisibleClass)),
                                (r.progress = n ? -h : h),
                                (r.originalProgress = n ? -d : d);
                        }
                        e.visibleSlides = Q(e.visibleSlides);
                    },
                    updateProgress: function (t) {
                        const e = this;
                        if (void 0 === t) {
                            const s = e.rtlTranslate ? -1 : 1;
                            t = (e && e.translate && e.translate * s) || 0;
                        }
                        const s = e.params,
                            i = e.maxTranslate() - e.minTranslate();
                        let { progress: n, isBeginning: a, isEnd: o } = e;
                        const r = a,
                            l = o;
                        0 === i ? ((n = 0), (a = !0), (o = !0)) : ((n = (t - e.minTranslate()) / i), (a = n <= 0), (o = n >= 1)),
                            Object.assign(e, { progress: n, isBeginning: a, isEnd: o }),
                            (s.watchSlidesProgress || (s.centeredSlides && s.autoHeight)) && e.updateSlidesProgress(t),
                            a && !r && e.emit("reachBeginning toEdge"),
                            o && !l && e.emit("reachEnd toEdge"),
                            ((r && !a) || (l && !o)) && e.emit("fromEdge"),
                            e.emit("progress", n);
                    },
                    updateSlidesClasses: function () {
                        const t = this,
                            { slides: e, params: s, $wrapperEl: i, activeIndex: n, realIndex: a } = t,
                            o = t.virtual && s.virtual.enabled;
                        let r;
                        e.removeClass(`${s.slideActiveClass} ${s.slideNextClass} ${s.slidePrevClass} ${s.slideDuplicateActiveClass} ${s.slideDuplicateNextClass} ${s.slideDuplicatePrevClass}`),
                            (r = o ? t.$wrapperEl.find(`.${s.slideClass}[data-swiper-slide-index="${n}"]`) : e.eq(n)),
                            r.addClass(s.slideActiveClass),
                            s.loop &&
                                (r.hasClass(s.slideDuplicateClass)
                                    ? i.children(`.${s.slideClass}:not(.${s.slideDuplicateClass})[data-swiper-slide-index="${a}"]`).addClass(s.slideDuplicateActiveClass)
                                    : i.children(`.${s.slideClass}.${s.slideDuplicateClass}[data-swiper-slide-index="${a}"]`).addClass(s.slideDuplicateActiveClass));
                        let l = r
                            .nextAll("." + s.slideClass)
                            .eq(0)
                            .addClass(s.slideNextClass);
                        s.loop && 0 === l.length && ((l = e.eq(0)), l.addClass(s.slideNextClass));
                        let h = r
                            .prevAll("." + s.slideClass)
                            .eq(0)
                            .addClass(s.slidePrevClass);
                        s.loop && 0 === h.length && ((h = e.eq(-1)), h.addClass(s.slidePrevClass)),
                            s.loop &&
                                (l.hasClass(s.slideDuplicateClass)
                                    ? i.children(`.${s.slideClass}:not(.${s.slideDuplicateClass})[data-swiper-slide-index="${l.attr("data-swiper-slide-index")}"]`).addClass(s.slideDuplicateNextClass)
                                    : i.children(`.${s.slideClass}.${s.slideDuplicateClass}[data-swiper-slide-index="${l.attr("data-swiper-slide-index")}"]`).addClass(s.slideDuplicateNextClass),
                                h.hasClass(s.slideDuplicateClass)
                                    ? i.children(`.${s.slideClass}:not(.${s.slideDuplicateClass})[data-swiper-slide-index="${h.attr("data-swiper-slide-index")}"]`).addClass(s.slideDuplicatePrevClass)
                                    : i.children(`.${s.slideClass}.${s.slideDuplicateClass}[data-swiper-slide-index="${h.attr("data-swiper-slide-index")}"]`).addClass(s.slideDuplicatePrevClass)),
                            t.emitSlidesClasses();
                    },
                    updateActiveIndex: function (t) {
                        const e = this,
                            s = e.rtlTranslate ? e.translate : -e.translate,
                            { slidesGrid: i, snapGrid: n, params: a, activeIndex: o, realIndex: r, snapIndex: l } = e;
                        let h,
                            d = t;
                        if (void 0 === d) {
                            for (let t = 0; t < i.length; t += 1) void 0 !== i[t + 1] ? (s >= i[t] && s < i[t + 1] - (i[t + 1] - i[t]) / 2 ? (d = t) : s >= i[t] && s < i[t + 1] && (d = t + 1)) : s >= i[t] && (d = t);
                            a.normalizeSlideIndex && (d < 0 || void 0 === d) && (d = 0);
                        }
                        if (n.indexOf(s) >= 0) h = n.indexOf(s);
                        else {
                            const t = Math.min(a.slidesPerGroupSkip, d);
                            h = t + Math.floor((d - t) / a.slidesPerGroup);
                        }
                        if ((h >= n.length && (h = n.length - 1), d === o)) return void (h !== l && ((e.snapIndex = h), e.emit("snapIndexChange")));
                        const c = parseInt(e.slides.eq(d).attr("data-swiper-slide-index") || d, 10);
                        Object.assign(e, { snapIndex: h, realIndex: c, previousIndex: o, activeIndex: d }),
                            e.emit("activeIndexChange"),
                            e.emit("snapIndexChange"),
                            r !== c && e.emit("realIndexChange"),
                            (e.initialized || e.params.runCallbacksOnInit) && e.emit("slideChange");
                    },
                    updateClickedSlide: function (t) {
                        const e = this,
                            s = e.params,
                            i = Q(t).closest("." + s.slideClass)[0];
                        let n,
                            a = !1;
                        if (i)
                            for (let t = 0; t < e.slides.length; t += 1)
                                if (e.slides[t] === i) {
                                    (a = !0), (n = t);
                                    break;
                                }
                        if (!i || !a) return (e.clickedSlide = void 0), void (e.clickedIndex = void 0);
                        (e.clickedSlide = i),
                            e.virtual && e.params.virtual.enabled ? (e.clickedIndex = parseInt(Q(i).attr("data-swiper-slide-index"), 10)) : (e.clickedIndex = n),
                            s.slideToClickedSlide && void 0 !== e.clickedIndex && e.clickedIndex !== e.activeIndex && e.slideToClickedSlide();
                    },
                },
                translate: {
                    getTranslate: function (t = this.isHorizontal() ? "x" : "y") {
                        const { params: e, rtlTranslate: s, translate: i, $wrapperEl: n } = this;
                        if (e.virtualTranslate) return s ? -i : i;
                        if (e.cssMode) return i;
                        let a = st(n[0], t);
                        return s && (a = -a), a || 0;
                    },
                    setTranslate: function (t, e) {
                        const s = this,
                            { rtlTranslate: i, params: n, $wrapperEl: a, wrapperEl: o, progress: r } = s;
                        let l,
                            h = 0,
                            d = 0;
                        s.isHorizontal() ? (h = i ? -t : t) : (d = t),
                            n.roundLengths && ((h = Math.floor(h)), (d = Math.floor(d))),
                            n.cssMode ? (o[s.isHorizontal() ? "scrollLeft" : "scrollTop"] = s.isHorizontal() ? -h : -d) : n.virtualTranslate || a.transform(`translate3d(${h}px, ${d}px, 0px)`),
                            (s.previousTranslate = s.translate),
                            (s.translate = s.isHorizontal() ? h : d);
                        const c = s.maxTranslate() - s.minTranslate();
                        (l = 0 === c ? 0 : (t - s.minTranslate()) / c), l !== r && s.updateProgress(t), s.emit("setTranslate", s.translate, e);
                    },
                    minTranslate: function () {
                        return -this.snapGrid[0];
                    },
                    maxTranslate: function () {
                        return -this.snapGrid[this.snapGrid.length - 1];
                    },
                    translateTo: function (t = 0, e = this.params.speed, s = !0, i = !0, n) {
                        const a = this,
                            { params: o, wrapperEl: r } = a;
                        if (a.animating && o.preventInteractionOnTransition) return !1;
                        const l = a.minTranslate(),
                            h = a.maxTranslate();
                        let d;
                        if (((d = i && t > l ? l : i && t < h ? h : t), a.updateProgress(d), o.cssMode)) {
                            const t = a.isHorizontal();
                            if (0 === e) r[t ? "scrollLeft" : "scrollTop"] = -d;
                            else {
                                if (!a.support.smoothScroll) return ot({ swiper: a, targetPosition: -d, side: t ? "left" : "top" }), !0;
                                r.scrollTo({ [t ? "left" : "top"]: -d, behavior: "smooth" });
                            }
                            return !0;
                        }
                        return (
                            0 === e
                                ? (a.setTransition(0), a.setTranslate(d), s && (a.emit("beforeTransitionStart", e, n), a.emit("transitionEnd")))
                                : (a.setTransition(e),
                                  a.setTranslate(d),
                                  s && (a.emit("beforeTransitionStart", e, n), a.emit("transitionStart")),
                                  a.animating ||
                                      ((a.animating = !0),
                                      a.onTranslateToWrapperTransitionEnd ||
                                          (a.onTranslateToWrapperTransitionEnd = function (t) {
                                              a &&
                                                  !a.destroyed &&
                                                  t.target === this &&
                                                  (a.$wrapperEl[0].removeEventListener("transitionend", a.onTranslateToWrapperTransitionEnd),
                                                  a.$wrapperEl[0].removeEventListener("webkitTransitionEnd", a.onTranslateToWrapperTransitionEnd),
                                                  (a.onTranslateToWrapperTransitionEnd = null),
                                                  delete a.onTranslateToWrapperTransitionEnd,
                                                  s && a.emit("transitionEnd"));
                                          }),
                                      a.$wrapperEl[0].addEventListener("transitionend", a.onTranslateToWrapperTransitionEnd),
                                      a.$wrapperEl[0].addEventListener("webkitTransitionEnd", a.onTranslateToWrapperTransitionEnd))),
                            !0
                        );
                    },
                },
                transition: {
                    setTransition: function (t, e) {
                        const s = this;
                        s.params.cssMode || s.$wrapperEl.transition(t), s.emit("setTransition", t, e);
                    },
                    transitionStart: function (t = !0, e) {
                        const s = this,
                            { params: i } = s;
                        i.cssMode || (i.autoHeight && s.updateAutoHeight(), pt({ swiper: s, runCallbacks: t, direction: e, step: "Start" }));
                    },
                    transitionEnd: function (t = !0, e) {
                        const { params: s } = this;
                        (this.animating = !1), s.cssMode || (this.setTransition(0), pt({ swiper: this, runCallbacks: t, direction: e, step: "End" }));
                    },
                },
                slide: {
                    slideTo: function (t = 0, e = this.params.speed, s = !0, i, n) {
                        if ("number" != typeof t && "string" != typeof t) throw new Error(`The 'index' argument cannot have type other than 'number' or 'string'. [${typeof t}] given.`);
                        if ("string" == typeof t) {
                            const e = parseInt(t, 10);
                            if (!isFinite(e)) throw new Error(`The passed-in 'index' (string) couldn't be converted to 'number'. [${t}] given.`);
                            t = e;
                        }
                        const a = this;
                        let o = t;
                        o < 0 && (o = 0);
                        const { params: r, snapGrid: l, slidesGrid: h, previousIndex: d, activeIndex: c, rtlTranslate: u, wrapperEl: p, enabled: f } = a;
                        if ((a.animating && r.preventInteractionOnTransition) || (!f && !i && !n)) return !1;
                        const g = Math.min(a.params.slidesPerGroupSkip, o);
                        let m = g + Math.floor((o - g) / a.params.slidesPerGroup);
                        m >= l.length && (m = l.length - 1);
                        const v = -l[m];
                        if (r.normalizeSlideIndex)
                            for (let t = 0; t < h.length; t += 1) {
                                const e = -Math.floor(100 * v),
                                    s = Math.floor(100 * h[t]),
                                    i = Math.floor(100 * h[t + 1]);
                                void 0 !== h[t + 1] ? (e >= s && e < i - (i - s) / 2 ? (o = t) : e >= s && e < i && (o = t + 1)) : e >= s && (o = t);
                            }
                        if (a.initialized && o !== c) {
                            if (!a.allowSlideNext && v < a.translate && v < a.minTranslate()) return !1;
                            if (!a.allowSlidePrev && v > a.translate && v > a.maxTranslate() && (c || 0) !== o) return !1;
                        }
                        let b;
                        if ((o !== (d || 0) && s && a.emit("beforeSlideChangeStart"), a.updateProgress(v), (b = o > c ? "next" : o < c ? "prev" : "reset"), (u && -v === a.translate) || (!u && v === a.translate)))
                            return a.updateActiveIndex(o), r.autoHeight && a.updateAutoHeight(), a.updateSlidesClasses(), "slide" !== r.effect && a.setTranslate(v), "reset" !== b && (a.transitionStart(s, b), a.transitionEnd(s, b)), !1;
                        if (r.cssMode) {
                            const t = a.isHorizontal(),
                                s = u ? v : -v;
                            if (0 === e) {
                                const e = a.virtual && a.params.virtual.enabled;
                                e && ((a.wrapperEl.style.scrollSnapType = "none"), (a._immediateVirtual = !0)),
                                    (p[t ? "scrollLeft" : "scrollTop"] = s),
                                    e &&
                                        requestAnimationFrame(() => {
                                            (a.wrapperEl.style.scrollSnapType = ""), (a._swiperImmediateVirtual = !1);
                                        });
                            } else {
                                if (!a.support.smoothScroll) return ot({ swiper: a, targetPosition: s, side: t ? "left" : "top" }), !0;
                                p.scrollTo({ [t ? "left" : "top"]: s, behavior: "smooth" });
                            }
                            return !0;
                        }
                        return (
                            a.setTransition(e),
                            a.setTranslate(v),
                            a.updateActiveIndex(o),
                            a.updateSlidesClasses(),
                            a.emit("beforeTransitionStart", e, i),
                            a.transitionStart(s, b),
                            0 === e
                                ? a.transitionEnd(s, b)
                                : a.animating ||
                                  ((a.animating = !0),
                                  a.onSlideToWrapperTransitionEnd ||
                                      (a.onSlideToWrapperTransitionEnd = function (t) {
                                          a &&
                                              !a.destroyed &&
                                              t.target === this &&
                                              (a.$wrapperEl[0].removeEventListener("transitionend", a.onSlideToWrapperTransitionEnd),
                                              a.$wrapperEl[0].removeEventListener("webkitTransitionEnd", a.onSlideToWrapperTransitionEnd),
                                              (a.onSlideToWrapperTransitionEnd = null),
                                              delete a.onSlideToWrapperTransitionEnd,
                                              a.transitionEnd(s, b));
                                      }),
                                  a.$wrapperEl[0].addEventListener("transitionend", a.onSlideToWrapperTransitionEnd),
                                  a.$wrapperEl[0].addEventListener("webkitTransitionEnd", a.onSlideToWrapperTransitionEnd)),
                            !0
                        );
                    },
                    slideToLoop: function (t = 0, e = this.params.speed, s = !0, i) {
                        if ("string" == typeof t) {
                            const e = parseInt(t, 10);
                            if (!isFinite(e)) throw new Error(`The passed-in 'index' (string) couldn't be converted to 'number'. [${t}] given.`);
                            t = e;
                        }
                        const n = this;
                        let a = t;
                        return n.params.loop && (a += n.loopedSlides), n.slideTo(a, e, s, i);
                    },
                    slideNext: function (t = this.params.speed, e = !0, s) {
                        const i = this,
                            { animating: n, enabled: a, params: o } = i;
                        if (!a) return i;
                        let r = o.slidesPerGroup;
                        "auto" === o.slidesPerView && 1 === o.slidesPerGroup && o.slidesPerGroupAuto && (r = Math.max(i.slidesPerViewDynamic("current", !0), 1));
                        const l = i.activeIndex < o.slidesPerGroupSkip ? 1 : r;
                        if (o.loop) {
                            if (n && o.loopPreventsSlide) return !1;
                            i.loopFix(), (i._clientLeft = i.$wrapperEl[0].clientLeft);
                        }
                        return o.rewind && i.isEnd ? i.slideTo(0, t, e, s) : i.slideTo(i.activeIndex + l, t, e, s);
                    },
                    slidePrev: function (t = this.params.speed, e = !0, s) {
                        const i = this,
                            { params: n, animating: a, snapGrid: o, slidesGrid: r, rtlTranslate: l, enabled: h } = i;
                        if (!h) return i;
                        if (n.loop) {
                            if (a && n.loopPreventsSlide) return !1;
                            i.loopFix(), (i._clientLeft = i.$wrapperEl[0].clientLeft);
                        }
                        function d(t) {
                            return t < 0 ? -Math.floor(Math.abs(t)) : Math.floor(t);
                        }
                        const c = d(l ? i.translate : -i.translate),
                            u = o.map((t) => d(t));
                        let p = o[u.indexOf(c) - 1];
                        if (void 0 === p && n.cssMode) {
                            let t;
                            o.forEach((e, s) => {
                                c >= e && (t = s);
                            }),
                                void 0 !== t && (p = o[t > 0 ? t - 1 : t]);
                        }
                        let f = 0;
                        if (
                            (void 0 !== p &&
                                ((f = r.indexOf(p)),
                                f < 0 && (f = i.activeIndex - 1),
                                "auto" === n.slidesPerView && 1 === n.slidesPerGroup && n.slidesPerGroupAuto && ((f = f - i.slidesPerViewDynamic("previous", !0) + 1), (f = Math.max(f, 0)))),
                            n.rewind && i.isBeginning)
                        ) {
                            const n = i.params.virtual && i.params.virtual.enabled && i.virtual ? i.virtual.slides.length - 1 : i.slides.length - 1;
                            return i.slideTo(n, t, e, s);
                        }
                        return i.slideTo(f, t, e, s);
                    },
                    slideReset: function (t = this.params.speed, e = !0, s) {
                        return this.slideTo(this.activeIndex, t, e, s);
                    },
                    slideToClosest: function (t = this.params.speed, e = !0, s, i = 0.5) {
                        const n = this;
                        let a = n.activeIndex;
                        const o = Math.min(n.params.slidesPerGroupSkip, a),
                            r = o + Math.floor((a - o) / n.params.slidesPerGroup),
                            l = n.rtlTranslate ? n.translate : -n.translate;
                        if (l >= n.snapGrid[r]) {
                            const t = n.snapGrid[r];
                            l - t > (n.snapGrid[r + 1] - t) * i && (a += n.params.slidesPerGroup);
                        } else {
                            const t = n.snapGrid[r - 1];
                            l - t <= (n.snapGrid[r] - t) * i && (a -= n.params.slidesPerGroup);
                        }
                        return (a = Math.max(a, 0)), (a = Math.min(a, n.slidesGrid.length - 1)), n.slideTo(a, t, e, s);
                    },
                    slideToClickedSlide: function () {
                        const t = this,
                            { params: e, $wrapperEl: s } = t,
                            i = "auto" === e.slidesPerView ? t.slidesPerViewDynamic() : e.slidesPerView;
                        let n,
                            a = t.clickedIndex;
                        if (e.loop) {
                            if (t.animating) return;
                            (n = parseInt(Q(t.clickedSlide).attr("data-swiper-slide-index"), 10)),
                                e.centeredSlides
                                    ? a < t.loopedSlides - i / 2 || a > t.slides.length - t.loopedSlides + i / 2
                                        ? (t.loopFix(),
                                          (a = s.children(`.${e.slideClass}[data-swiper-slide-index="${n}"]:not(.${e.slideDuplicateClass})`).eq(0).index()),
                                          tt(() => {
                                              t.slideTo(a);
                                          }))
                                        : t.slideTo(a)
                                    : a > t.slides.length - i
                                    ? (t.loopFix(),
                                      (a = s.children(`.${e.slideClass}[data-swiper-slide-index="${n}"]:not(.${e.slideDuplicateClass})`).eq(0).index()),
                                      tt(() => {
                                          t.slideTo(a);
                                      }))
                                    : t.slideTo(a);
                        } else t.slideTo(a);
                    },
                },
                loop: {
                    loopCreate: function () {
                        const t = this,
                            e = j(),
                            { params: s, $wrapperEl: i } = t,
                            n = i.children().length > 0 ? Q(i.children()[0].parentNode) : i;
                        n.children(`.${s.slideClass}.${s.slideDuplicateClass}`).remove();
                        let a = n.children("." + s.slideClass);
                        if (s.loopFillGroupWithBlank) {
                            const t = s.slidesPerGroup - (a.length % s.slidesPerGroup);
                            if (t !== s.slidesPerGroup) {
                                for (let i = 0; i < t; i += 1) {
                                    const t = Q(e.createElement("div")).addClass(`${s.slideClass} ${s.slideBlankClass}`);
                                    n.append(t);
                                }
                                a = n.children("." + s.slideClass);
                            }
                        }
                        "auto" !== s.slidesPerView || s.loopedSlides || (s.loopedSlides = a.length),
                            (t.loopedSlides = Math.ceil(parseFloat(s.loopedSlides || s.slidesPerView, 10))),
                            (t.loopedSlides += s.loopAdditionalSlides),
                            t.loopedSlides > a.length && t.params.loopedSlidesLimit && (t.loopedSlides = a.length);
                        const o = [],
                            r = [];
                        a.each((t, e) => {
                            Q(t).attr("data-swiper-slide-index", e);
                        });
                        for (let e = 0; e < t.loopedSlides; e += 1) {
                            const t = e - Math.floor(e / a.length) * a.length;
                            r.push(a.eq(t)[0]), o.unshift(a.eq(a.length - t - 1)[0]);
                        }
                        for (let t = 0; t < r.length; t += 1) n.append(Q(r[t].cloneNode(!0)).addClass(s.slideDuplicateClass));
                        for (let t = o.length - 1; t >= 0; t -= 1) n.prepend(Q(o[t].cloneNode(!0)).addClass(s.slideDuplicateClass));
                    },
                    loopFix: function () {
                        const t = this;
                        t.emit("beforeLoopFix");
                        const { activeIndex: e, slides: s, loopedSlides: i, allowSlidePrev: n, allowSlideNext: a, snapGrid: o, rtlTranslate: r } = t;
                        let l;
                        (t.allowSlidePrev = !0), (t.allowSlideNext = !0);
                        const h = -o[e] - t.getTranslate();
                        if (e < i) {
                            (l = s.length - 3 * i + e), (l += i);
                            t.slideTo(l, 0, !1, !0) && 0 !== h && t.setTranslate((r ? -t.translate : t.translate) - h);
                        } else if (e >= s.length - i) {
                            (l = -s.length + e + i), (l += i);
                            t.slideTo(l, 0, !1, !0) && 0 !== h && t.setTranslate((r ? -t.translate : t.translate) - h);
                        }
                        (t.allowSlidePrev = n), (t.allowSlideNext = a), t.emit("loopFix");
                    },
                    loopDestroy: function () {
                        const { $wrapperEl: t, params: e, slides: s } = this;
                        t.children(`.${e.slideClass}.${e.slideDuplicateClass},.${e.slideClass}.${e.slideBlankClass}`).remove(), s.removeAttr("data-swiper-slide-index");
                    },
                },
                grabCursor: {
                    setGrabCursor: function (t) {
                        if (this.support.touch || !this.params.simulateTouch || (this.params.watchOverflow && this.isLocked) || this.params.cssMode) return;
                        const e = "container" === this.params.touchEventsTarget ? this.el : this.wrapperEl;
                        (e.style.cursor = "move"), (e.style.cursor = t ? "grabbing" : "grab");
                    },
                    unsetGrabCursor: function () {
                        this.support.touch || (this.params.watchOverflow && this.isLocked) || this.params.cssMode || (this["container" === this.params.touchEventsTarget ? "el" : "wrapperEl"].style.cursor = "");
                    },
                },
                events: {
                    attachEvents: function () {
                        const t = this,
                            e = j(),
                            { params: s, support: i } = t;
                        (t.onTouchStart = ft.bind(t)),
                            (t.onTouchMove = gt.bind(t)),
                            (t.onTouchEnd = mt.bind(t)),
                            s.cssMode && (t.onScroll = yt.bind(t)),
                            (t.onClick = bt.bind(t)),
                            i.touch && !xt && (e.addEventListener("touchstart", wt), (xt = !0)),
                            Ct(t, "on");
                    },
                    detachEvents: function () {
                        Ct(this, "off");
                    },
                },
                breakpoints: {
                    setBreakpoint: function () {
                        const t = this,
                            { activeIndex: e, initialized: s, loopedSlides: i = 0, params: n, $el: a } = t,
                            o = n.breakpoints;
                        if (!o || (o && 0 === Object.keys(o).length)) return;
                        const r = t.getBreakpoint(o, t.params.breakpointsBase, t.el);
                        if (!r || t.currentBreakpoint === r) return;
                        const l = (r in o ? o[r] : void 0) || t.originalParams,
                            h = kt(t, n),
                            d = kt(t, l),
                            c = n.enabled;
                        h && !d
                            ? (a.removeClass(`${n.containerModifierClass}grid ${n.containerModifierClass}grid-column`), t.emitContainerClasses())
                            : !h &&
                              d &&
                              (a.addClass(n.containerModifierClass + "grid"),
                              ((l.grid.fill && "column" === l.grid.fill) || (!l.grid.fill && "column" === n.grid.fill)) && a.addClass(n.containerModifierClass + "grid-column"),
                              t.emitContainerClasses()),
                            ["navigation", "pagination", "scrollbar"].forEach((e) => {
                                const s = n[e] && n[e].enabled,
                                    i = l[e] && l[e].enabled;
                                s && !i && t[e].disable(), !s && i && t[e].enable();
                            });
                        const u = l.direction && l.direction !== n.direction,
                            p = n.loop && (l.slidesPerView !== n.slidesPerView || u);
                        u && s && t.changeDirection(), nt(t.params, l);
                        const f = t.params.enabled;
                        Object.assign(t, { allowTouchMove: t.params.allowTouchMove, allowSlideNext: t.params.allowSlideNext, allowSlidePrev: t.params.allowSlidePrev }),
                            c && !f ? t.disable() : !c && f && t.enable(),
                            (t.currentBreakpoint = r),
                            t.emit("_beforeBreakpoint", l),
                            p && s && (t.loopDestroy(), t.loopCreate(), t.updateSlides(), t.slideTo(e - i + t.loopedSlides, 0, !1)),
                            t.emit("breakpoint", l);
                    },
                    getBreakpoint: function (t, e = "window", s) {
                        if (!t || ("container" === e && !s)) return;
                        let i = !1;
                        const n = G(),
                            a = "window" === e ? n.innerHeight : s.clientHeight,
                            o = Object.keys(t).map((t) => {
                                if ("string" == typeof t && 0 === t.indexOf("@")) {
                                    const e = parseFloat(t.substr(1));
                                    return { value: a * e, point: t };
                                }
                                return { value: t, point: t };
                            });
                        o.sort((t, e) => parseInt(t.value, 10) - parseInt(e.value, 10));
                        for (let t = 0; t < o.length; t += 1) {
                            const { point: a, value: r } = o[t];
                            "window" === e ? n.matchMedia(`(min-width: ${r}px)`).matches && (i = a) : r <= s.clientWidth && (i = a);
                        }
                        return i || "max";
                    },
                },
                checkOverflow: {
                    checkOverflow: function () {
                        const t = this,
                            { isLocked: e, params: s } = t,
                            { slidesOffsetBefore: i } = s;
                        if (i) {
                            const e = t.slides.length - 1,
                                s = t.slidesGrid[e] + t.slidesSizesGrid[e] + 2 * i;
                            t.isLocked = t.size > s;
                        } else t.isLocked = 1 === t.snapGrid.length;
                        !0 === s.allowSlideNext && (t.allowSlideNext = !t.isLocked),
                            !0 === s.allowSlidePrev && (t.allowSlidePrev = !t.isLocked),
                            e && e !== t.isLocked && (t.isEnd = !1),
                            e !== t.isLocked && t.emit(t.isLocked ? "lock" : "unlock");
                    },
                },
                classes: {
                    addClasses: function () {
                        const { classNames: t, params: e, rtl: s, $el: i, device: n, support: a } = this,
                            o = (function (t, e) {
                                const s = [];
                                return (
                                    t.forEach((t) => {
                                        "object" == typeof t
                                            ? Object.keys(t).forEach((i) => {
                                                  t[i] && s.push(e + i);
                                              })
                                            : "string" == typeof t && s.push(e + t);
                                    }),
                                    s
                                );
                            })(
                                [
                                    "initialized",
                                    e.direction,
                                    { "pointer-events": !a.touch },
                                    { "free-mode": this.params.freeMode && e.freeMode.enabled },
                                    { autoheight: e.autoHeight },
                                    { rtl: s },
                                    { grid: e.grid && e.grid.rows > 1 },
                                    { "grid-column": e.grid && e.grid.rows > 1 && "column" === e.grid.fill },
                                    { android: n.android },
                                    { ios: n.ios },
                                    { "css-mode": e.cssMode },
                                    { centered: e.cssMode && e.centeredSlides },
                                    { "watch-progress": e.watchSlidesProgress },
                                ],
                                e.containerModifierClass
                            );
                        t.push(...o), i.addClass([...t].join(" ")), this.emitContainerClasses();
                    },
                    removeClasses: function () {
                        const { $el: t, classNames: e } = this;
                        t.removeClass(e.join(" ")), this.emitContainerClasses();
                    },
                },
                images: {
                    loadImage: function (t, e, s, i, n, a) {
                        const o = G();
                        let r;
                        function l() {
                            a && a();
                        }
                        Q(t).parent("picture")[0] || (t.complete && n) ? l() : e ? ((r = new o.Image()), (r.onload = l), (r.onerror = l), i && (r.sizes = i), s && (r.srcset = s), e && (r.src = e)) : l();
                    },
                    preloadImages: function () {
                        const t = this;
                        function e() {
                            null != t && t && !t.destroyed && (void 0 !== t.imagesLoaded && (t.imagesLoaded += 1), t.imagesLoaded === t.imagesToLoad.length && (t.params.updateOnImagesReady && t.update(), t.emit("imagesReady")));
                        }
                        t.imagesToLoad = t.$el.find("img");
                        for (let s = 0; s < t.imagesToLoad.length; s += 1) {
                            const i = t.imagesToLoad[s];
                            t.loadImage(i, i.currentSrc || i.getAttribute("src"), i.srcset || i.getAttribute("srcset"), i.sizes || i.getAttribute("sizes"), !0, e);
                        }
                    },
                },
            },
            Tt = {};
        class At {
            constructor(...t) {
                let e, s;
                if ((1 === t.length && t[0].constructor && "Object" === Object.prototype.toString.call(t[0]).slice(8, -1) ? (s = t[0]) : ([e, s] = t), s || (s = {}), (s = nt({}, s)), e && !s.el && (s.el = e), s.el && Q(s.el).length > 1)) {
                    const t = [];
                    return (
                        Q(s.el).each((e) => {
                            const i = nt({}, s, { el: e });
                            t.push(new At(i));
                        }),
                        t
                    );
                }
                const i = this;
                (i.__swiper__ = !0),
                    (i.support = dt()),
                    (i.device = ct({ userAgent: s.userAgent })),
                    (i.browser = ut()),
                    (i.eventsListeners = {}),
                    (i.eventsAnyListeners = []),
                    (i.modules = [...i.__modules__]),
                    s.modules && Array.isArray(s.modules) && i.modules.push(...s.modules);
                const n = {};
                i.modules.forEach((t) => {
                    t({ swiper: i, extendParams: Et(s, n), on: i.on.bind(i), once: i.once.bind(i), off: i.off.bind(i), emit: i.emit.bind(i) });
                });
                const a = nt({}, St, n);
                return (
                    (i.params = nt({}, a, Tt, s)),
                    (i.originalParams = nt({}, i.params)),
                    (i.passedParams = nt({}, s)),
                    i.params &&
                        i.params.on &&
                        Object.keys(i.params.on).forEach((t) => {
                            i.on(t, i.params.on[t]);
                        }),
                    i.params && i.params.onAny && i.onAny(i.params.onAny),
                    (i.$ = Q),
                    Object.assign(i, {
                        enabled: i.params.enabled,
                        el: e,
                        classNames: [],
                        slides: Q(),
                        slidesGrid: [],
                        snapGrid: [],
                        slidesSizesGrid: [],
                        isHorizontal: () => "horizontal" === i.params.direction,
                        isVertical: () => "vertical" === i.params.direction,
                        activeIndex: 0,
                        realIndex: 0,
                        isBeginning: !0,
                        isEnd: !1,
                        translate: 0,
                        previousTranslate: 0,
                        progress: 0,
                        velocity: 0,
                        animating: !1,
                        allowSlideNext: i.params.allowSlideNext,
                        allowSlidePrev: i.params.allowSlidePrev,
                        touchEvents: (function () {
                            const t = ["touchstart", "touchmove", "touchend", "touchcancel"],
                                e = ["pointerdown", "pointermove", "pointerup"];
                            return (
                                (i.touchEventsTouch = { start: t[0], move: t[1], end: t[2], cancel: t[3] }),
                                (i.touchEventsDesktop = { start: e[0], move: e[1], end: e[2] }),
                                i.support.touch || !i.params.simulateTouch ? i.touchEventsTouch : i.touchEventsDesktop
                            );
                        })(),
                        touchEventsData: {
                            isTouched: void 0,
                            isMoved: void 0,
                            allowTouchCallbacks: void 0,
                            touchStartTime: void 0,
                            isScrolling: void 0,
                            currentTranslate: void 0,
                            startTranslate: void 0,
                            allowThresholdMove: void 0,
                            focusableElements: i.params.focusableElements,
                            lastClickTime: et(),
                            clickTimeout: void 0,
                            velocities: [],
                            allowMomentumBounce: void 0,
                            isTouchEvent: void 0,
                            startMoving: void 0,
                        },
                        allowClick: !0,
                        allowTouchMove: i.params.allowTouchMove,
                        touches: { startX: 0, startY: 0, currentX: 0, currentY: 0, diff: 0 },
                        imagesToLoad: [],
                        imagesLoaded: 0,
                    }),
                    i.emit("_swiper"),
                    i.params.init && i.init(),
                    i
                );
            }
            enable() {
                const t = this;
                t.enabled || ((t.enabled = !0), t.params.grabCursor && t.setGrabCursor(), t.emit("enable"));
            }
            disable() {
                const t = this;
                t.enabled && ((t.enabled = !1), t.params.grabCursor && t.unsetGrabCursor(), t.emit("disable"));
            }
            setProgress(t, e) {
                t = Math.min(Math.max(t, 0), 1);
                const s = this.minTranslate(),
                    i = (this.maxTranslate() - s) * t + s;
                this.translateTo(i, void 0 === e ? 0 : e), this.updateActiveIndex(), this.updateSlidesClasses();
            }
            emitContainerClasses() {
                const t = this;
                if (!t.params._emitClasses || !t.el) return;
                const e = t.el.className.split(" ").filter((e) => 0 === e.indexOf("swiper") || 0 === e.indexOf(t.params.containerModifierClass));
                t.emit("_containerClasses", e.join(" "));
            }
            getSlideClasses(t) {
                const e = this;
                return e.destroyed
                    ? ""
                    : t.className
                          .split(" ")
                          .filter((t) => 0 === t.indexOf("swiper-slide") || 0 === t.indexOf(e.params.slideClass))
                          .join(" ");
            }
            emitSlidesClasses() {
                const t = this;
                if (!t.params._emitClasses || !t.el) return;
                const e = [];
                t.slides.each((s) => {
                    const i = t.getSlideClasses(s);
                    e.push({ slideEl: s, classNames: i }), t.emit("_slideClass", s, i);
                }),
                    t.emit("_slideClasses", e);
            }
            slidesPerViewDynamic(t = "current", e = !1) {
                const { params: s, slides: i, slidesGrid: n, slidesSizesGrid: a, size: o, activeIndex: r } = this;
                let l = 1;
                if (s.centeredSlides) {
                    let t,
                        e = i[r].swiperSlideSize;
                    for (let s = r + 1; s < i.length; s += 1) i[s] && !t && ((e += i[s].swiperSlideSize), (l += 1), e > o && (t = !0));
                    for (let s = r - 1; s >= 0; s -= 1) i[s] && !t && ((e += i[s].swiperSlideSize), (l += 1), e > o && (t = !0));
                } else if ("current" === t)
                    for (let t = r + 1; t < i.length; t += 1) {
                        (e ? n[t] + a[t] - n[r] < o : n[t] - n[r] < o) && (l += 1);
                    }
                else
                    for (let t = r - 1; t >= 0; t -= 1) {
                        n[r] - n[t] < o && (l += 1);
                    }
                return l;
            }
            update() {
                const t = this;
                if (!t || t.destroyed) return;
                const { snapGrid: e, params: s } = t;
                function i() {
                    const e = t.rtlTranslate ? -1 * t.translate : t.translate,
                        s = Math.min(Math.max(e, t.maxTranslate()), t.minTranslate());
                    t.setTranslate(s), t.updateActiveIndex(), t.updateSlidesClasses();
                }
                let n;
                s.breakpoints && t.setBreakpoint(),
                    t.updateSize(),
                    t.updateSlides(),
                    t.updateProgress(),
                    t.updateSlidesClasses(),
                    t.params.freeMode && t.params.freeMode.enabled
                        ? (i(), t.params.autoHeight && t.updateAutoHeight())
                        : ((n = ("auto" === t.params.slidesPerView || t.params.slidesPerView > 1) && t.isEnd && !t.params.centeredSlides ? t.slideTo(t.slides.length - 1, 0, !1, !0) : t.slideTo(t.activeIndex, 0, !1, !0)), n || i()),
                    s.watchOverflow && e !== t.snapGrid && t.checkOverflow(),
                    t.emit("update");
            }
            changeDirection(t, e = !0) {
                const s = this,
                    i = s.params.direction;
                return (
                    t || (t = "horizontal" === i ? "vertical" : "horizontal"),
                    t === i ||
                        ("horizontal" !== t && "vertical" !== t) ||
                        (s.$el.removeClass(`${s.params.containerModifierClass}${i}`).addClass(`${s.params.containerModifierClass}${t}`),
                        s.emitContainerClasses(),
                        (s.params.direction = t),
                        s.slides.each((e) => {
                            "vertical" === t ? (e.style.width = "") : (e.style.height = "");
                        }),
                        s.emit("changeDirection"),
                        e && s.update()),
                    s
                );
            }
            changeLanguageDirection(t) {
                const e = this;
                (e.rtl && "rtl" === t) ||
                    (!e.rtl && "ltr" === t) ||
                    ((e.rtl = "rtl" === t),
                    (e.rtlTranslate = "horizontal" === e.params.direction && e.rtl),
                    e.rtl ? (e.$el.addClass(e.params.containerModifierClass + "rtl"), (e.el.dir = "rtl")) : (e.$el.removeClass(e.params.containerModifierClass + "rtl"), (e.el.dir = "ltr")),
                    e.update());
            }
            mount(t) {
                const e = this;
                if (e.mounted) return !0;
                const s = Q(t || e.params.el);
                if (!(t = s[0])) return !1;
                t.swiper = e;
                const i = () => "." + (e.params.wrapperClass || "").trim().split(" ").join(".");
                let n = (() => {
                    if (t && t.shadowRoot && t.shadowRoot.querySelector) {
                        const e = Q(t.shadowRoot.querySelector(i()));
                        return (e.children = (t) => s.children(t)), e;
                    }
                    return s.children ? s.children(i()) : Q(s).children(i());
                })();
                if (0 === n.length && e.params.createElements) {
                    const t = j().createElement("div");
                    (n = Q(t)),
                        (t.className = e.params.wrapperClass),
                        s.append(t),
                        s.children("." + e.params.slideClass).each((t) => {
                            n.append(t);
                        });
                }
                return (
                    Object.assign(e, {
                        $el: s,
                        el: t,
                        $wrapperEl: n,
                        wrapperEl: n[0],
                        mounted: !0,
                        rtl: "rtl" === t.dir.toLowerCase() || "rtl" === s.css("direction"),
                        rtlTranslate: "horizontal" === e.params.direction && ("rtl" === t.dir.toLowerCase() || "rtl" === s.css("direction")),
                        wrongRTL: "-webkit-box" === n.css("display"),
                    }),
                    !0
                );
            }
            init(t) {
                const e = this;
                if (e.initialized) return e;
                return (
                    !1 === e.mount(t) ||
                        (e.emit("beforeInit"),
                        e.params.breakpoints && e.setBreakpoint(),
                        e.addClasses(),
                        e.params.loop && e.loopCreate(),
                        e.updateSize(),
                        e.updateSlides(),
                        e.params.watchOverflow && e.checkOverflow(),
                        e.params.grabCursor && e.enabled && e.setGrabCursor(),
                        e.params.preloadImages && e.preloadImages(),
                        e.params.loop ? e.slideTo(e.params.initialSlide + e.loopedSlides, 0, e.params.runCallbacksOnInit, !1, !0) : e.slideTo(e.params.initialSlide, 0, e.params.runCallbacksOnInit, !1, !0),
                        e.attachEvents(),
                        (e.initialized = !0),
                        e.emit("init"),
                        e.emit("afterInit")),
                    e
                );
            }
            destroy(t = !0, e = !0) {
                const s = this,
                    { params: i, $el: n, $wrapperEl: a, slides: o } = s;
                return (
                    void 0 === s.params ||
                        s.destroyed ||
                        (s.emit("beforeDestroy"),
                        (s.initialized = !1),
                        s.detachEvents(),
                        i.loop && s.loopDestroy(),
                        e &&
                            (s.removeClasses(),
                            n.removeAttr("style"),
                            a.removeAttr("style"),
                            o && o.length && o.removeClass([i.slideVisibleClass, i.slideActiveClass, i.slideNextClass, i.slidePrevClass].join(" ")).removeAttr("style").removeAttr("data-swiper-slide-index")),
                        s.emit("destroy"),
                        Object.keys(s.eventsListeners).forEach((t) => {
                            s.off(t);
                        }),
                        !1 !== t &&
                            ((s.$el[0].swiper = null),
                            (function (t) {
                                const e = t;
                                Object.keys(e).forEach((t) => {
                                    try {
                                        e[t] = null;
                                    } catch (t) {}
                                    try {
                                        delete e[t];
                                    } catch (t) {}
                                });
                            })(s)),
                        (s.destroyed = !0)),
                    null
                );
            }
            static extendDefaults(t) {
                nt(Tt, t);
            }
            static get extendedDefaults() {
                return Tt;
            }
            static get defaults() {
                return St;
            }
            static installModule(t) {
                At.prototype.__modules__ || (At.prototype.__modules__ = []);
                const e = At.prototype.__modules__;
                "function" == typeof t && e.indexOf(t) < 0 && e.push(t);
            }
            static use(t) {
                return Array.isArray(t) ? (t.forEach((t) => At.installModule(t)), At) : (At.installModule(t), At);
            }
        }
        Object.keys(_t).forEach((t) => {
            Object.keys(_t[t]).forEach((e) => {
                At.prototype[e] = _t[t][e];
            });
        }),
            At.use([
                function ({ swiper: t, on: e, emit: s }) {
                    const i = G();
                    let n = null,
                        a = null;
                    const o = () => {
                            t && !t.destroyed && t.initialized && (s("beforeResize"), s("resize"));
                        },
                        r = () => {
                            t && !t.destroyed && t.initialized && s("orientationchange");
                        };
                    e("init", () => {
                        t.params.resizeObserver && void 0 !== i.ResizeObserver
                            ? t &&
                              !t.destroyed &&
                              t.initialized &&
                              ((n = new ResizeObserver((e) => {
                                  a = i.requestAnimationFrame(() => {
                                      const { width: s, height: i } = t;
                                      let n = s,
                                          a = i;
                                      e.forEach(({ contentBoxSize: e, contentRect: s, target: i }) => {
                                          (i && i !== t.el) || ((n = s ? s.width : (e[0] || e).inlineSize), (a = s ? s.height : (e[0] || e).blockSize));
                                      }),
                                          (n === s && a === i) || o();
                                  });
                              })),
                              n.observe(t.el))
                            : (i.addEventListener("resize", o), i.addEventListener("orientationchange", r));
                    }),
                        e("destroy", () => {
                            a && i.cancelAnimationFrame(a), n && n.unobserve && t.el && (n.unobserve(t.el), (n = null)), i.removeEventListener("resize", o), i.removeEventListener("orientationchange", r);
                        });
                },
                function ({ swiper: t, extendParams: e, on: s, emit: i }) {
                    const n = [],
                        a = G(),
                        o = (t, e = {}) => {
                            const s = new (a.MutationObserver || a.WebkitMutationObserver)((t) => {
                                if (1 === t.length) return void i("observerUpdate", t[0]);
                                const e = function () {
                                    i("observerUpdate", t[0]);
                                };
                                a.requestAnimationFrame ? a.requestAnimationFrame(e) : a.setTimeout(e, 0);
                            });
                            s.observe(t, { attributes: void 0 === e.attributes || e.attributes, childList: void 0 === e.childList || e.childList, characterData: void 0 === e.characterData || e.characterData }), n.push(s);
                        };
                    e({ observer: !1, observeParents: !1, observeSlideChildren: !1 }),
                        s("init", () => {
                            if (t.params.observer) {
                                if (t.params.observeParents) {
                                    const e = t.$el.parents();
                                    for (let t = 0; t < e.length; t += 1) o(e[t]);
                                }
                                o(t.$el[0], { childList: t.params.observeSlideChildren }), o(t.$wrapperEl[0], { attributes: !1 });
                            }
                        }),
                        s("destroy", () => {
                            n.forEach((t) => {
                                t.disconnect();
                            }),
                                n.splice(0, n.length);
                        });
                },
            ]);
        var Pt = At;
        function Mt(t, e, s, i) {
            const n = j();
            return (
                t.params.createElements &&
                    Object.keys(i).forEach((a) => {
                        if (!s[a] && !0 === s.auto) {
                            let o = t.$el.children("." + i[a])[0];
                            o || ((o = n.createElement("div")), (o.className = i[a]), t.$el.append(o)), (s[a] = o), (e[a] = o);
                        }
                    }),
                s
            );
        }
        function $t({ swiper: t, extendParams: e, on: s, emit: i }) {
            function n(e) {
                let s;
                return e && ((s = Q(e)), t.params.uniqueNavElements && "string" == typeof e && s.length > 1 && 1 === t.$el.find(e).length && (s = t.$el.find(e))), s;
            }
            function a(e, s) {
                const i = t.params.navigation;
                e &&
                    e.length > 0 &&
                    (e[s ? "addClass" : "removeClass"](i.disabledClass), e[0] && "BUTTON" === e[0].tagName && (e[0].disabled = s), t.params.watchOverflow && t.enabled && e[t.isLocked ? "addClass" : "removeClass"](i.lockClass));
            }
            function o() {
                if (t.params.loop) return;
                const { $nextEl: e, $prevEl: s } = t.navigation;
                a(s, t.isBeginning && !t.params.rewind), a(e, t.isEnd && !t.params.rewind);
            }
            function r(e) {
                e.preventDefault(), (!t.isBeginning || t.params.loop || t.params.rewind) && (t.slidePrev(), i("navigationPrev"));
            }
            function l(e) {
                e.preventDefault(), (!t.isEnd || t.params.loop || t.params.rewind) && (t.slideNext(), i("navigationNext"));
            }
            function h() {
                const e = t.params.navigation;
                if (((t.params.navigation = Mt(t, t.originalParams.navigation, t.params.navigation, { nextEl: "swiper-button-next", prevEl: "swiper-button-prev" })), !e.nextEl && !e.prevEl)) return;
                const s = n(e.nextEl),
                    i = n(e.prevEl);
                s && s.length > 0 && s.on("click", l),
                    i && i.length > 0 && i.on("click", r),
                    Object.assign(t.navigation, { $nextEl: s, nextEl: s && s[0], $prevEl: i, prevEl: i && i[0] }),
                    t.enabled || (s && s.addClass(e.lockClass), i && i.addClass(e.lockClass));
            }
            function d() {
                const { $nextEl: e, $prevEl: s } = t.navigation;
                e && e.length && (e.off("click", l), e.removeClass(t.params.navigation.disabledClass)), s && s.length && (s.off("click", r), s.removeClass(t.params.navigation.disabledClass));
            }
            e({
                navigation: {
                    nextEl: null,
                    prevEl: null,
                    hideOnClick: !1,
                    disabledClass: "swiper-button-disabled",
                    hiddenClass: "swiper-button-hidden",
                    lockClass: "swiper-button-lock",
                    navigationDisabledClass: "swiper-navigation-disabled",
                },
            }),
                (t.navigation = { nextEl: null, $nextEl: null, prevEl: null, $prevEl: null }),
                s("init", () => {
                    !1 === t.params.navigation.enabled ? c() : (h(), o());
                }),
                s("toEdge fromEdge lock unlock", () => {
                    o();
                }),
                s("destroy", () => {
                    d();
                }),
                s("enable disable", () => {
                    const { $nextEl: e, $prevEl: s } = t.navigation;
                    e && e[t.enabled ? "removeClass" : "addClass"](t.params.navigation.lockClass), s && s[t.enabled ? "removeClass" : "addClass"](t.params.navigation.lockClass);
                }),
                s("click", (e, s) => {
                    const { $nextEl: n, $prevEl: a } = t.navigation,
                        o = s.target;
                    if (t.params.navigation.hideOnClick && !Q(o).is(a) && !Q(o).is(n)) {
                        if (t.pagination && t.params.pagination && t.params.pagination.clickable && (t.pagination.el === o || t.pagination.el.contains(o))) return;
                        let e;
                        n ? (e = n.hasClass(t.params.navigation.hiddenClass)) : a && (e = a.hasClass(t.params.navigation.hiddenClass)),
                            i(!0 === e ? "navigationShow" : "navigationHide"),
                            n && n.toggleClass(t.params.navigation.hiddenClass),
                            a && a.toggleClass(t.params.navigation.hiddenClass);
                    }
                });
            const c = () => {
                t.$el.addClass(t.params.navigation.navigationDisabledClass), d();
            };
            Object.assign(t.navigation, {
                enable: () => {
                    t.$el.removeClass(t.params.navigation.navigationDisabledClass), h(), o();
                },
                disable: c,
                update: o,
                init: h,
                destroy: d,
            });
        }
        function Lt(t = "") {
            return (
                "." +
                t
                    .trim()
                    .replace(/([\.:!\/])/g, "\\$1")
                    .replace(/ /g, ".")
            );
        }
        function Ft(t) {
            return "string" == typeof t || t instanceof String;
        }
        function It(t) {
            var e;
            return "object" == typeof t && null != t && "Object" === (null == t || null == (e = t.constructor) ? void 0 : e.name);
        }
        function Dt(t, e) {
            return Array.isArray(e)
                ? Dt(t, (t, s) => e.includes(s))
                : Object.entries(t).reduce((t, s) => {
                      let [i, n] = s;
                      return e(n, i) && (t[i] = n), t;
                  }, {});
        }
        const Bt = "NONE",
            Ot = "LEFT",
            zt = "FORCE_LEFT",
            Vt = "RIGHT",
            Rt = "FORCE_RIGHT";
        function Nt(t) {
            return t.replace(/([.*+?^=!:${}()|[\]/\\])/g, "\\$1");
        }
        function Ht(t, e) {
            if (e === t) return !0;
            const s = Array.isArray(e),
                i = Array.isArray(t);
            let n;
            if (s && i) {
                if (e.length != t.length) return !1;
                for (n = 0; n < e.length; n++) if (!Ht(e[n], t[n])) return !1;
                return !0;
            }
            if (s != i) return !1;
            if (e && t && "object" == typeof e && "object" == typeof t) {
                const s = e instanceof Date,
                    i = t instanceof Date;
                if (s && i) return e.getTime() == t.getTime();
                if (s != i) return !1;
                const a = e instanceof RegExp,
                    o = t instanceof RegExp;
                if (a && o) return e.toString() == t.toString();
                if (a != o) return !1;
                const r = Object.keys(e);
                for (n = 0; n < r.length; n++) if (!Object.prototype.hasOwnProperty.call(t, r[n])) return !1;
                for (n = 0; n < r.length; n++) if (!Ht(t[r[n]], e[r[n]])) return !1;
                return !0;
            }
            return !(!e || !t || "function" != typeof e || "function" != typeof t) && e.toString() === t.toString();
        }
        class jt {
            constructor(t) {
                for (Object.assign(this, t); this.value.slice(0, this.startChangePos) !== this.oldValue.slice(0, this.startChangePos); ) --this.oldSelection.start;
                if (this.insertedCount)
                    for (; this.value.slice(this.cursorPos) !== this.oldValue.slice(this.oldSelection.end); ) this.value.length - this.cursorPos < this.oldValue.length - this.oldSelection.end ? ++this.oldSelection.end : ++this.cursorPos;
            }
            get startChangePos() {
                return Math.min(this.cursorPos, this.oldSelection.start);
            }
            get insertedCount() {
                return this.cursorPos - this.startChangePos;
            }
            get inserted() {
                return this.value.substr(this.startChangePos, this.insertedCount);
            }
            get removedCount() {
                return Math.max(this.oldSelection.end - this.startChangePos || this.oldValue.length - this.value.length, 0);
            }
            get removed() {
                return this.oldValue.substr(this.startChangePos, this.removedCount);
            }
            get head() {
                return this.value.substring(0, this.startChangePos);
            }
            get tail() {
                return this.value.substring(this.startChangePos + this.insertedCount);
            }
            get removeDirection() {
                return !this.removedCount || this.insertedCount ? Bt : (this.oldSelection.end !== this.cursorPos && this.oldSelection.start !== this.cursorPos) || this.oldSelection.end !== this.oldSelection.start ? Ot : Vt;
            }
        }
        function Wt(t, e) {
            return new Wt.InputMask(t, e);
        }
        function Gt(t) {
            if (null == t) throw new Error("mask property should be defined");
            return t instanceof RegExp
                ? Wt.MaskedRegExp
                : Ft(t)
                ? Wt.MaskedPattern
                : t === Date
                ? Wt.MaskedDate
                : t === Number
                ? Wt.MaskedNumber
                : Array.isArray(t) || t === Array
                ? Wt.MaskedDynamic
                : Wt.Masked && t.prototype instanceof Wt.Masked
                ? t
                : Wt.Masked && t instanceof Wt.Masked
                ? t.constructor
                : t instanceof Function
                ? Wt.MaskedFunction
                : (console.warn("Mask not found for mask", t), Wt.Masked);
        }
        function qt(t) {
            if (!t) throw new Error("Options in not defined");
            if (Wt.Masked) {
                if (t.prototype instanceof Wt.Masked) return { mask: t };
                const { mask: e, ...s } = t instanceof Wt.Masked ? { mask: t } : It(t) && t.mask instanceof Wt.Masked ? t : {};
                if (e) {
                    const t = e.mask;
                    return { ...Dt(e, (t, e) => !e.startsWith("_")), mask: e.constructor, _mask: t, ...s };
                }
            }
            return It(t) ? { ...t } : { mask: t };
        }
        function Ut(t) {
            if (Wt.Masked && t instanceof Wt.Masked) return t;
            const e = qt(t),
                s = Gt(e.mask);
            if (!s) throw new Error("Masked class is not found for provided mask " + e.mask + ", appropriate module needs to be imported manually before creating mask.");
            return e.mask === s && delete e.mask, e._mask && ((e.mask = e._mask), delete e._mask), new s(e);
        }
        Wt.createMask = Ut;
        class Xt {
            get selectionStart() {
                let t;
                try {
                    t = this._unsafeSelectionStart;
                } catch {}
                return null != t ? t : this.value.length;
            }
            get selectionEnd() {
                let t;
                try {
                    t = this._unsafeSelectionEnd;
                } catch {}
                return null != t ? t : this.value.length;
            }
            select(t, e) {
                if (null != t && null != e && (t !== this.selectionStart || e !== this.selectionEnd))
                    try {
                        this._unsafeSelect(t, e);
                    } catch {}
            }
            get isActive() {
                return !1;
            }
        }
        Wt.MaskElement = Xt;
        class Yt extends Xt {
            constructor(t) {
                super(),
                    (this.input = t),
                    (this._onKeydown = this._onKeydown.bind(this)),
                    (this._onInput = this._onInput.bind(this)),
                    (this._onBeforeinput = this._onBeforeinput.bind(this)),
                    (this._onCompositionEnd = this._onCompositionEnd.bind(this));
            }
            get rootElement() {
                var t, e, s;
                return null != (t = null == (e = (s = this.input).getRootNode) ? void 0 : e.call(s)) ? t : document;
            }
            get isActive() {
                return this.input === this.rootElement.activeElement;
            }
            bindEvents(t) {
                this.input.addEventListener("keydown", this._onKeydown),
                    this.input.addEventListener("input", this._onInput),
                    this.input.addEventListener("beforeinput", this._onBeforeinput),
                    this.input.addEventListener("compositionend", this._onCompositionEnd),
                    this.input.addEventListener("drop", t.drop),
                    this.input.addEventListener("click", t.click),
                    this.input.addEventListener("focus", t.focus),
                    this.input.addEventListener("blur", t.commit),
                    (this._handlers = t);
            }
            _onKeydown(t) {
                return this._handlers.redo && ((90 === t.keyCode && t.shiftKey && (t.metaKey || t.ctrlKey)) || (89 === t.keyCode && t.ctrlKey))
                    ? (t.preventDefault(), this._handlers.redo(t))
                    : this._handlers.undo && 90 === t.keyCode && (t.metaKey || t.ctrlKey)
                    ? (t.preventDefault(), this._handlers.undo(t))
                    : void (t.isComposing || this._handlers.selectionChange(t));
            }
            _onBeforeinput(t) {
                return "historyUndo" === t.inputType && this._handlers.undo ? (t.preventDefault(), this._handlers.undo(t)) : "historyRedo" === t.inputType && this._handlers.redo ? (t.preventDefault(), this._handlers.redo(t)) : void 0;
            }
            _onCompositionEnd(t) {
                this._handlers.input(t);
            }
            _onInput(t) {
                t.isComposing || this._handlers.input(t);
            }
            unbindEvents() {
                this.input.removeEventListener("keydown", this._onKeydown),
                    this.input.removeEventListener("input", this._onInput),
                    this.input.removeEventListener("beforeinput", this._onBeforeinput),
                    this.input.removeEventListener("compositionend", this._onCompositionEnd),
                    this.input.removeEventListener("drop", this._handlers.drop),
                    this.input.removeEventListener("click", this._handlers.click),
                    this.input.removeEventListener("focus", this._handlers.focus),
                    this.input.removeEventListener("blur", this._handlers.commit),
                    (this._handlers = {});
            }
        }
        Wt.HTMLMaskElement = Yt;
        class Kt extends Yt {
            constructor(t) {
                super(t), (this.input = t);
            }
            get _unsafeSelectionStart() {
                return null != this.input.selectionStart ? this.input.selectionStart : this.value.length;
            }
            get _unsafeSelectionEnd() {
                return this.input.selectionEnd;
            }
            _unsafeSelect(t, e) {
                this.input.setSelectionRange(t, e);
            }
            get value() {
                return this.input.value;
            }
            set value(t) {
                this.input.value = t;
            }
        }
        Wt.HTMLMaskElement = Yt;
        class Zt extends Yt {
            get _unsafeSelectionStart() {
                const t = this.rootElement,
                    e = t.getSelection && t.getSelection(),
                    s = e && e.anchorOffset,
                    i = e && e.focusOffset;
                return null == i || null == s || s < i ? s : i;
            }
            get _unsafeSelectionEnd() {
                const t = this.rootElement,
                    e = t.getSelection && t.getSelection(),
                    s = e && e.anchorOffset,
                    i = e && e.focusOffset;
                return null == i || null == s || s > i ? s : i;
            }
            _unsafeSelect(t, e) {
                if (!this.rootElement.createRange) return;
                const s = this.rootElement.createRange();
                s.setStart(this.input.firstChild || this.input, t), s.setEnd(this.input.lastChild || this.input, e);
                const i = this.rootElement,
                    n = i.getSelection && i.getSelection();
                n && (n.removeAllRanges(), n.addRange(s));
            }
            get value() {
                return this.input.textContent || "";
            }
            set value(t) {
                this.input.textContent = t;
            }
        }
        Wt.HTMLContenteditableMaskElement = Zt;
        class Jt {
            constructor() {
                (this.states = []), (this.currentIndex = 0);
            }
            get currentState() {
                return this.states[this.currentIndex];
            }
            get isEmpty() {
                return 0 === this.states.length;
            }
            push(t) {
                this.currentIndex < this.states.length - 1 && (this.states.length = this.currentIndex + 1), this.states.push(t), this.states.length > Jt.MAX_LENGTH && this.states.shift(), (this.currentIndex = this.states.length - 1);
            }
            go(t) {
                return (this.currentIndex = Math.min(Math.max(this.currentIndex + t, 0), this.states.length - 1)), this.currentState;
            }
            undo() {
                return this.go(-1);
            }
            redo() {
                return this.go(1);
            }
            clear() {
                (this.states.length = 0), (this.currentIndex = 0);
            }
        }
        Jt.MAX_LENGTH = 100;
        Wt.InputMask = class {
            constructor(t, e) {
                (this.el = t instanceof Xt ? t : t.isContentEditable && "INPUT" !== t.tagName && "TEXTAREA" !== t.tagName ? new Zt(t) : new Kt(t)),
                    (this.masked = Ut(e)),
                    (this._listeners = {}),
                    (this._value = ""),
                    (this._unmaskedValue = ""),
                    (this._rawInputValue = ""),
                    (this.history = new Jt()),
                    (this._saveSelection = this._saveSelection.bind(this)),
                    (this._onInput = this._onInput.bind(this)),
                    (this._onChange = this._onChange.bind(this)),
                    (this._onDrop = this._onDrop.bind(this)),
                    (this._onFocus = this._onFocus.bind(this)),
                    (this._onClick = this._onClick.bind(this)),
                    (this._onUndo = this._onUndo.bind(this)),
                    (this._onRedo = this._onRedo.bind(this)),
                    (this.alignCursor = this.alignCursor.bind(this)),
                    (this.alignCursorFriendly = this.alignCursorFriendly.bind(this)),
                    this._bindEvents(),
                    this.updateValue(),
                    this._onChange();
            }
            maskEquals(t) {
                var e;
                return null == t || (null == (e = this.masked) ? void 0 : e.maskEquals(t));
            }
            get mask() {
                return this.masked.mask;
            }
            set mask(t) {
                if (this.maskEquals(t)) return;
                if (!(t instanceof Wt.Masked) && this.masked.constructor === Gt(t)) return void this.masked.updateOptions({ mask: t });
                const e = t instanceof Wt.Masked ? t : Ut({ mask: t });
                (e.unmaskedValue = this.masked.unmaskedValue), (this.masked = e);
            }
            get value() {
                return this._value;
            }
            set value(t) {
                this.value !== t && ((this.masked.value = t), this.updateControl("auto"));
            }
            get unmaskedValue() {
                return this._unmaskedValue;
            }
            set unmaskedValue(t) {
                this.unmaskedValue !== t && ((this.masked.unmaskedValue = t), this.updateControl("auto"));
            }
            get rawInputValue() {
                return this._rawInputValue;
            }
            set rawInputValue(t) {
                this.rawInputValue !== t && ((this.masked.rawInputValue = t), this.updateControl(), this.alignCursor());
            }
            get typedValue() {
                return this.masked.typedValue;
            }
            set typedValue(t) {
                this.masked.typedValueEquals(t) || ((this.masked.typedValue = t), this.updateControl("auto"));
            }
            get displayValue() {
                return this.masked.displayValue;
            }
            _bindEvents() {
                this.el.bindEvents({ selectionChange: this._saveSelection, input: this._onInput, drop: this._onDrop, click: this._onClick, focus: this._onFocus, commit: this._onChange, undo: this._onUndo, redo: this._onRedo });
            }
            _unbindEvents() {
                this.el && this.el.unbindEvents();
            }
            _fireEvent(t, e) {
                const s = this._listeners[t];
                s && s.forEach((t) => t(e));
            }
            get selectionStart() {
                return this._cursorChanging ? this._changingCursorPos : this.el.selectionStart;
            }
            get cursorPos() {
                return this._cursorChanging ? this._changingCursorPos : this.el.selectionEnd;
            }
            set cursorPos(t) {
                this.el && this.el.isActive && (this.el.select(t, t), this._saveSelection());
            }
            _saveSelection() {
                this.displayValue !== this.el.value && console.warn("Element value was changed outside of mask. Syncronize mask using `mask.updateValue()` to work properly."),
                    (this._selection = { start: this.selectionStart, end: this.cursorPos });
            }
            updateValue() {
                (this.masked.value = this.el.value), (this._value = this.masked.value), (this._unmaskedValue = this.masked.unmaskedValue), (this._rawInputValue = this.masked.rawInputValue);
            }
            updateControl(t) {
                const e = this.masked.unmaskedValue,
                    s = this.masked.value,
                    i = this.masked.rawInputValue,
                    n = this.displayValue,
                    a = this.unmaskedValue !== e || this.value !== s || this._rawInputValue !== i;
                (this._unmaskedValue = e),
                    (this._value = s),
                    (this._rawInputValue = i),
                    this.el.value !== n && (this.el.value = n),
                    "auto" === t ? this.alignCursor() : null != t && (this.cursorPos = t),
                    a && this._fireChangeEvents(),
                    this._historyChanging || (!a && !this.history.isEmpty) || this.history.push({ unmaskedValue: e, selection: { start: this.selectionStart, end: this.cursorPos } });
            }
            updateOptions(t) {
                const { mask: e, ...s } = t,
                    i = !this.maskEquals(e),
                    n = this.masked.optionsIsChanged(s);
                i && (this.mask = e), n && this.masked.updateOptions(s), (i || n) && this.updateControl();
            }
            updateCursor(t) {
                null != t && ((this.cursorPos = t), this._delayUpdateCursor(t));
            }
            _delayUpdateCursor(t) {
                this._abortUpdateCursor(),
                    (this._changingCursorPos = t),
                    (this._cursorChanging = setTimeout(() => {
                        this.el && ((this.cursorPos = this._changingCursorPos), this._abortUpdateCursor());
                    }, 10));
            }
            _fireChangeEvents() {
                this._fireEvent("accept", this._inputEvent), this.masked.isComplete && this._fireEvent("complete", this._inputEvent);
            }
            _abortUpdateCursor() {
                this._cursorChanging && (clearTimeout(this._cursorChanging), delete this._cursorChanging);
            }
            alignCursor() {
                this.cursorPos = this.masked.nearestInputPos(this.masked.nearestInputPos(this.cursorPos, Ot));
            }
            alignCursorFriendly() {
                this.selectionStart === this.cursorPos && this.alignCursor();
            }
            on(t, e) {
                return this._listeners[t] || (this._listeners[t] = []), this._listeners[t].push(e), this;
            }
            off(t, e) {
                if (!this._listeners[t]) return this;
                if (!e) return delete this._listeners[t], this;
                const s = this._listeners[t].indexOf(e);
                return s >= 0 && this._listeners[t].splice(s, 1), this;
            }
            _onInput(t) {
                (this._inputEvent = t), this._abortUpdateCursor();
                const e = new jt({ value: this.el.value, cursorPos: this.cursorPos, oldValue: this.displayValue, oldSelection: this._selection }),
                    s = this.masked.rawInputValue,
                    i = this.masked.splice(e.startChangePos, e.removed.length, e.inserted, e.removeDirection, { input: !0, raw: !0 }).offset,
                    n = s === this.masked.rawInputValue ? e.removeDirection : Bt;
                let a = this.masked.nearestInputPos(e.startChangePos + i, n);
                n !== Bt && (a = this.masked.nearestInputPos(a, Bt)), this.updateControl(a), delete this._inputEvent;
            }
            _onChange() {
                this.displayValue !== this.el.value && this.updateValue(), this.masked.doCommit(), this.updateControl(), this._saveSelection();
            }
            _onDrop(t) {
                t.preventDefault(), t.stopPropagation();
            }
            _onFocus(t) {
                this.alignCursorFriendly();
            }
            _onClick(t) {
                this.alignCursorFriendly();
            }
            _onUndo() {
                this._applyHistoryState(this.history.undo());
            }
            _onRedo() {
                this._applyHistoryState(this.history.redo());
            }
            _applyHistoryState(t) {
                t && ((this._historyChanging = !0), (this.unmaskedValue = t.unmaskedValue), this.el.select(t.selection.start, t.selection.end), this._saveSelection(), (this._historyChanging = !1));
            }
            destroy() {
                this._unbindEvents(), (this._listeners.length = 0), delete this.el;
            }
        };
        class Qt {
            static normalize(t) {
                return Array.isArray(t) ? t : [t, new Qt()];
            }
            constructor(t) {
                Object.assign(this, { inserted: "", rawInserted: "", tailShift: 0, skip: !1 }, t);
            }
            aggregate(t) {
                return (this.inserted += t.inserted), (this.rawInserted += t.rawInserted), (this.tailShift += t.tailShift), (this.skip = this.skip || t.skip), this;
            }
            get offset() {
                return this.tailShift + this.inserted.length;
            }
            get consumed() {
                return Boolean(this.rawInserted) || this.skip;
            }
            equals(t) {
                return this.inserted === t.inserted && this.tailShift === t.tailShift && this.rawInserted === t.rawInserted && this.skip === t.skip;
            }
        }
        Wt.ChangeDetails = Qt;
        class te {
            constructor(t, e, s) {
                void 0 === t && (t = ""), void 0 === e && (e = 0), (this.value = t), (this.from = e), (this.stop = s);
            }
            toString() {
                return this.value;
            }
            extend(t) {
                this.value += String(t);
            }
            appendTo(t) {
                return t.append(this.toString(), { tail: !0 }).aggregate(t._appendPlaceholder());
            }
            get state() {
                return { value: this.value, from: this.from, stop: this.stop };
            }
            set state(t) {
                Object.assign(this, t);
            }
            unshift(t) {
                if (!this.value.length || (null != t && this.from >= t)) return "";
                const e = this.value[0];
                return (this.value = this.value.slice(1)), e;
            }
            shift() {
                if (!this.value.length) return "";
                const t = this.value[this.value.length - 1];
                return (this.value = this.value.slice(0, -1)), t;
            }
        }
        class ee {
            constructor(t) {
                (this._value = ""), this._update({ ...ee.DEFAULTS, ...t }), (this._initialized = !0);
            }
            updateOptions(t) {
                this.optionsIsChanged(t) && this.withValueRefresh(this._update.bind(this, t));
            }
            _update(t) {
                Object.assign(this, t);
            }
            get state() {
                return { _value: this.value, _rawInputValue: this.rawInputValue };
            }
            set state(t) {
                this._value = t._value;
            }
            reset() {
                this._value = "";
            }
            get value() {
                return this._value;
            }
            set value(t) {
                this.resolve(t, { input: !0 });
            }
            resolve(t, e) {
                void 0 === e && (e = { input: !0 }), this.reset(), this.append(t, e, ""), this.doCommit();
            }
            get unmaskedValue() {
                return this.value;
            }
            set unmaskedValue(t) {
                this.resolve(t, {});
            }
            get typedValue() {
                return this.parse ? this.parse(this.value, this) : this.unmaskedValue;
            }
            set typedValue(t) {
                this.format ? (this.value = this.format(t, this)) : (this.unmaskedValue = String(t));
            }
            get rawInputValue() {
                return this.extractInput(0, this.displayValue.length, { raw: !0 });
            }
            set rawInputValue(t) {
                this.resolve(t, { raw: !0 });
            }
            get displayValue() {
                return this.value;
            }
            get isComplete() {
                return !0;
            }
            get isFilled() {
                return this.isComplete;
            }
            nearestInputPos(t, e) {
                return t;
            }
            totalInputPositions(t, e) {
                return void 0 === t && (t = 0), void 0 === e && (e = this.displayValue.length), Math.min(this.displayValue.length, e - t);
            }
            extractInput(t, e, s) {
                return void 0 === t && (t = 0), void 0 === e && (e = this.displayValue.length), this.displayValue.slice(t, e);
            }
            extractTail(t, e) {
                return void 0 === t && (t = 0), void 0 === e && (e = this.displayValue.length), new te(this.extractInput(t, e), t);
            }
            appendTail(t) {
                return Ft(t) && (t = new te(String(t))), t.appendTo(this);
            }
            _appendCharRaw(t, e) {
                return t ? ((this._value += t), new Qt({ inserted: t, rawInserted: t })) : new Qt();
            }
            _appendChar(t, e, s) {
                void 0 === e && (e = {});
                const i = this.state;
                let n;
                if ((([t, n] = this.doPrepareChar(t, e)), t && ((n = n.aggregate(this._appendCharRaw(t, e))), !n.rawInserted && "pad" === this.autofix))) {
                    const s = this.state;
                    this.state = i;
                    let a = this.pad(e);
                    const o = this._appendCharRaw(t, e);
                    (a = a.aggregate(o)), o.rawInserted || a.equals(n) ? (n = a) : (this.state = s);
                }
                if (n.inserted) {
                    let t,
                        a = !1 !== this.doValidate(e);
                    if (a && null != s) {
                        const e = this.state;
                        if (!0 === this.overwrite) {
                            t = s.state;
                            for (let t = 0; t < n.rawInserted.length; ++t) s.unshift(this.displayValue.length - n.tailShift);
                        }
                        let i = this.appendTail(s);
                        if (((a = i.rawInserted.length === s.toString().length), !((a && i.inserted) || "shift" !== this.overwrite))) {
                            (this.state = e), (t = s.state);
                            for (let t = 0; t < n.rawInserted.length; ++t) s.shift();
                            (i = this.appendTail(s)), (a = i.rawInserted.length === s.toString().length);
                        }
                        a && i.inserted && (this.state = e);
                    }
                    a || ((n = new Qt()), (this.state = i), s && t && (s.state = t));
                }
                return n;
            }
            _appendPlaceholder() {
                return new Qt();
            }
            _appendEager() {
                return new Qt();
            }
            append(t, e, s) {
                if (!Ft(t)) throw new Error("value should be string");
                const i = Ft(s) ? new te(String(s)) : s;
                let n;
                null != e && e.tail && (e._beforeTailState = this.state), ([t, n] = this.doPrepare(t, e));
                for (let s = 0; s < t.length; ++s) {
                    const a = this._appendChar(t[s], e, i);
                    if (!a.rawInserted && !this.doSkipInvalid(t[s], e, i)) break;
                    n.aggregate(a);
                }
                return (!0 === this.eager || "append" === this.eager) && null != e && e.input && t && n.aggregate(this._appendEager()), null != i && (n.tailShift += this.appendTail(i).tailShift), n;
            }
            remove(t, e) {
                return void 0 === t && (t = 0), void 0 === e && (e = this.displayValue.length), (this._value = this.displayValue.slice(0, t) + this.displayValue.slice(e)), new Qt();
            }
            withValueRefresh(t) {
                if (this._refreshing || !this._initialized) return t();
                this._refreshing = !0;
                const e = this.rawInputValue,
                    s = this.value,
                    i = t();
                return (this.rawInputValue = e), this.value && this.value !== s && 0 === s.indexOf(this.value) && (this.append(s.slice(this.displayValue.length), {}, ""), this.doCommit()), delete this._refreshing, i;
            }
            runIsolated(t) {
                if (this._isolated || !this._initialized) return t(this);
                this._isolated = !0;
                const e = this.state,
                    s = t(this);
                return (this.state = e), delete this._isolated, s;
            }
            doSkipInvalid(t, e, s) {
                return Boolean(this.skipInvalid);
            }
            doPrepare(t, e) {
                return void 0 === e && (e = {}), Qt.normalize(this.prepare ? this.prepare(t, this, e) : t);
            }
            doPrepareChar(t, e) {
                return void 0 === e && (e = {}), Qt.normalize(this.prepareChar ? this.prepareChar(t, this, e) : t);
            }
            doValidate(t) {
                return (!this.validate || this.validate(this.value, this, t)) && (!this.parent || this.parent.doValidate(t));
            }
            doCommit() {
                this.commit && this.commit(this.value, this);
            }
            splice(t, e, s, i, n) {
                void 0 === s && (s = ""), void 0 === i && (i = Bt), void 0 === n && (n = { input: !0 });
                const a = t + e,
                    o = this.extractTail(a),
                    r = !0 === this.eager || "remove" === this.eager;
                let l;
                r &&
                    ((i = (function (t) {
                        switch (t) {
                            case Ot:
                                return zt;
                            case Vt:
                                return Rt;
                            default:
                                return t;
                        }
                    })(i)),
                    (l = this.extractInput(0, a, { raw: !0 })));
                let h = t;
                const d = new Qt();
                if ((i !== Bt && ((h = this.nearestInputPos(t, e > 1 && 0 !== t && !r ? Bt : i)), (d.tailShift = h - t)), d.aggregate(this.remove(h)), r && i !== Bt && l === this.rawInputValue))
                    if (i === zt) {
                        let t;
                        for (; l === this.rawInputValue && (t = this.displayValue.length); ) d.aggregate(new Qt({ tailShift: -1 })).aggregate(this.remove(t - 1));
                    } else i === Rt && o.unshift();
                return d.aggregate(this.append(s, n, o));
            }
            maskEquals(t) {
                return this.mask === t;
            }
            optionsIsChanged(t) {
                return !Ht(this, t);
            }
            typedValueEquals(t) {
                const e = this.typedValue;
                return t === e || (ee.EMPTY_VALUES.includes(t) && ee.EMPTY_VALUES.includes(e)) || (!!this.format && this.format(t, this) === this.format(this.typedValue, this));
            }
            pad(t) {
                return new Qt();
            }
        }
        (ee.DEFAULTS = { skipInvalid: !0 }), (ee.EMPTY_VALUES = [void 0, null, ""]), (Wt.Masked = ee);
        class se {
            constructor(t, e) {
                void 0 === t && (t = []), void 0 === e && (e = 0), (this.chunks = t), (this.from = e);
            }
            toString() {
                return this.chunks.map(String).join("");
            }
            extend(t) {
                if (!String(t)) return;
                t = Ft(t) ? new te(String(t)) : t;
                const e = this.chunks[this.chunks.length - 1],
                    s = e && (e.stop === t.stop || null == t.stop) && t.from === e.from + e.toString().length;
                if (t instanceof te) s ? e.extend(t.toString()) : this.chunks.push(t);
                else if (t instanceof se) {
                    if (null == t.stop) {
                        let e;
                        for (; t.chunks.length && null == t.chunks[0].stop; ) (e = t.chunks.shift()), (e.from += t.from), this.extend(e);
                    }
                    t.toString() && ((t.stop = t.blockIndex), this.chunks.push(t));
                }
            }
            appendTo(t) {
                if (!(t instanceof Wt.MaskedPattern)) {
                    return new te(this.toString()).appendTo(t);
                }
                const e = new Qt();
                for (let s = 0; s < this.chunks.length; ++s) {
                    const i = this.chunks[s],
                        n = t._mapPosToBlock(t.displayValue.length),
                        a = i.stop;
                    let o;
                    if ((null != a && (!n || n.index <= a) && ((i instanceof se || t._stops.indexOf(a) >= 0) && e.aggregate(t._appendPlaceholder(a)), (o = i instanceof se && t._blocks[a])), o)) {
                        const s = o.appendTail(i);
                        e.aggregate(s);
                        const n = i.toString().slice(s.rawInserted.length);
                        n && e.aggregate(t.append(n, { tail: !0 }));
                    } else e.aggregate(t.append(i.toString(), { tail: !0 }));
                }
                return e;
            }
            get state() {
                return { chunks: this.chunks.map((t) => t.state), from: this.from, stop: this.stop, blockIndex: this.blockIndex };
            }
            set state(t) {
                const { chunks: e, ...s } = t;
                Object.assign(this, s),
                    (this.chunks = e.map((t) => {
                        const e = "chunks" in t ? new se() : new te();
                        return (e.state = t), e;
                    }));
            }
            unshift(t) {
                if (!this.chunks.length || (null != t && this.from >= t)) return "";
                const e = null != t ? t - this.from : t;
                let s = 0;
                for (; s < this.chunks.length; ) {
                    const t = this.chunks[s],
                        i = t.unshift(e);
                    if (t.toString()) {
                        if (!i) break;
                        ++s;
                    } else this.chunks.splice(s, 1);
                    if (i) return i;
                }
                return "";
            }
            shift() {
                if (!this.chunks.length) return "";
                let t = this.chunks.length - 1;
                for (; 0 <= t; ) {
                    const e = this.chunks[t],
                        s = e.shift();
                    if (e.toString()) {
                        if (!s) break;
                        --t;
                    } else this.chunks.splice(t, 1);
                    if (s) return s;
                }
                return "";
            }
        }
        class ie {
            constructor(t, e) {
                (this.masked = t), (this._log = []);
                const { offset: s, index: i } = t._mapPosToBlock(e) || (e < 0 ? { index: 0, offset: 0 } : { index: this.masked._blocks.length, offset: 0 });
                (this.offset = s), (this.index = i), (this.ok = !1);
            }
            get block() {
                return this.masked._blocks[this.index];
            }
            get pos() {
                return this.masked._blockStartPos(this.index) + this.offset;
            }
            get state() {
                return { index: this.index, offset: this.offset, ok: this.ok };
            }
            set state(t) {
                Object.assign(this, t);
            }
            pushState() {
                this._log.push(this.state);
            }
            popState() {
                const t = this._log.pop();
                return t && (this.state = t), t;
            }
            bindBlock() {
                this.block || (this.index < 0 && ((this.index = 0), (this.offset = 0)), this.index >= this.masked._blocks.length && ((this.index = this.masked._blocks.length - 1), (this.offset = this.block.displayValue.length)));
            }
            _pushLeft(t) {
                for (this.pushState(), this.bindBlock(); 0 <= this.index; --this.index, this.offset = (null == (e = this.block) ? void 0 : e.displayValue.length) || 0) {
                    var e;
                    if (t()) return (this.ok = !0);
                }
                return (this.ok = !1);
            }
            _pushRight(t) {
                for (this.pushState(), this.bindBlock(); this.index < this.masked._blocks.length; ++this.index, this.offset = 0) if (t()) return (this.ok = !0);
                return (this.ok = !1);
            }
            pushLeftBeforeFilled() {
                return this._pushLeft(() => {
                    if (!this.block.isFixed && this.block.value) return (this.offset = this.block.nearestInputPos(this.offset, zt)), 0 !== this.offset || void 0;
                });
            }
            pushLeftBeforeInput() {
                return this._pushLeft(() => {
                    if (!this.block.isFixed) return (this.offset = this.block.nearestInputPos(this.offset, Ot)), !0;
                });
            }
            pushLeftBeforeRequired() {
                return this._pushLeft(() => {
                    if (!(this.block.isFixed || (this.block.isOptional && !this.block.value))) return (this.offset = this.block.nearestInputPos(this.offset, Ot)), !0;
                });
            }
            pushRightBeforeFilled() {
                return this._pushRight(() => {
                    if (!this.block.isFixed && this.block.value) return (this.offset = this.block.nearestInputPos(this.offset, Rt)), this.offset !== this.block.value.length || void 0;
                });
            }
            pushRightBeforeInput() {
                return this._pushRight(() => {
                    if (!this.block.isFixed) return (this.offset = this.block.nearestInputPos(this.offset, Bt)), !0;
                });
            }
            pushRightBeforeRequired() {
                return this._pushRight(() => {
                    if (!(this.block.isFixed || (this.block.isOptional && !this.block.value))) return (this.offset = this.block.nearestInputPos(this.offset, Bt)), !0;
                });
            }
        }
        class ne {
            constructor(t) {
                Object.assign(this, t), (this._value = ""), (this.isFixed = !0);
            }
            get value() {
                return this._value;
            }
            get unmaskedValue() {
                return this.isUnmasking ? this.value : "";
            }
            get rawInputValue() {
                return this._isRawInput ? this.value : "";
            }
            get displayValue() {
                return this.value;
            }
            reset() {
                (this._isRawInput = !1), (this._value = "");
            }
            remove(t, e) {
                return void 0 === t && (t = 0), void 0 === e && (e = this._value.length), (this._value = this._value.slice(0, t) + this._value.slice(e)), this._value || (this._isRawInput = !1), new Qt();
            }
            nearestInputPos(t, e) {
                void 0 === e && (e = Bt);
                const s = this._value.length;
                switch (e) {
                    case Ot:
                    case zt:
                        return 0;
                    case Bt:
                    case Vt:
                    case Rt:
                    default:
                        return s;
                }
            }
            totalInputPositions(t, e) {
                return void 0 === t && (t = 0), void 0 === e && (e = this._value.length), this._isRawInput ? e - t : 0;
            }
            extractInput(t, e, s) {
                return void 0 === t && (t = 0), void 0 === e && (e = this._value.length), void 0 === s && (s = {}), (s.raw && this._isRawInput && this._value.slice(t, e)) || "";
            }
            get isComplete() {
                return !0;
            }
            get isFilled() {
                return Boolean(this._value);
            }
            _appendChar(t, e) {
                if ((void 0 === e && (e = {}), this.isFilled)) return new Qt();
                const s = !0 === this.eager || "append" === this.eager,
                    i = this.char === t && (this.isUnmasking || e.input || e.raw) && (!e.raw || !s) && !e.tail,
                    n = new Qt({ inserted: this.char, rawInserted: i ? this.char : "" });
                return (this._value = this.char), (this._isRawInput = i && (e.raw || e.input)), n;
            }
            _appendEager() {
                return this._appendChar(this.char, { tail: !0 });
            }
            _appendPlaceholder() {
                const t = new Qt();
                return this.isFilled || (this._value = t.inserted = this.char), t;
            }
            extractTail() {
                return new te("");
            }
            appendTail(t) {
                return Ft(t) && (t = new te(String(t))), t.appendTo(this);
            }
            append(t, e, s) {
                const i = this._appendChar(t[0], e);
                return null != s && (i.tailShift += this.appendTail(s).tailShift), i;
            }
            doCommit() {}
            get state() {
                return { _value: this._value, _rawInputValue: this.rawInputValue };
            }
            set state(t) {
                (this._value = t._value), (this._isRawInput = Boolean(t._rawInputValue));
            }
            pad(t) {
                return this._appendPlaceholder();
            }
        }
        class ae {
            constructor(t) {
                const { parent: e, isOptional: s, placeholderChar: i, displayChar: n, lazy: a, eager: o, ...r } = t;
                (this.masked = Ut(r)), Object.assign(this, { parent: e, isOptional: s, placeholderChar: i, displayChar: n, lazy: a, eager: o });
            }
            reset() {
                (this.isFilled = !1), this.masked.reset();
            }
            remove(t, e) {
                return void 0 === t && (t = 0), void 0 === e && (e = this.value.length), 0 === t && e >= 1 ? ((this.isFilled = !1), this.masked.remove(t, e)) : new Qt();
            }
            get value() {
                return this.masked.value || (this.isFilled && !this.isOptional ? this.placeholderChar : "");
            }
            get unmaskedValue() {
                return this.masked.unmaskedValue;
            }
            get rawInputValue() {
                return this.masked.rawInputValue;
            }
            get displayValue() {
                return (this.masked.value && this.displayChar) || this.value;
            }
            get isComplete() {
                return Boolean(this.masked.value) || this.isOptional;
            }
            _appendChar(t, e) {
                if ((void 0 === e && (e = {}), this.isFilled)) return new Qt();
                const s = this.masked.state;
                let i = this.masked._appendChar(t, this.currentMaskFlags(e));
                return (
                    i.inserted && !1 === this.doValidate(e) && ((i = new Qt()), (this.masked.state = s)),
                    i.inserted || this.isOptional || this.lazy || e.input || (i.inserted = this.placeholderChar),
                    (i.skip = !i.inserted && !this.isOptional),
                    (this.isFilled = Boolean(i.inserted)),
                    i
                );
            }
            append(t, e, s) {
                return this.masked.append(t, this.currentMaskFlags(e), s);
            }
            _appendPlaceholder() {
                return this.isFilled || this.isOptional ? new Qt() : ((this.isFilled = !0), new Qt({ inserted: this.placeholderChar }));
            }
            _appendEager() {
                return new Qt();
            }
            extractTail(t, e) {
                return this.masked.extractTail(t, e);
            }
            appendTail(t) {
                return this.masked.appendTail(t);
            }
            extractInput(t, e, s) {
                return void 0 === t && (t = 0), void 0 === e && (e = this.value.length), this.masked.extractInput(t, e, s);
            }
            nearestInputPos(t, e) {
                void 0 === e && (e = Bt);
                const s = this.value.length,
                    i = Math.min(Math.max(t, 0), s);
                switch (e) {
                    case Ot:
                    case zt:
                        return this.isComplete ? i : 0;
                    case Vt:
                    case Rt:
                        return this.isComplete ? i : s;
                    case Bt:
                    default:
                        return i;
                }
            }
            totalInputPositions(t, e) {
                return void 0 === t && (t = 0), void 0 === e && (e = this.value.length), this.value.slice(t, e).length;
            }
            doValidate(t) {
                return this.masked.doValidate(this.currentMaskFlags(t)) && (!this.parent || this.parent.doValidate(this.currentMaskFlags(t)));
            }
            doCommit() {
                this.masked.doCommit();
            }
            get state() {
                return { _value: this.value, _rawInputValue: this.rawInputValue, masked: this.masked.state, isFilled: this.isFilled };
            }
            set state(t) {
                (this.masked.state = t.masked), (this.isFilled = t.isFilled);
            }
            currentMaskFlags(t) {
                var e;
                return { ...t, _beforeTailState: (null == t || null == (e = t._beforeTailState) ? void 0 : e.masked) || (null == t ? void 0 : t._beforeTailState) };
            }
            pad(t) {
                return new Qt();
            }
        }
        ae.DEFAULT_DEFINITIONS = {
            0: /\d/,
            a: /[\u0041-\u005A\u0061-\u007A\u00AA\u00B5\u00BA\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u0527\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA\u05F0-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u08A0\u08A2-\u08AC\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0977\u0979-\u097F\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C33\u0C35-\u0C39\u0C3D\u0C58\u0C59\u0C60\u0C61\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D60\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F4\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1877\u1880-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191C\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19C1-\u19C7\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2183\u2184\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005\u3006\u3031-\u3035\u303B\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FCC\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA697\uA6A0-\uA6E5\uA717-\uA71F\uA722-\uA788\uA78B-\uA78E\uA790-\uA793\uA7A0-\uA7AA\uA7F8-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA80-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uABC0-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]/,
            "*": /./,
        };
        Wt.MaskedRegExp = class extends ee {
            updateOptions(t) {
                super.updateOptions(t);
            }
            _update(t) {
                const e = t.mask;
                e && (t.validate = (t) => t.search(e) >= 0), super._update(t);
            }
        };
        class oe extends ee {
            constructor(t) {
                super({ ...oe.DEFAULTS, ...t, definitions: Object.assign({}, ae.DEFAULT_DEFINITIONS, null == t ? void 0 : t.definitions) });
            }
            updateOptions(t) {
                super.updateOptions(t);
            }
            _update(t) {
                (t.definitions = Object.assign({}, this.definitions, t.definitions)), super._update(t), this._rebuildMask();
            }
            _rebuildMask() {
                const t = this.definitions;
                (this._blocks = []), (this.exposeBlock = void 0), (this._stops = []), (this._maskedBlocks = {});
                const e = this.mask;
                if (!e || !t) return;
                let s = !1,
                    i = !1;
                for (let n = 0; n < e.length; ++n) {
                    if (this.blocks) {
                        const t = e.slice(n),
                            s = Object.keys(this.blocks).filter((e) => 0 === t.indexOf(e));
                        s.sort((t, e) => e.length - t.length);
                        const i = s[0];
                        if (i) {
                            const { expose: t, repeat: e, ...s } = qt(this.blocks[i]),
                                a = { lazy: this.lazy, eager: this.eager, placeholderChar: this.placeholderChar, displayChar: this.displayChar, overwrite: this.overwrite, autofix: this.autofix, ...s, repeat: e, parent: this },
                                o = null != e ? new Wt.RepeatBlock(a) : Ut(a);
                            o && (this._blocks.push(o), t && (this.exposeBlock = o), this._maskedBlocks[i] || (this._maskedBlocks[i] = []), this._maskedBlocks[i].push(this._blocks.length - 1)), (n += i.length - 1);
                            continue;
                        }
                    }
                    let a = e[n],
                        o = a in t;
                    if (a === oe.STOP_CHAR) {
                        this._stops.push(this._blocks.length);
                        continue;
                    }
                    if ("{" === a || "}" === a) {
                        s = !s;
                        continue;
                    }
                    if ("[" === a || "]" === a) {
                        i = !i;
                        continue;
                    }
                    if (a === oe.ESCAPE_CHAR) {
                        if ((++n, (a = e[n]), !a)) break;
                        o = !1;
                    }
                    const r = o
                        ? new ae({ isOptional: i, lazy: this.lazy, eager: this.eager, placeholderChar: this.placeholderChar, displayChar: this.displayChar, ...qt(t[a]), parent: this })
                        : new ne({ char: a, eager: this.eager, isUnmasking: s });
                    this._blocks.push(r);
                }
            }
            get state() {
                return { ...super.state, _blocks: this._blocks.map((t) => t.state) };
            }
            set state(t) {
                if (!t) return void this.reset();
                const { _blocks: e, ...s } = t;
                this._blocks.forEach((t, s) => (t.state = e[s])), (super.state = s);
            }
            reset() {
                super.reset(), this._blocks.forEach((t) => t.reset());
            }
            get isComplete() {
                return this.exposeBlock ? this.exposeBlock.isComplete : this._blocks.every((t) => t.isComplete);
            }
            get isFilled() {
                return this._blocks.every((t) => t.isFilled);
            }
            get isFixed() {
                return this._blocks.every((t) => t.isFixed);
            }
            get isOptional() {
                return this._blocks.every((t) => t.isOptional);
            }
            doCommit() {
                this._blocks.forEach((t) => t.doCommit()), super.doCommit();
            }
            get unmaskedValue() {
                return this.exposeBlock ? this.exposeBlock.unmaskedValue : this._blocks.reduce((t, e) => t + e.unmaskedValue, "");
            }
            set unmaskedValue(t) {
                if (this.exposeBlock) {
                    const e = this.extractTail(this._blockStartPos(this._blocks.indexOf(this.exposeBlock)) + this.exposeBlock.displayValue.length);
                    (this.exposeBlock.unmaskedValue = t), this.appendTail(e), this.doCommit();
                } else super.unmaskedValue = t;
            }
            get value() {
                return this.exposeBlock ? this.exposeBlock.value : this._blocks.reduce((t, e) => t + e.value, "");
            }
            set value(t) {
                if (this.exposeBlock) {
                    const e = this.extractTail(this._blockStartPos(this._blocks.indexOf(this.exposeBlock)) + this.exposeBlock.displayValue.length);
                    (this.exposeBlock.value = t), this.appendTail(e), this.doCommit();
                } else super.value = t;
            }
            get typedValue() {
                return this.exposeBlock ? this.exposeBlock.typedValue : super.typedValue;
            }
            set typedValue(t) {
                if (this.exposeBlock) {
                    const e = this.extractTail(this._blockStartPos(this._blocks.indexOf(this.exposeBlock)) + this.exposeBlock.displayValue.length);
                    (this.exposeBlock.typedValue = t), this.appendTail(e), this.doCommit();
                } else super.typedValue = t;
            }
            get displayValue() {
                return this._blocks.reduce((t, e) => t + e.displayValue, "");
            }
            appendTail(t) {
                return super.appendTail(t).aggregate(this._appendPlaceholder());
            }
            _appendEager() {
                var t;
                const e = new Qt();
                let s = null == (t = this._mapPosToBlock(this.displayValue.length)) ? void 0 : t.index;
                if (null == s) return e;
                this._blocks[s].isFilled && ++s;
                for (let t = s; t < this._blocks.length; ++t) {
                    const s = this._blocks[t]._appendEager();
                    if (!s.inserted) break;
                    e.aggregate(s);
                }
                return e;
            }
            _appendCharRaw(t, e) {
                void 0 === e && (e = {});
                const s = this._mapPosToBlock(this.displayValue.length),
                    i = new Qt();
                if (!s) return i;
                for (let a, o = s.index; (a = this._blocks[o]); ++o) {
                    var n;
                    const s = a._appendChar(t, { ...e, _beforeTailState: null == (n = e._beforeTailState) || null == (n = n._blocks) ? void 0 : n[o] });
                    if ((i.aggregate(s), s.consumed)) break;
                }
                return i;
            }
            extractTail(t, e) {
                void 0 === t && (t = 0), void 0 === e && (e = this.displayValue.length);
                const s = new se();
                return (
                    t === e ||
                        this._forEachBlocksInRange(t, e, (t, e, i, n) => {
                            const a = t.extractTail(i, n);
                            (a.stop = this._findStopBefore(e)), (a.from = this._blockStartPos(e)), a instanceof se && (a.blockIndex = e), s.extend(a);
                        }),
                    s
                );
            }
            extractInput(t, e, s) {
                if ((void 0 === t && (t = 0), void 0 === e && (e = this.displayValue.length), void 0 === s && (s = {}), t === e)) return "";
                let i = "";
                return (
                    this._forEachBlocksInRange(t, e, (t, e, n, a) => {
                        i += t.extractInput(n, a, s);
                    }),
                    i
                );
            }
            _findStopBefore(t) {
                let e;
                for (let s = 0; s < this._stops.length; ++s) {
                    const i = this._stops[s];
                    if (!(i <= t)) break;
                    e = i;
                }
                return e;
            }
            _appendPlaceholder(t) {
                const e = new Qt();
                if (this.lazy && null == t) return e;
                const s = this._mapPosToBlock(this.displayValue.length);
                if (!s) return e;
                const i = s.index,
                    n = null != t ? t : this._blocks.length;
                return (
                    this._blocks.slice(i, n).forEach((s) => {
                        var i;
                        (s.lazy && null == t) || e.aggregate(s._appendPlaceholder(null == (i = s._blocks) ? void 0 : i.length));
                    }),
                    e
                );
            }
            _mapPosToBlock(t) {
                let e = "";
                for (let s = 0; s < this._blocks.length; ++s) {
                    const i = this._blocks[s],
                        n = e.length;
                    if (((e += i.displayValue), t <= e.length)) return { index: s, offset: t - n };
                }
            }
            _blockStartPos(t) {
                return this._blocks.slice(0, t).reduce((t, e) => t + e.displayValue.length, 0);
            }
            _forEachBlocksInRange(t, e, s) {
                void 0 === e && (e = this.displayValue.length);
                const i = this._mapPosToBlock(t);
                if (i) {
                    const t = this._mapPosToBlock(e),
                        n = t && i.index === t.index,
                        a = i.offset,
                        o = t && n ? t.offset : this._blocks[i.index].displayValue.length;
                    if ((s(this._blocks[i.index], i.index, a, o), t && !n)) {
                        for (let e = i.index + 1; e < t.index; ++e) s(this._blocks[e], e, 0, this._blocks[e].displayValue.length);
                        s(this._blocks[t.index], t.index, 0, t.offset);
                    }
                }
            }
            remove(t, e) {
                void 0 === t && (t = 0), void 0 === e && (e = this.displayValue.length);
                const s = super.remove(t, e);
                return (
                    this._forEachBlocksInRange(t, e, (t, e, i, n) => {
                        s.aggregate(t.remove(i, n));
                    }),
                    s
                );
            }
            nearestInputPos(t, e) {
                if ((void 0 === e && (e = Bt), !this._blocks.length)) return 0;
                const s = new ie(this, t);
                if (e === Bt) return s.pushRightBeforeInput() ? s.pos : (s.popState(), s.pushLeftBeforeInput() ? s.pos : this.displayValue.length);
                if (e === Ot || e === zt) {
                    if (e === Ot) {
                        if ((s.pushRightBeforeFilled(), s.ok && s.pos === t)) return t;
                        s.popState();
                    }
                    if ((s.pushLeftBeforeInput(), s.pushLeftBeforeRequired(), s.pushLeftBeforeFilled(), e === Ot)) {
                        if ((s.pushRightBeforeInput(), s.pushRightBeforeRequired(), s.ok && s.pos <= t)) return s.pos;
                        if ((s.popState(), s.ok && s.pos <= t)) return s.pos;
                        s.popState();
                    }
                    return s.ok ? s.pos : e === zt ? 0 : (s.popState(), s.ok ? s.pos : (s.popState(), s.ok ? s.pos : 0));
                }
                return e === Vt || e === Rt
                    ? (s.pushRightBeforeInput(),
                      s.pushRightBeforeRequired(),
                      s.pushRightBeforeFilled() ? s.pos : e === Rt ? this.displayValue.length : (s.popState(), s.ok ? s.pos : (s.popState(), s.ok ? s.pos : this.nearestInputPos(t, Ot))))
                    : t;
            }
            totalInputPositions(t, e) {
                void 0 === t && (t = 0), void 0 === e && (e = this.displayValue.length);
                let s = 0;
                return (
                    this._forEachBlocksInRange(t, e, (t, e, i, n) => {
                        s += t.totalInputPositions(i, n);
                    }),
                    s
                );
            }
            maskedBlock(t) {
                return this.maskedBlocks(t)[0];
            }
            maskedBlocks(t) {
                const e = this._maskedBlocks[t];
                return e ? e.map((t) => this._blocks[t]) : [];
            }
            pad(t) {
                const e = new Qt();
                return this._forEachBlocksInRange(0, this.displayValue.length, (s) => e.aggregate(s.pad(t))), e;
            }
        }
        (oe.DEFAULTS = { ...ee.DEFAULTS, lazy: !0, placeholderChar: "_" }), (oe.STOP_CHAR = "`"), (oe.ESCAPE_CHAR = "\\"), (oe.InputDefinition = ae), (oe.FixedDefinition = ne), (Wt.MaskedPattern = oe);
        class re extends oe {
            get _matchFrom() {
                return this.maxLength - String(this.from).length;
            }
            constructor(t) {
                super(t);
            }
            updateOptions(t) {
                super.updateOptions(t);
            }
            _update(t) {
                const { to: e = this.to || 0, from: s = this.from || 0, maxLength: i = this.maxLength || 0, autofix: n = this.autofix, ...a } = t;
                (this.to = e), (this.from = s), (this.maxLength = Math.max(String(e).length, i)), (this.autofix = n);
                const o = String(this.from).padStart(this.maxLength, "0"),
                    r = String(this.to).padStart(this.maxLength, "0");
                let l = 0;
                for (; l < r.length && r[l] === o[l]; ) ++l;
                (a.mask = r.slice(0, l).replace(/0/g, "\\0") + "0".repeat(this.maxLength - l)), super._update(a);
            }
            get isComplete() {
                return super.isComplete && Boolean(this.value);
            }
            boundaries(t) {
                let e = "",
                    s = "";
                const [, i, n] = t.match(/^(\D*)(\d*)(\D*)/) || [];
                return n && ((e = "0".repeat(i.length) + n), (s = "9".repeat(i.length) + n)), (e = e.padEnd(this.maxLength, "0")), (s = s.padEnd(this.maxLength, "9")), [e, s];
            }
            doPrepareChar(t, e) {
                let s;
                return void 0 === e && (e = {}), ([t, s] = super.doPrepareChar(t.replace(/\D/g, ""), e)), t || (s.skip = !this.isComplete), [t, s];
            }
            _appendCharRaw(t, e) {
                if ((void 0 === e && (e = {}), !this.autofix || this.value.length + 1 > this.maxLength)) return super._appendCharRaw(t, e);
                const s = String(this.from).padStart(this.maxLength, "0"),
                    i = String(this.to).padStart(this.maxLength, "0"),
                    [n, a] = this.boundaries(this.value + t);
                return Number(a) < this.from
                    ? super._appendCharRaw(s[this.value.length], e)
                    : Number(n) > this.to
                    ? !e.tail && "pad" === this.autofix && this.value.length + 1 < this.maxLength
                        ? super._appendCharRaw(s[this.value.length], e).aggregate(this._appendCharRaw(t, e))
                        : super._appendCharRaw(i[this.value.length], e)
                    : super._appendCharRaw(t, e);
            }
            doValidate(t) {
                const e = this.value;
                if (-1 === e.search(/[^0]/) && e.length <= this._matchFrom) return !0;
                const [s, i] = this.boundaries(e);
                return this.from <= Number(i) && Number(s) <= this.to && super.doValidate(t);
            }
            pad(t) {
                const e = new Qt();
                if (this.value.length === this.maxLength) return e;
                const s = this.value,
                    i = this.maxLength - this.value.length;
                if (i) {
                    this.reset();
                    for (let s = 0; s < i; ++s) e.aggregate(super._appendCharRaw("0", t));
                    s.split("").forEach((t) => this._appendCharRaw(t));
                }
                return e;
            }
        }
        Wt.MaskedRange = re;
        class le extends oe {
            static extractPatternOptions(t) {
                const { mask: e, pattern: s, ...i } = t;
                return { ...i, mask: Ft(e) ? e : s };
            }
            constructor(t) {
                super(le.extractPatternOptions({ ...le.DEFAULTS, ...t }));
            }
            updateOptions(t) {
                super.updateOptions(t);
            }
            _update(t) {
                const { mask: e, pattern: s, blocks: i, ...n } = { ...le.DEFAULTS, ...t },
                    a = Object.assign({}, le.GET_DEFAULT_BLOCKS());
                t.min && (a.Y.from = t.min.getFullYear()),
                    t.max && (a.Y.to = t.max.getFullYear()),
                    t.min && t.max && a.Y.from === a.Y.to && ((a.m.from = t.min.getMonth() + 1), (a.m.to = t.max.getMonth() + 1), a.m.from === a.m.to && ((a.d.from = t.min.getDate()), (a.d.to = t.max.getDate()))),
                    Object.assign(a, this.blocks, i),
                    super._update({ ...n, mask: Ft(e) ? e : s, blocks: a });
            }
            doValidate(t) {
                const e = this.date;
                return super.doValidate(t) && (!this.isComplete || (this.isDateExist(this.value) && null != e && (null == this.min || this.min <= e) && (null == this.max || e <= this.max)));
            }
            isDateExist(t) {
                return this.format(this.parse(t, this), this).indexOf(t) >= 0;
            }
            get date() {
                return this.typedValue;
            }
            set date(t) {
                this.typedValue = t;
            }
            get typedValue() {
                return this.isComplete ? super.typedValue : null;
            }
            set typedValue(t) {
                super.typedValue = t;
            }
            maskEquals(t) {
                return t === Date || super.maskEquals(t);
            }
            optionsIsChanged(t) {
                return super.optionsIsChanged(le.extractPatternOptions(t));
            }
        }
        (le.GET_DEFAULT_BLOCKS = () => ({ d: { mask: re, from: 1, to: 31, maxLength: 2 }, m: { mask: re, from: 1, to: 12, maxLength: 2 }, Y: { mask: re, from: 1900, to: 9999 } })),
            (le.DEFAULTS = {
                ...oe.DEFAULTS,
                mask: Date,
                pattern: "d{.}`m{.}`Y",
                format: (t, e) => {
                    if (!t) return "";
                    return [String(t.getDate()).padStart(2, "0"), String(t.getMonth() + 1).padStart(2, "0"), t.getFullYear()].join(".");
                },
                parse: (t, e) => {
                    const [s, i, n] = t.split(".").map(Number);
                    return new Date(n, i - 1, s);
                },
            }),
            (Wt.MaskedDate = le);
        class he extends ee {
            constructor(t) {
                super({ ...he.DEFAULTS, ...t }), (this.currentMask = void 0);
            }
            updateOptions(t) {
                super.updateOptions(t);
            }
            _update(t) {
                super._update(t),
                    "mask" in t &&
                        ((this.exposeMask = void 0),
                        (this.compiledMasks = Array.isArray(t.mask)
                            ? t.mask.map((t) => {
                                  const { expose: e, ...s } = qt(t),
                                      i = Ut({ overwrite: this._overwrite, eager: this._eager, skipInvalid: this._skipInvalid, ...s });
                                  return e && (this.exposeMask = i), i;
                              })
                            : []));
            }
            _appendCharRaw(t, e) {
                void 0 === e && (e = {});
                const s = this._applyDispatch(t, e);
                return this.currentMask && s.aggregate(this.currentMask._appendChar(t, this.currentMaskFlags(e))), s;
            }
            _applyDispatch(t, e, s) {
                void 0 === t && (t = ""), void 0 === e && (e = {}), void 0 === s && (s = "");
                const i = e.tail && null != e._beforeTailState ? e._beforeTailState._value : this.value,
                    n = this.rawInputValue,
                    a = e.tail && null != e._beforeTailState ? e._beforeTailState._rawInputValue : n,
                    o = n.slice(a.length),
                    r = this.currentMask,
                    l = new Qt(),
                    h = null == r ? void 0 : r.state;
                return (
                    (this.currentMask = this.doDispatch(t, { ...e }, s)),
                    this.currentMask &&
                        (this.currentMask !== r
                            ? (this.currentMask.reset(),
                              a && (this.currentMask.append(a, { raw: !0 }), (l.tailShift = this.currentMask.value.length - i.length)),
                              o && (l.tailShift += this.currentMask.append(o, { raw: !0, tail: !0 }).tailShift))
                            : h && (this.currentMask.state = h)),
                    l
                );
            }
            _appendPlaceholder() {
                const t = this._applyDispatch();
                return this.currentMask && t.aggregate(this.currentMask._appendPlaceholder()), t;
            }
            _appendEager() {
                const t = this._applyDispatch();
                return this.currentMask && t.aggregate(this.currentMask._appendEager()), t;
            }
            appendTail(t) {
                const e = new Qt();
                return t && e.aggregate(this._applyDispatch("", {}, t)), e.aggregate(this.currentMask ? this.currentMask.appendTail(t) : super.appendTail(t));
            }
            currentMaskFlags(t) {
                var e, s;
                return { ...t, _beforeTailState: ((null == (e = t._beforeTailState) ? void 0 : e.currentMaskRef) === this.currentMask && (null == (s = t._beforeTailState) ? void 0 : s.currentMask)) || t._beforeTailState };
            }
            doDispatch(t, e, s) {
                return void 0 === e && (e = {}), void 0 === s && (s = ""), this.dispatch(t, this, e, s);
            }
            doValidate(t) {
                return super.doValidate(t) && (!this.currentMask || this.currentMask.doValidate(this.currentMaskFlags(t)));
            }
            doPrepare(t, e) {
                void 0 === e && (e = {});
                let [s, i] = super.doPrepare(t, e);
                if (this.currentMask) {
                    let t;
                    ([s, t] = super.doPrepare(s, this.currentMaskFlags(e))), (i = i.aggregate(t));
                }
                return [s, i];
            }
            doPrepareChar(t, e) {
                void 0 === e && (e = {});
                let [s, i] = super.doPrepareChar(t, e);
                if (this.currentMask) {
                    let t;
                    ([s, t] = super.doPrepareChar(s, this.currentMaskFlags(e))), (i = i.aggregate(t));
                }
                return [s, i];
            }
            reset() {
                var t;
                null == (t = this.currentMask) || t.reset(), this.compiledMasks.forEach((t) => t.reset());
            }
            get value() {
                return this.exposeMask ? this.exposeMask.value : this.currentMask ? this.currentMask.value : "";
            }
            set value(t) {
                this.exposeMask ? ((this.exposeMask.value = t), (this.currentMask = this.exposeMask), this._applyDispatch()) : (super.value = t);
            }
            get unmaskedValue() {
                return this.exposeMask ? this.exposeMask.unmaskedValue : this.currentMask ? this.currentMask.unmaskedValue : "";
            }
            set unmaskedValue(t) {
                this.exposeMask ? ((this.exposeMask.unmaskedValue = t), (this.currentMask = this.exposeMask), this._applyDispatch()) : (super.unmaskedValue = t);
            }
            get typedValue() {
                return this.exposeMask ? this.exposeMask.typedValue : this.currentMask ? this.currentMask.typedValue : "";
            }
            set typedValue(t) {
                if (this.exposeMask) return (this.exposeMask.typedValue = t), (this.currentMask = this.exposeMask), void this._applyDispatch();
                let e = String(t);
                this.currentMask && ((this.currentMask.typedValue = t), (e = this.currentMask.unmaskedValue)), (this.unmaskedValue = e);
            }
            get displayValue() {
                return this.currentMask ? this.currentMask.displayValue : "";
            }
            get isComplete() {
                var t;
                return Boolean(null == (t = this.currentMask) ? void 0 : t.isComplete);
            }
            get isFilled() {
                var t;
                return Boolean(null == (t = this.currentMask) ? void 0 : t.isFilled);
            }
            remove(t, e) {
                const s = new Qt();
                return this.currentMask && s.aggregate(this.currentMask.remove(t, e)).aggregate(this._applyDispatch()), s;
            }
            get state() {
                var t;
                return { ...super.state, _rawInputValue: this.rawInputValue, compiledMasks: this.compiledMasks.map((t) => t.state), currentMaskRef: this.currentMask, currentMask: null == (t = this.currentMask) ? void 0 : t.state };
            }
            set state(t) {
                const { compiledMasks: e, currentMaskRef: s, currentMask: i, ...n } = t;
                e && this.compiledMasks.forEach((t, s) => (t.state = e[s])), null != s && ((this.currentMask = s), (this.currentMask.state = i)), (super.state = n);
            }
            extractInput(t, e, s) {
                return this.currentMask ? this.currentMask.extractInput(t, e, s) : "";
            }
            extractTail(t, e) {
                return this.currentMask ? this.currentMask.extractTail(t, e) : super.extractTail(t, e);
            }
            doCommit() {
                this.currentMask && this.currentMask.doCommit(), super.doCommit();
            }
            nearestInputPos(t, e) {
                return this.currentMask ? this.currentMask.nearestInputPos(t, e) : super.nearestInputPos(t, e);
            }
            get overwrite() {
                return this.currentMask ? this.currentMask.overwrite : this._overwrite;
            }
            set overwrite(t) {
                this._overwrite = t;
            }
            get eager() {
                return this.currentMask ? this.currentMask.eager : this._eager;
            }
            set eager(t) {
                this._eager = t;
            }
            get skipInvalid() {
                return this.currentMask ? this.currentMask.skipInvalid : this._skipInvalid;
            }
            set skipInvalid(t) {
                this._skipInvalid = t;
            }
            get autofix() {
                return this.currentMask ? this.currentMask.autofix : this._autofix;
            }
            set autofix(t) {
                this._autofix = t;
            }
            maskEquals(t) {
                return Array.isArray(t)
                    ? this.compiledMasks.every((e, s) => {
                          if (!t[s]) return;
                          const { mask: i, ...n } = t[s];
                          return Ht(e, n) && e.maskEquals(i);
                      })
                    : super.maskEquals(t);
            }
            typedValueEquals(t) {
                var e;
                return Boolean(null == (e = this.currentMask) ? void 0 : e.typedValueEquals(t));
            }
        }
        (he.DEFAULTS = {
            ...ee.DEFAULTS,
            dispatch: (t, e, s, i) => {
                if (!e.compiledMasks.length) return;
                const n = e.rawInputValue,
                    a = e.compiledMasks.map((a, o) => {
                        const r = e.currentMask === a,
                            l = r ? a.displayValue.length : a.nearestInputPos(a.displayValue.length, zt);
                        return (
                            a.rawInputValue !== n ? (a.reset(), a.append(n, { raw: !0 })) : r || a.remove(l),
                            a.append(t, e.currentMaskFlags(s)),
                            a.appendTail(i),
                            { index: o, weight: a.rawInputValue.length, totalInputPositions: a.totalInputPositions(0, Math.max(l, a.nearestInputPos(a.displayValue.length, zt))) }
                        );
                    });
                return a.sort((t, e) => e.weight - t.weight || e.totalInputPositions - t.totalInputPositions), e.compiledMasks[a[0].index];
            },
        }),
            (Wt.MaskedDynamic = he);
        class de extends oe {
            constructor(t) {
                super({ ...de.DEFAULTS, ...t });
            }
            updateOptions(t) {
                super.updateOptions(t);
            }
            _update(t) {
                const { enum: e, ...s } = t;
                if (e) {
                    const t = e.map((t) => t.length),
                        i = Math.min(...t),
                        n = Math.max(...t) - i;
                    (s.mask = "*".repeat(i)), n && (s.mask += "[" + "*".repeat(n) + "]"), (this.enum = e);
                }
                super._update(s);
            }
            _appendCharRaw(t, e) {
                void 0 === e && (e = {});
                const s = Math.min(this.nearestInputPos(0, Rt), this.value.length),
                    i = this.enum.filter((e) => this.matchValue(e, this.unmaskedValue + t, s));
                if (i.length) {
                    1 === i.length &&
                        this._forEachBlocksInRange(0, this.value.length, (t, s) => {
                            const n = i[0][s];
                            s >= this.value.length || n === t.value || (t.reset(), t._appendChar(n, e));
                        });
                    const t = super._appendCharRaw(i[0][this.value.length], e);
                    return (
                        1 === i.length &&
                            i[0]
                                .slice(this.unmaskedValue.length)
                                .split("")
                                .forEach((e) => t.aggregate(super._appendCharRaw(e))),
                        t
                    );
                }
                return new Qt({ skip: !this.isComplete });
            }
            extractTail(t, e) {
                return void 0 === t && (t = 0), void 0 === e && (e = this.displayValue.length), new te("", t);
            }
            remove(t, e) {
                if ((void 0 === t && (t = 0), void 0 === e && (e = this.displayValue.length), t === e)) return new Qt();
                const s = Math.min(super.nearestInputPos(0, Rt), this.value.length);
                let i;
                for (i = t; i >= 0; --i) {
                    if (this.enum.filter((t) => this.matchValue(t, this.value.slice(s, i), s)).length > 1) break;
                }
                const n = super.remove(i, e);
                return (n.tailShift += i - t), n;
            }
            get isComplete() {
                return this.enum.indexOf(this.value) >= 0;
            }
        }
        (de.DEFAULTS = { ...oe.DEFAULTS, matchValue: (t, e, s) => t.indexOf(e, s) === s }), (Wt.MaskedEnum = de);
        var ce;
        Wt.MaskedFunction = class extends ee {
            updateOptions(t) {
                super.updateOptions(t);
            }
            _update(t) {
                super._update({ ...t, validate: t.mask });
            }
        };
        class ue extends ee {
            constructor(t) {
                super({ ...ue.DEFAULTS, ...t });
            }
            updateOptions(t) {
                super.updateOptions(t);
            }
            _update(t) {
                super._update(t), this._updateRegExps();
            }
            _updateRegExps() {
                const t = "^" + (this.allowNegative ? "[+|\\-]?" : ""),
                    e = (this.scale ? "(" + Nt(this.radix) + "\\d{0," + this.scale + "})?" : "") + "$";
                (this._numberRegExp = new RegExp(t + "\\d*" + e)), (this._mapToRadixRegExp = new RegExp("[" + this.mapToRadix.map(Nt).join("") + "]", "g")), (this._thousandsSeparatorRegExp = new RegExp(Nt(this.thousandsSeparator), "g"));
            }
            _removeThousandsSeparators(t) {
                return t.replace(this._thousandsSeparatorRegExp, "");
            }
            _insertThousandsSeparators(t) {
                const e = t.split(this.radix);
                return (e[0] = e[0].replace(/\B(?=(\d{3})+(?!\d))/g, this.thousandsSeparator)), e.join(this.radix);
            }
            doPrepareChar(t, e) {
                void 0 === e && (e = {});
                const [s, i] = super.doPrepareChar(this._removeThousandsSeparators(this.scale && this.mapToRadix.length && ((e.input && e.raw) || (!e.input && !e.raw)) ? t.replace(this._mapToRadixRegExp, this.radix) : t), e);
                return t && !s && (i.skip = !0), !s || this.allowPositive || this.value || "-" === s || i.aggregate(this._appendChar("-")), [s, i];
            }
            _separatorsCount(t, e) {
                void 0 === e && (e = !1);
                let s = 0;
                for (let i = 0; i < t; ++i) this._value.indexOf(this.thousandsSeparator, i) === i && (++s, e && (t += this.thousandsSeparator.length));
                return s;
            }
            _separatorsCountFromSlice(t) {
                return void 0 === t && (t = this._value), this._separatorsCount(this._removeThousandsSeparators(t).length, !0);
            }
            extractInput(t, e, s) {
                return void 0 === t && (t = 0), void 0 === e && (e = this.displayValue.length), ([t, e] = this._adjustRangeWithSeparators(t, e)), this._removeThousandsSeparators(super.extractInput(t, e, s));
            }
            _appendCharRaw(t, e) {
                void 0 === e && (e = {});
                const s = e.tail && e._beforeTailState ? e._beforeTailState._value : this._value,
                    i = this._separatorsCountFromSlice(s);
                this._value = this._removeThousandsSeparators(this.value);
                const n = this._value;
                this._value += t;
                const a = this.number;
                let o,
                    r = !isNaN(a),
                    l = !1;
                if (r) {
                    let t;
                    null != this.min && this.min < 0 && this.number < this.min && (t = this.min),
                        null != this.max && this.max > 0 && this.number > this.max && (t = this.max),
                        null != t && (this.autofix ? ((this._value = this.format(t, this).replace(ue.UNMASKED_RADIX, this.radix)), l || (l = n === this._value && !e.tail)) : (r = !1)),
                        r && (r = Boolean(this._value.match(this._numberRegExp)));
                }
                r ? (o = new Qt({ inserted: this._value.slice(n.length), rawInserted: l ? "" : t, skip: l })) : ((this._value = n), (o = new Qt())), (this._value = this._insertThousandsSeparators(this._value));
                const h = e.tail && e._beforeTailState ? e._beforeTailState._value : this._value,
                    d = this._separatorsCountFromSlice(h);
                return (o.tailShift += (d - i) * this.thousandsSeparator.length), o;
            }
            _findSeparatorAround(t) {
                if (this.thousandsSeparator) {
                    const e = t - this.thousandsSeparator.length + 1,
                        s = this.value.indexOf(this.thousandsSeparator, e);
                    if (s <= t) return s;
                }
                return -1;
            }
            _adjustRangeWithSeparators(t, e) {
                const s = this._findSeparatorAround(t);
                s >= 0 && (t = s);
                const i = this._findSeparatorAround(e);
                return i >= 0 && (e = i + this.thousandsSeparator.length), [t, e];
            }
            remove(t, e) {
                void 0 === t && (t = 0), void 0 === e && (e = this.displayValue.length), ([t, e] = this._adjustRangeWithSeparators(t, e));
                const s = this.value.slice(0, t),
                    i = this.value.slice(e),
                    n = this._separatorsCount(s.length);
                this._value = this._insertThousandsSeparators(this._removeThousandsSeparators(s + i));
                const a = this._separatorsCountFromSlice(s);
                return new Qt({ tailShift: (a - n) * this.thousandsSeparator.length });
            }
            nearestInputPos(t, e) {
                if (!this.thousandsSeparator) return t;
                switch (e) {
                    case Bt:
                    case Ot:
                    case zt: {
                        const s = this._findSeparatorAround(t - 1);
                        if (s >= 0) {
                            const i = s + this.thousandsSeparator.length;
                            if (t < i || this.value.length <= i || e === zt) return s;
                        }
                        break;
                    }
                    case Vt:
                    case Rt: {
                        const e = this._findSeparatorAround(t);
                        if (e >= 0) return e + this.thousandsSeparator.length;
                    }
                }
                return t;
            }
            doCommit() {
                if (this.value) {
                    const t = this.number;
                    let e = t;
                    null != this.min && (e = Math.max(e, this.min)), null != this.max && (e = Math.min(e, this.max)), e !== t && (this.unmaskedValue = this.format(e, this));
                    let s = this.value;
                    this.normalizeZeros && (s = this._normalizeZeros(s)), this.padFractionalZeros && this.scale > 0 && (s = this._padFractionalZeros(s)), (this._value = s);
                }
                super.doCommit();
            }
            _normalizeZeros(t) {
                const e = this._removeThousandsSeparators(t).split(this.radix);
                return (
                    (e[0] = e[0].replace(/^(\D*)(0*)(\d*)/, (t, e, s, i) => e + i)),
                    t.length && !/\d$/.test(e[0]) && (e[0] = e[0] + "0"),
                    e.length > 1 && ((e[1] = e[1].replace(/0*$/, "")), e[1].length || (e.length = 1)),
                    this._insertThousandsSeparators(e.join(this.radix))
                );
            }
            _padFractionalZeros(t) {
                if (!t) return t;
                const e = t.split(this.radix);
                return e.length < 2 && e.push(""), (e[1] = e[1].padEnd(this.scale, "0")), e.join(this.radix);
            }
            doSkipInvalid(t, e, s) {
                void 0 === e && (e = {});
                const i = 0 === this.scale && t !== this.thousandsSeparator && (t === this.radix || t === ue.UNMASKED_RADIX || this.mapToRadix.includes(t));
                return super.doSkipInvalid(t, e, s) && !i;
            }
            get unmaskedValue() {
                return this._removeThousandsSeparators(this._normalizeZeros(this.value)).replace(this.radix, ue.UNMASKED_RADIX);
            }
            set unmaskedValue(t) {
                super.unmaskedValue = t;
            }
            get typedValue() {
                return this.parse(this.unmaskedValue, this);
            }
            set typedValue(t) {
                this.rawInputValue = this.format(t, this).replace(ue.UNMASKED_RADIX, this.radix);
            }
            get number() {
                return this.typedValue;
            }
            set number(t) {
                this.typedValue = t;
            }
            get allowNegative() {
                return (null != this.min && this.min < 0) || (null != this.max && this.max < 0);
            }
            get allowPositive() {
                return (null != this.min && this.min > 0) || (null != this.max && this.max > 0);
            }
            typedValueEquals(t) {
                return (super.typedValueEquals(t) || (ue.EMPTY_VALUES.includes(t) && ue.EMPTY_VALUES.includes(this.typedValue))) && !(0 === t && "" === this.value);
            }
        }
        (ce = ue),
            (ue.UNMASKED_RADIX = "."),
            (ue.EMPTY_VALUES = [...ee.EMPTY_VALUES, 0]),
            (ue.DEFAULTS = {
                ...ee.DEFAULTS,
                mask: Number,
                radix: ",",
                thousandsSeparator: "",
                mapToRadix: [ce.UNMASKED_RADIX],
                min: Number.MIN_SAFE_INTEGER,
                max: Number.MAX_SAFE_INTEGER,
                scale: 2,
                normalizeZeros: !0,
                padFractionalZeros: !1,
                parse: Number,
                format: (t) => t.toLocaleString("en-US", { useGrouping: !1, maximumFractionDigits: 20 }),
            }),
            (Wt.MaskedNumber = ue);
        const pe = { MASKED: "value", UNMASKED: "unmaskedValue", TYPED: "typedValue" };
        function fe(t, e, s) {
            void 0 === e && (e = pe.MASKED), void 0 === s && (s = pe.MASKED);
            const i = Ut(t);
            return (t) => i.runIsolated((i) => ((i[e] = t), i[s]));
        }
        (Wt.PIPE_TYPE = pe),
            (Wt.createPipe = fe),
            (Wt.pipe = function (t, e, s, i) {
                return fe(e, s, i)(t);
            });
        Wt.RepeatBlock = class extends oe {
            get repeatFrom() {
                var t;
                return null != (t = Array.isArray(this.repeat) ? this.repeat[0] : this.repeat === 1 / 0 ? 0 : this.repeat) ? t : 0;
            }
            get repeatTo() {
                var t;
                return null != (t = Array.isArray(this.repeat) ? this.repeat[1] : this.repeat) ? t : 1 / 0;
            }
            constructor(t) {
                super(t);
            }
            updateOptions(t) {
                super.updateOptions(t);
            }
            _update(t) {
                var e, s, i;
                const { repeat: n, ...a } = qt(t);
                this._blockOpts = Object.assign({}, this._blockOpts, a);
                const o = Ut(this._blockOpts);
                (this.repeat = null != (e = null != (s = null != n ? n : o.repeat) ? s : this.repeat) ? e : 1 / 0),
                    super._update({
                        mask: "m".repeat(Math.max((this.repeatTo === 1 / 0 && (null == (i = this._blocks) ? void 0 : i.length)) || 0, this.repeatFrom)),
                        blocks: { m: o },
                        eager: o.eager,
                        overwrite: o.overwrite,
                        skipInvalid: o.skipInvalid,
                        lazy: o.lazy,
                        placeholderChar: o.placeholderChar,
                        displayChar: o.displayChar,
                    });
            }
            _allocateBlock(t) {
                return t < this._blocks.length
                    ? this._blocks[t]
                    : this.repeatTo === 1 / 0 || this._blocks.length < this.repeatTo
                    ? (this._blocks.push(Ut(this._blockOpts)), (this.mask += "m"), this._blocks[this._blocks.length - 1])
                    : void 0;
            }
            _appendCharRaw(t, e) {
                void 0 === e && (e = {});
                const s = new Qt();
                for (
                    let r, l, h = null != (i = null == (n = this._mapPosToBlock(this.displayValue.length)) ? void 0 : n.index) ? i : Math.max(this._blocks.length - 1, 0);
                    (r = null != (a = this._blocks[h]) ? a : (l = !l && this._allocateBlock(h)));
                    ++h
                ) {
                    var i, n, a, o;
                    const d = r._appendChar(t, { ...e, _beforeTailState: null == (o = e._beforeTailState) || null == (o = o._blocks) ? void 0 : o[h] });
                    if (d.skip && l) {
                        this._blocks.pop(), (this.mask = this.mask.slice(1));
                        break;
                    }
                    if ((s.aggregate(d), d.consumed)) break;
                }
                return s;
            }
            _trimEmptyTail(t, e) {
                var s, i;
                void 0 === t && (t = 0);
                const n = Math.max((null == (s = this._mapPosToBlock(t)) ? void 0 : s.index) || 0, this.repeatFrom, 0);
                let a;
                null != e && (a = null == (i = this._mapPosToBlock(e)) ? void 0 : i.index), null == a && (a = this._blocks.length - 1);
                let o = 0;
                for (let t = a; n <= t && !this._blocks[t].unmaskedValue; --t, ++o);
                o && (this._blocks.splice(a - o + 1, o), (this.mask = this.mask.slice(o)));
            }
            reset() {
                super.reset(), this._trimEmptyTail();
            }
            remove(t, e) {
                void 0 === t && (t = 0), void 0 === e && (e = this.displayValue.length);
                const s = super.remove(t, e);
                return this._trimEmptyTail(t, e), s;
            }
            totalInputPositions(t, e) {
                return void 0 === t && (t = 0), null == e && this.repeatTo === 1 / 0 ? 1 / 0 : super.totalInputPositions(t, e);
            }
            get state() {
                return super.state;
            }
            set state(t) {
                (this._blocks.length = t._blocks.length), (this.mask = this.mask.slice(0, this._blocks.length)), (super.state = t);
            }
        };
        try {
            globalThis.IMask = Wt;
        } catch {}
        V.bind("[data-fancybox]", { animationEffect: "zoom-in-out", slideClass: "modal-close", autoFocus: !1 }), (V.defaults.Hash = !1);
        new Pt(".js-slider-home", {
            modules: [
                function ({ swiper: t, extendParams: e, on: s, emit: i }) {
                    const n = "swiper-pagination";
                    let a;
                    e({
                        pagination: {
                            el: null,
                            bulletElement: "span",
                            clickable: !1,
                            hideOnClick: !1,
                            renderBullet: null,
                            renderProgressbar: null,
                            renderFraction: null,
                            renderCustom: null,
                            progressbarOpposite: !1,
                            type: "bullets",
                            dynamicBullets: !1,
                            dynamicMainBullets: 1,
                            formatFractionCurrent: (t) => t,
                            formatFractionTotal: (t) => t,
                            bulletClass: n + "-bullet",
                            bulletActiveClass: n + "-bullet-active",
                            modifierClass: n + "-",
                            currentClass: n + "-current",
                            totalClass: n + "-total",
                            hiddenClass: n + "-hidden",
                            progressbarFillClass: n + "-progressbar-fill",
                            progressbarOppositeClass: n + "-progressbar-opposite",
                            clickableClass: n + "-clickable",
                            lockClass: n + "-lock",
                            horizontalClass: n + "-horizontal",
                            verticalClass: n + "-vertical",
                            paginationDisabledClass: n + "-disabled",
                        },
                    }),
                        (t.pagination = { el: null, $el: null, bullets: [] });
                    let o = 0;
                    function r() {
                        return !t.params.pagination.el || !t.pagination.el || !t.pagination.$el || 0 === t.pagination.$el.length;
                    }
                    function l(e, s) {
                        const { bulletActiveClass: i } = t.params.pagination;
                        e[s]().addClass(`${i}-${s}`)[s]().addClass(`${i}-${s}-${s}`);
                    }
                    function h() {
                        const e = t.rtl,
                            s = t.params.pagination;
                        if (r()) return;
                        const n = t.virtual && t.params.virtual.enabled ? t.virtual.slides.length : t.slides.length,
                            h = t.pagination.$el;
                        let d;
                        const c = t.params.loop ? Math.ceil((n - 2 * t.loopedSlides) / t.params.slidesPerGroup) : t.snapGrid.length;
                        if (
                            (t.params.loop
                                ? ((d = Math.ceil((t.activeIndex - t.loopedSlides) / t.params.slidesPerGroup)),
                                  d > n - 1 - 2 * t.loopedSlides && (d -= n - 2 * t.loopedSlides),
                                  d > c - 1 && (d -= c),
                                  d < 0 && "bullets" !== t.params.paginationType && (d = c + d))
                                : (d = void 0 !== t.snapIndex ? t.snapIndex : t.activeIndex || 0),
                            "bullets" === s.type && t.pagination.bullets && t.pagination.bullets.length > 0)
                        ) {
                            const i = t.pagination.bullets;
                            let n, r, c;
                            if (
                                (s.dynamicBullets &&
                                    ((a = i.eq(0)[t.isHorizontal() ? "outerWidth" : "outerHeight"](!0)),
                                    h.css(t.isHorizontal() ? "width" : "height", a * (s.dynamicMainBullets + 4) + "px"),
                                    s.dynamicMainBullets > 1 && void 0 !== t.previousIndex && ((o += d - (t.previousIndex - t.loopedSlides || 0)), o > s.dynamicMainBullets - 1 ? (o = s.dynamicMainBullets - 1) : o < 0 && (o = 0)),
                                    (n = Math.max(d - o, 0)),
                                    (r = n + (Math.min(i.length, s.dynamicMainBullets) - 1)),
                                    (c = (r + n) / 2)),
                                i.removeClass(["", "-next", "-next-next", "-prev", "-prev-prev", "-main"].map((t) => `${s.bulletActiveClass}${t}`).join(" ")),
                                h.length > 1)
                            )
                                i.each((t) => {
                                    const e = Q(t),
                                        i = e.index();
                                    i === d && e.addClass(s.bulletActiveClass), s.dynamicBullets && (i >= n && i <= r && e.addClass(s.bulletActiveClass + "-main"), i === n && l(e, "prev"), i === r && l(e, "next"));
                                });
                            else {
                                const e = i.eq(d),
                                    a = e.index();
                                if ((e.addClass(s.bulletActiveClass), s.dynamicBullets)) {
                                    const e = i.eq(n),
                                        o = i.eq(r);
                                    for (let t = n; t <= r; t += 1) i.eq(t).addClass(s.bulletActiveClass + "-main");
                                    if (t.params.loop)
                                        if (a >= i.length) {
                                            for (let t = s.dynamicMainBullets; t >= 0; t -= 1) i.eq(i.length - t).addClass(s.bulletActiveClass + "-main");
                                            i.eq(i.length - s.dynamicMainBullets - 1).addClass(s.bulletActiveClass + "-prev");
                                        } else l(e, "prev"), l(o, "next");
                                    else l(e, "prev"), l(o, "next");
                                }
                            }
                            if (s.dynamicBullets) {
                                const n = Math.min(i.length, s.dynamicMainBullets + 4),
                                    o = (a * n - a) / 2 - c * a,
                                    r = e ? "right" : "left";
                                i.css(t.isHorizontal() ? r : "top", o + "px");
                            }
                        }
                        if (("fraction" === s.type && (h.find(Lt(s.currentClass)).text(s.formatFractionCurrent(d + 1)), h.find(Lt(s.totalClass)).text(s.formatFractionTotal(c))), "progressbar" === s.type)) {
                            let e;
                            e = s.progressbarOpposite ? (t.isHorizontal() ? "vertical" : "horizontal") : t.isHorizontal() ? "horizontal" : "vertical";
                            const i = (d + 1) / c;
                            let n = 1,
                                a = 1;
                            "horizontal" === e ? (n = i) : (a = i), h.find(Lt(s.progressbarFillClass)).transform(`translate3d(0,0,0) scaleX(${n}) scaleY(${a})`).transition(t.params.speed);
                        }
                        "custom" === s.type && s.renderCustom ? (h.html(s.renderCustom(t, d + 1, c)), i("paginationRender", h[0])) : i("paginationUpdate", h[0]),
                            t.params.watchOverflow && t.enabled && h[t.isLocked ? "addClass" : "removeClass"](s.lockClass);
                    }
                    function d() {
                        const e = t.params.pagination;
                        if (r()) return;
                        const s = t.virtual && t.params.virtual.enabled ? t.virtual.slides.length : t.slides.length,
                            n = t.pagination.$el;
                        let a = "";
                        if ("bullets" === e.type) {
                            let i = t.params.loop ? Math.ceil((s - 2 * t.loopedSlides) / t.params.slidesPerGroup) : t.snapGrid.length;
                            t.params.freeMode && t.params.freeMode.enabled && !t.params.loop && i > s && (i = s);
                            for (let s = 0; s < i; s += 1) e.renderBullet ? (a += e.renderBullet.call(t, s, e.bulletClass)) : (a += `<${e.bulletElement} class="${e.bulletClass}"></${e.bulletElement}>`);
                            n.html(a), (t.pagination.bullets = n.find(Lt(e.bulletClass)));
                        }
                        "fraction" === e.type && ((a = e.renderFraction ? e.renderFraction.call(t, e.currentClass, e.totalClass) : `<span class="${e.currentClass}"></span> / <span class="${e.totalClass}"></span>`), n.html(a)),
                            "progressbar" === e.type && ((a = e.renderProgressbar ? e.renderProgressbar.call(t, e.progressbarFillClass) : `<span class="${e.progressbarFillClass}"></span>`), n.html(a)),
                            "custom" !== e.type && i("paginationRender", t.pagination.$el[0]);
                    }
                    function c() {
                        t.params.pagination = Mt(t, t.originalParams.pagination, t.params.pagination, { el: "swiper-pagination" });
                        const e = t.params.pagination;
                        if (!e.el) return;
                        let s = Q(e.el);
                        0 !== s.length &&
                            (t.params.uniqueNavElements && "string" == typeof e.el && s.length > 1 && ((s = t.$el.find(e.el)), s.length > 1 && (s = s.filter((e) => Q(e).parents(".swiper")[0] === t.el))),
                            "bullets" === e.type && e.clickable && s.addClass(e.clickableClass),
                            s.addClass(e.modifierClass + e.type),
                            s.addClass(t.isHorizontal() ? e.horizontalClass : e.verticalClass),
                            "bullets" === e.type && e.dynamicBullets && (s.addClass(`${e.modifierClass}${e.type}-dynamic`), (o = 0), e.dynamicMainBullets < 1 && (e.dynamicMainBullets = 1)),
                            "progressbar" === e.type && e.progressbarOpposite && s.addClass(e.progressbarOppositeClass),
                            e.clickable &&
                                s.on("click", Lt(e.bulletClass), function (e) {
                                    e.preventDefault();
                                    let s = Q(this).index() * t.params.slidesPerGroup;
                                    t.params.loop && (s += t.loopedSlides), t.slideTo(s);
                                }),
                            Object.assign(t.pagination, { $el: s, el: s[0] }),
                            t.enabled || s.addClass(e.lockClass));
                    }
                    function u() {
                        const e = t.params.pagination;
                        if (r()) return;
                        const s = t.pagination.$el;
                        s.removeClass(e.hiddenClass),
                            s.removeClass(e.modifierClass + e.type),
                            s.removeClass(t.isHorizontal() ? e.horizontalClass : e.verticalClass),
                            t.pagination.bullets && t.pagination.bullets.removeClass && t.pagination.bullets.removeClass(e.bulletActiveClass),
                            e.clickable && s.off("click", Lt(e.bulletClass));
                    }
                    s("init", () => {
                        !1 === t.params.pagination.enabled ? p() : (c(), d(), h());
                    }),
                        s("activeIndexChange", () => {
                            (t.params.loop || void 0 === t.snapIndex) && h();
                        }),
                        s("snapIndexChange", () => {
                            t.params.loop || h();
                        }),
                        s("slidesLengthChange", () => {
                            t.params.loop && (d(), h());
                        }),
                        s("snapGridLengthChange", () => {
                            t.params.loop || (d(), h());
                        }),
                        s("destroy", () => {
                            u();
                        }),
                        s("enable disable", () => {
                            const { $el: e } = t.pagination;
                            e && e[t.enabled ? "removeClass" : "addClass"](t.params.pagination.lockClass);
                        }),
                        s("lock unlock", () => {
                            h();
                        }),
                        s("click", (e, s) => {
                            const n = s.target,
                                { $el: a } = t.pagination;
                            if (t.params.pagination.el && t.params.pagination.hideOnClick && a && a.length > 0 && !Q(n).hasClass(t.params.pagination.bulletClass)) {
                                if (t.navigation && ((t.navigation.nextEl && n === t.navigation.nextEl) || (t.navigation.prevEl && n === t.navigation.prevEl))) return;
                                const e = a.hasClass(t.params.pagination.hiddenClass);
                                i(!0 === e ? "paginationShow" : "paginationHide"), a.toggleClass(t.params.pagination.hiddenClass);
                            }
                        });
                    const p = () => {
                        t.$el.addClass(t.params.pagination.paginationDisabledClass), t.pagination.$el && t.pagination.$el.addClass(t.params.pagination.paginationDisabledClass), u();
                    };
                    Object.assign(t.pagination, {
                        enable: () => {
                            t.$el.removeClass(t.params.pagination.paginationDisabledClass), t.pagination.$el && t.pagination.$el.removeClass(t.params.pagination.paginationDisabledClass), c(), d(), h();
                        },
                        disable: p,
                        render: d,
                        update: h,
                        init: c,
                        destroy: u,
                    });
                },
            ],
            slidesPerView: 1,
            roundLengths: !0,
            loop: !0,
            pagination: { el: ".swiper-pagination", clickable: !0 },
        }),
            new Pt(".js-slider-information", {
                modules: [$t],
                slidesPerView: 1.2,
                spaceBetween: 27,
                roundLengths: !0,
                loop: !0,
                breakpoints: {
                    320: { slidesPerView: 1.2, spaceBetween: 27 },
                    480: { slidesPerView: 2, spaceBetween: 40 },
                    768: { slidesPerView: 2, spaceBetween: 40 },
                    1024: { slidesPerView: 2.5, spaceBetween: 40 },
                    1281: { slidesPerView: 4, spaceBetween: 40 },
                },
                navigation: { nextEl: ".information-section__slider .swiper-button-next", prevEl: ".information-section__slider .swiper-button-prev" },
            });
        var ge = new Pt(".gallery-thumbs", {
                modules: [$t],
                centeredSlides: !0,
                centeredSlidesBounds: !0,
                direction: "horizontal",
                spaceBetween: 5,
                slidesPerView: 4,
                freeMode: !1,
                watchSlidesVisibility: !0,
                watchSlidesProgress: !0,
                watchOverflow: !0,
                navigation: { nextEl: ".gallery-thumbs .swiper-button-next", prevEl: ".gallery-thumbs .swiper-button-prev" },
                breakpoints: { 576: { direction: "vertical", slidesPerView: 4 } },
            }),
            me = new Pt(".gallery-big", { direction: "horizontal", keyboard: { enabled: !0 }, thumbs: { swiper: ge } });
        me.on("slideChangeTransitionStart", function () {
            ge.slideTo(me.activeIndex);
        }),
            ge.on("transitionStart", function () {
                me.slideTo(ge.activeIndex);
            });
    },
]);
