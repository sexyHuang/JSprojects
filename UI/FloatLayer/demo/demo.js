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

};
