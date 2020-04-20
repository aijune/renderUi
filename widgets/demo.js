define(["jquery", "widgets/page"], function ($) {

    $.widget("demo", {

        options: {
            title: []
        },

        renders: {
            main: function (o, w) {
                return ["widget[name=page]", [
                    ["slot[name=title]", [
                        ["slot[name=title]", function (s, o, w) {
                            return ["span", s.text];
                        }]
                    ]],
                    ["slot[name=content]", [
                        ["render[name=grid]"]
                    ]]
                ]];
            },
            grid: function (o, w) {
                return ["div.row",
                    ["div.col-9",
                        ["slot[name=content]", function (s, o, w) {
                            return s.children;
                        }]
                    ],
                    ["div.col-3",
                        ["nav", {
                            style: {
                                position: "sticky",
                                top: "116px"
                            }
                        }, [
                            ["slot[name=nav]", function (s, o, w) {
                                return s.children;
                            }]
                        ]]

                    ]
                ];
            }
        },

        _init: function () {
            this._render();
        }

    });

});
