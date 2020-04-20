define(["jquery", "render"], function ($) {

    $.widget("dropdown", {
        defaultTag: "div",
        options: {
            isDropdown: false
        },
        renders: {
            main: function (o, w) {
                return ["this", {
                    class: $.extend({}, o.class || {
                        dropdown: {init: "add"}
                    }, {
                        show: {init: o.isDropdown && "add"}
                    })
                }, [
                    ["slot[name=toggle]", function (s, o, w) {
                        return s.children;
                    }],
                    ["slot[name=menu]", function (s, o, w) {
                        return ["div.dropdown-menu", {
                            class: $.extend({}, s.data.class, {
                                show: {init: o.isDropdown && "add"}
                            }),
                            style: o.menuStyle
                        }, [
                            s.children
                        ]];
                    }]
                ]];
            }
        },
        _create: function(){
            this._on({
                "click .dropdown-toggle": "_clickToggle",
                "click .dropdown-item": "_clickItem",
                "keydown .dropdown-toggle": "_keydownToggle",
                "keydown .dropdown-item": "_keydownItem",
                "keydown": "_keydown"
            });

            this._on(this.document, {
                "click": "_closeDropdown",
                "focusin": "_closeDropdown"
            });

            this._render();

            this.toggle = this.element.find(".dropdown-toggle");
            this.menu = this.element.find(".dropdown-menu");
            this.items = this.menu.find(".dropdown-item");
        },
        _clickToggle: function (e, raw) {
            var that = this;

            $.position({
                element: this.menu,
                target: this.toggle,
                handler: function(state){
                    var pos = that._position(state);
                    that._render("update", function (o) {
                        o.isDropdown = !o.isDropdown;
                        o.menuStyle = {
                            left: pos.left,
                            top: pos.top
                        };
                    });
                }
            });
        },
        _position: function(state){
            var right = this.menu.hasClass("dropdown-menu-right");
            var offset = 0;

            if(right){
                return {
                    left: state.target.position.left + state.target.width - state.element.width,
                    top: state.target.position.top + state.target.height
                }
            }
            else{
                return {
                    left: state.target.position.left,
                    top: state.target.position.top + state.target.height
                }
            }
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
                !target.closest(this.toggle).length &&
                !target.closest(this.menu).length &&
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
