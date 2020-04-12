requirejs = {
    baseUrl: "/renderUi/js",
    urlArgs: "v=20200220",
    paths: {
        jquery: "../plugins/jquery/jquery",
        history: "../plugins/history/history",
        router: "../plugins/router/router",
        popper: "../plugins/popper/popper",
        bootstrap: "../plugins/bootstrap/bootstrap",
        widget: "../plugins/widget/widget",
        render: "../plugins/render/render",
        widgets: "../widgets/"
    },
    shim: {
        //bootstrap: ["popper"]
    }
};
