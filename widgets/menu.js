define(["jquery", "render"], function ($) {

    $.widget("menu", {
        defaultTag: "ul",
        options: {
            items: []
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
                    item.subs && ["ul.menu", ["render[name=sub]", item.subs]]
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
        _init: function () {
            this._render();
        },
        _toggle: function (e, raw) {
            e.preventDefault();
            raw.update(function (o) {
                o.extend = !o.extend;
            });
        },
        _link: function(item, e, raw){
            $.router.go({
                url: item.href,
                title: item.title,
                data: item,
                event: e
            });
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
