define(["jquery", "render", "widgets/modal"], function ($) {

    $.widget("picker", {
        options: {
            place: "bottom",
            fade: false,
            closable: true,
            rows: 6,
            rowHeight: 40,
            source: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
            transform: "translate3d(0px, 0px, 0px)"
        },
        renders: {
            main: function (o, w) {
                return ["widget[name=modal]", {
                    type: "popup-" + o.place,
                    fade: o.fade,
                    closable: o.closable
                }, [
                    ["slot[name=title]", [
                        ["slot[name=title]", function (s, o, w) {
                            return s.text || s.children;
                        }]
                    ]],
                    ["slot[name=content]", [
                        ["render[name=content]"]
                        /*
                        ["slot[name=content]", function (s, o, w) {
                            return s.text || s.children;
                        }]
                        */
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
                            lineHeight: o.rowHeight + "px"
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
            var x = e.clientX - this.x;
            var y = e.clientY - this.y;
            var d = this.d + y;
            this._render("update", function (o) {
                o.transform = "translate3d(0px, " + d + "px, 0px)";
                o.transition = undefined;
            });
            this.distance = d;
            e.preventDefault();
        },
        _up: function (e, raw) {
            var that = this;
            var o = this.options;
            var rows = Math.round(that.distance / o.rowHeight);
            var d = rows * o.rowHeight;

            if(d > o.yMax){
                d = o.yMax;
                that.distance = o.yMax;
            }
            else if(d < o.yMin){
                d = o.yMin;
                that.distance = o.yMin;
            }

            this._off(this.document);
            this._render("update",
                function (o) {
                    o.transform = "translate3d(0px, " + d + "px, 0px)";
                    o.transition = "all 0.3s cubic-bezier(0, 0, 0.2, 1.15)";
                },
                function () {
                    var index = - (d / o.rowHeight) + o.indicatorTopRows;
                    console.log(o.source[index]);
                });
        }
    });
});
