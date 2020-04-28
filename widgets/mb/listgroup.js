define(["jquery", "render"], function ($) {

    $.widget("listgroup", {
        options: {
            items: []
        },
        renders: {
            main: function (o, w) {
                return ["this.mb-listgroup-wrap", o.items.map(function (item, i) {
                    return ["div.mb-listgroup", [
                        ["div.mb-listgroup-header", item.title],
                        ["div.mb-listgroup-body", item.items.map(function (itm, i) {
                            return ["div.mb-listgroup-item", [
                                ["i.mb-listgroup-icon.left" + itm.icon],
                                ["div.mb-listgroup-text", itm.label],
                                ["div.mb-listgroup-text.value", itm.value],
                            ]];
                        })]
                    ]];
                })];
            }
        },
        _create: function () {
            this._render();
        }
    });
});
