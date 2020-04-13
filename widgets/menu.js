define(["jquery", "bootstrap", "render"], function ($) {

    $.widget("menu", {
        defaultTag: "ul",
        options: {
            items: [
                /*
                {href: "#", icon: ".fa.fa-dashboard", title: "仪表盘"},
                {href: "#", icon: ".fa.fa-object-group", title: "组件", extend: false, subs: [
                    {href: "#/forms", title: "Form 表单"},
                    {href: "#/dropdowns", title: "Dropdown 下拉"},
                    {href: "#/buttons", title: "Button 按钮"},
                    {href: "#/icons", title: "Icon 图标"}
                ]}
                */
            ]
        },
        renders: {
            main: function (o, w) {
                return ["this.menu",
                    ["render[name=item]", o.items]
                ];
            },
            item: function(item, i, o, w){
                return ["li.menu-item", {
                    class: {
                        extend: {init: item.extend && "add"}
                    }
                }, [
                    ["a", {
                        href: item.href,
                        onclick: item.subs ? w._toggle : [w._link, item]
                    }, [
                        ["i" + item.icon],
                        ["span", item.title],
                        item.subs && ["i.fa.fa-angle-down"]
                    ]],
                    item.subs && ["ul.menu", {
                        style: {
                            height: [w._height, item]
                        }
                    },
                        ["render[name=sub]", item.subs]
                    ]
                ]];
            },
            sub: function(item, i, o, w){
                return  ["li.menu-item", [
                    ["a", {
                        href: item.href,
                        onclick: [w._link, item]
                    }, ["span", item.title]]
                ]];
            }
        },
        _create: function(){
            this._on(this.window, {
                "navigate": function (e, data) {
                    console.log(data);
                }
            });
        },
        _init: function () {
            this._render();
        },
        _toggle: function (e, raw) {
            raw.update(function (o) {
                o.extend = !o.extend;
            });
        },
        _link: function(item, e){
            console.log("#" + item.href)
            $.mobile.navigate("/renderUi/index.html#" + item.href, item);
        },
        _height: function (item, raw) {
            if(!item.extend){
                return 0;
            }
            var h = 0;
            $(raw.node).children().each(function () {
                h += $(this).height();
            });
            return h;
        }
    });
});
