window.Typecho = {
	insertFileToEditor: function() {},
	uploadFile: function() {},
	editorResize: function(a, b) {
		$("#" + a).resizeable({
			minHeight: 100,
			afterResize: function(a) {
				$.post(b, {
					size: a
				})
			}
		})
	},
	uploadComplete: function() {}
}, function(a) {
	a.fn.dropdownMenu = function(b) {
		this.each(function() {
			var c = this,
				d = a.extend({
					menuEl: null,
					btnEl: null
				}, b);
			a(d.btnEl, c).click(function() {
				return a(this).toggleClass("active"), a(d.menuEl, c).toggle(), !1
			})
		})
	}, a.fn.resizeable = function(b) {
		var c = a.extend({
			minHeight: 100,
			afterResize: null
		}, b);
		return this.each(function() {
			function b(a) {
				var b = e(a).y,
					c = f + b;
				return h = b, c = Math.max(i, c), textarea.css("padding-bottom", String(c - 42) + "px"), textarea.innerHeight(c), i > c && d(), !1
			}
			function d() {
				var e = textarea.outerHeight();
				a(document).unbind("mousemove", b).unbind("mouseup", d), textarea.css("opacity", 1), textarea.focus(), textarea = null, f = null, h = 0, c.afterResize && c.afterResize.call(j, e)
			}
			function e(a) {
				return {
					x: a.clientX + document.documentElement.scrollLeft,
					y: a.clientY + document.documentElement.scrollTop
				}
			}
			var f, g = a('<span class="resize"><i></i></span>').insertAfter(this),
				h = 0,
				i = c.minHeight,
				j = this;
			g.bind("mousedown", {
				el: this
			}, function(c) {
				return textarea = a(c.data.el), textarea.blur(), h = e(c).y, f = textarea.innerHeight() - h, textarea.css("opacity", .25), a(document).mousemove(b).mouseup(d), !1
			})
		})
	}, a.fn.tableSelectable = function(b) {
		function c(b) {
			var b = a(b),
				c = a(e.checkEl, b),
				d = c.prop("checked");
			c.length && (c.prop("checked", !d), d ? b.removeClass("checked") : b.addClass("checked"))
		}
		var d = this,
			e = a.extend({
				checkEl: null,
				rowEl: null,
				selectAllEl: null,
				actionEl: null
			}, b);
		a(e.rowEl, this).each(function() {
			a(e.checkEl, this).click(function() {
				c(a(this).parents(e.rowEl))
			})
		}).click(function(b) {
			var d = a(b.toElement || b.target),
				e = d.prop("tagName").toLowerCase();
			0 <= a.inArray(e, ["input", "textarea", "a", "button", "i"]) && "checkbox" != d.attr("type") ? b.stopPropagation() : c(this)
		}), a(e.selectAllEl).click(function() {
			a(this).prop("checked") ? a(e.rowEl, d).each(function() {
				var b = a(this);
				0 < a(e.checkEl, this).prop("checked", !0).length && b.addClass("checked")
			}) : a(e.rowEl, d).each(function() {
				var b = a(this);
				0 < a(e.checkEl, this).prop("checked", !1).length && b.removeClass("checked")
			})
		}), a(e.actionEl).click(function() {
			var b = a(this),
				c = b.attr("lang");
			return c && !confirm(c) || d.parents("form").attr("action", b.attr("href")).submit(), !1
		})
	}
}($), function(a) {
	a.tableDnD = {
		currentTable: null,
		dragObject: null,
		mouseOffset: null,
		oldY: 0,
		build: function(b) {
			return b = b || {}, this.each(function() {
				var c, d, e;
				this.tableDnDConfig = {
					onDragStyle: b.onDragStyle,
					onDropStyle: b.onDropStyle,
					onDragClass: b.onDragClass || "tDnD_whileDrag",
					onDrop: b.onDrop,
					onDragStart: b.onDragStart,
					scrollAmount: b.scrollAmount || 5
				}, a.tableDnD.makeDraggable(this), 0 == $("tfoot", this).length && 0 < $("thead", this).length && (d = $("thead", this), e = $("th", d).length, c = $('<tfoot><tr><td style="padding:0;height:0;line-height:0;border:none" colspan="' + e + '"></td></tr></tfoot>').insertAfter(d), "tfoot" != (e = $("tr:last", this)).parent().prop("tagName").toLowerCase() && (e = (d = $("td", e)).height(), d.height(e - c.outerHeight())))
			}), a(document).bind("mousemove", a.tableDnD.mousemove).bind("mouseup", a.tableDnD.mouseup), this
		},
		makeDraggable: function(b) {
			for (var c = b.rows, d = b.tableDnDConfig, e = 0; e < c.length; e++) $(c[e]).hasClass("nodrag") || a(c[e]).mousedown(function(c) {
				return "TD" == c.target.tagName ? (a.tableDnD.dragObject = this, a.tableDnD.currentTable = b, a.tableDnD.mouseOffset = a.tableDnD.getMouseOffset(this, c), d.onDragStart && d.onDragStart(b, this), !1) : void 0
			}).css("cursor", "move")
		},
		mouseCoords: function(a) {
			return a.pageX || a.pageY ? {
				x: a.pageX,
				y: a.pageY
			} : {
				x: a.clientX + document.body.scrollLeft - document.body.clientLeft,
				y: a.clientY + document.body.scrollTop - document.body.clientTop
			}
		},
		getMouseOffset: function(a, b) {
			return b = b || window.event, a = this.getPosition(a), b = this.mouseCoords(b), {
				x: b.x - a.x,
				y: b.y - a.y
			}
		},
		getPosition: function(a) {
			var b = 0,
				c = 0;
			for (0 == a.offsetHeight && (a = a.firstChild); a.offsetParent;) b += a.offsetLeft, c += a.offsetTop, a = a.offsetParent;
			return {
				x: b += a.offsetLeft,
				y: c += a.offsetTop
			}
		},
		mousemove: function(b) {
			if (null != a.tableDnD.dragObject) {
				var c = a(a.tableDnD.dragObject),
					d = a.tableDnD.currentTable.tableDnDConfig,
					e = a.tableDnD.mouseCoords(b),
					f = e.y - a.tableDnD.mouseOffset.y,
					b = window.pageYOffset;
				return document.all && (void 0 !== document.compatMode && "BackCompat" != document.compatMode ? b = document.documentElement.scrollTop : void 0 !== document.body && (b = document.body.scrollTop)), e.y - b < d.scrollAmount ? window.scrollBy(0, -d.scrollAmount) : (window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight) - (e.y - b) < d.scrollAmount && window.scrollBy(0, d.scrollAmount), f != a.tableDnD.oldY && (b = f > a.tableDnD.oldY, a.tableDnD.oldY = f, d.onDragClass ? c.addClass(d.onDragClass) : c.css(d.onDragStyle), (f = a.tableDnD.findDropTargetRow(c, f)) && (b && a.tableDnD.dragObject != f ? a.tableDnD.dragObject.parentNode.insertBefore(a.tableDnD.dragObject, f.nextSibling) : b || a.tableDnD.dragObject == f || a.tableDnD.dragObject.parentNode.insertBefore(a.tableDnD.dragObject, f))), !1
			}
		},
		findDropTargetRow: function(b, c) {
			var d, e, f, g, h;
			for (d = a.tableDnD.currentTable.rows, e = 0; e < d.length; e++) if (f = d[e], g = this.getPosition(f).y, h = parseInt(f.offsetHeight) / 2, 0 == f.offsetHeight && (g = this.getPosition(f.firstChild).y, h = parseInt(f.firstChild.offsetHeight) / 2), c > g - h && g + h > c) return f == b ? null : (h = a.tableDnD.currentTable.tableDnDConfig, h.onAllowDrop ? h.onAllowDrop(b, f) ? f : null : $(f).hasClass("nodrop") ? null : f);
			return null
		},
		mouseup: function() {
			var b, c;
			a.tableDnD.currentTable && a.tableDnD.dragObject && (b = a.tableDnD.dragObject, (c = a.tableDnD.currentTable.tableDnDConfig).onDragClass ? a(b).removeClass(c.onDragClass) : a(b).css(c.onDropStyle), a.tableDnD.dragObject = null, c.onDrop && c.onDrop(a.tableDnD.currentTable, b), a.tableDnD.currentTable = null)
		},
		serialize: function() {
			if (a.tableDnD.currentTable) {
				for (var b = "", c = a.tableDnD.currentTable.id, d = a.tableDnD.currentTable.rows, e = 0; e < d.length; e++) 0 < b.length && (b += "&"), b += c + "[]=" + d[e].id;
				return b
			}
			return "Error: No Table id set, you need to set an id on your table and every row"
		}
	}, a.fn.extend({
		tableDnD: a.tableDnD.build
	})
}($), function(a) {
	var b, c, d, e = (c = document.createElement("input"), d = "onpaste", c.setAttribute(d, ""), ("function" == typeof c[d] ? "paste" : "input") + ".mask"),
		f = navigator.userAgent,
		g = /iphone/i.test(f),
		h = /android/i.test(f);
	a.mask = {
		definitions: {
			9: "[0-9]",
			a: "[A-Za-z]",
			"*": "[A-Za-z0-9]"
		},
		dataName: "rawMaskFn",
		placeholder: "_"
	}, a.fn.extend({
		caret: function(a, b) {
			var c;
			return 0 === this.length || this.is(":hidden") ? void 0 : "number" == typeof a ? (b = "number" == typeof b ? b : a, this.each(function() {
				this.setSelectionRange ? this.setSelectionRange(a, b) : this.createTextRange && ((c = this.createTextRange()).collapse(!0), c.moveEnd("character", b), c.moveStart("character", a), c.select())
			})) : (this[0].setSelectionRange ? (a = this[0].selectionStart, b = this[0].selectionEnd) : document.selection && document.selection.createRange && (c = document.selection.createRange(), a = 0 - c.duplicate().moveStart("character", -1e5), b = a + c.text.length), {
				begin: a,
				end: b
			})
		},
		unmask: function() {
			return this.trigger("unmask")
		},
		mask: function(c, d) {
			var f, i, j, k, l;
			return !c && 0 < this.length ? a(this[0]).data(a.mask.dataName)() : (d = a.extend({
				placeholder: a.mask.placeholder,
				completed: null
			}, d), f = a.mask.definitions, i = [], j = l = c.length, k = null, a.each(c.split(""), function(a, b) {
				"?" == b ? (l--, j = a) : f[b] ? (i.push(new RegExp(f[b])), null === k && (k = i.length - 1)) : i.push(null)
			}), this.trigger("unmask").each(function() {
				function m(a) {
					for (; ++a < l && !i[a];);
					return a
				}
				function n(a, b) {
					var c, e;
					if (!(0 > a)) {
						for (c = a, e = m(b); l > c; c++) if (i[c]) {
							if (!(l > e && i[c].test(s[e]))) break;
							s[c] = s[e], s[e] = d.placeholder, e = m(e)
						}
						p(), r.caret(Math.max(k, a))
					}
				}
				function o(a, b) {
					for (var c = a; b > c && l > c; c++) i[c] && (s[c] = d.placeholder)
				}
				function p() {
					r.val(s.join(""))
				}
				function q(a) {
					var b, c = r.val(),
						e = -1,
						f = 0;
					for (pos = 0; l > f; f++) if (i[f]) {
						for (s[f] = d.placeholder; pos++ < c.length;) if (b = c.charAt(pos - 1), i[f].test(b)) {
							s[f] = b, e = f;
							break
						}
						if (pos > c.length) break
					} else s[f] === c.charAt(pos) && f !== j && (pos++, e = f);
					return a ? p() : j > e + 1 ? (r.val(""), o(0, l)) : (p(), r.val(r.val().substring(0, e + 1))), j ? f : k
				}
				var r = a(this),
					s = a.map(c.split(""), function(a) {
						return "?" != a ? f[a] ? d.placeholder : a : void 0
					}),
					t = r.val();
				r.data(a.mask.dataName, function() {
					return a.map(s, function(a, b) {
						return i[b] && a != d.placeholder ? a : null
					}).join("")
				}), r.attr("readonly") || r.one("unmask", function() {
					r.unbind(".mask").removeData(a.mask.dataName)
				}).bind("focus.mask", function() {
					var a;
					clearTimeout(b), t = r.val(), a = q(), b = setTimeout(function() {
						p(), a == c.length ? r.caret(0, a) : r.caret(a)
					}, 10)
				}).bind("blur.mask", function() {
					q(), r.val() != t && r.change()
				}).bind("keydown.mask", function(a) {
					var b, c, d = a.which;
					8 === d || 46 === d || g && 127 === d ? (b = (c = r.caret()).begin, 0 == (c = c.end) - b && (b = 46 !== d ?
					function(a) {
						for (; 0 <= --a && !i[a];);
						return a
					}(b) : c = m(b - 1), c = 46 === d ? m(c) : c), o(b, c), n(b, c - 1), a.preventDefault()) : 27 == d && (r.val(t), r.caret(0, q()), a.preventDefault())
				}).bind("keypress.mask", function(b) {
					var c = b.which,
						e = r.caret();
					b.ctrlKey || b.altKey || b.metaKey || 32 > c || c && (0 != e.end - e.begin && (o(e.begin, e.end), n(e.begin, e.end - 1)), (e = m(e.begin - 1)) < l && (c = String.fromCharCode(c), i[e].test(c) && (function(a) {
						for (var b, c, e = a, f = d.placeholder; l > e; e++) if (i[e]) {
							if (b = m(e), c = s[e], s[e] = f, !(l > b && i[b].test(c))) break;
							f = c
						}
					}(e), s[e] = c, p(), e = m(e), h ? setTimeout(a.proxy(a.fn.caret, r, e), 0) : r.caret(e), d.completed && e >= l && d.completed.call(r))), b.preventDefault())
				}).bind(e, function() {
					setTimeout(function() {
						var a = q(!0);
						r.caret(a), d.completed && a == r.val().length && d.completed.call(r)
					}, 0)
				}), q()
			}))
		}
	})
}(jQuery), jQuery.fn.extend({
	getSelection: function() {
		var a = this.get(0);
		return a ? (("selectionStart" in a ?
		function() {
			var b = a.selectionEnd - a.selectionStart;
			return {
				start: a.selectionStart,
				end: a.selectionEnd,
				length: b,
				text: a.value.substr(a.selectionStart, b)
			}
		} : window.getSelection() &&
		function() {
			var a = window.getSelection().getRangeAt(0);
			return {
				start: a.startOffset,
				end: a.endOffset,
				length: a.endOffset - a.startOffset,
				text: a.toString()
			}
		}) || document.selection &&
		function() {
			var b, c, d;
			return a.focus(), b = document.selection.createRange(), null === b ? {
				start: 0,
				end: a.value.length,
				length: 0
			} : (c = a.createTextRange(), d = c.duplicate(), c.moveToBookmark(b.getBookmark()), d.setEndPoint("EndToStart", c), {
				start: d.text.length,
				end: d.text.length + b.text.length,
				length: b.text.length,
				text: b.text
			})
		} ||
		function() {
			return null
		})() : null
	},
	setSelection: function(a, b) {
		var c = this.get(0);
		c && (c.setSelectionRange ? (c.focus(), c.setSelectionRange(a, b)) : c.createTextRange && ((c = c.createTextRange()).collapse(!0), c.moveEnd("character", b), c.moveStart("character", a), c.select()))
	},
	replaceSelection: function() {
		var a, b = this.get(0);
		return b ? (a = arguments[0] || "", (("selectionStart" in b ?
		function() {
			return b.value = b.value.substr(0, b.selectionStart) + a + b.value.substr(b.selectionEnd, b.value.length), this
		} : document.selection &&
		function() {
			return b.focus(), document.selection.createRange().text = a, this
		}) ||
		function() {
			return b.value += a, jQuery(b)
		})()) : null
	}
}), jQuery.cookie = function(a, b, c) {
	if (1 < arguments.length && "[object Object]" !== String(b)) return c = jQuery.extend({}, c), null == b && (c.expires = -1), "number" == typeof c.expires && (d = c.expires, (e = c.expires = new Date).setDate(e.getDate() + d)), b = String(b), document.cookie = [encodeURIComponent(a), "=", c.raw ? b : encodeURIComponent(b), c.expires ? "; expires=" + c.expires.toUTCString() : "", c.path ? "; path=" + c.path : "", c.domain ? "; domain=" + c.domain : "", c.secure ? "; secure" : ""].join("");
	var d, e = (c = b || {}).raw ?
	function(a) {
		return a
	} : decodeURIComponent;
	return (d = new RegExp("(?:^|; )" + encodeURIComponent(a) + "=([^;]*)").exec(document.cookie)) ? e(d[1]) : null
}, function(a) {
	function b(a) {
		return "object" == typeof a ? a : {
			top: a,
			left: a
		}
	}
	var c = a.scrollTo = function(b, c, d) {
			a(window).scrollTo(b, c, d)
		};
	c.defaults = {
		axis: "xy",
		duration: 1.3 <= parseFloat(a.fn.jquery) ? 0 : 1,
		limit: !0
	}, c.window = function() {
		return a(window)._scrollable()
	}, a.fn._scrollable = function() {
		return this.map(function() {
			var b = this;
			return b.nodeName && -1 == a.inArray(b.nodeName.toLowerCase(), ["iframe", "#document", "html", "body"]) ? b : (b = (b.contentWindow || b).document || b.ownerDocument || b, /webkit/i.test(navigator.userAgent) || "BackCompat" == b.compatMode ? b.body : b.documentElement)
		})
	}, a.fn.scrollTo = function(d, e, f) {
		return "object" == typeof e && (f = e, e = 0), "function" == typeof f && (f = {
			onAfter: f
		}), "max" == d && (d = 9e9), f = a.extend({}, c.defaults, f), e = e || f.duration, f.queue = f.queue && 1 < f.axis.length, f.queue && (e /= 2), f.offset = b(f.offset), f.over = b(f.over), this._scrollable().each(function() {
			function g(a) {
				j.animate(l, e, f.easing, a &&
				function() {
					a.call(this, d, f)
				})
			}
			if (null != d) {
				var h, i = this,
					j = a(i),
					k = d,
					l = {},
					m = j.is("html,body");
				switch (typeof k) {
				case "number":
				case "string":
					if (/^([+-]=)?\d+(\.\d+)?(px|%)?$/.test(k)) {
						k = b(k);
						break
					}
					if (!(k = a(k, this)).length) return;
				case "object":
					(k.is || k.style) && (h = (k = a(k)).offset())
				}
				a.each(f.axis.split(""), function(a, b) {
					var d = "x" == b ? "Left" : "Top",
						e = d.toLowerCase(),
						n = "scroll" + d,
						o = i[n],
						p = c.max(i, b);
					h ? (l[n] = h[e] + (m ? 0 : o - j.offset()[e]), f.margin && (l[n] -= parseInt(k.css("margin" + d)) || 0, l[n] -= parseInt(k.css("border" + d + "Width")) || 0), l[n] += f.offset[e] || 0, f.over[e] && (l[n] += k["x" == b ? "width" : "height"]() * f.over[e])) : (e = k[e], l[n] = e.slice && "%" == e.slice(-1) ? parseFloat(e) / 100 * p : e), f.limit && /^\d+$/.test(l[n]) && (l[n] = l[n] <= 0 ? 0 : Math.min(l[n], p)), !a && f.queue && (o != l[n] && g(f.onAfterFirst), delete l[n])
				}), g(f.onAfter)
			}
		}).end()
	}, c.max = function(b, c) {
		var d = "x" == c ? "Width" : "Height",
			e = "scroll" + d;
		return a(b).is("html,body") ? (c = "client" + d, d = b.ownerDocument.documentElement, b = b.ownerDocument.body, Math.max(d[e], b[e]) - Math.min(d[c], b[c])) : b[e] - a(b)[d.toLowerCase()]()
	}
}(jQuery), jQuery.fn.css2 = jQuery.fn.css, jQuery.fn.css = function() {
	if (arguments.length) return jQuery.fn.css2.apply(this, arguments);
	for (var a = ["font-family", "font-size", "font-weight", "font-style", "color", "box-sizing", "text-transform", "text-decoration", "letter-spacing", "box-shadow", "line-height", "text-align", "vertical-align", "direction", "background-color", "background-image", "background-repeat", "background-position", "background-attachment", "opacity", "width", "height", "top", "right", "bottom", "left", "margin-top", "margin-right", "margin-bottom", "margin-left", "padding-top", "padding-right", "padding-bottom", "padding-left", "border-top-width", "border-right-width", "border-bottom-width", "border-left-width", "border-top-color", "border-right-color", "border-bottom-color", "border-left-color", "border-top-style", "border-right-style", "border-bottom-style", "border-left-style", "position", "display", "visibility", "z-index", "overflow-x", "overflow-y", "white-space", "clip", "float", "clear", "cursor", "list-style-image", "list-style-position", "list-style-type", "marker-offset", "word-wrap", "word-break", "word-spacing"], b = a.length, c = {}, d = 0; b > d; d++) c[a[d]] = jQuery.fn.css2.call(this, a[d]);
	return c
};