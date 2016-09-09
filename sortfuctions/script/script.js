 function quickSort(arr) {
	if(arr.length<=1){
		return arr;
	}
	var left=[];
	var right=[];
	var tag = arr[0];
	for(var i=0;i<arr.length;i++){
		if(arr[i]>=mid){
			right.push(arr[i]);
		}else{
			left.push(arr[i]);
		}
	}
	arr=quickSort(left).concat(mid,quickSort(right));
	return arr;
}
function quickSort_4(arr,a,b,qArr){
	var i,len = arr.length,leftArr = [],rightArr = [],tag,temp,la,rb;
	if(a == undefined && b == undefined){
		a = 0;
		b = len - 1;
	}
	if(qArr == undefined) {
		qArr = arr.slice();
	}
	if(len < 2){
		return arr;
	}
	if(len == 2 && arr[0] == arr[1]){
		return arr;
	}
	tag = qArr[a];
	for(i = 1; i < len;){
		if(qArr[a+i] <= tag){
			temp = qArr[a+i];
			qArr[a+i] = tag;
			qArr[a+i-1] = temp;
			leftArr.push(temp);
			i++;
		}else{
			if(leftArr.length + rightArr.length == len - 1){
				break;
			}
			temp = qArr[a+i];
			qArr[a+i] = qArr[b-rightArr.length];
			qArr[b-rightArr.length] = temp;
			rightArr.push(temp);
		}
	}
	lb = a + leftArr.length - 1;
	arguments.callee(leftArr,a,lb,qArr);
	ra = b - rightArr.length + 1;
	arguments.callee(rightArr,ra,b,qArr);
	return qArr;
	
}
 function quickSort_2(arr){
        return sort(arr,0,arr.length-1);
        function sort(arr,l,r){            
            if(l<r){         
                var mid=arr[parseInt((l+r)/2)],i=l-1,j=r+1;         
                while(true){
                    while(arr[++i]<mid);
                    while(arr[--j]>mid);             
                    if(i>=j)break;
                    var temp=arr[i];
                    arr[i]=arr[j];
                    arr[j]=temp;
                }       
                sort(arr,l,i-1);
                sort(arr,j+1,r);
            }
            return arr;
        }
 }
function quickSort_3(arr,a,b,qArr){
	var leftArr=[],rightArr=[],len=arr.length,i,k,tag,tmp,j,lb,ra;
	if(a == undefined && b == undefined){
		a = 0;
		b = len-1;
		
	}

	if(qArr == undefined){
		qArr = arr;
	}
	if(len<2){
		return arr;
	}
	if(len == 2 && arr[0] == arr[1]){
		return arr;
	}
	tag = qArr[a];
	for(i=1,k=0;i<len;){
		if(qArr[a+i] >= tag){
			rightArr.push(qArr[a+i]);
			i++;
		}else{
			tmp = qArr[a+i];
			for(j=a+i;j>a+k;j--){
				qArr[j]=qArr[j-1];
			}
			qArr[a+k] = tmp;
			leftArr.push(tmp);
			k++;
			i++;
		}
	}
	lb = a+leftArr.length-1;
	arguments.callee(leftArr,a,lb,qArr);
	ra = b-rightArr.length+1;
	arguments.callee(rightArr,ra,b,qArr);
	return qArr;
}
function bubbleSort(arr) {
	var resArr = arr.slice(),len = resArr.length,i,j,temp,len_j=len-1,sortOK;
	for(i=0;i<len-1;i++){
		sortOK = true;
		for(j=0;j<len_j;j++){
			if(resArr[j]>resArr[j+1]){
				temp = resArr[j+1];
				resArr[j+1] = resArr[j];
				resArr[j] = temp;
				sortOK = false;
			}
		}
		if(sortOK){
			break;
		}
		len_j--;
	}
	return resArr;
}
function selectSort(arr) {
	var resArr = arr.slice(),len = resArr.length,tag,i,j,len_j=len,temp;
	for(i=0;i<len-1;i++){
		
		tag = 0;
		for(j=1;j<len_j;j++){
			if(resArr[j]>resArr[tag]){
				tag = j;	
			}
		}
		if(tag != len_j-1){
			temp = resArr[len_j-1];
			resArr[len_j-1]= resArr[tag];
			resArr[tag] = temp;
		}
		len_j--;
		
	}
	return resArr;
}
function insertSort(arr) {
	var resArr = arr.slice(), i, j, len = resArr.length, temp;
	for (i = 1; i < len; i++) {
		for (j = i - 1; j >= 0; j--) {
			//pushHis(resArr.slice(),j,i);
			if(j == 0 && resArr[i] >= resArr[j]){
				temp = resArr[i];
				resArr.splice(i, 1);
				resArr.splice(j, 0, temp);
				break;
			}
			if (resArr[i] < resArr[j]) {
				if (j + 1 != i) {
					temp = resArr[i];
					resArr.splice(i, 1);
					resArr.splice(j + 1, 0, temp);
				}
				break;
			}
		}
	}
	return resArr;
}
var arr = [];
var i = 0;
while(i < 50){
	arr[i] = Math.floor(Math.random()*400+100);
	i++;
}

var newArr = insertSort(arr);
console.log(arr);
console.log(newArr);

