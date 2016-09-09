/**
 * Created by sexyi on 2016/8/30.
 */


/**
 * 可排序表格类
 * @param element (DOM)表格父元素
 * @param sortfn (Function)排序函数（可选），无此参数时使用默认排序方法
 * @param isForzen (Boolean)是否设置为首行冻结
 * @constructor
 */
ColSortTable = function (element,sortfn,isForzen) {
    this.ele = element;
    this.table = document.createElement('table');
    this.table.className = 'mainTable';
    if(isForzen){
        this.cloneTable = document.createElement('table');
        this.cloneTable.className = 'copy';
    }

    //判断sortfn是否为函数
    if(Object.prototype.toString.call(sortfn) =='[object Function]') {
        this.sortFn = sortfn;
    }else{
        this.sortFn = '';
    }
};

/**
 * 创建表格
 * @param json 表格数据
 *             期望格式：json:{
 *                          tHead:{
 *                              //-dataset-name：列名  value: 表格内容
 *                              th1-dataset-name: value,
 *                              th2-dataset-name: value,
 *                              th3-dataset-name: value,
 *                              ...
 *                          }
 *                          tBody:[
 *                              {
 *                                  td1-dataset-name: value,
 *                                  td2-dataset-name: value,
 *                                  td3-dataset-name: value,
 *                                  ....
 *                              },
 *                              {
 *                                  td1-dataset-name: value,
 *                                  td2-dataset-name: value,
 *                                  td3-dataset-name: value,
 *                                  ....
 *                              },
 *                              .....
 *                          ]
 *                      }
 *
 */
ColSortTable.prototype.creatTable = function (json) {
    var thData, thCon, tbCon = '', cName,cloneThead,that = this;
    //if(json.tHead){
    thData = json.tHead;

    //设定表头
    this.thead = document.createElement('thead');
    thCon = '<tr>';
    for (cName in thData) {
        thCon += '<th data-name="' + cName + '">' + thData[cName] + '</th>';
    }
    thCon += '</tr>';
    this.thead.innerHTML = thCon;
    //}

    //设定表格内容
    this.tbData = json.tBody;
    this.tbody = document.createElement('tbody');
    for (cName in this.tbData) {
        tbCon += '<tr>';
        for (var n in this.tbData[cName]) {
            tbCon += '<td data-name="' + n + '">' + this.tbData[cName][n] + '</td>';
        }
        tbCon += '</tr>';
    }
    this.tbody.innerHTML = tbCon;

    //把表头和表格主体添加到表格table中
    //然后把表格添加到目标元素中
    this.table.appendChild(this.thead);
    this.table.appendChild(this.tbody);
    this.ele.appendChild(this.table);
    if(this.cloneTable){
        cloneThead = document.createElement('thead');
        cloneThead.innerHTML = thCon;

        this.cloneTable.appendChild(cloneThead);
        this.ele.appendChild(this.cloneTable);
        document.addEventListener('scroll',function(event){
            //var top = document.body.scrollTop;
            if(this)
                var pageY = window.pageYOffset;
            if(pageY<that.table.offsetTop+that.table.offsetHeight&&pageY>that.table.offsetTop){
                that.cloneTable.style.display = 'inline-block';
            }else{
                that.cloneTable.style.display = 'none';
            }

        });
    }

};

/**
 * 表格排序
 * @param name 被排序列名
 * @param revFlag 反序标志
 */
ColSortTable.prototype.sort = function (name, revFlag) {
    var newBody = [], cName, tbCon = '';
    var tbody = this.tbData;
    var sortfn = '';

    //判断this.sortFn对象是否为空，为空则调用默认方法
    if (!this.sortFn) {
        this.sortFn = function (value1, value2) {
            return value1[name] - value2[name];
        }
    }else{
        sortfn = this.sortFn(name);
    }
    //var newBody = bubbleSort(tbody);
    //var that = this;
    newBody = tbody.sort(sortfn);


    if (revFlag) {
        newBody.reverse();
    }

    //
    for (cName in newBody) {
        tbCon += '<tr>';
        for (var n in newBody[cName]) {
            tbCon += '<td data-name="' + n + '">' + newBody[cName][n] + '</td>';
        }
        tbCon += '</tr>';
    }
    this.tbody.innerHTML = tbCon;
};

/**
 * 添加排序icon到一个或多个列头
 * @param name 列名或列名数组
 */
ColSortTable.prototype.sortBtnDOM = function (name) {
    var titles =  this.ele.getElementsByTagName('th'), title, upIcon, downIcon, that = this;

    if(typeof name == 'string'){
        set(name);
    }else if(Array.isArray(name)){
        for(var i = 0;i < name.length; i++){
            set(name[i]);
        }
    }

    /**
     * 添加排序icon dataset.name为name的列头
     * @param name dataset.name
     */
    function set(name) {
        for (var i = 0; i < titles.length; i++) {
            if (titles[i].dataset.name === name) {
                title = titles[i];
                upIcon = document.createElement('i');
                upIcon.className = 'ascend';

                downIcon = document.createElement('i');
                downIcon.className = 'descend';

                upIcon.addEventListener('click', function () {
                    that.sort(name,false);
                });
                downIcon.addEventListener('click', function () {
                    that.sort(name,true);
                });
                title.appendChild(upIcon);
                title.appendChild(downIcon);
                //break;
            }
        }

    }

};
