/**
 * 表单工厂库
 * @param wapperId 表单根元素
 * @constructor
 */
var FormFactory = function (wapperId) {
    this.wapper = document.getElementById(wapperId);

};

/**
 * 添加输入类表单元素
 * @param config 生成元素所需数据
 *               期望格式：config；{id：xx,label:xx...}
 * @returns {ValControl} 元素的验证控件类
 */
FormFactory.prototype.createInput = function (config) {
    var labelVal = config.label,
        id = config.id,
        groupDiv = document.createElement("div"),
        label = document.createElement("label"),
        input = document.createElement("input"),
        tip = document.createElement("p");

    groupDiv.className = "itemGroup";
    label.innerHTML = labelVal;
    label.htmlFor = id;
    groupDiv.appendChild(label);
    input.id = id;
    input.type = config.type;
    input.dataset.rule = config.rule;
    input.dataset.success = config.success;
    input.dataset.name = config.label;

    if(config.compare){
        input.dataset.compare = config.compare;
    }

    groupDiv.appendChild(input);
    tip.className = "info";
    groupDiv.appendChild(tip);

    this.wapper.appendChild(groupDiv);

    var Vcl = new ValControl(id);
    Vcl.validators = config.validators;
    return Vcl;
};

/**
 * 添加按钮
 * @param config 生成元素所需数据
 *               期望格式：config；{id：xx,label:xx...}
 * @returns {Element} 返回该按钮的DOM元素
 */
FormFactory.prototype.createButton = function (config) {
    var button = document.createElement("input");
    button.type = config.type;
    button.value = config.value;
    button.id = config.id;
    button.name = config.name;
    button.dataset.success = config.success;
    button.dataset.fail =config.fail;

    this.wapper.appendChild(button);
    return button;
};

/**
 * 生成表单
 * @param config 生成表单所需数据
 *               期望格式：config：{input1：{}，input2:[]...}josn格式
 */
FormFactory.prototype.createForm = function (config) {
    var testCtls = [],itemVcl;

    for (var i in config) {
        if (config[i].type == "button") {
            item = this.createButton(config[i]);
            if(i == 'submit'){
                item.addEventListener('click',function(event){
                    var result = true;
                    for(var i = 0; i<testCtls.length;i++){
                        testCtls[i].item.focus();
                        testCtls[i].item.blur();
                        result = result && testCtls[i].getResult();
                    }
                    if(result == true){
                        alert(event.target.dataset.success);
                    }else{
                        alert(event.target.dataset.fail);
                    }
                })
            }
        } else {
            itemVcl = this.createInput(config[i]);
            testCtls.push(itemVcl);
        }
    }
};

