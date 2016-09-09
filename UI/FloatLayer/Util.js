/**
 * Created by sexyi on 2016/8/29.
 */
/**
 * 跨浏览器事件对象
 * @type {{addHandler: EventUtil.addHandler, removeHandler: EventUtil.removeHandler, getEvent: EventUtil.getEvent, getTarget: EventUtil.getTarget, preventDefault: EventUtil.preventDefault, stopPropagation: EventUtil.stopPropagation}}
 */
var EventUtil = {
    addHandler: function (element, type, handler) {
        if (element.addEventListener) {
            element.addEventListener(type, handler, false);
        } else if (element.attachEvent) {
            element.attachEvent('on' + type, handler);
        } else {
            element['on' + type] = handler;
        }
    },

    removeHandler: function (element, type, handler) {
        if (element.removeEventListener) {
            element.removeEventListener(type, handler, false);
        } else if (element.detachEvent) {
            element.detachEvent('on' + type, handler);
        } else {
            element["on" + type] = null;
        }
    },

    getEvent: function (event) {
        return event ? event : window.event;
    },

    getTarget: function (event) {
        return event.target || event.srcElement;
    },

    preventDefault: function (event) {
        if (event.preventDefault) {
            event.preventDefault();
        } else {
            event.returnValue = false;
        }
    },

    stopPropagation: function (event) {
        if (event.stopPropagation) {
            event.stopPropagation();
        } else {
            event.cancelBubble = true;
        }
    }
};

/**
 * Created by sexyi on 2016/8/28.
 */
/**
 * 自定义事件对象
 * @constructor
 */
function EventTarget() {
    this.handlers = {};
}

EventTarget.prototype = {
    constructor: EventTarget,

    //添加事件处理程序
    addHandler: function (type, handler) {
        if (typeof this.handlers[type] == 'undefined') {
            this.handlers[type] = [];
        }

        this.handlers[type].push(handler);
    },

    //触发事件
    fire: function (event) {
        if (!event.target) {
            event.target = this;
        }
        if (this.handlers[event.type] instanceof Array) {
            var handlers = this.handlers[event.type];
            for (var i = 0; i < handlers.length; i++) {
                handlers[i](event);
            }
        }
    },

    //删除事件处理程序
    removeHandler: function (type, handler) {
        if (this.handlers[type] instanceof Array) {
            var handlers = this.handlers[type];
            for (var i = 0; i < handlers.length; i++) {
                if(handlers[i] === handler){
                    break;
                }
            }
            handlers.splice(i,1);
        }
    }
};

/**
 * Created by sexyi on 2016/8/28.
 */
/**
 * 为Window添加DragDrop对象
 */
var DragDrop = function () {

    var dragdrop = new EventTarget(),
        dragging = null;
    dragdrop.diffX = 0;
    dragdrop.diffY = 0;

    function handleEvent(event) {

        //获取事件和对象
        event = EventUtil.getEvent(event);
        var target = EventUtil.getTarget(event);

        //确定事件类型
        switch (event.type) {
            case 'mousedown':
                if (target.className.indexOf('draggable') > -1) {
                    dragging = target;
                    dragging.style.cursor = 'move';
                    //dragdrop.diffX = event.clientX - target.offsetLeft;
                    // dragdrop.diffY = event.clientY - target.offsetTop;

                    dragdrop.fire({
                        type: 'dragstart', target: dragging,
                        x: event.clientX, y: event.clientY
                    });
                }
                break;
            case 'mousemove':
                if (dragging !== null) {

                    //指定位置
                    // dragging.style.left = (event.clientX - diffX)+'px';
                    //dragging.style.top =(event.clientY - diffY)+'px';

                    //触发自定义事件
                    dragdrop.fire({type: 'drag', target: dragging,
                        x: event.clientX, y: event.clientY });
                }
                break;
            case 'mouseup':
                dragging.style.cursor = 'default';
                dragdrop.fire({type: 'dragend', target: dragging,
                    x: event.clientX, y: event.clientY});
                dragging = null;
                break;
        }
    }

    //公共接口
    dragdrop.enable = function () {
        EventUtil.addHandler(document,'mousedown',handleEvent);
        EventUtil.addHandler(document,'mousemove',handleEvent);
        EventUtil.addHandler(document,'mouseup',handleEvent);
    };

    dragdrop.disable = function () {
        EventUtil.removeHandler(document,'mousedown',handleEvent);
        EventUtil.removeHandler(document,'mousemove',handleEvent);
        EventUtil.removeHandler(document,'mouseup',handleEvent);
    };

    return dragdrop;
}();

/**
 * 函数节流器
 * @param method 目标函数
 * @param context 目标函数运行环境（可选）
 */
function throttle(method, context) {
    clearTimeout(method.tId);
    method.tId = setTimeout(function () {
        method.call(context);
    }, 100);
}