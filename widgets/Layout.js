define(["jquery", "render"], function ($) {

    $.widget("Layout", {

        options: {
            state: "max",
            title: {max: "AdminUI", min: "UI"}
        },

        _init: function () {
            this._render(function (d, w) {
                return [".layout", [
                    w._header(d, w),
                    w._main(d, w)
                ]];
            });
        },

        _header: function (d, w) {
            return ["header.layout-header", [
                w._brand(d, w),
                w._topBar(d, w)
            ]];
        },

        _brand: function(d, w){
            return ["a.layout-brand[href=#]", [
                ["span.toggle", {
                    class: d.state,
                    onclick: w._toggleAside
                }, d.title[d.state]]
            ]];
        },

        _toggleAside: function (e) {
            //e.preventDefault();
            this._render("update", function (d) {
                //d.state = d.state === "max" ? "min" : "max";
                //d.title = d.title[d.state];
            });
        },

        _topBar: function(d, w){
            var arrow = d.state === "max" ? "left" : "right";
            return ["div.layout-topbar", [
                ["a.toggle[href=#]", {onclick: w._toggleAside}, ["i.fa.fa-chevron-" + arrow]],
                ["div.nav", []]
            ]];
        },

        _main: function (d, w) {
            return ["main.layout-main", [
                w._aside(d, w),
                ["article"]
            ]];
        },

        _aside: function (d, w) {
            return ["aside.layout-aside", {class: d.state}, [
                ["ul.menu", [
                    /*["li", ["a.menu-a", {href: "#"}, ["i.fa.fa-dashboard"], ["span", "仪表盘"]]],
                    ["li", [
                        ["a.menu-a", {href: "#"}, ["i.fa.fa-object-group"], ["span", "组件"], ["i.fa.fa-angle-right"]],
                        ["ul.menu", [
                            ["li", ["a.menu-a", {href: "#/forms"}, ["span", "Form 表单"]]],
                            ["li", ["a.menu-a", {href: "#/dropdowns"}, ["span", "Dropdown 下拉"]]],
                            ["li", ["a.menu-a", {href: "#/buttons"}, ["span", "Button 按钮"]]],
                            ["li", ["a.menu-a", {href: "#"}, ["span", "Icon 图标"]]]
                        ]]
                    ]],
                    ["li", ["a.menu-a", {href: "#"}, ["i.fa.fa-language"], ["span", "国际化"]]],
                    ["li", ["a.menu-a", {href: "#"}, ["i.fa.fa-plug"], ["span", "开发"]]]*/
                ]]
            ]];
        }
    });

});