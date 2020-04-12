define(["jquery", "history"], function ($) {

    var Router = function (o) {
        o = o || {};

        this.mode = o.mode || "history";
        this.layout = o.layout || "";
        this.routes = o.routes || {};

        this._init();
    };

    Router.prototype = {

        constructor: Router,

        _init: function () {

            var that = this;

            $.history.init({
                html4Mode: this.mode === "hash" ? true : false
            });

            $.history.Adapter.bind(window, "statechange", function(){
                that._match($.history.getState());
            });
        },

        _match: function (state) {
            var that = this;
            var next = true;
            var path = state.hash;

            console.log(path);

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

    $.router = function (o) {
        return new Router(o);
    };
});
