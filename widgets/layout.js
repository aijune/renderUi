define(["jquery", "bootstrap", "render"], function ($) {

    $.widget("layout", {

        renders: {
            layout: function(d, w){
                return ["div.layout", [
                    ["render[name=header]"],
                    ["render[name=main]"]
                ]];
            },
            header: function (d, w) {
                return ["header.layout-header", [
                    ["render[name=brand]"],
                    ["render[name=topbar]"]
                ]];
            },
            main: function (d, w) {
                return ["main.layout-main", [
                    ["render[name=aside]"],
                    ["article"]
                ]];
            },
            brand: function(d, w){
                return ["a.layout-brand[href=#]", [
                    ["span.toggle", {class: d.state}, d.title[d.state]]
                ]];
            },
            topbar: function(d, w){
                var arrow = d.state === "max" ? "left" : "right";
                return ["div.layout-topbar", [
                    ["a.toggle[href=#]", ["i.fa.fa-chevron-" + arrow]],
                    ["div.nav", ["render[name=topbarNavs]", d.navs]]
                ]];
            },
            topbarNavs: function(item){
                return ["div.dropdown", [
                    ["a.dropdown-toggle[href=#]", {"data-toggle": "dropdown"}, item.toggle],
                    ["div.dropdown-menu.dropdown-menu-right", ["render[name=topbarSubs]", item.subs]]
                ]];
            },
            topbarSubs: function(item){
                return item ? ["a.dropdown-item", {href: item.href}, item.text] : ["div.dropdown-divider"];
            },
            aside: function (d, w) {
                return ["aside.layout-aside", {class: d.state}, [
                    ["ul.menu", ["render[name=asideMenu]", d.menu]]
                ]];
            },
            asideMenu: function(item){
                return ["li", [
                    ["a.menu-a", {href: item.href}, [
                        ["i" + item.icon],
                        ["span", item.title],
                        item.subs && [
                            ["i.fa.fa-angle-right"],
                            ["ul.menu", ["render[name=asideSubs]", item.subs]]
                        ]
                    ]]
                ]];
            },
            asideSubs: function(item){
                return  ["li", [
                    ["a.menu-a", {href: item.href}, ["span", item.title]]
                ]];
            },
        },

        options: {
            state: "max",
            title: {max: "AdminUI", min: "UI"},
            navs: [
                {
                    toggle: "消息",
                    subs: [
                        {href: "#", text: "Action"},
                        {href: "#", text: "Another action"},
                        {href: "#", text: "Something else here"},
                        null,
                        {href: "#", text: "Separated link"},
                    ]
                },
                {
                    toggle: "语言切换",
                    subs: [
                        {href: "#", text: "Action"},
                        {href: "#", text: "Another action"},
                        {href: "#", text: "Something else here"},
                        null,
                        {href: "#", text: "Separated link"},
                    ]
                },
                {
                    toggle: "用户中心",
                    subs: [
                        {href: "#", text: "Action"},
                        {href: "#", text: "Another action"},
                        {href: "#", text: "Something else here"},
                        null,
                        {href: "#", text: "Separated link"},
                    ]
                }
            ],
            menu: [
                {href: "#", icon: ".fa.fa-dashboard", title: "仪表盘"},
                {href: "#", icon: ".fa.fa-object-group", title: "组件", subs: [
                    {href: "#/forms", title: "Form 表单"},
                    {href: "#/dropdowns", title: "Dropdown 下拉"},
                    {href: "#/buttons", title: "Button 按钮"},
                    {href: "#/icons", title: "Icon 图标"}
                ]}
            ]
        },

        _create: function(){
            this._on({
                "click .toggle": "_toggle"
            });
        },

        _init: function () {
            this._render({render: "layout"});
        },

        _toggle: function (e, raw) {
            this._render("update", function (d) {
                d.state = d.state === "max" ? "min" : "max";
            });
        }
    });
});