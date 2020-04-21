define(["jquery", "widgets/code", "widgets/demo", "widgets/modal"], function ($, code) {

    var codeBase = `
        $(elem).render(function (o, w) {
            return ["button.btn.btn-primary[type=bottom]", {
                onclick: w._openModal
            }, "确定"];
        }, {
            _openModal: function(){
                $("<div>").render(function(){
                    return ["widget[name=modal]", [
                        ["slot[name=title]", "标题"],
                        ["slot[name=content]", [
                            ["div", "我是内容"]
                        ]],
                        ["slot[name=footer]", [
                            ["button.btn.btn-primary[type=bottom]", {
                                onclick: function(e, raw){
                                    alert("666");
                                }
                            }, "确定"],
                            ["button.btn.btn-primary[type=bottom]", {
                                onclick: function(e, raw){
                                    alert("999");
                                }
                            }, "取消"]                    
                        ]]
                    ]];
                });
            }
        });
    `;

    $.widget("demomodal", {

        renders: {
            main: function (o, w) {
                return ["widget[name=demo]", [
                    ["slot[name=title]", o.route.title],
                    ["slot[name=nav]", [
                        ["render[name=nav]"]
                    ]],
                    ["slot[name=content]", [
                        ["render[name=content]"]
                    ]]
                ]];
            },
            nav: function(o, w){
                return ["ul", [
                    ["li", ["a[href=#base]", "基本"]]
                ]];
            },
            content: function (o, w) {
                return [
                    ["h4#base.anchor", "基本"],
                    ["p", "包含2个slot。slot[name=toggle]，定义切换按钮，按钮必须有 .dropdown-toggle类。slot[name=menu]，定义弹出menu。"],
                    ["div", {oncreate: [code, codeBase]}]
                ];
            }
        },

        _create: function () {
            this._render();
        }
    });
});
