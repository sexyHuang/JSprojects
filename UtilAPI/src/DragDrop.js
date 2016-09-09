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