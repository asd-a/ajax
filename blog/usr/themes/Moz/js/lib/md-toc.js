(function(d) {
    function Toc(a, b, c) {
        this.el = document.getElementById(a);
        this.callback = c;
        if (!this.el) return;
        this.options = b || {};
        this.tocLevel = parseInt(b.level) || 0;
        this.tocClass = b["class"] || "toc";
        this.tocTop = parseInt(b.top) || 0;
        this.elChilds = this.el.children;
        if (!this.elChilds.length) return;
        this._init();
    }
    Toc.prototype._init = function() {
        this._collectTitleElements();
        this._createTocContent();
        this._showToc();
        this._callback();
    };
    Toc.prototype._collectTitleElements = function() {
        this._elTitlesNames = [], this.elTitleElements = [];
        for (var i = 1; i < 7; i++) {
            if (this.el.getElementsByTagName("h" + i).length) {
                this._elTitlesNames.push("h" + i);
            }
        }
        this._elTitlesNames.length = this._elTitlesNames.length > this.tocLevel ? this.tocLevel : this._elTitlesNames.length;
        for (var j = 0; j < this.elChilds.length; j++) {
            this._elChildName = this.elChilds[j].tagName.toLowerCase();
            if (this._elTitlesNames.toString().match(this._elChildName)) {
                this.elTitleElements.push(this.elChilds[j]);
            }
        }
    };
    Toc.prototype._createTocContent = function() {
        this._elTitleElementsLen = this.elTitleElements.length;
        if (!this._elTitleElementsLen) return;
        this.tocContent = "";
        this._tempLists = [];
        for (var i = 0; i < this._elTitleElementsLen; i++) {
            var j = i + 1;
            this._elTitleElement = this.elTitleElements[i];
            this._elTitleElementName = this._elTitleElement.tagName;
            this._elTitleElementText = this._elTitleElement.innerHTML;
            this._elTitleElement.setAttribute("id", "tip" + i);
            this.tocContent += '<li><a href="#tip' + i + '">' + this._elTitleElementText + "</a>";
            if (j != this._elTitleElementsLen) {
                this._elNextTitleElementName = this.elTitleElements[j].tagName;
                if (this._elTitleElementName != this._elNextTitleElementName) {
                    var b = false, y = 1;
                    for (var t = this._tempLists.length - 1; t >= 0; t--) {
                        if (this._tempLists[t].tagName == this._elNextTitleElementName) {
                            b = true;
                            break;
                        }
                        y++;
                    }
                    if (b) {
                        this.tocContent += new Array(y + 1).join("</li></ul>");
                        this._tempLists.length = this._tempLists.length - y;
                    } else {
                        this._tempLists.push(this._elTitleElement);
                        this.tocContent += "<ul>";
                    }
                } else {
                    this.tocContent += "</li>";
                }
            } else {
                if (this._tempLists.length) {
                    this.tocContent += new Array(this._tempLists.length + 1).join("</li></ul>");
                } else {
                    this.tocContent += "</li>";
                }
            }
        }
        this.tocContent = "<ul>" + this.tocContent + "</ul>";
    };
    Toc.prototype._showToc = function() {
        this.toc = document.createElement("div");
        this.toc.innerHTML = this.tocContent || "";
        this.toc.setAttribute("class", this.tocClass);
        if (!this.options.targetId) {
            this.el.appendChild(this.toc);
        } else {
            document.getElementById(this.options.targetId).appendChild(this.toc);
        }
        var a = this;
        if (this.tocTop > -1) {
            d.onscroll = function() {
                var t = document.documentElement.scrollTop || document.body.scrollTop;
                if (t < a.tocTop) {
                    a.toc.setAttribute("style", "position:absolute;top:" + a.tocTop + "px;");
                } else {
                    a.toc.setAttribute("style", "position:fixed;top:10px;");
                }
            };
        }
    };
    Toc.prototype._callback = function() {
        this.callback();
    };
    d.Toc = Toc;
})(window);