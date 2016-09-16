var arr = [];
var initArr = [];
var arrHis = [];
var queue = document.getElementById("queue");
var timer = null;
var speed = 50;
var sortWay;

/**
 * 排序算法类
 * @constructor
 */
function Sort() {

}

/**
 * 冒泡排序
 * @param arr
 * @returns {*}
 */
Sort.prototype.bubbleSort = function (arr) {
    var resArr = arr.slice(), len = resArr.length, i, j, temp, len_j = len - 1, sortOK;
    for (i = 0; i < len - 1; i++) {
        sortOK = true;
        for (j = 0; j < len_j; j++) {
            if (resArr[j] > resArr[j + 1]) {
                temp = resArr[j + 1];
                resArr[j + 1] = resArr[j];
                resArr[j] = temp;
                sortOK = false;

            }
            pushHis(resArr.slice(), j, len_j + 1);
            pushHis(resArr.slice(), j, len_j + 1);
        }
        if (sortOK) {
            break;
        }
        len_j--;
    }
    return resArr;
};

/**
 * 插入排序
 * @param arr
 * @returns {*}
 */
Sort.prototype.insertSort = function (arr) {
    var resArr = arr.slice(), i, j, len = resArr.length, temp;
    for (i = 1; i < len; i++) {
        for (j = i - 1; j >= 0; j--) {
            pushHis(resArr.slice(), j, i);
            if (j == 0 && resArr[i] <= resArr[j]) {
                temp = resArr[i];
                resArr.splice(i, 1);
                resArr.splice(j, 0, temp);
                break;
            }
            if (resArr[i] > resArr[j]) {
                if (j + 1 != i) {
                    temp = resArr[i];
                    resArr.splice(i, 1);
                    resArr.splice(j + 1, 0, temp);
                }
                break;
            }
        }
    }
    return resArr;
};

/**
 * 选择排序
 * @param arr
 * @returns {*}
 */
Sort.prototype.selectSort = function (arr) {
    var resArr = arr.slice(), len = resArr.length, tag, i, j, len_j = len, temp;
    for (i = 0; i < len - 1; i++) {

        tag = 0;
        for (j = 1; j < len_j; j++) {
            if (resArr[j] > resArr[tag]) {
                tag = j;
            }
            pushHis(resArr.slice(), tag, j, len_j);
        }
        if (tag != len_j - 1) {
            temp = resArr[len_j - 1];
            resArr[len_j - 1] = resArr[tag];
            resArr[tag] = temp;
        }
        len_j--;

    }
    return resArr;
};

/**
 * 快速排序
 * @param arr 目标数组
 * @param a 起始位置
 * @param b 结束位置
 * @param qArr 操作数组
 * @returns {*}
 */
Sort.prototype.quickSort = function (arr, a, b, qArr) {
    var leftArr = [], rightArr = [], len = arr.length, i, k, tag, tmp, j, lb, ra;
    if (a == undefined && b == undefined) {
        a = 0;
        b = len - 1;

    }

    if (qArr == undefined) {
        qArr = arr.slice();
    }
    if (len < 2) {
        return arr;
    }
    if (len == 2 && arr[0] == arr[1]) {
        return arr;
    }
    tag = qArr[a];
    for (i = 1, k = 0; i < len;) {
        if (qArr[a + i] >= tag) {
            rightArr.push(qArr[a + i]);
            i++;
        } else {
            tmp = qArr[a + i];
            for (j = a + i; j > a + k; j--) {
                qArr[j] = qArr[j - 1];
            }
            qArr[a + k] = tmp;
            leftArr.push(tmp);
            k++;
            i++;
        }
        pushHis(qArr.slice(), a, b, a + k, i - 1);
    }
    lb = a + leftArr.length - 1;
    arguments.callee(leftArr, a, lb, qArr);
    ra = b - rightArr.length + 1;
    arguments.callee(rightArr, ra, b, qArr);
    return qArr;
};

/**
 * 排序动画DOM操作类
 * @constructor
 */
