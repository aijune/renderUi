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
                    onremove: w._removeAll
                }, [
                    ["render[name=modal]"],
                    ["render[name=backdrop]"]
                ]];
            },
            modal: function (o, w) {
                return ["div.modal", {
                    tabindex: "-1",
                    class: [
                        {name: o.type, init: o.type && "add"},
                        {name: "fade", init: o.fade && "add"},
                        {name: "show", delay: o.fade && "add", destroy: o.fade && "remove"}
                    ],
                    onclick: "_backdrop",
                    onkeydown: "_keyboard",
                    onmounted: "_mountedModal"
                }, [
                    ["div.modal-dialog", {
                        class: [
                            {name: "modal-" + o.size, init: o.size && "add"},
                            {name: "modal-dialog-centered", init: o.centered && "add"}
                        ]
                    }, [
                        ["div.modal-content", [
                            [!!o.title, "div.modal-header", [
                                ["h5.modal-title", o.title],
                                [!!o.closable, "button.close", {
                                    type: "button",
                                    onclick: "_clickClose"
                                }, [
                                    ["span", "×"]
                                ]]
                            ]],
                            ["div.modal-body", {onmounted: ["_slot", o.content]}],
                            [!!o.buttons.length, "div.modal-footer",
                                o.buttons.map(function (button, i) {
                                    return ["button", {
                                        type: "button",
                                        class: [{name: button.classes, init: "add"}],
                                        onclick: ["_clickButton", i]
                                    }, [
                                        [!!button.icon, "i." + button.icon],
                                        ["span", button.text]
                                    ]]
                                })
                            ]
                        ]]
                    ]]
                ]];
            }
        },
        _create: function () {
            this.element.appendTo("body");
            this._render();
        },

        _init: function () {
            this._fragment(function (o) {
                return [!o.closed, "div.fpx-modal", {
                    onremove: "_removeAll"
                }, [
                    ["_modal", o],
                    ["_modalbackdrop", o]
                ]];
            });
        },


        _clickToggle: function (e, raw) {
            var that = this;
            that._render("update",
                function (o) {
                    o.isDropdown = !o.isDropdown;
                });
        },
        _clickItem: function(e, raw){
            this._menuClose();
        },
        _keydownToggle: function(e){
            if(
                e.keyCode === 40 &&
                this.items.length
            ){
                if(!this._render("option").isDropdown){
                    this._menuOpen();
                }
                else{
                    this.items.eq(0).focus();
                }
            }
        },
        _keydownItem: function(e){
            var target = $(e.currentTarget);
            var index = this.items.index(target);
            var leng = this.items.length;

            if(e.keyCode === 40 && index < leng){
                index++;
            }
            else if(e.keyCode === 38 && index > 0){
                index--;
            }

            this.items.eq(index).focus();
        },
        _keydown: function(e){
            if(e.keyCode === 27){
                this._menuClose();
            }
        },
        _closeDropdown: function(e){
            var target = $(e.target);
            if(
                !target.closest(this.element).length &&
                this._render("option").isDropdown
            ){
                this._menuClose();
            }
        },
        _menuOpen: function(){
            this._render("update", {isDropdown: true});
        },
        _menuClose: function () {
            this._render("update", {isDropdown: false});
        }
    });
});