require(["jquery", "routes", "widgets/layout"], function($){

    $("#layout").render(function () {
        return ["widget[name=layout]"];
    });

    // Change our States
    $.history.pushState({state:1}, "State 1", "/aaa?state=1"); // logs {state:1}, "State 1", "?state=1"
    $.history.pushState({state:2}, "State 2", "/aaa/bbb?state=2"); // logs {state:2}, "State 2", "?state=2"
    $.history.replaceState({state:3}, "State 3", "/aaa/bbb/ccc?state=3"); // logs {state:3}, "State 3", "?state=3"
    $.history.pushState(null, null, "/aaa/bbb/ccc/ddd?state=4"); // logs {}, '', "?state=4"
    $.history.back(); // logs {state:3}, "State 3", "?state=3"
    $.history.back(); // logs {state:1}, "State 1", "?state=1"
    $.history.back(); // logs {}, "Home Page", "?"
    $.history.go(2); // logs {state:3}, "State 3", "?state=3"

});
