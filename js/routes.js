define(["config", "jquery", "router"], function(config, $){

    $.router({

        mode: "hash",

        layout: function(view, state, next){
            require(["w/layout"], function () {
                view.render(function () {
                    return ["widget[name=layout]", config.layout];
                });
                next();
            });
        },

        routes: {
            "/": function (view, state) {
                require(["pagewelcome"], function () {
                    view.pagewelcome();
                });
            },
            "/dropdown": function (view, state) {
                require(["demodropdown"], function () {
                    view.demodropdown({
                        route: state
                    });
                });
            },
            "/modal": function (view, state) {
                require(["demomodal"], function () {
                    view.demomodal({
                        route: state
                    });
                });
            },
            "/popup": function (view, state) {
                require(["demopopup"], function () {
                    view.demopopup({
                        route: state
                    });
                });
            },
            "/picker": function (view, state) {
                require(["demopicker"], function () {
                    view.demopicker({
                        route: state
                    });
                });
            },
            "/forms": function (view, state) {
                require(["pageforms"], function () {
                    view.pageforms();
                });
            },
            "/buttons": function (view, state) {
                view.html(444);
                //view.buttons();
            },
            "/icons": function (view, state) {
                view.html(555);
                //view.icons();
            }
        }
    });
});
