requirejs = {
    baseUrl: "/renderUi/js",
    urlArgs: "v=20200220",
    paths: {
        jquery: "../plugins/jquery/jquery",
        jqueryextent: "../plugins/jquery/jquery.extend",
        history: "../plugins/history/history",
        router: "../plugins/router/router",
        mobileselect: "../plugins/mobileselect/mobileselect",
        //position: "../plugins/popper/position",
        //popper: "../plugins/popper/popper",
        //bootstrap: "../plugins/bootstrap/bootstrap",
        "async-validator": "../plugins/validator/async-validator",
        validator: "../plugins/validator/validator",
        widget: "../plugins/widget/widget",
        render: "../plugins/render/render",
        widgets: "../widgets/"
    },
    shim: {
        //bootstrap: ["popper"]
    }
};
