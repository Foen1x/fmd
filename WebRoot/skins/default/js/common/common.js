
function strToASCII(str) {
	var t = "";
		//将汉字转换成ASCII码，然后在服务器端里再根据ASCII码转换成相应的字符
	for (i = 0; i < str.length; i++) {
		t += str.charCodeAt(i) + " ";//将字符转换成相应的ASCII码并用空格隔开;
	}
	return t;
}

//下拉框初始化		参数一：下拉框编号	参数二：初始化被选中的值
function initSel(selId, val) {
	setTimeout(function () {
		$("#" + selId).val(val).select();
	}, 0);
}


//单选按钮初始化	参数一：单选按钮的name属性	参数二：初始化被选中的值
function initRadio(radName, val) {
	$("input[name=" + radName + "]").each(function () {
		if ($(this).val() == val) {
			$(this).attr("checked", "checked");
		}
	});
}

//获取周一周日
function getMonSun(d)
{
	//按周日为一周的最后一天计算
	var dtArr = d.split("-");
	var date = new Date(dtArr[0], dtArr[1]-1, dtArr[2]);
	var this_day = date.getDay(); //今天是这周的第几天
	var step_s = -this_day+1; //上周日距离今天的天数（负数表示）
	if (this_day == 0) {
 		step_s = -7; // 如果今天是周日
	}
	var step_m = 7 - this_day; // 周日距离今天的天数（负数表示）
	var thisTime = date.getTime();
	var monday = new Date(thisTime +  step_s * 24 * 3600* 1000);
	var sunday = new Date(thisTime +  step_m * 24 * 3600* 1000);
	//默认统计一周的时间
	var starttime = transferDate(monday); //本周一的日期 （起始日期）
	var endtime = transferDate(sunday);  //本周日的日期 （结束日期）
	return starttime + "——" + endtime;
}

function transferDateTime(date){
	
	var yearTemp = date.getYear();
 	var monthTemp = date.getMonth()+1;
 	var dayTemp = date.getDate();
 	var hour =date.getHours();
 	var minutes = date.getMinutes();
 	var seconds = date.getSeconds();
  	if(parseInt(monthTemp) < 10) {
  		monthTemp = "0" + monthTemp;
  	} 
 	if(parseInt(dayTemp) < 10) {
  		dayTemp = "0" + dayTemp;
 	}
 	if(parseInt(hour) < 10) {
 		hour = "0" + hour;
 	}
 	
 	if(parseInt(minutes) < 10) {
 		minutes = "0" + minutes;
 	}
 	
 	return yearTemp + "-" + monthTemp + "-" + dayTemp +"-" + hour +"-" + minutes +"-" + seconds ;
	
}

function transferDate(date) {
 	var yearTemp = date.getYear();
 	var monthTemp = date.getMonth()+1;
 	var dayTemp = date.getDate();
  	if(parseInt(monthTemp) < 10) {
  		monthTemp = "0" + monthTemp;
  	} 
 	if(parseInt(dayTemp) < 10) {
  		dayTemp = "0" + dayTemp;
 	}
 	return yearTemp + "-" + monthTemp + "-" + dayTemp;
}

//初始化省份下拉框 参数一：下拉框ID
function initProvince(selId) {
	$("#" + selId).append("<option value='\u5317\u4eac_110000'>\u5317\u4eac</option>");
	$("#" + selId).append("<option value='\u5929\u6d25_120000'>\u5929\u6d25</option>");
	$("#" + selId).append("<option value='\u6cb3\u5317_130000'>\u6cb3\u5317</option>");
	$("#" + selId).append("<option value='\u5c71\u897f_140000'>\u5c71\u897f</option>");
	$("#" + selId).append("<option value='\u5185\u8499\u53e4_150000'>\u5185\u8499\u53e4</option>");
	$("#" + selId).append("<option value='\u8fbd\u5b81_210000'>\u8fbd\u5b81</option>");
	$("#" + selId).append("<option value='\u5409\u6797_220000'>\u5409\u6797</option>");
	$("#" + selId).append("<option value='\u9ed1\u9f99\u6c5f_230000'>\u9ed1\u9f99\u6c5f</option>");
	$("#" + selId).append("<option value='\u4e0a\u6d77_310000'>\u4e0a\u6d77</option>");
	$("#" + selId).append("<option value='\u6c5f\u82cf_320000'>\u6c5f\u82cf</option>");
	$("#" + selId).append("<option value='\u6d59\u6c5f_330000'>\u6d59\u6c5f</option>");
	$("#" + selId).append("<option value='\u5b89\u5fbd_340000'>\u5b89\u5fbd</option>");
	$("#" + selId).append("<option value='\u798f\u5efa_350000'>\u798f\u5efa</option>");
	$("#" + selId).append("<option value='\u6c5f\u897f_360000'>\u6c5f\u897f</option>");
	$("#" + selId).append("<option value='\u5c71\u4e1c_370000'>\u5c71\u4e1c</option>");
	$("#" + selId).append("<option value='\u6cb3\u5357_410000'>\u6cb3\u5357</option>");
	$("#" + selId).append("<option value='\u6e56\u5317_420000'>\u6e56\u5317</option>");
	$("#" + selId).append("<option value='\u6e56\u5357_430000'>\u6e56\u5357</option>");
	$("#" + selId).append("<option value='\u5e7f\u4e1c_440000'>\u5e7f\u4e1c</option>");
	$("#" + selId).append("<option value='\u5e7f\u897f_450000'>\u5e7f\u897f</option>");
	$("#" + selId).append("<option value='\u6d77\u5357_460000'>\u6d77\u5357</option>");
	$("#" + selId).append("<option value='\u91cd\u5e86_500000'>\u91cd\u5e86</option>");
	$("#" + selId).append("<option value='\u56db\u5ddd_510000'>\u56db\u5ddd</option>");
	$("#" + selId).append("<option value='\u8d35\u5dde_520000'>\u8d35\u5dde</option>");
	$("#" + selId).append("<option value='\u4e91\u5357_530000'>\u4e91\u5357</option>");
	$("#" + selId).append("<option value='\u897f\u85cf_540000'>\u897f\u85cf</option>");
	$("#" + selId).append("<option value='\u9655\u897f_610000'>\u9655\u897f</option>");
	$("#" + selId).append("<option value='\u7518\u8083_620000'>\u7518\u8083</option>");
	$("#" + selId).append("<option value='\u9752\u6d77_630000'>\u9752\u6d77</option>");
	$("#" + selId).append("<option value='\u5b81\u590f_640000'>\u5b81\u590f</option>");
	$("#" + selId).append("<option value='\u65b0\u7586_650000'>\u65b0\u7586</option>");
}

