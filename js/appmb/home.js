define(["jquery", "render", "w/mb/navbar"], function ($) {
    $.widget("home", {
        renders: {
            main: function (o, w) {
                return ["this", [
                    ["widget[name=navbar]"]
                ]]
            }
        },
        _create: function () {
            this._render();
        }
    });
});