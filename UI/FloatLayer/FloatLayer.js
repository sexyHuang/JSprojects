/**Created by sexyi on 2016/8/28.*/

/**
 * 浮出层类
 * @param element 浮出层内容的ID
 * @constructor
 */
var FloatLayer = function (element) {
    this.body = document.body;
    //获取浮出层内容
    this.ele = document.getElementById(element);
};

/**
 * 初始化浮出层
 * 浮出层Class为"floatLayer",可为其设置浮出层遮罩颜色，默认全透明
 */
FloatLayer.prototype.init = function () {
    var that = this,
        body = this.body;

    //创建浮出层
    this.floatLayer = document.createElement('div');
    this.floatLayer.className = 'floatLayer';
    this.floatLayer.style = 'position:fixed; left: 0 ; top:0; width: 100%';
    this.floatLayer.style.display = 'none';
    this.floatLayer.style.height = window.innerHeight + 'px';
    this.eleHei = this.ele.offsetHeight;
    //内容居中
    setCenter();
    //this.ele.style.marginTop = (window.innerHeight - that.ele.offsetHeight) / 2 + 'px';
    this.floatLayer.appendChild(this.ele);
    body.appendChild(this.floatLayer);
    this.floatLayer.addEventListener('click', function (event) {
        if (event.target.className !== 'floatLayer') {
            return;
        } else {
            that.close();
        }

    });

    //自动居中
    window.onresize = function () {

        throttle(setCenter);
    };

    /**
     * 内容垂直居中
     */
    function setCenter() {
        that.ele.style.position = 'static';
        that.floatLayer.style.height = window.innerHeight + 'px';
        that.ele.style.margin= (window.innerHeight - that.eleHei) / 2 + 'px auto';
    }
};

/**
 * 浮出层展现接口
 */
FloatLayer.prototype.show = function () {
    //禁止滚动
    this.ele.style.position = 'static';
    this.ele.style.margin = (window.innerHeight - this.eleHei) / 2 + 'px auto';
    this.body.style.overflow = 'hidden';
    this.floatLayer.style.display = 'block';

};
/**
 * 浮出层关闭接口
 */
FloatLayer.prototype.close = function () {
    //恢复滚动
    this.body.style.overflow = 'auto';
    this.floatLayer.style.display = 'none';

};

