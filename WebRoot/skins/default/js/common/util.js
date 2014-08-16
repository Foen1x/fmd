
//事件-开始
EVENT_TYPE_START = 0;
//事件-结束
EVENT_TYPE_END = 1;
//网关-专用
GATEWAY_TYPE_EXCLUSIVE = 1;
//网关-并行
GATEWAY_TYPE_PARALLEL = 5;
//网关-包容
GATEWAY_TYPE_INCLUSIVE = -1;

//任务循环类型-无
TASK_LOOP_NULL = "0";
//任务循环类型-简单
TASK_LOOP_SIMPLE = "1";
//任务循环类型-多实例
TASK_LOOP_MULTI = "2"; 

function inArray(val, ary) {
	if( ary.constructor != Array ) {
		throw "arguments is not Array";
		return;
	}
    for(var i=0; i<ary.length; i++){
    	if( val == ary[i] ){
    		return true;
    	}
    }
    return false;
}

function isNull(obj) {
    return obj === undefined || obj == null || obj == "" || obj == "null";
}

function Params() {
    this.put = function(varName, varValue, varType) {
        if( isNull(varName) || isNull(varValue) ) {
            return;
        }
    
        var nameSeg = varName.split(".");
        var tmp = "";
        for( var i=0; i<nameSeg.length; i++) {

            tmp += ( (i>0 ? "." : "") + nameSeg[i] );

            if ( isNull( eval(  'this.' + tmp ) ) ) {
                eval( 'this.' + tmp + ' = new Object(); ' );  
            }
        }
        

        if( isNull(varType) ) {
            if( isNaN(varValue) ) {
                eval( 'this.' + varName + ' = "' + varValue + '";' );
            } else {
                eval( 'this.' + varName + ' = ' + varValue + ';' );
            }
        } else if( varType == "String" ) {
            eval( 'this.' + varName + ' = "' + varValue + '";' );
        } else if( varType == "Number" ) {
            eval( 'this.' + varName + ' = ' + varValue + ';' );
        } else if( varType == "Object" ) {
            //eval( 'this.' + varName + ' = ["' + varValue.replace(/;/ig,'","') + '"];' );
            eval( 'this.' + varName + ' = ' + JSON.stringify(varValue) );
        }

    }
}

function StringArray( blockMark ) {
    this.blockMark = blockMark;
    this.str = "";
    this.put = function( val ) {
        this.str += val + this.blockMark;
    }
    
    this.get = function() {
        if( this.str.lastIndexOf( this.blockMark ) ==  this.str.length-1) {
            return this.str.slice( 0, this.str.length-1 );
        }
    }
}


/**
* 查找对象数组中, 满足条件的对象
* objs  对象数组
* vals  属性-值 的 二维数组
*/
function findObjectByProp(objs, fieldValues) {
    for(var i=0; i<objs.length; i++) {
        var obj = objs[i];
        var condition = true;
        //alert(JSON.stringify(obj));
        for( var j=0; j<fieldValues.length; j++ ) {
            var field = fieldValues[j][0];
            var val = fieldValues[j][1];
            condition &= (obj[ field ] == val);
        }
        //alert(condition);
        if( condition ) {
            return obj;
        }
    }
}

function toClipboard(textData) {
	alert(textData);
	window.clipboardData.setData('text', textData);
}


function loadXMLDoc(dname) {

	if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera,Safari
		xmlhttp = new XMLHttpRequest();
		
	} else {// code for IE6, IE5
//		Microsoft.XMLDOM
		xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	}
	xmlhttp.open("GET", dname, false);
	xmlhttp.send();
	xmlDoc = xmlhttp.responseXML;
	
	return xmlDoc;
}



/*
 * function saveError() { dhtmlx.message( { type:"error", expire: -1,
 * text:"保存失败!" } ); }
 */

function loadFormData(jsonData) {
	for(var attr in jsonData ) {
		if( $('#_' + attr).prop("type") == "radio" ) {
			$("#_" + attr + "_" + jsonData[attr]).prop( "checked", "checked" );
		} else {
			$("#_"+attr).val( jsonData[attr] );			
		}
    }
}

function dateToString(timeObj) {
	var time = new Date();
	time.setTime( timeObj.time );
	return time.toLocaleDateString();
}