//初始化企业品牌
function initBrand(selId) {
	$("#" + selId).append("<option value='\u4e2d\u5916\u8fd0\u7a7a\u8fd0'>\u4e2d\u5916\u8fd0\u7a7a\u8fd0</option>");
	$("#" + selId).append("<option value='\u6c11\u822a\u5feb\u9012'>\u6c11\u822a\u5feb\u9012</option>");
	$("#" + selId).append("<option value='\u987a\u4e30'>\u987a\u4e30</option>");
	$("#" + selId).append("<option value='\u5b85\u6025\u9001'>\u5b85\u6025\u9001</option>");
	$("#" + selId).append("<option value='\u7533\u901a'>\u7533\u901a</option>");
	$("#" + selId).append("<option value='\u5706\u901a'>\u5706\u901a</option>");
	$("#" + selId).append("<option value='\u5168\u4e00'>\u5168\u4e00</option>");
	$("#" + selId).append("<option value='\u6d77\u822a\u5929\u5929'>\u6d77\u822a\u5929\u5929</option>");
	$("#" + selId).append("<option value='\u97f5\u8fbe'>\u97f5\u8fbe</option>");
	$("#" + selId).append("<option value='\u6c47\u901a'>\u6c47\u901a</option>");
	$("#" + selId).append("<option value='\u4e2d\u901a'>\u4e2d\u901a</option>");
	$("#" + selId).append("<option value='\u5e0c\u4f0a\u827e\u65af'>\u5e0c\u4f0a\u827e\u65af</option>");
	$("#" + selId).append("<option value='\u4e2d\u5916\u8fd0-\u6566\u8c6a'>\u4e2d\u5916\u8fd0-\u6566\u8c6a</option>");
	$("#" + selId).append("<option value='\u8054\u90a6\u5feb\u9012'>\u8054\u90a6\u5feb\u9012</option>");
	$("#" + selId).append("<option value='UPS'>UPS</option>");
	$("#" + selId).append("<option value='TNT'>TNT</option>");
	$("#" + selId).append("<option value='\u5176\u4ed6'>\u5176\u4ed6</option>");
}

//初始化企业注册类型
function initEconomytype(selId) {
	$("#" + selId).append("<option value='\u56fd\u6709'>\u56fd\u6709</option>");
	$("#" + selId).append("<option value='\u96c6\u4f53'>\u96c6\u4f53</option>");
	$("#" + selId).append("<option value='\u5185\u8d44\u5176\u4ed6'>\u5185\u8d44\u5176\u4ed6</option>");
	$("#" + selId).append("<option value='\u6e2f\u6fb3\u53f0\u5546\u6295\u8d44'>\u6e2f\u6fb3\u53f0\u5546\u6295\u8d44</option>");
	$("#" + selId).append("<option value='\u5916\u5546\u6295\u8d44'>\u5916\u5546\u6295\u8d44</option>");
}
function onlyNum(text) {
	text.value = text.value.replace(/\D/g, "");
}
function contains(parentStr, childStr) {
	var childLen = childStr.length;
	var parentLen = parentStr.length;
	for (var i = 0; i < parentLen; i++) {
		if (childStr == parentStr.substr(i, childLen)) {
			return true;
		}
	}
	return false;
}
/*
 * 获取当前时间
 */
function now() {
	var now = new Date();
	var year = now.getYear();
	var month = now.getMonth() + 1;
	var date = now.getDate();
	var hour = now.getHours();
	var minute = now.getMinutes();
	var second = now.getSeconds();
	var days = new Array("\u661f\u671f\u5929 ", "\u661f\u671f\u4e00 ", "\u661f\u671f\u4e8c ", "\u661f\u671f\u4e09 ", "\u661f\u671f\u56db ", "\u661f\u671f\u4e94 ", "\u661f\u671f\u516d ");
	var day = now.getDay();
	if (minute < 10) {
		minute = "0" + minute;
	}
	if (second < 10) {
		second = "0" + second;
	}
	document.getElementById("clock").innerHTML = "\u4eca\u5929\u662f " + year + "\u5e74" + month + "\u6708" + date + "\u65e5  " + days[day] + hour + ":" + minute + ":" + second;
	var mytime = setTimeout("now()", 1000);
}

