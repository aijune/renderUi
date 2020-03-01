import $ from "@/lib/render";

$.widget("Topbar", {

    options: {
        arrow: "left"
    },

    _init: function () {
        this._render(function (o, w) {
            return [".layout-topbar", [
                ["a.toggle[href=#]", {onclick: w._toggleAside}, ["i.fa.fa-chevron-" + o.arrow]],
                ["div.nav", [
                    ["div.dropdown", [
                        ["a.dropdown-toggle[href=#]", {"data-toggle": "dropdown", "data-offset": "-3"}, "消息"],
                        ["div.dropdown-menu.dropdown-menu-right", [
                            ["a.dropdown-item", {href: "#"}, "Action"],
                            ["a.dropdown-item", {href: "#"}, "Another action"],
                            ["a.dropdown-item", {href: "#"}, "Something else here"],
                            ["div.dropdown-divider"],
                            ["a.dropdown-item", {href: "#"}, "Separated link"]
                        ]]
                    ]],
                    ["div.dropdown", [
                        ["a.dropdown-toggle[href=#]", {"data-toggle": "dropdown", "data-offset": "-3"}, "语言切换"],
                        ["div.dropdown-menu.dropdown-menu-right", [
                            ["a.dropdown-item", {href: "#"}, "Action"],
                            ["a.dropdown-item", {href: "#"}, "Another action"],
                            ["a.dropdown-item", {href: "#"}, "Something else here"],
                            ["div.dropdown-divider"],
                            ["a.dropdown-item", {href: "#"}, "Separated link"]
                        ]]
                    ]],
                    ["div.dropdown", [
                        ["a.dropdown-toggle[href=#]", {"data-toggle": "dropdown", "data-offset": "-3"}, "用户中心"],
                        ["div.dropdown-menu.dropdown-menu-right", [
                            ["a.dropdown-item", {href: "#"}, "Action"],
                            ["a.dropdown-item", {href: "#"}, "Another action"],
                            ["a.dropdown-item", {href: "#"}, "Something else here"],
                            ["div.dropdown-divider"],
                            ["a.dropdown-item", {href: "#"}, "Separated link"]
                        ]]
                    ]],
                    ["a.toggle[href=#]", {onclick: w._toggleSetting}, "设置"]
                ]]
            ]];
        });
    },

    _toggleAside: function () {
        this._render("update", function (o) {
            o.arrow = o.arrow === "left" ? "right" : "left";
        });

        $(":widgets-Brand").Brand("toggle");
        $(":widgets-Aside").Aside("toggle");
    },

    _toggleSetting: function () {

    }

});