function timeToString(timeObj) {
	var time = new Date();
	time.setTime( timeObj.time );
	return time.toLocaleString();
}

function countDays( afterTime, beforeTime) {
	return (afterTime.date - beforeTime.date);
}

function syncGet(url) {
	return get(url, "false");
}

function doGetAsync(url, callback, msg, cache) {
	var cache = false;
	$.ajax({
        type: "GET",
        url: url,
        cache: cache,
        async: true,
        contentType: "application/json; charset=utf-8", 
        success: function(ret){
            result = ret;
            if( JSON.stringify(ret).indexOf("j_security_check") > 0) {
            	document.location.replace(document.location.href);
            	return;
            } 
            callback(ret);
//            if( !isNull(msg) ) {
//            	dhtmlx.message({ type:"", expire: 5000, text:msg+"成功！" });
//        	}
        },
        error: function(ret) {
        	if( !isNull(msg) ) {
        		dhtmlx.message({ type:"error", expire: -1, text:msg+"失败！" });
        	}
        }
    });
}

function doPostAsync(url, data, callback, msg, cache) {
	var cache = false;
	var result = null;
	$.ajax({
        type: "POST",
        url: url,
        cache: cache,
        async: true,
//        contentType: "application/json; charset=utf-8", 
//        contentType: "application/x-www-form-urlencoded",
        data: data,
        success: function(ret){
//        	alert(JSON.stringify(callback(ret);));
        	if( JSON.stringify(ret).indexOf("j_security_check") > 0) {
            	document.location.replace(document.location.href);
            	return;
            } 
        	if( !isNull(ret.errorCode)  ) {
                dhtmlx.message({ type:"error", expire: 10000, text:ret.errorCode + "错误！" });
                return;
            } else {
            	callback(ret);
//            	if( !isNull(msg) ) {
//            		dhtmlx.message({ type:"", expire: 5000, text:msg+"成功！" });
//            	}
            }
        },
        error: function(ret) {
        	if( !isNull(msg) ) {
        		dhtmlx.message({ type:"error", expire: -1, text:msg+"失败！" });
        	}
        	callback(null);
        }
    });
	return result;
}

function doGet(url, msg, cache, async) {
	var cache = false;
	var async = false;
	var result = null;
	$.ajax({
        type: "GET",
        url: url,
        cache: cache,
        async: async,
        contentType: "application/json; charset=utf-8", 
        success: function(ret){
            result = ret;
            if( JSON.stringify(ret).indexOf("j_security_check") > 0) {
            	document.location.replace(document.location.href);
            	return;
            } 
            if( !isNull(msg) ) {
            	dhtmlx.message({ type:"", expire: 5000, text:msg+"成功！" });
        	}
        },
        error: function(ret) {
        	if( !isNull(msg) ) {
        		dhtmlx.message({ type:"error", expire: -1, text:msg+"失败！" });
        	}
        }
    });
	return result;
}

function doPost(url, data, msg, cache, async) {
	var cache = false;
	var async = false;
	var result = null;
	$.ajax({
        type: "POST",
        url: url,
        cache: cache,
        async: async,
        //contentType: "application/json; charset=utf-8", 
        data: data,
        success: function(ret){
        	if( JSON.stringify(ret).indexOf("j_security_check") > 0) {
            	document.location.replace(document.location.href);
            	return;
            } 
        	if( !isNull(ret.errorCode)  ) {
                dhtmlx.message({ type:"error", expire: 10000, text:ret.errorCode + "错误！" });
            } else {
            	result = ret;
            	if( !isNull(msg) ) {
            		dhtmlx.message({ type:"", expire: 5000, text:msg+"成功！" });
            	}
            }
        },
        error: function(ret) {
        	if( !isNull(msg) ) {
        		dhtmlx.message({ type:"error", expire: -1, text:msg+"失败！" });
        	}
        }
    });
	return result;
}

