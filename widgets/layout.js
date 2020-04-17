define(["jquery", "bootstrap", "render", "history", "widgets/menu"], function ($) {

    $.widget("layout", {
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
                {href: "/", icon: ".fa.fa-dashboard", title: "仪表盘"},
                {href: "#", icon: ".fa.fa-object-group", title: "组件", extend: false, subs: [
                    {href: "/forms", title: "Form 表单"},
                    {href: "/dropdowns", title: "Dropdown 下拉"},
                    {href: "/buttons", title: "Button 按钮"},
                    {href: "/icons", title: "Icon 图标"}
                ]}
            ]
        },
        renders: {
            main: function(o, w){
                return ["this.layout", [
                    ["render[name=header]"],
                    ["render[name=body]"]
                ]];
            },
            header: function (o, w) {
                return ["header.layout-header", [
                    ["render[name=brand]"],
                    ["render[name=topbar]"]
                ]];
            },
            body: function (o, w) {
                return ["main.layout-body", [
                    ["render[name=aside]"],
                    ["article.router-view"]
                ]];
            },
            brand: function(o, w){
                return ["a.layout-brand[href=#]", [
                    ["span.toggle", {class: o.state}, o.title[o.state]]
                ]];
            },
            topbar: function(o, w){
                var arrow = o.state === "max" ? "left" : "right";
                return ["div.layout-topbar", [
                    ["a.toggle[href=#]", ["i.fa.fa-chevron-" + arrow]],
                    ["div.nav", ["render[name=topbarNavs]", o.navs]]
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
            aside: function (o, w) {
                return ["aside.layout-aside", {class: o.state}, [
                    ["widget[name=menu]", {items: o.menu}]
                ]];
            }
        },
        _create: function(){
            this._on({
                "click .toggle": "_toggle"
            });
        },
        _init: function () {
            this._render();
        },
        _toggle: function (e, raw) {
            this._render("update", function (o) {
                o.state = o.state === "max" ? "min" : "max";
            });
        }
    });
});
