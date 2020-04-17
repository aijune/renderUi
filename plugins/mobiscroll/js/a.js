(function (n) {
    typeof define == "function" && define.amd ? define(["jquery"], n) : n(jQuery)
})(function (n)
{
    function u(n) {
        return n
    }

    function f(n) {
        return decodeURIComponent(n.replace(r, " "))
    }

    function i(n) {
        n.indexOf('"') === 0 && (n = n.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, "\\"));
        try {
            return t.json ? JSON.parse(n) : n
        } catch (i) {
        }
    }

    var r = /\+/g, t = n.cookie = function (r, e, o) {
        var l, h, s, y;
        if (e !== undefined) return o = n.extend({}, t.defaults, o), typeof o.expires == "number" && (l = o.expires, h = o.expires = new Date, h.setDate(h.getDate() + l)), e = t.json ? JSON.stringify(e) : String(e), document.cookie = [t.raw ? r : encodeURIComponent(r), "=", t.raw ? e : encodeURIComponent(e), o.expires ? "; expires=" + o.expires.toUTCString() : "", o.path ? "; path=" + o.path : "", o.domain ? "; domain=" + o.domain : "", o.secure ? "; secure" : ""].join("");
        var a = t.raw ? u : f, v = document.cookie.split("; "), c = r ? undefined : {};
        for (s = 0, y = v.length; s < y; s++) {
            var p = v[s].split("="), w = a(p.shift()), b = a(p.join("="));
            if (r && r === w) {
                c = i(b);
                break
            }
            r || (c[w] = i(b))
        }
        return c
    };
    t.defaults = {};
    n.removeCookie = function (t, i) {
        return n.cookie(t) !== undefined ? (n.cookie(t, "", n.extend({}, i, {expires: -1})), !0) : !1
    }
});
var angular = angular || {
    module: function () {
        return this
    }, directive: function () {
        return this
    }, animation: function () {
        return this
    }
}, mobiscroll = function (e, g)
{
    "use strict";
    e = e && e.hasOwnProperty("default") ? e.default : e, g = g && g.hasOwnProperty("default") ? g.default : g;
    var na = na || {}, t = {}, Q = {}, s = e.extend, i = {};

    function o(e, a, n) {
        var s = e;
        return "object" == typeof a ? e.each(function () {
            new a.component(this, a)
        }) : ("string" == typeof a && e.each(function () {
            var e, t = na.instances[this.id];
            if (t && t[a] && void 0 !== (e = t[a].apply(this, Array.prototype.slice.call(n, 1)))) return s = e, !1
        }), s)
    }

    function a(t, a, n) {
        i[t] = function (e) {
            return o(this, s(e, {component: a, preset: !1 === n ? void 0 : t}), arguments)
        }
    }

    (na.$ = e).mobiscroll = na, e.fn.mobiscroll = function (e) {
        return s(this, i), o(this, e, arguments)
    };
    var n, r, l, c, m = [], d = "undefined" != typeof window,
        u = d && window.matchMedia && window.matchMedia("(prefers-color-scheme:dark)").matches,
        h = d ? navigator.userAgent : "", f = d ? navigator.platform : "", p = d ? navigator.maxTouchPoints : 0,
        b = /Safari/.test(h), v = h.match(/Android|iPhone|iPad|iPod|Windows Phone|Windows|MSIE/i),
        sa = d && window.requestAnimationFrame || function (e) {
            return setTimeout(e, 20)
        }, ia = d && window.cancelAnimationFrame || function (e) {
            clearTimeout(e)
        };

    function oa() {
    }

    function te(e) {
        var t, a = [];
        for (t in e) a.push(e[t]);
        return a
    }

    function ae(e) {
        var t, a = {};
        if (e) for (t = 0; t < e.length; t++) a[e[t]] = e[t];
        return a
    }

    function ra(e) {
        return 0 <= e - parseFloat(e)
    }

    function de(e) {
        return "string" == typeof e
    }

    function ue(e, t, a) {
        return Math.max(t, Math.min(e, a))
    }

    function ee(e, t) {
        for (e += "", t = t || 2; e.length < t;) e = "0" + e;
        return e
    }

    function la(n, s) {
        var i, o;
        return s = s || 100, function () {
            var e = this, t = +new Date, a = arguments;
            i && t < i + s ? (clearTimeout(o), o = setTimeout(function () {
                i = t, n.apply(e, a)
            }, s)) : (i = t, n.apply(e, a))
        }
    }

    function ca(e) {
        "vibrate" in navigator && navigator.vibrate(e || 50)
    }

    function X(e, t, a) {
        return 100 * (e - t) / (a - t)
    }

    function y(e, t, a) {
        var n = a.attr(e);
        return void 0 === n || "" === n ? t : "true" === n
    }

    /Android/i.test(v) ? (n = "android", (r = h.match(/Android\s+([\d.]+)/i)) && (m = r[0].replace("Android ", "").split("."))) : /iPhone|iPad|iPod/i.test(v) || /iPhone|iPad|iPod/i.test(f) || "MacIntel" === f && 1 < p ? (n = "ios", (r = h.match(/OS\s+([\d_]+)/i)) && (m = r[0].replace(/_/g, ".").replace("OS ", "").split("."))) : /Windows Phone/i.test(v) ? n = "wp" : /Windows|MSIE/i.test(v) && (n = "windows"), l = m[0], c = m[1];
    var x, T = 0;

    function ma() {
        T++, setTimeout(function () {
            T--
        }, 500)
    }

    function _(e, t) {
        if (!t.mbscClick) {
            var a = (e.originalEvent || e).changedTouches[0], n = document.createEvent("MouseEvents");
            n.initMouseEvent("click", !0, !0, window, 1, a.screenX, a.screenY, a.clientX, a.clientY, !1, !1, !1, !1, 0, null), n.isMbscTap = !0, n.isIonicTap = !0, x = !0, t.mbscChange = !0, t.mbscClick = !0, t.dispatchEvent(n), x = !1, ma(), setTimeout(function () {
                delete t.mbscClick
            })
        }
    }

    function da(e, t, a) {
        var n = e.originalEvent || e, s = (a ? "page" : "client") + t;
        return n.targetTouches && n.targetTouches[0] ? n.targetTouches[0][s] : n.changedTouches && n.changedTouches[0] ? n.changedTouches[0][s] : e[s]
    }

    function ua(e) {
        var t = ["switch", "range", "rating", "segmented", "stepper"], a = e[0], n = e.attr("data-role"),
            s = e.attr("type") || a.nodeName.toLowerCase();
        if (/(switch|range|rating|segmented|stepper|select)/.test(n)) s = n; else for (var i = 0; i < t.length; i++) e.is("[mbsc-" + t[i] + "]") && (s = t[i]);
        return s
    }

    function ha(e, t, a) {
        e.focus(), /(button|submit|checkbox|switch|radio)/.test(t) && a.preventDefault(), /select/.test(t) || _(a, e)
    }

    function D(t, e, a, n, s, i) {
        var o, r, l, c, m, d = (0, na.$)(e);
        s = s || 9, t.settings.tap && d.on("touchstart.mbsc", function (e) {
            l || (n && e.preventDefault(), l = this, o = da(e, "X"), r = da(e, "Y"), c = !1, m = new Date)
        }).on("touchcancel.mbsc", function () {
            l = !1
        }).on("touchmove.mbsc", function (e) {
            l && !c && (Math.abs(da(e, "X") - o) > s || Math.abs(da(e, "Y") - r) > s) && (c = !0)
        }).on("touchend.mbsc", function (e) {
            l && (i && new Date - m < 100 || !c ? _(e, e.target) : ma(), l = !1)
        }), d.on("click.mbsc", function (e) {
            n && e.preventDefault(), a.call(this, e, t)
        })
    }

    function w(e) {
        if (T && !x && !e.isMbscTap && ("TEXTAREA" != e.target.nodeName || "mousedown" != e.type)) return e.stopPropagation(), e.preventDefault(), !1
    }

    function at(e, t, a, n, s, i, o) {
        var r = new Date(e, t, a, n || 0, s || 0, i || 0, o || 0);
        return 23 == r.getHours() && 0 === (n || 0) && r.setHours(r.getHours() + 2), r
    }

    function ne(a, e, t) {
        if (!e) return null;

        function s(e) {
            for (var t = 0; o + 1 < a.length && a.charAt(o + 1) == e;) t++, o++;
            return t
        }

        function n(e, t, a) {
            var n = "" + t;
            if (s(e)) for (; n.length < a;) n = "0" + n;
            return n
        }

        function i(e, t, a, n) {
            return s(e) ? n[t] : a[t]
        }

        var o, r, l = ba({}, re, t), c = "", m = !1;
        for (o = 0; o < a.length; o++) if (m) "'" != a.charAt(o) || s("'") ? c += a.charAt(o) : m = !1; else switch (a.charAt(o)) {
            case"d":
                c += n("d", l.getDay(e), 2);
                break;
            case"D":
                c += i("D", e.getDay(), l.dayNamesShort, l.dayNames);
                break;
            case"o":
                c += n("o", (e.getTime() - new Date(e.getFullYear(), 0, 0).getTime()) / 864e5, 3);
                break;
            case"m":
                c += n("m", l.getMonth(e) + 1, 2);
                break;
            case"M":
                c += i("M", l.getMonth(e), l.monthNamesShort, l.monthNames);
                break;
            case"y":
                r = l.getYear(e), c += s("y") ? r : (r % 100 < 10 ? "0" : "") + r % 100;
                break;
            case"h":
                var d = e.getHours();
                c += n("h", 12 < d ? d - 12 : 0 === d ? 12 : d, 2);
                break;
            case"H":
                c += n("H", e.getHours(), 2);
                break;
            case"i":
                c += n("i", e.getMinutes(), 2);
                break;
            case"s":
                c += n("s", e.getSeconds(), 2);
                break;
            case"a":
                c += 11 < e.getHours() ? l.pmText : l.amText;
                break;
            case"A":
                c += 11 < e.getHours() ? l.pmText.toUpperCase() : l.amText.toUpperCase();
                break;
            case"'":
                s("'") ? c += "'" : m = !0;
                break;
            default:
                c += a.charAt(o)
        }
        return c
    }

    function se(a, i, e) {
        var t = ba({}, re, e), n = ot(t.defaultValue || new Date);
        if (!a || !i) return n;
        if (i.getTime) return i;
        i = "object" == typeof i ? i.toString() : i + "";

        function o(e) {
            var t = c + 1 < a.length && a.charAt(c + 1) == e;
            return t && c++, t
        }

        function s(e) {
            o(e);
            var t = new RegExp("^\\d{1," + ("@" == e ? 14 : "!" == e ? 20 : "y" == e ? 4 : "o" == e ? 3 : 2) + "}"),
                a = i.substr(T).match(t);
            return a ? (T += a[0].length, parseInt(a[0], 10)) : 0
        }

        function r(e, t, a) {
            var n, s = o(e) ? a : t;
            for (n = 0; n < s.length; n++) if (i.substr(T, s[n].length).toLowerCase() == s[n].toLowerCase()) return T += s[n].length, n + 1;
            return 0
        }

        function l() {
            T++
        }

        var c, m = t.shortYearCutoff, d = t.getYear(n), u = t.getMonth(n) + 1, h = t.getDay(n), f = -1,
            p = n.getHours(), b = n.getMinutes(), v = 0, g = -1, x = !1, T = 0;
        for (c = 0; c < a.length; c++) if (x) "'" != a.charAt(c) || o("'") ? l() : x = !1; else switch (a.charAt(c)) {
            case"d":
                h = s("d");
                break;
            case"D":
                r("D", t.dayNamesShort, t.dayNames);
                break;
            case"o":
                f = s("o");
                break;
            case"m":
                u = s("m");
                break;
            case"M":
                u = r("M", t.monthNamesShort, t.monthNames);
                break;
            case"y":
                d = s("y");
                break;
            case"H":
                p = s("H");
                break;
            case"h":
                p = s("h");
                break;
            case"i":
                b = s("i");
                break;
            case"s":
                v = s("s");
                break;
            case"a":
                g = r("a", [t.amText, t.pmText], [t.amText, t.pmText]) - 1;
                break;
            case"A":
                g = r("A", [t.amText, t.pmText], [t.amText, t.pmText]) - 1;
                break;
            case"'":
                o("'") ? l() : x = !0;
                break;
            default:
                l()
        }
        if (d < 100 && (d += (new Date).getFullYear() - (new Date).getFullYear() % 100 + (d <= ("string" != typeof m ? m : (new Date).getFullYear() % 100 + parseInt(m, 10)) ? 0 : -100)), -1 < f) {
            u = 1, h = f;
            do {
                var y = 32 - new Date(d, u - 1, 32, 12).getDate();
                y < h && (u++, h -= y)
            } while (y < h)
        }
        p = -1 == g ? p : g && p < 12 ? p + 12 : g || 12 != p ? p : 0;
        var _ = t.getDate(d, u - 1, h, p, b, v);
        return t.getYear(_) != d || t.getMonth(_) + 1 != u || t.getDay(_) != h ? n : _
    }

    function nt(e, t) {
        return Math.round((t - e) / 864e5)
    }

    function st(e) {
        return at(e.getFullYear(), e.getMonth(), e.getDate())
    }

    function it(e) {
        return e.getFullYear() + "-" + (e.getMonth() + 1) + "-" + e.getDate()
    }

    function N(e, t) {
        var a = "", n = "";
        return e && (t.h && (n += ee(e.getHours()) + ":" + ee(e.getMinutes()), t.s && (n += ":" + ee(e.getSeconds())), t.u && (n += "." + ee(e.getMilliseconds(), 3)), t.tz && (n += t.tz)), t.y ? (a += e.getFullYear(), t.m && (a += "-" + ee(e.getMonth() + 1), t.d && (a += "-" + ee(e.getDate())), t.h && (a += "T" + n))) : t.h && (a = n)), a
    }

    function C(e, t, a) {
        var n, s, i = {y: 1, m: 2, d: 3, h: 4, i: 5, s: 6, u: 7, tz: 8};
        if (a) for (n in i) (s = e[i[n] - t]) && (a[n] = "tz" == n ? s : 1)
    }

    function ie(e, t, a) {
        var n = window.moment || t.moment, s = t.returnFormat;
        if (e) {
            if ("moment" == s && n) return n(e);
            if ("locale" == s) return ne(a, e, t);
            if ("iso8601" == s) return N(e, t.isoParts)
        }
        return e
    }

    function ot(e, t, a, n) {
        var s;
        return e ? e.getTime ? e : e.toDate ? e.toDate() : ("string" == typeof e && (e = e.trim()), (s = oe.exec(e)) ? (C(s, 2, n), new Date(1970, 0, 1, s[2] ? +s[2] : 0, s[3] ? +s[3] : 0, s[4] ? +s[4] : 0, s[5] ? +s[5] : 0)) : (s = s || M.exec(e)) ? (C(s, 0, n), new Date(s[1] ? +s[1] : 1970, s[2] ? s[2] - 1 : 0, s[3] ? +s[3] : 1, s[4] ? +s[4] : 0, s[5] ? +s[5] : 0, s[6] ? +s[6] : 0, s[7] ? +s[7] : 0)) : se(t, e, a)) : null
    }

    function rt(e, t) {
        return e.getFullYear() == t.getFullYear() && e.getMonth() == t.getMonth() && e.getDate() == t.getDate()
    }

    d && (["mouseover", "mousedown", "mouseup", "click"].forEach(function (e) {
        document.addEventListener(e, w, !0)
    }), "android" == n && l < 5 && document.addEventListener("change", function (e) {
        T && "checkbox" == e.target.type && !e.target.mbscChange && (e.stopPropagation(), e.preventDefault()), delete e.target.mbscChange
    }, !0));
    var M = /^(\d{4}|[+-]\d{6})(?:-(\d{2})(?:-(\d{2}))?)?(?:T(\d{2}):(\d{2})(?::(\d{2})(?:\.(\d{3}))?)?((Z)|([+-])(\d{2})(?::(\d{2}))?)?)?$/,
        oe = /^((\d{2}):(\d{2})(?::(\d{2})(?:\.(\d{3}))?)?(?:(Z)|([+-])(\d{2})(?::(\d{2}))?)?)?$/,
        lt = /^\d{1,2}(\/\d{1,2})?$/, ct = /^w\d$/i, re = {
            shortYearCutoff: "+10",
            monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
            monthNamesShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            dayNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            dayNamesShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
            dayNamesMin: ["S", "M", "T", "W", "T", "F", "S"],
            amText: "am",
            pmText: "pm",
            getYear: function (e) {
                return e.getFullYear()
            },
            getMonth: function (e) {
                return e.getMonth()
            },
            getDay: function (e) {
                return e.getDate()
            },
            getDate: at,
            getMaxDayOfMonth: function (e, t) {
                return 32 - new Date(e, t, 32, 12).getDate()
            },
            getWeekNumber: function (e) {
                (e = new Date(e)).setHours(0, 0, 0), e.setDate(e.getDate() + 4 - (e.getDay() || 7));
                var t = new Date(e.getFullYear(), 0, 1);
                return Math.ceil(((e - t) / 864e5 + 1) / 7)
            }
        };

    function mt(e) {
        return e[0].innerWidth || e.innerWidth()
    }

    function V(e) {
        var t = e.theme, a = e.themeVariant;
        return "auto" != t && t || (t = E.autoTheme), "default" == t && (t = "mobiscroll"), ("dark" === a || u && "auto" === a) && E.themes.form[t + "-dark"] && (t += "-dark"), t
    }

    function S(a, n, e) {
        d && fa(function () {
            fa(a).each(function () {
                new n(this, {})
            }), fa(document).on("mbsc-enhance", function (e, t) {
                fa(e.target).is(a) ? new n(e.target, t || {}) : fa(a, e.target).each(function () {
                    new n(this, t || {})
                })
            }), e && fa(document).on("mbsc-refresh", function (e) {
                var t;
                fa(e.target).is(a) ? (t = pa[e.target.id]) && t.refresh() : fa(a, e.target).each(function () {
                    (t = pa[this.id]) && t.refresh()
                })
            })
        })
    }

    t.datetime = {formatDate: ne, parseDate: se};
    var A, E, fa = na.$, F = +new Date, pa = {}, k = {}, I = {},
        H = {xsmall: 0, small: 576, medium: 768, large: 992, xlarge: 1200}, ba = fa.extend;
    ba(t, {getCoord: da, preventClick: ma, vibrate: ca}), E = ba(na, {
        $: fa,
        version: "4.10.3",
        autoTheme: "mobiscroll",
        themes: {form: {}, page: {}, frame: {}, scroller: {}, listview: {}, navigation: {}, progress: {}, card: {}},
        platform: {name: n, majorVersion: l, minorVersion: c},
        i18n: {},
        instances: pa,
        classes: k,
        util: t,
        settings: {},
        setDefaults: function (e) {
            ba(this.settings, e)
        },
        customTheme: function (e, t) {
            var a, n = na.themes,
                s = ["frame", "scroller", "listview", "navigation", "form", "page", "progress", "card"];
            for (a = 0; a < s.length; a++) n[s[a]][e] = ba({}, n[s[a]][t], {baseTheme: t})
        }
    });

    function va(f, p) {
        var b, v, g, x, T, y, _, w, C, M = this;
        M.settings = {}, M._getText = new Function("mobiscroll, p", function () {
            var e, t = function (e, t) {
                    var a, n = function (e) {
                        var t, a = e[0];
                        for (t = 0; t < 16; ++t) if (a * t % 16 == 1) return [t, e[1]]
                    }(t), s = function (e, t, a, n) {
                        var s, i = "0123456789abcdef", o = "", r = t.length;
                        for (s = 0; s < r; ++s) o += e ? i[(a * i.indexOf(t[s]) + n) % 16] : i[((a * i.indexOf(t[s]) - a * n) % 16 + 16) % 16];
                        return o
                    }(0, e, n[0], n[1]), i = s.length, o = [];
                    for (a = 0; a < i; a += 2) o.push(s[a] + s[a + 1]);
                    return o
                }("38363537a9aba6a53faf36aba0a062311d11aea8f96b12ac3838346c3f65fb6cfe106b106b656c103367106265fb6ca8a13a6cf665fb106265fb6ca9aba6a53faf36aba0a06c3436aba865fb1062afaba965306c31a534ad3838a136a23f6ca8a13a65fb1062a5ab656b6238a13f386c33a5a2a8ab3362a0abafad38a5aba262ac36a1aa6530306c33a5a2a8ab3362a0abafada01f38ab36ada3a1646a6a64a0abafada01f38ab36ada3a162a9a63faf8d343485a2a53865f736a1383136a26363f739afad38afac6ca1653736a1383136a2646363399e", [9, 4]),
                a = "", n = t.length;
            for (e = 0; e < n; e++) a += String.fromCharCode(parseInt(t[e], 16));
            return a
        }()), M.element = f, M._init = oa, M._destroy = oa, M._processSettings = oa, M._checkResp = function (e) {
            if (M && M._responsive) {
                var t = k(e);
                if (g !== t) return g = t, M.init({}), !0
            }
        }, M._getRespCont = function () {
            return fa(T.context)[0]
        }, M.init = function (e) {
            var t, a;
            for (t in e && M.getVal && (a = M.getVal()), M.settings) delete M.settings[t];
            T = M.settings, ba(p, e), M._hasDef && (C = E.settings), ba(T, M._defaults, C, p), M._hasTheme && (_ = V(T), p.theme = _, y = E.themes[M._class] ? E.themes[M._class][_] : {}), M._hasLang && (b = E.i18n[T.lang]), ba(T, y, b, C, p), x = M._getRespCont(), M._responsive && (g = g || k(), ba(T, g)), M._processSettings(g || {});

            function n(e) {
                return "string" == typeof e ? e : N(ot(e), {y: 1, m: 1, d: 1, h: 1, i: 1, s: 1, u: 1})
            }

            function s() {
                M._init(e), e && M.setVal && M.setVal(a, !0), w("onInit")
            }

            if (!M._class || {
                form: !0,
                page: !0,
                progress: !0,
                switch: !0,
                slider: !0,
                stepper: !0
            }[M._class]) s(); else {
                if (!E.fwv) {
                    var i;
                    switch (E.fw) {
                        case"angular":
                            i = fa("[ng-version]").attr("ng-version");
                            break;
                        case"jquery":
                            i = fa.fn && fa.fn.jquery
                    }
                    E.fwv = i || "N/A"
                }
                var o, r, l = {
                        className: M._class,
                        buttons: M.buttons,
                        platform: E.platform,
                        v: E.version,
                        userAgent: navigator.userAgent,
                        defSortHandle: fa(f).find(T.listSelector || "ul,ol").length ? "left" : "right",
                        settings: {
                            activeClass: T.activeClass,
                            ampmText: T.ampmText,
                            amText: T.amText,
                            animateIcons: T.animateIcons,
                            backText: T.backText,
                            baseTheme: T.baseTheme,
                            buttons: T.buttons,
                            btnClass: T.btnClass,
                            btnWidth: T.btnWidth,
                            btnReverse: T.btnReverse,
                            closeIcon: T.closeIcon,
                            context: "body" == T.context ? "body" : "",
                            controls: T.controls,
                            cssClass: T.cssClass,
                            dateDisplay: T.dateDisplay,
                            dateFormat: T.dateFormat,
                            dateWheels: T.dateWheels,
                            dayNames: T.dayNames,
                            dayNamesShort: T.dayNamesShort,
                            daySuffix: T.daySuffix,
                            display: T.display,
                            dayText: T.dayText,
                            endYear: T.endYear,
                            fixedHeader: T.fixedHeader,
                            handleClass: T.handleClass,
                            handleMarkup: T.handleMarkup,
                            hideText: T.hideText,
                            hourText: T.hourText,
                            itemNode: T.itemNode,
                            itemWidth: T.itemWidth,
                            lang: T.lang,
                            lapIcon: T.lapIcon,
                            lapText: T.lapText,
                            layout: T.layout,
                            leftArrowClass: T.leftArrowClass,
                            max: n(T.max),
                            min: n(T.min),
                            minuteText: T.minuteText,
                            monthNames: T.monthNames,
                            monthNamesShort: T.monthNamesShort,
                            monthSuffix: T.monthSuffix,
                            monthText: T.monthText,
                            nowIcon: T.nowIcon,
                            nowText: T.nowText,
                            pmText: T.pmText,
                            preset: T.preset,
                            resetIcon: T.resetIcon,
                            resetText: T.resetText,
                            rightArrowClass: T.rightArrowClass,
                            rtl: T.rtl,
                            secText: T.secText,
                            select: T.select,
                            showOverlay: T.showOverlay,
                            snap: T.snap,
                            sort: T.sort,
                            sortable: T.sortable,
                            sortHandle: T.sortHandle,
                            startIcon: T.startIcon,
                            startText: T.startText,
                            startYear: T.startYear,
                            stepHour: T.stepHour,
                            stepMinute: T.stepMinute,
                            stepSecond: T.stepSecond,
                            steps: T.steps,
                            stopIcon: T.stopIcon,
                            stopText: T.stopText,
                            striped: T.striped,
                            theme: T.theme,
                            timeFormat: T.timeFormat,
                            timeWheels: T.timeWheels,
                            todayText: T.todayText,
                            type: T.type,
                            variant: T.variant,
                            wrapperClass: T.wrapperClass,
                            yearSuffix: T.yearSuffix,
                            yearText: T.yearText
                        }
                    }, c = [], m = {},
                    d = ["refresh", "redraw", "navigate", "changeTab", "getDate", "setDate", "addEvent", "removeEvent", "getEvents", "setEvents", "setActiveDate", "start", "stop", "reset", "lap", "resetlap", "getTime", "setTime", "getEllapsedTime", "setEllapsedTime"],
                    u = {jsonp: 1, getInst: 1, init: 1, destroy: 1}, h = function (e) {
                        M[e] = function () {
                            c.push({func: e, args: arguments})
                        }
                    };
                for (r in M) "function" != typeof M[r] || u[r] || (m[r] = M[r], h(r));
                for (o = 0; o < d.length; o++) h(d[o]);
                "timer" != T.preset || p.buttons || (l.settings.buttons = ["resetlap", "toggle"], "inline" !== T.display && l.settings.buttons.unshift("hide")), "eventcalendar" != T.preset || p.buttons || "inline" == T.display || (l.settings.buttons = ["close"]), T.zone = T.zone || {
                    run: function (e) {
                        e()
                    }, runOutsideAngular: function (e) {
                        e()
                    }
                }, "mbscdemo" !== E.apiKey && (ba(L, {
                    trialCode: E.apiKey,
                    fw: E.fw + (window.Ionic || window.ionic ? "-ionic" : ""),
                    fwv: E.fwv,
                    demo: !!window.isMbscDemo,
                    theme: T.theme,
                    components: L.components || []
                }), L.components.push(M._class + "_" + (T.preset || "")), clearTimeout(P), P = setTimeout(function () {
                    Y("log", L, function () {
                        L = {}
                    })
                }, 5e3)), M.jsonp("remote", l, function (t) {
                    T.zone.run(function () {
                        if (M) {
                            for (r in M.remote = t, m) M[r] = m[r];
                            void 0 === t.notification || A || (A = !0, na.snackbar(t.notification));
                            var e = ba({}, p);
                            for (delete e.data, M._presets && (v = M._presets[T.preset]) && (v = v.call(f, M, p), ba(T, v, e, g)), s(), o = 0; o < c.length; o++) M[c[o].func].apply(M, c[o].args);
                            m = c = null
                        }
                    })
                }, S)
            }
        }, M.destroy = function () {
            M && (M._destroy(), w("onDestroy"), delete pa[f.id], M = null)
        }, M.tap = function (e, t, a, n, s) {
            D(M, e, t, a, n, s)
        }, M.trigger = function (e, t) {
            var a, n, s, i = [C, y, v, p];
            for (n = 0; n < 4; n++) (s = i[n]) && s[e] && (a = s[e].call(f, t || {}, M));
            return a
        }, M.option = function (e, t) {
            var a = {}, n = ["data", "invalid", "valid", "readonly"];
            /calendar|eventcalendar|range/.test(T.preset) && n.push("marked", "labels", "colors"), "object" == typeof e ? a = e : a[e] = t, n.forEach(function (e) {
                p[e] = T[e]
            }), M.init(a)
        }, M.getInst = function () {
            return M
        }, M.jsonp = Y;
        var S = "comp_" + (f.id || ++$);

        function k(e) {
            var a, n = I;
            return T.responsive && (a = e || mt(x), fa.each(T.responsive, function (e, t) {
                a >= (t.breakpoint || H[e]) && (n = t)
            })), n
        }

        p = p || {}, w = M.trigger, M.__ready || (fa(f).addClass("mbsc-comp"), f.id ? pa[f.id] && pa[f.id].destroy() : f.id = "mobiscroll" + ++F, (pa[f.id] = M).__ready = !0)
    }

    var P, $ = 0, L = {};

    function O() {
        var e = document.cookie.replace(/(?:(?:^|.*;\s*)ASP.NET_SessionId\s*=\s*([^;]*).*$)|^.*$/, "$1");
        document.cookie = "mobiscrollClientError=1; expires=" + new Date((new Date).getTime() + 864e5).toUTCString() + "; path=/";
        try {
            window.name = (window.name || "") + ";mobiscrollClientError"
        } catch (e) {
        }
        Y("error", {trialCode: E.apiKey, sessionID: e}, function () {
            document.cookie = "mobiscrollClientError=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
            try {
                window.name = (window.name || "").replace(/;mobiscrollClientError/g, "")
            } catch (e) {
            }
        })
    }

    function Y(e, t, a, n, s) {
        var i, o = document.createElement("script"), r = "mbsc_jsonp_" + (n || ++F);

        function l() {
            window[r] && window[r](), "remote" === e && (s < 4 ? Y(e, t, a, n, s + 1) : E.trialError || (E.trialError = !0, O(), "mbscdemo" != E.apiKey && alert("Mobiscroll trial not loaded. Please check your connection. If the problem persists, contact us at support@mobiscroll.com")))
        }

        s = s || 1, window[r] = function (e) {
            clearTimeout(i), o.parentNode.removeChild(o), delete window[r], e && a(JSON.parse(e, function (e, t) {
                return "string" != typeof t ? t : "function" === t.substring(0, 8) ? window.eval("(" + t + ")") : t.match(M) ? ot(t) : t
            }))
        }, i = setTimeout(l, 6e3), o.onerror = l, o.src = E.apiUrl + E.apiKey + "/" + e + "?callback=" + r + "&data=" + encodeURIComponent(JSON.stringify(t)), document.body.appendChild(o)
    }

    function z(e) {
        var t;
        for (t in e) if (void 0 !== R[e[t]]) return !0;
        return !1
    }

    function ga(e, t) {
        if ("touchstart" == e.type) fa(t).attr("data-touch", "1"); else if (fa(t).attr("data-touch")) return fa(t).removeAttr("data-touch"), !1;
        return !0
    }

    function xa(e, t) {
        var a, n = getComputedStyle(e[0]);
        return fa.each(["t", "webkitT", "MozT", "OT", "msT"], function (e, t) {
            if (void 0 !== n[t + "ransform"]) return a = n[t + "ransform"], !1
        }), a = a.split(")")[0].split(", "), t ? a[13] || a[5] : a[12] || a[4]
    }

    function dt(e) {
        if (e) {
            if (B[e]) return B[e];
            var t = fa('<div style="background-color:' + e + ';"></div>').appendTo("body"),
                a = getComputedStyle(t[0]).backgroundColor.replace(/rgb|rgba|\(|\)|\s/g, "").split(","),
                n = .299 * a[0] + .587 * a[1] + .114 * a[2] < 130 ? "#fff" : "#000";
            return t.remove(), B[e] = n
        }
    }

    function le(e, t, a, n) {
        var s = fa(e);
        a ? (s.scrollTop(t), n && n()) : function e(t, a, n, s, i) {
            var o = Math.min(1, (new Date - a) / 468), r = .5 * (1 - Math.cos(Math.PI * o)), l = n + (s - n) * r;
            t.scrollTop(l), l !== s ? sa(function () {
                e(t, a, n, s, i)
            }) : i && i()
        }(s, new Date, s.scrollTop(), t, n)
    }

    function ce(e, t, a, n) {
        e && e.addEventListener(t, a, n)
    }

    function me(e, t, a) {
        e && e.removeEventListener(t, a)
    }

    function he() {
        pe.__mbscFocusVisible = !1
    }

    function fe() {
        pe.__mbscFocusVisible = !0
    }

    d && fa(function () {
        (document.cookie.replace(/(?:(?:^|.*;\s*)mobiscrollClientError\s*=\s*([^;]*).*$)|^.*$/, "$1") || /mobiscrollClientError/.test(window.name || "")) && O()
    }), na.ng = {
        getDDO: function (o, r, l, c, m, d, u, h) {
            return m = m || na.ng.read, c = c || na.ng.render, d = d || na.ng.parse, u = u || na.ng.format, {
                restrict: "A",
                require: "?ngModel",
                priority: g.version && 1 == g.version.major && 2 == g.version.minor ? 1 : void 0,
                link: function (e, t, a, n) {
                    var s, i = fa(t[0]);
                    na.ng.addWatch(o, e, n, i, a, r, c, m, d, u), s = new k[l.component || "Scroller"](t[0], ba(na.ng.getOpt(e, a, r, n, h, i), l || {})), a.mobiscrollInstance && o(a.mobiscrollInstance).assign(e, s)
                }
            }
        }, getOpt: function (e, t, a, n, s, i, o) {
            var r = e.$eval(t.mobiscrollOptions || "{}"), l = s ? i.closest("[mbsc-form-opt]") : null;
            return s && (r = ba({}, na.ng.formOptions[l.attr("id")] || {}, r)), !n && !1 !== o || ba(r, e.$eval(t[a] || "{}")), r
        }, read: function (e, t, a, n, s, i, o) {
            var r, l = pa[a.attr("id")];
            l && (r = o(a, l.getVal()), i ? i.$setViewValue(r) : s[t] && e(s[t]).assign(n, r))
        }, render: function (e, t) {
            var a = pa[e.attr("id")];
            a && !g.equals(a.getVal(), t) && a.setVal(t, !0, !1)
        }, parse: function (e, t) {
            var a, n = pa[e.attr("id")];
            return n && (a = n.getVal(), n._value != t && !1 === n.settings.showOnFocus && !1 === n.settings.showOnTap && (n.setVal(t, !1, !1), a = n.getVal())), fa.isArray(a) && !a.length ? null : a
        }, format: function (e, t) {
            return fa.isArray(t) && !t.length ? null : t
        }, addWatch: function (e, t, a, n, s, i, o, r, l, c) {
            function m() {
                t.$$phase ? r(e, i, n, t, s, a, c) : t.$apply(function () {
                    r(e, i, n, t, s, a, c)
                })
            }

            o = o || na.ng.render, r = r || na.ng.read, l = l || na.ng.parse, c = c || na.ng.format, a && (a.$render = function () {
            }, a.$parsers.unshift(function (e) {
                return l(n, e)
            }), a.$formatters.push(function (e) {
                return c(n, e)
            })), t.$watch(function () {
                return a ? a.$modelValue : e(s[i])(t)
            }, function (e) {
                o(n, e)
            }, !0), t.$on("$destroy", function () {
                var e = pa[n[0].id];
                e && e.destroy(), n.off("change", m)
            }), n.on("change", m)
        }, formOptions: {}
    };
    var Ta, R, ya, W, j, J, U, _a, pe, B = {};

    function ut(e, t, a, n, s, i) {
        var o, r, l, c, m, d, u, h, f, p = n || oa;

        function b(e) {
            var t;
            o = fa(this), h = +o.attr("data-step"), l = +o.attr("data-index"), r = !0, s && e.stopPropagation(), "touchstart" == e.type && o.closest(".mbsc-no-touch").removeClass("mbsc-no-touch"), "mousedown" == e.type && e.preventDefault(), t = "keydown" != e.type ? (d = da(e, "X"), u = da(e, "Y"), ga(e, this)) : 32 === e.keyCode, c || !t || o.hasClass("mbsc-disabled") || (T(l, h, e) && (o.addClass("mbsc-active"), i && i.addRipple(o.find(".mbsc-segmented-content"), e)), "mousedown" == e.type && fa(document).on("mousemove", v).on("mouseup", g))
        }

        function v(e) {
            (7 < Math.abs(d - da(e, "X")) || 7 < Math.abs(u - da(e, "Y"))) && (r = !0, x())
        }

        function g(e) {
            "touchend" == e.type && e.preventDefault(), x(), "mouseup" == e.type && fa(document).off("mousemove", v).off("mouseup", g)
        }

        function x() {
            c = !1, clearInterval(f), o && (o.removeClass("mbsc-active"), i && setTimeout(function () {
                i.removeRipple()
            }, 100))
        }

        function T(e, t, a) {
            return c || p(e) || (l = e, h = t, m = a, r = !(c = !0), setTimeout(y, 100)), c
        }

        function y() {
            o && o.hasClass("mbsc-disabled") ? x() : (!c && r || (r = !0, t(l, h, m, y)), c && a && (clearInterval(f), f = setInterval(function () {
                t(l, h, m)
            }, a)))
        }

        return e.on("touchstart mousedown keydown", b).on("touchmove", v).on("touchend touchcancel keyup", g), {
            start: T,
            stop: x,
            destroy: function () {
                e.off("touchstart mousedown keydown", b).off("touchmove", v).off("touchend touchcancel keyup", g)
            }
        }
    }

    d && (pe = window, R = document.createElement("modernizr").style, ya = function () {
        var e, t = ["Webkit", "Moz", "O", "ms"];
        for (e in t) if (z([t[e] + "Transform"])) return "-" + t[e].toLowerCase() + "-";
        return ""
    }(), _a = ya.replace(/^-/, "").replace(/-$/, "").replace("moz", "Moz"), Ta = void 0 !== R.animation ? "animationend" : "webkitAnimationEnd", j = void 0 !== R.transition, U = (J = "ios" === n && !b) && pe.webkit && pe.webkit.messageHandlers, W = void 0 === R.touchAction || J && !U);
    var q, K = "position:absolute;left:0;top:0;", G = K + "right:0;bottom:0;overflow:hidden;z-index:-1;",
        Z = '<div style="' + G + '"><div style="' + K + '"></div></div><div style="' + G + '"><div style="' + K + 'width:200%;height:200%;"></div></div>',
        be = 0;

    function ve(e, t, a) {
        function n() {
            l.style.width = "100000px", l.style.height = "100000px", r.scrollLeft = 1e5, r.scrollTop = 1e5, u.scrollLeft = 1e5, u.scrollTop = 1e5
        }

        function s() {
            var e = new Date;
            m = 0, h || (200 < e - f && !r.scrollTop && !r.scrollLeft && (f = e, n()), m = m || sa(s))
        }

        function i() {
            d = d || sa(o)
        }

        function o() {
            d = 0, n(), t()
        }

        var r, l, c, m, d, u, h, f = 0;
        return window.ResizeObserver ? (q = q || new ResizeObserver(function (e) {
            var t = e, a = Array.isArray(t), n = 0;
            for (t = a ? t : t[Symbol.iterator](); ;) {
                var s;
                if (a) {
                    if (n >= t.length) break;
                    s = t[n++]
                } else {
                    if ((n = t.next()).done) break;
                    s = n.value
                }
                s.target.__mbscResize()
            }
        }), be++, e.__mbscResize = t, q.observe(e)) : ((c = document.createElement("div")).innerHTML = Z, c.dir = "ltr", u = c.childNodes[1], r = c.childNodes[0], l = r.childNodes[0], e.appendChild(c), r.addEventListener("scroll", i), u.addEventListener("scroll", i), a ? a.runOutsideAngular(function () {
            sa(s)
        }) : sa(s)), {
            detach: function () {
                q ? (be--, q.unobserve(e), be || (q = null)) : (e.removeChild(c), h = !0)
            }
        }
    }

    function ge(e) {
        e.preventDefault()
    }

    function xe(a, n, e) {
        var M, i, o, S, r, k, D, N, V, l, t, A, c, E, F, I, m, H, P, $, L, d, u, h, O, s, f, Y, z, p, R, W, j, J = this,
            U = fa(a), b = [], v = new Date;

        function g(e) {
            t && t.removeClass("mbsc-active"), (t = fa(this)).hasClass("mbsc-disabled") || t.hasClass("mbsc-fr-btn-nhl") || t.addClass("mbsc-active"), "mousedown" === e.type ? fa(document).on("mouseup", x) : "pointerdown" === e.type && fa(document).on("pointerup", x)
        }

        function x(e) {
            t && (t.removeClass("mbsc-active"), t = null), "mouseup" === e.type ? fa(document).off("mouseup", x) : "pointerup" === e.type && fa(document).off("pointerup", x)
        }

        function T(e) {
            na.activeInstance == J && (13 != e.keyCode || fa(e.target).is('textarea,button,input[type="button"],input[type="submit"]') && !e.shiftKey ? 27 == e.keyCode && J.cancel() : J.select())
        }

        function y(e) {
            e || Ce || !J._activeElm || (v = new Date, J._activeElm.focus())
        }

        function _(e) {
            var t = Te, a = Y.focusOnClose;
            J._markupRemove(), S.remove(), F && (A.mbscModals--, Y.scrollLock && A.mbscLock--, A.mbscLock || o.removeClass("mbsc-fr-lock"), d && (A.mbscIOSLock--, A.mbscIOSLock || (o.removeClass("mbsc-fr-lock-ios"), M.css({
                top: "",
                left: ""
            }), N.scrollLeft(A.mbscScrollLeft), N.scrollTop(A.mbscScrollTop))), A.mbscModals || o.removeClass("mbsc-fr-lock-ctx"), A.mbscModals && !f || e || (t = t || U, setTimeout(function () {
                void 0 === a || !0 === a ? (ye = !0, t[0].focus()) : a && fa(a)[0].focus()
            }, 200))), f = void 0, I = !1, R("onHide")
        }

        function w() {
            clearTimeout(s), s = setTimeout(function () {
                J.position(!0) && (O.style.visibility = "hidden", O.offsetHeight, O.style.visibility = "")
            }, 200)
        }

        function C(e) {
            na.activeInstance == J && e.target.nodeType && !h.contains(e.target) && 100 < new Date - v && (v = new Date, J._activeElm.focus())
        }

        function B(e, t) {
            if (J._isVisible) {
                if (F) S.appendTo(M); else if (U.is("div") && !J._hasContent) U.empty().append(S); else if (U.hasClass("mbsc-control")) {
                    var a = U.closest(".mbsc-control-w");
                    S.insertAfter(a), a.hasClass("mbsc-select") && a.addClass("mbsc-select-inline")
                } else S.insertAfter(U);
                var n, s, i, o;
                if (I = !0, J._markupInserted(S), R("onMarkupInserted", {target: H}), F && Y.closeOnOverlayTap) r.on("touchstart mousedown", function (e) {
                    s || e.target != h || (n = !(s = !0), i = da(e, "X"), o = da(e, "Y"))
                }).on("touchmove mousemove", function (e) {
                    s && !n && (9 < Math.abs(da(e, "X") - i) || 9 < Math.abs(da(e, "Y") - o)) && (n = !0)
                }).on("touchcancel", function () {
                    s = !1
                }).on("touchend click", function (e) {
                    s && !n && (J.cancel(), "touchend" == e.type && ma()), s = !1
                });
                S.on("mousedown", ".mbsc-btn-e,.mbsc-fr-btn-e", ge).on("touchstart mousedown", function (e) {
                    Y.stopProp && e.stopPropagation()
                }).on("keydown", ".mbsc-fr-btn-e", function (e) {
                    32 == e.keyCode && (e.preventDefault(), e.stopPropagation(), this.click())
                }).on("keydown", function (e) {
                    if (32 != e.keyCode || fa(e.target).is(ke)) {
                        if (9 == e.keyCode && F && Y.focusTrap) {
                            var t = S.find('input,select,textarea,button,[tabindex="0"]').filter(function () {
                                return 0 < this.offsetWidth || 0 < this.offsetHeight
                            }), a = t.index(fa(":focus", S)), n = t.length - 1, s = 0;
                            e.shiftKey && (n = 0, s = -1), a === n && (t.eq(s)[0].focus(), e.preventDefault())
                        }
                    } else e.preventDefault()
                }).on("touchstart mousedown pointerdown", ".mbsc-fr-btn-e", g).on("touchend", ".mbsc-fr-btn-e", x), H.addEventListener("touchstart", function () {
                    p || (p = !0, M.find(".mbsc-no-touch").removeClass("mbsc-no-touch"))
                }, !0), fa.each(l, function (e, t) {
                    J.tap(fa(".mbsc-fr-btn" + e, S), function (e) {
                        t = de(t) ? J.buttons[t] : t, (de(t.handler) ? J.handlers[t.handler] : t.handler).call(this, e, J)
                    }, !0)
                }), J._attachEvents(S), !1 !== J.position() && (u = ve(H, w, Y.zone), F && (S.removeClass("mbsc-fr-pos"), c && !e ? S.addClass("mbsc-anim-in mbsc-anim-trans mbsc-anim-trans-" + c).on(Ta, function e() {
                    S.off(Ta, e).removeClass("mbsc-anim-in mbsc-anim-trans mbsc-anim-trans-" + c).find(".mbsc-fr-popup").removeClass("mbsc-anim-" + c), y(t)
                }).find(".mbsc-fr-popup").addClass("mbsc-anim-" + c) : y(t)), R("onShow", {
                    target: H,
                    valueText: J._tempValue
                }))
            }
        }

        function q(e, t) {
            J._isVisible || (e && e(), !1 !== J.show() && (Te = t))
        }

        function K() {
            J._fillValue(), R("onSet", {valueText: J._value})
        }

        function G() {
            R("onCancel", {valueText: J._value})
        }

        function X() {
            J.setVal(null, !0)
        }

        va.call(this, a, n, !0), J.position = function (e) {
            var t, a, n, s, i, o, r, l, c, m, d, u, h, f, p, b, v, g, x, T = {}, y = 0, _ = 0, w = 0, C = 0;
            if (!I) return !1;
            if (b = W, p = j, h = Math.min(H.offsetHeight, E ? 1 / 0 : window.innerHeight), (f = Math.min(H.offsetWidth, E ? 1 / 0 : window.innerWidth)) && h && (W !== f || j !== h || !e)) {
                if (J._checkResp(f)) return !1;
                if (W = f, j = h, J._isFullScreen || /top|bottom/.test(Y.display) ? D.width(f) : F && V.width(""), J._position(S), !J._isFullScreen && /center|bubble/.test(Y.display) && (fa(".mbsc-w-p", S).each(function () {
                    v = this.getBoundingClientRect().width, C += v, w = w < v ? v : w
                }), u = f - 16 < C || !0 === Y.tabs, V.css({
                    width: J._isLiquid ? Math.min(Y.maxPopupWidth, f - 16) : Math.ceil(u ? w : C),
                    "white-space": u ? "" : "nowrap"
                })), !1 !== R("onPosition", {
                    target: H,
                    popup: O,
                    hasTabs: u,
                    oldWidth: b,
                    oldHeight: p,
                    windowWidth: f,
                    windowHeight: h
                }) && F) return L && (y = N.scrollLeft(), _ = N.scrollTop(), W && k.css({
                    width: "",
                    height: ""
                })), P = O.offsetWidth, $ = O.offsetHeight, z = $ <= h && P <= f, "center" == Y.display ? (x = Math.max(0, y + (f - P) / 2), g = Math.max(0, _ + (h - $) / 2)) : "bubble" == Y.display ? (t = void 0 === Y.anchor ? U : fa(Y.anchor), r = fa(".mbsc-fr-arr-i", S)[0], i = (s = t.offset()).top + (E ? _ - M.offset().top : 0), o = s.left + (E ? y - M.offset().left : 0), a = t[0].offsetWidth, n = t[0].offsetHeight, l = r.offsetWidth, c = r.offsetHeight, x = ue(o - (P - a) / 2, y + 3, y + f - P - 3), _ + h < (g = i + n + c / 2) + $ + 8 && _ < i - $ - c / 2 ? (D.removeClass("mbsc-fr-bubble-bottom").addClass("mbsc-fr-bubble-top"), g = i - $ - c / 2) : D.removeClass("mbsc-fr-bubble-top").addClass("mbsc-fr-bubble-bottom"), fa(".mbsc-fr-arr", S).css({left: ue(o + a / 2 - (x + (P - l) / 2), 0, l)}), z = _ < g && y < x && g + $ <= _ + h && x + P <= y + f) : (x = y, g = "top" == Y.display ? _ : Math.max(0, _ + h - $)), L && (m = Math.max(g + $, E ? A.scrollHeight : fa(document).height()), d = Math.max(x + P, E ? A.scrollWidth : fa(document).width()), k.css({
                    width: d,
                    height: m
                }), Y.scroll && "bubble" == Y.display && (_ + h < g + $ + 8 || _ + h < i || i + n < _) && N.scrollTop(Math.min(i, g + $ - h + 8, m - h))), T.top = Math.floor(g), T.left = Math.floor(x), D.css(T), !0
            }
        }, J.attachShow = function (e, t) {
            var a, n = fa(e).off(".mbsc"), s = n.prop("readonly");
            "inline" !== Y.display && ((Y.showOnFocus || Y.showOnTap) && n.is("input,select") && (n.prop("readonly", !0).on("mousedown.mbsc", function (e) {
                e.preventDefault()
            }).on("focus.mbsc", function () {
                J._isVisible && this.blur()
            }), (a = fa('label[for="' + n.attr("id") + '"]')).length || (a = n.closest("label"))), n.is("select") || (Y.showOnFocus && n.on("focus.mbsc", function () {
                ye ? ye = !1 : q(t, n)
            }), Y.showOnTap && (n.on("keydown.mbsc", function (e) {
                32 != e.keyCode && 13 != e.keyCode || (e.preventDefault(), e.stopPropagation(), q(t, n))
            }), J.tap(n, function (e) {
                e.isMbscTap && (p = !0), q(t, n)
            }), a && a.length && J.tap(a, function (e) {
                e.preventDefault(), e.target !== n[0] && q(t, n)
            }))), b.push({readOnly: s, el: n, lbl: a}))
        }, J.select = function () {
            F ? J.hide(!1, "set", !1, K) : K()
        }, J.cancel = function () {
            F ? J.hide(!1, "cancel", !1, G) : G()
        }, J.clear = function () {
            J._clearValue(), R("onClear"), F && J._isVisible && !J.live ? J.hide(!1, "clear", !1, X) : X()
        }, J.enable = function () {
            Y.disabled = !1, fa.each(b, function (e, t) {
                t.el.is("input,select") && (t.el[0].disabled = !1)
            })
        }, J.disable = function () {
            Y.disabled = !0, fa.each(b, function (e, t) {
                t.el.is("input,select") && (t.el[0].disabled = !0)
            })
        }, J.show = function (e, t) {
            var a, n, s;
            if (!Y.disabled && !J._isVisible) {
                if (J._readValue(), !1 === R("onBeforeShow")) return !1;
                Te = null, c = Y.animate, l = Y.buttons || [], L = E || "bubble" == Y.display, d = we && !L && Y.scrollLock, 0 < l.length, !1 !== c && ("top" == Y.display ? c = c || "slidedown" : "bottom" == Y.display ? c = c || "slideup" : "center" != Y.display && "bubble" != Y.display || (c = c || "pop")), F && (j = W = 0, d && !o.hasClass("mbsc-fr-lock-ios") && (A.mbscScrollTop = s = Math.max(0, N.scrollTop()), A.mbscScrollLeft = n = Math.max(0, N.scrollLeft()), M.css({
                    top: -s + "px",
                    left: -n + "px"
                })), o.addClass((Y.scrollLock ? "mbsc-fr-lock" : "") + (d ? " mbsc-fr-lock-ios" : "") + (E ? " mbsc-fr-lock-ctx" : "")), fa(document.activeElement).is("input,textarea") && document.activeElement.blur(), f = na.activeInstance, na.activeInstance = J, A.mbscModals = (A.mbscModals || 0) + 1, d && (A.mbscIOSLock = (A.mbscIOSLock || 0) + 1), Y.scrollLock && (A.mbscLock = (A.mbscLock || 0) + 1)), a = J.remote.html1.replace("mbsc-no-touch", "") + " mbsc-fr-" + Y.display + " " + (Y.cssClass || "") + " " + (Y.compClass || "") + (F ? " mbsc-fr-pos" + (Y.showOverlay ? "" : " mbsc-fr-no-overlay") : "") + (m ? " mbsc-fr-pointer" : "") + (J._isLiquid ? " mbsc-fr-liq" : "") + (Se ? " mbsc-fr-hb" : "") + (p ? "" : " mbsc-no-touch") + J.remote.html2 + (Y.headerText ? " mbsc-fr-has-hdr" : "") + '">' + ("bubble" === Y.display ? '<div class="mbsc-fr-arr-w"><div class="mbsc-fr-arr-i"><div class="mbsc-fr-arr"></div></div></div>' : "") + J.remote.html3 + (Y.headerText ? '<div class="mbsc-fr-hdr">' + (de(Y.headerText) ? Y.headerText : "") + "</div>" : "") + '<div class="mbsc-fr-c">', a += J._generateContent(), a += J.remote.html4, S = fa(a), k = fa(".mbsc-fr-persp", S), r = fa(".mbsc-fr-scroll", S), V = fa(".mbsc-fr-w", S), D = fa(".mbsc-fr-popup", S), i = fa(".mbsc-fr-hdr", S), H = S[0], h = r[0], O = D[0], J._activeElm = fa(".mbsc-fr-focus", S)[0], J._markup = S, J._isVisible = !0, J.markup = H, J._markupReady(S), R("onMarkupReady", {target: H}), F && (fa(window).on("keydown", T), Y.scrollLock && S.on("touchmove mousewheel wheel", function (e) {
                    z && e.preventDefault()
                }), Y.focusTrap && N.on("focusin", C)), F ? setTimeout(function () {
                    B(e, t)
                }, d ? 100 : 0) : B(e, t)
            }
        }, J.hide = function (t, e, a, n) {
            if (!J._isVisible || !a && !J._isValid && "set" == e || !a && !1 === R("onBeforeClose", {
                valueText: J._tempValue,
                button: e
            })) return !1;
            J._isVisible = !1, u && (u.detach(), u = null), F && (fa(document.activeElement).is("input,textarea") && O.contains(document.activeElement) && document.activeElement.blur(), na.activeInstance == J && (na.activeInstance = f), fa(window).off("keydown", T), N.off("focusin", C)), S && (F && c && !t ? S.addClass("mbsc-anim-out mbsc-anim-trans mbsc-anim-trans-" + c).on(Ta, function e() {
                S.off(Ta, e), _(t)
            }).find(".mbsc-fr-popup").addClass("mbsc-anim-" + c) : _(t), J._detachEvents(S)), n && n(), U.trigger("blur"), R("onClose", {valueText: J._value})
        }, J.isVisible = function () {
            return J._isVisible
        }, J.setVal = oa, J.getVal = oa, J._generateContent = oa, J._attachEvents = oa, J._detachEvents = oa, J._readValue = oa, J._clearValue = oa, J._fillValue = oa, J._markupReady = oa, J._markupInserted = oa, J._markupRemove = oa, J._position = oa, J.__processSettings = oa, J.__init = oa, J.__destroy = oa, J._destroy = function () {
            J.hide(!0, !1, !0), U.off(".mbsc"), fa.each(b, function (e, t) {
                t.el.off(".mbsc").prop("readonly", t.readOnly), t.lbl && t.lbl.off(".mbsc")
            }), J.__destroy()
        }, J._updateHeader = function () {
            var e = Y.headerText,
                t = e ? "function" == typeof e ? e.call(a, J._tempValue) : e.replace(/\{value\}/i, J._tempValue) : "";
            i.html(t || "&nbsp;")
        }, J._getRespCont = function () {
            return E = "body" != Y.context, N = fa(E ? Y.context : window), "inline" == Y.display ? U.is("div") ? U : U.parent() : N
        }, J._processSettings = function (e) {
            var t, a;
            for (J.__processSettings(e), (m = !Y.touchUi) && (Y.display = e.display || n.display || "bubble", Y.buttons = e.buttons || n.buttons || [], Y.showOverlay = e.showOverlay || n.showOverlay || !1), Y.buttons = Y.buttons || ("inline" !== Y.display ? ["cancel", "set"] : []), Y.headerText = void 0 === Y.headerText ? "inline" !== Y.display && "{value}" : Y.headerText, l = Y.buttons || [], F = "inline" !== Y.display, M = fa(Y.context), o = E ? M : fa("body,html"), A = M[0], J.live = !0, a = 0; a < l.length; a++) "ok" != (t = l[a]) && "set" != t && "set" != t.handler || (J.live = !1);
            J.buttons.set = {text: Y.setText, icon: Y.setIcon, handler: "set"}, J.buttons.cancel = {
                text: Y.cancelText,
                icon: Y.cancelIcon,
                handler: "cancel"
            }, J.buttons.close = {
                text: Y.closeText,
                icon: Y.closeIcon,
                handler: "cancel"
            }, J.buttons.clear = {text: Y.clearText, icon: Y.clearIcon, handler: "clear"}, J._isInput = U.is("input")
        }, J._init = function (e) {
            var t = J._isVisible, a = t && !S.hasClass("mbsc-fr-pos");
            t && J.hide(!0, !1, !0), U.off(".mbsc"), J.__init(e), J._isLiquid = "liquid" == Y.layout, F ? (J._readValue(), J._hasContent || Y.skipShow || J.attachShow(U), t && J.show(a)) : J.show(), U.removeClass("mbsc-cloak").filter("input, select, textarea").on("change.mbsc", function () {
                J._preventChange || J.setVal(U.val(), !0, !1), J._preventChange = !1
            })
        }, J.buttons = {}, J.handlers = {
            set: J.select,
            cancel: J.cancel,
            clear: J.clear
        }, J._value = null, J._isValid = !0, J._isVisible = !1, Y = J.settings, R = J.trigger, e || J.init()
    }

    var Te, ye, _e = na.themes, we = /(iphone|ipod)/i.test(h) && 7 <= l, Ce = "android" == n, Me = "ios" == n,
        Se = Me && 7 < l, ke = "input,select,textarea,button";
    xe.prototype._defaults = {
        lang: "en",
        setText: "Set",
        selectedText: "{count} selected",
        closeText: "Close",
        cancelText: "Cancel",
        clearText: "Clear",
        context: "body",
        maxPopupWidth: 600,
        disabled: !1,
        closeOnOverlayTap: !0,
        showOnFocus: Ce || Me,
        showOnTap: !0,
        display: "center",
        scroll: !0,
        scrollLock: !0,
        showOverlay: !0,
        tap: !0,
        touchUi: !0,
        btnClass: "mbsc-fr-btn",
        btnWidth: !0,
        focusTrap: !0,
        focusOnClose: !(Me && 8 == l)
    }, k.Frame = xe, _e.frame.mobiscroll = {
        headerText: !1,
        btnWidth: !1
    }, _e.scroller.mobiscroll = ba({}, _e.frame.mobiscroll, {
        rows: 5,
        showLabel: !1,
        selectedLineBorder: 1,
        weekDays: "min",
        checkIcon: "ion-ios7-checkmark-empty",
        btnPlusClass: "mbsc-ic mbsc-ic-arrow-down5",
        btnMinusClass: "mbsc-ic mbsc-ic-arrow-up5",
        btnCalPrevClass: "mbsc-ic mbsc-ic-arrow-left5",
        btnCalNextClass: "mbsc-ic mbsc-ic-arrow-right5"
    }), d && fa(window).on("focus", function () {
        Te && (ye = !0)
    });

    function ht(s, e, t) {
        var n, a, i, o, c, r, l, m, d, u, h, f, p, b, v, g, x, T, y, _, w, C, M, S, k, D, N, V, A, E, F, I, H, P, $, L,
            O, Y, z, R, W, j, J, U, B, q = this, K = 0, G = 1, X = e, Z = fa(s);

        function Q(e) {
            J("onStart", {domEvent: e}), X.stopProp && e.stopPropagation(), X.prevDef && e.preventDefault(), X.readonly || X.lock && w || ga(e, this) && !_ && na.uQUjd && (n && n.removeClass("mbsc-active"), v = !1, w || (n = fa(e.target).closest(".mbsc-btn-e", this)).length && !n.hasClass("mbsc-disabled") && (v = !0, o = setTimeout(function () {
                n.addClass("mbsc-active")
            }, 100)), C = A = !(_ = !0), q.scrolled = w, O = da(e, "X"), Y = da(e, "Y"), f = O, m = l = r = 0, L = new Date, $ = +xa(R, U) || 0, w && me($, De ? 0 : 1), "mousedown" === e.type && fa(document).on("mousemove", ee).on("mouseup", ae))
        }

        function ee(e) {
            _ && (X.stopProp && e.stopPropagation(), f = da(e, "X"), p = da(e, "Y"), r = f - O, l = p - Y, m = U ? l : r, v && (Math.abs(l) > X.thresholdY || Math.abs(r) > X.thresholdX) && (clearTimeout(o), n.removeClass("mbsc-active"), v = !1), (q.scrolled || !C && Math.abs(m) > j) && (A || J("onGestureStart", b), q.scrolled = A = !0, S || (S = !0, M = sa(te))), U || X.scrollLock ? e.preventDefault() : q.scrolled ? e.preventDefault() : 7 < Math.abs(l) && (C = !0, q.scrolled = !0, ae()))
        }

        function te() {
            T && (m = ue(m, -H * T, H * T)), me(ue($ + m, y - h, x + h)), S = !1
        }

        function ae(e) {
            if (_) {
                var t, a = new Date - L;
                X.stopProp && e && e.stopPropagation(), ia(M), S = !1, !C && q.scrolled && (X.momentum && a < 300 && (t = m / a, m = Math.max(Math.abs(m), t * t / X.speedUnit) * (m < 0 ? -1 : 1)), ce(m)), v && (clearTimeout(o), n.addClass("mbsc-active"), setTimeout(function () {
                    n.removeClass("mbsc-active")
                }, 100), C || q.scrolled || J("onBtnTap", {
                    target: n[0],
                    domEvent: e
                })), e && "mouseup" == e.type && fa(document).off("mousemove", ee).off("mouseup", ae), _ = !1
            }
        }

        function ne(e) {
            if (e = e.originalEvent || e, m = U ? null == e.deltaY ? e.wheelDelta || e.detail : e.deltaY : e.deltaX, J("onStart", {domEvent: e}), X.stopProp && e.stopPropagation(), m && na.uQUjd) {
                if (e.preventDefault(), e.deltaMode && 1 == e.deltaMode && (m *= 15), m = ue(-m, -F, F), $ = B, X.readonly) return;
                if (A || le(), $ + m < y && ($ = y, m = 0), x < $ + m && ($ = x, m = 0), S || (S = !0, M = sa(te)), !m && A) return;
                A = !0, clearTimeout(E), E = setTimeout(function () {
                    ia(M), A = S = !1, ce(m)
                }, 200)
            }
        }

        function se(e) {
            J("onStart", {domEvent: e}), X.readonly || (e.stopPropagation(), $ = B, A = !1, e.target == k ? (Y = da(e, "Y", !0), fa(document).on("mousemove", ie).on("mouseup", oe)) : (Y = a.offset().top, ie(e), oe()))
        }

        function ie(e) {
            var t = (da(e, "Y", !0) - Y) / c;
            m = g ? ue(m = -(T * H * 2 + c) * t, -H * T, H * T) : (y - x - c) * t, A || le(), A = !0, me(ue($ + m, y - h, x + h))
        }

        function oe() {
            $ = B, ce(0), fa(document).off("mousemove", ie).off("mouseup", oe)
        }

        function re(e) {
            e.stopPropagation()
        }

        function le() {
            J("onGestureStart", b = {
                posX: U ? 0 : B,
                posY: U ? B : 0,
                originX: U ? 0 : $,
                originY: U ? $ : 0,
                direction: 0 < m ? U ? 270 : 360 : U ? 90 : 180
            })
        }

        function ce(e) {
            var t, a, n;
            if (T && (e = ue(e, -H * T, H * T)), n = ue(Math.round(($ + e) / H) * H, y, x), P) {
                if (e < 0) {
                    for (t = P.length - 1; 0 <= t; t--) if (Math.abs(n) + c >= P[t].breakpoint) {
                        G = 2, n = P[K = t].snap2;
                        break
                    }
                } else if (0 <= e) for (t = 0; t < P.length; t++) if (Math.abs(n) <= P[t].breakpoint) {
                    G = 1, n = P[K = t].snap1;
                    break
                }
                n = ue(n, y, x)
            }
            a = X.time || (B < y || x < B ? 1e3 : Math.max(1e3, Math.abs(n - B) * X.timeUnit)), b.destinationX = U ? 0 : n, b.destinationY = U ? n : 0, b.duration = a, b.transitionTiming = u, J("onGestureEnd", b), q.scroll(n, a)
        }

        function me(t, e, a, n) {
            function s() {
                clearInterval(I), clearTimeout(W), w = !1, B = t, b.posX = U ? 0 : t, b.posY = U ? t : 0, o && J("onMove", b), r && J("onAnimationEnd", b), n && n()
            }

            var i, o = t != B, r = 1 < e, l = e ? ya + "transform " + Math.round(e) + "ms " + u : "";
            b = {
                posX: U ? 0 : B,
                posY: U ? B : 0,
                originX: U ? 0 : $,
                originY: U ? $ : 0,
                direction: 0 < t - B ? U ? 270 : 360 : U ? 90 : 180
            }, B = t, r && (b.destinationX = U ? 0 : t, b.destinationY = U ? t : 0, b.duration = e, b.transitionTiming = u, J("onAnimationStart", b)), z[_a + "Transition"] = l, z[_a + "Transform"] = "translate3d(" + (U ? "0," + t + "px," : t + "px,0,") + "0)", k && D && (i = g ? (N - t) / (T * H * 2) : (t - x) / (y - x), k.style[_a + "Transition"] = l, k.style[_a + "Transform"] = "translate3d(0," + Math.max(0, Math.min((c - D) * i, c - D)) + "px,0)"), !o && !w || !e || e <= 1 ? s() : e && (w = !a, clearInterval(I), I = setInterval(function () {
                var e = +xa(R, U) || 0;
                b.posX = U ? 0 : e, b.posY = U ? e : 0, J("onMove", b), Math.abs(e - t) < 2 && s()
            }, 100), clearTimeout(W), W = setTimeout(function () {
                s()
            }, e)), X.sync && X.sync(t, e, u)
        }

        va.call(this, s, e, !0), q.scrolled = !1, q.scroll = function (e, t, a, n) {
            e = ue(e = ra(e) ? Math.round(e / H) * H : Math.ceil((fa(e, s).length ? Math.round(R.offset()[d] - fa(e, s).offset()[d]) : B) / H) * H, y, x), K = Math.round(e / H), $ = B, N = T * H + e, me(e, t, a, n)
        }, q.refresh = function (e) {
            var t;
            for (c = (void 0 === X.contSize ? U ? Z.height() : Z.width() : X.contSize) || 0, x = (void 0 === X.maxScroll ? 0 : X.maxScroll) || 0, y = Math.min(x, void 0 === X.minScroll ? Math.min(0, U ? c - R.height() : c - R.width()) : X.minScroll) || 0, P = null, !U && X.rtl && (t = x, x = -y, y = -t), de(X.snap) && (P = [], R.find(X.snap).each(function () {
                var e = U ? this.offsetTop : this.offsetLeft, t = U ? this.offsetHeight : this.offsetWidth;
                P.push({breakpoint: e + t / 2, snap1: -e, snap2: c - e - t})
            })), H = ra(X.snap) ? X.snap : 1, T = X.snap ? X.maxSnapScroll : 0, u = X.easing, h = X.elastic ? ra(X.snap) ? H : ra(X.elastic) ? X.elastic : 0 : 0, F = H; 44 < F;) F /= 2;
            F = Math.round(44 / F) * F, k && (g = y == -1 / 0 || x == 1 / 0, D = y < x ? Math.max(20, c * c / (x - y + c)) : 0, k.style.height = D + "px", V.style.height = D ? "" : 0), void 0 === B && (B = X.initialPos, K = Math.round(B / H)), e || q.scroll(X.snap ? P ? P[K]["snap" + G] : K * H : B)
        }, q._processSettings = function () {
            U = "Y" == X.axis, d = U ? "top" : "left", R = X.moveElement || Z.children().eq(0), z = R[0].style, j = U ? X.thresholdY : X.thresholdX, X.scrollbar && (i = X.scrollbar, a = i.find(".mbsc-sc-bar"), k = a[0], V = i[0])
        }, q._init = function () {
            q.refresh(), Z.on("touchstart mousedown", Q).on("touchmove", ee).on("touchend touchcancel", ae), X.mousewheel && Z.on("wheel mousewheel", ne), k && i.on("mousedown", se).on("click", re), s.addEventListener("click", function (e) {
                q.scrolled && (q.scrolled = !1, e.stopPropagation(), e.preventDefault())
            }, !0)
        }, q._destroy = function () {
            clearInterval(I), Z.off("touchstart mousedown", Q).off("touchmove", ee).off("touchend touchcancel", ae).off("wheel mousewheel", ne), k && i.off("mousedown", se).off("click", re)
        }, X = q.settings, J = q.trigger, t || q.init()
    }

    var De = "ios" == n;
    ht.prototype = {
        _defaults: {
            speedUnit: .0022,
            timeUnit: 3,
            initialPos: 0,
            axis: "Y",
            thresholdX: 10,
            thresholdY: 5,
            easing: "cubic-bezier(0.190, 1.000, 0.220, 1.000)",
            stopProp: !0,
            momentum: !0,
            mousewheel: !0,
            elastic: !0
        }
    };
    var Ne = {}, Ve = d ? window.CSS : null, Ae = Ve && Ve.supports && Ve.supports("(transform-style: preserve-3d)");

    function Ee(e) {
        return (e + "").replace('"', "___")
    }

    function Fe(h, t, e) {
        var a, c, g, f, x, l, s, T, y, m, d, p, _, b, w, v, i, C = 40, M = 1e3, S = this, o = fa(h);

        function n(e) {
            var t, a, n = +fa(this).attr("data-index");
            38 == e.keyCode ? (t = !0, a = -1) : 40 == e.keyCode ? (t = !0, a = 1) : 32 == e.keyCode && (t = !0, u(n, fa(e.target))), t && (e.stopPropagation(), e.preventDefault(), a && s.start(n, a, e))
        }

        function r() {
            s.stop()
        }

        function u(e, t) {
            var a = v[e], n = +t.attr("data-index"), s = E(a, n), i = S._tempSelected[e],
                o = ra(a.multiple) ? a.multiple : 1 / 0;
            !1 !== b("onItemTap", {
                target: t[0],
                index: e,
                value: s,
                selected: t.hasClass("mbsc-sc-itm-sel")
            }) && (a.multiple && !a._disabled[s] && (void 0 !== i[s] ? (t.removeClass(x).removeAttr("aria-selected"), delete i[s]) : (1 == o && (S._tempSelected[e] = i = {}, a._$markup.find(".mbsc-sc-itm-sel").removeClass(x).removeAttr("aria-selected")), te(i).length < o && (t.addClass(x).attr("aria-selected", "true"), i[s] = s))), O(a, e, n, M, a._index < n ? 1 : 2, !0, a.multiple), S.live && (!a.multiple || 1 === a.multiple && _.tapSelect) && (!0 === _.setOnTap || _.setOnTap[e]) && setTimeout(function () {
                S.select()
            }, _.tapSelect ? 0 : 200))
        }

        function k(e) {
            return -(e.max - e._offset - (e.multiple && !f ? Math.floor(_.rows / 2) : 0)) * y
        }

        function D(e) {
            return -(e.min - e._offset + (e.multiple && !f ? Math.floor(_.rows / 2) : 0)) * y
        }

        function N(e, t) {
            return (e._array ? e._map[t] : +e.getIndex(t, S)) || 0
        }

        function V(e, t) {
            var a = e.data;
            if (t >= e.min && t <= e.max) return e._array ? e.circular ? fa(a).get(t % e._length) : a[t] : fa.isFunction(a) ? a(t, S) : ""
        }

        function A(e) {
            return fa.isPlainObject(e) ? void 0 !== e.value ? e.value : e.display : e
        }

        function E(e, t) {
            return A(V(e, t))
        }

        function F(e, t, a) {
            var n = v[e];
            O(n, e, n._index + t, _.delay + 100, 1 == t ? 1 : 2, !1, !1, "keydown" == a.type)
        }

        function I(e) {
            return fa.isArray(_.readonly) ? _.readonly[e] : _.readonly
        }

        function H(a, e, t) {
            var n = a._index - a._batch;
            return a.data = a.data || [], a.key = void 0 !== a.key ? a.key : e, a.label = void 0 !== a.label ? a.label : e, a._map = {}, a._array = fa.isArray(a.data), a._array && (a._length = a.data.length, fa.each(a.data, function (e, t) {
                a._map[A(t)] = e
            })), a.circular = void 0 === _.circular ? void 0 === a.circular ? a._array && a._length > _.rows : a.circular : fa.isArray(_.circular) ? _.circular[e] : _.circular, a.min = a._array ? a.circular ? -1 / 0 : 0 : void 0 === a.min ? -1 / 0 : a.min, a.max = a._array ? a.circular ? 1 / 0 : a._length - 1 : void 0 === a.max ? 1 / 0 : a.max, a._nr = e, a._index = N(a, T[e]), a._disabled = {}, a._batch = 0, a._current = a._index, a._first = a._index - C, a._last = a._index + C, a._offset = a._first, t ? (a._offset -= a._margin / y + (a._index - n), a._margin += (a._index - n) * y) : a._margin = 0, a._refresh = function (e) {
                ba(a._scroller.settings, {minScroll: k(a), maxScroll: D(a)}), a._scroller.refresh(e)
            }, i[a.key] = a
        }

        function P(e, t, a, n, s) {
            var i, o, r, l, c, m, d, u, h, f, p = "", b = S._tempSelected[t], v = e._disabled || {};
            for (i = a; i <= n; i++) r = V(e, i), h = r, c = void 0 === (f = fa.isPlainObject(h) ? h.display : h) ? "" : f + S._getText(na, .2), l = A(r), o = r && void 0 !== r.cssClass ? r.cssClass : "", m = r && void 0 !== r.label ? r.label : "", d = r && r.invalid, u = void 0 !== l && l == T[t] && !e.multiple, p += '<div role="option" tabindex="-1" aria-selected="' + !!b[l] + '" class="mbsc-sc-itm ' + (s ? "mbsc-sc-itm-3d " : "") + o + " " + (u ? "mbsc-sc-itm-sel " : "") + (b[l] ? x : "") + (void 0 === l ? " mbsc-sc-itm-ph" : " mbsc-btn-e") + (d ? " mbsc-sc-itm-inv-h mbsc-disabled" : "") + (v[l] ? " mbsc-sc-itm-inv mbsc-disabled" : "") + '" data-index="' + i + '" data-val="' + Ee(l) + '"' + (m ? ' aria-label="' + m + '"' : "") + (u ? ' aria-selected="true"' : "") + ' style="height:' + y + "px;line-height:" + y + "px;" + (s ? ya + "transform:rotateX(" + (e._offset - i) * g % 360 + "deg) translateZ(" + y * _.rows / 2 + "px);" : "") + '">' + (1 < w ? '<div class="mbsc-sc-itm-ml" style="line-height:' + Math.round(y / w) + "px;font-size:" + Math.round(y / w * .8) + 'px;">' : "") + c + (1 < w ? "</div>" : "") + "</div>";
            return p
        }

        function $(e, t, a, n) {
            var s, i = v[e], o = n || i._disabled, r = N(i, t), l = E(i, r), c = l, m = l, d = 0, u = 0;
            if (!0 === o[l]) {
                for (s = 0; r - d >= i.min && o[c] && s < 100;) s++, c = E(i, r - ++d);
                for (s = 0; r + u < i.max && o[m] && s < 100;) s++, m = E(i, r + ++u);
                l = (u < d && u && 2 !== a || !d || r - d < 0 || 1 == a) && !o[m] ? m : c
            }
            return l
        }

        function L(n, s, i, e, o, t, r) {
            var l, c, m, d, u = S._isVisible;
            p = !0, d = _.validate.call(h, {
                values: T.slice(0),
                index: s,
                direction: i
            }, S) || {}, p = !1, d.valid && (S._tempWheelArray = T = d.valid.slice(0)), t || fa.each(v, function (e, a) {
                if (u && a._$markup.find(".mbsc-sc-itm-inv").removeClass("mbsc-sc-itm-inv mbsc-disabled"), a._disabled = {}, d.disabled && d.disabled[e] && fa.each(d.disabled[e], function (e, t) {
                    a._disabled[t] = !0, u && a._$markup.find('.mbsc-sc-itm[data-val="' + Ee(t) + '"]').addClass("mbsc-sc-itm-inv mbsc-disabled")
                }), T[e] = a.multiple ? T[e] : $(e, T[e], i), u) {
                    if (a.multiple && void 0 !== s || a._$markup.find(".mbsc-sc-itm-sel").removeClass(x).removeAttr("aria-selected"), c = N(a, T[e]), l = c - a._index + a._batch, Math.abs(l) > 2 * C + 1 && (m = l + (2 * C + 1) * (0 < l ? -1 : 1), a._offset += m, a._margin -= m * y, a._refresh()), a._index = c + a._batch, a.multiple) {
                        if (void 0 === s) for (var t in S._tempSelected[e]) a._$markup.find('.mbsc-sc-itm[data-val="' + Ee(t) + '"]').addClass(x).attr("aria-selected", "true")
                    } else a._$markup.find('.mbsc-sc-itm[data-val="' + Ee(T[e]) + '"]').addClass("mbsc-sc-itm-sel").attr("aria-selected", "true");
                    a._$active && a._$active.attr("tabindex", -1), a._$active = a._$markup.find('.mbsc-sc-itm[data-index="' + a._index + '"]').eq(f && a.multiple ? 1 : 0).attr("tabindex", 0), r && s === e && a._$active.length && (a._$active[0].focus(), a._$scroller.parent().scrollTop(0)), a._scroller.scroll(-(c - a._offset + a._batch) * y, s === e || void 0 === s ? n : M, o)
                }
            }), b("onValidated", {
                index: s,
                time: n
            }), S._tempValue = _.formatValue.call(h, T, S), u && S._updateHeader(), S.live && function (e, t) {
                var a = v[e];
                return a && (!a.multiple || 1 !== a.multiple && t && (!0 === _.setOnTap || _.setOnTap[e]))
            }(s, t) && (S._hasValue = e || S._hasValue, Y(e, e, 0, !0), e && b("onSet", {valueText: S._value})), e && b("onChange", {
                index: s,
                valueText: S._tempValue
            })
        }

        function O(e, t, a, n, s, i, o, r) {
            var l = E(e, a);
            void 0 !== l && (T[t] = l, e._batch = e._array ? Math.floor(a / e._length) * e._length : 0, e._index = a, setTimeout(function () {
                L(n, t, s, !0, i, o, r)
            }, 10))
        }

        function Y(e, t, a, n, s) {
            if (n ? S._tempValue = _.formatValue.call(h, S._tempWheelArray, S) : L(a), !s) {
                S._wheelArray = [];
                for (var i = 0; i < T.length; i++) S._wheelArray[i] = v[i] && v[i].multiple ? Object.keys(S._tempSelected[i] || {})[0] : T[i];
                S._value = S._hasValue ? S._tempValue : null, S._selected = ba(!0, {}, S._tempSelected)
            }
            e && (S._isInput && o.val(S._hasValue ? S._tempValue : ""), b("onFill", {
                valueText: S._hasValue ? S._tempValue : "",
                change: t
            }), t && (S._preventChange = !0, o.trigger("change")))
        }

        xe.call(this, h, t, !0), S.setVal = S._setVal = function (e, t, a, n, s) {
            S._hasValue = null != e, S._tempWheelArray = T = fa.isArray(e) ? e.slice(0) : _.parseValue.call(h, e, S) || [], Y(t, void 0 === a ? t : a, s, !1, n)
        }, S.getVal = S._getVal = function (e) {
            var t = S._hasValue || e ? S[e ? "_tempValue" : "_value"] : null;
            return ra(t) ? +t : t
        }, S.setArrayVal = S.setVal, S.getArrayVal = function (e) {
            return e ? S._tempWheelArray : S._wheelArray
        }, S.changeWheel = function (e, t, a) {
            var n, s;
            fa.each(e, function (e, t) {
                (s = i[e]) && (n = s._nr, ba(s, t), H(s, n, !0), S._isVisible && (f && s._$3d.html(P(s, n, s._first + C - c + 1, s._last - C + c, !0)), s._$scroller.html(P(s, n, s._first, s._last)).css("margin-top", s._margin + "px"), s._refresh(p)))
            }), !S._isVisible || S._isLiquid || p || S.position(), p || L(t, void 0, void 0, a)
        }, S.getValidValue = $, S._generateContent = function () {
            var a, n = 0, s = "", i = f ? ya + "transform: translateZ(" + (y * _.rows / 2 + 3) + "px);" : "",
                o = '<div class="mbsc-sc-whl-l" style="' + i + "height:" + y + "px;margin-top:-" + (y / 2 + (_.selectedLineBorder || 0)) + 'px;"></div>',
                r = 0;
            return fa.each(_.wheels, function (e, t) {
                s += '<div class="mbsc-w-p mbsc-sc-whl-gr-c' + (f ? " mbsc-sc-whl-gr-3d-c" : "") + (_.showLabel ? " mbsc-sc-lbl-v" : "") + '">' + o + '<div class="mbsc-sc-whl-gr' + (f ? " mbsc-sc-whl-gr-3d" : "") + (l ? " mbsc-sc-cp" : "") + (_.width || _.maxWidth ? '"' : '" style="max-width:' + _.maxPopupWidth + 'px;"') + ">", fa.each(t, function (e, t) {
                    S._tempSelected[r] = ba({}, S._selected[r]), v[r] = H(t, r), n += _.maxWidth ? _.maxWidth[r] || _.maxWidth : _.width ? _.width[r] || _.width : 0, a = void 0 !== t.label ? t.label : e, s += '<div class="mbsc-sc-whl-w ' + (t.cssClass || "") + (t.multiple ? " mbsc-sc-whl-multi" : "") + '" style="' + (_.width ? "width:" + (_.width[r] || _.width) + "px;" : (_.minWidth ? "min-width:" + (_.minWidth[r] || _.minWidth) + "px;" : "") + (_.maxWidth ? "max-width:" + (_.maxWidth[r] || _.maxWidth) + "px;" : "")) + '">' + (d ? '<div class="mbsc-sc-bar-c"><div class="mbsc-sc-bar"></div></div>' : "") + '<div class="mbsc-sc-whl-o" style="' + i + '"></div>' + o + '<div aria-live="off" aria-label="' + a + '"' + (t.multiple ? ' aria-multiselectable="true"' : "") + ' role="listbox" data-index="' + r + '" class="mbsc-sc-whl" style="height:' + _.rows * y * (f ? 1.1 : 1) + 'px;">' + (l ? '<div data-index="' + r + '" data-step="1" class="mbsc-sc-btn mbsc-sc-btn-plus ' + (_.btnPlusClass || "") + '"></div><div data-index="' + r + '" data-step="-1" class="mbsc-sc-btn mbsc-sc-btn-minus ' + (_.btnMinusClass || "") + '"></div>' : "") + '<div class="mbsc-sc-lbl">' + a + '</div><div class="mbsc-sc-whl-c" style="height:' + m + "px;margin-top:-" + (m / 2 + 1) + "px;" + i + '"><div class="mbsc-sc-whl-sc" style="top:' + (m - y) / 2 + 'px;">', s += P(t, r, t._first, t._last) + "</div></div>", f && (s += '<div class="mbsc-sc-whl-3d" style="height:' + y + "px;margin-top:-" + y / 2 + 'px;">', s += P(t, r, t._first + C - c + 1, t._last - C + c, !0), s += "</div>"), s += "</div></div>", r++
                }), s += "</div></div>"
            }), n && (_.maxPopupWidth = n), s
        }, S._attachEvents = function (e) {
            s = ut(fa(".mbsc-sc-btn", e), F, _.delay, I, !0), fa(".mbsc-sc-whl", e).on("keydown", n).on("keyup", r)
        }, S._detachEvents = function () {
            s.stop();
            for (var e = 0; e < v.length; e++) v[e]._scroller.destroy()
        }, S._markupReady = function (e) {
            fa(".mbsc-sc-whl-w", a = e).each(function (s) {
                var i, e = fa(this), o = v[s];
                o._$markup = e, o._$scroller = fa(".mbsc-sc-whl-sc", this), o._$3d = fa(".mbsc-sc-whl-3d", this), o._scroller = new ht(this, {
                    mousewheel: _.mousewheel,
                    moveElement: o._$scroller,
                    scrollbar: fa(".mbsc-sc-bar-c", this),
                    initialPos: (o._first - o._index) * y,
                    contSize: _.rows * y,
                    snap: y,
                    minScroll: k(o),
                    maxScroll: D(o),
                    maxSnapScroll: C,
                    prevDef: !0,
                    stopProp: !0,
                    timeUnit: 3,
                    easing: "cubic-bezier(0.190, 1.000, 0.220, 1.000)",
                    sync: function (e, t, a) {
                        var n = t ? ya + "transform " + Math.round(t) + "ms " + a : "";
                        f && (o._$3d[0].style[_a + "Transition"] = n, o._$3d[0].style[_a + "Transform"] = "rotateX(" + -e / y * g + "deg)")
                    },
                    onStart: function (e, t) {
                        t.settings.readonly = I(s)
                    },
                    onGestureStart: function () {
                        e.addClass("mbsc-sc-whl-a mbsc-sc-whl-anim"), b("onWheelGestureStart", {index: s})
                    },
                    onGestureEnd: function (e) {
                        var t = 90 == e.direction ? 1 : 2, a = e.duration, n = e.destinationY;
                        i = Math.round(-n / y) + o._offset, O(o, s, i, a, t)
                    },
                    onAnimationStart: function () {
                        e.addClass("mbsc-sc-whl-anim")
                    },
                    onAnimationEnd: function () {
                        e.removeClass("mbsc-sc-whl-a mbsc-sc-whl-anim"), b("onWheelAnimationEnd", {index: s}), o._$3d.find(".mbsc-sc-itm-del").remove()
                    },
                    onMove: function (e) {
                        !function (e, t, a) {
                            var n = Math.round(-a / y) + e._offset, s = n - e._current, i = e._first, o = e._last,
                                r = i + C - c + 1, l = o - C + c;
                            s && (e._first += s, e._last += s, e._current = n, 0 < s ? (e._$scroller.append(P(e, t, Math.max(o + 1, i + s), o + s)), fa(".mbsc-sc-itm", e._$scroller).slice(0, Math.min(s, o - i + 1)).remove(), f && (e._$3d.append(P(e, t, Math.max(l + 1, r + s), l + s, !0)), fa(".mbsc-sc-itm", e._$3d).slice(0, Math.min(s, l - r + 1)).attr("class", "mbsc-sc-itm-del"))) : s < 0 && (e._$scroller.prepend(P(e, t, i + s, Math.min(i - 1, o + s))), fa(".mbsc-sc-itm", e._$scroller).slice(Math.max(s, i - o - 1)).remove(), f && (e._$3d.prepend(P(e, t, r + s, Math.min(r - 1, l + s), !0)), fa(".mbsc-sc-itm", e._$3d).slice(Math.max(s, r - l - 1)).attr("class", "mbsc-sc-itm-del"))), e._margin += s * y, e._$scroller.css("margin-top", e._margin + "px"))
                        }(o, s, e.posY)
                    },
                    onBtnTap: function (e) {
                        u(s, fa(e.target))
                    }
                })
            }), L()
        }, S._fillValue = function () {
            Y(S._hasValue = !0, !0, 0, !0)
        }, S._clearValue = function () {
            fa(".mbsc-sc-whl-multi .mbsc-sc-itm-sel", a).removeClass(x).removeAttr("aria-selected")
        }, S._readValue = function () {
            var e = o.val() || "", a = 0;
            "" !== e && (S._hasValue = !0), S._tempWheelArray = T = S._hasValue && S._wheelArray ? S._wheelArray.slice(0) : _.parseValue.call(h, e, S) || [], S._tempSelected = ba(!0, {}, S._selected), fa.each(_.wheels, function (e, t) {
                fa.each(t, function (e, t) {
                    v[a] = H(t, a), a++
                })
            }), Y(!1, !1, 0, !0), b("onRead")
        }, S.__processSettings = function (e) {
            _ = S.settings, b = S.trigger, w = _.multiline, x = "mbsc-sc-itm-sel mbsc-ic mbsc-ic-" + _.checkIcon, (d = !_.touchUi) && (_.tapSelect = !0, _.circular = !1, _.rows = e.rows || t.rows || 7)
        }, S.__init = function (e) {
            e && (S._wheelArray = null), v = [], i = {}, l = _.showScrollArrows, f = _.scroll3d && Ae && !l && !d && ("ios" == _.theme || "ios" == _.baseTheme), y = _.height, m = f ? 2 * Math.round((y - .03 * (y * _.rows / 2 + 3)) / 2) : y, c = Math.round(1.8 * _.rows), g = 360 / (2 * c), l && (_.rows = Math.max(3, _.rows))
        }, S._getItemValue = A, S._tempSelected = {}, S._selected = {}, e || S.init()
    }

    Fe.prototype = {
        _hasDef: !0,
        _hasTheme: !0,
        _hasLang: !0,
        _responsive: !0,
        _class: "scroller",
        _presets: Ne,
        _defaults: ba({}, xe.prototype._defaults, {
            minWidth: 80,
            height: 40,
            rows: 3,
            multiline: 1,
            delay: 200,
            readonly: !1,
            showLabel: !0,
            setOnTap: !1,
            wheels: [],
            preset: "",
            speedUnit: .0012,
            timeUnit: .08,
            checkIcon: "checkmark",
            compClass: "mbsc-sc",
            validate: function () {
            },
            formatValue: function (e) {
                return e.join(" ")
            },
            parseValue: function (e, a) {
                var n, s, i = [], o = [], r = 0;
                return null != e && (i = (e + "").split(" ")), fa.each(a.settings.wheels, function (e, t) {
                    fa.each(t, function (e, t) {
                        s = t.data, n = a._getItemValue(s[0]), fa.each(s, function (e, t) {
                            if (i[r] == a._getItemValue(t)) return n = a._getItemValue(t), !1
                        }), o.push(n), r++
                    })
                }), o
            }
        })
    }, k.Scroller = Fe;

    function ft(g) {
        function e(e) {
            var t, a, n, s, i = [];
            if (e) {
                for (t = 0; t < e.length; t++) if ((a = e[t]).start && a.end && !oe.test(a.start)) for (n = new Date(ot(a.start, f, I)), s = new Date(ot(a.end, f, I)); n <= s;) i.push(at(n.getFullYear(), n.getMonth(), n.getDate())), n.setDate(n.getDate() + 1); else i.push(a);
                return i
            }
            return e
        }

        function A(e, t, a, n) {
            return Math.min(n, Math.floor(e / t) * t + a)
        }

        function t(e, t, a) {
            return Math.floor((a - t) / e) * e + t
        }

        function a(e) {
            return e.getFullYear() + "-" + ee(e.getMonth() + 1) + "-" + ee(e.getDate())
        }

        function r(e, t, a, n) {
            var s;
            return void 0 === M[t] || (s = +e[M[t]], isNaN(s)) ? a ? Z[t](a) : void 0 !== l[t] ? l[t] : Z[t](n) : s
        }

        function x(e) {
            var t, a = new Date((new Date).setHours(0, 0, 0, 0));
            if (null === e) return e;
            void 0 !== M.dd && (t = e[M.dd].split("-"), t = new Date(t[0], t[1] - 1, t[2])), void 0 !== M.tt && (t = t || a, t = new Date(t.getTime() + e[M.tt] % 86400 * 1e3));
            var n = r(e, "y", t, a), s = r(e, "m", t, a), i = Math.min(r(e, "d", t, a), I.getMaxDayOfMonth(n, s)),
                o = r(e, "h", t, a);
            return I.getDate(n, s, i, P && r(e, "a", t, a) ? o + 12 : o, r(e, "i", t, a), r(e, "s", t, a), r(e, "u", t, a))
        }

        function T(e, t) {
            var a, n, s = ["y", "m", "d", "a", "h", "i", "s", "u", "dd", "tt"], i = [];
            if (null == e) return e;
            for (a = 0; a < s.length; a++) void 0 !== M[n = s[a]] && (i[M[n]] = Z[n](e)), t && (l[n] = Z[n](e));
            return i
        }

        function y(e, t) {
            return I.getYear(e) === I.getYear(t) && I.getMonth(e) === I.getMonth(t)
        }

        function _(e, t) {
            return !(!t && e < N) && (!(!t && V < e) && (!!n(e, D) || !n(e, k)))
        }

        function n(e, t) {
            var a, n, s;
            if (t) for (n = 0; n < t.length; n++) if (s = (a = t[n]) + "", !a.start) if (ct.test(s)) {
                if ((s = +s.replace("w", "")) == e.getDay()) return !0
            } else if (lt.test(s)) {
                if ((s = s.split("/"))[1]) {
                    if (s[0] - 1 == e.getMonth() && s[1] == e.getDate()) return !0
                } else if (s[0] == e.getDate()) return !0
            } else if (a = ot(a, f, I), e.getFullYear() == a.getFullYear() && e.getMonth() == a.getMonth() && e.getDate() == a.getDate()) return !0;
            return !1
        }

        function w(e, t, a, n, s, i, o) {
            var r, l, c, m;
            if (e) for (l = 0; l < e.length; l++) if (m = (r = e[l]) + "", !r.start) if (ct.test(m)) for (c = (m = +m.replace("w", "")) - n; c < s; c += 7) 0 <= c && (i[c + 1] = o); else lt.test(m) ? (m = m.split("/"))[1] ? m[0] - 1 == a && (i[m[1]] = o) : i[m[0]] = o : (r = ot(r, f, I), I.getYear(r) == t && I.getMonth(r) == a && (i[I.getDay(r)] = o))
        }

        function C(e, t, a, n, s, i, o, r) {
            var l, c, m, d, u, h, f, p, b, v, g, x, T, y, _, w, C, M, S, k, D = {}, N = I.getDate(n, s, i),
                V = ["a", "h", "i", "s"];
            if (e) {
                for (f = 0; f < e.length; f++) (g = e[f]).start && (g.apply = !1, M = (C = (m = g.d) + "").split("/"), m && (m.getTime && n == I.getYear(m) && s == I.getMonth(m) && i == I.getDay(m) || !ct.test(C) && (M[1] && i == M[1] && s == M[0] - 1 || !M[1] && i == M[0]) || ct.test(C) && N.getDay() == +C.replace("w", "")) && (g.apply = !0, D[N] = !0));
                for (f = 0; f < e.length; f++) if (g = e[f], w = l = 0, p = K[a], b = G[a], c = !(_ = y = !0), g.start && (g.apply || !g.d && !D[N])) {
                    for (x = g.start.split(":"), T = g.end.split(":"), v = 0; v < 3; v++) void 0 === x[v] && (x[v] = 0), void 0 === T[v] && (T[v] = 59), x[v] = +x[v], T[v] = +T[v];
                    if ("tt" == a) p = A(Math.round((new Date(N).setHours(x[0], x[1], x[2]) - new Date(N).setHours(0, 0, 0, 0)) / 1e3), E, 0, 86400), b = A(Math.round((new Date(N).setHours(T[0], T[1], T[2]) - new Date(N).setHours(0, 0, 0, 0)) / 1e3), E, 0, 86400); else {
                        for (x.unshift(11 < x[0] ? 1 : 0), T.unshift(11 < T[0] ? 1 : 0), P && (12 <= x[1] && (x[1] = x[1] - 12), 12 <= T[1] && (T[1] = T[1] - 12)), v = 0; v < t; v++) void 0 !== F[v] && (S = A(x[v], X[V[v]], K[V[v]], G[V[v]]), k = A(T[v], X[V[v]], K[V[v]], G[V[v]]), h = u = d = 0, P && 1 == v && (d = x[0] ? 12 : 0, u = T[0] ? 12 : 0, h = F[0] ? 12 : 0), y || (S = 0), _ || (k = G[V[v]]), (y || _) && S + d < F[v] + h && F[v] + h < k + u && (c = !0), F[v] != S && (y = !1), F[v] != k && (_ = !1));
                        if (!r) for (v = t + 1; v < 4; v++) 0 < x[v] && (l = X[a]), T[v] < G[V[v]] && (w = X[a]);
                        c || (S = A(x[t], X[a], K[a], G[a]) + l, k = A(T[t], X[a], K[a], G[a]) - w, y && (p = S), _ && (b = k))
                    }
                    if (y || _ || c) for (v = p; v <= b; v += X[a]) o[v] = !r
                }
            }
        }

        var E, s, i, o, M = {}, l = {}, F = [], c = function (e) {
                var t, a, n, s = {};
                if (e.is("input")) {
                    switch (e.attr("type")) {
                        case"date":
                            t = "yy-mm-dd";
                            break;
                        case"datetime":
                            t = "yy-mm-ddTHH:ii:ssZ";
                            break;
                        case"datetime-local":
                            t = "yy-mm-ddTHH:ii:ss";
                            break;
                        case"month":
                            t = "yy-mm", s.dateOrder = "mmyy";
                            break;
                        case"time":
                            t = "HH:ii:ss"
                    }
                    s.format = t, a = e.attr("min"), n = e.attr("max"), a && "undefined" != a && (s.min = se(t, a)), n && "undefined" != n && (s.max = se(t, n))
                }
                return s
            }(fa(this)), m = ba({}, g.settings), d = Q[m.calendarSystem], I = ba(g.settings, re, d, He, c, m), u = I.preset,
            h = "datetime" == u ? I.dateFormat + I.separator + I.timeFormat : "time" == u ? I.timeFormat : I.dateFormat,
            f = c.format || h, p = (I.dateWheels || I.dateFormat, I.timeWheels || I.timeFormat),
            S = I.dateWheels || I.dateDisplay, b = p, v = I.baseTheme || I.theme, k = e(I.invalid), D = e(I.valid),
            N = ot(I.min, f, I), V = ot(I.max, f, I), H = /time/i.test(u), P = /h/.test(b), $ = /D/.test(S),
            L = I.steps || {}, O = L.hour || I.stepHour || 1, Y = L.minute || I.stepMinute || 1,
            z = L.second || I.stepSecond || 1, R = L.zeroBased, W = R || !N ? 0 : N.getHours() % O,
            j = R || !N ? 0 : N.getMinutes() % Y, J = R || !N ? 0 : N.getSeconds() % z, U = t(O, W, P ? 11 : 23),
            B = t(Y, j, 59), q = t(Y, j, 59),
            K = {y: N ? N.getFullYear() : -1 / 0, m: 0, d: 1, h: W, i: j, s: J, a: 0, tt: 0},
            G = {y: V ? V.getFullYear() : 1 / 0, m: 11, d: 31, h: U, i: B, s: q, a: 1, tt: 86400},
            X = {y: 1, m: 1, d: 1, h: O, i: Y, s: z, a: 1, tt: 1}, Z = {
                y: function (e) {
                    return I.getYear(e)
                }, m: function (e) {
                    return I.getMonth(e)
                }, d: function (e) {
                    return I.getDay(e)
                }, h: function (e) {
                    var t = e.getHours();
                    return A(t = P && 12 <= t ? t - 12 : t, O, W, U)
                }, i: function (e) {
                    return A(e.getMinutes(), Y, j, B)
                }, s: function (e) {
                    return A(e.getSeconds(), z, J, q)
                }, u: function (e) {
                    return e.getMilliseconds()
                }, a: function (e) {
                    return 11 < e.getHours() ? 1 : 0
                }, dd: a, tt: function (e) {
                    return A(Math.round((e.getTime() - new Date(e).setHours(0, 0, 0, 0)) / 1e3), E || 1, 0, 86400)
                }
            };
        return g.getVal = function (e) {
            return g._hasValue || e ? ie(x(g.getArrayVal(e)), I, f) : null
        }, g.getDate = function (e) {
            return g._hasValue || e ? x(g.getArrayVal(e)) : null
        }, g.setDate = function (e, t, a, n, s) {
            g.setArrayVal(T(e, !0), t, s, n, a)
        }, M = g.remote.datetime.wheelOrder, s = g.remote.datetime.oneDateWheel, E = g.remote.datetime.timeStep, i = g.remote.datetime.wheels, I.isoParts = o = g.remote.datetime.isoParts, I.dateDisplay = S, g.remote.datetime.isValid = _, g.remote.datetime.getFullDate = a, g.remote.datetime.getDateIndex = function (e, t) {
            return t ? Math.floor(new Date(e) / 864e5) : e.getMonth() + 12 * (e.getFullYear() - 1970)
        }, g.remote.datetime.datetime = {formatDate: ne}, g._format = h, g._order = M, g.handlers.now = function () {
            g.setDate(new Date, g.live, 1e3, !0, !0)
        }, g.buttons.now = {text: I.nowText, icon: I.nowIcon, handler: "now"}, {
            minWidth: s && H ? {bootstrap: 46, ios: 50, material: 46, mobiscroll: 46, windows: 50}[v] : void 0,
            compClass: "mbsc-dt mbsc-sc",
            wheels: i,
            headerText: !!I.headerText && function () {
                return ne(h, x(g.getArrayVal(!0)), I)
            },
            formatValue: function (e) {
                return ne(f, x(e), I)
            },
            parseValue: function (e) {
                return e || (l = {}, g._hasValue = !1), T(ot(e || I.defaultValue || new Date, f, I, o), !!e)
            },
            validate: function (e) {
                var t, r, a, n, s = e.values, i = e.index, o = e.direction, l = I.wheels[0][M.d], c = function (e, t) {
                        var a, n, s = !1, i = !1, o = 0, r = 0, l = N ? x(T(N)) : -1 / 0, c = V ? x(T(V)) : 1 / 0;
                        if (_(e)) return e;
                        if (e < l && (e = l), c < e && (e = c), n = a = e, 2 !== t) for (s = _(a, !0); !s && a < c && o < 100;) s = _(a = new Date(a.getTime() + 864e5), !0), o++;
                        if (1 !== t) for (i = _(n, !0); !i && l < n && r < 100;) i = _(n = new Date(n.getTime() - 864e5), !0), r++;
                        return 1 === t && s ? a : 2 === t && i ? n : y(e, a) ? a : y(e, n) ? n : r <= o && i ? n : a
                    }(x(s), o), m = T(c), d = [], u = {}, h = Z.y(c), f = Z.m(c), p = I.getMaxDayOfMonth(h, f), b = !0,
                    v = !0;
                if (fa.each(["dd", "y", "m", "d", "tt", "a", "h", "i", "s"], function (e, a) {
                    var t = K[a], n = G[a], s = Z[a](c);
                    if (d[M[a]] = [], b && N && (t = Z[a](N)), v && V && (n = Z[a](V)), s < t && (s = t), n < s && (s = n), "dd" !== a && "tt" !== a && (b = b && s == t, v = v && s == n), void 0 !== M[a]) {
                        if ("y" != a && "dd" != a) for (r = K[a]; r <= G[a]; r += X[a]) (r < t || n < r) && d[M[a]].push(r);
                        if ("d" == a) {
                            var i = I.getDate(h, f, 1).getDay(), o = {};
                            w(k, h, f, i, p, o, 1), w(D, h, f, i, p, o, 0), fa.each(o, function (e, t) {
                                t && d[M[a]].push(e)
                            })
                        }
                    }
                }), H && fa.each(["a", "h", "i", "s", "tt"], function (e, a) {
                    var t = Z[a](c), n = Z.d(c), s = {};
                    void 0 !== M[a] && (C(k, e, a, h, f, n, s, 0), C(D, e, a, h, f, n, s, 1), fa.each(s, function (e, t) {
                        t && d[M[a]].push(e)
                    }), F[e] = g.getValidValue(M[a], t, o, s))
                }), l && (l._length !== p || $ && (void 0 === i || i === M.y || i === M.m))) {
                    for ((u[M.d] = l).data = [], t = 1; t <= p; t++) n = I.getDate(h, f, t).getDay(), a = S.replace(/[my|]/gi, "").replace(/dd/, (t < 10 ? "0" + t : t) + (I.daySuffix || "")).replace(/d/, t + (I.daySuffix || "")), l.data.push({
                        value: t,
                        display: /DD/.test(a) ? a.replace(/DD/, '<span class="mbsc-dt-day">' + I.dayNames[n] + "</span>") : a.replace(/D/, '<span class="mbsc-dt-day">' + I.dayNamesShort[n] + "</span>")
                    });
                    g._tempWheelArray[M.d] = m[M.d], g.changeWheel(u)
                }
                return {disabled: d, valid: m}
            }
        }
    }

    function Ie(D) {
        var p, b, v, a, n, g, l, s, o, e, N, x, T, i, y, _, r, V, c, w, C, A, M, S, E, k, F, m, I, H, P, $, d, u, L, h,
            O, Y, z, R, f, W, j, J, U, B, q, K, G, X, Z, Q, ee, te, ae, ne, se, ie, oe, re, le, ce, me, de, ue, he, fe,
            pe, be, ve, ge, xe, Te, t, ye, _e, we = 1, Ce = this;

        function Me(e) {
            e.hasClass("mbsc-cal-h") || e.addClass("mbsc-cal-h")
        }

        function Se(e) {
            e.hasClass("mbsc-cal-h") ? function (e) {
                e.hasClass("mbsc-cal-h") && e.removeClass("mbsc-cal-h")
            }(e) : Me(e)
        }

        function ke(e, t, a) {
            e[t] = e[t] || [], e[t].push(a)
        }

        function De(e, r, l) {
            var c, m, d, u, h, f, p, b = ce.getDate, v = ce.getYear, g = ce.getMonth, x = ce.getDay,
                T = ce.getMaxDayOfMonth, y = v(r), _ = g(r), w = {};
            return e && fa.each(e, function (e, t) {
                if (c = t.d || t.start || t, m = c + "", t.start && t.end) for (p = st(ot(t.start, S, ce)), f = st(ot(t.end, S, ce)); p <= f;) ke(w, p, t), p = b(v(p), g(p), x(p) + 1); else if (ct.test(m)) for (p = Ke(r, !1, +m.replace("w", "")); p <= l;) ke(w, p, t), p = b(v(p), g(p), x(p) + 7); else if (lt.test(m)) {
                    var a = !!(m = m.split("/"))[1], n = a ? 1 : 0, s = a ? 0 : 1, i = a ? m[0] - 1 : _,
                        o = a ? +m[1] : +m[0];
                    for (h = T(y, i), p = b(y, i, Math.min(o, h)); p <= l;) d = v(p), u = g(p), x(p) === o && ke(w, p, t), h = T(d + n, u + s), p = b(d + n, u + s, Math.min(o, h))
                } else ke(w, st(ot(c, S, ce)), t)
            }), w
        }

        function Ne(e) {
            var t, a, n, s, i = !!f[e] && f[e], o = !!W[e] && W[e],
                r = o && o[0].background ? o[0].background : i && i[0].background, l = "";
            if (o) for (t = 0; t < o.length; t++) l += (o[t].cssClass || "") + " ";
            if (i) {
                for (n = '<div class="mbsc-cal-marks">', t = 0; t < i.length; t++) l += ((a = i[t]).cssClass || "") + " ", n += '<div class="mbsc-cal-mark"' + (a.color ? ' style="background:' + a.color + ';"' : "") + "></div>";
                n += "</div>"
            }
            return s = {
                marked: i,
                background: r,
                cssClass: l,
                markup: C[e] ? C[e].join("") : m ? n : ""
            }, ba(s, D._getDayProps(e, s))
        }

        function Ve(e) {
            return ' style="' + (z ? "transform: translateY(" + 100 * e + "%)" : "left:" + 100 * e * le + "%") + '"'
        }

        function Ae(e) {
            return Ge(e, ie - 1) > j && (e = Ge(j, 1 - ie)), e < K && (e = K), e
        }

        function Ee(e, t, a) {
            var n = "none" === e.background, s = n ? "none" : e.color, i = n ? e.color : dt(s), o = e.text;
            return '<div data-id="' + e._id + '" data-index="' + t + '" class="mbsc-cal-txt' + (n ? " mbsc-cal-txt-only" : "") + '" title="' + fa("<div>" + o + "</div>").text() + '"' + (s ? ' style="background:' + s + (a && i ? ";color:" + i : "") + ';"' : "") + ">" + (a ? o : "") + "</div>"
        }

        function Fe(e) {
            var t = Ke(Ge(e, -oe - se), !1), a = Ke(Ge(e, -oe + ie + se - 1), !1);
            a = ce.getDate(ce.getYear(a), ce.getMonth(a), ce.getDay(a) + 7 * N), D._onGenMonth(t, a), $ = De(ce.invalid, t, a), ue = De(ce.valid, t, a), f = De(ce.labels || ce.events || ce.marked, t, a), W = De(ce.colors, t, a), R = D._labels || f || W, (F = ce.labels || D._labels) && function () {
                C = {};
                for (var g = {}, x = t, e = function () {
                    x.getDay() == E && (g = {});
                    for (var e = U, t = R[x] || [], a = t.length, n = [], s = void 0, i = void 0, o = 0, r = 0, l = 0, c = void 0; o < e;) if (s = null, t.forEach(function (e, t) {
                        g[o] == e && (s = e, i = t)
                    }), o == e - 1 && (r < a - 1 || a && l == a && !s)) {
                        var m = a - r,
                            d = (1 < m && ce.moreEventsPluralText || ce.moreEventsText).replace(/{count}/, m);
                        m && n.push('<div class="mbsc-cal-txt-more">' + d + "</div>"), s && (g[o] = null, s._days.forEach(function (e) {
                            C[e][o] = '<div class="mbsc-cal-txt-more">' + ce.moreEventsText.replace(/{count}/, 1) + "</div>"
                        })), r++, o++
                    } else if (s) i == l && l++, rt(x, ot(s.end)) && (g[o] = null), n.push(Ee(s, i)), o++, r++, s._days.push(x); else if (l < a) {
                        var u = t[l], h = u.start && ot(u.start), f = u.end && ot(u.end), p = x.getDay(),
                            b = 0 < E - p ? 7 : 0, v = f && !rt(h, f);
                        h && !rt(x, h) && p != E || (void 0 === u._id && (u._id = we++), v && (g[o] = u), u._days = [x], c = v ? 100 * Math.min(nt(x, st(f)) + 1, 7 + E - p - b) : 100, n.push(v ? '<div class="mbsc-cal-txt-w" style="width:' + c + '%">' + Ee(u, l, !0) + "</div>" + Ee(u, l) : Ee(u, l, !0)), o++, r++), l++
                    } else n.push('<div class="mbsc-cal-txt-ph"></div>'), o++;
                    C[x] = n, x = ce.getDate(ce.getYear(x), ce.getMonth(x), ce.getDay(x) + 1)
                }; x < a;) e()
            }()
        }

        function Ie(e) {
            var t = ce.getYear(e), a = ce.getMonth(e);
            We(o = w = e), de("onMonthChange", {year: t, month: a}), de("onMonthLoading", {
                year: t,
                month: a
            }), de("onPageChange", {firstDay: e}), de("onPageLoading", {firstDay: e}), Fe(e)
        }

        function He(e) {
            var t = ce.getYear(e), a = ce.getMonth(e);
            void 0 === ne ? Pe(e, t, a) : Oe(e, ne, !0), Ye(o, M.focus), M.focus = !1
        }

        function Pe(e, t, a) {
            var n = M.$scroller;
            fa(".mbsc-cal-slide", n).removeClass("mbsc-cal-slide-a"), fa(".mbsc-cal-slide", n).slice(se, se + ie).addClass("mbsc-cal-slide-a"), fa(".mbsc-cal-slide-a .mbsc-cal-day", n).on("mouseenter", function () {
                var e = fa(this);
                fe || O || (P = setTimeout(function () {
                    d = !0, de("onCellHoverIn", Je(e))
                }, 150))
            }).on("mouseleave", function () {
                clearTimeout(P), !fe && d && (d = !1, de("onCellHoverOut", Je(fa(this))))
            }), F && fa(".mbsc-cal-slide-a .mbsc-cal-txt", n).on("mouseenter", function () {
                var e = fa(this).attr("data-id");
                fa('.mbsc-cal-txt[data-id="' + e + '"]', n).addClass("mbsc-hover")
            }).on("mouseleave", function () {
                fa(".mbsc-cal-txt.mbsc-hover", n).removeClass("mbsc-hover")
            }), de("onMonthLoaded", {year: t, month: a}), de("onPageLoaded", {firstDay: e})
        }

        function $e(e, t) {
            var a, n = ce.getYear(e),
                s = '<div class="mbsc-cal-slide"' + Ve(t) + '><div role="grid" class="mbsc-cal-table"><div role="row" class="mbsc-cal-row">';
            for (a = 0; a < 12; a++) a && a % 3 == 0 && (s += '</div><div role="row" class="mbsc-cal-row">'), s += '<div role="gridcell" tabindex="-1" aria-label="' + n + '" data-val="' + n + '" class="mbsc-cal-cell mbsc-btn-e ' + (n < Z || q < n ? " mbsc-disabled " : "") + (n == ce.getYear(w) ? V : "") + '"><div class="mbsc-cal-cell-i mbsc-cal-cell-txt">' + n + Te + "</div></div>", n++;
            return s += "</div></div></div>"
        }

        function Le(e, t) {
            var a, n, s, i, o, r, l, c, m, d, u, h, f, p, b, v, g, x, T = 1, y = ce.getYear(e), _ = ce.getMonth(e),
                w = ce.getDay(e), C = null !== ce.defaultValue || D._hasValue ? D.getDate(!0) : null,
                M = ce.getDate(y, _, w).getDay(), S = 0 < E - M ? 7 : 0,
                k = '<div class="mbsc-cal-slide"' + Ve(t) + '><div role="grid" class="mbsc-cal-table"><div role="row" class="mbsc-cal-row">';
            for (g = 0; g < 7 * N; g++) v = g + E - S, i = (n = ce.getDate(y, _, v - M + w)).getFullYear(), o = n.getMonth(), r = n.getDate(), l = ce.getMonth(n), c = ce.getDay(n), b = ce.getMaxDayOfMonth(i, o), m = i + "-" + (o + 1) + "-" + r, a = "none" !== (d = ba({
                valid: (x = n, !(x < K || j < x || void 0 !== $[x] && void 0 === ue[x])),
                selected: C && rt(C, n)
            }, Ne(n))).background && d.background, u = d.valid, h = d.selected, s = d.cssClass, f = new Date(n).setHours(12, 0, 0, 0) === (new Date).setHours(12, 0, 0, 0), p = l !== _, A[m] = d, g && g % 7 == 0 && (k += '</div><div role="row" class="mbsc-cal-row">'), pe && g % 7 == 0 && ("month" == pe && p && 1 < T ? T = 1 == r ? 1 : 2 : "year" == pe && (T = ce.getWeekNumber(ce.getDate(i, o, r + (7 - E + 1) % 7))), k += '<div role="gridcell" class="mbsc-cal-cell mbsc-cal-week-nr">' + T + "</div>", T++), k += '<div role="gridcell" aria-label="' + (f ? ce.todayText + ", " : "") + ce.dayNames[n.getDay()] + ", " + ce.monthNames[l] + " " + c + " " + (d.ariaLabel ? ", " + d.ariaLabel : "") + '"' + (p && !me ? ' aria-hidden="true"' : ' data-full="' + m + '"') + (p || !u ? ' aria-disabled="true"' : "") + (h ? ' aria-selected="true"' : "") + (u ? ' tabindex="-1"' : "") + ' class="mbsc-cal-cell mbsc-cal-day mbsc-cal-day' + v % 7 + " " + (ce.dayClass || "") + " " + (h ? V : "") + (f ? " " + ce.todayClass : "") + (s ? " " + s : "") + (1 == c ? " mbsc-cal-day-first" : "") + (c == b ? " mbsc-cal-day-last" : "") + (p ? " mbsc-cal-day-diff" : "") + (u ? " mbsc-btn-e" : " mbsc-disabled") + (d.marked ? " mbsc-cal-day-marked" : "") + (a ? " mbsc-cal-day-colored" : "") + '"><div class="mbsc-cal-cell-i mbsc-cal-day-i"><div class="mbsc-cal-day-date mbsc-cal-cell-txt"' + (a ? ' style="background:' + a + ";color:" + dt(a) + '"' : "") + ">" + c + "</div>" + D._getText(na, .06) + (d.markup ? '<div class="mbsc-cal-day-markup">' + d.markup + "</div>" : "") + "</div></div>";
            return k += "</div></div></div>"
        }

        function Oe(e, t, a) {
            var n, s = ce.getYear(e), i = ce.getMonth(e), o = M ? M.pos : 0, r = "";
            if (A = {}, N) for (t || (de("onMonthLoading", {
                year: s,
                month: i
            }), de("onPageLoading", {firstDay: e})), Fe(e), n = 0; n < re; n++) r += Le(Ge(e, n - oe - se), o * le + n - se);
            return ne = void 0, a && M && (M.$active = null, M.$scroller.html(r), Pe(e, s, i)), r
        }

        function Ye(e, t) {
            if (M) {
                var a = M.$active;
                a && a.length && (a[0].blur(), a.hasClass("mbsc-disabled") ? a.removeAttr("tabindex") : a.attr("tabindex", "-1")), M.$active = fa('.mbsc-cal-slide-a .mbsc-cal-day[data-full="' + it(e) + '"]', M.$scroller).attr("tabindex", "0"), t && M.$active.length && M.$active[0].focus()
            }
        }

        function ze(e, t) {
            fa(".mbsc-selected", t).removeClass(V).removeAttr("aria-selected"), fa('.mbsc-cal-cell[data-val="' + e + '"]', t).addClass(V).attr("aria-selected", "true")
        }

        function Re(e, t, a, n) {
            var s, i;
            he && (e < K && (e = K), j < e && (e = j), "calendar" !== he && I && !t || (D._isSetDate = !t, k && N && (i = Ke(Ae(e), h), ae && (e < Ge(w, -oe) || e >= Ge(w, ie - oe)) && (s = h ? ce.getMonth(i) - ce.getMonth(w) + 12 * (ce.getYear(i) - ce.getYear(w)) : Math.floor(nt(w, i) / (7 * N))) && (M.queue = [], M.focus = n && a, Ze(M, s, a)), s && a || Ye(e, n), t || function (e) {
                var t = M && M.$scroller;
                ce.highlight && M && (fa(".mbsc-selected", t).removeClass(V).removeAttr("aria-selected"), null === ce.defaultValue && !D._hasValue || fa('.mbsc-cal-day[data-full="' + it(e) + '"]', t).addClass(V).attr("aria-selected", "true"))
            }(e), h || We(e, !0), o = e, ae = !0), D._onSetDate(e, s), D._isSetDate = !1))
        }

        function We(e, t) {
            var a, n, s, i = ce.getYear(e), o = ce.getMonth(e), r = i + Te;
            if (H) {
                if (ze(o, te.$scroller), ze(i, xe.$scroller), Ze(xe, Math.floor(i / 12) - Math.floor(ce.getYear(xe.first) / 12), !0), fa(".mbsc-cal-cell", te.$scroller).removeClass("mbsc-disabled"), i === Z) for (a = 0; a < X; a++) fa('.mbsc-cal-cell[data-val="' + a + '"]', te.$scroller).addClass("mbsc-disabled");
                if (i === q) for (a = B + 1; a <= 12; a++) fa('.mbsc-cal-cell[data-val="' + a + '"]', te.$scroller).addClass("mbsc-disabled")
            }
            for (t || (je(fa(".mbsc-cal-prev-m", b), Ge(e, -oe) <= K), je(fa(".mbsc-cal-next-m", b), Ge(e, ie - oe) > j), je(fa(".mbsc-cal-prev-y", b), ce.getDate(i - 1, o + 1, 1) <= K), je(fa(".mbsc-cal-next-y", b), ce.getDate(i + 1, o, 1) > j)), l.attr("aria-label", i).html(r), a = 0; a < ie; a++) e = ce.getDate(i, o - oe + a, 1), n = ce.getYear(e), s = ce.getMonth(e), r = n + Te, v.eq(a).attr("aria-label", ce.monthNames[s] + (ve ? "" : " " + i)).html((!ve && ge < Q ? r + " " : "") + ee[s] + (!ve && Q < ge ? " " + r : ""))
        }

        function je(e, t) {
            t ? e.addClass(r).attr("aria-disabled", "true") : e.removeClass(r).removeAttr("aria-disabled")
        }

        function Je(e) {
            var t = e[0], a = e.attr("data-full"), n = a ? a.split("-") : [], s = at(n[0], n[1] - 1, n[2]),
                i = e.hasClass("mbsc-selected");
            return ba(A[a], {date: s, target: t, selected: i})
        }

        function Ue(e, t) {
            var a = D.getDate(!0), n = Je(e), s = e[0], i = n.date,
                o = at(i.getFullYear(), i.getMonth(), i.getDate(), a.getHours(), a.getMinutes(), a.getSeconds()),
                r = fa(t.target), l = r[0];
            if (me || !e.hasClass("mbsc-cal-day-diff")) {
                if (n.date = o, F && s.contains(l)) for (; l != s;) {
                    if (r.hasClass("mbsc-cal-txt") || r.hasClass("mbsc-cal-txt-more")) {
                        var c = r.attr("data-index"), m = R[i];
                        if (!1 === de("onLabelTap", {
                            date: o,
                            domEvent: t,
                            target: r[0],
                            labels: m,
                            label: m[c]
                        })) return;
                        break
                    }
                    l = (r = r.parent())[0]
                }
                !1 === de("onDayChange", n) || ce.readonly || e.hasClass("mbsc-disabled") || D._selectDay(e, i, o, n.selected)
            }
        }

        function Be(e) {
            Me(a), Re(ce.getDate(ce.getYear(M.first), e.attr("data-val"), 1), !0, !0)
        }

        function qe(e) {
            Me(s), Re(ce.getDate(e.attr("data-val"), ce.getMonth(M.first), 1), !0, !0)
        }

        function Ke(e, t, a) {
            var n = ce.getYear(e), s = ce.getMonth(e), i = e.getDay(), o = 0 < E - i ? 7 : 0;
            return t ? ce.getDate(n, s, 1) : ce.getDate(n, s, (void 0 === a ? E : a) - o - i + ce.getDay(e))
        }

        function Ge(e, t) {
            var a = ce.getYear(e), n = ce.getMonth(e), s = ce.getDay(e);
            return h ? ce.getDate(a, n + t, 1) : ce.getDate(a, n, s + t * N * 7)
        }

        function Xe(e, t) {
            var a = 12 * Math.floor(ce.getYear(e) / 12);
            return ce.getDate(a + 12 * t, 0, 1)
        }

        function Ze(e, t, a, n) {
            t && D._isVisible && (e.queue.push(arguments), 1 == e.queue.length && function n(s, i, e, o) {
                var r, l, t = "", c = s.$scroller, m = s.buffer, d = s.offset, a = s.pages, u = s.total, h = s.first,
                    f = s.genPage, p = s.getFirst, b = 0 < i ? Math.min(i, m) : Math.max(i, -m),
                    v = s.pos * le + b - i + d, g = Math.abs(i) > m;
                s.callback && (s.load(), s.callback(!0));
                s.first = p(h, i);
                s.pos += b * le;
                s.changing = !0;
                s.load = function () {
                    if (g) {
                        for (r = 0; r < a; r++) t += f(p(h, l = i + r - d), v + l);
                        0 < i ? (fa(".mbsc-cal-slide", c).slice(-a).remove(), c.append(t)) : i < 0 && (fa(".mbsc-cal-slide", c).slice(0, a).remove(), c.prepend(t))
                    }
                };
                s.callback = function (e) {
                    var t = Math.abs(b), a = "";
                    if (D._isVisible) {
                        for (r = 0; r < t; r++) a += f(p(h, l = i + r - d - m + (0 < i ? u - t : 0)), v + l);
                        if (0 < i ? (c.append(a), fa(".mbsc-cal-slide", c).slice(0, b).remove()) : i < 0 && (c.prepend(a), fa(".mbsc-cal-slide", c).slice(b).remove()), g) {
                            for (a = "", r = 0; r < t; r++) a += f(p(h, l = i + r - d - m + (0 < i ? 0 : u - t)), v + l);
                            0 < i ? (fa(".mbsc-cal-slide", c).slice(0, b).remove(), c.prepend(a)) : i < 0 && (fa(".mbsc-cal-slide", c).slice(b).remove(), c.append(a))
                        }
                        et(s), o && !e && o(), s.callback = null, s.load = null, s.queue.shift(), g = !1, s.queue.length ? n.apply(this, s.queue[0]) : (s.changing = !1, s.onAfterChange(s.first))
                    }
                };
                s.onBeforeChange(s.first);
                s.load && (s.load(), s.scroller.scroll(-s.pos * s.size, e ? 200 : 0, !1, s.callback))
            }(e, t, a, n))
        }

        function Qe(e, t, a, n, s, i, o, r, l, c, m, d, u) {
            var h = z ? "Y" : "X", f = {
                $scroller: fa(".mbsc-cal-scroll", e),
                queue: [],
                buffer: n,
                offset: s,
                pages: i,
                first: r,
                total: o,
                pos: 0,
                min: t,
                max: a,
                genPage: d,
                getFirst: u,
                onBeforeChange: c,
                onAfterChange: m
            };
            return f.scroller = new ht(e, {
                axis: h,
                easing: "",
                contSize: 0,
                maxSnapScroll: n,
                mousewheel: void 0 === ce.mousewheel ? z : ce.mousewheel,
                time: 200,
                lock: !0,
                rtl: Y,
                stopProp: !1,
                minScroll: 0,
                maxScroll: 0,
                onBtnTap: function (e) {
                    "touchend" == e.domEvent.type && ma(), l(fa(e.target), e.domEvent)
                },
                onStart: function () {
                    clearTimeout(P), O = !0
                },
                onAnimationStart: function () {
                    f.changing = !0
                },
                onAnimationEnd: function (e) {
                    O = !1, d && Ze(f, Math.round((-f.pos * f.size - e["pos" + h]) / f.size) * le)
                }
            }), D._scrollers.push(f.scroller), f
        }

        function et(e, t) {
            var a, n = 0, s = 0, i = e.first;
            if (!e.changing || !t) {
                if (e.getFirst) {
                    for (n = e.buffer, s = e.buffer; s && e.getFirst(i, s + e.pages - e.offset - 1) > e.max;) s--;
                    for (; n && e.getFirst(i, 1 - n - e.offset) <= e.min;) n--
                }
                a = Math.round(x / e.pages), L && a && e.size != a && e.$scroller[z ? "height" : "width"](a), ba(e.scroller.settings, {
                    snap: a,
                    minScroll: (-e.pos * le - s) * a,
                    maxScroll: (-e.pos * le + n) * a
                }), e.size = a, e.scroller.refresh()
            }
        }

        function tt(e) {
            D._onRefresh(e), D._isVisible && k && N && (M && M.changing ? ne = e : (Oe(w, e, !0), Ye(o)))
        }

        return y = {}, _ = [], C = {}, de = D.trigger, _e = ba({}, D.settings), t = (ce = ba(D.settings, pt, _e)).controls.join(","), E = ce.firstDay, Y = ce.rtl, se = ce.pageBuffer, pe = ce.weekCounter, N = ce.weeks, h = 6 == N, z = "vertical" == ce.calendarScroll, i = D._getRespCont(), be = "full" == ce.weekDays ? "" : "min" == ce.weekDays ? "Min" : "Short", ye = ce.layout || ("inline" == ce.display || /top|bottom/.test(ce.display) && ce.touchUi ? "liquid" : ""), T = (L = "liquid" == ye) ? null : ce.calendarWidth, le = Y && !z ? -1 : 1, r = "mbsc-disabled " + (ce.disabledClass || ""), c = "mbsc-selected " + (ce.selectedTabClass || ""), V = "mbsc-selected " + (ce.selectedClass || ""), U = Math.max(1, Math.floor(((ce.calendarHeight || 0) / N - 45) / 18)), t.match(/calendar/) && (y.calendar = 1, k = !0), t.match(/date/) && !k && (y.date = 1), t.match(/time/) && (y.time = 1), ce.controls.forEach(function (e) {
            y[e] && _.push(e)
        }), H = ce.quickNav && k && h, ve = ce.yearChange && h, L && k && "center" == ce.display && (D._isFullScreen = !0), ce.layout = ye, ce.preset = (y.date || k ? "date" : "") + (y.time ? "time" : ""), e = ft.call(this, D), ee = ve ? ce.monthNamesShort : ce.monthNames, Te = ce.yearSuffix || "", Q = (ce.dateWheels || ce.dateFormat).search(/m/i), ge = (ce.dateWheels || ce.dateFormat).search(/y/i), S = D._format, ce.min && (K = st(ot(ce.min, S, ce)), Z = ce.getYear(K), X = ce.getMonth(K), G = ce.getDate(12 * Math.floor(Z / 12), 0, 1)), ce.max && (j = st(ot(ce.max, S, ce)), q = ce.getYear(j), B = ce.getMonth(j), J = ce.getDate(12 * Math.floor(q / 12), 0, 1)), D._minDate = K, D._maxDate = j, D.refresh = function () {
            tt(!1)
        }, D.redraw = function () {
            tt(!0)
        }, D.navigate = function (e, t) {
            Re(ot(e, S, ce), !0, t)
        }, D.changeTab = function (e) {
            D._isVisible && y[e] && he != e && (he = e, fa(".mbsc-cal-tab", b).removeClass(c).removeAttr("aria-selected"), fa('.mbsc-cal-tab[data-control="' + e + '"]', b).addClass(c).attr("aria-selected", "true"), I && (g.addClass("mbsc-cal-h"), y[he].removeClass("mbsc-cal-h")), "calendar" == he && Re(D.getDate(!0), !1, !0), D._showDayPicker(), D.trigger("onTabChange", {tab: he}))
        }, D._checkSize = !0, D._onGenMonth = oa, D._onSetDate = oa, D._onRefresh = oa, D._getDayProps = oa, D._prepareObj = De, D._showDayPicker = function () {
            H && (Me(s), Me(a))
        }, D._selectDay = D.__selectDay = function (e, t, a) {
            var n = D.live;
            ae = ce.outerMonthChange, u = !0, D.setDate(a, n, 1e3, !n, !0), n && de("onSet", {valueText: D._value})
        }, D._checkBtn = je, ba(e, {
            labels: null, compClass: "mbsc-calendar mbsc-dt mbsc-sc", onMarkupReady: function (e) {
                var t = 0;
                b = fa(e.target), n = fa(".mbsc-fr-c", b), o = D.getDate(!0), x = 0, k && (m = !(!ce.marked && !ce.data || ce.labels || ce.multiLabel || ce.showEventCount), ae = !0, he = "calendar", ie = "auto" == ce.months ? Math.max(1, Math.min(3, Math.floor((T || mt(i)) / 280))) : +ce.months, re = ie + 2 * se, z = z && ie < 2, me = void (oe = 0) === ce.showOuterDays ? ie < 2 && !z : ce.showOuterDays, w = Ke(Ae(o), h), n.append(function () {
                    var e, t, a, n, s, i, o = "", r = Y ? ce.btnCalNextClass : ce.btnCalPrevClass,
                        l = Y ? ce.btnCalPrevClass : ce.btnCalNextClass;
                    for (s = '<div class="mbsc-cal-btn-w"><div data-step="-1" role="button" tabindex="0" aria-label="' + ce.prevMonthText + '" class="' + r + ' mbsc-cal-prev mbsc-cal-prev-m mbsc-cal-btn mbsc-fr-btn mbsc-fr-btn-e"></div>', t = 0; t < (N ? ie : 1); t++) s += '<div role="button" class="mbsc-cal-month"></div>';
                    if (s += '<div data-step="1" role="button" tabindex="0" aria-label="' + ce.nextMonthText + '" class="' + l + ' mbsc-cal-next mbsc-cal-next-m mbsc-cal-btn mbsc-fr-btn mbsc-fr-btn-e"></div></div>', ve && (o = '<div class="mbsc-cal-btn-w"><div data-step="-12" role="button" tabindex="0" aria-label="' + ce.prevYearText + '" class="' + r + ' mbsc-cal-prev mbsc-cal-prev-y mbsc-cal-btn mbsc-fr-btn mbsc-fr-btn-e"></div><div role="button" class="mbsc-cal-year"></div><div data-step="12" role="button" tabindex="0" aria-label="' + ce.nextYearText + '" class="' + l + ' mbsc-cal-next mbsc-cal-next-y mbsc-cal-btn mbsc-fr-btn mbsc-fr-btn-e"></div></div>'), N && (i = Oe(w)), e = '<div class="mbsc-w-p mbsc-cal-c"><div class="mbsc-cal ' + (h ? "" : " mbsc-cal-week-view") + (1 < ie ? " mbsc-cal-multi " : "") + (pe ? " mbsc-cal-weeks " : "") + (z ? " mbsc-cal-vertical" : "") + (m ? " mbsc-cal-has-marks" : "") + (F ? " mbsc-cal-has-labels" : "") + (me ? "" : " mbsc-cal-hide-diff ") + (ce.calendarClass || "") + '"' + (L ? "" : ' style="width:' + (T || 280 * ie) + 'px;"') + '><div class="mbsc-cal-hdr">' + (ge < Q || 1 < ie ? o + s : s + o) + "</div>", N) {
                        for (e += '<div class="mbsc-cal-body"><div class="mbsc-cal-day-picker"><div class="mbsc-cal-days-c">', a = 0; a < ie; a++) {
                            for (e += '<div class="mbsc-cal-days">', t = 0; t < 7; t++) e += '<div class="mbsc-cal-week-day' + (n = (t + E) % 7) + '" aria-label="' + ce.dayNames[n] + '">' + ce["dayNames" + be][n] + "</div>";
                            e += "</div>"
                        }
                        e += '</div><div class="mbsc-cal-scroll-c mbsc-cal-day-scroll-c ' + (ce.calendarClass || "") + '"' + (ce.calendarHeight ? ' style="height:' + ce.calendarHeight + 'px"' : "") + '><div class="mbsc-cal-scroll" style="width:' + 100 / ie + '%">' + i + "</div></div>"
                    }
                    if (e += "</div>", H) {
                        for (e += '<div class="mbsc-cal-month-picker mbsc-cal-picker mbsc-cal-h"><div class="mbsc-cal-scroll-c ' + (ce.calendarClass || "") + '"><div class="mbsc-cal-scroll">', t = 0; t < 3; t++) {
                            for (e += '<div class="mbsc-cal-slide"' + Ve(t - 1) + '><div role="grid" class="mbsc-cal-table"><div role="row" class="mbsc-cal-row">', a = 0; a < 12; a++) a && a % 3 == 0 && (e += '</div><div role="row" class="mbsc-cal-row">'), e += '<div role="gridcell"' + (1 == t ? ' tabindex="-1" aria-label="' + ce.monthNames[a] + '" data-val="' + a + '"' : "") + ' class="mbsc-cal-cell' + (1 == t ? " mbsc-btn-e" : "") + '"><div class="mbsc-cal-cell-i mbsc-cal-cell-txt">' + (1 == t ? ce.monthNamesShort[a] : "&nbsp;") + "</div></div>";
                            e += "</div></div></div>"
                        }
                        for (e += "</div></div></div>", e += '<div class="mbsc-cal-year-picker mbsc-cal-picker mbsc-cal-h"><div class="mbsc-cal-scroll-c ' + (ce.calendarClass || "") + '"><div class="mbsc-cal-scroll">', t = -1; t < 2; t++) e += $e(Xe(w, t), t);
                        e += "</div></div></div>"
                    }
                    return e += "</div></div></div>"
                }()), v = fa(".mbsc-cal-month", b), l = fa(".mbsc-cal-year", b), p = fa(".mbsc-cal-day-scroll-c", b)), H && (s = fa(".mbsc-cal-year-picker", b), a = fa(".mbsc-cal-month-picker", b)), g = fa(".mbsc-w-p", b), 1 < _.length && n.before(function () {
                    var a, n;
                    return a = '<div class="mbsc-cal-tabs-c"><div class="mbsc-cal-tabs" role="tablist">', _.forEach(function (e, t) {
                        n = ce[("calendar" == e ? "date" : e) + "Text"], a += '<div role="tab" aria-controls="' + Ce.id + "-mbsc-pnl-" + t + '" class="mbsc-cal-tab mbsc-fr-btn-e ' + (t ? "" : c) + '" data-control="' + e + '"' + (ce.tabLink ? '><a href="#">' + n + "</a>" : ' tabindex="0">' + n) + "</div>"
                    }), a += "</div></div>"
                }()), ["date", "time", "calendar"].forEach(function (e) {
                    y[e] ? (y[e] = g.eq(t), t++) : "date" == e && !y.date && k && (g.eq(t).remove(), t++)
                }), _.forEach(function (e) {
                    n.append(y[e])
                }), !k && y.date && y.date.css("position", "relative"), D._scrollers = [], function () {
                    if (k && N) {
                        var e = fa(".mbsc-cal-scroll-c", b);
                        M = Qe(e[0], K, j, se, oe, ie, re, w, Ue, Ie, He, Le, Ge), H && (te = Qe(e[1], null, null, 1, 0, 1, 3, w, Be), xe = Qe(e[2], G, J, 1, 0, 1, 3, w, qe, oa, oa, $e, Xe), D.tap(v, function () {
                            Se(a), Me(s)
                        }), D.tap(l, function () {
                            Se(s), Me(a)
                        })), ut(fa(".mbsc-cal-btn", b), function (e, t, a, n) {
                            Ze(M, t, !0, n)
                        }), He(w), null === ce.defaultValue && !D._hasValue || D._multiple || (D._activeElm = M.$active[0]), p.on("touchstart mousedown", function (e) {
                            fe = "touchstart" === e.type
                        }).on("keydown", function (e) {
                            var t, a = ce.getYear(o), n = ce.getMonth(o), s = ce.getDay(o);
                            switch (e.keyCode) {
                                case 32:
                                    Ue(M.$active, e);
                                    break;
                                case 37:
                                    t = ce.getDate(a, n, s - 1 * le);
                                    break;
                                case 39:
                                    t = ce.getDate(a, n, s + 1 * le);
                                    break;
                                case 38:
                                    t = ce.getDate(a, n, s - 7);
                                    break;
                                case 40:
                                    t = ce.getDate(a, n, s + 7);
                                    break;
                                case 36:
                                    t = ce.getDate(a, n, 1);
                                    break;
                                case 35:
                                    t = ce.getDate(a, n + 1, 0);
                                    break;
                                case 33:
                                    t = e.altKey ? ce.getDate(a - 1, n, s) : h ? ce.getDate(a, n - 1, s) : ce.getDate(a, n, s - 7 * N);
                                    break;
                                case 34:
                                    t = e.altKey ? ce.getDate(a + 1, n, s) : h ? ce.getDate(a, n + 1, s) : ce.getDate(a, n, s + 7 * N)
                            }
                            t && (e.preventDefault(), Re(t, !0, !1, !0))
                        })
                    }
                    D.tap(fa(".mbsc-cal-tab", b), function () {
                        D.changeTab(fa(this).attr("data-control"))
                    })
                }()
            }, onShow: function () {
                k && N && We(h ? w : o)
            }, onHide: function () {
                D._scrollers.forEach(function (e) {
                    e.destroy()
                }), he = xe = te = M = A = null
            }, onValidated: function (e) {
                var t, a, n = e.index, s = D._order;
                a = D.getDate(!0), u ? t = "calendar" : void 0 !== n && (t = s.dd == n || s.d == n || s.m == n || s.y == n ? "date" : "time"), de("onSetDate", {
                    date: a,
                    control: t
                }), "time" !== t && Re(a, !1, !!e.time, u && !D._multiple), u = !1
            }, onPosition: function (e) {
                var t, a, n, s, i, o, r, l = e.oldHeight, c = e.windowHeight;
                if (I = (e.hasTabs || !0 === ce.tabs || !1 !== ce.tabs && L) && 1 < _.length, L && (e.windowWidth >= ce.breakPointMd ? fa(e.target).addClass("mbsc-fr-md") : fa(e.target).removeClass("mbsc-fr-md")), I ? (b.addClass("mbsc-cal-tabbed"), he = fa(".mbsc-cal-tab.mbsc-selected", b).attr("data-control"), g.addClass("mbsc-cal-h"), y[he].removeClass("mbsc-cal-h")) : (b.removeClass("mbsc-cal-tabbed"), g.removeClass("mbsc-cal-h")), D._isFullScreen && (p.height(""), r = c - (i = e.popup.offsetHeight) + p[0].offsetHeight, i <= c && p.height(r)), F && N && c != l) {
                    var m = r || p[0].offsetHeight, d = p.find(".mbsc-cal-txt-ph")[0], u = d.offsetTop,
                        h = d.offsetHeight, f = Math.max(1, Math.floor((m / N - u) / (h + 2)));
                    U != f && (U = f, D.redraw())
                }
                if (k && N) {
                    if (s = (o = L || z || I ? p[0][z ? "offsetHeight" : "offsetWidth"] : T || 280 * ie) != x, x = o, L && s && ve) for (ee = ce.maxMonthWidth > v[0].offsetWidth ? ce.monthNamesShort : ce.monthNames, a = ce.getYear(w), n = ce.getMonth(w), t = 0; t < ie; t++) v.eq(t).text(ee[ce.getMonth(ce.getDate(a, n - oe + t, 1))]);
                    s && et(M, !0)
                }
                H && s && (et(te, !0), et(xe, !0))
            }
        })
    }

    var He = {
        separator: " ",
        dateFormat: "mm/dd/yy",
        dateDisplay: "MMddyy",
        timeFormat: "h:ii A",
        dayText: "Day",
        monthText: "Month",
        yearText: "Year",
        hourText: "Hours",
        minuteText: "Minutes",
        ampmText: "&nbsp;",
        secText: "Seconds",
        nowText: "Now",
        todayText: "Today"
    }, pt = {
        controls: ["calendar"],
        firstDay: 0,
        weekDays: "short",
        maxMonthWidth: 170,
        breakPointMd: 768,
        months: 1,
        pageBuffer: 1,
        weeks: 6,
        highlight: !0,
        outerMonthChange: !0,
        quickNav: !0,
        yearChange: !0,
        tabs: "auto",
        todayClass: "mbsc-cal-today",
        btnCalPrevClass: "mbsc-ic mbsc-ic-arrow-left6",
        btnCalNextClass: "mbsc-ic mbsc-ic-arrow-right6",
        dateText: "Date",
        timeText: "Time",
        todayText: "Today",
        fromText: "Start",
        toText: "End",
        moreEventsText: "{count} more",
        prevMonthText: "Previous Month",
        nextMonthText: "Next Month",
        prevYearText: "Previous Year",
        nextYearText: "Next Year"
    }, Pe = {};

    function $e(e, t) {
        e.prototype = Object.create(t.prototype), (e.prototype.constructor = e).__proto__ = t
    }

    function Le(e) {
        if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return e
    }

    Ne.calendar = function (l) {
        function i(e) {
            var t, a, n, s = null;
            if (b = {}, e && e.length) for (a = 0; a < e.length; a++) t = ot(e[a], o, u, u.isoParts), s = s || t, b[at((n = t).getFullYear(), n.getMonth(), n.getDate())] = t;
            return s
        }

        function c() {
            l.redraw()
        }

        var n, m, o, d, t, e = ba({}, l.settings), u = ba(l.settings, Pe, e),
            h = "mbsc-selected " + (u.selectedClass || ""), a = u.defaultValue,
            f = "multiple" == u.select || 1 < u.select || "week" == u.selectType, p = ra(u.select) ? u.select : 1 / 0,
            b = {};
        return n = Ie.call(this, l), d = void 0 === u.firstSelectDay ? u.firstDay : u.firstSelectDay, o = l._format, f && i(a), l._multiple = f, l._getDayProps = function (e) {
            return {selected: f ? void 0 !== b[e] : void 0}
        }, l._selectDay = function (e, t, a, n) {
            if (u.setOnDayTap && "multiple" != u.select && "inline" != u.display) return l.setDate(a), void l.select();
            if (f) if ("week" == u.selectType) {
                var s, i, o = t.getDay() - d;
                for (o = o < 0 ? 7 + o : o, "multiple" != u.select && (b = {}), s = 0; s < 7; s++) i = at(t.getFullYear(), t.getMonth(), t.getDate() - o + s), n ? delete b[i] : te(b).length / 7 < p && (b[i] = i);
                c()
            } else {
                var r = fa('.mbsc-cal-day[data-full="' + e.attr("data-full") + '"]', m);
                n ? (r.removeClass(h).removeAttr("aria-selected"), delete b[t]) : te(b).length < p && (r.addClass(h).attr("aria-selected", "true"), b[t] = t)
            }
            l.__selectDay(e, t, a)
        }, l.setVal = function (e, t, a, n, s) {
            f && (e = i(e)), l._setVal(e, t, a, n, s), f && c()
        }, l.getVal = function (e) {
            var t, a = [];
            if (f) {
                for (t in b) a.push(ie(b[t], u, o));
                return a
            }
            return ie(l.getDate(e), u, o)
        }, ba({}, n, {
            highlight: !f, outerMonthChange: !f, parseValue: function (e) {
                return f && e && "string" == typeof e && (e = i(e.split(","))), f && a && a.length && (u.defaultValue = a[0]), n.parseValue.call(this, e)
            }, formatValue: function (e) {
                var t, a = [];
                if (f) {
                    for (t in b) a.push(ne(o, b[t], u));
                    return a.join(", ")
                }
                return n.formatValue.call(this, e, l)
            }, onClear: function () {
                f && (b = {}, c())
            }, onBeforeShow: function () {
                void 0 !== u.setOnDayTap || u.buttons && u.buttons.length || 1 != u.controls.length || (u.setOnDayTap = !0), u.setOnDayTap && "inline" != u.display && (u.outerMonthChange = !1), u.counter && f && (u.headerText = function () {
                    var e = 0, t = "week" == u.selectType ? 7 : 1;
                    return fa.each(b, function () {
                        e++
                    }), (1 < (e = Math.round(e / t)) && u.selectedPluralText || u.selectedText).replace(/{count}/, e)
                })
            }, onMarkupReady: function (e) {
                n.onMarkupReady.call(this, e), m = fa(e.target), f && (fa(".mbsc-fr-hdr", m).attr("aria-live", "off"), t = ba({}, b))
            }, onCancel: function () {
                !l.live && f && (b = ba({}, t))
            }
        })
    }, a("calendar", Fe);
    var Oe, Ye = "mbsc-input-wrap",
        ze = ["touchstart", "touchmove", "touchend", "touchcancel", "mousedown", "mousemove", "mouseup", "mouseleave"],
        Re = {tap: W};

    function We(e, t) {
        var a = {}, n = e[0], s = e.parent(), i = s.find(".mbsc-err-msg"), o = e.attr("data-icon-align") || "left",
            r = e.attr("data-icon");
        s.hasClass(Ye) ? s = s.parent() : fa('<span class="' + Ye + '"></span>').insertAfter(e).append(e), i && s.find("." + Ye).append(i), r && (-1 !== r.indexOf("{") ? a = JSON.parse(r) : a[o] = r), "file" == n.type && (a.right = e.attr("data-icon-upload") || "upload"), (r || t) && (ba(a, t), s.addClass((a.right ? "mbsc-ic-right " : "") + (a.left ? " mbsc-ic-left" : "")).find("." + Ye).append('<span class="mbsc-input-fill"></span>').append(a.left ? '<span class="mbsc-input-ic mbsc-left-ic mbsc-ic mbsc-ic-' + a.left + '"></span>' : "").append(a.right ? '<span class="mbsc-input-ic mbsc-right-ic mbsc-ic mbsc-ic-' + a.right + '"></span>' : ""))
    }

    function je(e, t, a, n, s) {
        "segmented" == t ? e.closest(".mbsc-segmented").addClass("box" == a ? "mbsc-input-box" : "").addClass("outline" == a ? "mbsc-input-outline" : "") : "button" != t && "submit" != t && (e.addClass("mbsc-control-w").addClass("box" == a ? "mbsc-input-box" : "").addClass("outline" == a ? "mbsc-input-outline" : "").addClass("inline" == n ? "mbsc-label-inline" : "").addClass("stacked" == n ? "mbsc-label-stacked" : "").addClass("floating" == n ? "mbsc-label-floating" : "").addClass("floating" == n && s.value ? "mbsc-label-floating-active" : "").find("label").addClass("mbsc-label").each(function (e, t) {
            fa(t).attr("title", fa(t).text())
        }), e.contents().filter(function () {
            return 3 == this.nodeType && this.nodeValue && /\S/.test(this.nodeValue)
        }).each(function () {
            fa('<span class="mbsc-label" title="' + this.textContent.trim() + '"></span>').insertAfter(this).append(this)
        }))
    }

    function Je(e) {
        var t = na.themes.form[e];
        return t && t.addRipple ? t : null
    }

    function Ue(e, t, a) {
        var n = e.attr(t);
        return void 0 === n || "" === n ? a : n
    }

    function Be(e) {
        var t = na.themes.form[e.theme].baseTheme;
        return "mbsc-" + e.theme + (t ? " mbsc-" + t : "") + (e.rtl ? " mbsc-rtl" : " mbsc-ltr")
    }

    var qe = function () {
        function e(e, t) {
            var a = this, n = ba({}, Re, na.settings, t), s = fa(e), i = s.parent(),
                o = i.hasClass("mbsc-input-wrap") ? i.parent() : i, r = s.next().hasClass("mbsc-fr") ? s.next() : null,
                l = ua(s), c = Ue(s, "data-input-style", n.inputStyle), m = Ue(s, "data-label-style", n.labelStyle);
            e.mbscInst && e.mbscInst.destroy(), r && r.insertAfter(o), n.theme = V(n), void 0 === n.rtl && n.lang && na.i18n[n.lang] && (n.rtl = na.i18n[n.lang].rtl), je(o, l, c, m, e), s.addClass("mbsc-control"), this._handle = this._handle.bind(this), ze.forEach(function (e) {
                s.on(e, a._handle)
            }), this.settings = n, this._type = l, this._elm = e, this._$elm = s, this._$parent = o, this._$frame = r, this._ripple = Je(n.theme), this._isFloating = "floating" == m || o.hasClass("mbsc-label-floating"), this.cssClass = Be(n), this.getClassElm().addClass(this.cssClass), e.mbscInst = this
        }

        var t = e.prototype;
        return t.getClassElm = function () {
            return this._$parent
        }, t.destroy = function () {
            var t = this;
            this._$elm.removeClass("mbsc-control"), this.getClassElm().removeClass(this.cssClass), ze.forEach(function (e) {
                t._$elm.off(e, t._handle)
            }), delete this._elm.mbscInst
        }, t.option = function (e) {
            ba(this.settings, e);
            var t = this.getClassElm();
            this.cssClass && t.removeClass(this.cssClass), this.cssClass = Be(this.settings), t.addClass(this.cssClass), this._ripple = Je(this.settings.theme)
        }, t._handle = function (e) {
            switch (e.type) {
                case"touchstart":
                case"mousedown":
                    this._onStart(e);
                    break;
                case"touchmove":
                case"mousemove":
                    this._onMove(e);
                    break;
                case"touchend":
                case"touchcancel":
                case"mouseup":
                case"mouseleave":
                    this._onEnd(e)
            }
        }, t._addRipple = function (e) {
            this._ripple && this._$rippleElm && this._ripple.addRipple(this._$rippleElm, e)
        }, t._removeRipple = function () {
            this._ripple && this._$rippleElm && this._ripple.removeRipple()
        }, t._onStart = function (e) {
            var t = this._elm;
            ga(e, t) && (this._startX = da(e, "X"), this._startY = da(e, "Y"), Oe && Oe.removeClass("mbsc-active"), t.disabled || (this._isActive = !0, (Oe = this._$elm).addClass("mbsc-active"), this._addRipple(e))), "touchstart" == e.type && this._$elm.closest(".mbsc-no-touch").removeClass("mbsc-no-touch")
        }, t._onMove = function (e) {
            (this._isActive && 9 < Math.abs(da(e, "X") - this._startX) || 9 < Math.abs(da(e, "Y") - this._startY)) && (this._$elm.removeClass("mbsc-active"), this._removeRipple(), this._isActive = !1)
        }, t._onEnd = function (e) {
            var t = this, a = this._elm, n = this._type;
            this._isActive && this.settings.tap && "touchend" == e.type && !a.readOnly && ha(a, n, e), this._isActive && setTimeout(function () {
                t._$elm.removeClass("mbsc-active"), t._removeRipple()
            }, 100), this._isActive = !1, Oe = null
        }, e
    }();
    na.themes.form.mobiscroll = {};
    var Ke = ["focus", "change", "blur", "animationstart"], Ge = function (r) {
        function e(e, t) {
            var a, n = (a = r.call(this, e, t) || this)._$elm, s = a._$parent,
                i = s.find(".mbsc-select-input, .mbsc-color-input");
            if (!function (e, t, a) {
                var n = {}, s = a[0], i = a.attr("data-password-toggle"), o = a.attr("data-icon-show") || "eye",
                    r = a.attr("data-icon-hide") || "eye-blocked";
                i && (n.right = "password" == s.type ? o : r), We(a, n), i && D(e, t.find(".mbsc-right-ic").addClass("mbsc-input-toggle"), function () {
                    "text" == s.type ? (s.type = "password", fa(this).addClass("mbsc-ic-" + o).removeClass("mbsc-ic-" + r)) : (s.type = "text", fa(this).removeClass("mbsc-ic-" + o).addClass("mbsc-ic-" + r))
                })
            }(Le(a), s, n), a._checkLabel = a._checkLabel.bind(Le(a)), a._mouseDown = a._mouseDown.bind(Le(a)), a._setText = a._setText.bind(Le(a)), "file" == e.type) {
                var o = s.find(".mbsc-file-input");
                a._$input = o.length ? o : fa('<input type="text" class="' + (n.attr("class") || "") + ' mbsc-file-input" placeholder="' + (n.attr("placeholder") || "") + '"/>').insertAfter(n), n.on("change", a._setText)
            }
            return s.addClass("mbsc-input").on("mousedown", a._mouseDown), Ke.forEach(function (e) {
                n.on(e, a._checkLabel)
            }), i.length && (n.after(i), i.hasClass("mbsc-select-input") && (a._delm = i[0], a.refresh())), a
        }

        $e(e, r);
        var t = e.prototype;
        return t._setText = function (e) {
            for (var t = e.target.files, a = [], n = 0; n < t.length; ++n) a.push(t[n].name);
            this._$input.val(a)
        }, t._checkLabel = function (e) {
            if (this._isFloating) {
                var t = this._delm || this._elm;
                t.value || document.activeElement === t || e && ("focus" == e.type || "animationstart" == e.type && this._$elm.is("*:-webkit-autofill")) ? this._$parent.addClass("mbsc-label-floating-active") : this._$parent.removeClass("mbsc-label-floating-active")
            }
        }, t._mouseDown = function (e) {
            document.activeElement === this._elm && e.target !== this._elm && e.preventDefault()
        }, t.refresh = function () {
            this._checkLabel()
        }, t.destroy = function () {
            var t = this;
            r.prototype.destroy.call(this), this._$parent.off("mousedown", this._mouseDown).removeClass("mbsc-ic-left mbsc-ic-right").find(".mbsc-input-ic").remove(), this._$parent.find(".mbsc-input-fill").remove(), Ke.forEach(function (e) {
                t._$elm.off(e, t._checkLabel)
            }), this._$elm.off("change", this._setText)
        }, e
    }(qe);
    S("[mbsc-input]", Ge);
    var Xe = function (i) {
        function e(e, t) {
            var a, n = (a = i.call(this, e, t) || this)._$elm, s = n.attr("data-icon");
            return n.addClass("mbsc-btn mbsc-no-touch").find(".mbsc-btn-ic").remove(), s && (n.prepend('<span class="mbsc-btn-ic mbsc-ic mbsc-ic-' + s + '"></span>'), "" === n.text() && n.addClass("mbsc-btn-icon-only")), a._$rippleElm = n, a
        }

        return $e(e, i), e.prototype.getClassElm = function () {
            return this._$elm
        }, e
    }(qe);
    S("[mbsc-button]", Xe);
    var Ze = function (n) {
        function e(e, t) {
            var a;
            return (a = n.call(this, e, t) || this)._$parent.prepend(a._$elm).addClass("mbsc-checkbox mbsc-control-w").find(".mbsc-checkbox-box").remove(), a._$elm.after('<span class="mbsc-checkbox-box"></span>'), a
        }

        return $e(e, n), e
    }(qe);
    S("[mbsc-checkbox]", Ze);
    var Qe = function (n) {
        function e(e, t) {
            var a;
            return (a = n.call(this, e, t) || this)._$parent.addClass("mbsc-radio mbsc-control-w").find(".mbsc-radio-box").remove(), a._$elm.after('<span class="mbsc-radio-box"><span></span></span>'), a
        }

        return $e(e, n), e
    }(qe);
    S("[mbsc-radio]", Qe);
    var et = function (r) {
        function e(e, t) {
            var a, n = (a = r.call(this, e, t) || this)._$elm, s = a._$parent, i = s.find(".mbsc-select-input"),
                o = i.length ? i : fa('<input tabindex="-1" class="mbsc-select-input mbsc-control" readonly>');
            return a._$input = o, a._delm = o[0], a._setText = a._setText.bind(Le(a)), s.addClass("mbsc-select" + (a._$frame ? " mbsc-select-inline" : "")), n.after(o), o.after('<span class="mbsc-select-ic mbsc-ic mbsc-ic-arrow-down5"></span>'), n.on("change", a._setText), a._setText(), a
        }

        $e(e, r);
        var t = e.prototype;
        return t.destroy = function () {
            r.prototype.destroy.call(this), this._$parent.find(".mbsc-select-ic").remove(), this._$elm.off("change", this._setText)
        }, t._setText = function () {
            var e = this._elm, t = fa(e);
            t.is("select") && !t.hasClass("mbsc-comp") && this._$input.val(-1 != e.selectedIndex ? e.options[e.selectedIndex].text : ""), this.refresh()
        }, e
    }(Ge);
    S("[mbsc-dropdown]", et);
    var tt, bt = ["change", "keydown", "input", "scroll"];

    function vt() {
        clearTimeout(tt), tt = setTimeout(function () {
            fa("textarea.mbsc-control").each(function () {
                gt(this)
            })
        }, 100)
    }

    function gt(e) {
        var t, a, n, s = fa(e).attr("rows") || 6;
        e.offsetHeight && (e.style.height = "", n = e.scrollHeight - e.offsetHeight, t = e.offsetHeight + (0 < n ? n : 0), s < (a = Math.round(t / 24)) ? (t = 24 * s + (t - 24 * a), fa(e).addClass("mbsc-textarea-scroll")) : fa(e).removeClass("mbsc-textarea-scroll"), t && (e.style.height = t + "px"))
    }

    d && fa(window).on("resize orientationchange", vt);
    var xt = function (n) {
        function e(e, t) {
            var a;
            return (a = n.call(this, e, t) || this)._$parent.addClass("mbsc-textarea"), bt.forEach(function (e) {
                a._$elm.on(e, a._handle)
            }), gt(e), a
        }

        $e(e, n);
        var t = e.prototype;
        return t.destroy = function () {
            var t = this;
            n.prototype.destroy.call(this), bt.forEach(function (e) {
                t._$elm.off(e, t._handle)
            })
        }, t.refresh = function () {
            n.prototype.refresh.call(this), clearTimeout(this._debounce), gt(this._elm)
        }, t._handle = function (e) {
            switch (n.prototype._handle.call(this, e), e.type) {
                case"change":
                    gt(this._elm);
                    break;
                case"keydown":
                case"input":
                    this._onInput(e);
                    break;
                case"scroll":
                    !function (e) {
                        var t = fa(e);
                        if (!t.hasClass("mbsc-textarea-scroll")) {
                            var a = e.scrollHeight - e.offsetHeight, n = e.offsetHeight + a;
                            Math.round(n / 24) <= (t.attr("rows") || 6) && (e.scrollTop = 0, e.style.height = n + "px")
                        }
                    }(this._elm)
            }
        }, t._onInput = function () {
            var e = this;
            clearTimeout(this._debounce), this._debounce = setTimeout(function () {
                gt(e._elm)
            }, 100)
        }, e
    }(Ge);
    S("[mbsc-textarea]", xt);
    var Tt = function (r) {
        function e(e, t) {
            var a, n, s, i = (a = r.call(this, e, t) || this)._$elm, o = a._$parent;
            return o.hasClass("mbsc-segmented-item-ready") || (n = fa('<div class="mbsc-segmented mbsc-no-touch"></div>'), o.after(n), o.parent().find('input[name="' + i.attr("name") + '"]').each(function () {
                var e = fa(this);
                s = e.parent().addClass("mbsc-segmented-item mbsc-segmented-item-ready"), fa('<span class="mbsc-segmented-content">' + (e.attr("data-icon") ? '<span class="mbsc-ic mbsc-ic-' + e.attr("data-icon") + '"></span>' : "") + "</span>").append(s.contents()).appendTo(s), s.prepend(e), n.append(s)
            })), a._$rippleElm = i.next(), a
        }

        return $e(e, r), e.prototype.getClassElm = function () {
            return this._$elm.closest(".mbsc-segmented")
        }, e
    }(qe);
    S("[mbsc-segmented]", Tt);

    function yt(t, e) {
        var n, s, i, a, o, r, l, c, m, d, u, h, f, p, b, v, g = "", x = this, T = fa(t), y = p;

        function _() {
            var e;
            t.disabled || (e = parseFloat(fa(this).val()), M(isNaN(e) ? p : e))
        }

        function w() {
            return t.disabled
        }

        function C(e, t) {
            M(p + t * d)
        }

        function M(e, t, a) {
            y = p, void 0 === t && (t = !0), void 0 === a && (a = t), p = k(e), i.removeClass("mbsc-disabled"), t && T.val(p), p == r ? s.addClass("mbsc-disabled") : p == o && n.addClass("mbsc-disabled"), p !== y && a && T.trigger("change")
        }

        function S(e, t, a) {
            var n = T.attr(e);
            return void 0 === n || "" === n ? t : a ? n : +n
        }

        function k(e) {
            return +Math.min(o, Math.max(Math.round(e / d) * d, r)).toFixed(m)
        }

        va.call(this, t, e, !0), x.getVal = function () {
            var e = parseFloat(T.val());
            return k(e = isNaN(e) ? p : e)
        }, x.setVal = function (e, t, a) {
            e = parseFloat(e), M(isNaN(e) ? p : e, t, a)
        }, x._init = function () {
            b = T.parent().hasClass("mbsc-stepper"), v = b ? T.closest(".mbsc-stepper-cont") : T.parent(), h = x.settings, r = void 0 === e.min ? S("min", h.min) : e.min, o = void 0 === e.max ? S("max", h.max) : e.max, d = void 0 === e.step ? S("step", h.step) : e.step, m = Math.abs(d) < 1 ? (d + "").split(".")[1].length : 0, l = void 0 === e.inputStyle ? S("data-input-style", h.inputStyle, !0) : e.inputStyle, a = T.attr("data-val") || h.val, p = k(+t.value || 0), f = na.themes.form[h.theme], c = f && f.addRipple ? f : null, b || v.addClass("mbsc-stepper-cont mbsc-no-touch mbsc-control-w").addClass("box" == l ? "mbsc-input-box" : "").addClass("outline" == l ? "mbsc-input-outline" : "").append('<span class="mbsc-segmented mbsc-stepper"></span>').find(".mbsc-stepper").append('<span class="mbsc-segmented-item mbsc-stepper-control mbsc-stepper-minus ' + (p == r ? "mbsc-disabled" : "") + '" data-step="-1" tabindex="0"><span class="mbsc-segmented-content"><span class="mbsc-ic mbsc-ic-minus"></span></span></span>').append('<span class="mbsc-segmented-item mbsc-stepper-control mbsc-stepper-plus ' + (p == o ? "mbsc-disabled" : "") + '"  data-step="1" tabindex="0"><span class="mbsc-segmented-content"> <span class="mbsc-ic mbsc-ic-plus"></span></span></span>').prepend(T), g && v.removeClass(g).find(".mbsc-segmented").removeClass(g), g = "mbsc-" + h.theme + (f.baseTheme ? " mbsc-" + f.baseTheme : "") + (h.rtl ? " mbsc-rtl" : " mbsc-ltr"), v.addClass(g).find(".mbsc-segmented").addClass(g), s = fa(".mbsc-stepper-minus", v), n = fa(".mbsc-stepper-plus", v), i = fa(".mbsc-stepper-control", v), b || ("left" == a ? (v.addClass("mbsc-stepper-val-left"), T.after('<span class="mbsc-segmented-item"><span class="mbsc-segmented-content"></span></span>')) : "right" == a ? (v.addClass("mbsc-stepper-val-right"), n.after('<span class="mbsc-segmented-item"><span class="mbsc-segmented-content"></span></span>')) : s.after('<span class="mbsc-segmented-item"><span class="mbsc-segmented-content mbsc-stepper-val"></span></span>')), u || (T.on("change", _), u = ut(i, C, 150, w, !1, c)), T.val(p).attr("data-role", "stepper").attr("min", r).attr("max", o).attr("step", d).addClass("mbsc-control"), t.mbscInst = x
        }, x._destroy = function () {
            T.removeClass("mbsc-control").off("change", _), u.destroy(), delete t.mbscInst
        }, x.init()
    }

    yt.prototype = {
        _class: "stepper",
        _hasDef: !0,
        _hasTheme: !0,
        _hasLang: !0,
        _defaults: {min: 0, max: 100, step: 1}
    }, S("[mbsc-stepper]", k.Stepper = yt);

    function _t(t, e, a) {
        var n, s, i, o, r = this;
        va.call(this, t, e, !0), r.__init = oa, r.__destroy = oa, r._init = function () {
            var e;
            o = r.settings, n = fa(t), e = !!s, s = (s = n.parent()).hasClass("mbsc-input-wrap") ? s.parent() : s, r._$parent = s, i && s.removeClass(i), i = r._css + " mbsc-progress-w mbsc-control-w " + Be(o), s.addClass(i), n.addClass("mbsc-control"), r.__init(), e || r._attachChange(), r.refresh(), t.mbscInst = r
        }, r._destroy = function () {
            r.__destroy(), s.removeClass(i), n.removeClass("mbsc-control"), delete t.mbscInst
        }, a || r.init()
    }

    function wt(a, e, t) {
        var n, s, i, l, o, r, c, m, d, u, h, f, p, b, v, g, x, T, y, _, w, C, M, S, k, D, N, V, A, E, F, I, H, P,
            $ = this, L = new Date;

        function O(e) {
            "mousedown" === e.type && e.preventDefault(), !ga(e, this) || m && !x || a.disabled || a.readOnly || (N.stopProp && e.stopPropagation(), u = M = !(m = !0), A = da(e, "X"), E = da(e, "Y"), b = A, c.removeClass("mbsc-progress-anim"), s = S ? fa(".mbsc-slider-handle", this) : l, i && i.removeClass("mbsc-handle-curr"), i = s.parent().addClass("mbsc-active mbsc-handle-curr"), n.addClass("mbsc-active"), g = +s.attr("data-index"), H = c[0].offsetWidth, p = c[0].getBoundingClientRect().left, "mousedown" === e.type && (T = !0, fa(document).on("mousemove", Y).on("mouseup", z)), "mouseenter" === e.type && (x = !0, fa(document).on("mousemove", Y)))
        }

        function Y(e) {
            m && (b = da(e, "X"), v = da(e, "Y"), h = b - A, f = v - E, 5 < Math.abs(h) && (M = !0), (M || T || x) && 50 < Math.abs(L - new Date) && (L = new Date, K(b, N.round, _ && (!x || T))), M ? e.preventDefault() : 7 < Math.abs(f) && "touchmove" == e.type && q())
        }

        function z(e) {
            m && (e.preventDefault(), S || c.addClass("mbsc-progress-anim"), x && !T ? G(P[g], g, !1, !1, !0) : K(b, !0, !0), M || u || ("touchend" == e.type && ma(), $._onTap(P[g])), "mouseup" == e.type && (T = !1), "mouseleave" == e.type && (x = !1), x || q())
        }

        function R() {
            m && q()
        }

        function W() {
            var e = $._readValue(fa(this)), t = +fa(this).attr("data-index");
            e !== P[t] && (P[t] = e, G(k[t] = e, t))
        }

        function j(e) {
            e.stopPropagation()
        }

        function J(e) {
            e.preventDefault()
        }

        function U(e) {
            var t;
            if (!a.disabled) {
                switch (e.keyCode) {
                    case 38:
                    case 39:
                        t = 1;
                        break;
                    case 40:
                    case 37:
                        t = -1
                }
                t && (e.preventDefault(), I || (g = +fa(this).attr("data-index"), G(P[g] + D * t, g, !0), I = setInterval(function () {
                    G(P[g] + D * t, g, !0)
                }, 200)))
            }
        }

        function B(e) {
            e.preventDefault(), clearInterval(I), I = null
        }

        function q() {
            m = !1, i.removeClass("mbsc-active"), n.removeClass("mbsc-active"), fa(document).off("mousemove", Y).off("mouseup", z)
        }

        function K(e, t, a) {
            var n = t ? Math.min(Math[$._rounding || "round"](Math.max(100 * (e - p) / H, 0) / V / D) * D * 100 / (w - C + d), 100) : Math.max(0, Math.min(100 * (e - p) / H, 100));
            y && (n = 100 - n), G(Math.round((C - d + n / V) * F) / F, g, a, n)
        }

        function G(e, t, a, n, s, i) {
            var o = l.eq(t), r = o.parent();
            e = Math.min(w, Math.max(e, C)), void 0 === i && (i = a), $._update ? e = $._update(e, P, t, n, S, s, r) : r.css({
                left: y ? "auto" : (n || X(e, C, w)) + "%",
                right: y ? (n || X(e, C, w)) + "%" : "auto"
            }), C < e ? r.removeClass("mbsc-slider-start") : (P[t] > C || s) && r.addClass("mbsc-slider-start"), a && (P[t] = e), a && k[t] != e && (u = !0, k[t] = e, $._fillValue(e, t, i)), o.attr("aria-valuenow", e)
        }

        _t.call(this, a, e, !0), $._onTap = oa, $.___init = oa, $.___destroy = oa, $._attachChange = function () {
            n.on(N.changeEvent, W)
        }, $.__init = function () {
            var e;
            l && (e = !0, l.parent().remove()), $.___init(), r = $._$parent, c = $._$track, n = r.find("input"), N = $.settings, C = $._min, w = $._max, d = $._base || 0, D = $._step, _ = $._live, F = D % 1 != 0 ? 100 / (100 * (D % 1).toFixed(2)) : 1, V = 100 / (w - C + d) || 100, S = 1 < n.length, y = N.rtl, P = [], k = [], n.each(function (e) {
                P[e] = $._readValue(fa(this)), fa(this).attr("data-index", e)
            }), l = r.find(".mbsc-slider-handle"), o = r.find(S ? ".mbsc-slider-handle-cont" : ".mbsc-progress-cont"), l.on("keydown", U).on("keyup", B).on("blur", B), o.on("touchstart mousedown" + (N.hover ? " mouseenter" : ""), O).on("touchmove", Y).on("touchend touchcancel" + (N.hover ? " mouseleave" : ""), z).on("pointercancel", R), e || (n.on("click", j), r.on("click", J))
        }, $.__destroy = function () {
            r.off("click", J), n.off(N.changeEvent, W).off("click", j), l.off("keydown", U).off("keyup", B).off("blur", B), o.off("touchstart mousedown mouseenter", O).off("touchmove", Y).off("touchend touchcancel mouseleave", z).off("pointercancel", R), $.___destroy()
        }, $.refresh = function () {
            n.each(function (e) {
                G($._readValue(fa(this)), e, !0, !1, !0, !1)
            })
        }, $.getVal = function () {
            return S ? P.slice(0) : P[0]
        }, $.setVal = $._setVal = function (e, t, a) {
            fa.isArray(e) || (e = [e]), fa.each(e, function (e, t) {
                P[e] = t
            }), fa.each(e, function (e, t) {
                G(t, e, !0, !1, !0, a)
            })
        }, t || $.init()
    }

    function Ct(e, t) {
        var n, a, s, i, o = this;
        ba(t = t || {}, {changeEvent: "click", round: !1}), wt.call(this, e, t, !0), o._readValue = function () {
            return e.checked ? 1 : 0
        }, o._fillValue = function (e, t, a) {
            n.prop("checked", !!e), a && n.trigger("change")
        }, o._onTap = function (e) {
            o._setVal(e ? 0 : 1)
        }, o.___init = function () {
            s = o.settings, n = fa(e), (a = n.parent()).find(".mbsc-switch-track").remove(), a.prepend(n), n.attr("data-role", "switch").after('<span class="mbsc-progress-cont mbsc-switch-track"><span class="mbsc-progress-track mbsc-progress-anim"><span class="mbsc-slider-handle-cont"><span class="mbsc-slider-handle mbsc-switch-handle" data-index="0"><span class="mbsc-switch-txt-off">' + s.offText + '</span><span class="mbsc-switch-txt-on">' + s.onText + "</span></span></span></span></span>"), i && i.destroy(), i = new qe(e, s), o._$track = a.find(".mbsc-progress-track"), o._min = 0, o._max = 1, o._step = 1
        }, o.___destroy = function () {
            i.destroy()
        }, o.getVal = function () {
            return e.checked
        }, o.setVal = function (e, t, a) {
            o._setVal(e ? 1 : 0, t, a)
        }, o.init()
    }

    Ct.prototype = {
        _class: "switch",
        _css: "mbsc-switch",
        _hasTheme: !0,
        _hasLang: !0,
        _hasDef: !0,
        _defaults: {stopProp: !0, offText: "Off", onText: "On"}
    }, S("[mbsc-switch]", k.Switch = Ct);

    function Mt(s, i, e) {
        var o, r, l, c, m, d, u, h, f, p, b, v, g, t, x = this;

        function a() {
            var e = T("value", u);
            e !== g && n(e)
        }

        function T(e, t, a) {
            var n = r.attr(e);
            return void 0 === n || "" === n ? t : a ? n : +n
        }

        function n(e, t, a, n) {
            e = Math.min(h, Math.max(e, u)), c.css("width", 100 * (e - u) / (h - u) + "%"), void 0 === a && (a = !0), void 0 === n && (n = a), e === g && !t || x._display(e), e !== g && (g = e, a && r.attr("value", g), n && r.trigger("change"))
        }

        _t.call(this, s, i, !0), x._display = function (e) {
            t = v && b.returnAffix ? v.replace(/\{value\}/, e).replace(/\{max\}/, h) : e, m && m.html(t), o && o.html(t)
        }, x._attachChange = function () {
            r.on("change", a)
        }, x.__init = function () {
            var e, t, a, n;
            if (b = x.settings, r = fa(s), n = !!l, l = x._$parent, u = x._min = void 0 === i.min ? T("min", b.min) : i.min, h = x._max = void 0 === i.max ? T("max", b.max) : i.max, f = void 0 === i.inputStyle ? T("data-input-style", b.inputStyle, !0) : i.inputStyle, p = void 0 === i.labelStyle ? T("data-label-style", b.labelStyle, !0) : i.labelStyle, g = T("value", u), e = r.attr("data-val") || b.val, a = (a = r.attr("data-step-labels")) ? JSON.parse(a) : b.stepLabels, v = r.attr("data-template") || (100 != h || b.template ? b.template : "{value}%"), n ? (e && (o.remove(), l.removeClass("mbsc-progress-value-" + ("right" == e ? "right" : "left"))), a && fa(".mbsc-progress-step-label", d).remove()) : (je(l, null, f, p, s), We(r), l.find(".mbsc-input-wrap").append('<span class="mbsc-progress-cont"><span class="mbsc-progress-track mbsc-progress-anim"><span class="mbsc-progress-bar"></span></span></span>'), c = x._$progress = l.find(".mbsc-progress-bar"), d = x._$track = l.find(".mbsc-progress-track")), r.attr("min", u).attr("max", h), e && (o = fa('<span class="mbsc-progress-value"></span>'), l.addClass("mbsc-progress-value-" + ("right" == e ? "right" : "left")).find(".mbsc-input-wrap").append(o)), a) for (t = 0; t < a.length; ++t) d.append('<span class="mbsc-progress-step-label" style="' + (b.rtl ? "right" : "left") + ": " + 100 * (a[t] - u) / (h - u) + '%" >' + a[t] + "</span>");
            m = fa(r.attr("data-target") || b.target)
        }, x.__destroy = function () {
            l.removeClass("mbsc-ic-left mbsc-ic-right").find(".mbsc-progress-cont").remove(), l.find(".mbsc-input-ic").remove(), r.off("change", a)
        }, x.refresh = function () {
            n(T("value", u), !0, !1)
        }, x.getVal = function () {
            return g
        }, x.setVal = function (e, t, a) {
            n(e, !0, t, a)
        }, e || x.init()
    }

    Mt.prototype = {
        _class: "progress",
        _css: "mbsc-progress",
        _hasTheme: !0,
        _hasLang: !0,
        _hasDef: !0,
        _defaults: {min: 0, max: 100, returnAffix: !0}
    }, S("[mbsc-progress]", k.Progress = Mt);

    function St(e, t, a) {
        var n, s, r, l, i, c, m, d, u, h, f, o, p, b = this;
        Mt.call(this, e, t, !0);
        var v = b.__init, g = b.__destroy;
        wt.call(this, e, t, !0);
        var x = b.__init, T = b.__destroy;
        b.__init = function () {
            v(), x()
        }, b.__destroy = function () {
            g(), T()
        }, b._update = function (e, t, a, n, s, i, o) {
            return d ? 0 === a ? (e = Math.min(e, t[1]), r.css({
                width: X(t[1], f, h) - X(e, f, h) + "%",
                left: u ? "auto" : X(e, f, h) + "%",
                right: u ? X(e, f, h) + "%" : "auto"
            })) : (e = Math.max(e, t[0]), r.css({width: X(e, f, h) - X(t[0], f, h) + "%"})) : s || !c ? o.css({
                left: u ? "auto" : (n || X(e, f, h)) + "%",
                right: u ? (n || X(e, f, h)) + "%" : "auto"
            }) : r.css("width", (n || X(e, f, h)) + "%"), m && l.eq(a).html(e), s || t[a] == e && !i || b._display(e), e
        }, b._readValue = function (e) {
            return +e.val()
        }, b._fillValue = function (e, t, a) {
            n.eq(t).val(e), a && n.eq(t).trigger("change")
        }, b._markupReady = function () {
            var e, t;
            if (m && s.addClass("mbsc-slider-has-tooltip"), 1 != o) for (t = (h - f) / o, e = 0; e <= t; ++e) i.append('<span class="mbsc-slider-step" style="' + (u ? "right" : "left") + ":" + 100 / t * e + '%"></span>');
            n.each(function (e) {
                "range" == this.type && fa(this).attr("min", f).attr("max", h).attr("step", o), (c ? r : i).append('<span class="mbsc-slider-handle-cont' + (d && !e ? " mbsc-slider-handle-left" : "") + '"><span tabindex="0" class="mbsc-slider-handle" aria-valuemin="' + f + '" aria-valuemax="' + h + '" data-index="' + e + '"></span>' + (m ? '<span class="mbsc-slider-tooltip"></span>' : "") + "</span>")
            }), l = s.find(".mbsc-slider-tooltip")
        }, b.___init = function () {
            s && (s.removeClass("mbsc-slider-has-tooltip"), 1 != o && fa(".mbsc-slider-step", i).remove()), s = b._$parent, i = b._$track, r = b._$progress, n = s.find("input"), p = b.settings, f = b._min, h = b._max, b._step = o = void 0 === t.step ? +n.attr("step") || p.step : t.step, b._live = y("data-live", p.live, n), m = y("data-tooltip", p.tooltip, n), c = y("data-highlight", p.highlight, n) && n.length < 3, d = c && 2 == n.length, u = p.rtl, b._markupReady()
        }, a || b.init()
    }

    St.prototype = {
        _class: "progress",
        _css: "mbsc-progress mbsc-slider",
        _hasTheme: !0,
        _hasLang: !0,
        _hasDef: !0,
        _defaults: {
            changeEvent: "change",
            stopProp: !0,
            min: 0,
            max: 100,
            step: 1,
            live: !0,
            highlight: !0,
            round: !0,
            returnAffix: !0
        }
    }, S("[mbsc-slider]", k.Slider = St);

    function kt(e, t, a) {
        var o, n, r, s, i, l, c, m = this, d = fa(e);
        St.call(this, e, t, !0), m._update = function (e, t, a, n, s, i) {
            return o.css("width", X(e, 0, r) + "%"), s || t[a] == e && !i || m._display(e), e
        }, m._markupReady = function () {
            var e, t = "", a = "";
            for (n = m._$track, o = m._$progress, c = m.settings, s = m._min, r = m._max, m._base = s, m._rounding = c.rtl ? "floor" : "ceil", i = d.attr("data-empty") || c.empty, l = d.attr("data-filled") || c.filled, e = 0; e < r; ++e) t += '<span class="mbsc-ic mbsc-ic-' + i + '"></span>', a += '<span class="mbsc-ic mbsc-ic-' + l + '"></span>';
            n.html(t), n.append(o), o.html(a), n.append('<span class="mbsc-rating-handle-cont"><span tabindex="0" class="mbsc-slider-handle" aria-valuemin="' + s + '" aria-valuemax="' + r + '" data-index="0"></span></span>')
        }, a || m.init()
    }

    kt.prototype = {
        _class: "progress",
        _css: "mbsc-progress mbsc-rating",
        _hasTheme: !0,
        _hasLang: !0,
        _hasDef: !0,
        _defaults: {
            changeEvent: "change",
            stopProp: !0,
            min: 1,
            max: 5,
            step: 1,
            live: !0,
            round: !0,
            hover: !0,
            highlight: !0,
            returnAffix: !0,
            empty: "star",
            filled: "star3"
        }
    }, S("[mbsc-rating]", k.Rating = kt);
    var Dt = 1, Nt = function () {
        function e(e, t) {
            var a, n, s, i = this, o = fa(e);
            if (this.settings = t, this._isOpen = t.isOpen || !1, o.addClass("mbsc-collapsible " + (this._isOpen ? "mbsc-collapsible-open" : "")), (a = (s = o.hasClass("mbsc-card") ? (n = o.find(".mbsc-card-header").eq(0).addClass("mbsc-collapsible-header"), o.find(".mbsc-card-content").eq(0).addClass("mbsc-collapsible-content")) : o.hasClass("mbsc-form-group") || o.hasClass("mbsc-form-group-inset") ? (n = o.find(".mbsc-form-group-title").eq(0).addClass("mbsc-collapsible-header"), o.find(".mbsc-form-group-content").eq(0).addClass("mbsc-collapsible-content")) : (n = o.find(".mbsc-collapsible-header").eq(0), o.find(".mbsc-collapsible-content").eq(0)))[0]) && !a.id && (a.id = "mbsc-collapsible-" + Dt++), n.length && a) {
                var r = fa('<span class="mbsc-collapsible-icon mbsc-ic mbsc-ic-arrow-down5"></span>');
                D(this, n, function () {
                    i.collapse()
                }), n.attr("role", "button").attr("aria-expanded", this._isOpen).attr("aria-controls", a.id).attr("tabindex", "0").on("mousedown", function (e) {
                    e.preventDefault()
                }).on("keydown", function (e) {
                    32 !== e.which && 13 != e.keyCode || (e.preventDefault(), i.collapse())
                }).append(r)
            }
            (e.mbscInst = this)._$header = n, this._$content = s, this._$elm = o, this._$accordionParent = o.parent("[mbsc-accordion], mbsc-accordion, .mbsc-accordion"), this.show = this.show.bind(this), this.hide = this.hide.bind(this), this.toggle = this.toggle.bind(this)
        }

        var t = e.prototype;
        return t.collapse = function (e) {
            var t = this._$elm, a = this._$content;
            void 0 === e && (e = !this._isOpen), e && this._isOpen || !e && !this._isOpen || !a.length || (e ? (j && a.on("transitionend", function e() {
                a.off("transitionend", e).css("height", "")
            }).css("height", a[0].scrollHeight), t.addClass("mbsc-collapsible-open")) : (j && a.css("height", getComputedStyle(a[0]).height), setTimeout(function () {
                a.css("height", 0), t.removeClass("mbsc-collapsible-open")
            }, 50)), e && this._$accordionParent && this._$accordionParent.find(".mbsc-collapsible-open").each(function () {
                this !== t[0] && this.mbscInst.hide()
            }), this._isOpen = e, this._$header.attr("aria-expanded", this._isOpen))
        }, t.show = function () {
            this.collapse(!0)
        }, t.hide = function () {
            this.collapse(!1)
        }, t.toggle = function () {
            this.collapse()
        }, t.destroy = function () {
            this._$elm.removeClass("mbsc-collapsible mbsc-collapsible-open"), this._$content.removeClass("mbsc-collapsible-content"), this._$header.removeClass("mbsc-collapsible-header").find(".mbsc-collapsible-icon").remove()
        }, e
    }();
    k.CollapsibleBase = Nt;
    var Vt = 0;

    function At(e, n, s, t) {
        fa("input,select,textarea,progress,button", e).each(function () {
            var e = this, t = fa(e), a = ua(t);
            if ("false" != t.attr("data-enhance")) if (t.hasClass("mbsc-control")) e.mbscInst && e.mbscInst.option({
                theme: s.theme,
                lang: s.lang,
                rtl: s.rtl,
                onText: s.onText,
                offText: s.offText,
                stopProp: s.stopProp
            }); else switch (e.id || (e.id = "mbsc-form-control-" + ++Vt), a) {
                case"button":
                case"submit":
                    n[e.id] = new Xe(e, {theme: s.theme, rtl: s.rtl, tap: s.tap});
                    break;
                case"switch":
                    n[e.id] = new Ct(e, {
                        theme: s.theme,
                        lang: s.lang,
                        rtl: s.rtl,
                        tap: s.tap,
                        onText: s.onText,
                        offText: s.offText,
                        stopProp: s.stopProp
                    });
                    break;
                case"checkbox":
                    n[e.id] = new Ze(e, {tap: s.tap, theme: s.theme, rtl: s.rtl});
                    break;
                case"range":
                    fa(e).parent().hasClass("mbsc-slider") || (n[e.id] = new St(e, {
                        theme: s.theme,
                        lang: s.lang,
                        rtl: s.rtl,
                        stopProp: s.stopProp,
                        labelStyle: s.labelStyle
                    }));
                    break;
                case"rating":
                    n[e.id] = new kt(e, {theme: s.theme, lang: s.lang, rtl: s.rtl, stopProp: s.stopProp});
                    break;
                case"progress":
                    n[e.id] = new Mt(e, {theme: s.theme, lang: s.lang, rtl: s.rtl, labelStyle: s.labelStyle});
                    break;
                case"radio":
                    n[e.id] = new Qe(e, {tap: s.tap, theme: s.theme, rtl: s.rtl});
                    break;
                case"select":
                case"select-one":
                case"select-multiple":
                    n[e.id] = new et(e, {
                        tap: s.tap,
                        inputStyle: s.inputStyle,
                        labelStyle: s.labelStyle,
                        theme: s.theme,
                        rtl: s.rtl
                    });
                    break;
                case"textarea":
                    n[e.id] = new xt(e, {
                        tap: s.tap,
                        inputStyle: s.inputStyle,
                        labelStyle: s.labelStyle,
                        theme: s.theme,
                        rtl: s.rtl
                    });
                    break;
                case"segmented":
                    n[e.id] = new Tt(e, {theme: s.theme, rtl: s.rtl, tap: s.tap, inputStyle: s.inputStyle});
                    break;
                case"stepper":
                    n[e.id] = new yt(e, {theme: s.theme, rtl: s.rtl});
                    break;
                case"hidden":
                    return;
                default:
                    n[e.id] = new Ge(e, {
                        tap: s.tap,
                        inputStyle: s.inputStyle,
                        labelStyle: s.labelStyle,
                        theme: s.theme,
                        rtl: s.rtl
                    })
            }
        }), fa("[data-collapsible]:not(.mbsc-collapsible)", e).each(function () {
            var e = this, t = fa(e).attr("data-open");
            e.id || (e.id = "mbsc-form-control-" + ++Vt), n[e.id] = new Nt(e, {isOpen: void 0 !== t && "false" != t}), pa[e.id] = n[e.id]
        }), t || vt()
    }

    function Et(a, e) {
        var n, s, i = "", o = fa(a), t = {}, r = this;

        function l() {
            o.removeClass("mbsc-no-touch")
        }

        va.call(this, a, e, !0), r.refresh = function (e) {
            At(o, t, n, e)
        }, r._init = function () {
            var e = void 0 !== n.collapsible || void 0 !== o.attr("data-collapsible");
            if (o.hasClass("mbsc-card") || o.on("touchstart", l).show(), i && o.removeClass(i), i = r.remote.cards.cssClass, o.addClass(i).removeClass("mbsc-cloak"), e && !s) {
                var t = o.attr("data-open");
                s = new Nt(a, {isOpen: void 0 !== t && "false" != t || !0 === n.collapsible})
            }
            o.append(r._getText(na, .5)), r.refresh()
        }, r._destroy = function () {
            for (var e in o.removeClass(i).off("touchstart", l), t) t[e].destroy();
            s && s.destroy()
        }, r.toggle = function () {
            s && s.toggle()
        }, r.hide = function () {
            s && s.hide()
        }, r.show = function () {
            s && s.show()
        }, n = r.settings, r.init()
    }

    function Ft(e) {
        var a = [Math.round(e.r).toString(16), Math.round(e.g).toString(16), Math.round(e.b).toString(16)];
        return fa.each(a, function (e, t) {
            1 == t.length && (a[e] = "0" + t)
        }), "#" + a.join("")
    }

    function It(e) {
        return {
            r: (e = parseInt(-1 < e.indexOf("#") ? e.substring(1) : e, 16)) >> 16,
            g: (65280 & e) >> 8,
            b: 255 & e,
            toString: function () {
                return "rgb(" + this.r + "," + this.g + "," + this.b + ")"
            }
        }
    }

    function Ht(e) {
        var t, a, n, s = e.h, i = 255 * e.s / 100, o = 255 * e.v / 100;
        if (0 == i) t = a = n = o; else {
            var r = (255 - i) * o / 255, l = s % 60 * (o - r) / 60;
            360 == s && (s = 0), s < 60 ? (t = o, a = (n = r) + l) : s < 120 ? (n = r, t = (a = o) - l) : s < 180 ? (a = o, n = (t = r) + l) : s < 240 ? (t = r, a = (n = o) - l) : s < 300 ? (n = o, t = (a = r) + l) : s < 360 ? (a = r, n = (t = o) - l) : t = a = n = 0
        }
        return {
            r: t, g: a, b: n, toString: function () {
                return "rgb(" + this.r + "," + this.g + "," + this.b + ")"
            }
        }
    }

    function Pt(e) {
        var t, a, n = 0, s = Math.min(e.r, e.g, e.b), i = Math.max(e.r, e.g, e.b), o = i - s;
        return n = (t = (a = i) ? 255 * o / i : 0) ? e.r == i ? (e.g - e.b) / o : e.g == i ? 2 + (e.b - e.r) / o : 4 + (e.r - e.g) / o : -1, (n *= 60) < 0 && (n += 360), {
            h: n,
            s: t *= 100 / 255,
            v: a *= 100 / 255,
            toString: function () {
                return "hsv(" + Math.round(this.h) + "," + Math.round(this.s) + "%," + Math.round(this.v) + "%)"
            }
        }
    }

    function $t(e) {
        var t, a, n = e.r / 255, s = e.g / 255, i = e.b / 255, o = Math.max(n, s, i), r = Math.min(n, s, i),
            l = (o + r) / 2;
        if (o == r) t = a = 0; else {
            var c = o - r;
            switch (a = .5 < l ? c / (2 - o - r) : c / (o + r), o) {
                case n:
                    t = (s - i) / c + (s < i ? 6 : 0);
                    break;
                case s:
                    t = (i - n) / c + 2;
                    break;
                case i:
                    t = (n - s) / c + 4
            }
            t /= 6
        }
        return {
            h: Math.round(360 * t), s: Math.round(100 * a), l: Math.round(100 * l), toString: function () {
                return "hsl(" + this.h + "," + this.s + "%," + this.l + "%)"
            }
        }
    }

    function Lt(e) {
        return $t(It(e))
    }

    function Ot(e) {
        return Ft(function (e) {
            var t, a, n, s, i, o, r = e.h, l = e.s, c = e.l;
            return isFinite(r) || (r = 0), isFinite(l) || (l = 0), isFinite(c) || (c = 0), (r /= 60) < 0 && (r = 6 - -r % 6), r %= 6, l = Math.max(0, Math.min(1, l / 100)), c = Math.max(0, Math.min(1, c / 100)), o = (i = (1 - Math.abs(2 * c - 1)) * l) * (1 - Math.abs(r % 2 - 1)), n = r < 1 ? (t = i, a = o, 0) : r < 2 ? (t = o, a = i, 0) : r < 3 ? (t = 0, a = i, o) : r < 4 ? (t = 0, a = o, i) : r < 5 ? (t = o, a = 0, i) : (t = i, a = 0, o), s = c - i / 2, {
                r: Math.round(255 * (t + s)),
                g: Math.round(255 * (a + s)),
                b: Math.round(255 * (n + s)),
                toString: function () {
                    return "rgb(" + this.r + "," + this.g + "," + this.b + ")"
                }
            }
        }(e))
    }

    function Yt(e) {
        return Ft(Ht(e))
    }

    function zt(e) {
        return Pt(It(e))
    }

    Et.prototype = {
        _hasDef: !0,
        _hasTheme: !0,
        _hasLang: !0,
        _class: "card",
        _defaults: {tap: W, stopProp: !0, rtl: !1}
    }, S("[mbsc-card]", k.Card = Et, !0), a("card", Et, !1);

    function Rt(a, e, t) {
        var c, n, m, s, d, u, i, o, r, l, h, f, p, b, v, g, x, T, y, _, w, C, M, S, k, D = this, N = fa(a), V = 0,
            A = {}, E = {};

        function F(e, t, a) {
            if (!a) {
                D._value = D._hasValue ? D._tempValue.slice(0) : null;
                for (var n = 0; n < m.length; ++n) m[n].tempChangedColor && D._value && -1 != D._value.indexOf(m[n].tempChangedColor) && (m[n].changedColor = m[n].tempChangedColor), delete m[n].tempChangedColor
            }
            e && (D._isInput && N.val(D._hasValue ? D._tempValue : ""), s("onFill", {
                valueText: D._hasValue ? D._tempValue : "",
                change: t
            }), t && (A = ba(!0, {}, E), D._preventChange = !0, N.trigger("change")), O(D._value, !0))
        }

        function I(e, t) {
            return '<div class="mbsc-color-input-item" data-color="' + (void 0 !== (t = void 0 !== t ? t : P(e)) ? t : e) + '" style="background: ' + e + ';">' + (T ? "" : '<div class="mbsc-color-input-item-close mbsc-ic mbsc-ic-material-close"></div>') + "</div>"
        }

        function H(e) {
            f[0].style.background = e ? ya + "linear-gradient(left, " + (c.rtl ? "#000000" : "#FFFFFF") + " 0%, " + e + " 50%, " + (c.rtl ? "#FFFFFF" : "#000000") + " 100%)" : ""
        }

        function P(e) {
            if (Object.keys(E).length && !isNaN(e)) return e;
            for (var t in m) if (e == m[t].color || e == m[t].changedColor) return t
        }

        function $(e, t) {
            var a, n = e.match(/\d+/gim);
            switch (!0) {
                case-1 < e.indexOf("rgb"):
                    a = Ft({r: n[0], g: n[1], b: n[2]});
                    break;
                case-1 < e.indexOf("hsl"):
                    a = Ot({h: n[0], s: n[1], l: n[2]});
                    break;
                case-1 < e.indexOf("hsv"):
                    a = Yt({h: n[0], s: n[1], v: n[2]});
                    break;
                case-1 < e.indexOf("#"):
                    a = e
            }
            return function (e, t) {
                switch (t) {
                    case"rgb":
                        return It(e);
                    case"hsl":
                        return Lt(e);
                    case"hsv":
                        return zt(e);
                    default:
                        return e
                }
            }(a, t || c.format)
        }

        function L(e, t) {
            fa(".mbsc-color-active", t).removeClass("mbsc-color-active"), p && (e.parent().addClass("mbsc-color-active"), h && e && void 0 !== V && M.eq(V).parent().addClass("mbsc-color-active"))
        }

        function O(e, t) {
            var a, n, s = [], i = 0, o = fa.map(m, function (e) {
                return e.changedColor || e.color
            });
            if (T) {
                if (e = fa.isArray(e) ? e[0] : e, -1 < (n = o.indexOf(e)) && s.push(n), e && !s.length && p) {
                    var r = +fa(".mbsc-color-input-item", w).attr("data-color");
                    isNaN(r) ? r = void 0 : s.push(r), g = r
                }
            } else if (e) if (h && p) for (var l in A) void 0 !== A[l].colorIndex && s.push(+A[l].colorIndex); else for (a = 0; a < e.length; ++a) -1 < (n = o.indexOf(e[a])) && (s.push(n), o[n] = "temp" + a);
            for (a = 0; a < s.length; ++a) m[s[a]] && Y(!0, s[a], i++, m[s[a]].changedColor || m[s[a]].color, !0);
            for (a = 0; a < m.length; ++a) -1 == s.indexOf(a) && Y(!1, a, void 0, m[a].changedColor || m[a].color, !1);
            if (h) for (a = i; a < c.select; ++a) E[a] = {}, M && M.eq(a).addClass("mbsc-color-preview-item-empty").css({background: "transparent"});
            A = ba(!0, {}, E), !1 !== t && function () {
                if (x) {
                    var e, t = "";
                    if (w.empty(), D._hasValue) {
                        if (T) t += I(D._value, g); else for (e = 0; e < D._value.length; ++e) t += I(D._value[e], Object.keys(E).length && E[e].colorIndex ? E[e].colorIndex : P(D._value[e]));
                        w.append(t), D.tap(fa(".mbsc-color-input-item", w), function (e) {
                            if (fa(e.target).hasClass("mbsc-color-input-item-close")) {
                                var t = fa(this).index();
                                e.stopPropagation(), e.preventDefault(), void 0 === g && (g = fa(e.target).parent().attr("data-color")), h && m[g] && (V = m[g].previewInd, M.eq(V).parent().removeClass("mbsc-color-active"), A[t] = {}, E[t] = {}), D._value.splice(t, 1), D.setVal(D._value, !0, !0)
                            } else p && "inline" !== c.display && (g = fa(e.target).attr("data-color"), isNaN(g) && (g = P(g)), g && m[g] && (m[g].selected = !0, V = m[g].previewInd, setTimeout(function () {
                                d.scroll(C.eq(g), 400), h && u.scroll(M.eq(V), 400)
                            }, 200)))
                        })
                    }
                }
            }()
        }

        function Y(e, t, a, n, s, i) {
            if (h && s && (E[a].colorIndex = e ? t : void 0, E[a].color = e ? n : void 0, M)) {
                var o = M.eq(a);
                o.removeClass("mbsc-color-preview-item-empty").css({background: e ? n : "transparent"}), e || o.addClass("mbsc-color-preview-item-empty").parent().removeClass("mbsc-color-active")
            }
            i && (e ? D._tempValue.splice(a, 0, n) : D._tempValue.splice(D._tempValue.indexOf(n), 1)), C && (e ? C.eq(t).addClass("mbsc-color-selected") : C.eq(t).removeClass("mbsc-color-selected").parent().removeClass("mbsc-color-active")), m[t].previewInd = e ? a : void 0, m[t].selected = e
        }

        function z(e, t) {
            void 0 !== e && (T || m[e] && m[e].selected) ? m[g = e] && (o = m[e].changedColor || m[e].color, S = C.eq(e), p && (L(C.eq(e), t || ""), (r = $(m[e].color, "hsl")).l = $(o, "hsl").l, H(m[e].color), v.setVal(100 - r.l, !1, !1))) : p && H()
        }

        function R(e, t) {
            var a = fa(e.target).index();
            g = E[a].colorIndex, S = C.eq(g), V = a, z(g, t), d.scroll(S, 250), s("onPreviewItemTap", {
                target: e.target,
                value: E[a].color,
                index: a
            })
        }

        function W(e, t) {
            var a = !1, n = fa(".mbsc-color-selected", t);
            if ((S = fa(e.target)).hasClass("mbsc-color-clear-item")) return o = "", void D.clear();
            (T || y > +n.length || S.hasClass("mbsc-color-selected")) && na.uQUjd && (g = S.attr("data-index"), h && (V = void 0 !== m[g].previewInd ? m[g].previewInd : function () {
                var e;
                for (e = 0; e < c.select; ++e) if (void 0 === E[e].colorIndex) return e
            }(), a = p && S.hasClass("mbsc-color-selected") && !S.parent().hasClass("mbsc-color-active"), 6 < M.length && u.scroll(M.eq(V))), o = m[g].changedColor || m[g].color, T ? (n.removeClass("mbsc-color-selected"), (D._tempValue = o) && S.toggleClass("mbsc-color-selected"), L(S, t)) : (L(S, t), a || Y(!m[g].selected, g, V, o, !0, !0)), z(g, t), D.live && (D._fillValue(), s("onSet", {value: D._value})), s("onItemTap", {
                target: e.target,
                value: o,
                selected: m[g].selected,
                index: g
            }), D._updateHeader())
        }

        xe.call(this, a, e, !0), D.setVal = D._setVal = function (e, t, a, n) {
            D._hasValue = null != e, D._tempValue = T ? fa.isArray(e) ? e[0] : e : fa.isArray(e) ? e : e ? [e] : [], F(t, void 0 === a ? t : a, n)
        }, D.getVal = D._getVal = function (e) {
            return D._hasValue || e ? _ ? function () {
                var e, t = [];
                for (e = 0; e < m.length; ++e) m[e].selected && t.push(m[e]);
                return t
            }() : D[e ? "_tempValue" : "_value"] : null
        }, D._readValue = function () {
            var e = N.val() || "";
            D._hasValue = !1, 0 !== e.length && "" !== e && (D._hasValue = !0), D._hasValue ? (D._tempValue = T ? e : "hex" == c.format ? e.split(",") : e.match(/[a-z]{3}\((\d+\.?\d{0,}?),\s*([\d.]+)%{0,},\s*([\d.]+)%{0,}\)/gim), F(!0)) : D._tempValue = [], O(D._tempValue, D._hasValue)
        }, D._fillValue = function () {
            F(D._hasValue = !0, !0)
        }, D._generateContent = function () {
            var e, t, a, n = i ? 1 : 0;
            for (b = l ? Math.ceil((m.length + n) / c.rows) : c.rows, t = '<div class="mbsc-color-scroll-cont mbsc-w-p ' + (l ? "" : "mbsc-color-vertical") + '"><div class="mbsc-color-cont">' + (l ? '<div class="mbsc-color-row">' : ""), e = 0; e < m.length; ++e) a = m[e].changedColor || m[e].color, i && 0 === e && (t += '<div class="mbsc-color-item-c"><div tabindex="0" class="mbsc-color-clear-item mbsc-btn-e mbsc-color-selected"><div class="mbsc-color-clear-cross"></div></div></div>'), 0 !== e && (e + n) % b == 0 && (t += l ? '</div><div class="mbsc-color-row">' : ""), t += '<div class="mbsc-color-item-c"><div tabindex="0" data-index="' + e + '" class="mbsc-color-item mbsc-btn-e mbsc-ic mbsc-ic-material-check mbsc-color-btn-e ' + (m[e].selected ? "mbsc-color-selected" : "") + '"  style="background:' + a + '"></div>' + D._getText(na, .2) + "</div>";
            if (t += "</div></div>" + (l ? "</div>" : ""), p && (t += '<div class="mbsc-color-slider-cont"><input class="mbsc-color-slider" type="range" data-highlight="false" value="50" min="0" max="100"/></div>'), h) {
                for (var s in t += '<div class="mbsc-color-preview-cont"><div class="mbsc-color-refine-preview">', A) t += '<div class="mbsc-color-preview-item-c mbsc-btn-e mbsc-color-btn-e" tabindex="0"><div class="mbsc-color-preview-item ' + (A[s].color ? "" : "mbsc-color-preview-item-empty") + '" style="background: ' + (A[s].color || "initial") + ';"></div></div>';
                t += "</div></div>"
            }
            return t
        }, D._position = function (e) {
            var t, a;
            l || (t = e.find(".mbsc-color-cont"), a = Math.ceil(t.find(".mbsc-color-item-c")[0].offsetWidth), t.width(Math.min(Math.floor(e.find(".mbsc-fr-c").width() / a), Math.round(m.length / c.rows)) * a + 1)), d && d.refresh(), u && u.refresh()
        }, D._markupInserted = function (t) {
            l || t.find(".mbsc-color-scroll-cont").css("max-height", t.find(".mbsc-color-item-c")[0].offsetHeight * c.rows), d = new ht(t.find(".mbsc-color-scroll-cont")[0], {
                axis: l ? "X" : "Y",
                rtl: c.rtl,
                elastic: 60,
                stopProp: !1,
                mousewheel: c.mousewheel,
                onBtnTap: function (e) {
                    W(e, t)
                }
            })
        }, D._attachEvents = function (t) {
            var e;
            C = fa(".mbsc-color-item", t), t.on("keydown", ".mbsc-color-btn-e", function (e) {
                e.stopPropagation(), 32 == e.keyCode && (e.target.classList.contains("mbsc-color-item") ? W(e, t) : R(e, t))
            }), h && (M = fa(".mbsc-color-preview-item", t)), p && (t.addClass("mbsc-color-refine"), k = fa(".mbsc-color-slider", t), v = new St(k[0], {
                theme: c.theme,
                rtl: c.rtl
            }), f = t.find(".mbsc-progress-track"), g && D._value && z(g, t), k.on("change", function () {
                void 0 !== g && (T || m[g] && m[g].selected) && (r.l = 100 - this.value, e = $(r.toString()).toString(), T ? D._tempValue = e : D._tempValue[void 0 !== V ? V : D._tempValue.length] = e, m[g].tempChangedColor = e, C.eq(g).css("background", e), h && (E[V].color = e, M.eq(V).removeClass("mbsc-color-preview-item-empty").css({background: e})), D.live && la(D._fillValue()))
            })), h && (u = new ht(t.find(".mbsc-color-preview-cont")[0], {
                axis: "X",
                rtl: c.rtl,
                stopProp: !1,
                mousewheel: c.mousewheel,
                onBtnTap: function (e) {
                    R(e, t)
                }
            })), D._updateHeader()
        }, D._markupRemove = function () {
            d && d.destroy(), v && v.destroy(), u && u.destroy()
        }, D.__processSettings = function () {
            var e, t;
            if (c = D.settings, s = D.trigger, l = "horizontal" == c.navigation, D._value = [], D._tempValue = [], T = "single" == c.select, i = void 0 !== c.clear ? c.clear : T, !(t = c.data || []).length) switch (c.format) {
                case"rgb":
                    t = ["rgb(255,235,60)", "rgb(255,153,0)", "rgb(244,68,55)", "rgb(234,30,99)", "rgb(156,38,176)", "rgb(104,58,183)", "rgb(63,81,181)", "rgb(33,150,243)", "rgb(0,151,136)", "rgb(75,175,79)", "rgb(126,93,78)", "rgb(158,158,158)"], i && t.splice(10, 0, "rgb(83, 71, 65)");
                    break;
                case"hsl":
                    t = ["hsl(54,100%,62%)", "hsl(36,100%,50%)", "hsl(4,90%,59%)", "hsl(340,83%,52%)", "hsl(291,64%,42%)", "hsl(262,52%,47%)", "hsl(231,48%,48%)", "hsl(207,90%,54%)", "hsl(174,100%,30%)", "hsl(122,40%,49%)", "hsl(19,24%,40%)", "hsl(0,0%,62%)"], i && t.splice(10, 0, "hsl(20, 12%, 29%)");
                    break;
                default:
                    t = ["#ffeb3c", "#ff9900", "#f44437", "#ea1e63", "#9c26b0", "#683ab7", "#3f51b5", "#2196f3", "#009788", "#4baf4f", "#7e5d4e", "#9e9e9e"], i && t.splice(10, 0, "#534741")
            }
            if (p = "refine" == c.mode, h = !isNaN(c.select), y = isNaN(c.select) ? T ? 2 : t.length : c.select, _ = fa.isPlainObject(t[0]), h && !Object.keys(A).length) for (e = 0; e < c.select; ++e) A[e] = {}, E[e] = {};
            for (m = t.slice(0), e = 0; e < m.length; ++e) fa.isPlainObject(t[e]) ? m[e].color = t[e].color : (t[e] = t[e].toLowerCase(), m[e] = {
                key: e,
                name: t[e],
                color: t[e]
            });
            n = c.defaultValue || m[0].color, r = $(o = n, "hsl"), (x = c.enhance && N.is("input")) && (N.hasClass("mbsc-color-input-hdn") ? w = N.prev() : ((w = fa("<div " + (a.placeholder ? 'data-placeholder="' + a.placeholder + '"' : "") + ' class="mbsc-control mbsc-color-input ' + (c.inputClass || "") + '" readonly ></div>')).insertBefore(N), N.addClass("mbsc-color-input-hdn").attr("tabindex", -1)), c.anchor = w, D.attachShow(w))
        }, D.__destroy = function () {
            x && (N.removeClass("mbsc-color-input-hdn"), w.remove())
        }, D._checkSize = !0, t || D.init()
    }

    Rt.prototype = {
        _hasDef: !0,
        _hasTheme: !0,
        _hasLang: !0,
        _class: "color",
        _defaults: ba({}, xe.prototype._defaults, {
            headerText: !1,
            validate: oa,
            parseValue: oa,
            enhance: !0,
            rows: 2,
            select: "single",
            format: "hex",
            navigation: "horizontal",
            compClass: "mbsc-color"
        })
    }, k.Color = Rt, na.themes.color = na.themes.frame, a("color", Rt, !(t.color = {
        hsv2hex: Yt,
        hsv2rgb: Ht,
        rgb2hsv: Pt,
        rgb2hex: Ft,
        rgb2hsl: $t,
        hex2rgb: It,
        hex2hsv: zt,
        hex2hsl: Lt
    })), Ne.date = ft, Ne.time = ft, Ne.datetime = ft, a("date", Fe), a("time", Fe), a("datetime", Fe);
    var Wt = function (e, t, a) {
        function n(e) {
            fa(".mbsc-fr-c", e).append(r._getText(na, .7)), !fa(".mbsc-fr-c", e).hasClass("mbsc-wdg-c") && na.uQUjd && (fa(".mbsc-fr-c", e).addClass("mbsc-wdg-c").append(o.show()), fa(".mbsc-w-p", e).length || fa(".mbsc-fr-c", e).addClass("mbsc-w-p"))
        }

        var s, i, o = fa(e), r = this;
        xe.call(this, e, t, !0), r._generateContent = function () {
            return ""
        }, r._markupReady = function (e) {
            "inline" != s.display && n(e)
        }, r._markupInserted = function (e) {
            "inline" == s.display && n(e), e.trigger("mbsc-enhance", [{theme: s.theme, lang: s.lang}])
        }, r._markupRemove = function () {
            o.hide(), i && i.parent().length && i.after(o)
        }, r.__processSettings = function () {
            s = r.settings, r.buttons.ok = {
                text: s.okText,
                icon: s.okIcon,
                handler: "set"
            }, s.buttons = s.buttons || ("inline" == s.display ? [] : ["ok"]), !i && o.parent().length && (i = fa(document.createComment("popup")), o.before(i)), o.hide()
        }, a || r.init()
    };
    Wt.prototype = {
        _hasDef: !0,
        _hasTheme: !0,
        _hasContent: !0,
        _hasLang: !0,
        _responsive: !0,
        _class: "popup",
        _defaults: ba({}, xe.prototype._defaults, {compClass: "mbsc-wdg", okText: "OK", headerText: !1})
    }, k.Popup = Wt;
    var jt = k.Widget = Wt;
    na.themes.popup = na.themes.frame;
    var Jt = 0;

    function Ut(e, t, a) {
        "jsonp" == a ? function (e, t) {
            var a = document.createElement("script"), n = "mbscjsonp" + ++Jt;
            window[n] = function (e) {
                a.parentNode.removeChild(a), delete window[n], e && t(e)
            }, a.src = e + (0 <= e.indexOf("?") ? "&" : "?") + "callback=" + n, document.body.appendChild(a)
        }(e, t) : function (e, t) {
            var a = new XMLHttpRequest;
            a.open("GET", e, !0), a.onload = function () {
                200 <= this.status && this.status < 400 && t(JSON.parse(this.response))
            }, a.onerror = function () {
            }, a.send()
        }(e, t)
    }

    t.getJson = Ut;
    var Bt = {
        view: {calendar: {type: "month", popover: !0}},
        allDayText: "All-day",
        labelsShort: ["Yrs", "Mths", "Days", "Hrs", "Mins", "Secs"],
        eventText: "event",
        eventsText: "events",
        noEventsText: "No events"
    }, qt = {yearChange: !1, weekDays: "short"};
    Ne.eventcalendar = function (_, e) {
        function n(e, t, a) {
            var n, s, i, o, r, l = 0, c = [], m = "", d = [];
            for (a = a || _._prepareObj(G, e, t), n = st(e); n <= t; n.setDate(n.getDate() + 1)) (o = a[st(n)]) && o.length && d.push({
                d: new Date(n),
                list: C(o)
            });
            if (0 < d.length) for (s = 0; s < d.length; s++) {
                for (m += '<div><div class="mbsc-lv-gr-title mbsc-event-day" data-full="' + it((o = d[s]).d) + '">' + ne(B.dateFormat, o.d, B) + "</div>", i = 0; i < o.list.length; i++) {
                    var u = o.list[i], h = u.start ? ot(u.start) : null, f = u.end ? ot(u.end) : null, p = u.color,
                        b = ct.test(u.d) || lt.test(u.d), v = h && f && !rt(h, f), g = !v || rt(h, o.d),
                        x = !v || rt(f, o.d), T = u.d ? b ? u.d : ot(u.d) : h, y = u.allDay || b || v && !g && !x;
                    c.push({
                        d: o.d,
                        e: u
                    }), m += '<div tabindex="0" role="button" class="mbsc-lv-item mbsc-lv-item-actionable" data-index="' + l + '"><div class="mbsc-event-time">' + (y ? B.allDayText : g && T && T.getTime ? ne(B.timeFormat, T) : v && x ? B.toText : "") + (!y && x && f && f.getTime ? "<br/>" + ne(B.timeFormat, f) : "") + '</div><div class="mbsc-event-color"' + (p ? ' style="background:' + p + ';"' : "") + '></div><div class="mbsc-event-txt">' + u.text + "</div>" + _._getText(na, .3) + "</div>", l++
                }
                m += "</div>"
            } else m += '<div class="mbsc-lv-gr-title mbsc-event-empty"><div class="mbsc-empty"><h3>' + B.noEventsText + "</h3></div></div>";
            q++, M.html('<div class="mbsc-lv mbsc-lv-v">' + m + "</div>").scrollTop(0), setTimeout(function () {
                q--
            }, 150), r = fa(".mbsc-lv-item", M), _.tap(r, function (e) {
                var t = c[fa(this).attr("data-index")];
                Z("onEventSelect", {domEvent: e, event: t.e, date: t.d})
            }), w(r)
        }

        function w(e) {
            e.on("keydown", function (e) {
                13 !== e.keyCode && 32 !== e.keyCode || this.click()
            }).on("focus", function () {
                window.__mbscFocusVisible && fa(this).addClass("mbsc-focus")
            }).on("blur", function () {
                fa(this).removeClass("mbsc-focus")
            })
        }

        function s() {
            if (V) {
                var e = st(V.d);
                !function (t, f, e) {
                    if (t) {
                        var a, n, s, i, o, p = '<div class="mbsc-cal-event-list">';
                        a = fa('<div class="mbsc-cal-events ' + (B.eventBubbleClass || "") + '"><div class="mbsc-cal-events-i"><div class="mbsc-cal-events-sc"></div><div class="mbsc-sc-bar-c"><div class="mbsc-sc-bar"></div></div></div></div>'), n = fa(".mbsc-cal-events-i", a), s = fa(".mbsc-cal-events-sc", a), _.tap(n, function () {
                            i.scrolled || r()
                        }), A = new Wt(a[0], {
                            display: "bubble",
                            theme: B.theme,
                            lang: B.lang,
                            context: B.context,
                            buttons: [],
                            anchor: e,
                            showOverlay: !1,
                            cssClass: "mbsc-no-padding mbsc-cal-events-popup",
                            onShow: function () {
                                i = new ht(n[0], {
                                    scrollbar: fa(".mbsc-sc-bar-c", a),
                                    stopProp: !1
                                }), fa(document).on("click", l)
                            },
                            onClose: function (e, t) {
                                t.destroy(), i && i.destroy(), fa(document).off("click", l)
                            }
                        }), _._popup = A, b = e, t = C(t), fa.each(t, function (e, t) {
                            var a = t.start ? ot(t.start) : null, n = t.end ? ot(t.end) : null,
                                s = ct.test(t.d) || lt.test(t.d), i = t.d ? s ? t.d : ot(t.d) : a,
                                o = a && n && !rt(a, n), r = !o || rt(a, f), l = !o || rt(n, f),
                                c = t.allDay || s || o && !r && !l, m = t.color, d = "", u = "",
                                h = fa("<div>" + t.text + "</div>").text();
                            i.getTime && (d = ne((o ? "MM d yy " : "") + B.timeFormat, i)), n && (u = ne((o ? "MM d yy " : "") + B.timeFormat, n)), p += '<div tabindex="0" role="button" title="' + h + '" aria-label="' + h + (d ? ", " + B.fromText + ": " + d : "") + (u ? ", " + B.toText + ": " + u : "") + '" class="mbsc-cal-event mbsc-lv-item mbsc-lv-item-actionable"><div class="mbsc-cal-event-color" style="' + (m ? "background:" + m + ";" : "") + '"></div><div class="mbsc-cal-event-text"><div class="mbsc-cal-event-time">' + (c ? B.allDayText : r && i.getTime ? ne(B.timeFormat, i) : "") + "</div>" + t.text + "</div>" + (a && n && !t.allDay ? '<div class="mbsc-cal-event-dur">' + B.formatDuration(a, n, t) + "</div>" : "") + "</div>"
                        }), p += "</div>", s.html(p), A.show(), Z("onEventBubbleShow", {
                            target: b,
                            eventList: a[0]
                        }), o = fa(".mbsc-cal-event", s), _.tap(o, function (e) {
                            i.scrolled || Z("onEventSelect", {domEvent: e, event: t[fa(this).index()], date: f})
                        }), w(o), x = !0
                    }
                }(V.events || g[e], e, V.cell || fa('.mbsc-cal-slide-a .mbsc-cal-day[data-full="' + it(e) + '"]', _._markup)[0]), V = null
            }
        }

        function C(e) {
            return e.slice(0).sort(function (e, t) {
                var a = e.start ? ot(e.start) : null, n = t.start ? ot(t.start) : null, s = e.end ? ot(e.end) : null,
                    i = t.end ? ot(t.end) : null, o = ct.test(e.d) || lt.test(e.d), r = ct.test(t.d) || lt.test(t.d),
                    l = e.d ? o ? e.d : ot(e.d) : a, c = t.d ? r ? t.d : ot(t.d) : n,
                    m = l.getTime ? a && s && a.toDateString() !== s.toDateString() ? 1 : e.allDay ? 2 : l.getTime() : 0,
                    d = c.getTime ? n && i && n.toDateString() !== i.toDateString() ? 1 : t.allDay ? 2 : c.getTime() : 0;
                return m == d ? e.text > t.text ? 1 : -1 : m - d
            })
        }

        function a() {
            var e, t, a;
            q || fa(".mbsc-event-day", this).each(function () {
                if (0 <= (t = this.offsetTop - v.scrollTop) && t < 35) return a = fa(this).attr("data-full").split("-"), rt(e = at(a[0], a[1] - 1, a[2]), h) || (E = !0, _.setVal(e)), !1
            })
        }

        function r() {
            A && x && A.hide(), b = null, x = !1
        }

        function l(e) {
            0 == fa(e.target).closest(".mbsc-cal-day").length && r()
        }

        function t() {
            r(), _.redraw()
        }

        function i(e) {
            var t = B.getYear(e), a = B.getMonth(e), n = B.getDay(e);
            if (f = e, "day" == k) p = B.getDate(t, a, n + D - 1); else if ("week" == k) {
                var s, i = f.getDay();
                s = n + B.firstDay - (0 < B.firstDay - i ? 7 : 0) - i, f = B.getDate(t, a, s), p = B.getDate(t, a, s + 7 * D - 1)
            } else "month" == k ? (f = B.getDate(t, a, 1), p = B.getDate(t, a + D, 0)) : "year" == k && (f = B.getDate(t, 0, 1), p = B.getDate(t + D, 0, 0))
        }

        function o(e, t) {
            if ($ && !E) {
                var a = fa('.mbsc-event-day[data-full="' + it(e) + '"]', M);
                a.length && (q++, le(v, a.parent()[0].offsetTop, t, function () {
                    setTimeout(function () {
                        q--
                    }, 150)
                }))
            }
        }

        function c(e, t) {
            e && Z("onPageChange", {firstDay: f, lastDay: p}), t || Z("onPageLoading", {
                firstDay: f,
                lastDay: p
            }), Z("onPageLoaded", {firstDay: f, lastDay: p})
        }

        var m, d, M, u, h, f, p, b, v, g, x, T, y, S, k, D, N, V, A, E, F, I, H, P, $, L, O, Y, z, R, W, j, J = this,
            U = ba({}, _.settings), B = ba(_.settings, Bt, U, qt, e), q = 0, K = 0, G = ba(!0, [], B.data), X = !0,
            Z = _.trigger;
        return B.data = G, fa.each(G, function (e, t) {
            void 0 === t._id && (t._id = K++)
        }), Y = B.view, z = Y.calendar, R = Y.eventList, W = B.months, j = B.weeks, S = z ? ("week" == z.type ? j = z.size || 1 : z.size && (W = z.size), !1) : !(j = 0), R && (k = R.type, D = R.size || 1), N = z && z.labels, P = R && R.scrollable, $ = Y.eventList, L = void 0 === B.eventBubble ? z && z.popover : B.eventBubble, B.weeks = j, B.months = W, m = Ie.call(this, _), _._onGenMonth = function (e, t) {
            g = _._prepareObj(G, e, t), _._labels = N ? g : null
        }, _._onRefresh = function (e) {
            F = !0, H = I = null, S && c(!1, e)
        }, _._onSetDate = function (e, t) {
            h = e, S ? E || (i(e), c(!0)) : t || T || (r(), $ && "day" == k && n(e, e, g), !L && !O || y || s(), o(e)), y = O = E = !1
        }, _._getDayProps = function (e) {
            var t = g[e], a = {events: t};
            return B.marked || B.labels || N || (t ? (a.background = t[0] && t[0].background, a.marked = t, a.markup = B.showEventCount ? '<div class="mbsc-cal-txt">' + t.length + " " + (1 < t.length ? B.eventsText : B.eventText) + "</div>" : '<div class="mbsc-cal-marks"><div class="mbsc-cal-mark"></div></div>') : a.markup = B.showEventCount ? '<div class="mbsc-cal-txt-ph"></div>' : ""), a
        }, _.addEvent = function (e) {
            var a = [];
            return e = ba(!0, [], fa.isArray(e) ? e : [e]), fa.each(e, function (e, t) {
                void 0 === t._id && (t._id = K++), G.push(t), a.push(t._id)
            }), t(), a
        }, _.updateEvent = function (a) {
            fa.each(G, function (e, t) {
                if (t._id === a._id) return G.splice(e, 1, a), !1
            }), t()
        }, _.removeEvent = function (e) {
            e = fa.isArray(e) ? e : [e], fa.each(e, function (e, a) {
                fa.each(G, function (e, t) {
                    if (t._id === a) return G.splice(e, 1), !1
                })
            }), t()
        }, _.getEvents = function (e) {
            var t;
            return e ? (e.setHours(0, 0, 0, 0), (t = _._prepareObj(G, e, e))[e] ? C(t[e]) : []) : ba(!0, [], G)
        }, _.setEvents = function (e) {
            var a = [];
            return B.data = G = ba(!0, [], e), fa.each(G, function (e, t) {
                void 0 === t._id && (t._id = K++), a.push(t._id)
            }), t(), a
        }, _.navigate = function (e, t, a) {
            e = ot(e, _._format, B), V = a ? {d: e} : null, _.setVal(e, !0, !0, !1, t ? 200 : 0)
        }, ba({}, m, {
            multiLabel: N,
            headerText: !1,
            buttons: "inline" !== B.display ? ["close"] : B.buttons,
            compClass: "mbsc-ev-cal mbsc-calendar mbsc-dt mbsc-sc",
            formatDuration: function (e, t) {
                var a = B.labelsShort, n = t - e, s = Math.abs(n) / 1e3, i = s / 60, o = i / 60, r = o / 24,
                    l = r / 365;
                return s < 45 && Math.round(s) + " " + a[5].toLowerCase() || i < 45 && Math.round(i) + " " + a[4].toLowerCase() || o < 24 && Math.round(o) + " " + a[3].toLowerCase() || r < 30 && Math.round(r) + " " + a[2].toLowerCase() || r < 365 && Math.round(r / 30) + " " + a[1].toLowerCase() || Math.round(l) + " " + a[0].toLowerCase()
            },
            onMarkupReady: function (e, t) {
                d = fa(e.target), h = t.getDate(!0), $ && ((M = fa('<div class="mbsc-lv-cont mbsc-lv-' + B.theme + (B.baseTheme ? " mbsc-lv-" + B.baseTheme : "") + (P ? " mbsc-event-list-h" : "") + ' mbsc-event-list"></div>').appendTo(fa(".mbsc-fr-w", d))).on("scroll", la(a)), v = M[0]), m.onMarkupReady.call(this, e), u = fa(".mbsc-cal-month", d), x = !1, i(h), $ && S && (c(), ut(fa(".mbsc-cal-btn", d), function (e, t) {
                    var a = B.getYear(f), n = B.getMonth(f), s = B.getDay(f);
                    "day" == k ? (f = B.getDate(a, n, s + t * D), p = B.getDate(a, n, s + (t + 1) * D - 1)) : "week" == k ? (f = B.getDate(a, n, s + t * D * 7), p = B.getDate(a, n, s + (t + 1) * D * 7 - 1)) : "month" == k ? (f = B.getDate(a, n + t * D, 1), p = B.getDate(a, n + (t + 1) * D, 0)) : "year" == k && (f = B.getDate(a + t * D, 0, 1), p = B.getDate(a + (t + 1) * D, 0, 0)), c(!0)
                }, 200)), function () {
                    var e = pe.__mbscFocusCount || 0;
                    0 === e && (ce(pe, "mousedown", he, !0), ce(pe, "keydown", fe, !0)), pe.__mbscFocusCount = ++e
                }()
            },
            onDayChange: function (e) {
                var t = e.target;
                t !== b && (O = !1 !== L && fa(".mbsc-cal-txt-more", t).length, V = {
                    d: e.date,
                    cell: B.outerMonthChange && fa(t).hasClass("mbsc-cal-day-diff") ? null : t,
                    events: e.events
                })
            },
            onLabelTap: function (e) {
                e.label && (Z("onEventSelect", {domEvent: e.domEvent, event: e.label, date: e.date}), y = !0)
            },
            onPageChange: function (e) {
                r(), T = !0, _._isSetDate || _.setVal(e.firstDay)
            },
            onPageLoaded: function (e) {
                var t = e.firstDay, a = e.lastDay;
                $ && (S ? I && H && rt(I, t) && rt(H, a) || (n(I = t, H = a), function (e, t) {
                    var a, n = (B.dateWheels || B.dateFormat).search(/m/i),
                        s = (B.dateWheels || B.dateFormat).search(/y/i), i = B.getYear(e), o = B.getMonth(e),
                        r = B.getYear(t), l = B.getMonth(t);
                    _._checkBtn(fa(".mbsc-cal-prev-m", d), st(e) <= _._minDate), _._checkBtn(fa(".mbsc-cal-next-m", d), st(t) >= _._maxDate), "day" == k ? a = ne(B.dateFormat, e, B) + (1 < D ? " - " + ne(B.dateFormat, t, B) : "") : "week" == k ? a = ne(B.dateFormat, e, B) + " - " + ne(B.dateFormat, t, B) : "month" == k ? a = 1 == D ? s < n ? i + " " + B.monthNames[o] : B.monthNames[o] + " " + i : s < n ? i + " " + B.monthNamesShort[o] + " - " + r + " " + B.monthNamesShort[l] : B.monthNamesShort[o] + " " + i + " - " + B.monthNamesShort[l] + " " + r : "year" == k && (a = i + (1 < D ? " - " + r : "")), u.html(a)
                }(t, a)) : (a = "month" == k ? B.getDate(B.getYear(t), B.getMonth(t) + D, 0) : "week" == k ? B.getDate(B.getYear(t), B.getMonth(t), B.getDay(t) + 7 * D - 1) : t = _.getVal(!0), n(t, a, g)), X || rt(h, t) || (o(h, F), F = !1)), L && s(), T = !1
            },
            onPosition: function (e) {
                if (m.onPosition.call(this, e), A && A.position(), $ && P) {
                    M.addClass("mbsc-event-list-h");
                    var t = function (e) {
                        var t = getComputedStyle(e);
                        return e.innerHeight || e.clientHeight - parseFloat(t.paddingTop) - parseFloat(t.paddingBottom)
                    }("inline" == B.display ? J.parentNode : window) - e.popup.offsetHeight;
                    v.style.height = 200 < t ? t + "px" : "", M.removeClass("mbsc-event-list-h"), X && t && (o(h, !0), X = !1)
                }
            },
            onHide: function () {
                m.onHide.call(this), _._popup && _._popup.destroy(), function () {
                    var e = pe.__mbscFocusCount || 0;
                    pe.__mbscFocusCount = --e, 0 === pe.__mbscFocusCount && (me(pe, "mousedown", he), me(pe, "keydown", fe))
                }()
            }
        })
    }, a("eventcalendar", Fe);
    var Kt, Gt = d && !!window.Promise, Xt = [], Zt = [];

    function Qt(e) {
        Xt.length || e.show(), Xt.push(e)
    }

    function ea(e, a, n, t) {
        return ba({
            display: a.display || "center",
            cssClass: "mbsc-alert",
            okText: a.okText,
            cancelText: a.cancelText,
            context: a.context,
            theme: a.theme,
            closeOnOverlayTap: !1,
            onBeforeClose: function () {
                e.shift()
            },
            onHide: function (e, t) {
                n && n(t._resolve), a.callback && a.callback(t._resolve), t && t.destroy(), Xt.length ? Xt[0].show() : Zt.length && Zt[0].show(!1, !0)
            }
        }, t)
    }

    function ta(e) {
        return (e.title ? "<h2>" + e.title + "</h2>" : "") + "<p>" + (e.message || "") + "</p>"
    }

    function aa(e, t, a) {
        Qt(new Wt(e, ea(Xt, t, a)))
    }

    function wa(e, t, a) {
        var n = new Wt(e, ea(Xt, t, a, {
            buttons: ["cancel", "ok"], onSet: function () {
                n._resolve = !0
            }
        }));
        n._resolve = !1, Qt(n)
    }

    function Ca(e, t, a) {
        var n, s = new Wt(e, ea(Xt, t, a, {
            buttons: ["cancel", "ok"], onMarkupReady: function (e, t) {
                var a = t.settings;
                t._markup.find("label").addClass("mbsc-" + a.theme + (a.baseTheme ? " mbsc-" + a.baseTheme : "")), n = t._markup.find("input")[0], setTimeout(function () {
                    n.focus(), n.setSelectionRange(0, n.value.length)
                }, 300)
            }, onSet: function () {
                s._resolve = n.value
            }
        }));
        s._resolve = null, Qt(s)
    }

    function Ma(e, a, t, n, s) {
        var i;
        !function (e) {
            var t = Zt.length;
            Zt.push(e), Xt.length || (t ? Zt[0].hide() : e.show(!1, !0))
        }(new Wt(e, ea(Zt, a, t, {
            display: a.display || "bottom",
            animate: s,
            cssClass: (n || "mbsc-snackbar") + (a.color ? " mbsc-" + a.color : ""),
            scrollLock: !1,
            focusTrap: !1,
            buttons: [],
            onMarkupReady: function (e, t) {
                var a = t.settings;
                t._markup.find("button").addClass("mbsc-" + a.theme + (a.baseTheme ? " mbsc-" + a.baseTheme : ""))
            },
            onShow: function (e, t) {
                Kt = t, !1 !== a.duration && (i = setTimeout(function () {
                    t && t.hide()
                }, a.duration || 3e3)), a.button && t.tap(fa(".mbsc-snackbar-btn", e.target), function () {
                    t.hide(), a.button.action && a.button.action.call(this)
                })
            },
            onClose: function () {
                Kt = null, clearTimeout(i)
            }
        })))
    }

    function Sa(e, t, a) {
        Ma(e, t, a, "mbsc-toast", "fade")
    }

    function ka(t, a, n) {
        var e;
        return Gt ? e = new Promise(function (e) {
            t(a, n, e)
        }) : t(a, n), e
    }

    na.alert = function (e) {
        var t = document.createElement("div");
        return t.innerHTML = ta(e), ka(aa, t, e)
    }, na.confirm = function (e) {
        var t = document.createElement("div");
        return t.innerHTML = ta(e), ka(wa, t, e)
    }, na.prompt = function (e) {
        var t = document.createElement("div");
        return t.innerHTML = ta(e) + '<label class="mbsc-input">' + (e.label ? '<span class="mbsc-label">' + e.label + "</span>" : "") + '<input class="mbsc-control" tabindex="0" type="' + (e.inputType || "text") + '" placeholder="' + (e.placeholder || "") + '" value="' + (e.value || "") + '"></label>', ka(Ca, t, e)
    }, na.snackbar = function (e) {
        var t = document.createElement("div"), a = e.button;
        return t.innerHTML = '<div class="mbsc-snackbar-cont"><div class="mbsc-snackbar-msg">' + (e.message || "") + "</div>" + (a ? '<button class="mbsc-snackbar-btn mbsc-btn mbsc-btn-flat">' + (a.icon ? '<span class="mbsc-ic ' + (a.text ? "mbsc-btn-ic " : "") + "mbsc-ic-" + a.icon + '"></span>' : "") + (a.text || "") + "</button>" : "") + "</div>", ka(Ma, t, e)
    }, na.toast = function (e) {
        var t = document.createElement("div");
        return t.innerHTML = '<div class="mbsc-toast-msg">' + (e.message || "") + "</div>", ka(Sa, t, e)
    }, na.notification = {
        dismiss: function () {
            Kt && Kt.hide()
        }
    };

    function Da(e, t) {
        var a, n = "", s = fa(e), i = {}, o = this;

        function r() {
            s.removeClass("mbsc-no-touch")
        }

        va.call(this, e, t, !0), o.refresh = function (e) {
            a.enhance && At(s, i, a, e)
        }, o._init = function () {
            na.themes.form[a.theme] || (a.theme = "mobiscroll"), s.hasClass("mbsc-form") || s.on("touchstart", r).show(), n && s.removeClass(n), n = "mbsc-form mbsc-no-touch mbsc-" + a.theme + (Na ? " mbsc-form-hb" : "") + (a.baseTheme ? " mbsc-" + a.baseTheme : "") + (a.rtl ? " mbsc-rtl" : " mbsc-ltr") + ("box" == a.inputStyle ? " mbsc-form-box" : "") + ("outline" == a.inputStyle ? " mbsc-form-outline" : ""), s.addClass(n).removeClass("mbsc-cloak"), o.refresh()
        }, o._destroy = function () {
            for (var e in s.removeClass(n).off("touchstart", r), i) i[e].destroy()
        }, o.controls = i, a = o.settings, o.init()
    }

    var Na = "ios" == n && 7 < l;
    Da.prototype = {
        _hasDef: !0,
        _hasTheme: !0,
        _hasLang: !0,
        _class: "form",
        _defaults: {tap: W, stopProp: !0, rtl: !1, enhance: !0}
    }, S("[mbsc-enhance],[mbsc-form]", k.Form = Da, !0);

    function Va(e, t) {
        var i = "", o = fa(e), a = this, r = a.settings;
        va.call(this, e, t, !0), a._init = function () {
            var e = r.context, t = fa(e), a = t.find(".mbsc-ms-top .mbsc-ms"), n = t.find(".mbsc-ms-bottom .mbsc-ms"),
                s = {};
            "body" == e ? fa("body,html").addClass("mbsc-page-ctx") : t.addClass("mbsc-page-ctx"), i && o.removeClass(i), a.length && (s.paddingTop = a[0].offsetHeight), n.length && (s.paddingBottom = n[0].offsetHeight), i = "mbsc-page mbsc-" + r.theme + (r.baseTheme ? " mbsc-" + r.baseTheme : "") + (r.rtl ? " mbsc-rtl" : " mbsc-ltr"), o.addClass(i).removeClass("mbsc-cloak").css(s)
        }, a._destroy = function () {
            o.removeClass(i)
        }, r = a.settings, a.init()
    }

    Va.prototype = {
        _hasDef: !0,
        _hasTheme: !0,
        _hasLang: !0,
        _class: "page",
        _defaults: {context: "body"}
    }, k.Page = Va, na.themes.page.mobiscroll = {}, S("[mbsc-page]", Va), a("page", Va, !1), a("form", Da, !1), a("progress", Mt, !1), a("slider", St, !1), a("stepper", yt, !1), a("switch", Ct, !1), a("rating", kt, !1);

    function Aa(c) {
        var s, t, l, e, a = ba({}, c.settings), m = ba(c.settings, Ea, a),
            n = m.layout || (/top|bottom/.test(m.display) ? "liquid" : ""), d = "liquid" == n, i = m.readonly,
            o = fa(this), r = this.id + "_dummy", u = 0, h = [], f = m.wheelArray || function r(e) {
                var l = [];
                var t = 1 < e.length ? e : e.children(m.itemSelector);
                t.each(function (e) {
                    var t = fa(this), a = t.clone();
                    a.children("ul,ol").remove(), a.children(m.itemSelector).remove();
                    var n = c._processMarkup ? c._processMarkup(a) : a.html().replace(/^\s\s*/, "").replace(/\s\s*$/, ""),
                        s = !!t.attr("data-invalid"), i = {
                            key: void 0 === t.attr("data-val") || null === t.attr("data-val") ? e : t.attr("data-val"),
                            value: n,
                            invalid: s,
                            children: null
                        }, o = "li" === m.itemSelector ? t.children("ul,ol") : t.children(m.itemSelector);
                    o.length && (i.children = r(o)), l.push(i)
                });
                return l
            }(o), p = function (e) {
                var t, a = [], n = e, s = !0, i = 0;
                for (; s;) t = g(n), a[i++] = t.key, (s = t.children) && (n = s);
                return a
            }(f);

        function b(e, t, a) {
            for (var n, s = 0, i = a, o = []; s < t;) {
                var r = e[s];
                for (n in i) if (i[n].key == r) {
                    i = i[n].children;
                    break
                }
                s++
            }
            for (s = 0; s < i.length;) i[s].invalid && o.push(i[s].key), s++;
            return o
        }

        function v(e, t, a) {
            var n, s, i = 0, o = !0, r = [[]], l = f;
            if (t) for (s = 0; s < t; s++) d ? r[0][s] = {} : r[s] = [{}];
            for (; o;) {
                for (d ? r[0][i] = x(l, i) : r[i] = [x(l, i)], s = 0, n = null; s < l.length && !n;) l[s].key == e[i] && (void 0 !== a && i <= a || void 0 === a) && (n = l[s]), s++;
                (n = n || g(l)) && n.children ? (l = n.children, i++) : o = !1
            }
            return r
        }

        function g(e, t) {
            if (!e) return !1;
            for (var a, n = 0; n < e.length;) if (!(a = e[n++]).invalid) return t ? n - 1 : a;
            return !1
        }

        function x(e, t) {
            for (var a = {
                data: [],
                label: m.labels && m.labels[t] ? m.labels[t] : t
            }, n = 0; n < e.length;) a.data.push({value: e[n].key, display: e[n].value}), n++;
            return a
        }

        function T(e) {
            c._isVisible && fa(".mbsc-sc-whl-w", c._markup).css("display", "").slice(e).hide()
        }

        function y(e, t) {
            for (var a, n, s, i = 0, o = f, r = !0, l = []; r;) {
                if (void 0 !== e[i] && i <= t) for (s = 0, n = e[i], a = void 0; s < o.length && void 0 === a;) o[s].key != e[i] || o[s].invalid || (a = s), s++; else n = o[a = g(o, !0)] && o[a].key;
                l[i] = n, i++, r = !!o[a] && o[a].children, o = o[a] && o[a].children
            }
            return {lvl: i, nVector: l}
        }

        function _(e, t, a) {
            var n, s, i = (t || 0) + 1, o = [], r = {};
            for (s = v(e, null, t), n = 0; n < e.length; n++) c._tempWheelArray[n] = e[n] = a.nVector[n] || 0;
            for (; i < a.lvl;) r[i] = d ? s[0][i] : s[i][0], o.push(i++);
            T(a.lvl), h = e.slice(0), o.length && (l = !0, c.changeWheel(r))
        }

        return function e(t, a) {
            var n;
            for (u = u < a ? a : u, n = 0; n < t.length; n++) t[n].children && e(t[n].children, a + 1)
        }(f, 1), e = v(p, u), fa("#" + r).remove(), m.input ? t = fa(m.input) : m.showInput && (t = fa('<input type="text" id="' + r + '" value="" class="' + m.inputClass + '" placeholder="' + (m.placeholder || "") + '" readonly />').insertBefore(o)), t && c.attachShow(t), m.wheelArray || o.hide(), {
            wheels: e,
            anchor: t,
            layout: n,
            headerText: !1,
            setOnTap: 1 == u,
            formatValue: function (e) {
                return void 0 === s && (s = y(e, e.length).lvl), e.slice(0, s).join(" ")
            },
            parseValue: function (e) {
                return e ? (e + "").split(" ") : (m.defaultValue || p).slice(0)
            },
            onBeforeShow: function () {
                var e = c.getArrayVal(!0);
                h = e.slice(0), m.wheels = v(e, u, u), l = !0
            },
            onWheelGestureStart: function (e) {
                m.readonly = function (e, t) {
                    for (var a = []; e;) a[--e] = !0;
                    return a[t] = !1, a
                }(u, e.index)
            },
            onWheelAnimationEnd: function (e) {
                var t = e.index, a = c.getArrayVal(!0), n = y(a, t);
                s = n.lvl, m.readonly = i, a[t] != h[t] && _(a, t, n)
            },
            onFill: function (e) {
                s = void 0, t && t.val(e.valueText)
            },
            validate: function (e) {
                var t = e.values, a = e.index, n = y(t, t.length);
                return s = n.lvl, void 0 === a && (T(n.lvl), l || _(t, a, n)), l = !1, {
                    disabled: function (e, t, a) {
                        for (var n = 0, s = []; n < e;) s[n] = b(a, n, t), n++;
                        return s
                    }(s, f, t)
                }
            },
            onDestroy: function () {
                t && fa("#" + r).remove(), o.show()
            }
        }
    }

    var Ea = {invalid: [], showInput: !0, inputClass: "", itemSelector: "li"};
    Ne.image = function (e) {
        return e.settings.enhance && (e._processMarkup = function (e) {
            var t = e.attr("data-icon");
            return e.children().each(function (e, t) {
                (t = fa(t)).is("img") ? fa('<div class="mbsc-img-c"></div>').insertAfter(t).append(t.addClass("mbsc-img")) : t.is("p") && t.addClass("mbsc-img-txt")
            }), t && e.prepend('<div class="mbsc-ic mbsc-ic-' + t + '"></div'), e.html('<div class="mbsc-img-w">' + e.html() + "</div>"), e.html()
        }), Aa.call(this, e)
    }, a("image", Fe);

    function Fa(e, t) {
        var l, s, c, m, a, r, d, T, u, h, f, p, n, i, o, b, v, g, x, y, _, w, C, M, S, k, D, N, V, A, E, F, I, H, P, $,
            L, O, Y, z, R, W, j, J, U, B, q, K, G, X, Z, Q, ee, te, ae, ne, se, ie, oe, re, le, ce, me, de, ue, he, fe,
            pe, be, ve, ge, xe, Te, ye, _e, we, Ce, Me, Se, ke, De, Ne, Ve, Ae, Ee, Fe, Ie, He, Pe, $e, Le, Oe, Ye, ze,
            Re, We, je, Je, Ue, Be, qe, Ke, Ge, Xe, Ze = this, Qe = e, et = fa(Qe), tt = 0, at = 0, nt = 0, st = {},
            it = {}, ot = {};

        function rt() {
            pe = we = !1, Fe = m = 0, Ie = new Date, K = h.width(), n = Lt(h), Z = n.index(G), X = G[0].offsetHeight, nt = G[0].offsetTop, je = Je[G.attr("data-type") || "defaults"], Ee = je.stages
        }

        function lt(e) {
            var t;
            "touchstart" === e.type && (T.removeClass("mbsc-no-touch"), be = !0, clearTimeout(ve)), !ga(e, this) || l || tt || Ia || Zt || !na.uQUjd || (U = !(a = l = !0), q = "touchstart" === e.type, He = da(e, "X"), Pe = da(e, "Y"), x = g = 0, G = fa(this), t = G, rt(), ze = je.actionable || G.hasClass("mbsc-lv-parent") || G.hasClass("mbsc-lv-back"), te = G.offset().top, ze && (c = setTimeout(function () {
                t.addClass(q ? Pa : ""), D("onItemActivate", {target: t[0], domEvent: e})
            }, 120)), Ze.sortable && !G.hasClass("mbsc-lv-back") && (Ze.sortable.group || (ue = G.nextUntil(".mbsc-lv-gr-title").filter(".mbsc-lv-item"), ge = G.prevUntil(".mbsc-lv-gr-title").filter(".mbsc-lv-item")), oe = (Ze.sortable.group ? h.children(ee).eq(0) : ge.length ? ge.eq(-1) : G)[0].offsetTop - nt, ie = (Ze.sortable.group ? h.children(ee).eq(-1) : ue.length ? ue.eq(-1) : G)[0].offsetTop - nt, Ze.sortable.handle ? fa(e.target).hasClass("mbsc-lv-handle") && (clearTimeout(c), "Moz" === _a ? (e.preventDefault(), pt()) : We = setTimeout(function () {
                pt()
            }, 100)) : We = setTimeout(function () {
                N.appendTo(G), N[0].style[_a + "Animation"] = "mbsc-lv-fill " + (Se.sortDelay - 100) + "ms linear", clearTimeout(M), clearTimeout(c), a = !1, We = setTimeout(function () {
                    N[0].style[_a + "Animation"] = "", pt()
                }, Se.sortDelay - 80)
            }, 80)), "mousedown" == e.type && fa(document).on("mousemove", ct).on("mouseup", mt))
        }

        function ct(e) {
            var t = !1, a = !0, n = m;
            if (l) if (S = da(e, "X"), k = da(e, "Y"), g = S - He, x = k - Pe, clearTimeout(M), w || Le || ke || G.hasClass("mbsc-lv-back") || (10 < Math.abs(x) ? (ke = !0, mt(ba({}, e, {type: "mousemove" == e.type ? "mouseup" : "touchend"})), clearTimeout(c)) : 7 < Math.abs(g) && ut()), Le) e.preventDefault(), m = g / K * 100, ht(n); else if (w) {
                e.preventDefault();
                var s, i = qe.scrollTop(), o = Math.max(oe, Math.min(x + Ge, ie)), r = F ? te - Xe + i - Ge : te;
                Ke + i < r + o + X ? (qe.scrollTop(r + o - Ke + X), s = !0) : r + o < i && (qe.scrollTop(r + o), s = !0), s && (Ge += qe.scrollTop() - i), me && (Ze.sortable.multiLevel && ce.hasClass("mbsc-lv-parent") ? me < nt + X / 4 + o ? t = !0 : me < nt + X - X / 4 + o && (y = ce.addClass("mbsc-lv-item-hl"), a = !1) : me < nt + X / 2 + o && (ce.hasClass("mbsc-lv-back") ? Ze.sortable.multiLevel && (_ = ce.addClass("mbsc-lv-item-hl"), a = !1) : t = !0), t && (xe.insertAfter(ce), ce = Yt(Te = ce, "next"), ye = me, me = ce.length && ce[0].offsetTop, u++)), !t && ye && (Ze.sortable.multiLevel && Te.hasClass("mbsc-lv-parent") ? nt + X - X / 4 + o < ye ? t = !0 : nt + X / 4 + o < ye && (y = Te.addClass("mbsc-lv-item-hl"), a = !1) : nt + X / 2 + o < ye && (Te.hasClass("mbsc-lv-back") ? Ze.sortable.multiLevel && (_ = Te.addClass("mbsc-lv-item-hl"), a = !1) : t = !0), t && (xe.insertBefore(Te), Te = Yt(ce = Te, "prev"), me = ye, ye = Te.length && Te[0].offsetTop + Te[0].offsetHeight, u--)), a && (y && (y.removeClass("mbsc-lv-item-hl"), y = !1), _ && (_.removeClass("mbsc-lv-item-hl"), _ = !1)), t && D("onSortChange", {
                    target: G[0],
                    index: u
                }), Dt(G, o), D("onSort", {target: G[0], index: u})
            } else (5 < Math.abs(g) || 5 < Math.abs(x)) && Nt()
        }

        function mt(e) {
            var t, a, n, s = G;
            l && (l = !1, Nt(), "mouseup" == e.type && fa(document).off("mousemove", ct).off("mouseup", mt), ke || (ve = setTimeout(function () {
                be = !1
            }, 300)), (Le || ke || w) && (pe = !0), Le ? ft() : w ? (n = h, y ? (Ft(G.detach()), a = ot[y.attr("data-ref")], u = Lt(a.child).length, y.removeClass("mbsc-lv-item-hl"), Se.navigateOnDrop ? Ut(y, function () {
                Ze.add(null, G, null, null, y, !0), jt(G), bt(G, Z, n, !0)
            }) : (Ze.add(null, G, null, null, y, !0), bt(G, Z, n, !0))) : _ ? (Ft(G.detach()), a = ot[_.attr("data-back")], u = Lt(a.parent).index(a.item) + 1, _.removeClass("mbsc-lv-item-hl"), Se.navigateOnDrop ? Ut(_, function () {
                Ze.add(null, G, u, null, h, !0), jt(G), bt(G, Z, n, !0)
            }) : (Ze.add(null, G, u, null, a.parent, !0), bt(G, Z, n, !0))) : (t = xe[0].offsetTop - nt, Dt(G, t, 6 * Math.abs(t - Math.max(oe, Math.min(x + Ge, ie))), function () {
                Ft(G), G.insertBefore(xe), bt(G, Z, n, u !== Z)
            })), w = !1) : !ke && Math.abs(g) < 5 && Math.abs(x) < 5 && (U = !0, "touchend" === e.type && Se.tap && ha(e.target, ua(fa(e.target)), e)), clearTimeout(c), setTimeout(function () {
                s.removeClass(Pa), D("onItemDeactivate", {target: s[0]})
            }, 100), ke = !1, i = null)
        }

        function dt(e) {
            var t;
            U && (t = "true" == G.attr("data-selected"), je.tap && je.tap.call(Qe, {
                target: G,
                index: Z,
                domEvent: e
            }, Ze), ze && !G.hasClass(Pa) && (G.addClass(q ? Pa : ""), D("onItemActivate", {
                target: G[0],
                domEvent: e
            })), De && (le ? t ? Xt(G) : Gt(G) : (Xt(fa(ee, T).filter("." + Ha)), Gt(G))), !1 !== D("onItemTap", {
                target: G[0],
                index: Z,
                domEvent: e,
                selected: t
            }) && Ut(G))
        }

        function ut() {
            (Le = It(je.swipe, {
                target: G[0],
                index: Z,
                direction: 0 < g ? "right" : "left"
            })) && (Nt(), clearTimeout(c), je.actions ? (s = Wt(je, g), re.html(je.icons).show().children().css("width", s + "%"), j.hide(), fa(".mbsc-lv-ic-m", J).removeClass("mbsc-lv-ic-disabled"), fa(je.leftMenu).each(_t), fa(je.rightMenu).each(_t)) : (j.show(), re.hide(), o = je.start, i = Ee[o], _e = Ee[o - 1], de = Ee[o + 1]), G.addClass("mbsc-lv-item-swiping").removeClass(Pa), Re.css("line-height", X + "px"), J.css({
                top: nt,
                height: X,
                backgroundColor: zt(g)
            }).addClass("mbsc-lv-stage-c-v").appendTo(h.parent()), Se.iconSlide && G.append(j), D("onSlideStart", {
                target: G[0],
                index: Z
            }))
        }

        function ht(e) {
            var t = !1;
            Me || (je.actions ? J.attr("class", "mbsc-lv-stage-c-v mbsc-lv-stage-c mbsc-lv-" + (m < 0 ? "right" : "left")) : (_e && (m < 0 ? m <= _e.percent : m < i.percent) ? (de = i, i = _e, _e = Ee[--o - 1], t = !0) : de && (m < 0 ? m > i.percent : m >= de.percent) && (_e = i, i = de, de = Ee[++o + 1], t = !0), i && (!t && 0 < m != e <= 0 || Vt(i, Se.iconSlide), t && D("onStageChange", {
                target: G[0],
                index: Z,
                stage: i
            }))), Ne || (Me = !0, Ce = sa(Mt)))
        }

        function ft(t) {
            var e, a, n = !1;
            ia(Ce), Me = !1, Ne || Mt(), je.actions ? 10 < Math.abs(m) && s && (kt(G, m < 0 ? -s : s, 200), Ia = n = !0, r = G, d = Z, fa(document).on("touchstart.mbsc-lv-conf mousedown.mbsc-lv-conf", function (e) {
                e.preventDefault(), St(G, !0, t)
            })) : m && (Se.quickSwipe && !Ne && (e = (a = new Date - Ie) < 300 && 50 < g, a < 300 && g < -50 ? (we = !0, Vt(i = je.left, Se.iconSlide)) : e && (we = !0, Vt(i = je.right, Se.iconSlide))), i && i.action && (It(i.disabled, {
                target: G[0],
                index: Z
            }) || (n = !0, (Ia = Ne || It(i.confirm, {
                target: G[0],
                index: Z
            })) ? (kt(G, (m < 0 ? -1 : 1) * j[0].offsetWidth * 100 / K, 200, !0), Ct(i, G, Z, !1, t)) : wt(i, G, Z, t)))), n || St(G, !0, t), Le = !1
        }

        function pt() {
            _ = y = !(w = !0), Ge = 0, u = Z, Se.vibrate && ca(), ce = Yt(G, "next"), me = ce.length && ce[0].offsetTop, Te = Yt(G, "prev"), ye = Te.length && Te[0].offsetTop + Te[0].offsetHeight, xe.height(X).insertAfter(G), G.css({top: nt}).addClass("mbsc-lv-item-dragging").removeClass(Pa).appendTo(C), D("onSortStart", {
                target: G[0],
                index: u
            })
        }

        function bt(t, a, n, e) {
            t.removeClass("mbsc-lv-item-dragging"), xe.remove(), D("onSortEnd", {
                target: t[0],
                index: u
            }), Se.vibrate && ca(), e && (Ze.addUndoAction(function (e) {
                Ze.move(t, a, null, e, n, !0)
            }, !0), D("onSortUpdate", {target: t[0], index: u}))
        }

        function vt() {
            be || (clearTimeout(Y), Ia && fa(document).trigger("touchstart"), $ && (Ze.close(P, L), $ = !1, P = null))
        }

        function gt() {
            clearTimeout(b), b = setTimeout(function () {
                Ke = qe[0].innerHeight || qe.innerHeight(), Xe = F ? qe.offset().top : 0, l && (nt = G[0].offsetTop, X = G[0].offsetHeight, J.css({
                    top: nt,
                    height: X
                }))
            }, 200)
        }

        function xt(e) {
            pe && (e.stopPropagation(), e.preventDefault(), pe = !1)
        }

        function Tt() {
            B || (clearTimeout(fe), fe = setTimeout(function () {
                var e = F ? qe[0].getBoundingClientRect().top + qe.innerHeight() : window.innerHeight,
                    t = se[0].getBoundingClientRect().top - 3 < e;
                !B && t && D("onListEnd")
            }, 250))
        }

        function yt() {
            if (w || !l) {
                var a, e = qe.scrollTop(), t = et.offset().top, n = et[0].offsetHeight, s = F ? qe.offset().top : e;
                fa(".mbsc-lv-gr-title", et).each(function (e, t) {
                    fa(t).offset().top < s && (a = t)
                }), t < s && s < t + n ? A.show().empty().append(fa(a).clone()) : A.hide()
            }
        }

        function _t(e, t) {
            It(t.disabled, {target: G[0], index: Z}) && fa(".mbsc-ic-" + t.icon, J).addClass("mbsc-lv-ic-disabled")
        }

        function wt(e, t, a, n) {
            var s, i = {
                icon: "undo2", text: Se.undoText, action: function () {
                    Ze.undo()
                }
            };
            e.undo && (Ze.startActionTrack(), fa.isFunction(e.undo) && Ze.addUndoAction(function () {
                e.undo.call(Qe, {target: t[0], index: a}, Ze)
            }), Ue = t.attr("data-ref")), s = e.action.call(Qe, {
                target: t[0],
                index: a
            }, Ze), e.undo ? (Ze.endActionTrack(), !1 !== s && kt(t, +t.attr("data-pos") < 0 ? -100 : 100, 200), xe.height(X).insertAfter(t), t.css("top", nt).addClass("mbsc-lv-item-undo"), re.hide(), j.show(), J.append(j), Vt(i), Ct(i, t, a, !0, n)) : St(t, s, n)
        }

        function Ct(t, a, n, s, i) {
            var o, r;
            Ia = !0, fa(document).off(".mbsc-lv-conf").on("touchstart.mbsc-lv-conf mousedown.mbsc-lv-conf", function (e) {
                e.preventDefault(), s && Et(a), St(a, !0, i)
            }), v || j.off(".mbsc-lv-conf").on("touchstart.mbsc-lv-conf mousedown.mbsc-lv-conf", function (e) {
                e.stopPropagation(), o = da(e, "X"), r = da(e, "Y")
            }).on("touchend.mbsc-lv-conf mouseup.mbsc-lv-conf", function (e) {
                e.preventDefault(), "touchend" === e.type && ma(), Math.abs(da(e, "X") - o) < 10 && Math.abs(da(e, "Y") - r) < 10 && (wt(t, a, n, i), s && (Be = null, Et(a)))
            })
        }

        function Mt() {
            kt(G, Fe + 100 * g / K), Me = !1
        }

        function St(e, t, a) {
            fa(document).off(".mbsc-lv-conf"), j.off(".mbsc-lv-conf"), !1 !== t ? kt(e, 0, "0" !== e.attr("data-pos") ? 200 : 0, !1, function () {
                At(e, a), Ft(e)
            }) : At(e, a), Ia = !1
        }

        function kt(e, t, a, n, s) {
            t = Math.max("right" == Le ? 0 : -100, Math.min(t, "left" == Le ? 0 : 100)), $e = e[0].style, e.attr("data-pos", t), $e[_a + "Transform"] = "translate3d(" + (n ? K * t / 100 + "px" : t + "%") + ",0,0)", $e[_a + "Transition"] = ya + "transform " + (a || 0) + "ms", s && (tt++, setTimeout(function () {
                s(), tt--
            }, a)), m = t
        }

        function Dt(e, t, a, n) {
            t = Math.max(oe, Math.min(t, ie)), ($e = e[0].style)[_a + "Transform"] = "translate3d(0," + t + "px,0)", $e[_a + "Transition"] = ya + "transform " + (a || 0) + "ms ease-out", n && (tt++, setTimeout(function () {
                n(), tt--
            }, a))
        }

        function Nt() {
            clearTimeout(We), !a && Ze.sortable && (a = !0, N.remove())
        }

        function Vt(e, t) {
            var a = It(e.text, {target: G[0], index: Z}) || "";
            It(e.disabled, {
                target: G[0],
                index: Z
            }) ? J.addClass("mbsc-lv-ic-disabled") : J.removeClass("mbsc-lv-ic-disabled"), J.css("background-color", e.color || (0 === e.percent ? zt(m) : La)), j.attr("class", "mbsc-lv-ic-c mbsc-lv-ic-" + (t ? "move-" : "") + (m < 0 ? "right" : "left")), W.attr("class", " mbsc-lv-ic-s mbsc-lv-ic mbsc-ic mbsc-ic-" + (e.icon || "none")), Re.attr("class", "mbsc-lv-ic-text" + (e.icon ? "" : " mbsc-lv-ic-text-only") + (a ? "" : " mbsc-lv-ic-only")).html(a || "&nbsp;"), Se.animateIcons && (we ? W.addClass("mbsc-lv-ic-v") : setTimeout(function () {
                W.addClass("mbsc-lv-ic-a")
            }, 10))
        }

        function At(e, t) {
            l || (W.attr("class", "mbsc-lv-ic-s mbsc-lv-ic mbsc-ic mbsc-ic-none"), J.attr("style", "").removeClass("mbsc-lv-stage-c-v"), Re.html("")), J.removeClass("mbsc-lv-left mbsc-lv-right"), e && (D("onSlideEnd", {
                target: e[0],
                index: Z
            }), t && t())
        }

        function Et(e) {
            e.css("top", "").removeClass("mbsc-lv-item-undo"), Be ? Ze.animate(xe, "collapse", function () {
                xe.remove()
            }) : xe.remove(), At(), Be = Ue = null
        }

        function Ft(e) {
            ($e = e[0].style)[_a + "Transform"] = "", $e[_a + "Transition"] = "", $e.top = "", e.removeClass("mbsc-lv-item-swiping")
        }

        function It(e, t) {
            return fa.isFunction(e) ? e.call(this, t, Ze) : e
        }

        function Ht(e) {
            return De && !e.hasClass("mbsc-lv-parent") && !e.hasClass("mbsc-lv-back")
        }

        function Pt(e) {
            var t = e.attr("data-ref"), a = e.attr("data-role"), n = Je[e.attr("data-type") || "defaults"],
                s = Ht(e) && "true" == e.attr("data-selected");
            if (t || (t = $a++, e.attr("data-ref", t)), ot[t] = {
                item: e,
                child: e.children(ne),
                parent: e.parent(),
                ref: e.parent()[0] === Qe ? null : e.parent().parent().attr("data-ref")
            }, e.addClass("list-divider" == a ? "mbsc-lv-gr-title" : "mbsc-lv-item" + (n.actionable ? " mbsc-lv-item-actionable" : "") + (s ? " " + Ha : "")), e.attr("aria-selected", s ? "true" : "false"), Ze.sortable.handle && "list-divider" != a && !e.children(".mbsc-lv-handle-c").length && e.append(I), Se.enhance && !e.hasClass("mbsc-lv-item-enhanced")) {
                var i = e.attr("data-icon"), o = e.find("img").eq(0).addClass("mbsc-lv-img");
                o.is(":first-child") ? e.addClass("mbsc-lv-img-" + (Se.rtl ? "right" : "left")) : o.length && e.addClass("mbsc-lv-img-" + (Se.rtl ? "left" : "right")), e.addClass("mbsc-lv-item-enhanced").children().each(function (e, t) {
                    (t = fa(t)).is("p, h1, h2, h3, h4, h5, h6") && t.addClass("mbsc-lv-txt")
                }), i && e.addClass("mbsc-lv-item-ic-" + (e.attr("data-icon-align") || (Se.rtl ? "right" : "left"))).append('<div class="mbsc-lv-item-ic mbsc-ic mbsc-ic-' + i + '"></div>')
            }
            e.append(Ze._getText(na, .2))
        }

        function $t(e) {
            fa(ee, e).not(".mbsc-lv-back").each(function () {
                Pt(fa(this))
            }), fa(ne, e).not(".mbsc-lv").addClass("mbsc-lv").prepend(z).parent().addClass("mbsc-lv-parent mbsc-lv-item-actionable").prepend(R), fa(".mbsc-lv-back", e).each(function () {
                fa(this).attr("data-back", fa(this).parent().parent().attr("data-ref"))
            })
        }

        function Lt(e) {
            return e.children(ee).not(".mbsc-lv-back").not(".mbsc-lv-removed").not(".mbsc-lv-ph")
        }

        function Ot(e) {
            return "object" != typeof e && (e = fa(ee, T).filter('[data-id="' + e + '"]')), fa(e)
        }

        function Yt(e, t) {
            for (e = e[t](); e.length && (!e.hasClass("mbsc-lv-item") || e.hasClass("mbsc-lv-ph") || e.hasClass("mbsc-lv-item-dragging"));) {
                if (!Ze.sortable.group && e.hasClass("mbsc-lv-gr-title")) return !1;
                e = e[t]()
            }
            return e
        }

        function zt(e) {
            return (0 < e ? je.right : je.left).color || La
        }

        function Rt(e) {
            return ra(e) ? e + "" : 0
        }

        function Wt(e, t) {
            return +(t < 0 ? Rt((e.actionsWidth || 0).right) || Rt(e.actionsWidth) || Rt(Se.actionsWidth.right) || Rt(Se.actionsWidth) : Rt((e.actionsWidth || 0).left) || Rt(e.actionsWidth) || Rt(Se.actionsWidth.left) || Rt(Se.actionsWidth))
        }

        function jt(e, t) {
            if (e) {
                var a = qe.scrollTop(), n = e.is(".mbsc-lv-item") ? e[0].offsetHeight : 0,
                    s = e.offset().top + (F ? a - Xe : 0);
                t ? (s < a || a + Ke < s + n) && qe.scrollTop(s) : s < a ? qe.scrollTop(s) : a + Ke < s + n && qe.scrollTop(Math.min(s, s + n - Ke / 2))
            }
        }

        function Jt(e, t, a, n, s) {
            var i = t.parent(), o = t.prev();
            n = n || oa, o[0] === j[0] && (o = j.prev()), Se.rtl && (e = "l" === e ? "r" : "l"), h[0] !== t[0] ? (D("onNavStart", {
                level: at,
                direction: e,
                list: t[0]
            }), Ve.prepend(t.addClass("mbsc-lv-v mbsc-lv-sl-new")), jt(T), Bt(Ve, "mbsc-lv-sl-" + e, function () {
                h.removeClass("mbsc-lv-sl-curr"), t.removeClass("mbsc-lv-sl-new").addClass("mbsc-lv-sl-curr"), f && f.length ? h.removeClass("mbsc-lv-v").insertAfter(f) : p.append(h.removeClass("mbsc-lv-v")), f = o, p = i, h = t, jt(a, s), n.call(Qe, a), D("onNavEnd", {
                    level: at,
                    direction: e,
                    list: t[0]
                })
            })) : (jt(a, s), n.call(Qe, a))
        }

        function Ut(e, t) {
            tt || (e.hasClass("mbsc-lv-parent") ? (at++, Jt("r", ot[e.attr("data-ref")].child, null, t)) : e.hasClass("mbsc-lv-back") && (at--, Jt("l", ot[e.attr("data-back")].parent, ot[e.attr("data-back")].item, t)))
        }

        function Bt(e, t, a) {
            var n;

            function s() {
                clearTimeout(n), tt--, e.off(Ta, s).removeClass(t), a.call(Qe, e)
            }

            a = a || oa, Se.animation && "mbsc-lv-item-none" !== t ? (tt++, e.on(Ta, s).addClass(t), n = setTimeout(s, 250)) : a.call(Qe, e)
        }

        function qt(e, t) {
            var a, n = e.attr("data-ref");
            a = it[n] = it[n] || [], t && a.push(t), e.attr("data-action") || (t = a.shift()) && (e.attr("data-action", 1), t(function () {
                e.removeAttr("data-action"), a.length ? qt(e) : delete it[n]
            }))
        }

        function Kt(a, n, s) {
            var i, o;
            a && a.length && (i = 100 / (a.length + 2), fa.each(a, function (e, t) {
                void 0 === t.key && (t.key = Ae++), void 0 === t.percent && (t.percent = n * i * (e + 1), s && ((o = ba({}, t)).key = Ae++, o.percent = -i * (e + 1), a.push(o), st[o.key] = o)), st[t.key] = t
            }))
        }

        function Gt(e) {
            Ht(e) && e.addClass(Ha).attr("data-selected", "true").attr("aria-selected", "true")
        }

        function Xt(e) {
            e.removeClass(Ha).removeAttr("data-selected").removeAttr("aria-selected")
        }

        va.call(this, e, t, !0), Ze.animate = function (e, t, a) {
            Bt(e, "mbsc-lv-item-" + t, a)
        }, Ze.add = function (e, t, a, n, s, i) {
            var o, r, l, c, m, d, u = "", h = void 0 === s ? et : Ot(s), f = h,
                p = fa("object" != typeof t ? "<" + Q + ' data-ref="' + $a++ + '" data-id="' + e + '">' + t + "</" + Q + ">" : t),
                b = p[0], v = b.style, g = p.attr("data-pos") < 0 ? "left" : "right", x = p.attr("data-ref");
            n = n || oa, x || (x = $a++, p.attr("data-ref", x)), Pt(p), i || Ze.addUndoAction(function (e) {
                c ? Ze.navigate(h, function () {
                    f.remove(), h.removeClass("mbsc-lv-parent").children(".mbsc-lv-arr").remove(), m.child = h.children(ne), Ze.remove(p, null, e, !0)
                }) : Ze.remove(p, null, e, !0)
            }, !0), qt(p, function (t) {
                Ft(p.css("top", "").removeClass("mbsc-lv-item-undo")), h.is(ee) ? (d = h.attr("data-ref"), h.children(ne).length || (c = !0, h.append("<" + ae + "></" + ae + ">"))) : d = h.children(".mbsc-lv-back").attr("data-back"), (m = ot[d]) && (m.child.length ? f = m.child : (h.addClass("mbsc-lv-parent").prepend(R), f = h.children(ne).prepend(z).addClass("mbsc-lv"), m.child = f, fa(".mbsc-lv-back", h).attr("data-back", d))), ot[x] = {
                    item: p,
                    child: p.children(ne),
                    parent: f,
                    ref: d
                }, l = Lt(f), r = l.length, null == a && (a = r), i && (u = "mbsc-lv-item-new-" + (i ? g : "")), $t(p.addClass(u)), !1 !== a && (r ? a < r ? p.insertBefore(l.eq(a)) : p.insertAfter(l.eq(r - 1)) : (o = fa(".mbsc-lv-back", f)).length ? p.insertAfter(o) : f.append(p)), T.trigger("mbsc-refresh"), Se.animateAddRemove && f.hasClass("mbsc-lv-v") ? (v.height = b.offsetHeight + "px", Ze.animate(p, i && Ue === x ? "none" : "expand", function (e) {
                    Ze.animate(e, i ? "add-" + g : "pop-in", function (e) {
                        v.height = "", n.call(Qe, e.removeClass(u)), t()
                    })
                })) : (n.call(Qe, p.removeClass(u)), t()), D("onItemAdd", {target: b})
            })
        }, Ze.swipe = function (e, t, a, n, s) {
            var i;
            e = Ot(e), G = e, v = n, l = Ne = !0, a = void 0 === a ? 300 : a, g = 0 < t ? 1 : -1, rt(), ut(), kt(e, t, a), clearTimeout(Ye), clearInterval(Oe), Oe = setInterval(function () {
                i = m, m = xa(e) / K * 100, ht(i)
            }, 10), Ye = setTimeout(function () {
                clearInterval(Oe), i = m, m = t, ht(i), ft(s), l = Ne = v = !1
            }, a)
        }, Ze.openStage = function (e, t, a, n) {
            st[t] && Ze.swipe(e, st[t].percent, a, n)
        }, Ze.openActions = function (e, t, a, n) {
            e = Ot(e);
            var s = Wt(Je[e.attr("data-type") || "defaults"], "left" == t ? -1 : 1);
            Ze.swipe(e, "left" == t ? -s : s, a, n)
        }, Ze.close = function (e, t) {
            Ze.swipe(e, 0, t)
        }, Ze.remove = function (e, a, n, s) {
            var i, o, t, r, l, c, m;
            n = n || oa, l = (i = Ot(e)).attr("data-ref"), i.length && ot[l] && (o = i.parent(), r = Lt(o).index(i), m = i[0].style, function t(e) {
                e && (c = c || e.hasClass("mbsc-lv-v"), e.children("[data-ref]").each(function () {
                    var e = fa(this).attr("data-ref");
                    ot[e] && (t(ot[e].child), delete ot[e])
                }))
            }(ot[l].child), c && (t = Se.animation, Se.animation = !1, Ze.navigate(i), Se.animation = t), delete ot[l], s || (i.attr("data-ref") === Ue && (Be = !0), Ze.addUndoAction(function (e) {
                Ze.add(null, i, r, e, o, !0)
            }, !0)), qt(i, function (t) {
                a = a || (i.attr("data-pos") < 0 ? "left" : "right"), Se.animateAddRemove && o.hasClass("mbsc-lv-v") ? Ze.animate(i.addClass("mbsc-lv-removed"), s ? "pop-out" : "remove-" + a, function (e) {
                    m.height = e[0].offsetHeight + "px", Ze.animate(e, "collapse", function (e) {
                        m.height = "", Ft(e.removeClass("mbsc-lv-removed")), !1 !== n.call(Qe, e) && e.remove(), t()
                    })
                }) : (!1 !== n.call(Qe, i) && i.remove(), t()), D("onItemRemove", {target: i[0]})
            }))
        }, Ze.move = function (e, t, a, n, s, i) {
            e = Ot(e), i || Ze.startActionTrack(), J.append(j), Ze.remove(e, a, null, i), Ze.add(null, e, t, n, s, i), i || Ze.endActionTrack()
        }, Ze.navigate = function (e, t) {
            var a, n;
            e = Ot(e), a = ot[e.attr("data-ref")], n = function (e) {
                for (var t = 0, a = ot[e.attr("data-ref")]; a && a.ref;) t++, a = ot[a.ref];
                return t
            }(e), a && (Jt(at <= n ? "r" : "l", a.parent, e, t, !0), at = n)
        }, Ze.showLoading = function () {
            B = !0, se.addClass("mbsc-show-lv-loading"), qe.scrollTop(F ? qe[0].scrollHeight : fa(Se.context)[0].scrollHeight)
        }, Ze.hideLoading = function () {
            se.removeClass("mbsc-show-lv-loading"), setTimeout(function () {
                B = !1
            }, 100)
        }, Ze.select = function (e) {
            le || Xt(fa(ee, T).filter("." + Ha)), Gt(Ot(e))
        }, Ze.deselect = function (e) {
            Xt(Ot(e))
        }, Ze._processSettings = function () {
            et.is("[mbsc-enhance]") && (E = !0, et.removeAttr("mbsc-enhance"))
        }, Ze._init = function () {
            var e, t, a, n = 0, s = "", i = "", o = "";
            ae = Se.listNode, ne = Se.listSelector, Q = Se.itemNode, ee = Se.itemSelector, le = "multiple" == Se.select, De = "off" != Se.select, a = Ze.remote.listview.sortable, Ze.remote.listview.handlePos, I = Ze.remote.listview.handleDiv, z = Ze.remote.listview.htmlLeft, R = Ze.remote.listview.htmlRight, e = Ze.remote.listview.contClass, Ze.sortable = a || !1, T ? (T.attr("class", e), fa(".mbsc-lv-handle-c", T).remove(), fa(ee, T).not(".mbsc-lv-back").removeClass("mbsc-lv-item"), qe.off("orientationchange resize", gt), he && qe.off("scroll touchmove", he), qe.off("scroll touchmove", Tt)) : (s += '<div class="mbsc-lv-multi-c"></div>', s += '<div class="mbsc-lv-ic-c"><div class="mbsc-lv-ic-s mbsc-lv-ic mbsc-ic mbsc-ic-none"></div><div class="mbsc-lv-ic-text"></div></div>', et.addClass("mbsc-lv mbsc-lv-v mbsc-lv-root").removeClass("mbsc-cloak").show(), J = fa('<div class="mbsc-lv-stage-c">' + s + "</div>"), j = fa(".mbsc-lv-ic-c", J), re = fa(".mbsc-lv-multi-c", J), W = fa(".mbsc-lv-ic-s", J), Re = fa(".mbsc-lv-ic-text", J), xe = fa("<" + Q + ' class="mbsc-lv-item mbsc-lv-ph"></' + Q + ">"), N = fa('<div class="mbsc-lv-fill-item"></div>'), T = fa('<div class="' + e + '"><' + ae + ' class="mbsc-lv mbsc-lv-dummy"></' + ae + '><div class="mbsc-lv-sl-c"></div><div class="mbsc-lv-loading"><span class="mbsc-ic mbsc-ic-' + (Se.loadingIcon || "loop2") + '"></span></div></div>'), C = fa(".mbsc-lv-dummy", T), se = fa(".mbsc-lv-loading", T), T.insertAfter(et), gt(), T.on("touchstart mousedown", ".mbsc-lv-item", lt).on("touchmove", ".mbsc-lv-item", ct).on("touchend touchcancel", ".mbsc-lv-item", mt).on("click", ".mbsc-lv-item", dt), Qe.addEventListener("click", xt, !0), T.on("touchstart mousedown", ".mbsc-lv-ic-m", function (e) {
                v || (e.stopPropagation(), e.preventDefault()), He = da(e, "X"), Pe = da(e, "Y")
            }).on("touchend mouseup", ".mbsc-lv-ic-m", function (e) {
                v || ("touchend" === e.type && ma(), Ia && !fa(this).hasClass("mbsc-lv-ic-disabled") && Math.abs(da(e, "X") - He) < 10 && Math.abs(da(e, "Y") - Pe) < 10 && wt((m < 0 ? je.rightMenu : je.leftMenu)[fa(this).index()], r, d))
            }), Ve = fa(".mbsc-lv-sl-c", T).append(et.addClass("mbsc-lv-sl-curr")).attr("data-ref", $a++), h = et, p = T), F = "body" !== Se.context, (qe = fa(F ? Se.context : window)).on("orientationchange resize", gt), qe.on("scroll touchmove", Tt), Ae = 0, (Je = Se.itemGroups || {}).defaults = {
                swipeleft: Se.swipeleft,
                swiperight: Se.swiperight,
                stages: Se.stages,
                actions: Se.actions,
                actionsWidth: Se.actionsWidth,
                actionable: Se.actionable
            }, $t(et), fa.each(Je, function (e, a) {
                if (a.swipe = void 0 !== a.swipe ? a.swipe : Se.swipe, a.actionable = void 0 !== a.actionable ? a.actionable : Se.actionable, a.stages = a.stages || [], Kt(a.stages, 1, !0), Kt(a.stages.left, 1), Kt(a.stages.right, -1), (a.stages.left || a.stages.right) && (a.stages = [].concat(a.stages.left || [], a.stages.right || [])), V = !1, a.stages.length || (a.swipeleft && a.stages.push({
                    percent: -30,
                    action: a.swipeleft
                }), a.swiperight && a.stages.push({
                    percent: 30,
                    action: a.swiperight
                })), fa.each(a.stages, function (e, t) {
                    if (0 === t.percent) return !(V = !0)
                }), V || a.stages.push({percent: 0}), a.stages.sort(function (e, t) {
                    return e.percent - t.percent
                }), fa.each(a.stages, function (e, t) {
                    if (0 === t.percent) return a.start = e, !1
                }), V ? a.left = a.right = a.stages[a.start] : (a.left = a.stages[a.start - 1] || {}, a.right = a.stages[a.start + 1] || {}), a.actions) {
                    for (a.leftMenu = a.actions.left || a.actions, a.rightMenu = a.actions.right || a.leftMenu, o = i = "", n = 0; n < a.leftMenu.length; n++) i += "<div " + (a.leftMenu[n].color ? 'style="background-color: ' + a.leftMenu[n].color + '"' : "") + ' class="mbsc-lv-ic-m mbsc-lv-ic mbsc-ic mbsc-ic-' + a.leftMenu[n].icon + '">' + (a.leftMenu[n].text || "") + "</div>";
                    for (n = 0; n < a.rightMenu.length; ++n) o += "<div " + (a.rightMenu[n].color ? 'style="background-color: ' + a.rightMenu[n].color + '"' : "") + ' class="mbsc-lv-ic-m mbsc-lv-ic mbsc-ic mbsc-ic-' + a.rightMenu[n].icon + '">' + (a.rightMenu[n].text || "") + "</div>";
                    a.actions.left && (a.swipe = a.actions.right ? a.swipe : "right"), a.actions.right && (a.swipe = a.actions.left ? a.swipe : "left"), a.icons = '<div class="mbsc-lv-multi mbsc-lv-multi-ic-left">' + i + '</div><div class="mbsc-lv-multi mbsc-lv-multi-ic-right">' + o + "</div>"
                }
            }), Se.fixedHeader && (t = "mbsc-lv-fixed-header" + (F ? " mbsc-lv-fixed-header-ctx mbsc-lv-" + Se.theme + " mbsc-" + Se.theme + (Se.baseTheme ? " mbsc-lv-" + Se.baseTheme + " mbsc-" + Se.baseTheme : "") : ""), A ? (A.attr("class", t), yt()) : A = fa('<div class="' + t + '"></div>'), F ? qe.before(A) : T.prepend(A), he = la(yt, 200), qe.on("scroll touchmove", he)), Se.hover && (L || T.on("mouseover.mbsc-lv", ".mbsc-lv-item", function () {
                P && P[0] == this || (vt(), P = fa(this), Je[P.attr("data-type") || "defaults"].actions && (Y = setTimeout(function () {
                    be ? P = null : ($ = !0, Ze.openActions(P, H, L, !1))
                }, O)))
            }).on("mouseleave.mbsc-lv", vt), L = Se.hover.time || 200, O = Se.hover.timeout || 200, H = Se.hover.direction || Se.hover || "right"), E && T.attr("mbsc-enhance", ""), T.trigger("mbsc-enhance", [{
                theme: Se.theme,
                lang: Se.lang
            }])
        }, Ze._destroy = function () {
            var e;
            p.append(h), F && A && A.remove(), E && (et.attr("mbsc-enhance", ""), (e = pa[T[0].id]) && e.destroy()), Qe.removeEventListener("click", xt, !0), T.find(".mbsc-lv-txt,.mbsc-lv-img").removeClass("mbsc-lv-txt mbsc-lv-img"), T.find(ne).removeClass("mbsc-lv mbsc-lv-v mbsc-lv-root mbsc-lv-sl-curr").find(ee).removeClass("mbsc-lv-gr-title mbsc-lv-item mbsc-lv-item-enhanced mbsc-lv-parent mbsc-lv-img-left mbsc-lv-img-right mbsc-lv-item-ic-left mbsc-lv-item-ic-right").removeAttr("data-ref"), fa(".mbsc-lv-back,.mbsc-lv-handle-c,.mbsc-lv-arr,.mbsc-lv-item-ic", T).remove(), et.insertAfter(T), T.remove(), J.remove(), qe.off("orientationchange resize", gt), qe.off("scroll touchmove", Tt), he && qe.off("scroll touchmove", he)
        };
        var Zt, Qt = [], ea = [], ta = [], aa = 0;
        Ze.startActionTrack = function () {
            aa || (ta = []), aa++
        }, Ze.endActionTrack = function () {
            --aa || ea.push(ta)
        }, Ze.addUndoAction = function (e, t) {
            var a = {action: e, async: t};
            aa ? ta.push(a) : (ea.push([a]), ea.length > Se.undoLimit && ea.shift())
        }, Ze.undo = function () {
            var e, t, a;

            function n() {
                t < 0 ? (Zt = !1, s()) : (e = a[t], t--, e.async ? e.action(n) : (e.action(), n()))
            }

            function s() {
                (a = Qt.shift()) && (Zt = !0, t = a.length - 1, n())
            }

            ea.length && Qt.push(ea.pop()), Zt || s()
        }, Se = Ze.settings, D = Ze.trigger, Ze.init()
    }

    var Ia, Ha = "mbsc-selected", Pa = "mbsc-lv-item-active", $a = 1, La = "transparent";
    Fa.prototype = {
        _class: "listview",
        _hasDef: !0,
        _hasTheme: !0,
        _hasLang: !0,
        _defaults: {
            context: "body",
            actionsWidth: 90,
            sortDelay: 250,
            undoLimit: 10,
            tap: W,
            swipe: !0,
            quickSwipe: !0,
            animateAddRemove: !0,
            animateIcons: !0,
            animation: !0,
            revert: !0,
            vibrate: !0,
            actionable: !0,
            handleClass: "",
            handleMarkup: '<div class="mbsc-lv-handle-bar mbsc-lv-handle"></div><div class="mbsc-lv-handle-bar mbsc-lv-handle"></div><div class="mbsc-lv-handle-bar mbsc-lv-handle"></div>',
            listNode: "ul",
            listSelector: "ul,ol",
            itemNode: "li",
            itemSelector: "li",
            leftArrowClass: "mbsc-ic-arrow-left4",
            rightArrowClass: "mbsc-ic-arrow-right4",
            backText: "Back",
            undoText: "Undo",
            stages: [],
            select: "off"
        }
    }, k.ListView = Fa, na.themes.listview.mobiscroll = {
        leftArrowClass: "mbsc-ic-arrow-left5",
        rightArrowClass: "mbsc-ic-arrow-right5"
    }, a("listview", Fa, !1);
    var Oa = {
        batch: 50,
        min: 0,
        max: 100,
        defaultUnit: "",
        units: null,
        unitNames: null,
        invalid: [],
        sign: !1,
        step: .05,
        scale: 2,
        convert: function (e) {
            return e
        },
        decimalSeparator: ".",
        signText: "&nbsp;",
        wholeText: "Whole",
        fractionText: "Fraction",
        unitText: "Unit"
    };
    Ne.measurement = function (b) {
        var a, v, g, x, T, y, _, w, C, M, S, k, e, t, n = ba({}, b.settings), D = ba(b.settings, Oa, n), s = {},
            i = [[]], N = {}, V = {}, o = {}, A = [], E = D.sign, F = D.units && D.units.length,
            I = F ? D.defaultUnit || D.units[0] : "", r = [], H = D.step < 1, P = 1 < D.step ? D.step : 1,
            l = H ? Math.max(D.scale, (D.step + "").split(".")[1].length) : 1, c = Math.pow(10, l),
            $ = Math.round(H ? D.step * c : D.step), m = 0, d = 0, L = 0;

        function u(e) {
            return Math.max(C, Math.min(M, H ? e < 0 ? Math.ceil(e) : Math.floor(e) : z(Math.round(e - m), $) + m))
        }

        function h(e) {
            return H ? z((Math.abs(e) - Math.abs(u(e))) * c - d, $) + d : 0
        }

        function O(e) {
            var t = u(e), a = h(e);
            return c <= a && (e < 0 ? t-- : t++, a = 0), [e < 0 ? "-" : "+", t, a]
        }

        function Y(e) {
            var t = +e[T], a = H ? e[x] / c * (t < 0 ? -1 : 1) : 0;
            return (E && "-" == e[0] ? -1 : 1) * (t + a)
        }

        function z(e, t) {
            return Math.round(e / t) * t
        }

        function R(e, t, a) {
            return t !== a && D.convert ? D.convert.call(this, e, t, a) : e
        }

        function W(e) {
            var t, a;
            _ = R(D.min, I, e), w = R(D.max, I, e), H ? (C = _ < 0 ? Math.ceil(_) : Math.floor(_), M = w < 0 ? Math.ceil(w) : Math.floor(w), S = h(_), k = h(w)) : (C = Math.round(_), M = Math.round(w), M = C + Math.floor((M - C) / $) * $, m = C % $), t = C, a = M, E && (a = Math.abs(t) > Math.abs(a) ? Math.abs(t) : Math.abs(a), t = t < 0 ? 0 : t), V.min = t < 0 ? Math.ceil(t / P) : Math.floor(t / P), V.max = a < 0 ? Math.ceil(a / P) : Math.floor(a / P)
        }

        function f(e) {
            return Y(e).toFixed(H ? l : 0) + (F ? " " + r[e[y]] : "")
        }

        if (b.setVal = function (e, t, a, n, s) {
            b._setVal(fa.isArray(e) ? f(e) : e, t, a, n, s)
        }, D.units) for (t = 0; t < D.units.length; ++t) e = D.units[t], r.push(D.unitNames && D.unitNames[e] || e);
        if (E) if (E = !1, F) for (t = 0; t < D.units.length; t++) R(D.min, I, D.units[t]) < 0 && (E = !0); else E = D.min < 0;
        if (E && (i[0].push({data: ["-", "+"], label: D.signText}), L++), V = {
            label: D.wholeText, data: function (e) {
                return C % P + e * P
            }, getIndex: function (e) {
                return Math.round((e - C % P) / P)
            }
        }, i[0].push(V), T = L++, W(I), H) {
            for (i[0].push(o), o.data = [], o.label = D.fractionText, t = d; t < c; t += $) A.push(t), o.data.push({
                value: t,
                display: D.decimalSeparator + ee(t, l)
            });
            x = L++, a = Math.ceil(100 / $), D.invalid && D.invalid.length && (fa.each(D.invalid, function (e, t) {
                var a = 0 < t ? Math.floor(t) : Math.ceil(t);
                0 === a && (a = t <= 0 ? -.001 : .001), N[a] = (N[a] || 0) + 1, 0 === t && (N[a = .001] = (N[a] || 0) + 1)
            }), fa.each(N, function (e, t) {
                t < a ? delete N[e] : N[e] = e
            }))
        }
        if (F) {
            for (s = {
                data: [],
                label: D.unitText,
                cssClass: "mbsc-msr-whl-unit",
                circular: !1
            }, t = 0; t < D.units.length; t++) s.data.push({value: t, display: r[t]});
            i[0].push(s)
        }
        return y = L, {
            wheels: i,
            minWidth: E && H ? 70 : 80,
            showLabel: !1,
            formatValue: f,
            compClass: "mbsc-msr mbsc-sc",
            parseValue: function (e) {
                var t, a = ((("number" == typeof e ? e + "" : e) || D.defaultValue) + "").split(" "), n = +a[0], s = [],
                    i = "";
                return F && (i = -1 == (i = -1 == (i = fa.inArray(a[1], r)) ? fa.inArray(I, D.units) : i) ? 0 : i), W(g = F ? D.units[i] : ""), (t = O(n = ue(n = isNaN(n) ? 0 : n, _, w)))[1] = ue(t[1], C, M), v = n, E && (s[0] = t[0], t[1] = Math.abs(t[1])), s[T] = t[1], H && (s[x] = t[2]), F && (s[y] = i), s
            },
            onCancel: function () {
                v = void 0
            },
            validate: function (e) {
                var a, n, t, s, i, o = e.values, r = e.index, l = e.direction, c = {}, m = [], d = {},
                    u = F ? D.units[o[y]] : "";
                if (E && 0 === r && (v = Math.abs(v) * ("-" == o[0] ? -1 : 1)), (r === T || r === x && H || void 0 === v || void 0 === r) && (v = Y(o), g = u), (F && r === y && g !== u || void 0 === r) && (W(u), v = R(v, g, u), g = u, n = O(v), void 0 !== r && (d[T] = V, b.changeWheel(d)), E && (o[0] = n[0])), m[T] = [], E) for (m[0] = [], 0 < _ && (m[0].push("-"), o[0] = "+"), w < 0 && (m[0].push("+"), o[0] = "-"), i = Math.abs("-" == o[0] ? C : M), L = i + P; L < i + 20 * P; L += P) m[T].push(L), c[L] = !0;
                if (v = ue(v, _, w), n = O(v), t = E ? Math.abs(n[1]) : n[1], a = E ? "-" == o[0] : v < 0, o[T] = t, a && (n[0] = "-"), H && (o[x] = n[2]), fa.each(H ? N : D.invalid, function (e, t) {
                    if (E && a) {
                        if (!(t <= 0)) return;
                        t = Math.abs(t)
                    }
                    t = z(R(t, I, u), H ? 1 : $), c[t] = !0, m[T].push(t)
                }), o[T] = b.getValidValue(T, t, l, c), n[1] = o[T] * (E && a ? -1 : 1), H) {
                    m[x] = [];
                    var h = E ? o[0] + o[1] : (v < 0 ? "-" : "+") + Math.abs(n[1]),
                        f = (_ < 0 ? "-" : "+") + Math.abs(C), p = (w < 0 ? "-" : "+") + Math.abs(M);
                    h === f && fa(A).each(function (e, t) {
                        (a ? S < t : t < S) && m[x].push(t)
                    }), h === p && fa(A).each(function (e, t) {
                        (a ? t < k : k < t) && m[x].push(t)
                    }), fa.each(D.invalid, function (e, t) {
                        s = O(R(t, I, u)), (n[0] === s[0] || 0 === n[1] && 0 === s[1] && 0 === s[2]) && n[1] === s[1] && m[x].push(s[2])
                    })
                }
                return {disabled: m, valid: o}
            }
        }
    };
    var Ya = {min: 0, max: 100, defaultUnit: "km", units: ["m", "km", "in", "ft", "yd", "mi"]}, za = {
        mm: .001,
        cm: .01,
        dm: .1,
        m: 1,
        dam: 10,
        hm: 100,
        km: 1e3,
        in: .0254,
        ft: .3048,
        yd: .9144,
        ch: 20.1168,
        fur: 201.168,
        mi: 1609.344,
        lea: 4828.032
    };
    Ne.distance = function (e) {
        var t = ba({}, Ya, e.settings);
        return ba(e.settings, t, {
            sign: !1, convert: function (e, t, a) {
                return e * za[t] / za[a]
            }
        }), Ne.measurement.call(this, e)
    };
    var Ra = {min: 0, max: 100, defaultUnit: "N", units: ["N", "kp", "lbf", "pdl"]},
        Wa = {N: 1, kp: 9.80665, lbf: 4.448222, pdl: .138255};
    Ne.force = function (e) {
        var t = ba({}, Ra, e.settings);
        return ba(e.settings, t, {
            sign: !1, convert: function (e, t, a) {
                return e * Wa[t] / Wa[a]
            }
        }), Ne.measurement.call(this, e)
    };
    var ja = {
        min: 0,
        max: 1e3,
        defaultUnit: "kg",
        units: ["g", "kg", "oz", "lb"],
        unitNames: {tlong: "t (long)", tshort: "t (short)"}
    }, Ja = {
        mg: .001,
        cg: .01,
        dg: .1,
        g: 1,
        dag: 10,
        hg: 100,
        kg: 1e3,
        t: 1e6,
        drc: 1.7718452,
        oz: 28.3495,
        lb: 453.59237,
        st: 6350.29318,
        qtr: 12700.58636,
        cwt: 50802.34544,
        tlong: 1016046.9088,
        tshort: 907184.74
    };
    Ne.mass = function (e) {
        var t = ba({}, ja, e.settings);
        return ba(e.settings, t, {
            sign: !1, convert: function (e, t, a) {
                return e * Ja[t] / Ja[a]
            }
        }), Ne.measurement.call(this, e)
    };
    var Ua = {
        min: 0,
        max: 100,
        defaultUnit: "kph",
        units: ["kph", "mph", "mps", "fps", "knot"],
        unitNames: {kph: "km/h", mph: "mi/h", mps: "m/s", fps: "ft/s", knot: "knot"}
    }, Ba = {kph: 1, mph: 1.60934, mps: 3.6, fps: 1.09728, knot: 1.852};
    Ne.speed = function (e) {
        var t = ba({}, Ua, e.settings);
        return ba(e.settings, t, {
            sign: !1, convert: function (e, t, a) {
                return e * Ba[t] / Ba[a]
            }
        }), Ne.measurement.call(this, e)
    };
    var qa = {
        min: -20,
        max: 40,
        defaultUnit: "c",
        units: ["c", "k", "f", "r"],
        unitNames: {c: "°C", k: "K", f: "°F", r: "°R"}
    }, Ka = {
        c2k: function (e) {
            return e + 273.15
        }, c2f: function (e) {
            return 9 * e / 5 + 32
        }, c2r: function (e) {
            return 9 * (e + 273.15) / 5
        }, k2c: function (e) {
            return e - 273.15
        }, k2f: function (e) {
            return 9 * e / 5 - 459.67
        }, k2r: function (e) {
            return 9 * e / 5
        }, f2c: function (e) {
            return 5 * (e - 32) / 9
        }, f2k: function (e) {
            return 5 * (e + 459.67) / 9
        }, f2r: function (e) {
            return e + 459.67
        }, r2c: function (e) {
            return 5 * (e - 491.67) / 9
        }, r2k: function (e) {
            return 5 * e / 9
        }, r2f: function (e) {
            return e - 459.67
        }
    };
    Ne.temperature = function (e) {
        var t = ba({}, qa, e.settings);
        return ba(e.settings, t, {
            sign: !0, convert: function (e, t, a) {
                return Ka[t + "2" + a](e)
            }
        }), Ne.measurement.call(this, e)
    }, a("measurement", Fe), a("distance", Fe), a("force", Fe), a("mass", Fe), a("speed", Fe), a("temperature", Fe);

    function Ga(o, e, t) {
        var r, l, a, n, c, s, i, m, d, u, h, f, p, b, v, g, x, T = {}, y = 1e3, _ = this, w = fa(o);

        function C(e) {
            clearTimeout(u), u = setTimeout(function () {
                D(!e || "load" !== e.type)
            }, 200)
        }

        function M() {
            i && this.parentNode === o && S(fa(this), !0)
        }

        function S(e, t) {
            if (e.length) {
                if (t = _._onItemTap(e, t), (r = e).parent()[0] == o) {
                    var a = e.offset().left, n = e[0].offsetLeft, s = e[0].offsetWidth, i = l.offset().left;
                    h && (n = v - n - s), "a" == b.variant ? a < i ? f.scroll(h ? n + s - c : -n, y, !0) : i + c < a + s && f.scroll(h ? n : c - n - s, y, !0) : f.scroll((c / 2 - n - s / 2) * (h ? -1 : 1), y, !0)
                }
                t && x("onItemTap", {target: e[0]})
            }
        }

        function k() {
            var s;
            _._initMarkup(l), w.find(".mbsc-ripple").remove(), _._$items = w.children(), _._$items.each(function (e) {
                var t, a = fa(this), n = a.attr("data-ref");
                n = n || Xa++, 0 === e && (s = a), r = r || _._getActiveItem(a), t = "mbsc-scv-item mbsc-btn-e " + ((_._getItemProps(a) || {}).cssClass || ""), a.attr("data-ref", n).removeClass(T[n]).addClass(t), T[n] = t, a.append(_._getText(na, .2))
            }), r = r || s, _._markupReady(l)
        }

        function D(e, t) {
            var a = b.itemWidth, n = b.layout;
            if (_.contWidth = c = l.width(), _._checkResp()) return !1;
            e && d === c || !c || (d = c, ra(n) && (s = c ? c / n : a) < a && (n = "liquid"), a && ("liquid" == n ? s = c ? c / Math.min(Math.floor(c / a), _._$items.length) : a : "fixed" == n && (s = a)), _._size(c, s), s && w.children().css("width", s + "px"), _.totalWidth = v = o.offsetWidth, ba(f.settings, {
                contSize: c,
                maxSnapScroll: !!b.paging && 1,
                maxScroll: 0,
                minScroll: c < v ? c - v : 0,
                snap: b.paging ? c : !!p && (s || ".mbsc-scv-item"),
                elastic: c < v && (s || c)
            }), f.refresh(t))
        }

        va.call(this, o, e, !0), _.navigate = function (e, t) {
            S(_._getItem(e), t)
        }, _.next = function (e) {
            if (r) {
                var t = r.next();
                t.length && S(r = t, e)
            }
        }, _.prev = function (e) {
            if (r) {
                var t = r.prev();
                t.length && S(r = t, e)
            }
        }, _.refresh = _.position = function (e) {
            k(), D(!1, e)
        }, _._init = function () {
            var e;
            a = fa(b.context), n = fa("body" == b.context ? window : b.context), _.__init(), h = _.remote.menustrip.rtlSetting, p = _.remote.menustrip.snapSetting, e = _.remote.menustrip.contClass + (_._getContClass() || ""), l ? (l.attr("class", e), w.off(".mbsc-ripple")) : ((l = fa('<div class="' + e + '"><div class="mbsc-scv-sc"></div></div>').on("click", ".mbsc-scv-item", M).insertAfter(w)).find(".mbsc-scv-sc").append(w), l.find("img").on("load", C), n.on("orientationchange resize", C), m = ve(l[0], C, b.zone), f = new ht(l[0], {
                axis: "X",
                contSize: 0,
                maxScroll: 0,
                maxSnapScroll: 1,
                minScroll: 0,
                snap: 1,
                elastic: 1,
                rtl: h,
                mousewheel: b.mousewheel,
                thresholdX: b.threshold,
                stopProp: b.stopProp,
                onStart: function (e) {
                    "touchstart" == e.domEvent.type && (i = !1, g || (g = !0, a.find(".mbsc-no-touch").removeClass("mbsc-no-touch")))
                },
                onBtnTap: function (e) {
                    i = !0;
                    var t = e.domEvent, a = t.target;
                    "touchend" === t.type && b.tap && ha(a, ua(fa(a)), t)
                },
                onGestureStart: function (e) {
                    x("onGestureStart", e)
                },
                onGestureEnd: function (e) {
                    x("onGestureEnd", e)
                },
                onMove: function (e) {
                    x("onMove", e)
                },
                onAnimationStart: function (e) {
                    x("onAnimationStart", e)
                },
                onAnimationEnd: function (e) {
                    x("onAnimationEnd", e)
                }
            })), w.css("display", "").addClass("mbsc-scv").removeClass("mbsc-cloak"), k(), x("onMarkupReady", {target: l[0]}), D()
        }, _._size = oa, _._initMarkup = oa, _._markupReady = oa, _._getContClass = oa, _._getItemProps = oa, _._getActiveItem = oa, _.__init = oa, _.__destroy = oa, _._destroy = function () {
            _.__destroy(), n.off("orientationchange resize", C), w.removeClass("mbsc-scv").insertAfter(l).find(".mbsc-scv-item").each(function () {
                var e = fa(this);
                e.width("").removeClass(T[e.attr("data-ref")])
            }), l.remove(), f.destroy(), m.detach()
        }, _._getItem = function (e) {
            return "object" != typeof e && (e = _._$items.filter('[data-id="' + e + '"]')), fa(e)
        }, _._onItemTap = function (e, t) {
            return void 0 === t || t
        }, b = _.settings, x = _.trigger, t || _.init()
    }

    var Xa = 1;
    Ga.prototype = {
        _class: "scrollview",
        _hasDef: !0,
        _hasTheme: !0,
        _hasLang: !0,
        _responsive: !0,
        _defaults: {tap: W, stopProp: !1, context: "body", layout: "liquid"}
    }, k.ScrollView = Ga;

    function Za(a, e, t) {
        var n, s, i, o, r, l, c = fa(a), m = this;

        function d() {
            s && "inline" != s && n.find(".mbsc-page").css("padding-" + s, "")
        }

        function u(e) {
            e.addClass(r).attr("data-selected", "true").attr("aria-selected", "true")
        }

        function h(e) {
            e.removeClass(r).removeAttr("data-selected").removeAttr("aria-selected")
        }

        Ga.call(this, a, e, !0), m.select = function (e) {
            i || h(m._$items.filter(".mbsc-ms-item-sel")), u(m._getItem(e))
        }, m.deselect = function (e) {
            h(m._getItem(e))
        }, m.enable = function (e) {
            m._getItem(e).removeClass("mbsc-disabled").removeAttr("data-disabled").removeAttr("aria-disabled")
        }, m.disable = function (e) {
            m._getItem(e).addClass("mbsc-disabled").attr("data-disabled", "true").attr("aria-disabled", "true")
        }, m.setBadge = function (e, t) {
            var a;
            e = m._getItem(e).attr("data-badge", t), (a = fa(".mbsc-ms-badge", e)).length ? t ? a.html(t) : a.remove() : t && e.append('<span class="mbsc-ms-badge">' + t + "</span>")
        }, m._markupReady = function (e) {
            m._hasIcons ? e.addClass("mbsc-ms-icons") : e.removeClass("mbsc-ms-icons"), m._hasText ? e.addClass("mbsc-ms-txt") : e.removeClass("mbsc-ms-txt"), m.__markupReady(e)
        }, m._size = function (e, t) {
            m.__size(e, t), "inline" != s && n.find(".mbsc-page").css("padding-" + s, a.offsetHeight + "px")
        }, m._onItemTap = function (e, t) {
            return !1 !== m.__onItemTap(e, t) && (void 0 === t && (t = !i), o && t && !e.hasClass("mbsc-disabled") && (i ? "true" == e.attr("data-selected") ? h(e) : u(e) : (h(m._$items.filter(".mbsc-ms-item-sel")), u(e))), t)
        }, m._getActiveItem = function (e) {
            var t = "true" == e.attr("data-selected");
            if (o && !i && t) return e
        }, m._getItemProps = function (e) {
            var t = "true" == e.attr("data-selected"), a = "true" == e.attr("data-disabled"), n = e.attr("data-icon"),
                s = e.attr("data-badge");
            return e.attr("data-role", "button").attr("aria-selected", t ? "true" : "false").attr("aria-disabled", a ? "true" : "false").find(".mbsc-ms-badge").remove(), s && e.append('<span class="mbsc-ms-badge">' + s + "</span>"), n && (m._hasIcons = !0), e.text() && (m._hasText = !0), {cssClass: "mbsc-ms-item " + (l.itemClass || "") + " " + (t ? r : "") + (a ? " mbsc-disabled " + (l.disabledClass || "") : "") + (n ? " mbsc-ms-ic mbsc-ic mbsc-ic-" + n : "")}
        }, m._getContClass = function () {
            return " mbsc-ms-c mbsc-ms-" + l.variant + " mbsc-ms-" + s + (o ? "" : " mbsc-ms-nosel") + (m.__getContClass() || "")
        }, m.__init = function () {
            m.___init(), n = fa(l.context), d(), s = l.display, i = "multiple" == l.select, o = "off" != l.select, r = " mbsc-ms-item-sel " + (l.activeClass || ""), c.addClass("mbsc-ms mbsc-ms-base " + (l.groupClass || ""))
        }, m.__destroy = function () {
            c.removeClass("mbsc-ms mbsc-ms-base " + (l.groupClass || "")), d(), m.___destroy()
        }, m.__onItemTap = oa, m.__getContClass = oa, m.__markupReady = oa, m.__size = oa, m.___init = oa, m.___destroy = oa, l = m.settings, t || m.init()
    }

    Za.prototype = {_defaults: ba({}, Ga.prototype._defaults)};

    function Qa(e, t) {
        Za.call(this, e, t, !0), this.___init = function () {
        }, this.init()
    }

    Qa.prototype = {
        _class: "optionlist",
        _hasDef: !0,
        _hasTheme: !0,
        _hasLang: !0,
        _responsive: !0,
        _defaults: ba({}, Za.prototype._defaults, {select: "multiple", variant: "a", display: "inline"})
    }, k.Optionlist = Qa, na.themes.optionlist = na.themes.navigation, a("optionlist", Qa, !1);

    function en(e, t) {
        var l, c, m, d, u, h = fa(e), n = h.is("ul,ol"), f = this;
        Za.call(this, e, t, !0), f._initMarkup = function () {
            l && l.remove(), c && h.append(c.children())
        }, f.__size = function (a, n) {
            var s, i = n || 72, o = f._$items.length, r = 0;
            u.hide(), "bottom" == d.type && (h.removeClass("mbsc-scv-liq"), l.remove(), f._$items.remove().each(function (e) {
                var t = fa(this);
                h.append(t), r += n || this.offsetWidth || 0, Math.round(r + (e < o - 1 ? i : 0)) > a && (s = !0, c.append(t.css("width", "").addClass("mbsc-fr-btn-e")))
            }), l.attr("class", m + (d.moreIcon ? " mbsc-menu-item-ic mbsc-ms-ic mbsc-ic mbsc-ic-" + d.moreIcon : "")).html(f._hasIcons && f._hasText ? d.moreText : ""), s && h.append(l)), "liquid" == d.layout && h.addClass("mbsc-scv-liq")
        }, f.__onItemTap = function (e) {
            if (e.hasClass("mbsc-menu-item") && !1 !== f.trigger("onMenuShow", {
                target: e[0],
                menu: u
            })) return u.show(!1, !0), !1
        }, f.__getContClass = function () {
            return "hamburger" == d.type ? " mbsc-ms-hamburger" : ""
        }, f.__markupReady = function (e) {
            "hamburger" == d.type && (c.append(f._$items.addClass("mbsc-fr-btn-e")), l.attr("class", m + (d.menuIcon ? " mbsc-menu-item-ic mbsc-ms-ic mbsc-ic mbsc-ic-" + d.menuIcon : "")).html(d.menuText || ""), h.append(l), d.menuText && d.menuIcon || e.removeClass("mbsc-ms-icons"), d.menuText ? e.addClass("mbsc-ms-txt") : e.removeClass("mbsc-ms-txt"))
        }, f.___init = function () {
            var a;
            "tab" == d.type ? (d.display = d.display || "top", d.variant = d.variant || "b") : "bottom" == d.type ? (d.display = d.display || "bottom", d.variant = d.variant || "a") : "hamburger" == d.type && (d.display = d.display || "inline", d.variant = d.variant || "a"), m = "mbsc-scv-item mbsc-ms-item mbsc-btn-e mbsc-menu-item " + (d.itemClass || ""), l || (l = fa(n ? "<li></li>" : "<div></div>"), c = fa(n ? "<ul></ul>" : "<div></div>").addClass("mbsc-scv mbsc-ms")), u = new Wt(c[0], {
                display: "bubble",
                theme: d.theme,
                lang: d.lang,
                context: d.context,
                buttons: [],
                anchor: l,
                onBeforeShow: function (e, t) {
                    a = null, t.settings.cssClass = "mbsc-wdg mbsc-ms-a mbsc-ms-more" + (f._hasText ? "" : " mbsc-ms-more-icons")
                },
                onBeforeClose: function () {
                    return f.trigger("onMenuHide", {target: a && a[0], menu: u})
                },
                onMarkupReady: function (e, t) {
                    f.tap(t._markup.find(".mbsc-fr-c"), function (e) {
                        (a = fa(e.target).closest(".mbsc-ms-item")).length && !a.hasClass("mbsc-disabled") && (f.navigate(a, !0), u.hide())
                    })
                }
            })
        }, f.___destroy = function () {
            u.destroy(), h.append(f._$items), l.remove()
        }, d = f.settings, f.init()
    }

    en.prototype = {
        _class: "navigation",
        _hasDef: !0,
        _hasTheme: !0,
        _hasLang: !0,
        _responsive: !0,
        _defaults: ba({}, Za.prototype._defaults, {
            type: "bottom",
            moreText: "More",
            moreIcon: "material-more-horiz",
            menuIcon: "material-menu"
        })
    }, a("nav", k.Navigation = en, !1), Ne.number = Ne.measurement, a("number", Fe);

    function tn(s, e, t) {
        var i, o, r, l, c, m, d, a, n, u, h, f, p, b, v, g, x, T, y, _, w = fa(s), C = this, M = [], S = [], k = {},
            D = {}, N = {}, V = {
                48: 0,
                49: 1,
                50: 2,
                51: 3,
                52: 4,
                53: 5,
                54: 6,
                55: 7,
                56: 8,
                57: 9,
                96: 0,
                97: 1,
                98: 2,
                99: 3,
                100: 4,
                101: 5,
                102: 6,
                103: 7,
                104: 8,
                105: 9
            };

        function A(e) {
            var t, a = m.validate.call(s, {values: g.slice(0), variables: k}, C) || [], n = a && a.disabled || [];
            if (C._isValid = !a.invalid, C._tempValue = m.formatValue.call(s, g.slice(0), k, C), c = g.length, x = a.length || y, C._isVisible && na.uQUjd) {
                if (fa(".mbsc-np-ph", o).each(function (e) {
                    fa(this).html("ltr" == m.fill ? c <= e ? l : d || g[e] : y - x <= e ? e + c < y ? l : d || g[e + c - y] : "")
                }), fa(".mbsc-np-cph", o).each(function () {
                    fa(this).html(k[fa(this).attr("data-var")] || fa(this).attr("data-ph"))
                }), c === y) for (t = 0; t <= 9; t++) n.push(t);
                for (fa(".mbsc-np-btn", o).removeClass(r), t = 0; t < n.length; t++) fa('.mbsc-np-btn[data-val="' + n[t] + '"]', o).addClass(r);
                C._isValid ? fa(".mbsc-fr-btn-s .mbsc-fr-btn", o).removeClass(r) : fa(".mbsc-fr-btn-s .mbsc-fr-btn", o).addClass(r), C.live && (C._hasValue = e || C._hasValue, E(e, !1, e), e && T("onSet", {valueText: C._value}))
            }
        }

        function E(e, t, a, n) {
            t && A(), n || (_ = g.slice(0), D = ba({}, k), M = S.slice(0), C._value = C._hasValue ? C._tempValue : null), e && (C._isInput && w.val(C._hasValue && C._isValid ? C._value : ""), T("onFill", {
                valueText: C._hasValue ? C._tempValue : "",
                change: a
            }), a && (C._preventChange = !0, w.trigger("change")))
        }

        function F(e) {
            var t, a, n = e || [], s = [];
            for (S = [], k = {}, t = 0; t < n.length; t++) /:/.test(n[t]) ? (a = n[t].split(":"), k[a[0]] = a[1], S.push(a[0])) : (s.push(n[t]), S.push("digit"));
            return s
        }

        function I(e, t) {
            T("onInput", {domEvent: t, target: e, values: g.slice(0), valueText: C._tempValue, variables: k})
        }

        function H(e, t) {
            e && (e = fa.isArray(e) ? e : [e]).forEach(function (e) {
                N[e] = t
            })
        }

        function P(e, t, a) {
            !(c || t || m.allowLeadingZero) || e.hasClass("mbsc-disabled") || e.hasClass("mbsc-np-btn-empty") || c < y && na.uQUjd && (S.push("digit"), g.push(t), A(!0), I(e[0], a))
        }

        function $(e, t) {
            var a, n, s = e.attr("data-val"), i = "false" !== e.attr("data-track"), o = e.attr("data-var");
            if (!e.hasClass("mbsc-disabled")) {
                if (o && (n = o.split(":"), i && S.push(n[0]), k[n[0]] = void 0 === n[2] ? n[1] : k[n[0]] == n[1] ? n[2] : n[1]), s.length + c <= x) for (a = 0; a < s.length; ++a) n = ra(s[a]) ? +s[a] : s[a], (m.allowLeadingZero || c || n) && (S.push("digit"), g.push(n), c = g.length);
                A(!0), I(e[0], t)
            }
        }

        function L(e) {
            var t, a, n = S.pop();
            if (c || "digit" !== n) {
                if ("digit" !== n && k[n]) for (delete k[n], a = S.slice(0), S = [], t = 0; t < a.length; t++) a[t] !== n && S.push(a[t]); else g.pop();
                A(!0), I(i[0], e)
            }
        }

        function O() {
            clearInterval(v), b = !1
        }

        function Y(e) {
            if (ga(e, this)) {
                if ("keydown" == e.type && 32 != e.keyCode) return;
                !function (e) {
                    b = !0, a = da(e, "X"), n = da(e, "Y"), clearInterval(v), clearTimeout(v), L(e), v = setInterval(function () {
                        L(e)
                    }, 150)
                }(e), "mousedown" == e.type && fa(document).on("mousemove", z).on("mouseup", R)
            }
        }

        function z(e) {
            b && (u = da(e, "X"), h = da(e, "Y"), f = u - a, p = h - n, (7 < Math.abs(f) || 7 < Math.abs(p)) && O())
        }

        function R(e) {
            b && (e.preventDefault(), O(), "mouseup" == e.type && fa(document).off("mousemove", z).off("mouseup", R))
        }

        xe.call(this, s, e, !0), C.setVal = C._setVal = function (e, t, a, n) {
            C._hasValue = null != e, g = F(fa.isArray(e) ? e.slice(0) : m.parseValue.call(s, e, C)), E(t, !0, void 0 === a ? t : a, n)
        }, C.getVal = C._getVal = function (e) {
            return C._hasValue || e ? C[e ? "_tempValue" : "_value"] : null
        }, C.setArrayVal = C.setVal, C.getArrayVal = function (e) {
            return e ? g.slice(0) : C._hasValue ? _.slice(0) : null
        }, C._readValue = function () {
            var e = w.val() || "";
            "" !== e && (C._hasValue = !0), d ? (k = {}, S = [], g = []) : (k = C._hasValue ? D : {}, S = C._hasValue ? M : [], g = C._hasValue && _ ? _.slice(0) : F(m.parseValue.call(s, e, C)), E(!1, !0))
        }, C._fillValue = function () {
            E(C._hasValue = !0, !1, !0)
        }, C._generateContent = function () {
            var e, t, a, n = 1, s = m.leftKey, i = m.rightKey, o = "";
            for (o += '<div class="mbsc-np-hdr"><div role="button" tabindex="0" aria-label="' + m.deleteText + '" class="mbsc-np-del mbsc-fr-btn-e mbsc-ic mbsc-ic-' + m.deleteIcon + '"></div><div class="mbsc-np-dsp">', o += m.template.replace(/d/g, '<span class="mbsc-np-ph">' + l + "</span>").replace(/&#100;/g, "d").replace(/{([a-zA-Z0-9]*):?([a-zA-Z0-9\-_]*)}/g, '<span class="mbsc-np-cph" data-var="$1" data-ph="$2">$2</span>'), o += "</div></div>", o += '<div class="mbsc-np-tbl-c mbsc-w-p"><div class="mbsc-np-tbl">', e = 0; e < 4; e++) {
                for (o += '<div class="mbsc-np-row">', t = 0; t < 3; t++) 10 == (a = n) || 12 == n ? a = "" : 11 == n && (a = 0), "" === a ? 10 == n && s ? (H(s.keys, "left"), o += '<div role="button" tabindex="0" class="mbsc-np-btn mbsc-np-btn-custom mbsc-np-btn-custom-left mbsc-fr-btn-e" ' + (s.variable ? 'data-var="' + s.variable + '"' : "") + ' data-val="' + (s.value || "") + '" ' + (void 0 !== s.track ? ' data-track="' + s.track + '"' : "") + ">" + s.text + "</div>") : 12 == n && m.rightKey ? (H(i.keys, "right"), o += '<div role="button" tabindex="0" class="mbsc-np-btn mbsc-np-btn-custom mbsc-np-btn-custom-right mbsc-fr-btn-e" ' + (i.variable ? 'data-var="' + i.variable + '"' : "") + ' data-val="' + (i.value || "") + '" ' + (void 0 !== i.track ? ' data-track="' + i.track + '"' : "") + " >" + i.text + "</div>") : o += '<div class="mbsc-np-btn mbsc-np-btn-empty"></div>' : o += '<div tabindex="0" role="button" class="mbsc-np-btn mbsc-fr-btn-e" data-val="' + a + '">' + a + C._getText(na, .2) + "</div>", n++;
                o += "</div>"
            }
            return o += "</div></div>"
        }, C._markupReady = function () {
            o = C._markup, A()
        }, C._attachEvents = function (n) {
            n.on("keydown", function (e) {
                var t, a = e.keyCode;
                void 0 !== N[a] ? (t = fa(".mbsc-np-btn-custom-" + N[a], n)).length && ("sign:-:" === t.attr("data-var") && (k.sign = 107 === a || 187 === a ? "-" : ""), $(t, e)) : void 0 !== V[a] ? P(fa('.mbsc-np-btn[data-val="' + V[a] + '"]', n), V[a], e) : 8 == a && (e.preventDefault(), L(e))
            }), C.tap(fa(".mbsc-np-btn", n), function (e) {
                var t = fa(this);
                t.hasClass("mbsc-np-btn-custom") ? $(t, e) : P(t, +t.attr("data-val"), e)
            }, !1, 30, !0), i = fa(".mbsc-np-del", n).on("touchstart mousedown keydown", Y).on("touchmove mousemove", z).on("touchend mouseup keyup", R)
        }, C.__init = function () {
            (m = C.settings).template = m.template.replace(/\\d/, "&#100;"), l = m.placeholder, y = (m.template.match(/d/g) || []).length, r = "mbsc-disabled " + (m.disabledClass || ""), d = m.mask, T = C.trigger, d && w.is("input") && w.attr("type", "password")
        }, C._indexOf = function (e, t) {
            var a;
            for (a = 0; a < e.length; ++a) if (e[a].toString() === t.toString()) return a;
            return -1
        }, t || C.init()
    }

    var an = {};
    tn.prototype = {
        _hasDef: !0,
        _hasTheme: !0,
        _hasLang: !0,
        _responsive: !0,
        _class: "numpad",
        _presets: an,
        _defaults: ba({}, xe.prototype._defaults, {
            template: "dd.dd",
            placeholder: "0",
            deleteIcon: "backspace",
            allowLeadingZero: !1,
            headerText: !1,
            fill: "rtl",
            compClass: "mbsc-np",
            deleteText: "Delete",
            decimalSeparator: ".",
            thousandsSeparator: ",",
            validate: oa,
            parseValue: oa,
            formatValue: function (e, t, a) {
                var n, s = 1, i = a.settings, o = i.placeholder, r = i.template, l = e.length, c = r.length, m = "";
                for (n = 0; n < c; n++) "d" == r[c - n - 1] ? (m = s <= l ? e[l - s] + m : o + m, s++) : m = r[c - n - 1] + m;
                return fa.each(t, function (e, t) {
                    m = m.replace("{" + e + "}", t)
                }), fa("<div>" + m + "</div>").text()
            }
        })
    }, k.Numpad = tn, na.themes.numpad = na.themes.frame;
    var nn = {entryMode: "template", min: 0, max: 99.99, maxScale: 4, prefix: "", suffix: "", returnAffix: !1};

    function sn(e) {
        for (var t = 0, a = 1, n = 0; e.length;) 3 < t ? a = 3600 : 1 < t && (a = 60), n += e.pop() * a * (t % 2 ? 10 : 1), t++;
        return n
    }

    an.decimal = function (l) {
        var e = ba({}, l.settings), t = {scale: "freeform" == e.entryMode ? void 0 : 2}, c = ba(l.settings, nn, t, e),
            m = c.scale, d = +c.min.toFixed(m), u = +c.max.toFixed(m), a = d < 0,
            h = new RegExp(c.thousandsSeparator, "g"), f = (Math.floor(Math.max(u, Math.abs(d))) + "").length + 1,
            p = "freeform" == c.entryMode;

        function b(e, t) {
            var a = +e.map(function (e, t) {
                return (0 === t && "." === e ? "0" : "") + e
            }).join("");
            if (!p) for (var n = 0; n < m; n++) a /= 10;
            return t ? -1 * a : a
        }

        function v(e, t) {
            var a = "";
            !p || void 0 !== m && t ? a = b(e).toFixed(m) : ("." === e[0] && (a += "0"), a += e.join(""));
            var n = a.split("."), s = n[0].replace(/\B(?=(\d{3})+(?!\d))/g, c.thousandsSeparator),
                i = n[1] ? c.decimalSeparator + n[1] : "";
            return void 0 !== n[1] && !n[1].length && p && (i = c.decimalSeparator), s + i
        }

        l.setVal = function (e, t, a, n) {
            return l._setVal(ue(e, d, u), t, a, n)
        }, l.getVal = function (e) {
            var t = l._getVal(e), a = (t + "").replace(h, "").replace(c.decimalSeparator, ".");
            return ra(a) ? +a : t
        };
        var n = Array(f).join("d");
        return n += p ? void 0 !== m ? m ? Array(m + 2).join("d") : "" : Array(c.maxScale + 2).join("d") : m ? "." + Array(m + 1).join("d") : "", {
            template: (a ? "{sign}" : "") + c.prefix.replace(/d/g, "\\d") + n + c.suffix.replace(/d/g, "\\d"),
            leftKey: a ? {text: "-/+", variable: "sign:-:", track: !1, keys: [107, 109, 187, 189]} : void 0,
            rightKey: p ? {text: c.decimalSeparator, value: ".", keys: [110, 190]} : void 0,
            allowLeadingZero: p,
            parseValue: function (e) {
                var t, a, n = e || c.defaultValue, s = [], i = void 0 !== m ? m : c.maxScale;
                if (n) {
                    if (a = (n = (n + "").replace(h, "").replace(c.decimalSeparator, ".")).match(/\d+\.?\d*/g)) for (a = (+a[0]).toFixed(i), t = 0; t < a.length; t++) if ("." != a[t]) {
                        if (+a[t]) s.push(+a[t]); else if (s.length) {
                            var o = a.indexOf("."), r = a.length > t + 1 && a.substring(t + 1).match(/[1-9]+/);
                            (!p || t < o || r) && s.push(0)
                        }
                    } else p && s.push(".")
                } else 0 === n && p && s.push(0);
                return e < 0 && s.unshift("sign:-"), s
            },
            formatValue: function (e, t) {
                var a = v(e, !0);
                return (b(e, t && "-" == t.sign) < 0 ? "-" : "") + (c.returnAffix ? c.prefix + a + c.suffix : a)
            },
            validate: function (e) {
                var t, a = e.values, n = v(a), s = b(a, e.variables && "-" == e.variables.sign), i = [],
                    o = u < s || s < d || !!c.invalid && -1 != l._indexOf(c.invalid, s);
                if (a.length || c.allowLeadingZero || p || i.push(0), (a.length >= f || -1 !== a.indexOf(".")) && i.push("."), p) {
                    if (1 == a.length && 0 === a[0]) for (t = 0; t <= 9; t++) i.push(t);
                    a.length && "." != a[a.length - 1] || (o = !0);
                    var r = void 0 !== m ? m : c.maxScale;
                    if (a.length >= r + 1 && "." == a[a.length - r - 1]) for (t = 0; t <= 9; t++) i.push(t)
                }
                return l.isVisible() && fa(".mbsc-np-dsp", l._markup).html((e.variables.sign || "") + c.prefix + n + c.suffix || "&nbsp;"), {
                    disabled: i,
                    invalid: o
                }
            }
        }
    };
    var on = ["h", "m", "s"],
        rn = {min: 0, max: 362439, defaultValue: 0, hourTextShort: "h", minuteTextShort: "m", secTextShort: "s"};
    an.timespan = function (s) {
        var e = ba({}, s.settings), i = ba(s.settings, rn, e), o = {
            h: i.hourTextShort.replace(/d/g, "\\d"),
            m: i.minuteTextShort.replace(/d/g, "\\d"),
            s: i.secTextShort.replace(/d/g, "\\d")
        }, t = 'd<span class="mbsc-np-sup mbsc-np-time">' + o.s + "</span>";

        function r(a) {
            var n, s = "", i = 3600;
            return fa(on).each(function (e, t) {
                n = Math.floor(a / i), a -= n * i, i /= 60, (0 < n || "s" == t && !s) && (s = s + (s ? " " : "") + n + o[t])
            }), s
        }

        return 9 < i.max && (t = "d" + t), 99 < i.max && (t = '<span class="mbsc-np-ts-m">' + (639 < i.max ? "d" : "") + 'd</span><span class="mbsc-np-sup mbsc-np-time">' + o.m + "</span>" + t), 6039 < i.max && (t = '<span class="mbsc-np-ts-h">' + (38439 < i.max ? "d" : "") + 'd</span><span class="mbsc-np-sup mbsc-np-time">' + o.h + "</span>" + t), s.setVal = function (e, t, a, n) {
            return ra(e) && (e = r(e)), s._setVal(e, t, a, n)
        }, s.getVal = function (e) {
            return s._hasValue || e ? sn(s.getArrayVal(e)) : null
        }, {
            template: t, parseValue: function (e) {
                var a, n = e || r(i.defaultValue), s = [];
                return n && fa(on).each(function (e, t) {
                    (a = new RegExp("(\\d+)" + o[t], "gi").exec(n)) ? 9 < (a = +a[1]) ? (s.push(Math.floor(a / 10)), s.push(a % 10)) : (s.length && s.push(0), (a || s.length) && s.push(a)) : s.length && (s.push(0), s.push(0))
                }), s
            }, formatValue: function (e) {
                return r(sn(e))
            }, validate: function (e) {
                var t = e.values, a = sn(t.slice(0)), n = [];
                return t.length || n.push(0), {
                    disabled: n,
                    invalid: a > i.max || a < i.min || !!i.invalid && -1 != s._indexOf(i.invalid, +a)
                }
            }
        }
    };
    var ln = {timeFormat: "hh:ii A", amText: "am", pmText: "pm"};
    an.time = function (s) {
        var e = ba({}, s.settings), h = ba(s.settings, ln, e), f = h.timeFormat.split(":"),
            p = h.timeFormat.match(/a/i), i = p ? "a" == p[0] ? h.amText : h.amText.toUpperCase() : "",
            o = p ? "a" == p[0] ? h.pmText : h.pmText.toUpperCase() : "", b = 0, v = h.min ? "" + h.min.getHours() : "",
            g = h.max ? "" + h.max.getHours() : "",
            x = h.min ? "" + (h.min.getMinutes() < 10 ? "0" + h.min.getMinutes() : h.min.getMinutes()) : "",
            T = h.max ? "" + (h.max.getMinutes() < 10 ? "0" + h.max.getMinutes() : h.max.getMinutes()) : "",
            y = h.min ? "" + (h.min.getSeconds() < 10 ? "0" + h.min.getSeconds() : h.min.getSeconds()) : "",
            _ = h.max ? "" + (h.max.getSeconds() < 10 ? "0" + h.max.getSeconds() : h.max.getSeconds()) : "";

        function r(e, t) {
            var a, n = "";
            for (a = 0; a < e.length; ++a) n += e[a] + (a % 2 == (e.length % 2 == 1 ? 0 : 1) && a != e.length - 1 ? ":" : "");
            return fa.each(t, function (e, t) {
                n += " " + t
            }), n
        }

        return h.min && h.min.setFullYear(2014, 7, 20), h.max && h.max.setFullYear(2014, 7, 20), {
            placeholder: "-",
            allowLeadingZero: !0,
            template: (3 == f.length ? "dd:dd:dd" : 2 == f.length ? "dd:dd" : "dd") + (p ? '<span class="mbsc-np-sup">{ampm:--}</span>' : ""),
            leftKey: p ? {text: i, variable: "ampm:" + i, value: "00"} : {text: ":00", value: "00"},
            rightKey: p ? {text: o, variable: "ampm:" + o, value: "00"} : {text: ":30", value: "30"},
            parseValue: function (e) {
                var t, a, n = e || h.defaultValue, s = [];
                if (n) {
                    if (a = (n += "").match(/\d/g)) for (t = 0; t < a.length; t++) s.push(+a[t]);
                    p && s.push("ampm:" + (n.match(new RegExp(h.pmText, "gi")) ? o : i))
                }
                return s
            },
            formatValue: function (e, t) {
                return r(e, t)
            },
            validate: function (e) {
                var t = e.values, a = r(t, e.variables),
                    n = 3 <= t.length ? new Date(2014, 7, 20, "" + t[0] + (t.length % 2 == 0 ? t[1] : ""), "" + t[t.length % 2 == 0 ? 2 : 1] + t[t.length % 2 == 0 ? 3 : 2]) : "";
                return {
                    disabled: function (e) {
                        var t, a, n, s, i, o, r, l, c, m, d = [], u = 2 * f.length;
                        if (b = u, e.length || (p && (d.push(0), d.push(h.leftKey.value)), d.push(h.rightKey.value)), !p && (u - e.length < 2 || 1 != e[0] && (2 < e[0] || 3 < e[1]) && u - e.length <= 2) && (d.push("30"), d.push("00")), (p ? 1 < e[0] || 2 < e[1] : 1 != e[0] && (2 < e[0] || 3 < e[1])) && e[0] && (e.unshift(0), b = u - 1), e.length == u) for (t = 0; t <= 9; ++t) d.push(t); else if (1 == e.length && p && 1 == e[0] || e.length && e.length % 2 == 0 || !p && 2 == e[0] && 3 < e[1] && e.length % 2 == 1) for (t = 6; t <= 9; ++t) d.push(t);
                        if (c = void 0 !== e[1] ? "" + e[0] + e[1] : "", m = +T == +(void 0 !== e[3] ? "" + e[2] + e[3] : ""), h.invalid) for (t = 0; t < h.invalid.length; ++t) if (o = h.invalid[t].getHours(), r = h.invalid[t].getMinutes(), l = h.invalid[t].getSeconds(), o == +c) {
                            if (2 == f.length && (r < 10 ? 0 : +("" + r)[0]) == +e[2]) {
                                d.push(r < 10 ? r : +("" + r)[1]);
                                break
                            }
                            if ((l < 10 ? 0 : +("" + l)[0]) == +e[4]) {
                                d.push(l < 10 ? l : +("" + l)[1]);
                                break
                            }
                        }
                        if (h.min || h.max) {
                            if (i = (n = +g == +c) && m, s = (a = +v == +c) && m, 0 === e.length) {
                                for (t = p ? 2 : 19 < v ? v[0] : 3; t <= (1 == v[0] ? 9 : v[0] - 1); ++t) d.push(t);
                                if (10 <= v && (d.push(0), 2 == v[0])) for (t = 3; t <= 9; ++t) d.push(t);
                                if (g && g < 10 || v && 10 <= v) for (t = g && g < 10 ? +g[0] + 1 : 0; t < (v && 10 <= v ? v[0] : 10); ++t) d.push(t)
                            }
                            if (1 == e.length) {
                                if (0 === e[0]) for (t = 0; t < v[0]; ++t) d.push(t);
                                if (v && 0 !== e[0] && (p ? 1 == e[0] : 2 == e[0])) for (t = p ? 3 : 4; t <= 9; ++t) d.push(t);
                                if (e[0] == v[0]) for (t = 0; t < v[1]; ++t) d.push(t);
                                if (e[0] == g[0] && !p) for (t = +g[1] + 1; t <= 9; ++t) d.push(t)
                            }
                            if (2 == e.length && (a || n)) for (t = n ? +T[0] + 1 : 0; t < (a ? +x[0] : 10); ++t) d.push(t);
                            if (3 == e.length && (n && e[2] == T[0] || a && e[2] == x[0])) for (t = n && e[2] == T[0] ? +T[1] + 1 : 0; t < (a && e[2] == x[0] ? +x[1] : 10); ++t) d.push(t);
                            if (4 == e.length && (s || i)) for (t = i ? +_[0] + 1 : 0; t < (s ? +y[0] : 10); ++t) d.push(t);
                            if (5 == e.length && (s && e[4] == y[0] || i && e[4] == _[0])) for (t = i && e[4] == _[0] ? +_[1] + 1 : 0; t < (s && e[4] == y[0] ? +y[1] : 10); ++t) d.push(t)
                        }
                        return d
                    }(t),
                    length: b,
                    invalid: (p ? !new RegExp("^(0?[1-9]|1[012])(:[0-5]\\d)?(:[0-5][0-9]) (?:" + h.amText + "|" + h.pmText + ")$", "i").test(a) : !/^([0-1]?[0-9]|2[0-4]):([0-5][0-9])(:[0-5][0-9])?$/.test(a)) || !!h.invalid && -1 != s._indexOf(h.invalid, n) || !((!h.min || h.min <= n) && (!h.max || n <= h.max))
                }
            }
        }
    };
    var cn = {dateOrder: "mdy", dateFormat: "mm/dd/yy", delimiter: "/"};
    a("numpad", tn, !(an.date = function (n) {
        var f, p, b, e, i = [], t = ba({}, n.settings), v = ba(n.settings, re, cn, t), a = v.dateOrder,
            g = v.min ? "" + (v.getMonth(v.min) + 1) : 0, x = v.max ? "" + (v.getMonth(v.max) + 1) : 0,
            T = v.min ? "" + v.getDay(v.min) : 0, y = v.max ? "" + v.getDay(v.max) : 0,
            _ = v.min ? "" + v.getYear(v.min) : 0, w = v.max ? "" + v.getYear(v.max) : 0;
        for (a = (a = (a = a.replace(/y+/gi, "yyyy")).replace(/m+/gi, "mm")).replace(/d+/gi, "dd"), f = a.toUpperCase().indexOf("Y"), p = a.toUpperCase().indexOf("M"), b = a.toUpperCase().indexOf("D"), a = "", i.push({
            val: f,
            n: "yyyy"
        }, {val: p, n: "mm"}, {val: b, n: "dd"}), i.sort(function (e, t) {
            return e.val - t.val
        }), fa.each(i, function (e, t) {
            a += t.n
        }), f = a.indexOf("y"), p = a.indexOf("m"), b = a.indexOf("d"), a = "", e = 0; e < 8; ++e) a += "d", e + 1 != f && e + 1 != p && e + 1 != b || (a += v.delimiter);

        function s(e) {
            return new Date(+("" + e[f] + e[f + 1] + e[f + 2] + e[f + 3]), "" + e[p] + e[p + 1] - 1, +("" + e[b] + e[b + 1]))
        }

        return n.getVal = function (e) {
            return n._hasValue || e ? s(n.getArrayVal(e)) : null
        }, {
            placeholder: "-", fill: "ltr", allowLeadingZero: !0, template: a, parseValue: function (e) {
                var t, a = [], n = e || v.defaultValue, s = se(v.dateFormat, n, v);
                if (n) for (t = 0; t < i.length; ++t) a = /m/i.test(i[t].n) ? a.concat(((v.getMonth(s) < 9 ? "0" : "") + (v.getMonth(s) + 1)).split("")) : /d/i.test(i[t].n) ? a.concat(((v.getDay(s) < 10 ? "0" : "") + v.getDay(s)).split("")) : a.concat((v.getYear(s) + "").split(""));
                return a
            }, formatValue: function (e) {
                return ne(v.dateFormat, s(e), v)
            }, validate: function (e) {
                var t = e.values, a = s(t);
                return {
                    disabled: function (e) {
                        var t, a, n, s, i, o, r = [],
                            l = void 0 !== e[f + 3] ? "" + e[f] + e[f + 1] + e[f + 2] + e[f + 3] : "",
                            c = void 0 !== e[p + 1] ? "" + e[p] + e[p + 1] : "",
                            m = void 0 !== e[b + 1] ? "" + e[b] + e[b + 1] : "",
                            d = "" + v.getMaxDayOfMonth(l || 2012, c - 1 || 0), u = _ === l && +g == +c,
                            h = w === l && +x == +c;
                        if (v.invalid) for (t = 0; t < v.invalid.length; ++t) {
                            if (n = v.getYear(v.invalid[t]), s = v.getMonth(v.invalid[t]), i = v.getDay(v.invalid[t]), n == +l && s + 1 == +c && (i < 10 ? 0 : +("" + i)[0]) == +e[b]) {
                                r.push(i < 10 ? i : +("" + i)[1]);
                                break
                            }
                            if (s + 1 == +c && i == +m && ("" + n).substring(0, 3) == "" + e[f] + e[f + 1] + e[f + 2]) {
                                r.push(("" + n)[3]);
                                break
                            }
                            if (n == +l && i == +m && (s < 10 ? 0 : +("" + (s + 1))[0]) == +e[p]) {
                                r.push(s < 10 ? s : +("" + (s + 1))[1]);
                                break
                            }
                        }
                        if ("31" != m || e.length != p && e.length != p + 1 || (1 != e[p] ? r.push(2, 4, 6, 9, 11) : r.push(1)), "30" == m && 0 === e[p] && e.length <= p + 1 && r.push(2), e.length == p) {
                            for (t = w === l && +x < 10 ? 1 : 2; t <= 9; ++t) r.push(t);
                            _ === l && 10 <= +g && r.push(0)
                        }
                        if (e.length == p + 1) {
                            if (1 == e[p]) {
                                for (t = w === l ? +x[1] + 1 : 3; t <= 9; ++t) r.push(t);
                                if (_ == l) for (t = 0; t < +g[1]; ++t) r.push(t)
                            }
                            if (0 === e[p] && (r.push(0), w === l || _ === l)) for (t = w === l ? +y < +m ? +x : +x + 1 : 0; t <= (_ === l ? g - 1 : 9); ++t) r.push(t)
                        }
                        if (e.length == b) {
                            for (t = h ? 1 + (10 < +y ? +y[0] : 0) : +d[0] + 1; t <= 9; ++t) r.push(t);
                            if (u) for (t = 0; t < (+T < 10 ? 0 : T[0]); ++t) r.push(t)
                        }
                        if (e.length == b + 1) {
                            if (3 <= e[b] || "02" == c) for (t = +d[1] + 1; t <= 9; ++t) r.push(t);
                            if (h && +y[0] == e[b]) for (t = +y[1] + 1; t <= 9; ++t) r.push(t);
                            if (u && T[0] == e[b]) for (t = 0; t < +T[1]; ++t) r.push(t);
                            if (0 === e[b] && (r.push(0), h || u)) for (t = h ? +y + 1 : 1; t <= (u ? T - 1 : 9); ++t) r.push(t)
                        }
                        if (void 0 !== e[f + 2] && "02" == c && "29" == m) for (a = +("" + e[f] + e[f + 1] + e[f + 2] + 0); a <= +("" + e[f] + e[f + 1] + e[f + 2] + 9); ++a) r.push((o = a) % 4 == 0 && o % 100 != 0 || o % 400 == 0 ? "" : a % 10);
                        if (e.length == f) {
                            if (v.min) for (t = 0; t < +_[0]; ++t) r.push(t);
                            if (v.max) for (t = +w[0] + 1; t <= 9; ++t) r.push(t);
                            r.push(0)
                        }
                        if (v.min || v.max) for (a = 1; a < 4; ++a) if (e.length == f + a) {
                            if (e[f + a - 1] == +_[a - 1] && (3 != a || e[f + a - 2] == +_[a - 2])) for (t = 0; t < +_[a] + (3 == a && e[p + 1] && +c < +g ? 1 : 0); ++t) r.push(t);
                            if (e[f + a - 1] == +w[a - 1] && (3 != a || e[f + a - 2] == +w[a - 2])) for (t = +w[a] + (3 == a && +x < +c ? 0 : 1); t <= 9; ++t) r.push(t)
                        }
                        return r
                    }(t),
                    invalid: !("Invalid Date" != a && (!v.min || v.min <= a) && (!v.max || a <= v.max)) || !!v.invalid && -1 != n._indexOf(v.invalid, a)
                }
            }
        }
    }));
    var mn = {autoCorrect: !0, showSelector: !0, minRange: 1, rangeTap: !0};
    Ne.range = function (l) {
        function a(e, t) {
            e && (e.setFullYear(t.getFullYear()), e.setMonth(t.getMonth()), e.setDate(t.getDate()))
        }

        function n(e, t) {
            var a = l._order, n = new Date(e);
            return void 0 === a.h && n.setHours(t ? 23 : 0), void 0 === a.i && n.setMinutes(t ? 59 : 0), void 0 === a.s && n.setSeconds(t ? 59 : 0), n.setMilliseconds(t ? 999 : 0), n
        }

        function t(e, t) {
            return new Date(e.getFullYear(), e.getMonth(), e.getDate() + t)
        }

        function s(e) {
            p ? (_ - T > V.maxRange - 1 && (e ? T = new Date(Math.max(g, _ - V.maxRange + 1)) : _ = new Date(Math.min(v, +T + V.maxRange - 1))), _ - T < V.minRange - 1 && (e ? T = new Date(Math.max(g, _ - V.minRange + 1)) : _ = new Date(Math.min(v, +T + V.minRange - 1)))) : (Math.ceil((_ - T) / F) > H && (e ? T = n(Math.max(g, t(_, 1 - H)), !1) : _ = n(Math.min(v, t(T, H - 1)), !0)), Math.ceil((_ - T) / F) < I && (e ? T = n(Math.max(g, t(_, 1 - I)), !1) : _ = n(Math.min(v, t(T, I - 1)), !0)))
        }

        function i(e, t) {
            var a = !0;
            return e && T && _ && (s(D), s(!D)), T && _ || (a = !1), t && r(), a
        }

        function o() {
            M && u && (fa(".mbsc-range-btn", u).removeClass($).removeAttr("aria-checked"), function (e) {
                e.addClass($).attr("aria-checked", "true")
            }(fa(".mbsc-range-btn", u).eq(D)))
        }

        function r() {
            var e, t, a, n, s, i = 0, o = E || !D ? " mbsc-cal-day-hl mbsc-cal-sel-start" : " mbsc-cal-sel-start",
                r = E || D ? " mbsc-cal-day-hl mbsc-cal-sel-end" : " mbsc-cal-sel-end";
            if (l.startVal = T ? ne(f, T, V) : "", l.endVal = _ ? ne(f, _, V) : "", u && (fa(".mbsc-range-btn-v-start", u).html(l.startVal || "&nbsp;"), fa(".mbsc-range-btn-v-end", u).html(l.endVal || "&nbsp;"), e = T ? new Date(T) : null, a = _ ? new Date(_) : null, !e && a && (e = new Date(a)), !a && e && (a = new Date(e)), s = D ? a : e, fa(".mbsc-cal-day-picker .mbsc-cal-day-hl", u).removeClass(L), fa(".mbsc-cal-day-picker .mbsc-selected", u).removeClass("mbsc-cal-sel-start mbsc-cal-sel-end " + $).removeAttr("aria-selected"), e && a)) for (t = e.setHours(0, 0, 0, 0), n = a.setHours(0, 0, 0, 0); e <= a && i < 126;) fa('.mbsc-cal-day[data-full="' + s.getFullYear() + "-" + (s.getMonth() + 1) + "-" + s.getDate() + '"]', u).addClass($ + " " + (s.getTime() === t ? o : "") + (s.getTime() === n ? r : "")).attr("aria-selected", "true"), s.setDate(s.getDate() + (D ? -1 : 1)), s.setHours(0, 0, 0, 0), i++
        }

        function c(e, t) {
            return {
                h: e ? e.getHours() : t ? 23 : 0,
                i: e ? e.getMinutes() : t ? 59 : 0,
                s: e ? e.getSeconds() : t ? 59 : 0
            }
        }

        function m() {
            T && (b = !0, l.setDate(T, !1, 0, !0), T = l.getDate(!0)), _ && (b = !0, l.setDate(_, !1, 0, !0), _ = l.getDate(!0))
        }

        var d, u, h, f, p, b, v, g, x, T, y, _, w, C, M, S = l._startDate, k = l._endDate, D = 0, e = new Date,
            N = ba({}, l.settings), V = ba(l.settings, mn, N), A = V.anchor, E = V.rangeTap, F = 864e5,
            I = Math.max(1, Math.ceil(V.minRange / F)), H = Math.max(1, Math.ceil(V.maxRange / F)),
            P = "mbsc-disabled " + (V.disabledClass || ""), $ = "mbsc-selected " + (V.selectedClass || ""),
            L = "mbsc-cal-day-hl",
            O = null === V.defaultValue ? [] : V.defaultValue || [new Date(e.setHours(0, 0, 0, 0)), new Date(e.getFullYear(), e.getMonth(), e.getDate() + 6, 23, 59, 59, 999)];
        return E && (V.tabs = !0), d = Ie.call(this, l), f = l._format, p = /time/i.test(V.controls.join(",")), C = "time" === V.controls.join(""), M = V.showSelector, v = V.max ? n(ot(V.max, f, V), !0) : 1 / 0, g = V.min ? n(ot(V.min, f, V), !1) : -1 / 0, O[0] = ot(O[0], f, V, V.isoParts), O[1] = ot(O[1], f, V, V.isoParts), V.startInput && l.attachShow(fa(V.startInput), function () {
            D = 0, V.anchor = A || fa(V.startInput)
        }), V.endInput && l.attachShow(fa(V.endInput), function () {
            D = 1, V.anchor = A || fa(V.endInput)
        }), l._getDayProps = function (e, t) {
            var a = T ? new Date(T.getFullYear(), T.getMonth(), T.getDate()) : null,
                n = _ ? new Date(_.getFullYear(), _.getMonth(), _.getDate()) : null;
            return {
                selected: a && n && a <= e && e <= _,
                cssClass: t.cssClass + " " + ((E || !D) && a && a.getTime() === e.getTime() || (E || D) && n && n.getTime() === e.getTime() ? L : "") + (a && a.getTime() === e.getTime() ? " mbsc-cal-sel-start" : "") + (n && n.getTime() === e.getTime() ? " mbsc-cal-sel-end" : "")
            }
        }, l.setVal = function (e, t, a, n, s) {
            var i, o = e || [];
            T = ot(o[0], f, V, V.isoParts), _ = ot(o[1], f, V, V.isoParts), m(), l.startVal = T ? ne(f, T, V) : "", l.endVal = _ ? ne(f, _, V) : "", i = d.parseValue(D ? _ : T, l), n || (l._startDate = S = T, l._endDate = k = _), x = !0, l._setVal(i, t, a, n, s)
        }, l.getVal = function (e) {
            return e ? [ie(T, V, f), ie(_, V, f)] : l._hasValue ? [ie(S, V, f), ie(k, V, f)] : null
        }, l.setActiveDate = function (e) {
            var t;
            D = "start" == e ? 0 : 1, t = "start" == e ? T : _, l.isVisible() && (o(), E || (fa(".mbsc-cal-table .mbsc-cal-day-hl", u).removeClass(L), t && fa('.mbsc-cal-day[data-full="' + t.getFullYear() + "-" + (t.getMonth() + 1) + "-" + t.getDate() + '"]', u).addClass(L)), t && (b = !0, l.setDate(t, !1, 1e3, !0)))
        }, l.getValue = l.getVal, ba({}, d, {
            highlight: !1, outerMonthChange: !1, formatValue: function () {
                return l.startVal + (V.endInput ? "" : l.endVal ? " - " + l.endVal : "")
            }, parseValue: function (e) {
                var t = e ? e.split(" - ") : [], a = V.startInput ? fa(V.startInput).val() : t[0],
                    n = V.endInput ? fa(V.endInput).val() : t[1];
                return V.defaultValue = O[1], k = n ? se(f, n, V) : O[1], V.defaultValue = O[0], S = a ? se(f, a, V) : O[2], V.defaultValue = O[D], l.startVal = S ? ne(f, S, V) : "", l.endVal = k ? ne(f, k, V) : "", l._startDate = S, l._endDate = k, d.parseValue(D ? k : S, l)
            }, onFill: function (e) {
                !function (e) {
                    l._startDate = S = T, l._endDate = k = _, V.startInput && (fa(V.startInput).val(l.startVal), e && fa(V.startInput).trigger("change")), V.endInput && (fa(V.endInput).val(l.endVal), e && fa(V.endInput).trigger("change"))
                }(e.change)
            }, onBeforeClose: function (e) {
                if ("set" === e.button && !i(!0, !0)) return l.setActiveDate(D ? "start" : "end"), !1
            }, onHide: function () {
                d.onHide.call(l), D = 0, u = null, V.anchor = A
            }, onClear: function () {
                E && (D = 0)
            }, onBeforeShow: function () {
                T = S || O[0], _ = k || O[1], y = c(T, 0), w = c(_, 1), V.counter && (V.headerText = function () {
                    var e = T && _ ? Math.max(1, Math.round((new Date(_).setHours(0, 0, 0, 0) - new Date(T).setHours(0, 0, 0, 0)) / 864e5) + 1) : 0;
                    return (1 < e && V.selectedPluralText || V.selectedText).replace(/{count}/, e)
                }), x = !0
            }, onMarkupReady: function (e) {
                var t;
                m(), (D && _ || !D && T) && (b = !0, l.setDate(D ? _ : T, !1, 0, !0)), r(), d.onMarkupReady.call(this, e), (u = fa(e.target)).addClass("mbsc-range"), M && (t = '<div class="mbsc-range-btn-t" role="radiogroup"><div class="mbsc-range-btn-c mbsc-range-btn-start"><div role="radio" data-select="start" class="mbsc-fr-btn-e mbsc-fr-btn-nhl mbsc-range-btn">' + V.fromText + '<div class="mbsc-range-btn-v mbsc-range-btn-v-start">' + (l.startVal || "&nbsp;") + '</div></div></div><div class="mbsc-range-btn-c mbsc-range-btn-end"><div role="radio" data-select="end" class="mbsc-fr-btn-e mbsc-fr-btn-nhl mbsc-range-btn">' + V.toText + '<div class="mbsc-range-btn-v mbsc-range-btn-v-end">' + (l.endVal || "&nbsp;") + "</div></div></div></div>", V.headerText ? fa(".mbsc-fr-hdr", u).after(t) : fa(".mbsc-fr-w", u).prepend(t), o()), fa(".mbsc-range-btn", u).on("touchstart click", function (e) {
                    ga(e, this) && (l._showDayPicker(), l.setActiveDate(fa(this).attr("data-select")))
                })
            }, onDayChange: function (e) {
                e.active = D ? "end" : "start", h = !0
            }, onSetDate: function (e) {
                var t;
                b || (t = n(e.date, D), x && !h || (E && h && (1 == D && t < T && (D = 0), D ? t.setHours(w.h, w.i, w.s, 999) : t.setHours(y.h, y.i, y.s, 0)), D ? (_ = new Date(t), w = c(_)) : (T = new Date(t), y = c(T)), C && V.autoCorrect && (a(T, t), a(_, t)), E && h && !D && (_ = null))), C && !V.autoCorrect && _ < T && (_ = new Date(_.setDate(_.getDate() + 1))), l._isValid = i(x || h || V.autoCorrect, !b), e.active = D ? "end" : "start", !b && E && (h && (D = D ? 0 : 1), o()), l.isVisible() && (l._isValid ? fa(".mbsc-fr-btn-s .mbsc-fr-btn", l._markup).removeClass(P) : fa(".mbsc-fr-btn-s .mbsc-fr-btn", l._markup).addClass(P)), b = x = h = !1
            }, onTabChange: function (e) {
                "calendar" != e.tab && l.setDate(D ? _ : T, !1, 1e3, !0), i(!0, !0)
            }
        })
    }, a("range", Fe), a("scroller", Fe, !1), a("scrollview", Ga, !1);
    var dn = {
        inputClass: "",
        rtl: !1,
        showInput: !0,
        groupLabel: "Groups",
        dataHtml: "html",
        dataText: "text",
        dataValue: "value",
        dataGroup: "group",
        dataDisabled: "disabled",
        filterPlaceholderText: "Type to filter",
        filterEmptyText: "No results",
        filterClearIcon: "material-close"
    };
    Ne.select = function (r, e) {
        var l, h, c, m, a, f, n, p, d, u, s, b, i, v, o, t = "", g = {}, x = 1e3, T = this, y = fa(T),
            _ = ba({}, r.settings), w = ba(r.settings, dn, _),
            C = fa('<div class="mbsc-sel-empty">' + w.filterEmptyText + "</div>"), M = w.readonly, S = {},
            k = w.layout || (/top|bottom|inline/.test(w.display) || w.filter ? "liquid" : ""),
            D = "liquid" == k || !w.touchUi, N = ra(w.select) ? w.select : "multiple" == w.select || y.prop("multiple"),
            V = N || !(!w.filter && !w.tapSelect) && 1, A = this.id + "_dummy",
            E = fa('label[for="' + this.id + '"]').attr("for", A),
            F = void 0 !== w.label ? w.label : E.length ? E.text() : y.attr("name"), I = w.group, H = !!w.data,
            P = H ? !!w.group : fa("optgroup", y).length, $ = P && I && !1 !== I.groupWheel,
            L = P && I && $ && !0 === I.clustered, O = P && (!I || !1 !== I.header && !L),
            Y = y.val() || (N ? [] : [""]), z = [];

        function R(a) {
            var n, s, i, o, r, l, c = 0, m = 0, d = {};
            if (S = {}, p = {}, b = [], f = [], z.length = 0, H) fa.each(h, function (e, t) {
                r = t[w.dataText] + "", s = t[w.dataHtml], l = t[w.dataValue], i = t[w.dataGroup], o = {
                    value: l,
                    html: s,
                    text: r,
                    index: e,
                    cssClass: O ? "mbsc-sel-gr-itm" : ""
                }, S[l] = o, a && !G(r, a) || (b.push(o), P && (void 0 === d[i] ? (n = {
                    text: i,
                    value: m,
                    options: [],
                    index: m
                }, p[m] = n, d[i] = m, f.push(n), m++) : n = p[d[i]], L && (o.index = n.options.length), o.group = d[i], n.options.push(o)), t[w.dataDisabled] && z.push(l))
            }); else if (P) {
                var u = !0;
                fa("optgroup", y).each(function (t) {
                    p[t] = {
                        text: this.label,
                        value: t,
                        options: [],
                        index: t
                    }, u = !0, fa("option", this).each(function (e) {
                        o = {
                            value: this.value,
                            text: this.text,
                            index: L ? e : c++,
                            group: t,
                            cssClass: O ? "mbsc-sel-gr-itm" : ""
                        }, S[this.value] = o, a && !G(this.text, a) || (u && (f.push(p[t]), u = !1), b.push(o), p[t].options.push(o), this.disabled && z.push(this.value))
                    })
                })
            } else fa("option", y).each(function (e) {
                o = {
                    value: this.value,
                    text: this.text,
                    index: e
                }, S[this.value] = o, a && !G(this.text, a) || (b.push(o), this.disabled && z.push(this.value))
            });
            t = w.defaultValue ? w.defaultValue : b.length ? b[0].value : "", O && (b = [], c = 0, fa.each(p, function (e, t) {
                t.options.length && (l = "__group" + e, o = {
                    text: t.text,
                    value: l,
                    group: e,
                    index: c++,
                    cssClass: "mbsc-sel-gr"
                }, S[l] = o, b.push(o), z.push(o.value), fa.each(t.options, function (e, t) {
                    t.index = c++, b.push(t)
                }))
            })), C && (b.length ? C.removeClass("mbsc-sel-empty-v") : C.addClass("mbsc-sel-empty-v"))
        }

        function W(e, t, a, n, s) {
            var i, o = [];
            for (i = 0; i < e.length; i++) o.push({
                value: e[i].value,
                display: e[i].html || e[i].text,
                cssClass: e[i].cssClass
            });
            return {
                circular: !1,
                multiple: t && !n ? 1 : n,
                cssClass: (t && !n ? "mbsc-sel-one" : "") + " " + s,
                data: o,
                label: a
            }
        }

        function j() {
            return W(L && p[a] ? p[a].options : b, V, F, N, "")
        }

        function J() {
            var e = [[]];
            return $ && (n = W(f, V, w.groupLabel, !1, "mbsc-sel-gr-whl"), D ? e[0][d] = n : e[d] = [n]), i = j(), D ? e[0][v] = i : e[v] = [i], e
        }

        function U(e) {
            N && (e && de(e) && (e = e.split(",")), fa.isArray(e) && (e = e[0])), !S[s = null == e || "" === e ? t : e] && b && b.length && (s = b[0].value), $ && (a = S[s] ? S[s].group : null)
        }

        function B(e) {
            return g[e] || (S[e] ? S[e].text : "")
        }

        function q() {
            var e, t = "", a = r.getVal(), n = w.formatValue.call(T, r.getArrayVal(), r, !0);
            if (w.filter && "inline" == w.display || l.val(n), y.is("select") && H) {
                if (N) for (e = 0; e < a.length; e++) t += '<option value="' + a[e] + '">' + B(a[e]) + "</option>"; else t = '<option value="' + (null === a ? "" : a) + '">' + n + "</option>";
                y.html(t)
            }
            T !== l[0] && y.val(a)
        }

        function K() {
            var e = {};
            e[v] = j(), o = !0, r.changeWheel(e)
        }

        function G(e, t) {
            return t = t.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&"), e.match(new RegExp(t, "ig"))
        }

        function X(e) {
            return w.data.dataField ? e[w.data.dataField] : w.data.processResponse ? w.data.processResponse(e) : e
        }

        function Z(e) {
            var t = {};
            R(e), U(s), w.wheels = J(), t[v] = i, r._tempWheelArray[v] = s, $ && (t[d] = n, r._tempWheelArray[d] = a), r.changeWheel(t, 0, !0), q()
        }

        function Q(e) {
            return r.trigger("onFilter", {filterText: e})
        }

        function ee(e) {
            e[d] != a && (a = e[d], s = p[a].options[0].value, e[v] = s, L ? K() : r.setArrayVal(e, !1, !1, !0, x))
        }

        return r.setVal = function (e, t, a, n, s) {
            if (V && (null == e || N || (e = [e]), e && de(e) && (e = e.split(",")), r._tempSelected[v] = ae(e), n || (r._selected[v] = ae(e)), e = e ? e[0] : null, $)) {
                var i = S[e], o = i && i.group;
                r._tempSelected[d] = ae([o]), n || (r._selected[d] = ae([o]))
            }
            r._setVal(e, t, a, n, s)
        }, r.getVal = function (e, t) {
            var a;
            return a = V ? (a = te(e ? r._tempSelected[v] : r._selected[v]), N ? a : a.length ? a[0] : null) : (a = e ? r._tempWheelArray : r._hasValue ? r._wheelArray : null) ? a[v] : null, N ? a : void 0 !== a ? P && t ? [S[a] ? S[a].group : null, a] : a : null
        }, r.refresh = function (e, t, a) {
            a = a || oa, e ? (h = e, u || (w.data = e)) : fa.isArray(w.data) && (h = w.data), !e && u && void 0 === t ? Ut(w.data.url, function (e) {
                h = X(e), Z(), a()
            }, w.data.dataType) : (Z(t), a())
        }, e.invalid || (w.invalid = z), v = $ ? (d = 0, 1) : (d = -1, 0), V && (N && y.prop("multiple", !0), Y && de(Y) && (Y = Y.split(",")), r._selected[v] = ae(Y)), r._$input && r._$input.remove(), y.next().is(".mbsc-select-input") ? l = y.next().removeAttr("tabindex") : w.input ? l = fa(w.input) : (w.filter && "inline" == w.display ? r._$input = fa('<div class="mbsc-sel-input-wrap"><input type="text" id="' + A + '" class="mbsc-select-input mbsc-control ' + w.inputClass + '" readonly /></div>') : (l = fa('<input type="text" id="' + A + '" class="mbsc-select-input mbsc-control ' + w.inputClass + '" readonly />'), r._$input = l), w.showInput && (r._$input.insertAfter(y), l = l || r._$input.find("#" + A))), r.attachShow(l.attr("placeholder", w.placeholder || "")), l[0] !== T && (y.addClass("mbsc-sel-hdn").attr("tabindex", -1), w.showInput || y.attr("data-enhance", !1)), !V || w.rows % 2 || (w.rows = w.rows - 1), w.filter && (c = w.filter.minLength || 0), (u = w.data && w.data.url) ? r.refresh() : (H && (h = w.data), R(), U(y.val())), {
            layout: k,
            headerText: !1,
            anchor: l,
            compClass: "mbsc-sc mbsc-sel" + (V ? " mbsc-sel-multi" : ""),
            setOnTap: !$ || [!1, !0],
            formatValue: function (e, t, a) {
                var n, s = [], i = a ? t._selected : t._tempSelected;
                if (V) {
                    for (n in i[v]) s.push(B(n));
                    return s.join(", ")
                }
                return B(e[v])
            },
            tapSelect: V,
            parseValue: function (e) {
                return U(void 0 === e ? y.val() : e), $ ? [a, s] : [s]
            },
            validate: function (e) {
                var t = e.index, a = [];
                return a[v] = w.invalid, L && !o && void 0 === t && K(), o = !1, {disabled: a}
            },
            onRead: q,
            onFill: q,
            onMarkupReady: function (e, t) {
                if (w.filter) {
                    var a, n, s, i = fa(".mbsc-fr-w", e.target),
                        o = fa('<span class="mbsc-sel-filter-clear mbsc-ic mbsc-ic-' + w.filterClearIcon + '"></span>');
                    "inline" == w.display ? (a = l).parent().find(".mbsc-sel-filter-clear").remove() : (i.find(".mbsc-fr-c").before('<div class="mbsc-input mbsc-sel-filter-cont mbsc-control-w mbsc-' + w.theme + (w.baseTheme ? " mbsc-" + w.baseTheme : "") + '"><span class="mbsc-input-wrap"><input tabindex="0" type="text" class="mbsc-sel-filter-input mbsc-control"/></span></div>'), a = i.find(".mbsc-sel-filter-input")), m = null, s = a[0], a.prop("readonly", !1).attr("placeholder", w.filterPlaceholderText).parent().append(o), i.find(".mbsc-fr-c").prepend(C), t._activeElm = s, t.tap(o, function () {
                        m = null, s.value = "", t.refresh(), o.removeClass("mbsc-sel-filter-show-clear"), Q("")
                    }), a.on("keydown", function (e) {
                        13 != e.keyCode && 27 != e.keyCode || (e.stopPropagation(), s.blur())
                    }).on("input", function () {
                        clearTimeout(n), s.value.length ? o.addClass("mbsc-sel-filter-show-clear") : o.removeClass("mbsc-sel-filter-show-clear"), n = setTimeout(function () {
                            m !== s.value && !1 !== Q(s.value) && ((m = s.value).length >= c || !m.length) && (u && w.data.remoteFilter ? Ut(w.data.url + encodeURIComponent(m), function (e) {
                                t.refresh(X(e))
                            }, w.data.dataType) : t.refresh(void 0, m))
                        }, 500)
                    })
                }
            },
            onBeforeShow: function () {
                N && w.counter && (w.headerText = function () {
                    var e = 0;
                    return fa.each(r._tempSelected[v], function () {
                        e++
                    }), (1 < e && w.selectedPluralText || w.selectedText).replace(/{count}/, e)
                }), U(y.val()), V && $ && (r._selected[d] = ae([a])), w.filter && R(void 0), r.settings.wheels = J(), o = !0
            },
            onWheelGestureStart: function (e) {
                e.index == d && (w.readonly = [!1, !0])
            },
            onWheelAnimationEnd: function (e) {
                var t = r.getArrayVal(!0);
                e.index == d ? (w.readonly = M, V || ee(t)) : e.index == v && t[v] != s && (s = t[v], $ && S[s] && S[s].group != a && (a = S[s].group, t[d] = a, r._tempSelected[d] = ae([a]), r.setArrayVal(t, !1, !1, !0, x)))
            },
            onItemTap: function (e) {
                var t;
                if (e.index == v && (g[e.value] = S[e.value].text, V && !N && e.selected)) return !1;
                if (e.index == d && V) {
                    if (e.selected) return !1;
                    (t = r.getArrayVal(!0))[d] = e.value, ee(t)
                }
            },
            onClose: function () {
                u && w.data.remoteFilter && m && r.refresh()
            },
            onDestroy: function () {
                r._$input && r._$input.remove(), y.removeClass("mbsc-sel-hdn").removeAttr("tabindex")
            }
        }
    }, a("select", Fe);
    var un = {
        autostart: !1,
        step: 1,
        useShortLabels: !1,
        labels: ["Years", "Months", "Days", "Hours", "Minutes", "Seconds", ""],
        labelsShort: ["Yrs", "Mths", "Days", "Hrs", "Mins", "Secs", ""],
        startText: "Start",
        stopText: "Stop",
        resetText: "Reset",
        lapText: "Lap",
        hideText: "Hide",
        mode: "countdown"
    };
    Ne.timer = function (a) {
        function c(e) {
            return new Date(e.getUTCFullYear(), e.getUTCMonth(), e.getUTCDate(), e.getUTCHours(), e.getUTCMinutes(), e.getUTCSeconds(), e.getUTCMilliseconds())
        }

        function r(e, t, a) {
            return (t || "") + (e < 10 ? "0" : "") + e + '<span class="mbsc-timer-lbl">' + a + "</span>"
        }

        function n(e) {
            var a, n = [], s = function (a) {
                var n = {};
                if (F && _[V].index > _.days.index) {
                    var e, t, s, i, o = new Date, r = f ? o : E, l = f ? E : o;
                    for (l = c(l), r = c(r), n.years = r.getFullYear() - l.getFullYear(), n.months = r.getMonth() - l.getMonth(), n.days = r.getDate() - l.getDate(), n.hours = r.getHours() - l.getHours(), n.minutes = r.getMinutes() - l.getMinutes(), n.seconds = r.getSeconds() - l.getSeconds(), n.fract = (r.getMilliseconds() - l.getMilliseconds()) / 10, e = y.length; 0 < e; e--) t = y[e - 1], s = _[t], i = y[fa.inArray(t, y) - 1], _[i] && n[t] < 0 && (n[i]--, n[t] += "months" == i ? 32 - new Date(r.getFullYear(), r.getMonth(), 32).getDate() : s.until + 1);
                    "months" == V && (n.months += 12 * n.years, delete n.years)
                } else fa(y).each(function (e, t) {
                    _[t].index <= _[V].index && (n[t] = Math.floor(a / _[t].limit), a -= n[t] * _[t].limit)
                });
                return n
            }(e);
            return fa(y).each(function (e, t) {
                w[t] && (a = Math.max(Math.round(N / _[t].limit), 1), n.push(Math.round(s[t] / a) * a))
            }), n
        }

        function s(e) {
            F ? (u = E - new Date, f = u < 0 && (u *= -1, !0), D = !(h = 0)) : (void 0 !== E ? (D = !1, u = 1e3 * E, f = "countdown" != g.mode) : (u = 0, f = "countdown" != g.mode, D = f), e && (h = 0))
        }

        function t() {
            S ? (fa(".mbsc-fr-w", p).addClass("mbsc-timer-running mbsc-timer-locked"), fa(".mbsc-timer-btn-toggle-c > div", p).text(g.stopText), a.buttons.start.icon && fa(".mbsc-timer-btn-toggle-c > div", p).removeClass("mbsc-ic-" + a.buttons.start.icon), a.buttons.stop.icon && fa(".mbsc-timer-btn-toggle-c > div", p).addClass("mbsc-ic-" + a.buttons.stop.icon), "stopwatch" == g.mode && (fa(".mbsc-timer-btn-resetlap-c > div", p).text(g.lapText), a.buttons.reset.icon && fa(".mbsc-timer-btn-resetlap-c > div", p).removeClass("mbsc-ic-" + a.buttons.reset.icon), a.buttons.lap.icon && fa(".mbsc-timer-btn-resetlap-c > div", p).addClass("mbsc-ic-" + a.buttons.lap.icon))) : (fa(".mbsc-fr-w", p).removeClass("mbsc-timer-running"), fa(".mbsc-timer-btn-toggle-c > div", p).text(g.startText), a.buttons.start.icon && fa(".mbsc-timer-btn-toggle-c > div", p).addClass("mbsc-ic-" + a.buttons.start.icon), a.buttons.stop.icon && fa(".mbsc-timer-btn-toggle-c > div", p).removeClass("mbsc-ic-" + a.buttons.stop.icon), "stopwatch" == g.mode && (fa(".mbsc-timer-btn-resetlap-c > div", p).text(g.resetText), a.buttons.reset.icon && fa(".mbsc-timer-btn-resetlap-c > div", p).addClass("mbsc-ic-" + a.buttons.reset.icon), a.buttons.lap.icon && fa(".mbsc-timer-btn-resetlap-c > div", p).removeClass("mbsc-ic-" + a.buttons.lap.icon)))
        }

        var l, e, m, i, o, d, u, h, f, p, b, v = ba({}, a.settings), g = ba(a.settings, un, v),
            x = g.useShortLabels ? g.labelsShort : g.labels, T = ["resetlap", "toggle"],
            y = ["years", "months", "days", "hours", "minutes", "seconds", "fract"], _ = {
                years: {index: 6, until: 10, limit: 31536e6, label: x[0], wheel: {}},
                months: {index: 5, until: 11, limit: 2592e6, label: x[1], wheel: {}},
                days: {index: 4, until: 31, limit: 864e5, label: x[2], wheel: {}},
                hours: {index: 3, until: 23, limit: 36e5, label: x[3], wheel: {}},
                minutes: {index: 2, until: 59, limit: 6e4, label: x[4], wheel: {}},
                seconds: {index: 1, until: 59, limit: 1e3, label: x[5], wheel: {}},
                fract: {index: 0, until: 99, limit: 10, label: x[6], prefix: ".", wheel: {}}
            }, w = {}, C = [], M = 0, S = !1, k = !0, D = !1, N = Math.max(10, 1e3 * g.step), V = g.maxWheel,
            A = "stopwatch" == g.mode || F, E = g.targetTime, F = E && void 0 !== E.getTime, I = [[]];
        return a.start = function () {
            if (k && a.reset(), !S) {
                if (s(), !D && u <= h) return;
                k = !(S = !0), o = new Date, i = h, g.readonly = !0, a.setVal(n(f ? h : u - h), !0, !0, !1, 100), e = setInterval(function () {
                    h = new Date - o + i, a.setVal(n(f ? h : u - h), !0, !0, !1, Math.min(100, m - 10)), !D && u <= h + m && (clearInterval(e), setTimeout(function () {
                        a.stop(), h = u, a.setVal(n(f ? h : 0), !0, !0, !1, 100), a.trigger("onFinish", {time: u}), k = !0
                    }, u - h))
                }, m), t(), a.trigger("onStart")
            }
        }, a.stop = function () {
            S && (S = !1, clearInterval(e), h = new Date - o + i, t(), a.trigger("onStop", {ellapsed: h}))
        }, a.toggle = function () {
            S ? a.stop() : a.start()
        }, a.reset = function () {
            a.stop(), C = [], M = h = 0, a.setVal(n(f ? 0 : u), !0, !0, !1, 1e3), a.settings.readonly = A, k = !0, A || fa(".mbsc-fr-w", p).removeClass("mbsc-timer-locked"), a.trigger("onReset")
        }, a.lap = function () {
            S && (d = new Date - o + i, b = d - M, M = d, C.push(d), a.trigger("onLap", {ellapsed: d, lap: b, laps: C}))
        }, a.resetlap = function () {
            S && "stopwatch" == g.mode ? a.lap() : a.reset()
        }, a.getTime = function () {
            return u
        }, a.setTime = function (e) {
            E = e / 1e3, u = e
        }, a.getEllapsedTime = function () {
            return k ? 0 : S ? new Date - o + i : h
        }, a.setEllapsedTime = function (e, t) {
            k || (i = h = e, o = new Date, a.setVal(n(f ? h : u - h), !0, t, !1, 1e3))
        }, s(!0), V || u || (V = "minutes"), "inline" !== g.display && T.unshift("hide"), V || fa(y).each(function (e, t) {
            if (!V && u >= _[t].limit) return V = t, !1
        }), fa(y).each(function (e, t) {
            !function (e) {
                var t = 1, a = _[e], n = a.wheel, s = a.prefix, i = a.until, o = _[y[fa.inArray(e, y) - 1]];
                if (a.index <= _[V].index && (!o || o.limit > N)) if (w[e] || I[0].push(n), w[e] = 1, n.data = [], n.label = a.label || "", n.cssClass = "mbsc-timer-whl-" + e, N >= a.limit && (t = Math.max(Math.round(N / a.limit), 1), m = t * a.limit), e == V) n.min = 0, n.data = function (e) {
                    return {value: e, display: r(e, s, a.label)}
                }, n.getIndex = function (e) {
                    return e
                }; else for (l = 0; l <= i; l += t) n.data.push({value: l, display: r(l, s, a.label)})
            }(t)
        }), m = Math.max(97, m), g.autostart && setTimeout(function () {
            a.start()
        }, 0), a.handlers.toggle = a.toggle, a.handlers.start = a.start, a.handlers.stop = a.stop, a.handlers.resetlap = a.resetlap, a.handlers.reset = a.reset, a.handlers.lap = a.lap, a.buttons.toggle = {
            parentClass: "mbsc-timer-btn-toggle-c",
            text: g.startText,
            icon: g.startIcon,
            handler: "toggle"
        }, a.buttons.start = {
            text: g.startText,
            icon: g.startIcon,
            handler: "start"
        }, a.buttons.stop = {text: g.stopText, icon: g.stopIcon, handler: "stop"}, a.buttons.reset = {
            text: g.resetText,
            icon: g.resetIcon,
            handler: "reset"
        }, a.buttons.lap = {
            text: g.lapText,
            icon: g.lapIcon,
            handler: "lap"
        }, a.buttons.resetlap = {
            parentClass: "mbsc-timer-btn-resetlap-c",
            text: g.resetText,
            icon: g.resetIcon,
            handler: "resetlap"
        }, a.buttons.hide = {
            parentClass: "mbsc-timer-btn-hide-c",
            text: g.hideText,
            icon: g.closeIcon,
            handler: "cancel"
        }, {
            minWidth: 100,
            wheels: I,
            headerText: !1,
            readonly: A,
            buttons: T,
            compClass: "mbsc-timer mbsc-sc",
            parseValue: function () {
                return n(f ? 0 : u)
            },
            formatValue: function (a) {
                var n = "", s = 0;
                return fa(y).each(function (e, t) {
                    "fract" != t && w[t] && (n += a[s] + ("seconds" == t && w.fract ? "." + a[s + 1] : "") + " " + x[e] + " ", s++)
                }), n
            },
            validate: function (e) {
                var a = e.values, t = e.index, n = 0;
                k && void 0 !== t && (E = 0, fa(y).each(function (e, t) {
                    w[t] && (E += _[t].limit * a[n], n++)
                }), E /= 1e3, s(!0))
            },
            onBeforeShow: function () {
                g.showLabel = !0
            },
            onMarkupReady: function (e) {
                p = fa(e.target), t(), A && fa(".mbsc-fr-w", p).addClass("mbsc-timer-locked")
            },
            onPosition: function (e) {
                fa(".mbsc-fr-w", e.target).css("min-width", 0).css("min-width", fa(".mbsc-fr-btn-cont", e.target)[0].offsetWidth)
            },
            onDestroy: function () {
                clearInterval(e)
            }
        }
    }, a("timer", Fe);
    var hn = {
        wheelOrder: "hhiiss",
        useShortLabels: !1,
        min: 0,
        max: 1 / 0,
        labels: ["Years", "Months", "Days", "Hours", "Minutes", "Seconds"],
        labelsShort: ["Yrs", "Mths", "Days", "Hrs", "Mins", "Secs"]
    };
    Ne.timespan = function (d) {
        function u(a) {
            var n = {};
            return fa(b).each(function (e, t) {
                n[t] = x[t] ? Math.floor(a / v[t].limit) : 0, a -= n[t] * v[t].limit
            }), n
        }

        function o(e, t, a) {
            return (e < 10 && t ? "0" : "") + e + '<span class="mbsc-ts-lbl">' + a + "</span>"
        }

        function h(a) {
            var n = 0;
            return fa.each(m, function (e, t) {
                isNaN(+a[0]) || (n += v[t.v].limit * a[e])
            }), n
        }

        var r, a, i, f, p, e = ba({}, d.settings), l = ba(d.settings, hn, e), c = l.wheelOrder,
            t = l.useShortLabels ? l.labelsShort : l.labels,
            b = ["years", "months", "days", "hours", "minutes", "seconds"], v = {
                years: {ord: 0, index: 6, until: 10, limit: 31536e6, label: t[0], re: "y", wheel: {}},
                months: {ord: 1, index: 5, until: 11, limit: 2592e6, label: t[1], re: "m", wheel: {}},
                days: {ord: 2, index: 4, until: 31, limit: 864e5, label: t[2], re: "d", wheel: {}},
                hours: {ord: 3, index: 3, until: 23, limit: 36e5, label: t[3], re: "h", wheel: {}},
                minutes: {ord: 4, index: 2, until: 59, limit: 6e4, label: t[4], re: "i", wheel: {}},
                seconds: {ord: 5, index: 1, until: 59, limit: 1e3, label: t[5], re: "s", wheel: {}}
            }, m = [], g = l.steps || [], x = {}, T = "seconds", y = l.defaultValue || Math.max(l.min, Math.min(0, l.max)),
            n = [[]];
        return fa(b).each(function (e, t) {
            -1 < (a = c.search(new RegExp(v[t].re, "i"))) && (m.push({o: a, v: t}), v[t].index > v[T].index && (T = t))
        }), m.sort(function (e, t) {
            return e.o > t.o ? 1 : -1
        }), fa.each(m, function (e, t) {
            x[t.v] = e + 1, n[0].push(v[t.v].wheel)
        }), f = u(l.min), p = u(l.max), fa.each(m, function (e, t) {
            !function (e) {
                var t = !1, a = g[x[e] - 1] || 1, n = v[e], s = n.label, i = n.wheel;
                if (i.data = [], i.label = n.label, c.match(new RegExp(n.re + n.re, "i")) && (t = !0), e == T) i.min = f[e], i.max = p[e], i.data = function (e) {
                    return {value: e * a, display: o(e * a, t, s)}
                }, i.getIndex = function (e) {
                    return Math.round(e / a)
                }; else for (r = 0; r <= n.until; r += a) i.data.push({value: r, display: o(r, t, s)})
            }(t.v)
        }), d.getVal = function (e, t) {
            return t ? d._getVal(e) : d._hasValue || e ? h(d.getArrayVal(e)) : null
        }, {
            minWidth: 100, showLabel: !0, wheels: n, compClass: "mbsc-ts mbsc-sc", parseValue: function (a) {
                var n, s = [];
                return ra(a) || !a ? (i = u(a || y), fa.each(m, function (e, t) {
                    s.push(i[t.v])
                })) : fa.each(m, function (e, t) {
                    n = new RegExp("(\\d+)\\s?(" + l.labels[v[t.v].ord] + "|" + l.labelsShort[v[t.v].ord] + ")", "gi").exec(a), s.push(n ? n[1] : 0)
                }), fa(s).each(function (e, t) {
                    s[e] = function (e, t) {
                        return Math.floor(e / t) * t
                    }(t, g[e] || 1)
                }), s
            }, formatValue: function (a) {
                var n = "";
                return fa.each(m, function (e, t) {
                    n += +a[e] ? a[e] + " " + v[t.v].label + " " : ""
                }), n ? n.replace(/\s+$/g, "") : 0
            }, validate: function (e) {
                var a, n, s, i, o = e.values, r = e.direction, l = [], c = !0, m = !0;
                return fa(b).each(function (e, t) {
                    if (void 0 !== x[t]) {
                        if (s = x[t] - 1, l[s] = [], i = {}, t != T) {
                            if (c) for (n = p[t] + 1; n <= v[t].until; n++) i[n] = !0;
                            if (m) for (n = 0; n < f[t]; n++) i[n] = !0
                        }
                        o[s] = d.getValidValue(s, o[s], r, i), a = u(h(o)), c = c && a[t] == p[t], m = m && a[t] == f[t], fa.each(i, function (e) {
                            l[s].push(e)
                        })
                    }
                }), {disabled: l}
            }
        }
    }, a("timespan", Fe), Ne.treelist = Aa, a("treelist", Fe), a("popup", Wt, !1), a("widget", jt, !1), g.module("mobiscroll-calendar", []).directive("mobiscrollCalendar", ["$parse", function (e) {
        return na.ng.getDDO(e, "mobiscrollCalendar", {preset: "calendar"})
    }]), g.module("mobiscroll-datetime", []).directive("mobiscrollDatetime", ["$parse", function (e) {
        return na.ng.getDDO(e, "mobiscrollDatetime", {preset: "datetime"})
    }]).directive("mobiscrollDate", ["$parse", function (e) {
        return na.ng.getDDO(e, "mobiscrollDate", {preset: "date"})
    }]).directive("mobiscrollTime", ["$parse", function (e) {
        return na.ng.getDDO(e, "mobiscrollTime", {preset: "time"})
    }]), g.module("mobiscroll-eventcalendar", []).directive("mobiscrollEventcalendar", ["$parse", function (s) {
        return {
            restrict: "A", link: function (e, t, a) {
                var n = new Fe(t[0], g.extend({}, e.$eval(a.mobiscrollEventcalendar || "{}"), {
                    preset: "eventcalendar",
                    data: []
                }));
                a.mobiscrollInstance && s(a.mobiscrollInstance).assign(e, n), e.$watch(function () {
                    return s(a.mobiscrollData)(e)
                }, function (e) {
                    void 0 === e || g.equals(n.getEvents(), e) || n.setEvents(e)
                }, !0), e.$on("$destroy", function () {
                    n.destroy()
                })
            }
        }
    }]), g.module("mobiscroll-page", []).directive("mobiscrollPage", ["$parse", function (s) {
        return {
            restrict: "A", link: function (e, t, a) {
                var n = new Va(t[0], na.ng.getOpt(e, a, "mobiscrollPage", !0));
                a.mobiscrollInstance && s(a.mobiscrollInstance).assign(e, n), e.$on("$destroy", function () {
                    n.destroy()
                })
            }
        }
    }]).directive("mobiscrollAvatar", function () {
        return {
            restrict: "A", link: function (e, t) {
                t[0].classList.add("mbsc-avatar")
            }
        }
    });
    var fn = +new Date;
    g.module("mobiscroll-form", []).directive("mobiscrollForm", ["$parse", function (s) {
        return "undefined" == typeof ionic && !fa("ion-content,ion-nav-view").length || (Da.prototype._defaults.tap = !1, Ct.prototype._defaults.tap = !1), {
            restrict: "A",
            compile: function () {
                return {
                    pre: function (e, t, a) {
                        var n = na.ng.getOpt(e, a, "mobiscrollForm", !0), s = a.id;
                        s || (s = "mbsc-form-" + fn++, t.attr("id", s)), t.attr("mbsc-form-opt", ""), na.ng.formOptions[s] = n
                    }, post: function (e, t, a) {
                        var n = new Da(t[0], na.ng.getOpt(e, a, "mobiscrollForm", !0));
                        a.mobiscrollInstance && s(a.mobiscrollInstance).assign(e, n), e.$on("mbscFormRefresh", function () {
                            n.refresh()
                        }), e.$on("$destroy", function () {
                            n.destroy(), n = null
                        })
                    }
                }
            }
        }
    }]).directive("mobiscrollSwitch", ["$parse", function (e) {
        return na.ng.getDDO(e, "mobiscrollSwitch", {component: "Switch"}, void 0, void 0, void 0, void 0, !0)
    }]).directive("mobiscrollStepper", ["$parse", function (e) {
        return na.ng.getDDO(e, "mobiscrollStepper", {component: "Stepper"})
    }]).directive("mobiscrollProgress", ["$parse", function (e) {
        return na.ng.getDDO(e, "mobiscrollProgress", {component: "Progress"}, void 0, void 0, void 0, void 0, !0)
    }]).directive("mobiscrollSlider", ["$parse", function (c) {
        var e = na.ng.getDDO(c, "mobiscrollSlider", {component: "Slider"}, void 0, void 0, void 0, void 0, !0);
        return e.link = function (t, e, a, n) {
            var s, i = fa(e[0]), o = na.ng.read, r = na.ng.format, l = "mobiscrollSlider";
            na.ng.addWatch(c, t, n, i, a, l, na.ng.render, o, na.ng.parse, r), i.parent().find("input").each(function (e) {
                e && fa(this).on("change", function () {
                    t.$$phase ? o(c, l, i, t, a, n, r) : t.$apply(function () {
                        o(c, l, i, t, a, n, r)
                    })
                })
            }), s = new St(e[0], ba(na.ng.getOpt(t, a, "mobiscrollSlider", n, !0, i))), a.mobiscrollInstance && c(a.mobiscrollInstance).assign(t, s)
        }, e
    }]).directive("mobiscrollRating", ["$parse", function (e) {
        return na.ng.getDDO(e, "mobiscrollRating", {component: "Rating"}, void 0, void 0, void 0, void 0, !0)
    }]);
    var pn, bn = +new Date, vn = [], gn = {}, xn = {};

    function Tn(e, t, a) {
        var n;
        return 1 == (e = fa(fa.parseHTML ? fa.parseHTML(e) : e)).length && e.is("li") || fa(e[0]).is("li") ? (n = e.clone(), fa(n[0]).attr("ng-repeat-start", "item in " + t), fa(n).filter("li").eq(-1).attr("ng-repeat-end", "").attr("mobiscroll-listview-item", a)) : (n = fa("<li></li>").append(e.clone())).attr("ng-repeat", "item in " + t).attr("mobiscroll-listview-item", a), n
    }

    try {
        pn = g.module("ngAnimate")
    } catch (e) {
    }
    pn && vn.push("ngAnimate"), g.module("mobiscroll-listview", vn).directive("mobiscrollListviewItem", ["$compile", "$timeout", function (m, d) {
        return {
            link: function (e, t, a) {
                var n, s, i = fa(t[0]), o = i.parent("ul"), r = a.mobiscrollListviewItem, l = gn[r],
                    c = i.parents(".mbsc-lv-cont").length;
                l.nodesLeft--, o && (c || 0 === l.nodesLeft) && (c ? (n = o.children("li").not(".mbsc-lv-back").index(i), i.hide(), o.hasClass("mbsc-lv-root") ? d(function () {
                    pa[o[0].id].add(null, i.show(), n, void 0, o)
                }) : d(function () {
                    o.prepend(o.children(".mbsc-lv-back")), s = o.parent("li"), pa[l.rootNode[0].id].add(null, i.show(), n, void 0, s.length ? s : o)
                })) : e.$emit("mbscLvLastItemAdded", l.rootNode)), i.append(m('<div style="display:none;"><ul><li mobiscroll-listview-hitem="' + r + '" ng-repeat="item in item.children"></li></ul></div>')(e)[0])
            }
        }
    }]).directive("mobiscrollListviewHitem", ["$compile", "$timeout", function (o) {
        return {
            link: function (e, t, a) {
                var n = fa(t[0]).parent(), s = n.parent().hasClass("mbsc-lv-ng-init"), i = a.mobiscrollListviewHitem;
                n.children("li").not(".mbsc-lv-back").length <= 1 && !s && n.parent().addClass("mbsc-lv-ng-init").parent().append(o(fa("<ul></ul>").append(Tn(xn[i], "item.children", i)))(e.$parent)[0]), e.$on("$destroy", function () {
                    n && (n.children("li").length || (n = n.parent().parent().children("ul")).remove())
                })
            }
        }
    }]).directive("mobiscrollListview", ["$compile", "$parse", "$timeout", function (u, h, f) {
        return {
            restrict: "A", require: "?ngModel", compile: function (e) {
                var c, m = bn++, d = e.html().replace(/(mbsc-ng-)|(ms-ng-)/g, "ng-").trim();
                return function (a, e, n, t) {
                    var s, i, o, r = fa(e[0]);
                    o = t || n.mobiscrollData ? (s = a.$eval(n.mobiscrollListview || "{}"), n.mobiscrollData || n.ngModel) : (s = a.$eval(n.mobiscrollOptions || "{}"), n.mobiscrollListview);
                    var l = function e(t) {
                        var a, n = 0;
                        if (!t) return n;
                        for (a = 0; a < t.length; a++) n++, t[a].children && t[a].children.length && (n += e(t[a].children));
                        return n
                    }(a.$eval(o));
                    gn[m] && (m = bn++), gn[m] = {
                        rootNode: r,
                        allNodes: l,
                        nodesLeft: l
                    }, xn[m] = d, c = fa("<div></div>").append(Tn(d, o, m)), r.empty().append(fa(u(c)(a)[0]).contents()), a.$on("mbscLvLastItemAdded", function (e, t) {
                        r[0] == t[0] && f(function () {
                            i = new Fa(r[0], s), n.mobiscrollInstance && h(n.mobiscrollInstance).assign(a, i)
                        })
                    }), a.$on("$destroy", function () {
                        i && (i.destroy(), i = null)
                    }), 0 === l && a.$emit("mbscLvLastItemAdded", r)
                }
            }
        }
    }]), pn && g.module("mobiscroll-listview").animation(".mbsc-lv-item", function () {
        return {
            leave: function (e, t) {
                var a = fa(e[0]);
                pa[a.closest(".mbsc-lv-cont").find(".mbsc-lv-root")[0].id].remove(a, void 0, t)
            }
        }
    });
    var yn = ["ng-repeat", "ng:repeat", "data-ng-repeat", "x-ng-repeat", "ng_repeat"], _n = +new Date;

    function wn() {
        return function (e, t, a) {
            function n() {
                e.$emit("mbscRepeatRender" + a.mobiscrollRepeatRender)
            }

            n(), e.$on("$destroy", n)
        }
    }

    function Cn(u, h, f, p, b, v) {
        var e = na.ng.getDDO(p, u, h);
        return e.link = void 0, e.compile = function (e) {
            var m, t, d = "" + _n++, a = fa(e[0]);
            return a.children().each(function () {
                for (t = 0; t < yn.length; t++) if (fa(this).attr(yn[t])) return !(m = !0)
            }), m && a.children().attr("mobiscroll-repeat-render", d), function (e, t, a, n) {
                var s, i, o = void 0 === v || v, r = fa(t[0]), l = na.ng.getOpt(e, a, u, n, void 0, void 0, o);
                if (g.extend(l, h), o && na.ng.addWatch(p, e, n, r, a, u), s = f(t[0], l), a.mobiscrollInstance && p(a.mobiscrollInstance).assign(e, s), m) {
                    var c = e.$on("mbscRepeatRender" + d, function () {
                        i && b.cancel(i), i = b(function () {
                            s.option(), o && na.ng.render(r, n ? n.$modelValue : p(a[u])(e))
                        }, 1)
                    });
                    e.$on("$destroy", function () {
                        c(), b.cancel(i)
                    })
                }
            }
        }, e
    }

    g.module("mobiscroll-optionlist", []).directive("mobiscrollRepeatRender", wn).directive("mobiscrollOptionlist", ["$parse", "$timeout", function (e, t) {
        return Cn("mobiscrollOptionlist", {component: "Optionlist"}, function (e, t) {
            return new Qa(e, t)
        }, e, t, !1)
    }]), g.module("mobiscroll-navigation", []).directive("mobiscrollRepeatRender", wn).directive("mobiscrollNav", ["$parse", "$timeout", function (e, t) {
        return Cn("mobiscrollNav", {component: "Navigation"}, function (e, t) {
            return new en(e, t)
        }, e, t, !1)
    }]).directive("mobiscrollBottomNav", ["$parse", "$timeout", function (e, t) {
        return Cn("mobiscrollBottomNav", {component: "Navigation", type: "bottom"}, function (e, t) {
            return new en(e, t)
        }, e, t, !1)
    }]).directive("mobiscrollHamburgerNav", ["$parse", "$timeout", function (e, t) {
        return Cn("mobiscrollHamburgerNav", {component: "Navigation", type: "hamburger"}, function (e, t) {
            return new en(e, t)
        }, e, t, !1)
    }]).directive("mobiscrollTabNav", ["$parse", "$timeout", function (e, t) {
        return Cn("mobiscrollTabNav", {component: "Navigation", type: "tab"}, function (e, t) {
            return new en(e, t)
        }, e, t, !1)
    }]), g.module("mobiscroll-range", []).directive("mobiscrollRange", ["$parse", function (e) {
        return na.ng.getDDO(e, "mobiscrollRange", {preset: "range"})
    }]);
    var Mn = ["ng-repeat", "ng:repeat", "data-ng-repeat", "x-ng-repeat", "ng_repeat"];

    function Sn(e) {
        return e < -1e-7 ? Math.ceil(e - 1e-7) : Math.floor(e + 1e-7)
    }

    function kn(e, t, a) {
        e = parseInt(e), t = parseInt(t), a = parseInt(a);
        var n, s, i, o, r = new Array(0, 0, 0);
        return n = 1582 < e || 1582 == e && 10 < t || 1582 == e && 10 == t && 14 < a ? Sn(1461 * (e + 4800 + Sn((t - 14) / 12)) / 4) + Sn(367 * (t - 2 - 12 * Sn((t - 14) / 12)) / 12) - Sn(3 * Sn((e + 4900 + Sn((t - 14) / 12)) / 100) / 4) + a - 32075 : 367 * e - Sn(7 * (e + 5001 + Sn((t - 9) / 7)) / 4) + Sn(275 * t / 9) + a + 1729777, o = Sn(((s = n - 1948440 + 10632) - 1) / 10631), i = Sn((10985 - (s = s - 10631 * o + 354)) / 5316) * Sn(50 * s / 17719) + Sn(s / 5670) * Sn(43 * s / 15238), s = s - Sn((30 - i) / 15) * Sn(17719 * i / 50) - Sn(i / 16) * Sn(15238 * i / 43) + 29, t = Sn(24 * s / 709), a = s - Sn(709 * t / 24), e = 30 * o + i - 30, r[2] = a, r[1] = t, r[0] = e, r
    }

    g.module("mobiscroll-select", []).directive("mobiscrollSelectOption", function () {
        return {
            link: function (e, t, a) {
                var n = fa(t[0]).closest("select");
                e.$watch(a.ngValue, function () {
                    e.$emit("mbscSelectRefresh", n)
                }), e.$on("$destroy", function () {
                    e.$emit("mbscSelectRefresh", n)
                })
            }
        }
    }).directive("mobiscrollSelect", ["$parse", function (m) {
        var e = na.ng.getDDO(m, "mobiscrollSelect", {preset: "select"});
        return e.link = void 0, e.compile = function (e) {
            var c, t;
            return fa(e[0]).find("option").each(function () {
                for (t = 0; t < Mn.length; t++) if (fa(this).attr(Mn[t])) return fa(this).attr("mobiscroll-select-option", ""), !(c = !0)
            }), function (a, e, n, s) {
                var i, o, r = fa(e[0]), t = na.ng.getOpt(a, n, "mobiscrollSelect", s);
                if (r.hide(), ba(t, {preset: "select"}), n.mobiscrollData && (ba(t, {data: a.$eval(n.mobiscrollData) || []}), a.$watchCollection(n.mobiscrollData, function () {
                    o && o.refresh(a.$eval(n.mobiscrollData))
                })), na.ng.addWatch(m, a, s, r, n, "mobiscrollSelect"), o = new Fe(e[0], t), n.mobiscrollInstance && m(n.mobiscrollInstance).assign(a, o), c) {
                    var l = a.$on("mbscSelectRefresh", function (e, t) {
                        r[0] == t[0] && (clearTimeout(i), i = setTimeout(function () {
                            o.refresh(), na.ng.render(r, s ? s.$modelValue : m(n.mobiscrollSelect)(a))
                        }, 10))
                    });
                    a.$on("$destroy", function () {
                        l(), clearTimeout(i)
                    })
                }
            }
        }, e
    }]), g.module("mobiscroll-popup", []).directive("mobiscrollPopup", ["$parse", function (e) {
        return na.ng.getDDO(e, "mobiscrollPopup", {component: "Popup"})
    }]), g.module("mobiscroll-widget", []).directive("mobiscrollWidget", ["$parse", function (e) {
        return na.ng.getDDO(e, "mobiscrollWidget", {component: "Widget"})
    }]), Q.hijri = {
        getYear: function (e) {
            return kn(e.getFullYear(), e.getMonth() + 1, e.getDate())[0]
        }, getMonth: function (e) {
            return --kn(e.getFullYear(), e.getMonth() + 1, e.getDate())[1]
        }, getDay: function (e) {
            return kn(e.getFullYear(), e.getMonth() + 1, e.getDate())[2]
        }, getDate: function (e, t, a, n, s, i, o) {
            t < 0 && (e += Math.floor(t / 12), t = 12 + t % 12), 11 < t && (e += Math.floor(t / 12), t %= 12);
            var r = function (e, t, a) {
                e = parseInt(e), t = parseInt(t), a = parseInt(a);
                var n, s, i, o, r, l, c = new Array(3);
                return e = 2299160 < (n = Sn((11 * e + 3) / 30) + 354 * e + 30 * t - Sn((t - 1) / 2) + a + 1948440 - 385) ? (o = Sn(4 * (s = 68569 + n) / 146097), s -= Sn((146097 * o + 3) / 4), r = Sn(4e3 * (s + 1) / 1461001), s = s - Sn(1461 * r / 4) + 31, i = Sn(80 * s / 2447), a = s - Sn(2447 * i / 80), t = i + 2 - 12 * (s = Sn(i / 11)), 100 * (o - 49) + r + s) : (l = Sn(((i = 1402 + n) - 1) / 1461), o = Sn(((s = i - 1461 * l) - 1) / 365) - Sn(s / 1461), i = Sn(80 * (r = s - 365 * o + 30) / 2447), a = r - Sn(2447 * i / 80), t = i + 2 - 12 * (r = Sn(i / 11)), 4 * l + o + r - 4716), c[2] = a, c[1] = t, c[0] = e, c
            }(e, +t + 1, a);
            return new Date(r[0], r[1] - 1, r[2], n || 0, s || 0, i || 0, o || 0)
        }, getMaxDayOfMonth: function (e, t) {
            t < 0 && (e += Math.floor(t / 12), t = 12 + t % 12), 11 < t && (e += Math.floor(t / 12), t %= 12);
            return [30, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29][t] + (11 === t && (11 * e + 14) % 30 < 11 ? 1 : 0)
        }
    }, na.i18n.ar = {
        rtl: !0,
        setText: "تعيين",
        cancelText: "إلغاء",
        clearText: "مسح",
        selectedText: "{count} المحدد",
        dateFormat: "dd/mm/yy",
        dayNames: ["الأحد", "الاثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت"],
        dayNamesShort: ["أحد", "اثنين", "ثلاثاء", "أربعاء", "خميس", "جمعة", "سبت"],
        dayNamesMin: ["ح", "ن", "ث", "ر", "خ", "ج", "س"],
        dayText: "يوم",
        hourText: "ساعات",
        minuteText: "الدقائق",
        monthNames: ["كانون الثاني", "شهر فبراير", "مارس", "أبريل", "قد", "يونيو", "يوليو", "أغسطس", "سبتمبر", "شهر اكتوبر", "شهر نوفمبر", "ديسمبر"],
        monthNamesShort: ["كانون الثاني", "شهر فبراير", "مارس", "أبريل", "قد", "يونيو", "يوليو", "أغسطس", "سبتمبر", "شهر اكتوبر", "شهر نوفمبر", "ديسمبر"],
        monthText: "شهر",
        secText: "ثواني",
        amText: "ص",
        pmText: "م",
        timeFormat: "hh:ii A",
        yearText: "عام",
        nowText: "الآن",
        firstDay: 0,
        dateText: "تاريخ",
        timeText: "وقت",
        closeText: "إغلاق",
        todayText: "اليوم",
        prevMonthText: "الشهر السابق",
        nextMonthText: "الشهر القادم",
        prevYearText: "السنه السابقة",
        nextYearText: "العام القادم",
        allDayText: "اليوم كله",
        noEventsText: "لا توجد احداث",
        eventText: "الحدث",
        eventsText: "أحداث",
        moreEventsText: "واحد آخر",
        moreEventsPluralText: "اثنان آخران {count}",
        fromText: "يبدا",
        toText: "ينتهي",
        wholeText: "كامل",
        fractionText: "جزء",
        unitText: "وحدة",
        delimiter: "/",
        decimalSeparator: ".",
        thousandsSeparator: ",",
        labels: ["سنوات", "أشهر", "أيام", "ساعة", "دقائق", "ثواني", ""],
        labelsShort: ["سنوات", "أشهر", "أيام", "ساعة", "دقائق", "ثواني", ""],
        startText: "بدء",
        stopText: "إيقاف",
        resetText: "إعادة ضبط",
        lapText: "الدورة",
        hideText: "إخفاء",
        offText: "إيقاف",
        onText: "تشغيل",
        backText: "رجوع",
        undoText: "تراجع"
    }, na.i18n.bg = {
        setText: "Задаване",
        cancelText: "Отмяна",
        clearText: "Изчистване",
        selectedText: "{count} подбран",
        dateFormat: "dd.mm.yy",
        dayNames: ["Неделя", "Понеделник", "Вторник", "Сряда", "Четвъртък", "Петък", "Събота"],
        dayNamesShort: ["Нед", "Пон", "Вто", "Сря", "Чет", "Пет", "Съб"],
        dayNamesMin: ["Не", "По", "Вт", "Ср", "Че", "Пе", "Съ"],
        dayText: "ден",
        delimiter: ".",
        hourText: "час",
        minuteText: "минута",
        monthNames: ["Януари", "Февруари", "Март", "Април", "Май", "Юни", "Юли", "Август", "Септември", "Октомври", "Ноември", "Декември"],
        monthNamesShort: ["Яну", "Фев", "Мар", "Апр", "Май", "Юни", "Юли", "Авг", "Сеп", "Окт", "Нов", "Дек"],
        monthText: "месец",
        secText: "секунди",
        timeFormat: "H:ii",
        yearText: "година",
        nowText: "Сега",
        pmText: "pm",
        amText: "am",
        firstDay: 1,
        dateText: "Дата",
        timeText: "път",
        todayText: "днес",
        prevMonthText: "Предишния месец",
        nextMonthText: "Следващият месец",
        prevYearText: "Предходната година",
        nextYearText: "Следващата година",
        closeText: "затвори",
        eventText: "Събитие",
        eventsText: "Събития",
        allDayText: "Цял ден",
        noEventsText: "Няма събития",
        moreEventsText: "Още {count}",
        fromText: "ОТ",
        toText: "ДО",
        wholeText: "цяло",
        fractionText: "фракция",
        unitText: "единица",
        labels: ["Години", "месеца", "дни", "часа", "минути", "секунди", ""],
        labelsShort: ["Години", "месеца", "дни", "часа", "минути", "секунди", ""],
        startText: "Старт",
        stopText: "Стоп",
        resetText: "Нулиране",
        lapText: "Обиколка",
        hideText: "крия",
        backText: "връщане",
        undoText: "ОТМЯНА",
        offText: "ИЗКЛ",
        onText: "ВКЛ",
        decimalSeparator: ",",
        thousandsSeparator: " "
    }, na.i18n.ca = {
        setText: "Acceptar",
        cancelText: "Cancel·lar",
        clearText: "Esborrar",
        selectedText: "{count} seleccionat",
        selectedPluralText: "{count} seleccionats",
        dateFormat: "dd/mm/yy",
        dayNames: ["Diumenge", "Dilluns", "Dimarts", "Dimecres", "Dijous", "Divendres", "Dissabte"],
        dayNamesShort: ["Dg", "Dl", "Dt", "Dc", "Dj", "Dv", "Ds"],
        dayNamesMin: ["Dg", "Dl", "Dt", "Dc", "Dj", "Dv", "Ds"],
        dayText: "Dia",
        hourText: "Hores",
        minuteText: "Minuts",
        monthNames: ["Gener", "Febrer", "Març", "Abril", "Maig", "Juny", "Juliol", "Agost", "Setembre", "Octubre", "Novembre", "Desembre"],
        monthNamesShort: ["Gen", "Feb", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Oct", "Nov", "Des"],
        monthText: "Mes",
        secText: "Segons",
        timeFormat: "HH:ii",
        yearText: "Any",
        nowText: "Ara",
        pmText: "pm",
        amText: "am",
        todayText: "Avui",
        firstDay: 1,
        dateText: "Data",
        timeText: "Temps",
        closeText: "Tancar",
        allDayText: "Tot el dia",
        noEventsText: "Cap esdeveniment",
        eventText: "Esdeveniments",
        eventsText: "Esdeveniments",
        moreEventsText: "{count} més",
        fromText: "Iniciar",
        toText: "Final",
        wholeText: "Sencer",
        fractionText: "Fracció",
        unitText: "Unitat",
        labels: ["Anys", "Mesos", "Dies", "Hores", "Minuts", "Segons", ""],
        labelsShort: ["Anys", "Mesos", "Dies", "Hrs", "Mins", "Secs", ""],
        startText: "Iniciar",
        stopText: "Aturar",
        resetText: "Reiniciar",
        lapText: "Volta",
        hideText: "Amagar",
        backText: "Enrere",
        undoText: "Desfés",
        offText: "No",
        onText: "Si"
    }, na.i18n.cs = {
        setText: "Zadej",
        cancelText: "Storno",
        clearText: "Vymazat",
        selectedText: "Označený: {count}",
        dateFormat: "dd.mm.yy",
        dayNames: ["Neděle", "Pondělí", "Úterý", "Středa", "Čtvrtek", "Pátek", "Sobota"],
        dayNamesShort: ["Ne", "Po", "Út", "St", "Čt", "Pá", "So"],
        dayNamesMin: ["N", "P", "Ú", "S", "Č", "P", "S"],
        dayText: "Den",
        hourText: "Hodiny",
        minuteText: "Minuty",
        monthNames: ["Leden", "Únor", "Březen", "Duben", "Květen", "Červen", "Červenec", "Srpen", "Září", "Říjen", "Listopad", "Prosinec"],
        monthNamesShort: ["Led", "Úno", "Bře", "Dub", "Kvě", "Čer", "Čvc", "Spr", "Zář", "Říj", "Lis", "Pro"],
        monthText: "Měsíc",
        secText: "Sekundy",
        timeFormat: "HH:ii",
        yearText: "Rok",
        nowText: "Teď",
        amText: "am",
        pmText: "pm",
        todayText: "Dnes",
        firstDay: 1,
        dateText: "Datum",
        timeText: "Čas",
        closeText: "Zavřít",
        allDayText: "Celý den",
        noEventsText: "Žádné události",
        eventText: "Událostí",
        eventsText: "Události",
        moreEventsText: "{count} další",
        fromText: "Začátek",
        toText: "Konec",
        wholeText: "Celý",
        fractionText: "Část",
        unitText: "Jednotka",
        labels: ["Roky", "Měsíce", "Dny", "Hodiny", "Minuty", "Sekundy", ""],
        labelsShort: ["Rok", "Měs", "Dny", "Hod", "Min", "Sec", ""],
        startText: "Start",
        stopText: "Stop",
        resetText: "Resetovat",
        lapText: "Etapa",
        hideText: "Schovat",
        backText: "Zpět",
        undoText: "Zpět",
        offText: "O",
        onText: "I",
        decimalSeparator: ",",
        thousandsSeparator: " "
    }, na.i18n.da = {
        setText: "Sæt",
        cancelText: "Annuller",
        clearText: "Ryd",
        selectedText: "{count} valgt",
        selectedPluralText: "{count} valgt",
        dateFormat: "dd/mm/yy",
        dayNames: ["Søndag", "Mandag", "Tirsdag", "Onsdag", "Torsdag", "Fredag", "Lørdag"],
        dayNamesShort: ["Søn", "Man", "Tir", "Ons", "Tor", "Fre", "Lør"],
        dayNamesMin: ["S", "M", "T", "O", "T", "F", "L"],
        dayText: "Dag",
        hourText: "Timer",
        minuteText: "Minutter",
        monthNames: ["Januar", "Februar", "Marts", "April", "Maj", "Juni", "Juli", "August", "September", "Oktober", "November", "December"],
        monthNamesShort: ["Jan", "Feb", "Mar", "Apr", "Maj", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dec"],
        monthText: "Måned",
        secText: "Sekunder",
        amText: "am",
        pmText: "pm",
        timeFormat: "HH.ii",
        yearText: "År",
        nowText: "Nu",
        todayText: "I dag",
        firstDay: 1,
        dateText: "Dato",
        timeText: "Tid",
        closeText: "Luk",
        allDayText: "Hele dagen",
        noEventsText: "Ingen begivenheder",
        eventText: "Begivenheder",
        eventsText: "Begivenheder",
        moreEventsText: "{count} mere",
        fromText: "Start",
        toText: "Slut",
        wholeText: "Hele",
        fractionText: "Dele",
        unitText: "Enhed",
        labels: ["År", "Måneder", "Dage", "Timer", "Minutter", "Sekunder", ""],
        labelsShort: ["År", "Mdr", "Dg", "Timer", "Min", "Sek", ""],
        startText: "Start",
        stopText: "Stop",
        resetText: "Nulstil",
        lapText: "Omgang",
        hideText: "Skjul",
        offText: "Fra",
        onText: "Til",
        backText: "Tilbage",
        undoText: "Fortryd"
    }, na.i18n.de = {
        setText: "OK",
        cancelText: "Abbrechen",
        clearText: "Löschen",
        selectedText: "{count} ausgewählt",
        dateFormat: "dd.mm.yy",
        dayNames: ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"],
        dayNamesShort: ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"],
        dayNamesMin: ["S", "M", "D", "M", "D", "F", "S"],
        dayText: "Tag",
        delimiter: ".",
        hourText: "Stunde",
        minuteText: "Minuten",
        monthNames: ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"],
        monthNamesShort: ["Jan", "Feb", "Mär", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dez"],
        monthText: "Monat",
        secText: "Sekunden",
        timeFormat: "HH:ii",
        yearText: "Jahr",
        nowText: "Jetzt",
        pmText: "pm",
        amText: "am",
        todayText: "Heute",
        firstDay: 1,
        dateText: "Datum",
        timeText: "Zeit",
        closeText: "Schließen",
        allDayText: "Ganztägig",
        noEventsText: "Keine Ereignisse",
        eventText: "Ereignis",
        eventsText: "Ereignisse",
        moreEventsText: "{count} weiteres Element",
        moreEventsPluralText: "{count} weitere Elemente",
        fromText: "Von",
        toText: "Bis",
        wholeText: "Ganze Zahl",
        fractionText: "Bruchzahl",
        unitText: "Maßeinheit",
        labels: ["Jahre", "Monate", "Tage", "Stunden", "Minuten", "Sekunden", ""],
        labelsShort: ["Jahr.", "Mon.", "Tag.", "Std.", "Min.", "Sek.", ""],
        startText: "Starten",
        stopText: "Stoppen",
        resetText: "Zurücksetzen",
        lapText: "Lap",
        hideText: "Ausblenden",
        backText: "Zurück",
        undoText: "Rückgängig machen",
        offText: "Aus",
        onText: "Ein",
        decimalSeparator: ",",
        thousandsSeparator: " "
    }, na.i18n.el = {
        setText: "Ορισμος",
        cancelText: "Ακυρωση",
        clearText: "Διαγραφη",
        selectedText: "{count} επιλεγμένα",
        dateFormat: "dd/mm/yy",
        dayNames: ["Κυριακή", "Δευτέρα", "Τρίτη", "Τετάρτη", "Πέμπτη", "Παρασκευή", "Σάββατο"],
        dayNamesShort: ["Κυρ", "Δευ", "Τρι", "Τετ", "Πεμ", "Παρ", "Σαβ"],
        dayNamesMin: ["Κυ", "Δε", "Τρ", "Τε", "Πε", "Πα", "Σα"],
        dayText: "ημέρα",
        delimiter: "/",
        hourText: "ώρα",
        minuteText: "λεπτό",
        monthNames: ["Ιανουάριος", "Φεβρουάριος", "Μάρτιος", "Απρίλιος", "Μάιος", "Ιούνιος", "Ιούλιος", "Αύγουστος", "Σεπτέμβριος", "Οκτώβριος", "Νοέμβριος", "Δεκέμβριος"],
        monthNamesShort: ["Ιαν", "Φεβ", "Μαρ", "Απρ", "Μαι", "Ιουν", "Ιουλ", "Αυγ", "Σεπ", "Οκτ", "Νοε", "Δεκ"],
        monthText: "Μήνας",
        secText: "δευτερόλεπτα",
        timeFormat: "H:ii",
        yearText: "έτος",
        nowText: "τώρα",
        pmText: "μμ",
        amText: "πμ",
        firstDay: 1,
        dateText: "Ημερομηνία",
        timeText: "φορά",
        todayText: "Σήμερα",
        prevMonthText: "Προηγούμενο μήνα",
        nextMonthText: "Επόμενο μήνα",
        prevYearText: "Προηγούμενο έτος",
        nextYearText: "Επόμενο έτος",
        closeText: "Κλείσιμο",
        eventText: "Γεγονότα",
        eventsText: "Γεγονότα",
        allDayText: "Ολοήμερο",
        noEventsText: "Δεν υπάρχουν γεγονότα",
        moreEventsText: "{count} ακόμη",
        fromText: "Αρχή",
        toText: "Τέλος",
        wholeText: "Ολόκληρος",
        fractionText: "κλάσμα",
        unitText: "Μονάδα",
        labels: ["Χρόνια", "Μήνες", "Ημέρες", "Ωρες", "Λεπτά", "δευτερόλεπτα", ""],
        labelsShort: ["Χρόνια", "Μήνες", "Ημέρες", "Ωρες", "Λεπτά", "δευτ", ""],
        startText: "΄Εναρξη",
        stopText: "Διακοπή",
        resetText: "Επαναφορά",
        lapText: "Γύρος",
        hideText: "κρύβω",
        backText: "Πίσω",
        undoText: "Αναιρεση",
        offText: "Ανενεργό",
        onText: "Ενεργό",
        decimalSeparator: ",",
        thousandsSeparator: " "
    }, na.i18n["en-GB"] = na.i18n["en-UK"] = {dateFormat: "dd/mm/yy", timeFormat: "HH:ii"}, na.i18n.es = {
        setText: "Aceptar",
        cancelText: "Cancelar",
        clearText: "Borrar",
        selectedText: "{count} seleccionado",
        selectedPluralText: "{count} seleccionados",
        dateFormat: "dd/mm/yy",
        dayNames: ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"],
        dayNamesShort: ["Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sá"],
        dayNamesMin: ["D", "L", "M", "M", "J", "V", "S"],
        dayText: "Día",
        hourText: "Horas",
        minuteText: "Minutos",
        monthNames: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
        monthNamesShort: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"],
        monthText: "Mes",
        secText: "Segundos",
        timeFormat: "HH:ii",
        yearText: "A&ntilde;o",
        nowText: "Ahora",
        pmText: "pm",
        amText: "am",
        todayText: "Hoy",
        firstDay: 1,
        dateText: "Fecha",
        timeText: "Tiempo",
        closeText: "Cerrar",
        allDayText: "Todo el día",
        noEventsText: "No hay eventos",
        eventText: "Evento",
        eventsText: "Eventos",
        moreEventsText: "{count} más",
        fromText: "Iniciar",
        toText: "Final",
        wholeText: "Entero",
        fractionText: "Fracción",
        unitText: "Unidad",
        labels: ["Años", "Meses", "Días", "Horas", "Minutos", "Segundos", ""],
        labelsShort: ["Año", "Mes", "Día", "Hora", "Min", "Seg", ""],
        startText: "Iniciar",
        stopText: "Deténgase",
        resetText: "Reinicializar",
        lapText: "Lap",
        hideText: "Esconder",
        backText: "Atrás",
        undoText: "Deshacer",
        offText: "No",
        onText: "Sí",
        decimalSeparator: ",",
        thousandsSeparator: " "
    };
    var Dn = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31], Nn = [31, 31, 31, 31, 31, 31, 30, 30, 30, 30, 30, 29];

    function Vn(e, t, a) {
        var n, s = (e = parseInt(e)) - 1600, i = (t = parseInt(t)) - 1, o = (a = parseInt(a)) - 1,
            r = 365 * s + parseInt((3 + s) / 4) - parseInt((99 + s) / 100) + parseInt((399 + s) / 400);
        for (n = 0; n < i; ++n) r += Dn[n];
        1 < i && (s % 4 == 0 && s % 100 != 0 || s % 400 == 0) && ++r;
        var l = (r += o) - 79, c = parseInt(l / 12053);
        l %= 12053;
        var m = 979 + 33 * c + 4 * parseInt(l / 1461);
        for (366 <= (l %= 1461) && (m += parseInt((l - 1) / 365), l = (l - 1) % 365), n = 0; n < 11 && l >= Nn[n]; ++n) l -= Nn[n];
        return [m, n + 1, l + 1]
    }

    Q.jalali = {
        getYear: function (e) {
            return Vn(e.getFullYear(), e.getMonth() + 1, e.getDate())[0]
        }, getMonth: function (e) {
            return --Vn(e.getFullYear(), e.getMonth() + 1, e.getDate())[1]
        }, getDay: function (e) {
            return Vn(e.getFullYear(), e.getMonth() + 1, e.getDate())[2]
        }, getDate: function (e, t, a, n, s, i, o) {
            t < 0 && (e += Math.floor(t / 12), t = 12 + t % 12), 11 < t && (e += Math.floor(t / 12), t %= 12);
            var r = function (e, t, a) {
                var n, s = (e = parseInt(e)) - 979, i = (t = parseInt(t)) - 1, o = (a = parseInt(a)) - 1,
                    r = 365 * s + 8 * parseInt(s / 33) + parseInt((s % 33 + 3) / 4);
                for (n = 0; n < i; ++n) r += Nn[n];
                var l = (r += o) + 79, c = 1600 + 400 * parseInt(l / 146097), m = !0;
                for (36525 <= (l %= 146097) && (l--, c += 100 * parseInt(l / 36524), 365 <= (l %= 36524) ? l++ : m = !1), c += 4 * parseInt(l / 1461), 366 <= (l %= 1461) && (m = !1, l--, c += parseInt(l / 365), l %= 365), n = 0; Dn[n] + (1 == n && m) <= l; n++) l -= Dn[n] + (1 == n && m);
                return [c, n + 1, l + 1]
            }(e, +t + 1, a);
            return new Date(r[0], r[1] - 1, r[2], n || 0, s || 0, i || 0, o || 0)
        }, getMaxDayOfMonth: function (e, t) {
            var a, n, s, i = 31;
            for (t < 0 && (e += Math.floor(t / 12), t = 12 + t % 12), 11 < t && (e += Math.floor(t / 12), t %= 12); !1 == (n = t + 1, s = i, !((a = e) < 0 || 32767 < a || n < 1 || 12 < n || s < 1 || s > Nn[n - 1] + (12 == n && (a - 979) % 33 % 4 == 0)));) i--;
            return i
        }
    }, na.i18n.fa = {
        setText: "تاييد",
        cancelText: "انصراف",
        clearText: "واضح ",
        selectedText: "{count} منتخب",
        calendarSystem: "jalali",
        dateFormat: "yy/mm/dd",
        dayNames: ["يکشنبه", "دوشنبه", "سه‌شنبه", "چهارشنبه", "پنج‌شنبه", "جمعه", "شنبه"],
        dayNamesShort: ["ی", "د", "س", "چ", "پ", "ج", "ش"],
        dayNamesMin: ["ی", "د", "س", "چ", "پ", "ج", "ش"],
        dayText: "روز",
        hourText: "ساعت",
        minuteText: "دقيقه",
        monthNames: ["فروردين", "ارديبهشت", "خرداد", "تير", "مرداد", "شهريور", "مهر", "آبان", "آذر", "دی", "بهمن", "اسفند"],
        monthNamesShort: ["فروردين", "ارديبهشت", "خرداد", "تير", "مرداد", "شهريور", "مهر", "آبان", "آذر", "دی", "بهمن", "اسفند"],
        monthText: "ماه",
        secText: "ثانيه",
        timeFormat: "HH:ii",
        timeWheels: "iiHH",
        yearText: "سال",
        nowText: "اکنون",
        amText: "ب",
        pmText: "ص",
        todayText: "امروز",
        firstDay: 6,
        rtl: !0,
        dateText: "تاریخ ",
        timeText: "زمان ",
        closeText: "نزدیک",
        allDayText: "تمام روز",
        noEventsText: "هیچ رویداد",
        eventText: "رویداد",
        eventsText: "رویدادها",
        moreEventsText: "{count} مورد دیگر",
        fromText: "شروع ",
        toText: "پایان",
        wholeText: "تمام",
        fractionText: "کسر",
        unitText: "واحد",
        labels: ["سال", "ماه", "روز", "ساعت", "دقیقه", "ثانیه", ""],
        labelsShort: ["سال", "ماه", "روز", "ساعت", "دقیقه", "ثانیه", ""],
        startText: "شروع",
        stopText: "پايان",
        resetText: "تنظیم مجدد",
        lapText: "Lap",
        hideText: "پنهان کردن",
        backText: "پشت",
        undoText: "واچیدن"
    }, na.i18n.fi = {
        setText: "Aseta",
        cancelText: "Peruuta",
        clearText: "Tyhjennä",
        selectedText: "{count} valita",
        dateFormat: "d. MM yy",
        dayNames: ["Sunnuntai", "Maanantai", "Tiistai", "Keskiviiko", "Torstai", "Perjantai", "Lauantai"],
        dayNamesShort: ["Su", "Ma", "Ti", "Ke", "To", "Pe", "La"],
        dayNamesMin: ["S", "M", "T", "K", "T", "P", "L"],
        dayText: "Päivä",
        delimiter: ".",
        hourText: "Tuntia",
        minuteText: "Minuutti",
        monthNames: ["Tammikuu", "Helmikuu", "Maaliskuu", "Huhtikuu", "Toukokuu", "Kesäkuu", "Heinäkuu", "Elokuu", "Syyskuu", "Lokakuu", "Marraskuu", "Joulukuu"],
        monthNamesShort: ["Tam", "Hel", "Maa", "Huh", "Tou", "Kes", "Hei", "Elo", "Syy", "Lok", "Mar", "Jou"],
        monthText: "Kuukausi",
        secText: "Sekunda",
        timeFormat: "H:ii",
        yearText: "Vuosi",
        nowText: "Nyt",
        pmText: "pm",
        amText: "am",
        firstDay: 1,
        dateText: "Päiväys",
        timeText: "Aika",
        todayText: "Tänään",
        prevMonthText: "Edellinen kuukausi",
        nextMonthText: "Ensi kuussa",
        prevYearText: "Edellinen vuosi",
        nextYearText: "Ensi vuosi",
        closeText: "Sulje",
        eventText: "Tapahtumia",
        eventsText: "Tapahtumia",
        allDayText: "Koko päivä",
        noEventsText: "Ei tapahtumia",
        moreEventsText: "{count} muu",
        moreEventsPluralText: "{count} muuta",
        fromText: "Alkaa",
        toText: "Päättyy",
        wholeText: "Kokonainen",
        fractionText: "Murtoluku",
        unitText: "Yksikkö",
        labels: ["Vuosi", "Kuukausi", "Päivä", "Tunnin", "Minuutti", "sekuntia", ""],
        labelsShort: ["Vuo", "Kuu", "Päi", "Tun", "Min", "Sek", ""],
        startText: "Käynnistys",
        stopText: "Seis",
        resetText: "Aseta uudelleen",
        lapText: "Kierros",
        hideText: "Vuota",
        backText: "Edellinen",
        undoText: "Kumoa",
        offText: "Pois",
        onText: "Päällä",
        decimalSeparator: ",",
        thousandsSeparator: " "
    }, na.i18n.fr = {
        setText: "Terminer",
        cancelText: "Annuler",
        clearText: "Effacer",
        selectedText: "{count} sélectionné",
        selectedPluralText: "{count} sélectionnés",
        dateFormat: "dd/mm/yy",
        dayNames: ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"],
        dayNamesShort: ["Dim.", "Lun.", "Mar.", "Mer.", "Jeu.", "Ven.", "Sam."],
        dayNamesMin: ["D", "L", "M", "M", "J", "V", "S"],
        dayText: "Jour",
        monthText: "Mois",
        monthNames: ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"],
        monthNamesShort: ["Janv.", "Févr.", "Mars", "Avril", "Mai", "Juin", "Juil.", "Août", "Sept.", "Oct.", "Nov.", "Déc."],
        hourText: "Heures",
        minuteText: "Minutes",
        secText: "Secondes",
        timeFormat: "HH:ii",
        yearText: "Année",
        nowText: "Maintenant",
        pmText: "pm",
        amText: "am",
        todayText: "Aujourd'hui",
        firstDay: 1,
        dateText: "Date",
        timeText: "Heure",
        closeText: "Fermer",
        allDayText: "Toute la journée",
        noEventsText: "Aucun événement",
        eventText: "Événement",
        eventsText: "Événements",
        moreEventsText: "{count} autre",
        moreEventsPluralText: "{count} autres",
        fromText: "Démarrer",
        toText: "Fin",
        wholeText: "Entier",
        fractionText: "Fraction",
        unitText: "Unité",
        labels: ["Ans", "Mois", "Jours", "Heures", "Minutes", "Secondes", ""],
        labelsShort: ["Ans", "Mois", "Jours", "Hrs", "Min", "Sec", ""],
        startText: "Démarrer",
        stopText: "Arrêter",
        resetText: "Réinitialiser",
        lapText: "Lap",
        hideText: "Cachez",
        backText: "Retour",
        undoText: "Annuler",
        offText: "Non",
        onText: "Oui",
        decimalSeparator: ",",
        thousandsSeparator: " "
    }, na.i18n.he = {
        rtl: !0,
        setText: "שמירה",
        cancelText: "ביטול",
        clearText: "נקה",
        selectedText: "{count} נבחר",
        selectedPluralText: "{count} נבחרו",
        dateFormat: "dd/mm/yy",
        dayNames: ["ראשון", "שני", "שלישי", "רביעי", "חמישי", "שישי", "שבת"],
        dayNamesShort: ["א'", "ב'", "ג'", "ד'", "ה'", "ו'", "ש'"],
        dayNamesMin: ["א", "ב", "ג", "ד", "ה", "ו", "ש"],
        dayText: "יום",
        hourText: "שעות",
        minuteText: "דקות",
        monthNames: ["ינואר", "פברואר", "מרץ", "אפריל", "מאי", "יוני", "יולי", "אוגוסט", "ספטמבר", "אוקטובר", "נובמבר", "דצמבר"],
        monthNamesShort: ["ינו", "פבר", "מרץ", "אפר", "מאי", "יונ", "יול", "אוג", "ספט", "אוק", "נוב", "דצמ"],
        monthText: "חודש",
        secText: "שניות",
        amText: "am",
        pmText: "pm",
        timeFormat: "HH:ii",
        timeWheels: "iiHH",
        yearText: "שנה",
        nowText: "עכשיו",
        firstDay: 0,
        dateText: "תאריך",
        timeText: "זמן",
        closeText: "סגירה",
        todayText: "היום",
        allDayText: "כל היום",
        noEventsText: "אין אירועים",
        eventText: "מִקרֶה",
        eventsText: "מִקרֶה",
        moreEventsText: "אירוע אחד נוסף",
        moreEventsPluralText: "{count} אירועים נוספים",
        fromText: "התחלה",
        toText: "סיום",
        wholeText: "כֹּל",
        fractionText: "שבריר",
        unitText: "יחידה",
        labels: ["שנים", "חודשים", "ימים", "שעות", "דקות", "שניים", ""],
        labelsShort: ["שנים", "חודשים", "ימים", "שעות", "דקות", "שניים", ""],
        startText: "התחל",
        stopText: "עצור",
        resetText: "אתחול",
        lapText: "הקפה",
        hideText: "הסתר",
        offText: "כיבוי",
        onText: "הפעלה",
        backText: "חזור",
        undoText: "ביטול פעולה"
    }, na.i18n.hi = {
        setText: "सैट करें",
        cancelText: "रद्द करें",
        clearText: "साफ़ को",
        selectedText: "{count} चयनित",
        dateFormat: "dd/mm/yy",
        dayNames: ["रविवार", "सोमवार", "मंगलवार", "बुधवार", "गुरुवार", "शुक्रवार", "शनिवार"],
        dayNamesShort: ["रवि", "सोम", "मंगल", "बुध", "गुरु", "शुक्र", "शनि"],
        dayNamesMin: ["रवि", "सोम", "मंगल", "बुध", "गुरु", "शुक्र", "शनि"],
        dayText: "दिन",
        delimiter: ".",
        hourText: "घंटा",
        minuteText: "मिनट",
        monthNames: ["जनवरी ", "फरवरी", "मार्च", "अप्रेल", "मई", "जून", "जूलाई", "अगस्त ", "सितम्बर", "अक्टूबर", "नवम्बर", "दिसम्बर"],
        monthNamesShort: ["जन", "फर", "मार्च", "अप्रेल", "मई", "जून", "जूलाई", "अग", "सित", "अक्ट", "नव", "दि"],
        monthText: "महीना",
        secText: "सेकंड",
        timeFormat: "H:ii",
        yearText: "साल",
        nowText: "अब",
        pmText: "अपराह्न",
        amText: "पूर्वाह्न",
        firstDay: 1,
        dateText: "तिथि",
        timeText: "समय",
        todayText: "आज",
        prevMonthText: "पिछ्ला महिना",
        nextMonthText: "अगले महीने",
        prevYearText: "पिछला साल",
        nextYearText: "अगले वर्ष",
        closeText: "बंद",
        eventText: "इवेट३",
        eventsText: "इवेट३",
        allDayText: "पूरे दिन",
        noEventsText: "Ei tapahtumia",
        moreEventsText: "{count} और",
        fromText: "से",
        toText: "तक",
        wholeText: "समूचा",
        fractionText: "अंश",
        unitText: "इकाई",
        labels: ["साल", "महीने", "दिन", "घंटे", "मिनट", "सेकंड", ""],
        labelsShort: ["साल", "महीने", "दिन", "घंटे", "मिनट", "सेकंड", ""],
        startText: "प्रारंभ",
        stopText: "रोकें",
        resetText: "रीसेट करें",
        lapText: "लैप",
        hideText: "छिपाना",
        backText: "वापस",
        undoText: "वापस लाएं",
        offText: "बंद",
        onText: "चालू",
        decimalSeparator: ",",
        thousandsSeparator: " "
    }, na.i18n.hr = {
        setText: "Postavi",
        cancelText: "Izlaz",
        clearText: "Izbriši",
        selectedText: "{count} odabran",
        dateFormat: "dd.mm.yy",
        dayNames: ["Nedjelja", "Ponedjeljak", "Utorak", "Srijeda", "Četvrtak", "Petak", "Subota"],
        dayNamesShort: ["Ned", "Pon", "Uto", "Sri", "Čet", "Pet", "Sub"],
        dayNamesMin: ["Ne", "Po", "Ut", "Sr", "Če", "Pe", "Su"],
        dayText: "Dan",
        delimiter: ".",
        hourText: "Sat",
        minuteText: "Minuta",
        monthNames: ["Siječanj", "Veljača", "Ožujak", "Travanj", "Svibanj", "Lipanj", "Srpanj", "Kolovoz", "Rujan", "Listopad", "Studeni", "Prosinac"],
        monthNamesShort: ["Sij", "Velj", "Ožu", "Tra", "Svi", "Lip", "Srp", "Kol", "Ruj", "Lis", "Stu", "Pro"],
        monthText: "Mjesec",
        secText: "Sekunda",
        timeFormat: "H:ii",
        yearText: "Godina",
        nowText: "Sada",
        pmText: "pm",
        amText: "am",
        firstDay: 1,
        dateText: "Datum",
        timeText: "Vrijeme",
        todayText: "Danas",
        prevMonthText: "Prethodni mjesec",
        nextMonthText: "Sljedeći mjesec",
        prevYearText: "Prethodni godina",
        nextYearText: "Slijedeće godine",
        closeText: "Zatvori",
        eventText: "Događaj",
        eventsText: "događaja",
        allDayText: "Cijeli dan",
        noEventsText: "Bez događaja",
        moreEventsText: "Još {count}",
        fromText: "Počinje",
        toText: "Završava",
        wholeText: "Cjelina",
        fractionText: "Frakcija",
        unitText: "Jedinica",
        labels: ["godina", "mjesec", "dan", "sat", "minuta", "sekunda", ""],
        labelsShort: ["god", "mje", "dan", "sat", "min", "sec", ""],
        startText: "Početak",
        stopText: "Prekid",
        resetText: "Resetiraj",
        lapText: "Ciklus",
        hideText: "Sakriti",
        backText: "Natrag",
        undoText: "Poništavanje",
        offText: "Uklj.",
        onText: "Isklj.",
        decimalSeparator: ",",
        thousandsSeparator: " "
    }, na.i18n.hu = {
        setText: "OK",
        cancelText: "Mégse",
        clearText: "Törlés",
        selectedText: "{count} kiválasztva",
        dateFormat: "yy.mm.dd.",
        dayNames: ["Vasárnap", "Hétfő", "Kedd", "Szerda", "Csütörtök", "Péntek", "Szombat"],
        dayNamesShort: ["Va", "Hé", "Ke", "Sze", "Csü", "Pé", "Szo"],
        dayNamesMin: ["V", "H", "K", "Sz", "Cs", "P", "Sz"],
        dayText: "Nap",
        delimiter: ".",
        hourText: "Óra",
        minuteText: "Perc",
        monthNames: ["Január", "Február", "Március", "Április", "Május", "Június", "Július", "Augusztus", "Szeptember", "Október", "November", "December"],
        monthNamesShort: ["Jan", "Feb", "Már", "Ápr", "Máj", "Jún", "Júl", "Aug", "Szep", "Okt", "Nov", "Dec"],
        monthText: "Hónap",
        secText: "Másodperc",
        timeFormat: "H:ii",
        yearText: "Év",
        nowText: "Most",
        pmText: "pm",
        amText: "am",
        firstDay: 1,
        dateText: "Dátum",
        timeText: "Idő",
        todayText: "Ma",
        prevMonthText: "Előző hónap",
        nextMonthText: "Következő hónap",
        prevYearText: "Előző év",
        nextYearText: "Következő év",
        closeText: "Bezár",
        eventText: "esemény",
        eventsText: "esemény",
        allDayText: "Egész nap",
        noEventsText: "Nincs esemény",
        moreEventsText: "{count} további",
        fromText: "Eleje",
        toText: "Vége",
        wholeText: "Egész",
        fractionText: "Tört",
        unitText: "Egység",
        labels: ["Év", "Hónap", "Nap", "Óra", "Perc", "Másodperc", ""],
        labelsShort: ["Év", "Hó.", "Nap", "Óra", "Perc", "Mp.", ""],
        startText: "Indít",
        stopText: "Megállít",
        resetText: "Visszaállít",
        lapText: "Lap",
        hideText: "Elrejt",
        backText: "Vissza",
        undoText: "Visszavon",
        offText: "Ki",
        onText: "Be",
        decimalSeparator: ",",
        thousandsSeparator: " "
    }, na.i18n.it = {
        setText: "OK",
        cancelText: "Annulla",
        clearText: "Chiarire",
        selectedText: "{count} selezionato",
        selectedPluralText: "{count} selezionati",
        dateFormat: "dd/mm/yy",
        dayNames: ["Domenica", "Lunedì", "Mertedì", "Mercoledì", "Giovedì", "Venerdì", "Sabato"],
        dayNamesShort: ["Do", "Lu", "Ma", "Me", "Gi", "Ve", "Sa"],
        dayNamesMin: ["D", "L", "M", "M", "G", "V", "S"],
        dayText: "Giorno",
        hourText: "Ore",
        minuteText: "Minuti",
        monthNames: ["Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno", "Luglio", "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre"],
        monthNamesShort: ["Gen", "Feb", "Mar", "Apr", "Mag", "Giu", "Lug", "Ago", "Set", "Ott", "Nov", "Dic"],
        monthText: "Mese",
        secText: "Secondi",
        timeFormat: "HH:ii",
        yearText: "Anno",
        nowText: "Ora",
        pmText: "pm",
        amText: "am",
        todayText: "Oggi",
        firstDay: 1,
        dateText: "Data",
        timeText: "Volta",
        closeText: "Chiudere",
        allDayText: "Tutto il giorno",
        noEventsText: "Nessun evento",
        eventText: "Evento",
        eventsText: "Eventi",
        moreEventsText: "{count} altro",
        moreEventsPluralText: "altri {count}",
        fromText: "Inizio",
        toText: "Fine",
        wholeText: "Intero",
        fractionText: "Frazione",
        unitText: "Unità",
        labels: ["Anni", "Mesi", "Giorni", "Ore", "Minuti", "Secondi", ""],
        labelsShort: ["Anni", "Mesi", "Gio", "Ore", "Min", "Sec", ""],
        startText: "Inizio",
        stopText: "Arresto",
        resetText: "Ripristina",
        lapText: "Lap",
        hideText: "Nascondi",
        backText: "Indietro",
        undoText: "Annulla",
        offText: "Via",
        onText: "Su",
        decimalSeparator: ",",
        thousandsSeparator: " "
    }, na.i18n.ja = {
        setText: "セット",
        cancelText: "キャンセル",
        clearText: "クリア",
        selectedText: "{count} 選択",
        dateFormat: "yy年mm月dd日",
        dayNames: ["日", "月", "火", "水", "木", "金", "土"],
        dayNamesShort: ["日", "月", "火", "水", "木", "金", "土"],
        dayNamesMin: ["日", "月", "火", "水", "木", "金", "土"],
        dayText: "日",
        hourText: "時",
        minuteText: "分",
        monthNames: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
        monthNamesShort: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
        monthText: "月",
        secText: "秒",
        timeFormat: "HH:ii",
        yearText: "年",
        nowText: "今",
        pmText: "午後",
        amText: "午前",
        yearSuffix: "年",
        monthSuffix: "月",
        daySuffix: "日",
        todayText: "今日",
        dateText: "日付",
        timeText: "時間",
        closeText: "クローズ",
        allDayText: "終日",
        noEventsText: "イベントはありません",
        eventText: "イベント",
        eventsText: "イベント",
        moreEventsText: "他 {count} 件",
        fromText: "開始",
        toText: "終わり",
        wholeText: "全数",
        fractionText: "分数",
        unitText: "単位",
        labels: ["年間", "月間", "日間", "時間", "分", "秒", ""],
        labelsShort: ["年間", "月間", "日間", "時間", "分", "秒", ""],
        startText: "開始",
        stopText: "停止",
        resetText: "リセット",
        lapText: "ラップ",
        hideText: "隠す",
        backText: "バック",
        undoText: "アンドゥ"
    }, na.i18n.ko = {
        setText: "설정",
        cancelText: "취소",
        clearText: "삭제",
        selectedText: "{count} 선택된",
        dateFormat: "yy년mm월dd일",
        dayNames: ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"],
        dayNamesShort: ["일", "월", "화", "수", "목", "금", "토"],
        dayNamesMin: ["일", "월", "화", "수", "목", "금", "토"],
        dayText: "일",
        delimiter: "-",
        hourText: "시간",
        minuteText: "분",
        monthNames: ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"],
        monthNamesShort: ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"],
        monthText: "달",
        secText: "초",
        timeFormat: "H:ii",
        yearText: "년",
        nowText: "지금",
        pmText: "오후",
        amText: "오전",
        yearSuffix: "년",
        monthSuffix: "월",
        daySuffix: "일",
        firstDay: 0,
        dateText: "날짜",
        timeText: "시간",
        todayText: "오늘",
        prevMonthText: "이전 달",
        nextMonthText: "다음 달",
        prevYearText: "이전 년",
        nextYearText: "다음 년",
        closeText: "닫기",
        eventText: "이벤트",
        eventsText: "이벤트",
        allDayText: "종일",
        noEventsText: "이벤트 없음",
        moreEventsText: "{count}개 더보기",
        fromText: "시작",
        toText: "종료",
        wholeText: "정수",
        fractionText: "분수",
        unitText: "단위",
        labels: ["년", "달", "일", "시간", "분", "초", ""],
        labelsShort: ["년", "달", "일", "시간", "분", "초", ""],
        startText: "시작",
        stopText: "중지 ",
        resetText: "초기화",
        lapText: "기록",
        hideText: "숨는 장소",
        backText: "뒤로",
        undoText: "실행취소",
        offText: "끔",
        onText: "켬",
        decimalSeparator: ",",
        thousandsSeparator: " "
    }, na.i18n.lt = {
        setText: "OK",
        cancelText: "Atšaukti",
        clearText: "Išvalyti",
        selectedText: "Pasirinktas {count}",
        selectedPluralText: "Pasirinkti {count}",
        dateFormat: "yy-mm-dd",
        dayNames: ["Sekmadienis", "Pirmadienis", "Antradienis", "Trečiadienis", "Ketvirtadienis", "Penktadienis", "Šeštadienis"],
        dayNamesShort: ["S", "Pr", "A", "T", "K", "Pn", "Š"],
        dayNamesMin: ["S", "Pr", "A", "T", "K", "Pn", "Š"],
        dayText: "Diena",
        hourText: "Valanda",
        minuteText: "Minutes",
        monthNames: ["Sausis", "Vasaris", "Kovas", "Balandis", "Gegužė", "Birželis", "Liepa", "Rugpjūtis", "Rugsėjis", "Spalis", "Lapkritis", "Gruodis"],
        monthNamesShort: ["Sau", "Vas", "Kov", "Bal", "Geg", "Bir", "Lie", "Rugp", "Rugs", "Spa", "Lap", "Gruo"],
        monthText: "Mėnuo",
        secText: "Sekundes",
        amText: "am",
        pmText: "pm",
        timeFormat: "HH:ii",
        yearText: "Metai",
        nowText: "Dabar",
        todayText: "Šiandien",
        firstDay: 1,
        dateText: "Data",
        timeText: "Laikas",
        closeText: "Uždaryti",
        allDayText: "Visą dieną",
        noEventsText: "Nėra įvykių",
        eventText: "Įvykių",
        eventsText: "Įvykiai",
        moreEventsText: "Dar {count}",
        fromText: "Nuo",
        toText: "Iki",
        wholeText: "Visas",
        fractionText: "Frakcija",
        unitText: "Vienetas",
        labels: ["Metai", "Mėnesiai", "Dienos", "Valandos", "Minutes", "Sekundes", ""],
        labelsShort: ["m", "mėn.", "d", "h", "min", "s", ""],
        startText: "Pradėti",
        stopText: "Sustabdyti",
        resetText: "Išnaujo",
        lapText: "Ratas",
        hideText: "Slėpti",
        backText: "Atgal",
        undoText: "Anuliuoti",
        offText: "Išj.",
        onText: "Įj.",
        decimalSeparator: ",",
        thousandsSeparator: " "
    }, na.i18n.nl = {
        setText: "Instellen",
        cancelText: "Annuleren",
        clearText: "Leegmaken",
        selectedText: "{count} gekozen",
        dateFormat: "dd-mm-yy",
        dayNames: ["Zondag", "Maandag", "Dinsdag", "Woensdag", "Donderdag", "Vrijdag", "Zaterdag"],
        dayNamesShort: ["zo", "ma", "di", "wo", "do", "vr", "za"],
        dayNamesMin: ["z", "m", "d", "w", "d", "v", "z"],
        dayText: "Dag",
        hourText: "Uur",
        minuteText: "Minuten",
        monthNames: ["januari", "februari", "maart", "april", "mei", "juni", "juli", "augustus", "september", "oktober", "november", "december"],
        monthNamesShort: ["jan", "feb", "mrt", "apr", "mei", "jun", "jul", "aug", "sep", "okt", "nov", "dec"],
        monthText: "Maand",
        secText: "Seconden",
        timeFormat: "HH:ii",
        yearText: "Jaar",
        nowText: "Nu",
        pmText: "pm",
        amText: "am",
        todayText: "Vandaag",
        firstDay: 1,
        dateText: "Datum",
        timeText: "Tijd",
        closeText: "Sluiten",
        allDayText: "Hele dag",
        noEventsText: "Geen activiteiten",
        eventText: "Activiteit",
        eventsText: "Activiteiten",
        moreEventsText: "nog {count}",
        fromText: "Start",
        toText: "Einde",
        wholeText: "geheel",
        fractionText: "fractie",
        unitText: "eenheid",
        labels: ["Jaren", "Maanden", "Dagen", "Uren", "Minuten", "Seconden", ""],
        labelsShort: ["j", "m", "d", "u", "min", "sec", ""],
        startText: "Start",
        stopText: "Stop",
        resetText: "Reset",
        lapText: "Ronde",
        hideText: "Verbergen",
        backText: "Terug",
        undoText: "Onged. maken",
        offText: "Uit",
        onText: "Aan",
        decimalSeparator: ",",
        thousandsSeparator: " "
    }, na.i18n.no = {
        setText: "OK",
        cancelText: "Avbryt",
        clearText: "Tømme",
        selectedText: "{count} valgt",
        dateFormat: "dd.mm.yy",
        dayNames: ["Søndag", "Mandag", "Tirsdag", "Onsdag", "Torsdag", "Fredag", "Lørdag"],
        dayNamesShort: ["Sø", "Ma", "Ti", "On", "To", "Fr", "Lø"],
        dayNamesMin: ["S", "M", "T", "O", "T", "F", "L"],
        dayText: "Dag",
        delimiter: ".",
        hourText: "Time",
        minuteText: "Minutt",
        monthNames: ["Januar", "Februar", "Mars", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Desember"],
        monthNamesShort: ["Jan", "Feb", "Mar", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Des"],
        monthText: "Måned",
        secText: "Sekund",
        timeFormat: "HH:ii",
        yearText: "År",
        nowText: "Nå",
        pmText: "pm",
        amText: "am",
        todayText: "I dag",
        firstDay: 1,
        dateText: "Dato",
        timeText: "Tid",
        closeText: "Lukk",
        allDayText: "Hele dagen",
        noEventsText: "Ingen hendelser",
        eventText: "Hendelse",
        eventsText: "Hendelser",
        moreEventsText: "{count} mere",
        fromText: "Start",
        toText: "End",
        wholeText: "Hele",
        fractionText: "Fraksjon",
        unitText: "Enhet",
        labels: ["År", "Måneder", "Dager", "Timer", "Minutter", "Sekunder", ""],
        labelsShort: ["År", "Mån", "Dag", "Time", "Min", "Sek", ""],
        startText: "Start",
        stopText: "Stopp",
        resetText: "Tilbakestille",
        lapText: "Runde",
        hideText: "Skjul",
        backText: "Tilbake",
        undoText: "Angre",
        offText: "Av",
        onText: "På",
        decimalSeparator: ",",
        thousandsSeparator: " "
    }, na.i18n.pl = {
        setText: "Zestaw",
        cancelText: "Anuluj",
        clearText: "Oczyścić",
        selectedText: "Wybór: {count}",
        dateFormat: "yy-mm-dd",
        dayNames: ["Niedziela", "Poniedziałek", "Wtorek", "Środa", "Czwartek", "Piątek", "Sobota"],
        dayNamesShort: ["Niedz.", "Pon.", "Wt.", "Śr.", "Czw.", "Pt.", "Sob."],
        dayNamesMin: ["N", "P", "W", "Ś", "C", "P", "S"],
        dayText: "Dzień",
        hourText: "Godziny",
        minuteText: "Minuty",
        monthNames: ["Styczeń", "Luty", "Marzec", "Kwiecień", "Maj", "Czerwiec", "Lipiec", "Sierpień", "Wrzesień", "Październik", "Listopad", "Grudzień"],
        monthNamesShort: ["Sty", "Lut", "Mar", "Kwi", "Maj", "Cze", "Lip", "Sie", "Wrz", "Paź", "Lis", "Gru"],
        monthText: "Miesiąc",
        secText: "Sekundy",
        timeFormat: "HH:ii",
        yearText: "Rok",
        nowText: "Teraz",
        amText: "am",
        pmText: "pm",
        todayText: "Dzisiaj",
        firstDay: 1,
        dateText: "Data",
        timeText: "Czas",
        closeText: "Zakończenie",
        allDayText: "Cały dzień",
        noEventsText: "Brak wydarzeń",
        eventText: "Wydarzeń",
        eventsText: "Wydarzenia",
        moreEventsText: "Jeszcze {count}",
        fromText: "Rozpoczęcie",
        toText: "Koniec",
        wholeText: "Cały",
        fractionText: "Ułamek",
        unitText: "Jednostka",
        labels: ["Lata", "Miesiąc", "Dni", "Godziny", "Minuty", "Sekundy", ""],
        labelsShort: ["R", "M", "Dz", "Godz", "Min", "Sek", ""],
        startText: "Rozpoczęcie",
        stopText: "Zatrzymać",
        resetText: "Zresetować",
        lapText: "Zakładka",
        hideText: "Ukryć",
        backText: "Wróć",
        undoText: "Cofnij",
        offText: "Wył",
        onText: "Wł",
        decimalSeparator: ",",
        thousandsSeparator: " "
    }, na.i18n["pt-BR"] = {
        setText: "Selecionar",
        cancelText: "Cancelar",
        clearText: "Claro",
        selectedText: "{count} selecionado",
        selectedPluralText: "{count} selecionados",
        dateFormat: "dd/mm/yy",
        dayNames: ["Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"],
        dayNamesShort: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"],
        dayNamesMin: ["D", "S", "T", "Q", "Q", "S", "S"],
        dayText: "Dia",
        hourText: "Hora",
        minuteText: "Minutos",
        monthNames: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"],
        monthNamesShort: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"],
        monthText: "Mês",
        secText: "Segundo",
        timeFormat: "HH:ii",
        yearText: "Ano",
        nowText: "Agora",
        pmText: "pm",
        amText: "am",
        todayText: "Hoje",
        dateText: "Data",
        timeText: "Tempo",
        closeText: "Fechar",
        allDayText: "Dia inteiro",
        noEventsText: "Nenhum evento",
        eventText: "Evento",
        eventsText: "Eventos",
        moreEventsText: "Mais {count}",
        fromText: "In&iacute;cio",
        toText: "Fim",
        wholeText: "Inteiro",
        fractionText: "Fração",
        unitText: "Unidade",
        labels: ["Anos", "Meses", "Dias", "Horas", "Minutos", "Segundos", ""],
        labelsShort: ["Ano", "M&ecirc;s", "Dia", "Hora", "Min", "Seg", ""],
        startText: "Começar",
        stopText: "Pare",
        resetText: "Reinicializar",
        lapText: "Lap",
        hideText: "Esconder",
        backText: "Anterior",
        undoText: "Desfazer",
        offText: "Desl",
        onText: "Lig",
        decimalSeparator: ",",
        thousandsSeparator: " "
    }, na.i18n["pt-PT"] = {
        setText: "Seleccionar",
        cancelText: "Cancelar",
        clearText: "Claro",
        selectedText: "{count} selecionado",
        selectedPluralText: "{count} selecionados",
        dateFormat: "dd-mm-yy",
        dayNames: ["Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"],
        dayNamesShort: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"],
        dayNamesMin: ["D", "S", "T", "Q", "Q", "S", "S"],
        dayText: "Dia",
        hourText: "Horas",
        minuteText: "Minutos",
        monthNames: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"],
        monthNamesShort: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"],
        monthText: "Mês",
        secText: "Segundo",
        timeFormat: "HH:ii",
        yearText: "Ano",
        nowText: "Actualizar",
        pmText: "pm",
        amText: "am",
        todayText: "Hoy",
        firstDay: 1,
        dateText: "Data",
        timeText: "Tempo",
        closeText: "Fechar",
        allDayText: "Todo o dia",
        noEventsText: "Nenhum evento",
        eventText: "Evento",
        eventsText: "Eventos",
        moreEventsText: "mais {count}",
        fromText: "Início",
        toText: "Fim",
        wholeText: "Inteiro",
        fractionText: "Fracção",
        unitText: "Unidade",
        labels: ["Anos", "Meses", "Dias", "Horas", "Minutos", "Segundos", ""],
        labelsShort: ["Ano", "Mês", "Dia", "Hora", "Min", "Seg", ""],
        startText: "Começar",
        stopText: "Parar",
        resetText: "Reinicializar",
        lapText: "Lap",
        hideText: "Esconder",
        backText: "Anterior",
        undoText: "Anular",
        offText: "Desl",
        onText: "Lig",
        decimalSeparator: ",",
        thousandsSeparator: " "
    }, na.i18n.ro = {
        setText: "Setare",
        cancelText: "Anulare",
        clearText: "Ştergere",
        selectedText: "{count} selectat",
        selectedPluralText: "{count} selectate",
        dateFormat: "dd.mm.yy",
        dayNames: ["Duminică", "Luni", "Marți", "Miercuri", "Joi", "Vineri", "Sâmbătă"],
        dayNamesShort: ["Du", "Lu", "Ma", "Mi", "Jo", "Vi", "Sâ"],
        dayNamesMin: ["D", "L", "M", "M", "J", "V", "S"],
        dayText: " Ziua",
        delimiter: ".",
        hourText: " Ore ",
        minuteText: "Minute",
        monthNames: ["Ianuarie", "Februarie", "Martie", "Aprilie", "Mai", "Iunie", "Iulie", "August", "Septembrie", "Octombrie", "Noiembrie", "Decembrie"],
        monthNamesShort: ["Ian.", "Feb.", "Mar.", "Apr.", "Mai", "Iun.", "Iul.", "Aug.", "Sept.", "Oct.", "Nov.", "Dec."],
        monthText: "Luna",
        secText: "Secunde",
        timeFormat: "HH:ii",
        yearText: "Anul",
        nowText: "Acum",
        amText: "am",
        pmText: "pm",
        todayText: "Astăzi",
        prevMonthText: "Luna anterioară",
        nextMonthText: "Luna următoare",
        prevYearText: "Anul anterior",
        nextYearText: "Anul următor",
        eventText: "Eveniment",
        eventsText: "Evenimente",
        allDayText: "Toată ziua",
        noEventsText: "Niciun eveniment",
        moreEventsText: "Încă unul",
        moreEventsPluralText: "Încă {count}",
        firstDay: 1,
        dateText: "Data",
        timeText: "Ora",
        closeText: "Închidere",
        fromText: "Start",
        toText: "Final",
        wholeText: "Complet",
        fractionText: "Parţial",
        unitText: "Unitate",
        labels: ["Ani", "Luni", "Zile", "Ore", "Minute", "Secunde", ""],
        labelsShort: ["Ani", "Luni", "Zile", "Ore", "Min.", "Sec.", ""],
        startText: "Start",
        stopText: "Stop",
        resetText: "Resetare",
        lapText: "Tură",
        hideText: "Ascundere",
        backText: "Înapoi",
        undoText: "Anulează",
        offText: "Nu",
        onText: "Da",
        decimalSeparator: ",",
        thousandsSeparator: " "
    }, na.i18n["ru-UA"] = {
        setText: "Установить",
        cancelText: "Отменить",
        clearText: "Очиститьr",
        selectedText: "{count} Вібрать",
        dateFormat: "dd.mm.yy",
        dayNames: ["воскресенье", "понедельник", "вторник", "среда", "четверг", "пятница", "суббота"],
        dayNamesShort: ["вс", "пн", "вт", "ср", "чт", "пт", "сб"],
        dayNamesMin: ["в", "п", "в", "с", "ч", "п", "с"],
        dayText: "День",
        delimiter: ".",
        hourText: "Часы",
        minuteText: "Минуты",
        monthNames: ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"],
        monthNamesShort: ["Янв.", "Февр.", "Март", "Апр.", "Май", "Июнь", "Июль", "Авг.", "Сент.", "Окт.", "Нояб.", "Дек."],
        monthText: "Месяцы",
        secText: "Сикунды",
        timeFormat: "HH:ii",
        yearText: "Год",
        nowText: "Сейчас",
        amText: "am",
        pmText: "pm",
        todayText: "Cегодня",
        firstDay: 1,
        dateText: "Дата",
        timeText: "Время",
        closeText: "Закрыть",
        allDayText: "Весь день",
        noEventsText: "Нет событий",
        eventText: "Мероприятия",
        eventsText: "Мероприятия",
        moreEventsText: "Ещё {count}",
        fromText: "Начало",
        toText: "Конец",
        wholeText: "Весь",
        fractionText: "Часть",
        unitText: "Единица",
        labels: ["Годы", " Месяцы ", " Дни ", " Часы ", " Минуты ", " Секунды", ""],
        labelsShort: ["Год", "Мес.", "Дн.", "Ч.", "Мин.", "Сек.", ""],
        startText: "Старт",
        stopText: "Стоп",
        resetText: " Сброс ",
        lapText: " Этап ",
        hideText: " Скрыть ",
        backText: "назад",
        undoText: "ОтменитЬ",
        offText: "O",
        onText: "I",
        decimalSeparator: ",",
        thousandsSeparator: " "
    }, na.i18n["ru-RU"] = na.i18n.ru = {
        setText: "Установить",
        cancelText: "Отмена",
        clearText: "Очистить",
        selectedText: "{count} Выбрать",
        dateFormat: "dd.mm.yy",
        dayNames: ["воскресенье", "понедельник", "вторник", "среда", "четверг", "пятница", "суббота"],
        dayNamesShort: ["вс", "пн", "вт", "ср", "чт", "пт", "сб"],
        dayNamesMin: ["в", "п", "в", "с", "ч", "п", "с"],
        dayText: "День",
        delimiter: ".",
        hourText: "Час",
        minuteText: "Минут",
        monthNames: ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"],
        monthNamesShort: ["Янв", "Фев", "Мар", "Апр", "Май", "Июн", "Июл", "Авг", "Сен", "Окт", "Ноя", "Дек"],
        monthText: "Месяц",
        secText: "Секунд",
        timeFormat: "HH:ii",
        yearText: "Год",
        nowText: "Сейчас",
        amText: "am",
        pmText: "pm",
        todayText: "Cегодня",
        firstDay: 1,
        dateText: "Дата",
        timeText: "Время",
        closeText: "Закрыть",
        allDayText: "Весь день",
        noEventsText: "Нет событий",
        eventText: "Мероприятия",
        eventsText: "Мероприятия",
        moreEventsText: "Ещё {count}",
        fromText: "Начало",
        toText: "Конец",
        wholeText: "Целое",
        fractionText: "Дробное",
        unitText: "Единица",
        labels: ["Лет", "Месяцев", "Дней", "Часов", "Минут", "Секунд", ""],
        labelsShort: ["Лет", "Мес", "Дн", "Час", "Мин", "Сек", ""],
        startText: "Старт",
        stopText: "Стоп",
        resetText: "Сбросить",
        lapText: "Круг",
        hideText: "Скрыть",
        backText: "назад",
        undoText: "ОтменитЬ",
        offText: "O",
        onText: "I",
        decimalSeparator: ",",
        thousandsSeparator: " "
    }, na.i18n.sk = {
        setText: "Zadaj",
        cancelText: "Zrušiť",
        clearText: "Vymazať",
        selectedText: "Označený: {count}",
        dateFormat: "d.m.yy",
        dayNames: ["Nedeľa", "Pondelok", "Utorok", "Streda", "Štvrtok", "Piatok", "Sobota"],
        dayNamesShort: ["Ne", "Po", "Ut", "St", "Št", "Pi", "So"],
        dayNamesMin: ["N", "P", "U", "S", "Š", "P", "S"],
        dayText: "Ďeň",
        hourText: "Hodiny",
        minuteText: "Minúty",
        monthNames: ["Január", "Február", "Marec", "Apríl", "Máj", "Jún", "Júl", "August", "September", "Október", "November", "December"],
        monthNamesShort: ["Jan", "Feb", "Mar", "Apr", "Máj", "Jún", "Júl", "Aug", "Sep", "Okt", "Nov", "Dec"],
        monthText: "Mesiac",
        secText: "Sekundy",
        timeFormat: "H:ii",
        yearText: "Rok",
        nowText: "Teraz",
        amText: "am",
        pmText: "pm",
        todayText: "Dnes",
        firstDay: 1,
        dateText: "Datum",
        timeText: "Čas",
        closeText: "Zavrieť",
        allDayText: "Celý deň",
        noEventsText: "Žiadne udalosti",
        eventText: "Udalostí",
        eventsText: "Udalosti",
        moreEventsText: "{count} ďalšia",
        moreEventsPluralText: "{count} ďalšie",
        fromText: "Začiatok",
        toText: "Koniec",
        wholeText: "Celý",
        fractionText: "Časť",
        unitText: "Jednotka",
        labels: ["Roky", "Mesiace", "Dni", "Hodiny", "Minúty", "Sekundy", ""],
        labelsShort: ["Rok", "Mes", "Dni", "Hod", "Min", "Sec", ""],
        startText: "Start",
        stopText: "Stop",
        resetText: "Resetovať",
        lapText: "Etapa",
        hideText: "Schovať",
        backText: "Späť",
        undoText: "Späť",
        offText: "O",
        onText: "I",
        decimalSeparator: ",",
        thousandsSeparator: " "
    }, na.i18n.sr = {
        setText: "Постави",
        cancelText: "Откажи",
        clearText: "Обриши",
        selectedText: "{count} изабрана",
        dateFormat: "dd.mm.yy",
        dayNames: ["Недеља", "Понедељак", "Уторак", "Среда", "Четвртак", "Петак", "Субота"],
        dayNamesShort: ["Нед", "Пон", "Уто", "Сре", "Чет", "Пет", "Суб"],
        dayNamesMin: ["Не", "По", "Ут", "Ср", "Че", "Пе", "Су"],
        dayText: "Дан",
        delimiter: ".",
        hourText: "Час",
        minuteText: "Минут",
        monthNames: ["Јануар", "Фебруар", "Март", "Април", "Мај", "Јун", "Јул", "Август", "Септембар", "Октобар", "Новембар", "Децембар"],
        monthNamesShort: ["Јан", "Феб", "Мар", "Апр", "Мај", "Јун", "Јул", "Авг", "Сеп", "Окт", "Нов", "Дец"],
        monthText: "месец",
        secText: "Секунд",
        timeFormat: "H:ii",
        yearText: "година",
        nowText: "сада",
        pmText: "pm",
        amText: "am",
        firstDay: 1,
        dateText: "Датум",
        timeText: "време",
        todayText: "Данас",
        prevMonthText: "Претходни мјесец",
        nextMonthText: "Следећег месеца",
        prevYearText: "Претходна године",
        nextYearText: "Следеће године",
        closeText: "Затвори",
        eventText: "Догађај",
        eventsText: "Догађаји",
        allDayText: "Цео дан",
        noEventsText: "Нема догађаја",
        moreEventsText: "Још {count}",
        fromText: "Од",
        toText: "До",
        wholeText: "цео",
        fractionText: "Фракција",
        unitText: "единица",
        labels: ["Године", "Месеци", "Дана", "Сати", "Минута", "Секунди", ""],
        labelsShort: ["Год", "Мес", "Дана", "Сати", "Мину", "Секу", ""],
        startText: "Започни",
        stopText: "Стоп",
        resetText: "Ресетуј",
        lapText: "Круг",
        hideText: "Сакрити",
        backText: "Повратак",
        undoText: "Опозови",
        offText: "нe",
        onText: "да",
        decimalSeparator: ",",
        thousandsSeparator: " "
    }, na.i18n.sv = {
        setText: "OK",
        cancelText: "Avbryt",
        clearText: "Klara",
        selectedText: "{count} vald",
        dateFormat: "yy-mm-dd",
        dayNames: ["Söndag", "Måndag", "Tisdag", "Onsdag", "Torsdag", "Fredag", "Lördag"],
        dayNamesShort: ["Sö", "Må", "Ti", "On", "To", "Fr", "Lö"],
        dayNamesMin: ["S", "M", "T", "O", "T", "F", "L"],
        dayText: "Dag",
        hourText: "Timme",
        minuteText: "Minut",
        monthNames: ["Januari", "Februari", "Mars", "April", "Maj", "Juni", "Juli", "Augusti", "September", "Oktober", "November", "December"],
        monthNamesShort: ["Jan", "Feb", "Mar", "Apr", "Maj", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dec"],
        monthText: "Månad",
        secText: "Sekund",
        timeFormat: "HH:ii",
        yearText: "År",
        nowText: "Nu",
        pmText: "pm",
        amText: "am",
        todayText: "I dag",
        firstDay: 1,
        dateText: "Datum",
        timeText: "Tid",
        closeText: "Stäng",
        allDayText: "Heldag",
        noEventsText: "Inga aktiviteter",
        eventText: "Händelse",
        eventsText: "Händelser",
        moreEventsText: "{count} till",
        fromText: "Start",
        toText: "Slut",
        wholeText: "Hela",
        fractionText: "Bråk",
        unitText: "Enhet",
        labels: ["År", "Månader", "Dagar", "Timmar", "Minuter", "Sekunder", ""],
        labelsShort: ["År", "Mån", "Dag", "Tim", "Min", "Sek", ""],
        startText: "Start",
        stopText: "Stopp",
        resetText: "Återställ",
        lapText: "Varv",
        hideText: "Dölj",
        backText: "Tillbaka",
        undoText: "Ångra",
        offText: "Av",
        onText: "På"
    }, na.i18n.th = {
        setText: "ตั้งค่า",
        cancelText: "ยกเลิก",
        clearText: "ล้าง",
        selectedText: "{count} เลือก",
        dateFormat: "dd/mm/yy",
        dayNames: ["อาทิตย์", "จันทร์", "อังคาร", "พุธ", "พฤหัสบดี", "ศุกร์", "เสาร์"],
        dayNamesShort: ["อา.", "จ.", "อ.", "พ.", "พฤ.", "ศ.", "ส."],
        dayNamesMin: ["อา.", "จ.", "อ.", "พ.", "พฤ.", "ศ.", "ส."],
        dayText: "วัน",
        delimiter: ".",
        hourText: "ชั่วโมง",
        minuteText: "นาที",
        monthNames: ["มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน", "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"],
        monthNamesShort: ["ม.ค.", "ก.พ.", "มี.ค.", "เม.ย.", "พ.ค.", "มิ.ย.", "ก.ค.", "ส.ค.", "ก.ย.", "ต.ค.", "พ.ย.", "ธ.ค."],
        monthText: "เดือน",
        secText: "วินาที",
        timeFormat: "HH:ii",
        yearText: "ปี",
        nowText: "ตอนนี้",
        pmText: "pm",
        amText: "am",
        firstDay: 0,
        dateText: "วัน",
        timeText: "เวลา",
        today: "วันนี้",
        prevMonthText: "เดือนก่อนหน้า",
        nextMonthText: "เดือนถัดไป",
        prevYearText: "ปีก่อนหน้า",
        nextYearText: "ปีถัดไป",
        closeText: "ปิด",
        eventText: "เหตุการณ์",
        eventsText: "เหตุการณ์",
        allDayText: "ตลอดวัน",
        noEventsText: "ไม่มีกิจกรรม",
        moreEventsText: "อีก {count} กิจกรรม",
        fromText: "จาก",
        toText: "ถึง",
        wholeText: "ทั้งหมด",
        fractionText: "เศษส่วน",
        unitText: "หน่วย",
        labels: ["ปี", "เดือน", "วัน", "ชั่วโมง", "นาที", "วินาที", ""],
        labelsShort: ["ปี", "เดือน", "วัน", "ชั่วโมง", "นาที", "วินาที", ""],
        startText: "เริ่ม",
        stopText: "หยุด",
        resetText: "รีเซ็ต",
        lapText: "รอบ",
        hideText: "ซ่อน",
        backText: "ย้อนกลับ",
        undoText: "เลิกทา",
        offText: "ปิด",
        onText: "เปิด",
        decimalSeparator: ",",
        thousandsSeparator: " "
    }, na.i18n.tr = {
        setText: "Seç",
        cancelText: "İptal",
        clearText: "Temizleyin",
        selectedText: "{count} seçilmiş",
        dateFormat: "dd.mm.yy",
        dayNames: ["Pazar", "Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi"],
        dayNamesShort: ["Paz", "Pzt", "Sal", "Çar", "Per", "Cum", "Cmt"],
        dayNamesMin: ["P", "P", "S", "Ç", "P", "C", "C"],
        dayText: "Gün",
        delimiter: ".",
        hourText: "Saat",
        minuteText: "Dakika",
        monthNames: ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"],
        monthNamesShort: ["Oca", "Şub", "Mar", "Nis", "May", "Haz", "Tem", "Ağu", "Eyl", "Eki", "Kas", "Ara"],
        monthText: "Ay",
        secText: "Saniye",
        timeFormat: "HH:ii",
        yearText: "Yıl",
        nowText: "Şimdi",
        pmText: "pm",
        amText: "am",
        todayText: "Bugün",
        firstDay: 1,
        dateText: "Tarih",
        timeText: "Zaman",
        closeText: "Kapatmak",
        allDayText: "Tüm gün",
        noEventsText: "Etkinlik Yok",
        eventText: "Etkinlik",
        eventsText: "Etkinlikler",
        moreEventsText: "{count} tane daha",
        fromText: "Başla",
        toText: "Son",
        wholeText: "Tam",
        fractionText: "Kesir",
        unitText: "Birim",
        labels: ["Yıl", "Ay", "Gün", "Saat", "Dakika", "Saniye", ""],
        labelsShort: ["Yıl", "Ay", "Gün", "Sa", "Dak", "Sn", ""],
        startText: "Başla",
        stopText: "Durdur",
        resetText: "Sıfırla",
        lapText: "Tur",
        hideText: "Gizle",
        backText: "Geri",
        undoText: "Geri Al",
        offText: "O",
        onText: "I",
        decimalSeparator: ",",
        thousandsSeparator: "."
    }, na.i18n.ua = {
        setText: "встановити",
        cancelText: "відміна",
        clearText: "очистити",
        selectedText: "{count} вибрані",
        dateFormat: "dd.mm.yy",
        dayNames: ["неділя", "понеділок", "вівторок", "середа", "четвер", "п’ятниця", "субота"],
        dayNamesShort: ["нед", "пнд", "вів", "срд", "чтв", "птн", "сбт"],
        dayNamesMin: ["Нд", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"],
        dayText: "День",
        delimiter: ".",
        hourText: "година",
        minuteText: "хвилина",
        monthNames: ["Січень", "Лютий", "Березень", "Квітень", "Травень", "Червень", "Липень", "Серпень", "Вересень", "Жовтень", "Листопад", "Грудень"],
        monthNamesShort: ["Січ", "Лют", "Бер", "Кві", "Тра", "Чер", "Лип", "Сер", "Вер", "Жов", "Лис", "Гру"],
        monthText: "Місяць",
        secText: "Секунд",
        timeFormat: "H:ii",
        yearText: "Рік",
        nowText: "Зараз",
        pmText: "pm",
        amText: "am",
        firstDay: 1,
        dateText: "дата",
        timeText: "Час",
        todayText: "Сьогодні",
        prevMonthText: "Попередній місяць",
        nextMonthText: "Наступного місяця",
        prevYearText: "Попередній рік",
        nextYearText: "Наступного року",
        closeText: "Закрити",
        eventText: "подія",
        eventsText: "події",
        allDayText: "Увесь день",
        noEventsText: "Жодної події",
        moreEventsText: "та ще {count}",
        fromText: "від",
        toText: "кінець",
        wholeText: "всі",
        fractionText: "фракція",
        unitText: "одиниця",
        labels: ["Рік", "Місяць", "День", "година", "хвилина", "Секунд", ""],
        labelsShort: ["Рік", "Місяць", "День", "година", "хвилина", "Секунд", ""],
        startText: "Початок",
        stopText: "СТОП",
        resetText: "скинути",
        lapText: "коло",
        hideText: "сховати",
        backText: "назад",
        undoText: "відмінити",
        offText: "Вимикати",
        onText: "Увімкнути",
        decimalSeparator: ",",
        thousandsSeparator: " "
    }, na.i18n.vi = {
        setText: "Đặt",
        cancelText: "Hủy bò",
        clearText: "Xóa",
        selectedText: "{count} chọn",
        dateFormat: "dd/mm/yy",
        dayNames: ["Chủ Nhật", "Thứ Hai", "Thứ Ba", "Thứ Tư", "Thứ Năm", "Thứ Sáu", "Thứ Bảy"],
        dayNamesShort: ["CN", "T2", "T3", "T4", "T5", "T6", "T7"],
        dayNamesMin: ["CN", "T2", "T3", "T4", "T5", "T6", "T7"],
        dayText: "",
        delimiter: "/",
        hourText: "Giờ",
        minuteText: "Phút",
        monthNames: ["Tháng Một", "Tháng Hai", "Tháng Ba", "Tháng Tư", "Tháng Năm", "Tháng Sáu", "Tháng Bảy", "Tháng Tám", "Tháng Chín", "Tháng Mười", "Tháng Mười Một", "Tháng Mười Hai"],
        monthNamesShort: ["Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6", "Tháng 7", "Tháng 8", "Tháng 9", "Tháng 10", "Tháng 11", "Tháng 12"],
        monthText: "Tháng",
        secText: "Giây",
        timeFormat: "H:ii",
        yearText: "Năm",
        nowText: "Bây giờ",
        pmText: "pm",
        amText: "am",
        firstDay: 0,
        dateText: "Ngày",
        timeText: "Hồi",
        todayText: "Hôm nay",
        prevMonthText: "Tháng trước",
        nextMonthText: "Tháng tới",
        prevYearText: "Măm trước",
        nextYearText: "Năm tới",
        closeText: "Đóng",
        eventText: "Sự kiện",
        eventsText: "Sự kiện",
        allDayText: "Cả ngày",
        noEventsText: "Không có sự kiện",
        moreEventsText: "{count} thẻ khác",
        fromText: "Từ",
        toText: "Tới",
        wholeText: "Toàn thể",
        fractionText: "Phân số",
        unitText: "đơn vị",
        labels: ["Năm", "Tháng", "Ngày", "Giờ", "Phút", "Giây", ""],
        labelsShort: ["Năm", "Tháng", "Ngày", "Giờ", "Phút", "Giây", ""],
        startText: "Bắt đầu",
        stopText: "Dừng",
        resetText: "Đặt lại",
        lapText: "Vòng",
        hideText: "Giấu",
        backText: "Quay lại",
        undoText: "Hoàn tác",
        offText: "Tất",
        onText: "Bật",
        decimalSeparator: ",",
        thousandsSeparator: " "
    }, na.i18n.zh = {
        setText: "确定",
        cancelText: "取消",
        clearText: "明确",
        selectedText: "{count} 选",
        dateFormat: "yy年mm月d日",
        dayNames: ["周日", "周一", "周二", "周三", "周四", "周五", "周六"],
        dayNamesShort: ["日", "一", "二", "三", "四", "五", "六"],
        dayNamesMin: ["日", "一", "二", "三", "四", "五", "六"],
        dayText: "日",
        hourText: "时",
        minuteText: "分",
        monthNames: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
        monthNamesShort: ["一", "二", "三", "四", "五", "六", "七", "八", "九", "十", "十一", "十二"],
        monthText: "月",
        secText: "秒",
        timeFormat: "HH:ii",
        yearText: "年",
        nowText: "当前",
        pmText: "下午",
        amText: "上午",
        yearSuffix: "年",
        monthSuffix: "月",
        daySuffix: "日",
        todayText: "今天",
        dateText: "日",
        timeText: "时间",
        closeText: "关闭",
        allDayText: "全天",
        noEventsText: "无事件",
        eventText: "活动",
        eventsText: "活动",
        moreEventsText: "他 {count} 件",
        fromText: "开始时间",
        toText: "结束时间",
        wholeText: "合计",
        fractionText: "分数",
        unitText: "单位",
        labels: ["年", "月", "日", "小时", "分钟", "秒", ""],
        labelsShort: ["年", "月", "日", "点", "分", "秒", ""],
        startText: "开始",
        stopText: "停止",
        resetText: "重置",
        lapText: "圈",
        hideText: "隐藏",
        backText: "返回",
        undoText: "复原",
        offText: "关闭",
        onText: "开启",
        decimalSeparator: ",",
        thousandsSeparator: " "
    };
    var An = na.themes;
    An.frame.bootstrap = {
        disabledClass: "disabled",
        selectedClass: "btn-primary",
        selectedTabClass: "active",
        tabLink: !0,
        todayClass: "text-primary mbsc-cal-today",
        onMarkupInserted: function (e) {
            var t = fa(e.target), a = fa(".mbsc-cal-tabs", t);
            fa(".mbsc-fr-popup", t).addClass("popover"), fa(".mbsc-fr-w", t).addClass("popover-content"), fa(".mbsc-fr-hdr", t).addClass("popover-title popover-header"), fa(".mbsc-fr-arr-i", t).addClass("popover"), fa(".mbsc-fr-arr", t).addClass("arrow"), fa(".mbsc-fr-btn", t).addClass("btn btn-default btn-secondary"), fa(".mbsc-fr-btn-s .mbsc-fr-btn", t).removeClass("btn-default btn-secondary").addClass("btn btn-primary"), a.addClass("nav nav-tabs"), a.find(".mbsc-cal-tab").addClass("nav-item"), a.find("a").addClass("nav-link"), a.find(".mbsc-cal-tab.active .nav-link").addClass("active"), fa(".mbsc-cal-picker", t).addClass("popover"), fa(".mbsc-range-btn", t).addClass("btn btn-sm btn-small btn-default"), fa(".mbsc-np-btn", t).addClass("btn btn-default"), fa(".mbsc-sel-filter-cont", t).removeClass("mbsc-input"), fa(".mbsc-sel-filter-input", t).addClass("form-control")
        },
        onTabChange: function (e, t) {
            fa(".mbsc-cal-tabs .nav-link", t._markup).removeClass("active"), fa(".mbsc-cal-tab.active .nav-link", t._markup).addClass("active")
        },
        onPosition: function (e) {
            setTimeout(function () {
                fa(".mbsc-fr-bubble-top, .mbsc-fr-bubble-top .mbsc-fr-arr-i", e.target).removeClass("bottom bs-popover-bottom").addClass("top bs-popover-top"), fa(".mbsc-fr-bubble-bottom, .mbsc-fr-bubble-bottom .mbsc-fr-arr-i", e.target).removeClass("top bs-popover-top").addClass("bottom  bs-popover-bottom")
            }, 10)
        }
    }, An.scroller.bootstrap = ba({}, An.frame.bootstrap, {
        dateDisplay: "Mddyy",
        btnCalPrevClass: "mbsc-ic mbsc-ic-arrow-left5",
        btnCalNextClass: "mbsc-ic mbsc-ic-arrow-right5",
        btnPlusClass: "mbsc-ic mbsc-ic-arrow-down5 btn-light",
        btnMinusClass: "mbsc-ic mbsc-ic-arrow-up5 btn-light",
        selectedLineHeight: !0,
        onEventBubbleShow: function (e) {
            var t = fa(e.eventList);
            fa(".mbsc-cal-event-list", t).addClass("list-group"), fa(".mbsc-cal-event", t).addClass("list-group-item")
        }
    }), An.navigation.bootstrap = {
        wrapperClass: "popover panel panel-default",
        groupClass: "btn-group",
        activeClass: "btn-primary",
        disabledClass: "disabled",
        itemClass: "btn btn-default"
    }, An.form.bootstrap = {};
    var En = na.themes;

    function Fn(e, t) {
        var a = da(t, "X", !0), n = da(t, "Y", !0), s = e[0], i = e.offset(), o = a - i.left, r = n - i.top,
            l = Math.max(o, s.offsetWidth - o), c = Math.max(r, s.offsetHeight - r),
            m = 2 * Math.sqrt(Math.pow(l, 2) + Math.pow(c, 2));
        In($n), $n = fa('<span class="mbsc-ripple"></span>').css({
            backgroundColor: getComputedStyle(s).color,
            width: m,
            height: m,
            top: n - i.top - m / 2,
            left: a - i.left - m / 2
        }).appendTo(e), setTimeout(function () {
            $n.addClass("mbsc-ripple-scaled mbsc-ripple-visible")
        }, 10)
    }

    function In(e) {
        setTimeout(function () {
            e && (e.removeClass("mbsc-ripple-visible"), setTimeout(function () {
                e.remove()
            }, 2e3))
        }, 100)
    }

    function Hn(e, t, a, n) {
        var s, i;
        e.off(".mbsc-ripple").on("touchstart.mbsc-ripple mousedown.mbsc-ripple", t, function (e) {
            ga(e, this) && (s = da(e, "X"), i = da(e, "Y"), (Pn = fa(this)).hasClass(a) || Pn.hasClass(n) ? Pn = null : Fn(Pn, e))
        }).on("touchmove.mbsc-ripple mousemove.mbsc-ripple", t, function (e) {
            (Pn && 9 < Math.abs(da(e, "X") - s) || 9 < Math.abs(da(e, "Y") - i)) && (In($n), Pn = null)
        }).on("touchend.mbsc-ripple touchcancel.mbsc-ripple mouseleave.mbsc-ripple mouseup.mbsc-ripple", t, function () {
            Pn && (setTimeout(function () {
                In($n)
            }, 100), Pn = null)
        })
    }

    En.frame.ios = {
        display: "bottom",
        headerText: !1,
        btnWidth: !1,
        deleteIcon: "ios-backspace",
        scroll3d: "wp" != n && ("android" != n || 7 < l)
    }, En.scroller.ios = ba({}, En.frame.ios, {
        rows: 5,
        height: 34,
        minWidth: 55,
        selectedLineHeight: !0,
        selectedLineBorder: 1,
        showLabel: !1,
        useShortLabels: !0,
        btnPlusClass: "mbsc-ic mbsc-ic-arrow-down5",
        btnMinusClass: "mbsc-ic mbsc-ic-arrow-up5",
        checkIcon: "ion-ios7-checkmark-empty",
        filterClearIcon: "ion-close-circled",
        dateDisplay: "MMdyy",
        btnCalPrevClass: "mbsc-ic mbsc-ic-arrow-left5",
        btnCalNextClass: "mbsc-ic mbsc-ic-arrow-right5"
    }), En.listview.ios = {
        leftArrowClass: "mbsc-ic-ion-ios7-arrow-back",
        rightArrowClass: "mbsc-ic-ion-ios7-arrow-forward"
    }, En.form.ios = {};
    var Pn, $n, Ln = na.themes;
    Ln.frame.material = {
        headerText: !1, btnWidth: !1, deleteIcon: "material-backspace", onMarkupReady: function (e) {
            Hn(fa(e.target), ".mbsc-fr-btn-e", "mbsc-disabled", "mbsc-fr-btn-nhl")
        }
    }, Ln.scroller.material = ba({}, Ln.frame.material, {
        showLabel: !1,
        selectedLineBorder: 2,
        weekDays: "min",
        icon: {filled: "material-star", empty: "material-star-outline"},
        checkIcon: "material-check",
        btnPlusClass: "mbsc-ic mbsc-ic-material-keyboard-arrow-down",
        btnMinusClass: "mbsc-ic mbsc-ic-material-keyboard-arrow-up",
        btnCalPrevClass: "mbsc-ic mbsc-ic-material-keyboard-arrow-left",
        btnCalNextClass: "mbsc-ic mbsc-ic-material-keyboard-arrow-right"
    }), Ln.listview.material = {
        leftArrowClass: "mbsc-ic-material-keyboard-arrow-left",
        rightArrowClass: "mbsc-ic-material-keyboard-arrow-right",
        onItemActivate: function (e) {
            Fn(fa(e.target), e.domEvent)
        },
        onItemDeactivate: function () {
            In($n)
        },
        onSlideStart: function (e) {
            fa(".mbsc-ripple", e.target).remove()
        },
        onSortStart: function (e) {
            fa(".mbsc-ripple", e.target).remove()
        }
    }, Ln.navigation.material = {
        onInit: function () {
            Hn(fa(this), ".mbsc-ms-item.mbsc-btn-e", "mbsc-disabled", "mbsc-btn-nhl")
        }, onMarkupInit: function () {
            fa(".mbsc-ripple", this).remove()
        }, onDestroy: function () {
            fa(this).off(".mbsc-ripple")
        }
    }, Ln.form.material = {
        addRipple: function (e, t) {
            Fn(e, t)
        }, removeRipple: function () {
            In($n)
        }
    };
    var On = na.themes;
    On.frame.windows = {
        headerText: !1,
        deleteIcon: "backspace4",
        btnReverse: !0
    }, On.scroller.windows = ba({}, On.frame.windows, {
        rows: 6,
        minWidth: 88,
        height: 44,
        btnPlusClass: "mbsc-ic mbsc-ic-arrow-down5",
        btnMinusClass: "mbsc-ic mbsc-ic-arrow-up5",
        checkIcon: "material-check",
        dateDisplay: "MMdyy",
        showLabel: !1,
        showScrollArrows: !0,
        btnCalPrevClass: "mbsc-ic mbsc-ic-arrow-left5",
        btnCalNextClass: "mbsc-ic mbsc-ic-arrow-right5",
        dayNamesShort: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
        useShortLabels: !0
    }), On.form.windows = {}, na.customTheme("ios-dark", "ios"), na.customTheme("material-dark", "material"), na.customTheme("mobiscroll-dark", "mobiscroll"), na.customTheme("windows-dark", "windows");
    var Yn = na.themes, zn = "mobiscroll";
    return "android" == n ? zn = "material" : "ios" == n ? zn = "ios" : "wp" == n && (zn = "windows"), fa.each(Yn.frame, function (e, t) {
        if (zn && t.baseTheme == zn && e != zn + "-dark") return na.autoTheme = e, !1;
        e == zn && (na.autoTheme = e)
    }), na.customTheme("ios-gray", "ios"), na.customTheme("material-indigo", "material"), na.customTheme("mobiscroll-lime", "mobiscroll"), na.customTheme("windows-yellow", "windows"), na.apiKey = "mbscdemo", na.apiUrl = "https://trial.mobiscroll.com/", na.customTheme("material-blue", "material"), na
}(jQuery, angular);
;
mobiscroll.apiKey = "mbscdemo";
mobiscroll.apiUrl = "https://trial.mobiscroll.com/";
if ("undefined" == typeof jQuery) throw new Error("Bootstrap requires jQuery");
!function (n)
{
    "use strict";
    n.fn.emulateTransitionEnd = function (t) {
        var i = !1, r = this;
        n(this).one(n.support.transition.end, function () {
            i = !0
        });
        return setTimeout(function () {
            i || n(r).trigger(n.support.transition.end)
        }, t), this
    };
    n(function () {
        n.support.transition = function () {
            var i = document.createElement("bootstrap"), n = {
                WebkitTransition: "webkitTransitionEnd",
                MozTransition: "transitionend",
                OTransition: "oTransitionEnd otransitionend",
                transition: "transitionend"
            };
            for (var t in n) if (void 0 !== i.style[t]) return {end: n[t]}
        }()
    })
}(jQuery), function (n)
{
    "use strict";
    var t = function (i, r) {
        this.$element = n(i);
        this.options = n.extend({}, t.DEFAULTS, r);
        this.transitioning = null;
        this.options.parent && (this.$parent = n(this.options.parent));
        this.options.toggle && this.toggle()
    }, i;
    t.DEFAULTS = {toggle: !0};
    t.prototype.dimension = function () {
        return this.$element.hasClass("width") ? "width" : "height"
    };
    t.prototype.show = function () {
        var u, t, r, i, f, e;
        if (!this.transitioning && !this.$element.hasClass("in") && (u = n.Event("show.bs.collapse"), this.$element.trigger(u), !u.isDefaultPrevented())) {
            if (t = this.$parent && this.$parent.find("> .panel > .in"), t && t.length) {
                if (r = t.data("bs.collapse"), r && r.transitioning) return;
                t.collapse("hide");
                r || t.data("bs.collapse", null)
            }
            if (i = this.dimension(), this.$element.removeClass("collapse").addClass("collapsing")[i](0), this.transitioning = 1, f = function () {
                this.$element.removeClass("collapsing").addClass("in")[i]("auto");
                this.transitioning = 0;
                this.$element.trigger("shown.bs.collapse")
            }, !n.support.transition) return f.call(this);
            e = n.camelCase(["scroll", i].join("-"));
            this.$element.one(n.support.transition.end, n.proxy(f, this)).emulateTransitionEnd(350)[i](this.$element[0][e])
        }
    };
    t.prototype.hide = function () {
        var i, t, r;
        if (!this.transitioning && this.$element.hasClass("in") && (i = n.Event("hide.bs.collapse"), this.$element.trigger(i), !i.isDefaultPrevented())) {
            if (t = this.dimension(), this.$element[t](this.$element[t]())[0].offsetHeight, this.$element.addClass("collapsing").removeClass("collapse").removeClass("in"), this.transitioning = 1, r = function () {
                this.transitioning = 0;
                this.$element.trigger("hidden.bs.collapse").removeClass("collapsing").addClass("collapse")
            }, !n.support.transition) return r.call(this);
            this.$element[t](0).one(n.support.transition.end, n.proxy(r, this)).emulateTransitionEnd(350)
        }
    };
    t.prototype.toggle = function () {
        this[this.$element.hasClass("in") ? "hide" : "show"]()
    };
    i = n.fn.collapse;
    n.fn.collapse = function (i) {
        return this.each(function () {
            var r = n(this), u = r.data("bs.collapse"),
                f = n.extend({}, t.DEFAULTS, r.data(), "object" == typeof i && i);
            u || r.data("bs.collapse", u = new t(this, f));
            "string" == typeof i && u[i]()
        })
    };
    n.fn.collapse.Constructor = t;
    n.fn.collapse.noConflict = function () {
        return n.fn.collapse = i, this
    };
    n(document).on("click.bs.collapse.data-api", "[data-toggle=collapse]", function (t) {
        var e, i = n(this),
            s = i.attr("data-target") || t.preventDefault() || (e = i.attr("href")) && e.replace(/.*(?=#[^\s]+$)/, ""),
            r = n(s), u = r.data("bs.collapse"), h = u ? "toggle" : i.data(), f = i.attr("data-parent"), o = f && n(f);
        u && u.transitioning || (o && o.find('[data-toggle=collapse][data-parent="' + f + '"]').not(i).addClass("collapsed"), i[r.hasClass("in") ? "addClass" : "removeClass"]("collapsed"));
        r.collapse(h)
    })
}(jQuery), function (n)
{
    "use strict";

    function t(t) {
        n(t).on("click.bs.dropdown", this.toggle)
    }

    function r() {
        n(".dropdown-backdrop").remove();
        n(i).each(function (t) {
            var i = u(n(this));
            i.hasClass("open") && (i.trigger(t = n.Event("hide.bs.dropdown")), t.isDefaultPrevented() || i.removeClass("open").trigger("hidden.bs.dropdown"))
        })
    }

    function u(t) {
        var i = t.attr("data-target"),
            r = (i = i || (i = t.attr("href")) && /#/.test(i) && i.replace(/.*(?=#[^\s]*$)/, "")) && n(i);
        return r && r.length ? r : t.parent()
    }

    var i = "[data-toggle=dropdown]", f;
    t.prototype.toggle = function (t) {
        var f = n(this), i, e;
        if (!f.is(".disabled, :disabled")) {
            if (i = u(f), e = i.hasClass("open"), r(), !e) {
                if ("ontouchstart" in document.documentElement && !i.closest(".navbar-nav").length && n('<div class="dropdown-backdrop"/>').insertAfter(n(this)).on("click", r), i.trigger(t = n.Event("show.bs.dropdown")), t.isDefaultPrevented()) return;
                i.toggleClass("open").trigger("shown.bs.dropdown");
                f.focus()
            }
            return !1
        }
    };
    t.prototype.keydown = function (t) {
        var e, o, s, f, r;
        if (/(38|40|27)/.test(t.keyCode) && (e = n(this), t.preventDefault(), t.stopPropagation(), !e.is(".disabled, :disabled"))) {
            if (o = u(e), s = o.hasClass("open"), !s || s && 27 == t.keyCode) return 27 == t.which && o.find(i).focus(), e.click();
            f = n("[role=menu] li:not(.divider):visible a", o);
            f.length && (r = f.index(f.filter(":focus")), 38 == t.keyCode && 0 < r && r--, 40 == t.keyCode && r < f.length - 1 && r++, ~r || (r = 0), f.eq(r).focus())
        }
    };
    f = n.fn.dropdown;
    n.fn.dropdown = function (i) {
        return this.each(function () {
            var r = n(this), u = r.data("bs.dropdown");
            u || r.data("bs.dropdown", u = new t(this));
            "string" == typeof i && u[i].call(r)
        })
    };
    n.fn.dropdown.Constructor = t;
    n.fn.dropdown.noConflict = function () {
        return n.fn.dropdown = f, this
    };
    n(document).on("click.bs.dropdown.data-api", r).on("click.bs.dropdown.data-api", ".dropdown form", function (n) {
        n.stopPropagation()
    }).on("click.bs.dropdown.data-api", i, t.prototype.toggle).on("keydown.bs.dropdown.data-api", i + ", [role=menu]", t.prototype.keydown)
}(jQuery), function (n)
{
    "use strict";
    var t = function (i, r) {
        this.options = n.extend({}, t.DEFAULTS, r);
        this.$window = n(window).on("scroll.bs.affix.data-api", n.proxy(this.checkPosition, this)).on("click.bs.affix.data-api", n.proxy(this.checkPositionWithEventLoop, this));
        this.$element = n(i);
        this.affixed = this.unpin = null;
        this.checkPosition()
    }, i;
    t.RESET = "affix affix-top affix-bottom";
    t.DEFAULTS = {offset: 0};
    t.prototype.checkPositionWithEventLoop = function () {
        setTimeout(n.proxy(this.checkPosition, this), 1)
    };
    t.prototype.checkPosition = function () {
        var i;
        if (this.$element.is(":visible")) {
            var s = n(document).height(), e = this.$window.scrollTop(), o = this.$element.offset(),
                r = this.options.offset, f = r.top, u = r.bottom;
            "object" != typeof r && (u = f = r);
            "function" == typeof f && (f = r.top());
            "function" == typeof u && (u = r.bottom());
            i = !(null != this.unpin && e + this.unpin <= o.top) && (null != u && o.top + this.$element.height() >= s - u ? "bottom" : null != f && e <= f && "top");
            this.affixed !== i && (this.unpin && this.$element.css("top", ""), this.affixed = i, this.unpin = "bottom" == i ? o.top - e : null, this.$element.removeClass(t.RESET).addClass("affix" + (i ? "-" + i : "")), "bottom" == i && this.$element.offset({top: document.body.offsetHeight - u - this.$element.height()}))
        }
    };
    i = n.fn.affix;
    n.fn.affix = function (i) {
        return this.each(function () {
            var u = n(this), r = u.data("bs.affix"), f = "object" == typeof i && i;
            r || u.data("bs.affix", r = new t(this, f));
            "string" == typeof i && r[i]()
        })
    };
    n.fn.affix.Constructor = t;
    n.fn.affix.noConflict = function () {
        return n.fn.affix = i, this
    };
    n(window).on("load", function () {
        n('[data-spy="affix"]').each(function () {
            var i = n(this), t = i.data();
            t.offset = t.offset || {};
            t.offsetBottom && (t.offset.bottom = t.offsetBottom);
            t.offsetTop && (t.offset.top = t.offsetTop);
            i.affix(t)
        })
    })
}(jQuery), function (n)
{
    "use strict";

    function t(t) {
        this.element = n(t)
    }

    t.prototype.show = function () {
        var t = this.element, e = t.closest("ul:not(.dropdown-menu)"), i = t.data("target"), r, u, f;
        (i = i || (i = t.attr("href")) && i.replace(/.*(?=#[^\s]*$)/, ""), t.parent("li").hasClass("active")) || (r = e.find(".active:last a")[0], u = n.Event("show.bs.tab", {relatedTarget: r}), (t.trigger(u), u.isDefaultPrevented()) || (f = n(i), this.activate(t.parent("li"), e), this.activate(f, f.parent(), function () {
            t.trigger({type: "shown.bs.tab", relatedTarget: r})
        })))
    };
    t.prototype.activate = function (t, i, r) {
        function e() {
            u.removeClass("active").find("> .dropdown-menu > .active").removeClass("active");
            t.addClass("active");
            f ? (t[0].offsetWidth, t.addClass("in")) : t.removeClass("fade");
            t.parent(".dropdown-menu") && t.closest("li.dropdown").addClass("active");
            r && r()
        }

        var u = i.find("> .active"), f = r && n.support.transition && u.hasClass("fade");
        f ? u.one(n.support.transition.end, e).emulateTransitionEnd(150) : e();
        u.removeClass("in")
    };
    var i = n.fn.tab;
    n.fn.tab = function (i) {
        return this.each(function () {
            var u = n(this), r = u.data("bs.tab");
            r || u.data("bs.tab", r = new t(this));
            "string" == typeof i && r[i]()
        })
    };
    n.fn.tab.Constructor = t;
    n.fn.tab.noConflict = function () {
        return n.fn.tab = i, this
    };
    n(document).on("click.bs.tab.data-api", '[data-toggle="tab"], [data-toggle="pill"]', function (t) {
        t.preventDefault();
        n(this).tab("show")
    })
}(jQuery);

function logDemoEvent(n, t)
{
    if (t = MS.demopage.version == "v3" ? document.getElementById("demo-log-event-hooks") : document.getElementById(t), t) {
        if (!n) {
            t.innerHTML = "";
            t.setAttribute("rowCount", 0);
            return
        }
        rowCount = t.getAttribute("rowCount") || 0;
        timeoutDelay += 100;
        setTimeout(function () {
            t.innerHTML = t.innerHTML + '<div class="demo-event-log-item">' + ++rowCount + '. <a target="_blank" title="Go to API Documentation" class="code-snippet-link" href="https://docs.' + MS.baseUrl + "/" + MS.demopage.component + "#event-" + n + '">' + n + "<\/a> fired <\/div>";
            t.setAttribute("rowCount", rowCount);
            t.parentNode.scrollTop = t.parentNode.scrollHeight;
            timeoutDelay -= 100
        }, timeoutDelay)
    }
}

window.location.hash && (window.location.hash[1] == "?" && window.location.replace(window.location.href.replace("#?", "#")), window.location.hash[1] == "!" && window.location.replace(window.location.href.replace("#!", "#")));
var rowCount = 0, timeoutDelay = 0;
$(function ()
{
    function lf() {
        $("#bundleUnique").val(wr);
        $("#pricing-fr-form").submit()
    }

    function y(r, u, f, o) {
        f !== u && (u !== undefined || r == "demo") && (ot = !0, r == "lang" ? df(f) : r == "theme" ? (n = f, e($(".theme-cont.theme-cont-a"), $(".theme-cont." + f), "theme-cont-a")) : r == "demo" && (ot = !1, t = f, yi(t), ki(t), e($(".demo-sidenav-item"), $(".demo-sidenav-" + t), "active"), e($(".mobile-demo-menu-item.active"), $('.mobile-demo-menu-item[data-demo="' + t + '"][data-component="' + MS.demopage.component + '"]'), "active")), ur = !0, i[r] = f, o || g(i, r == "demo"))
    }

    function af(n, t) {
        var i;
        return t = t || 100, function () {
            var r = this, u = arguments;
            clearTimeout(i);
            i = setTimeout(function () {
                n.apply(r, u)
            }, t)
        }
    }

    function iu() {
        Tracker.track("Demo Inset Download", {
            Component: MS.demopage.component,
            Demo: t,
            Framework: l,
            Version: MS.demopage.version || "v4"
        })
    }

    function yi(n) {
        var i, t, u, s;
        !n && r <= o && (!MS.demopage.version || MS.demopage.version == "v4") ? (i = n, k.addClass("show-group-description")) : (k.removeClass("show-group-description"), i = n || MS.demopage.firstDemo);
        t = f[i];
        u = $("#demo-" + i);
        yt || setTimeout(function () {
            MS.GA === undefined || MS.GA === "" || d.demo === undefined || t.gaTracked || (t.gaTracked = !0, ga("send", "pageview", location.pathname))
        });
        t && u.length && i != v ? (v = i, e($(".demo-cont-active"), u, "demo-cont-active"), $(".code-snippet-cont", u).removeClass("demo-opacity"), s = $("#demo-phone"), t.displayMode > 0 ? s.addClass("demo-phone-mobile-view hide-bottom-phone") : s.removeClass("demo-phone-mobile-view hide-bottom-phone"), bi(u, t), t.tracked || (t.tracked = !0, Tracker.track("Demo Page", {
            Demo: i,
            Component: MS.demopage.component,
            Framework: MS.demopage.framework,
            Version: MS.demopage.version || "v4"
        })), setTimeout(function () {
            pi(t, u, cr, !1)
        })) : i == v && bi(u, t);
        yt && (yt = !1)
    }

    function ru() {
        var n = {};
        return st && (n = $.bbq.getState(), n.demo = window.location.pathname.replace("/trialactivatedsuccess").split("/")[MS.demopage.version ? 4 : 3], n.demo != "jqm" && n.demo != "bootstrap" && MS.demopage.demos[n.demo] || delete n.demo), n
    }

    function uu() {
        tt < 850 ? (b.addClass("demo-hide-phone"), vt.css({height: tt - 90})) : (b.removeClass("demo-hide-phone"), vt.css({height: ""}))
    }

    function fu(n) {
        n.hasClass("prism-highlighted") || (Prism.highlightElement(n[0]), n.addClass("prism-highlighted"))
    }

    function ni(n) {
        if (n.length) {
            var t = n.parent();
            $('<div class="external-button-text demo-page-info-popup"><p>This picker only opens on button click, give it a try.<\/p><\/div>').appendTo(t);
            t.on("click", "input.demo-non-form", function () {
                t.addClass("show-external-button")
            });
            t.on("mouseleave", "input.demo-non-form", function () {
                t.removeClass("show-external-button")
            })
        }
    }

    function vf(t) {
        function o() {
            if (r.length) {
                var n = r.shift();
                n.shown = !1;
                n.init(s);
                ii = tr(o)
            } else t()
        }

        var i, u, e = f[v], r = [],
            s = {theme: n, lang: h, display: rt, hasContext: p, isSmall: pt, updateDemoCodeDynamicValues: w};
        uf(ii);
        t = t || function () {
        };
        e && e.loaded && r.push(e);
        for (u in f) i = f[u], i.loaded && u != v && $("#demo-ctx-" + i.id).length && r.push(i);
        ii = tr(o)
    }

    function ht(t, i, r) {
        setTimeout(function () {
            var f = {theme: n, lang: h, display: rt, hasContext: p, isSmall: pt, updateDemoCodeDynamicValues: w}, u;
            t.init(f);
            t.loading = !1;
            t.loaded = !0;
            t.displayMode == 0 ? (u = p ? $(".demo-cont-active").parent().find(".demo-phone") || $("#demo-phone-" + t.id + " .demo-phone-content") : $("#demo-phone-content"), u.find("#demo-ctx-" + t.id).css("margin-right", -yr)) : t.displayMode == 2 && r.find("#demo-ctx-" + t.id).css("margin-right", -yr);
            $(".getdemos-all").off("submit", iu).submit(iu);
            i && (yu(), ot = !1, lt = $("#demo" + t.id), lt.mobiscroll("show", !1, !0), t.shown = !0);
            cr = !0
        })
    }

    function pi(n, t, i, r) {
        if (n && !n.loading) {
            if (r || (n.loading = !0), n.loaded && !r && n.displayMode == 0) {
                var u = p ? $("#demo-" + n.name).parent().find(".demo-phone-content") : $("#demo-phone-content");
                p && u.find("#demo-ctx-" + n.id).length != 1 || !p ? (u.html(si), setTimeout(function () {
                    u.html(n.html);
                    ht(n, i, t);
                    ni(u.find(".external-container"))
                }, 300)) : (n.loading = !1, n.loaded = !0)
            }
            n.loaded || ($.get({
                method: "GET",
                url: "//demo." + MS.baseUrl + "/demo/" + (MS.demopage.version ? MS.demopage.version + "/" : "") + MS.demopage.framework + "/" + n.id
            }).then(function (u) {
                if (n.displayMode == 0) {
                    var f = p ? $("#demo-" + n.name).parent().find(".demo-phone-content") : $("#demo-phone-content");
                    f.html(si);
                    setTimeout(function () {
                        f.html(u).find(".demo-fullscreen-cont").click(function () {
                            su("fullscreen/" + MS.demopage.component + "/" + n.name)
                        });
                        ht(n, i, t);
                        ni(f.find(".external-container"))
                    }, 300);
                    n.html = u
                } else n.displayMode == 1 ? (t.find(".demo-desktop-display").html(ft), setTimeout(function () {
                    t.find(".demo-desktop-display").html(u);
                    ht(n, i, t);
                    t.addClass("show-live");
                    ni(t.find(".external-container"));
                    t.find(".demo-live-indicator").show()
                }, 300)) : n.displayMode == 2 ? (t.find(".demo-responsive-display").html(ft), setTimeout(function () {
                    t.find(".demo-responsive-display").html(u);
                    ht(n, i, t)
                }, 300)) : (t.find(".demo-fullpage-display").html(ft), setTimeout(function () {
                    t.find(".demo-fullpage-display").html(u);
                    ht(n, i, t);
                    t.addClass("show-live");
                    ni(t.find(".external-container"));
                    t.find(".demo-live-indicator").show()
                }, 300));
                r || MS.mobile || w(t[0])
            }), MS.mobile || eu(n))
        }
    }

    function yf(n) {
        var f, e, u, o, s, w = [], c = [], l = [], b, a, v, h, y, p, t, i;
        if (n = n.replace(/import '@mobiscroll\/react\/dist\/css\/mobiscroll\.min\.css';/gm, "import '@mobiscroll/react/dist/css/mobiscroll.min.css';\n\ninterface DemoProps {\n    /* demo props */}\n\ninterface DemoState {\n    /* demo state */}"), u = n.match(/class ([a-z1-9-_]+) extends React\.Component/gmi), u && u.length) for (t = 0; t < u.length; ++t) n = n.replace(u[t], u[t] + "< DemoProps, DemoState >");
        if (n = n.replace(/constructor\(props\).?{/, "constructor(props: DemoProps) {"), f = n.match(/([a-z1-9-_]*).*\((.*?)\).*{/gmi), l = [], f && f.length) for (t = 0; t < f.length; ++t) {
            var r = f[t], d = r, k = r.match(/\((.*?)\)/);
            if (k) {
                for (b = k[1].split(","), a = /([a-z1-9-_]*).?=/i.exec(r), a || (a = /([a-z1-9-_]*).?\(/i.exec(r)), l.push(a[1]), v = 0; v < b.length; ++v) h = b[v], h && h.indexOf(":") === -1 && (r = r.replace(h, h + ": any"));
                n = n.replace(d, r)
            }
        }
        if (o = n.match(/this\.state\.([a-z1-9-_]+)/gmi), c = [], o && o.length) for (t = 0; t < o.length; ++t) y = o[t].split(".")[2], c.indexOf(y) === -1 && (n = n.replace("/* demo state */", y + "?: any;\n    /* demo state */"), c.push(y));
        if (s = n.match(/this\.props\.([a-z1-9-_]+)/gmi), s && s.length) for (t = 0; t < s.length; ++t) p = s[t].split(".")[2], w.indexOf(p) === -1 && (n = n.replace("/* demo props */", p + "?: any;\n    /* demo props */"), w.push(p));
        if (n = n.replace("    /* demo state */", c.length ? "" : "  /* you can define state type definitions here */\n"), e = n.match(/this\.([a-z-_]+)/gmi), e && e.length) for (t = 0; t < e.length; ++t) i = e[t].split(".")[1], i && i !== "state" && i !== "setState" && l.indexOf(i === -1) && (n.indexOf(i + ":") === -1 && (n = n.replace("class App extends React.Component< DemoProps, DemoState > {", "class App extends React.Component< DemoProps, DemoState > {\n    " + i + ":any;")), l.push(i));
        return n.replace("    /* demo props */", w.length ? "" : "  /* you can define props type definitions here */\n")
    }

    function eu(n) {
        var t = $("#demo-source-js" + n.id + " code"), i = $("#demo-source-markup" + n.id + " code");
        er ? i.html(ft) : t.html(ft);
        $.get({
            method: "GET",
            url: "//demo." + MS.baseUrl + "/getdemocode/" + (MS.demopage.version || "v4") + "/" + MS.demopage.framework + "/" + n.id
        }).then(function (r) {
            var u = r, o = $("#demo-source-css" + n.id + " code"), s = $("#demo-source-module" + n.id + " code"),
                f = t.closest(".demo-code-tab-content"), e;
            t.html(u.Js);
            i.html(u.Markup);
            o.html(u.Css);
            s.html(u.Module);
            w(f[0]);
            er ? (i.parent().height() >= 530 && au(f), fu(i)) : (t.parent().height() >= 530 && au(f), fu(t));
            l === "react" && (e = $("#demo-source-tsx" + n.id + " code"), e.html(yf(u.Js)), w(f[0]))
        })
    }

    function pf(n, r) {
        ut = !1;
        var f = $(r.currentTarget), o = f.attr("href"), u = {};
        $.extend(u, i);
        wt && $.extend(u, {code: "true"});
        delete u.demo;
        delete u.modal;
        n == MS.demopage.framework ? (r.preventDefault(), wt && (g({code: "true"}), t == MS.demopage.demo ? lu() : location.reload())) : e($(".demo-description-btn"), $(".demo-description-btn-" + n), "active");
        f.attr("href", $.param.fragment(o + (wt ? "/" + t : ""), u, 2))
    }

    function ou(n, t, r) {
        if (at && $(r.currentTarget).hasClass("demo-sidenav-item")) r.preventDefault(); else {
            ut = !1;
            var f = $(r.currentTarget), e = f.attr("href"), u = {};
            t == MS.demopage.democategory && (r.preventDefault(), ti("demo", n), yi(n));
            $.extend(u, i);
            delete u.demo;
            delete u.modal;
            f.attr("href", $.param.fragment(e, u, 2))
        }
    }

    function su(n) {
        window.open("//demo." + MS.baseUrl + (MS.demopage.version ? "/" + MS.demopage.version : "") + "/" + n + window.location.hash, "_blank")
    }

    function wi(r) {
        var o = !1, s, u, c, e;
        (i = ru(), bt = $.extend({}, d), d = $.extend({}, i), i.modal || hu(), $.each(or, function (n) {
            o = o || bt[n] != i[n]
        }), o || !ri) && (bt.modal && bt.modal != i.modal && k.removeClass("demo-modal-content"), i.theme && y("theme", n, i.theme, r), i.lang && y("lang", h, i.lang, r), i.demo && y("demo", t, i.demo, r), f[t] && lr.length && (lr = $('meta[content="noindex"][name="robots"]').remove()), MS.demopage.version !== "v2" && MS.demopage.version !== "v3" && (kt = /-dark/.test(n) ? "dark" : "light"), kr = h !== "en", dr = hr[n] && hr[n].baseTheme, $(".demo-toolbar .demo-fr-cat-link").each(function () {
            $(this).attr("href", "//demo." + MS.baseUrl + "/" + (MS.demopage.version ? MS.demopage.version + "/" : "") + $(this).data("fr") + "/" + MS.demopage.component + (t ? "/" + t : ""))
        }), clearTimeout(ir), ir = setTimeout(function () {
            var n, i, t;
            yu();
            ot && (vf(function () {
                lt && setTimeout(function () {
                    lt.mobiscroll("show", !1, !0)
                })
            }), ot = !1);
            ur && !MS.mobile && w();
            ri = !0;
            MS.autoDownload && (MS.demopage.frLicenses && MS.demopage.frLicenses.indexOf(l) !== -1 && MS.demopage.activeMaintenance || MS.demopage.hasActiveTrial != !1 ? (MS.demopage.isIonic == !0 ? (n = v || MS.demopage.firstDemo, du(f[n].id)) : MS.demopage.isIonicReact == !0 ? (n = v || MS.demopage.firstDemo, gu(f[n].id)) : l == "angular" ? window.chooseAngularWindow.show() : (i = $(".getdemos-form").eq(0), t = document.createElement("iframe"), t.setAttribute("style", "display: none;"), t.src = i.attr("action") + "?" + i.serialize(), document.body.appendChild(t), Tracker.track("Demo Download", {
                Component: MS.demopage.component,
                Demo: MS.demopage.demo,
                Framework: MS.demopage.framework,
                Version: MS.demopage.version || "v4"
            }), setTimeout(function () {
                l == "react" ? window.downloadReactSuccessWindow.show() : ($("#follow-guide").attr("href", "//docs." + MS.baseUrl + "/" + l), window.downloadSuccessWindow.show())
            }, 300)), MS.autoDownload = !1) : $("#trialInfoFormRolling").submit())
        }, 300), ei && t && (s = $("#demo-" + t + " .demo-title-i:first").text().replace("- ", ""), u = l.charAt(0).toUpperCase() + l.slice(1), u = u.replace("Angularjs", "AngularJS").replace("Jquery", "JQuery and JQuery Mobile"), c = fi ? u == "Angular" || u == "AngularJS" || u == "React" ? u + " and Ionic " : u + " " : "", document.title = c + s + " Example | Mobiscroll", $('meta[name="twitter:title"]').attr("content", document.title), $('meta[property="og:title"]').attr("content", document.title), e = f[t].description || "Interactive " + (fi ? u : "") + s + " demo. With source code. Try it!" + (fi ? " " + MS.demopage.useWith : ""), $('meta[name="description"]').attr("content", e), $('meta[name="twitter:description"]').attr("content", e), $('meta[property="og:description"]').attr("content", e)), ei = !0)
    }

    function wf() {
        $(".demo-desktop-display .demo-content-visible").each(function () {
            MS.demopage.component == "navigation" ? $(this).parent().triggerHandler("resize") : $(this).triggerHandler("resize")
        });
        $(".responsive-demo-placeholder").each(function () {
            $(this).removeClass("demo-responsive-small-screen");
            $(".demo-responsive-code-cont", $(this)).width() <= 400 ? $(this).addClass("demo-responsive-small-screen") : $(this).removeClass("demo-responsive-small-screen")
        });
        $(".demo-responsive-display .demo-content-visible").each(function () {
            MS.demopage.component == "navigation" ? $(this).parent().triggerHandler("resize") : $(this).triggerHandler("resize")
        });
        $(window).height() <= 950 ? b.addClass("demo-page-small") : b.removeClass("demo-page-small");
        clearTimeout(rr);
        var n = t || MS.demopage.firstDemo;
        rr = setTimeout(function () {
            var u = r, t, i;
            r = window.innerWidth;
            tt = window.innerHeight;
            u > o && r <= o ? (pt = !0, p = !1, $(".demo-phone-content").empty(), t = f[n], i = $("#demo-" + n), pi(t, i), Stickyfill.remove($(".demo-phone")), s.scrollTop(0)) : u <= o && r > o && (pt = !1, p = !0, $("#demo-phone").find("demo-wrapper").empty(), t = f[n], i = $("#demo-" + n), pi(t, i), bi(i, t), setTimeout(function () {
                uu()
            }), Stickyfill.forceSticky(), Stickyfill.add($(".demo-phone")));
            di()
        }, 100)
    }

    function bf() {
        if (r > o) {
            var n = s.scrollTop();
            ui < n + ef ? ar.addClass("sticky-theme-lang-select") : ar.removeClass("sticky-theme-lang-select");
            di()
        }
    }

    function ct() {
        fr || (fr = !0, document.body.classList.remove("demo-page-loading"))
    }

    function g(n, r) {
        var u = $.extend({}, i, n), o = n.demo || t, s = n.modal, f;
        $.extend(i, n);
        for (f in u) u[f] === null && delete u[f];
        s ? e($(".mobile-demo-modal"), $(".mobile-demo-modal-" + s), "mobile-demo-modal-active") : hu();
        delete u.demo;
        st && (r ? history.pushState(n, null, "/" + (MS.demopage.version ? MS.demopage.version + "/" : "") + MS.demopage.framework + "/" + MS.demopage.component + "/" + o + "#" + $.param(u)) : history.replaceState(n, null, "/" + (MS.demopage.version ? MS.demopage.version + "/" : "") + MS.demopage.framework + "/" + MS.demopage.component + "/" + o + "#" + $.param(u)));
        wi()
    }

    function hu() {
        $(".mobile-demo-modal-active").removeClass("mobile-demo-modal-active");
        $(".mobile-demo-menu-active").removeClass("mobile-demo-menu-active")
    }

    function kf() {
        var n = $(".demo-sidenav-i");
        setTimeout(function () {
            var r = $(".demo-sidenav-item.active-comp"), t = $(".demo-sidenav-item.active"), i;
            if (r.length && (i = r.position().top, n.scrollTop(i), t.length)) {
                var u = t.offset().top + 80, e = u + t.outerHeight(), f = s.scrollTop(), o = f + s.height(),
                    h = n.outerHeight();
                e > f && u < o || (i = t.position().top, n.scrollTop(i - h / 2))
            }
        })
    }

    function bi(n, t) {
        if (!t || r <= o) {
            ct();
            return
        }
        ut ? (ut = !1, ct()) : (yt ? setTimeout(function () {
            cu(t, n);
            ct()
        }, 2e3) : setTimeout(function () {
            cu(t, n);
            ct()
        }), tt < 950 ? vt.addClass("sticky-phone-medium") : vt.removeClass("sticky-phone-medium"))
    }

    function cu(n, t) {
        n.displayMode == 2 ? s.scrollTop(t.offset().top + 80) : n.displayMode == 1 || n.displayMode == 3 ? s.scrollTop(t.offset().top + 30) : s.scrollTop(t.offset().top - 50)
    }

    function df(n) {
        n != "none" && (h = n);
        $.get("//demo." + MS.baseUrl + "/setlanguage/" + n);
        Tracker.track("Demo Language", {Lang: MS.demopage.defaultLanguage, Apply: n != "none"}, function () {
        })
    }

    function gf(n) {
        var r = "", f = $(n.currentTarget), t = f.data("width"), i = f.closest(".responsive-demo-placeholder"),
            u = $(".demo-responsive-display", i);
        e($(".toolbar-quicknav-item.active", i), $(n.target), "active");
        $(".demo-width-header", i).text("Viewport width: " + t + "px");
        t != u.width() && ($(i).width() - t > 400 ? $(i).hasClass("demo-responsive-small-screen") ? setTimeout(function () {
            $(i).removeClass("demo-responsive-small-screen");
            setTimeout(function () {
                u.css({width: t + "px"})
            })
        }, 200) : u.css({width: t + "px"}) : $(i).hasClass("demo-responsive-small-screen") ? setTimeout(function () {
            setTimeout(function () {
                u.css({width: t + "px"})
            })
        }, 200) : u.css({width: t + "px"}), t >= 1200 && (r += " mbsc-grid-xl"), t >= 992 && (r += " mbsc-grid-lg"), t >= 768 && (r += " mbsc-grid-md"), t >= 576 && (r += " mbsc-grid-sm"), setTimeout(function () {
            var n = $(".demo-content-visible", i);
            MS.demopage.component == "navigation" ? n.parent().triggerHandler("resize") : n.triggerHandler("resize");
            n.data("respClass", r).find(".mbsc-grid-unresp").removeClass("mbsc-grid-sm mbsc-grid-md mbsc-grid-lg mbsc-grid-xl").addClass(r)
        }, 300))
    }

    function ne(n) {
        var t = h;
        hi = MS.demopage.countries[n];
        y("lang", t, n);
        e($(".toolbar-quicknav-item-hover"), $('.flag-nav-item[data-code="' + n + '"]'), "toolbar-quicknav-item-hover");
        $(".flag-country").removeClass("flag-" + MS.demopage.countries[t]);
        $(".flag-country").addClass("flag-" + hi)
    }

    function te(t) {
        var i, r = t.currentTarget, u = n;
        e($(".demo-theme-select"), $(r), "demo-theme-active");
        n == "ios" || n == "material" || n == "mobiscroll" || n == "wp-light" || n == "windows" ? (i = r.getAttribute("data-light"), n = i ? i : t.currentTarget.getAttribute("data-light")) : (i = r.getAttribute("data-dark"), n = i ? i : t.currentTarget.getAttribute("data-dark"));
        y("theme", u, n);
        Tracker.track("Demo theme change", {Theme: n})
    }

    function lu() {
        var n = f[t || MS.demopage.firstDemo];
        n.code || eu(n);
        n.code = !0;
        window.mobileDemoCodeWindow.show()
    }

    function ie(n, t) {
        $("#demo-" + n + " .demo-code-tab-content").addClass("show-full-content hide-show-more").removeClass("demo-scroll-hide");
        $(t.target).parent().hide()
    }

    function au(n) {
        n.find(".show-more").show();
        n.addClass("demo-scroll-hide");
        n.find(".show-more")
    }

    function vu(t) {
        var i = n;
        if (t) switch (n) {
            case"ios-dark":
                n = "ios";
                break;
            case"material-dark":
                n = "material";
                break;
            case"mobiscroll-dark":
                n = "mobiscroll";
                break;
            case"wp":
                n = "wp-light";
                break;
            case"windows-dark":
                n = "windows"
        } else switch (n) {
            case"ios":
                n = "ios-dark";
                break;
            case"material":
                n = "material-dark";
                break;
            case"mobiscroll":
                n = "mobiscroll-dark";
                break;
            case"wp-light":
                n = "wp";
                break;
            case"windows":
                n = "windows-dark"
        }
        y("theme", i, n)
    }

    function re() {
        var r, u, i, f, a, w, o, b, k, h, v, d, c = !1, n = s.scrollTop(), l = t || "empty", g = MS.demopage.demos[l],
            p = $("#demo-" + l);
        if (ri && p.length) {
            if (n > oi) {
                for (i = l == "empty" ? -1 : p.data("index"), r = $(".demo-cont").eq(i + 1); !c && r.length;) o = r.offset().top, b = r.height(), a = r.attr("data-name"), w = MS.demopage.demos[a] || {}, d = g && g.displayMode != w.displayMode ? 500 : 200, o > n + tt ? c = !0 : o <= n + d + 70 && o + b > n + 70 && (f = a), i += 1, r = $(".demo-cont").eq(i + 1);
                et = "down"
            } else if (n != oi) {
                if (n + 20 < ui) f = ""; else for (i = parseInt(p.attr("data-index")), u = $(".demo-cont").eq(i - 1); !c && u.length;) h = u.offset().top, v = u.height(), k = u.attr("data-name"), h + v < n ? c = !0 : h + v - 300 > n && h < n + tt && (f = k), i -= 1, u = $(".demo-cont").eq(i - 1);
                et = "up"
            }
            f !== undefined && t !== f && (ut = !0, t = f, y("demo", l, t), ki(t), e($(".demo-sidenav-item"), $(".demo-sidenav-" + t), "active"));
            oi = n
        }
    }

    function w(t, i) {
        var f, r, o, s, u, e, c;
        for (i && $.each(or, function (t) {
            switch (t) {
                case"theme":
                    n = i.theme;
                    break;
                case"lang":
                    h = i.lang
            }
        }), s = (t || document).querySelectorAll(".demo-dynamic-data"), f = 0; f < s.length; ++f) {
            r = s[f];
            o = r.getAttribute("data-prop");
            switch (o) {
                case"display":
                    MS.demopage.component !== "listview" && MS.demopage.component !== "forms" ? r.textContent = rt : r.parentNode.parentNode.style.display = "none";
                    break;
                case"theme":
                    r.textContent = kt ? n.replace(/-dark/, "") : n;
                    break;
                case"themeVariant":
                    kt ? (r.style.display = "inline", r.querySelector(".demo-dynamic-themeVariant").textContent = kt) : r.style.display = "none";
                    break;
                case"lang-react":
                case"lang":
                    u = r.innerHTML;
                    e = u[0] != "," && u.indexOf(",") == -1;
                    l == "react" && (e = e && o == "lang-react");
                    e && r.nextSibling && (c = r.nextSibling.textContent.indexOf(",") != -1 ? r.nextSibling : r.nextSibling.nextSibling, c.textContent = c.textContent.replace(",", ""), u += ",");
                    kr ? (r.innerHTML = u, r.querySelector(".demo-dynamic-lang").textContent = h, r.style.display = "inline") : r.style.display = "none";
                    break;
                case"extra":
                    r.style.display = "none";
                    break;
                case"inline":
                    rt != "inline" && (r.style.display = "none");
                    break;
                case"modal":
                    r.style.display = rt == "inline" ? "none" : "block"
            }
        }
    }

    function yu() {
        var i, t, r;
        $(".demo-download-demo").val(v);
        $(".demo-download-theme").val(n);
        $(".demo-download-lang").val(h);
        i = window.location.hash;
        $('input[name="SourceUrl"]').each(function () {
            var n = "//demo." + MS.baseUrl + window.location.pathname;
            $(this).val(n + i)
        });
        t = $(".js-download-sign-in").attr("href");
        r = t.indexOf("#");
        r >= 0 && (t = t.substring(0, r));
        $(".js-download-sign-in").attr("href", t + i)
    }

    function ki() {
        var n = t ? f[t].title : MS.demopage.componentName + " for " + MS.demopage.frDescr, u = $("#demo-title-header"),
            e = $("#demo-title-header-hidden"), i, r;
        et == "down" ? (i = $(".top"), r = $(".bottom")) : et == "up" && (i = $(".bottom"), r = $(".top"));
        et ? (e.text(n), i.text(u.text()).addClass("middle").addClass("no-transition"), u.text(""), r.text(n), setTimeout(function () {
            i.removeClass("middle").removeClass("no-transition");
            r.addClass("middle");
            setTimeout(function () {
                i.text("");
                u.text(n);
                r.text("").removeClass("middle")
            }, 300)
        }, 0)) : (u.text(n), e.text(n))
    }

    function di() {
        var n = b.offset().top - s.scrollTop();
        setTimeout(function () {
            c.hasClass("affix") ? c.css("top", 100) : n > 0 ? c.css("top", n + 20) : c.css("top", 20)
        })
    }

    function pu(n) {
        n ? (u.find(".submit-txt").hide(), u.find(".loader").addClass("loading")) : (u.find(".submit-txt").show(), u.find(".loader").removeClass("loading"))
    }

    function gi(n) {
        n ? (u.find(".trial-starter-submit").removeAttr("disabled"), pu(!1)) : (pu(!0), u.find(".trial-starter-submit").attr("disabled", "disabled"))
    }

    function e(n, t, i) {
        n.length && n.removeClass(i);
        t.length && t.addClass(i)
    }

    function wu() {
        window.chooseAngularWindow.hide();
        setTimeout(function () {
            nt(1)
        })
    }

    function ue() {
        window.installAngularWindow.hide();
        setTimeout(function () {
            nt(1)
        })
    }

    function fe() {
        window.installIonicAngularWindow.hide();
        setTimeout(function () {
            nt(1)
        })
    }

    function ee() {
        window.installIonicReactWindow.hide();
        setTimeout(function () {
            nt(1)
        })
    }

    function oe() {
        wu();
        $.get("//demo." + MS.baseUrl + "/isuserloggedin", function (n) {
            n.success ? window.downloadAngularSuccessWindow.show() : setTimeout(function () {
                location.reload()
            }, 500)
        });
        $(".getdemos-form.getdemos-all").submit()
    }

    function bu() {
        !MS.demopage.noAvailableTrial || MS.demopage.frLicenses && MS.demopage.frLicenses.indexOf(l) !== -1 && MS.demopage.activeMaintenance ? window.downloadDemosWindow.show() : window.noTrialAvailable.show()
    }

    function se() {
        if (a) {
            var n, t;
            a == "ionic" ? MS.demopage.frLicenses && MS.demopage.frLicenses.indexOf("angular") !== -1 && MS.demopage.activeMaintenance || MS.demopage.hasActiveTrial != !1 ? (t = v || MS.demopage.firstDemo, n = f[t].id, du(n)) : $("#trialInfoFormRolling").submit() : a == "ionicreact" ? MS.demopage.frLicenses && MS.demopage.frLicenses.indexOf("react") !== -1 && MS.demopage.activeMaintenance || MS.demopage.hasActiveTrial != !1 ? (t = v || MS.demopage.firstDemo, n = f[t].id, gu(n)) : $("#trialInfoFormRolling").submit() : a == "angular" ? MS.demopage.frLicenses && MS.demopage.frLicenses.indexOf("angular") !== -1 && MS.demopage.activeMaintenance || MS.demopage.hasActiveTrial != !1 ? window.chooseAngularWindow.show() : $("#trialInfoFormRolling").submit() : MS.demopage.frLicenses && MS.demopage.frLicenses.indexOf(a) !== -1 && MS.demopage.activeMaintenance || MS.demopage.hasActiveTrial != !1 ? ($.get("//demo." + MS.baseUrl + "/isuserloggedin", function (n) {
                n.success ? a == "react" ? window.downloadReactSuccessWindow.show() : ($("#follow-guide").attr("href", "//docs." + MS.baseUrl + "/" + a), window.downloadSuccessWindow.show()) : setTimeout(function () {
                    location.reload()
                }, 500)
            }), $(".getdemos-form.getdemos-all").submit()) : $("#trialInfoFormRolling").submit();
            window.downloadDemosWindow.isOpen && window.downloadDemosWindow.hide()
        }
    }

    function he(n) {
        var t, i = n.textContent, r = "Copied", u = new Clipboard(n);
        u.on("success", function () {
            $(n).hasClass("copy-code-btn") ? ($(n).addClass("hide-icon"), n.textContent = $(n).parent().siblings(".active").text() + "copied") : n.textContent = r;
            clearTimeout(t);
            t = setTimeout(function () {
                $(n).hasClass("copy-code-btn") && $(n).removeClass("hide-icon");
                n.textContent = i
            }, 2e3)
        })
    }

    function ce() {
        Intercom("show")
    }

    function nt(n) {
        $(".install-step-js").hide();
        $(".install-step-" + n).show()
    }

    function le(n) {
        var u = "//demo." + MS.baseUrl + "/download/" + n + "/" + MS.demopage.component + "/" + t,
            i = n.charAt(0).toUpperCase() + n.slice(1),
            f = "//demo." + MS.baseUrl + "/" + n + "/" + MS.demopage.component + "/" + t + window.location.hash, r;
        r = n == "ionic" ? "angular" : n == "ionicreact" ? "react" : n;
        $(".js-download-sign-in").attr("href", u);
        $(".trial-info-form-js input[name='Framework']").val(i);
        $('.trial-info-form-js input[name="SourceUrl"]').val(f);
        $(".getdemos-form input[name='Framework']").val(i);
        a = n;
        $("#trial-fr-picked").val(n);
        br = MS.demopage.frLicenses && MS.demopage.frLicenses.indexOf(r) !== -1 && MS.demopage.activeMaintenance || MS.demopage.hasActiveTrial;
        ku()
    }

    function ku() {
        br ? ($(".has-no-license-or-trial").hide(), $(".has-license-or-trial").show()) : ($(".has-license-or-trial").hide(), $(".has-no-license-or-trial").show())
    }

    function ae() {
        var n, t = v || MS.demopage.firstDemo;
        n = f[t].id;
        wu();
        $.ajax({
            url: "/getdemocode/" + (MS.demopage.version || "v4") + "/angular/" + n, success: function (n) {
                n.Module = n.Module.replace("../lib/mobiscroll/js/mobiscroll.angular.min.js", "@mobiscroll/angular");
                $("#angular-source-js").toggle(!!n.Js).find("code").html(n.Js);
                $("#angular-source-html").toggle(!!n.Markup).find("code").html(n.Markup);
                $("#angular-source-css").toggle(!!n.Css).find("code").html(n.Css);
                $("#angular-source-module").toggle(!!n.Module).find("code").html(n.Module);
                $("#angular-tabs").find('a[href="#angular-code-css"]').toggle(!!n.Css);
                $("#angular-codes").find("code").removeClass("prism-highlighted");
                w($("#angular-codes")[0]);
                n.Css || $("#angular-code-css").hasClass("active") && $("#angular-tabs").find('a[href="#angular-code-js"]').tab("show");
                Prism.highlightElement($("#angular-codes").find(".tab-pane.active").find("code")[0])
            }
        });
        setTimeout(function () {
            window.installAngularWindow.show()
        }, 300)
    }

    function du(n) {
        nt(1);
        $.ajax({
            url: "/getdemocode/" + (MS.demopage.version || "v4") + "/ionic/" + n, success: function (n) {
                n.Js.indexOf("import { mobiscroll") > -1 && (n.Js = "/* Import Mobiscroll from the package */<br>" + n.Js);
                n.Js = n.Js.replace("AppComponent {", "AppComponent {<br>    // Place the code below into your own component or use the full template<br>").replace("AppComponent implements OnInit {", "AppComponent implements OnInit {<br>    // Place the code below into your own component or use the full template<br>");
                n.Module = n.Module.replace("../lib/mobiscroll/js/mobiscroll.angular.min.js", "@mobiscroll/angular");
                $("#ionic-source-js").toggle(!!n.Js).find("code").html(n.Js);
                $("#ionic-source-html").toggle(!!n.Markup).find("code").html(n.Markup);
                $("#ionic-source-css").toggle(!!n.Css).find("code").html(n.Css);
                $("#ionic-source-module").toggle(!!n.Module).find("code").html(n.Module);
                $("#ionic-tabs").find(".js-ionic-code-css").toggle(!!n.Css);
                $("#ionic-codes").find("code").removeClass("prism-highlighted");
                w($("#ionic-codes")[0]);
                $("#ionic-codes .code-snippet-link").length !== 0 && $("#ionic-codes .code-snippet-link").each(function () {
                    var n = $(this).attr("href");
                    n = n.replace("ionic", "angular");
                    $(this).attr("href", n)
                });
                n.Css || $("#ionic-code-css").hasClass("active") && $("#ionic-tabs").find('a[href="#ionic-code-js"]').tab("show");
                Prism.highlightElement($("#ionic-codes").find(".tab-pane.active").find("code")[0])
            }
        });
        setTimeout(function () {
            window.installIonicAngularWindow.show()
        }, 300)
    }

    function gu(n) {
        nt(1);
        $.ajax({
            url: "/getdemocode/" + (MS.demopage.version || "v4") + "/ionicreact/" + n, success: function (n) {
                $("#ionic-react-source-js").toggle(!!n.Js).find("code").html(n.Js);
                $("#ionic-react-source-css").toggle(!!n.Css).find("code").html(n.Css);
                $("#ionic-react-tabs").find(".js-ionic-react-code-css").toggle(!!n.Css);
                $("#ionic-react-codes").find("code").removeClass("prism-highlighted");
                w($("#ionic-react-codes")[0]);
                $("#ionic-react-codes .code-snippet-link").length !== 0 && $("#ionic-react-codes .code-snippet-link").each(function () {
                    var n = $(this).attr("href");
                    n = n.replace("ionicreact", "react");
                    $(this).attr("href", n)
                });
                n.Css || $("#ionic-react-code-css").hasClass("active") && $("#ionic-react-tabs").find('a[href="#ionic-react-code-js"]').tab("show");
                Prism.highlightElement($("#ionic-react-codes").find(".tab-pane.active").find("code")[0])
            }
        });
        setTimeout(function () {
            window.installIonicReactWindow.show()
        }, 300)
    }

    function ve(n) {
        mobiscroll.util && mobiscroll.util.preventClick();
        st && d.modal && window.history.back();
        setTimeout(function () {
            g({modal: n}, !0);
            setTimeout(function () {
                var i = $(".mobile-demo-menu")[0], r;
                setTimeout(function () {
                    i.style.display = "none";
                    i.offsetHeight;
                    i.style.display = ""
                }, 200);
                k.addClass("demo-modal-content");
                dt = !1;
                $(".mbsc-float-menu").removeClass("mbsc-float-active");
                n === "demo" && ($(".mobile-demo-menu").addClass("mobile-demo-menu-active"), t ? (r = $('.mobile-demo-menu-item[data-demo="' + t + '"][data-component="' + MS.demopage.component + '"]'), r.addClass("active"), $("html, body").animate({scrollTop: r.offset().top}, 300)) : $("html, body").animate({scrollTop: $('.mobile-demo-menu-item[data-component="' + MS.demopage.component + '"]').first().offset().top - 30}, 300))
            }, 50)
        }, 50)
    }

    function nf() {
        gt.removeClass("mobile-demo-menu-control-view-v");
        ci = !ci;
        ci ? (gt.show().scrollTop(0), $(".toggle-control-view").addClass("mbsc-ic-material-list"), $(".toggle-view-content").removeClass("mobile-demo-grid-on"), ai.addClass("mobile-demo-disable-scroll"), gt.addClass("mobile-demo-menu-control-view-a")) : ($(".toggle-control-view").removeClass("mbsc-ic-material-list"), $(".toggle-view-content").addClass("mobile-demo-grid-on"), ai.removeClass("mobile-demo-disable-scroll"), gt.removeClass("mobile-demo-menu-control-view-a"))
    }

    function ye() {
        if (!tu) {
            tu = !0;
            $(".mbsc-float-menu").on("touchmove", function (n) {
                n.preventDefault()
            });
            $(".demo-menu-select").mobiscroll().select(cf);
            window.FastClick.attach($("#fastclick")[0])
        }
        li = !0;
        $(".mbsc-float-info").removeClass("mbsc-float-info-visible");
        $.cookie("Mobiscroll_Settings_Visited", "true", {expires: 30, path: "/", domain: "demo." + MS.baseUrl});
        dt ? (dt = !1, $(".mbsc-float-menu").removeClass("mbsc-float-active"), st && d.modal == "settings" && window.history.back()) : (g({modal: "settings"}, !0), dt = !0, $(".mbsc-float-menu").addClass("mbsc-float-active"))
    }

    function pe(n) {
        var t = $("#" + $(n.currentTarget).data("hash"))[0];
        nf();
        gr = Math.max(0, ai[0].offsetHeight - 50 + t.offsetTop - hf[0].offsetHeight);
        sf.height(gr);
        setTimeout(function () {
            k.scrollTop(t.offsetTop)
        })
    }

    function ti(i, r) {
        mobiscroll.util && mobiscroll.util.preventClick();
        k.removeClass("demo-modal-content");
        setTimeout(function () {
            st && d.modal == i && (g({modal: null}), window.history.back());
            setTimeout(function () {
                r ? i == "theme" ? y("theme", n, r) : i == "lang" ? y("lang", h, r) : i == "demo" && y("demo", t, r) : i == "lang" && vi && y("lang", h, vi)
            }, 50)
        }, 300)
    }

    var ii, tr = window.requestAnimationFrame || function (n) {
            return setTimeout(n, 20)
        }, uf = window.cancelAnimationFrame || function (n) {
            clearTimeout(n)
        }, ff = typeof InstallTrigger != "undefined", lt, ri, ir, rr, ur, ui = $(".demo-full-content").offset().top + 10,
        fi = MS.demopage.hasFramework, ei = MS.demopage.hasDemo, fr = !1, ut = !ei, o = 950, ef = 60,
        r = window.innerWidth, tt = window.innerHeight, i = $.bbq.getState(), at = r > o && r < 1265,
        er = MS.demopage.framework !== "react" && (MS.demopage.component == "forms" || MS.demopage.component == "buttons" || MS.demopage.component == "alerts-notifications" || MS.demopage.component == "collapsible" || MS.demopage.component == "inputs-fields" || MS.demopage.component == "slider-progress" || MS.demopage.component == "toggle-radio" || MS.demopage.component == "cards" || MS.demopage.component == "grid-layout"),
        or = {theme: !0, display: !0, lang: !0, demo: !1}, sr = {
            theme: mobiscroll.autoTheme,
            lang: MS.demopage.defaultLanguag || "en",
            display: MS.demopage.component == "listview" || MS.demopage.component == "forms" ? "inline" : MS.demopage.component == "menustrip" ? "top" : r >= 768 && r <= 950 ? "bubble" : undefined
        }, hr = $.mobiscroll.themes.frame, oi = 0, cr = !MS.mobile, s = $(window), b = $("#content"),
        c = $("#demo-sidenav"), lr = $('meta[content="noindex"][name="robots"]'), vt = $(".demo-phone"),
        of = $(".demo-phone-content"), ar = $(".theme-lang-select"), yt = !0, vr = of.find(".demo-phone-screen")[0],
        yr = vr.offsetWidth - vr.clientWidth,
        si = '<div class="demo-phone-screen-w"><div class="demo-ctx-c demo-phone-screen demo-scrollbar demo-content-visible"><div class="demo-wrapper"><div class="demo-spinner demo-spinner-hl"><div class="demo-spinner-item1"><\/div><div class="demo-spinner-item2"><\/div><div class="demo-spinner-item3"><\/div><div class="demo-spinner-item4"><\/div><\/div><\/div><\/div><\/div>',
        ft = si = '<div class="demo-content-visible"><div class="demo-wrapper"><div class="demo-spinner demo-spinner-hl"><div class="demo-spinner-item1"><\/div><div class="demo-spinner-item2"><\/div><div class="demo-spinner-item3"><\/div><div class="demo-spinner-item4"><\/div><\/div><\/div><\/div>',
        et, pt, l = MS.demopage.framework, ot = !0, p = MS.mobile || r <= o ? undefined : !0, f = MS.demopage.demos,
        t = MS.demopage.demo, pr = MS.demopage.scale, wr = MS.demopage.framework, wt = MS.mobile,
        st = !!history.pushState, d = {}, bt = {}, br, kt, kr, dr, a, v, it,
        n = i.theme == undefined ? mobiscroll.autoTheme == undefined || !MS.mobile ? "ios" : mobiscroll.autoTheme : i.theme,
        h = i.lang == undefined ? sr.lang : i.lang, hi = MS.demopage.countries[h], rt = i.display || sr.display,
        u = $("#trialInfoFormRolling"), ci = !0, dt, gr, nu, li = $.cookie("Mobiscroll_Settings_Visited") == "true",
        ai = $("#mobilemenu"), sf = $("#mobilemenuph"), hf = $("#mobilemenugr"), gt = $("#mobilemenuctrl"),
        k = $("body"), tu, vi, cf = {
            display: "inline",
            context: "body",
            theme: "mobiscroll",
            cssClass: "mobile-demo-setting",
            layout: "liquid",
            rows: 100,
            dataText: "Text",
            dataValue: "Value",
            showInput: !1,
            onSet: function (n, t) {
                vi = t.getVal()
            },
            onValueTap: function (n) {
                n.hasClass("dw-sel") && ti("lang", $(n.target).data("val"))
            },
            onItemTap: function (n) {
                var t = $(n.target);
                t.hasClass("mbsc-sc-itm-sel") && ti("lang", t.data("val"))
            }
        }, tf, nr, rf;
    $(window).height() <= 950 ? b.addClass("demo-page-small") : b.removeClass("demo-page-small");
    MS.mobile || uu();
    $(".trial-info-form").each(function () {
        function i(t) {
            t ? (n.find(".submit-txt").hide(), n.find(".loader").addClass("loading")) : (n.find(".submit-txt").show(), n.find(".loader").removeClass("loading"))
        }

        function t(t) {
            t ? (n.find(".trial-starter-submit").removeAttr("disabled"), i(!1)) : (i(!0), n.find(".trial-starter-submit").attr("disabled", "disabled"))
        }

        var n = $(this);
        n !== undefined && n.length && setTimeout(function () {
            n.mobiscroll().form({theme: "material-blue"})
        });
        n.removeData("validator");
        n.removeData("unobtrusiveValidation");
        n.keydown(function (n) {
            (n.keyCode == 13 || n.keyCode == 27) && n.stopPropagation()
        }).submit(function (i) {
            return i.stopPropagation(), i.preventDefault(), n.valid() && a && (t(!1), $.ajax({
                url: n.attr("action"),
                type: "POST",
                data: n.serialize(),
                success: function (i) {
                    if (i.success == !0) window.location.href = i.redirectUrl; else if (i.errorMessage) {
                        n.find(".trial-starter-input").addClass("input-validation-message");
                        var r = $('<div class="input-validation-message">' + i.errorMessage + "<\/div>");
                        n.find(".input-validation-cont").append(r);
                        t(!0)
                    } else window.location.href = i.redirectUrl
                },
                error: function () {
                    t(!0)
                }
            })), !1
        }).validate({
            onkeyup: !1,
            rules: {email: {required: !0, email: !0}},
            messages: {
                email: {
                    required: "Email address required",
                    email: "Email address is not in the correct format, try something like 'you@yours.com'"
                }
            },
            errorElement: "div",
            errorClass: "mbsc-err-msg",
            errorPlacement: function (n, t) {
                t.parent().append(n)
            },
            highlight: function (n) {
                $(n).closest(".mbsc-input").addClass("mbsc-err")
            },
            unhighlight: function (n) {
                $(n).closest(".mbsc-input").removeClass("mbsc-err")
            }
        })
    });
    u !== undefined && u.length && setTimeout(function () {
        u.mobiscroll().form({theme: "material-blue"})
    });
    u.removeData("validator");
    u.removeData("unobtrusiveValidation");
    u.keydown(function (n) {
        (n.keyCode == 13 || n.keyCode == 27) && n.stopPropagation()
    }).submit(function (n) {
        return n.stopPropagation(), n.preventDefault(), u.valid() && a && (gi(!1), $.ajax({
            url: u.attr("action"),
            type: "POST",
            data: u.serialize(),
            success: function (n) {
                if (n.success == !0) window.location.href = n.redirectUrl; else if (n.errorMessage) {
                    u.find(".trial-starter-input").addClass("input-validation-message");
                    var t = $('<div class="input-validation-message">' + n.errorMessage + "<\/div>");
                    u.find(".input-validation-cont").append(t);
                    gi(!0)
                } else window.location.href = n.redirectUrl
            },
            error: function () {
                gi(!0)
            }
        })), !1
    }).validate({
        onkeyup: !1,
        rules: {email: {required: !0, email: !0}},
        messages: {
            email: {
                required: "Email address required",
                email: "Email address is not in the correct format, try something like 'you@yours.com'"
            }
        },
        errorElement: "div",
        errorClass: "mbsc-err-msg",
        errorPlacement: function (n, t) {
            t.parent().append(n)
        },
        highlight: function (n) {
            $(n).closest(".mbsc-input").addClass("mbsc-err")
        },
        unhighlight: function (n) {
            $(n).closest(".mbsc-input").removeClass("mbsc-err")
        }
    });
    MS.demopage.version != "v2" && MS.demopage.version != "v3" && (tf = $("#ionic-video").mobiscroll().popup({
        theme: "ios",
        display: "bubble",
        anchor: "#show-ionic-video",
        showOverlay: !1,
        buttons: [],
        cssClass: "mbsc-no-padding"
    }).mobiscroll("getInst"), it = "component");
    $(".copy-btn").each(function (n, t) {
        he(t)
    });
    $(".demo-code-btn-cont a").click(function () {
        var i = $(this), t = i.closest(".demo-code-cont"), u = i.attr("href"), f = t.find(".copy-code-btn"),
            e = "#" + $(u + " pre").attr("id"), r = t.find(".show-more"), n = t.find(".tab-content");
        f.attr("data-clipboard-target", e);
        setTimeout(function () {
            n.height() < 500 ? (r.hide(), n.removeClass("demo-scroll-hide")) : n.hasClass("hide-show-more") || (r.show(), n.removeClass("show-full-content").addClass("demo-scroll-hide"))
        })
    });
    $(".show-option").click(function (n) {
        var t = $(n.currentTarget);
        ve(t.data("option"))
    });
    $(".toggle-settings").click(function () {
        ye()
    });
    $(".set-option").click(function (n) {
        var t = $(n.currentTarget);
        ti(t.data("option"), t.data("val"))
    });
    $(".toggle-control-view").click(function () {
        nf()
    });
    $(".mobile-demo-control-view-cell-cont").click(function (n) {
        pe(n)
    });
    $(".download-angular").click(function () {
        oe()
    });
    $(".show-angular-install").click(function () {
        ae()
    });
    $(".close-angular-install").click(function () {
        ue()
    });
    $(".close-ionic-angular-install").click(function () {
        fe()
    });
    $(".close-ionic-react-install").click(function () {
        ee()
    });
    $(".install-next-step-btn, .install-prev-step-btn").click(function (n) {
        nt($(n.currentTarget).data("step"))
    });
    $(".need-help-btn").click(function () {
        ce()
    });
    $("#download-demo-btn").click(function (n) {
        bu(n)
    });
    $(".trial-fr-btn").click(function (n) {
        var t = $(n.target), i = t.data("framework");
        e($(".trial-fr-btn.active"), t, "active");
        $(".trial-fr-btn").removeClass("err-border");
        $(".trial-fr-error").hide();
        le(i)
    });
    $(".show-instr-btn").click(function () {
        $(".trial-fr-btn.active").length || $(".trial-fr-btn").addClass("err-border");
        a || $(".trial-fr-error").show();
        se()
    });
    $(".change-password").click(function (n) {
        n.preventDefault();
        window.changePassWindow.show()
    });
    $(".install-ionic-video").click(function (n) {
        var t = $(n.currentTarget);
        it = t.data("video");
        $(".ionic-video-text").text(t.find("a").text())
    });
    $(".ionic-video-btn").click(function () {
        var t = $(".ionic-js-video-" + it), n;
        if (!t.length) {
            switch (it) {
                case"component":
                    n = "https://player.vimeo.com/video/335123487";
                    break;
                case"template":
                    n = "https://player.vimeo.com/video/335367993";
                    break;
                case"css":
                    n = "https://player.vimeo.com/video/335370451";
                    break;
                case"module":
                    n = "https://player.vimeo.com/video/335373359"
            }
            $("#ionic-video").append('<iframe class="ionic-help-video ionic-js-video-' + it + '" src=' + n + ' width="900" height="506" frameborder="0" fullscreen allowfullscreen><\/iframe>')
        }
        t.removeClass("hide");
        $(".ionic-help-video:not(.ionic-js-video-" + it + ")").addClass("hide");
        tf.show()
    });
    $(".demo-description-download-btn").click(function (n) {
        bu(n)
    });
    ku();
    setTimeout(function () {
        $(window).on("scroll", function () {
            clearTimeout(nu);
            nu = setTimeout(function () {
                var n = $(window).scrollTop();
                n > 200 && !li && $(".mbsc-float-info").addClass("mbsc-float-info-visible")
            }, 200)
        });
        setTimeout(function () {
            li || $(".mbsc-float-info").addClass("mbsc-float-info-visible")
        }, 5e3);
        d.modal && g({modal: null})
    }, 250);
    ff && b.addClass("hide-scale");
    s.on("popstate", function () {
        wi(!0)
    });
    window.addEventListener("keypress", function (n) {
        window.downloadDemosWindow.isOpen && n.keyCode === 13 && (n.stopPropagation(), $("#downloadDemosWindow .show-instr-btn").trigger("click"))
    }, !0);
    $(".demo-sidenav").on("scroll", function () {
        $(this).scrollTop() > 33 ? $(".demo-example-dropdown").addClass("demo-examples-shadow") : $(".demo-example-dropdown").removeClass("demo-examples-shadow")
    });
    MS.mobile || (kf(), di());
    $(".demo-theme-select").click(function (n) {
        te(n)
    });
    $(".demo-theme-light").click(function () {
        vu(!0);
        e($(".demo-theme-dark"), $(".demo-theme-light"), "demo-switch-active")
    });
    $(".demo-theme-dark").click(function () {
        vu(!1);
        e($(".demo-theme-light"), $(".demo-theme-dark"), "demo-switch-active")
    });
    $(".flag-nav-item").click(function (n) {
        ne($(n.currentTarget).data("code"))
    });
    $(".billing-license-btn").click(function (n) {
        var t = $(n.currentTarget), i = t.attr("license");
        e($(".billing-license-btn"), t, "active");
        wr = i
    });
    $(".need-help-btn").on("click", function () {
        Intercom("show")
    });
    if ($(".mobile-demo-menu-item").click(function (n) {
        var t = $(n.currentTarget);
        ou(t.data("demo"), t.data("component"), n)
    }), $(".buy-lic-btn").click(function () {
        lf()
    }), $(".log-demo-event").click(function (n) {
        logDemoEvent(n, "demo-log-" + $(n.currentTarget).data("demoname"))
    }), $(".load-demo-with-hash").click(function (n) {
        var t = $(n.currentTarget);
        ou(t.data("unique"), t.data("category"), n)
    }), $(".load-fullscreen-demo-with-hash").click(function (n) {
        var t = $(n.currentTarget);
        su("fullscreen/" + t.data("url"))
    }), $(".load-demo-with-code-hash").click(function (n) {
        var t = $(n.currentTarget);
        pf(t.data("framework"), n)
    }), $(".show-more").click(function (n) {
        var t = $(n.target);
        ie(t.data("unique"), n)
    }), $(".first-demo-btn").click(function () {
        var t = MS.demopage.firstDemo, n = f[t], i;
        i = n.displayMode == 2 ? 80 : n.displayMode == 1 || n.displayMode == 3 ? 30 : -60;
        $("html, body").animate({scrollTop: $("#demo-" + t).offset().top + i}, 300)
    }), $(".set-demo-width").click(function (n) {
        gf(n)
    }), $("#demo-sel-fr").mouseenter(function () {
        var n = this;
        rf = setTimeout(function () {
            $(n).addClass("open")
        }, 100)
    }).mouseleave(function () {
        $(this).removeClass("open");
        clearTimeout(rf)
    }), $(".show-lang-info").mouseover(function () {
        $("#lang-select-picker").addClass("show-info")
    }), $(".show-lang-info").mouseleave(function () {
        $("#lang-select-picker").removeClass("show-info")
    }), $(".show-theme-info").mouseover(function () {
        $("#theme-select-picker").addClass("show-info")
    }), $(".show-theme-info").mouseleave(function () {
        $("#theme-select-picker").removeClass("show-info")
    }), MS.mobile) nr = MS.demopage.version == "v2" || MS.demopage.version == "v3" ? $("#demo-mobile-codes").mobiscroll().widget({
        display: "center",
        buttons: [],
        cssClass: "show-code-popup"
    }).mobiscroll("getInst") : $("#demo-mobile-codes").mobiscroll().popup({
        display: "center",
        buttons: [],
        cssClass: "show-code-popup"
    }).mobiscroll("getInst"), ru().code == "true" && lu(), $("#show-codes").click(function () {
        nr.show()
    }), $(".demo-mobile-code-btns .gen-btn").click(function () {
        nr.hide()
    }), $("#close-code-btn").click(function () {
        window.mobileDemoCodeWindow.hide();
        g({code: null})
    }); else {
        if (r > o && r < 1265) {
            k.on("touchstart", function (n) {
                var t = $("#mobilemenuctrl");
                c.is(n.target) || c.has(n.target).length !== 0 || t.is(n.target) || t.has(n.target).length !== 0 || (c.removeClass("show-sidenav"), at = !0)
            });
            c.on("mouseover touchstart", function () {
                c.addClass("show-sidenav");
                setTimeout(function () {
                    at = !1
                }, 500)
            });
            c.on("mouseleave", function () {
                c.removeClass("show-sidenav");
                at = !0
            })
        }
        ui = $(".demo-full-content").offset().top + 10;
        s.on("scroll", bf);
        s.on("scroll", af(function () {
            r > o && re()
        }));
        s.on("resize orientationchange", function () {
            wf()
        });
        r > o && (Stickyfill.forceSticky(), Stickyfill.add($(".demo-phone")));
        $("#demo-toolbar").affix({
            offset: {
                top: function () {
                    return $(".demo-full-content").offset().top - 11
                }
            }
        });
        $("#demo-sidenav").affix({
            offset: {
                top: function () {
                    return $(".demo-full-content").offset().top - 11
                }
            }
        });
        $("#ionic-tabs a").click(function (n) {
            n.preventDefault();
            $(this).tab("show")
        });
        $(".demo-sidenav-group").click(function (n) {
            n.preventDefault()
        })
    }
    $(document).on("shown.bs.tab", 'a[data-toggle="tab"]', function (n) {
        var i = n.target.getAttribute("href"), t = $(i).find("code")[0];
        $(t).hasClass("prism-highlighted") || (Prism.highlightElement(t), $(t).addClass("prism-highlighted"))
    });
    e($(".demo-sidenav-item"), $(".demo-sidenav-" + t), "active");
    $(".theme-cont." + n).addClass("theme-cont-a");
    $(".mobile-demo-" + (t || MS.demopage.firstDemo) + "-" + MS.demopage.component).addClass("active");
    p || k.addClass("demo-page-mobile");
    $(".demo-list").addClass("demo-display-" + rt + " demo-theme-" + n + " demo-theme-" + dr);
    wt || (pr == 90 ? $(".demo-placeholder").addClass("demo-medium-size") : pr == 75 && $(".demo-placeholder").addClass("demo-small-size"));
    $(".code-snippet-cont").addClass("demo-opacity");
    e($(".demo-description-btn"), $(".demo-description-btn-" + l), "active");
    $(".flag-country").addClass("flag-" + hi);
    $('.flag-nav-item[data-code="' + h + '"]').addClass("toolbar-quicknav-item-hover");
    !0 && $(".demo-code-sample").addClass("show-code");
    $(".demo-theme-select-" + n.replace("-dark", "")).addClass("demo-theme-active");
    switch (n) {
        case"ios-dark":
        case"material-dark":
        case"mobiscroll-dark":
        case"windows-dark":
        case"wp":
            $(".demo-theme-dark").addClass("demo-switch-active");
            break;
        default:
            $(".demo-theme-light").addClass("demo-switch-active")
    }
    r <= o && ct();
    wi();
    yi(t);
    t && ki(t)
});
$(function () {
    function r(n) {
        i = n;
        $(".pass-change").toggle()
    }

    function t() {
        $(".user-info").toggle()
    }

    function u() {
        window.changePassWindow ? window.changePassWindow.onHide = function () {
            i && setTimeout(function () {
                r(!1);
                $("#password-input").val("")
            }, 300)
        } : setTimeout(u, 300)
    }

    var i, n = $("#userInfoFormPass");
    n.on("submit", function (i) {
        $(this).valid() && (i.preventDefault(), t(!0), $.ajax({
            url: "/changepassword",
            type: "POST",
            data: n.serialize(),
            success: function (n) {
                n.success == !0 ? (t(!1), r(!0)) : t(!1)
            },
            error: function () {
                t(!1)
            }
        }))
    }).validate({
        errorClass: "mbsc-err-msg", errorPlacement: function (n, t) {
            t.parent().append(n)
        }, highlight: function (n) {
            $(n).closest(".mbsc-input").addClass("mbsc-err")
        }, unhighlight: function (n) {
            $(n).closest(".mbsc-input").removeClass("mbsc-err")
        }, messages: {password: {required: "Password is required", minlength: "Enter at least 6 characters"}}
    });
    u();
    n !== undefined && n.length && setTimeout(function () {
        n.mobiscroll().form({theme: "material-blue"}).mobiscroll("getInst")
    });
    $("#userInfoFormPass").keydown(function (t) {
        t.keyCode == 13 && (t.stopPropagation(), n.submit())
    })
});
