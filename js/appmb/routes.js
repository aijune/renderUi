define(["jquery", "router"], function($){
    $.router({
        mode: "hash",
        routes: {
            "/": function (view, state, next) {
                require(["appmb/home"], function () {
                    view.home();
                });
            }
        }
    });
});
