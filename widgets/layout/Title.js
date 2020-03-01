import $ from "@/lib/render";

$.widget("Title", {

    options: {

    },

    _init: function () {

        this._render(function (o, w) {
            return [".layout-title",
                w._slot("default"),
                ["div.btn-group", {
                    onclick: w._click
                }, w._slot("btnGroup")]
            ];
        });
    },

    _click: function (e) {

        console.log(e);
        //this.options.onclick(e, {raw: $.data(e.target, "_raw_")});
        this._trigger("onclick", null, {raw: $.data(e.target, "_raw_")});
    }
});
