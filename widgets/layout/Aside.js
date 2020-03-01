import $ from "@/lib/render";


$.widget("Aside", {

    options: {
        state: "max"
    },

    _init: function () {

        this._render(function (o, w) {
            return [".layout-aside", {class: o.state}, [
                ["ul.menu", [
                    ["li", ["a.menu-a", {href: "#"}, ["i.fa.fa-dashboard"], ["span", "仪表盘"]]],
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
                    ["li", ["a.menu-a", {href: "#"}, ["i.fa.fa-plug"], ["span", "开发"]]]
                ]]
            ]];
        });
    },

    toggle: function () {
        this._render("update", function (o) {
            o.state = o.state === "max" ? "min" : "max";
        });
    }
});
