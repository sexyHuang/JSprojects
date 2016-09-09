/**
 * Created by sexyi on 2016/8/27.
 */
/**
 * 验证类
 * @constructor
 */
function Validator() {

}

/**
 * 验证的类型
 * @type {{isNotEmpty: {validate: Validator.type.isNotEmpty.validate, message: string},
 *      isEmpty: {validate: Validator.type.isEmpty.validate, message: string},
 *      isEqualTo: {validate: Validator.type.isEqualTo.validate, message: Validator.type.isEqualTo.message},
 *      isNotEqualTo: {validate: Validator.type.isNotEqualTo.validate, message: Validator.type.isNotEqualTo.message},
 *      isValidName: {validate: Validator.type.isValidName.validate, message: string},
 *      isValidEmail: {validate: Validator.type.isValidEmail.validate, message: string},
 *      isValidPassword: {validate: Validator.type.isValidPassword.validate, message: string},
 *      isValidMobile: {validate: Validator.type.isValidMobile.validate, message: string}}}
 */
Validator.prototype.type = {
    'isNotEmpty': {
        validate: function (value) {
            return value !== '';
        },
        message: '不得为空！'
    },
    'isEmpty': {
        validate: function (value) {
            return value !== '';
        },
        message: '可以为空！'
    },
    'isEqualTo': {
        validate: function (value1, value2) {
            return value1 === value2;
        },
        message: function (fieldText) {
            return '必须和' + fieldText + '相同，请重新输入'
        }
    },
    'isNotEqualTo': {
        validate: function (value1, value2) {
            return value1 !== value2;
        },
        message: function (fieldText) {
            return '必须和' + fieldText + '不同，请重新输入'
        }
    },
    'isValidName': {
        validate: function (value) {
            var i = 0, len = value.length, t_len = 0;
            while (i < len) {
                if (value.charCodeAt(i) >= 0 && value.charCodeAt(i) < 128) {
                    t_len++;
                } else {
                    t_len += 2;
                }
                i++;
            }
            return t_len >= 4 && t_len <= 16;
        },
        message: '只能为 4-16 个字符'

    },
    'isValidEmail': {
        validate: function (value) {
            var filter = /^\w[-\w.]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}$/;
            return filter.test(value);
        },
        message: '输入不正确'

    },
    'isValidPassword': {
        validate: function (value) {
            return value.length >= 6 && value.length <= 20;
        },
        message: '长度必须在6~20之间'
    },
    'isValidMobile': {
        validate: function (value) {
            return (/^(13[0-9]|15[012356789]|18[02356789]|14[57])[0-9]{8}$/).test(value);
        },
        message: '输入不正确'

    }
};

/**
 * 验证器
 * @param data 要验证的数据
 * @param config 其他验证所需信息（验证类型）
 * @returns {string} 验证失败的信息，成功为空
 */
Validator.prototype.validate = function (data, config) {
    var validators, validatorItem, checker,
        item = config,
        msg = '', result;
    if (!item) {
        return msg;
    }

    //console.log(config);
    validators = item.validators;
    for (var i = 0; i < validators.length; i++) {
        validatorItem = validators[i];
        //console.log(validatorItem);
        if (typeof validatorItem == 'string') {
            checker = this.type[validatorItem];
            if (!checker) {
                throw{
                    name: 'ValidationError',
                    message: 'No handler to validate type' + validatorItem
                }
            }
        } else if (Array.isArray(validatorItem)) {
            checker = this.type[validatorItem[0]];
            if (!checker) {
                throw{
                    name: 'ValidationError',
                    message: 'No handler to validate type' + validatorItem
                }
            }
        } else {
            throw {
                name: "ValidationError",
                message: "No such validator *" + validatorItem + "* found."
            }
        }
        if (Array.isArray(data)) {
            result = checker.validate.apply(null, data);
        } else {
            result = checker.validate(data);
        }

        if (!result) {
            var msgType = typeof checker.message;
            if (msgType == 'string') {
                msg = item.name + checker.message;

            } else if (msgType == 'function') {
                msg = item.name + checker.message(validatorItem[1]);
            }
            break;
        }
    }
    return msg;
};

/**
 * 返回验证结果
 * @param message 验证失败信息
 * @returns {boolean}
 */
Validator.prototype.hasError = function (message) {
    return message !== '';
};

/**
 * 判断元素能否为空
 * @param message 验证失败信息
 * @returns {boolean}
 */
Validator.prototype.canEmpty = function (message) {
    return /可以为空/.test(message);
};