define(["jquery"], function ($) {

    $.widget("article", {

        options: {

        },

        renders: {
            main: function(o, w){
                return ["this.layout-article", [
                    ["render[name=title]"],
                    ["render[name=content]"]
                ]];
            },
            title: function (o, w) {
                return ["div.layout-title",
                    ["slot[name=title]", function (s, o, w) {
                        return ["span", s.text];
                    }],
                    ["slot[name=btngroup]", function (s, o, w) {
                        return ["div.btn-group", {
                            onclick: w._click
                        }, [
                            s.children
                        ]];
                    }]
                ];
            },
            content: function (o, w) {
                return ["div.layout-content", {
                    style: {minHeight: w._minHeight}
                }, [
                    ["slot[name=content]", function (s, o, w) {
                        return s.children;
                    }]
                ]];
            }
        },

        _init: function () {
            this._render();
        },

        _click: function (e) {
            this._trigger("onclick", e, {raw: $.data(e.target, "_raw_")});
        },

        _minHeight: function () {
            return this.window.height() - $(".layout-header").outerHeight() - $(".layout-title").outerHeight();
        }
    });

});
