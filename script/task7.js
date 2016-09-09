var queueSet=function(){
	var insertBox = document.getElementsByClassName("insertBox")[0];
	var checkTag = document.getElementsByClassName("checkTag")[0];
	var queues = document.getElementsByClassName("queue");
	var body = document.body;
	this.mainArr = [];
	var insertBtn = document.getElementById("insert");
	var checkBtn = document.getElementById("check");
	var that = this; 
	function insert(){
		var value = insertBox.value.trim(),item="",html="",i;
		console.log("-"+value);
		var arr=[];
		if(!value){
			return;
		}
		arr = value.split(/[^0-9A-Za-z\u4E00-\u9FA5]+/);
		for(i = 0; i < arr.length; i++){
			//if(arr[i]){
				item = '<div class="sort_div">'+arr[i]+'</div>';
				html += item;
				that.mainArr.push(arr[i]);
			/* }else{
				arr.splice(i,1);
			} */
		}
		queues[0].innerHTML += html;
		
	}
	function search(){
		var arr = that.mainArr.slice(),html="",i,item;
		var str = checkTag.value.trim();
		var inner;
		console.log(str);
		for(i = 0; i < arr.length; i++){
			if(arr[i].indexOf(str)>-1){
				item = "<div class='sort_div select'>"+arr[i]+"</div>"
			}else{
				item = "<div class='sort_div'>"+arr[i]+"</div>";
			}
			html += item;
		}
		queues[0].innerHTML = html;
	}
	this.BtnHandler=function(event){
		var target = event.target;
		if(target.value == "插入"){
			insert();
		}else if(target.value == "查询"){
			search();
		}
	}
	this.init = function(){
			body.addEventListener("click",that.BtnHandler);
			//insertBtn.addEventListener("click",that.insert);
			//checkBtn.addEventListener("click",that.search);
	}
}
var queueSet_1 = new queueSet();
queueSet_1.init();

