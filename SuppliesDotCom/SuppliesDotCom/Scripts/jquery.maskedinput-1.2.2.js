﻿// jQuery Mask Plugin v1.6.4
// github.com/igorescobar/jQuery-Mask-Plugin
(function (g) { "function" === typeof define && define.amd ? define(["jquery"], g) : g(window.jQuery || window.Zepto) })(function (g) {
    var y = function (a, f, d) {
        var k = this, x; a = g(a); f = "function" === typeof f ? f(a.val(), void 0, a, d) : f; k.init = function () {
            d = d || {}; k.byPassKeys = [9, 16, 17, 18, 36, 37, 38, 39, 40, 91]; k.translation = { 0: { pattern: /\d/ }, 9: { pattern: /\d/, optional: !0 }, "#": { pattern: /\d/, recursive: !0 }, A: { pattern: /[a-zA-Z0-9]/ }, S: { pattern: /[a-zA-Z]/ } }; k.translation = g.extend({}, k.translation, d.translation); k = g.extend(!0, {}, k, d); a.each(function () {
                !1 !==
                d.maxlength && a.attr("maxlength", f.length); d.placeholder && a.attr("placeholder", d.placeholder); a.attr("autocomplete", "off"); c.destroyEvents(); c.events(); var b = c.getCaret(); c.val(c.getMasked()); c.setCaret(b + c.getMaskCharactersBeforeCount(b, !0))
            })
        }; var c = {
            getCaret: function () {
                var b; b = 0; var e = a.get(0), c = document.selection, e = e.selectionStart; if (c && !~navigator.appVersion.indexOf("MSIE 10")) b = c.createRange(), b.moveStart("character", a.is("input") ? -a.val().length : -a.text().length), b = b.text.length; else if (e ||
                "0" === e) b = e; return b
            }, setCaret: function (b) { if (a.is(":focus")) { var e; e = a.get(0); e.setSelectionRange ? e.setSelectionRange(b, b) : e.createTextRange && (e = e.createTextRange(), e.collapse(!0), e.moveEnd("character", b), e.moveStart("character", b), e.select()) } }, events: function () {
                a.on("keydown.mask", function () { x = c.val() }); a.on("keyup.mask", c.behaviour); a.on("paste.mask drop.mask", function () { setTimeout(function () { a.keydown().keyup() }, 100) }); a.on("change.mask", function () { a.data("changeCalled", !0) }); a.on("blur.mask",
                function (b) { b = g(b.target); b.prop("defaultValue") !== b.val() && (b.prop("defaultValue", b.val()), b.data("changeCalled") || b.trigger("change")); b.data("changeCalled", !1) }); a.on("focusout.mask", function () { d.clearIfNotMatch && c.val().length < f.length && c.val("") })
            }, destroyEvents: function () { a.off("keydown.mask keyup.mask paste.mask drop.mask change.mask blur.mask focusout.mask").removeData("changeCalled") }, val: function (b) { var e = a.is("input"); return 0 < arguments.length ? e ? a.val(b) : a.text(b) : e ? a.val() : a.text() }, getMaskCharactersBeforeCount: function (b,
            e) { for (var a = 0, c = 0, d = f.length; c < d && c < b; c++) k.translation[f.charAt(c)] || (b = e ? b + 1 : b, a++); return a }, determineCaretPos: function (b, a, d, h) { return k.translation[f.charAt(Math.min(b - 1, f.length - 1))] ? Math.min(b + d - a - h, d) : c.determineCaretPos(b + 1, a, d, h) }, behaviour: function (b) {
                b = b || window.event; var a = b.keyCode || b.which; if (-1 === g.inArray(a, k.byPassKeys)) {
                    var d = c.getCaret(), f = c.val(), n = f.length, l = d < n, p = c.getMasked(), m = p.length, q = c.getMaskCharactersBeforeCount(m - 1) - c.getMaskCharactersBeforeCount(n - 1); p !== f && c.val(p);
                    !l || 65 === a && b.ctrlKey || (8 !== a && 46 !== a && (d = c.determineCaretPos(d, n, m, q)), c.setCaret(d)); return c.callbacks(b)
                }
            }, getMasked: function (b) {
                var a = [], g = c.val(), h = 0, n = f.length, l = 0, p = g.length, m = 1, q = "push", s = -1, r, u; d.reverse ? (q = "unshift", m = -1, r = 0, h = n - 1, l = p - 1, u = function () { return -1 < h && -1 < l }) : (r = n - 1, u = function () { return h < n && l < p }); for (; u() ;) {
                    var v = f.charAt(h), w = g.charAt(l), t = k.translation[v]; if (t) w.match(t.pattern) ? (a[q](w), t.recursive && (-1 === s ? s = h : h === r && (h = s - m), r === s && (h -= m)), h += m) : t.optional && (h += m, l -= m), l +=
                    m; else { if (!b) a[q](v); w === v && (l += m); h += m }
                } b = f.charAt(r); n !== p + 1 || k.translation[b] || a.push(b); return a.join("")
            }, callbacks: function (b) { var e = c.val(), g = c.val() !== x; if (!0 === g && "function" === typeof d.onChange) d.onChange(e, b, a, d); if (!0 === g && "function" === typeof d.onKeyPress) d.onKeyPress(e, b, a, d); if ("function" === typeof d.onComplete && e.length === f.length) d.onComplete(e, b, a, d) }
        }; k.remove = function () {
            var a = c.getCaret(), d = c.getMaskCharactersBeforeCount(a); c.destroyEvents(); c.val(k.getCleanVal()).removeAttr("maxlength");
            c.setCaret(a - d)
        }; k.getCleanVal = function () { return c.getMasked(!0) }; k.init()
    }; g.fn.mask = function (a, f) { this.unmask(); return this.each(function () { g(this).data("mask", new y(this, a, f)) }) }; g.fn.unmask = function () { return this.each(function () { try { g(this).data("mask").remove() } catch (a) { } }) }; g.fn.cleanVal = function () { return g(this).data("mask").getCleanVal() }; g("*[data-mask]").each(function () {
        var a = g(this), f = {}; "true" === a.attr("data-mask-reverse") && (f.reverse = !0); "false" === a.attr("data-mask-maxlength") && (f.maxlength =
        !1); "true" === a.attr("data-mask-clearifnotmatch") && (f.clearIfNotMatch = !0); a.mask(a.attr("data-mask"), f)
    })
});