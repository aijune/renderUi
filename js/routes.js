require(["jquery", "router", "widgets/layout"], function($){

    $.router({
        routes: [
            {
                path: "/",
                render: function () {
                    console.log("/");
                }
            },
            {
                path: "/forms",
                render: function () {
                    console.log("/forms");
                }
            },
            {
                path: "/dropdowns",
                render: function () {
                    console.log("/dropdowns");
                }
            },
            {
                path: "/buttons",
                render: function () {
                    console.log("/buttons");
                }
            },
            {
                path: "/icons",
                render: function () {
                    console.log("/icons");
                }
            }
        ]
    });
});
