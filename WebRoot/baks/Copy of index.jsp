<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!doctype html>
<%
String path = request.getContextPath();
%>
<html>
<head>
	<meta charset="utf-8">
	<title>Form Designer</title>
	<link rel="stylesheet" href="<%=path%>/js/jquery-ui/jquery-ui.css">
	<link rel="stylesheet" href="<%=path%>/js/dhtmlx3/dhtmlx.css">
	<link rel="stylesheet" href="<%=path%>/css/formoid-default-skyblue.css">
	<script src="<%=path%>/js/jquery-1.10.2.js"></script>
	<script src="<%=path%>/js/jquery-ui/jquery-ui.js"></script>
	<script src="<%=path%>/js/dhtmlx3/dhtmlx.js"></script>
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
	
	.clear {
		clear:both;
		height:0px;
	}
	
	.fmform ul {
		list-style:none;
	}
	
	.fmcanvas {
		background-color:#FFFFFF;
		color:#666666;
		font-size:1em;
		max-width:980px;
		min-width:150px;
	}
	
	.fmcanvas ul {
		font-size:0.8em;
		max-width:100%;
		max-height:2.4em;
	}
	
	.fmcontainer {
		background-color:white;
		width:100%;
		margin-top:0.7empx;
	}
	
	.fmcontainer_titlebar {
		background-color:#2FABE9;
		width:100%;
		height:2em;
		padding-top:1em;
	}
	
	.fmcontainer_content {
		margin:0px;
		background-color:white;
		width:100%;
		border:none;
	}
	
	.fmcontainer_content tr {
		background-color:white;
		width:100%;
		margin:0px;
		border:none;
	}
	
	.fmcontainer_content td{
		margin:0px;
		background-color:white;
		border:dashed 1px black;
		height:30px;
	}
	
	.fmcontainer_content td p{
		color:#aaaaaa;
		font-style:italic;
	}
	
	.fmcontainer_titlebar img {
		width:1.2em;
		height:1.2em;
		margin-left:1em;
		background-color:white;
		border:solid 0.1em white;
		border-radius: 0.1em;
	}
	
	.fmcontainer_titlebar a {
		color:#2FABE9;
		border:none;
		padding:0.4em;
		margin-left:1em;
		margin-bottom:0.8em;
		border-radius:0.1em;
		text-decoration:none;
		background-color:white;
	}
	
	
	.fmelements {
		float:right;
	}

	.fmelements ul {
		list-style:none;
		line-height:2.5em;
	}
	
	.fmelements ul li a{
		color:blue;
		border:solid 1px black;
		padding:0.2em;
		border-radius:0.3em;
		cursor:pointer;
		list-style:none;
		text-decoration:none;
	}
	
	.fmcanvas {
		margin-left:200px;
	}
	
	.fmdselected {
		transition:border linear .2s,box-shadow linear .5s;
		-moz-transition:border linear .2s,-moz-box-shadow linear .5s;
		-webkit-transition:border linear .2s,-webkit-box-shadow linear .5s;
		outline:none;border-color:rgba(241,39,242,.75);
		box-shadow:0 0 0.4em rgba(241,39,232,.5);
		-moz-box-shadow:0 0 0.5em rgba(241,39,232,.5);
		-webkit-box-shadow:0 0 0.5em rgba(241,39,232,3);
	}
	
	.fmform .ui-state-highlight { height: 6em; line-height: 2em; }
	
	/* width = parseInt(100/columns.length)*/
	.fmform .column1{ width:100%;}
	.fmform .column2{ width:50%; }
	.fmform .column3{ width:33%; }
	.fmform .column4{ width:25%; }
	.fmform .column5{ width:20%; }

	</style>
	<script>
	//init vars
	var selection = {selectedobj:null};
	var fmd_tdp = '<p>拖动控件到这里</p>';
	var fmd_tdcell = '<td onclick="fmdf_onselect(event,this)">'+fmd_tdp+'</td>';
	var fmd_trrow = '<tr>'+fmd_tdcell+'</tr>';
	
	var fmd_draggable_args = { 
			revert: true,
			cursor: "move", 
			cursorAt: { top: 30, left: 50 },
			zIndex: 1,
			helper: function( event ) {
				var classes = event.target.className.split(' ');
				for (var i in classes) {
					if (classes[i].indexOf('element-tag-')!=-1) {
						var type = classes[i].substr(12);
						if (type=='input') {
							return $( '<div class="element-input" ><label class="title">Label Text</label><input class="large" type="text" name="input" /></div>' );
						} else if (type=='p') {
							return $( '<div class="element-p" ><label class="title">Label Text</label><p>Output Text</p></div>' );
						} else if (type=='textarea') {
							return $( '<div class="element-textarea" ><label class="title">Text Area</label><textarea class="medium" name="textarea" cols="20" rows="5" ></textarea></div>' );
						} else if (type=='popupinput') {
							return $( '<div class="element-input" ><label class="title">Label Text</label><input class="large" type="text" name="input" /></div>' );
						} else if (type=='radio') {
							return $( '<div class="element-radio" ><label class="title">Radio Buttons</label>		<div class="column column1"><input type="radio" name="radio" value="options 1" /><span>options 1</span><br/><input type="radio" name="radio" value="options 2" /><span>options 2</span><br/><input type="radio" name="radio" value="options 3" /><span>options 3</span><br/></div><span class="clearfix"></span></div>' );
						} else if (type=='checkbox') {
							return $( '<div class="element-checkbox" ><label class="title">Checkboxes</label>		<div class="column column1"><input type="checkbox" name="checkbox[]" value="options 1"/ ><span>options 1</span><br/><input type="checkbox" name="checkbox[]" value="options 2"/ ><span>options 2</span><br/><input type="checkbox" name="checkbox[]" value="options 3"/ ><span>options 3</span><br/></div><span class="clearfix"></span></div>' );
						} else if (type=='select') {
							return $( '<div class="element-select" ><label class="title">Select</label><div class="large"><span><select name="select" >'+
									'<option value="options 1">options 1</option><br/>'+
									'<option value="options 2">options 2</option><br/>'+
									'<option value="options 3">options 3</option><br/></select><i></i></span></div></div>' );
						} else if (type=='multiselect') {
							return $( '<div class="element-multiple" ><label class="title">Multiple select</label><div class="large"><select name="multiple[]" multiple="multiple" >'+
									'<option value="options 1">options 1</option><br/>'+
									'<option value="options 2">options 2</option><br/>'+
									'<option value="options 3">options 3</option><br/></select></div></div>' );
						} else if (type=='dhxgrid') {
							return $( '<div class="element-customhtml" >Grid</div>' );
						} else if (type=='customhtml') {
							return $( '<div class="element-customhtml" >Custom HTML</div>' );
						}
					}
				}
				return $( '<div class="element-none" >Not available</div>' );
			}
		};
	
	var fmd_droppable_args = {
			accept: ".fmdraggable",
			activeClass: "ui-state-hover",
			hoverClass: "ui-state-active",
			drop: function( event, ui ) {
				$( this ).addClass( "ui-state-highlight" );
				var classes = ui.draggable.attr('class').split(' ');
				for (var i in classes) {
					if (classes[i].indexOf('element-tag-')!=-1) {
						var type = classes[i].substr(12);
						console.debug(type);
						if (type=='input') {
							$(this).html( '<div class="element-input" onclick="fmdf_onselect(event,this);"><label class="title">Input Text</label><input class="large" type="text" name="input" /></div>' );
						} else if (type=='p') {
							$(this).html( '<div class="element-p" onclick="fmdf_onselect(event,this);"><label class="title">Label Text</label><p>Output Text</p></div>' );
						} else if (type=='textarea') {
							$(this).html( '<div class="element-textarea" onclick="fmdf_onselect(event,this);"><label class="title">Text Area</label><textarea class="medium" name="textarea" cols="20" rows="5" ></textarea></div>' );
						} else if (type=='popupinput') {
							$(this).html( '<div class="element-input" onclick="fmdf_onselect(event,this);"><label class="title">Input Text</label><input class="large" type="text" name="input" /></div>' );
						} else if (type=='radio') {
							$(this).html( '<div class="element-radio" onclick="fmdf_onselect(event,this);"><label class="title">Radio Buttons</label>		<div class="column column1"><input type="radio" name="radio" value="options 1" /><span>options 1</span><br/><input type="radio" name="radio" value="options 2" /><span>options 2</span><br/><input type="radio" name="radio" value="options 3" /><span>options 3</span><br/></div><span class="clearfix"></span></div>' );
						} else if (type=='checkbox') {
							$(this).html( '<div class="element-checkbox" onclick="fmdf_onselect(event,this);"><label class="title">Checkboxes</label>		<div class="column column1"><input type="checkbox" name="checkbox[]" value="options 1"/ ><span>options 1</span><br/><input type="checkbox" name="checkbox[]" value="options 2"/ ><span>options 2</span><br/><input type="checkbox" name="checkbox[]" value="options 3"/ ><span>options 3</span><br/></div><span class="clearfix"></span></div>' );
						} else if (type=='select') {
							$(this).html( '<div class="element-select" onclick="fmdf_onselect(event,this);"><label class="title">Select</label><div class="large"><span><select name="select" >'+
									'<option value="options 1">options 1</option><br/>'+
									'<option value="options 2">options 2</option><br/>'+
									'<option value="options 3">options 3</option><br/></select><i></i></span></div></div>' );
						} else if (type=='multiselect') {
							$(this).html( '<div class="element-multiple" onclick="fmdf_onselect(event,this);"><label class="title">Multiple select</label><div class="large"><select name="multiple[]" multiple="multiple" >'+
									'<option value="options 1">options 1</option><br/>'+
									'<option value="options 2">options 2</option><br/>'+
									'<option value="options 3">options 3</option><br/></select></div></div>' );
						} else if (type=='dhxgrid') {
							$(this).html( '<div class="element-dhxgrid" onclick="fmdf_onselect(event,this);">Grid</div>' );
						} else if (type=='customhtml') {
							$(this).html( '<div class="element-customhtml" onclick="fmdf_onselect(event,this);">Custom HTML</div>' );
						}
					}
				}
			}
		};
	
	//========functions for tabs
	$(function() {
		var tabs = $( ".fmcanvas" ).tabs();
		tabs.find( ".ui-tabs-nav" ).sortable({
			axis: "x",
			stop: function() {
				tabs.tabs( "refresh" );
			}
		});
	});
	
	//========functions for forms
	
	//jQuery ui init function
	$(function() {
		//draggable
		$( ".fmelements ul li a" ).draggable(fmd_draggable_args);
		
		//droppable
		$( ".fmcontainer_content td" ).droppable(fmd_droppable_args);
		
	});
	
	//set sortable
	function fmdf_setsortable() {
		//sortable
		$( ".fmform" ).sortable({
			placeholder: "ui-state-highlight"
		});
		$( ".fmform" ).disableSelection();
	}
	
	//on fmcontainer title bar clicked and select fmcontainer
	function fmf_fmcontainer_tbclick(thisdiv) {
		//fmf_fmcontainer_togglecontent(thisdiv);
		fmdf_select($(thisdiv).parent());
	}
	
	//on dom object clicked and select dom object
	function fmdf_onselect(event, obj) {
		fmdf_select($(obj));
		if(navigator.appName == 'Microsoft Internet Explorer') {
			event.cancelBubble=true; //ie s
		} else {
			event.stopPropagation(); //ff s
		}
	}
	
	//Append a container
	function fmdf_fmcontainer_addcontainer() {
		$('.fmform').append('<div class="fmcontainer">'+
			'<div class="fmcontainer_titlebar" onclick="fmf_fmcontainer_tbclick(this)">'+
				'<img src="<%=path%>/images/collapse.png"/>'+
				'<a href="" onclick="return false;">未命名</a>'+
			'</div>'+
			'<table class="fmcontainer_content">'+
				fmd_trrow+
			'</table>'+
		'</div>');
		$('.fmcontainer:last td').droppable(fmd_droppable_args);
	}
	
	//Append row to container
	function fmdf_fmcontainer_appendrow() {
		if (!selection.selectedobj) {
			return;
		}
		var $table;
		if ( fmdf_hasClass(selection.selectedobj, 'fmcontainer') ) {
			$table = $(selection.selectedobj).find('table');
		} else if ( fmdf_hasClass(selection.selectedobj, 'ui-droppable') ) {
			$table = $(selection.selectedobj).parents('.fmcontainer_content');
		}
		console.debug('$table='+$table);
		if ($table && fmdf_hasClass($table, 'fmcontainer_content')) {
			console.debug('$table class='+$table.attr('class'));
			//$table.find("tr:last").after(fmd_trrow);
			//if($table.find('tr').length==0) {
				$table.append(fmd_trrow);
			//}
			$table.find("tr:last td").droppable(fmd_droppable_args);
		}
	}
	
	//add row before selected
	function fmdf_fmcontainer_addrowbefore() {
		var $tr = fmdf_getselectedTR();
		if ($tr) {
			$tr.before(fmd_trrow);
			$tr.parent().find('td').droppable(fmd_droppable_args);
		}
	}
	
	//add row after selected
	function fmdf_fmcontainer_addrowafter() {
		var $tr = fmdf_getselectedTR();
		if ($tr) {
			$tr.after(fmd_trrow);
			$tr.parent().find('td').droppable(fmd_droppable_args);
		}
	}
	
	//add column after selected
	function fmdf_fmcontainer_addcolbefore() {
		var $td = fmdf_getselectedTD();
		if ($td) {
			if ($td.parent().children().length==5) {
				alert("列数量不能超过5.");
				return;
			} else {
				$td.before(fmd_tdcell);
				$td.parent().find('td').droppable(fmd_droppable_args);
				fmdf_refreshTdWidth($td.parent());
			}
		}
	}
	
	//add column after selected
	function fmdf_fmcontainer_addcolafter() {
		var $td = fmdf_getselectedTD();
		if ($td) {
			if ($td.parent().children().length==5) {
				alert("列数量不能超过5.");
				return;
			} else {
				$td.after(fmd_tdcell);
				$td.parent().find('td').droppable(fmd_droppable_args);
				fmdf_refreshTdWidth($td.parent());
			}
		}
	}
	
	//get the row contains the selected object
	function fmdf_getselectedTR() {
		var $tr;
		if ( fmdf_hasClass($(selection.selectedobj).parent(), 'ui-droppable') ) {//element selected
			$tr = $(selection.selectedobj).parent().parent();
		} else if ( fmdf_hasClass(selection.selectedobj, 'ui-droppable') ) {//td selected
			$tr = $(selection.selectedobj).parent();
			console.debug('td selected');
		}/*  else if (fmdf_hasClass($(selection.selectedobj), 'fmcontainer_row')) {//tr selected
			$tr = $(selection.selectedobj);
		} */
		return $tr;
	}
	
	//get the row contains the selected object
	function fmdf_getselectedTD() {
		var $td;
		if ( fmdf_hasClass($(selection.selectedobj).parent(), 'ui-droppable') ) {//element selected
			$td = $(selection.selectedobj).parent();
		} else if ( fmdf_hasClass(selection.selectedobj, 'ui-droppable') ) {//td selected
			$td = $(selection.selectedobj);
		}
		return $td;
	}
	
	//reset td width by setting class
	function fmdf_refreshTdWidth($tr) {
		console.debug('$tr.children().length='+$tr.children().length);
		if ($tr.children().length>0) {
			//get max total spans for all rows
			var maxspans = 0;
			$tr.parent().children().each(function (i, tr1) {
				var spans = 0;
				$(tr1).children().each(function (j, td1) {
					var span = $(td1).attr('colSpan');
					console.debug('colspan='+span);
					spans += span==undefined ? 1 : parseInt(span);
				});
				if (spans>maxspans) maxspans = spans;
			});
			console.debug('sum td span='+maxspans);
			//set class
			$tr.children().each(function () {
				var span = $(this).attr('colSpan');
				var width = parseInt(100/maxspans*(span==undefined ? 1 : parseInt(span)))+'%';
				console.debug('set td width='+width);
				$(this).css('width', width);
			});
		}
	}
	
	//check if the className exists on dom object
	function fmdf_hasClass($obj, className) {
		if ($($obj).attr('class')!=undefined) {
			var classes = $($obj).attr('class').split(' ');
			for (var i in classes) {
				if (classes[i]==className) {
					return true;
				}
			}
		}
		return false;
	}
	
	//select an dom object
	function fmdf_select($obj) {
		fmdf_unselect();
		$($obj).addClass('fmdselected');
		console.debug($($obj).attr('class'));
		selection.selectedobj = $obj;
	}
	
	//deselect object
	function fmdf_unselect($obj) {
		var obj = $obj;
		console.debug($obj);
		if (undefined==obj) {
			console.debug('selection.selectedobj='+selection.selectedobj);
			obj = selection.selectedobj;
		}
		if (obj) {
			console.debug('remove class');
			$(obj).removeClass('fmdselected');
			selection.selectedobj = null;
		}
	}
	
	//remove selected object
	function fmdf_removeselected() {
		if (selection.selectedobj) {
			//check if parent need to be removed
			var $also;
			if ( fmdf_hasClass(selection.selectedobj, 'ui-droppable') ) {//remove td
				console.debug('==='+$(selection.selectedobj).parent().children().length);
				if($(selection.selectedobj).parent().children().length==1) {
					$also = $(selection.selectedobj).parent();
				} else {
					fmdf_refreshTdWidth($(selection.selectedobj).parent());//refresh td width
				}
			} else if ( fmdf_hasClass($(selection.selectedobj).parent(), 'ui-droppable') ) {//remove element
				//just replace with p tag
				$(selection.selectedobj).parent().append(fmd_tdp);
				$(selection.selectedobj).parent().removeClass('ui-state-highlight');
			}
			//删除
			$(selection.selectedobj).remove();
			selection.selectedobj = null;
			//remove parent also
			if ($also) {
				console.debug('parent tr also removed.');
				$also.remove();
			}
		}
	}
	
	//change rowspan of td
	function fmdf_changerowspan() {
		if (selection.selectedobj && fmdf_hasClass(selection.selectedobj, 'ui-droppable')) {
			$(selection.selectedobj).attr("rowSpan", $('#in_rowspan').val());
		}
	}
	
	//change colspan of td
	function fmdf_changecolspan() {
		if (selection.selectedobj && fmdf_hasClass(selection.selectedobj, 'ui-droppable')) {
			$(selection.selectedobj).attr("colSpan", $('#in_colspan').val());
		}
	}
	
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

