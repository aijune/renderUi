define(["jquery"], function ($) {

    var getElemState = function(elem){
        var hidden, result;
        elem = $(elem);
        hidden = elem.is(":hidden");
        if(hidden){
            elem.addClass("visible");
        }
        result = {
            position: elem.position(),
            offset: elem.offset(),
            width: elem.outerWidth(),
            height: elem.outerHeight()
        };
        if(hidden){
            elem.removeClass("visible");
        }
        return result;
    };

    $.extend({
        position: function (o) {
            var state = {
                element: getElemState($(o.element)[0]),
                target: getElemState($(o.target)[0])
            };
            if(o.handler){
                o.handler(state);
            }
        }
    });

});
