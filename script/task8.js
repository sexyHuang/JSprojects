/*var dom = function(id) {
    this.id = id;
    this.output = document.createElement('div');
    this.button = document.
    return this;
};
dom.prototype.*/


/**
 * 排列类
 * @constructor
 */
var Queue = function () {

    /**
     * 删除元素handler
     * @param event
     */
    function delElementHandler(event) {
        var target = event.target;
        if (target.className == "sort_div") {
            target.parentNode.removeChild(target);
        } else if (target.parentNode.className == "sort_div") {
            target.parentNode.parentNode.removeChild(target.parentNode);
        }
    };
    /**
     * 在body中绑定删除事件
     */
    this.bindDelEleHandlerOnBody = function () {
        document.body.addEventListener('click', delElementHandler);
    };
};

/**
 * 创建tag队列
 * @param input 输入的dom元素id
 * @param {boolean}flag 是否有确认按钮的标志
 * @returns {Queue}
 */
Queue.prototype.setQueue = function (input, flag) {

    var input = document.getElementById(input),
        parent = document.createElement('div'),
        button;
    parent.appendChild(input);

    output = document.createElement('div');
    output.className = 'output';
    this.input = input;
    parent.appendChild(output);
    if (flag) {
        button = document.createElement('button');
        button.innerHTML = '确认提交';
        parent.appendChild(button);
    }
    document.body.appendChild(parent);

    //this.handlers = new handlerSet(input,output,button);

    /**
     * 键盘确认监听器
     * @param event
     */
    function keyCheckHandler(event) {
        var target = event.target, text,
            output = target.parentNode.getElementsByClassName('output')[0],
            outputChild = output.children;
        if ((/[^0-9A-Za-z\u4E00-\u9FA5_]+/).test(target.value) || event.keyCode == "13") {
            text = target.value.match(/[0-9A-Za-z\u4E00-\u9FA5_]+/);
            text = repeatData(text);
            target.value = "";
            if (!text) {
                return;
            }
            if (outputChild.length >= 10) {
                output.removeChild(outputChild[0]);
            }

            output.innerHTML += "<div class='sort_div'><span>删除：</span><span>" + text + "</span></div>";

        }
    };

    /**
     * 确认按钮监听器
     * @param event
     */
    function submitBtnHandler(event) {
        var input = this.parentNode.getElementsByClassName('input')[0],
            output = this.parentNode.getElementsByClassName('output')[0];
        var value = input.value.trim(), html = "", i, arr = [], outputChild = output.children;
        if (!value) {
            return;
        }
        arr = value.split(/[^0-9A-Za-z\u4E00-\u9FA5]+/);
        if (arr.length > 10) {
            alert("最多输入10个爱好！");
            return;
        }
        for (i = 0; i < arr.length; i++) {
            arr[i] = repeatData(arr[i]);
            if (arr[i] == "") {
                continue;
            }
            html += "<div class='sort_div'><span>删除：</span><span>" + arr[i] + "</span></div>";
            input.value = "";
        }
        output.innerHTML += html;
        while (outputChild.length > 10) {
            output.removeChild(outputChild[0]);
        }
    };

    /**
     * 查重
     * @param data 被检验数据
     * @returns {*}
     */
    function repeatData(data) {
        var i = 0, outputChild = output.children;
        while (i < outputChild.length) {
            if (outputChild[i].getElementsByTagName("span")[1].textContent == data) {
                data = "";
            }
            i++;
        }
        return data;
    }

    /**
     * 绑定确认方式
     */
    function bindSubmitWay() {

        if (button) {
            button.addEventListener("click", submitBtnHandler);
        } else {
            input.addEventListener("keyup", keyCheckHandler);
        }
    }

    bindSubmitWay();
    return this;
};


var Queue1 = new Queue();
Queue1.setQueue("tagInput",false).setQueue("hobbyInput",true).bindDelEleHandlerOnBody();


