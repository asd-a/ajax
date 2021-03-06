!function(e) {
    "use strict";
    var t, n, s, a, i;
    e.matchMedia = e.matchMedia || (e = e.document, n = e.documentElement, s = n.firstElementChild || n.firstChild, 
    a = e.createElement("body"), (i = e.createElement("div")).id = "mq-test-1", i.style.cssText = "position:absolute;top:-100em", 
    a.style.background = "none", a.appendChild(i), function(e) {
        return i.innerHTML = '&shy;<style media="' + e + '"> #mq-test-1 { width: 42px; }</style>', 
        n.insertBefore(a, s), t = 42 === i.offsetWidth, n.removeChild(a), {
            matches:t,
            media:e
        };
    });
}(this), function(g) {
    "use strict";
    var c = {};
    (g.respond = c).update = function() {};
    function e(e, t) {
        var n = s();
        n && (n.open("GET", e, !0), n.onreadystatechange = function() {
            4 !== n.readyState || 200 !== n.status && 304 !== n.status || t(n.responseText);
        }, 4 !== n.readyState && n.send(null));
    }
    function p(e) {
        return e.replace(c.regex.minmaxwh, "").match(c.regex.other);
    }
    var y, x, E, v, w, i, S, r, T, C, b, $, z, M, o, l, t, m = [], s = function() {
        var t = !1;
        try {
            t = new g.XMLHttpRequest();
        } catch (e) {
            t = new g.ActiveXObject("Microsoft.XMLHTTP");
        }
        return function() {
            return t;
        };
    }();
    function n() {
        M(!0);
    }
    c.ajax = e, c.queue = m, c.unsupportedmq = p, c.regex = {
        media:/@media[^\{]+\{([^\{\}]*\{[^\}\{]*\})+/gi,
        keyframes:/@(?:\-(?:o|moz|webkit)\-)?keyframes[^\{]+\{(?:[^\{\}]*\{[^\}\{]*\})+[^\}]*\}/gi,
        comments:/\/\*[^*]*\*+([^\/][^*]*\*+)*\//gi,
        urls:/(url\()['"]?([^\/\)'"][^:\)'"]+)['"]?(\))/g,
        findStyles:/@media *([^\{]+)\{([\S\s]+?)$/,
        only:/(only\s+)?([a-zA-Z]+)\s?/,
        minw:/\(\s*min\-width\s*:\s*(\s*[0-9\.]+)(px|em)\s*\)/,
        maxw:/\(\s*max\-width\s*:\s*(\s*[0-9\.]+)(px|em)\s*\)/,
        minmaxwh:/\(\s*m(in|ax)\-(height|width)\s*:\s*(\s*[0-9\.]+)(px|em)\s*\)/gi,
        other:/\([^\)]*\)/g
    }, c.mediaQueriesSupported = g.matchMedia && null !== g.matchMedia("only all") && g.matchMedia("only all").matches, 
    c.mediaQueriesSupported || (y = g.document, x = y.documentElement, E = [], v = [], 
    w = [], i = {}, S = y.getElementsByTagName("head")[0] || x, r = y.getElementsByTagName("base")[0], 
    T = S.getElementsByTagName("link"), z = function() {
        var e, t = y.createElement("div"), n = y.body, s = x.style.fontSize, a = n && n.style.fontSize, i = !1;
        return t.style.cssText = "position:absolute;font-size:1em;width:1em", n || ((n = i = y.createElement("body")).style.background = "none"), 
        x.style.fontSize = "100%", n.style.fontSize = "100%", n.appendChild(t), i && x.insertBefore(n, x.firstChild), 
        e = t.offsetWidth, i ? x.removeChild(n) :n.removeChild(t), x.style.fontSize = s, 
        a && (n.style.fontSize = a), $ = parseFloat(e);
    }, M = function(e) {
        var t, n, s, a, i, r, o, l, m, d, h = "clientWidth", u = x[h], c = "CSS1Compat" === y.compatMode && u || y.body[h] || u, p = {}, f = T[T.length - 1], u = new Date().getTime();
        if (e && C && u - C < 30) return g.clearTimeout(b), void (b = g.setTimeout(M, 30));
        for (t in C = u, E) E.hasOwnProperty(t) && (s = null === (i = (n = E[t]).minw), 
        a = null === (r = n.maxw), i = i && parseFloat(i) * (-1 < i.indexOf("em") ? $ || z() :1), 
        r = r && parseFloat(r) * (-1 < r.indexOf("em") ? $ || z() :1), n.hasquery && (s && a || !(s || i <= c) || !(a || c <= r)) || (p[n.media] || (p[n.media] = []), 
        p[n.media].push(v[n.rules])));
        for (o in w) w.hasOwnProperty(o) && w[o] && w[o].parentNode === S && S.removeChild(w[o]);
        for (l in w.length = 0, p) p.hasOwnProperty(l) && (m = y.createElement("style"), 
        d = p[l].join("\n"), m.type = "text/css", m.media = l, S.insertBefore(m, f.nextSibling), 
        m.styleSheet ? m.styleSheet.cssText = d :m.appendChild(y.createTextNode(d)), w.push(m));
    }, o = function(e, t, n) {
        function s(e) {
            return e.replace(c.regex.urls, "$1" + t + "$2$3");
        }
        var a = e.replace(c.regex.comments, "").replace(c.regex.keyframes, "").match(c.regex.media), i = a && a.length || 0, r = !i && n;
        (t = t.substring(0, t.lastIndexOf("/"))).length && (t += "/"), r && (i = 1);
        for (var o, l, m, d, h = 0; h < i; h++) {
            r ? (o = n, v.push(s(e))) :(o = a[h].match(c.regex.findStyles) && RegExp.$1, v.push(RegExp.$2 && s(RegExp.$2))), 
            d = (m = o.split(",")).length;
            for (var u = 0; u < d; u++) l = m[u], p(l) || E.push({
                media:l.split("(")[0].match(c.regex.only) && RegExp.$2 || "all",
                rules:v.length - 1,
                hasquery:-1 < l.indexOf("("),
                minw:l.match(c.regex.minw) && parseFloat(RegExp.$1) + (RegExp.$2 || ""),
                maxw:l.match(c.regex.maxw) && parseFloat(RegExp.$1) + (RegExp.$2 || "")
            });
        }
        M();
    }, l = function() {
        var t;
        m.length && (t = m.shift(), e(t.href, function(e) {
            o(e, t.href, t.media), i[t.href] = !0, g.setTimeout(function() {
                l();
            }, 0);
        }));
    }, (t = function() {
        for (var e = 0; e < T.length; e++) {
            var t = T[e], n = t.href, s = t.media, a = t.rel && "stylesheet" === t.rel.toLowerCase();
            n && a && !i[n] && (t.styleSheet && t.styleSheet.rawCssText ? (o(t.styleSheet.rawCssText, n, s), 
            i[n] = !0) :(/^([a-zA-Z:]*\/\/)/.test(n) || r) && n.replace(RegExp.$1, "").split("/")[0] !== g.location.host || ("//" === n.substring(0, 2) && (n = g.location.protocol + n), 
            m.push({
                href:n,
                media:s
            })));
        }
        l();
    })(), c.update = t, c.getEmValue = z, g.addEventListener ? g.addEventListener("resize", n, !1) :g.attachEvent && g.attachEvent("onresize", n));
}(this);