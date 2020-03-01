import $ from "@/lib/render";

$.widget("Layout", {

    _init: function () {
        this._render(function (o, w) {
            return [".layout", [
                ["Header:header"],
                ["Main:main"]
            ]];
        });
    },



});