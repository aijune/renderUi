import $ from "@/lib/render";

$.widget("Content", {

    options: {

    },

    _init: function () {

        this._render(function (o, w) {
            return [".layout-content", {
                style: {minHeight: w._minHeight}
            }, [
                w._slot("default")
            ]];
        });
    },

    _minHeight: function () {
        return this.window.height() - $(".layout-header").outerHeight() - $(".layout-title").outerHeight();
    }
});
