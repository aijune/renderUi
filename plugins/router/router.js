define(["jquery"], function ($) {

    var Router = function (o) {
        o = o || {};

        this.mode = o.mode || "hash";
        this.filter = o.filter;
        this.routes = o.routes;
        this.routers = o.routers;
        this.path = o.path || "";

        this._init();
        setTimeout(() => {
            if(!this.parent){
                this._run();
            }
        });
    };

    Router.prototype = {

        constructor: Router,

        ENS: ".router",

        _init: function () {
            $.each(this.routers, function (i, router) {
                router.parent = this;
            });
        },

        _run: function(){
            if(this.mode === "hash"){
                this._hash();
            }
            else if(this.mode === "history"){
                this._history();
            }
        },

        _hash: function(){

            var that = this;

            $(window).on("hashchange", function () {
                that._match(that._setHash(location.hash));
            });

            $(document).on("click" + this.ENS, "a[href]", function (e) {
                e.preventDefault();
                location.hash = "#" + $(e.currentTarget).attr("href");
            });

            $(function () {
                that._match(that._setHash(location.hash));
            })
        },

        _setHash: function(hash){
            if(!hash){
                location.hash = "#/";
            }
            else{
                return hash.substring(1);
            }
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
        }
    };

    var router;

    $.router = function (o) {
        return router = new Router(o);
    };

    $.router.push = function (o) {
        router.push(o);
    };

    $.router.go = function (n) {
        router.go(n);
    };

    $.router.replace = function (o) {
        router.replace(o);
    };
});
