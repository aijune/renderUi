import $ from "@/lib/render";

$.widget("Article", {

    options: {

    },

    _init: function () {


        this._render(function (o, w) {

            return [".layout-article", [
                ["Title", {
                    onclick: w._slot("btnGroup:data").onclick
                }, [
                    ["h5", w._slot("title")],
                    ["slot#btnGroup", w._slot("btnGroup")]
                ]],
                ["Content", [
                    w._slot("content")
                ]]
            ]];
        });
    },

    _click(e){

    }
});
