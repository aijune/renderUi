define(["jquery", "render", "widgets/modal"], function ($) {

    $.widget("picker", {
        options: {
            place: "bottom",
            fade: true,
            closable: true,
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
                console.log(666)
                return ["div.picker", [
                    ["ul.picker-content", {
                        style: {
                            transform: o.transform,
                            transitionDuration: "0ms",
                            transitionProperty: "none",
                            lineHeight: "44px"
                        },
                        onmousedown: w._down
                    }, [
                        ["li", "a"],
                        ["li", "b"],
                        ["li", "c"],
                        ["li", "d"],
                        ["li", "e"],
                        ["li", "f"],
                        ["li", "g"],
                        ["li", "h"],
                        ["li", "i"],
                        ["li", "j"],
                        ["li", "k"],
                        ["li", "l"],
                        ["li", "m"],
                        ["li", "n"]
                    ]]
                ]];
            }
        },
        _create: function () {
            this._render();
        },
        _down: function (e, raw) {
            this.x = e.clientX;
            this.y = e.clientY;
            this.d = this.distance || 0;
            this._on(this.document, {
                "mousemove": function (e) {
                    this._move(e, raw);
                },
                "mouseup": "_up"
            });
        },
        _move: function (e, raw) {
            var x = e.clientX - this.x;
            var y = e.clientY - this.y;
            var d = this.d + y;
            $(raw.node).css("transform", "translate3d(0px, " + d + "px, 0px)");
            this.distance = d;
            e.preventDefault();
        },
        _up: function (e, raw) {
            this._off(this.document);
        }
    });
});