function SortDOM() {
    var html, item, spanClass;

    /**
     * 快速排序DOM
     * @param arr
     * @param a
     * @param b
     * @param tagIndex
     * @param k
     */
    this.quickSortDOM = function (arr, a, b, tagIndex, k) {
        html = '';
        item = '';
        for (var i = 0; i < arr.length; i++) {
            spanClass = "sort_span";
            if (i >= a && i <= b) {
                spanClass += " sort_span_blue";
            }
            if (i == tagIndex) {
                spanClass += " sort_span_tag";
            }
            if (i == a + k) {
                item = '<div class="sort_div"><span class="' + spanClass + '" style="height: ' + arr[i] + '%"></span><span class="sort_span_in" style="height:' + arr[tagIndex] + '%"></span></div>';
            } else {
                item = "<div class='sort_div'><span class='" + spanClass + "' style='height:" + arr[i] + "%'></span></div>";
            }
            html += item;
        }
        queue.innerHTML = html;
    };

    /**
     * 冒泡
     * @param arr
     * @param tagIndex
     * @param e
     */
    this.bubbleSortDOM = function (arr, tagIndex, e) {
        html = '';
        item = '';
        for (var i = 0; i < arr.length; i++) {
            spanClass = 'sort_span';
            if (i < e) {
                spanClass += " sort_span_blue";
            }
            if (i == tagIndex + 1) {
                spanClass += ' sort_span_tag';
            }
            item = "<div class='sort_div'><span class='" + spanClass + "' style='height:" + arr[i] + "%'></span></div>";
            html += item;
        }
        queue.innerHTML = html;
    };

    /**
     * 选择
     * @param arr
     * @param tagIndex
     * @param pass
     * @param end
     */
    this.selectSortDOM = function (arr, tagIndex, pass, end) {
        html = '';
        item = '';
        for (var i = 0; i < arr.length; i++) {
            spanClass = 'sort_span';
            if (i < end) {
                spanClass += " sort_span_blue";
            }

            if (i == tagIndex) {
                spanClass += ' sort_span_tag';
            }
            if (i == pass) {
                item = '<div class="sort_div"><span class="' + spanClass + '" style="height: ' + arr[i] + '%"></span><span class="sort_span_in" style="height:' + arr[tagIndex] + '%"></span></div>';

            } else {
                item = "<div class='sort_div'><span class='" + spanClass + "' style='height:" + arr[i] + "%'></span></div>";
            }
            html += item;
        }
        queue.innerHTML = html;
    };

    /**
     * 插入
     * @param arr
     * @param pass
     * @param end
     */
    this.insertSortDOM = function (arr, pass, end) {
        html = '';
        item = '';
        for (var i = 0; i < arr.length; i++) {
            spanClass = 'sort_span';
            if (i < end) {
                spanClass += " sort_span_blue";
            }

            if (i == end) {
                spanClass += ' sort_span_tag';
            }
            if (i == pass) {
                item = '<div class="sort_div"><span class="' + spanClass + '" style="height: ' + arr[i] + '%"></span><span class="sort_span_in" style="height:' + arr[end] + '%"></span></div>';

            } else {
                item = "<div class='sort_div'><span class='" + spanClass + "' style='height:" + arr[i] + "%'></span></div>";
            }
            html += item;
        }
        queue.innerHTML = html;
    };
}

/*function quickSortDOM(arr, a, b, tagIndex, k) {
 var html = "", item = "", spanClass;
 for (var i = 0; i < arr.length; i++) {
 spanClass = "sort_span";
 if (i >= a && i <= b) {
 spanClass += " sort_span_blue";
 }
 if (i == tagIndex) {
 spanClass += " sort_span_tag";
 }
 if (i == a + k) {
 item = '<div class="sort_div"><span class="' + spanClass + '" style="height: ' + arr[i] + '%"></span><span class="sort_span_in" style="height:' + arr[tagIndex] + '%"></span></div>';
 } else {
 item = "<div class='sort_div'><span class='" + spanClass + "' style='height:" + arr[i] + "%'></span></div>";
 }
 html += item;
 }
 queue.innerHTML = html;
 }*/

/**
 * 推入历史状态
 */
function pushHis() {
    arrHis.push(arguments);
}

/**
 * 动画方法
 */
function animation() {
    var that = this;
    var sortDOM1 = new SortDOM();

    /**
     *
     * @param sortWay
     */
    this.start = function (sortWay) {
        var sortDom = sortWay + 'DOM';
        timer = setInterval(function () {
            if (arrHis.length > 0) {
                sortDOM1[sortDom].apply(sortDOM1, arrHis[0]);
                arrHis.shift();
            } else {
                clearInterval(timer);
                timer = null;
                initDom(arr);
            }
        }, speed);
    };
}

/**
 * 创建随机数组和其dom元素
 * @param num
 */
