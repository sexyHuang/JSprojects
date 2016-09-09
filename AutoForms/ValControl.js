/**
 * 验证控件类
 * @param id 目标元素ID
 * @param validators 目标元素的验证方法
 * @constructor
 */
var ValControl = function (id, validators) {
    var that = this;
    this.item = document.getElementById(id);
    this.tip = this.item.parentNode.lastElementChild;
    this.item.addEventListener("focus", this.showTip());
    this.validators = validators;
    this.Validator = new Validator();
    this.item.addEventListener('blur', this.focusOut());
};

/**
 * 显示输入提示
 * @returns {Function}
 */
ValControl.prototype.showTip = function () {
    var tip = this.tip;
    var item = this.item;
    var that = this;
    return function () {
        // console.log(that.validators);
        tip.style.color = "rgba(102,175,233,1)";
        tip.innerHTML = item.dataset.rule;
        item.style.border = "1px solid rgba(102,175,233,1)";
        item.style.boxShadow = "inset 0 1px 1px rgba(0,0,0,.075),0 0 8px rgba(102,175,233,.6)";
    }
};

/**
 * 检查方法
 * @return message 返回验证类
 */
ValControl.prototype.check = function () {
    var tip = this.tip;
    var item = this.item;
    var validators = this.validators;
    var data = item.value.trim();
    var compare = item.dataset.compare;

    if (compare != undefined) {
        var compareValue = document.getElementById(compare).value.trim();
        data = [item.value.trim(), compareValue];
    }
    var config = {
        name: item.dataset.name,
        validators: validators
    };
    //console.log(data);
    var message = this.Validator.validate(data, config);
    return message;
};

/**
 * 元素失焦方法
 * @returns {Function}
 */
ValControl.prototype.focusOut = function () {
    var tip = this.tip;
    var input = this.item;
    var that = this;
    return function () {
        var message = that.check();
        if (that.Validator.canEmpty(message)) {
            tip.innerHTML = '';
            input.style.borderColor = '#aaa';
            input.style.boxShadow = 'inset 0 1px 1px rgba(0,0,0,.075)';
            return;
        }
        //console.log(message);
        if (!that.Validator.hasError(message)) {
            tip.innerText = input.dataset.success;
            tip.style.display = 'inline-block';
            tip.style.color = 'rgba(99, 185, 77,1)';
            input.style.borderColor = 'rgba(99, 185, 77,1)';
            input.style.boxShadow = "inset 0 1px 1px rgba(0,0,0,.075)";
        } else {
            tip.innerHTML = message;
            tip.style.display = 'inline-block';
            tip.style.color = 'rgba(219, 6, 30,1)';
            input.style.borderColor = 'rgba(219, 6, 30,1)';
            input.style.boxShadow = "inset 0 1px 1px rgba(0,0,0,.075)";
        }
    }

};

/**
 * 获得验证结果
 * @returns {boolean}
 */
ValControl.prototype.getResult = function () {
    var message = this.check();
    if (this.Validator.canEmpty(message)) {
        return true;
    } else {
        return !this.Validator.hasError(message);
    }
};