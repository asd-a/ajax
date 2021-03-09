!function($) {
    var Timepicker, isEmptyObject, extendRemove, detectSupport, convert24to12, computeEffectiveSetting, splitDateTime, parseDateTimeInternal, selectLocalTimezone;
    $.ui.timepicker = $.ui.timepicker || {}, $.ui.timepicker.version || ($.extend($.ui, {
        timepicker: {
            version: "1.4"
        }
    }), Timepicker = function() {
        this.regional = [], this.regional[""] = {
            currentText: "Now",
            closeText: "Done",
            amNames: [ "AM", "A" ],
            pmNames: [ "PM", "P" ],
            timeFormat: "HH:mm",
            timeSuffix: "",
            timeOnlyTitle: "Choose Time",
            timeText: "Time",
            hourText: "Hour",
            minuteText: "Minute",
            secondText: "Second",
            millisecText: "Millisecond",
            microsecText: "Microsecond",
            timezoneText: "Time Zone",
            isRTL: !1
        }, this._defaults = {
            showButtonPanel: !0,
            timeOnly: !1,
            showHour: null,
            showMinute: null,
            showSecond: null,
            showMillisec: null,
            showMicrosec: null,
            showTimezone: null,
            showTime: !0,
            stepHour: 1,
            stepMinute: 1,
            stepSecond: 1,
            stepMillisec: 1,
            stepMicrosec: 1,
            hour: 0,
            minute: 0,
            second: 0,
            millisec: 0,
            microsec: 0,
            timezone: null,
            hourMin: 0,
            minuteMin: 0,
            secondMin: 0,
            millisecMin: 0,
            microsecMin: 0,
            hourMax: 23,
            minuteMax: 59,
            secondMax: 59,
            millisecMax: 999,
            microsecMax: 999,
            minDateTime: null,
            maxDateTime: null,
            onSelect: null,
            hourGrid: 0,
            minuteGrid: 0,
            secondGrid: 0,
            millisecGrid: 0,
            microsecGrid: 0,
            alwaysSetTime: !0,
            separator: " ",
            altFieldTimeOnly: !0,
            altTimeFormat: null,
            altSeparator: null,
            altTimeSuffix: null,
            pickerTimeFormat: null,
            pickerTimeSuffix: null,
            showTimepicker: !0,
            timezoneList: null,
            addSliderAccess: !1,
            sliderAccessArgs: null,
            controlType: "slider",
            defaultValue: null,
            parse: "strict"
        }, $.extend(this._defaults, this.regional[""]);
    }, $.extend(Timepicker.prototype, {
        $input: null,
        $altInput: null,
        $timeObj: null,
        inst: null,
        hour_slider: null,
        minute_slider: null,
        second_slider: null,
        millisec_slider: null,
        microsec_slider: null,
        timezone_select: null,
        hour: 0,
        minute: 0,
        second: 0,
        millisec: 0,
        microsec: 0,
        timezone: null,
        hourMinOriginal: null,
        minuteMinOriginal: null,
        secondMinOriginal: null,
        millisecMinOriginal: null,
        microsecMinOriginal: null,
        hourMaxOriginal: null,
        minuteMaxOriginal: null,
        secondMaxOriginal: null,
        millisecMaxOriginal: null,
        microsecMaxOriginal: null,
        ampm: "",
        formattedDate: "",
        formattedTime: "",
        formattedDateTime: "",
        timezoneList: null,
        units: [ "hour", "minute", "second", "millisec", "microsec" ],
        support: {},
        control: null,
        setDefaults: function(a) {
            return extendRemove(this._defaults, a || {}), this;
        },
        _newInst: function($input, opts) {
            var overrides, i, attrName, attrValue, timezoneList, tzl, tzi, tzv, tp_inst = new Timepicker(), inlineSettings = {}, fns = {};
            for (attrName in this._defaults) if (this._defaults.hasOwnProperty(attrName) && (attrValue = $input.attr("time:" + attrName))) try {
                inlineSettings[attrName] = eval(attrValue);
            } catch (err) {
                inlineSettings[attrName] = attrValue;
            }
            for (i in overrides = {
                beforeShow: function(a, b) {
                    return $.isFunction(tp_inst._defaults.evnts.beforeShow) ? tp_inst._defaults.evnts.beforeShow.call($input[0], a, b, tp_inst) : void 0;
                },
                onChangeMonthYear: function(a, b, c) {
                    tp_inst._updateDateTime(c), $.isFunction(tp_inst._defaults.evnts.onChangeMonthYear) && tp_inst._defaults.evnts.onChangeMonthYear.call($input[0], a, b, c, tp_inst);
                },
                onClose: function(a, b) {
                    !0 === tp_inst.timeDefined && "" !== $input.val() && tp_inst._updateDateTime(b), 
                    $.isFunction(tp_inst._defaults.evnts.onClose) && tp_inst._defaults.evnts.onClose.call($input[0], a, b, tp_inst);
                }
            }) overrides.hasOwnProperty(i) && (fns[i] = opts[i] || null);
            if (tp_inst._defaults = $.extend({}, this._defaults, inlineSettings, opts, overrides, {
                evnts: fns,
                timepicker: tp_inst
            }), tp_inst.amNames = $.map(tp_inst._defaults.amNames, function(a) {
                return a.toUpperCase();
            }), tp_inst.pmNames = $.map(tp_inst._defaults.pmNames, function(a) {
                return a.toUpperCase();
            }), tp_inst.support = detectSupport(tp_inst._defaults.timeFormat + (tp_inst._defaults.pickerTimeFormat || "") + (tp_inst._defaults.altTimeFormat || "")), 
            "string" == typeof tp_inst._defaults.controlType ? ("slider" === tp_inst._defaults.controlType && void 0 === $.ui.slider && (tp_inst._defaults.controlType = "select"), 
            tp_inst.control = tp_inst._controls[tp_inst._defaults.controlType]) : tp_inst.control = tp_inst._defaults.controlType, 
            timezoneList = [ -720, -660, -600, -570, -540, -480, -420, -360, -300, -270, -240, -210, -180, -120, -60, 0, 60, 120, 180, 210, 240, 270, 300, 330, 345, 360, 390, 420, 480, 525, 540, 570, 600, 630, 660, 690, 720, 765, 780, 840 ], 
            null !== tp_inst._defaults.timezoneList && (timezoneList = tp_inst._defaults.timezoneList), 
            tzl = timezoneList.length, tzi = 0, tzv = null, tzl > 0 && "object" != typeof timezoneList[0]) for (;tzl > tzi; tzi++) tzv = timezoneList[tzi], 
            timezoneList[tzi] = {
                value: tzv,
                label: $.timepicker.timezoneOffsetString(tzv, tp_inst.support.iso8601)
            };
            return tp_inst._defaults.timezoneList = timezoneList, tp_inst.timezone = null !== tp_inst._defaults.timezone ? $.timepicker.timezoneOffsetNumber(tp_inst._defaults.timezone) : -1 * new Date().getTimezoneOffset(), 
            tp_inst.hour = tp_inst._defaults.hour < tp_inst._defaults.hourMin ? tp_inst._defaults.hourMin : tp_inst._defaults.hour > tp_inst._defaults.hourMax ? tp_inst._defaults.hourMax : tp_inst._defaults.hour, 
            tp_inst.minute = tp_inst._defaults.minute < tp_inst._defaults.minuteMin ? tp_inst._defaults.minuteMin : tp_inst._defaults.minute > tp_inst._defaults.minuteMax ? tp_inst._defaults.minuteMax : tp_inst._defaults.minute, 
            tp_inst.second = tp_inst._defaults.second < tp_inst._defaults.secondMin ? tp_inst._defaults.secondMin : tp_inst._defaults.second > tp_inst._defaults.secondMax ? tp_inst._defaults.secondMax : tp_inst._defaults.second, 
            tp_inst.millisec = tp_inst._defaults.millisec < tp_inst._defaults.millisecMin ? tp_inst._defaults.millisecMin : tp_inst._defaults.millisec > tp_inst._defaults.millisecMax ? tp_inst._defaults.millisecMax : tp_inst._defaults.millisec, 
            tp_inst.microsec = tp_inst._defaults.microsec < tp_inst._defaults.microsecMin ? tp_inst._defaults.microsecMin : tp_inst._defaults.microsec > tp_inst._defaults.microsecMax ? tp_inst._defaults.microsecMax : tp_inst._defaults.microsec, 
            tp_inst.ampm = "", tp_inst.$input = $input, tp_inst._defaults.altField && (tp_inst.$altInput = $(tp_inst._defaults.altField).css({
                cursor: "pointer"
            }).focus(function() {
                $input.trigger("focus");
            })), 0 !== tp_inst._defaults.minDate && 0 !== tp_inst._defaults.minDateTime || (tp_inst._defaults.minDate = new Date()), 
            0 !== tp_inst._defaults.maxDate && 0 !== tp_inst._defaults.maxDateTime || (tp_inst._defaults.maxDate = new Date()), 
            void 0 !== tp_inst._defaults.minDate && tp_inst._defaults.minDate instanceof Date && (tp_inst._defaults.minDateTime = new Date(tp_inst._defaults.minDate.getTime())), 
            void 0 !== tp_inst._defaults.minDateTime && tp_inst._defaults.minDateTime instanceof Date && (tp_inst._defaults.minDate = new Date(tp_inst._defaults.minDateTime.getTime())), 
            void 0 !== tp_inst._defaults.maxDate && tp_inst._defaults.maxDate instanceof Date && (tp_inst._defaults.maxDateTime = new Date(tp_inst._defaults.maxDate.getTime())), 
            void 0 !== tp_inst._defaults.maxDateTime && tp_inst._defaults.maxDateTime instanceof Date && (tp_inst._defaults.maxDate = new Date(tp_inst._defaults.maxDateTime.getTime())), 
            tp_inst.$input.bind("focus", function() {
                tp_inst._onFocus();
            }), tp_inst;
        },
        _addTimePicker: function(a) {
            var b = this.$altInput && this._defaults.altFieldTimeOnly ? this.$input.val() + " " + this.$altInput.val() : this.$input.val();
            this.timeDefined = this._parseTime(b), this._limitMinMaxDateTime(a, !1), this._injectTimePicker();
        },
        _parseTime: function(a, b) {
            var c, d;
            if (this.inst || (this.inst = $.datepicker._getInst(this.$input[0])), b || !this._defaults.timeOnly) {
                c = $.datepicker._get(this.inst, "dateFormat");
                try {
                    if (d = parseDateTimeInternal(c, this._defaults.timeFormat, a, $.datepicker._getFormatConfig(this.inst), this._defaults), 
                    !d.timeObj) return !1;
                    $.extend(this, d.timeObj);
                } catch (b) {
                    return $.timepicker.log("Error parsing the date/time string: " + b + "\ndate/time string = " + a + "\ntimeFormat = " + this._defaults.timeFormat + "\ndateFormat = " + c), 
                    !1;
                }
                return !0;
            }
            return b = $.datepicker.parseTime(this._defaults.timeFormat, a, this._defaults), 
            !!b && ($.extend(this, b), !0);
        },
        _injectTimePicker: function() {
            var a, l, m, n, o, p, q, r, s, t, b = this.inst.dpDiv, c = this.inst.settings, d = this, e = "", f = "", g = null, h = {}, i = {}, j = 0, k = 0;
            if (0 === b.find("div.ui-timepicker-div").length && c.showTimepicker) {
                for (l = ' style="display:none;"', m = '<div class="ui-timepicker-div' + (c.isRTL ? " ui-timepicker-rtl" : "") + '"><dl><dt class="ui_tpicker_time_label"' + (c.showTime ? "" : l) + ">" + c.timeText + '</dt><dd class="ui_tpicker_time"' + (c.showTime ? "" : l) + "></dd>", 
                j = 0, k = this.units.length; k > j; j++) {
                    if (g = null !== c["show" + (f = (e = this.units[j]).substr(0, 1).toUpperCase() + e.substr(1))] ? c["show" + f] : this.support[e], 
                    h[e] = parseInt(c[e + "Max"] - (c[e + "Max"] - c[e + "Min"]) % c["step" + f], 10), 
                    i[e] = 0, m += '<dt class="ui_tpicker_' + e + '_label"' + (g ? "" : l) + ">" + c[e + "Text"] + '</dt><dd class="ui_tpicker_' + e + '"><div class="ui_tpicker_' + e + '_slider"' + (g ? "" : l) + "></div>", 
                    g && 0 < c[e + "Grid"]) {
                        if (m += '<div style="padding-left: 1px"><table class="ui-tpicker-grid-label"><tr>', 
                        "hour" === e) for (n = c[e + "Min"]; n <= h[e]; n += parseInt(c[e + "Grid"], 10)) i[e]++, 
                        o = $.datepicker.formatTime(this.support.ampm ? "hht" : "HH", {
                            hour: n
                        }, c), m += '<td data-for="' + e + '">' + o + "</td>"; else for (p = c[e + "Min"]; p <= h[e]; p += parseInt(c[e + "Grid"], 10)) i[e]++, 
                        m += '<td data-for="' + e + '">' + (10 > p ? "0" : "") + p + "</td>";
                        m += "</tr></table></div>";
                    }
                    m += "</dd>";
                }
                for (q = null !== c.showTimezone ? c.showTimezone : this.support.timezone, m += '<dt class="ui_tpicker_timezone_label"' + (q ? "" : l) + ">" + c.timezoneText + "</dt>", 
                m += '<dd class="ui_tpicker_timezone" ' + (q ? "" : l) + "></dd>", r = $(m += "</dl></div>"), 
                !0 === c.timeOnly && (r.prepend('<div class="ui-widget-header ui-helper-clearfix ui-corner-all"><div class="ui-datepicker-title">' + c.timeOnlyTitle + "</div></div>"), 
                b.find(".ui-datepicker-header, .ui-datepicker-calendar").hide()), j = 0, k = d.units.length; k > j; j++) g = null !== c["show" + (f = (e = d.units[j]).substr(0, 1).toUpperCase() + e.substr(1))] ? c["show" + f] : this.support[e], 
                d[e + "_slider"] = d.control.create(d, r.find(".ui_tpicker_" + e + "_slider"), e, d[e], c[e + "Min"], h[e], c["step" + f]), 
                g && 0 < c[e + "Grid"] && (a = 100 * i[e] * c[e + "Grid"] / (h[e] - c[e + "Min"]), 
                r.find(".ui_tpicker_" + e + " table").css({
                    width: a + "%",
                    marginLeft: c.isRTL ? "0" : a / (-2 * i[e]) + "%",
                    marginRight: c.isRTL ? a / (-2 * i[e]) + "%" : "0",
                    borderCollapse: "collapse"
                }).find("td").click(function() {
                    var b = $(this), c = b.html(), f = parseInt(c.replace(/[^0-9]/g), 10), c = c.replace(/[^apm]/gi), b = b.data("for");
                    "hour" === b && (-1 !== c.indexOf("p") && 12 > f ? f += 12 : -1 !== c.indexOf("a") && 12 === f && (f = 0)), 
                    d.control.value(d, d[b + "_slider"], e, f), d._onTimeChange(), d._onSelectHandler();
                }).css({
                    cursor: "pointer",
                    width: 100 / i[e] + "%",
                    textAlign: "center",
                    overflow: "hidden"
                }));
                this.timezone_select = r.find(".ui_tpicker_timezone").append("<select></select>").find("select"), 
                $.fn.append.apply(this.timezone_select, $.map(c.timezoneList, function(a) {
                    return $("<option />").val("object" == typeof a ? a.value : a).text("object" == typeof a ? a.label : a);
                })), void 0 !== this.timezone && null !== this.timezone && "" !== this.timezone ? -1 * new Date(this.inst.selectedYear, this.inst.selectedMonth, this.inst.selectedDay, 12).getTimezoneOffset() === this.timezone ? selectLocalTimezone(d) : this.timezone_select.val(this.timezone) : void 0 !== this.hour && null !== this.hour && "" !== this.hour ? this.timezone_select.val(c.timezone) : selectLocalTimezone(d), 
                this.timezone_select.change(function() {
                    d._onTimeChange(), d._onSelectHandler();
                }), q = b.find(".ui-datepicker-buttonpane"), q.length ? q.before(r) : b.append(r), 
                this.$timeObj = r.find(".ui_tpicker_time"), null !== this.inst && (b = this.timeDefined, 
                this._onTimeChange(), this.timeDefined = b), this._defaults.addSliderAccess && (s = this._defaults.sliderAccessArgs, 
                t = this._defaults.isRTL, s.isRTL = t, setTimeout(function() {
                    var a;
                    0 === r.find(".ui-slider-access").length && (r.find(".ui-slider:visible").sliderAccess(s), 
                    (a = r.find(".ui-slider-access:eq(0)").outerWidth(!0)) && r.find("table:visible").each(function() {
                        var b = $(this), c = b.outerWidth(), d = b.css(t ? "marginRight" : "marginLeft").toString().replace("%", ""), e = c - a, c = d * e / c + "%", e = {
                            width: e,
                            marginRight: 0,
                            marginLeft: 0
                        };
                        e[t ? "marginRight" : "marginLeft"] = c, b.css(e);
                    }));
                }, 10)), d._limitMinMaxDateTime(this.inst, !0);
            }
        },
        _limitMinMaxDateTime: function(a, b) {
            var c, d, e, f, g = this._defaults, h = new Date(a.selectedYear, a.selectedMonth, a.selectedDay);
            this._defaults.showTimepicker && (null !== $.datepicker._get(a, "minDateTime") && void 0 !== $.datepicker._get(a, "minDateTime") && h && (c = $.datepicker._get(a, "minDateTime"), 
            d = new Date(c.getFullYear(), c.getMonth(), c.getDate(), 0, 0, 0, 0), null !== this.hourMinOriginal && null !== this.minuteMinOriginal && null !== this.secondMinOriginal && null !== this.millisecMinOriginal && null !== this.microsecMinOriginal || (this.hourMinOriginal = g.hourMin, 
            this.minuteMinOriginal = g.minuteMin, this.secondMinOriginal = g.secondMin, this.millisecMinOriginal = g.millisecMin, 
            this.microsecMinOriginal = g.microsecMin), a.settings.timeOnly || d.getTime() === h.getTime() ? (this._defaults.hourMin = c.getHours(), 
            this.hour <= this._defaults.hourMin ? (this.hour = this._defaults.hourMin, this._defaults.minuteMin = c.getMinutes(), 
            this.minute <= this._defaults.minuteMin ? (this.minute = this._defaults.minuteMin, 
            this._defaults.secondMin = c.getSeconds(), this.second <= this._defaults.secondMin ? (this.second = this._defaults.secondMin, 
            this._defaults.millisecMin = c.getMilliseconds(), this.millisec <= this._defaults.millisecMin ? (this.millisec = this._defaults.millisecMin, 
            this._defaults.microsecMin = c.getMicroseconds()) : (this.microsec < this._defaults.microsecMin && (this.microsec = this._defaults.microsecMin), 
            this._defaults.microsecMin = this.microsecMinOriginal)) : (this._defaults.millisecMin = this.millisecMinOriginal, 
            this._defaults.microsecMin = this.microsecMinOriginal)) : (this._defaults.secondMin = this.secondMinOriginal, 
            this._defaults.millisecMin = this.millisecMinOriginal, this._defaults.microsecMin = this.microsecMinOriginal)) : (this._defaults.minuteMin = this.minuteMinOriginal, 
            this._defaults.secondMin = this.secondMinOriginal, this._defaults.millisecMin = this.millisecMinOriginal, 
            this._defaults.microsecMin = this.microsecMinOriginal)) : (this._defaults.hourMin = this.hourMinOriginal, 
            this._defaults.minuteMin = this.minuteMinOriginal, this._defaults.secondMin = this.secondMinOriginal, 
            this._defaults.millisecMin = this.millisecMinOriginal, this._defaults.microsecMin = this.microsecMinOriginal)), 
            null !== $.datepicker._get(a, "maxDateTime") && void 0 !== $.datepicker._get(a, "maxDateTime") && h && (f = $.datepicker._get(a, "maxDateTime"), 
            e = new Date(f.getFullYear(), f.getMonth(), f.getDate(), 0, 0, 0, 0), null !== this.hourMaxOriginal && null !== this.minuteMaxOriginal && null !== this.secondMaxOriginal && null !== this.millisecMaxOriginal || (this.hourMaxOriginal = g.hourMax, 
            this.minuteMaxOriginal = g.minuteMax, this.secondMaxOriginal = g.secondMax, this.millisecMaxOriginal = g.millisecMax, 
            this.microsecMaxOriginal = g.microsecMax), a.settings.timeOnly || e.getTime() === h.getTime() ? (this._defaults.hourMax = f.getHours(), 
            this.hour >= this._defaults.hourMax ? (this.hour = this._defaults.hourMax, this._defaults.minuteMax = f.getMinutes(), 
            this.minute >= this._defaults.minuteMax ? (this.minute = this._defaults.minuteMax, 
            this._defaults.secondMax = f.getSeconds(), this.second >= this._defaults.secondMax ? (this.second = this._defaults.secondMax, 
            this._defaults.millisecMax = f.getMilliseconds(), this.millisec >= this._defaults.millisecMax ? (this.millisec = this._defaults.millisecMax, 
            this._defaults.microsecMax = f.getMicroseconds()) : (this.microsec > this._defaults.microsecMax && (this.microsec = this._defaults.microsecMax), 
            this._defaults.microsecMax = this.microsecMaxOriginal)) : (this._defaults.millisecMax = this.millisecMaxOriginal, 
            this._defaults.microsecMax = this.microsecMaxOriginal)) : (this._defaults.secondMax = this.secondMaxOriginal, 
            this._defaults.millisecMax = this.millisecMaxOriginal, this._defaults.microsecMax = this.microsecMaxOriginal)) : (this._defaults.minuteMax = this.minuteMaxOriginal, 
            this._defaults.secondMax = this.secondMaxOriginal, this._defaults.millisecMax = this.millisecMaxOriginal, 
            this._defaults.microsecMax = this.microsecMaxOriginal)) : (this._defaults.hourMax = this.hourMaxOriginal, 
            this._defaults.minuteMax = this.minuteMaxOriginal, this._defaults.secondMax = this.secondMaxOriginal, 
            this._defaults.millisecMax = this.millisecMaxOriginal, this._defaults.microsecMax = this.microsecMaxOriginal)), 
            void 0 !== b && !0 === b && (a = parseInt(this._defaults.hourMax - (this._defaults.hourMax - this._defaults.hourMin) % this._defaults.stepHour, 10), 
            e = parseInt(this._defaults.minuteMax - (this._defaults.minuteMax - this._defaults.minuteMin) % this._defaults.stepMinute, 10), 
            h = parseInt(this._defaults.secondMax - (this._defaults.secondMax - this._defaults.secondMin) % this._defaults.stepSecond, 10), 
            f = parseInt(this._defaults.millisecMax - (this._defaults.millisecMax - this._defaults.millisecMin) % this._defaults.stepMillisec, 10), 
            b = parseInt(this._defaults.microsecMax - (this._defaults.microsecMax - this._defaults.microsecMin) % this._defaults.stepMicrosec, 10), 
            this.hour_slider && (this.control.options(this, this.hour_slider, "hour", {
                min: this._defaults.hourMin,
                max: a
            }), this.control.value(this, this.hour_slider, "hour", this.hour - this.hour % this._defaults.stepHour)), 
            this.minute_slider && (this.control.options(this, this.minute_slider, "minute", {
                min: this._defaults.minuteMin,
                max: e
            }), this.control.value(this, this.minute_slider, "minute", this.minute - this.minute % this._defaults.stepMinute)), 
            this.second_slider && (this.control.options(this, this.second_slider, "second", {
                min: this._defaults.secondMin,
                max: h
            }), this.control.value(this, this.second_slider, "second", this.second - this.second % this._defaults.stepSecond)), 
            this.millisec_slider && (this.control.options(this, this.millisec_slider, "millisec", {
                min: this._defaults.millisecMin,
                max: f
            }), this.control.value(this, this.millisec_slider, "millisec", this.millisec - this.millisec % this._defaults.stepMillisec)), 
            this.microsec_slider && (this.control.options(this, this.microsec_slider, "microsec", {
                min: this._defaults.microsecMin,
                max: b
            }), this.control.value(this, this.microsec_slider, "microsec", this.microsec - this.microsec % this._defaults.stepMicrosec))));
        },
        _onTimeChange: function() {
            var a, b, c, d, e, f, g, h, i, j, k;
            this._defaults.showTimepicker && (a = !!this.hour_slider && this.control.value(this, this.hour_slider, "hour"), 
            b = !!this.minute_slider && this.control.value(this, this.minute_slider, "minute"), 
            c = !!this.second_slider && this.control.value(this, this.second_slider, "second"), 
            d = !!this.millisec_slider && this.control.value(this, this.millisec_slider, "millisec"), 
            e = !!this.microsec_slider && this.control.value(this, this.microsec_slider, "microsec"), 
            f = !!this.timezone_select && this.timezone_select.val(), h = (g = this._defaults).pickerTimeFormat || g.timeFormat, 
            i = g.pickerTimeSuffix || g.timeSuffix, "object" == typeof a && (a = !1), "object" == typeof b && (b = !1), 
            "object" == typeof c && (c = !1), "object" == typeof d && (d = !1), "object" == typeof e && (e = !1), 
            "object" == typeof f && (f = !1), !1 !== a && (a = parseInt(a, 10)), !1 !== b && (b = parseInt(b, 10)), 
            !1 !== c && (c = parseInt(c, 10)), !1 !== d && (d = parseInt(d, 10)), !1 !== e && (e = parseInt(e, 10)), 
            j = g[12 > a ? "amNames" : "pmNames"][0], (k = a !== this.hour || b !== this.minute || c !== this.second || d !== this.millisec || e !== this.microsec || 0 < this.ampm.length && 12 > a != (-1 !== $.inArray(this.ampm.toUpperCase(), this.amNames)) || null !== this.timezone && f !== this.timezone) && (!1 !== a && (this.hour = a), 
            !1 !== b && (this.minute = b), !1 !== c && (this.second = c), !1 !== d && (this.millisec = d), 
            !1 !== e && (this.microsec = e), !1 !== f && (this.timezone = f), this.inst || (this.inst = $.datepicker._getInst(this.$input[0])), 
            this._limitMinMaxDateTime(this.inst, !0)), this.support.ampm && (this.ampm = j), 
            this.formattedTime = $.datepicker.formatTime(g.timeFormat, this, g), this.$timeObj && (h === g.timeFormat ? this.$timeObj.text(this.formattedTime + i) : this.$timeObj.text($.datepicker.formatTime(h, this, g) + i)), 
            this.timeDefined = !0, k && this._updateDateTime());
        },
        _onSelectHandler: function() {
            var a = this._defaults.onSelect || this.inst.settings.onSelect, b = this.$input ? this.$input[0] : null;
            a && b && a.apply(b, [ this.formattedDateTime, this ]);
        },
        _updateDateTime: function(a) {
            var b = 0 < (a = this.inst || a).currentYear ? new Date(a.currentYear, a.currentMonth, a.currentDay) : new Date(a.selectedYear, a.selectedMonth, a.selectedDay), c = $.datepicker._daylightSavingAdjust(b), d = $.datepicker._get(a, "dateFormat"), e = $.datepicker._getFormatConfig(a), f = null !== c && this.timeDefined;
            this.formattedDate = $.datepicker.formatDate(d, null === c ? new Date() : c, e), 
            b = this.formattedDate, "" === a.lastVa && (a.currentYear = a.selectedYear, a.currentMonth = a.selectedMonth, 
            a.currentDay = a.selectedDay), !0 === this._defaults.timeOnly ? b = this.formattedTime : !0 !== this._defaults.timeOnly && (this._defaults.alwaysSetTime || f) && (b += this._defaults.separator + this.formattedTime + this._defaults.timeSuffix), 
            this.formattedDateTime = b, this._defaults.showTimepicker ? this.$altInput && !1 === this._defaults.timeOnly && !0 === this._defaults.altFieldTimeOnly ? (this.$altInput.val(this.formattedTime), 
            this.$input.val(this.formattedDate)) : this.$altInput ? (this.$input.val(b), d = "", 
            a = this._defaults.altSeparator || this._defaults.separator, f = this._defaults.altTimeSuffix || this._defaults.timeSuffix, 
            this._defaults.timeOnly || (d = this._defaults.altFormat ? $.datepicker.formatDate(this._defaults.altFormat, null === c ? new Date() : c, e) : this.formattedDate) && (d += a), 
            d += this._defaults.altTimeFormat ? $.datepicker.formatTime(this._defaults.altTimeFormat, this, this._defaults) + f : this.formattedTime + f, 
            this.$altInput.val(d)) : this.$input.val(b) : this.$input.val(this.formattedDate), 
            this.$input.trigger("change");
        },
        _onFocus: function() {
            if (!this.$input.val() && this._defaults.defaultValue) {
                this.$input.val(this._defaults.defaultValue);
                var a = $.datepicker._getInst(this.$input.get(0)), b = $.datepicker._get(a, "timepicker");
                if (b && b._defaults.timeOnly && a.input.val() !== a.lastVal) try {
                    $.datepicker._updateDatepicker(a);
                } catch (a) {
                    $.timepicker.log(a);
                }
            }
        },
        _controls: {
            slider: {
                create: function(a, b, c, d, e, f, g) {
                    var h = a._defaults.isRTL;
                    return b.prop("slide", null).slider({
                        orientation: "horizontal",
                        value: h ? -1 * d : d,
                        min: h ? -1 * f : e,
                        max: h ? -1 * e : f,
                        step: g,
                        slide: function(b, d) {
                            a.control.value(a, $(this), c, h ? -1 * d.value : d.value), a._onTimeChange();
                        },
                        stop: function() {
                            a._onSelectHandler();
                        }
                    });
                },
                options: function(a, b, c, d, e) {
                    if (a._defaults.isRTL) {
                        if ("string" == typeof d) return "min" === d || "max" === d ? void 0 !== e ? b.slider(d, -1 * e) : Math.abs(b.slider(d)) : b.slider(d);
                        var f = d.min, a = d.max;
                        return d.min = d.max = null, void 0 !== f && (d.max = -1 * f), void 0 !== a && (d.min = -1 * a), 
                        b.slider(d);
                    }
                    return "string" == typeof d && void 0 !== e ? b.slider(d, e) : b.slider(d);
                },
                value: function(a, b, c, d) {
                    return a._defaults.isRTL ? void 0 !== d ? b.slider("value", -1 * d) : Math.abs(b.slider("value")) : void 0 !== d ? b.slider("value", d) : b.slider("value");
                }
            },
            select: {
                create: function(a, b, c, d, e, f, g) {
                    for (var h = '<select class="ui-timepicker-select" data-unit="' + c + '" data-min="' + e + '" data-max="' + f + '" data-step="' + g + '">', i = a._defaults.pickerTimeFormat || a._defaults.timeFormat, j = e; f >= j; j += g) h += '<option value="' + j + '"' + (j === d ? " selected" : "") + ">", 
                    h += "hour" === c ? $.datepicker.formatTime($.trim(i.replace(/[^ht ]/gi, "")), {
                        hour: j
                    }, a._defaults) : "millisec" === c || "microsec" === c || j >= 10 ? j : "0" + j.toString(), 
                    h += "</option>";
                    return h += "</select>", b.children("select").remove(), $(h).appendTo(b).change(function() {
                        a._onTimeChange(), a._onSelectHandler();
                    }), b;
                },
                options: function(a, b, c, d, e) {
                    var f = {}, g = b.children("select");
                    if ("string" == typeof d) {
                        if (void 0 === e) return g.data(d);
                        f[d] = e;
                    } else f = d;
                    return a.control.create(a, b, g.data("unit"), g.val(), f.min || g.data("min"), f.max || g.data("max"), f.step || g.data("step"));
                },
                value: function(a, b, c, d) {
                    return b = b.children("select"), void 0 !== d ? b.val(d) : b.val();
                }
            }
        }
    }), $.fn.extend({
        timepicker: function(a) {
            a = a || {};
            var b = Array.prototype.slice.call(arguments);
            return "object" == typeof a && (b[0] = $.extend(a, {
                timeOnly: !0
            })), $(this).each(function() {
                $.fn.datetimepicker.apply($(this), b);
            });
        },
        datetimepicker: function(a) {
            var b = arguments;
            return "string" == typeof (a = a || {}) ? "getDate" === a ? $.fn.datepicker.apply($(this[0]), b) : this.each(function() {
                var a = $(this);
                a.datepicker.apply(a, b);
            }) : this.each(function() {
                var b = $(this);
                b.datepicker($.timepicker._newInst(b, a)._defaults);
            });
        }
    }), $.datepicker.parseDateTime = function(a, b, c, d, e) {
        return d = parseDateTimeInternal(a, b, c, d, e), d.timeObj && (e = d.timeObj, d.date.setHours(e.hour, e.minute, e.second, e.millisec), 
        d.date.setMicroseconds(e.microsec)), d.date;
    }, $.datepicker.parseTime = function(a, b, c) {
        function d(a, b, c) {
            var d = "^" + a.toString().replace(/([hH]{1,2}|mm?|ss?|[tT]{1,2}|[zZ]|[lc]|'.*?')/g, function(a) {
                var b, d, e, f = a.length;
                switch (a.charAt(0).toLowerCase()) {
                  case "h":
                  case "m":
                  case "s":
                    return 1 === f ? "(\\d?\\d)" : "(\\d{" + f + "})";

                  case "l":
                  case "c":
                    return "(\\d?\\d?\\d)";

                  case "z":
                    return "(z|[-+]\\d\\d:?\\d\\d|\\S+)?";

                  case "t":
                    return b = c.amNames, d = c.pmNames, e = [], b && $.merge(e, b), d && $.merge(e, d), 
                    "(" + (e = $.map(e, function(a) {
                        return a.replace(/[.*+?|()\[\]{}\\]/g, "\\$&");
                    })).join("|") + ")?";

                  default:
                    return "(" + a.replace(/\'/g, "").replace(/(\.|\$|\^|\\|\/|\(|\)|\[|\]|\?|\+|\*)/g, function(a) {
                        return "\\" + a;
                    }) + ")?";
                }
            }).replace(/\s/g, "\\s?") + c.timeSuffix + "$", e = function(a) {
                var d, b = a.toLowerCase().match(/(h{1,2}|m{1,2}|s{1,2}|l{1}|c{1}|t{1,2}|z|'.*?')/g), c = {
                    h: -1,
                    m: -1,
                    s: -1,
                    l: -1,
                    c: -1,
                    t: -1,
                    z: -1
                };
                if (b) for (d = 0; d < b.length; d++) -1 === c[b[d].toString().charAt(0)] && (c[b[d].toString().charAt(0)] = d + 1);
                return c;
            }(a), a = "", b = b.match(new RegExp(d, "i")), d = {
                hour: 0,
                minute: 0,
                second: 0,
                millisec: 0,
                microsec: 0
            };
            return !!b && (-1 !== e.t && (void 0 === b[e.t] || 0 === b[e.t].length ? (a = "", 
            d.ampm = "") : (a = -1 !== $.inArray(b[e.t].toUpperCase(), c.amNames) ? "AM" : "PM", 
            d.ampm = c["AM" === a ? "amNames" : "pmNames"][0])), -1 !== e.h && (d.hour = "AM" === a && "12" === b[e.h] ? 0 : "PM" === a && "12" !== b[e.h] ? parseInt(b[e.h], 10) + 12 : Number(b[e.h])), 
            -1 !== e.m && (d.minute = Number(b[e.m])), -1 !== e.s && (d.second = Number(b[e.s])), 
            -1 !== e.l && (d.millisec = Number(b[e.l])), -1 !== e.c && (d.microsec = Number(b[e.c])), 
            -1 !== e.z && void 0 !== b[e.z] && (d.timezone = $.timepicker.timezoneOffsetNumber(b[e.z])), 
            d);
        }
        return c = extendRemove(extendRemove({}, $.timepicker._defaults), c || {}), a.replace(/\'.*?\'/g, "").indexOf("Z"), 
        "function" == typeof c.parse ? c.parse(a, b, c) : ("loose" === c.parse ? function(a, b, c) {
            try {
                var e = new Date("2012-01-01 " + b);
                if (isNaN(e.getTime()) && (e = new Date("2012-01-01T" + b), isNaN(e.getTime()) && (e = new Date("01/01/2012 " + b), 
                isNaN(e.getTime())))) throw "Unable to parse time with native Date: " + b;
                return {
                    hour: e.getHours(),
                    minute: e.getMinutes(),
                    second: e.getSeconds(),
                    millisec: e.getMilliseconds(),
                    microsec: e.getMicroseconds(),
                    timezone: -1 * e.getTimezoneOffset()
                };
            } catch (e) {
                try {
                    return d(a, b, c);
                } catch (e) {
                    $.timepicker.log("Unable to parse \ntimeString: " + b + "\ntimeFormat: " + a);
                }
            }
            return !1;
        } : d)(a, b, c);
    }, $.datepicker.formatTime = function(a, b, c) {
        c = c || {}, c = $.extend({}, $.timepicker._defaults, c), b = $.extend({
            hour: 0,
            minute: 0,
            second: 0,
            millisec: 0,
            microsec: 0,
            timezone: null
        }, b);
        var a = a, d = c.amNames[0], e = parseInt(b.hour, 10);
        return e > 11 && (d = c.pmNames[0]), a = a.replace(/(?:HH?|hh?|mm?|ss?|[tT]{1,2}|[zZ]|[lc]|'.*?')/g, function(a) {
            switch (a) {
              case "HH":
                return ("0" + e).slice(-2);

              case "H":
                return e;

              case "hh":
                return ("0" + convert24to12(e)).slice(-2);

              case "h":
                return convert24to12(e);

              case "mm":
                return ("0" + b.minute).slice(-2);

              case "m":
                return b.minute;

              case "ss":
                return ("0" + b.second).slice(-2);

              case "s":
                return b.second;

              case "l":
                return ("00" + b.millisec).slice(-3);

              case "c":
                return ("00" + b.microsec).slice(-3);

              case "z":
                return $.timepicker.timezoneOffsetString((null === b.timezone ? c : b).timezone, !1);

              case "Z":
                return $.timepicker.timezoneOffsetString((null === b.timezone ? c : b).timezone, !0);

              case "T":
                return d.charAt(0).toUpperCase();

              case "TT":
                return d.toUpperCase();

              case "t":
                return d.charAt(0).toLowerCase();

              case "tt":
                return d.toLowerCase();

              default:
                return a.replace(/'/g, "");
            }
        });
    }, $.datepicker._base_selectDate = $.datepicker._selectDate, $.datepicker._selectDate = function(a, b) {
        var c = this._getInst($(a)[0]), d = this._get(c, "timepicker");
        d ? (d._limitMinMaxDateTime(c, !0), c.inline = c.stay_open = !0, this._base_selectDate(a, b), 
        c.inline = c.stay_open = !1, this._notifyChange(c), this._updateDatepicker(c)) : this._base_selectDate(a, b);
    }, $.datepicker._base_updateDatepicker = $.datepicker._updateDatepicker, $.datepicker._updateDatepicker = function(a) {
        var b = a.input[0];
        $.datepicker._curInst && $.datepicker._curInst !== a && $.datepicker._datepickerShowing && $.datepicker._lastInput !== b || "boolean" == typeof a.stay_open && !1 !== a.stay_open || (this._base_updateDatepicker(a), 
        (b = this._get(a, "timepicker")) && b._addTimePicker(a));
    }, $.datepicker._base_doKeyPress = $.datepicker._doKeyPress, $.datepicker._doKeyPress = function(a) {
        var d, e, b = $.datepicker._getInst(a.target), c = $.datepicker._get(b, "timepicker");
        return c && $.datepicker._get(b, "constrainInput") ? (d = c.support.ampm, e = null !== c._defaults.showTimezone ? c._defaults.showTimezone : c.support.timezone, 
        b = $.datepicker._possibleChars($.datepicker._get(b, "dateFormat")), e = c._defaults.timeFormat.toString().replace(/[hms]/g, "").replace(/TT/g, d ? "APM" : "").replace(/Tt/g, d ? "AaPpMm" : "").replace(/tT/g, d ? "AaPpMm" : "").replace(/T/g, d ? "AP" : "").replace(/tt/g, d ? "apm" : "").replace(/t/g, d ? "ap" : "") + " " + c._defaults.separator + c._defaults.timeSuffix + (e ? c._defaults.timezoneList.join("") : "") + c._defaults.amNames.join("") + c._defaults.pmNames.join("") + b, 
        c = String.fromCharCode(void 0 === a.charCode ? a.keyCode : a.charCode), a.ctrlKey || " " > c || !b || -1 < e.indexOf(c)) : $.datepicker._base_doKeyPress(a);
    }, $.datepicker._base_updateAlternate = $.datepicker._updateAlternate, $.datepicker._updateAlternate = function(a) {
        var b, c, d, e, f, g, h, i = this._get(a, "timepicker");
        i ? (b = i._defaults.altField) && (i._defaults.altFormat || i._defaults.dateFormat, 
        c = this._getDate(a), d = $.datepicker._getFormatConfig(a), e = "", f = i._defaults.altSeparator || i._defaults.separator, 
        g = i._defaults.altTimeSuffix || i._defaults.timeSuffix, h = null !== i._defaults.altTimeFormat ? i._defaults.altTimeFormat : i._defaults.timeFormat, 
        e += $.datepicker.formatTime(h, i, i._defaults) + g, i._defaults.timeOnly || i._defaults.altFieldTimeOnly || null === c || (e = i._defaults.altFormat ? $.datepicker.formatDate(i._defaults.altFormat, c, d) + f + e : i.formattedDate + f + e), 
        $(b).val(e)) : $.datepicker._base_updateAlternate(a);
    }, $.datepicker._base_doKeyUp = $.datepicker._doKeyUp, $.datepicker._doKeyUp = function(a) {
        var b = $.datepicker._getInst(a.target), c = $.datepicker._get(b, "timepicker");
        if (c && c._defaults.timeOnly && b.input.val() !== b.lastVal) try {
            $.datepicker._updateDatepicker(b);
        } catch (a) {
            $.timepicker.log(a);
        }
        return $.datepicker._base_doKeyUp(a);
    }, $.datepicker._base_gotoToday = $.datepicker._gotoToday, $.datepicker._gotoToday = function(a) {
        var b = this._getInst($(a)[0]), c = b.dpDiv;
        this._base_gotoToday(a), a = this._get(b, "timepicker"), selectLocalTimezone(a), 
        a = new Date(), this._setTime(b, a), $(".ui-datepicker-today", c).click();
    }, $.datepicker._disableTimepickerDatepicker = function(a) {
        var b, c = this._getInst(a);
        c && (b = this._get(c, "timepicker"), $(a).datepicker("getDate"), b && (c.settings.showTimepicker = !1, 
        b._defaults.showTimepicker = !1, b._updateDateTime(c)));
    }, $.datepicker._enableTimepickerDatepicker = function(a) {
        var b, c = this._getInst(a);
        c && (b = this._get(c, "timepicker"), $(a).datepicker("getDate"), b && (c.settings.showTimepicker = !0, 
        b._defaults.showTimepicker = !0, b._addTimePicker(c), b._updateDateTime(c)));
    }, $.datepicker._setTime = function(a, b) {
        var c, d = this._get(a, "timepicker");
        d && (c = d._defaults, d.hour = b ? b.getHours() : c.hour, d.minute = b ? b.getMinutes() : c.minute, 
        d.second = b ? b.getSeconds() : c.second, d.millisec = b ? b.getMilliseconds() : c.millisec, 
        d.microsec = b ? b.getMicroseconds() : c.microsec, d._limitMinMaxDateTime(a, !0), 
        d._onTimeChange(), d._updateDateTime(a));
    }, $.datepicker._setTimeDatepicker = function(a, b, c) {
        var d, e = this._getInst(a);
        !e || (a = this._get(e, "timepicker")) && (this._setDateFromField(e), b && ("string" == typeof b ? (a._parseTime(b, c), 
        (d = new Date()).setHours(a.hour, a.minute, a.second, a.millisec), d.setMicroseconds(a.microsec)) : (d = new Date(b.getTime())).setMicroseconds(b.getMicroseconds()), 
        "Invalid Date" === d.toString() && (d = void 0), this._setTime(e, d)));
    }, $.datepicker._base_setDateDatepicker = $.datepicker._setDateDatepicker, $.datepicker._setDateDatepicker = function(a, b) {
        var c, d, e = this._getInst(a);
        e && ("string" == typeof b && ((b = new Date(b)).getTime() || $.timepicker.log("Error creating Date object from string.")), 
        c = this._get(e, "timepicker"), b instanceof Date ? (d = new Date(b.getTime())).setMicroseconds(b.getMicroseconds()) : d = b, 
        c && (c.support.timezone || null !== c._defaults.timezone || (c.timezone = -1 * d.getTimezoneOffset()), 
        b = $.timepicker.timezoneAdjust(b, c.timezone), d = $.timepicker.timezoneAdjust(d, c.timezone)), 
        this._updateDatepicker(e), this._base_setDateDatepicker.apply(this, arguments), 
        this._setTimeDatepicker(a, d, !0));
    }, $.datepicker._base_getDateDatepicker = $.datepicker._getDateDatepicker, $.datepicker._getDateDatepicker = function(a, b) {
        var d, c = this._getInst(a);
        return c ? (d = this._get(c, "timepicker"), d ? (void 0 === c.lastVal && this._setDateFromField(c, b), 
        c = this._getDate(c), c && d._parseTime($(a).val(), d.timeOnly) && (c.setHours(d.hour, d.minute, d.second, d.millisec), 
        c.setMicroseconds(d.microsec), null != d.timezone && (d.support.timezone || null !== d._defaults.timezone || (d.timezone = -1 * c.getTimezoneOffset()), 
        c = $.timepicker.timezoneAdjust(c, d.timezone))), c) : this._base_getDateDatepicker(a, b)) : void 0;
    }, $.datepicker._base_parseDate = $.datepicker.parseDate, $.datepicker.parseDate = function(a, b, c) {
        var d;
        try {
            d = this._base_parseDate(a, b, c);
        } catch (e) {
            if (!(0 <= e.indexOf(":"))) throw e;
            d = this._base_parseDate(a, b.substring(0, b.length - (e.length - e.indexOf(":") - 2)), c), 
            $.timepicker.log("Error parsing the date string: " + e + "\ndate string = " + b + "\ndate format = " + a);
        }
        return d;
    }, $.datepicker._base_formatDate = $.datepicker._formatDate, $.datepicker._formatDate = function(a) {
        var e = this._get(a, "timepicker");
        return e ? (e._updateDateTime(a), e.$input.val()) : this._base_formatDate(a);
    }, $.datepicker._base_optionDatepicker = $.datepicker._optionDatepicker, $.datepicker._optionDatepicker = function(a, b, c) {
        var d, f, g, h, i, j, k, e = this._getInst(a);
        if (!e) return null;
        if (f = this._get(e, "timepicker")) {
            if (h = null, i = null, e = null, j = f._defaults.evnts, k = {}, "string" == typeof b) {
                if ("minDate" === b || "minDateTime" === b) h = c; else if ("maxDate" === b || "maxDateTime" === b) i = c; else if ("onSelect" === b) e = c; else if (j.hasOwnProperty(b)) {
                    if (void 0 === c) return j[b];
                    k[b] = c, d = {};
                }
            } else if ("object" == typeof b) for (g in b.minDate ? h = b.minDate : b.minDateTime ? h = b.minDateTime : b.maxDate ? i = b.maxDate : b.maxDateTime && (i = b.maxDateTime), 
            j) j.hasOwnProperty(g) && b[g] && (k[g] = b[g]);
            for (g in k) k.hasOwnProperty(g) && (j[g] = k[g], delete (d = d || $.extend({}, b))[g]);
            if (d && isEmptyObject(d)) return;
            h ? (h = 0 === h ? new Date() : new Date(h), f._defaults.minDate = h, f._defaults.minDateTime = h) : i ? (i = 0 === i ? new Date() : new Date(i), 
            f._defaults.maxDate = i, f._defaults.maxDateTime = i) : e && (f._defaults.onSelect = e);
        }
        return void 0 === c ? this._base_optionDatepicker.call($.datepicker, a, b) : this._base_optionDatepicker.call($.datepicker, a, d || b, c);
    }, isEmptyObject = function(a) {
        for (var b in a) if (a.hasOwnProperty(b)) return !1;
        return !0;
    }, extendRemove = function(a, b) {
        for (var c in $.extend(a, b), b) null !== b[c] && void 0 !== b[c] || (a[c] = b[c]);
        return a;
    }, detectSupport = function(a) {
        function b(a, b) {
            return -1 !== a.indexOf(b);
        }
        var c = a.replace(/'.*?'/g, "").toLowerCase();
        return {
            hour: b(c, "h"),
            minute: b(c, "m"),
            second: b(c, "s"),
            millisec: b(c, "l"),
            microsec: b(c, "c"),
            timezone: b(c, "z"),
            ampm: b(c, "t") && b(a, "h"),
            iso8601: b(a, "Z")
        };
    }, convert24to12 = function(a) {
        return 0 === (a %= 12) && (a = 12), String(a);
    }, computeEffectiveSetting = function(a, b) {
        return (a && a[b] ? a : $.timepicker._defaults)[b];
    }, splitDateTime = function(a, b) {
        var c = computeEffectiveSetting(b, "separator"), d = computeEffectiveSetting(b, "timeFormat").split(c).length, e = a.split(c), b = e.length;
        return b > 1 ? {
            dateString: e.splice(0, b - d).join(c),
            timeString: e.splice(0, d).join(c)
        } : {
            dateString: a,
            timeString: ""
        };
    }, parseDateTimeInternal = function(a, b, c, d, e) {
        if (c = splitDateTime(c, e), d = $.datepicker._base_parseDate(a, c.dateString, d), 
        "" === c.timeString) return {
            date: d
        };
        if (!(e = $.datepicker.parseTime(b, c.timeString, e))) throw "Wrong time format";
        return {
            date: d,
            timeObj: e
        };
    }, selectLocalTimezone = function(a, b) {
        a && a.timezone_select && (b = b || new Date(), a.timezone_select.val(-b.getTimezoneOffset()));
    }, $.timepicker = new Timepicker(), $.timepicker.timezoneOffsetString = function(a, b) {
        if (isNaN(a) || a > 840 || -720 > a) return a;
        var c = a % 60, d = (a - c) / 60, b = b ? ":" : "", c = (a >= 0 ? "+" : "-") + ("0" + Math.abs(d)).slice(-2) + b + ("0" + Math.abs(c)).slice(-2);
        return "+00:00" == c ? "Z" : c;
    }, $.timepicker.timezoneOffsetNumber = function(a) {
        var b = a.toString().replace(":", "");
        return "Z" === b.toUpperCase() ? 0 : /^(\-|\+)\d{4}$/.test(b) ? ("-" === b.substr(0, 1) ? -1 : 1) * (60 * parseInt(b.substr(1, 2), 10) + parseInt(b.substr(3, 2), 10)) : a;
    }, $.timepicker.timezoneAdjust = function(a, b) {
        return b = $.timepicker.timezoneOffsetNumber(b), isNaN(b) || a.setMinutes(a.getMinutes() + -a.getTimezoneOffset() - b), 
        a;
    }, $.timepicker.timeRange = function(a, b, c) {
        return $.timepicker.handleRange("timepicker", a, b, c);
    }, $.timepicker.datetimeRange = function(a, b, c) {
        $.timepicker.handleRange("datetimepicker", a, b, c);
    }, $.timepicker.dateRange = function(a, b, c) {
        $.timepicker.handleRange("datepicker", a, b, c);
    }, $.timepicker.handleRange = function(a, b, c, d) {
        function e(e, f) {
            var g, h = b[a]("getDate"), i = c[a]("getDate"), j = e[a]("getDate");
            null !== h && (g = new Date(h.getTime()), e = new Date(h.getTime()), g.setMilliseconds(g.getMilliseconds() + d.minInterval), 
            e.setMilliseconds(e.getMilliseconds() + d.maxInterval), 0 < d.minInterval && g > i ? c[a]("setDate", g) : 0 < d.maxInterval && i > e ? c[a]("setDate", e) : h > i && f[a]("setDate", j));
        }
        function f(b, c, e) {
            b.val() && (null !== (b = b[a].call(b, "getDate")) && 0 < d.minInterval && ("minDate" === e && b.setMilliseconds(b.getMilliseconds() + d.minInterval), 
            "maxDate" === e && b.setMilliseconds(b.getMilliseconds() - d.minInterval)), b.getTime && c[a].call(c, "option", e, b));
        }
        return d = $.extend({}, {
            minInterval: 0,
            maxInterval: 0,
            start: {},
            end: {}
        }, d), $.fn[a].call(b, $.extend({
            onClose: function() {
                e($(this), c);
            },
            onSelect: function() {
                f($(this), c, "minDate");
            }
        }, d, d.start)), $.fn[a].call(c, $.extend({
            onClose: function() {
                e($(this), b);
            },
            onSelect: function() {
                f($(this), b, "maxDate");
            }
        }, d, d.end)), e(b, c), f(b, c, "minDate"), f(c, b, "maxDate"), $([ b.get(0), c.get(0) ]);
    }, $.timepicker.log = function(a) {
        window.console && window.console.log(a);
    }, $.timepicker._util = {
        _extendRemove: extendRemove,
        _isEmptyObject: isEmptyObject,
        _convert24to12: convert24to12,
        _detectSupport: detectSupport,
        _selectLocalTimezone: selectLocalTimezone,
        _computeEffectiveSetting: computeEffectiveSetting,
        _splitDateTime: splitDateTime,
        _parseDateTimeInternal: parseDateTimeInternal
    }, Date.prototype.getMicroseconds || (Date.prototype.microseconds = 0, Date.prototype.getMicroseconds = function() {
        return this.microseconds;
    }, Date.prototype.setMicroseconds = function(a) {
        return this.setMilliseconds(this.getMilliseconds() + Math.floor(a / 1e3)), this.microseconds = a % 1e3, 
        this;
    }), $.timepicker.version = "1.4");
}(jQuery);