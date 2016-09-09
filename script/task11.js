var Traversal = function (nodeId) {
    var speed = 200;
    var viewList = [];
    var wfsIndex = 0;	//广度搜索自增索引
    var input = document.getElementById("nameIn");

    function openParent(obj) {
        if (obj.parentNode) {
            obj.parentNode.className = "open";
            obj = obj.parentNode;
            arguments.callee(obj);
        }
    }

    this.found = false;

    /**
     *
     * @param node
     */
    this.show = function (node) {
        var text = node.firstElementChild ? node.firstElementChild.innerHTML.trim().toLowerCase() : "";
        if (text.slice(1) == input.value.toLowerCase() || input.value == "") {
            this.found = true;
        }
        //setTimeout(function(){
        if (text.slice(1) == input.value.toLowerCase() && text != "") {
            openParent(node);
            node.className = "select";
        } else {
            node.children[0].innerHTML = "+" + node.children[0].innerHTML.slice(1);
            node.className = "";
        }
        //},speed);
    };
    this.findSelect = function (root) {
        this.DepthFirstSearch(root);
        var node, selectNodeList = [];
        while (viewList.length > 0) {
            node = viewList.shift();
            if (node.className.indexOf("select") >= 0) {
                selectNodeList.push(node);
            }
        }
        return selectNodeList;
    };
    this.root = document.getElementById(nodeId);
    this.animation = function () {
        var node;
        this.found = false;
        var that = this;
        //setTimeout(function(){
        while (true) {
            node = viewList.shift();
            if (node) {
                that.show(node);
                //setTimeout(arguments.callee,speed);
            } else {
                break;
                if (that.found == false) {
                    alert("找不到对象");
                }
            }
        }
        //},speed);
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
(function () {
    var root = Traversal.root;

    function TraversalBtnHandler(event) {
        if (event.target.type != "button") {
            return;
        }

        switch (event.target.value) {
            case "深度历遍搜索":
                Traversal.DepthFirstSearch(root);
                Traversal.animation();
                break;
            case "广度历遍搜索":
                Traversal.widthFirstSearch(root);
                Traversal.animation();
                break;
            case "删除":
                deleteBtn();
                break;
            case "添加":
                addElementBtn();
                break;
        }
    }

    function clearSelect(root) {
        var divList = root.parentNode.getElementsByTagName("div"), divClass;
        for (var i = 0; i < divList.length; i++) {
            divClass = divList[i].className;
            if (divClass.indexOf("select") >= 0) {
                divList[i].className = divClass.replace(/select/g, "");
            }
        }
    }

    function selectElementHandler(event) {
        clearSelect(root);
        var target = event.target;
        var nodeName = target.nodeName.toLowerCase();
        if (nodeName == "span") {
            target.parentNode.className += " select";
            if (target.parentNode.className.indexOf("open") >= 0) {
                target.innerHTML = target.innerHTML.replace(/\-/g, "+");
                target.parentNode.className = target.parentNode.className.replace(/open/g, "");
            } else {
                target.parentNode.className += " open";
                target.innerHTML = target.innerHTML.replace(/\+/g, "-");
            }
        }
    }

    function deleteBtn() {
        var selectNodeList = Traversal.findSelect(root);
        selectNodeList.forEach(function (element) {
            element.parentNode.removeChild(element);
        });
    }

    function addElementBtn() {
        var selectNodeList = Traversal.findSelect(root),
            inputValue = document.getElementById("nameIn").value.trim(), item;
        if (!inputValue) {
            return;
        }
        item = document.createElement("div");
        item.innerHTML = "<span>" + "+" + inputValue + "</span>";
        selectNodeList.forEach(function (element) {
            element.appendChild(item);
        });
    }

    document.getElementById("root").addEventListener("click", selectElementHandler);
    document.body.addEventListener("click", TraversalBtnHandler);
})();

