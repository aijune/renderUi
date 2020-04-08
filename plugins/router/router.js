define(["jquery"], function ($) {

    var Router = function (o) {
        o = o || {};

        this.base = o.base || "";
        this.mode = o.mode || "hash";
        this.layout = o.layout || "";
        this.routes = o.routes || {};

        this.stack = [];
        this.activeIndex = 0;

        /*
        this.path = o.path || "";


        */

        this._init();
    };

    Router.prototype = {

        constructor: Router,

        ENS: ".router",

        _init: function () {
            switch (this.mode) {
                case "hash":
                    this._hash();
                    break;
                case "history":
                    this._history();
                    break;
            }
        },

        _hash: function(){
            var that = this;

            $(window).on("hashchange", function () {
                that._setHash();
            });

            $(function () {
                that._setHash();
            });
        },

        _setHash: function(){
            var path = (location.hash || "#").substring(1);
            if(path){
                this._setPath(path, {});
                this._match();
            }
            else{
                location.hash = "#/";
            }
        },

        _setPath: function(path, data){
            this.stack.push({
                path: path,
                data: data
            });
            this.activeIndex = this.stack.length -1;
        },

        _history: function () {

            var that = this;

            $(window).on("popstate", function () {
                that._match(location.pathname);
            });

            $(document).on("click" + this.ENS, "a[href]", function (e) {
                e.preventDefault();
                history.pushState(null, "", $(e.target).attr("href"));
                that._match(location.pathname);
            });

            $(function () {
                that._match(location.pathname);
            });
        },

        _match: function (path) {
            var that = this;
            var next = true;

            if(this.filter && this.filter.call(this) === false){
                return;
            }

            $.each(this.routes, function (i, route) {
                if(that.path + route.path === path){
                    if(!route.filter || route.filter.call(this) !== false){
                        route.render();
                    }
                    return next = false;
                }
            });

            if(next){
                $.each(this.routers, function (i, router) {
                    if(path.indexOf(router.path) === 0){
                        router._match(path.substring(router.path.length));
                        return false;
                    }
                });
            }
        },

        push: function (path, data) {
            this.stack.push({
                path: path,
                data: data
            });
        }
    };

    var router;

    $.router = function (o) {
        return router = new Router(o);
    };

    $.router.push = function () {
        router.push.apply(router, arguments);
    };

    $.router.go = function (n) {
        router.go(n);
    };

    $.router.replace = function () {
        router.replace.apply(router, arguments);
    };
});