function Debug(onoff) {
	this.onoff = onoff;
	this.alert = function(msg, obj) {
		if( !this.onoff ) {
			return;
		}
		if( isNull(obj) ) {
			alert(msg);
		} else {
			alert("["+msg+"]" + JSON.stringify(obj));
		}
	}
	this.alertObj = function(obj) {
		if( this.onoff ) {
			alert(JSON.stringify(obj));
		}
	}
	this.message = function(msg) {
		if( this.onoff ) {
			dhtmlx.message({ expire: 5000, text:msg });
		}
	}
	this.error = function(msg) {
		if( this.onoff ) {
			dhtmlx.message({ type:"error", expire: 5000, text:msg });
		}
	}
	this.log = function(msg, obj) {
		if( this.onoff ) {
			var str = "[===" + msg + "===]:" + JSON.stringify(obj);
			try{
			if ( !isNull(console) ) {
				if(!document.all)console.log(str);
			}
			} catch (e){}
		}
	}
}

function formatDate(d) {
	//alert(d);
	//alert(d instanceof Date)
	var yy = d.getFullYear();
	var mm = d.getMonth()+1;
	var dd = d.getDate();
	var hh = d.getHours();
	var mi = d.getMinutes();
	var ss = d.getSeconds();
	mm = mm < 10 ? "0" + mm : mm;
	dd = dd < 10 ? "0" + dd : dd;
	hh = hh < 10 ? "0" + hh : hh;
	mi = mi < 10 ? "0" + mi : mi;
	ss = ss < 10 ? "0" + ss : ss;
	
	var strDate = yy + "-" + mm + "-" + dd + " " + hh + ":" + mi + ":" + ss;
	
	return strDate; 
}

function formatJSONDate(d) {
	//{"nanos":0,"time":1400735546000,"minutes":12,"seconds":26,"hours":13,"month":4,"year":114,"timezoneOffset":-480,"day":4,"date":22}
	if( d== null) {
		return "";
	}
	
	var yy = d.year + 1900;
	var mm = d.month+1 < 10 ? "0"+(d.month+1) : ""+(d.month+1);
	var dd = d.date < 10 ? "0"+d.date : ""+d.date;
	var hh = d.hours < 10 ? "0"+d.hours : ""+d.hours;
	var mi = d.minutes < 10 ? "0"+d.minutes : ""+d.minutes;
	var ss = d.seconds < 10 ? "0"+d.seconds : ""+d.seconds;
	
	var strDate = yy + "-" + mm + "-" + dd + " " + hh + ":" + mi + ":" + ss;
	
	return strDate; 
}

function toLocaleDate(srcDate) {
	if( isNull(srcDate) ) {
		return srcDate;
	}
	var currDate = new Date();
	var area = currDate.getHours() - currDate.getUTCHours();
	
	srcDate= srcDate.replace(/-/g, "/");
	var d = new Date(srcDate);
	d.setHours( d.getHours() + area  );
	return d.toLocaleString();
}

function bindTextarea() {
	$("textarea").each(function() {
		if( $(this).attr("maxlength") != null && $(this).attr("maxlength") != "" ) {
			var maxlength = parseInt($(this).attr("maxlength"));
			$(this).bind("keyup", function() {
				var str = $(this).val();
				if( str.length > maxlength ) {
					$(this).val(str.slice(0,maxlength-1));
				}
				$(this).next().html("<div color=\"blue\">("+(maxlength-str.length)+"/"+maxlength+")</div>");
			});
			$(this).after("<div style=\"color:blue\">("+maxlength+"/"+maxlength+")</div>");
		}
	});
}

function updateInputLength(obj, maxlength) {
	var str = $(obj).val();
	if( str.length > maxlength ) {
		$(obj).val(str.slice(0,maxlength-1));
	}
	$(obj).next().text("("+(maxlength-str.length)+"/"+maxlength+")");
}

function loadCheckbox() {
	$(".checkbs").each(function(idx, obj) {
		var dictName = $(obj).attr("dict-name");
		var dictType = $(obj).attr("dict-type");
		var dictLoad = $(obj).attr("dict-load");
		if( !isNull(dictType) && "0" != dictLoad ) {
		
			var html = '';
			getDictList(dictType, "", function (dicts) {
				for(var i=0; i<dicts.length; i++) {
					html += '<span class="checkb">';
					html += '<input name="'+dictName+'" type="checkbox" value="'+dicts[i].key_+'"/>';
					html += '<label for="xieyi">'+dicts[i].value_+'</label></span>';
				}
				$(obj).html(html);
			});
			
			$("input[name='"+dictName+"']").next().bind("click",function() {
				if( $(this).prev().prop("checked") ) {
					$(this).prev().prop("checked",false); 
				} else {
					$(this).prev().prop("checked",true); 
				}
				
			});
		}
	});
}

