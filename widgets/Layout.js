define(["jquery", "bootstrap", "render"], function ($) {

    $.widget("Layout", {

        //--数据

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

        //--模板

        _layout: function(d, w){
            return ["div.layout", [
                w._header(d, w),
                w._main(d, w)
            ]];
        },
        _header: function (d, w) {
            return ["header.layout-header", [
                w._brand(d, w),
                w._topBar(d, w)
            ]];
        },
        _main: function (d, w) {
            return ["main.layout-main", [
                w._aside(d, w),
                ["article"]
            ]];
        },
        _brand: function(d, w){
            return ["a.layout-brand[href=#]", [
                ["span.toggle", {class: d.state}, d.title[d.state]]
            ]];
        },
        _topBar: function(d, w){
            var arrow = d.state === "max" ? "left" : "right";
            return ["div.layout-topbar", [
                ["a.toggle[href=#]", ["i.fa.fa-chevron-" + arrow]],
                ["div.nav", w._topBarNavs(d.navs, w)]
            ]];
        },
        _topBarNavs: function(d, w){
            return d.map(function (item, i) {
                return ["div.dropdown", [
                    ["a.dropdown-toggle[href=#]", {"data-toggle": "dropdown"}, item.toggle],
                    ["div.dropdown-menu.dropdown-menu-right", w._topBarSubs(item.subs, w)]
                ]];
            });
        },
        _topBarSubs: function(d, w){
            return d.map(function (item, i) {
                return item ? ["a.dropdown-item", {href: item.href}, item.text] : ["div.dropdown-divider"];
            });
        },
        _aside: function (d, w) {
            return ["aside.layout-aside", {class: d.state}, [
                ["ul.menu", w._asideMenu(d.menu, w)]
            ]];
        },
        _asideMenu: function(d, w){
            return d.map(function (item, i) {
                return ["li", [
                    ["a.menu-a", {href: item.href}, [
                        ["i" + item.icon],
                        ["span", item.title],
                        item.subs && [
                            ["i.fa.fa-angle-right"],
                            ["ul.menu", w._asideSubs(item.subs, w)]
                        ]
                    ]]
                ]];
            });
        },
        _asideSubs: function(d, w){
            return d.map(function (item, i) {
                return  ["li", [
                    ["a.menu-a", {href: item.href}, ["span", item.title]]
                ]];
            });
        },

        //--逻辑

        _create: function(){
            this._on({
                "click .toggle": this._toggle
            });
        },
        _init: function () {
            this._render(this._layout);
        },
        _toggle: function (e, raw) {
            this._render("update", function (d) {
                d.state = d.state === "max" ? "min" : "max";
            });
        }
    });
});