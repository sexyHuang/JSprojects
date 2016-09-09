/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */

var city,aqi;
var cityIn = document.getElementById("aqi-city-input");
var aqiIn = document.getElementById("aqi-value-input");
var table = document.getElementById("aqi-table");
var tbody = table.getElementsByTagName("tbody")[0];
/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
 function addAqiData() {
	city = cityIn.value.trim();
	aqi = aqiIn.value.trim();
} 

/**
 * 渲染aqi-table表格
 */
 function renderAqiList() {
		var tr = document.createElement("tr");
		var trStr = "<td>"+city+"</td><td>"+aqi+"</td><td><button>del</button></td>";
		tr.innerHTML = trStr;
		tbody.appendChild(tr);
} 

/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
	var span = document.getElementsByTagName("span");
	addAqiData();
	span[0].className = "right";
	span[1].className = "right";
	if (city==""||aqi==""){
	  alert("城市和空气质量都不能为空！");
	  return;
	}
	if(!city.match(/^[A-Za-z\u4E00-\u9FA5\s]+$/)&&!aqi.match(/^[0-9]+$/)){
		span[0].className = "wrong";
		span[1].className = "wrong";
		return;
	}
 	else if(!city.match(/^[A-Za-z\u4E00-\u9FA5\s]+$/)){
		span[0].className = "wrong";
		return;
	}else if(!aqi.match(/^[0-9]+$/)){
		span[1].className = "wrong";
		return;
	}else{	
		
		renderAqiList();
	}	 
}
/* function checkInputHandle(event) {
	var span = document.getElementsByTagName("span");

	switch(event.target.id){
		case "aqi-value-input":
			if(!event.target.value.match(/^[0-9]+$/)){
				span[1].className = "wrong";
				event.target.value = "";
			}else{
				span[1].className = "right";
			}
			break;	
		case "aqi-city-input":
			if(!event.target.value.match(/^[A-Za-z\u4E00-\u9FA5\s]+$/)){
				span[0].className = "wrong";
				event.target.value = "";
			}else{
				span[0].className = "right";
			}
			break;
	
	}
	
} */
/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle(event) {
	var target = event.target;
	if(target.innerHTML == "del") {
		var delRow = target.parentNode.parentNode;
		tbody.removeChild(delRow);
	}
  // do sth.

}

function init() {
	var i;
  // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
	var addBtn = document.getElementById("add-btn");
	addBtn.addEventListener("click",addBtnHandle);
  // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
	tbody.addEventListener("click", delBtnHandle);
	cityIn.addEventListener("blur",checkInputHandle);
	apiIn.addEventListener("blur",checkInputHandle);
	

}
init();