function setInputSelected(inputId, key_) {
	$("#"+inputId).val(key_);
	
	$("#"+inputId).next().next().find("li").each(function(idx, obj) {
		var val = $(obj).find("span").attr("value");
		var text = $(obj).find("span").text();
		if( val == key_ ) {
			$("#"+inputId).next().val(text);
//			$("#"+inputId).next().attr("value",text);
		}
	});
}

function putInputSelect(dictType, parentKey) {
	var html = '';
	getDictList(dictType, parentKey, function (dicts) {
		for(var i=0; i<dicts.length; i++) {
			html += '<li><span value="'+dicts[i].key_+'">'+dicts[i].value_+'</span></li>';
		}
		$("[dict-type='"+dictType+"']").find("ul").html(html);
	});
}

function loadInputSelect() {
	$(".select-list").each(function(idx, obj) {
		var dictType = $(obj).attr("dict-type");
		var dictLoad = $(obj).attr("dict-load");
		if( !isNull(dictType) && "0" != dictLoad ) {
		
			var html = '';
			getDictList(dictType, "", function (dicts) {
				for(var i=0; i<dicts.length; i++) {
					html += '<li><span value="'+dicts[i].key_+'">'+dicts[i].value_+'</span></li>';
				}
				$(obj).find("ul").html(html);
			});
		}
	});
}

function bindInputSelect() {
	$(".input-select span").parent().bind("click", function() {
		$(this).find(".select-list").toggle();
	});
	$(".select-list ul").delegate("li", "click", function(){
		var key_ = $($(this).children()).attr("value");
		var value_ = $($(this).children()).text();
		$($(this).parents(".input-select").find("input")[0]).val(key_ );
		$($(this).parents(".input-select").find("input")[1]).val(value_ );
		
		var childDictType = $(this).parents(".select-list").attr("child-type");
		if( !isNull(childDictType) ) {
			var html = '';
			getDictList(childDictType, key_, function (dicts) {
				for(var i=0; i<dicts.length; i++) {
					html += '<li><span value="'+dicts[i].key_+'">'+dicts[i].value_+'</span></li>';
				}
				$("[dict-type='"+childDictType+"']").find("ul").html(html);
			});
			
			$($("[dict-type='"+childDictType+"']").parents(".input-select").find("input")[0]).val("" );
			$($("[dict-type='"+childDictType+"']").parents(".input-select").find("input")[1]).val("" );
		}
	});
	$(".select-list ul").delegate("li", "mouseover", function(){
		$(this).css("background-color","#bac9ff");
	});
	$(".select-list ul").delegate("li", "mouseout", function(){
		$(this).css("background-color","#f9f9f9");
	});
	$(".input-select").bind("mouseleave", function() {
		var display = $(this).css("display");
		if( display != "none" ) {
			$(this).find("div").hide();
		}
	});
	
	$(".in-select").bind("click", function() {
		$(this).find(".select-d").toggle();
	});
	$(".select-d ul").delegate("li", "click", function(){
		$($(this).parents(".in-select").find("input")[0]).val($($(this).children()).attr("value"));
		$($(this).parents(".in-select").find("input")[1]).val($($(this).children()).text());
	});
	$(".select-d ul").delegate("li", "mouseover", function(){
		$(this).css("background-color","#bac9ff");
	});
	$(".select-d ul").delegate("li", "mouseout", function(){
		$(this).css("background-color","#f9f9f9");
	});
	$(".in-select").delegate("span", "mouseleave", function() {
		var display = $(this).css("display");
		if( display != "none" ) {
			$(this).find("div").hide();
		}
	});
	
}

