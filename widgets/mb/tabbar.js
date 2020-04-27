define(["jquery", "render", "w/dropdown"], function ($) {

    /*-------------------------------------------------
    ["widget[name=navbar]", {
        title: "首页",
        leftArrow: true,
        leftText: "返回",
        rightText: "菜单",
        rightMenu: [
            {
                icon: ".fa.fa-user-plus",
                text: "添加朋友",
                click: function (data, e, raw) {
                    console.log(data, e, raw);
                }
            },
            {
                icon: ".fa.fa-comments",
                text: "评论",
                click: function (data, e, raw) {
                    console.log(data, e, raw);
                }
            },
            {
                icon: ".fa.fa-rss-square",
                text: "订阅RSS",
                click: function (data, e, raw) {
                    console.log(data, e, raw);
                }
            }
        ],
        fixed: true,
        placeholder: true,
        clickLeft: function (data, e, raw) {
            console.log(data, e, raw);
        },
        clickRight: function (data, e, raw) {
            console.log(data, e, raw);
        }
    }]
    //-------------------------------------------------
    ["widget[name=navbar]", {
        fixed: true,
        placeholder: true
    }, [
        ["slot[name=left]", [
            ["a[href=#]", {
                onclick: function () {
                    console.log("left")
                }
            }, "后退"]
        ]],
        ["slot[name=title]", [
            ["span", {
                onclick: function () {
                    console.log("title")
                }
            }, "导航标题"]
        ]],
        ["slot[name=right]", [
            ["a[href=#]", {
                onclick: function () {
                    console.log("right")
                }
            }, "前进"]
        ]]
    ]]
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
                        }
                    }, [
                        !!item.icon && ["div.mb-tabbar-item-icon-wrap", [
                            ["i.mb-tabbar-item-icon" + item.icon]
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
        _clickLeft: function (o, e, raw) {
            if(o.clickLeft){
                o.clickLeft({}, e, raw);
            }
        },
        _clickRight: function (o, e, raw) {
            if(o.clickRight){
                o.clickRight({}, e, raw);
            }
        }
    });
});
