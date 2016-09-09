var flag = new Array(5);
function checkTextlength(str) {
    var i = 0, len = str.length, t_len = 0;
    while (i < len) {
        if (str.charCodeAt(i) >= 0 && str.charCodeAt(i) < 128) {
            t_len++;
        } else {
            t_len += 2;
        }
        i++;
    }
    return t_len;
}
function blurHandler(event) {
    var input = event.target;
    checkContent(input);
}
function checkContent(input) {
	var inputName = input.name, inputValue = input.value.trim(), t_length = checkTextlength(inputValue), tipSpan = input.parentNode.getElementsByClassName("tip")[0], password, filter;
	tipSpan.className = "tip wrong";
	input.className = "input i_wrong";
	switch(inputName){
		case "username":
			flag[0] = false;
			if (t_length === 0) {
				tipSpan.innerHTML = "姓名不能为空";
			} else if(t_length < 4) {
				tipSpan.innerHTML = "姓名应大于等于4个字符";
			} else if (t_length > 16) {
				tipSpan.innerHTML = "姓名应小于等于16个字符";
			} else {
				tipSpan.className = "tip right";
				tipSpan.innerHTML = "格式正确";
				input.className = "input i_right";
				flag[0] = true;
			}
			break;
		case "password":
			flag[1] = false;
			if (t_length === 0) {
				tipSpan.innerHTML = "密码不能为空";
			} else if(t_length < 4) {
				tipSpan.innerHTML = "密码应大于等于4个字符";
			} else if (t_length > 16) {
				tipSpan.innerHTML = "密码应小于等于16个字符";
			} else {
				tipSpan.className = "tip right";
				tipSpan.innerHTML = "格式正确";
				input.className = "input i_right";
				flag[1] = true;
			}
			break;
		case "confirm_pass":
			flag[2] = false;
			password = document.getElementsByName("password")[0].value;
			if(!input.value) {
				break;
			}
			if (password == input.value) {
				tipSpan.className = "tip right";
				tipSpan.innerHTML = "密码正确";
				input.className = "input i_right";
				flag[2] = true;
			} else {
				tipSpan.innerHTML = "两次输入的密码不同！"
			}
			break;
		case "user_email":
			flag[3] = false;
			filter = /^\w[-\w.]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}$/;
			if(filter.test(input.value)){
				tipSpan.className = "tip right";
				tipSpan.innerHTML = "格式正确";
				input.className = "input i_right";
				flag[3] = true;
			} else {
				tipSpan.innerHTML = "请输入正确的邮箱地址";
			}
			break;
		case "user_mobile":
			flag[4] = false;
			filter = /^\d{11}$/;
			if(filter.test(input.value)){
				tipSpan.className = "tip right";
				tipSpan.innerHTML = "格式正确";
				input.className = "input i_right";
				flag[4] = true;
			} else {
				tipSpan.innerHTML = "请输入正确的手机号";
			}
	}
}

function focusHandler(event) {
	var input = event.target, tipSpan = input.parentNode.getElementsByClassName("tip")[0];
	switch(input.name){
		case "username":	
  			tipSpan.innerHTML = "必填，长度为4~16个字符";
			break;
		case "password":
			tipSpan.innerHTML = "必填，长度为4~16个字符，区分大小写";
			break;
		case "confirm_pass":
			tipSpan.innerHTML = "请再次输入密码";
			break;
		case "user_email":
			tipSpan.innerHTML = "必填，建议使用常用邮箱";
			break;
		case "user_mobile":
			tipSpan.innerHTML = "必填，建议使用常用手机号";
			break;
	}
}
function checkBtnHandler() {
	var i = 0, len = flag.length ,postFlag = true;
	while(i < len) {
		if (!flag[i]){
			postFlag = false;
			break;
		}
		i++;
	}
	if (!postFlag) {
		alert("提交失败！");
		//...
	} else {
		alert("提交成功！");
	}
}
window.onload = function () {
	var input = document.getElementsByClassName("input"), checkBtn = document.getElementsByClassName("button")[0], i=0;
	checkBtn.addEventListener("click",checkBtnHandler);
	while(i<input.length){
		input[i].addEventListener("focus",focusHandler);
		input[i].addEventListener("blur", blurHandler);
		i++;
	}
};