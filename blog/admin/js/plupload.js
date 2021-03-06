!function(e) {
    function t() {
        var e = {};
        return function(e) {
            (function(e, w, T) {
                var D = window.setTimeout;
                var x = {};
                var t = w.core.utils;
                var F = w.runtime.Runtime;
                function P(e) {
                    var t = e.required_features, s = {};
                    function i(e, t, i) {
                        var r = {
                            chunks:"slice_blob",
                            jpgresize:"send_binary_string",
                            pngresize:"send_binary_string",
                            progress:"report_upload_progress",
                            multi_selection:"select_multiple",
                            dragdrop:"drag_and_drop",
                            drop_element:"drag_and_drop",
                            headers:"send_custom_headers",
                            urlstream_upload:"send_binary_string",
                            canSendBinary:"send_binary",
                            triggerDialog:"summon_file_dialog"
                        };
                        if (r[e]) s[r[e]] = t; else if (!i) s[e] = t;
                    }
                    if (typeof t === "string") U.each(t.split(/\s*,\s*/), function(e) {
                        i(e, true);
                    }); else if (typeof t === "object") U.each(t, function(e, t) {
                        i(t, e);
                    }); else if (t === true) {
                        if (e.chunk_size && e.chunk_size > 0) s.slice_blob = true;
                        if (!U.isEmptyObj(e.resize) || e.multipart === false) s.send_binary_string = true;
                        if (e.http_method) s.use_http_method = e.http_method;
                        U.each(e, function(e, t) {
                            i(t, !!e, true);
                        });
                    }
                    return s;
                }
                var U = {
                    VERSION:"2.3.6",
                    STOPPED:1,
                    STARTED:2,
                    QUEUED:1,
                    UPLOADING:2,
                    FAILED:4,
                    DONE:5,
                    GENERIC_ERROR:-100,
                    HTTP_ERROR:-200,
                    IO_ERROR:-300,
                    SECURITY_ERROR:-400,
                    INIT_ERROR:-500,
                    FILE_SIZE_ERROR:-600,
                    FILE_EXTENSION_ERROR:-601,
                    FILE_DUPLICATE_ERROR:-602,
                    IMAGE_FORMAT_ERROR:-700,
                    MEMORY_ERROR:-701,
                    IMAGE_DIMENSIONS_ERROR:-702,
                    moxie:w,
                    mimeTypes:t.Mime.mimes,
                    ua:t.Env,
                    typeOf:t.Basic.typeOf,
                    extend:t.Basic.extend,
                    guid:t.Basic.guid,
                    getAll:function e(t) {
                        var i = [], r;
                        if (U.typeOf(t) !== "array") t = [ t ];
                        var s = t.length;
                        while (s--) {
                            r = U.get(t[s]);
                            if (r) i.push(r);
                        }
                        return i.length ? i :null;
                    },
                    get:t.Dom.get,
                    each:t.Basic.each,
                    getPos:t.Dom.getPos,
                    getSize:t.Dom.getSize,
                    xmlEncode:function(e) {
                        var t = {
                            "<":"lt",
                            ">":"gt",
                            "&":"amp",
                            '"':"quot",
                            "'":"#39"
                        }, i = /[<>&\"\']/g;
                        return e ? ("" + e).replace(i, function(e) {
                            return t[e] ? "&" + t[e] + ";" :e;
                        }) :e;
                    },
                    toArray:t.Basic.toArray,
                    inArray:t.Basic.inArray,
                    inSeries:t.Basic.inSeries,
                    addI18n:w.core.I18n.addI18n,
                    translate:w.core.I18n.translate,
                    sprintf:t.Basic.sprintf,
                    isEmptyObj:t.Basic.isEmptyObj,
                    hasClass:t.Dom.hasClass,
                    addClass:t.Dom.addClass,
                    removeClass:t.Dom.removeClass,
                    getStyle:t.Dom.getStyle,
                    addEvent:t.Events.addEvent,
                    removeEvent:t.Events.removeEvent,
                    removeAllEvents:t.Events.removeAllEvents,
                    cleanName:function(e) {
                        var t, i;
                        i = [ /[\300-\306]/g, "A", /[\340-\346]/g, "a", /\307/g, "C", /\347/g, "c", /[\310-\313]/g, "E", /[\350-\353]/g, "e", /[\314-\317]/g, "I", /[\354-\357]/g, "i", /\321/g, "N", /\361/g, "n", /[\322-\330]/g, "O", /[\362-\370]/g, "o", /[\331-\334]/g, "U", /[\371-\374]/g, "u" ];
                        for (t = 0; t < i.length; t += 2) e = e.replace(i[t], i[t + 1]);
                        e = e.replace(/\s+/g, "_");
                        e = e.replace(/[^a-z0-9_\-\.]+/gi, "");
                        return e;
                    },
                    buildUrl:function(e, t) {
                        var i = "";
                        U.each(t, function(e, t) {
                            i += (i ? "&" :"") + encodeURIComponent(t) + "=" + encodeURIComponent(e);
                        });
                        if (i) e += (e.indexOf("?") > 0 ? "&" :"?") + i;
                        return e;
                    },
                    formatSize:function(e) {
                        if (e === T || /\D/.test(e)) return U.translate("N/A");
                        function t(e, t) {
                            return Math.round(e * Math.pow(10, t)) / Math.pow(10, t);
                        }
                        var i = Math.pow(1024, 4);
                        if (e > i) return t(e / i, 1) + " " + U.translate("tb");
                        if (e > (i /= 1024)) return t(e / i, 1) + " " + U.translate("gb");
                        if (e > (i /= 1024)) return t(e / i, 1) + " " + U.translate("mb");
                        if (e > 1024) return Math.round(e / 1024) + " " + U.translate("kb");
                        return e + " " + U.translate("b");
                    },
                    parseSize:t.Basic.parseSizeStr,
                    predictRuntime:function(e, t) {
                        var i, r;
                        i = new U.Uploader(e);
                        r = F.thatCan(i.getOption().required_features, t || e.runtimes);
                        i.destroy();
                        return r;
                    },
                    addFileFilter:function(e, t) {
                        x[e] = t;
                    }
                };
                U.addFileFilter("mime_types", function(e, t, i) {
                    if (e.length && !e.regexp.test(t.name)) {
                        this.trigger("Error", {
                            code:U.FILE_EXTENSION_ERROR,
                            message:U.translate("File extension error."),
                            file:t
                        });
                        i(false);
                    } else i(true);
                });
                U.addFileFilter("max_file_size", function(e, t, i) {
                    var r;
                    e = U.parseSize(e);
                    if (t.size !== r && e && t.size > e) {
                        this.trigger("Error", {
                            code:U.FILE_SIZE_ERROR,
                            message:U.translate("File size error."),
                            file:t
                        });
                        i(false);
                    } else i(true);
                });
                U.addFileFilter("prevent_duplicates", function(e, t, i) {
                    if (e) {
                        var r = this.files.length;
                        while (r--) if (t.name === this.files[r].name && t.size === this.files[r].size) {
                            this.trigger("Error", {
                                code:U.FILE_DUPLICATE_ERROR,
                                message:U.translate("Duplicate file error."),
                                file:t
                            });
                            i(false);
                            return;
                        }
                    }
                    i(true);
                });
                U.addFileFilter("prevent_empty", function(e, t, i) {
                    if (e && !t.size && t.size !== T) {
                        this.trigger("Error", {
                            code:U.FILE_SIZE_ERROR,
                            message:U.translate("File size error."),
                            file:t
                        });
                        i(false);
                    } else i(true);
                });
                U.Uploader = function(e) {
                    var t = U.guid(), a, u = [], h = {}, o = [], l = [], s, n, f = false, m;
                    function i() {
                        var e, t = 0, i;
                        if (this.state == U.STARTED) {
                            for (i = 0; i < u.length; i++) if (!e && u[i].status == U.QUEUED) {
                                e = u[i];
                                if (this.trigger("BeforeUpload", e)) {
                                    e.status = U.UPLOADING;
                                    this.trigger("UploadFile", e);
                                }
                            } else t++;
                            if (t == u.length) {
                                if (this.state !== U.STOPPED) {
                                    this.state = U.STOPPED;
                                    this.trigger("StateChanged");
                                }
                                this.trigger("UploadComplete", u);
                            }
                        }
                    }
                    function r(e) {
                        e.percent = e.size > 0 ? Math.ceil(e.loaded / e.size * 100) :100;
                        d();
                    }
                    function d() {
                        var e, t;
                        var i;
                        var r = 0;
                        n.reset();
                        for (e = 0; e < u.length; e++) {
                            t = u[e];
                            if (t.size !== T) {
                                n.size += t.origSize;
                                i = t.loaded * t.origSize / t.size;
                                if (!t.completeTimestamp || t.completeTimestamp > s) r += i;
                                n.loaded += i;
                            } else n.size = T;
                            if (t.status == U.DONE) n.uploaded++; else if (t.status == U.FAILED) n.failed++; else n.queued++;
                        }
                        if (n.size === T) n.percent = u.length > 0 ? Math.ceil(n.uploaded / u.length * 100) :0; else {
                            n.bytesPerSec = Math.ceil(r / ((+new Date() - s || 1) / 1e3));
                            n.percent = n.size > 0 ? Math.ceil(n.loaded / n.size * 100) :0;
                        }
                    }
                    function c() {
                        var e = o[0] || l[0];
                        if (e) return e.getRuntime().uid;
                        return false;
                    }
                    function p() {
                        this.bind("FilesAdded FilesRemoved", function(e) {
                            e.trigger("QueueChanged");
                            e.refresh();
                        });
                        this.bind("CancelUpload", z);
                        this.bind("BeforeUpload", E);
                        this.bind("UploadFile", b);
                        this.bind("UploadProgress", y);
                        this.bind("StateChanged", R);
                        this.bind("QueueChanged", d);
                        this.bind("Error", S);
                        this.bind("FileUploaded", O);
                        this.bind("Destroy", I);
                    }
                    function g(r, e) {
                        var s = this, n = 0, t = [];
                        var a = {
                            runtime_order:r.runtimes,
                            required_caps:r.required_features,
                            preferred_caps:h,
                            swf_url:r.flash_swf_url,
                            xap_url:r.silverlight_xap_url
                        };
                        U.each(r.runtimes.split(/\s*,\s*/), function(e) {
                            if (r[e]) a[e] = r[e];
                        });
                        if (r.browse_button) U.each(r.browse_button, function(i) {
                            t.push(function(t) {
                                var e = new w.file.FileInput(U.extend({}, a, {
                                    accept:r.filters.mime_types,
                                    name:r.file_data_name,
                                    multiple:r.multi_selection,
                                    container:r.container,
                                    browse_button:i
                                }));
                                e.onready = function() {
                                    var e = F.getInfo(this.ruid);
                                    U.extend(s.features, {
                                        chunks:e.can("slice_blob"),
                                        multipart:e.can("send_multipart"),
                                        multi_selection:e.can("select_multiple")
                                    });
                                    n++;
                                    o.push(this);
                                    t();
                                };
                                e.onchange = function() {
                                    s.addFile(this.files);
                                };
                                e.bind("mouseenter mouseleave mousedown mouseup", function(e) {
                                    if (!f) {
                                        if (r.browse_button_hover) if ("mouseenter" === e.type) U.addClass(i, r.browse_button_hover); else if ("mouseleave" === e.type) U.removeClass(i, r.browse_button_hover);
                                        if (r.browse_button_active) if ("mousedown" === e.type) U.addClass(i, r.browse_button_active); else if ("mouseup" === e.type) U.removeClass(i, r.browse_button_active);
                                    }
                                });
                                e.bind("mousedown", function() {
                                    s.trigger("Browse");
                                });
                                e.bind("error runtimeerror", function() {
                                    e = null;
                                    t();
                                });
                                e.init();
                            });
                        });
                        if (r.drop_element) U.each(r.drop_element, function(i) {
                            t.push(function(t) {
                                var e = new w.file.FileDrop(U.extend({}, a, {
                                    drop_zone:i
                                }));
                                e.onready = function() {
                                    var e = F.getInfo(this.ruid);
                                    U.extend(s.features, {
                                        chunks:e.can("slice_blob"),
                                        multipart:e.can("send_multipart"),
                                        dragdrop:e.can("drag_and_drop")
                                    });
                                    n++;
                                    l.push(this);
                                    t();
                                };
                                e.ondrop = function() {
                                    s.addFile(this.files);
                                };
                                e.bind("error runtimeerror", function() {
                                    e = null;
                                    t();
                                });
                                e.init();
                            });
                        });
                        U.inSeries(t, function() {
                            if (typeof e === "function") e(n);
                        });
                    }
                    function _(t, i, e, r) {
                        var s = new w.image.Image();
                        try {
                            s.onload = function() {
                                if (i.width > this.width && i.height > this.height && i.quality === T && i.preserve_headers && !i.crop) {
                                    this.destroy();
                                    r(t);
                                } else s.downsize(i.width, i.height, i.crop, i.preserve_headers);
                            };
                            s.onresize = function() {
                                var e = this.getAsBlob(t.type, i.quality);
                                this.destroy();
                                r(e);
                            };
                            s.bind("error runtimeerror", function() {
                                this.destroy();
                                r(t);
                            });
                            s.load(t, e);
                        } catch (e) {
                            r(t);
                        }
                    }
                    function v(e, t, i) {
                        var s = this, n = false;
                        function r(e, t, i) {
                            var r = a[e];
                            switch (e) {
                              case "max_file_size":
                                if (e === "max_file_size") a.max_file_size = a.filters.max_file_size = t;
                                break;

                              case "chunk_size":
                                if (t = U.parseSize(t)) {
                                    a[e] = t;
                                    a.send_file_name = true;
                                }
                                break;

                              case "multipart":
                                a[e] = t;
                                if (!t) a.send_file_name = true;
                                break;

                              case "http_method":
                                a[e] = t.toUpperCase() === "PUT" ? "PUT" :"POST";
                                break;

                              case "unique_names":
                                a[e] = t;
                                if (t) a.send_file_name = true;
                                break;

                              case "filters":
                                if (U.typeOf(t) === "array") t = {
                                    mime_types:t
                                };
                                if (i) U.extend(a.filters, t); else a.filters = t;
                                if (t.mime_types) {
                                    if (U.typeOf(t.mime_types) === "string") t.mime_types = w.core.utils.Mime.mimes2extList(t.mime_types);
                                    t.mime_types.regexp = function(e) {
                                        var t = [];
                                        U.each(e, function(e) {
                                            U.each(e.extensions.split(/,/), function(e) {
                                                if (/^\s*\*\s*$/.test(e)) t.push("\\.*"); else t.push("\\." + e.replace(new RegExp("[" + "/^$.*+?|()[]{}\\".replace(/./g, "\\$&") + "]", "g"), "\\$&"));
                                            });
                                        });
                                        return new RegExp("(" + t.join("|") + ")$", "i");
                                    }(t.mime_types);
                                    a.filters.mime_types = t.mime_types;
                                }
                                break;

                              case "resize":
                                if (t) a.resize = U.extend({
                                    preserve_headers:true,
                                    crop:false
                                }, t); else a.resize = false;
                                break;

                              case "prevent_duplicates":
                                a.prevent_duplicates = a.filters.prevent_duplicates = !!t;
                                break;

                              case "container":
                              case "browse_button":
                              case "drop_element":
                                t = "container" === e ? U.get(t) :U.getAll(t);

                              case "runtimes":
                              case "multi_selection":
                              case "flash_swf_url":
                              case "silverlight_xap_url":
                                a[e] = t;
                                if (!i) n = true;
                                break;

                              default:
                                a[e] = t;
                            }
                            if (!i) s.trigger("OptionChanged", e, t, r);
                        }
                        if (typeof e === "object") U.each(e, function(e, t) {
                            r(t, e, i);
                        }); else r(e, t, i);
                        if (i) {
                            a.required_features = P(U.extend({}, a));
                            h = P(U.extend({}, a, {
                                required_features:true
                            }));
                        } else if (n) {
                            s.trigger("Destroy");
                            g.call(s, a, function(e) {
                                if (e) {
                                    s.runtime = F.getInfo(c()).type;
                                    s.trigger("Init", {
                                        runtime:s.runtime
                                    });
                                    s.trigger("PostInit");
                                } else s.trigger("Error", {
                                    code:U.INIT_ERROR,
                                    message:U.translate("Init error.")
                                });
                            });
                        }
                    }
                    function E(e, t) {
                        if (e.settings.unique_names) {
                            var i = t.name.match(/\.([^.]+)$/), r = "part";
                            if (i) r = i[1];
                            t.target_name = t.id + "." + r;
                        }
                    }
                    function b(s, n) {
                        var a = s.settings.url;
                        var r = s.settings.chunk_size;
                        var o = s.settings.max_retries;
                        var l = s.features;
                        var u = 0;
                        var f;
                        var d = {
                            runtime_order:s.settings.runtimes,
                            required_caps:s.settings.required_features,
                            preferred_caps:h,
                            swf_url:s.settings.flash_swf_url,
                            xap_url:s.settings.silverlight_xap_url
                        };
                        if (n.loaded) u = n.loaded = r ? r * Math.floor(n.loaded / r) :0;
                        function c() {
                            if (o-- > 0) D(p, 1e3); else {
                                n.loaded = u;
                                s.trigger("Error", {
                                    code:U.HTTP_ERROR,
                                    message:U.translate("HTTP Error."),
                                    file:n,
                                    response:m.responseText,
                                    status:m.status,
                                    responseHeaders:m.getAllResponseHeaders()
                                });
                            }
                        }
                        function p() {
                            var e, t = {}, i;
                            if (n.status !== U.UPLOADING || s.state === U.STOPPED) return;
                            if (s.settings.send_file_name) t.name = n.target_name || n.name;
                            if (r && l.chunks && f.size > r) {
                                i = Math.min(r, f.size - u);
                                e = f.slice(u, u + i);
                            } else {
                                i = f.size;
                                e = f;
                            }
                            if (r && l.chunks) if (s.settings.send_chunk_number) {
                                t.chunk = Math.ceil(u / r);
                                t.chunks = Math.ceil(f.size / r);
                            } else {
                                t.offset = u;
                                t.total = f.size;
                            }
                            if (s.trigger("BeforeChunkUpload", n, t, e, u)) g(t, e, i);
                        }
                        function g(e, t, i) {
                            var r;
                            m = new w.xhr.XMLHttpRequest();
                            if (m.upload) m.upload.onprogress = function(e) {
                                n.loaded = Math.min(n.size, u + e.loaded);
                                s.trigger("UploadProgress", n);
                            };
                            m.onload = function() {
                                if (m.status < 200 || m.status >= 400) {
                                    c();
                                    return;
                                }
                                o = s.settings.max_retries;
                                if (i < f.size) {
                                    t.destroy();
                                    u += i;
                                    n.loaded = Math.min(u, f.size);
                                    s.trigger("ChunkUploaded", n, {
                                        offset:n.loaded,
                                        total:f.size,
                                        response:m.responseText,
                                        status:m.status,
                                        responseHeaders:m.getAllResponseHeaders()
                                    });
                                    if (U.ua.browser === "Android Browser") s.trigger("UploadProgress", n);
                                } else n.loaded = n.size;
                                t = r = null;
                                if (!u || u >= f.size) {
                                    if (n.size != n.origSize) {
                                        f.destroy();
                                        f = null;
                                    }
                                    s.trigger("UploadProgress", n);
                                    n.status = U.DONE;
                                    n.completeTimestamp = +new Date();
                                    s.trigger("FileUploaded", n, {
                                        response:m.responseText,
                                        status:m.status,
                                        responseHeaders:m.getAllResponseHeaders()
                                    });
                                } else D(p, 1);
                            };
                            m.onerror = function() {
                                c();
                            };
                            m.onloadend = function() {
                                this.destroy();
                            };
                            if (s.settings.multipart && l.multipart) {
                                m.open(s.settings.http_method, a, true);
                                U.each(s.settings.headers, function(e, t) {
                                    m.setRequestHeader(t, e);
                                });
                                r = new w.xhr.FormData();
                                U.each(U.extend(e, s.settings.multipart_params), function(e, t) {
                                    r.append(t, e);
                                });
                                r.append(s.settings.file_data_name, t);
                                m.send(r, d);
                            } else {
                                a = U.buildUrl(s.settings.url, U.extend(e, s.settings.multipart_params));
                                m.open(s.settings.http_method, a, true);
                                U.each(s.settings.headers, function(e, t) {
                                    m.setRequestHeader(t, e);
                                });
                                if (!m.hasRequestHeader("Content-Type")) m.setRequestHeader("Content-Type", "application/octet-stream");
                                m.send(t, d);
                            }
                        }
                        f = n.getSource();
                        if (!U.isEmptyObj(s.settings.resize) && U.inArray(f.type, [ "image/jpeg", "image/png" ]) !== -1) _(f, s.settings.resize, d, function(e) {
                            f = e;
                            n.size = e.size;
                            p();
                        }); else p();
                    }
                    function y(e, t) {
                        r(t);
                    }
                    function R(e) {
                        if (e.state == U.STARTED) s = +new Date(); else if (e.state == U.STOPPED) for (var t = e.files.length - 1; t >= 0; t--) if (e.files[t].status == U.UPLOADING) {
                            e.files[t].status = U.QUEUED;
                            d();
                        }
                    }
                    function z() {
                        if (m) m.abort();
                    }
                    function O(e) {
                        d();
                        D(function() {
                            i.call(e);
                        }, 1);
                    }
                    function S(e, t) {
                        if (t.code === U.INIT_ERROR) e.destroy(); else if (t.code === U.HTTP_ERROR) {
                            t.file.status = U.FAILED;
                            t.file.completeTimestamp = +new Date();
                            r(t.file);
                            if (e.state == U.STARTED) {
                                e.trigger("CancelUpload");
                                D(function() {
                                    i.call(e);
                                }, 1);
                            }
                        }
                    }
                    function I(e) {
                        e.stop();
                        U.each(u, function(e) {
                            e.destroy();
                        });
                        u = [];
                        if (o.length) {
                            U.each(o, function(e) {
                                e.destroy();
                            });
                            o = [];
                        }
                        if (l.length) {
                            U.each(l, function(e) {
                                e.destroy();
                            });
                            l = [];
                        }
                        h = {};
                        f = false;
                        s = m = null;
                        n.reset();
                    }
                    a = {
                        chunk_size:0,
                        file_data_name:"file",
                        filters:{
                            mime_types:[],
                            max_file_size:0,
                            prevent_duplicates:false,
                            prevent_empty:true
                        },
                        flash_swf_url:"js/Moxie.swf",
                        http_method:"POST",
                        max_retries:0,
                        multipart:true,
                        multi_selection:true,
                        resize:false,
                        runtimes:F.order,
                        send_file_name:true,
                        send_chunk_number:true,
                        silverlight_xap_url:"js/Moxie.xap"
                    };
                    v.call(this, e, null, true);
                    n = new U.QueueProgress();
                    U.extend(this, {
                        id:t,
                        uid:t,
                        state:U.STOPPED,
                        features:{},
                        runtime:null,
                        files:u,
                        settings:a,
                        total:n,
                        init:function() {
                            var i = this, e, t, r;
                            t = i.getOption("preinit");
                            if (typeof t == "function") t(i); else U.each(t, function(e, t) {
                                i.bind(t, e);
                            });
                            p.call(i);
                            U.each([ "container", "browse_button", "drop_element" ], function(e) {
                                if (i.getOption(e) === null) {
                                    r = {
                                        code:U.INIT_ERROR,
                                        message:U.sprintf(U.translate("%s specified, but cannot be found."), e)
                                    };
                                    return false;
                                }
                            });
                            if (r) return i.trigger("Error", r);
                            if (!a.browse_button && !a.drop_element) return i.trigger("Error", {
                                code:U.INIT_ERROR,
                                message:U.translate("You must specify either browse_button or drop_element.")
                            });
                            g.call(i, a, function(e) {
                                var t = i.getOption("init");
                                if (typeof t == "function") t(i); else U.each(t, function(e, t) {
                                    i.bind(t, e);
                                });
                                if (e) {
                                    i.runtime = F.getInfo(c()).type;
                                    i.trigger("Init", {
                                        runtime:i.runtime
                                    });
                                    i.trigger("PostInit");
                                } else i.trigger("Error", {
                                    code:U.INIT_ERROR,
                                    message:U.translate("Init error.")
                                });
                            });
                        },
                        setOption:function(e, t) {
                            v.call(this, e, t, !this.runtime);
                        },
                        getOption:function(e) {
                            if (!e) return a;
                            return a[e];
                        },
                        refresh:function() {
                            if (o.length) U.each(o, function(e) {
                                e.trigger("Refresh");
                            });
                            this.trigger("Refresh");
                        },
                        start:function() {
                            if (this.state != U.STARTED) {
                                this.state = U.STARTED;
                                this.trigger("StateChanged");
                                i.call(this);
                            }
                        },
                        stop:function() {
                            if (this.state != U.STOPPED) {
                                this.state = U.STOPPED;
                                this.trigger("StateChanged");
                                this.trigger("CancelUpload");
                            }
                        },
                        disableBrowse:function() {
                            f = arguments[0] !== T ? arguments[0] :true;
                            if (o.length) U.each(o, function(e) {
                                e.disable(f);
                            });
                            this.trigger("DisableBrowse", f);
                        },
                        getFile:function(e) {
                            var t;
                            for (t = u.length - 1; t >= 0; t--) if (u[t].id === e) return u[t];
                        },
                        addFile:function(e, t) {
                            var s = this, r = [], n = [], a;
                            function o(r, e) {
                                var t = [];
                                U.each(s.settings.filters, function(e, i) {
                                    if (x[i]) t.push(function(t) {
                                        x[i].call(s, e, r, function(e) {
                                            t(!e);
                                        });
                                    });
                                });
                                U.inSeries(t, e);
                            }
                            function l(i) {
                                var e = U.typeOf(i);
                                if (i instanceof w.file.File) {
                                    if (!i.ruid && !i.isDetached()) {
                                        if (!a) return false;
                                        i.ruid = a;
                                        i.connectRuntime(a);
                                    }
                                    l(new U.File(i));
                                } else if (i instanceof w.file.Blob) {
                                    l(i.getSource());
                                    i.destroy();
                                } else if (i instanceof U.File) {
                                    if (t) i.name = t;
                                    r.push(function(t) {
                                        o(i, function(e) {
                                            if (!e) {
                                                u.push(i);
                                                n.push(i);
                                                s.trigger("FileFiltered", i);
                                            }
                                            D(t, 1);
                                        });
                                    });
                                } else if (U.inArray(e, [ "file", "blob" ]) !== -1) l(new w.file.File(null, i)); else if (e === "node" && U.typeOf(i.files) === "filelist") U.each(i.files, l); else if (e === "array") {
                                    t = null;
                                    U.each(i, l);
                                }
                            }
                            a = c();
                            l(e);
                            if (r.length) U.inSeries(r, function() {
                                if (n.length) s.trigger("FilesAdded", n);
                            });
                        },
                        removeFile:function(e) {
                            var t = typeof e === "string" ? e :e.id;
                            for (var i = u.length - 1; i >= 0; i--) if (u[i].id === t) return this.splice(i, 1)[0];
                        },
                        splice:function(e, t) {
                            var i = u.splice(e === T ? 0 :e, t === T ? u.length :t);
                            var r = false;
                            if (this.state == U.STARTED) {
                                U.each(i, function(e) {
                                    if (e.status === U.UPLOADING) {
                                        r = true;
                                        return false;
                                    }
                                });
                                if (r) this.stop();
                            }
                            this.trigger("FilesRemoved", i);
                            U.each(i, function(e) {
                                e.destroy();
                            });
                            if (r) this.start();
                            return i;
                        },
                        dispatchEvent:function(e) {
                            var t, i, r;
                            e = e.toLowerCase();
                            t = this.hasEventListener(e);
                            if (t) {
                                t.sort(function(e, t) {
                                    return t.priority - e.priority;
                                });
                                i = [].slice.call(arguments);
                                i.shift();
                                i.unshift(this);
                                for (var s = 0; s < t.length; s++) if (t[s].fn.apply(t[s].scope, i) === false) return false;
                            }
                            return true;
                        },
                        bind:function(e, t, i, r) {
                            U.Uploader.prototype.bind.call(this, e, t, r, i);
                        },
                        destroy:function() {
                            this.trigger("Destroy");
                            a = n = null;
                            this.unbindAll();
                        }
                    });
                };
                U.Uploader.prototype = w.core.EventTarget.instance;
                U.File = function() {
                    var t = {};
                    function e(e) {
                        U.extend(this, {
                            id:U.guid(),
                            name:e.name || e.fileName,
                            type:e.type || "",
                            relativePath:e.relativePath || "",
                            size:e.fileSize || e.size,
                            origSize:e.fileSize || e.size,
                            loaded:0,
                            percent:0,
                            status:U.QUEUED,
                            lastModifiedDate:e.lastModifiedDate || new Date().toLocaleString(),
                            completeTimestamp:0,
                            getNative:function() {
                                var e = this.getSource().getSource();
                                return U.inArray(U.typeOf(e), [ "blob", "file" ]) !== -1 ? e :null;
                            },
                            getSource:function() {
                                if (!t[this.id]) return null;
                                return t[this.id];
                            },
                            destroy:function() {
                                var e = this.getSource();
                                if (e) {
                                    e.destroy();
                                    delete t[this.id];
                                }
                            }
                        });
                        t[this.id] = e;
                    }
                    return e;
                }();
                U.QueueProgress = function() {
                    var e = this;
                    e.size = 0;
                    e.loaded = 0;
                    e.uploaded = 0;
                    e.failed = 0;
                    e.queued = 0;
                    e.percent = 0;
                    e.bytesPerSec = 0;
                    e.reset = function() {
                        e.size = e.loaded = e.uploaded = e.failed = e.queued = e.percent = e.bytesPerSec = 0;
                    };
                };
                e.plupload = U;
            })(this, e);
        }.apply(e, arguments), e.plupload;
    }
    "function" == typeof define && define.amd ? define("plupload", [ "./moxie" ], t) :"object" == typeof module && module.exports ? module.exports = t(require("./moxie")) :e.plupload = t(e.moxie);
}(this || window);