function bindInputUser() {
	$(".input-user").find(".mninput").bind("click", function() {
		$(this).find("span").last().focus();
	});
	$(".input-user .mninput span").bind("keyup", function() {
		var showtype = $(this).parents(".input-user").attr("showtype");
		if( isNull(showtype) ) showtype = "s";
		getSelectUser(this, showtype);
	});
	$(".input-user").find("i").bind("click",function() {
		var showtype = $(this).parents(".input-user").attr("showtype");
		if( isNull(showtype) ) showtype = "s";
		var filter = $(this).parents(".input-user").attr("filter");
		if( isNull(filter) ) filter = "";
		showSelectOrgUser(this, '_selectUserOrgDiv', showtype, filter);
	});
	$(".input-user").find(".mninput").delegate(".mninput_nr b img", "click", function() {
		delSelectOrgUser(this);
	});
	
	$(".people").find(".mninput").bind("click", function() {
		$(this).find("span").last().focus();
	});
	$(".people .mninput span").bind("keyup", function() {
		var showtype = $(this).parents(".input-user").attr("showtype");
		if( isNull(showtype) ) showtype = "s";
		getSelectUser(this, showtype);
	});
	$(".people").find("i").bind("click",function() {
		var showtype = $(this).parents(".input-user").attr("showtype");
		if( isNull(showtype) ) showtype = "s";
		var filter = $(this).parents(".input-user").attr("filter");
		if( isNull(filter) ) filter = "";
		showSelectOrgUser(this, '_selectUserOrgDiv', showtype, filter);
	});
	$(".people").find(".mninput").delegate(".mninput_nr b img", "click", function() {
		delSelectOrgUser(this);
	});
}

function focusMninput(obj) {
	$($(obj).children()[$(obj).children().length-1]).focus();
}

function getSelectUser(obj, model) {
	
	document.onkeyup=function mykeyDown(e){
		e = e||event;  

	    if(e.keyCode == 13) {
//	    	alert("="+$.trim($(obj).text())+"==");
	    	var uid = $.trim($(obj).text());
	    	if( isNull(uid)) {
	    		$(obj).html("&nbsp;");
	    		return false;
	    	}
	    	var filter = $(obj).parents(".input-user").attr("filter");
	    	debug.log(filter);
	    	if( isNull(filter) ) filter = "";
	    	if(filter == 'leader'){
	    		deptMgr = '1';
	    	} else {
	    		deptMgr = '0';
	    	}
	    	
	    	doPostAsync(path+"/rest/hr/queryUserInfo/"+uid,{}, function(user) {
	    		if(isNull(user)) {
	    			$(obj).html("&nbsp;");
	    			dhtmlx.message({ type:"error", expire: 5000, text:"用户不存在，请重新输入！" });
		            $(obj).focus();
		            return;
	    		}
	    		if( !isNull(filter) && filter == "leader" ){
	    			var userIsDepmgr = user.isDepmgr;
	    			debug.log(userIsDepmgr);
	    			if(isNull(userIsDepmgr) || userIsDepmgr == "0" || userIsDepmgr == "false") {
	    				$(obj).html("&nbsp;");
	    				dhtmlx.message({ type:"info", expire: 5000, text:"此用户不是经理或以上级别!！" });
	    				$(obj).focus();
	    				return;
	    			}
	    		}
	    		
	            var userId = user.userId;
	            var userName = user.userName;
	            
	            var oldUserIdObj = $($(obj).parent().parent().children()[0]);
	            var oldUserNameObj = $($(obj).parent().parent().children()[1]);
	            var oldUserId = oldUserIdObj.val();
	            
	            if(oldUserIdObj.val().indexOf(userId) >= 0) {
	            	$(obj).html("");
		            $(obj).focus();
	            	return;
	            }
	            
	            if( model == 's' ) {
	            	oldUserIdObj.val(user.userId);
	            	oldUserNameObj.val(user.userName);
	            	$(obj).parent().find(".mninput_nr").remove();
	    		} else if( model == 'm'){
	    			oldUserIdObj.val( (isNull(oldUserIdObj.val()) ? "" : (oldUserIdObj.val() + ",")) + user.userId);
	            	oldUserNameObj.val((isNull(oldUserNameObj.val()) ? "" : (oldUserNameObj.val() + ",")) + user.userName);
	    		}
	            var html = '';
			    html += '<span class="mninput_nr">';
			    html += '<a href="javascript:;">'+userName+'</a>';
			    html += '<b class="passes"><img width="8" height="8" src="'+path+'/css/images/qx.png" ></b>';
			    html += '</span>';
	            $(obj).before(html);
	            $(obj).html("");
	            $(obj).focus();
	            if (oldUserId!=user.userId) $(oldUserIdObj).trigger("change");
	        });
	    	
	    	return false;
	    } else if( e.keyCode == 8 ) {
	    	if( document.activeElement == obj ) {
		    	if( $(obj).html() == "&nbsp;" || $(obj).html() == "") {
		    		delSelectOrgUser( $(obj).prev(".mninput_nr").find("img") );
		    		$(obj).html("&nbsp;"); 
		    	} else {
		    		$(obj).html("&nbsp;"); 
		    		$(obj).focus();
		    	}
	    	}
	    }
	};
}

