!function() {
    function k() {
        this.commonWhiteList = "kbd|b|i|strong|em|sup|sub|br|code|del|a|hr|small", this.blockHtmlTags = "p|div|h[1-6]|blockquote|pre|table|dl|ol|ul|address|form|fieldset|iframe|hr|legend|article|section|nav|aside|hgroup|header|footer|figcaption|svg|script|noscript", 
        this.specialWhiteList = {
            table: "table|tbody|thead|tfoot|tr|td|th"
        }, this.hooks = {}, this.html = !1, this.line = !1, this.blockParsers = [ [ "code", 10 ], [ "shtml", 20 ], [ "pre", 30 ], [ "ahtml", 40 ], [ "shr", 50 ], [ "list", 60 ], [ "math", 70 ], [ "html", 80 ], [ "footnote", 90 ], [ "definition", 100 ], [ "quote", 110 ], [ "table", 120 ], [ "sh", 130 ], [ "mh", 140 ], [ "dhr", 150 ], [ "default", 9999 ] ], 
        this.parsers = {};
    }
    var a, b, c, d, e, f, g, h, i, j = [].slice;
    i = function(a) {
        return a.charAt(0).toUpperCase() + a.substring(1);
    }, f = function(a) {
        return a.replace(/[-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
    }, e = "A-Za-zªµºÀ-ÖØ-öø-ˁˆ-ˑˠ-ˤˬˮͰ-ʹͶͷͺ-ͽΆΈ-ΊΌΎ-ΡΣ-ϵϷ-ҁҊ-ԧԱ-Ֆՙա-ևא-תװ-ײؠ-يٮٯٱ-ۓەۥۦۮۯۺ-ۼۿܐܒ-ܯݍ-ޥޱߊ-ߪߴߵߺࠀ-ࠕࠚࠤࠨࡀ-ࡘࢠࢢ-ࢬऄ-हऽॐक़-ॡॱ-ॷॹ-ॿঅ-ঌএঐও-নপ-রলশ-হঽৎড়ঢ়য়-ৡৰৱਅ-ਊਏਐਓ-ਨਪ-ਰਲਲ਼ਵਸ਼ਸਹਖ਼-ੜਫ਼ੲ-ੴઅ-ઍએ-ઑઓ-નપ-રલળવ-હઽૐૠૡଅ-ଌଏଐଓ-ନପ-ରଲଳଵ-ହଽଡ଼ଢ଼ୟ-ୡୱஃஅ-ஊஎ-ஐஒ-கஙசஜஞடணதந-பம-ஹௐఅ-ఌఎ-ఐఒ-నప-ళవ-హఽౘౙౠౡಅ-ಌಎ-ಐಒ-ನಪ-ಳವ-ಹಽೞೠೡೱೲഅ-ഌഎ-ഐഒ-ഺഽൎൠൡൺ-ൿඅ-ඖක-නඳ-රලව-ෆก-ะาำเ-ๆກຂຄງຈຊຍດ-ທນ-ຟມ-ຣລວສຫອ-ະາຳຽເ-ໄໆໜ-ໟༀཀ-ཇཉ-ཬྈ-ྌက-ဪဿၐ-ၕၚ-ၝၡၥၦၮ-ၰၵ-ႁႎႠ-ჅჇჍა-ჺჼ-ቈቊ-ቍቐ-ቖቘቚ-ቝበ-ኈኊ-ኍነ-ኰኲ-ኵኸ-ኾዀዂ-ዅወ-ዖዘ-ጐጒ-ጕጘ-ፚᎀ-ᎏᎠ-Ᏼᐁ-ᙬᙯ-ᙿᚁ-ᚚᚠ-ᛪᜀ-ᜌᜎ-ᜑᜠ-ᜱᝀ-ᝑᝠ-ᝬᝮ-ᝰក-ឳៗៜᠠ-ᡷᢀ-ᢨᢪᢰ-ᣵᤀ-ᤜᥐ-ᥭᥰ-ᥴᦀ-ᦫᧁ-ᧇᨀ-ᨖᨠ-ᩔᪧᬅ-ᬳᭅ-ᭋᮃ-ᮠᮮᮯᮺ-ᯥᰀ-ᰣᱍ-ᱏᱚ-ᱽᳩ-ᳬᳮ-ᳱᳵᳶᴀ-ᶿḀ-ἕἘ-Ἕἠ-ὅὈ-Ὅὐ-ὗὙὛὝὟ-ώᾀ-ᾴᾶ-ᾼιῂ-ῄῆ-ῌῐ-ΐῖ-Ίῠ-Ῥῲ-ῴῶ-ῼⁱⁿₐ-ₜℂℇℊ-ℓℕℙ-ℝℤΩℨK-ℭℯ-ℹℼ-ℿⅅ-ⅉⅎↃↄⰀ-Ⱞⰰ-ⱞⱠ-ⳤⳫ-ⳮⳲⳳⴀ-ⴥⴧⴭⴰ-ⵧⵯⶀ-ⶖⶠ-ⶦⶨ-ⶮⶰ-ⶶⶸ-ⶾⷀ-ⷆⷈ-ⷎⷐ-ⷖⷘ-ⷞⸯ々〆〱-〵〻〼ぁ-ゖゝ-ゟァ-ヺー-ヿㄅ-ㄭㄱ-ㆎㆠ-ㆺㇰ-ㇿ㐀-䶵一-鿌ꀀ-ꒌꓐ-ꓽꔀ-ꘌꘐ-ꘟꘪꘫꙀ-ꙮꙿ-ꚗꚠ-ꛥꜗ-ꜟꜢ-ꞈꞋ-ꞎꞐ-ꞓꞠ-Ɦꟸ-ꠁꠃ-ꠅꠇ-ꠊꠌ-ꠢꡀ-ꡳꢂ-ꢳꣲ-ꣷꣻꤊ-ꤥꤰ-ꥆꥠ-ꥼꦄ-ꦲꧏꨀ-ꨨꩀ-ꩂꩄ-ꩋꩠ-ꩶꩺꪀ-ꪯꪱꪵꪶꪹ-ꪽꫀꫂꫛ-ꫝꫠ-ꫪꫲ-ꫴꬁ-ꬆꬉ-ꬎꬑ-ꬖꬠ-ꬦꬨ-ꬮꯀ-ꯢ가-힣ힰ-ퟆퟋ-ퟻ豈-舘並-龎ﬀ-ﬆﬓ-ﬗיִײַ-ﬨשׁ-זּטּ-לּמּנּסּףּפּצּ-ﮱﯓ-ﴽﵐ-ﶏﶒ-ﷇﷰ-ﷻﹰ-ﹴﹶ-ﻼＡ-Ｚａ-ｚｦ-ﾾￂ-ￇￊ-ￏￒ-ￗￚ-ￜ", 
    g = function(a, b, c) {
        var d, e, h, i, j, k;
        if (a instanceof Array) if (b instanceof Array) for (d = e = 0, i = a.length; i > e; d = ++e) k = a[d], 
        c = g(k, b[d], c); else for (h = 0, j = a.length; j > h; h++) k = a[h], c = g(k, b, c); else a = f(a), 
        c = c.replace(new RegExp(a, "g"), b.replace(/\$/g, "$$$$"));
        return c;
    }, d = function(a) {
        return a.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
    }, h = function(a, b) {
        var c, d, e, g, h;
        if (null == b && (b = null), null == b) return a.replace(/^\s*/, "").replace(/\s*$/, "");
        for (h = "", d = e = 0, g = b.length - 1; g >= 0 ? g >= e : e >= g; d = g >= 0 ? ++e : --e) c = b[d], 
        h += f(c);
        return h = "[" + h + "]*", a.replace(new RegExp("^" + h), "").replace(new RegExp(h + "$"), "");
    }, b = function(a) {
        var b, c, d, e = [];
        if (a instanceof Array) for (c = b = 0, d = a.length; d > b; c = ++b) a[c], e.push(c); else for (c in a) e.push(c);
        return e;
    }, c = function(a) {
        var b, c, d, e, f = [];
        if (a instanceof Array) for (c = 0, d = a.length; d > c; c++) e = a[c], f.push(e); else for (b in a) e = a[b], 
        f.push(e);
        return f;
    }, k.prototype.makeHtml = function(a) {
        var b, c, d, e, f;
        for (this.footnotes = [], this.definitions = {}, this.holders = {}, this.uniqid = Math.ceil(1e7 * Math.random()) + Math.ceil(1e7 * Math.random()), 
        this.id = 0, this.blockParsers.sort(function(a, b) {
            return a[1] < b[1] ? -1 : 1;
        }), b = 0, c = (f = this.blockParsers).length; c > b; b++) d = (e = f[b])[0], this.parsers[d] = void 0 !== e[2] ? e[2] : this["parseBlock" + i(d)].bind(this);
        return a = this.initText(a), a = this.parse(a), a = this.makeFootnotes(a), a = this.optimizeLines(a), 
        this.call("makeHtml", a);
    }, k.prototype.enableHtml = function(a) {
        this.html = null == a || a;
    }, k.prototype.enableLine = function(a) {
        this.line = null == a || a;
    }, k.prototype.hook = function(a, b) {
        return null == this.hooks[a] && (this.hooks[a] = []), this.hooks[a].push(b);
    }, k.prototype.makeHolder = function(a) {
        var b = "|\r" + this.uniqid + this.id + "\r|";
        return this.id += 1, this.holders[b] = a, b;
    }, k.prototype.initText = function(a) {
        return a.replace(/\t/g, "    ").replace(/\r/g, "").replace(/(\u000A|\u000D|\u2028|\u2029)/g, "\n");
    }, k.prototype.makeFootnotes = function(a) {
        var b, c;
        if (0 < this.footnotes.length) {
            for (a += '<div class="footnotes"><hr><ol>', b = 1; c = this.footnotes.shift(); ) "string" == typeof c ? c += ' <a href="#fnref-' + b + '" class="footnote-backref">&#8617;</a>' : (c[c.length - 1] += ' <a href="#fnref-' + b + '" class="footnote-backref">&#8617;</a>', 
            c = 1 < c.length ? this.parse(c.join("\n")) : this.parseInline(c[0])), a += '<li id="fn-' + b + '">' + c + "</li>", 
            b += 1;
            a += "</ol></div>";
        }
        return a;
    }, k.prototype.parse = function(a, b, c) {
        var d, e, f, g, h, j, k, l, m, n;
        for (null == b && (b = !1), null == c && (c = 0), j = [], d = this.parseBlock(a, j), 
        f = "", b && 1 === d.length && "normal" === d[0][0] && (d[0][3] = !0), g = 0, h = d.length; h > g; g++) m = (e = d[g])[0], 
        l = e[1], k = e[2], n = e[3], e = j.slice(l, k + 1), m = "parse" + i(m), e = this.call("before" + i(m), e, n), 
        k = this[m](e, n, l + c, k + c), f += this.call("after" + i(m), k, n);
        return f;
    }, k.prototype.call = function() {
        var a, b, c, d = arguments[0], e = 2 <= arguments.length ? j.call(arguments, 1) : [], f = e[0];
        if (null == this.hooks[d]) return f;
        for (a = 0, b = (c = this.hooks[d]).length; b > a; a++) f = c[a].apply(this, e), 
        e[0] = f;
        return f;
    }, k.prototype.releaseHolder = function(a, d) {
        var e;
        for (null == d && (d = !0), e = 0; 0 <= a.indexOf("\r") && 10 > e; ) a = g(b(this.holders), c(this.holders), a), 
        e += 1;
        return d && (this.holders = {}), a;
    }, k.prototype.markLine = function(a, b) {
        return null == b && (b = -1), this.line ? '<span class="line" data-start="' + a + '" data-end="' + (b = 0 > b ? a : b) + '" data-id="' + this.uniqid + '"></span>' : "";
    }, k.prototype.markLines = function(a, b) {
        var c, d = -1;
        return this.line ? a.map((c = this, function(a) {
            return d += 1, c.markLine(b + d) + a;
        })) : a;
    }, k.prototype.optimizeLines = function(a) {
        var b = 0, c = new RegExp('class="line" data\\-start="([0-9]+)" data\\-end="([0-9]+)" (data\\-id="' + this.uniqid + '")', "g");
        return this.line ? a.replace(c, function() {
            var a = 1 <= arguments.length ? j.call(arguments, 0) : [], c = b !== parseInt(a[1]) ? 'class="line" data-start="' + b + '" data-start-original="' + a[1] + '" data-end="' + a[2] + '" ' + a[3] : a[0];
            return b = 1 + parseInt(a[2]), c;
        }) : a;
    }, k.prototype.parseInline = function(a, b, c, f) {
        var h, i, k, l, m, n, o, p, q, r, s, t;
        return null == b && (b = ""), null == c && (c = !0), null == f && (f = !0), a = (a = (a = (a = (a = (a = this.call("beforeParseInline", a)).replace(/(^|[^\\])(`+)(.+?)\2/gm, (h = this, 
        function() {
            var a = 1 <= arguments.length ? j.call(arguments, 0) : [];
            return a[1] + h.makeHolder("<code>" + d(a[3]) + "</code>");
        }))).replace(/(^|[^\\])(\$+)(.+?)\2/gm, (i = this, function() {
            var a = 1 <= arguments.length ? j.call(arguments, 0) : [];
            return a[1] + i.makeHolder(a[2] + d(a[3]) + a[2]);
        }))).replace(/\\(.)/g, (k = this, function() {
            var a = 1 <= arguments.length ? j.call(arguments, 0) : [], b = a[1].match(/^[-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]$/) ? "" : "\\", a = d(a[1]);
            return a = a.replace(/\$/g, "&dollar;"), k.makeHolder(b + a);
        }))).replace(/<(https?:\/\/.+)>/gi, (l = this, function() {
            var a = 1 <= arguments.length ? j.call(arguments, 0) : [], b = l.cleanUrl(a[1]), a = l.call("parseLink", a[1]);
            return l.makeHolder('<a href="' + b + '">' + a + "</a>");
        }))).replace(/<(\/?)([a-z0-9-]+)(\s+[^>]*)?>/gi, (m = this, function() {
            var a = 1 <= arguments.length ? j.call(arguments, 0) : [];
            return m.html || 0 <= ("|" + m.commonWhiteList + "|" + b + "|").indexOf("|" + a[2].toLowerCase() + "|") ? m.makeHolder(a[0]) : m.makeHolder(d(a[0]));
        })), this.html && (a = a.replace(/<!\-\-(.*?)\-\->/g, (n = this, function() {
            var a = 1 <= arguments.length ? j.call(arguments, 0) : [];
            return n.makeHolder(a[0]);
        }))), a = (a = (a = (a = (a = (a = g([ "<", ">" ], [ "&lt;", "&gt;" ], a)).replace(/\[\^((?:[^\]]|\\\]|\\\[)+?)\]/g, (o = this, 
        function() {
            var a = 1 <= arguments.length ? j.call(arguments, 0) : [], b = o.footnotes.indexOf(a[1]);
            return 0 > b && (b = o.footnotes.length + 1, o.footnotes.push(o.parseInline(a[1], "", !1))), 
            o.makeHolder('<sup id="fnref-' + b + '"><a href="#fn-' + b + '" class="footnote-ref">' + b + "</a></sup>");
        }))).replace(/!\[((?:[^\]]|\\\]|\\\[)*?)\]\(((?:[^\)]|\\\)|\\\()+?)\)/g, (p = this, 
        function() {
            var a = 1 <= arguments.length ? j.call(arguments, 0) : [], b = d(p.escapeBracket(a[1])), a = p.escapeBracket(a[2]);
            return a = p.cleanUrl(a), p.makeHolder('<img src="' + a + '" alt="' + b + '" title="' + b + '">');
        }))).replace(/!\[((?:[^\]]|\\\]|\\\[)*?)\]\[((?:[^\]]|\\\]|\\\[)+?)\]/g, (q = this, 
        function() {
            var a = 1 <= arguments.length ? j.call(arguments, 0) : [], b = d(q.escapeBracket(a[1])), b = null != q.definitions[a[2]] ? '<img src="' + q.definitions[a[2]] + '" alt="' + b + '" title="' + b + '">' : b;
            return q.makeHolder(b);
        }))).replace(/\[((?:[^\]]|\\\]|\\\[)+?)\]\(((?:[^\)]|\\\)|\\\()+?)\)/g, (r = this, 
        function() {
            var a = 1 <= arguments.length ? j.call(arguments, 0) : [], b = r.parseInline(r.escapeBracket(a[1]), "", !1, !1), a = r.escapeBracket(a[2]);
            return a = r.cleanUrl(a), r.makeHolder('<a href="' + a + '">' + b + "</a>");
        }))).replace(/\[((?:[^\]]|\\\]|\\\[)+?)\]\[((?:[^\]]|\\\]|\\\[)+?)\]/g, (s = this, 
        function() {
            var a = 1 <= arguments.length ? j.call(arguments, 0) : [], b = s.parseInline(s.escapeBracket(a[1]), "", !1, !1), b = null != s.definitions[a[2]] ? '<a href="' + s.definitions[a[2]] + '">' + b + "</a>" : b;
            return s.makeHolder(b);
        })), a = (a = this.parseInlineCallback(a)).replace(/<([_a-z0-9-\.\+]+@[^@]+\.[a-z]{2,})>/gi, '<a href="mailto:$1">$1</a>'), 
        f && (f = new RegExp('(^|[^"])((https?):[' + e + '_0-9-\\./%#!@\\?\\+=~\\|\\,&\\(\\)]+)($|[^"])', "ig"), 
        a = a.replace(f, (t = this, function() {
            var a = 1 <= arguments.length ? j.call(arguments, 0) : [], b = t.call("parseLink", a[2]);
            return a[1] + '<a href="' + a[2] + '">' + b + "</a>" + a[4];
        }))), a = this.call("afterParseInlineBeforeRelease", a), a = this.releaseHolder(a, c), 
        a = this.call("afterParseInline", a);
    }, k.prototype.parseInlineCallback = function(a) {
        var b, c, d, e, f, g, h;
        return a = (a = (a = (a = (a = (a = (a = a.replace(/(\*{3})((?:.|\r)+?)\1/gm, (b = this, 
        function() {
            var a = 1 <= arguments.length ? j.call(arguments, 0) : [];
            return "<strong><em>" + b.parseInlineCallback(a[2]) + "</em></strong>";
        }))).replace(/(\*{2})((?:.|\r)+?)\1/gm, (c = this, function() {
            var a = 1 <= arguments.length ? j.call(arguments, 0) : [];
            return "<strong>" + c.parseInlineCallback(a[2]) + "</strong>";
        }))).replace(/(\*)((?:.|\r)+?)\1/gm, (d = this, function() {
            var a = 1 <= arguments.length ? j.call(arguments, 0) : [];
            return "<em>" + d.parseInlineCallback(a[2]) + "</em>";
        }))).replace(/(\s+|^)(_{3})((?:.|\r)+?)\2(\s+|$)/gm, (e = this, function() {
            var a = 1 <= arguments.length ? j.call(arguments, 0) : [];
            return a[1] + "<strong><em>" + e.parseInlineCallback(a[3]) + "</em></strong>" + a[4];
        }))).replace(/(\s+|^)(_{2})((?:.|\r)+?)\2(\s+|$)/gm, (f = this, function() {
            var a = 1 <= arguments.length ? j.call(arguments, 0) : [];
            return a[1] + "<strong>" + f.parseInlineCallback(a[3]) + "</strong>" + a[4];
        }))).replace(/(\s+|^)(_)((?:.|\r)+?)\2(\s+|$)/gm, (g = this, function() {
            var a = 1 <= arguments.length ? j.call(arguments, 0) : [];
            return a[1] + "<em>" + g.parseInlineCallback(a[3]) + "</em>" + a[4];
        }))).replace(/(~{2})((?:.|\r)+?)\1/gm, (h = this, function() {
            var a = 1 <= arguments.length ? j.call(arguments, 0) : [];
            return "<del>" + h.parseInlineCallback(a[2]) + "</del>";
        }));
    }, k.prototype.parseBlock = function(a, c) {
        for (var d, e, f, g, h, i, j, k, l, m = a.split("\n"), n = 0, o = m.length; o > n; n++) h = m[n], 
        c.push(h);
        for (this.blocks = [], this.current = "normal", this.pos = -1, l = {
            special: b(this.specialWhiteList).join("|"),
            empty: 0,
            html: !1
        }, e = f = 0, g = c.length; g > f; e = ++f) if (h = c[e], d = this.getBlock(), null != d && (d = d.slice(0)), 
        "normal" === this.current || this.parsers[this.current](d, e, h, l, c)) for (i in k = this.parsers) if (j = k[i], 
        i !== this.current && !j(d, e, h, l, c)) break;
        return this.optimizeBlocks(this.blocks, c);
    }, k.prototype.parseBlockList = function(a, b, c, d) {
        var e;
        if (this.isBlock("list") && !c.match(/^\s*\[((?:[^\]]|\\\]|\\\[)+?)\]:\s*(.+)$/)) {
            if (d.empty <= 1 && (e = c.match(/^(\s+)/)) && e[1].length > a[3]) return d.empty = 0, 
            this.setBlock(b), !1;
            if (c.match(/^\s*$/) && 0 === d.empty) return d.empty += 1, this.setBlock(b), !1;
        }
        return !(e = c.match(/^(\s*)((?:[0-9]+\.)|\-|\+|\*)\s+/i)) || (e = e[1].length, 
        d.empty = 0, this.isBlock("list") ? this.setBlock(b, e) : this.startBlock("list", b, e), 
        !1);
    }, k.prototype.parseBlockCode = function(a, b, c) {
        var d;
        return (c = c.match(/^(\s*)(~{3,}|`{3,})([^`~]*)$/i)) ? (this.isBlock("code") ? (d = a[3][2]) ? this.combineBlock().setBlock(b) : this.setBlock(b).endBlock() : (d = !1, 
        this.isBlock("list") && (d = 0 < (a = a[3]) && c[1].length >= a || c[1].length > a), 
        this.startBlock("code", b, [ c[1], c[3], d ])), !1) : !this.isBlock("code") || (this.setBlock(b), 
        !1);
    }, k.prototype.parseBlockShtml = function(a, b, c) {
        if (this.html) {
            if (c.match(/^(\s*)!!!(\s*)$/)) return this.isBlock("shtml") ? this.setBlock(b).endBlock() : this.startBlock("shtml", b), 
            !1;
            if (this.isBlock("shtml")) return this.setBlock(b), !1;
        }
        return !0;
    }, k.prototype.parseBlockAhtml = function(a, b, c, d) {
        var e, f, g, h;
        if (this.html) if (h = new RegExp("^\\s*<(" + this.blockHtmlTags + ")(\\s+[^>]*)?>", "i"), 
        h = c.match(h)) {
            if (this.isBlock("ahtml")) return this.setBlock(b), !1;
            if (void 0 === h[2] || "/" !== h[2]) {
                for (this.startBlock("ahtml", b), e = new RegExp("\\s*<(" + this.blockHtmlTags + ")(\\s+[^>]*)?>", "ig"); g = e.exec(c); ) f = g[1];
                return 0 <= c.indexOf("</" + f + ">") ? this.endBlock() : d.html = f, !1;
            }
        } else {
            if (d.html && 0 <= c.indexOf("</" + d.html + ">")) return this.setBlock(b).endBlock(), 
            d.html = !1;
            if (this.isBlock("ahtml")) return this.setBlock(b), !1;
            if (h = c.match(/^\s*<!\-\-(.*?)\-\->\s*$/)) return this.startBlock("ahtml", b).endBlock(), 
            !1;
        }
        return !0;
    }, k.prototype.parseBlockMath = function(a, b, c) {
        return c.match(/^(\s*)\$\$(\s*)$/) ? (this.isBlock("math") ? this.setBlock(b).endBlock() : this.startBlock("math", b), 
        !1) : !this.isBlock("math") || (this.setBlock(b), !1);
    }, k.prototype.parseBlockPre = function(a, b, c) {
        return c.match(/^ {4}/) ? (this.isBlock("pre") ? this.setBlock(b) : this.startBlock("pre", b), 
        !1) : !this.isBlock("pre") || !c.match(/^\s*$/) || (this.setBlock(b), !1);
    }, k.prototype.parseBlockHtml = function(a, b, c, d) {
        var e, f;
        return (e = c.match(new RegExp("^\\s*<(" + d.special + ")(\\s+[^>]*)?>", "i"))) ? (f = e[1].toLowerCase(), 
        this.isBlock("html", f) || this.isBlock("pre") || this.startBlock("html", b, f), 
        !1) : (e = c.match(new RegExp("</(" + d.special + ")>\\s*$", "i"))) ? (f = e[1].toLowerCase(), 
        this.isBlock("html", f) && this.setBlock(b).endBlock(), !1) : !this.isBlock("html") || (this.setBlock(b), 
        !1);
    }, k.prototype.parseBlockFootnote = function(a, b, c) {
        var d;
        return !(d = c.match(/^\[\^((?:[^\]]|\\\]|\\\[)+?)\]:/)) || (c = d[0].length - 1, 
        this.startBlock("footnote", b, [ c, d[1] ]), !1);
    }, k.prototype.parseBlockDefinition = function(a, b, c) {
        return !(c = c.match(/^\s*\[((?:[^\]]|\\\]|\\\[)+?)\]:\s*(.+)$/)) || (this.definitions[c[1]] = this.cleanUrl(c[2]), 
        this.startBlock("definition", b).endBlock(), !1);
    }, k.prototype.parseBlockQuote = function(a, b, c) {
        return !(c = c.match(/^(\s*)>/)) || (this.isBlock("list") && 0 < c[1].length || this.isBlock("quote") ? this.setBlock(b) : this.startBlock("quote", b), 
        !1);
    }, k.prototype.parseBlockTable = function(a, b, c, d, e) {
        var f, g, h, i, j, k;
        if (j = c.match(/^((?:(?:(?:\||\+)(?:[ :]*\-+[ :]*)(?:\||\+))|(?:(?:[ :]*\-+[ :]*)(?:\||\+)(?:[ :]*\-+[ :]*))|(?:(?:[ :]*\-+[ :]*)(?:\||\+))|(?:(?:\||\+)(?:[ :]*\-+[ :]*)))+)$/)) {
            if (this.isBlock("table")) a[3][0].push(a[3][2]), a[3][2] += 1, this.setBlock(b, a[3]); else {
                for (c = 0, null == a || "normal" !== a[0] || e[a[2]].match(/^\s*$/) ? this.startBlock("table", b) : (c = 1, 
                this.backBlock(1, "table")), "|" === j[1][0] && (j[1] = j[1].substring(1), "|" === j[1][j[1].length - 1] && (j[1] = j[1].substring(0, j[1].length - 1))), 
                g = [], h = 0, i = (k = j[1].split(/\+|\|/)).length; i > h; h++) f = "none", (j = k[h].match(/^\s*(:?)\-+(:?)\s*$/)) && (j[1] && j[2] ? f = "center" : j[1] ? f = "left" : j[2] && (f = "right")), 
                g.push(f);
                this.setBlock(b, [ [ c ], g, c + 1 ]);
            }
            return !1;
        }
        return !0;
    }, k.prototype.parseBlockSh = function(a, b, c) {
        return !(c = c.match(/^(#+)(.*)$/)) || (c = Math.min(c[1].length, 6), this.startBlock("sh", b, c).endBlock(), 
        !1);
    }, k.prototype.parseBlockMh = function(a, b, c, d, e) {
        return !((c = c.match(/^\s*((=|-){2,})\s*$/)) && null != a && "normal" === a[0] && !e[a[2]].match(/^\s*$/) && (this.isBlock("normal") ? this.backBlock(1, "mh", "=" === c[1][0] ? 1 : 2).setBlock(b).endBlock() : this.startBlock("normal", b), 
        1));
    }, k.prototype.parseBlockShr = function(a, b, c) {
        return !c.match(/^(\* *){3,}\s*$/) || (this.startBlock("hr", b).endBlock(), !1);
    }, k.prototype.parseBlockDhr = function(a, b, c) {
        return !c.match(/^(- *){3,}\s*$/) || (this.startBlock("hr", b).endBlock(), !1);
    }, k.prototype.parseBlockDefault = function(a, b, c) {
        return this.isBlock("footnote") ? c.match(/^(\s*)/)[1].length >= a[3][0] ? this.setBlock(b) : this.startBlock("normal", b) : this.isBlock("table") ? 0 <= c.indexOf("|") ? (a[3][2] += 1, 
        this.setBlock(b, a[3])) : this.startBlock("normal", b) : this.isBlock("quote") ? c.match(/^(\s*)$/) ? this.startBlock("normal", b) : this.setBlock(b) : null == a || "normal" !== a[0] ? this.startBlock("normal", b) : this.setBlock(b), 
        !0;
    }, k.prototype.optimizeBlocks = function(a, b) {
        var c, d, e, f, g, h, i, j, k = a.slice(0), l = b.slice(0);
        for (k = this.call("beforeOptimizeBlocks", k, l), e = 0; null != k[e]; ) f = !1, 
        c = k[e], h = null != k[e - 1] ? k[e - 1] : null, g = null != k[e + 1] ? k[e + 1] : null, 
        j = c[0], d = c[1], i = c[2], "pre" === j && l.slice(c[1], c[2] + 1).reduce(function(a, b) {
            return b.match(/^\s*$/) && a;
        }, !0) && (c[0] = j = "normal"), "normal" === j && (j = [ "list", "quote" ], d === i && l[d].match(/^\s*$/) && null != h && null != g && h[0] === g[0] && 0 <= j.indexOf(h[0]) && (k[e - 1] = [ h[0], h[1], g[2], null ], 
        k.splice(e, 2), f = !0)), f || (e += 1);
        return this.call("afterOptimizeBlocks", k, l);
    }, k.prototype.parseCode = function(a, b, c) {
        var e, f, g, i = b[0], j = b[1];
        return j = h(j), e = i.length, j.match(/^[_a-z0-9-\+\#\:\.]+$/i) ? 1 < (b = j.split(":")).length && (j = b[0], 
        g = b[1], j = h(j), g = h(g)) : j = null, f = !0, a = a.slice(1, -1).map(function(a) {
            return a = a.replace(new RegExp("/^[ ]{" + e + "}/"), ""), f && !a.match(/^\s*$/) && (f = !1), 
            d(a);
        }), c = this.markLines(a, c + 1).join("\n"), f ? "" : "<pre><code" + (j ? ' class="' + j + '"' : "") + (g ? ' rel="' + g + '"' : "") + ">" + c + "</code></pre>";
    }, k.prototype.parsePre = function(a, b, c) {
        return a = a.map(function(a) {
            return d(a.substring(4));
        }), (c = this.markLines(a, c).join("\n")).match(/^\s*$/) ? "" : "<pre><code>" + c + "</code></pre>";
    }, k.prototype.parseAhtml = function(a, b, c) {
        return h(this.markLines(a, c).join("\n"));
    }, k.prototype.parseShtml = function(a, b, c) {
        return h(this.markLines(a.slice(1, -1), c + 1).join("\n"));
    }, k.prototype.parseMath = function(a, b, c, e) {
        return "<p>" + this.markLine(c, e) + d(a.join("\n")) + "</p>";
    }, k.prototype.parseSh = function(a, b, c, d) {
        return a = this.markLine(c, d) + this.parseInline(h(a[0], "# ")), a.match(/^\s*$/) ? "" : "<h" + b + ">" + a + "</h" + b + ">";
    }, k.prototype.parseMh = function(a, b, c, d) {
        return this.parseSh(a, b, c, d);
    }, k.prototype.parseQuote = function(a, b, c) {
        return (a = (a = a.map(function(a) {
            return a.replace(/^\s*> ?/, "");
        })).join("\n")).match(/^\s*$/) ? "" : "<blockquote>" + this.parse(a, !0, c) + "</blockquote>";
    }, k.prototype.parseList = function(a, b, c) {
        for (var d, e, f, g, h, i, j, k, l, m, n, o, p = "", q = 99999, r = 99999, s = !1, t = !1, u = [], v = d = 0, w = a.length; w > d; v = ++d) (k = (j = a[v]).match(/^(\s*)((?:[0-9]+\.?)|\-|\+|\*)(\s+)(.*)$/i)) ? (m = k[1].length, 
        o = 0 <= "+-*".indexOf(k[2]) ? "ul" : "ol", q = Math.min(m, q), s = !0, m > 0 && (r = Math.min(m, r), 
        t = !0), u.push([ m, o, j, k[4] ])) : (u.push(j), (k = j.match(/^(\s*)/)) && 0 < (m = k[1].length) && (r = Math.min(m, r), 
        t = !0));
        for (q = s ? q : 0, r = t ? r : q, f = "", g = [], v = e = h = 0, i = u.length; i > e; v = ++e) (l = u[v]) instanceof Array ? (m = l[0], 
        o = l[1], j = l[2], n = l[3], m !== q ? g.push(j.replace(new RegExp("^\\s{" + r + "}"), "")) : (0 < g.length && (p += "<li>" + this.parse(g.join("\n"), !0, c + h) + "</li>"), 
        f !== o && (f && (p += "</" + f + ">"), p += "<" + o + ">"), h = v, g = [ n ], f = o)) : g.push(l.replace(new RegExp("^\\s{" + r + "}"), ""));
        return 0 < g.length && (p += "<li>" + this.parse(g.join("\n"), !0, c + h) + "</li></" + f + ">"), 
        p;
    }, k.prototype.parseTable = function(a, b, c) {
        for (var d, e, f, g, i, j, k, l, m, n, o, p = b[0], q = b[1], r = 0 < p.length && 0 < p.reduce(function(a, b) {
            return b + a;
        }), s = "<table>", t = !r || null, u = !1, v = e = 0, w = a.length; w > e; v = ++e) if (j = a[v], 
        0 <= p.indexOf(v)) r && u && (t = !(r = !1)); else {
            for (u = !0, "|" === (j = h(j))[0] && "|" === (j = j.substring(1))[j.length - 1] && (j = j.substring(0, j.length - 1)), 
            d = {}, g = -1, f = 0, i = (m = j.split("|").map(function(a) {
                return a.match(/^\s*$/) ? " " : h(a);
            })).length; i > f; f++) 0 < (l = m[f]).length ? d[g += 1] = [ null != d[g] ? d[g][0] + 1 : 1, l ] : null != d[g] ? d[g][0] += 1 : d[0] = [ 1, l ];
            for (v in r ? s += "<thead>" : t && (s += "<tbody>"), s += "<tr", this.line && (s += ' class="line" data-start="' + (c + v) + '" data-end="' + (c + v) + '" data-id="' + this.uniqid + '"'), 
            s += ">", d) k = (n = d[v])[0], o = n[1], s += "<" + (n = r ? "th" : "td"), k > 1 && (s += ' colspan="' + k + '"'), 
            null != q[v] && "none" !== q[v] && (s += ' align="' + q[v] + '"'), s += ">" + this.parseInline(o) + "</" + n + ">";
            s += "</tr>", r ? s += "</thead>" : t = t && !1;
        }
        return null !== t && (s += "</tbody>"), s + "</table>";
    }, k.prototype.parseHr = function(a, b, c) {
        return this.line ? '<hr class="line" data-start="' + c + '" data-end="' + c + '">' : "<hr>";
    }, k.prototype.parseNormal = function(a, b, c) {
        var d, e;
        return null == b && (b = !1), d = 0, a = a.map((e = this, function(a) {
            return (a = e.parseInline(a)).match(/^\s*$/) || (a = e.markLine(c + d) + a), d += 1, 
            a;
        })), (a = (a = (a = h(a.join("\n"))).replace(/(\n\s*){2,}/g, "</p><p>")).replace(/\n/g, "<br>")).match(/^\s*$/) ? "" : b ? a : "<p>" + a + "</p>";
    }, k.prototype.parseFootnote = function(a, b) {
        b[0];
        var b = b[1], b = this.footnotes.indexOf(b);
        return b >= 0 && ((a = a.slice(0))[0] = a[0].replace(/^\[\^((?:[^\]]|\]|\[)+?)\]:/, ""), 
        this.footnotes[b] = a), "";
    }, k.prototype.parseDefinition = function() {
        return "";
    }, k.prototype.parseHtml = function(a, b, c) {
        var d;
        return a = a.map((d = this, function(a) {
            return d.parseInline(a, null != d.specialWhiteList[b] ? d.specialWhiteList[b] : "");
        })), this.markLines(a, c).join("\n");
    }, k.prototype.cleanUrl = function(a) {
        var b = new RegExp("^\\s*((http|https|ftp|mailto):[" + e + "_a-z0-9-:\\.\\*/%#;!@\\?\\+=~\\|\\,&\\(\\)]+)", "i"), c = new RegExp("^\\s*([" + e + "_a-z0-9-:\\.\\*/%#!@\\?\\+=~\\|\\,&]+)", "i");
        return (b = a.match(b)) || (b = a.match(c)) ? b[1] : "#";
    }, k.prototype.escapeBracket = function(a) {
        return g([ "\\[", "\\]", "\\(", "\\)" ], [ "[", "]", "(", ")" ], a);
    }, k.prototype.startBlock = function(a, b, c) {
        return null == c && (c = null), this.pos += 1, this.current = a, this.blocks.push([ a, b, b, c ]), 
        this;
    }, k.prototype.endBlock = function() {
        return this.current = "normal", this;
    }, k.prototype.isBlock = function(a, b) {
        return null == b && (b = null), this.current === a && (null === b || this.blocks[this.pos][3] === b);
    }, k.prototype.getBlock = function() {
        return null != this.blocks[this.pos] ? this.blocks[this.pos] : null;
    }, k.prototype.setBlock = function(a, b) {
        return null == a && (a = null), null == b && (b = null), null !== a && (this.blocks[this.pos][2] = a), 
        null !== b && (this.blocks[this.pos][3] = b), this;
    }, k.prototype.backBlock = function(a, b, c) {
        var d;
        return null == c && (c = null), this.pos < 0 ? this.startBlock(b, 0, c) : (d = this.blocks[this.pos][2], 
        this.blocks[this.pos][2] = d - a, c = [ b, d - a + 1, d, c ], this.blocks[this.pos][1] <= this.blocks[this.pos][2] ? (this.pos += 1, 
        this.blocks.push(c)) : this.blocks[this.pos] = c, this.current = b, this);
    }, k.prototype.combineBlock = function() {
        var a, b;
        return this.pos < 1 || (b = this.blocks[this.pos - 1].slice(0), a = this.blocks[this.pos].slice(0), 
        b[2] = a[2], this.blocks[this.pos - 1] = b, this.current = b[0], this.blocks = this.blocks.slice(0, -1), 
        --this.pos), this;
    }, a = k, "undefined" != typeof module && null !== module ? module.exports = a : "undefined" != typeof window && null !== window && (window.HyperDown = a);
}.call(this);