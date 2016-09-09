/**
 * 二叉树遍历类
 * @param nodeId 被遍历元素ID
 * @constructor
 */
var Traversal = function(nodeId){
	var viewList = [];
	function show(node){
		node.className="select";
		setTimeout(function(){
			node.className="";
		},500);
	}
	this.root = document.getElementById(nodeId);
	this.animation = function(){
		var node;
		setTimeout(function(){
			node=  viewList.shift();
			if(node){
				show(node);
				setTimeout(arguments.callee,500);
			}
		},500);
	};
	this.preOrder = function(node) {
		if(node != null){
			viewList.push(node);
			this.preOrder(node.firstElementChild);
			this.preOrder(node.lastElementChild);
		}
	};
	this.inOrder = function(node) {
		if(node != null){
			this.inOrder(node.firstElementChild);
			viewList.push(node);
			this.inOrder(node.lastElementChild);	
		}
	};
	this.postOrder = function(node) {
		if(node != null){
			this.postOrder(node.firstElementChild);
			this.postOrder(node.lastElementChild);
			viewList.push(node);
		}
	}
};


var Traversal = new Traversal("root");
function TraversalBtnHandler(event){
	var root = Traversal.root;
	if(event.target.type != "button"){
		return;
	}
	
	switch(event.target.value){
		case "前序历遍":
			Traversal.preOrder(root);
			break;
		case "中序历遍":
			Traversal.inOrder(root);
			break;
		case "后序历遍":
			Traversal.postOrder(root);
			break;		
	}
	Traversal.animation();
}

document.body.addEventListener("click",TraversalBtnHandler);
