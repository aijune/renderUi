import $ from "@/lib/render";

$.widget("Brand", {

    options: {
        title: "AdminUI",
        state: "max"
    },

    _init: function () {
        this._render(function (o, w) {
            return [".layout-brand[href=#]", [
                ["span.toggle", {
                    class: o.state,
                    onclick: w.toggle
                }, o.title]
            ]];
        });
    },

    toggle: function (e, raw) {
        console.log(raw);
        this._render("update", function (o) {
            o.title = o.title === "UI" ? "AdminUI" : "UI";
            o.state = o.state === "max" ? "min" : "max";
        });
    }

});
