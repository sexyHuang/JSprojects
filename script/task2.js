var aqiData = [
	  ["北京", 90],
	  ["上海", 50],
	  ["福州", 10],
	  ["广州", 50],
	  ["成都", 90],
	  ["西安", 100]
	];

	(function () {

		/*
		在注释下方编写代码
		遍历读取aqiData中各个城市的数据
		将空气质量指数大于60的城市显示到aqi-list的列表中
		*/
		var list = document.getElementById("aqi-list");
		var fragment = document.createDocumentFragment();
		var li;
		var result = [];
		var compare = function(value1,value2) {
		  return value2[1]-value1[1];
		}
		result = aqiData.filter(function(element){
		  return element[1]>60;
		});
		result.sort(compare);

		result.forEach(function(element,index){
			li = document.createElement("li");
			fragment.appendChild(li);
			li.innerHTML = element[0]+":"+element[1];
		});
/* 		for(var i = 0; i < aqiData.length; i++){
		  if(aqiData[i][1] > 60){
			  li = document.createElement("li");
			  fragment.appendChild(li);
			  li.innerHTML = aqiData[i][0]+":"+aqiData[i][1];
		  }
		} */
		list.appendChild(fragment);
	})();