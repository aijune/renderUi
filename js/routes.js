require(["jquery", "router", "widgets/layout"], function($){
    $.router({
        mode: "hash",
        base: "/renderUi",
        routes: {
            "*": function () {
                this.redirect("/");
            },
            "/": function(){
                this.redirect("/user/login");
            },
            "/user": {
                layout: "user",
                routes: {
                    "/login": function (elem) {
                        $(elem).login();
                    },
                    "/logout": function (elem) {
                        $(elem).logout();
                    },
                    "/sign": function (elem) {
                        $(elem).sign();
                    }
                }
            },
            "/center": {
                layout: "center",
                routes: {
                    "/forms": function (elem) {
                        $(elem).forms();
                    },
                    "/dropdowns": function (elem) {
                        $(elem).dropdowns();
                    },
                    "/buttons": function (elem) {
                        $(elem).buttons();
                    },
                    "/icons": function (elem) {
                        $(elem).icons();
                    }
                }
            }
        }
    });
});
