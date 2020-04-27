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

    $.widget("navbar", {
        defaultTag: "nav",
        options: {
            title: "",
            leftArrow: false,
            leftText: "",
            rightText: "",
            rightMenu: false,
            fixed: false,
            placeholder: false
        },
        renders: {
            main: function (o, w) {
                var tag = o.placeholder ? "div" : "this";
                var bar = [tag + ".mb-navbar", {
                    class: {
                        "mb-navbar-fixed": {init: o.fixed && "add"}
                    }
                }, [
                    ["render[name=left]"],
                    ["render[name=title]"],
                    ["render[name=right]"]

                ]];
                return o.placeholder ? ["this.mb-navbar-placeholder", bar] : bar;
            },
            left: function(o, w){
                if(o.slots.left){
                    return ["div.mb-navbar-left", [
                        ["slot[name=left]", function (s, o, w) {
                            return s.text || s.children;
                        }]
                    ]];
                }
                else{
                    return ["div.mb-navbar-left", {
                        onclick: [w._clickLeft, o]
                    }, [
                        ["a[href=#]", [
                            !!o.leftArrow && ["i.fa.fa-angle-left.mb-navbar-arrow"],
                            !!o.leftText && ["span.mb-navbar-text", o.leftText]
                        ]]
                    ]];
                }
            },
            title: function(o, w){
                if(o.slots.title){
                    return ["div.mb-navbar-title.mb-ellipsis", [
                        ["slot[name=title]", function (s, o, w) {
                            return s.text || s.children;
                        }]
                    ]];
                }
                else{
                    return ["div.mb-navbar-title.mb-ellipsis", o.title];
                }
            },
            right: function (o, w) {
                if(o.slots.right){
                    return ["div.mb-navbar-right", [
                        ["slot[name=right]", function (s, o, w) {
                            return s.text || s.children;
                        }]
                    ]];
                }
                else if($.isArray(o.rightMenu)){
                    return ["widget.dropdown.mb-navbar-right[name=dropdown]", [
                        ["slot[name=toggle]", [
                            ["a.dropdown-toggle[href=#]", [
                                !!o.rightText && ["span.mb-navbar-text", o.rightText],
                                ["i.fa.fa-plus.mb-navbar-menu"]
                            ]]
                        ]],
                        ["slot[name=menu]", o.rightMenu.map(function (item, i) {
                            return ["a.dropdown-item[href=#]", {
                                onclick: [item.click, item]
                            }, [
                                ["i" + item.icon, {style: {marginRight: "5px"}}],
                                ["span", item.text]
                            ]];
                        })]
                    ]]
                }
                else{
                    return ["div.mb-navbar-right", {
                        onclick: [w._clickRight, o]
                    }, [
                        !!o.rightText && ["span.mb-navbar-text", o.rightText],
                        !!o.rightMenu && ["i.fa.fa-plus.mb-navbar-menu"]
                    ]];
                }
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
