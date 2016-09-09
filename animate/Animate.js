/**
 * Created by sexyi on 2016/8/29.
 */
/**
 * 动画
 * @param target 目标元素
 * @param json 改变参数与结果键值对，期望格式{attr：xx，attr：xx}
 * @param fn 动画结束后调用函数
 */
function startMove(target, json, fn) {
    var left = 0;
    var end;
    var flag;
    //console.log(left);
    var speed = 0;
    //target.timer = null;
    //this.initLeft = left;
    clearInterval(target.mTimer);
    target.mTimer = setInterval(function () {
        flag = true;
        for (var type in json) {
            end = json[type];
            /* if (type == 'width') {
             left = target.clientWidth;
             } else {
             type = 'left';
             left = parseFloat(window.getComputedStyle(target, null).left);
             //console.log(left);
             }*/
            if (type == 'opacity') {
                left = Math.round(parseFloat(window.getComputedStyle(target, null)[type]) * 100);
            } else {
                left = parseInt(window.getComputedStyle(target, null)[type]);
            }
            speed = (end - left) / 7;
            speed = speed >= 0 ? Math.ceil(speed) : Math.floor(speed);
            if (end != left) {
                flag = false;
            }
            left += speed;
            //console.log(left / 100);
            if (type === 'opacity') {
                target.style.opacity = left / 100;
            } else {
                target.style[type] = left + 'px';
            }
            if (flag == true) {
                clearInterval(target.mTimer);
                if (fn) {
                    fn();
                }
            }
        }
    }, 30);
}
