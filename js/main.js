require(["jquery", "widgets/layout", "jquerymobile"], function($){




    $("#layout").render(function () {
        return ["widget[name=layout]"];
    });

    $("#layout")[0].onclick = function (e) {
        console.log(111);
    };

    $("body")[0].onclick = function (e) {
        console.log(222);
    };
    $(document)[0].onclick = function (e) {
        console.log(333);
    };

    $("#layout")[0].click();

    $("#layout").trigger("click");
    $("#layout").trigger("click");



    /* $.mobile.navigate( "#foo", { info: "info about the #foo hash" });


     $.mobile.navigate( "#bar" );

     $( window ).on( "navigate", function( event, data ) {
         console.log( event, data );
     });







     window.history.back();
 */
});
