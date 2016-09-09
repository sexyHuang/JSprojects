/**
 * 多叉树遍历类
 * @param nodeId 被遍历元素ID
 * @constructor
 */
var Traversal = function (nodeId) {
    var speed = 200;
    var viewList = [];
    var wfsIndex = 0;	//广度搜索自增索引
    var input = document.getElementById("nameIn");
    this.found = false;
    this.show = function (node) {
        var text = node.firstElementChild ? node.firstElementChild.innerHTML.trim().toLowerCase() : "";
        node.className = "pass";
        if (text == input.value.toLowerCase() || input.value == "") {
            this.found = true;
        }
        setTimeout(function () {
            if (text == input.value.toLowerCase() && text != "") {
                node.className = "select";
            } else {
                node.className = "";
            }
        }, speed);
    };

    this.root = document.getElementById(nodeId);
    this.animation = function () {
        var node;
        this.found = false;
        var that = this;
        setTimeout(function () {
            node = viewList.shift();
            if (node) {
                that.show(node);
                setTimeout(arguments.callee, speed);
            } else {
                if (that.found == false) {
                    alert("找不到对象");
                }
            }
        }, speed);
        wfsIndex = 0;
    };
    this.DepthFirstSearch = function (node) {
        var i, childs = node.children;
        if (node != null) {
            viewList.push(node);
            for (i = 1; i < childs.length; i++) {
                this.DepthFirstSearch(childs[i]);
            }
        }
    };
    this.widthFirstSearch = function (node) {
        if (node != null) {
            viewList.push(node);
            this.widthFirstSearch(node.nextElementSibling);
            node = viewList[wfsIndex++];
            this.widthFirstSearch(node.children[1]);

        }
    }
};

var Traversal = new Traversal("root");
function TraversalBtnHandler(event) {
    var root = Traversal.root;
    if (event.target.type != "button") {
        return;
    }

    switch (event.target.value) {
        case "深度历遍搜索":
            Traversal.DepthFirstSearch(root);
            break;
        case "广度历遍搜索":
            Traversal.widthFirstSearch(root);
            break;

    }
    Traversal.animation();
}

document.body.addEventListener("click", TraversalBtnHandler);
