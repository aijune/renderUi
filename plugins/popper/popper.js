define(["jquery", "position"], function ($) {

    $.fn.popper = function (o) {

        var pos;

        o = $.extend({
            placement: "bottom",
            offset: 0,
            arrowElement: null,
            using: null
        }, o);

        switch (o.placement) {
            case "bottom":
                pos = {
                    my: "center top+" + o.offset,
                    at: "center bottom"
                };
                break;
            case "bottom-left":
                pos = {
                    my: "left top+" + o.offset,
                    at: "left bottom"
                };
                break;
            case "bottom-right":
                pos = {
                    my: "right top+" + o.offset,
                    at: "right bottom"
                };
                break;
            case "top":
                pos = {
                    my: "center bottom-" + o.offset,
                    at: "center top"
                };
                break;
            case "top-left":
                pos = {
                    my: "left bottom-" + o.offset,
                    at: "left top"
                };
                break;
            case "top-right":
                pos = {
                    my: "right bottom-" + o.offset,
                    at: "right top"
                };
                break;
            case "left":
                pos = {
                    my: "right-" + o.offset + " center",
                    at: "left center"
                };
                break;
            case "left-top":
                pos = {
                    my: "right-" + o.offset + " top",
                    at: "left top"
                };
                break;
            case "left-bottom":
                pos = {
                    my: "right-" + o.offset + " bottom",
                    at: "left bottom"
                };
                break;
            case "right":
                pos = {
                    my: "left+" + o.offset + " center",
                    at: "right center"
                };
                break;
            case "right-top":
                pos = {
                    my: "left+" + o.offset + " top",
                    at: "right top"
                };
                break;
            case "right-bottom":
                pos = {
                    my: "left+" + o.offset + " bottom",
                    at: "right bottom"
                };
                break;
        }

        return this.position({
            my: pos.my,
            at: pos.at,
            of: o.of,
            collision: o.collision || "flip",
            within: o.within || window,
            using: function (offset, data) {
                var arrow = data.arrow = {};
                var element = data.element;
                var target = data.target;
                var p = o.placement.split("-");

                arrow.element = element.element.find(o.arrowElement);
                arrow.height = arrow.element.outerHeight(true);
                arrow.width = arrow.element.outerWidth(true);

                data.origPlacement = o.placement;

                if(p[0] === "bottom" || p[0] === "top"){

                    arrow.top = "";
                    data.placement = element.top > target.top ? "bottom" : "top";

                    if(p[1]){

                        data.placement += "-" +  p[1];

                        if(p[1] === "left"){
                            arrow.left = parseInt(target.width / 2 - arrow.width /2);
                        }
                        else if(p[1] === "right"){
                            arrow.left = parseInt(element.width - (target.width / 2 + arrow.width / 2));
                        }
                    }
                    else{
                        arrow.left = parseInt(element.width / 2 - arrow.width / 2);
                    }
                }
                else {

                    arrow.left = "";
                    data.placement = element.left > target.left ? "right" : "left";

                    if(p[1]){

                        data.placement += "-" +  p[1];

                        if(p[1] === "top"){
                            arrow.top = parseInt(target.height / 2 - arrow.height /2);
                        }
                        else if(p[1] === "bottom"){
                            arrow.top = parseInt(element.height - (target.height / 2 + arrow.height / 2));
                        }
                    }
                    else{
                        arrow.top = parseInt(element.height / 2 - arrow.height / 2);
                    }
                }

                return o.using(offset, data);
            }
        });
    };

});
