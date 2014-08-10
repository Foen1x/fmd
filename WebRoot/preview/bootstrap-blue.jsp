<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String lang = "zh";
%>
<!DOCTYPE html>
<html>
<head>
<title>Bootstrap</title>
<link href="<%=path%>/skins/bootstrap-blue/css/custom.css"
	rel="stylesheet">
<link href="<%=path%>/skins/bootstrap-blue/css/bootstrap.min.css"
	rel="stylesheet">
<script src="<%=path%>/js/jquery/jquery-1.10.2.js"></script>
<script src="<%=path%>/js/3rdpartyother/json2html.js"></script>
<script src="<%=path%>/skins/bootstrap-blue/js/bootstrap.min.js"></script>
</head>
<body>

	<nav class="navbar navbar-default navbar-fixed-top" role="navigation">
		<div class="navbar-header">
			<a class="navbar-brand" href="#">任务操作</a>
		</div>
		<div>
			<ul class="nav navbar-nav">
				<li class="active"><a href="#">提交</a></li>
				<li><a href="#">驳回</a></li>
				<li class="dropdown"><a href="#" class="dropdown-toggle"
					data-toggle="dropdown">高级<b class="caret"></b>
				</a>
					<ul class="dropdown-menu">
						<li><a href="#">转办</a></li>
						<li><a href="#">加签</a></li>
						<li><a href="#">通知</a></li>
						<li class="divider"></li>
						<li><a href="#">分离的链接</a></li>
						<li class="divider"></li>
						<li><a href="#">另一个分离的链接</a></li>
					</ul></li>
			</ul>
		</div>
	</nav>

	<div id="main">
		<ul id="myTab" class="nav nav-tabs">
			<li class="active"><a href="#tabbody_1" data-toggle="tab">主表单
			</a></li>
			<li><a href="#tabbody_2" data-toggle="tab">附件</a></li>
			<li><a href="#tabbody_3" data-toggle="tab">历史</a></li>
			<li><a href="#tabbody_4" data-toggle="tab">流程图</a></li>
		</ul>
		<div id="myTabContent" class="tab-content">
			<div class="tab-pane fade in active" id="tabbody_1">

				
				<div id="fmcontainer_block_1" class="panel panel-info container " style="display:block;margin-top:0.7"><div class="panel-heading"><h3 class="panel-title">未命名</h3></div><div class="panel-body"><div class="table-responsive form-inline"><table class="table"><tbody><tr><td id="ui-id-1" colspan="1" rowspan="1" style="width:33%;"><label for="ui-id-10">未命名</label><div class="form-control-div"><input id="ui-id-10" type="text" class="form-control" placeholder=""></div></td><td id="ui-id-9" colspan="2" rowspan="1" style="width:66%;"></td></tr><tr><td id="ui-id-6" colspan="1" rowspan="1" style="width:33%;"></td><td id="ui-id-8" colspan="1" rowspan="1" style="width:33%;"><label for="ui-id-11">未命名</label><div class="form-control-div"><input id="ui-id-11" type="text" class="form-control" placeholder=""></div></td><td id="ui-id-7" colspan="1" rowspan="1" style="width:33%;"></td></tr><tr><td id="ui-id-2" colspan="1" rowspan="1" style="width:33%;"></td><td id="ui-id-4" colspan="1" rowspan="1" style="width:33%;"></td><td id="ui-id-3" colspan="1" rowspan="1" style="width:33%;"><label for="ui-id-12">未命名</label><div class="form-control-div"><input id="ui-id-12" type="text" class="form-control" placeholder=""></div></td></tr><tr><td id="ui-id-5" colspan="3" rowspan="1" style="width:100%;"><label for="ui-id-13">未命名</label><div class="form-control-div"><input id="ui-id-13" type="text" class="form-control" placeholder=""></div></td></tr><tr><td id="ui-id-14" colspan="2" rowspan="1" style="width:66%;"></td></tr></tbody></table></div></div></div>
				

			</div>
			<div class="tab-pane fade" id="tabbody_2">
				<p>系统预留页面</p>
			</div>
			<div class="tab-pane fade" id="tabbody_3">
				<p>系统预留页面</p>
			</div>
			<div class="tab-pane fade" id="tabbody_4">
				<p>系统预留页面</p>
			</div>
		</div>
	</div>

<script type="text/javascript">
$(function() {
	$(".panel-heading").click(function(e){$(this).next().toggle();});
});
</script>
</body>
</html>