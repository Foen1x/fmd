<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!doctype html>
<%
String path = request.getContextPath();
String lang = "zh";
%>
<html>
<head>
	<meta charset="utf-8">
	<title>Form Designer</title>
	<link rel="stylesheet" href="<%=path%>/js/jquery-ui/jquery-ui.css">
	<link rel="stylesheet" href="<%=path%>/js/dhtmlx3/dhtmlx.css">
	<link rel="stylesheet" href="<%=path%>/css/formoid-default-skyblue.css">
	<link rel="stylesheet" href="<%=path%>/css/formbasic.css">
	<link rel="stylesheet" href="<%=path%>/css/formdesigner.css">
	
	<script src="<%=path%>/js/jquery-1.10.2.js"></script>
	<script src="<%=path%>/js/jquery-ui/jquery-ui.js"></script>
	<script src="<%=path%>/js/dhtmlx3/dhtmlx.js"></script>
	
	<script src="<%=path%>/js/formdesigner_i18n_<%=lang%>.js"></script>
	<script src="<%=path%>/js/formdesigner.js"></script>
	
	<style>
	
	button {
		width:150px;
		height:20px;
	}
	
	body {
		font-family: "Microsoft YaHei","Trebuchet MS","Verdana","Arial","Helvetica","sans-serif";
		font-size:100%;
		background-color:#EBEBEB;
	}
	
	.fmdelements {
		float:right;
	}
	</style>
	<script>
	
	var fmd_fmcontainer_htmlstr = '<div class="fmcontainer">'+
				'<div class="fmcontainer_titlebar" onclick="fmf_fmcontainer_tbclick(this)">'+
				'<img src="<%=path%>/images/collapse.png"/>'+
				'<a href="" onclick="return false;"><b>'+fmd_i18n_container_title+'</b></a>'+
				'</div>'+
				'<table class="fmcontainer_content">'+
					fmd_trrow+
				'</table>'+
			'</div>';
	
	//jQuery ui init function
	$(function() {
		
		//sortable tabs
		var tabs = $( ".fmdcanvas" ).tabs();
		tabs.find( ".ui-tabs-nav" ).sortable({
			axis: "x",
			stop: function() {
				tabs.tabs( "refresh" );
			}
		});
		
		//draggable
		$( ".fmdelements ul li a" ).draggable(fmd_draggable_args);
		
		//droppable
		$( ".fmcontainer_content td" ).droppable(fmd_droppable_args);
		
		//sortable
		$( ".fmform" ).sortable({
			placeholder: "ui-state-highlight"
		});
		$( ".fmform" ).disableSelection();
	});
	
	//===================
	function fmf_fmcontainer_togglecontent(thisdiv) {
		$(thisdiv).parent().find('table').toggle();
		if($(thisdiv).parent().find('table').is(":hidden")) {
			$(thisdiv).find('img').attr('src','<%=path%>/images/expand.png');
		} else {
			$(thisdiv).find('img').attr('src','<%=path%>/images/collapse.png');
		}
	}
	
	</script>
</head>

<body>

<input type="button" value="Add container" onclick="fmdf_fmcontainer_addcontainer()"></input>
<input type="button" value="Append row" onclick="fmdf_fmcontainer_appendrow()"></input>
<input type="button" value="Add row before" onclick="fmdf_fmcontainer_addrowbefore()"></input>
<input type="button" value="Add row after" onclick="fmdf_fmcontainer_addrowafter()"></input>
<input type="button" value="Add column before" onclick="fmdf_fmcontainer_addcolbefore()"></input>
<input type="button" value="Add column after" onclick="fmdf_fmcontainer_addcolafter()"></input>
<input type="button" value="Remove" onclick="fmdf_removeselected()"></input>
<input type="text" value="1" style="width:10px" id="in_rowspan"></input>
<input type="button" value="Change rowspan" onclick="fmdf_changerowspan()"></input>
<input type="text" value="1" style="width:10px" id="in_colspan"></input>
<input type="button" value="Change colspan" onclick="fmdf_changecolspan()"></input>

<div class="fmdelements">
    	<ul>
        	<li><a href="" class="fmdraggable element-tag-input" onclick="return false;">文本输入</a></li>
            <li><a href="" class="fmdraggable element-tag-p" onclick="return false;">文本输出</a></li>
            <li><a href="" class="fmdraggable element-tag-textarea" onclick="return false;">文本输入域</a></li>
            <li><a href="" class="fmdraggable element-tag-popupinput" onclick="return false;">弹出选择输入</a></li>
            <li><a href="" class="fmdraggable element-tag-radio" onclick="return false;">单选框</a></li>
            <li><a href="" class="fmdraggable element-tag-checkbox" onclick="return false;">复选框</a></li>
            <li><a href="" class="fmdraggable element-tag-select" onclick="return false;">下拉列表</a></li>
            <li><a href="" class="fmdraggable element-tag-multiselect" onclick="return false;">多选下拉列表</a></li>
            <li><a href="" class="fmdraggable element-tag-dhxgrid" onclick="return false;">表格</a></li>
            <li><a href="" class="fmdraggable element-tag-customhtml" onclick="return false;">自定义HTML</a></li>
        </ul>
</div>

<div class="fmdcanvas formoid-default-skyblue">

	<ul>
		<li><a href="#fmtab_1">主表单</a></li>
		<li><a href="#fmtab_2">附件信息</a></li>
		<li><a href="#fmtab_3">流程图</a></li>
		<li><a href="#fmtab_4">历史记录</a></li>
	</ul>

	<div class="fmtab" id="fmtab_1">
		<form class="fmform">
			
			<div class="fmcontainer">
				<div class="fmcontainer_titlebar" onclick="fmf_fmcontainer_tbclick(this)">
					<img src="<%=path%>/images/collapse.png"/>
					<a href="" onclick="return false;"><b><script>document.write(fmd_i18n_container_title);</script></b></a>
				</div>
				<table class="fmcontainer_content">
					<tr>
						<td onclick="fmdf_onselect(event,this)"><script>document.write(fmd_i18n_tdp);</script></td>
					</tr>
				</table>
			</div>
			
		</form>
	</div>
	
	<div class="fmtab" id="fmtab_2">
		tab 2
	</div>
	
	<div class="fmtab" id="fmtab_3">
		tab 3
	</div>
	
	<div class="fmtab" id="fmtab_4">
		tab 4
	</div>
	
</div>

</body>
</html>