<div class="fmelements">
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

<div class="fmcanvas" class="formoid-default-skyblue">

	<ul>
		<li><a href="#fmtab_1">主表单</a></li>
		<li><a href="#fmtab_2">附件信息</a></li>
		<li><a href="#fmtab_3">流程图</a></li>
		<li><a href="#fmtab_4">历史记录</a></li>
	</ul>

	<div class="fmtab" id="fmtab_1">
		<form class="fmform" method="post">
			
			<div class="fmcontainer">
				<div class="fmcontainer_titlebar" onclick="fmf_fmcontainer_tbclick(this)">
					<img src="<%=path%>/images/collapse.png"/>
					<a href="" onclick="return false;">基本信息</a>
				</div>
				<table class="fmcontainer_content">
					<tr>
						<td onclick="fmdf_onselect(event,this)"><p>拖动控件到这里</p></td>
					</tr>
				</table>
			</div>
		
			<div id="fmcontainer_2" class="fmcontainer">
				<div id="fmcontainer_titlebar_2" class="fmcontainer_titlebar" onclick="fmf_fmcontainer_tbclick(this)">
					<a href="" onclick="return false;">业务信息</a>
				</div>
				<table class="fmcontainer_content">
					<tr>
						<td onclick="fmdf_onselect(event,this)"><p>拖动控件到这里</p></td>
						<td onclick="fmdf_onselect(event,this)"><p>拖动控件到这里</p></td>
					</tr>
					<tr>
						<td onclick="fmdf_onselect(event,this)"><p>拖动控件到这里</p></td>
						<td onclick="fmdf_onselect(event,this)"><p>拖动控件到这里</p></td>
					</tr>
				</table>
			</div>
		
			<div id="fmcontainer_3" class="fmcontainer">
				<div id="fmcontainer_titlebar_3" class="fmcontainer_titlebar" onclick="fmf_fmcontainer_tbclick(this)">
					<a href="" onclick="return false;">附件信息</a>
				</div>
				<table class="fmcontainer_content">
					<tr>
						<td onclick="fmdf_onselect(event,this)" rowspan=2><p>拖动控件到这里</p></td>
						<td onclick="fmdf_onselect(event,this)"><p>拖动控件到这里</p></td>
					</tr>
					<tr>
						<td onclick="fmdf_onselect(event,this)"><p>拖动控件到这里</p></td>
						<td onclick="fmdf_onselect(event,this)"><p>拖动控件到这里</p></td>
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
