import $ from "@/lib/render";

$.widget("Main", {

    options: {

    },

    _init: function () {
        this._render(function (o, w) {
            return [".layout-main", [
                ["Aside:aside"],
                ["article"]
            ]];
        });
    }

});
