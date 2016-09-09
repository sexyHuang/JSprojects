/**
 * Created by Administrator on 2016/8/22 0022.
 */
window.onload = function () {
    var oDiv = document.getElementById('div1');
    // var sMove = startMove();
    // var cOpacity = changeOpacity();
    // var Move1 = new Move(oDiv);
    oDiv.onmouseover = function (event) {
        var that = this;
        startMove(this, {'left': 0, 'opacity': 100}, function () {
            startMove(that, {'fontSize': 40});
        });
        //inMove.startMove();
    };
    oDiv.onmouseout = function () {
        var that = this;
        startMove(this, {'left': -200, 'opacity': 30}, function () {
            startMove(that, {'fontSize': 0});
        });
    };
    var list1 = document.getElementById('list1');
    //var lis = list1.getElementsByTagName('li');
    list1.onmouseover = function (event) {
        var target = event.target;
        if (event.target.id == 'list1') {
            return;
        }
        //startMove(target, 400, 'width');
        //changeOpacity(target, 100);
        startMove(target, {'width': 400, 'height': 200}, function () {
            startMove(target, {'opacity': 100});
        });

    };
    list1.onmouseout = function (event) {
        var target = event.target;
        if (event.target.id == 'list1') {
            return;
        }
        startMove(target, {'width': 200, 'height': 100}, function () {
            startMove(target, {'opacity': 30});
        });
        //changeOpacity(target, 3);
    };
};

