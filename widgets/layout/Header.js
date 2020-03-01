import $ from "@/lib/render";

$.widget("Header", {

    _init: function () {

        this._render(function (o, w) {
            return [".layout-header", [
                ["Brand:a"],
                ["Topbar"]
            ]];
        });
    }

});

