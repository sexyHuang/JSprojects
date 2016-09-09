/**
 * getData方法
 * 读取id为source的列表，获取其中城市名字及城市对应的空气质量
 * 返回一个数组，格式见函数中示例
 */

function getData() {
	var data = [];
	var liText;
	var source = document.getElementById("source");
	var li = source.getElementsByTagName("li");
	var i;
	for(i = 0; i < li.length; i++){
		(function(){
			var item = [];
			liText = li[i].innerHTML;
			var cityEndIndex = liText.indexOf("空气");
			item[0] = liText.substring(0,cityEndIndex);
			var aqiStrartIndex  = liText.indexOf("<b>")+3;
			var aqiEndIndex = liText.indexOf("</b>");
			item[1] = liText.substring(aqiStrartIndex,aqiEndIndex);
			data.push(item);
		})();
	}
	/*
	data = [
	["北京", 90],
	["北京", 90]
	……
	]
	*/
	return data;
}

/**
 * sortAqiData
 * 按空气质量对data进行从小到大的排序
 * 返回一个排序后的数组
 */
function sortAqiData(data) {
	return data.sort(function(value1,value2){
		return value1[1]-value2[1];
	});
}

/**
 * render
 * 将排好序的城市及空气质量指数，输出显示到id位resort的列表中
 * 格式见ul中的注释的部分
 */
function render(data) {
	var resortList = document.getElementById("resort");
	var rank = [ "一","二","三","四","五","六","七","八","九","十"];
	var htmlText = "";
	data.forEach(function(element,index){
		htmlText += "<li>第"+rank[index]+"名："+element[0]+"空气质量：<b>"+element[1]+"</b></li>"
	});
	resortList.innerHTML = htmlText;
}

function btnHandle(event) {
	var aqiData = getData();
	aqiData = sortAqiData(aqiData);
	render(aqiData);
	event.target.disabled= true;
}


(function(){
	// 在这下面给sort-btn绑定一个点击事件，点击时触发btnHandle函数
	var sortBtn = document.getElementById("sort-btn");
	sortBtn.addEventListener("click",btnHandle);
})();