/**
 * Created by sexyi on 2016/8/28.
 */
//var floatBox = document.getElementById('divFloat');
//var FloatLayer1 = new FloatLayer(floatBox);
window.onload = function () {
    var FloatLayer1 = new FloatLayer('divFloat');
    var testBtn = document.getElementById('test');
    var confirmBtn = document.getElementById('btnSure');
    var cancelBtn = document.getElementById('btnCancel');
    FloatLayer1.init();
    testBtn.addEventListener('click', function () {
        FloatLayer1.show();
    });
    confirmBtn.addEventListener('click', function () {
        FloatLayer1.close();
    });
    cancelBtn.addEventListener('click', function () {
        FloatLayer1.close();
    });
    DragDrop.enable();
    DragDrop.addHandler('dragstart', function (event) {
        //event.target.style.cursor = 'move';
        DragDrop.diffX = event.x - event.target.parentNode.offsetLeft;
        DragDrop.diffY = event.y - event.target.parentNode.offsetTop;
        console.log('Start dragging');
    });
    DragDrop.addHandler('drag', function (event) {
        var parent = event.target.parentNode, px, py;
        px = event.x - DragDrop.diffX;
        py = event.y - DragDrop.diffY;
        if (px < 0) {
            px = 0;
        } else if (px + parent.offsetWidth > window.innerWidth) {
            px = window.innerWidth - parent.offsetWidth;
        }
        if (py < 0) {
            py = 0;
        } else if (py + parent.offsetHeight > window.innerHeight) {
            py = window.innerHeight - parent.offsetHeight;
        }
        parent.style.position = 'absolute';
        // console.log(event.target.parentNode)
        parent.style.margin = 0;
        parent.style.left = px + 'px';
        parent.style.top = py + 'px';
        //console.log('dx:'+event.dx+',dy:'+event.dy);
    });
    DragDrop.addHandler('dragend', function () {
        console.log('Dorpped');
    });
};
