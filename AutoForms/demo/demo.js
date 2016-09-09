/**
 * Created by sexyi on 2016/8/27.
 */
var config = {
    "name": {
        "id": "name2",
        "label": "姓名",
        "type": "text",
        "validators": [
            "isNotEmpty",
            "isValidName"
        ],
        "rule": "必填，长度为4~16个字符",
        "success": "姓名格式输入正确"
    },
    "email": {
        "id": "email2",
        "label": "邮箱",
        "type": "text",
        "validators": [
            "isEmpty",
            "isValidEmail"
        ],
        "rule": "非必填，服从邮箱规则",
        "success": "邮箱格式输入正确"
    },
    "password": {
        "id": "password2",
        "label": "密码",
        "type": "password",
        "validators": [
            "isNotEmpty",
            "isValidPassword"
        ],
        "rule": "必填，必须是英文字母和数字，且长度在8~20之间",
        "success": "密码格式输入正确"
    },
    "repassword": {
        "id": "repassword2",
        "label": "确认密码",
        "type": "password",
        "validators": [
            "isNotEmpty",
            "isValidPassword",
            [
                "isEqualTo",
                "密码"
            ]
        ],
        "compare": "password2",
        "rule": "必填，长度为4~16个字符，且与密码一致",
        "success": "两次密码输入一致"
    },
    "phone": {
        "id": "phone2",
        "label": "手机号码",
        "type": "text",
        "validators": [
            "isNotEmpty",
            "isValidMobile"
        ],
        "rule": "必填，请输入11位手机号码",
        "success": "手机格式输入正确"
    },
    "sparePhone": {
        "id": "sparephone2",
        "label": "备用手机号码",
        "type": "text",
        "validators": [
            "isEmpty",
            "isValidMobile",
            [
                "isNotEqualTo",
                "手机号码"
            ]
        ],
        "compare": "phone2",
        "rule": "非必填，请输入11位手机号码，且不能与上面手机号码相同",
        "success": "备用手机号码格式输入正确"
    },
    "submit": {
        "id": "validate2",
        "value": "验证",
        "type": "button",
        "name": "submit",
        "fail": "提交失败",
        "success": "提交成功"
    }
};

var config_1= {
    "name": {
        "id": "name1",
        "label": "姓名",
        "type": "text",
        "validators": ["isNotEmpty","isValidName"],
        "rule": "必填，长度为4~16个字符",
        "success": "姓名格式输入正确"
    },
    "submit": {
        "id": "validate1",
        "value": "验证",
        "type": "button",
        "fail": "提交失败",
        "success": "提交成功"
    }
};
var FormFactory1 = new FormFactory('wapper');
var FormFactory2 = new FormFactory('wapper2');
FormFactory1.createForm(config);
FormFactory2.createForm(config_1);

