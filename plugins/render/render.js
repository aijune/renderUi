define(["jquery", "widget"], function ($) {

////----

var slice = Array.prototype.slice;
var eventReg = /^([\w:-]*)\s*(.*)$/;

////----

var Sel = {

    parser: /(?:(^|#|\.)([^#\.\[\]]+))|(\[(.+?)(?:\s*=\s*("|'|)((?:\\["'\]]|.)*?)\5)?\])/g,

    cache: {},

    compile: function(selector) {
        var match, tag = "div", classes = [], data = {};

        if(selector && (match = this.cache[selector])){
            return match;
        }

        while (match = this.parser.exec(selector)){
            var type = match[1], value = match[2];
            if (type === "" && value !== "") {
                tag = value;
            }
            else if (type === "#") data.id = value;
            else if (type === ".") classes.push(value);
            else if (match[3][0] === "[") {
                var attrValue = match[6];
                if (attrValue) attrValue = attrValue.replace(/\\(["'])/g, "$1").replace(/\\\\/g, "\\");
                if (match[4] === "class") classes.push(attrValue);
                else data[match[4]] = attrValue === "" ? attrValue : attrValue || true;
            }
        }

        if (classes.length > 0) data.class = classes.join(" ");
        return this.cache[selector] = {tag: tag, data: data};
    }
};

////----

var Raw = function (data, render, parent, node) {

    var sel, added;

    this.render = render;
    this.widget = render.widget;
    this.parent = parent;
    this.options = parent ? parent.options : render.options;
    this.r = parent ? parent.r : render.render;
    this.args = parent ? parent.args : [render.options, render.widget];
    this.node = node;
    this.selector = data[0];

    sel = Sel.compile(this.selector);
    this.tag = sel.tag;

    if(this.tag === "render"){
        return this.setRender({
            name: sel.data.name,
            data: data[1]
        });
    }

    if(this.tag === "slot"){
        return this.setSlot({
            name: sel.data.name,
            handle: data[1]
        });
    }

    added = this.getAdded(data.slice(1));
    added.data = $.widget.extend({}, this.transClassStyle(sel.data), this.transClassStyle(added.data));

    if(this.tag === "widget"){
        return this.setWidget(added);
    }

    this.setData(added.data);
    this.setChildren(added.children);
    this.text = added.text;

    //svg

    if(/^svg/.test(this.selector)) {
        this.addNS(this.data, this.children);
    }
};

Raw.prototype = {

    constructor: Raw,

    transClassStyle: function(data){
        if(!data){
            return;
        }

        if(typeof data.class === "string"){
            data.class = data.class.split(/\s+/);
            data.class = this.setClass(data.class);
        }

        if(typeof data.style === "string"){
            data.style = data.style.split(/;\s*/);
            data.style = this.setStyle(data.style);
        }

        return data;
    },

    setClass: function (value) {
        var classes = {};
        $.each(value, function(i, v){
            classes[v] = {
                init: "add"
            };
        });
        return classes;
    },

    setStyle: function(value){
        var style = {};
        $.each(value, function(i, v){
            if(v){
                v = v.split(/:\s*/);
                style[v[0]] = v[1];
            }
        });
        return style;
    },

    getAdded: function(data){
        var that = this;
        var result = {}, i = 0, v, children = [];

        if($.isPlainObject(data[0])){
            result.data = data[0];
            i = 1;
        }
        for( ; i < data.length; i++){
            v = data[i];
            if($.isArray(v)){
                this.getArrayChild(v, children);
            }
            else if(v != null && typeof v !== "boolean"){
                children.push(String(v));
            }
        }
        if(children.length === 1 && typeof children[0] === "string"){
            result.text = children[0];
        }
        else if(children.length > 0){
            result.children = children;
        }

        result = {
            data: result.data || {},
            children: result.children || [],
            text: result.text || ""
        };

        $.each(result.data, function (key, value) {
            var args = [];
            if(key === "hooks"){
                if($.isArray(value)){
                    args = slice.call(value, 1);
                    value = value[0];
                }
                if($.isFunction(value)){
                    value = value.apply(that.render.widget, args);
                }
                $.each(value, function (k, v) {
                    that._setEventHook("on" + k, v, result.data);
                });
                delete result.data.hooks;
            }
            else{
               that._setEventHook(key, value, result.data);
            }
        });

        return result;
    },

    _setEventHook: function(key, value, data){
        var that = this;
        var args = [];
        if(/^on/.test(key)){
            if($.isArray(value)){
                args = slice.call(value, 1);
                value = value[0];
            }
            if(value == null){
                delete data[key];
                return;
            }
            if($.isFunction(value)){
                data[key] = function () {
                    return value.apply(that.render.widget, args.concat(slice.call(arguments, 0)));
                };
            }
            else{
                return $.error("Event error: " + value);
            }
        }
    },

    getArrayChild: function(child, children){
        var that = this;
        if(typeof child[0] === "string"){
            children.push(child);
        }
        else{
            $.each(child, function(i, c){
                if($.isArray(c)){
                    that.getArrayChild(c, children);
                }
                else if(c != null && typeof c !== "boolean"){
                    children.push(String(c));
                }
            });
        }
    },

    setRender: function(added, notRaw) {
        var that = this;
        var name = added.name;
        var data = added.data;
        var widget = this.render.widget;
        var args = [this.render.options, widget];
        var renders = widget.renders || {};
        var result = [];
        var render;

        if(!name || !(render = renders[name])){
            $.error("Render error: " + this.selector);
        }

        if($.isArray(data)){
            $.each(data, function (i, item) {
                result.push(that.setRenderItem(render, [item, i].concat(args), notRaw));
            });
        }
        else{
            if(data){
                args = [data].concat(args);
            }
            result.push(this.setRenderItem(render, args, notRaw));
        }

        if(notRaw){
            return result;
        }
    },

    setRenderItem: function(render, args, notRaw){
        var result = render.apply(this.render.widget, args);
        var raw;

        if($.isArray(result[0])){
            result = ["div", result];
        }

        if(notRaw){
            return result;
        }

        this.options = args[0];
        this.r = render;
        this.args = args;
        raw = new Raw(result, this.render, this);
        if(raw.tag !== "slot"){
            raw.parent = this.parent;
            this.parent.children.push(raw);
        }
    },

    setSlot: function(added, notRaw){
        var that = this;
        var name = added.name;
        var handle = added.handle || function(){};
        var widget = this.render.widget;
        var slots = widget.options.slots || {};
        var result = [];
        var slot, ret, raw;

        if(!name){
            $.error("Slot error: " + this.selector);
        }
        if(!(slot = slots[name])){
            return;
        }

        ret = handle.call(widget, slot, this.render.options, widget);

        if(typeof ret === "string"){
            result.push(["span", ret]);
        }
        else if($.isArray(ret) && $.isArray(ret[0])){
            result = result.concat(ret);
        }
        else{
            result.push(ret);
        }


        if(notRaw){
            return result;
        }
        else{
            $.each(result, function (i, item) {
                if(item == null || typeof item === "boolean"){
                    return;
                }
                if(!$.isArray(item)){
                    item = ["span", String(item)];
                }
                raw = new Raw(item, that.render, that);
                raw.parent = that.parent.tag !== "render" ? that.parent : that.parent.parent;
                raw.parent.children.push(raw);
            });
        }
    },

    setWidget: function(added){
        var that = this;
        var toString = Object.prototype.toString;
        var name = added.data.name;
        var slots = {
            default: {
                data: {},
                children: [],
                text: ""
            }
        };

        if(!name || !$.widgets[name]){
            $.error("Widget error: " + this.selector);
        }

        if(added.children){
            $.each(added.children, function (i, child) {
                var match, sel, added;
                if($.isArray(child) && (match = child[0].match(/^slot(?:.*)\[name=(\w+)\](?:.*)$/))){
                    sel = Sel.compile(child[0]);
                    added = that.getAdded(child.slice(1));
                    added.data = $.widget.extend({}, that.transClassStyle(sel.data), that.transClassStyle(added.data));
                    slots[match[1]] = added;
                }
                else{
                    slots.default.children.push(child);
                }
            });
        }
        else if(added.text){
            slots.default.text = added.text;
        }

        $.each(slots, function (key, slot) {
            var result = [];
            $.each(slot.children, function (i, child) {
                result = result.concat(that.formatWidgetChildren(child));
            });
            slot.children = result;
        });

        this.tag = added.data.tag || $.widgets[name]["prototype"]["defaultTag"];
        this.children = [];
        this.text = "";
        this.data = {
            hooks: {
                create: function () {
                    return (function (raw) {
                        $(raw.node)[name](added.data || {}, {slots: slots});
                    }).apply(that.render.widget, slice.call(arguments, 0));
                },
                update: function (raw) {
                    var instance = $(raw.node)[name]("instance");
                    if(instance){
                        instance.option( $.extend(added.data || {}, {slots: slots}));
                        if (instance._update){
                            instance._update();
                        }
                    }
                },
                destroy: function (raw) {
                    var instance = $(raw.node)[name]("instance");
                    if(instance){
                        instance.option( $.extend(added.data || {}, {slots: slots}));
                        if (instance._destroy){
                            instance._destroy();
                        }
                    }
                }
            }
        };
    },

    formatWidgetChildren: function(child){
        var that = this;
        var result = [];
        var match, added, ret;

        if(typeof child === "string"){
            return [child];
        }

        if(!child.length){
            return [];
        }

        if(
            (match = child[0].match(/^slot(?:.*)\[name=(\w+)\](?:.*)$/)) &&
            $.isFunction(child[1])
        ){
            child = that.setSlot({
                name: match[1],
                handle: child[1]
            }, true);
            $.each(child, function (i, c) {
                result = result.concat(that.formatWidgetChildren(c));
            });
            return result;
        }
        else if(match = child[0].match(/^render\[name=(\w+)\]$/)){
            child = that.setRender({
                name: match[1],
                data: child[1]
            }, true);
            $.each(child, function (i, c) {
                result = result.concat(that.formatWidgetChildren(c));
            });
            return result;
        }
        else{
            added = that.getAdded(child.slice(1));
            $.each(added.children, function (i, child) {
                result = result.concat(that.formatWidgetChildren(child));
            });
            return [[child[0], added.data, result.length ? result : added.text]];
        }
    },

    setData: function(value){

        var that = this;
        var data = this.data = {};
        var match;

        $.each(value, function(k, v){
            if(k === "key"){
                that.key = v;
            }
            else if(k === "style"){
                data.style = v;
            }
            else if(k === "class"){
                data.class = v;
            }
            else if(match = k.match(/^on(\w+)$/)){
                if($.inArray(match[1], ["create", "update", "destroy"]) > -1){
                    data.hooks = data.hooks || {};
                    data.hooks[match[1]] = v;
                }
                else{
                    data.events = data.events || {};
                    data.events[match[1]] = v;
                }
            }
            else{
                data.attrs = data.attrs || {};
                data.attrs[k] = typeof v === "object" ? JSON.stringify(v) : v;
            }
        });
    },

    setChildren: function(value){
        var that = this;
        var child;

        this.children = [];

        $.each(value, function (i, item) {
            if(item == null || typeof item === "boolean"){
                return;
            }
            if(typeof item === "string"){
                item = ["span", item];
            }
            child = new Raw(item, that.render, that);
            if($.inArray(child.tag, ["render", "slot"]) < 0){
                that.children.push(child);
            }
        });
    },

    addNS: function(data, children){
        data.ns = "http://www.w3.org/2000/svg";
        $.each(children, function (i, child){
            child.addNS(child.data, child.children);
        });
    },

    update: function(value){
        var that = this;
        var delay, result, raw;

        if($.isFunction(value)){
            value.call(that, this.options);
        }
        else{
            $.widget.extend(this.options, value);
        }

        if(!this.updating){
            this.updating = true;
            delay = window.requestAnimationFrame || window.setTimeout;
            delay(function () {
                that.updating = false;
                result = that.r.apply(that.render.widget, that.args);
                if($.isArray(result[0])){
                    result = ["div", result];
                }

                raw = new Raw(result, that.render, that);
                that.render.diff.patch(that.rTopRaw(), raw);
            });
        }
    },

    rTopRaw: function () {
        var p = this;
        var r;
        while(p.r === this.r){
            r = p;
            p = p.parent;
        }
        return r;
    }
};

////----

var Diff = function(){};

Diff.prototype = {

    constructor: Diff,

    getNodeData: function(node){
        var data = {};
        $.each(node.attributes, function (i, item) {
            data[item.name] = item.value
        });
        return data;
    },

    createRawByNode: function(node, raw){
        return new Raw([node.tagName.toLowerCase(), this.getNodeData(node)], (raw ? raw.render : $(node).data("_render_")), undefined, $(node).empty()[0]);
    },

    sameRaw: function(oldRaw, raw){
        return oldRaw.key === raw.key && oldRaw.selector === raw.selector;
    },

    updateBase: function(oldRaw, raw, prop, callbacks){
        var oldProp, key;
        var newProp = raw.data[prop] || {};
        var node = raw.node;

        if(oldRaw && (oldProp = oldRaw.data[prop] || {})){
            for(key in oldProp){
                if(newProp[key] === undefined){
                    callbacks.remove.call(this, node, key);
                }
            }
        }

        if(callbacks.hook){
            callbacks.hook.call(this, node, oldProp, newProp, callbacks);
        }
        else{
            if(oldProp){
                for(key in newProp){
                    if(oldProp[key] !== newProp[key]){
                        callbacks.add.call(this, node, key, newProp[key]);
                    }
                }
            }
            else{
                for(key in newProp){
                    callbacks.add.call(this, node, key, newProp[key]);
                }
            }
        }
    },

    isFormNode: function (node){
        return $.inArray(node.tagName.toLowerCase(), ["input", "select", "textarea"]) > -1;
    },

    updateAttrs: function(oldRaw, raw){

        this.updateBase(oldRaw, raw, "attrs", {

            add: function (node, key, value) {
                if(key === "value" && this.isFormNode(node)){
                    $(node).val(value);
                }else{
                    $(node).attr(key, value);
                }
            },

            remove: function (node, key) {
                if(key === "value" && this.isFormNode(node)){
                    $(node).val("");
                }else{
                    $(node).removeAttr(key);
                }
            }
        });
    },

    updateStyle: function(oldRaw, raw) {

        this.updateBase(oldRaw, raw, "style", {

            add: function(node, key, value){
                var args = [];

                if($.isArray(value)){
                    args = value;
                    value = args.shift();
                }

                if($.isFunction(value)){
                    value = value.apply(raw.render.widget, args.concat([raw, oldRaw]));
                }

                $(node).css(key, value);
            },

            remove: function(node, key){
                $(node).css(key, "");
            }

        });
    },

    nextFrame: function(callback, time){

        var that = this;
        var timeout;

        if(time){
            setTimeout(function(){
                callback.call(that);
            }, time);
        }
        else{
            timeout = window.requestAnimationFrame || window.setTimeout;
            timeout(function(){
                timeout(function () {
                    callback.call(that);
                });
            });
        }
    },

    updateClasses: function(oldRaw, raw) {

        this.updateBase(oldRaw, raw, "class", {

            hook: function(node, oldClasses, classes, callbacks){

                var that = this;
                var element = $(node);

                $.each(classes, function(key, value){

                    var delay, time, d, t;

                    delay = value.delay;

                    if($.isArray(value.delay)){
                        time = value.delay[1];
                        delay = value.delay[0];
                        if($.isArray(time)){
                            d = time[0];
                            t = time[1];
                            time = undefined;
                        }
                        if($.isArray(delay)){
                            time = delay[1];
                            delay = delay[0];
                        }
                    }

                    if(element.hasClass(key)){
                        if(value.init === "add"){
                            if(delay === "remove"){
                                that.nextFrame(function(){
                                    callbacks.remove.call(that, node, key);
                                    if(d === "add"){
                                        that.nextFrame(function(){
                                            callbacks.add.call(that, node, key);
                                        }, t);
                                    }
                                }, time);
                            }
                        }else{
                            callbacks.remove.call(that, node, key);
                            if(delay === "add"){
                                that.nextFrame(function(){
                                    callbacks.add.call(that, node, key);
                                    if(d === "remove"){
                                        that.nextFrame(function(){
                                            callbacks.remove.call(that, node, key);
                                        }, t);
                                    }
                                }, time);
                            }
                        }
                    }else{
                        if(value.init === "add"){
                            callbacks.add.call(that, node, key);
                            if(delay === "remove"){
                                that.nextFrame(function(){
                                    callbacks.remove.call(that, node, key);
                                    if(d === "add"){
                                        that.nextFrame(function(){
                                            callbacks.add.call(that, node, key);
                                        }, t);
                                    }
                                }, time);
                            }
                        }else{
                            if(delay === "add"){
                                that.nextFrame(function(){
                                    callbacks.add.call(that, node, key);
                                    if(d === "remove"){
                                        that.nextFrame(function(){
                                            callbacks.remove.call(that, node, key);
                                        }, t);
                                    }
                                }, time);
                            }
                        }
                    }
                });
            },

            add: function(node, key){
                $(node).addClass(key);
            },

            remove: function(node, key){
                $(node).removeClass(key);
            }
        });
    },

    updateEvents: function(oldRaw, raw){

        this.updateBase(oldRaw, raw, "events", {

            hook: function(node, oldEvents, events, callbacks){

                var that = this;

                $.each(events, function(key, value){

                    if(!oldEvents || !oldEvents[key]){
                        callbacks.add.call(that, node, key, value);
                    }
                    else{
                        callbacks.remove.call(that, node, key);
                        callbacks.add.call(that, node, key, value);
                    }
                });
            },

            add: function(node, key, value){
                var match = key.match(eventReg);
                var eventName = match[1] + raw.render.eventNamespace;
                var selector = match[2];
                var fn = function (e) {
                    value(e, raw, oldRaw);
                };

                if(selector){
                    $(node).on( eventName, selector, fn);
                }
                else{
                    $(node).on( eventName, fn);
                }
            },

            remove: function(node, key){
                var match = key.match(eventReg);
                $(node).off(match[1] + raw.render.eventNamespace);
            }
        });
    },

    destroyEvents: function(raw) {
        if(raw.data.events){
            $(raw.node).off(raw.render.eventNamespace);
        }
    },

    destroyClasses(raw, rm) {

        this.updateBase(undefined, raw, "class", {

            hook: function(node, oldClasses, classes, callbacks){

                var that = this;
                var dfds = [];

                if($.isEmptyObject(classes)){
                    return rm && rm();
                }

                $.each(classes, function(key, value){

                    var time;

                    if($.isArray(value.destroy)){
                        time = value.destroy[1];
                        value.destroy = value.destroy[0];
                    }

                    if(value.destroy === "add"){
                        callbacks.add.call(that, node, key);
                    }
                    else if(value.destroy === "remove"){
                        if(time){
                            dfds.push($.Deferred(function (dfd) {
                                that.nextFrame(function(){
                                    callbacks.remove.call(that, node, key);
                                    dfd.resolve();
                                }, time);
                            }));
                        }
                        else{
                            callbacks.remove.call(that, node, key);
                        }
                    }
                });

                $.when.apply($, dfds).done(function () {
                    rm && rm();
                });
            },

            add: function(node, key){
                $(node).addClass(key);
            },

            remove: function(node, key){
                $(node).removeClass(key);
            }
        });
    },

    setData: function(raw){
        this.updateAttrs(undefined, raw);
        this.updateStyle(undefined, raw);
        this.updateClasses(undefined, raw);
        this.updateEvents(undefined, raw);
    },

    createNodeByRaw: function(raw, createQueue, root) {

        var that = this;
        var data = raw.data;
        var tag, element, children;

        tag = raw.tag;

        if(tag === "!"){
            raw.node = document.createComment(raw.text);
        }
        else{
            raw.node = data.ns ? document.createElementNS(data.ns, tag) : document.createElement(tag);
            element = $(raw.node);

            if(!root){
                element.data("_raw_", raw);
            }

            this.setData(raw);

            children = raw.children;
            if(children.length){
                $.each(children, function(i, child){
                    element.append(that.createNodeByRaw(child, createQueue));
                });
            }
            else{
                element.html(raw.text);
            }

            if(data.hooks && data.hooks.create){
                createQueue.push(raw);
            }
        }

        return raw.node;
    },

    destroyChildren(children) {
        var that = this;
        $.each(children, function(i, child){
            var hooks = child.data.hooks;

            that.destroyClasses(child);
            that.destroyEvents(child);

            if(hooks && hooks.destroy){
                hooks.destroy(child);
            }
            that._hook("destroy", child);

            that.destroyChildren(child.children);
        });
    },

    removeRaws(raws, startIdx, endIdx) {

        var raw, rm, hooks;

        for (; startIdx <= endIdx; ++startIdx) {

            raw = raws[startIdx];

            if(raw){

                this.destroyChildren(raw.children);

                rm = (function(raw, count){
                    return function(){
                        if(--count < 1){
                            $(raw.node).remove();
                        }
                    };
                })(raw, 3);

                this.destroyClasses(raw, rm);
                this.destroyEvents(raw);

                if((hooks = raw.data.hooks) && hooks.destroy){
                    hooks.destroy(raw, rm);
                }else{
                    rm();
                }

                this._hook("destroy", raw, rm);
            }
        }
    },

    createKeyToIdx: function(raws, startIdx, endIdx) {

        var i, map = {}, raw, key;

        for (i = startIdx; i <= endIdx; ++i) {
            raw = raws[i];
            if(raw && (key = raw.key)){
                map[key] = i;
            }
        }

        return map;
    },

    addRaws: function(parent, afterNode, raws, startIdx, endIdx, createQueue) {

        var raw;

        for (; startIdx <= endIdx; ++startIdx) {
            raw = raws[startIdx];
            if (raw) {
                this.createNodeByRaw(raw, createQueue);
                afterNode ? $(raw.node).insertBefore(afterNode) : $(raw.node).appendTo(parent);
            }
        }
    },

    updateChildren(parent, oldC, newC, createQueue) {

        var oldStartIdx = 0, newStartIdx = 0;
        var oldEndIdx = oldC.length - 1;
        var oldStartRaw = oldC[0];
        var oldEndRaw = oldC[oldEndIdx];
        var newEndIdx = newC.length - 1;
        var newStartRaw = newC[0];
        var newEndRaw = newC[newEndIdx];
        var oldKeyToIdx;
        var oldIdx;
        var rawToMove;
        var afterNode;

        while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
            if (oldStartRaw == null) {
                oldStartRaw = oldC[++oldStartIdx];
            }
            else if (oldEndRaw == null) {
                oldEndRaw = oldC[--oldEndIdx];
            }
            else if (newStartRaw == null) {
                newStartRaw = newC[++newStartIdx];
            }
            else if (newEndRaw == null) {
                newEndRaw = newC[--newEndIdx];
            }
            else if (this.sameRaw(oldStartRaw, newStartRaw)) {
                this.patchRaw(oldStartRaw, newStartRaw, createQueue);
                oldStartRaw = oldC[++oldStartIdx];
                newStartRaw = newC[++newStartIdx];
            }
            else if (this.sameRaw(oldEndRaw, newEndRaw)) {
                this.patchRaw(oldEndRaw, newEndRaw, createQueue);
                oldEndRaw = oldC[--oldEndIdx];
                newEndRaw = newC[--newEndIdx];
            }
            else if (this.sameRaw(oldStartRaw, newEndRaw)) {
                this.patchRaw(oldStartRaw, newEndRaw, createQueue);
                $(oldStartRaw.node).insertAfter(oldEndRaw.node);
                oldStartRaw = oldC[++oldStartIdx];
                newEndRaw = newC[--newEndIdx];
            }
            else if (this.sameRaw(oldEndRaw, newStartRaw)) {
                this.patchRaw(oldEndRaw, newStartRaw, createQueue);
                $(oldEndRaw.node).insertBefore(oldStartRaw.node);
                oldEndRaw = oldC[--oldEndIdx];
                newStartRaw = newC[++newStartIdx];
            }
            else {
                oldKeyToIdx = oldKeyToIdx || this.createKeyToIdx(oldC, oldStartIdx, oldEndIdx);
                if(newStartRaw.key
                    && (oldIdx = oldKeyToIdx[newStartRaw.key])
                    && (rawToMove = oldC[oldIdx])
                    && (rawToMove.selector === newStartRaw.selector)
                ){
                    this.patchRaw(rawToMove, newStartRaw, createQueue);
                    oldC[oldIdx] = null;
                    $(rawToMove.node).insertBefore(oldStartRaw.node);
                }else{
                    $(this.createNodeByRaw(newStartRaw, createQueue)).insertBefore(oldStartRaw.node);
                }
                newStartRaw = newC[++newStartIdx];
            }
        }
        if (oldStartIdx <= oldEndIdx || newStartIdx <= newEndIdx) {
            if (oldStartIdx > oldEndIdx) {
                afterNode = newC[newEndIdx + 1] == null ? null : newC[newEndIdx + 1].node;
                this.addRaws(parent, afterNode, newC, newStartIdx, newEndIdx, createQueue);
            }
            else {
                this.removeRaws(oldC, oldStartIdx, oldEndIdx);
            }
        }
    },

    _hook: function(hook, raw, oldRaw){
        var hooks = $(raw.node).data("_hook_");
        var fn;

        if(hooks){
            fn = hooks[hook];
        }

        if(fn){
            fn(raw, oldRaw);
            if(!fn.keep){
                delete hooks[hook];
            }
        }
        else if($.isFunction(oldRaw)){
            oldRaw();
        }
    },

    updateData: function(oldRaw, raw){
        this.updateAttrs(oldRaw, raw);
        this.updateStyle(oldRaw, raw);
        this.updateClasses(oldRaw, raw);
        this.updateEvents(oldRaw, raw);
    },

    patchRaw: function(oldRaw, raw, createQueue, root) {

        var data = raw.data;
        var node, element, oldChildren, children;

        node = raw.node = oldRaw.node;
        element = $(node);
        if(!root){
            element.data("_raw_", raw);
        }

        if(data.hooks && data.hooks.update){
            data.hooks.update(raw, oldRaw);
        }
        this._hook("update", raw, oldRaw);

        if(data.remove){
            return this.removeRaws([raw], 0, 0);
        }

        this.updateData(oldRaw, raw);

        oldChildren = oldRaw.children;
        children = raw.children;

        if(oldChildren.length && children.length){
            this.updateChildren(node, oldChildren, children, createQueue);
        }
        else if(children.length){
            if(oldRaw.text){
                element.empty();
            }
            this.addRaws(node, null, children, 0, children.length - 1, createQueue);
        }
        else if(oldChildren.length){
            this.removeRaws(oldChildren, 0, oldChildren.length - 1);
            element.html(raw.text);
        }
        else{
            if(oldRaw.text !== raw.text){
                element.html(raw.text);
            }
        }
    },

    patch: function(oldRaw, raw) {

        if(!oldRaw && !raw){
            return;
        }

        if(!oldRaw){
            raw.createQueue = [];
            this.createNodeByRaw(raw, raw.createQueue, true);
        }
        else if(!raw){
            if(oldRaw.constructor !== Raw){
                oldRaw = this.createRawByNode(oldRaw);
            }
            this.removeRaws([oldRaw], 0, 0);
        }
        else{
            if(oldRaw.constructor !== Raw){
                oldRaw = this.createRawByNode(oldRaw, raw);
            }
            raw.createQueue = [];
            this.patchRaw(oldRaw, raw, raw.createQueue, true);

            $.each(raw.createQueue, function(i, raw){
                raw.data.hooks.create(raw);
            });
        }

        return raw;
    }
};


////----


var renderUuid = 0;

var Render = function (node, options) {
    var renders;

    this.node = node;
    this.uuid = renderUuid++;
    this.eventNamespace = "._render_" + this.uuid;

    $.data(this.node, "_render_", this);

    this.render = options.render;
    this.options = $.widget.extend({}, options.options);
    this.widget = options.widget || this;

    //--

    this.init();
};

Render.prototype = {

    constructor: Render,

    diff: new Diff(),

    createHooks: [],

    updateHooks: [],

    destroyHooks: [],

    init: function () {
        var that = this;
        var hook;

        $(this.node).on("remove" + this.eventNamespace, function (e) {
            if ( e.target === that.node ) {
                that.destroy();
            }
        });

        this.createRaw();
        this.mergeRaw();
        this.patch();

        if(
            this.raw &&
            (hook = this.raw.data.hooks) &&
            (hook = hook.create)
        ){
            hook(this.raw);
        }

        //--

        $.each(this.createHooks, function (key, hook) {
            hook.call(that);
        });
    },

    createRaw: function () {

        var data;

        if($.isArray(this.render)){
            data = this.render;
        }
        else if($.isFunction(this.render)){
            data = this.render.call(this, this.options, this.widget);
            if(!$.isArray(data)){
                data = [];
            }
        }
        else{
            data = [];
        }

        if(!data.length){
            this.raw = null;
            return;
        }
        while($.isArray(data[0])){
            data = data.length > 1 ? ["this", data] : data[0];
        }
        if(!/^this[\.#\[]*/.test(data[0])){
            data = ["this", data];
        }
        this.raw = new Raw(data, this);
    },

    mergeRaw: function(update){

        var element = $(this.node);

        if(this.raw){
            this.raw.tag = element.prop("tagName").toLowerCase();

            if(!this.defaultRaw){
                this.defaultRaw = element.data("_raw_") || this.diff.createRawByNode(this.node);
            }

            if(this.defaultRaw.data.style){
                this.raw.data.style = $.widget.extend({}, this.defaultRaw.data.style, this.raw.data.style);
            }
            if(this.defaultRaw.data.class){
                this.raw.data.class = $.widget.extend({}, this.defaultRaw.data.class, this.raw.data.class);
            }
            if(this.defaultRaw.data.attrs){
                this.raw.data.attrs = $.widget.extend({}, this.defaultRaw.data.attrs, this.raw.data.attrs);
            }
        }
    },

    patch: function () {
        this.diff.patch(this.oldRaw || this.node, this.raw);
        this.oldRaw = this.raw;
    },

    update: function (value, callback) {
        var that = this;
        var delay;

        if($.isFunction(value)){
            value.call(that, this.options);
        }
        else{
            $.widget.extend(this.options, value);
        }

        if(callback){
            this.updateCallbacks = this.updateCallbacks || [];
            this.updateCallbacks.push(callback);
        }

        if(!this.updating){
            this.updating = true;
            delay = window.requestAnimationFrame || window.setTimeout;
            delay(function () {
                that.updating = false;
                that.createRaw();
                that.mergeRaw();
                that.patch();

                //--

                $.each(that.updateCallbacks, function (i, callback) {
                    callback.call(that, that.options);
                });
                that.updateCallbacks = undefined;

                $.each(that.updateHooks, function (key, hook) {
                    hook.call(that);
                });
            })
        }
    },

    destroy: function(){
        var that = this;

        $.removeData(this.node, "_render_");
        $.each(this.destroyHooks, function (key, hook) {
            hook.call(that);
        });
    },

    hook: function (nodes, hook, fn, keep) {
        $(nodes).each(function (i, node) {
            var element = $(node);
            var hooks = element.data("_hook_") || {};

            hooks[hook] = function (raw, oldRaw) {
                fn.call(raw.render.widget, raw, oldRaw, i, node);
            };
            hooks[hook]["keep"] = keep;
            element.data("_hook_", hooks);
        });
    },

    option: function(key){
        if(key){
            return eval("this.options." + key);
        }
        return this.options;
    },

};

Render.hook = function (key, hook) {
    switch (key) {
        case "create":
            Render.prototype.createHooks.push(hook);
            break;
        case "update":
            Render.prototype.updateHooks.push(hook);
            break;
        case "destroy":
            Render.prototype.destroyHooks.push(hook);
            break;
    }
};

$.Render = Render;


////----


$.fn.extend({

    render: function(options, render, widget){

        var returnValue = this;
        var value;

        this.each(function (i, node) {
            if(value = $.render(node, options, render, widget)){
                returnValue = value;
                return false;
            }
        });

        return returnValue;
    },

    raw: function(name){
        if(this.length){
            return $.raw(this[0], name) || null;
        }
        return null;
    },

    serializeJson: function(){
        var serializeObj={};
        var temp = this.serializeArray();
        var not_checked_object = $("input[type=checkbox]:not(:checked)", this);
        $.each(not_checked_object, function () {
            if (!temp.hasOwnProperty(this.name)){
                temp.push({name: this.name, value: ""});
            }
        });
        $(temp).each(function(){
            if(serializeObj[this.name]){
                if($.isArray(serializeObj[this.name])){
                    serializeObj[this.name].push(this.value);
                }else{
                    serializeObj[this.name] = [serializeObj[this.name], this.value];
                }
            }else{
                serializeObj[this.name] = this.value;
            }
        });
        return serializeObj;
    }

});

$.extend({

    render: function(node, options, render, widget){

        var instance;
        var element = $(node);

        if(typeof options === "string"){

            instance = element.data("_render_") || (element.data("_raw_") || {})["render"];

            if(!instance){
                return $.error("Uninitialized method error: " + options);
            }

            if(options === "instance"){
                return instance;
            }

            if (!$.isFunction(instance[options]) || options.charAt(0) === "_"){
                return $.error("Method error: " + options);
            }

            return instance[options].apply(instance, [].slice.call(arguments, 2));
        }

        if(element.data("_render_")){
            element.render("destroy");
        }

        if($.isPlainObject(options)){
            new Render(node, options);
        }
        else{
            if($.isFunction(options)){
                widget = render;
                render = options;
                options = undefined;
            }

            new Render(node, {
                options: options,
                render: render,
                widget: widget
            });
        }
    },

    raw: function(node, name){
        var element = $(node);
        var raw = element.data("_raw_") || (element.data("_render_") || {})["raw"] || null;
        return name ? (raw || {})[name] || null : raw;
    }

});


////----


if($.Widget){

    $.extend($.Widget.prototype, {

        renders: {},

        _update: function(){},

        _render: function (element, options, render) {
            var widget = this;
            var value, isObject;

            if (!element || !element.jquery) {
                return this._render.apply(this, [this.element].concat(slice.call(arguments)));
            }

            if (typeof options === "string") {
                return element.render.apply(element, slice.call(arguments, 1));
            }

            if($.isFunction(options)){
                render = options;
                options = this.options;
            }
            else{
                isObject = typeof options === "object";
                value = isObject ? options["render"] : "main";
                render = typeof value === "string" ? this.renders[value] : value;
                if(!render){
                    $.error("Render " + value + " is not exist.");
                }
                options = isObject ? (options.options || this.options) : this.options;
                widget = isObject ? (options.widget || this) : this;
            }

            element.render({
                render: render,
                options: options,
                widget: widget
            });
        }
    });

}


////----扩展$(selector).ready();


if(!$.fn.selector){

    $.fn.init = (function (orig) {

        return function (selector, context, root) {
            var inst = orig.call(this, selector, context, root);
            inst.selector = selector;
            return inst;
        }

    })($.fn.init);

    $.fn.init.prototype = $.fn;
}

$.fn.ready = (function (orig) {

    return function (fn) {
        var that = this;

        if(this[0] === document){
            return orig.call(this, fn);
        }
        else{
            if(this.length){
                fn.call(this[0], $);
            }
            else{
                $.Deferred(function (dfd) {
                    var element;
                    var time = 3000;
                    var interval = setInterval(function () {
                        element = $(that.selector);
                        if(element.length){
                            clearInterval(interval);
                            dfd.resolveWith(element[0], $);
                        }
                        else{
                            time -= 50;
                            if(time <= 0){
                                clearInterval(interval);
                            }
                        }
                    }, 50);
                }).done(fn);
            }
            return this;
        }
    }

})($.fn.ready);


});
