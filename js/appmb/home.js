define(["jquery", "render", "w/mb/navbar", "w/mb/tabbar", "w/mb/listgroup"], function ($) {
    $.widget("home", {
        renders: {
            main: function (o, w) {
                return ["this.home", [
                    ["render[name=header]"],
                    ["render[name=body]"],
                    ["render[name=footer]"]
                ]]
            },
            header: function(o, w){
                return ["widget[name=navbar]", {
                    title: "首页",
                    leftArrow: true,
                    leftText: "返回",
                    rightText: "菜单",
                    rightMenu: {
                        change: function (data, e, raw) {
                            console.log(data, e, raw);
                        },
                        items: [
                            {icon: ".fa.fa-user-plus", text: "添加朋友"},
                            {icon: ".fa.fa-comments", text: "评论"},
                            {icon: ".fa.fa-rss-square", text: "订阅RSS"}
                        ]
                    }
                }];
            },
            body: function(o, w){
                return ["widget[name=listgroup]", {
                    items: [
                        {
                            title: "我是标题",
                            items: [
                                {icon: ".fa.fa-user-plus", label: "添加朋友", value: "我是朋友", link: {}},
                                {icon: ".fa.fa-comments", label: "评论", value: "我是评论", link: {}},
                                {icon: ".fa.fa-rss-square", label: "订阅RSS", value: "我是订阅", link: {}}
                            ]
                        },
                        {
                            title: "我是标题",
                            items: [
                                {icon: ".fa.fa-user-plus", label: "添加朋友", value: "我是朋友", link: {}},
                                {icon: ".fa.fa-comments", label: "评论", value: "我是评论", link: {}},
                                {icon: ".fa.fa-rss-square", label: "订阅RSS", value: "我是订阅", link: {}}
                            ]
                        },
                        {
                            title: "我是标题",
                            items: [
                                {icon: ".fa.fa-user-plus", label: "添加朋友", value: "我是朋友", link: {}},
                                {icon: ".fa.fa-comments", label: "评论", value: "我是评论", link: {}},
                                {icon: ".fa.fa-rss-square", label: "订阅RSS", value: "我是订阅", link: {}}
                            ]
                        },
                        {
                            title: "我是标题",
                            items: [
                                {icon: ".fa.fa-user-plus", label: "添加朋友", value: "我是朋友", link: true},
                                {icon: ".fa.fa-comments", label: "评论", value: "我是评论", link: true},
                                {icon: ".fa.fa-rss-square", label: "订阅RSS", value: "我是订阅", link: true}
                            ]
                        }
                    ]
                }]
            },
            footer: function (o, w) {
                return ["widget[name=tabbar]", {
                    change: function(data, e, raw){
                        console.log(data, e, raw);
                    },
                    items: [
                        {icon: ".fa.fa-user-plus", text: "添加朋友", dot: true},
                        {icon: ".fa.fa-comments", text: "评论"},
                        {icon: ".fa.fa-rss-square", text: "订阅RSS", badge: "20"}
                    ]
                }];
            }
        },
        _create: function () {
            this._render();
        }
    });
});
