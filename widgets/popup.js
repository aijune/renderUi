define(["jquery", "render", "w/modal"], function ($) {

    $.widget("popup", {
        options: {
            place: "bottom",
            fade: true,
            closable: true
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
                        ["slot[name=content]", function (s, o, w) {
                            return s.text || s.children;
                        }]
                    ]],
                    ["slot[name=footer]", [
                        ["slot[name=footer]", function (s, o, w) {
                            return s.text || s.children;
                        }]
                    ]]
                ]];
            }
        },
        _create: function () {
            this._render();
        }
    });
});
