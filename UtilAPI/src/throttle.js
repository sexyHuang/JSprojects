/**
 * Created by sexyi on 2016/8/29.
 */
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