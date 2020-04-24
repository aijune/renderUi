define(["jquery", "render", "widgets/modal"], function ($) {

    $.widget("picker", {
        options: {
            place: "bottom",
            fade: false,
            closable: true,
            backdrop: false,
            rows: 6,
            rowHeight: 40,
            loop: true,
            source: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
            transform: "translate3d(0px, 0px, 0px)"
        },
        renders: {
            main: function (o, w) {
                return ["widget[name=modal]", {
                    type: "popup-" + o.place,
                    fade: o.fade,
                    backdrop: o.backdrop,
                    closable: o.closable
                }, [
                    ["slot[name=title]", [
                        ["slot[name=title]", function (s, o, w) {
                            return s.text || s.children;
                        }]
                    ]],
                    ["slot[name=content]", [
                        ["render[name=content]"]

                        /*["slot[name=content]", function (s, o, w) {
                            return s.text || s.children;
                        }]*/

                    ]],
                    ["slot[name=footer]", [
                        ["slot[name=footer]", function (s, o, w) {
                            return s.text || s.children;
                        }]
                    ]]
                ]];
            },
            content: function (o, w) {
                return ["div.picker", {
                    style: {
                        height: o.pickerHeight + "px",
                    },
                    onmousedown: w._down
                }, [
                    ["div.picker-indicator", {
                        style: {
                            height: o.rowHeight + "px",
                            top: o.indicatorTop + "px"
                        }
                    }],
                    ["ul.picker-content.list-unstyled", {
                        style: {
                            transform: o.transform,
                            transition: o.transition,
                            lineHeight: o.rowHeight + "px",
                            marginTop: o.marginTop
                        }
                    }, [
                        o.source.map(function (item, i) {
                            return ["li", item]
                        })
                    ]]
                ]];
            }
        },
        _create: function () {
            this._count();
            this._render();
        },
        _count: function(){
            var o = this.options;

            o.pickerHeight = o.rows * o.rowHeight;
            o.indicatorBotRows = Math.ceil(o.rows / 2);
            o.indicatorTopRows = o.rows - o.indicatorBotRows -1;
            o.indicatorTop = o.indicatorTopRows * o.rowHeight;
            o.indicatorBot = o.indicatorBotRows * o.rowHeight;
            o.contentHeight = o.source.length * o.rowHeight;
            o.yMax = o.indicatorTop;
            o.yMin = - (o.contentHeight - (o.indicatorTopRows + 1) * o.rowHeight);

            if(o.loop){
                o.loopMax = 0;
                o.loopMin = o.yMin + (o.indicatorBotRows * o.rowHeight);
            }
        },

        _getSource: function(d){
            var o = this.options;
            var n, a = [], c = a.concat;

            o.resource = $.extend([], o.source);
            o.marginTop = undefined;

            if(o.loop){
                if(d > o.loopMax){
                    n = Math.ceil((d - o.loopMax) / o.rowHeight);
                }
                else if(d < o.loopMin){
                    n = Math.ceil((o.loopMin - d) / o.rowHeight);

                }
                if(n){
                    n = Math.ceil(n / o.source.length);
                    if(d > o.loopMax){
                        o.marginTop = - (o.contentHeight * n);
                    }
                    o.times = ++n;
                    while (n--){
                        a.push(o.source);
                    }
                    o.resource = c.apply([], a);
                }
            }
        },

        _down: function (e, raw) {
            this.x = e.clientX;
            this.y = e.clientY;
            this.d = this.distance || 0;
            this._on(this.document, {
                "mousemove": "_move",
                "mouseup": "_up"
            });
        },
        _move: function (e, raw) {
            var op = this.options;
            var x = e.clientX - this.x;
            var y = e.clientY - this.y;
            var d = this.d + y;

            this._getSource(d);
            this._render("update", function (o) {
                o.transform = "translate3d(0px, " + d + "px, 0px)";
                o.transition = undefined;
                o.marginTop = op.marginTop;
                o.source = op.resource;
            });
            this.distance = d;
            e.preventDefault();
        },
        _up: function (e, raw) {
            var that = this;
            var op = this.options;
            var rows = Math.round(that.distance / op.rowHeight);
            var d = rows * op.rowHeight;

            if(!op.loop){
                if(d > op.yMax){
                    d = op.yMax;
                    that.distance = op.yMax;
                }
                else if(d < op.yMin){
                    d = op.yMin;
                    that.distance = op.yMin;
                }
            }

            this._off(this.document);
            this._render("update",
                function (o) {
                    o.transform = "translate3d(0px, " + d + "px, 0px)";
                    o.transition = "all 0.3s cubic-bezier(0, 0, 0.2, 1.15)";
                },
                function (o) {
                    var n = - (d / op.rowHeight) + op.indicatorTopRows;
                    var index = Math.abs(n) % op.source.length;

                    if(n < 0){
                        index = op.source.length - index;
                    }

                    console.log(index, o.source[index]);
                });
        }
    });
});