function creatArr(num) {

    var arrLen = num;
    initArr = [];
    for (var i = 0; i < arrLen; i++) {
        initArr.push(Math.floor(Math.random() * 90 + 10));
    }
    initDom(initArr, true);
    //console.log(arr);
}

/**
 * 初始化DOM
 * @param arr
 * @param ani
 */
function initDom(arr, ani) {
    var divSpan = 'sort_div';
    if (ani == true) {
        divSpan += ' ani';
    }
    var arr = arr || [];
    var html = '', item = '', spanClass = '', len = arr.length, i = 0;
    for (i = 0; i < len; i++) {
        item = '<div class="' + divSpan + '"><span class="sort_span" style="height: ' + arr[i] + '%"></span></div>';
        html = html + item;
    }

    queue.innerHTML = html;
}

/**
 * 队列设置
 * @type {{initButton}}
 */
var queueSet = function () {
    var consoler = document.getElementsByClassName("consoler")[0];
    var spans = consoler.getElementsByTagName("span");
    var span = spans[0];
    var span_1 = spans[1];
    var sort1 = new Sort();
    var animate = new animation();

    function sortBtnHandler(event) {
        clearInterval(timer);
        event.bubbles = false;
        arrHis = [];
        sortWay = this.id;
        if (initArr) {
            arr = sort1[sortWay](initArr);
            animate.start(sortWay);
            //animation(sortWay);
        }
    }

    function randomBtnHandler(event) {
        var randomCount = document.getElementById("randomCount").value;
        if (randomCount.match(/^[0-9]+$/) && randomCount > 0 && randomCount <= 60) {
            span_1.className = "right";
            creatArr(randomCount);
        } else {
            span_1.className = "wrong";
        }
    }

    function speedChangeHandler(event) {
        var dSpeed = 10;

        if (event.target.id == 'speedup') {
            dSpeed = -10;
        }
        speed += dSpeed;
        if (speed < 20) {
            speed = 20;
            return;
        } else if (speed > 500) {
            speed = 500;
            return;
        }
        console.log(speed);
        if (timer) {
            clearInterval(timer);
            animate.start(sortWay);
        }
    }

    function buttonHandler(event) {
        var num = document.getElementById("numtxt").value;
        var items = queue.getElementsByTagName("div");
        var btnValue;
        var newItem = document.createElement("div");
        if (event.target.type != "button") {
            return;
        }
        span.className = "right";
        btnValue = event.target.value;
        newItem.className = "sort_div";
        newItem.innerHTML = '<div class="sort_div"><span class="sort_span" style="height: ' + num + '%"></span></div>';
        switch (btnValue) {
            case "左侧入":
                if (!num) {
                    break;
                }
                if (!num.match(/^[0-9]+$/) || num < 10 || num > 100) {
                    span.className = "wrong";
                    break;
                }
                if (initArr.length > 60) {
                    alert("柱体数量过多（大于60）！")
                    break;
                }
                if (items) {
                    queue.insertBefore(newItem, items[0]);
                    initArr.unshift(num);
                    break;
                }
            case "右侧入":
                if (!num) {
                    break;
                }
                if (!num.match(/^[0-9]+$/) || num < 10 || num > 100) {
                    span.className = "wrong";
                    break;
                }
                if (initArr.length > 60) {
                    alert("柱体数量过多（大于60）！")
                    break;
                }
                queue.appendChild(newItem);
                initArr.push(num);
                break;
            case "左侧出":
                if (items) {
                    queue.removeChild(items[0]);
                    initArr.splice(initArr.shift(), 1);
                }
                break;
            case "右侧出":
                if (items) {
                    queue.removeChild(items[items.length - 1]);
                    initArr.splice(initArr.pop(), 1);
                }
                break;
        }
        //console.log(arr);

    }

    return {
        initButton: function () {
            var i;
            var sortBtns = document.getElementsByClassName('sortBtn');
            var speedChangeBtns = document.getElementsByClassName('speedChange');
            var randomBtn = document.getElementById("random");
            for (i = 0; i < Math.max(sortBtns.length, speedChangeBtns.length); i++) {
                if (sortBtns[i]) {
                    sortBtns[i].addEventListener('click', sortBtnHandler);
                }
                if (speedChangeBtns[i]) {
                    speedChangeBtns[i].addEventListener('click', speedChangeHandler);
                }
            }
            consoler.addEventListener("click", buttonHandler);
            random.addEventListener("click", randomBtnHandler);
        }
    }
}();


queueSet.initButton();