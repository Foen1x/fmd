<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String lang = "zh";
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<title>Bootstrap</title>
<link href="<%=path%>/skins/bootstrap-blue/css/custom.css"
	rel="stylesheet">
<link href="<%=path%>/skins/bootstrap-blue/css/bootstrap.min.css"
	rel="stylesheet">
<script src="<%=path%>/js/jquery/jquery-1.10.2.js"></script>
<script src="<%=path%>/js/3rdpartyother/json2.js"></script>
<script src="<%=path%>/js/3rdpartyother/json2html.js"></script>
<script src="<%=path%>/skins/bootstrap-blue/js/bootstrap.min.js"></script>
</head>
<body>

	<div id="main">
		<ul id="myTab" class="nav nav-tabs">
			<li class="active"><a href="#tabbody_1" data-toggle="tab">主表单</a></li>
			<li><a href="#tabbody_2" data-toggle="tab">附件(5)</a></li>
			<li><a href="#tabbody_3" data-toggle="tab">历史</a></li>
			<li><a href="#tabbody_4" data-toggle="tab">流程图</a></li>
		</ul>
		<div id="myTabContent" class="tab-content">
			<div class="tab-pane fade in active" id="tabbody_1">

			</div>

			<div class="tab-pane fade" id="tabbody_2">
				
			</div>
			<div class="tab-pane fade" id="tabbody_3">
				
			</div>
			<div class="tab-pane fade" id="tabbody_4">
				
			</div>
		</div>
	</div>

<script type="text/javascript">
$(function(){
	var transform1 = [{'tag':'li','html':'<a href="${href}" data-toggle="tab">${text}</a>'}];

	var data1 = [
	    {"href":"#tabbody_1","text":"FF"},
	    {"href":"#tabbody_2","text":"FF"},
	    {"href":"#tabbody_3","text":"FF"},
	    {"href":"#tabbody_4","text":"FF"}
	];

	var transform2 = [{"tag":"div","class":"tab-pane fade"}];
	var data2 = [
	    	    {"id":"tabbody_1"},
	    	    {"id":"tabbody_2"},
	    	    {"id":"tabbody_3"},
	    	    {"id":"tabbody_4"}
	    	];

	var barChart= [
			        
					{"tag":"ul","class":"barChart", "children":function() {return(json2html.transform(this.groups,barChartGroup));}}

	        ];
	var barChartGroup= [
		       
					{"tag":"li","class":"group","children":[
						{"tag":"div","class":"bar","style":'height:${value}px;'},
						{"tag":"div","class":"label","html":"${label}"}
					]}
	       
			];
	var groups = [{'value':10,'label':'Day 1'},{'value':5,'label':'Day 2'},{'value':15,'label':'Day 3'},{'value':4,'label':'Day 4'},{'value':5,'label':'Day 5'}];

	alert(json2html.transform(groups, barChart));
	
	alert(json2html.transform(data1,transform1));
	$('#myTab').html(json2html.transform(data1,transform1));

	alert(json2html.transform(data2,transform2));
	$('#myTabContent').html(json2html.transform(data2,transform2));

	var t = {"tag":"li","html":"${name} (${age})","class":"aa"};
	var d = [{"age":40,"name":"Bob"},{"age":15,"name":"Frank"},{"age":65,"name":"Bill"},{"age":24,"name":"Robert"}];
	alert(json2html.transform(d,t));
});
</script>
</body>
</html>