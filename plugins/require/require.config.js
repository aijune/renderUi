requirejs = {
    baseUrl: "/renderUi/js",
    urlArgs: "v=20200220",
    paths: {
        page: "../plugins/page/page",
        jquery: "../plugins/jquery/jquery",
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