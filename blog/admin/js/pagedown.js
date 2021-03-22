var Markdown;

Markdown = "object" == typeof exports && "function" == typeof require ? exports : {}, 
function() {
    function a(a) {
        return a;
    }
    function b() {
        return !1;
    }
    function c() {}
    function d() {}
    c.prototype = {
        chain: function(b, c) {
            var d = this[b];
            if (!d) throw new Error("unknown hook " + b);
            this[b] = d === a ? c : function() {
                var a = Array.prototype.slice.call(arguments, 0);
                return a[0] = d.apply(null, a), c.apply(null, a);
            };
        },
        set: function(a, b) {
            if (!this[a]) throw new Error("unknown hook " + a);
            this[a] = b;
        },
        addNoop: function(b) {
            this[b] = a;
        },
        addFalse: function(a) {
            this[a] = b;
        }
    }, Markdown.HookCollection = c, d.prototype = {
        set: function(a, b) {
            this["s_" + a] = b;
        },
        get: function(a) {
            return this["s_" + a];
        }
    }, Markdown.Converter = function(b) {
        function e(a) {
            return a = a.replace(/^[ ]{0,3}\[([^\[\]]+)\]:[ \t]*\n?[ \t]*<?(\S+?)>?(?=\s|$)[ \t]*\n?[ \t]*((\n*)["(](.+?)[")][ \t]*)?(?:\n+)/gm, function(a, b, c, d, e, f) {
                return b = b.toLowerCase(), K.set(b, A(c)), e ? d : (f && L.set(b, f.replace(/"/g, "&quot;")), 
                "");
            });
        }
        function f(a) {
            return a = a.replace(/^(<(p|div|h[1-6]|blockquote|pre|table|dl|ol|ul|script|noscript|form|fieldset|iframe|math|ins|del)\b[^\r]*?\n<\/\2>[ \t]*(?=\n+))/gm, h), 
            a = a.replace(/^(<(p|div|h[1-6]|blockquote|pre|table|dl|ol|ul|script|noscript|form|fieldset|iframe|math)\b[^\r]*?.*<\/\2>[ \t]*(?=\n+)\n)/gm, h), 
            a = a.replace(/\n[ ]{0,3}((<(hr)\b([^<>])*?\/?>)[ \t]*(?=\n{2,}))/g, h), a = a.replace(/\n\n[ ]{0,3}(<!(--(?:|(?:[^>-]|-[^>])(?:[^-]|-[^-])*)--)>[ \t]*(?=\n{2,}))/g, h), 
            a = a.replace(/(?:\n\n)([ ]{0,3}(?:<([?%])[^\r]*?\2>)[ \t]*(?=\n{2,}))/g, h);
        }
        function g(a) {
            return a = a.replace(/(^\n+|\n+$)/g, ""), "\n\n~K" + (M.push(a) - 1) + "K\n\n";
        }
        function h(a, b) {
            return g(b);
        }
        function i(a, b) {
            a = X.preBlockGamut(a, R), a = q(a);
            var c = "<hr />\n";
            return a = a.replace(/^[ ]{0,2}([ ]?\*[ ]?){3,}[ \t]*$/gm, c), a = a.replace(/^[ ]{0,2}([ ]?-[ ]?){3,}[ \t]*$/gm, c), 
            a = a.replace(/^[ ]{0,2}([ ]?_[ ]?){3,}[ \t]*$/gm, c), a = r(a), a = t(a), a = y(a), 
            a = X.postBlockGamut(a, R), a = f(a), a = z(a, b);
        }
        function j(a) {
            return a = X.preSpanGamut(a), a = u(a), a = k(a), a = B(a), a = n(a), a = l(a), 
            a = D(a), a = a.replace(/~P/g, "://"), a = A(a), a = Q(a), a = a.replace(/  +\n/g, " <br>\n"), 
            a = X.postSpanGamut(a);
        }
        function k(a) {
            var b = /(<[a-z\/!$]("[^"]*"|'[^']*'|[^'">])*>|<!(--(?:|(?:[^>-]|-[^>])(?:[^-]|-[^-])*)--)>)/gi;
            return a = a.replace(b, function(a) {
                var b = a.replace(/(.)<\/?code>(?=.)/g, "$1`");
                return b = I(b, "!" == a.charAt(1) ? "\\`*_/" : "\\`*_");
            });
        }
        function l(a) {
            return -1 === a.indexOf("[") ? a : (a = a.replace(/(\[((?:\[[^\]]*\]|[^\[\]])*)\][ ]?(?:\n[ ]*)?\[(.*?)\])()()()()/g, m), 
            a = a.replace(/(\[((?:\[[^\]]*\]|[^\[\]])*)\]\([ \t]*()<?((?:\([^)]*\)|[^()\s])*?)>?[ \t]*((['"])(.*?)\6[ \t]*)?\))/g, m), 
            a = a.replace(/(\[([^\[\]]+)\])()()()()()/g, m));
        }
        function m(a, b, c, d, e, f, g, h) {
            var i, j, k, l, m, n;
            if (void 0 == h && (h = ""), i = b, j = c.replace(/:\/\//g, "~P"), k = d.toLowerCase(), 
            l = e, m = h, "" == l) if ("" == k && (k = j.toLowerCase().replace(/ ?\n/g, " ")), 
            l = "#" + k, void 0 != K.get(k)) l = K.get(k), void 0 != L.get(k) && (m = L.get(k)); else {
                if (!(i.search(/\(\s*\)$/m) > -1)) return i;
                l = "";
            }
            return l = H(l), n = '<a href="' + l + '"', "" != m && (m = o(m), m = I(m, "*_"), 
            n += ' title="' + m + '"'), n += ">" + j + "</a>";
        }
        function n(a) {
            return -1 === a.indexOf("![") ? a : (a = a.replace(/(!\[(.*?)\][ ]?(?:\n[ ]*)?\[(.*?)\])()()()()/g, p), 
            a = a.replace(/(!\[(.*?)\]\s?\([ \t]*()<?(\S+?)>?[ \t]*((['"])(.*?)\6[ \t]*)?\))/g, p));
        }
        function o(a) {
            return a.replace(/>/g, "&gt;").replace(/</g, "&lt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
        }
        function p(a, b, c, d, e, f, g, h) {
            var i, j = b, k = c, l = d.toLowerCase(), m = e, n = h;
            if (n || (n = ""), "" == m) {
                if ("" == l && (l = k.toLowerCase().replace(/ ?\n/g, " ")), m = "#" + l, void 0 == K.get(l)) return j;
                m = K.get(l), void 0 != L.get(l) && (n = L.get(l));
            }
            return k = I(o(k), "*_[]()"), m = I(m, "*_"), i = '<img src="' + m + '" alt="' + k + '"', 
            n = o(n), n = I(n, "*_"), i += ' title="' + n + '"', i += " />";
        }
        function q(a) {
            return a = a.replace(/^(.+)[ \t]*\n=+[ \t]*\n+/gm, function(a, b) {
                return "<h1>" + j(b) + "</h1>\n\n";
            }), a = a.replace(/^(.+)[ \t]*\n-+[ \t]*\n+/gm, function(a, b) {
                return "<h2>" + j(b) + "</h2>\n\n";
            }), a = a.replace(/^(\#{1,6})[ \t]*(.+?)[ \t]*\#*\n+/gm, function(a, b, c) {
                var d = b.length;
                return "<h" + d + ">" + j(c) + "</h" + d + ">\n\n";
            });
        }
        function r(a, b) {
            a += "~0";
            var c = /^(([ ]{0,3}([*+-]|\d+[.])[ \t]+)[^\r]+?(~0|\n{2,}(?=\S)(?![ \t]*(?:[*+-]|\d+[.])[ \t]+)))/gm;
            return N ? a = a.replace(c, function(a, c, d) {
                var e, f, g, h = c, i = d.search(/[*+-]/g) > -1 ? "ul" : "ol";
                return "ol" === i && (e = parseInt(d, 10)), f = s(h, i, b), f = f.replace(/\s+$/, ""), 
                g = "<" + i, e && 1 !== e && (g += ' start="' + e + '"'), f = g + ">" + f + "</" + i + ">\n";
            }) : (c = /(\n\n|^\n?)(([ ]{0,3}([*+-]|\d+[.])[ \t]+)[^\r]+?(~0|\n{2,}(?=\S)(?![ \t]*(?:[*+-]|\d+[.])[ \t]+)))/g, 
            a = a.replace(c, function(a, b, c, d) {
                var e, f, g, h = b, i = c, j = d.search(/[*+-]/g) > -1 ? "ul" : "ol";
                return "ol" === j && (e = parseInt(d, 10)), f = s(i, j), g = "<" + j, e && 1 !== e && (g += ' start="' + e + '"'), 
                f = h + g + ">\n" + f + "</" + j + ">\n";
            })), a = a.replace(/~0/, "");
        }
        function s(a, b, c) {
            var d, e, f;
            return N++, a = a.replace(/\n{2,}$/, "\n"), a += "~0", d = S[b], e = new RegExp("(^[ \\t]*)(" + d + ")[ \\t]+([^\\r]+?(\\n+))(?=(~0|\\1(" + d + ")[ \\t]+))", "gm"), 
            f = !1, a = a.replace(e, function(a, b, d, e) {
                var g = e, h = /\n\n$/.test(g), k = h || g.search(/\n{2,}/) > -1;
                return k || f ? g = i(F(g), !0) : (g = r(F(g), !0), g = g.replace(/\n$/, ""), c || (g = j(g))), 
                f = h, "<li>" + g + "</li>\n";
            }), a = a.replace(/~0/g, ""), N--, a;
        }
        function t(a) {
            return a += "~0", a = a.replace(/(?:\n\n|^\n?)((?:(?:[ ]{4}|\t).*\n+)+)(\n*[ ]{0,3}[^ \t\n]|(?=~0))/g, function(a, b, c) {
                var d = b, e = c;
                return d = v(F(d)), d = G(d), d = d.replace(/^\n+/g, ""), d = d.replace(/\n+$/g, ""), 
                d = "<pre><code>" + d + "\n</code></pre>", "\n\n" + d + "\n\n" + e;
            }), a = a.replace(/~0/, "");
        }
        function u(a) {
            return a = a.replace(/(^|[^\\`])(`+)(?!`)([^\r]*?[^`])\2(?!`)/gm, function(a, b, c, d) {
                var e = d;
                return e = e.replace(/^([ \t]*)/g, ""), e = e.replace(/[ \t]*$/g, ""), e = v(e), 
                e = e.replace(/:\/\//g, "~P"), b + "<code>" + e + "</code>";
            });
        }
        function v(a) {
            return a = a.replace(/&/g, "&amp;"), a = a.replace(/</g, "&lt;"), a = a.replace(/>/g, "&gt;"), 
            a = I(a, "*_{}[]\\", !1);
        }
        function w(a) {
            return -1 === a.indexOf("*") && -1 === a.indexOf("_") ? a : (a = O(a), a = a.replace(/(^|[\W_])(?:(?!\1)|(?=^))(\*|_)\2(?=\S)([^\r]*?\S)\2\2(?!\2)(?=[\W_]|$)/g, "$1<strong>$3</strong>"), 
            a = a.replace(/(^|[\W_])(?:(?!\1)|(?=^))(\*|_)(?=\S)((?:(?!\2)[^\r])*?\S)\2(?!\2)(?=[\W_]|$)/g, "$1<em>$3</em>"), 
            P(a));
        }
        function x(a) {
            return -1 === a.indexOf("*") && -1 === a.indexOf("_") ? a : (a = O(a), a = a.replace(/(?=[^\r][*_]|[*_])(^|(?=\W__|(?!\*)[\W_]\*\*|\w\*\*\w)[^\r])(\*\*|__)(?!\2)(?=\S)((?:|[^\r]*?(?!\2)[^\r])(?=\S_|\w|\S\*\*(?:[\W_]|$)).)(?=__(?:\W|$)|\*\*(?:[^*]|$))\2/g, "$1<strong>$3</strong>"), 
            a = a.replace(/(?=[^\r][*_]|[*_])(^|(?=\W_|(?!\*)(?:[\W_]\*|\D\*(?=\w)\D))[^\r])(\*|_)(?!\2\2\2)(?=\S)((?:(?!\2)[^\r])*?(?=[^\s_]_|(?=\w)\D\*\D|[^\s*]\*(?:[\W_]|$)).)(?=_(?:\W|$)|\*(?:[^*]|$))\2/g, "$1<em>$3</em>"), 
            P(a));
        }
        function y(a) {
            return a = a.replace(/((^[ \t]*>[ \t]?.+\n(.+\n)*\n*)+)/gm, function(a, b) {
                var c = b;
                return c = c.replace(/^[ \t]*>[ \t]?/gm, "~0"), c = c.replace(/~0/g, ""), c = c.replace(/^[ \t]+$/gm, ""), 
                c = i(c), c = c.replace(/(^|\n)/g, "$1  "), c = c.replace(/(\s*<pre>[^\r]+?<\/pre>)/gm, function(a, b) {
                    var c = b;
                    return c = c.replace(/^  /gm, "~0"), c = c.replace(/~0/g, "");
                }), g("<blockquote>\n" + c + "\n</blockquote>");
            });
        }
        function z(a, b) {
            var c, d, e, f, g, h, i;
            for (a = a.replace(/^\n+/g, ""), a = a.replace(/\n+$/g, ""), c = a.split(/\n{2,}/g), 
            d = [], e = /~K(\d+)K/, f = c.length, g = 0; f > g; g++) h = c[g], e.test(h) ? d.push(h) : /\S/.test(h) && (h = j(h), 
            h = h.replace(/^([\t]*)/g, "<p>"), h += "</p>", d.push(h));
            if (!b) for (f = d.length, g = 0; f > g; g++) for (i = !0; i; ) i = !1, d[g] = d[g].replace(/~K(\d+)K/g, function(a, b) {
                return i = !0, M[b];
            });
            return d.join("\n\n");
        }
        function A(a) {
            return a = a.replace(/&(?!#?[xX]?(?:[0-9a-fA-F]+|\w+);)/g, "&amp;"), a = a.replace(/<(?![a-z\/?!]|~D)/gi, "&lt;");
        }
        function B(a) {
            return a = a.replace(/\\(\\)/g, J), a = a.replace(/\\([`*_{}\[\]()>#+-.!])/g, J);
        }
        function C(a, b, c, d) {
            var e, f, g, h, i, j;
            if (b) return a;
            if (")" !== d.charAt(d.length - 1)) return "<" + c + d + ">";
            for (e = d.match(/[()]/g), f = 0, g = 0; g < e.length; g++) "(" === e[g] ? 0 >= f ? f = 1 : f++ : f--;
            return h = "", 0 > f && (i = new RegExp("\\){1," + -f + "}$"), d = d.replace(i, function(a) {
                return h = a, "";
            })), h && (j = d.charAt(d.length - 1), W.test(j) || (h = j + h, d = d.substr(0, d.length - 1))), 
            "<" + c + d + ">" + h;
        }
        function D(a) {
            a = a.replace(V, C);
            var b = function(a, b) {
                var c = H(b);
                return '<a href="' + c + '">' + X.plainLinkText(b) + "</a>";
            };
            return a = a.replace(/<((https?|ftp):[^'">\s]+)>/gi, b);
        }
        function E(a) {
            return a = a.replace(/~E(\d+)E/g, function(a, b) {
                var c = parseInt(b);
                return String.fromCharCode(c);
            });
        }
        function F(a) {
            return a = a.replace(/^(\t|[ ]{1,4})/gm, "~0"), a = a.replace(/~0/g, "");
        }
        function G(a) {
            if (!/\t/.test(a)) return a;
            var b, c = [ "    ", "   ", "  ", " " ], d = 0;
            return a.replace(/[\n\t]/g, function(a, e) {
                return "\n" === a ? (d = e + 1, a) : (b = (e - d) % 4, d = e + 1, c[b]);
            });
        }
        function H(a) {
            return a = o(a), a = I(a, "*_:()[]");
        }
        function I(a, b, c) {
            var d, e = "([" + b.replace(/([\[\]\\])/g, "\\$1") + "])";
            return c && (e = "\\\\" + e), d = new RegExp(e, "g"), a = a.replace(d, J);
        }
        function J(a, b) {
            var c = b.charCodeAt(0);
            return "~E" + c + "E";
        }
        var K, L, M, N, O, P, Q, R, S, T, U, V, W, X = this.hooks = new c();
        X.addNoop("plainLinkText"), X.addNoop("preConversion"), X.addNoop("postNormalization"), 
        X.addNoop("preBlockGamut"), X.addNoop("postBlockGamut"), X.addNoop("preSpanGamut"), 
        X.addNoop("postSpanGamut"), X.addNoop("postConversion"), b = b || {}, O = a, P = a, 
        b.nonAsciiLetters && function() {
            var a = /[Q\u00aa\u00b5\u00ba\u00c0-\u00d6\u00d8-\u00f6\u00f8-\u02c1\u02c6-\u02d1\u02e0-\u02e4\u02ec\u02ee\u0370-\u0374\u0376-\u0377\u037a-\u037d\u0386\u0388-\u038a\u038c\u038e-\u03a1\u03a3-\u03f5\u03f7-\u0481\u048a-\u0523\u0531-\u0556\u0559\u0561-\u0587\u05d0-\u05ea\u05f0-\u05f2\u0621-\u064a\u0660-\u0669\u066e-\u066f\u0671-\u06d3\u06d5\u06e5-\u06e6\u06ee-\u06fc\u06ff\u0710\u0712-\u072f\u074d-\u07a5\u07b1\u07c0-\u07ea\u07f4-\u07f5\u07fa\u0904-\u0939\u093d\u0950\u0958-\u0961\u0966-\u096f\u0971-\u0972\u097b-\u097f\u0985-\u098c\u098f-\u0990\u0993-\u09a8\u09aa-\u09b0\u09b2\u09b6-\u09b9\u09bd\u09ce\u09dc-\u09dd\u09df-\u09e1\u09e6-\u09f1\u0a05-\u0a0a\u0a0f-\u0a10\u0a13-\u0a28\u0a2a-\u0a30\u0a32-\u0a33\u0a35-\u0a36\u0a38-\u0a39\u0a59-\u0a5c\u0a5e\u0a66-\u0a6f\u0a72-\u0a74\u0a85-\u0a8d\u0a8f-\u0a91\u0a93-\u0aa8\u0aaa-\u0ab0\u0ab2-\u0ab3\u0ab5-\u0ab9\u0abd\u0ad0\u0ae0-\u0ae1\u0ae6-\u0aef\u0b05-\u0b0c\u0b0f-\u0b10\u0b13-\u0b28\u0b2a-\u0b30\u0b32-\u0b33\u0b35-\u0b39\u0b3d\u0b5c-\u0b5d\u0b5f-\u0b61\u0b66-\u0b6f\u0b71\u0b83\u0b85-\u0b8a\u0b8e-\u0b90\u0b92-\u0b95\u0b99-\u0b9a\u0b9c\u0b9e-\u0b9f\u0ba3-\u0ba4\u0ba8-\u0baa\u0bae-\u0bb9\u0bd0\u0be6-\u0bef\u0c05-\u0c0c\u0c0e-\u0c10\u0c12-\u0c28\u0c2a-\u0c33\u0c35-\u0c39\u0c3d\u0c58-\u0c59\u0c60-\u0c61\u0c66-\u0c6f\u0c85-\u0c8c\u0c8e-\u0c90\u0c92-\u0ca8\u0caa-\u0cb3\u0cb5-\u0cb9\u0cbd\u0cde\u0ce0-\u0ce1\u0ce6-\u0cef\u0d05-\u0d0c\u0d0e-\u0d10\u0d12-\u0d28\u0d2a-\u0d39\u0d3d\u0d60-\u0d61\u0d66-\u0d6f\u0d7a-\u0d7f\u0d85-\u0d96\u0d9a-\u0db1\u0db3-\u0dbb\u0dbd\u0dc0-\u0dc6\u0e01-\u0e30\u0e32-\u0e33\u0e40-\u0e46\u0e50-\u0e59\u0e81-\u0e82\u0e84\u0e87-\u0e88\u0e8a\u0e8d\u0e94-\u0e97\u0e99-\u0e9f\u0ea1-\u0ea3\u0ea5\u0ea7\u0eaa-\u0eab\u0ead-\u0eb0\u0eb2-\u0eb3\u0ebd\u0ec0-\u0ec4\u0ec6\u0ed0-\u0ed9\u0edc-\u0edd\u0f00\u0f20-\u0f29\u0f40-\u0f47\u0f49-\u0f6c\u0f88-\u0f8b\u1000-\u102a\u103f-\u1049\u1050-\u1055\u105a-\u105d\u1061\u1065-\u1066\u106e-\u1070\u1075-\u1081\u108e\u1090-\u1099\u10a0-\u10c5\u10d0-\u10fa\u10fc\u1100-\u1159\u115f-\u11a2\u11a8-\u11f9\u1200-\u1248\u124a-\u124d\u1250-\u1256\u1258\u125a-\u125d\u1260-\u1288\u128a-\u128d\u1290-\u12b0\u12b2-\u12b5\u12b8-\u12be\u12c0\u12c2-\u12c5\u12c8-\u12d6\u12d8-\u1310\u1312-\u1315\u1318-\u135a\u1380-\u138f\u13a0-\u13f4\u1401-\u166c\u166f-\u1676\u1681-\u169a\u16a0-\u16ea\u1700-\u170c\u170e-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176c\u176e-\u1770\u1780-\u17b3\u17d7\u17dc\u17e0-\u17e9\u1810-\u1819\u1820-\u1877\u1880-\u18a8\u18aa\u1900-\u191c\u1946-\u196d\u1970-\u1974\u1980-\u19a9\u19c1-\u19c7\u19d0-\u19d9\u1a00-\u1a16\u1b05-\u1b33\u1b45-\u1b4b\u1b50-\u1b59\u1b83-\u1ba0\u1bae-\u1bb9\u1c00-\u1c23\u1c40-\u1c49\u1c4d-\u1c7d\u1d00-\u1dbf\u1e00-\u1f15\u1f18-\u1f1d\u1f20-\u1f45\u1f48-\u1f4d\u1f50-\u1f57\u1f59\u1f5b\u1f5d\u1f5f-\u1f7d\u1f80-\u1fb4\u1fb6-\u1fbc\u1fbe\u1fc2-\u1fc4\u1fc6-\u1fcc\u1fd0-\u1fd3\u1fd6-\u1fdb\u1fe0-\u1fec\u1ff2-\u1ff4\u1ff6-\u1ffc\u203f-\u2040\u2054\u2071\u207f\u2090-\u2094\u2102\u2107\u210a-\u2113\u2115\u2119-\u211d\u2124\u2126\u2128\u212a-\u212d\u212f-\u2139\u213c-\u213f\u2145-\u2149\u214e\u2183-\u2184\u2c00-\u2c2e\u2c30-\u2c5e\u2c60-\u2c6f\u2c71-\u2c7d\u2c80-\u2ce4\u2d00-\u2d25\u2d30-\u2d65\u2d6f\u2d80-\u2d96\u2da0-\u2da6\u2da8-\u2dae\u2db0-\u2db6\u2db8-\u2dbe\u2dc0-\u2dc6\u2dc8-\u2dce\u2dd0-\u2dd6\u2dd8-\u2dde\u2e2f\u3005-\u3006\u3031-\u3035\u303b-\u303c\u3041-\u3096\u309d-\u309f\u30a1-\u30fa\u30fc-\u30ff\u3105-\u312d\u3131-\u318e\u31a0-\u31b7\u31f0-\u31ff\u3400-\u4db5\u4e00-\u9fc3\ua000-\ua48c\ua500-\ua60c\ua610-\ua62b\ua640-\ua65f\ua662-\ua66e\ua67f-\ua697\ua717-\ua71f\ua722-\ua788\ua78b-\ua78c\ua7fb-\ua801\ua803-\ua805\ua807-\ua80a\ua80c-\ua822\ua840-\ua873\ua882-\ua8b3\ua8d0-\ua8d9\ua900-\ua925\ua930-\ua946\uaa00-\uaa28\uaa40-\uaa42\uaa44-\uaa4b\uaa50-\uaa59\uac00-\ud7a3\uf900-\ufa2d\ufa30-\ufa6a\ufa70-\ufad9\ufb00-\ufb06\ufb13-\ufb17\ufb1d\ufb1f-\ufb28\ufb2a-\ufb36\ufb38-\ufb3c\ufb3e\ufb40-\ufb41\ufb43-\ufb44\ufb46-\ufbb1\ufbd3-\ufd3d\ufd50-\ufd8f\ufd92-\ufdc7\ufdf0-\ufdfb\ufe33-\ufe34\ufe4d-\ufe4f\ufe70-\ufe74\ufe76-\ufefc\uff10-\uff19\uff21-\uff3a\uff3f\uff41-\uff5a\uff66-\uffbe\uffc2-\uffc7\uffca-\uffcf\uffd2-\uffd7\uffda-\uffdc]/g, b = "Q".charCodeAt(0), c = "A".charCodeAt(0), d = "Z".charCodeAt(0), e = "a".charCodeAt(0) - d - 1;
            O = function(f) {
                return f.replace(a, function(a) {
                    for (var f, g = a.charCodeAt(0), h = ""; g > 0; ) f = g % 51 + c, f >= b && f++, 
                    f > d && (f += e), h = String.fromCharCode(f) + h, g = 0 | g / 51;
                    return "Q" + h + "Q";
                });
            }, P = function(a) {
                return a.replace(/Q([A-PR-Za-z]{1,3})Q/g, function(a, f) {
                    var g, h, i = 0;
                    for (h = 0; h < f.length; h++) g = f.charCodeAt(h), g > d && (g -= e), g > b && g--, 
                    g -= c, i = 51 * i + g;
                    return String.fromCharCode(i);
                });
            };
        }(), Q = b.asteriskIntraWordEmphasis ? x : w, this.makeHtml = function(a) {
            if (K) throw new Error("Recursive call to converter.makeHtml");
            return K = new d(), L = new d(), M = [], N = 0, a = X.preConversion(a), a = a.replace(/~/g, "~T"), 
            a = a.replace(/\$/g, "~D"), a = a.replace(/\r\n/g, "\n"), a = a.replace(/\r/g, "\n"), 
            a = "\n\n" + a + "\n\n", a = G(a), a = a.replace(/^[ \t]+$/gm, ""), a = X.postNormalization(a), 
            a = f(a), a = e(a), a = i(a), a = E(a), a = a.replace(/~D/g, "$$"), a = a.replace(/~T/g, "~"), 
            a = X.postConversion(a), M = L = K = null, a;
        }, R = function(a) {
            return i(a);
        }, S = {
            ol: "\\d+[.]",
            ul: "[*+-]"
        }, T = "[-A-Z0-9+&@#/%?=~_|[\\]()!:,.;]", U = "[-A-Z0-9+&@#/%=~_|[\\])]", V = new RegExp('(="|<)?\\b(https?|ftp)(://' + T + "*" + U + ")(?=$|\\W)", "gi"), 
        W = new RegExp(U, "i");
    };
}(), function() {
    function a() {}
    function b(a) {
        this.buttonBar = p.getElementById("wmd-button-bar" + a), this.preview = p.getElementById("wmd-preview" + a), 
        this.input = p.getElementById("text");
    }
    function c(a, b) {
        var c, e, f, g, h, i, j, k, l = this, n = [], o = 0, p = "none", q = function(a, b) {
            p != a && (p = a, b || g()), t.isIE && "moving" == p ? f = null : e = setTimeout(r, 1);
        }, r = function(a) {
            f = new d(b, a), e = void 0;
        };
        this.setCommandMode = function() {
            p = "command", g(), e = setTimeout(r, 0);
        }, this.canUndo = function() {
            return o > 1;
        }, this.canRedo = function() {
            return n[o + 1] ? !0 : !1;
        }, this.undo = function() {
            l.canUndo() && (c && n[o - 1].text != c.text ? (c.restore(), c = null) : (c = null, 
            n[o] = new d(b), n[--o].restore(), a && a())), p = "none", b.input.focus(), e = setTimeout(r, 0);
        }, this.redo = function() {
            l.canRedo() && (n[++o].restore(), a && a()), p = "none", b.input.focus(), e = setTimeout(r, 0);
        }, g = function() {
            var e = f || new d(b);
            return e ? "moving" == p ? (c || (c = e), void 0) : (c && (n[o - 1].text != c.text && (n[o++] = c), 
            c = null), n[o++] = e, n[o + 1] = null, a && a(), void 0) : !1;
        }, h = function(a) {
            var b, c, d = !1;
            if ((a.ctrlKey || a.metaKey) && !a.altKey) switch (b = a.charCode || a.keyCode, 
            c = String.fromCharCode(b), c.toLowerCase()) {
              case "y":
                l.redo(), d = !0;
                break;

              case "z":
                a.shiftKey ? l.redo() : l.undo(), d = !0;
                break;
            }
            return d ? (a.preventDefault && a.preventDefault(), window.event && (window.event.returnValue = !1), 
            void 0) : void 0;
        }, i = function(a) {
            if (!a.ctrlKey && !a.metaKey) {
                var b = a.keyCode;
                b >= 33 && 40 >= b || b >= 63232 && 63235 >= b ? q("moving") : 8 == b || 46 == b || 127 == b ? q("deleting") : 13 == b ? q("newlines") : 27 == b ? q("escape") : (16 > b || b > 20) && 91 != b && q("typing");
            }
        }, j = function() {
            var a, c;
            m.addEvent(b.input, "keypress", function(a) {
                !a.ctrlKey && !a.metaKey || a.altKey || 89 != a.keyCode && 90 != a.keyCode || a.preventDefault();
            }), a = function() {
                (t.isIE || f && f.text != b.input.value) && void 0 == e && (q("newlines"), p = "paste", 
                g(), e = setTimeout(r, 0));
            }, c = function() {
                setTimeout(a, 10);
            }, m.addEvent(b.input, "keydown", h), m.addEvent(b.input, "keydown", i), m.addEvent(b.input, "mousedown", function() {
                q("moving");
            }), b.input.onpaste = c, b.input.ondrop = c;
        }, k = function() {
            j(), r(!0), g();
        }, k();
    }
    function d(b, c) {
        var d = this, e = b.input;
        this.init = function() {
            m.isVisible(e) && (c || !p.activeElement || p.activeElement === e) && (this.setInputAreaSelectionStartEnd(), 
            this.scrollTop = e.scrollTop, (!this.text && e.selectionStart || 0 === e.selectionStart) && (this.text = e.value));
        }, this.setInputAreaSelection = function() {
            if (m.isVisible(e)) if (void 0 === e.selectionStart || t.isOpera) {
                if (p.selection) {
                    if (p.activeElement && p.activeElement !== e) return;
                    e.focus();
                    var a = e.createTextRange();
                    a.moveStart("character", -e.value.length), a.moveEnd("character", -e.value.length), 
                    a.moveEnd("character", d.end), a.moveStart("character", d.start), a.select();
                }
            } else e.focus(), e.selectionStart = d.start, e.selectionEnd = d.end, e.scrollTop = d.scrollTop;
        }, this.setInputAreaSelectionStartEnd = function() {
            var a, c, f, g, h, i;
            if (b.ieCachedRange || !e.selectionStart && 0 !== e.selectionStart) {
                if (p.selection) {
                    if (d.text = m.fixEolChars(e.value), a = b.ieCachedRange || p.selection.createRange(), 
                    c = m.fixEolChars(a.text), f = "", g = f + c + f, a.text = g, h = m.fixEolChars(e.value), 
                    a.moveStart("character", -g.length), a.text = c, d.start = h.indexOf(f), d.end = h.lastIndexOf(f) - f.length, 
                    i = d.text.length - m.fixEolChars(e.value).length) {
                        for (a.moveStart("character", -c.length); i--; ) c += "\n", d.end += 1;
                        a.text = c;
                    }
                    b.ieCachedRange && (d.scrollTop = b.ieCachedScrollTop), b.ieCachedRange = null, 
                    this.setInputAreaSelection();
                }
            } else d.start = e.selectionStart, d.end = e.selectionEnd;
        }, this.restore = function() {
            void 0 != d.text && d.text != e.value && (e.value = d.text), this.setInputAreaSelection(), 
            e.scrollTop = d.scrollTop;
        }, this.getChunks = function() {
            var b = new a();
            return b.before = m.fixEolChars(d.text.substring(0, d.start)), b.startTag = "", 
            b.selection = m.fixEolChars(d.text.substring(d.start, d.end)), b.endTag = "", b.after = m.fixEolChars(d.text.substring(d.end)), 
            b.scrollTop = d.scrollTop, b;
        }, this.setChunks = function(a) {
            a.before = a.before + a.startTag, a.after = a.endTag + a.after, this.start = a.before.length, 
            this.end = a.before.length + a.selection.length, this.text = a.before + a.selection + a.after, 
            this.scrollTop = a.scrollTop;
        }, this.init();
    }
    function e(a, b, c) {
        var d, e, f, g = 0, h = "", i = 300, j = "delayed", k = function(a, b) {
            m.addEvent(a, "input", b), a.onpaste = b, a.ondrop = b, m.addEvent(a, "keypress", b), 
            m.addEvent(a, "keydown", b);
        }, l = function() {
            var a = 0;
            return window.innerHeight ? a = window.pageYOffset : p.documentElement && p.documentElement.scrollTop ? a = p.documentElement.scrollTop : p.body && (a = p.body.scrollTop), 
            a;
        }, o = function() {
            var c, d, f;
            b.preview && (c = b.input.value, c && c == h || (h = c, d = new Date().getTime(), 
            a.pushPreview(b.preview, c), e(), f = new Date().getTime(), g = f - d));
        }, q = function() {
            if (d && (clearTimeout(d), d = void 0), "manual" !== j) {
                var a = 0;
                "delayed" === j && (a = g), a > i && (a = i), d = setTimeout(o, a);
            }
        }, r = function(a) {
            return a.scrollHeight <= a.clientHeight ? 1 : a.scrollTop / (a.scrollHeight - a.clientHeight);
        }, s = function() {
            b.preview && (b.preview.scrollTop = (b.preview.scrollHeight - b.preview.clientHeight) * r(b.preview));
        };
        this.refresh = function(a) {
            a ? (h = "", o()) : q();
        }, this.processingTime = function() {
            return g;
        }, e = function() {
            var a, d = n.getTop(b.input) - l();
            c(), s(), a = n.getTop(b.input) - l(), t.isIE ? setTimeout(function() {
                window.scrollBy(0, a - d);
            }, 0) : window.scrollBy(0, a - d);
        }, f = function() {
            k(b.input, q), o(), b.preview && (b.preview.scrollTop = 0);
        }, f();
    }
    function f(a, b, c, e, f, g, h, i, j) {
        function k(a) {
            var c, g, h, i;
            if (v.focus(), a.textOp) {
                if (e && e.setCommandMode(), c = new d(b), !c) return;
                g = c.getChunks(), h = function() {
                    v.focus(), g && c.setChunks(g), c.restore(), f.refresh();
                }, i = a.textOp(g, h), i || h();
            }
            a.execute && a.execute(e);
        }
        function l(a, c) {
            var d = "0px", e = "-20px", f = "-40px", g = a.getElementsByTagName("span")[0];
            c ? (g.style.backgroundPosition = a.XShift + " " + d, a.onmouseover = function() {
                g.style.backgroundPosition = this.XShift + " " + f;
            }, a.onmouseout = function() {
                g.style.backgroundPosition = this.XShift + " " + d;
            }, t.isIE && (a.onmousedown = function() {
                p.activeElement && p.activeElement !== b.input || (b.ieCachedRange = document.selection.createRange(), 
                b.ieCachedScrollTop = b.input.scrollTop);
            }), a.isHelp || (a.onclick = function() {
                return this.onmouseout && this.onmouseout(), k(this), !1;
            })) : (g.style.backgroundPosition = a.XShift + " " + e, a.onmouseover = a.onmouseout = a.onclick = function() {});
        }
        function n(a) {
            var b;
            return "string" == typeof a && (b = a, a = g[a]), function() {
                a.apply(g, arguments), b && c.commandExecuted(b);
            };
        }
        function q() {
            var d, e, f, g, k, m, p = b.buttonBar, q = document.createElement("ul");
            q.id = "wmd-button-row" + a, q.className = "wmd-button-row", q = p.appendChild(q), 
            d = 0, e = function(b, c, e, f) {
                var g, h = document.createElement("li");
                return h.className = "wmd-button", h.style.left = d + "px", d += 25, g = document.createElement("span"), 
                h.id = b + a, h.appendChild(g), h.title = c, h.XShift = e, f && (h.textOp = f), 
                l(h, !0), q.appendChild(h), h;
            }, f = function(b) {
                var c = document.createElement("li");
                c.className = "wmd-spacer wmd-spacer" + b, c.id = "wmd-spacer" + b + a, q.appendChild(c), 
                d += 25;
            }, w.bold = e("wmd-bold-button", j("bold"), "0px", n("doBold")), w.italic = e("wmd-italic-button", j("italic"), "-20px", n("doItalic")), 
            f(1), w.link = e("wmd-link-button", j("link"), "-40px", n(function(a, b) {
                return this.doLinkOrImage(a, b, !1);
            })), w.quote = e("wmd-quote-button", j("quote"), "-60px", n("doBlockquote")), w.code = e("wmd-code-button", j("code"), "-80px", n("doCode")), 
            w.image = e("wmd-image-button", j("image"), "-100px", n(function(a, b) {
                return this.doLinkOrImage(a, b, !0);
            })), f(2), w.olist = e("wmd-olist-button", j("olist"), "-120px", n(function(a, b) {
                this.doList(a, b, !0);
            })), w.ulist = e("wmd-ulist-button", j("ulist"), "-140px", n(function(a, b) {
                this.doList(a, b, !1);
            })), w.heading = e("wmd-heading-button", j("heading"), "-160px", n("doHeading")), 
            w.hr = e("wmd-hr-button", j("hr"), "-180px", n("doHorizontalRule")), w.more = e("wmd-more-button", j("more"), "-280px", n("doMore")), 
            f(3), w.undo = e("wmd-undo-button", j("undo"), "-200px", null), w.undo.execute = function(a) {
                a && a.undo();
            }, g = /win/.test(r.platform.toLowerCase()) ? j("redo") : j("redomac"), w.redo = e("wmd-redo-button", g, "-220px", null), 
            w.redo.execute = function(a) {
                a && a.redo();
            }, f(4), w.fullscreen = e("wmd-fullscreen-button", j("fullscreen"), "-240px", null), 
            w.fullscreen.execute = function() {
                h.doFullScreen(w, !0);
            }, w.exitFullscreen = e("wmd-exit-fullscreen-button", j("exitFullscreen"), "-260px", null), 
            w.exitFullscreen.style.display = "none", w.exitFullscreen.execute = function() {
                h.doFullScreen(w, !1);
            }, c.makeButton(w, e, n, o), i && (k = document.createElement("li"), m = document.createElement("span"), 
            k.appendChild(m), k.className = "wmd-button wmd-help-button", k.id = "wmd-help-button" + a, 
            k.XShift = "-300px", k.isHelp = !0, k.style.right = "0px", k.title = j("help"), 
            k.onclick = i.handler, l(k, !0), q.appendChild(k), w.help = k), s();
        }
        function s() {
            e && (l(w.undo, e.canUndo()), l(w.redo, e.canRedo()));
        }
        var u, v = b.input, w = {};
        q(), u = "keydown", t.isOpera && (u = "keypress"), m.addEvent(v, u, function(a) {
            var b, c, d;
            if (!a.ctrlKey && !a.metaKey || a.altKey || a.shiftKey) 9 == a.keyCode && window.fullScreenEntered && (d = {}, 
            d.textOp = n("doTab"), k(d), a.preventDefault && a.preventDefault(), window.event && (window.event.returnValue = !1)); else {
                switch (b = a.charCode || a.keyCode, c = String.fromCharCode(b).toLowerCase()) {
                  case "b":
                    k(w.bold);
                    break;

                  case "i":
                    k(w.italic);
                    break;

                  case "l":
                    k(w.link);
                    break;

                  case "q":
                    k(w.quote);
                    break;

                  case "k":
                    k(w.code);
                    break;

                  case "g":
                    k(w.image);
                    break;

                  case "o":
                    k(w.olist);
                    break;

                  case "u":
                    k(w.ulist);
                    break;

                  case "m":
                    k(w.more);
                    break;

                  case "j":
                    k(w.fullscreen);
                    break;

                  case "e":
                    k(w.exitFullscreen);
                    break;

                  case "h":
                    k(w.heading);
                    break;

                  case "r":
                    k(w.hr);
                    break;

                  case "y":
                    k(w.redo);
                    break;

                  case "z":
                    a.shiftKey ? k(w.redo) : k(w.undo);
                    break;

                  default:
                    return;
                }
                a.preventDefault && a.preventDefault(), window.event && (window.event.returnValue = !1);
            }
        }), m.addEvent(v, "keyup", function(a) {
            var b, c;
            !a.shiftKey || a.ctrlKey || a.metaKey || (b = a.charCode || a.keyCode, 13 === b && (c = {}, 
            c.textOp = n("doAutoindent"), k(c)));
        }), t.isIE && m.addEvent(v, "keydown", function(a) {
            var b = a.keyCode;
            return 27 === b ? !1 : void 0;
        }), this.setUndoRedoButtonStates = s;
    }
    function g(a, b) {
        this.hooks = a, this.getString = b;
    }
    function h(a) {
        return a.replace(/^\s*(.*?)(?:\s+"(.+)")?\s*$/, function(a, b, c) {
            var d = !1;
            return b = b.replace(/%(?:[\da-fA-F]{2})|\?|\+|[^\w\d-.\/[\]]/g, function(a) {
                if (3 === a.length && "%" == a.charAt(0)) return a.toUpperCase();
                switch (a) {
                  case "?":
                    return d = !0, "?";

                  case "+":
                    if (d) return "%20";
                }
                return encodeURI(a);
            }), c && (c = c.trim ? c.trim() : c.replace(/^\s*/, "").replace(/\s*$/, ""), c = c.replace(/"/g, "quot;").replace(/\(/g, "&#40;").replace(/\)/g, "&#41;").replace(/</g, "&lt;").replace(/>/g, "&gt;")), 
            c ? b + ' "' + c + '"' : b;
        });
    }
    function i(a, b) {
        this.fullScreenBind = !1, this.hooks = a, this.getString = b, this.isFakeFullScreen = !1;
    }
    function j() {
        var a, b, c, d, e, f = {
            fullScreenChange: [ "onfullscreenchange", "onwebkitfullscreenchange", "onmozfullscreenchange", "onmsfullscreenchange" ],
            requestFullscreen: [ "requestFullscreen", "webkitRequestFullScreen", "mozRequestFullScreen", "msRequestFullScreen" ],
            cancelFullscreen: [ "cancelFullscreen", "exitFullScreen", "webkitCancelFullScreen", "mozCancelFullScreen", "msCancelFullScreen" ]
        }, g = {};
        for (a in f) {
            for (b = f[a].length, c = !1, d = 0; b > d; d++) if (e = f[a][d], "undefined" != typeof document[e] || "undefined" != typeof document.body[e]) {
                g[a] = e, c = !0;
                break;
            }
            if (!c) return !1;
        }
        return g;
    }
    function k() {
        return document.fullScreen || document.mozFullScreen || document.webkitIsFullScreen || document.msIsFullScreen;
    }
    var l, m = {}, n = {}, o = {}, p = window.document, q = window.RegExp, r = window.navigator, s = {
        lineLength: 72
    }, t = {
        isIE: /msie/.test(r.userAgent.toLowerCase()),
        isIE_5or6: /msie 6/.test(r.userAgent.toLowerCase()) || /msie 5/.test(r.userAgent.toLowerCase()),
        isOpera: /opera/.test(r.userAgent.toLowerCase())
    }, u = {
        bold: "Strong <strong> Ctrl+B",
        boldexample: "strong text",
        italic: "Emphasis <em> Ctrl+I",
        italicexample: "emphasized text",
        link: "Hyperlink <a> Ctrl+L",
        linkdescription: "enter link description here",
        linkdialog: '<p><b>Insert Hyperlink</b></p><p>http://example.com/ "optional title"</p>',
        linkname: null,
        quote: "Blockquote <blockquote> Ctrl+Q",
        quoteexample: "Blockquote",
        code: "Code Sample <pre><code> Ctrl+K",
        codeexample: "enter code here",
        image: "Image <img> Ctrl+G",
        imagedescription: "enter image description here",
        imagedialog: "<p><b>Insert Image</b></p><p>http://example.com/images/diagram.jpg \"optional title\"<br>Need <a href='http://www.google.com/search?q=free+image+hosting' target='_blank'>free image hosting?</a></p>",
        imagename: null,
        olist: "Numbered List <ol> Ctrl+O",
        ulist: "Bulleted List <ul> Ctrl+U",
        litem: "List item",
        heading: "Heading <h1>/<h2> Ctrl+H",
        headingexample: "Heading",
        more: "More contents <!--more--> Ctrl+M",
        fullscreen: "FullScreen Ctrl+J",
        exitFullscreen: "Exit FullScreen Ctrl+E",
        fullscreenUnsupport: "Sorry, the browser dont support fullscreen api",
        hr: "Horizontal Rule <hr> Ctrl+R",
        undo: "Undo - Ctrl+Z",
        redo: "Redo - Ctrl+Y",
        redomac: "Redo - Ctrl+Shift+Z",
        ok: "OK",
        cancel: "Cancel",
        help: "Markdown Editing Help"
    }, v = "https://", w = "https://";
    Markdown.Editor = function(a, d, h) {
        var j, k, l, m;
        h = h || {}, "function" == typeof h.handler && (h = {
            helpButton: h
        }), h.strings = h.strings || {}, h.helpButton && (h.strings.help = h.strings.help || h.helpButton.title), 
        j = function(a) {
            var b = h.strings[a] || u[a];
            return ("imagename" == a || "linkname" == a) && (h.strings[a] = null), b;
        }, d = d || "", k = this.hooks = new Markdown.HookCollection(), k.addNoop("onPreviewRefresh"), 
        k.addNoop("postBlockquoteCreation"), k.addFalse("insertImageDialog"), k.addFalse("insertLinkDialog"), 
        k.addNoop("makeButton"), k.addNoop("commandExecuted"), k.addNoop("enterFullScreen"), 
        k.addNoop("enterFakeFullScreen"), k.addNoop("exitFullScreen"), this.getConverter = function() {
            return a.getConverter();
        }, m = this, this.run = function() {
            var n, o, q, r, s;
            l || (l = new b(d), n = new g(k, j), o = new e(a, l, function() {
                k.onPreviewRefresh();
            }), /\?noundo/.test(p.location.href) || (q = new c(function() {
                o.refresh(), r && r.setUndoRedoButtonStates();
            }, l), this.textOperation = function(a) {
                q.setCommandMode(), a(), m.refreshPreview();
            }), fullScreenManager = new i(k, j), r = new f(d, l, k, q, o, n, fullScreenManager, h.helpButton, j), 
            r.setUndoRedoButtonStates(), s = m.refreshPreview = function() {
                o.refresh(!0);
            }, s());
        };
    }, a.prototype.findTags = function(a, b) {
        var c, d = this;
        a && (c = m.extendRegExp(a, "", "$"), this.before = this.before.replace(c, function(a) {
            return d.startTag = d.startTag + a, "";
        }), c = m.extendRegExp(a, "^", ""), this.selection = this.selection.replace(c, function(a) {
            return d.startTag = d.startTag + a, "";
        })), b && (c = m.extendRegExp(b, "", "$"), this.selection = this.selection.replace(c, function(a) {
            return d.endTag = a + d.endTag, "";
        }), c = m.extendRegExp(b, "^", ""), this.after = this.after.replace(c, function(a) {
            return d.endTag = a + d.endTag, "";
        }));
    }, a.prototype.trimWhitespace = function(a) {
        var b, c, d = this;
        a ? b = c = "" : (b = function(a) {
            return d.before += a, "";
        }, c = function(a) {
            return d.after = a + d.after, "";
        }), this.selection = this.selection.replace(/^(\s*)/, b).replace(/(\s*)$/, c);
    }, a.prototype.skipLines = function(a, b, c) {
        var d, e;
        if (void 0 === a && (a = 1), void 0 === b && (b = 1), a++, b++, navigator.userAgent.match(/Chrome/) && "X".match(/()./), 
        this.selection = this.selection.replace(/(^\n*)/, ""), this.startTag = this.startTag + q.$1, 
        this.selection = this.selection.replace(/(\n*$)/, ""), this.endTag = this.endTag + q.$1, 
        this.startTag = this.startTag.replace(/(^\n*)/, ""), this.before = this.before + q.$1, 
        this.endTag = this.endTag.replace(/(\n*$)/, ""), this.after = this.after + q.$1, 
        this.before) {
            for (d = e = ""; a--; ) d += "\\n?", e += "\n";
            c && (d = "\\n*"), this.before = this.before.replace(new q(d + "$", ""), e);
        }
        if (this.after) {
            for (d = e = ""; b--; ) d += "\\n?", e += "\n";
            c && (d = "\\n*"), this.after = this.after.replace(new q(d, ""), e);
        }
    }, m.isVisible = function(a) {
        return window.getComputedStyle ? "none" !== window.getComputedStyle(a, null).getPropertyValue("display") : a.currentStyle ? "none" !== a.currentStyle.display : void 0;
    }, m.addEvent = function(a, b, c) {
        a.attachEvent ? a.attachEvent("on" + b, c) : a.addEventListener(b, c, !1);
    }, m.removeEvent = function(a, b, c) {
        a.detachEvent ? a.detachEvent("on" + b, c) : a.removeEventListener(b, c, !1);
    }, m.fixEolChars = function(a) {
        return a = a.replace(/\r\n/g, "\n"), a = a.replace(/\r/g, "\n");
    }, m.extendRegExp = function(a, b, c) {
        var d, e;
        return (null === b || void 0 === b) && (b = ""), (null === c || void 0 === c) && (c = ""), 
        d = a.toString(), d = d.replace(/\/([gim]*)$/, function(a, b) {
            return e = b, "";
        }), d = d.replace(/(^\/|\/$)/g, ""), d = b + d + c, new q(d, e);
    }, n.getTop = function(a, b) {
        var c = a.offsetTop;
        if (!b) for (;a = a.offsetParent; ) c += a.offsetTop;
        return c;
    }, n.getHeight = function(a) {
        return a.offsetHeight || a.scrollHeight;
    }, n.getWidth = function(a) {
        return a.offsetWidth || a.scrollWidth;
    }, n.getPageSize = function() {
        var a, b, c, d, e, f;
        return self.innerHeight && self.scrollMaxY ? (a = p.body.scrollWidth, b = self.innerHeight + self.scrollMaxY) : p.body.scrollHeight > p.body.offsetHeight ? (a = p.body.scrollWidth, 
        b = p.body.scrollHeight) : (a = p.body.offsetWidth, b = p.body.offsetHeight), self.innerHeight ? (c = self.innerWidth, 
        d = self.innerHeight) : p.documentElement && p.documentElement.clientHeight ? (c = p.documentElement.clientWidth, 
        d = p.documentElement.clientHeight) : p.body && (c = p.body.clientWidth, d = p.body.clientHeight), 
        e = Math.max(a, c), f = Math.max(b, d), [ e, f, c, d ];
    }, o.createBackground = function() {
        var a, b = p.createElement("div"), c = b.style;
        return b.className = "wmd-prompt-background", c.position = "absolute", c.top = "0", 
        c.zIndex = "1000", t.isIE ? c.filter = "alpha(opacity=50)" : c.opacity = "0.5", 
        a = n.getPageSize(), c.height = a[1] + "px", t.isIE ? (c.left = p.documentElement.scrollLeft, 
        c.width = p.documentElement.clientWidth) : (c.left = "0", c.width = "100%"), p.body.appendChild(b), 
        b;
    }, o.dialog = function(a, b, c, d) {
        var e, f = function(a) {
            var b = a.charCode || a.keyCode;
            27 === b && g(!0);
        }, g = function(a) {
            return m.removeEvent(p.body, "keydown", f), e.parentNode.removeChild(e), b(a), !1;
        }, h = function() {
            var b, h, i, j;
            e = p.createElement("div"), e.className = "wmd-prompt-dialog", e.setAttribute("role", "dialog"), 
            b = p.createElement("div"), h = p.createElement("form"), h.style, h.onsubmit = function() {
                return g(!1);
            }, e.appendChild(h), h.appendChild(b), "function" == typeof a ? a.call(this, b) : b.innerHTML = a, 
            i = p.createElement("button"), i.type = "button", i.className = "btn btn-s primary", 
            i.onclick = function() {
                return g(!1);
            }, i.innerHTML = c, j = p.createElement("button"), j.type = "button", j.className = "btn btn-s", 
            j.onclick = function() {
                return g(!0);
            }, j.innerHTML = d, h.appendChild(i), h.appendChild(j), m.addEvent(p.body, "keydown", f), 
            p.body.appendChild(e);
        };
        setTimeout(function() {
            h();
        }, 0);
    }, o.prompt = function(a, b, c, d, e) {
        var f, g, h, i, j;
        void 0 === b && (b = ""), h = function(a) {
            var b = a.charCode || a.keyCode;
            27 === b && i(!0);
        }, i = function(a) {
            m.removeEvent(p.body, "keydown", h);
            var b = g.value;
            return a ? b = null : (b = b.replace(/^http:\/\/(https?|ftp):\/\//, "$1://"), /^(?:https?|ftp):\/\//.test(b) || /^[_a-z0-9-]+:/i.test(b) || (b = "http://" + b)), 
            f.parentNode.removeChild(f), c(b), !1;
        }, j = function() {
            var c, j, k, l;
            f = p.createElement("div"), f.className = "wmd-prompt-dialog", f.setAttribute("role", "dialog"), 
            c = p.createElement("div"), c.innerHTML = a, f.appendChild(c), j = p.createElement("form"), 
            j.style, j.onsubmit = function() {
                return i(!1);
            }, f.appendChild(j), g = p.createElement("input"), g.type = "text", g.value = b, 
            j.appendChild(g), k = p.createElement("button"), k.type = "button", k.className = "btn btn-s primary", 
            k.onclick = function() {
                return i(!1);
            }, k.innerHTML = d, l = p.createElement("button"), l.type = "button", l.className = "btn btn-s", 
            l.onclick = function() {
                return i(!0);
            }, l.innerHTML = e, j.appendChild(k), j.appendChild(l), m.addEvent(p.body, "keydown", h), 
            p.body.appendChild(f);
        }, setTimeout(function() {
            var a, c;
            j(), a = b.length, void 0 !== g.selectionStart ? (g.selectionStart = 0, g.selectionEnd = a) : g.createTextRange && (c = g.createTextRange(), 
            c.collapse(!1), c.moveStart("character", -a), c.moveEnd("character", a), c.select()), 
            g.focus();
        }, 0);
    }, l = g.prototype, l.prefixes = "(?:\\s{4,}|\\s*>|\\s*-\\s+|\\s*\\d+\\.|=|\\+|-|_|\\*|#|\\s*\\[[^\n]]+\\]:)", 
    l.unwrap = function(a) {
        var b = new q("([^\\n])\\n(?!(\\n|" + this.prefixes + "))", "g");
        a.selection = a.selection.replace(b, "$1 $2");
    }, l.wrap = function(a, b) {
        this.unwrap(a);
        var c = new q("(.{1," + b + "})( +|$\\n?)", "gm"), d = this;
        a.selection = a.selection.replace(c, function(a, b) {
            return new q("^" + d.prefixes, "").test(a) ? a : b + "\n";
        }), a.selection = a.selection.replace(/\s+$/, "");
    }, l.doBold = function(a, b) {
        return this.doBorI(a, b, 2, this.getString("boldexample"));
    }, l.doItalic = function(a, b) {
        return this.doBorI(a, b, 1, this.getString("italicexample"));
    }, l.doBorI = function(a, b, c, d) {
        var e, f, g, h, i;
        a.trimWhitespace(), a.selection = a.selection.replace(/\n{2,}/g, "\n"), e = /(\**$)/.exec(a.before)[0], 
        f = /(^\**)/.exec(a.after)[0], g = Math.min(e.length, f.length), g >= c && (2 != g || 1 != c) ? (a.before = a.before.replace(q("[*]{" + c + "}$", ""), ""), 
        a.after = a.after.replace(q("^[*]{" + c + "}", ""), "")) : !a.selection && f ? (a.after = a.after.replace(/^([*_]*)/, ""), 
        a.before = a.before.replace(/(\s?)$/, ""), h = q.$1, a.before = a.before + f + h) : (a.selection || f || (a.selection = d), 
        i = 1 >= c ? "*" : "**", a.before = a.before + i, a.after = i + a.after);
    }, l.stripLinkDefs = function(a, b) {
        return a = a.replace(/^[ ]{0,3}\[(\d+)\]:[ \t]*\n?[ \t]*<?(\S+?)>?[ \t]*\n?[ \t]*(?:(\n*)["(](.+?)[")][ \t]*)?(?:\n+|$)/gm, function(a, c, d, e, f) {
            return b[c] = a.replace(/\s*$/, ""), e ? (b[c] = a.replace(/["(](.+?)[")]$/, ""), 
            e + f) : "";
        });
    }, l.addLinkDef = function(a, b) {
        var c, d, e, f, g, h = 0, i = {};
        return a.before = this.stripLinkDefs(a.before, i), a.selection = this.stripLinkDefs(a.selection, i), 
        a.after = this.stripLinkDefs(a.after, i), c = "", d = /(\[)((?:\[[^\]]*\]|[^\[\]])*)(\][ ]?(?:\n[ ]*)?\[)(\d+)(\])/g, 
        e = function(a) {
            h++, a = a.replace(/^[ ]{0,3}\[(\d+)\]:/, "  [" + h + "]:"), c += "\n" + a;
        }, f = function(a, b, c, g, j, k) {
            return c = c.replace(d, f), i[j] ? (e(i[j]), b + c + g + h + k) : a;
        }, a.before = a.before.replace(d, f), b ? e(b) : a.selection = a.selection.replace(d, f), 
        g = h, a.after = a.after.replace(d, f), a.after && (a.after = a.after.replace(/\n*$/, "")), 
        a.after || (a.selection = a.selection.replace(/\n*$/, "")), a.after += "\n\n" + c, 
        g;
    }, l.doLinkOrImage = function(a, b, c) {
        var d, e, f;
        return a.trimWhitespace(), a.findTags(/\s*!?\[/, /\][ ]?(?:\n[ ]*)?(\[.*?\])?/), 
        a.endTag.length > 1 && a.startTag.length > 0 ? (a.startTag = a.startTag.replace(/!?\[/, ""), 
        a.endTag = "", this.addLinkDef(a, null), void 0) : (a.selection = a.startTag + a.selection + a.endTag, 
        a.startTag = a.endTag = "", /\n\n/.test(a.selection) ? (this.addLinkDef(a, null), 
        void 0) : (e = this, f = function(f) {
            var g, i, j, k;
            d.parentNode.removeChild(d), null !== f && (a.selection = (" " + a.selection).replace(/([^\\](?:\\\\)*)(?=[[\]])/g, "$1\\").substr(1), 
            g = " [999]: " + h(f), i = e.addLinkDef(a, g), a.startTag = c ? "![" : "[", a.endTag = "][" + i + "]", 
            a.selection || (c ? (j = e.getString("imagename"), a.selection = j || e.getString("imagedescription")) : (k = e.getString("linkname"), 
            a.selection = k || e.getString("linkdescription")))), b(), e.hooks.commandExecuted(c ? "doImage" : "doLink");
        }, d = o.createBackground(), c ? this.hooks.insertImageDialog(f) || o.prompt(this.getString("imagedialog"), v, f, this.getString("ok"), this.getString("cancel")) : this.hooks.insertLinkDialog(f) || o.prompt(this.getString("linkdialog"), w, f, this.getString("ok"), this.getString("cancel")), 
        !0));
    }, l.doAutoindent = function(a) {
        var b = this, c = !1;
        a.before = a.before.replace(/(\n|^)[ ]{0,3}([*+-]|\d+[.])[ \t]*\n$/, "\n\n"), a.before = a.before.replace(/(\n|^)[ ]{0,3}>[ \t]*\n$/, "\n\n"), 
        a.before = a.before.replace(/(\n|^)[ \t]+\n$/, "\n\n"), a.selection || /^[ \t]*(?:\n|$)/.test(a.after) || (a.after = a.after.replace(/^[^\n]*/, function(b) {
            return a.selection = b, "";
        }), c = !0), /(\n|^)[ ]{0,3}([*+-]|\d+[.])[ \t]+.*\n$/.test(a.before) && b.doList && b.doList(a), 
        /(\n|^)[ ]{0,3}>[ \t]+.*\n$/.test(a.before) && b.doBlockquote && b.doBlockquote(a), 
        /(\n|^)(\t|[ ]{4,}).*\n$/.test(a.before) && b.doCode && b.doCode(a), c && (a.after = a.selection + a.after, 
        a.selection = "");
    }, l.doBlockquote = function(a) {
        var b, c, d, e, f, g, h, i;
        if (a.selection = a.selection.replace(/^(\n*)([^\r]+?)(\n*)$/, function(b, c, d, e) {
            return a.before += c, a.after = e + a.after, d;
        }), a.before = a.before.replace(/(>[ \t]*)$/, function(b, c) {
            return a.selection = c + a.selection, "";
        }), a.selection = a.selection.replace(/^(\s|>)+$/, ""), a.selection = a.selection || this.getString("quoteexample"), 
        c = "", d = "", a.before) {
            for (e = a.before.replace(/\n$/, "").split("\n"), f = !1, g = 0; g < e.length; g++) h = !1, 
            b = e[g], f = f && b.length > 0, /^>/.test(b) ? (h = !0, !f && b.length > 1 && (f = !0)) : h = /^[ \t]*$/.test(b) ? !0 : f, 
            h ? c += b + "\n" : (d += c + b, c = "\n");
            /(^|\n)>/.test(c) || (d += c, c = "");
        }
        a.startTag = c, a.before = d, a.after && (a.after = a.after.replace(/^\n?/, "\n")), 
        a.after = a.after.replace(/^(((\n|^)(\n[ \t]*)*>(.+\n)*.*)+(\n[ \t]*)*)/, function(b) {
            return a.endTag = b, "";
        }), i = function(b) {
            var c = b ? "> " : "";
            a.startTag && (a.startTag = a.startTag.replace(/\n((>|\s)*)\n$/, function(a, b) {
                return "\n" + b.replace(/^[ ]{0,3}>?[ \t]*$/gm, c) + "\n";
            })), a.endTag && (a.endTag = a.endTag.replace(/^\n((>|\s)*)\n/, function(a, b) {
                return "\n" + b.replace(/^[ ]{0,3}>?[ \t]*$/gm, c) + "\n";
            }));
        }, /^(?![ ]{0,3}>)/m.test(a.selection) ? (this.wrap(a, s.lineLength - 2), a.selection = a.selection.replace(/^/gm, "> "), 
        i(!0), a.skipLines()) : (a.selection = a.selection.replace(/^[ ]{0,3}> ?/gm, ""), 
        this.unwrap(a), i(!1), !/^(\n|^)[ ]{0,3}>/.test(a.selection) && a.startTag && (a.startTag = a.startTag.replace(/\n{0,2}$/, "\n\n")), 
        !/(\n|^)[ ]{0,3}>.*$/.test(a.selection) && a.endTag && (a.endTag = a.endTag.replace(/^\n{0,2}/, "\n\n"))), 
        a.selection = this.hooks.postBlockquoteCreation(a.selection), /\n/.test(a.selection) || (a.selection = a.selection.replace(/^(> *)/, function(b, c) {
            return a.startTag += c, "";
        }));
    }, l.doCode = function(a) {
        var b, c, d = /\S[ ]*$/.test(a.before), e = /^[ ]*\S/.test(a.after);
        !e && !d || /\n/.test(a.selection) ? (a.before = a.before.replace(/[ ]{4}$/, function(b) {
            return a.selection = b + a.selection, "";
        }), b = 1, c = 1, /(\n|^)(\t|[ ]{4,}).*\n$/.test(a.before) && (b = 0), /^\n(\t|[ ]{4,})/.test(a.after) && (c = 0), 
        a.skipLines(b, c), a.selection ? /^[]{0,3}\S/m.test(a.selection) ? /\n/.test(a.selection) ? a.selection = a.selection.replace(/^/gm, "    ") : a.before += "    " : a.selection = a.selection.replace(/^(?:[]{4}|[]{0,3}\t)/gm, "") : (a.startTag = "    ", 
        a.selection = this.getString("codeexample"))) : (a.trimWhitespace(), a.findTags(/`/, /`/), 
        a.startTag || a.endTag ? a.endTag && !a.startTag ? (a.before += a.endTag, a.endTag = "") : a.startTag = a.endTag = "" : (a.startTag = a.endTag = "`", 
        a.selection || (a.selection = this.getString("codeexample"))));
    }, l.doList = function(a, b, c) {
        var d, e, f, g, h, i = /(\n|^)(([ ]{0,3}([*+-]|\d+[.])[ \t]+.*)(\n.+|\n{2,}([*+-].*|\d+[.])[ \t]+.*|\n{2,}[ \t]+\S.*)*)\n*$/, j = /^\n*(([ ]{0,3}([*+-]|\d+[.])[ \t]+.*)(\n.+|\n{2,}([*+-].*|\d+[.])[ \t]+.*|\n{2,}[ \t]+\S.*)*)\n*/, k = "-", l = 1, m = function() {
            var a;
            return c ? (a = " " + l + ". ", l++) : a = " " + k + " ", a;
        }, n = function(a) {
            return void 0 === c && (c = /^\s*\d/.test(a)), a = a.replace(/^[ ]{0,3}([*+-]|\d+[.])\s/gm, function() {
                return m();
            });
        };
        a.findTags(/(\n|^)*[ ]{0,3}([*+-]|\d+[.])\s+/, null), !a.before || /\n$/.test(a.before) || /^\n/.test(a.startTag) || (a.before += a.startTag, 
        a.startTag = ""), a.startTag && (d = /\d+[.]/.test(a.startTag), a.startTag = "", 
        a.selection = a.selection.replace(/\n[ ]{4}/g, "\n"), this.unwrap(a), a.skipLines(), 
        d && (a.after = a.after.replace(j, n)), c == d) || (e = 1, a.before = a.before.replace(i, function(a) {
            return /^\s*([*+-])/.test(a) && (k = q.$1), e = /[^\n]\n\n[^\n]/.test(a) ? 1 : 0, 
            n(a);
        }), a.selection || (a.selection = this.getString("litem")), f = m(), g = 1, a.after = a.after.replace(j, function(a) {
            return g = /[^\n]\n\n[^\n]/.test(a) ? 1 : 0, n(a);
        }), a.trimWhitespace(!0), a.skipLines(e, g, !0), a.startTag = f, h = f.replace(/./g, " "), 
        this.wrap(a, s.lineLength - h.length), a.selection = a.selection.replace(/\n/g, "\n" + h), 
        this.hooks.commandExecuted("doList"));
    }, l.doHeading = function(a) {
        var b, c, d, e;
        if (a.selection = a.selection.replace(/\s+/g, " "), a.selection = a.selection.replace(/(^\s+|\s+$)/g, ""), 
        !a.selection) return a.startTag = "## ", a.selection = this.getString("headingexample"), 
        a.endTag = " ##", void 0;
        if (b = 0, a.findTags(/#+[ ]*/, /[ ]*#+/), /#+/.test(a.startTag) && (b = q.lastMatch.length), 
        a.startTag = a.endTag = "", a.findTags(null, /\s?(-+|=+)/), /=+/.test(a.endTag) && (b = 1), 
        /-+/.test(a.endTag) && (b = 2), a.startTag = a.endTag = "", a.skipLines(1, 1), c = 0 == b ? 2 : b - 1, 
        c > 0) for (d = c >= 2 ? "-" : "=", e = a.selection.length, e > s.lineLength && (e = s.lineLength), 
        a.endTag = "\n"; e--; ) a.endTag += d;
    }, l.doHorizontalRule = function(a) {
        a.startTag = "----------\n", a.selection = "", a.skipLines(2, 1, !0);
    }, l.doMore = function(a) {
        a.startTag = "<!--more-->\n\n", a.selection = "", a.skipLines(2, 0, !0);
    }, l.doTab = function(a) {
        a.startTag = "    ", a.selection = "";
    }, i.prototype.doFullScreen = function(a, b) {
        var c = j(), d = this;
        return c ? (this.fullScreenBind || (m.addEvent(document, c.fullScreenChange.substring(2), function() {
            k() ? (a.fullscreen.style.display = "none", a.exitFullscreen.style.display = "", 
            d.hooks.enterFullScreen()) : (a.fullscreen.style.display = "", a.exitFullscreen.style.display = "none", 
            d.hooks.exitFullScreen());
        }), this.fullScreenBind = !0), b ? (d.isFakeFullScreen ? (document.body[c.requestFullscreen]("webkitRequestFullScreen" == c.requestFullscreen ? Element.ALLOW_KEYBOARD_INPUT : null), 
        d.isFakeFullScreen = !1) : k() || (a.exitFullscreen.style.display = "", d.hooks.enterFakeFullScreen(), 
        d.isFakeFullScreen = !0), window.fullScreenEntered = !0) : (d.isFakeFullScreen ? (a.exitFullscreen.style.display = "none", 
        d.hooks.exitFullScreen()) : k() && document[c.cancelFullscreen](), d.isFakeFullScreen = !1, 
        window.fullScreenEntered = !1), void 0) : (alert(d.getString("fullscreenUnsupport")), 
        !1);
    };
}();