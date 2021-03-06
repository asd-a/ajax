! function (e, i) {
    var l, m, t = e.html5 || {},
        a = /^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i,
        r = /^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i,
        n = "_html5shiv",
        c = 0,
        o = {};

    function s() {
        var e = f.elements;
        return "string" == typeof e ? e.split(" ") : e
    }

    function h(e) {
        var t = o[e[n]];
        return t || (t = {}, c++, e[n] = c, o[c] = t), t
    }

    function u(e, t, n) {
        return t = t || i, m ? t.createElement(e) : (t = (n = n || h(t)).cache[e] ? n.cache[e].cloneNode() : r.test(e) ? (n.cache[e] = n.createElem(e)).cloneNode() : n.createElem(e)).canHaveChildren && !a.test(e) ? n.frag.appendChild(t) : t
    }

    function d(e) {
        var t, n, a, r, c, o = h(e = e || i);
        return !f.shivCSS || l || o.hasCSS || (o.hasCSS = (n = "article,aside,dialog,figcaption,figure,footer,header,hgroup,main,nav,section{display:block}mark{background:#FF0;color:#000}template{display:none}", a = (t = e).createElement("p"), t = t.getElementsByTagName("head")[0] || t.documentElement, a.innerHTML = "x<style>" + n + "</style>", !!t.insertBefore(a.lastChild, t.firstChild))), m || (r = e, (c = o).cache || (c.cache = {}, c.createElem = r.createElement, c.createFrag = r.createDocumentFragment, c.frag = c.createFrag()), r.createElement = function (e) {
            return f.shivMethods ? u(e, r, c) : c.createElem(e)
        }, r.createDocumentFragment = Function("h,f", "return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&(" + s().join().replace(/[\w\-]+/g, function (e) {
            return c.createElem(e), c.frag.createElement(e), 'c("' + e + '")'
        }) + ");return n}")(f, c.frag)), e
    }! function () {
        try {
            var e = i.createElement("a");
            e.innerHTML = "<xyz></xyz>", l = "hidden" in e, m = 1 == e.childNodes.length || function () {
                i.createElement("a");
                var e = i.createDocumentFragment();
                return void 0 === e.cloneNode || void 0 === e.createDocumentFragment || void 0 === e.createElement
            }()
        } catch (e) {
            m = l = !0
        }
    }();
    var f = {
        elements: t.elements || "abbr article aside audio bdi canvas data datalist details dialog figcaption figure footer header hgroup main mark meter nav output progress section summary template time video",
        version: "3.7.0",
        shivCSS: !1 !== t.shivCSS,
        supportsUnknownElements: m,
        shivMethods: !1 !== t.shivMethods,
        type: "default",
        shivDocument: d,
        createElement: u,
        createDocumentFragment: function (e, t) {
            if (e = e || i, m) return e.createDocumentFragment();
            for (var n = (t = t || h(e)).frag.cloneNode(), a = 0, r = s(), c = r.length; a < c; a++) n.createElement(r[a]);
            return n
        }
    };
    e.html5 = f, d(i)
}(this, document);