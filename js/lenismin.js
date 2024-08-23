!(function (t, e) {
  "object" == typeof exports && "undefined" != typeof module
    ? (module.exports = e())
    : "function" == typeof define && define.amd
    ? define(e)
    : ((t = "undefined" != typeof globalThis ? globalThis : t || self).Lenis =
        e());
})(this, function () {
  "use strict";
  function __classPrivateFieldGet(t, e, i, s) {
    if ("a" === i && !s)
      throw new TypeError("Private accessor was defined without a getter");
    if ("function" == typeof e ? t !== e || !s : !e.has(t))
      throw new TypeError(
        "Cannot read private member from an object whose class did not declare it"
      );
    return "m" === i ? s : "a" === i ? s.call(t) : s ? s.value : e.get(t);
  }
  function __classPrivateFieldSet(t, e, i, s, o) {
    if ("m" === s) throw new TypeError("Private method is not writable");
    if ("a" === s && !o)
      throw new TypeError("Private accessor was defined without a setter");
    if ("function" == typeof e ? t !== e || !o : !e.has(t))
      throw new TypeError(
        "Cannot write private member to an object whose class did not declare it"
      );
    return "a" === s ? o.call(t, i) : o ? (o.value = i) : e.set(t, i), i;
  }
  "function" == typeof SuppressedError && SuppressedError;
  function clamp(t, e, i) {
    return Math.max(t, Math.min(e, i));
  }
  class Animate {
    constructor() {
      (this.isRunning = !1),
        (this.value = 0),
        (this.from = 0),
        (this.to = 0),
        (this.currentTime = 0);
    }
    advance(t) {
      var e;
      if (!this.isRunning) return;
      let i = !1;
      if (this.duration && this.easing) {
        this.currentTime += t;
        const e = clamp(0, this.currentTime / this.duration, 1);
        i = e >= 1;
        const s = i ? 1 : this.easing(e);
        this.value = this.from + (this.to - this.from) * s;
      } else
        this.lerp
          ? ((this.value = (function damp(t, e, i, s) {
              return (function lerp(t, e, i) {
                return (1 - i) * t + i * e;
              })(t, e, 1 - Math.exp(-i * s));
            })(this.value, this.to, 60 * this.lerp, t)),
            Math.round(this.value) === this.to &&
              ((this.value = this.to), (i = !0)))
          : ((this.value = this.to), (i = !0));
      i && this.stop(),
        null === (e = this.onUpdate) ||
          void 0 === e ||
          e.call(this, this.value, i);
    }
    stop() {
      this.isRunning = !1;
    }
    fromTo(
      t,
      e,
      {
        lerp: i = 0.1,
        duration: s = 1,
        easing: o = (t) => t,
        onStart: n,
        onUpdate: r,
      }
    ) {
      (this.from = this.value = t),
        (this.to = e),
        (this.lerp = i),
        (this.duration = s),
        (this.easing = o),
        (this.currentTime = 0),
        (this.isRunning = !0),
        null == n || n(),
        (this.onUpdate = r);
    }
  }
  class Dimensions {
    constructor(t, e, { autoResize: i = !0, debounce: s = 250 } = {}) {
      (this.wrapper = t),
        (this.content = e),
        (this.width = 0),
        (this.height = 0),
        (this.scrollHeight = 0),
        (this.scrollWidth = 0),
        (this.resize = () => {
          this.onWrapperResize(), this.onContentResize();
        }),
        (this.onWrapperResize = () => {
          this.wrapper instanceof Window
            ? ((this.width = window.innerWidth),
              (this.height = window.innerHeight))
            : ((this.width = this.wrapper.clientWidth),
              (this.height = this.wrapper.clientHeight));
        }),
        (this.onContentResize = () => {
          this.wrapper instanceof Window
            ? ((this.scrollHeight = this.content.scrollHeight),
              (this.scrollWidth = this.content.scrollWidth))
            : ((this.scrollHeight = this.wrapper.scrollHeight),
              (this.scrollWidth = this.wrapper.scrollWidth));
        }),
        i &&
          ((this.debouncedResize = (function debounce(t, e) {
            let i;
            return function (...s) {
              let o = this;
              clearTimeout(i),
                (i = setTimeout(() => {
                  (i = void 0), t.apply(o, s);
                }, e));
            };
          })(this.resize, s)),
          this.wrapper instanceof Window
            ? window.addEventListener("resize", this.debouncedResize, !1)
            : ((this.wrapperResizeObserver = new ResizeObserver(
                this.debouncedResize
              )),
              this.wrapperResizeObserver.observe(this.wrapper)),
          (this.contentResizeObserver = new ResizeObserver(
            this.debouncedResize
          )),
          this.contentResizeObserver.observe(this.content)),
        this.resize();
    }
    destroy() {
      var t, e;
      null === (t = this.wrapperResizeObserver) ||
        void 0 === t ||
        t.disconnect(),
        null === (e = this.contentResizeObserver) ||
          void 0 === e ||
          e.disconnect(),
        this.wrapper === window &&
          this.debouncedResize &&
          window.removeEventListener("resize", this.debouncedResize, !1);
    }
    get limit() {
      return {
        x: this.scrollWidth - this.width,
        y: this.scrollHeight - this.height,
      };
    }
  }
  class Emitter {
    constructor() {
      this.events = {};
    }
    emit(t, ...e) {
      var i;
      let s = this.events[t] || [];
      for (let t = 0, o = s.length; t < o; t++)
        null === (i = s[t]) || void 0 === i || i.call(s, ...e);
    }
    on(t, e) {
      var i;
      return (
        (null === (i = this.events[t]) || void 0 === i ? void 0 : i.push(e)) ||
          (this.events[t] = [e]),
        () => {
          var i;
          this.events[t] =
            null === (i = this.events[t]) || void 0 === i
              ? void 0
              : i.filter((t) => e !== t);
        }
      );
    }
    off(t, e) {
      var i;
      this.events[t] =
        null === (i = this.events[t]) || void 0 === i
          ? void 0
          : i.filter((t) => e !== t);
    }
    destroy() {
      this.events = {};
    }
  }
  const t = 100 / 6,
    e = { passive: !1 };
  class VirtualScroll {
    constructor(i, s = { wheelMultiplier: 1, touchMultiplier: 1 }) {
      (this.element = i),
        (this.options = s),
        (this.touchStart = { x: 0, y: 0 }),
        (this.lastDelta = { x: 0, y: 0 }),
        (this.window = { width: 0, height: 0 }),
        (this.emitter = new Emitter()),
        (this.onTouchStart = (t) => {
          const { clientX: e, clientY: i } = t.targetTouches
            ? t.targetTouches[0]
            : t;
          (this.touchStart.x = e),
            (this.touchStart.y = i),
            (this.lastDelta = { x: 0, y: 0 }),
            this.emitter.emit("scroll", { deltaX: 0, deltaY: 0, event: t });
        }),
        (this.onTouchMove = (t) => {
          const { clientX: e, clientY: i } = t.targetTouches
              ? t.targetTouches[0]
              : t,
            s = -(e - this.touchStart.x) * this.options.touchMultiplier,
            o = -(i - this.touchStart.y) * this.options.touchMultiplier;
          (this.touchStart.x = e),
            (this.touchStart.y = i),
            (this.lastDelta = { x: s, y: o }),
            this.emitter.emit("scroll", { deltaX: s, deltaY: o, event: t });
        }),
        (this.onTouchEnd = (t) => {
          this.emitter.emit("scroll", {
            deltaX: this.lastDelta.x,
            deltaY: this.lastDelta.y,
            event: t,
          });
        }),
        (this.onWheel = (e) => {
          let { deltaX: i, deltaY: s, deltaMode: o } = e;
          (i *= 1 === o ? t : 2 === o ? this.window.width : 1),
            (s *= 1 === o ? t : 2 === o ? this.window.height : 1),
            (i *= this.options.wheelMultiplier),
            (s *= this.options.wheelMultiplier),
            this.emitter.emit("scroll", { deltaX: i, deltaY: s, event: e });
        }),
        (this.onWindowResize = () => {
          this.window = {
            width: window.innerWidth,
            height: window.innerHeight,
          };
        }),
        window.addEventListener("resize", this.onWindowResize, !1),
        this.onWindowResize(),
        this.element.addEventListener("wheel", this.onWheel, e),
        this.element.addEventListener("touchstart", this.onTouchStart, e),
        this.element.addEventListener("touchmove", this.onTouchMove, e),
        this.element.addEventListener("touchend", this.onTouchEnd, e);
    }
    on(t, e) {
      return this.emitter.on(t, e);
    }
    destroy() {
      this.emitter.destroy(),
        window.removeEventListener("resize", this.onWindowResize, !1),
        this.element.removeEventListener("wheel", this.onWheel, e),
        this.element.removeEventListener("touchstart", this.onTouchStart, e),
        this.element.removeEventListener("touchmove", this.onTouchMove, e),
        this.element.removeEventListener("touchend", this.onTouchEnd, e);
    }
  }
  var i, s, o, n, r;
  return (
    (i = new WeakMap()),
    (s = new WeakMap()),
    (o = new WeakMap()),
    (n = new WeakMap()),
    (r = new WeakMap()),
    class Lenis {
      constructor({
        wrapper: t = window,
        content: e = document.documentElement,
        eventsTarget: l = t,
        smoothWheel: h = !0,
        syncTouch: a = !1,
        syncTouchLerp: c = 0.075,
        touchInertiaMultiplier: d = 35,
        duration: u,
        easing: p = (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        lerp: m = 0.1,
        infinite: v = !1,
        orientation: w = "vertical",
        gestureOrientation: f = "vertical",
        touchMultiplier: g = 1,
        wheelMultiplier: S = 1,
        autoResize: y = !0,
        prevent: E,
        virtualScroll: _,
        __experimental__naiveDimensions: T = !1,
      } = {}) {
        i.set(this, !1),
          s.set(this, !1),
          o.set(this, !1),
          n.set(this, !1),
          r.set(this, null),
          (this.time = 0),
          (this.userData = {}),
          (this.lastVelocity = 0),
          (this.velocity = 0),
          (this.direction = 0),
          (this.animate = new Animate()),
          (this.emitter = new Emitter()),
          (this.onPointerDown = (t) => {
            1 === t.button && this.reset();
          }),
          (this.onVirtualScroll = (t) => {
            if (
              "function" == typeof this.options.virtualScroll &&
              !1 === this.options.virtualScroll(t)
            )
              return;
            const { deltaX: e, deltaY: i, event: s } = t;
            if (
              (this.emitter.emit("virtual-scroll", {
                deltaX: e,
                deltaY: i,
                event: s,
              }),
              s.ctrlKey)
            )
              return;
            const o = s.type.includes("touch"),
              n = s.type.includes("wheel");
            this.isTouching = "touchstart" === s.type || "touchmove" === s.type;
            if (
              this.options.syncTouch &&
              o &&
              "touchstart" === s.type &&
              !this.isStopped &&
              !this.isLocked
            )
              return void this.reset();
            const r = 0 === e && 0 === i,
              l =
                ("vertical" === this.options.gestureOrientation && 0 === i) ||
                ("horizontal" === this.options.gestureOrientation && 0 === e);
            if (r || l) return;
            let h = s.composedPath();
            h = h.slice(0, h.indexOf(this.rootElement));
            const a = this.options.prevent;
            if (
              h.find((t) => {
                var e, i, s, r, l;
                return (
                  t instanceof HTMLElement &&
                  (("function" == typeof a && (null == a ? void 0 : a(t))) ||
                    (null === (e = t.hasAttribute) || void 0 === e
                      ? void 0
                      : e.call(t, "data-lenis-prevent")) ||
                    (o &&
                      (null === (i = t.hasAttribute) || void 0 === i
                        ? void 0
                        : i.call(t, "data-lenis-prevent-touch"))) ||
                    (n &&
                      (null === (s = t.hasAttribute) || void 0 === s
                        ? void 0
                        : s.call(t, "data-lenis-prevent-wheel"))) ||
                    ((null === (r = t.classList) || void 0 === r
                      ? void 0
                      : r.contains("lenis")) &&
                      !(null === (l = t.classList) || void 0 === l
                        ? void 0
                        : l.contains("lenis-stopped"))))
                );
              })
            )
              return;
            if (this.isStopped || this.isLocked) return void s.preventDefault();
            if (
              !(
                (this.options.syncTouch && o) ||
                (this.options.smoothWheel && n)
              )
            )
              return (this.isScrolling = "native"), void this.animate.stop();
            s.preventDefault();
            let c = i;
            "both" === this.options.gestureOrientation
              ? (c = Math.abs(i) > Math.abs(e) ? i : e)
              : "horizontal" === this.options.gestureOrientation && (c = e);
            const d = o && this.options.syncTouch,
              u = o && "touchend" === s.type && Math.abs(c) > 5;
            u && (c = this.velocity * this.options.touchInertiaMultiplier),
              this.scrollTo(
                this.targetScroll + c,
                Object.assign(
                  { programmatic: !1 },
                  d
                    ? { lerp: u ? this.options.syncTouchLerp : 1 }
                    : {
                        lerp: this.options.lerp,
                        duration: this.options.duration,
                        easing: this.options.easing,
                      }
                )
              );
          }),
          (this.onNativeScroll = () => {
            if (
              (null !== __classPrivateFieldGet(this, r, "f") &&
                (clearTimeout(__classPrivateFieldGet(this, r, "f")),
                __classPrivateFieldSet(this, r, null, "f")),
              __classPrivateFieldGet(this, n, "f"))
            )
              __classPrivateFieldSet(this, n, !1, "f");
            else if (!1 === this.isScrolling || "native" === this.isScrolling) {
              const t = this.animatedScroll;
              (this.animatedScroll = this.targetScroll = this.actualScroll),
                (this.lastVelocity = this.velocity),
                (this.velocity = this.animatedScroll - t),
                (this.direction = Math.sign(this.animatedScroll - t)),
                (this.isScrolling = "native"),
                this.emit(),
                0 !== this.velocity &&
                  __classPrivateFieldSet(
                    this,
                    r,
                    setTimeout(() => {
                      (this.lastVelocity = this.velocity),
                        (this.velocity = 0),
                        (this.isScrolling = !1),
                        this.emit();
                    }, 400),
                    "f"
                  );
            }
          }),
          (window.lenisVersion = "1.1.10"),
          (t && t !== document.documentElement && t !== document.body) ||
            (t = window),
          (this.options = {
            wrapper: t,
            content: e,
            eventsTarget: l,
            smoothWheel: h,
            syncTouch: a,
            syncTouchLerp: c,
            touchInertiaMultiplier: d,
            duration: u,
            easing: p,
            lerp: m,
            infinite: v,
            gestureOrientation: f,
            orientation: w,
            touchMultiplier: g,
            wheelMultiplier: S,
            autoResize: y,
            prevent: E,
            virtualScroll: _,
            __experimental__naiveDimensions: T,
          }),
          (this.dimensions = new Dimensions(t, e, { autoResize: y })),
          this.updateClassName(),
          (this.targetScroll = this.animatedScroll = this.actualScroll),
          this.options.wrapper.addEventListener(
            "scroll",
            this.onNativeScroll,
            !1
          ),
          this.options.wrapper.addEventListener(
            "pointerdown",
            this.onPointerDown,
            !1
          ),
          (this.virtualScroll = new VirtualScroll(l, {
            touchMultiplier: g,
            wheelMultiplier: S,
          })),
          this.virtualScroll.on("scroll", this.onVirtualScroll);
      }
      destroy() {
        this.emitter.destroy(),
          this.options.wrapper.removeEventListener(
            "scroll",
            this.onNativeScroll,
            !1
          ),
          this.options.wrapper.removeEventListener(
            "pointerdown",
            this.onPointerDown,
            !1
          ),
          this.virtualScroll.destroy(),
          this.dimensions.destroy(),
          this.cleanUpClassName();
      }
      on(t, e) {
        return this.emitter.on(t, e);
      }
      off(t, e) {
        return this.emitter.off(t, e);
      }
      setScroll(t) {
        this.isHorizontal
          ? (this.rootElement.scrollLeft = t)
          : (this.rootElement.scrollTop = t);
      }
      resize() {
        this.dimensions.resize();
      }
      emit() {
        this.emitter.emit("scroll", this);
      }
      reset() {
        (this.isLocked = !1),
          (this.isScrolling = !1),
          (this.animatedScroll = this.targetScroll = this.actualScroll),
          (this.lastVelocity = this.velocity = 0),
          this.animate.stop();
      }
      start() {
        this.isStopped && ((this.isStopped = !1), this.reset());
      }
      stop() {
        this.isStopped ||
          ((this.isStopped = !0), this.animate.stop(), this.reset());
      }
      raf(t) {
        const e = t - (this.time || t);
        (this.time = t), this.animate.advance(0.001 * e);
      }
      scrollTo(
        t,
        {
          offset: e = 0,
          immediate: i = !1,
          lock: s = !1,
          duration: o = this.options.duration,
          easing: n = this.options.easing,
          lerp: r = this.options.lerp,
          onStart: l,
          onComplete: h,
          force: a = !1,
          programmatic: c = !0,
          userData: d,
        } = {}
      ) {
        if ((!this.isStopped && !this.isLocked) || a) {
          if ("string" == typeof t && ["top", "left", "start"].includes(t))
            t = 0;
          else if (
            "string" == typeof t &&
            ["bottom", "right", "end"].includes(t)
          )
            t = this.limit;
          else {
            let i;
            if (
              ("string" == typeof t
                ? (i = document.querySelector(t))
                : t instanceof HTMLElement &&
                  (null == t ? void 0 : t.nodeType) &&
                  (i = t),
              i)
            ) {
              if (this.options.wrapper !== window) {
                const t = this.rootElement.getBoundingClientRect();
                e -= this.isHorizontal ? t.left : t.top;
              }
              const s = i.getBoundingClientRect();
              t = (this.isHorizontal ? s.left : s.top) + this.animatedScroll;
            }
          }
          if (
            "number" == typeof t &&
            ((t += e),
            (t = Math.round(t)),
            this.options.infinite
              ? c && (this.targetScroll = this.animatedScroll = this.scroll)
              : (t = clamp(0, t, this.limit)),
            t !== this.targetScroll)
          ) {
            if (((this.userData = null != d ? d : {}), i))
              return (
                (this.animatedScroll = this.targetScroll = t),
                this.setScroll(this.scroll),
                this.reset(),
                this.preventNextNativeScrollEvent(),
                this.emit(),
                null == h || h(this),
                void (this.userData = {})
              );
            c || (this.targetScroll = t),
              this.animate.fromTo(this.animatedScroll, t, {
                duration: o,
                easing: n,
                lerp: r,
                onStart: () => {
                  s && (this.isLocked = !0),
                    (this.isScrolling = "smooth"),
                    null == l || l(this);
                },
                onUpdate: (t, e) => {
                  (this.isScrolling = "smooth"),
                    (this.lastVelocity = this.velocity),
                    (this.velocity = t - this.animatedScroll),
                    (this.direction = Math.sign(this.velocity)),
                    (this.animatedScroll = t),
                    this.setScroll(this.scroll),
                    c && (this.targetScroll = t),
                    e || this.emit(),
                    e &&
                      (this.reset(),
                      this.emit(),
                      null == h || h(this),
                      (this.userData = {}),
                      this.preventNextNativeScrollEvent());
                },
              });
          }
        }
      }
      preventNextNativeScrollEvent() {
        __classPrivateFieldSet(this, n, !0, "f"),
          requestAnimationFrame(() => {
            __classPrivateFieldSet(this, n, !1, "f");
          });
      }
      get rootElement() {
        return this.options.wrapper === window
          ? document.documentElement
          : this.options.wrapper;
      }
      get limit() {
        return this.options.__experimental__naiveDimensions
          ? this.isHorizontal
            ? this.rootElement.scrollWidth - this.rootElement.clientWidth
            : this.rootElement.scrollHeight - this.rootElement.clientHeight
          : this.dimensions.limit[this.isHorizontal ? "x" : "y"];
      }
      get isHorizontal() {
        return "horizontal" === this.options.orientation;
      }
      get actualScroll() {
        return this.isHorizontal
          ? this.rootElement.scrollLeft
          : this.rootElement.scrollTop;
      }
      get scroll() {
        return this.options.infinite
          ? (function modulo(t, e) {
              return ((t % e) + e) % e;
            })(this.animatedScroll, this.limit)
          : this.animatedScroll;
      }
      get progress() {
        return 0 === this.limit ? 1 : this.scroll / this.limit;
      }
      get isScrolling() {
        return __classPrivateFieldGet(this, i, "f");
      }
      set isScrolling(t) {
        __classPrivateFieldGet(this, i, "f") !== t &&
          (__classPrivateFieldSet(this, i, t, "f"), this.updateClassName());
      }
      get isStopped() {
        return __classPrivateFieldGet(this, s, "f");
      }
      set isStopped(t) {
        __classPrivateFieldGet(this, s, "f") !== t &&
          (__classPrivateFieldSet(this, s, t, "f"), this.updateClassName());
      }
      get isLocked() {
        return __classPrivateFieldGet(this, o, "f");
      }
      set isLocked(t) {
        __classPrivateFieldGet(this, o, "f") !== t &&
          (__classPrivateFieldSet(this, o, t, "f"), this.updateClassName());
      }
      get isSmooth() {
        return "smooth" === this.isScrolling;
      }
      get className() {
        let t = "lenis";
        return (
          this.isStopped && (t += " lenis-stopped"),
          this.isLocked && (t += " lenis-locked"),
          this.isScrolling && (t += " lenis-scrolling"),
          "smooth" === this.isScrolling && (t += " lenis-smooth"),
          t
        );
      }
      updateClassName() {
        this.cleanUpClassName(),
          (this.rootElement.className =
            `${this.rootElement.className} ${this.className}`.trim());
      }
      cleanUpClassName() {
        this.rootElement.className = this.rootElement.className
          .replace(/lenis(-\w+)?/g, "")
          .trim();
      }
    }
  );
});
//# sourceMappingURL=lenis.min.js.map
