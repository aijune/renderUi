define(["jquery", "render", "w/dropdown"], function ($) {

    /*-------------------------------------------------
    ["widget[name=tabbar]", {
        change: function(data, e, raw){
            console.log(data, e, raw);
        },
        items: [
            {
                icon: ".fa.fa-user-plus",
                text: "添加朋友",
                dot: true
            },
            {
                icon: ".fa.fa-comments",
                text: "评论"
            },
            {
                icon: ".fa.fa-rss-square",
                text: "订阅RSS",
                badge: "20"
            }
        ]
    }]
    -------------------------------------------------*/

    $.widget("tabbar", {
        options: {
            fixed: true,
            placeholder: false,
            items: [],
            active: 0
        },
        renders: {
            main: function (o, w) {
                var tag = o.placeholder ? "div" : "this";
                var bar = [tag + ".mb-tabbar", {
                    class: {
                        "mb-tabbar-fixed": {init: o.fixed && "add"}
                    }
                }, o.items.map(function (item, i) {
                    return ["div.mb-tabbar-item", {
                        class: {
                            "mb-tabbar-item-active": {init: i === o.active && "add"}
                        },
                        onclick: [w._clickItem, item, i]
                    }, [
                        !!item.icon && ["div.mb-tabbar-item-icon-wrap", [
                            ["i.mb-tabbar-item-icon" + item.icon],
                            !!item.dot && ["div.mb-info.mb-info-dot"],
                            !!item.badge && ["div.mb-info", item.badge]
                        ]],
                        !!item.text && ["div.mb-tabbar-item-text", item.text]
                    ]]
                })];
                return o.placeholder ? ["this.mb-navbar-placeholder", bar] : bar;
            }
        },
        _create: function () {
            this._render();
        },
        _clickItem: function (item, i, e, raw) {
            this._render("update",
                function (o) {
                    o.active = i;
                },
                function (o) {
                    if(o.change){
                        o.change({item: item, index: i}, e, raw);
                    }
                }
            );
        }
    });
});