function delSelectOrgUser(obj) {
	var uname = $(obj).parent().prev().text();
	var userIds = $(obj).parents(".input-user").find("input").eq(0);
	var userNames = $(obj).parents(".input-user").find("input").eq(1);
	
	if( isNull(userIds.val()) ) {
		userIds = $(obj).parents(".people").find("input").eq(0);
		userNames = $(obj).parents(".people").find("input").eq(1);
	}
	
	if( isNull(userIds.val()) || isNull(userNames.val()) ) {
		return;
	}

	var userIdAry = userIds.val().split(",");
	var userNameAry = userNames.val().split(",");
	
	var delIdx = -1;
	for(var i=0; i<userNameAry.length; i++) {
		if(uname == userNameAry[i]) {
			delIdx = i;
		}
	}
//	userIdAry = userIdAry.splice(delIdx-1,1);
//	userNameAry = userNameAry.splice(delIdx-1,1);
	
	if( delIdx == 0) {
		userIdAry = userIdAry.slice(1);
		userNameAry = userNameAry.slice(1);
	} else if ( delIdx == userIdAry.length - 1) {
		userIdAry = userIdAry.slice(0, delIdx);
		userNameAry = userNameAry.slice(0, delIdx);
	} else {
		var tmpId0 = userIdAry.slice(0, delIdx);
		var tmpId1 = userIdAry.slice(delIdx+1);
		var tmpName0 =  userNameAry.slice(0, delIdx);
		var tmpName2 = userNameAry.slice(delIdx+1);
		
		userIdAry = tmpId0.concat(tmpId1);
		userNameAry = tmpName0.concat(tmpName2);
	}
	
	userIds.val(userIdAry.toString());
	userNames.val(userNameAry.toString());
	
//	$(obj).parent().parent().next().html("&nbsp;");
	
	$(obj).parent().parent().remove();
	
	userIds.trigger("change");
}

function showSelectOrgUser(obj, divId, model, filter) {
	
	var html = '<div style="margin:0px;padding:0px;display:none;overflow:hidden;" title="人员信息" id="'+divId+'">';
	html += '<iframe name="iframe_dialog_'+divId+'" src="" width="100%" frameborder="0" border="0" scrolling="no"></iframe>'
	html += '</div>';
	
	if( isNull($('#' + divId).prop("title")) ) {
		$("body").append(html);
	}
	
	if( model == 's' ) {
		single = "0";
	} else {
		single = "1";
	}
	if(filter == 'leader'){
		deptMgr = '1';
	}else{
		deptMgr = '';
	}
	
	$("#"+divId).attr("title", "员工选择列表").find("iframe").attr("src", path + "/jsp/interApp/userInterface/orgnization.jsp?single="+single+"&deptMgr="+deptMgr).css("height", "360px").end().show();
	$("#"+divId).dialog({
	width : 730,
	height : 440,
	modal : true,
	draggable: false,
	resizable : false,
	buttons : {
		'确定' : function() {
			var v_value = window.frames["iframe_dialog_"+divId].returnValue();
//			alert(v_value);
			var retVal = JSON.parse(v_value);
			
			var oldUserIdObj = $($(obj).parent().parent().children()[0]);
	    	var oldUserNameObj = $($(obj).parent().parent().children()[1]);
			
			for(var i=0; i<retVal.length; i++) {
				var userId = retVal[i].ntaccount;
				var userName = retVal[i].displayname;
				
				var oldUserId = oldUserIdObj.val();
				
				if( oldUserIdObj.val().indexOf(userId) >= 0) {
					continue;
				}
				
			    if(model == 's') {
			    	oldUserIdObj.val(userId);
			    	oldUserNameObj.val(userName);
					$(obj).parent().prev().find(".mninput_nr").remove();
			    } else {
					oldUserIdObj.val( (isNull(oldUserIdObj.val()) ? "" : (oldUserIdObj.val() + ",")) + userId);
	            	oldUserNameObj.val((isNull(oldUserNameObj.val()) ? "" : (oldUserNameObj.val() + ",")) + userName);
			    }
			    var html = '';
			    html += '<span class="mninput_nr" >';
			    html += '<a href="javascript:;">'+userName+'</a>';
			    html += '<b class="passes"><img width="8" height="8" src="'+path+'/css/images/qx.png"></b>';
			    html += '</span>';
			    $(obj).parent().prev().children().last().before(html);
			    if (oldUserId!=userId) $(oldUserIdObj).trigger("change");
			}
			$(this).dialog("close");
			$("body").find("#"+divId).remove();
		},
		'取消' : function() {
			$(this).dialog("close");
			$("body").find("#"+divId).remove();
		}
	}
	});
}


