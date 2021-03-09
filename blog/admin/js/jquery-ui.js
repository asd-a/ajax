!
function(o, u) {
	var e, t, i = 0,
		a = /^ui-id-\d+$/;

	function s(e, t) {
		var i, a, s = e.nodeName.toLowerCase();
		return "area" === s ? (a = (i = e.parentNode).name, !(!e.href || !a || "map" !== i.nodeName.toLowerCase()) && ( !! (a = o("img[usemap=#" + a + "]")[0]) && n(a))) : (/input|select|textarea|button|object/.test(s) ? !e.disabled : "a" === s && e.href || t) && n(e)
	}
	function n(e) {
		return o.expr.filters.visible(e) && !o(e).parents().addBack().filter(function() {
			return "hidden" === o.css(this, "visibility")
		}).length
	}
	o.ui = o.ui || {}, o.extend(o.ui, {
		version: "1.10.3",
		keyCode: {
			BACKSPACE: 8,
			COMMA: 188,
			DELETE: 46,
			DOWN: 40,
			END: 35,
			ENTER: 13,
			ESCAPE: 27,
			HOME: 36,
			LEFT: 37,
			NUMPAD_ADD: 107,
			NUMPAD_DECIMAL: 110,
			NUMPAD_DIVIDE: 111,
			NUMPAD_ENTER: 108,
			NUMPAD_MULTIPLY: 106,
			NUMPAD_SUBTRACT: 109,
			PAGE_DOWN: 34,
			PAGE_UP: 33,
			PERIOD: 190,
			RIGHT: 39,
			SPACE: 32,
			TAB: 9,
			UP: 38
		}
	}), o.fn.extend({
		focus: (e = o.fn.focus, function(t, i) {
			return "number" == typeof t ? this.each(function() {
				var e = this;
				setTimeout(function() {
					o(e).focus(), i && i.call(e)
				}, t)
			}) : e.apply(this, arguments)
		}),
		scrollParent: function() {
			var e = (o.ui.ie && /(static|relative)/.test(this.css("position")) || /absolute/.test(this.css("position")) ? this.parents().filter(function() {
				return /(relative|absolute|fixed)/.test(o.css(this, "position")) && /(auto|scroll)/.test(o.css(this, "overflow") + o.css(this, "overflow-y") + o.css(this, "overflow-x"))
			}) : this.parents().filter(function() {
				return /(auto|scroll)/.test(o.css(this, "overflow") + o.css(this, "overflow-y") + o.css(this, "overflow-x"))
			})).eq(0);
			return /fixed/.test(this.css("position")) || !e.length ? o(document) : e
		},
		zIndex: function(e) {
			if (e !== u) return this.css("zIndex", e);
			if (this.length) for (var t, i, a = o(this[0]); a.length && a[0] !== document;) {
				if (t = a.css("position"), ("absolute" === t || "relative" === t || "fixed" === t) && (i = parseInt(a.css("zIndex"), 10), !isNaN(i) && 0 !== i)) return i;
				a = a.parent()
			}
			return 0
		},
		uniqueId: function() {
			return this.each(function() {
				this.id || (this.id = "ui-id-" + ++i)
			})
		},
		removeUniqueId: function() {
			return this.each(function() {
				a.test(this.id) && o(this).removeAttr("id")
			})
		}
	}), o.extend(o.expr[":"], {
		data: o.expr.createPseudo ? o.expr.createPseudo(function(t) {
			return function(e) {
				return !!o.data(e, t)
			}
		}) : function(e, t, i) {
			return !!o.data(e, i[3])
		},
		focusable: function(e) {
			return s(e, !isNaN(o.attr(e, "tabindex")))
		},
		tabbable: function(e) {
			var t = o.attr(e, "tabindex"),
				i = isNaN(t);
			return (i || 0 <= t) && s(e, !i)
		}
	}), o("<a>").outerWidth(1).jquery || o.each(["Width", "Height"], function(e, i) {
		var s = "Width" === i ? ["Left", "Right"] : ["Top", "Bottom"],
			a = i.toLowerCase(),
			n = {
				innerWidth: o.fn.innerWidth,
				innerHeight: o.fn.innerHeight,
				outerWidth: o.fn.outerWidth,
				outerHeight: o.fn.outerHeight
			};

		function r(e, t, i, a) {
			return o.each(s, function() {
				t -= parseFloat(o.css(e, "padding" + this)) || 0, i && (t -= parseFloat(o.css(e, "border" + this + "Width")) || 0), a && (t -= parseFloat(o.css(e, "margin" + this)) || 0)
			}), t
		}
		o.fn["inner" + i] = function(e) {
			return e === u ? n["inner" + i].call(this) : this.each(function() {
				o(this).css(a, r(this, e) + "px")
			})
		}, o.fn["outer" + i] = function(e, t) {
			return "number" != typeof e ? n["outer" + i].call(this, e) : this.each(function() {
				o(this).css(a, r(this, e, !0, t) + "px")
			})
		}
	}), o.fn.addBack || (o.fn.addBack = function(e) {
		return this.add(null == e ? this.prevObject : this.prevObject.filter(e))
	}), o("<a>").data("a-b", "a").removeData("a-b").data("a-b") && (o.fn.removeData = (t = o.fn.removeData, function(e) {
		return arguments.length ? t.call(this, o.camelCase(e)) : t.call(this)
	})), o.ui.ie = !! /msie [\w.]+/.exec(navigator.userAgent.toLowerCase()), o.support.selectstart = "onselectstart" in document.createElement("div"), o.fn.extend({
		disableSelection: function() {
			return this.bind((o.support.selectstart ? "selectstart" : "mousedown") + ".ui-disableSelection", function(e) {
				e.preventDefault()
			})
		},
		enableSelection: function() {
			return this.unbind(".ui-disableSelection")
		}
	}), o.extend(o.ui, {
		plugin: {
			add: function(e, t, i) {
				var a, s = o.ui[e].prototype;
				for (a in i) s.plugins[a] = s.plugins[a] || [], s.plugins[a].push([t, i[a]])
			},
			call: function(e, t, i) {
				var a, s = e.plugins[t];
				if (s && e.element[0].parentNode && 11 !== e.element[0].parentNode.nodeType) for (a = 0; a < s.length; a++) e.options[s[a][0]] && s[a][1].apply(e.element, i)
			}
		},
		hasScroll: function(e, t) {
			if ("hidden" === o(e).css("overflow")) return !1;
			var i = t && "left" === t ? "scrollLeft" : "scrollTop",
				t = !1;
			return 0 < e[i] || (e[i] = 1, t = 0 < e[i], e[i] = 0, t)
		}
	})
}(jQuery), function(l, o) {
	var i = 0,
		u = Array.prototype.slice,
		a = l.cleanData;
	l.cleanData = function(e) {
		for (var t, i = 0; null != (t = e[i]); i++) try {
			l(t).triggerHandler("remove")
		} catch (e) {}
		a(e)
	}, l.widget = function(e, i, t) {
		var a, s, n, r, o = {},
			u = e.split(".")[0];
		e = e.split(".")[1], a = u + "-" + e, t || (t = i, i = l.Widget), l.expr[":"][a.toLowerCase()] = function(e) {
			return !!l.data(e, a)
		}, l[u] = l[u] || {}, s = l[u][e], n = l[u][e] = function(e, t) {
			if (!this._createWidget) return new n(e, t);
			arguments.length && this._createWidget(e, t)
		}, l.extend(n, s, {
			version: t.version,
			_proto: l.extend({}, t),
			_childConstructors: []
		}), (r = new i).options = l.widget.extend({}, r.options), l.each(t, function(t, a) {
			function s() {
				return i.prototype[t].apply(this, arguments)
			}
			function n(e) {
				return i.prototype[t].apply(this, e)
			}
			l.isFunction(a) ? o[t] = function() {
				var e, t = this._super,
					i = this._superApply;
				return this._super = s, this._superApply = n, e = a.apply(this, arguments), this._super = t, this._superApply = i, e
			} : o[t] = a
		}), n.prototype = l.widget.extend(r, {
			widgetEventPrefix: s ? r.widgetEventPrefix : e
		}, o, {
			constructor: n,
			namespace: u,
			widgetName: e,
			widgetFullName: a
		}), s ? (l.each(s._childConstructors, function(e, t) {
			var i = t.prototype;
			l.widget(i.namespace + "." + i.widgetName, n, t._proto)
		}), delete s._childConstructors) : i._childConstructors.push(n), l.widget.bridge(e, n)
	}, l.widget.extend = function(e) {
		for (var t, i, a = u.call(arguments, 1), s = 0, n = a.length; s < n; s++) for (t in a[s]) i = a[s][t], a[s].hasOwnProperty(t) && i !== o && (l.isPlainObject(i) ? e[t] = l.isPlainObject(e[t]) ? l.widget.extend({}, e[t], i) : l.widget.extend({}, i) : e[t] = i);
		return e
	}, l.widget.bridge = function(n, t) {
		var r = t.prototype.widgetFullName || n;
		l.fn[n] = function(i) {
			var e = "string" == typeof i,
				a = u.call(arguments, 1),
				s = this;
			return i = !e && a.length ? l.widget.extend.apply(null, [i].concat(a)) : i, e ? this.each(function() {
				var e, t = l.data(this, r);
				return t ? l.isFunction(t[i]) && "_" !== i.charAt(0) ? (e = t[i].apply(t, a)) !== t && e !== o ? (s = e && e.jquery ? s.pushStack(e.get()) : e, !1) : void 0 : l.error("no such method '" + i + "' for " + n + " widget instance") : l.error("cannot call methods on " + n + " prior to initialization; attempted to call method '" + i + "'")
			}) : this.each(function() {
				var e = l.data(this, r);
				e ? e.option(i || {})._init() : l.data(this, r, new t(i, this))
			}), s
		}
	}, l.Widget = function() {}, l.Widget._childConstructors = [], l.Widget.prototype = {
		widgetName: "widget",
		widgetEventPrefix: "",
		defaultElement: "<div>",
		options: {
			disabled: !1,
			create: null
		},
		_createWidget: function(e, t) {
			t = l(t || this.defaultElement || this)[0], this.element = l(t), this.uuid = i++, this.eventNamespace = "." + this.widgetName + this.uuid, this.options = l.widget.extend({}, this.options, this._getCreateOptions(), e), this.bindings = l(), this.hoverable = l(), this.focusable = l(), t !== this && (l.data(t, this.widgetFullName, this), this._on(!0, this.element, {
				remove: function(e) {
					e.target === t && this.destroy()
				}
			}), this.document = l(t.style ? t.ownerDocument : t.document || t), this.window = l(this.document[0].defaultView || this.document[0].parentWindow)), this._create(), this._trigger("create", null, this._getCreateEventData()), this._init()
		},
		_getCreateOptions: l.noop,
		_getCreateEventData: l.noop,
		_create: l.noop,
		_init: l.noop,
		destroy: function() {
			this._destroy(), this.element.unbind(this.eventNamespace).removeData(this.widgetName).removeData(this.widgetFullName).removeData(l.camelCase(this.widgetFullName)), this.widget().unbind(this.eventNamespace).removeAttr("aria-disabled").removeClass(this.widgetFullName + "-disabled ui-state-disabled"), this.bindings.unbind(this.eventNamespace), this.hoverable.removeClass("ui-state-hover"), this.focusable.removeClass("ui-state-focus")
		},
		_destroy: l.noop,
		widget: function() {
			return this.element
		},
		option: function(e, t) {
			var i, a, s, n = e;
			if (0 === arguments.length) return l.widget.extend({}, this.options);
			if ("string" == typeof e) if (n = {}, e = (i = e.split(".")).shift(), i.length) {
				for (a = n[e] = l.widget.extend({}, this.options[e]), s = 0; s < i.length - 1; s++) a[i[s]] = a[i[s]] || {}, a = a[i[s]];
				if (e = i.pop(), t === o) return a[e] === o ? null : a[e];
				a[e] = t
			} else {
				if (t === o) return this.options[e] === o ? null : this.options[e];
				n[e] = t
			}
			return this._setOptions(n), this
		},
		_setOptions: function(e) {
			for (var t in e) this._setOption(t, e[t]);
			return this
		},
		_setOption: function(e, t) {
			return this.options[e] = t, "disabled" === e && (this.widget().toggleClass(this.widgetFullName + "-disabled ui-state-disabled", !! t).attr("aria-disabled", t), this.hoverable.removeClass("ui-state-hover"), this.focusable.removeClass("ui-state-focus")), this
		},
		enable: function() {
			return this._setOption("disabled", !1)
		},
		disable: function() {
			return this._setOption("disabled", !0)
		},
		_on: function(s, n, e) {
			var r, o = this;
			"boolean" != typeof s && (e = n, n = s, s = !1), e ? (n = r = l(n), this.bindings = this.bindings.add(n)) : (e = n, n = this.element, r = this.widget()), l.each(e, function(e, t) {
				function i() {
					if (s || !0 !== o.options.disabled && !l(this).hasClass("ui-state-disabled")) return ("string" == typeof t ? o[t] : t).apply(o, arguments)
				}
				"string" != typeof t && (i.guid = t.guid = t.guid || i.guid || l.guid++);
				var a = e.match(/^(\w+)\s*(.*)$/),
					e = a[1] + o.eventNamespace,
					a = a[2];
				a ? r.delegate(a, e, i) : n.bind(e, i)
			})
		},
		_off: function(e, t) {
			t = (t || "").split(" ").join(this.eventNamespace + " ") + this.eventNamespace, e.unbind(t).undelegate(t)
		},
		_delay: function(e, t) {
			var i = this;
			return setTimeout(function() {
				return ("string" == typeof e ? i[e] : e).apply(i, arguments)
			}, t || 0)
		},
		_hoverable: function(e) {
			this.hoverable = this.hoverable.add(e), this._on(e, {
				mouseenter: function(e) {
					l(e.currentTarget).addClass("ui-state-hover")
				},
				mouseleave: function(e) {
					l(e.currentTarget).removeClass("ui-state-hover")
				}
			})
		},
		_focusable: function(e) {
			this.focusable = this.focusable.add(e), this._on(e, {
				focusin: function(e) {
					l(e.currentTarget).addClass("ui-state-focus")
				},
				focusout: function(e) {
					l(e.currentTarget).removeClass("ui-state-focus")
				}
			})
		},
		_trigger: function(e, t, i) {
			var a, s, n = this.options[e];
			if (i = i || {}, (t = l.Event(t)).type = (e === this.widgetEventPrefix ? e : this.widgetEventPrefix + e).toLowerCase(), t.target = this.element[0], s = t.originalEvent) for (a in s) a in t || (t[a] = s[a]);
			return this.element.trigger(t, i), !(l.isFunction(n) && !1 === n.apply(this.element[0], [t].concat(i)) || t.isDefaultPrevented())
		}
	}, l.each({
		show: "fadeIn",
		hide: "fadeOut"
	}, function(n, r) {
		l.Widget.prototype["_" + n] = function(t, e, i) {
			"string" == typeof e && (e = {
				effect: e
			});
			var a, s = e ? !0 !== e && "number" != typeof e && e.effect || r : n;
			"number" == typeof(e = e || {}) && (e = {
				duration: e
			}), a = !l.isEmptyObject(e), e.complete = i, e.delay && t.delay(e.delay), a && l.effects && l.effects.effect[s] ? t[n](e) : s !== n && t[s] ? t[s](e.duration, e.easing, i) : t.queue(function(e) {
				l(this)[n](), i && i.call(t[0]), e()
			})
		}
	})
}(jQuery), function(s) {
	var n = !1;
	s(document).mouseup(function() {
		n = !1
	}), s.widget("ui.mouse", {
		version: "1.10.3",
		options: {
			cancel: "input,textarea,button,select,option",
			distance: 1,
			delay: 0
		},
		_mouseInit: function() {
			var t = this;
			this.element.bind("mousedown." + this.widgetName, function(e) {
				return t._mouseDown(e)
			}).bind("click." + this.widgetName, function(e) {
				if (!0 === s.data(e.target, t.widgetName + ".preventClickEvent")) return s.removeData(e.target, t.widgetName + ".preventClickEvent"), e.stopImmediatePropagation(), !1
			}), this.started = !1
		},
		_mouseDestroy: function() {
			this.element.unbind("." + this.widgetName), this._mouseMoveDelegate && s(document).unbind("mousemove." + this.widgetName, this._mouseMoveDelegate).unbind("mouseup." + this.widgetName, this._mouseUpDelegate)
		},
		_mouseDown: function(e) {
			if (!n) {
				this._mouseStarted && this._mouseUp(e), this._mouseDownEvent = e;
				var t = this,
					i = 1 === e.which,
					a = !("string" != typeof this.options.cancel || !e.target.nodeName) && s(e.target).closest(this.options.cancel).length;
				return i && !a && this._mouseCapture(e) ? (this.mouseDelayMet = !this.options.delay, this.mouseDelayMet || (this._mouseDelayTimer = setTimeout(function() {
					t.mouseDelayMet = !0
				}, this.options.delay)), this._mouseDistanceMet(e) && this._mouseDelayMet(e) && (this._mouseStarted = !1 !== this._mouseStart(e), !this._mouseStarted) ? (e.preventDefault(), !0) : (!0 === s.data(e.target, this.widgetName + ".preventClickEvent") && s.removeData(e.target, this.widgetName + ".preventClickEvent"), this._mouseMoveDelegate = function(e) {
					return t._mouseMove(e)
				}, this._mouseUpDelegate = function(e) {
					return t._mouseUp(e)
				}, s(document).bind("mousemove." + this.widgetName, this._mouseMoveDelegate).bind("mouseup." + this.widgetName, this._mouseUpDelegate), e.preventDefault(), n = !0)) : !0
			}
		},
		_mouseMove: function(e) {
			return s.ui.ie && (!document.documentMode || document.documentMode < 9) && !e.button ? this._mouseUp(e) : this._mouseStarted ? (this._mouseDrag(e), e.preventDefault()) : (this._mouseDistanceMet(e) && this._mouseDelayMet(e) && (this._mouseStarted = !1 !== this._mouseStart(this._mouseDownEvent, e), this._mouseStarted ? this._mouseDrag(e) : this._mouseUp(e)), !this._mouseStarted)
		},
		_mouseUp: function(e) {
			return s(document).unbind("mousemove." + this.widgetName, this._mouseMoveDelegate).unbind("mouseup." + this.widgetName, this._mouseUpDelegate), this._mouseStarted && (this._mouseStarted = !1, e.target === this._mouseDownEvent.target && s.data(e.target, this.widgetName + ".preventClickEvent", !0), this._mouseStop(e)), !1
		},
		_mouseDistanceMet: function(e) {
			return Math.max(Math.abs(this._mouseDownEvent.pageX - e.pageX), Math.abs(this._mouseDownEvent.pageY - e.pageY)) >= this.options.distance
		},
		_mouseDelayMet: function() {
			return this.mouseDelayMet
		},
		_mouseStart: function() {},
		_mouseDrag: function() {},
		_mouseStop: function() {},
		_mouseCapture: function() {
			return !0
		}
	})
}(jQuery), function(b, u) {
	b.extend(b.ui, {
		datepicker: {
			version: "1.10.3"
		}
	});
	var s, o = "datepicker";

	function e() {
		this._curInst = null, this._keyEvent = !1, this._disabledInputs = [], this._datepickerShowing = !1, this._inDialog = !1, this._mainDivId = "ui-datepicker-div", this._inlineClass = "ui-datepicker-inline", this._appendClass = "ui-datepicker-append", this._triggerClass = "ui-datepicker-trigger", this._dialogClass = "ui-datepicker-dialog", this._disableClass = "ui-datepicker-disabled", this._unselectableClass = "ui-datepicker-unselectable", this._currentClass = "ui-datepicker-current-day", this._dayOverClass = "ui-datepicker-days-cell-over", this.regional = [], this.regional[""] = {
			closeText: "Done",
			prevText: "Prev",
			nextText: "Next",
			currentText: "Today",
			monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
			monthNamesShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
			dayNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
			dayNamesShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
			dayNamesMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
			weekHeader: "Wk",
			dateFormat: "mm/dd/yy",
			firstDay: 0,
			isRTL: !1,
			showMonthAfterYear: !1,
			yearSuffix: ""
		}, this._defaults = {
			showOn: "focus",
			showAnim: "fadeIn",
			showOptions: {},
			defaultDate: null,
			appendText: "",
			buttonText: "...",
			buttonImage: "",
			buttonImageOnly: !1,
			hideIfNoPrevNext: !1,
			navigationAsDateFormat: !1,
			gotoCurrent: !1,
			changeMonth: !1,
			changeYear: !1,
			yearRange: "c-10:c+10",
			showOtherMonths: !1,
			selectOtherMonths: !1,
			showWeek: !1,
			calculateWeek: this.iso8601Week,
			shortYearCutoff: "+10",
			minDate: null,
			maxDate: null,
			duration: "fast",
			beforeShowDay: null,
			beforeShow: null,
			onSelect: null,
			onChangeMonthYear: null,
			onClose: null,
			numberOfMonths: 1,
			showCurrentAtPos: 0,
			stepMonths: 1,
			stepBigMonths: 12,
			altField: "",
			altFormat: "",
			constrainInput: !0,
			showButtonPanel: !1,
			autoSize: !1,
			disabled: !1
		}, b.extend(this._defaults, this.regional[""]), this.dpDiv = i(b("<div id='" + this._mainDivId + "' class='ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all'></div>"))
	}
	function i(e) {
		var t = "button, .ui-datepicker-prev, .ui-datepicker-next, .ui-datepicker-calendar td a";
		return e.delegate(t, "mouseout", function() {
			b(this).removeClass("ui-state-hover"), -1 !== this.className.indexOf("ui-datepicker-prev") && b(this).removeClass("ui-datepicker-prev-hover"), -1 !== this.className.indexOf("ui-datepicker-next") && b(this).removeClass("ui-datepicker-next-hover")
		}).delegate(t, "mouseover", function() {
			b.datepicker._isDisabledDatepicker((s.inline ? e.parent() : s.input)[0]) || (b(this).parents(".ui-datepicker-calendar").find("a").removeClass("ui-state-hover"), b(this).addClass("ui-state-hover"), -1 !== this.className.indexOf("ui-datepicker-prev") && b(this).addClass("ui-datepicker-prev-hover"), -1 !== this.className.indexOf("ui-datepicker-next") && b(this).addClass("ui-datepicker-next-hover"))
		})
	}
	function l(e, t) {
		for (var i in b.extend(e, t), t) null == t[i] && (e[i] = t[i]);
		return e
	}
	b.extend(e.prototype, {
		markerClassName: "hasDatepicker",
		maxRows: 4,
		_widgetDatepicker: function() {
			return this.dpDiv
		},
		setDefaults: function(e) {
			return l(this._defaults, e || {}), this
		},
		_attachDatepicker: function(e, t) {
			var i, a = e.nodeName.toLowerCase(),
				s = "div" === a || "span" === a;
			e.id || (this.uuid += 1, e.id = "dp" + this.uuid), (i = this._newInst(b(e), s)).settings = b.extend({}, t || {}), "input" === a ? this._connectDatepicker(e, i) : s && this._inlineDatepicker(e, i)
		},
		_newInst: function(e, t) {
			return {
				id: e[0].id.replace(/([^A-Za-z0-9_\-])/g, "\\\\$1"),
				input: e,
				selectedDay: 0,
				selectedMonth: 0,
				selectedYear: 0,
				drawMonth: 0,
				drawYear: 0,
				inline: t,
				dpDiv: t ? i(b("<div class='" + this._inlineClass + " ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all'></div>")) : this.dpDiv
			}
		},
		_connectDatepicker: function(e, t) {
			var i = b(e);
			t.append = b([]), t.trigger = b([]), i.hasClass(this.markerClassName) || (this._attachments(i, t), i.addClass(this.markerClassName).keydown(this._doKeyDown).keypress(this._doKeyPress).keyup(this._doKeyUp), this._autoSize(t), b.data(e, o, t), t.settings.disabled && this._disableDatepicker(e))
		},
		_attachments: function(e, t) {
			var i, a = this._get(t, "appendText"),
				s = this._get(t, "isRTL");
			t.append && t.append.remove(), a && (t.append = b("<span class='" + this._appendClass + "'>" + a + "</span>"), e[s ? "before" : "after"](t.append)), e.unbind("focus", this._showDatepicker), t.trigger && t.trigger.remove(), "focus" !== (i = this._get(t, "showOn")) && "both" !== i || e.focus(this._showDatepicker), "button" !== i && "both" !== i || (a = this._get(t, "buttonText"), i = this._get(t, "buttonImage"), t.trigger = b(this._get(t, "buttonImageOnly") ? b("<img/>").addClass(this._triggerClass).attr({
				src: i,
				alt: a,
				title: a
			}) : b("<button type='button'></button>").addClass(this._triggerClass).html(i ? b("<img/>").attr({
				src: i,
				alt: a,
				title: a
			}) : a)), e[s ? "before" : "after"](t.trigger), t.trigger.click(function() {
				return b.datepicker._datepickerShowing && b.datepicker._lastInput === e[0] ? b.datepicker._hideDatepicker() : (b.datepicker._datepickerShowing && b.datepicker._lastInput !== e[0] && b.datepicker._hideDatepicker(), b.datepicker._showDatepicker(e[0])), !1
			}))
		},
		_autoSize: function(e) {
			var t, i, a, s, n, r;
			this._get(e, "autoSize") && !e.inline && (n = new Date(2009, 11, 20), (r = this._get(e, "dateFormat")).match(/[DM]/) && (t = function(e) {
				for (s = a = i = 0; s < e.length; s++) e[s].length > i && (i = e[s].length, a = s);
				return a
			}, n.setMonth(t(this._get(e, r.match(/MM/) ? "monthNames" : "monthNamesShort"))), n.setDate(t(this._get(e, r.match(/DD/) ? "dayNames" : "dayNamesShort")) + 20 - n.getDay())), e.input.attr("size", this._formatDate(e, n).length))
		},
		_inlineDatepicker: function(e, t) {
			var i = b(e);
			i.hasClass(this.markerClassName) || (i.addClass(this.markerClassName).append(t.dpDiv), b.data(e, o, t), this._setDate(t, this._getDefaultDate(t), !0), this._updateDatepicker(t), this._updateAlternate(t), t.settings.disabled && this._disableDatepicker(e), t.dpDiv.css("display", "block"))
		},
		_dialogDatepicker: function(e, t, i, a, s) {
			var n, r = this._dialogInst;
			return r || (this.uuid += 1, n = "dp" + this.uuid, this._dialogInput = b("<input type='text' id='" + n + "' style='position: absolute; top: -100px; width: 0px;'/>"), this._dialogInput.keydown(this._doKeyDown), b("body").append(this._dialogInput), (r = this._dialogInst = this._newInst(this._dialogInput, !1)).settings = {}, b.data(this._dialogInput[0], o, r)), l(r.settings, a || {}), t = t && t.constructor === Date ? this._formatDate(r, t) : t, this._dialogInput.val(t), this._pos = s ? s.length ? s : [s.pageX, s.pageY] : null, this._pos || (n = document.documentElement.clientWidth, a = document.documentElement.clientHeight, t = document.documentElement.scrollLeft || document.body.scrollLeft, s = document.documentElement.scrollTop || document.body.scrollTop, this._pos = [n / 2 - 100 + t, a / 2 - 150 + s]), this._dialogInput.css("left", this._pos[0] + 20 + "px").css("top", this._pos[1] + "px"), r.settings.onSelect = i, this._inDialog = !0, this.dpDiv.addClass(this._dialogClass), this._showDatepicker(this._dialogInput[0]), b.blockUI && b.blockUI(this.dpDiv), b.data(this._dialogInput[0], o, r), this
		},
		_destroyDatepicker: function(e) {
			var t, i = b(e),
				a = b.data(e, o);
			i.hasClass(this.markerClassName) && (t = e.nodeName.toLowerCase(), b.removeData(e, o), "input" === t ? (a.append.remove(), a.trigger.remove(), i.removeClass(this.markerClassName).unbind("focus", this._showDatepicker).unbind("keydown", this._doKeyDown).unbind("keypress", this._doKeyPress).unbind("keyup", this._doKeyUp)) : "div" !== t && "span" !== t || i.removeClass(this.markerClassName).empty())
		},
		_enableDatepicker: function(t) {
			var e, i = b(t),
				a = b.data(t, o);
			i.hasClass(this.markerClassName) && ("input" === (e = t.nodeName.toLowerCase()) ? (t.disabled = !1, a.trigger.filter("button").each(function() {
				this.disabled = !1
			}).end().filter("img").css({
				opacity: "1.0",
				cursor: ""
			})) : "div" !== e && "span" !== e || ((i = i.children("." + this._inlineClass)).children().removeClass("ui-state-disabled"), i.find("select.ui-datepicker-month, select.ui-datepicker-year").prop("disabled", !1)), this._disabledInputs = b.map(this._disabledInputs, function(e) {
				return e === t ? null : e
			}))
		},
		_disableDatepicker: function(t) {
			var e, i = b(t),
				a = b.data(t, o);
			i.hasClass(this.markerClassName) && ("input" === (e = t.nodeName.toLowerCase()) ? (t.disabled = !0, a.trigger.filter("button").each(function() {
				this.disabled = !0
			}).end().filter("img").css({
				opacity: "0.5",
				cursor: "default"
			})) : "div" !== e && "span" !== e || ((i = i.children("." + this._inlineClass)).children().addClass("ui-state-disabled"), i.find("select.ui-datepicker-month, select.ui-datepicker-year").prop("disabled", !0)), this._disabledInputs = b.map(this._disabledInputs, function(e) {
				return e === t ? null : e
			}), this._disabledInputs[this._disabledInputs.length] = t)
		},
		_isDisabledDatepicker: function(e) {
			if (!e) return !1;
			for (var t = 0; t < this._disabledInputs.length; t++) if (this._disabledInputs[t] === e) return !0;
			return !1
		},
		_getInst: function(e) {
			try {
				return b.data(e, o)
			} catch (e) {
				throw "Missing instance data for this datepicker"
			}
		},
		_optionDatepicker: function(e, t, i) {
			var a, s, n, r, o = this._getInst(e);
			if (2 === arguments.length && "string" == typeof t) return "defaults" === t ? b.extend({}, b.datepicker._defaults) : o ? "all" === t ? b.extend({}, o.settings) : this._get(o, t) : null;
			a = t || {}, "string" == typeof t && ((a = {})[t] = i), o && (this._curInst === o && this._hideDatepicker(), s = this._getDateDatepicker(e, !0), n = this._getMinMaxDate(o, "min"), r = this._getMinMaxDate(o, "max"), l(o.settings, a), null !== n && a.dateFormat !== u && a.minDate === u && (o.settings.minDate = this._formatDate(o, n)), null !== r && a.dateFormat !== u && a.maxDate === u && (o.settings.maxDate = this._formatDate(o, r)), "disabled" in a && (a.disabled ? this._disableDatepicker(e) : this._enableDatepicker(e)), this._attachments(b(e), o), this._autoSize(o), this._setDate(o, s), this._updateAlternate(o), this._updateDatepicker(o))
		},
		_changeDatepicker: function(e, t, i) {
			this._optionDatepicker(e, t, i)
		},
		_refreshDatepicker: function(e) {
			e = this._getInst(e);
			e && this._updateDatepicker(e)
		},
		_setDateDatepicker: function(e, t) {
			e = this._getInst(e);
			e && (this._setDate(e, t), this._updateDatepicker(e), this._updateAlternate(e))
		},
		_getDateDatepicker: function(e, t) {
			e = this._getInst(e);
			return e && !e.inline && this._setDateFromField(e, t), e ? this._getDate(e) : null
		},
		_doKeyDown: function(e) {
			var t, i, a = b.datepicker._getInst(e.target),
				s = !0,
				n = a.dpDiv.is(".ui-datepicker-rtl");
			if (a._keyEvent = !0, b.datepicker._datepickerShowing) switch (e.keyCode) {
			case 9:
				b.datepicker._hideDatepicker(), s = !1;
				break;
			case 13:
				return (i = b("td." + b.datepicker._dayOverClass + ":not(." + b.datepicker._currentClass + ")", a.dpDiv))[0] && b.datepicker._selectDay(e.target, a.selectedMonth, a.selectedYear, i[0]), (t = b.datepicker._get(a, "onSelect")) ? (i = b.datepicker._formatDate(a), t.apply(a.input ? a.input[0] : null, [i, a])) : b.datepicker._hideDatepicker(), !1;
			case 27:
				b.datepicker._hideDatepicker();
				break;
			case 33:
				b.datepicker._adjustDate(e.target, e.ctrlKey ? -b.datepicker._get(a, "stepBigMonths") : -b.datepicker._get(a, "stepMonths"), "M");
				break;
			case 34:
				b.datepicker._adjustDate(e.target, e.ctrlKey ? +b.datepicker._get(a, "stepBigMonths") : +b.datepicker._get(a, "stepMonths"), "M");
				break;
			case 35:
				(e.ctrlKey || e.metaKey) && b.datepicker._clearDate(e.target), s = e.ctrlKey || e.metaKey;
				break;
			case 36:
				(e.ctrlKey || e.metaKey) && b.datepicker._gotoToday(e.target), s = e.ctrlKey || e.metaKey;
				break;
			case 37:
				(e.ctrlKey || e.metaKey) && b.datepicker._adjustDate(e.target, n ? 1 : -1, "D"), s = e.ctrlKey || e.metaKey, e.originalEvent.altKey && b.datepicker._adjustDate(e.target, e.ctrlKey ? -b.datepicker._get(a, "stepBigMonths") : -b.datepicker._get(a, "stepMonths"), "M");
				break;
			case 38:
				(e.ctrlKey || e.metaKey) && b.datepicker._adjustDate(e.target, -7, "D"), s = e.ctrlKey || e.metaKey;
				break;
			case 39:
				(e.ctrlKey || e.metaKey) && b.datepicker._adjustDate(e.target, n ? -1 : 1, "D"), s = e.ctrlKey || e.metaKey, e.originalEvent.altKey && b.datepicker._adjustDate(e.target, e.ctrlKey ? +b.datepicker._get(a, "stepBigMonths") : +b.datepicker._get(a, "stepMonths"), "M");
				break;
			case 40:
				(e.ctrlKey || e.metaKey) && b.datepicker._adjustDate(e.target, 7, "D"), s = e.ctrlKey || e.metaKey;
				break;
			default:
				s = !1
			} else 36 === e.keyCode && e.ctrlKey ? b.datepicker._showDatepicker(this) : s = !1;
			s && (e.preventDefault(), e.stopPropagation())
		},
		_doKeyPress: function(e) {
			var t, i = b.datepicker._getInst(e.target);
			if (b.datepicker._get(i, "constrainInput")) return t = b.datepicker._possibleChars(b.datepicker._get(i, "dateFormat")), i = String.fromCharCode(null == e.charCode ? e.keyCode : e.charCode), e.ctrlKey || e.metaKey || i < " " || !t || -1 < t.indexOf(i)
		},
		_doKeyUp: function(e) {
			var t = b.datepicker._getInst(e.target);
			if (t.input.val() !== t.lastVal) try {
				b.datepicker.parseDate(b.datepicker._get(t, "dateFormat"), t.input ? t.input.val() : null, b.datepicker._getFormatConfig(t)) && (b.datepicker._setDateFromField(t), b.datepicker._updateAlternate(t), b.datepicker._updateDatepicker(t))
			} catch (e) {}
			return !0
		},
		_showDatepicker: function(e) {
			var t, i, a, s;
			"input" !== (e = e.target || e).nodeName.toLowerCase() && (e = b("input", e.parentNode)[0]), b.datepicker._isDisabledDatepicker(e) || b.datepicker._lastInput === e || (s = b.datepicker._getInst(e), b.datepicker._curInst && b.datepicker._curInst !== s && (b.datepicker._curInst.dpDiv.stop(!0, !0), s && b.datepicker._datepickerShowing && b.datepicker._hideDatepicker(b.datepicker._curInst.input[0])), !1 !== (i = (a = b.datepicker._get(s, "beforeShow")) ? a.apply(e, [e, s]) : {}) && (l(s.settings, i), s.lastVal = null, b.datepicker._lastInput = e, b.datepicker._setDateFromField(s), b.datepicker._inDialog && (e.value = ""), b.datepicker._pos || (b.datepicker._pos = b.datepicker._findPos(e), b.datepicker._pos[1] += e.offsetHeight), t = !1, b(e).parents().each(function() {
				return !(t |= "fixed" === b(this).css("position"))
			}), a = {
				left: b.datepicker._pos[0],
				top: b.datepicker._pos[1]
			}, b.datepicker._pos = null, s.dpDiv.empty(), s.dpDiv.css({
				position: "absolute",
				display: "block",
				top: "-1000px"
			}), b.datepicker._updateDatepicker(s), a = b.datepicker._checkOffset(s, a, t), s.dpDiv.css({
				position: b.datepicker._inDialog && b.blockUI ? "static" : t ? "fixed" : "absolute",
				display: "none",
				left: a.left + "px",
				top: a.top + "px"
			}), s.inline || (i = b.datepicker._get(s, "showAnim"), a = b.datepicker._get(s, "duration"), s.dpDiv.zIndex(b(e).zIndex() + 1), b.datepicker._datepickerShowing = !0, b.effects && b.effects.effect[i] ? s.dpDiv.show(i, b.datepicker._get(s, "showOptions"), a) : s.dpDiv[i || "show"](i ? a : null), b.datepicker._shouldFocusInput(s) && s.input.focus(), b.datepicker._curInst = s)))
		},
		_updateDatepicker: function(e) {
			this.maxRows = 4, (s = e).dpDiv.empty().append(this._generateHTML(e)), this._attachHandlers(e), e.dpDiv.find("." + this._dayOverClass + " a").mouseover();
			var t, i = this._getNumberOfMonths(e),
				a = i[1];
			e.dpDiv.removeClass("ui-datepicker-multi-2 ui-datepicker-multi-3 ui-datepicker-multi-4").width(""), 1 < a && e.dpDiv.addClass("ui-datepicker-multi-" + a).css("width", 17 * a + "em"), e.dpDiv[(1 !== i[0] || 1 !== i[1] ? "add" : "remove") + "Class"]("ui-datepicker-multi"), e.dpDiv[(this._get(e, "isRTL") ? "add" : "remove") + "Class"]("ui-datepicker-rtl"), e === b.datepicker._curInst && b.datepicker._datepickerShowing && b.datepicker._shouldFocusInput(e) && e.input.focus(), e.yearshtml && (t = e.yearshtml, setTimeout(function() {
				t === e.yearshtml && e.yearshtml && e.dpDiv.find("select.ui-datepicker-year:first").replaceWith(e.yearshtml), t = e.yearshtml = null
			}, 0))
		},
		_shouldFocusInput: function(e) {
			return e.input && e.input.is(":visible") && !e.input.is(":disabled") && !e.input.is(":focus")
		},
		_checkOffset: function(e, t, i) {
			var a = e.dpDiv.outerWidth(),
				s = e.dpDiv.outerHeight(),
				n = e.input ? e.input.outerWidth() : 0,
				r = e.input ? e.input.outerHeight() : 0,
				o = document.documentElement.clientWidth + (i ? 0 : b(document).scrollLeft()),
				u = document.documentElement.clientHeight + (i ? 0 : b(document).scrollTop());
			return t.left -= this._get(e, "isRTL") ? a - n : 0, t.left -= i && t.left === e.input.offset().left ? b(document).scrollLeft() : 0, t.top -= i && t.top === e.input.offset().top + r ? b(document).scrollTop() : 0, t.left -= Math.min(t.left, t.left + a > o && a < o ? Math.abs(t.left + a - o) : 0), t.top -= Math.min(t.top, t.top + s > u && s < u ? Math.abs(s + r) : 0), t
		},
		_findPos: function(e) {
			for (var t = this._getInst(e), i = this._get(t, "isRTL"); e && ("hidden" === e.type || 1 !== e.nodeType || b.expr.filters.hidden(e));) e = e[i ? "previousSibling" : "nextSibling"];
			return [(t = b(e).offset()).left, t.top]
		},
		_hideDatepicker: function(e) {
			var t, i, a = this._curInst;
			!a || e && a !== b.data(e, o) || this._datepickerShowing && (t = this._get(a, "showAnim"), i = this._get(a, "duration"), e = function() {
				b.datepicker._tidyDialog(a)
			}, b.effects && (b.effects.effect[t] || b.effects[t]) ? a.dpDiv.hide(t, b.datepicker._get(a, "showOptions"), i, e) : a.dpDiv["slideDown" === t ? "slideUp" : "fadeIn" === t ? "fadeOut" : "hide"](t ? i : null, e), t || e(), this._datepickerShowing = !1, (e = this._get(a, "onClose")) && e.apply(a.input ? a.input[0] : null, [a.input ? a.input.val() : "", a]), this._lastInput = null, this._inDialog && (this._dialogInput.css({
				position: "absolute",
				left: "0",
				top: "-100px"
			}), b.blockUI && (b.unblockUI(), b("body").append(this.dpDiv))), this._inDialog = !1)
		},
		_tidyDialog: function(e) {
			e.dpDiv.removeClass(this._dialogClass).unbind(".ui-datepicker-calendar")
		},
		_checkExternalClick: function(e) {
			var t;
			b.datepicker._curInst && (t = b(e.target), e = b.datepicker._getInst(t[0]), (t[0].id === b.datepicker._mainDivId || 0 !== t.parents("#" + b.datepicker._mainDivId).length || t.hasClass(b.datepicker.markerClassName) || t.closest("." + b.datepicker._triggerClass).length || !b.datepicker._datepickerShowing || b.datepicker._inDialog && b.blockUI) && (!t.hasClass(b.datepicker.markerClassName) || b.datepicker._curInst === e) || b.datepicker._hideDatepicker())
		},
		_adjustDate: function(e, t, i) {
			var a = b(e),
				e = this._getInst(a[0]);
			this._isDisabledDatepicker(a[0]) || (this._adjustInstDate(e, t + ("M" === i ? this._get(e, "showCurrentAtPos") : 0), i), this._updateDatepicker(e))
		},
		_gotoToday: function(e) {
			var t = b(e),
				i = this._getInst(t[0]);
			this._get(i, "gotoCurrent") && i.currentDay ? (i.selectedDay = i.currentDay, i.drawMonth = i.selectedMonth = i.currentMonth, i.drawYear = i.selectedYear = i.currentYear) : (e = new Date, i.selectedDay = e.getDate(), i.drawMonth = i.selectedMonth = e.getMonth(), i.drawYear = i.selectedYear = e.getFullYear()), this._notifyChange(i), this._adjustDate(t)
		},
		_selectMonthYear: function(e, t, i) {
			var a = b(e),
				e = this._getInst(a[0]);
			e["selected" + ("M" === i ? "Month" : "Year")] = e["draw" + ("M" === i ? "Month" : "Year")] = parseInt(t.options[t.selectedIndex].value, 10), this._notifyChange(e), this._adjustDate(a)
		},
		_selectDay: function(e, t, i, a) {
			var s = b(e);
			b(a).hasClass(this._unselectableClass) || this._isDisabledDatepicker(s[0]) || ((s = this._getInst(s[0])).selectedDay = s.currentDay = b("a", a).html(), s.selectedMonth = s.currentMonth = t, s.selectedYear = s.currentYear = i, this._selectDate(e, this._formatDate(s, s.currentDay, s.currentMonth, s.currentYear)))
		},
		_clearDate: function(e) {
			e = b(e);
			this._selectDate(e, "")
		},
		_selectDate: function(e, t) {
			var i = b(e),
				e = this._getInst(i[0]);
			t = null != t ? t : this._formatDate(e), e.input && e.input.val(t), this._updateAlternate(e), (i = this._get(e, "onSelect")) ? i.apply(e.input ? e.input[0] : null, [t, e]) : e.input && e.input.trigger("change"), e.inline ? this._updateDatepicker(e) : (this._hideDatepicker(), this._lastInput = e.input[0], "object" != typeof e.input[0] && e.input.focus(), this._lastInput = null)
		},
		_updateAlternate: function(e) {
			var t, i, a, s = this._get(e, "altField");
			s && (t = this._get(e, "altFormat") || this._get(e, "dateFormat"), i = this._getDate(e), a = this.formatDate(t, i, this._getFormatConfig(e)), b(s).each(function() {
				b(this).val(a)
			}))
		},
		noWeekends: function(e) {
			e = e.getDay();
			return [0 < e && e < 6, ""]
		},
		iso8601Week: function(e) {
			var t = new Date(e.getTime());
			return t.setDate(t.getDate() + 4 - (t.getDay() || 7)), e = t.getTime(), t.setMonth(0), t.setDate(1), Math.floor(Math.round((e - t) / 864e5) / 7) + 1
		},
		parseDate: function(t, s, e) {
			if (null == t || null == s) throw "Invalid arguments";
			if ("" === (s = "object" == typeof s ? s.toString() : s + "")) return null;

			function n(e) {
				return (e = D + 1 < t.length && t.charAt(D + 1) === e) && D++, e
			}
			function i(e) {
				var t = n(e),
					e = new RegExp("^\\d{1," + ("@" === e ? 14 : "!" === e ? 20 : "y" === e && t ? 4 : "o" === e ? 3 : 2) + "}");
				if (!(e = s.substring(h).match(e))) throw "Missing number at position " + h;
				return h += e[0].length, parseInt(e[0], 10)
			}
			function a(e, t, i) {
				var a = -1,
					t = b.map(n(e) ? i : t, function(e, t) {
						return [[t, e]]
					}).sort(function(e, t) {
						return -(e[1].length - t[1].length)
					});
				if (b.each(t, function(e, t) {
					var i = t[1];
					if (s.substr(h, i.length).toLowerCase() === i.toLowerCase()) return a = t[0], h += i.length, !1
				}), -1 !== a) return a + 1;
				throw "Unknown name at position " + h
			}
			function r() {
				if (s.charAt(h) !== t.charAt(D)) throw "Unexpected literal at position " + h;
				h++
			}
			for (var o, u, l, h = 0, c = (e ? e.shortYearCutoff : null) || this._defaults.shortYearCutoff, c = "string" != typeof c ? c : (new Date).getFullYear() % 100 + parseInt(c, 10), d = (e ? e.dayNamesShort : null) || this._defaults.dayNamesShort, p = (e ? e.dayNames : null) || this._defaults.dayNames, f = (e ? e.monthNamesShort : null) || this._defaults.monthNamesShort, g = (e ? e.monthNames : null) || this._defaults.monthNames, m = -1, _ = -1, v = -1, y = -1, k = !1, D = 0; D < t.length; D++) if (k)"'" !== t.charAt(D) || n("'") ? r() : k = !1;
			else switch (t.charAt(D)) {
			case "d":
				v = i("d");
				break;
			case "D":
				a("D", d, p);
				break;
			case "o":
				y = i("o");
				break;
			case "m":
				_ = i("m");
				break;
			case "M":
				_ = a("M", f, g);
				break;
			case "y":
				m = i("y");
				break;
			case "@":
				m = (l = new Date(i("@"))).getFullYear(), _ = l.getMonth() + 1, v = l.getDate();
				break;
			case "!":
				m = (l = new Date((i("!") - this._ticksTo1970) / 1e4)).getFullYear(), _ = l.getMonth() + 1, v = l.getDate();
				break;
			case "'":
				n("'") ? r() : k = !0;
				break;
			default:
				r()
			}
			if (h < s.length && (u = s.substr(h), !/^\s+/.test(u))) throw "Extra/unparsed characters found in date: " + u;
			if (-1 === m ? m = (new Date).getFullYear() : m < 100 && (m += (new Date).getFullYear() - (new Date).getFullYear() % 100 + (m <= c ? 0 : -100)), -1 < y) for (_ = 1, v = y;;) {
				if (v <= (o = this._getDaysInMonth(m, _ - 1))) break;
				_++, v -= o
			}
			if ((l = this._daylightSavingAdjust(new Date(m, _ - 1, v))).getFullYear() !== m || l.getMonth() + 1 !== _ || l.getDate() !== v) throw "Invalid date";
			return l
		},
		ATOM: "yy-mm-dd",
		COOKIE: "D, dd M yy",
		ISO_8601: "yy-mm-dd",
		RFC_822: "D, d M y",
		RFC_850: "DD, dd-M-y",
		RFC_1036: "D, d M y",
		RFC_1123: "D, d M yy",
		RFC_2822: "D, d M yy",
		RSS: "D, d M y",
		TICKS: "!",
		TIMESTAMP: "@",
		W3C: "yy-mm-dd",
		_ticksTo1970: 24 * (718685 + Math.floor(492.5) - Math.floor(19.7) + Math.floor(4.925)) * 60 * 60 * 1e7,
		formatDate: function(t, e, i) {
			if (!e) return "";

			function s(e) {
				return (e = r + 1 < t.length && t.charAt(r + 1) === e) && r++, e
			}
			function a(e, t, i) {
				var a = "" + t;
				if (s(e)) for (; a.length < i;) a = "0" + a;
				return a
			}
			function n(e, t, i, a) {
				return (s(e) ? a : i)[t]
			}
			var r, o = (i ? i.dayNamesShort : null) || this._defaults.dayNamesShort,
				u = (i ? i.dayNames : null) || this._defaults.dayNames,
				l = (i ? i.monthNamesShort : null) || this._defaults.monthNamesShort,
				h = (i ? i.monthNames : null) || this._defaults.monthNames,
				c = "",
				d = !1;
			if (e) for (r = 0; r < t.length; r++) if (d)"'" !== t.charAt(r) || s("'") ? c += t.charAt(r) : d = !1;
			else switch (t.charAt(r)) {
			case "d":
				c += a("d", e.getDate(), 2);
				break;
			case "D":
				c += n("D", e.getDay(), o, u);
				break;
			case "o":
				c += a("o", Math.round((new Date(e.getFullYear(), e.getMonth(), e.getDate()).getTime() - new Date(e.getFullYear(), 0, 0).getTime()) / 864e5), 3);
				break;
			case "m":
				c += a("m", e.getMonth() + 1, 2);
				break;
			case "M":
				c += n("M", e.getMonth(), l, h);
				break;
			case "y":
				c += s("y") ? e.getFullYear() : (e.getYear() % 100 < 10 ? "0" : "") + e.getYear() % 100;
				break;
			case "@":
				c += e.getTime();
				break;
			case "!":
				c += 1e4 * e.getTime() + this._ticksTo1970;
				break;
			case "'":
				s("'") ? c += "'" : d = !0;
				break;
			default:
				c += t.charAt(r)
			}
			return c
		},
		_possibleChars: function(t) {
			function e(e) {
				return (e = s + 1 < t.length && t.charAt(s + 1) === e) && s++, e
			}
			for (var i = "", a = !1, s = 0; s < t.length; s++) if (a)"'" !== t.charAt(s) || e("'") ? i += t.charAt(s) : a = !1;
			else switch (t.charAt(s)) {
			case "d":
			case "m":
			case "y":
			case "@":
				i += "0123456789";
				break;
			case "D":
			case "M":
				return null;
			case "'":
				e("'") ? i += "'" : a = !0;
				break;
			default:
				i += t.charAt(s)
			}
			return i
		},
		_get: function(e, t) {
			return (e.settings[t] !== u ? e.settings : this._defaults)[t]
		},
		_setDateFromField: function(e, t) {
			if (e.input.val() !== e.lastVal) {
				var i = this._get(e, "dateFormat"),
					a = e.lastVal = e.input ? e.input.val() : null,
					s = this._getDefaultDate(e),
					n = s,
					r = this._getFormatConfig(e);
				try {
					n = this.parseDate(i, a, r) || s
				} catch (e) {
					a = t ? "" : a
				}
				e.selectedDay = n.getDate(), e.drawMonth = e.selectedMonth = n.getMonth(), e.drawYear = e.selectedYear = n.getFullYear(), e.currentDay = a ? n.getDate() : 0, e.currentMonth = a ? n.getMonth() : 0, e.currentYear = a ? n.getFullYear() : 0, this._adjustInstDate(e)
			}
		},
		_getDefaultDate: function(e) {
			return this._restrictMinMax(e, this._determineDate(e, this._get(e, "defaultDate"), new Date))
		},
		_determineDate: function(o, e, t) {
			var i, a, e = null == e || "" === e ? t : "string" == typeof e ?
			function(e) {
				try {
					return b.datepicker.parseDate(b.datepicker._get(o, "dateFormat"), e, b.datepicker._getFormatConfig(o))
				} catch (e) {}
				for (var t = (e.toLowerCase().match(/^c/) ? b.datepicker._getDate(o) : null) || new Date, i = t.getFullYear(), a = t.getMonth(), s = t.getDate(), n = /([+\-]?[0-9]+)\s*(d|D|w|W|m|M|y|Y)?/g, r = n.exec(e); r;) {
					switch (r[2] || "d") {
					case "d":
					case "D":
						s += parseInt(r[1], 10);
						break;
					case "w":
					case "W":
						s += 7 * parseInt(r[1], 10);
						break;
					case "m":
					case "M":
						a += parseInt(r[1], 10), s = Math.min(s, b.datepicker._getDaysInMonth(i, a));
						break;
					case "y":
					case "Y":
						i += parseInt(r[1], 10), s = Math.min(s, b.datepicker._getDaysInMonth(i, a))
					}
					r = n.exec(e)
				}
				return new Date(i, a, s)
			}(e) : "number" == typeof e ? isNaN(e) ? t : (i = e, (a = new Date).setDate(a.getDate() + i), a) : new Date(e.getTime());
			return (e = e && "Invalid Date" === e.toString() ? t : e) && (e.setHours(0), e.setMinutes(0), e.setSeconds(0), e.setMilliseconds(0)), this._daylightSavingAdjust(e)
		},
		_daylightSavingAdjust: function(e) {
			return e ? (e.setHours(12 < e.getHours() ? e.getHours() + 2 : 0), e) : null
		},
		_setDate: function(e, t, i) {
			var a = !t,
				s = e.selectedMonth,
				n = e.selectedYear,
				t = this._restrictMinMax(e, this._determineDate(e, t, new Date));
			e.selectedDay = e.currentDay = t.getDate(), e.drawMonth = e.selectedMonth = e.currentMonth = t.getMonth(), e.drawYear = e.selectedYear = e.currentYear = t.getFullYear(), s === e.selectedMonth && n === e.selectedYear || i || this._notifyChange(e), this._adjustInstDate(e), e.input && e.input.val(a ? "" : this._formatDate(e))
		},
		_getDate: function(e) {
			return !e.currentYear || e.input && "" === e.input.val() ? null : this._daylightSavingAdjust(new Date(e.currentYear, e.currentMonth, e.currentDay))
		},
		_attachHandlers: function(e) {
			var t = this._get(e, "stepMonths"),
				i = "#" + e.id.replace(/\\\\/g, "\\");
			e.dpDiv.find("[data-handler]").map(function() {
				var e = {
					prev: function() {
						b.datepicker._adjustDate(i, -t, "M")
					},
					next: function() {
						b.datepicker._adjustDate(i, +t, "M")
					},
					hide: function() {
						b.datepicker._hideDatepicker()
					},
					today: function() {
						b.datepicker._gotoToday(i)
					},
					selectDay: function() {
						return b.datepicker._selectDay(i, +this.getAttribute("data-month"), +this.getAttribute("data-year"), this), !1
					},
					selectMonth: function() {
						return b.datepicker._selectMonthYear(i, this, "M"), !1
					},
					selectYear: function() {
						return b.datepicker._selectMonthYear(i, this, "Y"), !1
					}
				};
				b(this).bind(this.getAttribute("data-event"), e[this.getAttribute("data-handler")])
			})
		},
		_generateHTML: function(e) {
			var t, i, a, s, n, r, o, u, l, h, c, d, p, f, g, m, _, v, y, k, D, b, w, M, C, x, I, N, S, A, F, T, O = new Date,
				Y = this._daylightSavingAdjust(new Date(O.getFullYear(), O.getMonth(), O.getDate())),
				E = this._get(e, "isRTL"),
				j = this._get(e, "showButtonPanel"),
				P = this._get(e, "hideIfNoPrevNext"),
				W = this._get(e, "navigationAsDateFormat"),
				K = this._getNumberOfMonths(e),
				R = this._get(e, "showCurrentAtPos"),
				O = this._get(e, "stepMonths"),
				L = 1 !== K[0] || 1 !== K[1],
				H = this._daylightSavingAdjust(e.currentDay ? new Date(e.currentYear, e.currentMonth, e.currentDay) : new Date(9999, 9, 9)),
				U = this._getMinMaxDate(e, "min"),
				V = this._getMinMaxDate(e, "max"),
				z = e.drawMonth - R,
				B = e.drawYear;
			if (z < 0 && (z += 12, B--), V) for (t = this._daylightSavingAdjust(new Date(V.getFullYear(), V.getMonth() - K[0] * K[1] + 1, V.getDate())), t = U && t < U ? U : t; this._daylightSavingAdjust(new Date(B, z, 1)) > t;)--z < 0 && (z = 11, B--);
			for (e.drawMonth = z, e.drawYear = B, R = this._get(e, "prevText"), R = W ? this.formatDate(R, this._daylightSavingAdjust(new Date(B, z - O, 1)), this._getFormatConfig(e)) : R, i = this._canAdjustMonth(e, -1, B, z) ? "<a class='ui-datepicker-prev ui-corner-all' data-handler='prev' data-event='click' title='" + R + "'><span class='ui-icon ui-icon-circle-triangle-" + (E ? "e" : "w") + "'>" + R + "</span></a>" : P ? "" : "<a class='ui-datepicker-prev ui-corner-all ui-state-disabled' title='" + R + "'><span class='ui-icon ui-icon-circle-triangle-" + (E ? "e" : "w") + "'>" + R + "</span></a>", R = this._get(e, "nextText"), R = W ? this.formatDate(R, this._daylightSavingAdjust(new Date(B, z + O, 1)), this._getFormatConfig(e)) : R, a = this._canAdjustMonth(e, 1, B, z) ? "<a class='ui-datepicker-next ui-corner-all' data-handler='next' data-event='click' title='" + R + "'><span class='ui-icon ui-icon-circle-triangle-" + (E ? "w" : "e") + "'>" + R + "</span></a>" : P ? "" : "<a class='ui-datepicker-next ui-corner-all ui-state-disabled' title='" + R + "'><span class='ui-icon ui-icon-circle-triangle-" + (E ? "w" : "e") + "'>" + R + "</span></a>", P = this._get(e, "currentText"), R = this._get(e, "gotoCurrent") && e.currentDay ? H : Y, P = W ? this.formatDate(P, R, this._getFormatConfig(e)) : P, W = e.inline ? "" : "<button type='button' class='ui-datepicker-close ui-state-default ui-priority-primary ui-corner-all' data-handler='hide' data-event='click'>" + this._get(e, "closeText") + "</button>", W = j ? "<div class='ui-datepicker-buttonpane ui-widget-content'>" + (E ? W : "") + (this._isInRange(e, R) ? "<button type='button' class='ui-datepicker-current ui-state-default ui-priority-secondary ui-corner-all' data-handler='today' data-event='click'>" + P + "</button>" : "") + (E ? "" : W) + "</div>" : "", s = parseInt(this._get(e, "firstDay"), 10), s = isNaN(s) ? 0 : s, n = this._get(e, "showWeek"), r = this._get(e, "dayNames"), o = this._get(e, "dayNamesMin"), u = this._get(e, "monthNames"), l = this._get(e, "monthNamesShort"), h = this._get(e, "beforeShowDay"), c = this._get(e, "showOtherMonths"), d = this._get(e, "selectOtherMonths"), p = this._getDefaultDate(e), f = "", m = 0; m < K[0]; m++) {
				for (_ = "", this.maxRows = 4, v = 0; v < K[1]; v++) {
					if (y = this._daylightSavingAdjust(new Date(B, z, e.selectedDay)), k = " ui-corner-all", D = "", L) {
						if (D += "<div class='ui-datepicker-group", 1 < K[1]) switch (v) {
						case 0:
							D += " ui-datepicker-group-first", k = " ui-corner-" + (E ? "right" : "left");
							break;
						case K[1] - 1:
							D += " ui-datepicker-group-last", k = " ui-corner-" + (E ? "left" : "right");
							break;
						default:
							D += " ui-datepicker-group-middle", k = ""
						}
						D += "'>"
					}
					for (D += "<div class='ui-datepicker-header ui-widget-header ui-helper-clearfix" + k + "'>" + (/all|left/.test(k) && 0 === m ? E ? a : i : "") + (/all|right/.test(k) && 0 === m ? E ? i : a : "") + this._generateMonthYearHeader(e, z, B, U, V, 0 < m || 0 < v, u, l) + "</div><table class='ui-datepicker-calendar'><thead><tr>", b = n ? "<th class='ui-datepicker-week-col'>" + this._get(e, "weekHeader") + "</th>" : "", g = 0; g < 7; g++) b += "<th" + (5 <= (g + s + 6) % 7 ? " class='ui-datepicker-week-end'" : "") + "><span title='" + r[w = (g + s) % 7] + "'>" + o[w] + "</span></th>";
					for (D += b + "</tr></thead><tbody>", C = this._getDaysInMonth(B, z), B === e.selectedYear && z === e.selectedMonth && (e.selectedDay = Math.min(e.selectedDay, C)), M = (this._getFirstDayOfMonth(B, z) - s + 7) % 7, C = Math.ceil((M + C) / 7), x = L && this.maxRows > C ? this.maxRows : C, this.maxRows = x, I = this._daylightSavingAdjust(new Date(B, z, 1 - M)), N = 0; N < x; N++) {
						for (D += "<tr>", S = n ? "<td class='ui-datepicker-week-col'>" + this._get(e, "calculateWeek")(I) + "</td>" : "", g = 0; g < 7; g++) A = h ? h.apply(e.input ? e.input[0] : null, [I]) : [!0, ""], T = (F = I.getMonth() !== z) && !d || !A[0] || U && I < U || V && V < I, S += "<td class='" + (5 <= (g + s + 6) % 7 ? " ui-datepicker-week-end" : "") + (F ? " ui-datepicker-other-month" : "") + (I.getTime() === y.getTime() && z === e.selectedMonth && e._keyEvent || p.getTime() === I.getTime() && p.getTime() === y.getTime() ? " " + this._dayOverClass : "") + (T ? " " + this._unselectableClass + " ui-state-disabled" : "") + (F && !c ? "" : " " + A[1] + (I.getTime() === H.getTime() ? " " + this._currentClass : "") + (I.getTime() === Y.getTime() ? " ui-datepicker-today" : "")) + "'" + (F && !c || !A[2] ? "" : " title='" + A[2].replace(/'/g, "&#39;") + "'") + (T ? "" : " data-handler='selectDay' data-event='click' data-month='" + I.getMonth() + "' data-year='" + I.getFullYear() + "'") + ">" + (F && !c ? "&#xa0;" : T ? "<span class='ui-state-default'>" + I.getDate() + "</span>" : "<a class='ui-state-default" + (I.getTime() === Y.getTime() ? " ui-state-highlight" : "") + (I.getTime() === H.getTime() ? " ui-state-active" : "") + (F ? " ui-priority-secondary" : "") + "' href='#'>" + I.getDate() + "</a>") + "</td>", I.setDate(I.getDate() + 1), I = this._daylightSavingAdjust(I);
						D += S + "</tr>"
					}
					11 < ++z && (z = 0, B++), _ += D += "</tbody></table>" + (L ? "</div>" + (0 < K[0] && v === K[1] - 1 ? "<div class='ui-datepicker-row-break'></div>" : "") : "")
				}
				f += _
			}
			return f += W, e._keyEvent = !1, f
		},
		_generateMonthYearHeader: function(e, t, i, a, s, n, r, o) {
			var u, l, h, c, d, p, f, g = this._get(e, "changeMonth"),
				m = this._get(e, "changeYear"),
				_ = this._get(e, "showMonthAfterYear"),
				v = "<div class='ui-datepicker-title'>",
				y = "";
			if (n || !g) y += "<span class='ui-datepicker-month'>" + r[t] + "</span>";
			else {
				for (u = a && a.getFullYear() === i, l = s && s.getFullYear() === i, y += "<select class='ui-datepicker-month' data-handler='selectMonth' data-event='change'>", h = 0; h < 12; h++)(!u || h >= a.getMonth()) && (!l || h <= s.getMonth()) && (y += "<option value='" + h + "'" + (h === t ? " selected='selected'" : "") + ">" + o[h] + "</option>");
				y += "</select>"
			}
			if (_ || (v += y + (!n && g && m ? "" : "&#xa0;")), !e.yearshtml) if (e.yearshtml = "", n || !m) v += "<span class='ui-datepicker-year'>" + i + "</span>";
			else {
				for (c = this._get(e, "yearRange").split(":"), d = (new Date).getFullYear(), p = (r = function(e) {
					e = e.match(/c[+\-].*/) ? i + parseInt(e.substring(1), 10) : e.match(/[+\-].*/) ? d + parseInt(e, 10) : parseInt(e, 10);
					return isNaN(e) ? d : e
				})(c[0]), f = Math.max(p, r(c[1] || "")), p = a ? Math.max(p, a.getFullYear()) : p, f = s ? Math.min(f, s.getFullYear()) : f, e.yearshtml += "<select class='ui-datepicker-year' data-handler='selectYear' data-event='change'>"; p <= f; p++) e.yearshtml += "<option value='" + p + "'" + (p === i ? " selected='selected'" : "") + ">" + p + "</option>";
				e.yearshtml += "</select>", v += e.yearshtml, e.yearshtml = null
			}
			return v += this._get(e, "yearSuffix"), _ && (v += (!n && g && m ? "" : "&#xa0;") + y), v += "</div>"
		},
		_adjustInstDate: function(e, t, i) {
			var a = e.drawYear + ("Y" === i ? t : 0),
				s = e.drawMonth + ("M" === i ? t : 0),
				t = Math.min(e.selectedDay, this._getDaysInMonth(a, s)) + ("D" === i ? t : 0),
				t = this._restrictMinMax(e, this._daylightSavingAdjust(new Date(a, s, t)));
			e.selectedDay = t.getDate(), e.drawMonth = e.selectedMonth = t.getMonth(), e.drawYear = e.selectedYear = t.getFullYear(), "M" !== i && "Y" !== i || this._notifyChange(e)
		},
		_restrictMinMax: function(e, t) {
			var i = this._getMinMaxDate(e, "min"),
				e = this._getMinMaxDate(e, "max"),
				t = i && t < i ? i : t;
			return e && e < t ? e : t
		},
		_notifyChange: function(e) {
			var t = this._get(e, "onChangeMonthYear");
			t && t.apply(e.input ? e.input[0] : null, [e.selectedYear, e.selectedMonth + 1, e])
		},
		_getNumberOfMonths: function(e) {
			e = this._get(e, "numberOfMonths");
			return null == e ? [1, 1] : "number" == typeof e ? [1, e] : e
		},
		_getMinMaxDate: function(e, t) {
			return this._determineDate(e, this._get(e, t + "Date"), null)
		},
		_getDaysInMonth: function(e, t) {
			return 32 - this._daylightSavingAdjust(new Date(e, t, 32)).getDate()
		},
		_getFirstDayOfMonth: function(e, t) {
			return new Date(e, t, 1).getDay()
		},
		_canAdjustMonth: function(e, t, i, a) {
			var s = this._getNumberOfMonths(e),
				s = this._daylightSavingAdjust(new Date(i, a + (t < 0 ? t : s[0] * s[1]), 1));
			return t < 0 && s.setDate(this._getDaysInMonth(s.getFullYear(), s.getMonth())), this._isInRange(e, s)
		},
		_isInRange: function(e, t) {
			var i = this._getMinMaxDate(e, "min"),
				a = this._getMinMaxDate(e, "max"),
				s = null,
				n = null,
				r = this._get(e, "yearRange");
			return r && (e = r.split(":"), r = (new Date).getFullYear(), s = parseInt(e[0], 10), n = parseInt(e[1], 10), e[0].match(/[+\-].*/) && (s += r), e[1].match(/[+\-].*/) && (n += r)), (!i || t.getTime() >= i.getTime()) && (!a || t.getTime() <= a.getTime()) && (!s || t.getFullYear() >= s) && (!n || t.getFullYear() <= n)
		},
		_getFormatConfig: function(e) {
			var t = this._get(e, "shortYearCutoff");
			return {
				shortYearCutoff: t = "string" != typeof t ? t : (new Date).getFullYear() % 100 + parseInt(t, 10),
				dayNamesShort: this._get(e, "dayNamesShort"),
				dayNames: this._get(e, "dayNames"),
				monthNamesShort: this._get(e, "monthNamesShort"),
				monthNames: this._get(e, "monthNames")
			}
		},
		_formatDate: function(e, t, i, a) {
			t || (e.currentDay = e.selectedDay, e.currentMonth = e.selectedMonth, e.currentYear = e.selectedYear);
			t = t ? "object" == typeof t ? t : this._daylightSavingAdjust(new Date(a, i, t)) : this._daylightSavingAdjust(new Date(e.currentYear, e.currentMonth, e.currentDay));
			return this.formatDate(this._get(e, "dateFormat"), t, this._getFormatConfig(e))
		}
	}), b.fn.datepicker = function(e) {
		if (!this.length) return this;
		b.datepicker.initialized || (b(document).mousedown(b.datepicker._checkExternalClick), b.datepicker.initialized = !0), 0 === b("#" + b.datepicker._mainDivId).length && b("body").append(b.datepicker.dpDiv);
		var t = Array.prototype.slice.call(arguments, 1);
		return "string" == typeof e && ("isDisabled" === e || "getDate" === e || "widget" === e) || "option" === e && 2 === arguments.length && "string" == typeof arguments[1] ? b.datepicker["_" + e + "Datepicker"].apply(b.datepicker, [this[0]].concat(t)) : this.each(function() {
			"string" == typeof e ? b.datepicker["_" + e + "Datepicker"].apply(b.datepicker, [this].concat(t)) : b.datepicker._attachDatepicker(this, e)
		})
	}, b.datepicker = new e, b.datepicker.initialized = !1, b.datepicker.uuid = (new Date).getTime(), b.datepicker.version = "1.10.3"
}(jQuery), function(h) {
	h.widget("ui.slider", h.ui.mouse, {
		version: "1.10.3",
		widgetEventPrefix: "slide",
		options: {
			animate: !1,
			distance: 0,
			max: 100,
			min: 0,
			orientation: "horizontal",
			range: !1,
			step: 1,
			value: 0,
			values: null,
			change: null,
			slide: null,
			start: null,
			stop: null
		},
		_create: function() {
			this._keySliding = !1, this._mouseSliding = !1, this._animateOff = !0, this._handleIndex = null, this._detectOrientation(), this._mouseInit(), this.element.addClass("ui-slider ui-slider-" + this.orientation + " ui-widget ui-widget-content ui-corner-all"), this._refresh(), this._setOption("disabled", this.options.disabled), this._animateOff = !1
		},
		_refresh: function() {
			this._createRange(), this._createHandles(), this._setupEvents(), this._refreshValue()
		},
		_createHandles: function() {
			var e, t = this.options,
				i = this.element.find(".ui-slider-handle").addClass("ui-state-default ui-corner-all"),
				a = [],
				s = t.values && t.values.length || 1;
			for (i.length > s && (i.slice(s).remove(), i = i.slice(0, s)), e = i.length; e < s; e++) a.push("<a class='ui-slider-handle ui-state-default ui-corner-all' href='#'></a>");
			this.handles = i.add(h(a.join("")).appendTo(this.element)), this.handle = this.handles.eq(0), this.handles.each(function(e) {
				h(this).data("ui-slider-handle-index", e)
			})
		},
		_createRange: function() {
			var e = this.options,
				t = "";
			e.range ? (!0 === e.range && (e.values ? e.values.length && 2 !== e.values.length ? e.values = [e.values[0], e.values[0]] : h.isArray(e.values) && (e.values = e.values.slice(0)) : e.values = [this._valueMin(), this._valueMin()]), this.range && this.range.length ? this.range.removeClass("ui-slider-range-min ui-slider-range-max").css({
				left: "",
				bottom: ""
			}) : (this.range = h("<div></div>").appendTo(this.element), t = "ui-slider-range ui-widget-header ui-corner-all"), this.range.addClass(t + ("min" === e.range || "max" === e.range ? " ui-slider-range-" + e.range : ""))) : this.range = h([])
		},
		_setupEvents: function() {
			var e = this.handles.add(this.range).filter("a");
			this._off(e), this._on(e, this._handleEvents), this._hoverable(e), this._focusable(e)
		},
		_destroy: function() {
			this.handles.remove(), this.range.remove(), this.element.removeClass("ui-slider ui-slider-horizontal ui-slider-vertical ui-widget ui-widget-content ui-corner-all"), this._mouseDestroy()
		},
		_mouseCapture: function(e) {
			var i, a, s, n, t, r, o = this,
				u = this.options;
			return !u.disabled && (this.elementSize = {
				width: this.element.outerWidth(),
				height: this.element.outerHeight()
			}, this.elementOffset = this.element.offset(), r = {
				x: e.pageX,
				y: e.pageY
			}, i = this._normValueFromMouse(r), a = this._valueMax() - this._valueMin() + 1, this.handles.each(function(e) {
				var t = Math.abs(i - o.values(e));
				(t < a || a === t && (e === o._lastChangedValue || o.values(e) === u.min)) && (a = t, s = h(this), n = e)
			}), !1 !== this._start(e, n) && (this._mouseSliding = !0, this._handleIndex = n, s.addClass("ui-state-active").focus(), t = s.offset(), r = !h(e.target).parents().addBack().is(".ui-slider-handle"), this._clickOffset = r ? {
				left: 0,
				top: 0
			} : {
				left: e.pageX - t.left - s.width() / 2,
				top: e.pageY - t.top - s.height() / 2 - (parseInt(s.css("borderTopWidth"), 10) || 0) - (parseInt(s.css("borderBottomWidth"), 10) || 0) + (parseInt(s.css("marginTop"), 10) || 0)
			}, this.handles.hasClass("ui-state-hover") || this._slide(e, n, i), this._animateOff = !0))
		},
		_mouseStart: function() {
			return !0
		},
		_mouseDrag: function(e) {
			var t = {
				x: e.pageX,
				y: e.pageY
			},
				t = this._normValueFromMouse(t);
			return this._slide(e, this._handleIndex, t), !1
		},
		_mouseStop: function(e) {
			return this.handles.removeClass("ui-state-active"), this._mouseSliding = !1, this._stop(e, this._handleIndex), this._change(e, this._handleIndex), this._handleIndex = null, this._clickOffset = null, this._animateOff = !1
		},
		_detectOrientation: function() {
			this.orientation = "vertical" === this.options.orientation ? "vertical" : "horizontal"
		},
		_normValueFromMouse: function(e) {
			var t, e = "horizontal" === this.orientation ? (t = this.elementSize.width, e.x - this.elementOffset.left - (this._clickOffset ? this._clickOffset.left : 0)) : (t = this.elementSize.height, e.y - this.elementOffset.top - (this._clickOffset ? this._clickOffset.top : 0)),
				e = e / t;
			return 1 < e && (e = 1), e < 0 && (e = 0), "vertical" === this.orientation && (e = 1 - e), t = this._valueMax() - this._valueMin(), t = this._valueMin() + e * t, this._trimAlignValue(t)
		},
		_start: function(e, t) {
			var i = {
				handle: this.handles[t],
				value: this.value()
			};
			return this.options.values && this.options.values.length && (i.value = this.values(t), i.values = this.values()), this._trigger("start", e, i)
		},
		_slide: function(e, t, i) {
			var a, s;
			this.options.values && this.options.values.length ? (a = this.values(t ? 0 : 1), 2 === this.options.values.length && !0 === this.options.range && (0 === t && a < i || 1 === t && i < a) && (i = a), i !== this.values(t) && ((s = this.values())[t] = i, s = this._trigger("slide", e, {
				handle: this.handles[t],
				value: i,
				values: s
			}), a = this.values(t ? 0 : 1), !1 !== s && this.values(t, i, !0))) : i !== this.value() && !1 !== (s = this._trigger("slide", e, {
				handle: this.handles[t],
				value: i
			})) && this.value(i)
		},
		_stop: function(e, t) {
			var i = {
				handle: this.handles[t],
				value: this.value()
			};
			this.options.values && this.options.values.length && (i.value = this.values(t), i.values = this.values()), this._trigger("stop", e, i)
		},
		_change: function(e, t) {
			var i;
			this._keySliding || this._mouseSliding || (i = {
				handle: this.handles[t],
				value: this.value()
			}, this.options.values && this.options.values.length && (i.value = this.values(t), i.values = this.values()), this._lastChangedValue = t, this._trigger("change", e, i))
		},
		value: function(e) {
			return arguments.length ? (this.options.value = this._trimAlignValue(e), this._refreshValue(), void this._change(null, 0)) : this._value()
		},
		values: function(e, t) {
			var i, a, s;
			if (1 < arguments.length) return this.options.values[e] = this._trimAlignValue(t), this._refreshValue(), void this._change(null, e);
			if (!arguments.length) return this._values();
			if (!h.isArray(e)) return this.options.values && this.options.values.length ? this._values(e) : this.value();
			for (i = this.options.values, a = e, s = 0; s < i.length; s += 1) i[s] = this._trimAlignValue(a[s]), this._change(null, s);
			this._refreshValue()
		},
		_setOption: function(e, t) {
			var i, a = 0;
			switch ("range" === e && !0 === this.options.range && ("min" === t ? (this.options.value = this._values(0), this.options.values = null) : "max" === t && (this.options.value = this._values(this.options.values.length - 1), this.options.values = null)), h.isArray(this.options.values) && (a = this.options.values.length), h.Widget.prototype._setOption.apply(this, arguments), e) {
			case "orientation":
				this._detectOrientation(), this.element.removeClass("ui-slider-horizontal ui-slider-vertical").addClass("ui-slider-" + this.orientation), this._refreshValue();
				break;
			case "value":
				this._animateOff = !0, this._refreshValue(), this._change(null, 0), this._animateOff = !1;
				break;
			case "values":
				for (this._animateOff = !0, this._refreshValue(), i = 0; i < a; i += 1) this._change(null, i);
				this._animateOff = !1;
				break;
			case "min":
			case "max":
				this._animateOff = !0, this._refreshValue(), this._animateOff = !1;
				break;
			case "range":
				this._animateOff = !0, this._refresh(), this._animateOff = !1
			}
		},
		_value: function() {
			var e = this.options.value;
			return e = this._trimAlignValue(e)
		},
		_values: function(e) {
			var t, i, a;
			if (arguments.length) return t = this.options.values[e], this._trimAlignValue(t);
			if (this.options.values && this.options.values.length) {
				for (i = this.options.values.slice(), a = 0; a < i.length; a += 1) i[a] = this._trimAlignValue(i[a]);
				return i
			}
			return []
		},
		_trimAlignValue: function(e) {
			if (e <= this._valueMin()) return this._valueMin();
			if (e >= this._valueMax()) return this._valueMax();
			var t = 0 < this.options.step ? this.options.step : 1,
				i = (e - this._valueMin()) % t,
				e = e - i;
			return 2 * Math.abs(i) >= t && (e += 0 < i ? t : -t), parseFloat(e.toFixed(5))
		},
		_valueMin: function() {
			return this.options.min
		},
		_valueMax: function() {
			return this.options.max
		},
		_refreshValue: function() {
			var t, i, e, a, s, n = this.options.range,
				r = this.options,
				o = this,
				u = !this._animateOff && r.animate,
				l = {};
			this.options.values && this.options.values.length ? this.handles.each(function(e) {
				i = (o.values(e) - o._valueMin()) / (o._valueMax() - o._valueMin()) * 100, l["horizontal" === o.orientation ? "left" : "bottom"] = i + "%", h(this).stop(1, 1)[u ? "animate" : "css"](l, r.animate), !0 === o.options.range && ("horizontal" === o.orientation ? (0 === e && o.range.stop(1, 1)[u ? "animate" : "css"]({
					left: i + "%"
				}, r.animate), 1 === e && o.range[u ? "animate" : "css"]({
					width: i - t + "%"
				}, {
					queue: !1,
					duration: r.animate
				})) : (0 === e && o.range.stop(1, 1)[u ? "animate" : "css"]({
					bottom: i + "%"
				}, r.animate), 1 === e && o.range[u ? "animate" : "css"]({
					height: i - t + "%"
				}, {
					queue: !1,
					duration: r.animate
				}))), t = i
			}) : (e = this.value(), a = this._valueMin(), s = this._valueMax(), i = s !== a ? (e - a) / (s - a) * 100 : 0, l["horizontal" === this.orientation ? "left" : "bottom"] = i + "%", this.handle.stop(1, 1)[u ? "animate" : "css"](l, r.animate), "min" === n && "horizontal" === this.orientation && this.range.stop(1, 1)[u ? "animate" : "css"]({
				width: i + "%"
			}, r.animate), "max" === n && "horizontal" === this.orientation && this.range[u ? "animate" : "css"]({
				width: 100 - i + "%"
			}, {
				queue: !1,
				duration: r.animate
			}), "min" === n && "vertical" === this.orientation && this.range.stop(1, 1)[u ? "animate" : "css"]({
				height: i + "%"
			}, r.animate), "max" === n && "vertical" === this.orientation && this.range[u ? "animate" : "css"]({
				height: 100 - i + "%"
			}, {
				queue: !1,
				duration: r.animate
			}))
		},
		_handleEvents: {
			keydown: function(e) {
				var t, i, a, s = h(e.target).data("ui-slider-handle-index");
				switch (e.keyCode) {
				case h.ui.keyCode.HOME:
				case h.ui.keyCode.END:
				case h.ui.keyCode.PAGE_UP:
				case h.ui.keyCode.PAGE_DOWN:
				case h.ui.keyCode.UP:
				case h.ui.keyCode.RIGHT:
				case h.ui.keyCode.DOWN:
				case h.ui.keyCode.LEFT:
					if (e.preventDefault(), !this._keySliding && (this._keySliding = !0, h(e.target).addClass("ui-state-active"), !1 === this._start(e, s))) return
				}
				switch (a = this.options.step, t = i = this.options.values && this.options.values.length ? this.values(s) : this.value(), e.keyCode) {
				case h.ui.keyCode.HOME:
					i = this._valueMin();
					break;
				case h.ui.keyCode.END:
					i = this._valueMax();
					break;
				case h.ui.keyCode.PAGE_UP:
					i = this._trimAlignValue(t + (this._valueMax() - this._valueMin()) / 5);
					break;
				case h.ui.keyCode.PAGE_DOWN:
					i = this._trimAlignValue(t - (this._valueMax() - this._valueMin()) / 5);
					break;
				case h.ui.keyCode.UP:
				case h.ui.keyCode.RIGHT:
					if (t === this._valueMax()) return;
					i = this._trimAlignValue(t + a);
					break;
				case h.ui.keyCode.DOWN:
				case h.ui.keyCode.LEFT:
					if (t === this._valueMin()) return;
					i = this._trimAlignValue(t - a)
				}
				this._slide(e, s, i)
			},
			click: function(e) {
				e.preventDefault()
			},
			keyup: function(e) {
				var t = h(e.target).data("ui-slider-handle-index");
				this._keySliding && (this._keySliding = !1, this._stop(e, t), this._change(e, t), h(e.target).removeClass("ui-state-active"))
			}
		}
	})
}(jQuery), function(o) {
	var h, c, u, d, e, p, f, g, r, t, m, n, s, l, _, v, i, a, y, k, D = "ui-effects-";

	function b(e, t, i) {
		var a = g[t.type] || {};
		return null == e ? i || !t.def ? null : t.def : (e = a.floor ? ~~e : parseFloat(e), isNaN(e) ? t.def : a.mod ? (e + a.mod) % a.mod : e < 0 ? 0 : a.max < e ? a.max : e)
	}
	function w(a) {
		var s = p(),
			n = s._rgba = [];
		return a = a.toLowerCase(), m(e, function(e, t) {
			var i = t.re.exec(a),
				i = i && t.parse(i),
				t = t.space || "rgba";
			if (i) return i = s[t](i), s[f[t].cache] = i[f[t].cache], n = s._rgba = i._rgba, !1
		}), n.length ? ("0,0,0,0" === n.join() && h.extend(n, u.transparent), s) : u[a]
	}
	function M(e, t, i) {
		return 6 * (i = (i + 1) % 1) < 1 ? e + (t - e) * i * 6 : 2 * i < 1 ? t : 3 * i < 2 ? e + (t - e) * (2 / 3 - i) * 6 : e
	}
	function C(e) {
		var t, i, a = e.ownerDocument.defaultView ? e.ownerDocument.defaultView.getComputedStyle(e, null) : e.currentStyle,
			s = {};
		if (a && a.length && a[0] && a[a[0]]) for (i = a.length; i--;)"string" == typeof a[t = a[i]] && (s[o.camelCase(t)] = a[t]);
		else for (t in a)"string" == typeof a[t] && (s[t] = a[t]);
		return s
	}
	function x(e, t, i, a) {
		return o.isPlainObject(e) && (e = (t = e).effect), e = {
			effect: e
		}, null == t && (t = {}), o.isFunction(t) && (a = t, i = null, t = {}), "number" != typeof t && !o.fx.speeds[t] || (a = i, i = t, t = {}), o.isFunction(i) && (a = i, i = null), t && o.extend(e, t), i = i || t.duration, e.duration = o.fx.off ? 0 : "number" == typeof i ? i : i in o.fx.speeds ? o.fx.speeds[i] : o.fx.speeds._default, e.complete = a || t.complete, e
	}
	function I(e) {
		return !e || "number" == typeof e || o.fx.speeds[e] || ("string" == typeof e && !o.effects.effect[e] || (o.isFunction(e) || "object" == typeof e && !e.effect))
	}
	o.effects = {
		effect: {}
	}, h = jQuery, d = /^([\-+])=\s*(\d+\.?\d*)/, e = [{
		re: /rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,
		parse: function(e) {
			return [e[1], e[2], e[3], e[4]]
		}
	}, {
		re: /rgba?\(\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,
		parse: function(e) {
			return [2.55 * e[1], 2.55 * e[2], 2.55 * e[3], e[4]]
		}
	}, {
		re: /#([a-f0-9]{2})([a-f0-9]{2})([a-f0-9]{2})/,
		parse: function(e) {
			return [parseInt(e[1], 16), parseInt(e[2], 16), parseInt(e[3], 16)]
		}
	}, {
		re: /#([a-f0-9])([a-f0-9])([a-f0-9])/,
		parse: function(e) {
			return [parseInt(e[1] + e[1], 16), parseInt(e[2] + e[2], 16), parseInt(e[3] + e[3], 16)]
		}
	}, {
		re: /hsla?\(\s*(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,
		space: "hsla",
		parse: function(e) {
			return [e[1], e[2] / 100, e[3] / 100, e[4]]
		}
	}], p = h.Color = function(e, t, i, a) {
		return new h.Color.fn.parse(e, t, i, a)
	}, f = {
		rgba: {
			props: {
				red: {
					idx: 0,
					type: "byte"
				},
				green: {
					idx: 1,
					type: "byte"
				},
				blue: {
					idx: 2,
					type: "byte"
				}
			}
		},
		hsla: {
			props: {
				hue: {
					idx: 0,
					type: "degrees"
				},
				saturation: {
					idx: 1,
					type: "percent"
				},
				lightness: {
					idx: 2,
					type: "percent"
				}
			}
		}
	}, g = {
		byte: {
			floor: !0,
			max: 255
		},
		percent: {
			max: 1
		},
		degrees: {
			mod: 360,
			floor: !0
		}
	}, r = p.support = {}, t = h("<p>")[0], m = h.each, t.style.cssText = "background-color:rgba(1,1,1,.5)", r.rgba = -1 < t.style.backgroundColor.indexOf("rgba"), m(f, function(e, t) {
		t.cache = "_" + e, t.props.alpha = {
			idx: 3,
			type: "percent",
			def: 1
		}
	}), p.fn = h.extend(p.prototype, {
		parse: function(s, e, t, i) {
			if (s === c) return this._rgba = [null, null, null, null], this;
			(s.jquery || s.nodeType) && (s = h(s).css(e), e = c);
			var n = this,
				a = h.type(s),
				r = this._rgba = [];
			return e !== c && (s = [s, e, t, i], a = "array"), "string" === a ? this.parse(w(s) || u._default) : "array" === a ? (m(f.rgba.props, function(e, t) {
				r[t.idx] = b(s[t.idx], t)
			}), this) : "object" === a ? (m(f, s instanceof p ?
			function(e, t) {
				s[t.cache] && (n[t.cache] = s[t.cache].slice())
			} : function(e, i) {
				var a = i.cache;
				m(i.props, function(e, t) {
					if (!n[a] && i.to) {
						if ("alpha" === e || null == s[e]) return;
						n[a] = i.to(n._rgba)
					}
					n[a][t.idx] = b(s[e], t, !0)
				}), n[a] && h.inArray(null, n[a].slice(0, 3)) < 0 && (n[a][3] = 1, i.from && (n._rgba = i.from(n[a])))
			}), this) : void 0
		},
		is: function(e) {
			var s = p(e),
				n = !0,
				r = this;
			return m(f, function(e, t) {
				var i, a = s[t.cache];
				return a && (i = r[t.cache] || t.to && t.to(r._rgba) || [], m(t.props, function(e, t) {
					if (null != a[t.idx]) return n = a[t.idx] === i[t.idx]
				})), n
			}), n
		},
		_space: function() {
			var i = [],
				a = this;
			return m(f, function(e, t) {
				a[t.cache] && i.push(e)
			}), i.pop()
		},
		transition: function(e, r) {
			var t = (l = p(e))._space(),
				i = f[t],
				e = 0 === this.alpha() ? p("transparent") : this,
				o = e[i.cache] || i.to(e._rgba),
				u = o.slice(),
				l = l[i.cache];
			return m(i.props, function(e, t) {
				var i = t.idx,
					a = o[i],
					s = l[i],
					n = g[t.type] || {};
				null !== s && (null === a ? u[i] = s : (n.mod && (n.mod / 2 < s - a ? a += n.mod : n.mod / 2 < a - s && (a -= n.mod)), u[i] = b((s - a) * r + a, t)))
			}), this[t](u)
		},
		blend: function(e) {
			if (1 === this._rgba[3]) return this;
			var t = this._rgba.slice(),
				i = t.pop(),
				a = p(e)._rgba;
			return p(h.map(t, function(e, t) {
				return (1 - i) * a[t] + i * e
			}))
		},
		toRgbaString: function() {
			var e = "rgba(",
				t = h.map(this._rgba, function(e, t) {
					return null == e ? 2 < t ? 1 : 0 : e
				});
			return 1 === t[3] && (t.pop(), e = "rgb("), e + t.join() + ")"
		},
		toHslaString: function() {
			var e = "hsla(",
				t = h.map(this.hsla(), function(e, t) {
					return null == e && (e = 2 < t ? 1 : 0), t && t < 3 && (e = Math.round(100 * e) + "%"), e
				});
			return 1 === t[3] && (t.pop(), e = "hsl("), e + t.join() + ")"
		},
		toHexString: function(e) {
			var t = this._rgba.slice(),
				i = t.pop();
			return e && t.push(~~ (255 * i)), "#" + h.map(t, function(e) {
				return 1 === (e = (e || 0).toString(16)).length ? "0" + e : e
			}).join("")
		},
		toString: function() {
			return 0 === this._rgba[3] ? "transparent" : this.toRgbaString()
		}
	}), p.fn.parse.prototype = p.fn, f.hsla.to = function(e) {
		if (null == e[0] || null == e[1] || null == e[2]) return [null, null, null, e[3]];
		var t = e[0] / 255,
			i = e[1] / 255,
			a = e[2] / 255,
			s = e[3],
			n = Math.max(t, i, a),
			r = Math.min(t, i, a),
			o = n - r,
			u = n + r,
			e = .5 * u,
			i = r === n ? 0 : t === n ? 60 * (i - a) / o + 360 : i === n ? 60 * (a - t) / o + 120 : 60 * (t - i) / o + 240,
			u = 0 == o ? 0 : e <= .5 ? o / u : o / (2 - u);
		return [Math.round(i) % 360, u, e, null == s ? 1 : s]
	}, f.hsla.from = function(e) {
		if (null == e[0] || null == e[1] || null == e[2]) return [null, null, null, e[3]];
		var t = e[0] / 360,
			i = e[1],
			a = e[2],
			e = e[3],
			i = a <= .5 ? a * (1 + i) : a + i - a * i,
			a = 2 * a - i;
		return [Math.round(255 * M(a, i, t + 1 / 3)), Math.round(255 * M(a, i, t)), Math.round(255 * M(a, i, t - 1 / 3)), e]
	}, m(f, function(u, e) {
		var n = e.props,
			r = e.cache,
			o = e.to,
			l = e.from;
		p.fn[u] = function(e) {
			if (o && !this[r] && (this[r] = o(this._rgba)), e === c) return this[r].slice();
			var t, i = h.type(e),
				a = "array" === i || "object" === i ? e : arguments,
				s = this[r].slice();
			return m(n, function(e, t) {
				e = a["object" === i ? e : t.idx];
				null == e && (e = s[t.idx]), s[t.idx] = b(e, t)
			}), l ? ((t = p(l(s)))[r] = s, t) : p(s)
		}, m(n, function(r, o) {
			p.fn[r] || (p.fn[r] = function(e) {
				var t, i = h.type(e),
					a = "alpha" === r ? this._hsla ? "hsla" : "rgba" : u,
					s = this[a](),
					n = s[o.idx];
				return "undefined" === i ? n : ("function" === i && (e = e.call(this, n), i = h.type(e)), null == e && o.empty ? this : ("string" === i && (t = d.exec(e)) && (e = n + parseFloat(t[2]) * ("+" === t[1] ? 1 : -1)), s[o.idx] = e, this[a](s)))
			})
		})
	}), p.hook = function(e) {
		e = e.split(" ");
		m(e, function(e, n) {
			h.cssHooks[n] = {
				set: function(e, t) {
					var i, a, s = "";
					if ("transparent" !== t && ("string" !== h.type(t) || (i = w(t)))) {
						if (t = p(i || t), !r.rgba && 1 !== t._rgba[3]) {
							for (a = "backgroundColor" === n ? e.parentNode : e;
							("" === s || "transparent" === s) && a && a.style;) try {
								s = h.css(a, "backgroundColor"), a = a.parentNode
							} catch (e) {}
							t = t.blend(s && "transparent" !== s ? s : "_default")
						}
						t = t.toRgbaString()
					}
					try {
						e.style[n] = t
					} catch (e) {}
				}
			}, h.fx.step[n] = function(e) {
				e.colorInit || (e.start = p(e.elem, n), e.end = p(e.end), e.colorInit = !0), h.cssHooks[n].set(e.elem, e.start.transition(e.end, e.pos))
			}
		})
	}, p.hook("backgroundColor borderBottomColor borderLeftColor borderRightColor borderTopColor color columnRuleColor outlineColor textDecorationColor textEmphasisColor"), h.cssHooks.borderColor = {
		expand: function(i) {
			var a = {};
			return m(["Top", "Right", "Bottom", "Left"], function(e, t) {
				a["border" + t + "Color"] = i
			}), a
		}
	}, u = h.Color.names = {
		aqua: "#00ffff",
		black: "#000000",
		blue: "#0000ff",
		fuchsia: "#ff00ff",
		gray: "#808080",
		green: "#008000",
		lime: "#00ff00",
		maroon: "#800000",
		navy: "#000080",
		olive: "#808000",
		purple: "#800080",
		red: "#ff0000",
		silver: "#c0c0c0",
		teal: "#008080",
		white: "#ffffff",
		yellow: "#ffff00",
		transparent: [null, null, null, 0],
		_default: "#ffffff"
	}, _ = ["add", "remove", "toggle"], v = {
		border: 1,
		borderBottom: 1,
		borderColor: 1,
		borderLeft: 1,
		borderRight: 1,
		borderTop: 1,
		borderWidth: 1,
		margin: 1,
		padding: 1
	}, o.each(["borderLeftStyle", "borderRightStyle", "borderBottomStyle", "borderTopStyle"], function(e, t) {
		o.fx.step[t] = function(e) {
			("none" !== e.end && !e.setAttr || 1 === e.pos && !e.setAttr) && (jQuery.style(e.elem, t, e.end), e.setAttr = !0)
		}
	}), o.fn.addBack || (o.fn.addBack = function(e) {
		return this.add(null == e ? this.prevObject : this.prevObject.filter(e))
	}), o.effects.animateClass = function(s, e, t, i) {
		var n = o.speed(e, t, i);
		return this.queue(function() {
			var i = o(this),
				e = i.attr("class") || "",
				t = (t = n.children ? i.find("*").addBack() : i).map(function() {
					return {
						el: o(this),
						start: C(this)
					}
				}),
				a = function() {
					o.each(_, function(e, t) {
						s[t] && i[t + "Class"](s[t])
					})
				};
			a(), t = t.map(function() {
				return this.end = C(this.el[0]), this.diff = function(e, t) {
					var i, a, s = {};
					for (i in t) a = t[i], e[i] !== a && (v[i] || !o.fx.step[i] && isNaN(parseFloat(a)) || (s[i] = a));
					return s
				}(this.start, this.end), this
			}), i.attr("class", e), t = t.map(function() {
				var e = this,
					t = o.Deferred(),
					i = o.extend({}, n, {
						queue: !1,
						complete: function() {
							t.resolve(e)
						}
					});
				return this.el.animate(this.diff, i), t.promise()
			}), o.when.apply(o, t.get()).done(function() {
				a(), o.each(arguments, function() {
					var t = this.el;
					o.each(this.diff, function(e) {
						t.css(e, "")
					})
				}), n.complete.call(i[0])
			})
		})
	}, o.fn.extend({
		addClass: (l = o.fn.addClass, function(e, t, i, a) {
			return t ? o.effects.animateClass.call(this, {
				add: e
			}, t, i, a) : l.apply(this, arguments)
		}),
		removeClass: (s = o.fn.removeClass, function(e, t, i, a) {
			return 1 < arguments.length ? o.effects.animateClass.call(this, {
				remove: e
			}, t, i, a) : s.apply(this, arguments)
		}),
		toggleClass: (n = o.fn.toggleClass, function(e, t, i, a, s) {
			return "boolean" == typeof t || void 0 === t ? i ? o.effects.animateClass.call(this, t ? {
				add: e
			} : {
				remove: e
			}, i, a, s) : n.apply(this, arguments) : o.effects.animateClass.call(this, {
				toggle: e
			}, t, i, a)
		}),
		switchClass: function(e, t, i, a, s) {
			return o.effects.animateClass.call(this, {
				add: t,
				remove: e
			}, i, a, s)
		}
	}), o.extend(o.effects, {
		version: "1.10.3",
		save: function(e, t) {
			for (var i = 0; i < t.length; i++) null !== t[i] && e.data(D + t[i], e[0].style[t[i]])
		},
		restore: function(e, t) {
			for (var i, a = 0; a < t.length; a++) null !== t[a] && (void 0 === (i = e.data(D + t[a])) && (i = ""), e.css(t[a], i))
		},
		setMode: function(e, t) {
			return "toggle" === t && (t = e.is(":hidden") ? "show" : "hide"), t
		},
		getBaseline: function(e, t) {
			var i, a;
			switch (e[0]) {
			case "top":
				i = 0;
				break;
			case "middle":
				i = .5;
				break;
			case "bottom":
				i = 1;
				break;
			default:
				i = e[0] / t.height
			}
			switch (e[1]) {
			case "left":
				a = 0;
				break;
			case "center":
				a = .5;
				break;
			case "right":
				a = 1;
				break;
			default:
				a = e[1] / t.width
			}
			return {
				x: a,
				y: i
			}
		},
		createWrapper: function(i) {
			if (i.parent().is(".ui-effects-wrapper")) return i.parent();
			var a = {
				width: i.outerWidth(!0),
				height: i.outerHeight(!0),
				float: i.css("float")
			},
				e = o("<div></div>").addClass("ui-effects-wrapper").css({
					fontSize: "100%",
					background: "transparent",
					border: "none",
					margin: 0,
					padding: 0
				}),
				t = {
					width: i.width(),
					height: i.height()
				},
				s = document.activeElement;
			try {
				s.id
			} catch (e) {
				s = document.body
			}
			return i.wrap(e), i[0] !== s && !o.contains(i[0], s) || o(s).focus(), e = i.parent(), "static" === i.css("position") ? (e.css({
				position: "relative"
			}), i.css({
				position: "relative"
			})) : (o.extend(a, {
				position: i.css("position"),
				zIndex: i.css("z-index")
			}), o.each(["top", "left", "bottom", "right"], function(e, t) {
				a[t] = i.css(t), isNaN(parseInt(a[t], 10)) && (a[t] = "auto")
			}), i.css({
				position: "relative",
				top: 0,
				left: 0,
				right: "auto",
				bottom: "auto"
			})), i.css(t), e.css(a).show()
		},
		removeWrapper: function(e) {
			var t = document.activeElement;
			return e.parent().is(".ui-effects-wrapper") && (e.parent().replaceWith(e), e[0] !== t && !o.contains(e[0], t) || o(t).focus()), e
		},
		setTransition: function(a, e, s, n) {
			return n = n || {}, o.each(e, function(e, t) {
				var i = a.cssUnit(t);
				0 < i[0] && (n[t] = i[0] * s + i[1])
			}), n
		}
	}), o.fn.extend({
		effect: function() {
			var n = x.apply(this, arguments),
				e = n.mode,
				t = n.queue,
				r = o.effects.effect[n.effect];
			return o.fx.off || !r ? e ? this[e](n.duration, n.complete) : this.each(function() {
				n.complete && n.complete.call(this)
			}) : !1 === t ? this.each(i) : this.queue(t || "fx", i);

			function i(e) {
				var t = o(this),
					i = n.complete,
					a = n.mode;

				function s() {
					o.isFunction(i) && i.call(t[0]), o.isFunction(e) && e()
				}(t.is(":hidden") ? "hide" === a : "show" === a) ? (t[a](), s()) : r.call(t[0], n, s)
			}
		},
		show: (y = o.fn.show, function(e) {
			if (I(e)) return y.apply(this, arguments);
			var t = x.apply(this, arguments);
			return t.mode = "show", this.effect.call(this, t)
		}),
		hide: (a = o.fn.hide, function(e) {
			if (I(e)) return a.apply(this, arguments);
			var t = x.apply(this, arguments);
			return t.mode = "hide", this.effect.call(this, t)
		}),
		toggle: (i = o.fn.toggle, function(e) {
			if (I(e) || "boolean" == typeof e) return i.apply(this, arguments);
			var t = x.apply(this, arguments);
			return t.mode = "toggle", this.effect.call(this, t)
		}),
		cssUnit: function(e) {
			var i = this.css(e),
				a = [];
			return o.each(["em", "px", "%", "pt"], function(e, t) {
				0 < i.indexOf(t) && (a = [parseFloat(i), t])
			}), a
		}
	}), k = {}, o.each(["Quad", "Cubic", "Quart", "Quint", "Expo"], function(t, e) {
		k[e] = function(e) {
			return Math.pow(e, t + 2)
		}
	}), o.extend(k, {
		Sine: function(e) {
			return 1 - Math.cos(e * Math.PI / 2)
		},
		Circ: function(e) {
			return 1 - Math.sqrt(1 - e * e)
		},
		Elastic: function(e) {
			return 0 === e || 1 === e ? e : -Math.pow(2, 8 * (e - 1)) * Math.sin((80 * (e - 1) - 7.5) * Math.PI / 15)
		},
		Back: function(e) {
			return e * e * (3 * e - 2)
		},
		Bounce: function(e) {
			for (var t, i = 4; e < ((t = Math.pow(2, --i)) - 1) / 11;);
			return 1 / Math.pow(4, 3 - i) - 7.5625 * Math.pow((3 * t - 2) / 22 - e, 2)
		}
	}), o.each(k, function(e, t) {
		o.easing["easeIn" + e] = t, o.easing["easeOut" + e] = function(e) {
			return 1 - t(1 - e)
		}, o.easing["easeInOut" + e] = function(e) {
			return e < .5 ? t(2 * e) / 2 : 1 - t(-2 * e + 2) / 2
		}
	})
}(jQuery), function(r) {
	r.effects.effect.highlight = function(e, t) {
		var i = r(this),
			a = ["backgroundImage", "backgroundColor", "opacity"],
			s = r.effects.setMode(i, e.mode || "show"),
			n = {
				backgroundColor: i.css("backgroundColor")
			};
		"hide" === s && (n.opacity = 0), r.effects.save(i, a), i.show().css({
			backgroundImage: "none",
			backgroundColor: e.color || "#ffff99"
		}).animate(n, {
			queue: !1,
			duration: e.duration,
			easing: e.easing,
			complete: function() {
				"hide" === s && i.hide(), r.effects.restore(i, a), t()
			}
		})
	}
}(jQuery);