define(["config", "jquery", "router", "widgets/layout"], function(config, $){

    $.router({

        mode: "hash",

        layout: function(view, state){
            view.render(function () {
                return ["widget[name=layout]", config.layout];
            });
        },

        routes: {
            "/": function (view, state) {
                require(["pagewelcome"], function () {
                    view.pagewelcome();
                });
            },
            "/forms": function (view, state) {
                require(["pageforms"], function () {
                    view.pageforms();
                });
            },
            "/dropdowns": function (view, state) {
                view.html(333);
                //view.dropdowns();
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