function getBpdList() {
	return doGet(path + "/rest/dict/list?type=BPD_NAME");
}

function getDictList(dictType, parentKey, callback) {
	var url = path + "/rest/dict/list?type=" + dictType + "&parentKey="+parentKey;
	
	$.ajax({
        type: "GET",
        url: url,
        cache: false,
        async: false,
        contentType: "application/json; charset=utf-8", 
        success: function(ret){
            if( JSON.stringify(ret).indexOf("j_security_check") > 0) {
            	document.location.replace(document.location.href);
            	return;
            } 
            callback(ret);
        },
        error: function() {
//        	dhtmlx.message({ type:"error", expire: -1, text:msg+"失败！" });
        }
    });
}


/*extend method for dynamic load the js or css*/
/*extent:start*/
$.extend({
    includePath: '',
    include: function(file) {
       var files = typeof file == "string" ? [file]:file;
       for (var i = 0; i < files.length; i++) {
           var name = files[i].replace(/^\s|\s$/g, "");
           var att = name.split('.');
           var ext = att[att.length - 1].toLowerCase();
           var isCSS = ext == "css";
           var tag = isCSS ? "link" : "script";
           var attr = isCSS ? " type='text/css' rel='stylesheet' " : " language='javascript' type='text/javascript' ";
           var link = (isCSS ? "href" : "src") + "='" + $.includePath + name + "'";
           if ($(tag + "[" + link + "]").length == 0) document.write("<" + tag + attr + link + "></" + tag + ">");
       }
    }
});
/*extent:end*/
//open a window by url
function sf_openWindowByUrl(_id, _url) {
	var a1new = document.createElement("a");
	a1new.setAttribute("href", _url);
	a1new.setAttribute("target", "_blank");
	a1new.setAttribute("id", "openwin_"+_id);
	document.body.appendChild(a1new);
	a1new.click();
}
//处理键盘事件 禁止后退键（Backspace）密码或单行、多行文本框除外  
function forbidBackSpace(e) {
    var ev = e || window.event; //获取event对象   
    var obj = ev.target || ev.srcElement; //获取事件源   
    var t = obj.type || obj.getAttribute('type'); //获取事件源类型   
    //获取作为判断条件的事件类型   
    var vReadOnly = obj.readOnly;  
    var vDisabled = obj.disabled;  
    //处理undefined值情况   
    vReadOnly = (vReadOnly == undefined) ? false : vReadOnly;  
    vDisabled = (vDisabled == undefined) ? true : vDisabled;  
    //当敲Backspace键时，事件源类型为密码或单行、多行文本的，   
    //并且readOnly属性为true或disabled属性为true的，则退格键失效   
    var flag1 = ev.keyCode == 8 && (t == "password" || t == "text" || t == "textarea") && (vReadOnly == true || vDisabled == true);  
    //当敲Backspace键时，事件源类型非密码或单行、多行文本的，则退格键失效   
    var flag2 = ev.keyCode == 8 && t != "password" && t != "text" && t != "textarea";  
    //判断   
//    if (flag2 || flag1) return false;  
    if (flag2 || flag1) return false; 
}
//禁止后退键 作用于Firefox、Opera  
document.onkeypress = forbidBackSpace;  
//禁止后退键  作用于IE、Chrome  
document.onkeydown = forbidBackSpace;
/*清除文本框中的值*/
function clearInputValues(e,_func){
	if(e.keyCode == 8){
		if(_func instanceof Function){
			_func();
		}
	}
}
String.prototype.endWith = function (str) {
	if (str == null || str == "" || this.length == 0 || str.length > this.length)
		return false;
	if (this.substring(this.length - str.length) == str)
		return true;
	else
		return false;
	return true;
}

