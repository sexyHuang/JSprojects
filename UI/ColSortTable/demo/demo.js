/**
 * Created by sexyi on 2016/8/30.
 */
tableData = {
    tHead: {
        'Name': '姓名',
        'Chinese': '语文',
        'Math': '数学',
        'English': '英语',
        'PE': '体育',
        'Sum': '总分'
    },
    tBody: [
        {
            'Name': '小明',
            'Chinese': 80,
            'Math': 90,
            'English': 70,
            'PE': 70
            //'Sum': ''
        },
        {
            'Name': '小红',
            'Chinese': 90,
            'Math': 60,
            'English': 90,
            'PE': 80
            //'Sum': ''
        },
        {
            'Name': '小一',
            'Chinese': 50,
            'Math': 70,
            'English': 50,
            'PE': 76
            //'Sum': ''
        },
        {
            'Name': '小二',
            'Chinese': 85,
            'Math': 99,
            'English': 65,
            'PE': 88
            //'Sum': ''
        },
        {
            'Name': '小三',
            'Chinese': 77,
            'Math': 99,
            'English': 88,
            'PE': 100
            //'Sum': ''
        }
    ]
};



//tableData.tBody.tRow1.Sum = sum.call(tableData,'tRow1');

function setSumofRow(tBody) {
    //var tBody = tableData.tBody;
    for (var row in tBody) {
        tBody[row].Sum = sum.call(tBody[row]);
    }

    function sum() {
        //var row = rName;
        var sum = 0, item;
        /* for(var i = 0;i<this.length;i++){
         sum += parseInt(this[i]);
         console.log(this[i]);
         }*/
        for (var i in this) {
            item = parseInt(this[i]);
            if (item) {
                sum += item;
            }

        }
        return sum;
        //return this.Chinese + this.Math + this.English;
    }
}

function sort(name) {
    var n = name;

    return function(value1,value2) {
        return value2[n] - value1[n];
    }
}

setSumofRow(tableData.tBody);

var tableBox = document.getElementById('tableBox');
var CSTable = new ColSortTable(tableBox,sort,true);
CSTable.creatTable(tableData);
CSTable.sortBtnDOM(['Math','Chinese','English','PE','Sum']);



/*
CSTable.sortBtnDOM('Chinese');
CSTable.sortBtnDOM('English');
CSTable.sortBtnDOM('PE');
CSTable.sortBtnDOM('Sum');*/
