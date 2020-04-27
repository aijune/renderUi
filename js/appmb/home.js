define(["jquery", "render", "w/mb/navbar", "w/mb/tabbar"], function ($) {
    $.widget("home", {
        renders: {
            main: function (o, w) {
                return ["this", [
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
                    }],
                    ["div", "qqqqqqqqqqqqqqqqqqqqq"],
                    ["widget[name=tabbar]", {
                        items: [
                            {
                                icon: ".fa.fa-user-plus",
                                text: "添加朋友",
                                click: function (data, e, raw) {

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
                        ]
                    }]
                ]]
            }
        },
        _create: function () {
            this._render();
        }
    });
});
