!function(a) {
    var b = {
        method: "GET",
        contentType: "json",
        queryParam: "q",
        searchDelay: 300,
        minChars: 1,
        propertyToSearch: "name",
        jsonContainer: null,
        hintText: "Type in a search term",
        noResultsText: "No results",
        searchingText: "Searching...",
        deleteText: "&times;",
        animateDropdown: !0,
        tokenLimit: null,
        tokenDelimiter: ",",
        preventDuplicates: !1,
        tokenValue: "id",
        prePopulate: null,
        processPrePopulate: !1,
        idPrefix: "token-input-",
        resultsFormatter: function(a) {
            return "<li>" + a[this.propertyToSearch] + "</li>";
        },
        tokenFormatter: function(a) {
            return "<li><p>" + a[this.propertyToSearch] + "</p></li>";
        },
        onResult: null,
        onAdd: null,
        onDelete: null,
        onReady: null
    }, c = {
        tokenList: "token-input-list",
        token: "token-input-token",
        tokenDelete: "token-input-delete-token",
        selectedToken: "token-input-selected-token",
        highlightedToken: "token-input-highlighted-token",
        dropdown: "token-input-dropdown",
        dropdownItem: "token-input-dropdown-item",
        dropdownItem2: "token-input-dropdown-item2",
        selectedDropdownItem: "token-input-selected-dropdown-item",
        inputToken: "token-input-input-token"
    }, d = 0, e = 1, f = 2, g = 8, h = 13, i = 27, j = 37, k = 38, l = 39, m = 40, n = 108, o = 188, p = {
        init: function(c, d) {
            var e = a.extend({}, b, d || {});
            return this.each(function() {
                a(this).data("tokenInputObject", new a.TokenList(this, c, e));
            });
        },
        clear: function() {
            return this.data("tokenInputObject").clear(), this;
        },
        add: function(a) {
            return this.data("tokenInputObject").add(a), this;
        },
        remove: function(a) {
            return this.data("tokenInputObject").remove(a), this;
        },
        get: function() {
            return this.data("tokenInputObject").getTokens();
        }
    };
    a.fn.tokenInput = function(a) {
        return p[a] ? p[a].apply(this, Array.prototype.slice.call(arguments, 1)) : p.init.apply(this, arguments);
    }, a.TokenList = function(b, p, q) {
        function E() {
            null !== q.tokenLimit && u >= q.tokenLimit && (w.hide(), L());
        }
        function F(b) {
            var d, c = q.tokenFormatter(b);
            return c = a(c).addClass(q.classes.token).insertBefore(C), a("<span>" + q.deleteText + "</span>").addClass(q.classes.tokenDelete).appendTo(c).click(function() {
                return J(a(this).parent()), x.change(), !1;
            }), d = {
                id: b.id
            }, d[q.propertyToSearch] = b[q.propertyToSearch], a.data(c.get(0), "tokeninput", b), 
            t = t.slice(0, z).concat([ d ]).concat(t.slice(z)), z++, K(t, x), u += 1, null !== q.tokenLimit && u >= q.tokenLimit && (w.hide(), 
            L()), c;
        }
        function G(b) {
            var d, c = q.onAdd;
            if (!b && 0 < w.val().length && ((b = {
                id: w.val()
            })[q.propertyToSearch] = w.val()), b) {
                if (u > 0 && q.preventDuplicates && (d = null, B.children().each(function() {
                    var c = a(this), e = a.data(c.get(0), "tokeninput");
                    return e && e.id === b.id ? (d = c, !1) : void 0;
                }), d)) return H(d), C.insertAfter(d), void w.focus();
                (null == q.tokenLimit || u < q.tokenLimit) && (F(b), E()), w.val(""), L(), a.isFunction(c) && c.call(x, b);
            }
        }
        function H(a) {
            a.addClass(q.classes.selectedToken), y = a.get(0), w.val(""), L();
        }
        function I(a, b) {
            a.removeClass(q.classes.selectedToken), y = null, b === d ? (C.insertBefore(a), 
            z--) : b === e ? (C.insertAfter(a), z++) : (C.appendTo(B), z = u), w.focus();
        }
        function J(b) {
            var c = a.data(b.get(0), "tokeninput"), d = q.onDelete, e = b.prevAll().length;
            e > z && e--, b.remove(), y = null, w.focus(), t = t.slice(0, e).concat(t.slice(e + 1)), 
            z > e && z--, K(t, x), --u, null !== q.tokenLimit && w.show().val("").focus(), a.isFunction(d) && d.call(x, c);
        }
        function K(b, c) {
            b = a.map(b, function(a) {
                return a[q.tokenValue];
            }), c.val(b.join(q.tokenDelimiter));
        }
        function L() {
            D.hide().empty(), A = null;
        }
        function M() {
            D.css({
                position: "absolute",
                top: a(B).offset().top + a(B).outerHeight(),
                left: a(B).offset().left,
                zindex: 999
            }).show();
        }
        function N(a, b, c) {
            return a.replace(new RegExp("(?![^&;]+;)(?!<[^<>]*)(" + b + ")(?![^<>]*>)(?![^&;]+;)", "g"), (c = c, 
            b.replace(new RegExp("(?![^&;]+;)(?!<[^<>]*)(" + c + ")(?![^<>]*>)(?![^&;]+;)", "gi"), "<b>$1</b>")));
        }
        function O(b, c) {
            var d;
            c && c.length ? (D.empty(), d = a("<ul>").appendTo(D).mouseover(function(b) {
                P(a(b.target).closest("li"));
            }).mousedown(function(b) {
                return G(a(b.target).closest("li").data("tokeninput")), x.change(), !1;
            }).hide(), a.each(c, function(c, e) {
                var f = N(f = q.resultsFormatter(e), e[q.propertyToSearch], b);
                f = a(f).appendTo(d), c % 2 ? f.addClass(q.classes.dropdownItem) : f.addClass(q.classes.dropdownItem2), 
                0 === c && P(f), a.data(f.get(0), "tokeninput", e);
            }), M(), q.animateDropdown ? d.slideDown("fast") : d.show()) : q.noResultsText && (D.html("<p>" + q.noResultsText + "</p>"), 
            M());
        }
        function P(b) {
            b && (A && (a(A).removeClass(q.classes.selectedDropdownItem), A = null), b.addClass(q.classes.selectedDropdownItem), 
            A = b.get(0));
        }
        function Q() {
            var b = w.val(), c = b.toLowerCase();
            c && c.length && (y && I(a(y), e), c.length >= q.minChars ? (q.searchingText && (D.html("<p>" + q.searchingText + "</p>"), 
            M()), clearTimeout(s), s = setTimeout(function() {
                !function(b, c) {
                    var f, g, d = c + R(), e = v.get(d);
                    e ? O(b, e) : q.url ? (g = R(), f = {
                        data: {}
                    }, -1 < g.indexOf("?") ? (e = g.split("?"), f.url = e[0], e = e[1].split("&"), a.each(e, function(a, b) {
                        b = b.split("="), f.data[b[0]] = b[1];
                    })) : f.url = g, f.data[q.queryParam] = b, f.type = q.method, f.dataType = q.contentType, 
                    q.crossDomain && (f.dataType = "jsonp"), f.success = function(e) {
                        a.isFunction(q.onResult) && (e = q.onResult.call(x, e, b, c)), v.add(d, q.jsonContainer ? e[q.jsonContainer] : e), 
                        w.val().toLowerCase() === b && O(b, q.jsonContainer ? e[q.jsonContainer] : e);
                    }, a.ajax(f)) : q.local_data && (g = a.grep(q.local_data, function(a) {
                        return -1 < a[q.propertyToSearch].toLowerCase().indexOf(b.toLowerCase());
                    }), a.isFunction(q.onResult) && (g = q.onResult.call(x, g, b, c)), v.add(d, g), 
                    O(b, g));
                }(c, b);
            }, q.searchDelay)) : L());
        }
        function R() {
            var a = q.url;
            return "function" == typeof q.url && (a = q.url.call()), a;
        }
        var r, s, t, u, v, w, x, y, z, A, B, C, D;
        "string" === a.type(p) || "function" === a.type(p) ? (q.url = p, r = R(), void 0 === q.crossDomain && (q.crossDomain = -1 === r.indexOf("://") ? !1 : location.href.split(/\/+/g)[1] !== r.split(/\/+/g)[1])) : "object" == typeof p && (q.local_data = p), 
        q.classes ? q.classes = a.extend({}, c, q.classes) : q.theme ? (q.classes = {}, 
        a.each(c, function(a, b) {
            q.classes[a] = b + "-" + q.theme;
        })) : q.classes = c, t = [], u = 0, v = new a.TokenList.Cache(), w = a('<input type="text"  autocomplete="off">').css({
            outline: "none"
        }).attr("id", q.idPrefix + b.id).focus(function() {
            null !== q.tokenLimit && q.tokenLimit === u || q.hintText && (D.html("<p>" + q.hintText + "</p>"), 
            M());
        }).blur(function() {
            L(), a(this).val("");
        }).keydown(function(b) {
            var c, f;
            switch (b.keyCode) {
              case j:
              case l:
              case k:
              case m:
                if (a(this).val()) return f = null, (f = b.keyCode === m || b.keyCode === l ? a(A).next() : a(A).prev()).length && P(f), 
                !1;
                c = C.prev(), f = C.next(), c.length && c.get(0) === y || f.length && f.get(0) === y ? b.keyCode === j || b.keyCode === k ? I(a(y), d) : I(a(y), e) : b.keyCode !== j && b.keyCode !== k || !c.length ? b.keyCode !== l && b.keyCode !== m || !f.length || H(a(f.get(0))) : H(a(c.get(0)));
                break;

              case g:
                if (c = C.prev(), !a(this).val().length) return y ? (J(a(y)), x.change()) : c.length && H(a(c.get(0))), 
                !1;
                1 === a(this).val().length ? L() : setTimeout(function() {
                    Q();
                }, 5);
                break;

              case h:
              case n:
              case o:
                return A ? (G(a(A).data("tokeninput")), x.change()) : G(null), !1;

              case i:
                return L(), !0;

              default:
                String.fromCharCode(b.which) && setTimeout(function() {
                    Q();
                }, 5);
            }
        }), x = a(b).hide().val("").focus(function() {
            w.focus();
        }).blur(function() {
            w.blur();
        }), y = null, z = 0, A = null, B = a("<ul />").addClass(q.classes.tokenList).click(function(b) {
            b = a(b.target).closest("li"), b && b.get(0) && a.data(b.get(0), "tokeninput") ? function(b) {
                var c = y;
                y && I(a(y), f), c === b.get(0) ? I(b, f) : H(b);
            }(b) : (y && I(a(y), f), w.focus());
        }).mouseover(function(b) {
            b = a(b.target).closest("li"), b && y !== this && b.addClass(q.classes.highlightedToken);
        }).mouseout(function(b) {
            b = a(b.target).closest("li"), b && y !== this && b.removeClass(q.classes.highlightedToken);
        }).insertBefore(x), C = a("<li />").addClass(q.classes.inputToken).appendTo(B).append(w), 
        D = a("<div>").addClass(q.classes.dropdown).appendTo("body").hide(), a("<tester/>").insertAfter(w).css({
            position: "absolute",
            top: -9999,
            left: -9999,
            width: "auto",
            fontSize: w.css("fontSize"),
            fontFamily: w.css("fontFamily"),
            fontWeight: w.css("fontWeight"),
            letterSpacing: w.css("letterSpacing"),
            whiteSpace: "nowrap"
        }), x.val(""), b = q.prePopulate || x.data("pre"), q.processPrePopulate && a.isFunction(q.onResult) && (b = q.onResult.call(x, b)), 
        b && b.length && a.each(b, function(a, b) {
            F(b), E();
        }), a.isFunction(q.onReady) && q.onReady.call(), this.clear = function() {
            B.children("li").each(function() {
                0 === a(this).children("input").length && J(a(this));
            });
        }, this.add = function(a) {
            G(a);
        }, this.remove = function(b) {
            B.children("li").each(function() {
                if (0 === a(this).children("input").length) {
                    var c, d = a(this).data("tokeninput"), e = !0;
                    for (c in b) if (b[c] !== d[c]) {
                        e = !1;
                        break;
                    }
                    e && J(a(this));
                }
            });
        }, this.getTokens = function() {
            return t;
        };
    }, a.TokenList.Cache = function(b) {
        var c = a.extend({
            max_size: 500
        }, b), d = {}, e = 0;
        this.add = function(a, b) {
            e > c.max_size && (d = {}, e = 0), d[a] || (e += 1), d[a] = b;
        }, this.get = function(a) {
            return d[a];
        };
    };
}(jQuery);