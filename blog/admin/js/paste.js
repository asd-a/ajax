(function() {
    var s, a, r, l, n;
    function o(t, e) {
        var y;
        this._container = t, this._target = e, this._container = s(this._container), this._target = s(this._target).addClass("pastable"), 
        this._container.on("paste", (y = this, function(t) {
            var e, n, a, r, i, o, l, s, u, g, c, f, p, h, d, _, m, v, b;
            if (y.originalEvent = null !== t.originalEvent ? t.originalEvent : null, y._paste_event_fired = !0, 
            null != (null != (_ = t.originalEvent) ? _.clipboardData : void 0)) if ((n = t.originalEvent.clipboardData).items) {
                for (f = null, y.originalEvent.pastedTypes = [], o = 0, u = (h = n.items).length; o < u; o++) (i = h[o]).type.match(/^text\/(plain|rtf|html)/) && y.originalEvent.pastedTypes.push(i.type);
                for (e = l = 0, g = (d = n.items).length; l < g; e = ++l) {
                    if ((i = d[e]).type.match(/^image\//)) {
                        (p = new FileReader()).onload = function(t) {
                            return y._handleImage(t.target.result, y.originalEvent, f);
                        };
                        try {
                            p.readAsDataURL(i.getAsFile());
                        } catch (t) {}
                        t.preventDefault();
                        break;
                    }
                    "text/plain" === i.type && (0 === e && 1 < n.items.length && n.items[1].type.match(/^image\//) && (v = !0, 
                    r = n.items[1].type), i.getAsString(function(t) {
                        return v ? (f = t, y._target.trigger("pasteText", {
                            text: t,
                            isFilename: !0,
                            fileType: r,
                            originalEvent: y.originalEvent
                        })) : y._target.trigger("pasteText", {
                            text: t,
                            originalEvent: y.originalEvent
                        });
                    })), "text/rtf" === i.type && i.getAsString(function(t) {
                        return y._target.trigger("pasteTextRich", {
                            text: t,
                            originalEvent: y.originalEvent
                        });
                    }), "text/html" === i.type && i.getAsString(function(t) {
                        return y._target.trigger("pasteTextHtml", {
                            text: t,
                            originalEvent: y.originalEvent
                        });
                    });
                }
            } else -1 !== Array.prototype.indexOf.call(n.types, "text/plain") && (b = n.getData("Text"), 
            setTimeout(function() {
                return y._target.trigger("pasteText", {
                    text: b,
                    originalEvent: y.originalEvent
                });
            }, 1)), y._checkImagesInContainer(function(t) {
                return y._handleImage(t, y.originalEvent);
            });
            if (n = window.clipboardData) if (null != (_ = b = n.getData("Text")) && _.length) setTimeout(function() {
                return y._target.trigger("pasteText", {
                    text: b,
                    originalEvent: y.originalEvent
                }), y._target.trigger("_pasteCheckContainerDone");
            }, 1); else {
                for (s = 0, c = (m = n.files).length; s < c; s++) a = m[s], y._handleImage(URL.createObjectURL(a), y.originalEvent);
                y._checkImagesInContainer(function(t) {});
            }
            return null;
        }));
    }
    (s = window.jQuery).paste = function(t) {
        return "undefined" != typeof console && null !== console && console.log("DEPRECATED: This method is deprecated. Please use $.fn.pastableNonInputable() instead."), 
        a.mountNonInputable(t)._container;
    }, s.fn.pastableNonInputable = function() {
        for (var t, e = 0, n = this.length; e < n; e++) (t = this[e])._pastable || s(t).is("textarea, input:text, [contenteditable]") || (a.mountNonInputable(t), 
        t._pastable = !0);
        return this;
    }, s.fn.pastableTextarea = function() {
        for (var t, e = 0, n = this.length; e < n; e++) (t = this[e])._pastable || s(t).is(":not(textarea, input:text)") || (a.mountTextarea(t), 
        t._pastable = !0);
        return this;
    }, s.fn.pastableContenteditable = function() {
        for (var t, e = 0, n = this.length; e < n; e++) (t = this[e])._pastable || s(t).is(":not([contenteditable])") || (a.mountContenteditable(t), 
        t._pastable = !0);
        return this;
    }, l = function(t, e) {
        var n, a, r, i, o, l, s, u;
        if (null == e && (e = 512), !(l = t.match(/^data\:([^\;]+)\;base64\,(.+)$/))) return null;
        for ((t = l)[0], l = t[1], t = t[2], r = atob(t), a = [], s = 0; s < r.length; ) {
            for (u = r.slice(s, s + e), i = new Array(u.length), o = 0; o < u.length; ) i[o] = u.charCodeAt(o), 
            o++;
            n = new Uint8Array(i), a.push(n), s += e;
        }
        return new Blob(a, {
            type: l
        });
    }, r = function() {
        return s(document.createElement("div")).attr("contenteditable", !0).attr("aria-hidden", !0).attr("tabindex", -1).css({
            width: 1,
            height: 1,
            position: "fixed",
            left: -100,
            overflow: "hidden",
            opacity: 1e-17
        });
    }, n = function(t, e) {
        var n, a, r = void 0, i = void 0, o = void 0, l = t.nodeName.toLowerCase();
        return "area" === l ? (n = (r = t.parentNode).name, !(!t.href || !n || "map" !== r.nodeName.toLowerCase()) && 0 < (i = s("img[usemap='#" + n + "']")).length && i.is(":visible")) : (/^(input|select|textarea|button|object)$/.test(l) ? (o = !t.disabled) && (a = s(t).closest("fieldset")[0]) && (o = !a.disabled) : o = "a" === l && t.href || e, 
        (o = o || s(t).is("[contenteditable]")) && s(t).is(":visible"));
    }, o.prototype._target = null, o.prototype._container = null, o.mountNonInputable = function(t) {
        var e = new o(r().appendTo(t), t);
        return s(t).on("click", function(t) {
            if (!n(t.target, !1) && !window.getSelection().toString()) return e._container.focus();
        }), e._container.on("focus", function() {
            return s(t).addClass("pastable-focus");
        }), e._container.on("blur", function() {
            return s(t).removeClass("pastable-focus");
        });
    }, o.mountTextarea = function(i) {
        var n, a, t;
        return "undefined" != typeof DataTransfer && null !== DataTransfer && DataTransfer.prototype && null != (t = Object.getOwnPropertyDescriptor) && null != (t = t.call(Object, DataTransfer.prototype, "items")) && t.get ? this.mountContenteditable(i) : (a = new o(r().insertBefore(i), i), 
        n = !1, s(i).on("keyup", function(t) {
            return 17 !== (t = t.keyCode) && 224 !== t || (n = !1), null;
        }), s(i).on("keydown", function(t) {
            var e;
            return 17 !== (e = t.keyCode) && 224 !== e || (n = !0), null != t.ctrlKey && null != t.metaKey && (n = t.ctrlKey || t.metaKey), 
            n && 86 === t.keyCode && (a._textarea_focus_stolen = !0, a._container.focus(), a._paste_event_fired = !1, 
            setTimeout(function() {
                if (!a._paste_event_fired) return s(i).focus(), a._textarea_focus_stolen = !1;
            }, 1)), null;
        }), s(i).on("paste", function() {}), s(i).on("focus", function() {
            if (!a._textarea_focus_stolen) return s(i).addClass("pastable-focus");
        }), s(i).on("blur", function() {
            if (!a._textarea_focus_stolen) return s(i).removeClass("pastable-focus");
        }), s(a._target).on("_pasteCheckContainerDone", function() {
            return s(i).focus(), a._textarea_focus_stolen = !1;
        }), s(a._target).on("pasteText", function(t, e) {
            var n = s(i).prop("selectionStart"), a = s(i).prop("selectionEnd"), r = s(i).val();
            return s(i).val("" + r.slice(0, n) + e.text + r.slice(a)), s(i)[0].setSelectionRange(n + e.text.length, n + e.text.length), 
            s(i).trigger("change");
        }));
    }, o.mountContenteditable = function(t) {
        new o(t, t);
        return s(t).on("focus", function() {
            return s(t).addClass("pastable-focus");
        }), s(t).on("blur", function() {
            return s(t).removeClass("pastable-focus");
        });
    }, o.prototype._handleImage = function(t, a, r) {
        var i, o, e;
        return t.match(/^webkit\-fake\-url\:\/\//) ? this._target.trigger("pasteImageError", {
            message: "You are trying to paste an image in Safari, however we are unable to retieve its data."
        }) : (this._target.trigger("pasteImageStart"), (i = new Image()).crossOrigin = "anonymous", 
        i.onload = (o = this, function() {
            var t, e, n = document.createElement("canvas");
            n.width = i.width, n.height = i.height, n.getContext("2d").drawImage(i, 0, 0, n.width, n.height), 
            e = null;
            try {
                e = n.toDataURL("image/png"), t = l(e);
            } catch (t) {}
            return e && o._target.trigger("pasteImage", {
                blob: t,
                dataURL: e,
                width: i.width,
                height: i.height,
                originalEvent: a,
                name: r
            }), o._target.trigger("pasteImageEnd");
        }), i.onerror = (e = this, function() {
            return e._target.trigger("pasteImageError", {
                message: "Failed to get image from: " + t,
                url: t
            }), e._target.trigger("pasteImageEnd");
        }), i.src = t);
    }, o.prototype._checkImagesInContainer = function(a) {
        for (var r, i, o = Math.floor(1e3 * Math.random()), t = this._container.find("img"), e = 0, n = t.length; e < n; e++) (r = t[e])["_paste_marked_" + o] = !0;
        return setTimeout((i = this, function() {
            for (var t = i._container.find("img"), e = 0, n = t.length; e < n; e++) (r = t[e])["_paste_marked_" + o] || (a(r.src), 
            s(r).remove());
            return i._target.trigger("_pasteCheckContainerDone");
        }), 1);
    }, a = o;
}).call(this);