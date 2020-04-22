define(["jquery", "render"], function ($) {

    $.widget("modal", {
        defaultTag: "div",
        options: {
            type: "",

            //--

            closable: true,
            backdrop: true,
            keyboard: true,
            fade: true,
            centered: false,
            size: "",

            //--

            closed: false
        },
        renders: {
            main: function (o, w) {
                return !o.closed && ["div.modal", {
                    tabindex: "-1",
                    class: {
                        [o.type]: {init: o.type && "add"},
                        fade: {init: o.fade && "add"},
                        show: {delay: o.fade && "add", destroy: o.fade && "remove"}
                    },
                    onclick: w._backdrop,
                    onkeydown: w._keyboard,
                    oncreate: w._createModal,
                    ondestroy: [w._destroyElem, "modal"]
                }, [
                    ["render[name=dialog]"]
                ]];
            },
            dialog: function(o, w){
                return ["div.modal-dialog", {
                    class: {
                        ["modal-" + o.size]: {init: o.size && "add"},
                        "modal-dialog-centered": {init: o.centered && "add"}
                    }
                }, [
                    ["div.modal-content", [
                        ["render[name=title]"],
                        ["render[name=body]"],
                        ["render[name=footer]"]
                    ]]
                ]];
            },
            title: function(o, w){
                return ["slot[name=title]", function (s, o, w) {
                    return ["div.modal-header", [
                        ["h5.modal-title", s.text || s.children],
                        !!o.closable && ["button.close", {
                            type: "button",
                            onclick: w._clickClose
                        }, ["span", "×"]]
                    ]];
                }];
            },
            body: function(o, w){
                return ["div.modal-body", [
                    ["slot[name=content]", function (s, o, w) {
                        return s.text || s.children;
                    }]
                ]];
            },
            footer: function(o, w){
                return ["slot[name=footer]", function (s, o, w) {
                    return ["div.modal-footer", {
                        onclick: w._clickClose
                    },
                        s.children.map(function (child, i) {
                            return [child[0], {
                                onclick: [child[1]["onclick"], {}]
                            }, child[2]]
                        })
                    ];
                }];
            },
            backdrop: function (o, w) {
                return !o.closed && ["this.modal-backdrop", {
                    class: {
                        fade: {init: o.fade && "add"},
                        show: {delay: "add", destroy: "remove"}
                    },
                    ondestroy: [w._destroyElem, "backdrop"]
                }];
            }
        },
        _create: function () {
            this.element.appendTo("body");
            this._render();

            this.backdrop = $("<div>").appendTo("body");
            this._render(this.backdrop, {render: "backdrop"});
        },

        _destroyElem: function(elem, raw, rm){
            if(this.options.fade){
                this._delay(function () {
                    rm();
                    if(elem === "modal"){
                        this._resetBody();
                    }
                }, 300);
            }else{
                rm();
                if(elem === "modal"){
                    this._resetBody();
                }
            }
        },

        _createModal: function (raw) {
            $(raw.node).focus();
            this._setBody();
        },

        _setBody: function(){
            var data, count, isOverflow, scrollWidth;
            var key = "widgets-modal";

            this.body = this.document.find("body");
            data = this.body.data(key) || {};
            count = data.count || 0;

            if(count > 0){
                this.body.data(key, {
                    isOverflow: data.isOverflow,
                    count: count + 1
                });
                return;
            }

            isOverflow = this.body[0].scrollHeight > this.window[0].innerHeight;
            if(isOverflow){
                scrollWidth = this._getScrollWidth();
                this.body.css({
                    paddingRight: scrollWidth + parseFloat(this.body.css("paddingRight"))
                });
            }

            this.body.addClass("modal-open");
            this.body.data(key, {
                isOverflow: isOverflow,
                count: 1
            });
        },

        _resetBody: function(){
            var key = "widgets-modal";
            var data = this.body.data(key);
            var count = data.count;

            if(count > 1){
                this.body.data(key, {
                    isOverflow: data.isOverflow,
                    count: count - 1
                });
                return;
            }

            if(data.isOverflow){
                this.body.removeAttr("style");
            }

            this.body.removeClass("modal-open");
            this.body.removeData(key);
        },

        _getScrollWidth: function(){
            var div = $("<div>").addClass("modal-scrollbar-measure").appendTo("body");
            var width = div[0].getBoundingClientRect().width - div[0].clientWidth;
            div.remove();
            return width;
        },

        _clickClose: function () {
            this.close();
        },

        _backdrop: function (e, raw) {
            if (this.options.backdrop && e.target === raw.node) {
                this.close();
            }
        },

        _keyboard: function (e) {
            if (this.options.keyboard && e.keyCode === 27) {
                this.close();
            }
        },

        close: function(){
            this._render("update", {
                closed: true
            });
            this._render(this.backdrop, "update", {
                closed: true
            });
        }
    });
});