String.prototype.startWith = function (str) {
	if (str == null || str == "" || this.length == 0 || str.length > this.length)
		return false;
	if (this.substr(0, str.length) == str)
		return true;
	else
		return false;
	return true;
}

/**
 * @param controls 需要标识验证失败的控件id
 */
function setValidateFailedCss(ids) {
	var arr = null;
	if (typeof(ids)=="undefined") {
		return;
	} else if (typeof(ids)=="string") {
		arr = ids.split(",");
	} else if (typeof(ids)=="object" && ids.length) {
		arr = ids;
	}
	if (arr) {
		for (var i=0; i<arr.length; i++) {
			var obj = $("#"+arr[i]);
			if(!obj.length) obj = $("input[name="+arr[i]+"]");
			obj.parents(".item").siblings(".label").addClass("valiateFailed");
		}
	}
}

//重置验证样式
function resetValidateFailedCss() {
	$(".valiateFailed").removeClass("valiateFailed");
}

//设置ajax行为
$.ajaxSetup({
	//超时
	timeout: 20000,
	//请求开始
	beforeSend: function(xhr) {
		$(".wait").show();
	},
	//完成请求触发
	complete: function (req, txt) {
		$(".wait").hide();
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
});

function fn_InitButtonAuth(dhtmlxFormObj,path,resId){
	$.ajax({
		type : "POST",
		url : path + "/rest/roleResource/getBtnPolicies/" + resId,
		cache : false,
		async : false,
		success : function (obj) {
			if(obj.ret){
				var btnAuth = obj.info;
				//新增控制
				if(btnAuth.B1110 == '1') {
					dhtmlxFormObj.showItem("add");
				} 
				//更新控制
				if(btnAuth.B1120 == '1') {
					dhtmlxFormObj.showItem("update");
				} 
				//删除
				if(btnAuth.B1130 == '1') {
					dhtmlxFormObj.showItem("delete");
				}
				//查询
				if(btnAuth.B1140 == '1') {
					dhtmlxFormObj.showItem("query");
				}
				//保存
				if(btnAuth.B1150 == '1') {
					dhtmlxFormObj.showItem("save");
				}
				//查询职责
				if(btnAuth.B2110 == '1') {
					dhtmlxFormObj.showItem("queryDuty");
				}
				//查询授权
				if(btnAuth.B2120 == '1') {
					dhtmlxFormObj.showItem("queryAuth");
				}
				//暂停
				if(btnAuth.B3110 == '1') {
					dhtmlxFormObj.showItem("pause");
				}
				//继续
				if(btnAuth.B3120 == '1') {
					dhtmlxFormObj.showItem("start");
				}
				//终止
				if(btnAuth.B3130 == '1') {
					dhtmlxFormObj.showItem("stop");
				}
				//制证
				if(btnAuth.B4110 == '1') {
					dhtmlxFormObj.showItem("accreditation");
				}
				//剔除批次
				if(btnAuth.B4120 == '1') {
					dhtmlxFormObj.showItem("removeBatch");
				}
				//导出报销凭证/导出付款凭证/导出付款凭证
				if(btnAuth.B4130 == '1') {
					dhtmlxFormObj.showItem("export1");
				}
				//导出付款清单
				if(btnAuth.B4140 == '1') {
					dhtmlxFormObj.showItem("export");
				}
				//已上传网银
				if(btnAuth.B4150 == '1') {
					dhtmlxFormObj.showItem("payment");
				}
				//已复核
				if(btnAuth.B4160 == '1') {
					dhtmlxFormObj.showItem("review");
				}
			}
		}
	});
}
function getMailCopyUsers(path,key){
	var v_datajson = null;
	$.ajax({
		type : "POST",
		url : path + "/rest/mailCf/selectByParams",
		cache : false,
		async : false,
		data : {"data":JSON.stringify({"key":key,"status":"1"})},//key可在字典表中找到MAIL_TYPE的记录
		success : function (data) {
			v_datajson = data;
		}
	});
	if (null != v_datajson && v_datajson.length > 0) {
		return v_datajson[0].value;
	}
	return "";
}