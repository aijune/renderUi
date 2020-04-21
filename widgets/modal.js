define(["jquery", "render"], function ($) {

    $.widget("modal", {
        defaultTag: "div",
        options: {
            type: "",
            title: "",
            closable: true,
            backdrop: true,
            keyboard: true,
            fade: true,
            centered: false,
            size: "",
            content: "",
            buttons: [],

            //--

            closed: false
        },
        renders: {
            main: function (o, w) {
                return !o.closed && ["this", {
                    style: {
                        position: "fixed",
                        top: 0,
                        left: 0,
                        zIndex: 1039,
                        width: "100vw",
                        height: "100vh"
                    },
                    onremove: w._removeAll
                }, [
                    ["render[name=modal]"],
                    ["render[name=backdrop]"]
                ]];
            },
            modal: function (o, w) {
                return ["div.modal", {
                    tabindex: "-1",
                    class: {
                        [o.type]: {init: o.type && "add"},
                        fade: {init: o.fade && "add"},
                        show: {delay: o.fade && "add", destroy: o.fade && "remove"}
                    },
                    onclick: w._backdrop,
                    onkeydown: w._keyboard,
                    oncreate: w._createModal
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
                        onclick: w._clickButton
                    }, s.children];
                }];
            },
            backdrop: function (o, w) {
                return ["div.modal-backdrop", {
                    class: {
                        fade: {init: o.fade && "add"},
                        show: {delay: "add", destroy: "remove"}
                    }
                }];
            }
        },
        _create: function () {
            this.element.appendTo("body");
            this._render();
        },

        _removeAll: function(sel, rm){
            if(this.options.fade){
                this._delay(function () {
                    rm();
                    this._resetBody();
                }, 300);
            }else{
                rm();
                this._resetBody();
            }
        },

        _createModal: function (raw) {
            $(raw.node).focus();
            this._setBody();
        },

        _setBody: function(){
            var data, count, isOverflow, scrollWidth, fixedElems;

            this.body = this.document.find("body");

            data = this.body.data("fpx-modal") || {};
            count = data.count || 0;

            if(count > 0){
                this.body.data("fpx-modal", {
                    isOverflow: data.isOverflow,
                    fixedElems: data.fixedElems,
                    count: count + 1
                });
                return;
            }

            isOverflow = this.body[0].scrollHeight > this.window[0].innerHeight;

            if(isOverflow){

                scrollWidth = this._getScrollWidth();
                fixedElems = $(".fixed-top, .fixed-bottom, .is-fixed, .sticky-top");

                this.body.css({
                    paddingRight: scrollWidth + parseFloat(this.body.css("paddingRight"))
                });

                fixedElems.each(function (i, elem) {
                    elem = $(elem);
                    elem.css({
                        marginRight: scrollWidth + parseFloat(elem.css("marginRight"))
                    });
                });
            }

            this.body.addClass("modal-open");
            this.body.data("fpx-modal", {
                isOverflow: isOverflow,
                fixedElems: fixedElems,
                count: 1
            });
        },

        _resetBody: function(){
            var data = this.body.data("fpx-modal");
            var count = data.count;

            if(count > 1){
                this.body.data("fpx-modal", {
                    isOverflow: data.isOverflow,
                    fixedElems: data.fixedElems,
                    count: count - 1
                });
                return;
            }

            if(data.isOverflow){
                this.body.removeAttr("style");
                data.fixedElems.removeAttr("style");
            }

            this.body.removeClass("modal-open");
            this.body.removeData("fpx-modal");
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

        _clickButton: function(i, event, sel){
            var item = this.options.buttons[i];
            if($.isFunction(item.click)){
                item.click.call(this.element, event, sel.node);
            }
        },

        _backdrop: function (event, sel) {
            if (this.options.backdrop && event.target === sel.node) {
                this.close();
            }
        },

        _keyboard: function (event) {
            if (this.options.keyboard && event.keyCode === 27) {
                this.close();
            }
        },

        close: function(){
            this._fragment("update", {
                closed: true
            });
        }
    });
});
