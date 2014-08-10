//GET方式访问一个url，并取得JSON数据
//do get to an url and get data
function doGetAsyncJson(url, callbackFunc, errFunc) {
	jQuery.ajax({
		url : encodeURI(url),
		async : true,
		cache : false,
		type : "GET",
		dataType : "json",
		success : function(_data){
			if (typeof(callbackFunc)=="function") {
				callbackFunc(_data);
			}
		},
		complete : fm_checkSession,
		error : (typeof(errFunc)=="function")?errFunc:function(xhr,textstate,errthr) {msgErr("Error: ["+textstate+"]: "+errthr);}
	});
}

//POST方式访问一个url，并取得JSON数据
//post form data to an url and get data
function doPostAsyncJson(url, inputData, callbackFunc, errFunc) {
	//alert(typeof(callbackFunc) + '   ' + typeof(errFunc));
	jQuery.ajax({
		url : encodeURI(url),
		async : true,
		cache : false,
		type : "POST",
		data : inputData,
		dataType : "json",
		success : function(_data){
			if (typeof(callbackFunc)=="function") {
				callbackFunc(_data);
			}
		},
		complete : fm_checkSession,
		error : (typeof(errFunc)=="function")?errFunc:function(xhr,textstate,errthr) {msgErr("Error: ["+textstate+"]: "+errthr);}
	});
}

//GET方式访问一个url，并取得JSON数据
//do get to an url and get data
function doGetSyncJson(url, errFunc) {
	var rtndata = null;
	jQuery.ajax({
		url : encodeURI(url),
		async : false,
		cache : false,
		type : "GET",
		dataType : "json",
		success : function (data) {
			rtndata = data;
		},
		complete : fm_checkSession,
		error : (typeof(errFunc)=="function")?errFunc:function(xhr,textstate,errthr) {msgErr("Error: ["+textstate+"]: "+errthr);}
	});
	return rtndata;
}

//POST方式访问一个url，并取得JSON数据
//post form data to an url and get data
function doPostSyncJson(url, inputData, errFunc) {
	var rtndata = null;
	$.ajax({
		contentType:'application/x-www-form-urlencoded',
		url : encodeURI(url),
		async : false,
		cache : false,
		type : "POST",
		data : inputData,
		dataType : "json",
		success : function (data) {
			rtndata = data;
		},
		complete : fm_checkSession,
		error : (typeof(errFunc)=="function")?errFunc:function(xhr,textstate,errthr) {msgErr("Error: ["+textstate+"]: "+errthr);}
	});
	return rtndata;
}

//check session is not timeout
function fm_checkSession(req, txt) {
	if (req.readyState==4 
		&& req.getResponseHeader('Content-Type') 
		&& req.getResponseHeader('Content-Type').indexOf('html')!=-1
		&& req.responseText 
		&& req.responseText.indexOf("META_DESC_LOGIN")!=-1) {
		dhtmlx.alert({
			text: "您的会话已过期，请重新登录！",
			type: "alert-warning",
			callback: function() {
				if (window.parent) {
					window.parent.location.reload(true);
				} else {
					window.top.location.reload(true);
				}
			}
		});
	}
}

//alert common error
function alertErr(title, errMsg) {
	dhtmlx.alert({type:"alert-error", title:title, text:errMsg});
}

//alert common warning
function alertWarn(title, warnMsg) {
	dhtmlx.alert({type:"alert-warning", title:title, text:warnMsg});
}

//alert common msg
function msg(msg) {
	dhtmlx.message(msg);
}

//alert common msg
function msgErr(msg) {
	dhtmlx.message({"type":"error","text":msg});
}

//open a window by url
function openWindowByUrl(_id, _url) {
	var a1new = document.createElement("a");
	a1new.setAttribute("href", _url);
	a1new.setAttribute("target", "_blank");
	a1new.setAttribute("id", "openwin_"+_id);
	document.body.appendChild(a1new);
	a1new.click();
}

//show wait
function waitstart(msg) {
	$(".waitMsg").html((msg || "")+fmd_i18n_msg_wait);
	$(".wait").show();
}

//hide wait
function waitend() {
	$(".wait").hide();
	$(".waitMsg").html('');
}

//on mouse over/out event for ico size
function changeicosize(_img, enlarge) {
	if (enlarge) {
		_img.width=22;
		_img.height=22;
	} else {
		_img.width=18;
		_img.height=18;
	}
}

//get mouse position
function getMousePos(event) {
    var e = event || window.event;
    var scrollX = document.documentElement.scrollLeft || document.body.scrollLeft;
    var scrollY = document.documentElement.scrollTop || document.body.scrollTop;
    var x = e.pageX || e.clientX + scrollX;
    var y = e.pageY || e.clientY + scrollY;
    return { 'x': x, 'y': y };
}

//JavaScript Document
function loadModule(lang, modulePath, module){
	loadJsFile(modulePath + '/'+module+'/i18n_'+lang+'.js');
	loadJsFile(modulePath + '/'+module+'/prop.js');
}

//JavaScript Document
function loadJsFile(filename){
    /*var fileref = document.createElement('script');
    fileref.setAttribute("type","text/javascript");
    fileref.setAttribute("src",filename);
    document.getElementsByTagName("head")[0].appendChild(fileref);*/
	//load sync
    //$(document.getElementsByTagName("head")[0]).append('<script type="text/javascript" src="'+filename+'"</script>');
	
	jQuery.ajax({
		url : filename,
		async : false,
		cache : true,
		type : "GET",
		dataType : "script",
		success : function (data) {
			
		},
		error : (typeof(errFunc)=="function")?errFunc:function(xhr,textstate,errthr) {msgErr("Error: ["+textstate+"]: "+errthr);}
	});
}

//css Document
function loadCssFile(filename,filetype){
	var fileref = document.createElement('link');
    fileref.setAttribute("rel","stylesheet");
    fileref.setAttribute("type","text/css");
    fileref.setAttribute("href",filename);
    document.getElementsByTagName("head")[0].appendChild(fileref);
}

//close without prompt
function closeWin() {
	if (window.opener) {
		if (navigator.appName == 'Microsoft Internet Explorer') {
			window.opener = 'whatever';
			window.open('', '_parent', '');
			window.close();
		} else {
			//self.close();
			window.open('', '_self', '');
			window.close();
		}
	} else {
		if (navigator.appName == 'Microsoft Internet Explorer') {
			window.opener=null;
			window.open('', '_self', '');
			window.close();
		} else {
			window.open('','_parent','');
			self.close();
		}
	}
}

//check if an obj is empty
function isEmpty(obj) {
	if (!obj) return true;
	for ( var i in obj ) { 
		return false; 
	}
	return true; 
}

//copy object
function clone(obj) {
	if (!obj) return null;
	if (typeof(obj)!='object') return obj;
	var newobj = obj instanceof Array ? [] : {};
	for (var i in obj) {
		if (typeof(obj[i])=='object') 
			newobj[i] = copyObj(obj[i]);
		else
			newobj[i] = obj[i];
	}
	return newobj;
}
