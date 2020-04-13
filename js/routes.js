define(["jquery", "router", "widgets/layout"], function($){

    $.router({
        mode: "hash",
        layout: function(view, state){
            view.render(function () {
                return ["widget[name=layout]"];
            });
        },
        routes: {
            "/": function (view, state) {
                view.html(111);
            },
            "/forms": function (view, state) {
                view.html(222);
                //view.forms();
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
