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
			ecs_checkSessionInSucc(_data);
			if (typeof(callbackFunc)=="function") {
				callbackFunc(_data);
			}
		},
		complete : ecs_checkSession,
		error : (typeof(errFunc)=="function")?errFunc:function(xhr,textstate,errthr) {alert("Error: ["+textstate+"]: "+errthr);}
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
			ecs_checkSessionInSucc(_data);
			if (typeof(callbackFunc)=="function") {
				callbackFunc(_data);
			}
		},
		complete : ecs_checkSession,
		error : (typeof(errFunc)=="function")?errFunc:function(xhr,textstate,errthr) {alert("Error: ["+textstate+"]: "+errthr);}
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
			ecs_checkSessionInSucc(data);
			rtndata = data;
		},
		complete : ecs_checkSession,
		error : (typeof(errFunc)=="function")?errFunc:function(xhr,textstate,errthr) {alert("Error: ["+textstate+"]: "+errthr);}
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
			ecs_checkSessionInSucc(data);
			rtndata = data;
		},
		complete : ecs_checkSession,
		error : (typeof(errFunc)=="function")?errFunc:function(xhr,textstate,errthr) {alert("Error: ["+textstate+"]: "+errthr);}
	});
	return rtndata;
}

//GET方式访问一个url，并取得JSON数据
//do get to an url and get data
function doGetAsyncJsonTw(url, encodeUri, callbackFunc, errFunc) {
	jQuery.ajax({
		url : (encodeUri==true)?encodeURI(url):url,
		async : true,
		cache : false,
		type : "GET",
		dataType : "json",
		complete : ecs_checkSessionTw,
		success : function(_data){
			if (typeof(callbackFunc)=="function") {
				callbackFunc(_data);
			}
		},
		error : (typeof(errFunc)=="function")?errFunc:function(xhr,textstate,errthr) {alert("Error: ["+textstate+"]: "+errthr);}
	});
}

//POST方式访问一个url，并取得JSON数据
//post form data to an url and get data
function doPostAsyncJsonTw(url, encodeUri, callbackFunc, errFunc) {
	//alert(typeof(callbackFunc) + '   ' + typeof(errFunc));
	jQuery.ajax({
		url : (encodeUri==true)?encodeURI(url):url,
		async : true,
		cache : false,
		type : "POST",
		dataType : "json",
		complete : ecs_checkSessionTw,
		success : function(_data){
			if (typeof(callbackFunc)=="function") {
				callbackFunc(_data);
			}
		},
		error : (typeof(errFunc)=="function")?errFunc:function(xhr,textstate,errthr) {alert("Error: ["+textstate+"]: "+errthr);}
	});
}

//GET方式访问一个url，并取得JSON数据
//do get to an url and get data
function doGetSyncJsonTw(url, encodeUri, errFunc) {
	var rtndata = null;
	jQuery.ajax({
		url : (encodeUri==true)?encodeURI(url):url,
		async : false,
		cache : false,
		type : "GET",
		dataType : "json",
		complete : ecs_checkSessionTw,
		success : function (data) {
			rtndata = data;
		},
		error : (typeof(errFunc)=="function")?errFunc:function(xhr,textstate,errthr) {alert("Error: ["+textstate+"]: "+errthr);}
	});
	return rtndata;
}

//POST方式访问一个url，并取得JSON数据
//post form data to an url and get data
function doPostSyncJsonTw(url, encodeUri, errFunc) {
	var rtndata = null;
	$.ajax({
		contentType:'application/json',
		url : (encodeUri==true)?encodeURI(url):url,
		async : false,
		cache : false,
		type : "POST",
		dataType : "json",
		complete : ecs_checkSessionTw,
		success : function (data) {
			rtndata = data;
		},
		error : (typeof(errFunc)=="function")?errFunc:function(xhr,textstate,errthr) {alert("Error: ["+textstate+"]: "+errthr);}
	});
	return rtndata;
}

//check session is not timeout
function ecs_checkSessionInSucc(_rtndata) {
	if (_rtndata!=undefined && _rtndata.sessiontimeout) {
		if (typeof(mwp_onTimeout)=='function') {
			mwp_onTimeout();
		} else if (window.parent && typeof(window.parent.mwp_onTimeout)=='function') {
			window.parent.mwp_onTimeout();
		}
		return false;
	} else {
		return true;
	}
}

//check session is not timeout
function ecs_checkSession(req, txt) {
	/*if (req.readyState==4 && req.getResponseHeader('Content-Type') && req.getResponseHeader('Content-Type').indexOf('html')!=-1) {
		if (typeof(mwp_onTimeout)=='function') {
			mwp_onTimeout();
		} else if (window.parent && typeof(window.parent.mwp_onTimeout)=='function') {
			window.parent.mwp_onTimeout();
		}
	}*/
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

//check session is not timeout
function ecs_checkSessionTw(req, txt) {
	/*if (req.readyState==4 && req.getResponseHeader('Content-Type') && req.getResponseHeader('Content-Type').indexOf('html')!=-1) {
		if (typeof(mwp_onTimeout)=='function') {
			mwp_onTimeout();
		} else if (window.parent && typeof(window.parent.mwp_onTimeout)=='function') {
			window.parent.mwp_onTimeout();
		}
	}*/
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

//set json column data to string data
function ecs_jsoncolumnToStrInGridJson(_gridJson, columnIndixes) {
	if (_gridJson==undefined || _gridJson.rows==undefined || _gridJson.length==0) {
		return;
	}
	for (var i in _gridJson.rows) {
		for (var j in columnIndixes) {
			var _jsoncoldata = _gridJson.rows[i]["data"][columnIndixes[j]];
			var _newcoldata = '';
			if (undefined!=_jsoncoldata) {
				_newcoldata = JSON.stringify(_jsoncoldata);
			}
			_gridJson.rows[i]["data"][columnIndixes[j]] = _newcoldata;
		}
	}
}
