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
            "/dropdown": function (view, state) {
                require(["pagedropdown"], function () {
                    view.pagedropdown();
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
