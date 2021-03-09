var MXI_DEBUG = !0;
!
function(e) {
	function t() {
		var e = {};
		return function() {
			(function(a, w) {
				"use strict";
				var s = {};

				function n(e, t) {
					var i, n = [];
					for (var r = 0; r < e.length; ++r) {
						i = s[e[r]] || o(e[r]);
						if (!i) throw "module definition dependecy not found: " + e[r];
						n.push(i)
					}
					t.apply(null, n)
				}
				function e(e, t, i) {
					if (typeof e !== "string") throw "invalid module definition, module id must be defined and be a string";
					if (t === w) throw "invalid module definition, dependencies must be specified";
					if (i === w) throw "invalid module definition, definition function must be specified";
					n(t, function() {
						s[e] = i.apply(null, arguments)
					})
				}
				function d(e) {
					return !!s[e]
				}
				function o(e) {
					var t = a;
					var i = e.split(/[.\/]/);
					for (var n = 0; n < i.length; ++n) {
						if (!t[i[n]]) return;
						t = t[i[n]]
					}
					return t
				}
				function t(e) {
					for (var t = 0; t < e.length; t++) {
						var i = a;
						var n = e[t];
						var r = n.split(/[.\/]/);
						for (var o = 0; o < r.length - 1; ++o) {
							if (i[r[o]] === w) i[r[o]] = {};
							i = i[r[o]]
						}
						i[r[r.length - 1]] = s[n]
					}
				}
				e("moxie/core/utils/Basic", [], function() {
					function s(e) {
						var t;
						if (e === t) return "undefined";
						else if (e === null) return "null";
						else if (e.nodeType) return "node";
						return {}.toString.call(e).match(/\s([a-z|A-Z]+)/)[1].toLowerCase()
					}
					function t() {
						return l(false, false, arguments)
					}
					function e() {
						return l(true, false, arguments)
					}
					function i() {
						return l(false, true, arguments)
					}
					function n() {
						return l(true, true, arguments)
					}
					function r(e) {
						switch (s(e)) {
						case "array":
							return l(false, true, [
								[], e]);
						case "object":
							return l(false, true, [{},
							e]);
						default:
							return e
						}
					}
					function u(e) {
						switch (s(e)) {
						case "array":
							return Array.prototype.slice.call(e);
						case "object":
							return t({}, e)
						}
						return e
					}
					function l(n, r, e) {
						var o;
						var a = e[0];
						c(e, function(e, t) {
							if (t > 0) c(e, function(e, t) {
								var i = m(s(e), ["array", "object"]) !== -1;
								if (e === o || n && a[t] === o) return true;
								if (i && r) e = u(e);
								if (s(a[t]) === s(e) && i) l(n, r, [a[t], e]);
								else a[t] = e
							})
						});
						return a
					}
					function o(t, e) {
						for (var i in e) if ({}.hasOwnProperty.call(e, i)) t[i] = e[i];

						function n() {
							this.constructor = t;
							if (MXI_DEBUG) {
								var e = function(e) {
										var t = e.toString().match(/^function\s([^\(\s]+)/);
										return t ? t[1] : false
									};
								this.ctorName = e(t)
							}
						}
						n.prototype = e.prototype;
						t.prototype = new n;
						t.parent = e.prototype;
						return t
					}
					function c(e, t) {
						var i, n, r, o;
						if (e) {
							try {
								i = e.length
							} catch (e) {
								i = o
							}
							if (i === o || typeof i !== "number") {
								for (n in e) if (e.hasOwnProperty(n)) if (t(e[n], n) === false) return
							} else for (r = 0; r < i; r++) if (t(e[r], r) === false) return
						}
					}
					function a(e) {
						var t;
						if (!e || s(e) !== "object") return true;
						for (t in e) return false;
						return true
					}
					function f(e, i) {
						var t = 0,
							n = e.length;
						if (s(i) !== "function") i = function() {};
						if (!e || !e.length) i();

						function r(t) {
							if (s(e[t]) === "function") e[t](function(e) {
								++t < n && !e ? r(t) : i(e)
							})
						}
						r(t)
					}
					function d(e, n) {
						var r = 0,
							o = e.length,
							a = new Array(o);
						c(e, function(e, i) {
							e(function(e) {
								if (e) return n(e);
								var t = [].slice.call(arguments);
								t.shift();
								a[i] = t;
								r++;
								if (r === o) {
									a.unshift(null);
									n.apply(this, a)
								}
							})
						})
					}
					function m(e, t) {
						if (t) {
							if (Array.prototype.indexOf) return Array.prototype.indexOf.call(t, e);
							for (var i = 0, n = t.length; i < n; i++) if (t[i] === e) return i
						}
						return -1
					}
					function h(e, t) {
						var i = [];
						if (s(e) !== "array") e = [e];
						if (s(t) !== "array") t = [t];
						for (var n in e) if (m(e[n], t) === -1) i.push(e[n]);
						return i.length ? i : false
					}
					function p(e, t) {
						var i = [];
						c(e, function(e) {
							if (m(e, t) !== -1) i.push(e)
						});
						return i.length ? i : null
					}
					function g(e) {
						var t, i = [];
						for (t = 0; t < e.length; t++) i[t] = e[t];
						return i
					}
					var v = function() {
							var n = 0;
							return function(e) {
								var t = (new Date).getTime().toString(32),
									i;
								for (i = 0; i < 5; i++) t += Math.floor(Math.random() * 65535).toString(32);
								return (e || "o_") + t + (n++).toString(32)
							}
						}();

					function x(e) {
						if (!e) return e;
						return String.prototype.trim ? String.prototype.trim.call(e) : e.toString().replace(/^\s*/, "").replace(/\s*$/, "")
					}
					function w(e) {
						if (typeof e !== "string") return e;
						var t = {
							t: 1099511627776,
							g: 1073741824,
							m: 1048576,
							k: 1024
						},
							i;
						e = /^([0-9\.]+)([tmgk]?)$/.exec(e.toLowerCase().replace(/[^0-9\.tmkg]/g, ""));
						i = e[2];
						e = +e[1];
						if (t.hasOwnProperty(i)) e *= t[i];
						return Math.floor(e)
					}
					function y(e) {
						var n = [].slice.call(arguments, 1);
						return e.replace(/%([a-z])/g, function(e, t) {
							var i = n.shift();
							switch (t) {
							case "s":
								return i + "";
							case "d":
								return parseInt(i, 10);
							case "f":
								return parseFloat(i);
							case "c":
								return "";
							default:
								return i
							}
						})
					}
					function E(e, t) {
						var i = this;
						setTimeout(function() {
							e.call(i)
						}, t || 1)
					}
					return {
						guid: v,
						typeOf: s,
						extend: t,
						extendIf: e,
						extendImmutable: i,
						extendImmutableIf: n,
						clone: r,
						inherit: o,
						each: c,
						isEmptyObj: a,
						inSeries: f,
						inParallel: d,
						inArray: m,
						arrayDiff: h,
						arrayIntersect: p,
						toArray: g,
						trim: x,
						sprintf: y,
						parseSizeStr: w,
						delay: E
					}
				});
				e("moxie/core/utils/Encode", [], function() {
					var g = function(e) {
							return unescape(encodeURIComponent(e))
						};
					var p = function(e) {
							return decodeURIComponent(escape(e))
						};
					var e = function(e, t) {
							if (typeof window.atob === "function") return t ? p(window.atob(e)) : window.atob(e);
							var i = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
							var n, r, o, a, s, u, l, c, f = 0,
								d = 0,
								m = "",
								h = [];
							if (!e) return e;
							e += "";
							do {
								a = i.indexOf(e.charAt(f++));
								s = i.indexOf(e.charAt(f++));
								u = i.indexOf(e.charAt(f++));
								l = i.indexOf(e.charAt(f++));
								c = a << 18 | s << 12 | u << 6 | l;
								n = c >> 16 & 255;
								r = c >> 8 & 255;
								o = c & 255;
								if (u == 64) h[d++] = String.fromCharCode(n);
								else if (l == 64) h[d++] = String.fromCharCode(n, r);
								else h[d++] = String.fromCharCode(n, r, o)
							} while (f < e.length);
							m = h.join("");
							return t ? p(m) : m
						};
					var t = function(e, t) {
							if (t) e = g(e);
							if (typeof window.btoa === "function") return window.btoa(e);
							var i = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
							var n, r, o, a, s, u, l, c, f = 0,
								d = 0,
								m = "",
								h = [];
							if (!e) return e;
							do {
								n = e.charCodeAt(f++);
								r = e.charCodeAt(f++);
								o = e.charCodeAt(f++);
								c = n << 16 | r << 8 | o;
								a = c >> 18 & 63;
								s = c >> 12 & 63;
								u = c >> 6 & 63;
								l = c & 63;
								h[d++] = i.charAt(a) + i.charAt(s) + i.charAt(u) + i.charAt(l)
							} while (f < e.length);
							m = h.join("");
							var p = e.length % 3;
							return (p ? m.slice(0, p - 3) : m) + "===".slice(p || 3)
						};
					return {
						utf8_encode: g,
						utf8_decode: p,
						atob: e,
						btoa: t
					}
				});
				e("moxie/core/utils/Env", ["moxie/core/utils/Basic"], function(r) {
					var e = function(f) {
							var i = "",
								r = "?",
								d = "function",
								m = "undefined",
								h = "object",
								e = "major",
								t = "model",
								n = "name",
								o = "type",
								a = "vendor",
								s = "version",
								u = "architecture",
								l = "console",
								c = "mobile",
								p = "tablet";
							var g = {
								has: function(e, t) {
									return t.toLowerCase().indexOf(e.toLowerCase()) !== -1
								},
								lowerize: function(e) {
									return e.toLowerCase()
								}
							};
							var v = {
								rgx: function() {
									for (var e, t = 0, i, n, r, o, a, s, u = arguments; t < u.length; t += 2) {
										var l = u[t],
											c = u[t + 1];
										if (typeof e === m) {
											e = {};
											for (r in c) {
												o = c[r];
												if (typeof o === h) e[o[0]] = f;
												else e[o] = f
											}
										}
										for (i = n = 0; i < l.length; i++) {
											a = l[i].exec(this.getUA());
											if ( !! a) {
												for (r = 0; r < c.length; r++) {
													s = a[++n];
													o = c[r];
													if (typeof o === h && o.length > 0) {
														if (o.length == 2) if (typeof o[1] == d) e[o[0]] = o[1].call(this, s);
														else e[o[0]] = o[1];
														else if (o.length == 3) if (typeof o[1] === d && !(o[1].exec && o[1].test)) e[o[0]] = s ? o[1].call(this, s, o[2]) : f;
														else e[o[0]] = s ? s.replace(o[1], o[2]) : f;
														else if (o.length == 4) e[o[0]] = s ? o[3].call(this, s.replace(o[1], o[2])) : f
													} else e[o] = s ? s : f
												}
												break
											}
										}
										if ( !! a) break
									}
									return e
								},
								str: function(e, t) {
									for (var i in t) if (typeof t[i] === h && t[i].length > 0) {
										for (var n = 0; n < t[i].length; n++) if (g.has(t[i][n], e)) return i === r ? f : i
									} else if (g.has(t[i], e)) return i === r ? f : i;
									return e
								}
							};
							var x = {
								browser: {
									oldsafari: {
										major: {
											1: ["/8", "/1", "/3"],
											2: "/4",
											"?": "/"
										},
										version: {
											"1.0": "/8",
											1.2: "/1",
											1.3: "/3",
											"2.0": "/412",
											"2.0.2": "/416",
											"2.0.3": "/417",
											"2.0.4": "/419",
											"?": "/"
										}
									}
								},
								device: {
									sprint: {
										model: {
											"Evo Shift 4G": "7373KT"
										},
										vendor: {
											HTC: "APA",
											Sprint: "Sprint"
										}
									}
								},
								os: {
									windows: {
										version: {
											ME: "4.90",
											"NT 3.11": "NT3.51",
											"NT 4.0": "NT4.0",
											2e3: "NT 5.0",
											XP: ["NT 5.1", "NT 5.2"],
											Vista: "NT 6.0",
											7: "NT 6.1",
											8: "NT 6.2",
											8.1: "NT 6.3",
											RT: "ARM"
										}
									}
								}
							};
							var w = {
								browser: [
									[/(opera\smini)\/([\w\.-]+)/i, /(opera\s[mobiletab]+).+version\/([\w\.-]+)/i, /(opera).+version\/([\w\.]+)/i, /(opera)[\/\s]+([\w\.]+)/i],
									[n, s],
									[/\s(opr)\/([\w\.]+)/i],
									[
										[n, "Opera"], s],
									[/(kindle)\/([\w\.]+)/i, /(lunascape|maxthon|netfront|jasmine|blazer)[\/\s]?([\w\.]+)*/i, /(avant\s|iemobile|slim|baidu)(?:browser)?[\/\s]?([\w\.]*)/i, /(?:ms|\()(ie)\s([\w\.]+)/i, /(rekonq)\/([\w\.]+)*/i, /(chromium|flock|rockmelt|midori|epiphany|silk|skyfire|ovibrowser|bolt|iron|vivaldi)\/([\w\.-]+)/i],
									[n, s],
									[/(trident).+rv[:\s]([\w\.]+).+like\sgecko/i],
									[
										[n, "IE"], s],
									[/(edge)\/((\d+)?[\w\.]+)/i],
									[n, s],
									[/(yabrowser)\/([\w\.]+)/i],
									[
										[n, "Yandex"], s],
									[/(comodo_dragon)\/([\w\.]+)/i],
									[
										[n, /_/g, " "], s],
									[/(chrome|omniweb|arora|[tizenoka]{5}\s?browser)\/v?([\w\.]+)/i, /(uc\s?browser|qqbrowser)[\/\s]?([\w\.]+)/i],
									[n, s],
									[/(dolfin)\/([\w\.]+)/i],
									[
										[n, "Dolphin"], s],
									[/((?:android.+)crmo|crios)\/([\w\.]+)/i],
									[
										[n, "Chrome"], s],
									[/XiaoMi\/MiuiBrowser\/([\w\.]+)/i],
									[s, [n, "MIUI Browser"]],
									[/android.+version\/([\w\.]+)\s+(?:mobile\s?safari|safari)/i],
									[s, [n, "Android Browser"]],
									[/FBAV\/([\w\.]+);/i],
									[s, [n, "Facebook"]],
									[/version\/([\w\.]+).+?mobile\/\w+\s(safari)/i],
									[s, [n, "Mobile Safari"]],
									[/version\/([\w\.]+).+?(mobile\s?safari|safari)/i],
									[s, n],
									[/webkit.+?(mobile\s?safari|safari)(\/[\w\.]+)/i],
									[n, [s, v.str, x.browser.oldsafari.version]],
									[/(konqueror)\/([\w\.]+)/i, /(webkit|khtml)\/([\w\.]+)/i],
									[n, s],
									[/(navigator|netscape)\/([\w\.-]+)/i],
									[
										[n, "Netscape"], s],
									[/(swiftfox)/i, /(icedragon|iceweasel|camino|chimera|fennec|maemo\sbrowser|minimo|conkeror)[\/\s]?([\w\.\+]+)/i, /(firefox|seamonkey|k-meleon|icecat|iceape|firebird|phoenix)\/([\w\.-]+)/i, /(mozilla)\/([\w\.]+).+rv\:.+gecko\/\d+/i, /(polaris|lynx|dillo|icab|doris|amaya|w3m|netsurf)[\/\s]?([\w\.]+)/i, /(links)\s\(([\w\.]+)/i, /(gobrowser)\/?([\w\.]+)*/i, /(ice\s?browser)\/v?([\w\._]+)/i, /(mosaic)[\/\s]([\w\.]+)/i],
									[n, s]
								],
								engine: [
									[/windows.+\sedge\/([\w\.]+)/i],
									[s, [n, "EdgeHTML"]],
									[/(presto)\/([\w\.]+)/i, /(webkit|trident|netfront|netsurf|amaya|lynx|w3m)\/([\w\.]+)/i, /(khtml|tasman|links)[\/\s]\(?([\w\.]+)/i, /(icab)[\/\s]([23]\.[\d\.]+)/i],
									[n, s],
									[/rv\:([\w\.]+).*(gecko)/i],
									[s, n]
								],
								os: [
									[/microsoft\s(windows)\s(vista|xp)/i],
									[n, s],
									[/(windows)\snt\s6\.2;\s(arm)/i, /(windows\sphone(?:\sos)*|windows\smobile|windows)[\s\/]?([ntce\d\.\s]+\w)/i],
									[n, [s, v.str, x.os.windows.version]],
									[/(win(?=3|9|n)|win\s9x\s)([nt\d\.]+)/i],
									[
										[n, "Windows"],
										[s, v.str, x.os.windows.version]
									],
									[/\((bb)(10);/i],
									[
										[n, "BlackBerry"], s],
									[/(blackberry)\w*\/?([\w\.]+)*/i, /(tizen)[\/\s]([\w\.]+)/i, /(android|webos|palm\os|qnx|bada|rim\stablet\sos|meego|contiki)[\/\s-]?([\w\.]+)*/i, /linux;.+(sailfish);/i],
									[n, s],
									[/(symbian\s?os|symbos|s60(?=;))[\/\s-]?([\w\.]+)*/i],
									[
										[n, "Symbian"], s],
									[/\((series40);/i],
									[n],
									[/mozilla.+\(mobile;.+gecko.+firefox/i],
									[
										[n, "Firefox OS"], s],
									[/(nintendo|playstation)\s([wids3portablevu]+)/i, /(mint)[\/\s\(]?(\w+)*/i, /(mageia|vectorlinux)[;\s]/i, /(joli|[kxln]?ubuntu|debian|[open]*suse|gentoo|arch|slackware|fedora|mandriva|centos|pclinuxos|redhat|zenwalk|linpus)[\/\s-]?([\w\.-]+)*/i, /(hurd|linux)\s?([\w\.]+)*/i, /(gnu)\s?([\w\.]+)*/i],
									[n, s],
									[/(cros)\s[\w]+\s([\w\.]+\w)/i],
									[
										[n, "Chromium OS"], s],
									[/(sunos)\s?([\w\.]+\d)*/i],
									[
										[n, "Solaris"], s],
									[/\s([frentopc-]{0,4}bsd|dragonfly)\s?([\w\.]+)*/i],
									[n, s],
									[/(ip[honead]+)(?:.*os\s*([\w]+)*\slike\smac|;\sopera)/i],
									[
										[n, "iOS"],
										[s, /_/g, "."]
									],
									[/(mac\sos\sx)\s?([\w\s\.]+\w)*/i, /(macintosh|mac(?=_powerpc)\s)/i],
									[
										[n, "Mac OS"],
										[s, /_/g, "."]
									],
									[/((?:open)?solaris)[\/\s-]?([\w\.]+)*/i, /(haiku)\s(\w+)/i, /(aix)\s((\d)(?=\.|\)|\s)[\w\.]*)*/i, /(plan\s9|minix|beos|os\/2|amigaos|morphos|risc\sos|openvms)/i, /(unix)\s?([\w\.]+)*/i],
									[n, s]
								]
							};
							var y = function(e) {
									var t = e || (window && window.navigator && window.navigator.userAgent ? window.navigator.userAgent : i);
									this.getBrowser = function() {
										return v.rgx.apply(this, w.browser)
									};
									this.getEngine = function() {
										return v.rgx.apply(this, w.engine)
									};
									this.getOS = function() {
										return v.rgx.apply(this, w.os)
									};
									this.getResult = function() {
										return {
											ua: this.getUA(),
											browser: this.getBrowser(),
											engine: this.getEngine(),
											os: this.getOS()
										}
									};
									this.getUA = function() {
										return t
									};
									this.setUA = function(e) {
										t = e;
										return this
									};
									this.setUA(t)
								};
							return y
						}();

					function t(e, t, i) {
						var n = 0,
							r = 0,
							o = 0,
							a = {
								dev: -6,
								alpha: -5,
								a: -5,
								beta: -4,
								b: -4,
								RC: -3,
								rc: -3,
								"#": -2,
								p: 1,
								pl: 1
							},
							s = function(e) {
								e = ("" + e).replace(/[_\-+]/g, ".");
								e = e.replace(/([^.\d]+)/g, ".$1.").replace(/\.{2,}/g, ".");
								return !e.length ? [-8] : e.split(".")
							},
							u = function(e) {
								return !e ? 0 : isNaN(e) ? a[e] || -7 : parseInt(e, 10)
							};
						e = s(e);
						t = s(t);
						r = Math.max(e.length, t.length);
						for (n = 0; n < r; n++) {
							if (e[n] == t[n]) continue;
							e[n] = u(e[n]);
							t[n] = u(t[n]);
							if (e[n] < t[n]) {
								o = -1;
								break
							} else if (e[n] > t[n]) {
								o = 1;
								break
							}
						}
						if (!i) return o;
						switch (i) {
						case ">":
						case "gt":
							return o > 0;
						case ">=":
						case "ge":
							return o >= 0;
						case "<=":
						case "le":
							return o <= 0;
						case "==":
						case "=":
						case "eq":
							return o === 0;
						case "<>":
						case "!=":
						case "ne":
							return o !== 0;
						case "":
						case "<":
						case "lt":
							return o < 0;
						default:
							return null
						}
					}
					var i = function() {
							var n = {
								access_global_ns: function() {
									return !!window.moxie
								},
								define_property: function() {
									return false
								}(),
								create_canvas: function() {
									var e = document.createElement("canvas");
									var t = !! (e.getContext && e.getContext("2d"));
									n.create_canvas = t;
									return t
								},
								return_response_type: function(e) {
									try {
										if (r.inArray(e, ["", "text", "document"]) !== -1) return true;
										else if (window.XMLHttpRequest) {
											var t = new XMLHttpRequest;
											t.open("get", "/");
											if ("responseType" in t) {
												t.responseType = e;
												if (t.responseType !== e) return false;
												return true
											}
										}
									} catch (e) {}
									return false
								},
								use_blob_uri: function() {
									var e = window.URL;
									n.use_blob_uri = e && "createObjectURL" in e && "revokeObjectURL" in e && (o.browser !== "IE" || o.verComp(o.version, "11.0.46", ">="));
									return n.use_blob_uri
								},
								use_data_uri: function() {
									var e = new Image;
									e.onload = function() {
										n.use_data_uri = e.width === 1 && e.height === 1
									};
									setTimeout(function() {
										e.src = "data:image/gif;base64,R0lGODlhAQABAIAAAP8AAAAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw=="
									}, 1);
									return false
								}(),
								use_data_uri_over32kb: function() {
									return n.use_data_uri && (o.browser !== "IE" || o.version >= 9)
								},
								use_data_uri_of: function(e) {
									return n.use_data_uri && e < 33e3 || n.use_data_uri_over32kb()
								},
								use_fileinput: function() {
									if (navigator.userAgent.match(/(Android (1.0|1.1|1.5|1.6|2.0|2.1))|(Windows Phone (OS 7|8.0))|(XBLWP)|(ZuneWP)|(w(eb)?OSBrowser)|(webOS)|(Kindle\/(1.0|2.0|2.5|3.0))/)) return false;
									var e = document.createElement("input");
									e.setAttribute("type", "file");
									return n.use_fileinput = !e.disabled
								},
								use_webgl: function() {
									var e = document.createElement("canvas");
									var t = null,
										i;
									try {
										t = e.getContext("webgl") || e.getContext("experimental-webgl")
									} catch (e) {}
									if (!t) t = null;
									i = !! t;
									n.use_webgl = i;
									e = w;
									return i
								}
							};
							return function(e) {
								var t = [].slice.call(arguments);
								t.shift();
								return r.typeOf(n[e]) === "function" ? n[e].apply(this, t) : !! n[e]
							}
						}();
					var n = (new e).getResult();
					var o = {
						can: i,
						uaParser: e,
						browser: n.browser.name,
						version: n.browser.version,
						os: n.os.name,
						osVersion: n.os.version,
						verComp: t,
						swf_url: "../flash/Moxie.swf",
						xap_url: "../silverlight/Moxie.xap",
						global_event_dispatcher: "moxie.core.EventTarget.instance.dispatchEvent"
					};
					o.OS = o.os;
					if (MXI_DEBUG) {
						o.debug = {
							runtime: true,
							events: false
						};
						o.log = function() {
							function e(e) {
								t.appendChild(document.createTextNode(e + "\n"))
							}
							if (window && window.console && window.console.log && window.console.log.apply) window.console.log.apply(window.console, arguments);
							else if (document) {
								var t = document.getElementById("moxie-console");
								if (!t) {
									t = document.createElement("pre");
									t.id = "moxie-console";
									document.body.appendChild(t)
								}
								var i = arguments[0];
								if (r.typeOf(i) === "string") i = r.sprintf.apply(this, arguments);
								else if (r.inArray(r.typeOf(i), ["object", "array"]) !== -1) {
									e(i);
									return
								}
								t.appendChild(document.createTextNode(i + "\n"))
							}
						}
					}
					return o
				});
				e("moxie/core/Exceptions", ["moxie/core/utils/Basic"], function(n) {
					function r(e, t) {
						var i;
						for (i in e) if (e[i] === t) return i;
						return null
					}
					return {
						RuntimeError: function() {
							var i = {
								NOT_INIT_ERR: 1,
								EXCEPTION_ERR: 3,
								NOT_SUPPORTED_ERR: 9,
								JS_ERR: 4
							};

							function e(e, t) {
								this.code = e;
								this.name = r(i, e);
								this.message = this.name + (t || ": RuntimeError " + this.code)
							}
							n.extend(e, i);
							e.prototype = Error.prototype;
							return e
						}(),
						OperationNotAllowedException: function() {
							function e(e) {
								this.code = e;
								this.name = "OperationNotAllowedException"
							}
							n.extend(e, {
								NOT_ALLOWED_ERR: 1
							});
							e.prototype = Error.prototype;
							return e
						}(),
						ImageError: function() {
							var t = {
								WRONG_FORMAT: 1,
								MAX_RESOLUTION_ERR: 2,
								INVALID_META_ERR: 3
							};

							function e(e) {
								this.code = e;
								this.name = r(t, e);
								this.message = this.name + ": ImageError " + this.code
							}
							n.extend(e, t);
							e.prototype = Error.prototype;
							return e
						}(),
						FileException: function() {
							var t = {
								NOT_FOUND_ERR: 1,
								SECURITY_ERR: 2,
								ABORT_ERR: 3,
								NOT_READABLE_ERR: 4,
								ENCODING_ERR: 5,
								NO_MODIFICATION_ALLOWED_ERR: 6,
								INVALID_STATE_ERR: 7,
								SYNTAX_ERR: 8
							};

							function e(e) {
								this.code = e;
								this.name = r(t, e);
								this.message = this.name + ": FileException " + this.code
							}
							n.extend(e, t);
							e.prototype = Error.prototype;
							return e
						}(),
						DOMException: function() {
							var t = {
								INDEX_SIZE_ERR: 1,
								DOMSTRING_SIZE_ERR: 2,
								HIERARCHY_REQUEST_ERR: 3,
								WRONG_DOCUMENT_ERR: 4,
								INVALID_CHARACTER_ERR: 5,
								NO_DATA_ALLOWED_ERR: 6,
								NO_MODIFICATION_ALLOWED_ERR: 7,
								NOT_FOUND_ERR: 8,
								NOT_SUPPORTED_ERR: 9,
								INUSE_ATTRIBUTE_ERR: 10,
								INVALID_STATE_ERR: 11,
								SYNTAX_ERR: 12,
								INVALID_MODIFICATION_ERR: 13,
								NAMESPACE_ERR: 14,
								INVALID_ACCESS_ERR: 15,
								VALIDATION_ERR: 16,
								TYPE_MISMATCH_ERR: 17,
								SECURITY_ERR: 18,
								NETWORK_ERR: 19,
								ABORT_ERR: 20,
								URL_MISMATCH_ERR: 21,
								QUOTA_EXCEEDED_ERR: 22,
								TIMEOUT_ERR: 23,
								INVALID_NODE_TYPE_ERR: 24,
								DATA_CLONE_ERR: 25
							};

							function e(e) {
								this.code = e;
								this.name = r(t, e);
								this.message = this.name + ": DOMException " + this.code
							}
							n.extend(e, t);
							e.prototype = Error.prototype;
							return e
						}(),
						EventException: function() {
							function e(e) {
								this.code = e;
								this.name = "EventException"
							}
							n.extend(e, {
								UNSPECIFIED_EVENT_TYPE_ERR: 0
							});
							e.prototype = Error.prototype;
							return e
						}()
					}
				});
				e("moxie/core/utils/Dom", ["moxie/core/utils/Env"], function(l) {
					var e = function(e) {
							if (typeof e !== "string") return e;
							return document.getElementById(e)
						};
					var i = function(e, t) {
							if (!e.className) return false;
							var i = new RegExp("(^|\\s+)" + t + "(\\s+|$)");
							return i.test(e.className)
						};
					var t = function(e, t) {
							if (!i(e, t)) e.className = !e.className ? t : e.className.replace(/\s+$/, "") + " " + t
						};
					var n = function(e, t) {
							if (e.className) {
								var i = new RegExp("(^|\\s+)" + t + "(\\s+|$)");
								e.className = e.className.replace(i, function(e, t, i) {
									return t === " " && i === " " ? " " : ""
								})
							}
						};
					var r = function(e, t) {
							if (e.currentStyle) return e.currentStyle[t];
							else if (window.getComputedStyle) return window.getComputedStyle(e, null)[t]
						};
					var o = function(e, t) {
							var i = 0,
								n = 0,
								r, o = document,
								a, s;
							e = e;
							t = t || o.body;

							function u(e) {
								var t, i, n = 0,
									r = 0;
								if (e) {
									i = e.getBoundingClientRect();
									t = o.compatMode === "CSS1Compat" ? o.documentElement : o.body;
									n = i.left + t.scrollLeft;
									r = i.top + t.scrollTop
								}
								return {
									x: n,
									y: r
								}
							}
							if (e && e.getBoundingClientRect && l.browser === "IE" && (!o.documentMode || o.documentMode < 8)) {
								a = u(e);
								s = u(t);
								return {
									x: a.x - s.x,
									y: a.y - s.y
								}
							}
							r = e;
							while (r && r != t && r.nodeType) {
								i += r.offsetLeft || 0;
								n += r.offsetTop || 0;
								r = r.offsetParent
							}
							r = e.parentNode;
							while (r && r != t && r.nodeType) {
								i -= r.scrollLeft || 0;
								n -= r.scrollTop || 0;
								r = r.parentNode
							}
							return {
								x: i,
								y: n
							}
						};
					var a = function(e) {
							return {
								w: e.offsetWidth || e.clientWidth,
								h: e.offsetHeight || e.clientHeight
							}
						};
					return {
						get: e,
						hasClass: i,
						addClass: t,
						removeClass: n,
						getStyle: r,
						getPos: o,
						getSize: a
					}
				});
				e("moxie/core/EventTarget", ["moxie/core/utils/Env", "moxie/core/Exceptions", "moxie/core/utils/Basic"], function(l, c, f) {
					var d = {};

					function e() {
						this.uid = f.guid()
					}
					f.extend(e.prototype, {
						init: function() {
							if (!this.uid) this.uid = f.guid("uid_")
						},
						addEventListener: function(e, t, i, n) {
							var r = this,
								o;
							if (!this.hasOwnProperty("uid")) this.uid = f.guid("uid_");
							e = f.trim(e);
							if (/\s/.test(e)) {
								f.each(e.split(/\s+/), function(e) {
									r.addEventListener(e, t, i, n)
								});
								return
							}
							e = e.toLowerCase();
							i = parseInt(i, 10) || 0;
							o = d[this.uid] && d[this.uid][e] || [];
							o.push({
								fn: t,
								priority: i,
								scope: n || this
							});
							if (!d[this.uid]) d[this.uid] = {};
							d[this.uid][e] = o
						},
						hasEventListener: function(e) {
							var t;
							if (e) {
								e = e.toLowerCase();
								t = d[this.uid] && d[this.uid][e]
							} else t = d[this.uid];
							return t ? t : false
						},
						removeEventListener: function(e, t) {
							var i = this,
								n, r;
							e = e.toLowerCase();
							if (/\s/.test(e)) {
								f.each(e.split(/\s+/), function(e) {
									i.removeEventListener(e, t)
								});
								return
							}
							n = d[this.uid] && d[this.uid][e];
							if (n) {
								if (t) {
									for (r = n.length - 1; r >= 0; r--) if (n[r].fn === t) {
										n.splice(r, 1);
										break
									}
								} else n = [];
								if (!n.length) {
									delete d[this.uid][e];
									if (f.isEmptyObj(d[this.uid])) delete d[this.uid]
								}
							}
						},
						removeAllEventListeners: function() {
							if (d[this.uid]) delete d[this.uid]
						},
						dispatchEvent: function(t) {
							var i, e, n, r, o = {},
								a = true,
								s;
							if (f.typeOf(t) !== "string") {
								r = t;
								if (f.typeOf(r.type) === "string") {
									t = r.type;
									if (r.total !== s && r.loaded !== s) {
										o.total = r.total;
										o.loaded = r.loaded
									}
									o.async = r.async || false
								} else throw new c.EventException(c.EventException.UNSPECIFIED_EVENT_TYPE_ERR)
							}
							if (t.indexOf("::") !== -1)(function(e) {
								i = e[0];
								t = e[1]
							})(t.split("::"));
							else i = this.uid;
							t = t.toLowerCase();
							e = d[i] && d[i][t];
							if (e) {
								e.sort(function(e, t) {
									return t.priority - e.priority
								});
								n = [].slice.call(arguments);
								n.shift();
								o.type = t;
								n.unshift(o);
								if (MXI_DEBUG && l.debug.events) l.log("%cEvent '%s' fired on %s", "color: #999;", o.type, (this.ctorName ? this.ctorName + "::" : "") + i);
								var u = [];
								f.each(e, function(t) {
									n[0].target = t.scope;
									if (o.async) u.push(function(e) {
										setTimeout(function() {
											e(t.fn.apply(t.scope, n) === false)
										}, 1)
									});
									else u.push(function(e) {
										e(t.fn.apply(t.scope, n) === false)
									})
								});
								if (u.length) f.inSeries(u, function(e) {
									a = !e
								})
							}
							return a
						},
						bindOnce: function(t, i, e, n) {
							var r = this;
							r.bind.call(this, t, function e() {
								r.unbind(t, e);
								return i.apply(this, arguments)
							}, e, n)
						},
						bind: function() {
							this.addEventListener.apply(this, arguments)
						},
						unbind: function() {
							this.removeEventListener.apply(this, arguments)
						},
						unbindAll: function() {
							this.removeAllEventListeners.apply(this, arguments)
						},
						trigger: function() {
							return this.dispatchEvent.apply(this, arguments)
						},
						handleEventProps: function(e) {
							var t = this;
							this.bind(e.join(" "), function(e) {
								var t = "on" + e.type.toLowerCase();
								if (f.typeOf(this[t]) === "function") this[t].apply(this, arguments)
							});
							f.each(e, function(e) {
								e = "on" + e.toLowerCase(e);
								if (f.typeOf(t[e]) === "undefined") t[e] = null
							})
						}
					});
					e.instance = new e;
					return e
				});
				e("moxie/runtime/Runtime", ["moxie/core/utils/Env", "moxie/core/utils/Basic", "moxie/core/utils/Dom", "moxie/core/EventTarget"], function(l, c, f, i) {
					var n = {},
						d = {};

					function m(e, t, r, i, n) {
						var o = this,
							a, s = c.guid(t + "_"),
							u = n || "browser";
						e = e || {};
						d[s] = this;
						r = c.extend({
							access_binary: false,
							access_image_binary: false,
							display_media: false,
							do_cors: false,
							drag_and_drop: false,
							filter_by_extension: true,
							resize_image: false,
							report_upload_progress: false,
							return_response_headers: false,
							return_response_type: false,
							return_status_code: true,
							send_custom_headers: false,
							select_file: false,
							select_folder: false,
							select_multiple: true,
							send_binary_string: false,
							send_browser_cookies: true,
							send_multipart: true,
							slice_blob: false,
							stream_upload: false,
							summon_file_dialog: false,
							upload_filesize: true,
							use_http_method: true
						}, r);
						if (e.preferred_caps) u = m.getMode(i, e.preferred_caps, u);
						if (MXI_DEBUG && l.debug.runtime) l.log("\tdefault mode: %s", u);
						a = function() {
							var r = {};
							return {
								exec: function(e, t, i, n) {
									if (a[t]) {
										if (!r[e]) r[e] = {
											context: this,
											instance: new a[t]
										};
										if (r[e].instance[i]) return r[e].instance[i].apply(this, n)
									}
								},
								removeInstance: function(e) {
									delete r[e]
								},
								removeAllInstances: function() {
									var i = this;
									c.each(r, function(e, t) {
										if (c.typeOf(e.instance.destroy) === "function") e.instance.destroy.call(e.context);
										i.removeInstance(t)
									})
								}
							}
						}();
						c.extend(this, {
							initialized: false,
							uid: s,
							type: t,
							mode: m.getMode(i, e.required_caps, u),
							shimid: s + "_container",
							clients: 0,
							options: e,
							can: function(e, t) {
								var i = arguments[2] || r;
								if (c.typeOf(e) === "string" && c.typeOf(t) === "undefined") e = m.parseCaps(e);
								if (c.typeOf(e) === "object") {
									for (var n in e) if (!this.can(n, e[n], i)) return false;
									return true
								}
								if (c.typeOf(i[e]) === "function") return i[e].call(this, t);
								else return t === i[e]
							},
							getShimContainer: function() {
								var e, t = f.get(this.shimid);
								if (!t) {
									e = f.get(this.options.container) || document.body;
									t = document.createElement("div");
									t.id = this.shimid;
									t.className = "moxie-shim moxie-shim-" + this.type;
									c.extend(t.style, {
										position: "absolute",
										top: "0px",
										left: "0px",
										width: "1px",
										height: "1px",
										overflow: "hidden"
									});
									e.appendChild(t);
									e = null
								}
								return t
							},
							getShim: function() {
								return a
							},
							shimExec: function(e, t) {
								var i = [].slice.call(arguments, 2);
								return o.getShim().exec.call(this, this.uid, e, t, i)
							},
							exec: function(e, t) {
								var i = [].slice.call(arguments, 2);
								if (o[e] && o[e][t]) return o[e][t].apply(this, i);
								return o.shimExec.apply(this, arguments)
							},
							destroy: function() {
								if (!o) return;
								var e = f.get(this.shimid);
								if (e) e.parentNode.removeChild(e);
								if (a) a.removeAllInstances();
								this.unbindAll();
								delete d[this.uid];
								this.uid = null;
								s = o = a = e = null
							}
						});
						if (this.mode && e.required_caps && !this.can(e.required_caps)) this.mode = false
					}
					m.order = "html5,flash,silverlight,html4";
					m.getRuntime = function(e) {
						return d[e] ? d[e] : false
					};
					m.addConstructor = function(e, t) {
						t.prototype = i.instance;
						n[e] = t
					};
					m.getConstructor = function(e) {
						return n[e] || null
					};
					m.getInfo = function(e) {
						var t = m.getRuntime(e);
						if (t) return {
							uid: t.uid,
							type: t.type,
							mode: t.mode,
							can: function() {
								return t.can.apply(t, arguments)
							}
						};
						return null
					};
					m.parseCaps = function(e) {
						var t = {};
						if (c.typeOf(e) !== "string") return e || {};
						c.each(e.split(","), function(e) {
							t[e] = true
						});
						return t
					};
					m.can = function(e, t) {
						var i, n = m.getConstructor(e),
							r;
						if (n) {
							i = new n({
								required_caps: t
							});
							r = i.mode;
							i.destroy();
							return !!r
						}
						return false
					};
					m.thatCan = function(e, t) {
						var i = (t || m.order).split(/\s*,\s*/);
						for (var n in i) if (m.can(i[n], e)) return i[n];
						return null
					};
					m.getMode = function(n, e, t) {
						var r = null;
						if (c.typeOf(t) === "undefined") t = "browser";
						if (e && !c.isEmptyObj(n)) {
							c.each(e, function(e, t) {
								if (n.hasOwnProperty(t)) {
									var i = n[t](e);
									if (typeof i === "string") i = [i];
									if (!r) r = i;
									else if (!(r = c.arrayIntersect(r, i))) {
										if (MXI_DEBUG && l.debug.runtime) l.log("\t\t%s: %s (conflicting mode requested: %s)", t, e, i);
										return r = false
									}
								}
								if (MXI_DEBUG && l.debug.runtime) l.log("\t\t%s: %s (compatible modes: %s)", t, e, r)
							});
							if (r) return c.inArray(t, r) !== -1 ? t : r[0];
							else if (r === false) return false
						}
						return t
					};
					m.getGlobalEventTarget = function() {
						if (/^moxie\./.test(l.global_event_dispatcher) && !l.can("access_global_ns")) {
							var e = c.guid("moxie_event_target_");
							window[e] = function(e, t) {
								i.instance.dispatchEvent(e, t)
							};
							l.global_event_dispatcher = e
						}
						return l.global_event_dispatcher
					};
					m.capTrue = function() {
						return true
					};
					m.capFalse = function() {
						return false
					};
					m.capTest = function(e) {
						return function() {
							return !!e
						}
					};
					return m
				});
				e("moxie/runtime/RuntimeClient", ["moxie/core/utils/Env", "moxie/core/Exceptions", "moxie/core/utils/Basic", "moxie/runtime/Runtime"], function(s, u, t, l) {
					return function e() {
						var a;
						t.extend(this, {
							connectRuntime: function(n) {
								var r = this,
									e;

								function o(e) {
									var t, i;
									if (!e.length) {
										r.trigger("RuntimeError", new u.RuntimeError(u.RuntimeError.NOT_INIT_ERR));
										a = null;
										return
									}
									t = e.shift().toLowerCase();
									i = l.getConstructor(t);
									if (!i) {
										if (MXI_DEBUG && s.debug.runtime) s.log("Constructor for '%s' runtime is not available.", t);
										o(e);
										return
									}
									if (MXI_DEBUG && s.debug.runtime) {
										s.log("Trying runtime: %s", t);
										s.log(n)
									}
									a = new i(n);
									a.bind("Init", function() {
										a.initialized = true;
										if (MXI_DEBUG && s.debug.runtime) s.log("Runtime '%s' initialized", a.type);
										setTimeout(function() {
											a.clients++;
											r.ruid = a.uid;
											r.trigger("RuntimeInit", a)
										}, 1)
									});
									a.bind("Error", function() {
										if (MXI_DEBUG && s.debug.runtime) s.log("Runtime '%s' failed to initialize", a.type);
										a.destroy();
										o(e)
									});
									a.bind("Exception", function(e, t) {
										var i = t.name + "(#" + t.code + ")" + (t.message ? ", from: " + t.message : "");
										if (MXI_DEBUG && s.debug.runtime) s.log("Runtime '%s' has thrown an exception: %s", this.type, i);
										r.trigger("RuntimeError", new u.RuntimeError(u.RuntimeError.EXCEPTION_ERR, i))
									});
									if (MXI_DEBUG && s.debug.runtime) s.log("\tselected mode: %s", a.mode);
									if (!a.mode) {
										a.trigger("Error");
										return
									}
									a.init()
								}
								if (t.typeOf(n) === "string") e = n;
								else if (t.typeOf(n.ruid) === "string") e = n.ruid;
								if (e) {
									a = l.getRuntime(e);
									if (a) {
										r.ruid = e;
										a.clients++;
										return a
									} else throw new u.RuntimeError(u.RuntimeError.NOT_INIT_ERR)
								}
								o((n.runtime_order || l.order).split(/\s*,\s*/))
							},
							disconnectRuntime: function() {
								if (a && --a.clients <= 0) a.destroy();
								a = null
							},
							getRuntime: function() {
								if (a && a.uid) return a;
								return a = null
							},
							exec: function() {
								return a ? a.exec.apply(this, arguments) : null
							},
							can: function(e) {
								return a ? a.can(e) : false
							}
						})
					}
				});
				e("moxie/file/Blob", ["moxie/core/utils/Basic", "moxie/core/utils/Encode", "moxie/runtime/RuntimeClient"], function(o, i, r) {
					var a = {};

					function s(e, t) {
						function n(e, t, i) {
							var n, r = a[this.uid];
							if (o.typeOf(r) !== "string" || !r.length) return null;
							n = new s(null, {
								type: i,
								size: t - e
							});
							n.detach(r.substr(e, n.size));
							return n
						}
						r.call(this);
						if (e) this.connectRuntime(e);
						if (!t) t = {};
						else if (o.typeOf(t) === "string") t = {
							data: t
						};
						o.extend(this, {
							uid: t.uid || o.guid("uid_"),
							ruid: e,
							size: t.size || 0,
							type: t.type || "",
							slice: function(e, t, i) {
								if (this.isDetached()) return n.apply(this, arguments);
								return this.getRuntime().exec.call(this, "Blob", "slice", this.getSource(), e, t, i)
							},
							getSource: function() {
								if (!a[this.uid]) return null;
								return a[this.uid]
							},
							detach: function(e) {
								if (this.ruid) {
									this.getRuntime().exec.call(this, "Blob", "destroy");
									this.disconnectRuntime();
									this.ruid = null
								}
								e = e || "";
								if (e.substr(0, 5) == "data:") {
									var t = e.indexOf(";base64,");
									this.type = e.substring(5, t);
									e = i.atob(e.substring(t + 8))
								}
								this.size = e.length;
								a[this.uid] = e
							},
							isDetached: function() {
								return !this.ruid && o.typeOf(a[this.uid]) === "string"
							},
							destroy: function() {
								this.detach();
								delete a[this.uid]
							}
						});
						if (t.data) this.detach(t.data);
						else a[this.uid] = t
					}
					return s
				});
				e("moxie/core/I18n", ["moxie/core/utils/Basic"], function(i) {
					var t = {};
					return {
						addI18n: function(e) {
							return i.extend(t, e)
						},
						translate: function(e) {
							return t[e] || e
						},
						_: function(e) {
							return this.translate(e)
						},
						sprintf: function(e) {
							var t = [].slice.call(arguments, 1);
							return e.replace(/%[a-z]/g, function() {
								var e = t.shift();
								return i.typeOf(e) !== "undefined" ? e : ""
							})
						}
					}
				});
				e("moxie/core/utils/Mime", ["moxie/core/utils/Basic", "moxie/core/I18n"], function(s, n) {
					var e = "" + "application/msword,doc dot," + "application/pdf,pdf," + "application/pgp-signature,pgp," + "application/postscript,ps ai eps," + "application/rtf,rtf," + "application/vnd.ms-excel,xls xlb xlt xla," + "application/vnd.ms-powerpoint,ppt pps pot ppa," + "application/zip,zip," + "application/x-shockwave-flash,swf swfl," + "application/vnd.openxmlformats-officedocument.wordprocessingml.document,docx," + "application/vnd.openxmlformats-officedocument.wordprocessingml.template,dotx," + "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,xlsx," + "application/vnd.openxmlformats-officedocument.presentationml.presentation,pptx," + "application/vnd.openxmlformats-officedocument.presentationml.template,potx," + "application/vnd.openxmlformats-officedocument.presentationml.slideshow,ppsx," + "application/x-javascript,js," + "application/json,json," + "audio/mpeg,mp3 mpga mpega mp2," + "audio/x-wav,wav," + "audio/x-m4a,m4a," + "audio/ogg,oga ogg," + "audio/aiff,aiff aif," + "audio/flac,flac," + "audio/aac,aac," + "audio/ac3,ac3," + "audio/x-ms-wma,wma," + "image/bmp,bmp," + "image/gif,gif," + "image/jpeg,jpg jpeg jpe," + "image/photoshop,psd," + "image/png,png," + "image/svg+xml,svg svgz," + "image/tiff,tiff tif," + "text/plain,asc txt text diff log," + "text/html,htm html xhtml," + "text/css,css," + "text/csv,csv," + "text/rtf,rtf," + "video/mpeg,mpeg mpg mpe m2v," + "video/quicktime,qt mov," + "video/mp4,mp4," + "video/x-m4v,m4v," + "video/x-flv,flv," + "video/x-ms-wmv,wmv," + "video/avi,avi," + "video/webm,webm," + "video/3gpp,3gpp 3gp," + "video/3gpp2,3g2," + "video/vnd.rn-realvideo,rv," + "video/ogg,ogv," + "video/x-matroska,mkv," + "application/vnd.oasis.opendocument.formula-template,otf," + "application/octet-stream,exe";
					var o = {};
					var a = {};
					var t = function(e) {
							var t = e.split(/,/),
								i, n, r;
							for (i = 0; i < t.length; i += 2) {
								r = t[i + 1].split(/ /);
								for (n = 0; n < r.length; n++) o[r[n]] = t[i];
								a[t[i]] = r
							}
						};
					var i = function(e, t) {
							var i, n, r, o, a = [];
							for (n = 0; n < e.length; n++) {
								i = e[n].extensions.toLowerCase().split(/\s*,\s*/);
								for (r = 0; r < i.length; r++) {
									if (i[r] === "*") return [];
									o = a[i[r]];
									if (t && /^\w+$/.test(i[r])) a.push("." + i[r]);
									else if (o && s.inArray(o, a) === -1) a.push(o);
									else if (!o) return []
								}
							}
							return a
						};
					var r = function(e) {
							var n = [];
							s.each(e, function(e) {
								e = e.toLowerCase();
								if (e === "*") {
									n = [];
									return false
								}
								var i = e.match(/^(\w+)\/(\*|\w+)$/);
								if (i) if (i[2] === "*") s.each(a, function(e, t) {
									if (new RegExp("^" + i[1] + "/").test(t))[].push.apply(n, a[t])
								});
								else if (a[e])[].push.apply(n, a[e])
							});
							return n
						};
					var u = function(e) {
							var t = [],
								i = [];
							if (s.typeOf(e) === "string") e = s.trim(e).split(/\s*,\s*/);
							i = r(e);
							t.push({
								title: n.translate("Files"),
								extensions: i.length ? i.join(",") : "*"
							});
							return t
						};
					var l = function(e) {
							var t = e && e.match(/\.([^.]+)$/);
							if (t) return t[1].toLowerCase();
							return ""
						};
					var c = function(e) {
							return o[l(e)] || ""
						};
					t(e);
					return {
						mimes: o,
						extensions: a,
						addMimeType: t,
						extList2mimes: i,
						mimes2exts: r,
						mimes2extList: u,
						getFileExtension: l,
						getFileMime: c
					}
				});
				e("moxie/file/FileInput", ["moxie/core/utils/Basic", "moxie/core/utils/Env", "moxie/core/utils/Mime", "moxie/core/utils/Dom", "moxie/core/Exceptions", "moxie/core/EventTarget", "moxie/core/I18n", "moxie/runtime/Runtime", "moxie/runtime/RuntimeClient"], function(s, n, r, u, o, e, l, c, f) {
					var d = ["ready", "change", "cancel", "mouseenter", "mouseleave", "mousedown", "mouseup"];

					function t(a) {
						if (MXI_DEBUG) n.log("Instantiating FileInput...");
						var e, t, i;
						if (s.inArray(s.typeOf(a), ["string", "node"]) !== -1) a = {
							browse_button: a
						};
						t = u.get(a.browse_button);
						if (!t) throw new o.DOMException(o.DOMException.NOT_FOUND_ERR);
						i = {
							accept: [{
								title: l.translate("All Files"),
								extensions: "*"
							}],
							multiple: false,
							required_caps: false,
							container: t.parentNode || document.body
						};
						a = s.extend({}, i, a);
						if (typeof a.required_caps === "string") a.required_caps = c.parseCaps(a.required_caps);
						if (typeof a.accept === "string") a.accept = r.mimes2extList(a.accept);
						e = u.get(a.container);
						if (!e) e = document.body;
						if (u.getStyle(e, "position") === "static") e.style.position = "relative";
						e = t = null;
						f.call(this);
						s.extend(this, {
							uid: s.guid("uid_"),
							ruid: null,
							shimid: null,
							files: null,
							init: function() {
								var t = this;
								t.bind("RuntimeInit", function(e, o) {
									t.ruid = o.uid;
									t.shimid = o.shimid;
									t.bind("Ready", function() {
										t.trigger("Refresh")
									}, 999);
									t.bind("Refresh", function() {
										var e, t, i, n, r;
										i = u.get(a.browse_button);
										n = u.get(o.shimid);
										if (i) {
											e = u.getPos(i, u.get(a.container));
											t = u.getSize(i);
											r = parseInt(u.getStyle(i, "z-index"), 10) || 0;
											if (n) s.extend(n.style, {
												top: e.y + "px",
												left: e.x + "px",
												width: t.w + "px",
												height: t.h + "px",
												zIndex: r + 1
											})
										}
										n = i = null
									});
									o.exec.call(t, "FileInput", "init", a)
								});
								t.connectRuntime(s.extend({}, a, {
									required_caps: {
										select_file: true
									}
								}))
							},
							getOption: function(e) {
								return a[e]
							},
							setOption: function(e, t) {
								if (!a.hasOwnProperty(e)) return;
								var i = a[e];
								switch (e) {
								case "accept":
									if (typeof t === "string") t = r.mimes2extList(t);
									break;
								case "container":
								case "required_caps":
									throw new o.FileException(o.FileException.NO_MODIFICATION_ALLOWED_ERR)
								}
								a[e] = t;
								this.exec("FileInput", "setOption", e, t);
								this.trigger("OptionChanged", e, t, i)
							},
							disable: function(e) {
								var t = this.getRuntime();
								if (t) this.exec("FileInput", "disable", s.typeOf(e) === "undefined" ? true : e)
							},
							refresh: function() {
								this.trigger("Refresh")
							},
							destroy: function() {
								var e = this.getRuntime();
								if (e) {
									e.exec.call(this, "FileInput", "destroy");
									this.disconnectRuntime()
								}
								if (s.typeOf(this.files) === "array") s.each(this.files, function(e) {
									e.destroy()
								});
								this.files = null;
								this.unbindAll()
							}
						});
						this.handleEventProps(d)
					}
					t.prototype = e.instance;
					return t
				});
				e("moxie/file/File", ["moxie/core/utils/Basic", "moxie/core/utils/Mime", "moxie/file/Blob"], function(r, o, a) {
					function e(e, t) {
						if (!t) t = {};
						a.apply(this, arguments);
						if (!this.type) this.type = o.getFileMime(t.name);
						var i;
						if (t.name) {
							i = t.name.replace(/\\/g, "/");
							i = i.substr(i.lastIndexOf("/") + 1)
						} else if (this.type) {
							var n = this.type.split("/")[0];
							i = r.guid((n !== "" ? n : "file") + "_");
							if (o.extensions[this.type]) i += "." + o.extensions[this.type][0]
						}
						r.extend(this, {
							name: i || r.guid("file_"),
							relativePath: "",
							lastModifiedDate: t.lastModifiedDate || (new Date).toLocaleString()
						})
					}
					e.prototype = a.prototype;
					return e
				});
				e("moxie/file/FileDrop", ["moxie/core/I18n", "moxie/core/utils/Dom", "moxie/core/Exceptions", "moxie/core/utils/Basic", "moxie/core/utils/Env", "moxie/file/File", "moxie/runtime/RuntimeClient", "moxie/core/EventTarget", "moxie/core/utils/Mime"], function(t, r, e, o, a, i, s, n, u) {
					var l = ["ready", "dragenter", "dragleave", "drop", "error"];

					function c(i) {
						if (MXI_DEBUG) a.log("Instantiating FileDrop...");
						var n = this,
							e;
						if (typeof i === "string") i = {
							drop_zone: i
						};
						e = {
							accept: [{
								title: t.translate("All Files"),
								extensions: "*"
							}],
							required_caps: {
								drag_and_drop: true
							}
						};
						i = typeof i === "object" ? o.extend({}, e, i) : e;
						i.container = r.get(i.drop_zone) || document.body;
						if (r.getStyle(i.container, "position") === "static") i.container.style.position = "relative";
						if (typeof i.accept === "string") i.accept = u.mimes2extList(i.accept);
						s.call(n);
						o.extend(n, {
							uid: o.guid("uid_"),
							ruid: null,
							files: null,
							init: function() {
								n.bind("RuntimeInit", function(e, t) {
									n.ruid = t.uid;
									t.exec.call(n, "FileDrop", "init", i);
									n.dispatchEvent("ready")
								});
								n.connectRuntime(i)
							},
							destroy: function() {
								var e = this.getRuntime();
								if (e) {
									e.exec.call(this, "FileDrop", "destroy");
									this.disconnectRuntime()
								}
								this.files = null;
								this.unbindAll()
							}
						});
						this.handleEventProps(l)
					}
					c.prototype = n.instance;
					return c
				});
				e("moxie/file/FileReader", ["moxie/core/utils/Basic", "moxie/core/utils/Encode", "moxie/core/Exceptions", "moxie/core/EventTarget", "moxie/file/Blob", "moxie/runtime/RuntimeClient"], function(e, r, o, t, a, i) {
					var n = ["loadstart", "progress", "load", "abort", "error", "loadend"];

					function s() {
						i.call(this);
						e.extend(this, {
							uid: e.guid("uid_"),
							readyState: s.EMPTY,
							result: null,
							error: null,
							readAsBinaryString: function(e) {
								t.call(this, "readAsBinaryString", e)
							},
							readAsDataURL: function(e) {
								t.call(this, "readAsDataURL", e)
							},
							readAsText: function(e) {
								t.call(this, "readAsText", e)
							},
							abort: function() {
								this.result = null;
								if (e.inArray(this.readyState, [s.EMPTY, s.DONE]) !== -1) return;
								else if (this.readyState === s.LOADING) this.readyState = s.DONE;
								this.exec("FileReader", "abort");
								this.trigger("abort");
								this.trigger("loadend")
							},
							destroy: function() {
								this.abort();
								this.exec("FileReader", "destroy");
								this.disconnectRuntime();
								this.unbindAll()
							}
						});
						this.handleEventProps(n);
						this.bind("Error", function(e, t) {
							this.readyState = s.DONE;
							this.error = t
						}, 999);
						this.bind("Load", function(e) {
							this.readyState = s.DONE
						}, 999);

						function t(e, t) {
							var i = this;
							this.trigger("loadstart");
							if (this.readyState === s.LOADING) {
								this.trigger("error", new o.DOMException(o.DOMException.INVALID_STATE_ERR));
								this.trigger("loadend");
								return
							}
							if (!(t instanceof a)) {
								this.trigger("error", new o.DOMException(o.DOMException.NOT_FOUND_ERR));
								this.trigger("loadend");
								return
							}
							this.result = null;
							this.readyState = s.LOADING;
							if (t.isDetached()) {
								var n = t.getSource();
								switch (e) {
								case "readAsText":
								case "readAsBinaryString":
									this.result = n;
									break;
								case "readAsDataURL":
									this.result = "data:" + t.type + ";base64," + r.btoa(n);
									break
								}
								this.readyState = s.DONE;
								this.trigger("load");
								this.trigger("loadend")
							} else {
								this.connectRuntime(t.ruid);
								this.exec("FileReader", "read", e, t)
							}
						}
					}
					s.EMPTY = 0;
					s.LOADING = 1;
					s.DONE = 2;
					s.prototype = t.instance;
					return s
				});
				e("moxie/core/utils/Url", ["moxie/core/utils/Basic"], function(f) {
					var d = function(e, t) {
							var i = ["source", "scheme", "authority", "userInfo", "user", "pass", "host", "port", "relative", "path", "directory", "file", "query", "fragment"],
								n = i.length,
								r = {
									http: 80,
									https: 443
								},
								o = {},
								a = /^(?:([^:\/?#]+):)?(?:\/\/()(?:(?:()(?:([^:@\/]*):?([^:@\/]*))?@)?(\[[\da-fA-F:]+\]|[^:\/?#]*)(?::(\d*))?))?()(?:(()(?:(?:[^?#\/]*\/)*)()(?:[^?#]*))(?:\\?([^#]*))?(?:#(.*))?)/,
								s = a.exec(e || ""),
								u, l = /^\/\/\w/.test(e);
							switch (f.typeOf(t)) {
							case "undefined":
								t = d(document.location.href, false);
								break;
							case "string":
								t = d(t, false);
								break
							}
							while (n--) if (s[n]) o[i[n]] = s[n];
							u = !l && !o.scheme;
							if (l || u) o.scheme = t.scheme;
							if (u) {
								o.host = t.host;
								o.port = t.port;
								var c = "";
								if (/^[^\/]/.test(o.path)) {
									c = t.path;
									if (/\/[^\/]*\.[^\/]*$/.test(c)) c = c.replace(/\/[^\/]+$/, "/");
									else c = c.replace(/\/?$/, "/")
								}
								o.path = c + (o.path || "")
							}
							if (!o.port) o.port = r[o.scheme] || 80;
							o.port = parseInt(o.port, 10);
							if (!o.path) o.path = "/";
							delete o.source;
							return o
						};
					var e = function(e) {
							var t = {
								http: 80,
								https: 443
							},
								i = typeof e === "object" ? e : d(e);
							return i.scheme + "://" + i.host + (i.port !== t[i.scheme] ? ":" + i.port : "") + i.path + (i.query ? i.query : "")
						};
					var t = function(e) {
							function t(e) {
								return [e.scheme, e.host, e.port].join("/")
							}
							if (typeof e === "string") e = d(e);
							return t(d()) === t(e)
						};
					return {
						parseUrl: d,
						resolveUrl: e,
						hasSameOrigin: t
					}
				});
				e("moxie/runtime/RuntimeTarget", ["moxie/core/utils/Basic", "moxie/runtime/RuntimeClient", "moxie/core/EventTarget"], function(e, t, i) {
					function n() {
						this.uid = e.guid("uid_");
						t.call(this);
						this.destroy = function() {
							this.disconnectRuntime();
							this.unbindAll()
						}
					}
					n.prototype = i.instance;
					return n
				});
				e("moxie/file/FileReaderSync", ["moxie/core/utils/Basic", "moxie/runtime/RuntimeClient", "moxie/core/utils/Encode"], function(e, i, s) {
					return function() {
						i.call(this);
						e.extend(this, {
							uid: e.guid("uid_"),
							readAsBinaryString: function(e) {
								return t.call(this, "readAsBinaryString", e)
							},
							readAsDataURL: function(e) {
								return t.call(this, "readAsDataURL", e)
							},
							readAsText: function(e) {
								return t.call(this, "readAsText", e)
							}
						});

						function t(e, t) {
							if (t.isDetached()) {
								var i = t.getSource();
								switch (e) {
								case "readAsBinaryString":
									return i;
								case "readAsDataURL":
									return "data:" + t.type + ";base64," + s.btoa(i);
								case "readAsText":
									var n = "";
									for (var r = 0, o = i.length; r < o; r++) n += String.fromCharCode(i[r]);
									return n
								}
							} else {
								var a = this.connectRuntime(t.ruid).exec.call(this, "FileReaderSync", "read", e, t);
								this.disconnectRuntime();
								return a
							}
						}
					}
				});
				e("moxie/xhr/FormData", ["moxie/core/Exceptions", "moxie/core/utils/Basic", "moxie/file/Blob"], function(e, a, s) {
					function t() {
						var r, o = [];
						a.extend(this, {
							append: function(i, e) {
								var n = this,
									t = a.typeOf(e);
								if (e instanceof s) r = {
									name: i,
									value: e
								};
								else if ("array" === t) {
									i += "[]";
									a.each(e, function(e) {
										n.append(i, e)
									})
								} else if ("object" === t) a.each(e, function(e, t) {
									n.append(i + "[" + t + "]", e)
								});
								else if ("null" === t || "undefined" === t || "number" === t && isNaN(e)) n.append(i, "false");
								else o.push({
									name: i,
									value: e.toString()
								})
							},
							hasBlob: function() {
								return !!this.getBlob()
							},
							getBlob: function() {
								return r && r.value || null
							},
							getBlobName: function() {
								return r && r.name || null
							},
							each: function(t) {
								a.each(o, function(e) {
									t(e.value, e.name)
								});
								if (r) t(r.value, r.name)
							},
							destroy: function() {
								r = null;
								o = []
							}
						})
					}
					return t
				});
				e("moxie/xhr/XMLHttpRequest", ["moxie/core/utils/Basic", "moxie/core/Exceptions", "moxie/core/EventTarget", "moxie/core/utils/Encode", "moxie/core/utils/Url", "moxie/runtime/Runtime", "moxie/runtime/RuntimeTarget", "moxie/file/Blob", "moxie/file/FileReaderSync", "moxie/xhr/FormData", "moxie/core/utils/Env", "moxie/core/utils/Mime"], function(T, S, e, O, D, N, C, L, t, M, F, B) {
					var P = {
						100: "Continue",
						101: "Switching Protocols",
						102: "Processing",
						200: "OK",
						201: "Created",
						202: "Accepted",
						203: "Non-Authoritative Information",
						204: "No Content",
						205: "Reset Content",
						206: "Partial Content",
						207: "Multi-Status",
						226: "IM Used",
						300: "Multiple Choices",
						301: "Moved Permanently",
						302: "Found",
						303: "See Other",
						304: "Not Modified",
						305: "Use Proxy",
						306: "Reserved",
						307: "Temporary Redirect",
						400: "Bad Request",
						401: "Unauthorized",
						402: "Payment Required",
						403: "Forbidden",
						404: "Not Found",
						405: "Method Not Allowed",
						406: "Not Acceptable",
						407: "Proxy Authentication Required",
						408: "Request Timeout",
						409: "Conflict",
						410: "Gone",
						411: "Length Required",
						412: "Precondition Failed",
						413: "Request Entity Too Large",
						414: "Request-URI Too Long",
						415: "Unsupported Media Type",
						416: "Requested Range Not Satisfiable",
						417: "Expectation Failed",
						422: "Unprocessable Entity",
						423: "Locked",
						424: "Failed Dependency",
						426: "Upgrade Required",
						500: "Internal Server Error",
						501: "Not Implemented",
						502: "Bad Gateway",
						503: "Service Unavailable",
						504: "Gateway Timeout",
						505: "HTTP Version Not Supported",
						506: "Variant Also Negotiates",
						507: "Insufficient Storage",
						510: "Not Extended"
					};

					function H() {
						this.uid = T.guid("uid_")
					}
					H.prototype = e.instance;
					var U = ["loadstart", "progress", "abort", "error", "load", "timeout", "loadend"];
					var i = 1,
						n = 2;

					function k() {
						var i = this,
							n = {
								timeout: 0,
								readyState: k.UNSENT,
								withCredentials: false,
								status: 0,
								statusText: "",
								responseType: "",
								responseXML: null,
								responseText: null,
								response: null
							},
							a = true,
							s, u, l = {},
							c, f, o = null,
							d = null,
							m = false,
							h = false,
							p = false,
							g = false,
							v = false,
							x = false,
							t, e, r = null,
							w = null,
							y = {},
							E, b = "",
							_;
						T.extend(this, n, {
							uid: T.guid("uid_"),
							upload: new H,
							open: function(e, t, i, n, r) {
								var o;
								if (!e || !t) throw new S.DOMException(S.DOMException.SYNTAX_ERR);
								if (/[\u0100-\uffff]/.test(e) || O.utf8_encode(e) !== e) throw new S.DOMException(S.DOMException.SYNTAX_ERR);
								if ( !! ~T.inArray(e.toUpperCase(), ["CONNECT", "DELETE", "GET", "HEAD", "OPTIONS", "POST", "PUT", "TRACE", "TRACK"])) u = e.toUpperCase();
								if ( !! ~T.inArray(u, ["CONNECT", "TRACE", "TRACK"])) throw new S.DOMException(S.DOMException.SECURITY_ERR);
								t = O.utf8_encode(t);
								o = D.parseUrl(t);
								x = D.hasSameOrigin(o);
								s = D.resolveUrl(t);
								if ((n || r) && !x) throw new S.DOMException(S.DOMException.INVALID_ACCESS_ERR);
								c = n || o.user;
								f = r || o.pass;
								a = i || true;
								if (a === false && (R("timeout") || R("withCredentials") || R("responseType") !== "")) throw new S.DOMException(S.DOMException.INVALID_ACCESS_ERR);
								m = !a;
								h = false;
								l = {};
								A.call(this);
								R("readyState", k.OPENED);
								this.dispatchEvent("readystatechange")
							},
							setRequestHeader: function(e, t) {
								var i = ["accept-charset", "accept-encoding", "access-control-request-headers", "access-control-request-method", "connection", "content-length", "cookie", "cookie2", "content-transfer-encoding", "date", "expect", "host", "keep-alive", "origin", "referer", "te", "trailer", "transfer-encoding", "upgrade", "user-agent", "via"];
								if (R("readyState") !== k.OPENED || h) throw new S.DOMException(S.DOMException.INVALID_STATE_ERR);
								if (/[\u0100-\uffff]/.test(e) || O.utf8_encode(e) !== e) throw new S.DOMException(S.DOMException.SYNTAX_ERR);
								e = T.trim(e).toLowerCase();
								if ( !! ~T.inArray(e, i) || /^(proxy\-|sec\-)/.test(e)) return false;
								if (!l[e]) l[e] = t;
								else l[e] += ", " + t;
								return true
							},
							hasRequestHeader: function(e) {
								return e && l[e.toLowerCase()] || false
							},
							getAllResponseHeaders: function() {
								return b || ""
							},
							getResponseHeader: function(e) {
								e = e.toLowerCase();
								if (v || !! ~T.inArray(e, ["set-cookie", "set-cookie2"])) return null;
								if (b && b !== "") {
									if (!_) {
										_ = {};
										T.each(b.split(/\r\n/), function(e) {
											var t = e.split(/:\s+/);
											if (t.length === 2) {
												t[0] = T.trim(t[0]);
												_[t[0].toLowerCase()] = {
													header: t[0],
													value: T.trim(t[1])
												}
											}
										})
									}
									if (_.hasOwnProperty(e)) return _[e].header + ": " + _[e].value
								}
								return null
							},
							overrideMimeType: function(e) {
								var t, i;
								if ( !! ~T.inArray(R("readyState"), [k.LOADING, k.DONE])) throw new S.DOMException(S.DOMException.INVALID_STATE_ERR);
								e = T.trim(e.toLowerCase());
								if (/;/.test(e) && (t = e.match(/^([^;]+)(?:;\scharset\=)?(.*)$/))) {
									e = t[1];
									if (t[2]) i = t[2]
								}
								if (!B.mimes[e]) throw new S.DOMException(S.DOMException.SYNTAX_ERR);
								r = e;
								w = i
							},
							send: function(e, t) {
								if (T.typeOf(t) === "string") y = {
									ruid: t
								};
								else if (!t) y = {};
								else y = t;
								if (this.readyState !== k.OPENED || h) throw new S.DOMException(S.DOMException.INVALID_STATE_ERR);
								if (e instanceof L) {
									y.ruid = e.ruid;
									d = e.type || "application/octet-stream"
								} else if (e instanceof M) {
									if (e.hasBlob()) {
										var i = e.getBlob();
										y.ruid = i.ruid;
										d = i.type || "application/octet-stream"
									}
								} else if (typeof e === "string") {
									o = "UTF-8";
									d = "text/plain;charset=UTF-8";
									e = O.utf8_encode(e)
								}
								if (!this.withCredentials) this.withCredentials = y.required_caps && y.required_caps.send_browser_cookies && !x;
								p = !m && this.upload.hasEventListener();
								v = false;
								g = !e;
								if (!m) h = true;
								I.call(this, e)
							},
							abort: function() {
								v = true;
								m = false;
								if (!~T.inArray(R("readyState"), [k.UNSENT, k.OPENED, k.DONE])) {
									R("readyState", k.DONE);
									h = false;
									if (E) E.getRuntime().exec.call(E, "XMLHttpRequest", "abort", g);
									else throw new S.DOMException(S.DOMException.INVALID_STATE_ERR);
									g = true
								} else R("readyState", k.UNSENT)
							},
							destroy: function() {
								if (E) {
									if (T.typeOf(E.destroy) === "function") E.destroy();
									E = null
								}
								this.unbindAll();
								if (this.upload) {
									this.upload.unbindAll();
									this.upload = null
								}
							}
						});
						this.handleEventProps(U.concat(["readystatechange"]));
						this.upload.handleEventProps(U);

						function R(e, t) {
							if (!n.hasOwnProperty(e)) return;
							if (arguments.length === 1) return F.can("define_property") ? n[e] : i[e];
							else if (F.can("define_property")) n[e] = t;
							else i[e] = t
						}
						function I(e) {
							var i = this;
							t = (new Date).getTime();
							E = new C;

							function n() {
								if (E) {
									E.destroy();
									E = null
								}
								i.dispatchEvent("loadend");
								i = null
							}
							function r(t) {
								E.bind("LoadStart", function(e) {
									R("readyState", k.LOADING);
									i.dispatchEvent("readystatechange");
									i.dispatchEvent(e);
									if (p) i.upload.dispatchEvent(e)
								});
								E.bind("Progress", function(e) {
									if (R("readyState") !== k.LOADING) {
										R("readyState", k.LOADING);
										i.dispatchEvent("readystatechange")
									}
									i.dispatchEvent(e)
								});
								E.bind("UploadProgress", function(e) {
									if (p) i.upload.dispatchEvent({
										type: "progress",
										lengthComputable: false,
										total: e.total,
										loaded: e.loaded
									})
								});
								E.bind("Load", function(e) {
									R("readyState", k.DONE);
									R("status", Number(t.exec.call(E, "XMLHttpRequest", "getStatus") || 0));
									R("statusText", P[R("status")] || "");
									R("response", t.exec.call(E, "XMLHttpRequest", "getResponse", R("responseType")));
									if ( !! ~T.inArray(R("responseType"), ["text", ""])) R("responseText", R("response"));
									else if (R("responseType") === "document") R("responseXML", R("response"));
									b = t.exec.call(E, "XMLHttpRequest", "getAllResponseHeaders");
									i.dispatchEvent("readystatechange");
									if (R("status") > 0) {
										if (p) i.upload.dispatchEvent(e);
										i.dispatchEvent(e)
									} else {
										v = true;
										i.dispatchEvent("error")
									}
									n()
								});
								E.bind("Abort", function(e) {
									i.dispatchEvent(e);
									n()
								});
								E.bind("Error", function(e) {
									v = true;
									R("readyState", k.DONE);
									i.dispatchEvent("readystatechange");
									g = true;
									i.dispatchEvent(e);
									n()
								});
								t.exec.call(E, "XMLHttpRequest", "send", {
									url: s,
									method: u,
									async: a,
									user: c,
									password: f,
									headers: l,
									mimeType: d,
									encoding: o,
									responseType: i.responseType,
									withCredentials: i.withCredentials,
									options: y
								}, e)
							}
							if (typeof y.required_caps === "string") y.required_caps = N.parseCaps(y.required_caps);
							y.required_caps = T.extend({}, y.required_caps, {
								return_response_type: i.responseType
							});
							if (e instanceof M) y.required_caps.send_multipart = true;
							if (!T.isEmptyObj(l)) y.required_caps.send_custom_headers = true;
							if (!x) y.required_caps.do_cors = true;
							if (y.ruid) r(E.connectRuntime(y));
							else {
								E.bind("RuntimeInit", function(e, t) {
									r(t)
								});
								E.bind("RuntimeError", function(e, t) {
									i.dispatchEvent("RuntimeError", t)
								});
								E.connectRuntime(y)
							}
						}
						function A() {
							R("responseText", "");
							R("responseXML", null);
							R("response", null);
							R("status", 0);
							R("statusText", "");
							t = e = null
						}
					}
					k.UNSENT = 0;
					k.OPENED = 1;
					k.HEADERS_RECEIVED = 2;
					k.LOADING = 3;
					k.DONE = 4;
					k.prototype = e.instance;
					return k
				});
				e("moxie/runtime/Transporter", ["moxie/core/utils/Basic", "moxie/core/utils/Encode", "moxie/runtime/RuntimeClient", "moxie/core/EventTarget"], function(d, m, e, t) {
					function h() {
						var o, n, a, s, r, u;
						e.call(this);
						d.extend(this, {
							uid: d.guid("uid_"),
							state: h.IDLE,
							result: null,
							transport: function(e, i, t) {
								var n = this;
								t = d.extend({
									chunk_size: 204798
								}, t);
								if (o = t.chunk_size % 3) t.chunk_size += 3 - o;
								u = t.chunk_size;
								l.call(this);
								a = e;
								s = e.length;
								if (d.typeOf(t) === "string" || t.ruid) c.call(n, i, this.connectRuntime(t));
								else {
									var r = function(e, t) {
											n.unbind("RuntimeInit", r);
											c.call(n, i, t)
										};
									this.bind("RuntimeInit", r);
									this.connectRuntime(t)
								}
							},
							abort: function() {
								var e = this;
								e.state = h.IDLE;
								if (n) {
									n.exec.call(e, "Transporter", "clear");
									e.trigger("TransportingAborted")
								}
								l.call(e)
							},
							destroy: function() {
								this.unbindAll();
								n = null;
								this.disconnectRuntime();
								l.call(this)
							}
						});

						function l() {
							s = r = 0;
							a = this.result = null
						}
						function c(e, t) {
							var i = this;
							n = t;
							i.bind("TransportingProgress", function(e) {
								r = e.loaded;
								if (r < s && d.inArray(i.state, [h.IDLE, h.DONE]) === -1) f.call(i)
							}, 999);
							i.bind("TransportingComplete", function() {
								r = s;
								i.state = h.DONE;
								a = null;
								i.result = n.exec.call(i, "Transporter", "getAsBlob", e || "")
							}, 999);
							i.state = h.BUSY;
							i.trigger("TransportingStarted");
							f.call(i)
						}
						function f() {
							var e = this,
								t, i = s - r;
							if (u > i) u = i;
							t = m.btoa(a.substr(r, u));
							n.exec.call(e, "Transporter", "receive", t, s)
						}
					}
					h.IDLE = 0;
					h.BUSY = 1;
					h.DONE = 2;
					h.prototype = t.instance;
					return h
				});
				e("moxie/image/Image", ["moxie/core/utils/Basic", "moxie/core/utils/Dom", "moxie/core/Exceptions", "moxie/file/FileReaderSync", "moxie/xhr/XMLHttpRequest", "moxie/runtime/Runtime", "moxie/runtime/RuntimeClient", "moxie/runtime/Transporter", "moxie/core/utils/Env", "moxie/core/EventTarget", "moxie/file/Blob", "moxie/file/File", "moxie/core/utils/Encode"], function(l, c, f, e, a, s, t, d, m, i, u, h, p) {
					var g = ["progress", "load", "error", "resize", "embedded"];

					function v() {
						t.call(this);
						l.extend(this, {
							uid: l.guid("uid_"),
							ruid: null,
							name: "",
							size: 0,
							width: 0,
							height: 0,
							type: "",
							meta: {},
							clone: function() {
								this.load.apply(this, arguments)
							},
							load: function() {
								i.apply(this, arguments)
							},
							resize: function(e) {
								var t = this;
								var i;
								var n;
								var r = {
									x: 0,
									y: 0,
									width: t.width,
									height: t.height
								};
								var o = l.extendIf({
									width: t.width,
									height: t.height,
									type: t.type || "image/jpeg",
									quality: 90,
									crop: false,
									fit: true,
									preserveHeaders: true,
									resample: "default",
									multipass: true
								}, e);
								try {
									if (!t.size) throw new f.DOMException(f.DOMException.INVALID_STATE_ERR);
									if (t.width > v.MAX_RESIZE_WIDTH || t.height > v.MAX_RESIZE_HEIGHT) throw new f.ImageError(f.ImageError.MAX_RESOLUTION_ERR);
									i = t.meta && t.meta.tiff && t.meta.tiff.Orientation || 1;
									if (l.inArray(i, [5, 6, 7, 8]) !== -1) {
										var a = o.width;
										o.width = o.height;
										o.height = a
									}
									if (o.crop) {
										n = Math.max(o.width / t.width, o.height / t.height);
										if (e.fit) {
											r.width = Math.min(Math.ceil(o.width / n), t.width);
											r.height = Math.min(Math.ceil(o.height / n), t.height);
											n = o.width / r.width
										} else {
											r.width = Math.min(o.width, t.width);
											r.height = Math.min(o.height, t.height);
											n = 1
										}
										if (typeof o.crop === "boolean") o.crop = "cc";
										switch (o.crop.toLowerCase().replace(/_/, "-")) {
										case "rb":
										case "right-bottom":
											r.x = t.width - r.width;
											r.y = t.height - r.height;
											break;
										case "cb":
										case "center-bottom":
											r.x = Math.floor((t.width - r.width) / 2);
											r.y = t.height - r.height;
											break;
										case "lb":
										case "left-bottom":
											r.x = 0;
											r.y = t.height - r.height;
											break;
										case "lt":
										case "left-top":
											r.x = 0;
											r.y = 0;
											break;
										case "ct":
										case "center-top":
											r.x = Math.floor((t.width - r.width) / 2);
											r.y = 0;
											break;
										case "rt":
										case "right-top":
											r.x = t.width - r.width;
											r.y = 0;
											break;
										case "rc":
										case "right-center":
										case "right-middle":
											r.x = t.width - r.width;
											r.y = Math.floor((t.height - r.height) / 2);
											break;
										case "lc":
										case "left-center":
										case "left-middle":
											r.x = 0;
											r.y = Math.floor((t.height - r.height) / 2);
											break;
										case "cc":
										case "center-center":
										case "center-middle":
										default:
											r.x = Math.floor((t.width - r.width) / 2);
											r.y = Math.floor((t.height - r.height) / 2)
										}
										r.x = Math.max(r.x, 0);
										r.y = Math.max(r.y, 0)
									} else {
										n = Math.min(o.width / t.width, o.height / t.height);
										if (n > 1 && !o.fit) n = 1
									}
									this.exec("Image", "resize", r, n, o)
								} catch (e) {
									t.trigger("error", e.code)
								}
							},
							downsize: function(e) {
								var t = {
									width: this.width,
									height: this.height,
									type: this.type || "image/jpeg",
									quality: 90,
									crop: false,
									fit: false,
									preserveHeaders: true,
									resample: "default"
								},
									i;
								if (typeof e === "object") i = l.extend(t, e);
								else i = l.extend(t, {
									width: arguments[0],
									height: arguments[1],
									crop: arguments[2],
									preserveHeaders: arguments[3]
								});
								this.resize(i)
							},
							crop: function(e, t, i) {
								this.downsize(e, t, true, i)
							},
							getAsCanvas: function() {
								if (!m.can("create_canvas")) throw new f.RuntimeError(f.RuntimeError.NOT_SUPPORTED_ERR);
								return this.exec("Image", "getAsCanvas")
							},
							getAsBlob: function(e, t) {
								if (!this.size) throw new f.DOMException(f.DOMException.INVALID_STATE_ERR);
								return this.exec("Image", "getAsBlob", e || "image/jpeg", t || 90)
							},
							getAsDataURL: function(e, t) {
								if (!this.size) throw new f.DOMException(f.DOMException.INVALID_STATE_ERR);
								return this.exec("Image", "getAsDataURL", e || "image/jpeg", t || 90)
							},
							getAsBinaryString: function(e, t) {
								var i = this.getAsDataURL(e, t);
								return p.atob(i.substring(i.indexOf("base64,") + 7))
							},
							embed: function(a, e) {
								var s = this,
									u;
								var t = l.extend({
									width: this.width,
									height: this.height,
									type: this.type || "image/jpeg",
									quality: 90,
									fit: true,
									resample: "nearest"
								}, e);

								function i(e, t) {
									var i = this;
									if (m.can("create_canvas")) {
										var n = i.getAsCanvas();
										if (n) {
											a.appendChild(n);
											n = null;
											i.destroy();
											s.trigger("embedded");
											return
										}
									}
									var r = i.getAsDataURL(e, t);
									if (!r) throw new f.ImageError(f.ImageError.WRONG_FORMAT);
									if (m.can("use_data_uri_of", r.length)) {
										a.innerHTML = '<img src="' + r + '" width="' + i.width + '" height="' + i.height + '" alt="" />';
										i.destroy();
										s.trigger("embedded")
									} else {
										var o = new d;
										o.bind("TransportingComplete", function() {
											u = s.connectRuntime(this.result.ruid);
											s.bind("Embedded", function() {
												l.extend(u.getShimContainer().style, {
													top: "0px",
													left: "0px",
													width: i.width + "px",
													height: i.height + "px"
												});
												u = null
											}, 999);
											u.exec.call(s, "ImageView", "display", this.result.uid, width, height);
											i.destroy()
										});
										o.transport(p.atob(r.substring(r.indexOf("base64,") + 7)), e, {
											required_caps: {
												display_media: true
											},
											runtime_order: "flash,silverlight",
											container: a
										})
									}
								}
								try {
									if (!(a = c.get(a))) throw new f.DOMException(f.DOMException.INVALID_NODE_TYPE_ERR);
									if (!this.size) throw new f.DOMException(f.DOMException.INVALID_STATE_ERR);
									if (this.width > v.MAX_RESIZE_WIDTH || this.height > v.MAX_RESIZE_HEIGHT);
									var n = new v;
									n.bind("Resize", function() {
										i.call(this, t.type, t.quality)
									});
									n.bind("Load", function() {
										this.downsize(t)
									});
									if (this.meta.thumb && this.meta.thumb.width >= t.width && this.meta.thumb.height >= t.height) n.load(this.meta.thumb.data);
									else n.clone(this, false);
									return n
								} catch (e) {
									this.trigger("error", e.code)
								}
							},
							destroy: function() {
								if (this.ruid) {
									this.getRuntime().exec.call(this, "Image", "destroy");
									this.disconnectRuntime()
								}
								if (this.meta && this.meta.thumb) this.meta.thumb.data.destroy();
								this.unbindAll()
							}
						});
						this.handleEventProps(g);
						this.bind("Load Resize", function() {
							return e.call(this)
						}, 999);

						function e(e) {
							try {
								if (!e) e = this.exec("Image", "getInfo");
								this.size = e.size;
								this.width = e.width;
								this.height = e.height;
								this.type = e.type;
								this.meta = e.meta;
								if (this.name === "") this.name = e.name;
								return true
							} catch (e) {
								this.trigger("error", e.code);
								return false
							}
						}
						function i(e) {
							var t = l.typeOf(e);
							try {
								if (e instanceof v) {
									if (!e.size) throw new f.DOMException(f.DOMException.INVALID_STATE_ERR);
									n.apply(this, arguments)
								} else if (e instanceof u) {
									if (!~l.inArray(e.type, ["image/jpeg", "image/png"])) throw new f.ImageError(f.ImageError.WRONG_FORMAT);
									r.apply(this, arguments)
								} else if (l.inArray(t, ["blob", "file"]) !== -1) i.call(this, new h(null, e), arguments[1]);
								else if (t === "string") if (e.substr(0, 5) === "data:") i.call(this, new u(null, {
									data: e
								}), arguments[1]);
								else o.apply(this, arguments);
								else if (t === "node" && e.nodeName.toLowerCase() === "img") i.call(this, e.src, arguments[1]);
								else throw new f.DOMException(f.DOMException.TYPE_MISMATCH_ERR)
							} catch (e) {
								this.trigger("error", e.code)
							}
						}
						function n(e, t) {
							var i = this.connectRuntime(e.ruid);
							this.ruid = i.uid;
							i.exec.call(this, "Image", "loadFromImage", e, l.typeOf(t) === "undefined" ? true : t)
						}
						function r(t, e) {
							var i = this;
							i.name = t.name || "";

							function n(e) {
								i.ruid = e.uid;
								e.exec.call(i, "Image", "loadFromBlob", t)
							}
							if (t.isDetached()) {
								this.bind("RuntimeInit", function(e, t) {
									n(t)
								});
								if (e && typeof e.required_caps === "string") e.required_caps = s.parseCaps(e.required_caps);
								this.connectRuntime(l.extend({
									required_caps: {
										access_image_binary: true,
										resize_image: true
									}
								}, e))
							} else n(this.connectRuntime(t.ruid))
						}
						function o(e, t) {
							var i = this,
								n;
							n = new a;
							n.open("get", e);
							n.responseType = "blob";
							n.onprogress = function(e) {
								i.trigger(e)
							};
							n.onload = function() {
								r.call(i, n.response, true)
							};
							n.onerror = function(e) {
								i.trigger(e)
							};
							n.onloadend = function() {
								n.destroy()
							};
							n.bind("RuntimeError", function(e, t) {
								i.trigger("RuntimeError", t)
							});
							n.send(null, t)
						}
					}
					v.MAX_RESIZE_WIDTH = 8192;
					v.MAX_RESIZE_HEIGHT = 8192;
					v.prototype = i.instance;
					return v
				});
				e("moxie/runtime/html5/Runtime", ["moxie/core/utils/Basic", "moxie/core/Exceptions", "moxie/runtime/Runtime", "moxie/core/utils/Env"], function(o, e, a, s) {
					var u = "html5",
						l = {};

					function t(e) {
						var t = this,
							i = a.capTest,
							n = a.capTrue;
						var r = o.extend({
							access_binary: i(window.FileReader || window.File && window.File.getAsDataURL),
							access_image_binary: function() {
								return t.can("access_binary") && !! l.Image
							},
							display_media: i((s.can("create_canvas") || s.can("use_data_uri_over32kb")) && d("moxie/image/Image")),
							do_cors: i(window.XMLHttpRequest && "withCredentials" in new XMLHttpRequest),
							drag_and_drop: i(function() {
								var e = document.createElement("div");
								return ("draggable" in e || "ondragstart" in e && "ondrop" in e) && (s.browser !== "IE" || s.verComp(s.version, 9, ">"))
							}()),
							filter_by_extension: i(function() {
								return !(s.browser === "Chrome" && s.verComp(s.version, 28, "<") || s.browser === "IE" && s.verComp(s.version, 10, "<") || s.browser === "Safari" && s.verComp(s.version, 7, "<") || s.browser === "Firefox" && s.verComp(s.version, 37, "<"))
							}()),
							return_response_headers: n,
							return_response_type: function(e) {
								if (e === "json" && !! window.JSON) return true;
								return s.can("return_response_type", e)
							},
							return_status_code: n,
							report_upload_progress: i(window.XMLHttpRequest && (new XMLHttpRequest).upload),
							resize_image: function() {
								return t.can("access_binary") && s.can("create_canvas")
							},
							select_file: function() {
								return s.can("use_fileinput") && window.File
							},
							select_folder: function() {
								return t.can("select_file") && (s.browser === "Chrome" && s.verComp(s.version, 21, ">=") || s.browser === "Firefox" && s.verComp(s.version, 42, ">="))
							},
							select_multiple: function() {
								return t.can("select_file") && !(s.browser === "Safari" && s.os === "Windows") && !(s.os === "iOS" && s.verComp(s.osVersion, "7.0.0", ">") && s.verComp(s.osVersion, "8.0.0", "<"))
							},
							send_binary_string: i(window.XMLHttpRequest && ((new XMLHttpRequest).sendAsBinary || window.Uint8Array && window.ArrayBuffer)),
							send_custom_headers: i(window.XMLHttpRequest),
							send_multipart: function() {
								return !!(window.XMLHttpRequest && (new XMLHttpRequest).upload && window.FormData) || t.can("send_binary_string")
							},
							slice_blob: i(window.File && (File.prototype.mozSlice || File.prototype.webkitSlice || File.prototype.slice)),
							stream_upload: function() {
								return t.can("slice_blob") && t.can("send_multipart")
							},
							summon_file_dialog: function() {
								return t.can("select_file") && !(s.browser === "Firefox" && s.verComp(s.version, 4, "<") || s.browser === "Opera" && s.verComp(s.version, 12, "<") || s.browser === "IE" && s.verComp(s.version, 10, "<"))
							},
							upload_filesize: n,
							use_http_method: n
						}, arguments[2]);
						a.call(this, e, arguments[1] || u, r);
						o.extend(this, {
							init: function() {
								this.trigger("Init")
							},
							destroy: function(e) {
								return function() {
									e.call(t);
									e = t = null
								}
							}(this.destroy)
						});
						o.extend(this.getShim(), l)
					}
					a.addConstructor(u, t);
					return l
				});
				e("moxie/runtime/html5/file/Blob", ["moxie/runtime/html5/Runtime", "moxie/file/Blob"], function(e, t) {
					function i() {
						function e(t, i, n) {
							var e;
							if (window.File.prototype.slice) try {
								t.slice();
								return t.slice(i, n)
							} catch (e) {
								return t.slice(i, n - i)
							} else if (e = window.File.prototype.webkitSlice || window.File.prototype.mozSlice) return e.call(t, i, n);
							else return null
						}
						this.slice = function() {
							return new t(this.getRuntime().uid, e.apply(this, arguments))
						};
						this.destroy = function() {
							this.getRuntime().getShim().removeInstance(this.uid)
						}
					}
					return e.Blob = i
				});
				e("moxie/core/utils/Events", ["moxie/core/utils/Basic"], function(a) {
					var s = {},
						u = "moxie_" + a.guid();

					function l() {
						this.returnValue = false
					}
					function c() {
						this.cancelBubble = true
					}
					var e = function(e, t, i, n) {
							var r, o;
							t = t.toLowerCase();
							if (e.addEventListener) {
								r = i;
								e.addEventListener(t, r, false)
							} else if (e.attachEvent) {
								r = function() {
									var e = window.event;
									if (!e.target) e.target = e.srcElement;
									e.preventDefault = l;
									e.stopPropagation = c;
									i(e)
								};
								e.attachEvent("on" + t, r)
							}
							if (!e[u]) e[u] = a.guid();
							if (!s.hasOwnProperty(e[u])) s[e[u]] = {};
							o = s[e[u]];
							if (!o.hasOwnProperty(t)) o[t] = [];
							o[t].push({
								func: r,
								orig: i,
								key: n
							})
						};
					var r = function(t, e, i) {
							var n, r;
							e = e.toLowerCase();
							if (t[u] && s[t[u]] && s[t[u]][e]) n = s[t[u]][e];
							else return;
							for (var o = n.length - 1; o >= 0; o--) if (n[o].orig === i || n[o].key === i) {
								if (t.removeEventListener) t.removeEventListener(e, n[o].func, false);
								else if (t.detachEvent) t.detachEvent("on" + e, n[o].func);
								n[o].orig = null;
								n[o].func = null;
								n.splice(o, 1);
								if (i !== r) break
							}
							if (!n.length) delete s[t[u]][e];
							if (a.isEmptyObj(s[t[u]])) {
								delete s[t[u]];
								try {
									delete t[u]
								} catch (e) {
									t[u] = r
								}
							}
						};
					var t = function(i, n) {
							if (!i || !i[u]) return;
							a.each(s[i[u]], function(e, t) {
								r(i, t, n)
							})
						};
					return {
						addEvent: e,
						removeEvent: r,
						removeAllEvents: t
					}
				});
				e("moxie/runtime/html5/file/FileInput", ["moxie/runtime/html5/Runtime", "moxie/file/File", "moxie/core/utils/Basic", "moxie/core/utils/Dom", "moxie/core/utils/Events", "moxie/core/utils/Mime", "moxie/core/utils/Env"], function(e, f, d, m, h, p, g) {
					function t() {
						var l, c;
						d.extend(this, {
							init: function(e) {
								var i = this,
									n = i.getRuntime(),
									t, r, o, a, s, u;
								l = e;
								o = p.extList2mimes(l.accept, n.can("filter_by_extension"));
								r = n.getShimContainer();
								r.innerHTML = '<input id="' + n.uid + '" type="file" style="font-size:999px;opacity:0;"' + (l.multiple && n.can("select_multiple") ? "multiple" : "") + (l.directory && n.can("select_folder") ? "webkitdirectory directory" : "") + (o ? ' accept="' + o.join(",") + '"' : "") + " />";
								t = m.get(n.uid);
								d.extend(t.style, {
									position: "absolute",
									top: 0,
									left: 0,
									width: "100%",
									height: "100%"
								});
								a = m.get(l.browse_button);
								c = m.getStyle(a, "z-index") || "auto";
								if (n.can("summon_file_dialog")) {
									if (m.getStyle(a, "position") === "static") a.style.position = "relative";
									h.addEvent(a, "click", function(e) {
										var t = m.get(n.uid);
										if (t && !t.disabled) t.click();
										e.preventDefault()
									}, i.uid);
									i.bind("Refresh", function() {
										s = parseInt(c, 10) || 1;
										m.get(l.browse_button).style.zIndex = s;
										this.getRuntime().getShimContainer().style.zIndex = s - 1
									})
								}
								u = n.can("summon_file_dialog") ? a : r;
								h.addEvent(u, "mouseover", function() {
									i.trigger("mouseenter")
								}, i.uid);
								h.addEvent(u, "mouseout", function() {
									i.trigger("mouseleave")
								}, i.uid);
								h.addEvent(u, "mousedown", function() {
									i.trigger("mousedown")
								}, i.uid);
								h.addEvent(m.get(l.container), "mouseup", function() {
									i.trigger("mouseup")
								}, i.uid);
								(n.can("summon_file_dialog") ? t : a).setAttribute("tabindex", -1);
								t.onchange = function e() {
									i.files = [];
									d.each(this.files, function(e) {
										var t = "";
										if (l.directory) if (e.name == ".") return true;
										if (e.webkitRelativePath) t = "/" + e.webkitRelativePath.replace(/^\//, "");
										e = new f(n.uid, e);
										e.relativePath = t;
										i.files.push(e)
									});
									if (g.browser !== "IE" && g.browser !== "IEMobile") this.value = "";
									else {
										var t = this.cloneNode(true);
										this.parentNode.replaceChild(t, this);
										t.onchange = e
									}
									if (i.files.length) i.trigger("change")
								};
								i.trigger({
									type: "ready",
									async: true
								});
								r = null
							},
							setOption: function(e, t) {
								var i = this.getRuntime();
								var n = m.get(i.uid);
								switch (e) {
								case "accept":
									if (t) {
										var r = t.mimes || p.extList2mimes(t, i.can("filter_by_extension"));
										n.setAttribute("accept", r.join(","))
									} else n.removeAttribute("accept");
									break;
								case "directory":
									if (t && i.can("select_folder")) {
										n.setAttribute("directory", "");
										n.setAttribute("webkitdirectory", "")
									} else {
										n.removeAttribute("directory");
										n.removeAttribute("webkitdirectory")
									}
									break;
								case "multiple":
									if (t && i.can("select_multiple")) n.setAttribute("multiple", "");
									else n.removeAttribute("multiple")
								}
							},
							disable: function(e) {
								var t = this.getRuntime(),
									i;
								if (i = m.get(t.uid)) i.disabled = !! e
							},
							destroy: function() {
								var e = this.getRuntime(),
									t = e.getShim(),
									i = e.getShimContainer(),
									n = l && m.get(l.container),
									r = l && m.get(l.browse_button);
								if (n) h.removeAllEvents(n, this.uid);
								if (r) {
									h.removeAllEvents(r, this.uid);
									r.style.zIndex = c
								}
								if (i) {
									h.removeAllEvents(i, this.uid);
									i.innerHTML = ""
								}
								t.removeInstance(this.uid);
								l = i = n = r = t = null
							}
						})
					}
					return e.FileInput = t
				});
				e("moxie/runtime/html5/file/FileDrop", ["moxie/runtime/html5/Runtime", "moxie/file/File", "moxie/core/utils/Basic", "moxie/core/utils/Dom", "moxie/core/utils/Events", "moxie/core/utils/Mime"], function(e, h, p, t, g, i) {
					function n() {
						var n = [],
							r = [],
							o, a;
						p.extend(this, {
							init: function(e) {
								var t = this,
									i;
								o = e;
								a = t.ruid;
								r = l(o.accept);
								i = o.container;
								g.addEvent(i, "dragover", function(e) {
									if (!s(e)) return;
									e.preventDefault();
									e.dataTransfer.dropEffect = "copy"
								}, t.uid);
								g.addEvent(i, "drop", function(e) {
									if (!s(e)) return;
									e.preventDefault();
									n = [];
									if (e.dataTransfer.items && e.dataTransfer.items[0].webkitGetAsEntry) f(e.dataTransfer.items, function() {
										t.files = n;
										t.trigger("drop")
									});
									else {
										p.each(e.dataTransfer.files, function(e) {
											u(e)
										});
										t.files = n;
										t.trigger("drop")
									}
								}, t.uid);
								g.addEvent(i, "dragenter", function(e) {
									t.trigger("dragenter")
								}, t.uid);
								g.addEvent(i, "dragleave", function(e) {
									t.trigger("dragleave")
								}, t.uid)
							},
							destroy: function() {
								g.removeAllEvents(o && t.get(o.container), this.uid);
								a = n = r = o = null;
								this.getRuntime().getShim().removeInstance(this.uid)
							}
						});

						function s(e) {
							if (!e.dataTransfer || !e.dataTransfer.types) return false;
							var t = p.toArray(e.dataTransfer.types || []);
							return p.inArray("Files", t) !== -1 || p.inArray("public.file-url", t) !== -1 || p.inArray("application/x-moz-file", t) !== -1
						}
						function u(e, t) {
							if (c(e)) {
								var i = new h(a, e);
								i.relativePath = t || "";
								n.push(i)
							}
						}
						function l(e) {
							var t = [];
							for (var i = 0; i < e.length; i++)[].push.apply(t, e[i].extensions.split(/\s*,\s*/));
							return p.inArray("*", t) === -1 ? t : []
						}
						function c(e) {
							if (!r.length) return true;
							var t = i.getFileExtension(e.name);
							return !t || p.inArray(t, r) !== -1
						}
						function f(e, t) {
							var i = [];
							p.each(e, function(e) {
								var t = e.webkitGetAsEntry();
								if (t) if (t.isFile) u(e.getAsFile(), t.fullPath);
								else i.push(t)
							});
							if (i.length) d(i, t);
							else t()
						}
						function d(e, t) {
							var i = [];
							p.each(e, function(t) {
								i.push(function(e) {
									m(t, e)
								})
							});
							p.inSeries(i, function() {
								t()
							})
						}
						function m(t, i) {
							if (t.isFile) t.file(function(e) {
								u(e, t.fullPath);
								i()
							}, function() {
								i()
							});
							else if (t.isDirectory) e(t, i);
							else i()
						}
						function e(e, t) {
							var i = [],
								n = e.createReader();

							function r(t) {
								n.readEntries(function(e) {
									if (e.length) {
										[].push.apply(i, e);
										r(t)
									} else t()
								}, t)
							}
							r(function() {
								d(i, t)
							})
						}
					}
					return e.FileDrop = n
				});
				e("moxie/runtime/html5/file/FileReader", ["moxie/runtime/html5/Runtime", "moxie/core/utils/Encode", "moxie/core/utils/Basic"], function(e, t, a) {
					function i() {
						var n, r = false;
						a.extend(this, {
							read: function(e, t) {
								var i = this;
								i.result = "";
								n = new window.FileReader;
								n.addEventListener("progress", function(e) {
									i.trigger(e)
								});
								n.addEventListener("load", function(e) {
									i.result = r ? o(n.result) : n.result;
									i.trigger(e)
								});
								n.addEventListener("error", function(e) {
									i.trigger(e, n.error)
								});
								n.addEventListener("loadend", function(e) {
									n = null;
									i.trigger(e)
								});
								if (a.typeOf(n[e]) === "function") {
									r = false;
									n[e](t.getSource())
								} else if (e === "readAsBinaryString") {
									r = true;
									n.readAsDataURL(t.getSource())
								}
							},
							abort: function() {
								if (n) n.abort()
							},
							destroy: function() {
								n = null;
								this.getRuntime().getShim().removeInstance(this.uid)
							}
						});

						function o(e) {
							return t.atob(e.substring(e.indexOf("base64,") + 7))
						}
					}
					return e.FileReader = i
				});
				e("moxie/runtime/html5/xhr/XMLHttpRequest", ["moxie/runtime/html5/Runtime", "moxie/core/utils/Basic", "moxie/core/utils/Mime", "moxie/core/utils/Url", "moxie/file/File", "moxie/file/Blob", "moxie/xhr/FormData", "moxie/core/Exceptions", "moxie/core/utils/Env"], function(e, d, m, h, p, g, v, x, w) {
					function t() {
						var o = this,
							s, u;
						d.extend(this, {
							send: function(n, i) {
								var r = this,
									e = w.browser === "Mozilla" && w.verComp(w.version, 4, ">=") && w.verComp(w.version, 7, "<"),
									t = w.browser === "Android Browser",
									o = false;
								u = n.url.replace(/^.+?\/([\w\-\.]+)$/, "$1").toLowerCase();
								s = c();
								s.open(n.method, n.url, n.async, n.user, n.password);
								if (i instanceof g) {
									if (i.isDetached()) o = true;
									i = i.getSource()
								} else if (i instanceof v) {
									if (i.hasBlob()) if (i.getBlob().isDetached()) {
										i = f.call(r, i);
										o = true
									} else if ((e || t) && d.typeOf(i.getBlob().getSource()) === "blob" && window.FileReader) {
										l.call(r, n, i);
										return
									}
									if (i instanceof v) {
										var a = new window.FormData;
										i.each(function(e, t) {
											if (e instanceof g) a.append(t, e.getSource());
											else a.append(t, e)
										});
										i = a
									}
								}
								if (s.upload) {
									if (n.withCredentials) s.withCredentials = true;
									s.addEventListener("load", function(e) {
										r.trigger(e)
									});
									s.addEventListener("error", function(e) {
										r.trigger(e)
									});
									s.addEventListener("progress", function(e) {
										r.trigger(e)
									});
									s.upload.addEventListener("progress", function(e) {
										r.trigger({
											type: "UploadProgress",
											loaded: e.loaded,
											total: e.total
										})
									})
								} else s.onreadystatechange = function e() {
									switch (s.readyState) {
									case 1:
										break;
									case 2:
										break;
									case 3:
										var t, i;
										try {
											if (h.hasSameOrigin(n.url)) t = s.getResponseHeader("Content-Length") || 0;
											if (s.responseText) i = s.responseText.length
										} catch (e) {
											t = i = 0
										}
										r.trigger({
											type: "progress",
											lengthComputable: !! t,
											total: parseInt(t, 10),
											loaded: i
										});
										break;
									case 4:
										s.onreadystatechange = function() {};
										try {
											if (s.status >= 200 && s.status < 400) {
												r.trigger("load");
												break
											}
										} catch (e) {}
										r.trigger("error");
										break
									}
								};
								if (!d.isEmptyObj(n.headers)) d.each(n.headers, function(e, t) {
									s.setRequestHeader(t, e)
								});
								if ("" !== n.responseType && "responseType" in s) if ("json" === n.responseType && !w.can("return_response_type", "json")) s.responseType = "text";
								else s.responseType = n.responseType;
								if (!o) s.send(i);
								else if (s.sendAsBinary) s.sendAsBinary(i);
								else(function() {
									var e = new Uint8Array(i.length);
									for (var t = 0; t < i.length; t++) e[t] = i.charCodeAt(t) & 255;
									s.send(e.buffer)
								})();
								r.trigger("loadstart")
							},
							getStatus: function() {
								try {
									if (s) return s.status
								} catch (e) {}
								return 0
							},
							getResponse: function(e) {
								var t = this.getRuntime();
								try {
									switch (e) {
									case "blob":
										var i = new p(t.uid, s.response);
										var n = s.getResponseHeader("Content-Disposition");
										if (n) {
											var r = n.match(/filename=([\'\"'])([^\1]+)\1/);
											if (r) u = r[2]
										}
										i.name = u;
										if (!i.type) i.type = m.getFileMime(u);
										return i;
									case "json":
										if (!w.can("return_response_type", "json")) return s.status === 200 && !! window.JSON ? JSON.parse(s.responseText) : null;
										return s.response;
									case "document":
										return a(s);
									default:
										return s.responseText !== "" ? s.responseText : null
									}
								} catch (e) {
									return null
								}
							},
							getAllResponseHeaders: function() {
								try {
									return s.getAllResponseHeaders()
								} catch (e) {}
								return ""
							},
							abort: function() {
								if (s) s.abort()
							},
							destroy: function() {
								o = u = null;
								this.getRuntime().getShim().removeInstance(this.uid)
							}
						});

						function l(e, t) {
							var i = this,
								n, r;
							n = t.getBlob().getSource();
							r = new window.FileReader;
							r.onload = function() {
								t.append(t.getBlobName(), new g(null, {
									type: n.type,
									data: r.result
								}));
								o.send.call(i, e, t)
							};
							r.readAsBinaryString(n)
						}
						function c() {
							if (window.XMLHttpRequest && !(w.browser === "IE" && w.verComp(w.version, 8, "<"))) return new window.XMLHttpRequest;
							else return function() {
								var e = ["Msxml2.XMLHTTP.6.0", "Microsoft.XMLHTTP"];
								for (var t = 0; t < e.length; t++) try {
									return new ActiveXObject(e[t])
								} catch (e) {}
							}()
						}
						function a(e) {
							var t = e.responseXML;
							var i = e.responseText;
							if (w.browser === "IE" && i && t && !t.documentElement && /[^\/]+\/[^\+]+\+xml/.test(e.getResponseHeader("Content-Type"))) {
								t = new window.ActiveXObject("Microsoft.XMLDOM");
								t.async = false;
								t.validateOnParse = false;
								t.loadXML(i)
							}
							if (t) if (w.browser === "IE" && t.parseError !== 0 || !t.documentElement || t.documentElement.tagName === "parsererror") return null;
							return t
						}
						function f(e) {
							var i = "----moxieboundary" + (new Date).getTime(),
								n = "--",
								r = "\r\n",
								o = "",
								t = this.getRuntime();
							if (!t.can("send_binary_string")) throw new x.RuntimeError(x.RuntimeError.NOT_SUPPORTED_ERR);
							s.setRequestHeader("Content-Type", "multipart/form-data; boundary=" + i);
							e.each(function(e, t) {
								if (e instanceof g) o += n + i + r + 'Content-Disposition: form-data; name="' + t + '"; filename="' + unescape(encodeURIComponent(e.name || "blob")) + '"' + r + "Content-Type: " + (e.type || "application/octet-stream") + r + r + e.getSource() + r;
								else o += n + i + r + 'Content-Disposition: form-data; name="' + t + '"' + r + r + unescape(encodeURIComponent(e)) + r
							});
							o += n + i + n + r;
							return o
						}
					}
					return e.XMLHttpRequest = t
				});
				e("moxie/runtime/html5/utils/BinaryReader", ["moxie/core/utils/Basic"], function(e) {
					function t(e) {
						if (e instanceof ArrayBuffer) i.apply(this, arguments);
						else n.apply(this, arguments)
					}
					e.extend(t.prototype, {
						littleEndian: false,
						read: function(e, t) {
							var i, n, r;
							if (e + t > this.length()) throw new Error("You are trying to read outside the source boundaries.");
							n = this.littleEndian ? 0 : -8 * (t - 1);
							for (r = 0, i = 0; r < t; r++) i |= this.readByteAt(e + r) << Math.abs(n + r * 8);
							return i
						},
						write: function(e, t, i) {
							var n, r, o = "";
							if (e > this.length()) throw new Error("You are trying to write outside the source boundaries.");
							n = this.littleEndian ? 0 : -8 * (i - 1);
							for (r = 0; r < i; r++) this.writeByteAt(e + r, t >> Math.abs(n + r * 8) & 255)
						},
						BYTE: function(e) {
							return this.read(e, 1)
						},
						SHORT: function(e) {
							return this.read(e, 2)
						},
						LONG: function(e) {
							return this.read(e, 4)
						},
						SLONG: function(e) {
							var t = this.read(e, 4);
							return t > 2147483647 ? t - 4294967296 : t
						},
						CHAR: function(e) {
							return String.fromCharCode(this.read(e, 1))
						},
						STRING: function(e, t) {
							return this.asArray("CHAR", e, t).join("")
						},
						asArray: function(e, t, i) {
							var n = [];
							for (var r = 0; r < i; r++) n[r] = this[e](t + r);
							return n
						}
					});

					function i(r) {
						var o = new DataView(r);
						e.extend(this, {
							readByteAt: function(e) {
								return o.getUint8(e)
							},
							writeByteAt: function(e, t) {
								o.setUint8(e, t)
							},
							SEGMENT: function(e, t, i) {
								switch (arguments.length) {
								case 2:
									return r.slice(e, e + t);
								case 1:
									return r.slice(e);
								case 3:
									if (i === null) i = new ArrayBuffer;
									if (i instanceof ArrayBuffer) {
										var n = new Uint8Array(this.length() - t + i.byteLength);
										if (e > 0) n.set(new Uint8Array(r.slice(0, e)), 0);
										n.set(new Uint8Array(i), e);
										n.set(new Uint8Array(r.slice(e + t)), e + i.byteLength);
										this.clear();
										r = n.buffer;
										o = new DataView(r);
										break
									}
								default:
									return r
								}
							},
							length: function() {
								return r ? r.byteLength : 0
							},
							clear: function() {
								o = r = null
							}
						})
					}
					function n(n) {
						e.extend(this, {
							readByteAt: function(e) {
								return n.charCodeAt(e)
							},
							writeByteAt: function(e, t) {
								r(String.fromCharCode(t), e, 1)
							},
							SEGMENT: function(e, t, i) {
								switch (arguments.length) {
								case 1:
									return n.substr(e);
								case 2:
									return n.substr(e, t);
								case 3:
									r(i !== null ? i : "", e, t);
									break;
								default:
									return n
								}
							},
							length: function() {
								return n ? n.length : 0
							},
							clear: function() {
								n = null
							}
						});

						function r(e, t, i) {
							i = arguments.length === 3 ? i : n.length - t - 1;
							n = n.substr(0, t) + e + n.substr(i + t)
						}
					}
					return t
				});
				e("moxie/runtime/html5/image/JPEGHeaders", ["moxie/runtime/html5/utils/BinaryReader", "moxie/core/Exceptions"], function(s, u) {
					return function o(e) {
						var a = [],
							t, r, i, n = 0;
						t = new s(e);
						if (t.SHORT(0) !== 65496) {
							t.clear();
							throw new u.ImageError(u.ImageError.WRONG_FORMAT)
						}
						r = 2;
						while (r <= t.length()) {
							i = t.SHORT(r);
							if (i >= 65488 && i <= 65495) {
								r += 2;
								continue
							}
							if (i === 65498 || i === 65497) break;
							n = t.SHORT(r + 2) + 2;
							if (i >= 65505 && i <= 65519) a.push({
								hex: i,
								name: "APP" + (i & 15),
								start: r,
								length: n,
								segment: t.SEGMENT(r, n)
							});
							r += n
						}
						t.clear();
						return {
							headers: a,
							restore: function(e) {
								var t, i, n;
								n = new s(e);
								r = n.SHORT(2) == 65504 ? 4 + n.SHORT(4) : 2;
								for (i = 0, t = a.length; i < t; i++) {
									n.SEGMENT(r, 0, a[i].segment);
									r += a[i].length
								}
								e = n.SEGMENT();
								n.clear();
								return e
							},
							strip: function(e) {
								var t, i, n, r;
								n = new o(e);
								i = n.headers;
								n.purge();
								t = new s(e);
								r = i.length;
								while (r--) t.SEGMENT(i[r].start, i[r].length, "");
								e = t.SEGMENT();
								t.clear();
								return e
							},
							get: function(e) {
								var t = [];
								for (var i = 0, n = a.length; i < n; i++) if (a[i].name === e.toUpperCase()) t.push(a[i].segment);
								return t
							},
							set: function(e, t) {
								var i = [],
									n, r, o;
								if (typeof t === "string") i.push(t);
								else i = t;
								for (n = r = 0, o = a.length; n < o; n++) {
									if (a[n].name === e.toUpperCase()) {
										a[n].segment = i[r];
										a[n].length = i[r].length;
										r++
									}
									if (r >= i.length) break
								}
							},
							purge: function() {
								this.headers = a = []
							}
						}
					}
				});
				e("moxie/runtime/html5/image/ExifParser", ["moxie/core/utils/Basic", "moxie/runtime/html5/utils/BinaryReader", "moxie/core/Exceptions"], function(v, s, x) {
					function u(e) {
						var t, c, p, g, i, n;
						s.call(this, e);
						c = {
							tiff: {
								274: "Orientation",
								270: "ImageDescription",
								271: "Make",
								272: "Model",
								305: "Software",
								34665: "ExifIFDPointer",
								34853: "GPSInfoIFDPointer"
							},
							exif: {
								36864: "ExifVersion",
								40961: "ColorSpace",
								40962: "PixelXDimension",
								40963: "PixelYDimension",
								36867: "DateTimeOriginal",
								33434: "ExposureTime",
								33437: "FNumber",
								34855: "ISOSpeedRatings",
								37377: "ShutterSpeedValue",
								37378: "ApertureValue",
								37383: "MeteringMode",
								37384: "LightSource",
								37385: "Flash",
								37386: "FocalLength",
								41986: "ExposureMode",
								41987: "WhiteBalance",
								41990: "SceneCaptureType",
								41988: "DigitalZoomRatio",
								41992: "Contrast",
								41993: "Saturation",
								41994: "Sharpness"
							},
							gps: {
								0: "GPSVersionID",
								1: "GPSLatitudeRef",
								2: "GPSLatitude",
								3: "GPSLongitudeRef",
								4: "GPSLongitude"
							},
							thumb: {
								513: "JPEGInterchangeFormat",
								514: "JPEGInterchangeFormatLength"
							}
						};
						p = {
							ColorSpace: {
								1: "sRGB",
								0: "Uncalibrated"
							},
							MeteringMode: {
								0: "Unknown",
								1: "Average",
								2: "CenterWeightedAverage",
								3: "Spot",
								4: "MultiSpot",
								5: "Pattern",
								6: "Partial",
								255: "Other"
							},
							LightSource: {
								1: "Daylight",
								2: "Fliorescent",
								3: "Tungsten",
								4: "Flash",
								9: "Fine weather",
								10: "Cloudy weather",
								11: "Shade",
								12: "Daylight fluorescent (D 5700 - 7100K)",
								13: "Day white fluorescent (N 4600 -5400K)",
								14: "Cool white fluorescent (W 3900 - 4500K)",
								15: "White fluorescent (WW 3200 - 3700K)",
								17: "Standard light A",
								18: "Standard light B",
								19: "Standard light C",
								20: "D55",
								21: "D65",
								22: "D75",
								23: "D50",
								24: "ISO studio tungsten",
								255: "Other"
							},
							Flash: {
								0: "Flash did not fire",
								1: "Flash fired",
								5: "Strobe return light not detected",
								7: "Strobe return light detected",
								9: "Flash fired, compulsory flash mode",
								13: "Flash fired, compulsory flash mode, return light not detected",
								15: "Flash fired, compulsory flash mode, return light detected",
								16: "Flash did not fire, compulsory flash mode",
								24: "Flash did not fire, auto mode",
								25: "Flash fired, auto mode",
								29: "Flash fired, auto mode, return light not detected",
								31: "Flash fired, auto mode, return light detected",
								32: "No flash function",
								65: "Flash fired, red-eye reduction mode",
								69: "Flash fired, red-eye reduction mode, return light not detected",
								71: "Flash fired, red-eye reduction mode, return light detected",
								73: "Flash fired, compulsory flash mode, red-eye reduction mode",
								77: "Flash fired, compulsory flash mode, red-eye reduction mode, return light not detected",
								79: "Flash fired, compulsory flash mode, red-eye reduction mode, return light detected",
								89: "Flash fired, auto mode, red-eye reduction mode",
								93: "Flash fired, auto mode, return light not detected, red-eye reduction mode",
								95: "Flash fired, auto mode, return light detected, red-eye reduction mode"
							},
							ExposureMode: {
								0: "Auto exposure",
								1: "Manual exposure",
								2: "Auto bracket"
							},
							WhiteBalance: {
								0: "Auto white balance",
								1: "Manual white balance"
							},
							SceneCaptureType: {
								0: "Standard",
								1: "Landscape",
								2: "Portrait",
								3: "Night scene"
							},
							Contrast: {
								0: "Normal",
								1: "Soft",
								2: "Hard"
							},
							Saturation: {
								0: "Normal",
								1: "Low saturation",
								2: "High saturation"
							},
							Sharpness: {
								0: "Normal",
								1: "Soft",
								2: "Hard"
							},
							GPSLatitudeRef: {
								N: "North latitude",
								S: "South latitude"
							},
							GPSLongitudeRef: {
								E: "East longitude",
								W: "West longitude"
							}
						};
						g = {
							tiffHeader: 10
						};
						i = g.tiffHeader;
						t = {
							clear: this.clear
						};
						v.extend(this, {
							read: function() {
								try {
									return u.prototype.read.apply(this, arguments)
								} catch (e) {
									throw new x.ImageError(x.ImageError.INVALID_META_ERR)
								}
							},
							write: function() {
								try {
									return u.prototype.write.apply(this, arguments)
								} catch (e) {
									throw new x.ImageError(x.ImageError.INVALID_META_ERR)
								}
							},
							UNDEFINED: function() {
								return this.BYTE.apply(this, arguments)
							},
							RATIONAL: function(e) {
								return this.LONG(e) / this.LONG(e + 4)
							},
							SRATIONAL: function(e) {
								return this.SLONG(e) / this.SLONG(e + 4)
							},
							ASCII: function(e) {
								return this.CHAR(e)
							},
							TIFF: function() {
								return n || null
							},
							EXIF: function() {
								var e = null;
								if (g.exifIFD) {
									try {
										e = o.call(this, g.exifIFD, c.exif)
									} catch (e) {
										return null
									}
									if (e.ExifVersion && v.typeOf(e.ExifVersion) === "array") {
										for (var t = 0, i = ""; t < e.ExifVersion.length; t++) i += String.fromCharCode(e.ExifVersion[t]);
										e.ExifVersion = i
									}
								}
								return e
							},
							GPS: function() {
								var e = null;
								if (g.gpsIFD) {
									try {
										e = o.call(this, g.gpsIFD, c.gps)
									} catch (e) {
										return null
									}
									if (e.GPSVersionID && v.typeOf(e.GPSVersionID) === "array") e.GPSVersionID = e.GPSVersionID.join(".")
								}
								return e
							},
							thumb: function() {
								if (g.IFD1) try {
									var e = o.call(this, g.IFD1, c.thumb);
									if ("JPEGInterchangeFormat" in e) return this.SEGMENT(g.tiffHeader + e.JPEGInterchangeFormat, e.JPEGInterchangeFormatLength)
								} catch (e) {}
								return null
							},
							setExif: function(e, t) {
								if (e !== "PixelXDimension" && e !== "PixelYDimension") return false;
								return a.call(this, "exif", e, t)
							},
							clear: function() {
								t.clear();
								e = c = p = n = g = t = null
							}
						});
						if (this.SHORT(0) !== 65505 || this.STRING(4, 5).toUpperCase() !== "EXIF\0") throw new x.ImageError(x.ImageError.INVALID_META_ERR);
						this.littleEndian = this.SHORT(i) == 18761;
						if (this.SHORT(i += 2) !== 42) throw new x.ImageError(x.ImageError.INVALID_META_ERR);
						g.IFD0 = g.tiffHeader + this.LONG(i += 2);
						n = o.call(this, g.IFD0, c.tiff);
						if ("ExifIFDPointer" in n) {
							g.exifIFD = g.tiffHeader + n.ExifIFDPointer;
							delete n.ExifIFDPointer
						}
						if ("GPSInfoIFDPointer" in n) {
							g.gpsIFD = g.tiffHeader + n.GPSInfoIFDPointer;
							delete n.GPSInfoIFDPointer
						}
						if (v.isEmptyObj(n)) n = null;
						var r = this.LONG(g.IFD0 + this.SHORT(g.IFD0) * 12 + 2);
						if (r) g.IFD1 = g.tiffHeader + r;

						function o(e, t) {
							var i = this;
							var n, r, o, a, s, u, l, c, f = [],
								d = {};
							var m = {
								1: "BYTE",
								7: "UNDEFINED",
								2: "ASCII",
								3: "SHORT",
								4: "LONG",
								5: "RATIONAL",
								9: "SLONG",
								10: "SRATIONAL"
							};
							var h = {
								BYTE: 1,
								UNDEFINED: 1,
								ASCII: 1,
								SHORT: 2,
								LONG: 4,
								RATIONAL: 8,
								SLONG: 4,
								SRATIONAL: 8
							};
							n = i.SHORT(e);
							for (r = 0; r < n; r++) {
								f = [];
								l = e + 2 + r * 12;
								o = t[i.SHORT(l)];
								if (o === w) continue;
								a = m[i.SHORT(l += 2)];
								s = i.LONG(l += 2);
								u = h[a];
								if (!u) throw new x.ImageError(x.ImageError.INVALID_META_ERR);
								l += 4;
								if (u * s > 4) l = i.LONG(l) + g.tiffHeader;
								if (l + u * s >= this.length()) throw new x.ImageError(x.ImageError.INVALID_META_ERR);
								if (a === "ASCII") {
									d[o] = v.trim(i.STRING(l, s).replace(/\0$/, ""));
									continue
								} else {
									f = i.asArray(a, l, s);
									c = s == 1 ? f[0] : f;
									if (p.hasOwnProperty(o) && typeof c != "object") d[o] = p[o][c];
									else d[o] = c
								}
							}
							return d
						}
						function a(e, t, i) {
							var n, r, o, a = 0;
							if (typeof t === "string") {
								var s = c[e.toLowerCase()];
								for (var u in s) if (s[u] === t) {
									t = u;
									break
								}
							}
							n = g[e.toLowerCase() + "IFD"];
							r = this.SHORT(n);
							for (var l = 0; l < r; l++) {
								o = n + 12 * l + 2;
								if (this.SHORT(o) == t) {
									a = o + 8;
									break
								}
							}
							if (!a) return false;
							try {
								this.write(a, i, 4)
							} catch (e) {
								return false
							}
							return true
						}
					}
					u.prototype = s.prototype;
					return u
				});
				e("moxie/runtime/html5/image/JPEG", ["moxie/core/utils/Basic", "moxie/core/Exceptions", "moxie/runtime/html5/image/JPEGHeaders", "moxie/runtime/html5/utils/BinaryReader", "moxie/runtime/html5/image/ExifParser"], function(u, l, c, f, d) {
					function e(e) {
						var r, i, n, t;
						r = new f(e);
						if (r.SHORT(0) !== 65496) throw new l.ImageError(l.ImageError.WRONG_FORMAT);
						i = new c(e);
						try {
							n = new d(i.get("app1")[0])
						} catch (e) {}
						t = o.call(this);
						u.extend(this, {
							type: "image/jpeg",
							size: r.length(),
							width: t && t.width || 0,
							height: t && t.height || 0,
							setExif: function(e, t) {
								if (!n) return false;
								if (u.typeOf(e) === "object") u.each(e, function(e, t) {
									n.setExif(t, e)
								});
								else n.setExif(e, t);
								i.set("app1", n.SEGMENT())
							},
							writeHeaders: function() {
								if (!arguments.length) return i.restore(e);
								return i.restore(arguments[0])
							},
							stripHeaders: function(e) {
								return i.strip(e)
							},
							purge: function() {
								s.call(this)
							}
						});
						if (n) this.meta = {
							tiff: n.TIFF(),
							exif: n.EXIF(),
							gps: n.GPS(),
							thumb: a()
						};

						function o(e) {
							var t = 0,
								i, n;
							if (!e) e = r;
							while (t <= e.length()) {
								i = e.SHORT(t += 2);
								if (i >= 65472 && i <= 65475) {
									t += 5;
									return {
										height: e.SHORT(t),
										width: e.SHORT(t += 2)
									}
								}
								n = e.SHORT(t += 2);
								t += n - 2
							}
							return null
						}
						function a() {
							var e = n.thumb(),
								t, i;
							if (e) {
								t = new f(e);
								i = o(t);
								t.clear();
								if (i) {
									i.data = e;
									return i
								}
							}
							return null
						}
						function s() {
							if (!n || !i || !r) return;
							n.clear();
							i.purge();
							r.clear();
							t = i = n = r = null
						}
					}
					return e
				});
				e("moxie/runtime/html5/image/PNG", ["moxie/core/Exceptions", "moxie/core/utils/Basic", "moxie/runtime/html5/utils/BinaryReader"], function(u, l, c) {
					function e(e) {
						var o, t, i, n;
						o = new c(e);
						(function() {
							var e = 0,
								t = 0,
								i = [35152, 20039, 3338, 6666];
							for (t = 0; t < i.length; t++, e += 2) if (i[t] != o.SHORT(e)) throw new u.ImageError(u.ImageError.WRONG_FORMAT)
						})();

						function r() {
							var e, t;
							e = s.call(this, 8);
							if (e.type == "IHDR") {
								t = e.start;
								return {
									width: o.LONG(t),
									height: o.LONG(t += 4)
								}
							}
							return null
						}
						function a() {
							if (!o) return;
							o.clear();
							e = n = t = i = o = null
						}
						n = r.call(this);
						l.extend(this, {
							type: "image/png",
							size: o.length(),
							width: n.width,
							height: n.height,
							purge: function() {
								a.call(this)
							}
						});
						a.call(this);

						function s(e) {
							var t, i, n, r;
							t = o.LONG(e);
							i = o.STRING(e += 4, 4);
							n = e += 4;
							r = o.LONG(e + t);
							return {
								length: t,
								type: i,
								start: n,
								CRC: r
							}
						}
					}
					return e
				});
				e("moxie/runtime/html5/image/ImageInfo", ["moxie/core/utils/Basic", "moxie/core/Exceptions", "moxie/runtime/html5/image/JPEG", "moxie/runtime/html5/image/PNG"], function(n, r, o, a) {
					return function(t) {
						var i = [o, a],
							e;
						e = function() {
							for (var e = 0; e < i.length; e++) try {
								return new i[e](t)
							} catch (e) {}
							throw new r.ImageError(r.ImageError.WRONG_FORMAT)
						}();
						n.extend(this, {
							type: "",
							size: 0,
							width: 0,
							height: 0,
							setExif: function() {},
							writeHeaders: function(e) {
								return e
							},
							stripHeaders: function(e) {
								return e
							},
							purge: function() {
								t = null
							}
						});
						n.extend(this, e);
						this.purge = function() {
							e.purge();
							e = null
						}
					}
				});
				e("moxie/runtime/html5/image/ResizerCanvas", [], function() {
					function s(e, t, i) {
						var n = e.width > e.height ? "width" : "height";
						var r = Math.round(e[n] * t);
						var o = false;
						if (i !== "nearest" && (t < .5 || t > 2)) {
							t = t < .5 ? .5 : 2;
							o = true
						}
						var a = u(e, t);
						if (o) return s(a, r / a[n], i);
						else return a
					}
					function u(e, t) {
						var i = e.width;
						var n = e.height;
						var r = Math.round(i * t);
						var o = Math.round(n * t);
						var a = document.createElement("canvas");
						a.width = r;
						a.height = o;
						a.getContext("2d").drawImage(e, 0, 0, i, n, 0, 0, r, o);
						e = null;
						return a
					}
					return {
						scale: s
					}
				});
				e("moxie/runtime/html5/image/Image", ["moxie/runtime/html5/Runtime", "moxie/core/utils/Basic", "moxie/core/Exceptions", "moxie/core/utils/Encode", "moxie/file/Blob", "moxie/file/File", "moxie/runtime/html5/image/ImageInfo", "moxie/runtime/html5/image/ResizerCanvas", "moxie/core/utils/Mime", "moxie/core/utils/Env"], function(e, x, w, y, E, b, _, R, I, t) {
					function i() {
						var n = this,
							i, r, o, a, s, u = false,
							l = true;
						x.extend(this, {
							loadFromBlob: function(e) {
								var t = this.getRuntime(),
									i = arguments.length > 1 ? arguments[1] : true;
								if (!t.can("access_binary")) throw new w.RuntimeError(w.RuntimeError.NOT_SUPPORTED_ERR);
								s = e;
								if (e.isDetached()) {
									a = e.getSource();
									h.call(this, a);
									return
								} else p.call(this, e.getSource(), function(e) {
									if (i) a = d(e);
									h.call(this, e)
								})
							},
							loadFromImage: function(e, t) {
								this.meta = e.meta;
								s = new b(null, {
									name: e.name,
									size: e.size,
									type: e.type
								});
								h.call(this, t ? a = e.getAsBinaryString() : e.getAsDataURL())
							},
							getInfo: function() {
								var e = this.getRuntime(),
									t;
								if (!r && a && e.can("access_image_binary")) r = new _(a);
								t = {
									width: c().width || 0,
									height: c().height || 0,
									type: s.type || I.getFileMime(s.name),
									size: a && a.length || s.size || 0,
									name: s.name || "",
									meta: null
								};
								if (l) {
									t.meta = r && r.meta || this.meta || {};
									if (t.meta && t.meta.thumb && !(t.meta.thumb.data instanceof E)) t.meta.thumb.data = new E(null, {
										type: "image/jpeg",
										data: t.meta.thumb.data
									})
								}
								return t
							},
							resize: function(e, t, i) {
								var n = document.createElement("canvas");
								n.width = e.width;
								n.height = e.height;
								n.getContext("2d").drawImage(c(), e.x, e.y, e.width, e.height, 0, 0, n.width, n.height);
								o = R.scale(n, t);
								l = i.preserveHeaders;
								if (!l) {
									var r = this.meta && this.meta.tiff && this.meta.tiff.Orientation || 1;
									o = g(o, r)
								}
								this.width = o.width;
								this.height = o.height;
								u = true;
								this.trigger("Resize")
							},
							getAsCanvas: function() {
								if (!o) o = f();
								o.id = this.uid + "_canvas";
								return o
							},
							getAsBlob: function(e, t) {
								if (e !== this.type) {
									u = true;
									return new b(null, {
										name: s.name || "",
										type: e,
										data: n.getAsDataURL(e, t)
									})
								}
								return new b(null, {
									name: s.name || "",
									type: e,
									data: n.getAsBinaryString(e, t)
								})
							},
							getAsDataURL: function(e) {
								var t = arguments[1] || 90;
								if (!u) return i.src;
								f();
								if ("image/jpeg" !== e) return o.toDataURL("image/png");
								else try {
									return o.toDataURL("image/jpeg", t / 100)
								} catch (e) {
									return o.toDataURL("image/jpeg")
								}
							},
							getAsBinaryString: function(e, t) {
								if (!u) {
									if (!a) a = d(n.getAsDataURL(e, t));
									return a
								}
								if ("image/jpeg" !== e) a = d(n.getAsDataURL(e, t));
								else {
									var i;
									if (!t) t = 90;
									f();
									try {
										i = o.toDataURL("image/jpeg", t / 100)
									} catch (e) {
										i = o.toDataURL("image/jpeg")
									}
									a = d(i);
									if (r) {
										a = r.stripHeaders(a);
										if (l) {
											if (r.meta && r.meta.exif) r.setExif({
												PixelXDimension: this.width,
												PixelYDimension: this.height
											});
											a = r.writeHeaders(a)
										}
										r.purge();
										r = null
									}
								}
								u = false;
								return a
							},
							destroy: function() {
								n = null;
								v.call(this);
								this.getRuntime().getShim().removeInstance(this.uid)
							}
						});

						function c() {
							if (!o && !i) throw new w.ImageError(w.DOMException.INVALID_STATE_ERR);
							return o || i
						}
						function f() {
							var e = c();
							if (e.nodeName.toLowerCase() == "canvas") return e;
							o = document.createElement("canvas");
							o.width = e.width;
							o.height = e.height;
							o.getContext("2d").drawImage(e, 0, 0);
							return o
						}
						function d(e) {
							return y.atob(e.substring(e.indexOf("base64,") + 7))
						}
						function m(e, t) {
							return "data:" + (t || "") + ";base64," + y.btoa(e)
						}
						function h(e) {
							var t = this;
							i = new Image;
							i.onerror = function() {
								v.call(this);
								t.trigger("error", w.ImageError.WRONG_FORMAT)
							};
							i.onload = function() {
								t.trigger("load")
							};
							i.src = e.substr(0, 5) == "data:" ? e : m(e, s.type)
						}
						function p(e, t) {
							var i = this,
								n;
							if (window.FileReader) {
								n = new FileReader;
								n.onload = function() {
									t.call(i, this.result)
								};
								n.onerror = function() {
									i.trigger("error", w.ImageError.WRONG_FORMAT)
								};
								n.readAsDataURL(e)
							} else return t.call(this, e.getAsDataURL())
						}
						function g(e, t) {
							var i = Math.PI / 180;
							var n = document.createElement("canvas");
							var r = n.getContext("2d");
							var o = e.width;
							var a = e.height;
							if (x.inArray(t, [5, 6, 7, 8]) > -1) {
								n.width = a;
								n.height = o
							} else {
								n.width = o;
								n.height = a
							}
							switch (t) {
							case 2:
								r.translate(o, 0);
								r.scale(-1, 1);
								break;
							case 3:
								r.translate(o, a);
								r.rotate(180 * i);
								break;
							case 4:
								r.translate(0, a);
								r.scale(1, -1);
								break;
							case 5:
								r.rotate(90 * i);
								r.scale(1, -1);
								break;
							case 6:
								r.rotate(90 * i);
								r.translate(0, -a);
								break;
							case 7:
								r.rotate(90 * i);
								r.translate(o, -a);
								r.scale(-1, 1);
								break;
							case 8:
								r.rotate(-90 * i);
								r.translate(-o, 0);
								break
							}
							r.drawImage(e, 0, 0, o, a);
							return n
						}
						function v() {
							if (r) {
								r.purge();
								r = null
							}
							a = i = o = s = null;
							u = false
						}
					}
					return e.Image = i
				});
				e("moxie/runtime/flash/Runtime", ["moxie/core/utils/Basic", "moxie/core/utils/Env", "moxie/core/utils/Dom", "moxie/core/Exceptions", "moxie/runtime/Runtime"], function(a, s, u, l, c) {
					var e = "flash",
						t = {};

					function i() {
						var t;
						try {
							t = navigator.plugins["Shockwave Flash"];
							t = t.description
						} catch (e) {
							try {
								t = new ActiveXObject("ShockwaveFlash.ShockwaveFlash").GetVariable("$version")
							} catch (e) {
								t = "0.0"
							}
						}
						t = t.match(/\d+/g);
						return parseFloat(t[0] + "." + t[1])
					}
					function f(t) {
						var i = u.get(t);
						if (i && i.nodeName == "OBJECT") if (s.browser === "IE") {
							i.style.display = "none";
							(function e() {
								if (i.readyState == 4) n(t);
								else setTimeout(e, 10)
							})()
						} else i.parentNode.removeChild(i)
					}
					function n(e) {
						var t = u.get(e);
						if (t) {
							for (var i in t) if (typeof t[i] == "function") t[i] = null;
							t.parentNode.removeChild(t)
						}
					}
					function r(n) {
						var r = this,
							o;
						n = a.extend({
							swf_url: s.swf_url
						}, n);
						c.call(this, n, e, {
							access_binary: function(e) {
								return e && r.mode === "browser"
							},
							access_image_binary: function(e) {
								return e && r.mode === "browser"
							},
							display_media: c.capTest(d("moxie/image/Image")),
							do_cors: c.capTrue,
							drag_and_drop: false,
							report_upload_progress: function() {
								return r.mode === "client"
							},
							resize_image: c.capTrue,
							return_response_headers: false,
							return_response_type: function(e) {
								if (e === "json" && !! window.JSON) return true;
								return !a.arrayDiff(e, ["", "text", "document"]) || r.mode === "browser"
							},
							return_status_code: function(e) {
								return r.mode === "browser" || !a.arrayDiff(e, [200, 404])
							},
							select_file: c.capTrue,
							select_multiple: c.capTrue,
							send_binary_string: function(e) {
								return e && r.mode === "browser"
							},
							send_browser_cookies: function(e) {
								return e && r.mode === "browser"
							},
							send_custom_headers: function(e) {
								return e && r.mode === "browser"
							},
							send_multipart: c.capTrue,
							slice_blob: function(e) {
								return e && r.mode === "browser"
							},
							stream_upload: function(e) {
								return e && r.mode === "browser"
							},
							summon_file_dialog: false,
							upload_filesize: function(e) {
								return a.parseSizeStr(e) <= 2097152 || r.mode === "client"
							},
							use_http_method: function(e) {
								return !a.arrayDiff(e, ["GET", "POST"])
							}
						}, {
							access_binary: function(e) {
								return e ? "browser" : "client"
							},
							access_image_binary: function(e) {
								return e ? "browser" : "client"
							},
							report_upload_progress: function(e) {
								return e ? "browser" : "client"
							},
							return_response_type: function(e) {
								return a.arrayDiff(e, ["", "text", "json", "document"]) ? "browser" : ["client", "browser"]
							},
							return_status_code: function(e) {
								return a.arrayDiff(e, [200, 404]) ? "browser" : ["client", "browser"]
							},
							send_binary_string: function(e) {
								return e ? "browser" : "client"
							},
							send_browser_cookies: function(e) {
								return e ? "browser" : "client"
							},
							send_custom_headers: function(e) {
								return e ? "browser" : "client"
							},
							slice_blob: function(e) {
								return e ? "browser" : "client"
							},
							stream_upload: function(e) {
								return e ? "client" : "browser"
							},
							upload_filesize: function(e) {
								return a.parseSizeStr(e) >= 2097152 ? "client" : "browser"
							}
						}, "client");
						if (i() < 11.3) {
							if (MXI_DEBUG && s.debug.runtime) s.log("\tFlash didn't meet minimal version requirement (11.3).");
							this.mode = false
						}
						a.extend(this, {
							getShim: function() {
								return u.get(this.uid)
							},
							shimExec: function(e, t) {
								var i = [].slice.call(arguments, 2);
								return r.getShim().exec(this.uid, e, t, i)
							},
							init: function() {
								var e, t, i;
								i = this.getShimContainer();
								a.extend(i.style, {
									position: "absolute",
									top: "-8px",
									left: "-8px",
									width: "9px",
									height: "9px",
									overflow: "hidden"
								});
								e = '<object id="' + this.uid + '" type="application/x-shockwave-flash" data="' + n.swf_url + '" ';
								if (s.browser === "IE") e += 'classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" ';
								e += 'width="100%" height="100%" style="outline:0">' + '<param name="movie" value="' + n.swf_url + '" />' + '<param name="flashvars" value="uid=' + escape(this.uid) + "&target=" + c.getGlobalEventTarget() + '" />' + '<param name="wmode" value="transparent" />' + '<param name="allowscriptaccess" value="always" />' + "</object>";
								if (s.browser === "IE") {
									t = document.createElement("div");
									i.appendChild(t);
									t.outerHTML = e;
									t = i = null
								} else i.innerHTML = e;
								o = setTimeout(function() {
									if (r && !r.initialized) {
										r.trigger("Error", new l.RuntimeError(l.RuntimeError.NOT_INIT_ERR));
										if (MXI_DEBUG && s.debug.runtime) s.log("\tFlash failed to initialize within a specified period of time (typically 5s).")
									}
								}, 5e3)
							},
							destroy: function(e) {
								return function() {
									f(r.uid);
									e.call(r);
									clearTimeout(o);
									n = o = e = r = null
								}
							}(this.destroy)
						}, t)
					}
					c.addConstructor(e, r);
					return t
				});
				e("moxie/runtime/flash/file/Blob", ["moxie/runtime/flash/Runtime", "moxie/file/Blob"], function(e, o) {
					var t = {
						slice: function(e, t, i, n) {
							var r = this.getRuntime();
							if (t < 0) t = Math.max(e.size + t, 0);
							else if (t > 0) t = Math.min(t, e.size);
							if (i < 0) i = Math.max(e.size + i, 0);
							else if (i > 0) i = Math.min(i, e.size);
							e = r.shimExec.call(this, "Blob", "slice", t, i, n || "");
							if (e) e = new o(r.uid, e);
							return e
						}
					};
					return e.Blob = t
				});
				e("moxie/runtime/flash/file/FileInput", ["moxie/runtime/flash/Runtime", "moxie/file/File", "moxie/core/utils/Dom", "moxie/core/utils/Basic"], function(e, r, o, a) {
					var t = {
						init: function(e) {
							var t = this,
								i = this.getRuntime();
							var n = o.get(e.browse_button);
							if (n) {
								n.setAttribute("tabindex", -1);
								n = null
							}
							this.bind("Change", function() {
								var e = i.shimExec.call(t, "FileInput", "getFiles");
								t.files = [];
								a.each(e, function(e) {
									t.files.push(new r(i.uid, e))
								})
							}, 999);
							this.getRuntime().shimExec.call(this, "FileInput", "init", {
								accept: e.accept,
								multiple: e.multiple
							});
							this.trigger("ready")
						}
					};
					return e.FileInput = t
				});
				e("moxie/runtime/flash/file/FileReader", ["moxie/runtime/flash/Runtime", "moxie/core/utils/Encode"], function(e, i) {
					function r(e, t) {
						switch (t) {
						case "readAsText":
							return i.atob(e, "utf8");
						case "readAsBinaryString":
							return i.atob(e);
						case "readAsDataURL":
							return e
						}
						return null
					}
					var t = {
						read: function(i, e) {
							var n = this;
							n.result = "";
							if (i === "readAsDataURL") n.result = "data:" + (e.type || "") + ";base64,";
							n.bind("Progress", function(e, t) {
								if (t) n.result += r(t, i)
							}, 999);
							return n.getRuntime().shimExec.call(this, "FileReader", "readAsBase64", e.uid)
						}
					};
					return e.FileReader = t
				});
				e("moxie/runtime/flash/file/FileReaderSync", ["moxie/runtime/flash/Runtime", "moxie/core/utils/Encode"], function(e, i) {
					function r(e, t) {
						switch (t) {
						case "readAsText":
							return i.atob(e, "utf8");
						case "readAsBinaryString":
							return i.atob(e);
						case "readAsDataURL":
							return e
						}
						return null
					}
					var t = {
						read: function(e, t) {
							var i, n = this.getRuntime();
							i = n.shimExec.call(this, "FileReaderSync", "readAsBase64", t.uid);
							if (!i) return null;
							if (e === "readAsDataURL") i = "data:" + (t.type || "") + ";base64," + i;
							return r(i, e, t.type)
						}
					};
					return e.FileReaderSync = t
				});
				e("moxie/runtime/flash/runtime/Transporter", ["moxie/runtime/flash/Runtime", "moxie/file/Blob"], function(e, n) {
					var t = {
						getAsBlob: function(e) {
							var t = this.getRuntime(),
								i = t.shimExec.call(this, "Transporter", "getAsBlob", e);
							if (i) return new n(t.uid, i);
							return null
						}
					};
					return e.Transporter = t
				});
				e("moxie/runtime/flash/xhr/XMLHttpRequest", ["moxie/runtime/flash/Runtime", "moxie/core/utils/Basic", "moxie/file/Blob", "moxie/file/File", "moxie/file/FileReaderSync", "moxie/runtime/flash/file/FileReaderSync", "moxie/xhr/FormData", "moxie/runtime/Transporter", "moxie/runtime/flash/runtime/Transporter"], function(e, l, c, r, o, t, f, d, i) {
					var n = {
						send: function(e, i) {
							var n = this,
								r = n.getRuntime();

							function o() {
								e.transport = r.mode;
								r.shimExec.call(n, "XMLHttpRequest", "send", e, i)
							}
							function t(e, t) {
								r.shimExec.call(n, "XMLHttpRequest", "appendBlob", e, t.uid);
								i = null;
								o()
							}
							function a(e, t) {
								var i = new d;
								i.bind("TransportingComplete", function() {
									t(this.result)
								});
								i.transport(e.getSource(), e.type, {
									ruid: r.uid
								})
							}
							if (!l.isEmptyObj(e.headers)) l.each(e.headers, function(e, t) {
								r.shimExec.call(n, "XMLHttpRequest", "setRequestHeader", t, e.toString())
							});
							if (i instanceof f) {
								var s;
								i.each(function(e, t) {
									if (e instanceof c) s = t;
									else r.shimExec.call(n, "XMLHttpRequest", "append", t, e)
								});
								if (!i.hasBlob()) {
									i = null;
									o()
								} else {
									var u = i.getBlob();
									if (u.isDetached()) a(u, function(e) {
										u.destroy();
										t(s, e)
									});
									else t(s, u)
								}
							} else if (i instanceof c) if (i.isDetached()) a(i, function(e) {
								i.destroy();
								i = e.uid;
								o()
							});
							else {
								i = i.uid;
								o()
							} else o()
						},
						getResponse: function(e) {
							var t, i, n = this.getRuntime();
							i = n.shimExec.call(this, "XMLHttpRequest", "getResponseAsBlob");
							if (i) {
								i = new r(n.uid, i);
								if ("blob" === e) return i;
								try {
									t = new o;
									if ( !! ~l.inArray(e, ["", "text"])) return t.readAsText(i);
									else if ("json" === e && !! window.JSON) return JSON.parse(t.readAsText(i))
								} finally {
									i.destroy()
								}
							}
							return null
						},
						abort: function(e) {
							var t = this.getRuntime();
							t.shimExec.call(this, "XMLHttpRequest", "abort");
							this.dispatchEvent("readystatechange");
							this.dispatchEvent("abort")
						}
					};
					return e.XMLHttpRequest = n
				});
				e("moxie/runtime/flash/image/Image", ["moxie/runtime/flash/Runtime", "moxie/core/utils/Basic", "moxie/runtime/Transporter", "moxie/file/Blob", "moxie/file/FileReaderSync"], function(e, t, o, r, n) {
					var i = {
						loadFromBlob: function(e) {
							var t = this,
								i = t.getRuntime();

							function n(e) {
								i.shimExec.call(t, "Image", "loadFromBlob", e.uid);
								t = i = null
							}
							if (e.isDetached()) {
								var r = new o;
								r.bind("TransportingComplete", function() {
									n(r.result.getSource())
								});
								r.transport(e.getSource(), e.type, {
									ruid: i.uid
								})
							} else n(e.getSource())
						},
						loadFromImage: function(e) {
							var t = this.getRuntime();
							return t.shimExec.call(this, "Image", "loadFromImage", e.uid)
						},
						getInfo: function() {
							var e = this.getRuntime(),
								t = e.shimExec.call(this, "Image", "getInfo");
							if (t.meta && t.meta.thumb && t.meta.thumb.data && !(e.meta.thumb.data instanceof r)) t.meta.thumb.data = new r(e.uid, t.meta.thumb.data);
							return t
						},
						getAsBlob: function(e, t) {
							var i = this.getRuntime(),
								n = i.shimExec.call(this, "Image", "getAsBlob", e, t);
							if (n) return new r(i.uid, n);
							return null
						},
						getAsDataURL: function() {
							var e = this.getRuntime(),
								t = e.Image.getAsBlob.apply(this, arguments),
								i;
							if (!t) return null;
							i = new n;
							return i.readAsDataURL(t)
						}
					};
					return e.Image = i
				});
				e("moxie/runtime/silverlight/Runtime", ["moxie/core/utils/Basic", "moxie/core/utils/Env", "moxie/core/utils/Dom", "moxie/core/Exceptions", "moxie/runtime/Runtime"], function(r, o, e, a, s) {
					var u = "silverlight",
						l = {};

					function c(t) {
						var i = false,
							e = null,
							n, r, o, a, s, u = 0;
						try {
							try {
								e = new ActiveXObject("AgControl.AgControl");
								if (e.IsVersionSupported(t)) i = true;
								e = null
							} catch (e) {
								var l = navigator.plugins["Silverlight Plug-In"];
								if (l) {
									n = l.description;
									if (n === "1.0.30226.2") n = "2.0.30226.2";
									r = n.split(".");
									while (r.length > 3) r.pop();
									while (r.length < 4) r.push(0);
									o = t.split(".");
									while (o.length > 4) o.pop();
									do {
										a = parseInt(o[u], 10);
										s = parseInt(r[u], 10);
										u++
									} while (u < o.length && a === s);
									if (a <= s && !isNaN(a)) i = true
								}
							}
						} catch (e) {
							i = false
						}
						return i
					}
					function t(t) {
						var n = this,
							i;
						t = r.extend({
							xap_url: o.xap_url
						}, t);
						s.call(this, t, u, {
							access_binary: s.capTrue,
							access_image_binary: s.capTrue,
							display_media: s.capTest(d("moxie/image/Image")),
							do_cors: s.capTrue,
							drag_and_drop: false,
							report_upload_progress: s.capTrue,
							resize_image: s.capTrue,
							return_response_headers: function(e) {
								return e && n.mode === "client"
							},
							return_response_type: function(e) {
								if (e !== "json") return true;
								else return !!window.JSON
							},
							return_status_code: function(e) {
								return n.mode === "client" || !r.arrayDiff(e, [200, 404])
							},
							select_file: s.capTrue,
							select_multiple: s.capTrue,
							send_binary_string: s.capTrue,
							send_browser_cookies: function(e) {
								return e && n.mode === "browser"
							},
							send_custom_headers: function(e) {
								return e && n.mode === "client"
							},
							send_multipart: s.capTrue,
							slice_blob: s.capTrue,
							stream_upload: true,
							summon_file_dialog: false,
							upload_filesize: s.capTrue,
							use_http_method: function(e) {
								return n.mode === "client" || !r.arrayDiff(e, ["GET", "POST"])
							}
						}, {
							return_response_headers: function(e) {
								return e ? "client" : "browser"
							},
							return_status_code: function(e) {
								return r.arrayDiff(e, [200, 404]) ? "client" : ["client", "browser"]
							},
							send_browser_cookies: function(e) {
								return e ? "browser" : "client"
							},
							send_custom_headers: function(e) {
								return e ? "client" : "browser"
							},
							use_http_method: function(e) {
								return r.arrayDiff(e, ["GET", "POST"]) ? "client" : ["client", "browser"]
							}
						});
						if (!c("2.0.31005.0") || o.browser === "Opera") {
							if (MXI_DEBUG && o.debug.runtime) o.log("\tSilverlight is not installed or minimal version (2.0.31005.0) requirement not met (not likely).");
							this.mode = false
						}
						r.extend(this, {
							getShim: function() {
								return e.get(this.uid).content.Moxie
							},
							shimExec: function(e, t) {
								var i = [].slice.call(arguments, 2);
								return n.getShim().exec(this.uid, e, t, i)
							},
							init: function() {
								var e;
								e = this.getShimContainer();
								e.innerHTML = '<object id="' + this.uid + '" data="data:application/x-silverlight," type="application/x-silverlight-2" width="100%" height="100%" style="outline:none;">' + '<param name="source" value="' + t.xap_url + '"/>' + '<param name="background" value="Transparent"/>' + '<param name="windowless" value="true"/>' + '<param name="enablehtmlaccess" value="true"/>' + '<param name="initParams" value="uid=' + this.uid + ",target=" + s.getGlobalEventTarget() + '"/>' + "</object>";
								i = setTimeout(function() {
									if (n && !n.initialized) {
										n.trigger("Error", new a.RuntimeError(a.RuntimeError.NOT_INIT_ERR));
										if (MXI_DEBUG && o.debug.runtime) o.log("Silverlight failed to initialize within a specified period of time (5-10s).")
									}
								}, o.OS !== "Windows" ? 1e4 : 5e3)
							},
							destroy: function(e) {
								return function() {
									e.call(n);
									clearTimeout(i);
									t = i = e = n = null
								}
							}(this.destroy)
						}, l)
					}
					s.addConstructor(u, t);
					return l
				});
				e("moxie/runtime/silverlight/file/Blob", ["moxie/runtime/silverlight/Runtime", "moxie/core/utils/Basic", "moxie/runtime/flash/file/Blob"], function(e, t, i) {
					return e.Blob = t.extend({}, i)
				});
				e("moxie/runtime/silverlight/file/FileInput", ["moxie/runtime/silverlight/Runtime", "moxie/file/File", "moxie/core/utils/Dom", "moxie/core/utils/Basic"], function(e, r, o, a) {
					function s(e) {
						var t = "";
						for (var i = 0; i < e.length; i++) t += (t !== "" ? "|" : "") + e[i].title + " | *." + e[i].extensions.replace(/,/g, ";*.");
						return t
					}
					var t = {
						init: function(e) {
							var t = this,
								i = this.getRuntime();
							var n = o.get(e.browse_button);
							if (n) {
								n.setAttribute("tabindex", -1);
								n = null
							}
							this.bind("Change", function() {
								var e = i.shimExec.call(t, "FileInput", "getFiles");
								t.files = [];
								a.each(e, function(e) {
									t.files.push(new r(i.uid, e))
								})
							}, 999);
							i.shimExec.call(this, "FileInput", "init", s(e.accept), e.multiple);
							this.trigger("ready")
						},
						setOption: function(e, t) {
							if (e == "accept") t = s(t);
							this.getRuntime().shimExec.call(this, "FileInput", "setOption", e, t)
						}
					};
					return e.FileInput = t
				});
				e("moxie/runtime/silverlight/file/FileDrop", ["moxie/runtime/silverlight/Runtime", "moxie/core/utils/Dom", "moxie/core/utils/Events"], function(e, n, r) {
					var t = {
						init: function() {
							var e = this,
								i = e.getRuntime(),
								t;
							t = i.getShimContainer();
							r.addEvent(t, "dragover", function(e) {
								e.preventDefault();
								e.stopPropagation();
								e.dataTransfer.dropEffect = "copy"
							}, e.uid);
							r.addEvent(t, "dragenter", function(e) {
								e.preventDefault();
								var t = n.get(i.uid).dragEnter(e);
								if (t) e.stopPropagation()
							}, e.uid);
							r.addEvent(t, "drop", function(e) {
								e.preventDefault();
								var t = n.get(i.uid).dragDrop(e);
								if (t) e.stopPropagation()
							}, e.uid);
							return i.shimExec.call(this, "FileDrop", "init")
						}
					};
					return e.FileDrop = t
				});
				e("moxie/runtime/silverlight/file/FileReader", ["moxie/runtime/silverlight/Runtime", "moxie/core/utils/Basic", "moxie/runtime/flash/file/FileReader"], function(e, t, i) {
					return e.FileReader = t.extend({}, i)
				});
				e("moxie/runtime/silverlight/file/FileReaderSync", ["moxie/runtime/silverlight/Runtime", "moxie/core/utils/Basic", "moxie/runtime/flash/file/FileReaderSync"], function(e, t, i) {
					return e.FileReaderSync = t.extend({}, i)
				});
				e("moxie/runtime/silverlight/runtime/Transporter", ["moxie/runtime/silverlight/Runtime", "moxie/core/utils/Basic", "moxie/runtime/flash/runtime/Transporter"], function(e, t, i) {
					return e.Transporter = t.extend({}, i)
				});
				e("moxie/runtime/silverlight/xhr/XMLHttpRequest", ["moxie/runtime/silverlight/Runtime", "moxie/core/utils/Basic", "moxie/runtime/flash/xhr/XMLHttpRequest", "moxie/runtime/silverlight/file/FileReaderSync", "moxie/runtime/silverlight/runtime/Transporter"], function(e, t, i, n, r) {
					return e.XMLHttpRequest = t.extend({}, i)
				});
				e("moxie/runtime/silverlight/image/Image", ["moxie/runtime/silverlight/Runtime", "moxie/core/utils/Basic", "moxie/file/Blob", "moxie/runtime/flash/image/Image"], function(e, i, n, t) {
					return e.Image = i.extend({}, t, {
						getInfo: function() {
							var e = this.getRuntime(),
								t = ["tiff", "exif", "gps", "thumb"],
								a = {
									meta: {}
								},
								s = e.shimExec.call(this, "Image", "getInfo");
							if (s.meta) {
								i.each(t, function(e) {
									var t = s.meta[e],
										i, n, r, o;
									if (t && t.keys) {
										a.meta[e] = {};
										for (n = 0, r = t.keys.length; n < r; n++) {
											i = t.keys[n];
											o = t[i];
											if (o) {
												if (/^(\d|[1-9]\d+)$/.test(o)) o = parseInt(o, 10);
												else if (/^\d*\.\d+$/.test(o)) o = parseFloat(o);
												a.meta[e][i] = o
											}
										}
									}
								});
								if (a.meta && a.meta.thumb && a.meta.thumb.data && !(e.meta.thumb.data instanceof n)) a.meta.thumb.data = new n(e.uid, a.meta.thumb.data)
							}
							a.width = parseInt(s.width, 10);
							a.height = parseInt(s.height, 10);
							a.size = parseInt(s.size, 10);
							a.type = s.type;
							a.name = s.name;
							return a
						},
						resize: function(e, t, i) {
							this.getRuntime().shimExec.call(this, "Image", "resize", e.x, e.y, e.width, e.height, t, i.preserveHeaders, i.resample)
						}
					})
				});
				e("moxie/runtime/html4/Runtime", ["moxie/core/utils/Basic", "moxie/core/Exceptions", "moxie/runtime/Runtime", "moxie/core/utils/Env"], function(r, e, o, a) {
					var s = "html4",
						u = {};

					function t(e) {
						var t = this,
							i = o.capTest,
							n = o.capTrue;
						o.call(this, e, s, {
							access_binary: i(window.FileReader || window.File && File.getAsDataURL),
							access_image_binary: false,
							display_media: i((a.can("create_canvas") || a.can("use_data_uri_over32kb")) && d("moxie/image/Image")),
							do_cors: false,
							drag_and_drop: false,
							filter_by_extension: i(function() {
								return !(a.browser === "Chrome" && a.verComp(a.version, 28, "<") || a.browser === "IE" && a.verComp(a.version, 10, "<") || a.browser === "Safari" && a.verComp(a.version, 7, "<") || a.browser === "Firefox" && a.verComp(a.version, 37, "<"))
							}()),
							resize_image: function() {
								return u.Image && t.can("access_binary") && a.can("create_canvas")
							},
							report_upload_progress: false,
							return_response_headers: false,
							return_response_type: function(e) {
								if (e === "json" && !! window.JSON) return true;
								return !!~r.inArray(e, ["text", "document", ""])
							},
							return_status_code: function(e) {
								return !r.arrayDiff(e, [200, 404])
							},
							select_file: function() {
								return a.can("use_fileinput")
							},
							select_multiple: false,
							send_binary_string: false,
							send_custom_headers: false,
							send_multipart: true,
							slice_blob: false,
							stream_upload: function() {
								return t.can("select_file")
							},
							summon_file_dialog: function() {
								return t.can("select_file") && !(a.browser === "Firefox" && a.verComp(a.version, 4, "<") || a.browser === "Opera" && a.verComp(a.version, 12, "<") || a.browser === "IE" && a.verComp(a.version, 10, "<"))
							},
							upload_filesize: n,
							use_http_method: function(e) {
								return !r.arrayDiff(e, ["GET", "POST"])
							}
						});
						r.extend(this, {
							init: function() {
								this.trigger("Init")
							},
							destroy: function(e) {
								return function() {
									e.call(t);
									e = t = null
								}
							}(this.destroy)
						});
						r.extend(this.getShim(), u)
					}
					o.addConstructor(s, t);
					return u
				});
				e("moxie/runtime/html4/file/FileInput", ["moxie/runtime/html4/Runtime", "moxie/file/File", "moxie/core/utils/Basic", "moxie/core/utils/Dom", "moxie/core/utils/Events", "moxie/core/utils/Mime", "moxie/core/utils/Env"], function(e, d, m, h, p, g, v) {
					function t() {
						var u, l = [],
							c, s;

						function f() {
							var t = this,
								i = t.getRuntime(),
								e, n, r, o, a, s;
							s = m.guid("uid_");
							e = i.getShimContainer();
							if (u) {
								r = h.get(u + "_form");
								if (r) {
									m.extend(r.style, {
										top: "100%"
									});
									r.firstChild.setAttribute("tabindex", -1)
								}
							}
							o = document.createElement("form");
							o.setAttribute("id", s + "_form");
							o.setAttribute("method", "post");
							o.setAttribute("enctype", "multipart/form-data");
							o.setAttribute("encoding", "multipart/form-data");
							m.extend(o.style, {
								overflow: "hidden",
								position: "absolute",
								top: 0,
								left: 0,
								width: "100%",
								height: "100%"
							});
							a = document.createElement("input");
							a.setAttribute("id", s);
							a.setAttribute("type", "file");
							a.setAttribute("accept", l.join(","));
							if (i.can("summon_file_dialog")) a.setAttribute("tabindex", -1);
							m.extend(a.style, {
								fontSize: "999px",
								opacity: 0
							});
							o.appendChild(a);
							e.appendChild(o);
							m.extend(a.style, {
								position: "absolute",
								top: 0,
								left: 0,
								width: "100%",
								height: "100%"
							});
							if (v.browser === "IE" && v.verComp(v.version, 10, "<")) m.extend(a.style, {
								filter: "progid:DXImageTransform.Microsoft.Alpha(opacity=0)"
							});
							a.onchange = function() {
								var e;
								if (!this.value) return;
								if (this.files) e = this.files[0];
								else e = {
									name: this.value
								};
								e = new d(i.uid, e);
								this.onchange = function() {};
								f.call(t);
								t.files = [e];
								a.setAttribute("id", e.uid);
								o.setAttribute("id", e.uid + "_form");
								t.trigger("change");
								a = o = null
							};
							if (i.can("summon_file_dialog")) {
								n = h.get(c.browse_button);
								p.removeEvent(n, "click", t.uid);
								p.addEvent(n, "click", function(e) {
									if (a && !a.disabled) a.click();
									e.preventDefault()
								}, t.uid)
							}
							u = s;
							e = r = n = null
						}
						m.extend(this, {
							init: function(n) {
								var r = this,
									o = r.getRuntime(),
									a;
								c = n;
								l = g.extList2mimes(n.accept, o.can("filter_by_extension"));
								a = o.getShimContainer();
								(function() {
									var e, t, i;
									e = h.get(n.browse_button);
									s = h.getStyle(e, "z-index") || "auto";
									if (o.can("summon_file_dialog")) {
										if (h.getStyle(e, "position") === "static") e.style.position = "relative";
										r.bind("Refresh", function() {
											t = parseInt(s, 10) || 1;
											h.get(c.browse_button).style.zIndex = t;
											this.getRuntime().getShimContainer().style.zIndex = t - 1
										})
									} else e.setAttribute("tabindex", -1);
									i = o.can("summon_file_dialog") ? e : a;
									p.addEvent(i, "mouseover", function() {
										r.trigger("mouseenter")
									}, r.uid);
									p.addEvent(i, "mouseout", function() {
										r.trigger("mouseleave")
									}, r.uid);
									p.addEvent(i, "mousedown", function() {
										r.trigger("mousedown")
									}, r.uid);
									p.addEvent(h.get(n.container), "mouseup", function() {
										r.trigger("mouseup")
									}, r.uid);
									e = null
								})();
								f.call(this);
								a = null;
								r.trigger({
									type: "ready",
									async: true
								})
							},
							setOption: function(e, t) {
								var i = this.getRuntime();
								var n;
								if (e == "accept") l = t.mimes || g.extList2mimes(t, i.can("filter_by_extension"));
								n = h.get(u);
								if (n) n.setAttribute("accept", l.join(","))
							},
							disable: function(e) {
								var t;
								if (t = h.get(u)) t.disabled = !! e
							},
							destroy: function() {
								var e = this.getRuntime(),
									t = e.getShim(),
									i = e.getShimContainer(),
									n = c && h.get(c.container),
									r = c && h.get(c.browse_button);
								if (n) p.removeAllEvents(n, this.uid);
								if (r) {
									p.removeAllEvents(r, this.uid);
									r.style.zIndex = s
								}
								if (i) {
									p.removeAllEvents(i, this.uid);
									i.innerHTML = ""
								}
								t.removeInstance(this.uid);
								u = l = c = i = n = r = t = null
							}
						})
					}
					return e.FileInput = t
				});
				e("moxie/runtime/html4/file/FileReader", ["moxie/runtime/html4/Runtime", "moxie/runtime/html5/file/FileReader"], function(e, t) {
					return e.FileReader = t
				});
				e("moxie/runtime/html4/xhr/XMLHttpRequest", ["moxie/runtime/html4/Runtime", "moxie/core/utils/Basic", "moxie/core/utils/Dom", "moxie/core/utils/Url", "moxie/core/Exceptions", "moxie/core/utils/Events", "moxie/file/Blob", "moxie/xhr/FormData"], function(e, m, h, p, g, v, x, w) {
					function t() {
						var l, c, f;

						function d(t) {
							var i = this,
								e, n, r, o, a = false;
							if (!f) return;
							e = f.id.replace(/_iframe$/, "");
							n = h.get(e + "_form");
							if (n) {
								r = n.getElementsByTagName("input");
								o = r.length;
								while (o--) switch (r[o].getAttribute("type")) {
								case "hidden":
									r[o].parentNode.removeChild(r[o]);
									break;
								case "file":
									a = true;
									break
								}
								r = [];
								if (!a) n.parentNode.removeChild(n);
								n = null
							}
							setTimeout(function() {
								v.removeEvent(f, "load", i.uid);
								if (f.parentNode) f.parentNode.removeChild(f);
								var e = i.getRuntime().getShimContainer();
								if (!e.children.length) e.parentNode.removeChild(e);
								e = f = null;
								t()
							}, 1)
						}
						m.extend(this, {
							send: function(i, e) {
								var n = this,
									r = n.getRuntime(),
									o, a, s, u;
								l = c = null;

								function t() {
									var e = r.getShimContainer() || document.body,
										t = document.createElement("div");
									t.innerHTML = '<iframe id="' + o + '_iframe" name="' + o + '_iframe" src="javascript:&quot;&quot;" style="display:none"></iframe>';
									f = t.firstChild;
									e.appendChild(f);
									v.addEvent(f, "load", function() {
										var e;
										try {
											e = f.contentWindow.document || f.contentDocument || window.frames[f.id].document;
											if (/^4(0[0-9]|1[0-7]|2[2346])\s/.test(e.title)) l = e.title.replace(/^(\d+).*$/, "$1");
											else {
												l = 200;
												c = m.trim(e.body.innerHTML);
												n.trigger({
													type: "progress",
													loaded: c.length,
													total: c.length
												});
												if (u) n.trigger({
													type: "uploadprogress",
													loaded: u.size || 1025,
													total: u.size || 1025
												})
											}
										} catch (e) {
											if (p.hasSameOrigin(i.url)) l = 404;
											else {
												d.call(n, function() {
													n.trigger("error")
												});
												return
											}
										}
										d.call(n, function() {
											n.trigger("load")
										})
									}, n.uid)
								}
								if (e instanceof w && e.hasBlob()) {
									u = e.getBlob();
									o = u.uid;
									s = h.get(o);
									a = h.get(o + "_form");
									if (!a) throw new g.DOMException(g.DOMException.NOT_FOUND_ERR)
								} else {
									o = m.guid("uid_");
									a = document.createElement("form");
									a.setAttribute("id", o + "_form");
									a.setAttribute("method", i.method);
									a.setAttribute("enctype", "multipart/form-data");
									a.setAttribute("encoding", "multipart/form-data");
									r.getShimContainer().appendChild(a)
								}
								a.setAttribute("target", o + "_iframe");
								if (e instanceof w) e.each(function(e, t) {
									if (e instanceof x) {
										if (s) s.setAttribute("name", t)
									} else {
										var i = document.createElement("input");
										m.extend(i, {
											type: "hidden",
											name: t,
											value: e
										});
										if (s) a.insertBefore(i, s);
										else a.appendChild(i)
									}
								});
								a.setAttribute("action", i.url);
								t();
								a.submit();
								n.trigger("loadstart")
							},
							getStatus: function() {
								return l
							},
							getResponse: function(e) {
								if ("json" === e) {
									if (m.typeOf(c) === "string" && !! window.JSON) try {
										return JSON.parse(c.replace(/^\s*<pre[^>]*>/, "").replace(/<\/pre>\s*$/, ""))
									} catch (e) {
										return null
									}
								} else if ("document" === e);
								return c
							},
							abort: function() {
								var e = this;
								if (f && f.contentWindow) if (f.contentWindow.stop) f.contentWindow.stop();
								else if (f.contentWindow.document.execCommand) f.contentWindow.document.execCommand("Stop");
								else f.src = "about:blank";
								d.call(this, function() {
									e.dispatchEvent("abort")
								})
							},
							destroy: function() {
								this.getRuntime().getShim().removeInstance(this.uid)
							}
						})
					}
					return e.XMLHttpRequest = t
				});
				e("moxie/runtime/html4/image/Image", ["moxie/runtime/html4/Runtime", "moxie/runtime/html5/image/Image"], function(e, t) {
					return e.Image = t
				});
				t(["moxie/core/utils/Basic", "moxie/core/utils/Encode", "moxie/core/utils/Env", "moxie/core/Exceptions", "moxie/core/utils/Dom", "moxie/core/EventTarget", "moxie/runtime/Runtime", "moxie/runtime/RuntimeClient", "moxie/file/Blob", "moxie/core/I18n", "moxie/core/utils/Mime", "moxie/file/FileInput", "moxie/file/File", "moxie/file/FileDrop", "moxie/file/FileReader", "moxie/core/utils/Url", "moxie/runtime/RuntimeTarget", "moxie/xhr/FormData", "moxie/xhr/XMLHttpRequest", "moxie/image/Image", "moxie/core/utils/Events", "moxie/runtime/html5/image/ResizerCanvas"])
			})(this)
		}.apply(e, arguments), e.moxie
	}
	"function" == typeof define && define.amd ? define("moxie", [], t) : "object" == typeof module && module.exports ? module.exports = t() : e.moxie = t()
}(this || window);